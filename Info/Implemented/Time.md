# Time
Time is a implemented feature that allows to make pauses between code. Like how you need to go to the toilet before eating more Mcdonalds.
******
## How to Implement Time
Simply run this line of code below to implement the time feature:
```Together
!implement Time
```
> [!WARNING]
> Using parts of the Time feature without implementing it cause an error.
******
## Time Features
- ``Wait(Amount: Integer)``
  - ``Amount``:The amount of seconds to wait in.
  - Waits (Amount) Second(s) before running more code.
  - Example Use:
    ```Together
    !implement Time
    ex = Action(Grouplet)
    Process(ex) {
      ++action start
      log("Wait...")
      Wait(S, 5) {
        log("Suprise!")
      }
      --action end
    }
    ```
- ``CTime(Type: AM/PM or ML)``
  - ``Type``:The type of the time given(Options: AM/PM, ML)
  - Gives the current time,either in AM/PM format or Millitary time.
  - Example use:
    ```Together
    x = Action(Grouplet)
    Process(x) {
      ++action start
      [y] = CTime(ML)
      log([y])
      --action end
    }
    ```
    ******
