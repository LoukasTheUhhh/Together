export function tokenize(input) {
  const tokenSpecs = [
    ['CONDITION', /^\b(?:If|Else If|Else|During|For|Until|Run)\b/],
    ['KEYWORD', /^\b(?:return|shape|vrb|list|str|int|float|bool|declare|!place|!order)\b/],
    ['BOOLEAN', /^\b(?:true|false|maybe)\b/],
    ['NUMBER', /^-?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?/],
    ['STRING', /^"([^"\\]*(\\.[^"\\]*)*)"|^'([^'\\]*(\\.[^"\\]*)*)'/],
    ['OPERATOR', /^(?:\+-\+|-\+-|\+\+|<-\->|==\?|==|\?\?|!=|<=|>=|=|\+=|-=|\*=|\/=|%=|[<>+\-*\/=%])/],
    ['IDENTIFIER', /^[a-zA-Z_][a-zA-Z0-9_]*/],
    ['PUNCTUATION', /^[,:;{}()]/],
    ['WHITESPACE', /^\s+/]
  ];

  const tokens = [];
  let str = input;
  while (str.length > 0) {
    let matched = false;
    for (const [type, regex] of tokenSpecs) {
      const match = str.match(regex);
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
      throw new Error(`Unexpected token: '${str[0]}'`);
    }
  }
  return tokens;
}
export function getTokens() {
  const code = /*uhhhhh....where do i get it from? ._. */;
  return tokenize(code);
}
