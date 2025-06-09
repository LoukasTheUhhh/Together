******
# Together
![Insert Together Logo](Together.png)


**Together**is a Programming Language project,where it aims to connect "grouplets",aka,groups of code,that work **together**.
Example Hello World Program,In Together Fast:
```tgt
$$ this is a comment
!place cs $$ import console
cs.log("Hello World!") $$ logs "Hello World!"
```
Example Hello World Program,In Together Branch:
```tgt
$$ this is a comment
gl HelloWorld { $$ Creates an grouplet called HelloWorld,basically like a Java Class
  !place cs $$ import console
  sect main { $$ section for any type of code
    cs.log("Hello World!") $$ logs "Hello World!"
  }
}
```
Example Hello World Program,In Together Tree:
```tgt
$$ this is a comment
gl HelloWorld(action) { $$ Creates an Action Grouplet called HelloWorld
  !place cs $$ import console
  sect main { $$ section for any type of code
    cs.log("Hello World!")
  }
}
gl HelloRun(runner) { $$ Creates an Action Grouplet called HelloRun
  sect main { $$ section for any type of code
    df.run = instant $$ on RunTogether() inside HTML 
    df.acceptedr = any $$ make any type of code accepted
  }
}
Connection { $$ Connections make so that the code can actually run
  cn.gl1 = HelloWorld $$ the first grouplet to connect
  cn.gl2 = HelloRun $$ the second grouplet to connect
  cn.result = WorldRun $$ referenced with WorldRun
}
```
Example Hello World Program,In Together Merged:
```tgt
!mode merged
$$ this is a comment
gl HelloAction { $$ create a grouplet called HelloActoon
  Info { $$ type and packages
    info.type = Action $$ the grouplet is an action
    info.packages = cs $$ Add console functions
  }
  Process { $$ the code
    sect main { $$ section for any type of code
      cs.log("Hello World!") $$ log "Hello World!"
    }
  }
}
gl HelloRunner { $$ create a grouplet called HelloRunner
  Info { $$ type
    info.type = Runner
  }
  Process { $$ the code
    sect main { $$ section for any type of code
      df.run = instant $$ on RunTogether() inside HTML
      df.acceptedr = any $$ any type of code is accepted
    }
  }
}

Connection {
  cn.gl1 = HelloAction $$ the first grouplet to connect with
  cn.gl2 = HelloRunner $$ the second grouplet to connect with
  cn.result = ActionRunner $$ a new grouplet for referencing the result
}
$$ also can be done in the other versions by changing the !mode at the top to fast,branch or tree
```
result(for all versions):
```
Hello World!
```
Syntax and grammar can be found in the ``Documentation_(version)`` folder nested inside every version folder.
******
# PLEASE READ!!!
Together's Documentation and source code was all reset because of an burnout i had trying to finally make the parser.
Right now,Together's Source Code will be split into 4 parts:
  * Together Fast:Similar syntax and behavior to high-level languages like Javascript or Python. Made mainly for learning the hangs of programming programming languages.
  * Together Branch:Introduces grouplets and more customizabillity,kinda similar to a more complex language like Cpp or Java. Made mainly for learning how to make its standing-out syntax,and get more complex.
  * Together Tree:Introduces even more features and extra stuff,including Shapes. Made for actually distributing it and making it get used.
  * Together Merged:Introduces both Normal mode and Fast mode,having everything from previous versions. This is gonna be the big release.

These will all be made in the order they are listed.\
People are free to suggest features,help me or just support me.
******


