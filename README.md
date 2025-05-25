# Together
**Together**is a Programming Language project,where it aims to connect "grouplets",aka,groups of code,that work nicely together.
Example Hello World Program:
```
start
a = action(Grouplet)
r = runner(Grouplet)
Process(Grouplet: a) {
  ++action start
  log("Hello World!")
  --action end
}
Process(Grouplet: r) {
  ++run start
  /run/ = <functions, processors>
  run(/run/)
  --run end
}
Connect(Grouplet1: a, Grouplet2: r) {
  **connect start
  connect_as = C 
  ::connect end
}
end
```
result:
```
Hello World!
```
Syntax and grammar can be found in the ``info`` folder.
