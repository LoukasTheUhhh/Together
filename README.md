# Together
**Together**is a Programming Language project,where it aims to connect "grouplets",aka,groups of code,that work **together**.
Example Hello World Program:
```
a = action(Grouplet)
r = runner(Grouplet)
Process(Grouplet: a) {
  ++action start
  log("Hello World!")
  --action end
}
Process(Grouplet: r) {
  ++run start
  /run/ = <grouplets = a, r;functions = log()>
  run(/run/)
  --run end
}
Connect(Grouplet1: a, Grouplet2: r)
```
result:
```
Hello World!
```
Syntax and grammar can be found in the ``info`` folder.
