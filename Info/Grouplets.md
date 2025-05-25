# Grouplets
**Grouplets** are the beating heart of Together. They are special code snippets of different types that eother define code,run code,store stuff or more.
******
## Types
<ins>Grouplets</ins> have the following types:
* Actions(They define the ran code)
* Runners(They run the defined code)
* Storages(They store global variables,lists and more)
## Categories
There are also **two _main_ stages**:
* Proccesses(The defining of the code)
* Connecting(The running of the code)
******
## How They Work(Proccesses)

### Action Grouplets
Action Grouplets are the blood of the Grouplets,inside them are all normal code you want to run,want to test.
Here is how to make one:
```

$$This is a comment
Dave = Action(Grouplet)
Process(Dave) {
  ++action start $$Start the defining of the action
  log("Hi there!") $$Logs "Hi there!"
  log("Hi there,again!") $#Logs "Hi there,again!"
  --action end $$Ends the defining of the action
}

```
******
### Runner Grouplets
Runner Grouplets are grouplets that run Action and Storage grouplets when connected with them.
Here is how to make one:
```

Davis = Runner(Grouplet)
Process(Davis) {
  ++run start $$Start the running
  /run/ = <proccesors, functions> $$Define the ran parts,proccesors being the connections and the procceses,plus the ++example start and -- example end
  run(/run/) $$Run the parts from the running list
  --run end $$Stop the running
}

```
******
### Storage Grouplets
Storage Grouplets are grouplets that store global variables,lists and more.The variables will not be global until it is connected with a runner.
Here is how to make one:
```

David = Storage(Grouplet)
Process(David) {
  ++storage start $$start the storage
  [teddyBear] = *2* $$Variables are always surrounded by [],and integers + floats by * *.
  /toys/ = ["Train", _true_, *7.1*] $$Lists are always surrounded by / /,and booleans by _ _.
  --storage end $$end the storage
}

```
******
******
## How they Work(Connections)
Connections are when we use the Connect() function to connect two grouplets,so they can work together. Now,let's grab our Grouplets we made earlier, and "connect" them.
```

Connect(Dave, Davis) { $$connect between Dave and Davis
  **connect start $$starts the connect
  connect_as = [James] $$create a new variable to be referenced as the connect
  ::connect end $$ends the connect
}

><
Output:
Hello World!
><
Connect(David, Davis) { $$connect between David and Davis
  **connect start
  connect_as = [Jessica]
  ::connect end
}

><
Output:
$$Created Variable [teddyBear]
$$Created List /toys/
><

```
******
  
