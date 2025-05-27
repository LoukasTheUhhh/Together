/*
JAVASCRIPT
*/
function runCode() {
  const language = document.getElementById("language").value;
  const code = document.getElementById("editor").value;
  const output = document.getElementById("output");

  output.textContent = ""; // Clear previous output

  if (language === "javascript") {
    try {
      // Capture console.log output
      let logBuffer = "";
      const originalLog = console.log;
      console.log = function(...args) {
        logBuffer += args.join(" ") + "\n";
        originalLog.apply(console, args);
      };
      eval(code);
      console.log = originalLog;
      output.textContent = logBuffer || "[No output]";
    } catch (e) {
      output.innerHTML = `<span class="error">Error: ${e.message}</span>`;
    }
  } else {
    output.textContent = "Language not supported yet.";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("language").addEventListener("change", function() {
    const lang = this.value;
    const editor = document.getElementById("editor");
    if (lang === "javascript") {
      editor.value = 'console.log("Hello from JavaScript!");';
    }
  });
});
/*
TOGETHER
*/
// --- Feature Flags ---
let enabledConditions = {
  normal: false,
  looping: false
};
let enabledTime = false;
let fastMode = false;

// --- Helper Functions ---
function checkFeatureImplementations(code) {
  enabledConditions.normal = false;
  enabledConditions.looping = false;
  enabledTime = false;
  fastMode = false;

  let lines = code.split('\n').map(l => l.trim());
  for (let line of lines) {
    if (/^!implement\s+condition\s+normal/i.test(line)) enabledConditions.normal = true;
    if (/^!implement\s+condition\s+looping/i.test(line)) enabledConditions.looping = true;
    if (/^!implement\s+time/i.test(line)) enabledTime = true;
    if (/^!implement\s+fastmode/i.test(line)) fastMode = true;
    if (/^!implement\s+FastMode/i.test(line)) fastMode = true; // Case-insensitive
  }
}

// --- Type-aware Value Evaluator ---
function evalValue(val, context) {
  val = val.trim();
  // List element access: /list/<index>
  let listMatch = /^\/(.+)\/<(\d+)>$/.exec(val);
  if (listMatch) {
    let [_, listName, idx] = listMatch;
    if (!(listName in context)) throw new Error(`List /${listName}/ is not defined.`);
    return context[listName][parseInt(idx)];
  }
  // Variable reference: [x]
  if (/^\[.+\]$/.test(val)) {
    let v = val.slice(1, -1);
    if (!(v in context)) throw new Error(`Variable [${v}] is not defined.`);
    return context[v];
  }
  // Float: |3.14|
  if (/^\|.*\|$/.test(val)) return parseFloat(val.slice(1, -1));
  // Integer: *2*
  if (/^\*.*\*$/.test(val)) return parseInt(val.slice(1, -1));
  // Booleans: _true_ _false_ _maybe_
  if (/^_true_$/.test(val)) return true;
  if (/^_false_$/.test(val)) return false;
  if (/^_maybe_$/.test(val)) return null;
  // Strings: "..." or '...'
  if (/^".*"$|^'.*'$/.test(val)) return val.slice(1, -1);
  if (!isNaN(val)) return Number(val);
  return val;
}

function extractBlock(lines, startIdx) {
  let block = [];
  let depth = 0;
  let started = false;
  for (let i = startIdx; i < lines.length; i++) {
    let l = lines[i].trim();
    if (l.endsWith('{')) {
      depth++;
      if (!started) {
        started = true;
        continue;
      }
    }
    if (started) block.push(l);
    if (l.endsWith('}')) {
      depth--;
      if (depth === 0) break;
    }
  }
  if (block.length && block[block.length - 1].endsWith('}')) block.pop();
  return block;
}

function runBlock(block, context) {
  for (let i = 0; i < block.length; i++) {
    let ag = new ActionGrouplet("block");
    ag.lines = [block[i]];
    ag.run(context);
  }
}

function preprocess(code) {
  code = code.replace(/\$\$.*$/gm, "");
  code = code.replace(/><[\s\S]*?><\s*/gm, "");
  return code;
}

