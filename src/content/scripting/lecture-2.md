---
title: 'Maya Scripting Lecture 2 Notes'
pubDate: 2024-06-09
description: 'This is the first post of my new Astro blog.'
author: 'Chad Elofson'
image:
  url: 'https://docs.astro.build/assets/full-logo-light.png'
  alt: 'The full Astro logo.'
tags: ["Maya", "Python"]
---

# REVIEW SESSION 05

## CONNECTING FUNCTION TO A WINDOW
```python
def matchTranslate(*args):
    #make sure to use * args to pass a window element
    childObj= cmds.ls(sl=True)
    parentObj = cmds.ls(sl=True, tl=1)
    cmds.matchTransform(parentObj, childObj, pos=True)
def undoTrans(*args):
    cmds.undo()
```

### MAKE SURE TO DEFINE YOUR FUNCTION BEFORE THE WINDOW AND CONNECTING TO A BUTTON

# WINDOW UI

## create a condition to reset and update the windowUI
```python
if cmds.window("functools", ex=True):
    cmds.deleteUI("functools")
# object names given to a window element will be important in the coming lessons and assignments
# object name give a unique designation to our element which we can identify.

cmds.window("functools", t="FUNCTION TOOL!")
cmds.columnLayout()
# columnLayout will act as master Layout

cmds.rowColumnLayout(nr=1, co=[[1,"both",5],[2,"both",5],[3,"both",5]])
# rowColumnLayout cannot operate without a columnLayout
# watch out for multiple arguments in flags

cmds.checkBox(l="MatchT", w=100, h=50, bgc=[0.8,0,0],onc=matchTranslate,ofc=undoTrans)
#window elements such as checkboxes will have broader functions and applications besaides just calling a function
cmds.checkBox(l="MatchR", w=100, h=50, bgc=[0,0.8,0])
cmds.checkBox(l="MatchS", w=100, h=50, bgc=[0,0,0.8])

cmds.setParent("..")

cmds.rowColumnLayout(co=[[1,"both",5]], ro=[[1,"both",5],[2,"both",5]])

cmds.button(l="Match All Transforms", w=320,h=60)
cmds.button(l="Zero All Transforms", w=320,h=60)

cmds.setParent("..")

cmds.showWindow("functools")
```

### MAKE SURE TO FINISH WITH A SHOW WINDOW COMMAND TO VISUALIZE YOUR WINDOW.

### WARNING!!! THIS IS NOT THE COMPLETE ASSIGNMENT, BUT A PARTIAL EXAMPLE OF YOUR ASSIGNMENT.

### EXTRACT VALUES AND DATA FROM UI ELEMENTS/CONTROLS


If we wish to understand how to extract data from outside of the script editor,
we need to understand Python as a basic function.

All data in python is an object.
As an object, it can be created, edited and/or queried.

### What is Querying?
Querying is a method to extract data from a particular object,
as a result, window elements, such as a checkBox IS AN OBJECT.

There are generally two ways to extract a data from an object:
1. using a return keyword inside of a function.
2. using Query mode: which  will allow us to return the data of attribute within an object.


 if we use the cmds.ls, it will return the name of our selected object.
```python
selection= cmds.ls(sl=True)
#"pCube1"
```


if we wish to extract the value of an attribute, we will use the query flag,
to put the command in Query Mode and state the attribute of the command so long as it is queryable:
```python
box =  cmds.polyCube(selection,query=True,height=True)
#queries can only apply with one attribute
#queries oonly work with falgs that queryable.
#use True keywords in query and attirbute flags to extract the data.
print(box)

#Since we can Query  any objectt, it means we can query the state of a window element(checkBox)

def setTransform(*args):
    if cmds.checkBox("trans_cb", query=True,value=True):
        print("Translate is connected!")
    if cmds.checkBox("rot_cb", query=True,value=True):
        print("Rotation is connected..")
    if cmds.checkBox("scl_cb", query=True,value=True):
        print("Rotation is connected..yes")


cmds.window(w=600, t="Querying Checkboxes")
cmds.columnLayout()

cmds.rowColumnLayout(nc=3, co=[[1,"left",5],[2,"both",5],[3,"right",5]], ro=[1,"both",5])

#in order to properly query our individual checkboxes,
#we need to give object names to our checkBoxes
cmds.checkBox("trans_cb", l="TRANSLATE", w=200,h=50)
cmds.checkBox("rot_cb", l="ROTATE", w=200,h=50)
cmds.checkBox("scl_cb", l="SCALE", w=200,h=50)

cmds.setParent("..")

cmds.button(w=600, l="EXECUTE CHECKBOX VALUES", h=50,c=setTransform )
cmds.showWindow()
```



