# Together
**Together**is a Programming Language project,where it aims to connect "grouplets",aka,groups of code,that work **together**.
Example Hello World Program:
```
a = action(Grouplet)
r = runner(Grouplet)
Process(Grouplet: a) {
  ++start
  log("Hello World!")
  --end
}
Process(Grouplet: r) {
  ++start
  /run/ = @grouplets = a, r;functions = log(), Process(), Connect()@
  run(/run/)
  --end
}
Connect(Grouplet1: a, Grouplet2: r)
```
result:
```
Hello World!
```
Syntax and grammar can be found in the ``info`` folder.
