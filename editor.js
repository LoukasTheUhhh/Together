// --- Condition Implementation Flags ---
let enabledConditions = {
  normal: false,
  looping: false
};

// --- Helper Functions ---
function checkConditionImplementation(code) {
  enabledConditions.normal = false;
  enabledConditions.looping = false;
  let lines = code.split('\n').map(l => l.trim());
  for (let line of lines) {
    if (/^!implement\s+condition\s+normal/i.test(line)) enabledConditions.normal = true;
    if (/^!implement\s+condition\s+looping/i.test(line)) enabledConditions.looping = true;
  }
}

function evalValue(val, context) {
  // If variable reference like [x], else strip quotes or stars
  val = val.trim();
  if (/^\[.+\]$/.test(val)) {
    let v = val.slice(1, -1);
    if (!(v in context)) throw new Error(`Variable [${v}] is not defined.`);
    return context[v];
  }
  if (/^".*"$|^'.*'$/.test(val)) return val.slice(1, -1);
  if (/^\*.*\*$/.test(val)) return val.slice(1, -1);
  if (!isNaN(val)) return Number(val);
  return val;
}

function extractBlock(lines, startIdx) {
  // Find matching closing brace
  let block = [];
  let depth = 0;
  let started = false;
  for (let i = startIdx; i < lines.length; i++) {
    let l = lines[i].trim();
    if (l.endsWith('{')) {
      depth++;
      if (!started) {
        started = true;
        continue; // Skip the opening line
      }
    }
    if (started) block.push(l);
    if (l.endsWith('}')) {
      depth--;
      if (depth === 0) break;
    }
  }
  // Remove the last line if it's only a closing brace
  if (block.length && block[block.length - 1].endsWith('}')) block.pop();
  return block;
}

function runBlock(block, context) {
  // Run a block of code lines as if they are inside the action
  for (let i = 0; i < block.length; i++) {
    let ag = new ActionGrouplet("block");
    ag.lines = [block[i]];
    ag.run(context);
  }
}

// --- Interpreter Classes ---
function preprocess(code) {
  code = code.replace(/\$\$.*$/gm, "");
  // Remove multi-line comments >< ... ><
  code = code.replace(/><[\s\S]*?><\s*/gm, "");
  return code;
}

