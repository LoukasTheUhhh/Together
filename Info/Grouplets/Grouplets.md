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
## How They Work


### Action Grouplets
Action Grouplets are the blood of the Grouplets,inside them are all normal code you want to run,want to test.
Here is how to make one:
******
```

>>This is a comment<<
Dave = Action(Grouplet)
Process(Dave) {
  ++action start >>Start the defining of the action<<
  log("Hi there!") >>Logs "Hi there!"<<
  log("Hi there,again!") >>Logs "Hi there,again!"<<
  --action end >>Ends the defining of the action<<
}

```
******


