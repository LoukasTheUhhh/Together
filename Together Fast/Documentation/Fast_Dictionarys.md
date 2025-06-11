***
# Dictionarys
Dictionarys are basically the "at home" version of Shapes,objects that can hold values in values in values in..you get the point.\
They are only in *Together Fast*,*Branch* and *Fruit*,while in *Tree* and *Merged* they are replaced by Shapes.
***
## What are Dictionarys?
Dictionarys are one of the three storing units that have values with values. They basically have their base,the dictionary itself,the words,the mini-variables that dictionarys hold,and the meanings,the value of those words.\
***
## How do i make an Dictionary?
To declare a dictionary,you must use the `dict` keyword.\
Here is the format of one:
```tgt
!place cs
dict waterTypes {
  flat = "Water without any sort of carbonation. This is the universal type of water,being liked no matter what. It is less nutritional for your body though,but not anything bad."
  sparkling = "Water with carbonation. This type of water is more popular in Europe,and more beneficial for your body. It takes time for you to actually like it,but if you do,its more refereshing than flat water."
}
cs.log(waterTypes[flat]) $$ logs the flat word's meaning
cs.log(waterTypes[sparkling]) $$ logs the sparkling word's meaning
```
Also,to reference words from a dictionary,use the format `dictionary[word]`.
***
