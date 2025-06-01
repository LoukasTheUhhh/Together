//tokenize
function tokenize(input) {
  //token types and regexes
  const tokenSpecs = [
    ['CONDITION', /^\b(?:If|Else If|Else|During|For)\b/],
    ['KEYWORD', /^\b(?:return|shape|vrb|list|str|int|float|bool|Action|Runner|Storage|Grouplet|declare|!implement)\b/],
    ['BOOLEAN', /^\b(?:true|false|maybe)\b/],
    ['NUMBER', /^-?(?:\d*\.\d+|\d+)(?:[eE][+-]?\d+)?/],
    ['STRING', /^"([^"\\]*(\\.[^"\\]*)*)"|^'([^'\\]*(\\.[^'\\]*)*)'/],
    ['OPERATOR', /^(?:\+-\+|-\+-|\+\+|<-\->|==\?|==|\?\?|!=|<=|>=|=|\+=|-=|\*=|\/=|%=|[<>+\-*\/=%])/],
    ['IDENTIFIER', /^[a-zA-Z_][a-zA-Z0-9_]*/],
    ['PUNCTUATION', /^[,:;{}()]/],
    ['WHITESPACE', /^\s+/]
  ];

  const tokens = [];
  let str = input;
//flag matched false when the input has something in it
  while (str.length > 0) {
    let matched = false;
//class the tokens
    for (const [type, regex] of tokenSpecs) {
      const match = str.match(regex);
      if (match) {
        matched = true;
        //check if the space contains whitespace only or characters too
        if (type !== 'WHITESPACE') {
          tokens.push({ type, value: match[0] });
        }
        str = str.slice(match[0].length);
        break;
      }
    }
//error
    if (!matched) {
      throw new Error(`Unexpected token: '${str[0]}'`);
    }
  }
//complete the function
  return tokens;
}
//define the tokenized part
let code = document.getElementById("editor");
const tokens = tokenize(code);
//finally tokenize the code
console.log(tokens);