// --- Interpreter Classes ---
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

      if (/^Else If\s*<(.+)>\s*=\?\s*<(.+)>\s*{/.test(line)) {
        throw new Error("Else If without preceding If block!");
      }
      if (/^Else\s*{/.test(line)) {
        throw new Error("Else without preceding If block!");
      }

      // During loop
      if (/^During\s*<(.+)>\s*=\?\s*<(.+)>\s*{/.test(line)) {
        if (!enabledConditions.looping)
          throw new Error("Looping conditions not enabled! Use !implement condition looping");
        const [, left, right] = line.match(/^During\s*<(.+)>\s*=\?\s*<(.+)>\s*{/);
        let block = extractBlock(this.lines, idx);
        let guard = 1000;
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

      // For loop
      if (/^For\s*\[(.+)\]\s*=\s*(.+),\s*\[(.+)\]\s*=\?\s*(.+),\s*(.+)$/.test(line)) {
        if (!enabledConditions.looping)
          throw new Error("Looping conditions not enabled! Use !implement condition looping");
        const [, vname, vstart, vcheck, vend, codeBlock] =
          line.match(/^For\s*\[(.+)\]\s*=\s*(.+),\s*\[(.+)\]\s*=\?\s*(.+),\s*(.+)$/);
        context[vname] = evalValue(vstart, context);
        let guard = 10000;
        while (context[vcheck] == evalValue(vend, context)) {
          runBlock([codeBlock], context);
          if (--guard <= 0) {
            appendOutput("Infinite loop guard triggered.");
            break;
          }
        }
        continue;
      }

      // log(time.now)
      if (/log\((.*)\)/.test(line)) {
        const arg = RegExp.$1.trim();
        if (arg === "time.now") {
          if (!enabledTime) throw new Error("Time features not enabled! Use !implement time");
          appendOutput(Date.now());
          continue;
        }
        // log(/list/<index>)
        if (/^\/(.+)\/<(\d+)>$/.test(arg)) {
          let [_, listName, idx] = arg.match(/^\/(.+)\/<(\d+)>$/);
          if (!(listName in context)) throw new Error(`List /${listName}/ is not defined.`);
          appendOutput(context[listName][parseInt(idx)]);
          continue;
        }
        // log([var]) or log("string")
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

      // wait(ms)
      if (/wait\((\d+)\)/.test(line)) {
        if (!enabledTime) throw new Error("Time features not enabled! Use !implement time");
        const ms = parseInt(RegExp.$1);
        const start = Date.now();
        while (Date.now() - start < ms) {}
        continue;
      }

      // Variable assignment
      if (/^\[(.+)\]\s*=\s*["*|_]?(.*?)["*|_]?$/ .test(line)) {
        const [, varName, varValue] = line.match(/^\[(.+)\]\s*=\s*["*|_]?(.*?)["*|_]?$/);
        context[varName] = evalValue(varValue, context);
        continue;
      }
      // Let [var] = *value*
      if (/^Let\s*\[(.+)\]\s*=\s*(.+)/.test(line)) {
        const [, varName, varValue] = line.match(/^Let\s*\[(.+)\]\s*=\s*(.+)/);
        context[varName] = evalValue(varValue, context);
        continue;
      }
      // List assignment: /myList/ = #val1, val2, ...#
      if (/^\/(.+)\/\s*=\s*#(.+)#$/.test(line)) {
        const [, listName, listVals] = line.match(/^\/(.+)\/\s*=\s*#(.+)#$/);
        context[listName] = listVals.split(',').map(e => evalValue(e.trim(), context));
        continue;
      }
      // Skip empty lines or comments
      if (line === "" || line.startsWith("++") || line.startsWith("--")) continue;

      throw new Error(`Unknown instruction or syntax: "${line}"`);
    }
  }
}

class StorageGrouplet {
  constructor(name) { this.name = name; this.vars = {}; }
  load(lines) {
    for (const line of lines) {
      // Variable assignment
      if (/^\[(.+)\]\s*=\s*["*|_]?(.*?)["*|_]?$/ .test(line)) {
        const [, varName, varValue] = line.match(/^\[(.+)\]\s*=\s*["*|_]?(.*?)["*|_]?$/);
        this.vars[varName] = evalValue(varValue, this.vars);
      }
      // List assignment
      if (/^\/(.+)\/\s*=\s*#(.+)#$/.test(line)) {
        const [, listName, listVals] = line.match(/^\/(.+)\/\s*=\s*#(.+)#$/);
        this.vars[listName] = listVals.split(',').map(e => evalValue(e.trim(), this.vars));
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

// --- Fast Mode Interpreter ---
function runFastMode(code) {
  const context = {};
  let lines = code.split('\n').map(l => l.trim());
  for (let line of lines) {
    // Skip Grouplet, Process, Connect declarations
    if (/=\s*(Action|Runner|Storage)\(Grouplet\)/i.test(line)) continue;
    if (/^Process\(/.test(line)) continue;
    if (/^Connect\(/.test(line)) continue;
    if (/^!implement\s+/i.test(line)) continue; // skip implement lines

    // Fast Mode: global storing (glb {keyword} {name} = {value})
    // glb var myvar = 10
    if (/^glb\s+(\w+)\s+(\w+)\s*=\s*(.+)$/i.test(line)) {
      // For now, {keyword} is informational, just store as variable or list
      const [, keyword, name, valueRaw] = line.match(/^glb\s+(\w+)\s+(\w+)\s*=\s*(.+)$/i);
      let value = valueRaw.trim();
      if (/^#.+#$/.test(value)) {
        // List: #a, b, c#
        context[name] = value.substring(1, value.length - 1).split(',').map(e => evalValue(e.trim(), context));
      } else {
        context[name] = evalValue(value, context);
      }
      continue;
    }

    // Variable assignment: [var] = value
    if (/^\[(.+)\]\s*=\s*["*|_]?(.*?)["*|_]?$/ .test(line)) {
      const [, varName, varValue] = line.match(/^\[(.+)\]\s*=\s*["*|_]?(.*?)["*|_]?$/);
      context[varName] = evalValue(varValue, context);
      continue;
    }
    // List assignment: /myList/ = #val1, val2, ...#
    if (/^\/(.+)\/\s*=\s*#(.+)#$/.test(line)) {
      const [, listName, listVals] = line.match(/^\/(.+)\/\s*=\s*#(.+)#$/);
      context[listName] = listVals.split(',').map(e => evalValue(e.trim(), context));
      continue;
    }
    // log(time.now)
    if (/log\((.*)\)/.test(line)) {
      const arg = RegExp.$1.trim();
      if (arg === "time.now") {
        if (!enabledTime) throw new Error("Time features not enabled! Use !implement time");
        appendOutput(Date.now());
        continue;
      }
      // log(/list/<index>)
      if (/^\/(.+)\/<(\d+)>$/.test(arg)) {
        let [_, listName, idx] = arg.match(/^\/(.+)\/<(\d+)>$/);
        if (!(listName in context)) throw new Error(`List /${listName}/ is not defined.`);
        appendOutput(context[listName][parseInt(idx)]);
        continue;
      }
      // log([var]) or log("string")
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
    // wait(ms)
    if (/wait\((\d+)\)/.test(line)) {
      if (!enabledTime) throw new Error("Time features not enabled! Use !implement time");
      const ms = parseInt(RegExp.$1);
      const start = Date.now();
      while (Date.now() - start < ms) {}
      continue;
    }
    // Let [var] = value
    if (/^Let\s*\[(.+)\]\s*=\s*(.+)/.test(line)) {
      const [, varName, varValue] = line.match(/^Let\s*\[(.+)\]\s*=\s*(.+)/);
      context[varName] = evalValue(varValue, context);
      continue;
    }
    // Skip empty lines or comments
    if (line === "") continue;
    throw new Error(`Unknown instruction or syntax: "${line}"`);
  }
}

function parseTogether(code) {
  checkFeatureImplementations(code);

  if (fastMode) {
    runFastMode(code);
    return;
  }

  const grouplets = {};
  const runnerGrouplets =

