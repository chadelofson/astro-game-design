---
title: 'Maya Scripting Duplicate Animate Notes'
pubDate: 2024-06-09
description: 'Covers Random, Duplicate and Animate.'
author: 'Chad Elofson'
image:
  url: 'https://docs.astro.build/assets/full-logo-light.png'
  alt: 'The full Astro logo.'
tags: ["Maya", "Python"]
---
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

#### WARNING
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

## REVIEWING AND EXPANDING ON ASSIGNMENT 6
```python
import maya.cmds as cmds
import random
 
def anim_scatter(*args):
    count = cmds.intField("looped", q=True, v=True)
    scatter = cmds.intField("range", q=True, v=True)
    jump = cmds.checkBox("jump", q=True, v=True)
    look = cmds.checkBox("look", q=True, v=True)
    breathe = cmds.checkBox("breathe", q=True, v=True)
    for i in range(count):
        for obj in cmds.ls(sl=True):
            cmds.duplicate(obj, st=True)
            for axis in [".tx",".tz"]:
                cmds.setAttr(obj + axis, random.uniform(scatter,-scatter))
            if jump == True:
                print("jump!")
                jumpAnim()
            if look == True:
                print("look!")
                lookAnim()
            if breathe == True:
                print("breathe!")
                
def jumpAnim():
    x = [1,2,3,4]
    choose = random.choice(x)
    if choose == 1:
        downT = [1,25]
        upT = [13]
    elif choose == 2:
        downT = [2,26]
        upT = [14]
    elif choose == 3:
        downT = [3,27]
        upT = [15]
    else:
        downT = [3,27]
        upT = [15]
    downV = random.uniform(8,10)
    for obj in cmds.ls(sl=True):
        cmds.setKeyframe(obj, v=0, at=["ty"], t=upT)
        cmds.setKeyframe(obj, v=downV, at=["ty"], t=downT)
        cmds.setInfinity(obj, poi="cycle")
        cmds.keyTangent(obj+".ty", itt="auto", ott="auto")
        
def lookAnim():
    rotY = random.uniform(200,360)
    upTimeA = random.uniform( 12,15) 
    downTimeA = random.uniform(0,4)
    downTimeB = random.uniform(24,27)
    for obj in cmds.ls(sl=True):
        cmds.setKeyframe(obj, v=0, at="ry", t=[downTimeA,downTimeB]) 
        cmds.setKeyframe(obj, v=rotY, at="ry", t=[upTimeA])
        cmds.setInfinity(obj, poi="cycle")
        cmds.keyTangent(obj+".ry", itt="auto", ott="auto")

if cmds.window("win", ex=True):
    cmds.deleteUI("win")

cmds.window("win",t="CROWD ANIMATION TOOL", wh=(700,100))

cmds.columnLayout()
cmds.rowColumnLayout(nr=1)
cmds.checkBox("jump", l="JUMP", w=70,h=50)
cmds.checkBox("look", l="LOOK", w=70,h=50)
cmds.checkBox("breathe", l="BREATHE", w=70,h=50)
cmds.text(l="Duplicates: " )
cmds.intField("looped", w=100,h=50)
cmds.text(l="Range: ")
cmds.intField("range", w=100,h=50)
cmds.button(l="Animate", w=100, h=50, c=anim_scatter)
cmds.setParent("..")
cmds.showWindow("win")
```
WARNING DO NOT USE THIS WINOW FOR ASSIGNMENT 6!!
USE THE EXAMPLE WINDOW SCRIPT GIVEN IN SESSION 07!!
#MIN AND MAX VOLUME OF SHAPE OBJECTS


### Why do we want to know min and max?

some objects will be different based on their design and model.
with min and max volumes, we can figure the tesselation matrix, and values of our unique shape.
one example would be using the value to avoid collision between objects.


# XFORM COMMAND

- move = will translate an object, will only be useful with transform nodes.
- setAttr= will tranform an object based on a single attribute, but hard to extract value unless if we use getAttr.
- xform = will transform or edit object, but also query bounding box and its transform matrix.


with xform, you can query specific positions of an object.
```python
for obj in cmds.ls(sl=True):
    cmds.xform(obj, relative=True, translation=[1,1,1])
    x = cmds.xform(obj, q=True, t=True)
    print(x)

#euler flags will allow you to input rotation values as intended
for obj in cmds.ls(sl=True):
    cmds.xform(obj, relative=True,euler=True, ro=[45,90,120])
    x = cmds.xform(obj, q=True, ro=True)
    print(x)
```


## PRINTING VERTEXT POSITIONS AND NAMES


THE XFORM CANOT NOT ONLY QUERY AN OBJECT'S POSITION, BYT ALSO THE COMPONENTS WITHIN.
in Maya Python, every polygon object is placed within the worldspaces axis value.
Moreover, components such as vertext determine the position of the object's transformation matrix.
using xform commands we cna query vertex positions.


## Printing Vertex Name
```python
for vtx_str in cmds.ls(sl=True):
    print(vtx_str)
    #pCube2.vtx[0:7]
    #pCube2 = obj name
    # vtx = vertex node
    # [0:7] = vertex selection range in index form.


for vtx_str in cmds.ls(sl=True, flatten=True):
    print(vtx_str)
# flatten flag will iterate our list as an individual object


for vtx_str in cmds.ls(sl=True, flatten=True):
    vertPos= cmds.xform(vtx_str, q=True, t=True)
    print(vertPos)
```

### using vertex positions for fun
```python
sel = cmds.ls(sl=True)[0]

evaluate= cmds.polyEvaluate(sel,vertex=True)
for i in range(evaluate):
    cube = cmds.polyCube()[0]
    position = cmds.xform(sel + ".vtx[" + str(i) +"]", q=True, t=True)
    # will return pSphere.vtx[0]
    cmds.xform(cube, t=position)
```

## BOUNDING BOX


### WHAT IS A BOUNDING BOX?

boundingBox = the maximum and minimum volume of an object matrix based on min xyz and max xyz

bounding becomes important especially when dealing a uniquel shaped object.

we use the bounding box to return a min/ max value

NOTE: the values returned will be based on world space axis.

```python
for obj in cmds.ls(sl=True):
    bbox = cmds.xform(obj, q=True, boundingBox=True)
    print(bbox)
    #With cube in center
    #[-0.5, -0.5, -0.5, 0.5, 0.5, 0.5]
    # will always return an min xyz, and then max xyz
    # the bounding box will ALWAYS return as a float within a list.
    we can figure out the central point of a bounding box within a unique object, without using center pivot


for obj in cmds.ls(sl=True):
    bbox = cmds.xform(obj, q=True, boundingBox=True)
    x_center = (bbox[0] + bbox[3])/2
    y_center = (bbox[1] + bbox[4])/2
    z_center = (bbox[2] + bbox[5])/2
    print(x_center,y_center,z_center)
    cent = [x_center,y_center,z_center]
    cmds.xform(obj, piv=cent, ws=True)
    #setting pivot point to bottom

for obj in cmds.ls(sl=True):
    bbox= cmds.exactWorldBoundingBox(obj)
    bottom = [ (bbox[0] + bbox[3])/2, bbox[1],(bbox[2] + bbox[5])/2]
    cmds.xform(obj, piv=bottom, ws=True)
```
