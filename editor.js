// Interpreter logic (with error reporting)
function preprocess(code) {
  code = code.replace(/\$\$.*$/gm, "");
  // Remove multi-line comments >< ... ><
  code = code.replace(/><[\s\S]*?><\s*/gm, "");
  return code;
}
class ActionGrouplet {
  constructor(name) { this.name = name; this.lines = []; }
  run(context) {
    for (const line of this.lines) {
      if (/log\((.*)\)/.test(line)) {
        const arg = RegExp.$1.trim();
        if (/^\[.*\]$/.test(arg)) {
          const varName = arg.slice(1, -1);
          appendOutput(context[varName]);
        } else {
          appendOutput(eval(arg));
        }
      }
      if (/^\[(.+)\]\s*=\s*["*]?(.*?)["*]?/.test(line)) {
        const [, varName, varValue] = line.match(/^\[(.+)\]\s*=\s*["*]?(.*?)["*]?$/);
        context[varName] = varValue;
      }
    }
  }
}
class StorageGrouplet {
  constructor(name) { this.name = name; this.vars = {}; }
  load(lines) {
    for (const line of lines) {
      if (/^\[(.+)\]\s*=\s*["*]?(.*?)["*]?/.test(line)) {
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
  const grouplets = {};
  const runnerGrouplets = [];
  let lines = code.split('\n').map(l => l.trim());
  let current = null;
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
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
    if (/^Process\((\w+)\)/.test(line)) {
      const name = line.match(/^Process\((\w+)\)/)[1];
      let block = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('}')) block.push(lines[i++]);
      if (grouplets[name] instanceof ActionGrouplet) grouplets[name].lines = block;
      if (grouplets[name] instanceof StorageGrouplet) grouplets[name].load(block);
      continue;
    }
    if (/^Connect\(([^,]+),\s*([^)]+)\)/.test(line)) {
      const [, src, runner] = line.match(/^Connect\(([^,]+),\s*([^)]+)\)/);
      if (grouplets[runner] instanceof RunnerGrouplet) {
        if (grouplets[src] instanceof ActionGrouplet) grouplets[runner].actions.push(grouplets[src]);
        if (grouplets[src] instanceof StorageGrouplet) grouplets[runner].storages.push(grouplets[src]);
      }
      continue;
    }
  }
  for (const r of runnerGrouplets) r.run();
}
// Output handling
function appendOutput(text) {
  const output = document.getElementById("output");
  output.innerText += (text !== undefined ? text : "") + "\n";
}
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

