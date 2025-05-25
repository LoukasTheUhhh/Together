import {EditorView, basicSetup} from "https://esm.sh/@codemirror/basic-setup@6";
import {EditorState} from "https://esm.sh/@codemirror/state@6";
import {HighlightStyle, tags as t} from "https://esm.sh/@codemirror/highlight@6";
import {StreamLanguage} from "https://esm.sh/@codemirror/language@6";

// Enhanced Together syntax highlighter with proper multi-line comments!
const togetherLang = StreamLanguage.define({
  startState() { return { inBlockComment: false }; },
  token(stream, state) {
    // Handle multi-line block comments: >< ... ><
    if (state.inBlockComment) {
      if (stream.match("><")) {
        state.inBlockComment = false;
        return "comment";
      }
      stream.skipToEnd();
      return "comment";
    }
    if (stream.match("$$")) { stream.skipToEnd(); return "comment"; }
    if (stream.match("><")) {
      state.inBlockComment = true;
      stream.skipToEnd();
      return "comment";
    }
    if (stream.match(/"(?:[^"\\]|\\.)*"?/)) return "string";
    if (stream.match(/\b(Action|Runner|Storage|Process|Connect|Grouplet|start|end|Let)\b/i)) return "keyword";
    if (stream.match(/\b(log|run|Process|Connect)\b/)) return "builtin";
    if (stream.match(/\+\+action start|\-\-action end|\+\+run start|\-\-run end|\+\+storage start|\-\-storage end|\*\*connect start|::connect end/)) return "atom";
    if (stream.match(/\[[a-zA-Z0-9_]+\]/)) return "variableName";
    if (stream.match(/\/[a-zA-Z0-9_]+\//)) return "variableName.special";
    stream.next();
    return null;
  }
});

// Highlight style
const togetherHighlight = HighlightStyle.define([
  {tag: t.keyword, color: "#ffb454", fontWeight: "bold"},
  {tag: t.comment, color: "#5c6370", fontStyle: "italic"},
  {tag: t.string, color: "#9ecbff"},
  {tag: t.variableName, color: "#b5e853"},
  {tag: t.atom, color: "#f087bd"},
  {tag: t.special(t.variableName), color: "#ffd700"},
  {tag: t.literal, color: "#d19a66"},
  {tag: t.number, color: "#d19a66"},
  {tag: t.operator, color: "#f44747"}
]);

// Initial Together code
const initialCode = `
a = Action(Grouplet) $$ Action grouplet
Process(a) {
  ++action start
  [message] = "Hello, World!"
  log([message])
  --action end
}

><
This is a multi-line comment!
It will be highlighted correctly :)
><

r = Runner(Grouplet)
Process(r) {
  ++run start
  /run/ = <a>
  run(/run/)
  --run end
}
Connect(a, r)
`;

// Create the editor
window.editorView = new EditorView({
  state: EditorState.create({
    doc: initialCode,
    extensions: [
      basicSetup,
      togetherLang,
      togetherHighlight
    ]
  }),
  parent: document.getElementById("editor")
});

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
    const code = window.editorView.state.doc.toString();
    parseTogether(preprocess(code));
  } catch (e) {
    output.innerHTML = `<span class="error">Error: ${e.message}</span>`;
  }
};
