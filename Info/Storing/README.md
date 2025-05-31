# Storing Units
Storing Units are a class of types that have their sole purpose for storing values,databases,and more.
***
## Variables
### Short Explanation
  * Variable names are covered in [].
  * Variables are declared with the ``vrb`` keyword.
  * To make global variables,you must put them in a Storage Grouplet and connect to a Runner Grouplet.
### Example
  ```tgt
  vrb [Johnny] = "Hiiii"
  vrb [Carla] == "Heyyyy"
  ```
***
## Lists
### Short Explanation
  * List names are covered in /.
  * Lists are declared with the ``list`` keyword.
  * To index,you must use the formula ``/listName/#int#``
  * To make global lists,you must put them in a Storage Grouplet and connect it with a Runner Grouplet.
  * The list value section is covered in #.
### Example
```tgt
list /toys/ = #"hi", "hey", "hello", "howdy", "wassup"# $$declare list
/toys/#1# = "goodbye" $$index and change the value "hey" to "goodbye"
```
***
## Shapes
### Short Explanation
  * Shapes are complex storing units that can store hundreds of values.
  * They can contain both variables and lists inside them.
  * They can contain every type except grouplets or functions.
  * They can contain values inside of eachother.
  * Declared with the ``shape`` keyword.
  * Shape names are covered in --.
### Example
```tgt
shape --Exercise1-- {
  "data" {
    vrb [carrots] = *6* 
    vrb [tomatoes] = *5* + [carrots] 
    vrb [lettuce] = [tomatoes] - *3* 
    vrb [cucumbers] = [carrots] + [tomatoes] + [lettuce] 
    vrb [time] = *6* $$ months
  }
  "a" {
    vrb [questionA] = "How many cucumbers are there?"
    vrb [answerA] = *25*
  }
  "b" {
    vrb [questionB] = "How many of these vegetables total would be gotten in 12 months?"
    vrb [answerB] = *100*
  }
}
```
***
