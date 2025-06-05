local function tokenize(input)
  local tokenSpecs = {
    {"CONDITION", "^%b(If|Else If|Else|During|For)"},
    {"KEYWORD", "^%b(return|shape|vrb|list|str|int|float|bool|Action|Runner|Storage|Grouplet|declare|!implement)"},
    {"BOOLEAN", "^%b(true|false|maybe)"},
    {"NUMBER", "^-?(%d*%.%d+|%d+)([eE][+-]?%d+)?"}, 
    {"STRING", "^\"([^\"]*\\.[^\"]*)\"|^'([^'\\]*(\\.[^'\\]*)*)'"},
    {"OPERATOR", "^(%+%-+|%-+%+|%+%+|<%-+->|==%?|==|%?%?|!=|<=|>=|=|%+=|%-=|%*=|%/=|%%=|[<>%+%-*/=])"},
    {"IDENTIFIER", "^[a-zA-Z_][a-zA-Z0-9_]*"},
    {"PUNCTUATION", "^[,:;{}()]"},
    {"WHITESPACE", "^%s+"}
  }

  local tokens = {}
  local str = input
  while #str > 0 do
    local matched = false
    for _, spec in ipairs(tokenSpecs) do
      local type, regex = spec[1], spec[2]
      local match = str:match(regex)
      if match then
        matched = true
        if type ~= "WHITESPACE" then
          table.insert(tokens, {type = type, value = match})
        end
        str = str:sub(#match + 1)
        break
      end
    end
    if not matched then
      error("Unexpected token: '" .. str:sub(1, 1) .. "'")
    end
  end
  return tokens
end

local function getTokens()
  local code = document.getElementById("editor").value
  return tokenize(code)
end


