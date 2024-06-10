---
title: 'Maya Scripting Lecture 1 Notes'
pubDate: 2024-06-09
description: 'Game Scripting Notes from Lecture 1'
author: 'Chad Elofson'
image:
    url: 'https://docs.astro.build/assets/full-logo-light.png'
    alt: 'The full Astro logo.'
tags: ["Maya", "Python"]
---

# Functions in Python - allow us to reuse and organize code

Basics of Defining a function:

```python
def draw_scales:
    print("drawing scales")
```
This function allows us to draw the same scale without having to write the same code multiple times.

## How can we draw different kind of scales?

To draw different size scales, we can use parameters to pass the size you want.

The parameter is like a variable that we put between the parenthesis for instance:

```python
def draw_scales(scale_size):
    print("drawing scale at size ", scale_size)
```
Now you can use the function to generate different size scales.

In game design, you would also want to be able to place those scales at different coordinates.

To do that you can add more parameters to the scale to determine that:

```python
def draw_scales(scale_size, x, y, z):
    print(f"Drawing scale of size {scale_size}, at
coordinates ({x}, {y}, {z})"
```

## Invoking a Function

To invoke (execute) a function, you just have to call the function name with parenthesis and any possible parameters the function is expecting

```python
draw_scales(2, 0, 0, 0)
```

This will draw a scale of size 2 at the root of a 3D scene

# FUNCTIONS


Python commands will be unkown to a majority of software users.

As Maya is a program software based on a scripting language(MEL),

It is up to the scripter to set a script in which general users can easily interact with it.

Other modifications such as plugins(ex. TWEEN MACHINE) are *custom build scripts*.

When writing custom scripts in python/MEL it is in the form of Window UI's

## How these windows UI are written is:

1. you would have a script that constitutes the ascetic parts of a window(ex.size, widgets)

 2. the script that performs the action when the button is executed in the window UI.


## How will we use Functions in Maya Scripting?

We will use Functions to connect our scripts to the window.

## Definition of Functions For Game Scripting
*Functions* - bundle of code encased within a keyword indent that only runs when it is called.


###EXAMPLE A

```python
#def = definition( or defining the function)

#the variable that names the function can named anything, but follow naming convention of variables.

# the tuple will allow you to connect the function to other objects such as buttons and other functions.

def anything():

    # in order for your block of code to be included in the function, make sure to indent.

    print("You're the king?")

    print("We'll i didnt vote for you!")

# in order to run the function, you must call the name of the function.

anything()

```

# IMPORTANT!!

### you must define a function before running/calling it.

### once defined, you can call it until you quit maya.

```python
def call():

    print("Non-Defined error will pop if not defined first.")


call()
```



## EXAMPLE B

```python
import maya.cmds as cmds

def move_left():
    cmds.move(1,0,0, relative=True)

def move_right():
    cmds.move(-1,0,0, relative=True)

move_left()
move_right()

```


## EXCERCISE - 8 min

```python

import maya.cmds as cmds

##
# manually create a polygon
# create a function for moving up and down
# in function:
#use the move command with relative flag as true
 # with thep polygon selected,

#move the polygon up 4 times, down 2 times.

def move_up():
    cmds.move(0,1,0, relative=True)

def move_down():
    cmds.move(0,-1,0, relative=True)

for i in range(4):
    move_up()
move_down()
move_down()
```

## Function Arguments (Also Called Parameters)

## The argument can come in differnt forms, but uniquely defined are called defined/positional arguments.

```python

def example(input):
    print("This object is a " + input + ".")
    # you can use arguments like a variable inside a function, but the use depends on what data type we use.

#if there are no arguments when defining arguments a missing arugment error will occur.
example("Box")
example("Ball")
example("Thingymajig")
```
## Example B

### you can put as many arguments as you need.

```python
def summary(arg1,arg2,arg3):
    result = arg1 + arg2
    newResult = result * arg3
    print(newResult)

summary(2,3,5)
#when using positional/defined arguments,
# the inputs must be ordered according to the defined to the defined argument.
```

