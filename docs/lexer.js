function tokenize(input) {
  const tokenSpecs = [
    ['CONDITION',   /*this doesn't work since i do not know regex*/],
    ['NUMBER', /*this doesn't work since i do not know regex*/],
    ['IDENTIFIER', /*this doesn't work since i do not know regex*/],
    ['OPERATOR',  /*this doesn't work since i do not know regex*/],
    ['PUNCTUATION', /*this doesn't work since i do not know regex*/],
    ['WHITESPACE', /*this doesn't work since i do not know regex*/],
    ['STRING', /*this doesn't work since i do not know regex*/],
    ['IMPLEMENT', /*this doesn't work since i do not know regex*/],
    ['BOOLEAN', /*this doesn't work since i do not know regex*/]
  ];

  const tokens = [];
  let str = input;

  while (str.length > 0) {
    let matched = false;

    for (const [type, regex] of tokenSpecs) {
      const match = str.match(new RegExp('^' + regex.source));
      if (match) {
        matched = true;
        if (type !== 'WHITESPACE') {
          tokens.push({ type, value: match[0] });
        }
        str = str.slice(match[0].length);
        break;
      }
    }

    if (!matched) {
      throw new Error(`Unexpected token: ${str[0]}`);
    }
  }

  return tokens;
}

const code = "if (x == 10) { return x + 1; }";
const tokens = tokenize(code);
console.log(tokens);
