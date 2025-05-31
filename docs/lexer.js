function tokenize(input) {
  const tokenSpecs = [
    ['CONDITION', /\b(?:If|Else|Else If|During|For)\b/],
    ['NUMBER', /-?\d+(\.\d+)?/],
    ['IDENTIFIER', /[a-zA-Z_]+/],
    ['OPERATOR', /[<>]=?|==?\?{1,2}|[+\-*/%=]|(?:\+-\+|-\+-|\+\+|<\-\->|\\\\|==|\*=|\+=|-=|%=|/=)/],
    ['PUNCTUATION', /[:,;{}()]/],
    ['WHITESPACE', /\s+/],
    ['STRING', /(["'])(.*?)\1/g],
    ['IMPLEMENT', /\b(?:return|shape|vrb|list|str|int|float|bool|Action|Runner|Storage|Grouplet|declare|\!implement)\b/],
    ['BOOLEAN', /\b(?:true|false|maybe)\b/]
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

let code = document.getElementById("editor");
const tokens = tokenize(code);
console.log(tokens);