## Example C

```python

import maya.cmds as cmds

def create_cube(id, size, subs):
    cmds.polyCube( n= id, w=size, h=size,d=size, sx=subs, sy=subs,sz=subs)

create_cube("Cube", 5.27, 6 )
 ```

## Excercise 6 min
### create a function with two arguments
### use those arguments to connect it to a flag in a polygon command.
### call upon your function with those positional arguments.

### sometimes you may not know how many arguments will be passed through a function

### a defined, positional argument only accepts the number of argument inputs.

```python
def argFunc(one,two):
    print("this function is working?")
argFunc(1,2,3)
# TypeError: argFunc() takes 2 positional arguments but 3 were given #
```

### arbitrary arguments will allow us to pass any number of arguments whether or not we will be using them.

```python

def arbiter_func(*weapon):
    # adding * will defined your argument as arbitrary
    print("my choice of weapon is something.")

arbiter_func("sword","mace","spear","gun")
```

### when defining arbitrary arguments, it is more commonly defined as *args :

```python
def arbiter_func(*args):
    print("my choice of weapon is a " + args[-1] + ".")

arbiter_func("sword","mace","spear","gun")
 ```

### when connecting to a window ui an then calling it, usually the window ui will pass through at least 1 argument.

### that is why we will use *args when defining our functions.

```python

outside = 5
def func_example():
    variable = 10
    print(outside)
func_example()
```

### In this case we can use a general variable inside the function.

### Any data container that is not inside function is essentially a global variable.

### If we want to use a variable inside a function globally, we can use the global keywords.

```python
def globalfunc():
    global variableB
    variableB = "contained"
    print(variableB + " within.")
globalfunc()
print(variableB + " without.")
#TIP: function must be called before using global variables inside a function.
```

## RETURN STATEMENTS

### a return keyword instructs Python to exit the function and return the resulting data back to the global script.

```python
import maya.cmds as cmds

def my_func(x):
    return 5 * x
#return keyword will not print, but they are defined datas
result = my_func(3)

def cub_func(size):
    cmds.polyCube(w=size)

cub_func(result)
cmds.ls()
```


# ls=LIST
## The ls command will LIST every avaiable object with the current scene.

### For Example:
```python
import maya.cmds as cmds

cmds.ls(transforms=True)
```


## We can narrow down the list to the type of node we want to list.
### TIP: MAKE SURE TO LOOK OVER THE [COMMAND DOCUMENTATION](https://help.autodesk.com/cloudhelp/2022/ENU/Maya-Tech-Docs/CommandsPython/).

### ALSO, remember that a single object(polygons) contain diffent nodes

```python

import maya.cmds as cmds

cmds.ls(selection = True)
# in most instance during this course, we will use the selection(sl) flag to list selected objects.
```

## Example A - Looping through selected objects
 ```python

import maya.cmds as cmds

for name in cmds.ls(sl=True):
    cmds.move(0,1,0,name, r=True)
#in this case, we use a loop to move our selected objects.
#remember that ls will always return a list
# in which we cna use as a list in a loop.
```

## Example B - Get All Selected Items and Create a list of Selected Cube objects

```python
import maya.cmds as cmds

cubeList = []

for name in cmds.ls(sl=True):
    if "Cube" in name:
        cubeList.append(name)
    cmds.select(cubeList)
print(cubeList)
```

so for this we will need to do the following:

```python
def center_pivot():
    selectList = cmds.ls(sl=True)
    x = []
    y = []
    z = []
    for shape in selectList:
        pos = cmds.xform(shape, q = True, t = True, ws = True)
        x.append(pos[0])
        y.append(pos[1])
        z.append(pos[2])
    posBC = (sum(x)/len(x),sum(y)/len(y),sum(z)/len(z))
    for shape in selectList:
        cmds.xform(s, piv = posBC, ws = True)
```sd
