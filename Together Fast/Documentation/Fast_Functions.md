***
# Functions
In *Together Fast*,and basically any language,Functions are the little lines that are the code themself. They print, receive input, read data,etc.
***
## Function List
 Function | Use | Example
 --- | --- | ---
 `cs.` | Functions starting with this are part of the console category.
 `cs.log(any)` | Logs strings,numbers,variables,etc. | ``cs.log("Hello World!")``
 `cs.prompt(any)` | Logs something or not,then after lets user put some input. | ``cs.prompt("What's your name?\n")``
 `cs.read(null <-> int)` | Reads Either a specific line of the console,or if there is nothing specified,reads everything. | ``cs.read(4)``  | 
 `cs.delete(null <-> int)` | Deletes either a specific line of the console output,or if there is nothing specified,reads everything. | `cs.delete(4)`
 `t.` | Functions starting with this part are part of the type category.
 `t.str(any)` | Turns any non-string thing into a string. | `cs.log(t.str(395))`
 `t.int(any)` | Turns any non-integer thing into a integer,by its length. | `cs.log(t.int("four"))`
 `t.float(any)` | The same as `t.int(any)`,but with floats. | `x = t.float(3)`
 `t.bool(any)` | Turns positive values to `true`,neutral values to `maybe`, and negative values to `false`. | `cs.log(t.bool(" "))`
 `t.dict(any)` | Turns any non-dictionary thing into a dictionary. | `t.dict("hi")`
 `t.nullify(any)` | Nullify the value of anything. Just remove it. | `t.nullify(x)`
 ***
 ## Function Declaration
 To declare custom functions,you must use the ``dcl`` keyword.\
 Unlike other languages,to return a value to a function,we use the `take` keyword,like taking a t-shirt finishes your ``goshopping()`` function.\
 And,the take value is enclosed in `()`.\
 Also,for the content of the function,we just start it with a colon and end it with the `end` keyword.\
 Example:
 ```tgt
$$ this is a comment
!place cs $$ import the console and its functions
dcl greet(name): $$ declare a new function called greet()
  name = str $$ make sure the name argument is a strong
  buy ("Hello, " + name) $$ returns "Hello, " and the chosen name.
end $$ end the declaration
greet("Jeff") $$ greet Jeff

><
multiline
comment
><

><
Output:
Hello, Jeff!
><
```
***
