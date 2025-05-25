# Conditions
**Conditions** are a implemented feature from Together,like fmt. from Go.\
They are like the Coca Cola drink on the side at your Mcdonalds order.
******
## How to implement them
To implement them,you must run the following line of code at the top:
```
!implement condition (type)
$$replace "(type)" with either "normal" or "looping"
```
It basically tells the computer to start taking in account all conditions.\
If you use a condition without mentioning this,it will give you an error.\
> [!NOTE]
> Choosing to import normal conditions only imports the normal ones,and looping,the loop ones.\
You need to write two lines for importing both types.
******
## Condition List
 | **Normal** | ***Looping*** |
 | :---  | ---: |
 | If   | *During* |
 | Else If | *For* |
 | Else | 
******
## How to use Normal Conditions
### If and Else Condition
```tgt
ex = Action(Grouplet)
Process(ex) {
  ++action start
  Let [var] = *7*
  If <[var]> =? <*7*> {
    log("Success!")
  } Else {
    log("Failure..")
  --action end
  }
}
```
Now,we declare a variable called "var" inside of the action "ex", then we put our first condition,
`If <[var]> =? <*7*> {`.This seems complex at first,but its actually really simple.the If is to begin the condition,the compared values are surrounded by <>,and =? is a assignment operator for checking values inside comparisons,but not types[^1].\
By the way,integers[^2] and floats[^3] are simply always surrounded by * *,just so you know.\
Then,if this condition is true,it logs "Success!",if not,it triggers the Else statement and it logs "Failure..".
******
### Else If Condition
```tgt
ex = Action(Grouplet)
Process(ex) {
  ++action start
  If <"String"> =?? <'String'> {
    log("Hello World!")
  }
  Else If <"String" =? <'String'> {
    log("No, World!")
  }
  --action end
}
```
Here,we meet a new opponent: =??.\
It basically checks if the comparison values of the same value AND type.\
So,the Else If does work since the value of both is the same,but If will be false since " " and ' ' are different types of strings.\
Me brain hurts.\
So,basically,the result will be ``No, World!``.
******
## How to Use Looping Conditions
### During Condition
```tgt
ex = Action(Grouplet)
Process(ex) {
  ++action start
  Let [x] = "str"
  During <[x]> =? "str" {
    log("Yay!")
  }
}
```
This here is an **infinite loop**.It runs for infinity time,because nothing is making the condition stop.Here, It will keep logging ``Yay!`` over and over again,like this:
```tgt
Yay!
Yay!
Yay!
Yay!
Yay!
Yay!
$$ etc.
```
(It won't actually say ``$$ etc.``,i just got time to write Yay! infinite times.)
******
### For Condition
Now,for this one,i will not elaborate,instead,i want YOU to find out what it does.\
This is pretty simple to understand,due to how it is used in other languages too,with the same name.
******
[^1]: Booleans,strings,integers,floats,etc.
[^2]: Any type of number without decimals.
[^3]: Any type of number with decimals.

