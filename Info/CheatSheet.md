# Cheat Sheet
This is the Together Cheat Sheet,a giant file explaining everything shortly and briefly.
Also,this is the online place that covers operators,so you should read it.
> [!WARNING]
> It is recommended to use this only if you forgot a syntax or two,not for fully learning it.(Exception: Operators)\
> Instead,you should look at the individual files instead and,if you forget anything,come back here.
***
## The Function Cheat Sheet
 | Function | Syntax/Example | Use |
 | --- | --- | --- |
 | ``Process(gl)`` | ``Process(actiongl) {...}`` | To Define the code of an grouplet.|
 | ``Connect(gl1, gl2)`` | ``Connect(actiongl, runnergl)`` | To connect two grouplets. |
 | ``log(any)`` | ``log("Hello World!")`` | To log anything to the console. |
 | ``display()`` | ``display("Alert!Alert!")`` | To display a pop-up window for a message. |
 | ``prompt()`` | ``prompt("What's your name?")`` | To receive user input. |
 | ``type()`` | ``log(type("Heyo!"))`` | Doesn't do anything itself,just is the type of whatever is in the brackets. |
 | ``str()`` | ``log(str(1))`` | Turns any number,boolean or really anything except type-less things inside the brackets to be turned into a string inside the context. |
 | ``int()`` | ``prompt("Hey,you are " + int("17") + " years old,right?")`` | Turns any string into an integer if its a number in " ",but if its not a number,then it gives an error. Also displays floats rounded to their nearest number. For booleans, ``true`` is 1, ``maybe`` is 0 and ``false`` is -1.
 | ``float()`` | ``prompt("Hey,you are " + float(17) + " years old, right?")`` | Basically the same as ``int``,but for floats,and turns integers like ``3`` to ``3.0``. |
 | ``end()`` | ``end()`` | Ends the program. Any code beyond it is ignored. |
***
## The Logical Operator Cheat Sheet
 | Operator | Syntax/Example | Meaning |
 | --- | --- | --- |
 | ``+++`` | ``If <_maybe_> =? <_false_> +++ <*2*> =?? <*3*>`` | The logical AND Operator. |
 | `\\` | ``If <_true_> \\= <_false_>`` | The logical NOT Operator. |
 | `<-->` | ``Else If <_false_> =? <_true_> <--> <*2*> =? <*2*>`` | The logical OR Operator. |
***
## The Arithmetical Operator Cheat Sheet
 | Operator | Use |
 | --- | --- |
 | + | Just the addition operator.Used for adding or combining. |
 | - | Just the subtraction operator.Used for decreasing. |
 | * | Just the multiplication operator.Used for math normally. |
 | / | Just the division operator.Used for math normally. |
 | % | Just the remainder operator.Used for math normally. |
 | +-+| Just the increment operator.Used for storing,loops and math. |
 | -+- | Just the decrement operator.Used for storing,loops and math. |
***
## The Assignment Operator Cheat Sheet
 | Operator | Use |
 | --- | --- |
 | = | The OG equal sign.Does not need an explanation. |
 | == | The TRUE value assigner. Assigning a value to anything with makes the value unchangeable no matter what.Does NOT work with other assignment operators. |
 | += | Make a new value for something,then do addition with the old one.
 | -= | Make a new value for something,then do substraction with the old one.
 | *= | Make a new value for something,then do multiplication with the old one.
 | /= | Make a new value for something,then do division with the old one,keeping the result.
 | %= | Make a new value for something,then do divison with the old one,keeping the remainder.
 ***
 ## The Conditional Operator Cheat Sheet
  | Operator | Use |
  | --- | --- |
  | =? | The operator for checking only the value. |
  | =?? | The operator for checking both the value & the type. |
  | < | Smaller Than |
  | > | Greater than |
  | <= | Smaller Than or Equal To |
  | >= | Greater Than or Equal To |
  | ==? | The operator for checking the true value(from ==). |
  | ==?? | The operator for checking the true value(from ==) and the type. |
***
