# Shapes
Shapes are the most complex storing units there ever is and will be. They have values inside of values inside of values inside of...you get what i mean.
***
## How to Make One
Here is a example format for shapes:
```together
--Dave-- = {
  "General_Stuff" {
    vrb [Age] = 13
    vrb [Height] = 5.1
    list /Parents/ = #"Emily", "Johnathan"#
    vrb [Family] = "Smith"
  }
  *1* {
    *2* {
      *3* {
        *4* {
          *5* {
            vrb [Limit] = "This is the nesting limit."
            vrb [Welcome] = "Heyo!"
              }
            }
          }
        }
      }
  |7.0| {
    "This has only one value,but it is acceptable"
  }
}
```
> [!NOTE]
> This format isn't needed or fixed-it's just an example. Your Real shape shouldn't be THIS long.

> [!NOTE]
> The maximum nest limit is 5 nests.(like,in eachother,not the amount of nests)
***
## What They can Contain
Shapes can contain several different stuff,like variables,lists,integers,floats,booleans,strings,and more.
But can NOT contain functions or grouplets.
***
## Why Use Them
Shapes are ideal for front-end databases,indexes,organizing,and more.
You can make a seperate file,like ``database.together``,then,make an shape that can contain evey variable,every list,every string,like:
```together
shape --database-- {
  "variables" {
    vrb [gravity] = *9*
    vrb [walkspeed] = *10*
    vrb [runspeed] = *15*
    vrb [jumpheight] = *8*
  }
  "lists" {
    /characters/ = #"Davis", "Henry", "Super Evil Johnny", "Jane"#
    /errors/ = #"Forgotten brackets","Unexpected end of piece","function is undefined","variable has unproper value"#
  }
}
```
***
