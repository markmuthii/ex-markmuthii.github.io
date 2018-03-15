---
layout: post
title:  "Java and the command line(cmd)"
subtitle: "Guide to creating and running a java program through the terminal"
date:   2018-03-11
background: '/img/posts/java2.jpg'
author: Mark Muthii
category: programming
description: "Ever since I started learning to code, no language has been as fascinating to me as `Javascript`, and I would wish to forever code only in it. However, due to school, I have had to interact with other programming languages. Last semester, the programming unit was covered in `C++`."
---


Ever since I started learning to code, no language has been as fascinating to me as `Javascript`, and I would wish to forever code only in it.

However, due to school, I have had to interact with other programming languages. Last semester, the programming unit was covered in `C++`. C++ was a great experience, but I have no particular interest in going back to it.

This semester is our introduction to object oriented programming(OOP), in `Java`. I have to admit, learning Java was a bit difficult in the beginning, especially due to it's unforgiving syntax. No matter, I caught up, and so far so good. 

I've learnt quite a lot so far, which brings me to the topic of today:


## Running a Java program through the terminal

If you have been in the programming space for some time, then you have definitely interacted with the terminal. If not, it's about time you got started, because sooner than later, it's going to be at the center of everything you do.

Java is mostly run using [Integrated Development Environments](https://en.wikipedia.org/wiki/Integrated_development_environment) such as Netbeans which make the process of writing and compiling java code easy. 

However, if you are just getting started, I have found it better to write java code using a non-java-specific IDE (or plain text editor such as notepad) and running the programs through the terminal, as this exposes you to the terminal early enough, and also helps you to master the java syntax _(because you have to type out the code yourself without the help of functionalities such as auto-complete found in Java IDEs)_.

Okay, enough talk, let's get down to it. 


## Setting up your environment

To get started, first check whether Java Development Kit is installed in your machine.

To do that, open the command prompt (terminal) by pressing `Windows+R` and typing `cmd` in the box that pops up. Click OK.

<img class="img-fluid" src="../img/posts/run.png" alt="Run Window">

The command line should open:

<img class="img-fluid" src="../img/posts/cmd1.png" alt="Command Prompt">

Type the following command:

<pre class="command-line" data-user="pc" data-host="Mark-M"><code class="language-bash">java</code></pre>

If the JDK is installed, you should get something like this:

<img class="img-fluid" src="../img/posts/cmd2.png" alt="Command Prompt">

Alternatively, type:

<pre class="command-line" data-user="pc" data-host="Mark-M"><code class="language-bash">java -version</code></pre>

It should display the current version of java installed.

<pre class="command-line" data-user="pc" data-host="Mark-M"><code class="language-bash">java -version
java version "1.8.0_161"
Java(TM) SE Runtime Environment (build 1.8.0_161-b12)
Java HotSpot(TM) Client VM (build 25.161-b12, mixed mode, sharing)</code></pre>

If it is not installed, you should get a response that java is not a recognized command. In that case, download and install the JDK from [here](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html). Select an installer that is suitable to your Operating System and follow the normal program installation procedure.

Once it is done, run the `java -version` command to confirm that it's installed.


## Java Hello World

Now let's write some code.

Open up notepad and type the following code _(do not copy-paste it. Type it.)_:

```java
public class HelloWorld {
  public static void main(String[] args){
    System.out.print("Hello World");
  }
}
```

To save the file, click `File` then `Save as`. On the window that opens, navigate to Local Disk C (or an equivalent disk) and create a folder named `sandbox`. While in this folder, click the drop-down menu labelled `Save as type` and select '**All Files (\*.\*)**'. 

Name the file **HelloWorld.java**, and save. Notice that the file **must** be saved with the `.java` extension.

Open command prompt and navigate to the directory that we just created using the following command: 

<pre class="command-line" data-user="pc" data-host="Mark-M"><code class="language-bash">cd /sandbox</code></pre>

_`cd` is used to 'change directory' into the specified folder._ 

The sandbox folder should now be your working directory.

<img class="img-fluid" src="../img/posts/cmd3.png" alt="Command Prompt">

To view the contents of a folder, the `ls` command is used _(if running Windows 8 or 10, use the `dir` command)_

<pre class="command-line" data-user="pc" data-host="Mark-M"><code class="language-bash">ls
HelloWorld.java</code></pre>

The terminal shows us that the `HelloWorld.java` file we created is stored here.


## Compiling and interpreting our java code

Java is both a compiled and interpreted programming language._(Not going into specifics, but [this Stackoverflow thread](https://stackoverflow.com/questions/1326071/is-java-a-compiled-or-an-interpreted-programming-language) will help you understand what I mean)_.

The initial process of converting Java code into machine-readable code _(ie, 1s and 0s, otherwise known as binary)_ involves compling it into `bytecode` first. This is done by a program known as `javac`, which comes with the JDK. 

After that, another program, `java`, interpretes and/or compiles the code into machine-readable code.

The two programs can be run through the command line, which is what we'll do next:

## Compiling with Javac

Switch to the terminal and type the following command _(ensure you are in our sandbox working directory)_:

<pre class="command-line" data-user="pc" data-host="Mark-M"><code class="language-bash">javac HelloWorld.java</code></pre>

The terminal tells us that the command is unrecognized. This is because a path to the javac program is yet to be specified, which is a requirement for running some programs in the terminal.

To temporarily solve this, copy the following command into your terminal and run it. If you changed the default installation folder, change the part with `C:\Program Files\Java\jdk1.8.0_161\bin`  to the equivalent folder in your system.

<pre class="command-line" data-user="pc" data-host="Mark-M"><code class="language-bash">set path=%path%;C:\Program Files\Java\jdk1.8.0_161\bin</code></pre>

Now re-run the command:

<pre class="command-line" data-user="pc" data-host="Mark-M"><code class="language-bash">javac HelloWorld.java</code></pre>

Unless there are errors in your code _(which there shouldn't be if you used the exact code we wrote)_, nothing will show on the terminal.

However, if you run the `ls` command, you should see that a new file, `HelloWorld.class`, has been created in our sandbox folder.

<pre class="command-line" data-user="pc" data-host="Mark-M"><code class="language-bash">ls
HelloWorld.class  HelloWorld.java</code></pre>

Now let's create a permanent path for the java programs, so that we can use them at any time without having to set the path each time we run the cmd.

## Setting a permanent path to java programs

For this part, please proceed with **caution**.

##### On Windows 8 and 10
1. In Search, search for and then select: System (Control Panel)
2. Click the Advanced system settings link.
3. Click Environment Variables. In the section System Variables, find the PATH environment variable and select it. Click Edit.
4. In the Edit System Variable window, specify the value of the PATH environment variable: **Append**, ie, add to the end of the list, the following line: `;C:\Program Files\Java\jdk1.8.0_161\bin` _(use the appropriate path to where your version of the JDK is installed)_
5. Click OK on the path edit box and OK on the Environment Variables box.

##### On Windows 7
1. From the desktop, right click the Computer icon.
2. Choose Properties from the context menu.
3. Click the Advanced system settings link.
4. Click Environment Variables. In the section System Variables, find the PATH environment variable and select it. Click Edit.
4. In the Edit System Variable window, specify the value of the PATH environment variable: **Append**, ie, add to the end of the list, the following line: `;C:\Program Files\Java\jdk1.8.0_161\bin` _(use the appropriate path to where your version of the JDK is installed)_
5. Click OK on the path edit box and OK on the Environment Variables box.

<img class="img-fluid" src="../img/posts/var.png" alt="Command Prompt"><span class="caption text-muted">My Variable Settings Screen</span>

For the new settings to take effect, restart the terminal.

## Interpreting/Further compiling our java code

Ensure that you are in the `sandbox` working directory by using the command:

<pre class="command-line" data-user="pc" data-host="Mark-M"><code class="language-bash">cd /sandbox</code></pre>

To check that the environment variable for java was set, let us change the `HelloWorld.java` code file that we created earlier.

Open it with notepad and add the following line after the `System.out.print("Hello World");`

```java 
System.out.println("Hello Awesome World!");
```

The file should now bear the following code:

```java
public class HelloWorld {
  public static void main(String[] args){
    System.out.print("Hello World");
    System.out.println("Hello Awesome World!");
  }
}
```

Save it by pressing `ctrl + S`.

Switch to the terminal and run:

<pre class="command-line" data-user="pc" data-host="Mark-M"><code class="language-bash">javac HelloWorld.java</code></pre>

If nothing is displayed, that means that the environment variable was successfully set and the code has no errors. Super.

Now to the second process: compiling/interpreting the code into machine-readable form.

Run the following command:

<pre class="command-line" data-user="pc" data-host="Mark-M"><code class="language-bash">java HelloWorld</code></pre>

The following should show on the terminal:

<pre class="command-line" data-user="pc" data-host="Mark-M"><code class="language-bash">java HelloWorld
Hello World
Hello Awesome World!</code></pre>

Voila! Your program runs perfectly! :D

Notice the two changes in the second command: we're now using `java`, and not `javac`, and we didn't specify the file extension. 

The java command runs the file with the `.class` extension, and executes the program _(in our case, displaying the specified output)_.

Any time you make changes to the `HelloWorld.java` file, re-run the `javac HelloWorld.java` command, and in case of any errors, the terminal will display them to you. If no errors are found, run the `java HelloWorld` command to execute the program. 

If errors are found, debug your code, re-run `javac HelloWorld`, then run `java HelloWorld`.

## Wrapping up

The command line is a very effective and useful tool, and if programming is your thing, you should spend time to get comfortable using it.

I'm still relatively new at Java, and so far I think it's a pretty cool language _(doesn't beat Javascript in my opinion though! :D)_. 

I'll be sharing what I learn here, so be on the look out for more!

If you have any questions concerning this, drop a comment below. 

If you learnt something new through this _(not so short)_ guide, please share it with the buttons below!  

<hr>