# EXCERCISE 10 Min

create a window ui with three checkboxes and a button.
query the checkboxes in a function and depending on their value, create a polygon.
connect the function to the button:
```python
cmds.window(w=600, t="QUERYING CHECKBOXES")
cmds.columnLayout()

cmds.rowColumnLayout(nc=3, co=[[1,"left",5],[2,"both",5],[3,"right",5]], ro=[1,"both",5])

cmds.checkBox("box", w=200,h=50,l="Create box")
cmds.checkBox("can", w=200,h=50,l="create can")
cmds.checkBox("ball", w=200,h=50,l="create ball")

cmds.setParent("..")
cmds.button(w=600, l="EXECUTE CHECKBOX VALUES", h=50, c=create_obj)
cmds.showWindow()

#EDIT OBJECTS WITH EDIT MODE

"""
Just like query mode, we can change the data of an object with edit mode.
In order ofr edit mode to work, object has to exist.
unlike query can edit multiple attributes in one edit line
"""
def check_ON(*args):
    cmds.checkBox("box", edit=True, value=True, bgc=[1,0,0])
    cmds.checkBox("can", edit=True, value=True, bgc=[1,0,0])
    cmds.checkBox("ball", edit=True, value=True, bgc=[1,0,0])
def check_OFF(*args):
    cmds.checkBox("box", edit=True, value=False, bgc=[0.4,0.4,0.4])
    cmds.checkBox("can", edit=True, value=False, bgc=[0.4,0.4,0.4])
    cmds.checkBox("ball", edit=True, value=False, bgc=[0.4,0.4,0.4])

def create_obj(*args):
    if cmds.checkBox("box", query=True,value=True):
        cmds.polyCube(n="BOX", w=3,h=2,d=4)
    if cmds.checkBox("can", query=True,value=True):
        cmds.polyCylinder(n="CAN",r=2 ,h=4)
    if cmds.checkBox("ball", query=True,value=True):
        cmds.polySphere(n="BALL", r=2)


cmds.window(w=600, t="EDIT CHECKBOXES")
cmds.columnLayout()

cmds.button(l="CHECKMARK ALL", w=600, h=40, c= check_ON)
cmds.button(l="CHECKMARK NONE", w=600, h=40, c= check_OFF)

cmds.rowColumnLayout(nc=3, co=[[1,"left",5],[2,"both",5],[3,"right",5]], ro=[1,"both",5])

cmds.checkBox("box", w=200,h=50,l="Create box")
cmds.checkBox("can", w=200,h=50,l="create can")
cmds.checkBox("ball", w=200,h=50,l="create ball")

cmds.setParent("..")
cmds.button(w=600, l="EXECUTE CHECKBOX VALUES", h=50, c=create_obj)
cmds.showWindow()
```

Edit mode can apply to a flag that have edit icons in the properties tabs in the command documentation.
the edit flag does need to be first flag in a command,
because it is a named argument and can be positioned anywhere within the tuple after the positional argument.


# RENAME AN OBJECT WITH TEXFIELD


