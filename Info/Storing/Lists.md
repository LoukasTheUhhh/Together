# Lists 
  Lists are like variables,but with multiple values in Together.
> [!NOTE]
> Lists are not supposed to be confused with **Shapes**,special,independent storing units.
## How they Work
  To make a list,you must put this line either in a Storage Grouplet,and then connect it to a runner to make it global,or just an action or runner,to make them local:
```together
/list/ = #value1, value2, value3, etc#
```
### Breakdown
  So,firstly,the list name is covered with / on both sides,to make it easier to spot what part are lists and what are not.
  Second,the list values are started with #,and ended with #,but only the first # for the first value in the front,and the second # for the last value in the back.
  all values can consist of these types:
  - "strings"/'strings'
  - \*integers\*
  - |floats|
  - \_booleans\_
  - [variables]
    
  But can NOT consist of these types:
  - Grouplets
  - Functions
***
### Indexing
To index variables,you must use the formula `/name/#int#`.
For this example,to index value1,we would use `/list/#0#`.
***
## Run Lists
  Run Lists are other,special versions of lists that are used STRICTLY for runners.
  They are the only way to make runner grouplets,well,run.
  To make one,open your script,and in the runner,put:
  ```together
  /run/ = @grouplets = Action, Storage;functions = log(), ask() $$etc.@
  run(/run/)
  ```
  They support ONLY grouplets and functions,and to use them,just add to the ``grouplets`` value all the types of grouplets you want to use,then a semicolon,then for functions,add to the ``functions`` keyword all the functions you want with their ( ) too.
  ******
