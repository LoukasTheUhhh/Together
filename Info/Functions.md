# Functions
Functions are the things that well,that happen during running. Here is an example:
```
goToMcdonalds(you, now)
arriveAtMcdonalds(you, now)
order.think(you)
order.know(you)
order.mcdonalds(you)
eat(order.mcdonalds(you))
```
***
## Function List
For a detailed function list,please head over [here](https://github.com/LoukasTheUhhh/Together/blob/main/Info/CheatSheet.md#the-function-cheat-sheet).
***
## Custom Functions
To declare a custom function in Together,you must use the keyword ``declare``:
```tgt
declare function(arg1: type, arg2: type) {
  $$put your function's code here
}
```
The code inside the {} is the function's behavior,what it does,what the arguments are,etc.
***
### Return
``return`` is the keyword for making function's do something,it is their value.
```tgt
declare add(x: int, y: int) {
  return x + y
}
``` 
Now,alot happened here.\
First off,we needed to specify the type of the arguments. in this case,both are integers.\
Then,we start defining the code of the function inside the {},where we put ``return x + y``.\\
This here means that the value of this function will be x and y\
A use for this function could be:
```tgt
log(add(1, 2))
$$logs 1 + 2,which is 3
```
***
### Callbacks
> [!WARNING]
> Callbacks only work when the condition feature is implemented,specifically looping.
> 
Callbacks,are different from other functions or callbacks from other language's callbacks.\
Instead,they are custom functions that basically call themselves,no need to put them in the code.\
They have an extra part to them,the ``whenActivate?``.\
the ``whenActivate?`` part is basically a condition,then the real code of the function is inside thst condition.\
Just so you know,Callbacks also need an ``Callback?: true`` argument,which is ignored as an argument,but still required for callbacks.\
Example:
```tgt
!implement condition looping
!implement time
...
declare greetEvery2Seconds(Callback?: true) {
  whenActivate? {
    vrb x = true
    During <x> =? true {
      Wait(2.0)
      log("Hi!")
    }
  }
}
```
***