The textField is a window control element that can be used to input string text.
there are other similar window controls such as intFields or floatFields, but they will only allow inputs based on either integers and floats.
since the textField will return a string when queried, we can use it to rename selected objects.
```python
def rename_selected(*args):
    new_name = cmds.textField("text_name",q=True, tx=True)
    for obj in cmds.ls(sl=True):
        cmds.rename(obj, new_name)



cmds.window(t="Textfield Example")

cmds.columnLayout()
cmds.rowColumnLayout(nr=1, ro=[1,"both",10], co=[[1,"both",5],[2,"both",5]])

cmds.textField("text_name", w=400, h=30, pht="input text only", tx="TEXT")
cmds.button(l="EXECUTE RENAME", w=200, h=50, c=rename_selected)
cmds.showWindow()
```



if we select multiple object to rename, the subsequent object will be added with a number in index fashion
since many object naming conventions follow variables naming rules, make sure to make sure to make the proper input when using textFields
you can input numbers, but will return as a string
if you want different data type inputs, use different field commands.


# OPTION MENUS IN UI CONTROLS

### optionMenu will create dropdown option menu for you choose a preset amount of elements
```python
cmds.window(t="WHAT IS YOUR FAVOURITE COLOR", w=500)

cmds.columnLayout()
cmds.optionMenu()

cmds.showWindow()
# inorder for an optionMenu to work, we need to add menuItems

cmds.window(t="WHAT IS YOUR FAVOURITE COLOR", w=500)

cmds.columnLayout()

cmds.optionMenu(l="COLOR:")

cmds.menuItem(l="Yellow")
cmds.menuItem(l="Purple")
cmds.menuItem(l="Blue")
cmds.menuItem(l="African Swallow")

cmds.showWindow()

#menuItems will automatically parent under the immediate optionMenu, so no setParent command is required to parent.
#in order to use menuItems for renaming, we will need to query the option Menu

def printMenu(*args):
    item= cmds.optionMenu("option", q=True, v=True)
    for obj in cmds.ls(sl=True):
        cmds.rename(obj, item)


cmds.window(t="WHAT IS YOUR FAVOURITE COLOR", w=500)

cmds.columnLayout()
cmds.rowColumnLayout(nr=1, co=[[1,"both",5],[2,"both",5]])

cmds.optionMenu("option",l="COLOR:", w=300)

cmds.menuItem(l="Yellow")
cmds.menuItem(l="Purple")
cmds.menuItem(l="Blue")
cmds.menuItem(l="African Swallow")

cmds.button(l="RENAME", w=200, h=50, c=printMenu)
cmds.setParent("..")

cmds.showWindow()
```


# COMBINING CONTROLS INTO ONE RENAMING FUNCTION
```python
def rename_func(*args):
    prefix= cmds.optionMenu("pref",q=True, v=True)
    txtname= cmds.textField("name",q=True, tx=True)
    suffix= cmds.optionMenu("suff",q=True, v=True)
    print(prefix,txtname,suffix)
    newName= prefix +"_"+ txtname +"_"+ suffix
    print(newName)
    for obj in cmds.ls(sl=True):
        cmds.rename(obj, newName)



if cmds.window("win", ex=True):
    cmds.deleteUI("win")
cmds.window("win", t="Combined Rename Window Example")


cmds.columnLayout()
cmds.rowColumnLayout(nc=4,co=[[1,"both",5],[2,"both",5],[3,"both",5],[4,"both",5]])

cmds.optionMenu("pref", l="PREFIX:", h=50,w=200)
cmds.menuItem(l="left")
cmds.menuItem(l="center")
cmds.menuItem(l="right")

cmds.textField("name", pht="input text name",w=200)

cmds.optionMenu("suff", l="SUFFIX:", h=50,w=200)
cmds.menuItem(l="Ctrl")
cmds.menuItem(l="Geo")
cmds.menuItem(l="Joint")

cmds.button(l="RENAME", w=200, h=50, bgc=[0.5,0.5,0.5],c=rename_func)
cmds.setParent("..")


cmds.showWindow("win")
```


# REVIEWING SESSION 06

## QUERY OBJECTS