class ActionGrouplet {
  constructor(name) { this.name = name; this.lines = []; }
  run(context) {
    for (let idx = 0; idx < this.lines.length; idx++) {
      let line = this.lines[idx].trim();

      // If Condition
      if (/^If\s*<(.+)>\s*=\?\s*<(.+)>\s*{/.test(line)) {
        if (!enabledConditions.normal)
          throw new Error("Normal conditions not enabled! Use !implement condition normal");
        const [, left, right] = line.match(/^If\s*<(.+)>\s*=\?\s*<(.+)>\s*{/);
        let leftVal = evalValue(left, context);
        let rightVal = evalValue(right, context);
        let block = extractBlock(this.lines, idx);
        if (leftVal == rightVal) {
          runBlock(block, context);
          idx += block.length + 1;
          continue;
        } else {
          // Check for Else If or Else
          let nextIdx = idx + block.length + 1;
          while (nextIdx < this.lines.length) {
            let nextLine = (this.lines[nextIdx] || '').trim();
            if (/^Else If\s*<(.+)>\s*=\?\s*<(.+)>\s*{/.test(nextLine)) {
              // Else If
              const [, elifLeft, elifRight] = nextLine.match(/^Else If\s*<(.+)>\s*=\?\s*<(.+)>\s*{/);
              let elifLeftVal = evalValue(elifLeft, context);
              let elifRightVal = evalValue(elifRight, context);
              let elifBlock = extractBlock(this.lines, nextIdx);
              if (elifLeftVal == elifRightVal) {
                runBlock(elifBlock, context);
                idx = nextIdx + elifBlock.length + 1 - 1;
                break;
              } else {
                nextIdx += elifBlock.length + 1;
                continue;
              }
            } else if (/^Else\s*{/.test(nextLine)) {
              let elseBlock = extractBlock(this.lines, nextIdx);
              runBlock(elseBlock, context);
              idx = nextIdx + elseBlock.length + 1 - 1;
              break;
            } else {
              idx = nextIdx - 1;
              break;
            }
          }
          continue;
        }
      }

      // Else If as a standalone (should be handled by above, but just in case)
      if (/^Else If\s*<(.+)>\s*=\?\s*<(.+)>\s*{/.test(line)) {
        throw new Error("Else If without preceding If block!");
      }
      // Else as a standalone (should be handled by above)
      if (/^Else\s*{/.test(line)) {
        throw new Error("Else without preceding If block!");
      }

      // During loop
      if (/^During\s*<(.+)>\s*=\?\s*<(.+)>\s*{/.test(line)) {
        if (!enabledConditions.looping)
          throw new Error("Looping conditions not enabled! Use !implement condition looping");
        const [, left, right] = line.match(/^During\s*<(.+)>\s*=\?\s*<(.+)>\s*{/);
        let block = extractBlock(this.lines, idx);
        let guard = 1000; // Prevent infinite loop
        while (evalValue(left, context) == evalValue(right, context)) {
          runBlock(block, context);
          if (--guard <= 0) {
            appendOutput("Infinite loop guard triggered.");
            break;
          }
        }
        idx += block.length + 1;
        continue;
      }

      // For loop: For [var] = value, [var] =? value2, [CODE]
      if (/^For\s*\[(.+)\]\s*=\s*(.+),\s*\[(.+)\]\s*=\?\s*(.+),\s*(.+)$/.test(line)) {
        if (!enabledConditions.looping)
          throw new Error("Looping conditions not enabled! Use !implement condition looping");
        const [, vname, vstart, vcheck, vend, codeBlock] =
          line.match(/^For\s*\[(.+)\]\s*=\s*(.+),\s*\[(.+)\]\s*=\?\s*(.+),\s*(.+)$/);
        context[vname] = evalValue(vstart, context);
        let guard = 10000; // Prevent infinite loop
        while (context[vcheck] == evalValue(vend, context)) {
          runBlock([codeBlock], context);
          if (--guard <= 0) {
            appendOutput("Infinite loop guard triggered.");
            break;
          }
        }
        continue;
      }

      // log([var]) or log("string")
      if (/log\((.*)\)/.test(line)) {
        const arg = RegExp.$1.trim();
        if (/^\[.*\]$/.test(arg)) {
          const varName = arg.slice(1, -1);
          if (!(varName in context)) throw new Error(`Variable [${varName}] is not defined.`);
          appendOutput(context[varName]);
        } else {
          try {
            appendOutput(eval(arg));
          } catch (e) {
            throw new Error(`Error evaluating log argument: ${arg}\n${e.message}`);
          }
        }
        continue;
      }
      // Variable assignment
      if (/^\[(.+)\]\s*=\s*["*]?(.*?)["*]?$/.test(line)) {
        const [, varName, varValue] = line.match(/^\[(.+)\]\s*=\s*["*]?(.*?)["*]?$/);
        context[varName] = varValue;
        continue;
      }
      // Let [var] = *value* (alias for assignment)
      if (/^Let\s*\[(.+)\]\s*=\s*(.+)/.test(line)) {
        const [, varName, varValue] = line.match(/^Let\s*\[(.+)\]\s*=\s*(.+)/);
        context[varName] = evalValue(varValue, context);
        continue;
      }
      // Skip empty lines or comments
      if (line === "" || line.startsWith("++") || line.startsWith("--")) continue;

      // Unknown line
      throw new Error(`Unknown instruction or syntax: "${line}"`);
    }
  }
}

class StorageGrouplet {
  constructor(name) { this.name = name; this.vars = {}; }
  load(lines) {
    for (const line of lines) {
      if (/^\[(.+)\]\s*=\s*["*]?(.*?)["*]?$/ .test(line)) {
        const [, varName, varValue] = line.match(/^\[(.+)\]\s*=\s*["*]?(.*?)["*]?$/);
        this.vars[varName] = varValue;
      }
    }
  }
}

class RunnerGrouplet {
  constructor(name) { this.name = name; this.actions = []; this.storages = []; }
  run() {
    const context = {};
    for (const s of this.storages) Object.assign(context, s.vars);
    for (const a of this.actions) a.run(context);
  }
}

function parseTogether(code) {
  checkConditionImplementation(code);

  const grouplets = {};
  const runnerGrouplets = [];
  let lines = code.split('\n').map(l => l.trim());
  let current = null;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Grouplet definitions
    if (/^(\w+)\s*=\s*Action\(Grouplet\)/i.test(line)) {
      const name = line.match(/^(\w+)\s*=/)[1];
      current = new ActionGrouplet(name);
      grouplets[name] = current;
      continue;
    }
    if (/^(\w+)\s*=\s*Storage\(Grouplet\)/i.test(line)) {
      const name = line.match(/^(\w+)\s*=/)[1];
      current = new StorageGrouplet(name);
      grouplets[name] = current;
      continue;
    }
    if (/^(\w+)\s*=\s*Runner\(Grouplet\)/i.test(line)) {
      const name = line.match(/^(\w+)\s*=/)[1];
      current = new RunnerGrouplet(name);
      grouplets[name] = current;
      runnerGrouplets.push(current);
      continue;
    }
    // Process block
    if (/^Process\((\w+)\)/.test(line)) {
      const name = line.match(/^Process\((\w+)\)/)[1];
      let block = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('}')) block.push(lines[i++]);
      if (grouplets[name] instanceof ActionGrouplet) grouplets[name].lines = block;
      if (grouplets[name] instanceof StorageGrouplet) grouplets[name].load(block);
      continue;
    }
    // Connect
    if (/^Connect\(([^,]+),\s*([^)]+)\)/.test(line)) {
      const [, src, runner] = line.match(/^Connect\(([^,]+),\s*([^)]+)\)/);
      if (grouplets[runner] instanceof RunnerGrouplet) {
        if (grouplets[src] instanceof ActionGrouplet) grouplets[runner].actions.push(grouplets[src]);
        if (grouplets[src] instanceof StorageGrouplet) grouplets[runner].storages.push(grouplets[src]);
      }
      continue;
    }
    // Ignore !implement lines (already handled)
    if (/^!implement\s+condition\s+(normal|looping)/i.test(line)) continue;
  }
  for (const r of runnerGrouplets) r.run();
}

// Output handling
function appendOutput(text) {
  const output = document.getElementById("output");
  output.innerText += (text !== undefined ? text : "") + "\n";
}

// Run Together code
window.runTogether = function() {
  const output = document.getElementById("output");
  output.innerText = "";
  try {
    const code = document.getElementById("editor").value;
    parseTogether(preprocess(code));
  } catch (e) {
    output.innerHTML = `<span class="error">Error: ${e.message}</span>`;
  }
};

// Optional: set monospace font-size via JS for mobile consistency
window.onload = function() {
  var editor = document.getElementById("editor");
  editor.style.fontSize = "0.92rem";
  editor.style.fontFamily = "monospace";
};

