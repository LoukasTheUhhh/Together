# Variables
**Together** Variables are different from your normal medium fry order at Mcdonalds.
******
## Local Variables
Local Variables can be used only inside the action they were made in,and maybe also in storage and runner elements if they were connected with that action.
Here is how to make one:
```
actionForVariables = Action(Grouplet)
Process(actionForVariables) {
  ++action start
  Vrb [localVariable] = "Hello World!"
  log([localVariable])
  --action end
}
```
Here,we created a Local Variable. These types of Variables can only be used inside of their desired action,and maybe outside of their action or connected grouplets.
******
## Global Variables
Global Variables can be used inside any grouplet,whether they are connected with the source grouplet(the one the variable is in) or not.
Global Variables are made inside the Storage Grouplet,and they become global after being connected with a runner.
Here is how to make one:
```
sFV = Storage(Grouplet)
Process(sFV) {
  ++start storage
  Vrb [globalVariable] = *2*
  ++end storage
}
rFV = Runner(Grouplet)
Process(rFV) {
  ++start runner
  /run/ = <variables, processors>
  run(/run/)
  ++end runner
}
Connect(sFV, rFV)
```
Now,you made your first global variable in **Together**!Congrats!
******
> [!NOTE]
> Variable names are always between [ ] &
Variables are declared with "Vrb".
  