any object in python is to some degreee Queryable.
we can use data queried from an object to be used in any methods that we write up.
window elements such as checkboxes  and optionMenus are also OBJECTS.

in order for a query to be made:
- the object has to exist
- state the object command and object name attatched to it.
    ```python cmds.polyCube("pCube1", query=True, width=True)```
 - since queries return a single data you can put them into variables
 - OR
 - use the cmds.ls(sl=True) to list the object
 - then filter the items into singular variables using loops/

## OPTIONMENU AND TEXTFIELDS
```python 
if cmds.window("win", ex=True):
    cmds.deleteUI("win")

cmds.window("win", t="OPTIONMENU AND TEXTFIELD EXAMPLE")

cmds.columnLayout()
cmds.rowColumnLayout(nc=4)

cmds.optionMenu("optionsA", w=200)
cmds.menuItem(l="one")
cmds.menuItem(l="two")
cmds.menuItem(l="three")

cmds.textField("texties", w=200, pht="input name only")

cmds.optionMenu("optionsB", w=200)
cmds.menuItem(l="ctrl")
cmds.menuItem(l="geo")
cmds.menuItem(l="joint")

cmds.button(l="EXECUTE", w=200, h=50)
cmds.setParent("..")

cmds.showWindow("win")
```
## ... AND QUERYING YOUR WINDOW RENAME A SELECTED OBJECT
```python
def rename_selected(*args):
    prefix = cmds.optionMenu("optionsA1", q=True, v=True)
    txt = cmds.textField("texties1", q=True, tx=True)
    suffix = cmds.optionMenu("optionsA2",q=True, v=True)
    #watch out for the types that you make : is it a integer, float or string, etc..
    #always checkl your queries and look over command documentation for proper queries.
    new_name = prefix +"_"+ txt +"_"+ suffix
    for obj in cmds.ls(sl=True):
        cmds.rename(obj, new_name)


def rename_selected2(*args):
    prefix = cmds.optionMenu("optionsB1", q=True, v=True)
    txt = cmds.textField("texties2", q=True, tx=True)
    suffix = cmds.optionMenu("optionsB2",q=True, v=True)
    # your object name come into conflict due to the same onject names in other rows.
    # to avoid conflict, make sure to name your object in unique names.
    new_name = prefix +"_"+ txt +"_"+ suffix
    for obj in cmds.ls(sl=True):
        cmds.rename(obj, new_name)


if cmds.window("win", ex=True):
    cmds.deleteUI("win")

cmds.window("win", t="OPTIONMENU AND TEXTFIELD EXAMPLE")

cmds.columnLayout()
cmds.rowColumnLayout(nc=4)

cmds.optionMenu("optionsA1", w=200)
cmds.menuItem(l="one")
cmds.menuItem(l="two")
cmds.menuItem(l="three")

cmds.textField("texties1", w=200, pht="input name only")

cmds.optionMenu("optionsA2", w=200)
cmds.menuItem(l="ctrl")
cmds.menuItem(l="geo")
cmds.menuItem(l="joint")

cmds.button(l="EXECUTE", w=200, h=50, c= rename_selected)


cmds.optionMenu("optionsB1", w=200)
cmds.menuItem(l="one")
cmds.menuItem(l="two")
cmds.menuItem(l="three")

cmds.textField("texties2", w=200, pht="input name only")

cmds.optionMenu("optionsB2", w=200)
cmds.menuItem(l="ctrl")
cmds.menuItem(l="geo")
cmds.menuItem(l="joint")

cmds.button(l="EXECUTE", w=200, h=50, c= rename_selected2)
```

## KEYFRAME COMMANDS
Scripting animations can be automated with coding the tedious tasks

### ex. steps to making animation manually:
1. select the ctrl object and set key.
2. move individual ctrls in either rotation, or translation.
3. select and set key.
4. change tangent for inbetweens
5. key and revet tangents.

Setting up animation scripts can be complex, because of the different types of nodes to query/create/edit
time, space, value of each attribute within an animation object.


### setKeyframe Command
```python 
cmds.setKeyframe()
#if there are no flags in tuple, it will set all current value of attributes within selected objects

selection = cmds.ls(sl=True)

cmds.setKeyframe(selection)
```

important factors that constitute animation objects in maya:
- Time = float in timeline
- Space = value of attribute (float)
- State of Attribute = integers or booleans
- Attribute = constituting space and state of object

Flags used in setKeyframe Command
- value(v) = sets up the value of an attribute
- attribute(at) = which attribute you want ot set keys in.
- time(t) = where in the timeline you want to set keys in.

###WARNING!!!!!!!!
look over the flags that have multiple arguments.
watch out in your cent setting in the graph editor, unless if you override the default setting with
tangent commands, which will key your frame in a tangent specified.
"""
```python
selection= cmds.ls(sl=True)

cmds.setKeyframe(selection, value= 0.5, attribute= "translateY", time=[1,25])
cmds.setKeyframe(selection, value= 6, attribute= "translateY", time=[13])
```




## 10 min excercise
### create setKeyframe commands in which, based on your selection, create an animation where your object moves/tranlsates in a circular motion within 36 frames.
```python
selection= cmds.ls(sl=True)

cmds.setKeyframe(selection, value= 7, attribute= ["translateY","translateZ"], time=[1,36])

cmds.setKeyframe(selection, value= -7, attribute= ["translateY"], time=[9])
cmds.setKeyframe(selection, value= 7, attribute= ["translateZ"], time=[9])

cmds.setKeyframe(selection, value= -7, attribute= ["translateY","translateZ"], time=[18])

cmds.setKeyframe(selection, value= 7, attribute= ["translateY"], time=[27])
cmds.setKeyframe(selection, value= -7, attribute= ["translateZ"], time=[27])
```


## KEY TANGENT AND SET INFINITY COMMANDS

### keyTangent = can manipulate individual tangents nad curves between keys

useful flags:
- lock = either make a unified /broken tangent curve in the bezier handle
- inAngle/outAngle= based on degrees it can change the bezier handles directly.
- time = stating the timrange (CHECK THE COMMAND DOCUMENTATION EXMAPLE)
- edit = allows you to go into edit mode.
- inTangentType/outTangentType = changes tangent type

```python
for obj in cmds. ls(sl=True):
    cmds.setKeyframe(obj, at="ty", v=10, t=[1,25])
    cmds.setKeyframe(obj, at="ty", v=0.5, t=[13])
    cmds.keyTangent(obj, edit=True, at="ty",lock=False, t=(13,13),inAngle= -60 ,outAngle= 60)
    cmds.setKeyframe(obj, at="tx", v= -10, t=[1])
    cmds.setKeyframe(obj, at="tx", v= 10, t=[25])
    cmds.keyTangent(obj, edit=True, at="tx", t=(1,25),itt="linear",ott="linear")
```


### SET INFINITY
```python
# same as post/pre infinite cycle
cmds.setInfinity(obj, at="ty", poi= "cycle")
cmds.setInfinity(obj, at="tx", poi= "cycleRelative")
```


#### Rules to consider:
setInfinity and keyTrangents can only be used if the key exists.
consider which flag needs to be used in the key Tangent commands.


## RANDOM CHOICE
```python
# random choice is a part of the random module library
# random.uniform - picks a random float within a parameter range.

import random

for i in range(10):
    print(random.uniform(0,1))

#random choice = pick a random singular item from a list/ object

import random

for i in range(10):
    list =[1,2,3,4,5]
    print(random.choice(list) )
# as long as it is an viable data type we can return any type from that list.

for i in range(10):
    list = ["one","two","three"]
    print(random.choice(list))

#in some cases you even use a singluar string name to set up random choices.
#in the down example, the rnadom choice will pick a random letter from the string word
for i in range(10):
    list = "abcd"
    returnedValue =  random.choice(list)
    #using the returned choice, you can conditions to set a certain command or action
    if returnedValue == "a":
        col = [1,0,0]
    elif returnedValue == "b":
        col = [0,1,0]
    elif returnedValue == "c":
        col = [0,0,1]
    elif returnedValue == "d":
        col = [1,0,1]
    loc = cmds.spaceLocator()[0]
    for axis in [".tx", ".tz"]:
        cmds.setAttr(loc + axis, random.uniform(-20,20))
        cmds.color(loc, rgb= col)
```


## DUPLICATE COMMANDS

duplicate is going to be part of assignment 6 if just duplicating, there is a risk in losing the nodes connect to the particular object.
which includes, animation keys.  Therefore, you would want to it in the manner of duplicate special

```python
sel= cmds.ls(sl=True)
cmds.duplicate(sel)
```


### Important flags for duplicate:
- inputConnections(ic)= allows all inputs to be duplicated, including animation
- smartTranform(st)= will duplicate based on its last position
- upstreamNode(un)= will duplicate upstream nodes connected to the selected object

#### exampleA
```python
value = 2

for obj in cmds.ls(sl=True):
    cmds.duplicate(obj, ic=True, st=True)
    cmds.move(0,2,0,r=True)
```

####WARNING
If there is key set in the attribute, unless its set keyed once again before moving the timeline, it will revert to its original position.


### Example B
```python
#create a duplicated animated object with just translateY animation applied.

import random

for i in range(40):
    sel= cmds.ls(sl=True)[-1]
    cmds.duplicate(sel, st=True, ic=True)
    cmds.setAttr(sel + ".tx", random.uniform(-10,10))
    cmds.setAttr(sel + ".tz", random.uniform(-10,10))
```



## WITH ANIMATION AND DUPLICATE
```python
import random

for i in range(50):
    # in order to get rid of contatenate error, use loop to atuomatically iterate through you list as singular object
    for obj in cmds.ls(sl=True):
        cmds.duplicate(obj, st=True, ic=True, renameChildren= True)
        for axis in [".tx",".tz"]:
            cmds.setAttr(obj + axis, random.uniform(-20,20))
            #watch out for indents!!!
        choose = random.choice("abcd")
        if choose == "a":
            timeUP= [12]
            timeDown=[1,24]
        elif choose == "b":
            timeUP= [13]
            timeDown=[2,25]
        elif choose == "c":
            timeUP= [14]
            timeDown=[3,26]
        elif choose == "d":
            timeUP= [15]
            timeDown=[4,27]
        upValue = random.uniform(5,7)
        cmds.setKeyframe(obj, at="ty",v=0, t=timeDown)
        cmds.setKeyframe(obj, at="ty",v=upValue, t=timeUP)
        cmds.setInfinity(obj, poi="cycle")

        # USE THIS WINDOW AS A BASIS FOR YOUR CROWD ANIMATION TOOL
        cmds.window(t="Crowd Animation Tool")
        cmds.columnLayout()
        cmds.rowColumnLayout(nr=1)
        cmds.optionMenu("action", l="ACTION: ", h=50, w=200)
        cmds.menuItem(l="jump")
        cmds.menuItem(l="breathe")
        cmds.menuItem(l="look")
        cmds.text(l="Duplicates: ", w=70,h=50)
        cmds.intField("number", w=200, h=50)
        cmds.button(l="ANIMATE", w=200,h=50)
        cmds.showWindow()
```

you want to create an animation based on what you choose in the option menu and duplicate value from the input field.
   
a good way to develop your script and solve issues is to ask the following questions:

- how to we choose the animation type from the option Menu?
- how are we going going oscillate the value and the time in each animation?
- how we do that based on duplicates?

```python
def animate(*args):
    anim = cmds.optionMenu("action", q=True, v=True)
    count = cmds.intField("number", q=True, v=True)
    
    for i in range(count):
        if anim =="jump":
            print("Jumping is working.")
            jump()
        if anim =="look":
            print("Looking is working.")
        if anim =="breathe":
            print("Breathing is working.")
```
            
