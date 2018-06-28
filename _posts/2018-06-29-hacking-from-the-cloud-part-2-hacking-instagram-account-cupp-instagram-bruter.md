---
layout: post
title:  "Hacking From the Cloud, Part 2"
subtitle: "Hacking Instagram Account with CUPP and Instagram Bruter"
date:   2018-06-29
background: '/img/posts/kali-linux-hacking-from-the-cloud-mark-muthii-me.png'
simg:	'/img/posts/kali-logo-mark-muthii-me.png'
author: Mark Muthii
category: devops
description: "In this second part of Hacking From the Cloud, I show you how to hack an Instagram account using Kali hosted on the cloud."
surlex:	false
---

In the <a href="https://mark.muthii.me/hacking-from-the-cloud-part-1-setting-up-kali-linux-on-amazon-web-services" target="_blank">first part</a> of this series, Hacking From the Cloud, I covered how to set up Kali Linux on Amazon Web Services. If you haven't checked it out yet, do so before reading on. Unless, of course, you already have a Kali instance running somewhere.

Today I'll introduce you to a couple of programs that you can use to test how secure your Instagram account is. 

Please note, as a legal disclaimer, that this tutorial is for informational purposes only, with the aim of showing you how a malicious human can gain access to your account. I am not responsible for any illegal use of the information contained in this post.

For this demonstration, I created a dummy Instagram account (which I'll probably delete afterwards).

<img class="img-fluid" src="../img/posts/hacking-ig-new-account.jpg" alt="Dummy Instagram Account"><span class="caption text-muted">My dummy IG account</span>

Alright, let's get to it.

## Reconnaissance

If you're going to be testing the vulnerability of somebody's account (with their consent of course :)), then the first thing you need to do is gather information about the person, information that will assist you to profile them.

You know how in the movies the military, before missions, sends spies to study a place before they launch an attack? Yeah, same thing here. You cannot go in blind, without having acquired sufficient info about the target.

So, gather as much as you can about the person: their surname, date of birth, pet's name, kid's name, partner's name. If you can get the name of their crush, why not. 

In short, the stuff that most people in the world use to create passwords because they are easy to remember. 

Remember how Elliot in Mr Robot calls up that guy, pretending to be someone else and asks about his dog's name and some other personal stuff, while entering the info into some program on his computer in order to hack the guy's Facebook account? 

Yeah. Now you know why. Reconn.

## Password Profiling

You've gathered the information. What next.

Now, we create a list of possible passwords that the person may be using based on what we collected.

You could decide to do it manually, take a couple of weeks figuring out all the possible combinations of that data that could form passwords. 

Or you could write a program in your language of choice to do it for you in seconds.

Or you could save yourself multiple headache sessions coding a program which might end up giving you mediocre results, and use an open source script that has been improved by programmers over time. 

I prefer the latter.

### CUPP 

There exists a handy python script called <a href="https://github.com/mebus/cupp" target="_blank">CUPP</a>, originally written by a Muris Kurgas, and now maintained by a number of contributors (more details in the README on Github).

CUPP stands for Common User Passwords Profiler, and it essentially does just that - profiles common user passwords.

<img class="img-fluid" src="../img/posts/kali-linux-cupp.jpg" alt="Common User Password Profiler">

We'll use it a create a txt document containing password possibilities from the information we collected about the target.

Here we go.

Connect to your Kali instance, which we created in the <a href="https://mark.muthii.me/hacking-from-the-cloud-part-1-setting-up-kali-linux-on-amazon-web-services" target="_blank">previous post</a>, using ```ssh```.

<pre class="command-line" data-user="pc" data-host="Mark-M"><code class="language-bash">ssh -i PATH_TO_PRIVATE_KEY_HERE.pem ec2-user@PUBLIC_DNS_HERE.amazonaws.com
</code></pre>

_If you get a connection timed out error, log in to your AWS console and edit the inbound settings in the security group, to allow SSH access for your IP. It might have changed and with the current settings you cannot connect._

If you want to work from the root folder, that's fine. I however prefer creating a folder to work from.

<pre class="command-line" data-user="ec2-user" data-host="kali"><code class="language-bash">mkdir igHack && cd igHack</code></pre>

Next thing is to clone the CUPP repository on Github.

<pre class="command-line" data-user="ec2-user" data-host="kali"><code class="language-bash">git clone https://github.com/mebus/cupp.git && cd cupp</code></pre>

### Password List

To use CUPP is pretty straight-forward. Run this command while in the cupp folder which was created after cloning the repo:

<pre class="command-line" data-user="ec2-user" data-host="kali"><code class="language-bash">python cupp.py -i</code></pre>

You will be prompted for certain info about the person who's account you are targeting. If something is not asked, then you have the option of adding key words (as many as you'd like) separated by commas. Just enter ```y``` when asked whether you want to add some keywords about the victim.

<img class="img-fluid" src="../img/posts/cupp-mark-pass.jpg" alt="Common User Password Profiler">

The account I am using as a proof of concept for this hack has a weak password (mark1234). I did this because the more complex a password is, the longer it takes to crack.

I've changed the CUPP program code a bit, in order to ensure that the password is among the 35 generated words with just the one input of my first name (Mark). 

You don't _need_ to change the code though, just provide as much as you can to increase the possibilities of generating the actual password.

When the program finishes writing the password list, a new file will be created in the same folder, bearing the first name of the victim which you entered in the first prompt. Use ```ls``` to confirm its existence.

And that does it for the password profiling part.

To view the words that have been generated by CUPP, use ```cat FIRST_NAME.txt```.

Now it's time to see what our victim has been up to on Instagram.

## Instagram Brute-force

Just having the list of possible passwords is not enough for us to gain access to an account. We need to actually test each one until one works (I know, it's obvious, but I'm mentioning it just in case).

You could decide to do it manually, take a couple of weeks... 

...blah 

...blah

...blah 

I prefer the latter.

### Instagram Bruter

Yes, the python script is called Instagram Bruter. Pretty creative no?

It works by taking a list of words, and testing them against a given Instagram account, until it finds one which works, or it doesn't.

Which goes to say, there exists not a spell that automagically generates the right password of an account. At least not that I know of. 

The Instagram script just works with what you feed it. If the password is not among the words you generated earlier using CUPP, then it will have nothing to find. 

Which is why, it is important to provide as much information as you can to CUPP. You could also take the password list and run it through a program like <a href="https://github.com/sc0tfree/mentalist" target="_blank">Mentalist</a> (cool name btw, reminds me of Patrick Jane) to generate more words, but that is a topic for another day.

To run Instagram Bruter, we first need to clone it.

<pre class="command-line" data-user="ec2-user" data-host="kali"><code class="language-bash">cd .. && git clone https://github.com/Pure-L0G1C/Instagram</code></pre>

Before moving into the Instagram directory, we first need to copy the password list file that was generated by CUPP, and paste into the Instagram directory. Since we're using ssh and do not have the luxury of a graphical user interface, we'll use a terminal command.

<pre class="command-line" data-user="ec2-user" data-host="kali"><code class="language-bash">cp cupp/mark.txt Instagram/ && cd Instagram</code></pre>

Remember to replace ```mark``` with the name of your victim.

Now that the list and the Instagram Bruter (which I'll call IGB from now - getting tired of typing its name) are in the same directory, we can begin the attack.

Run IGB with the following command syntax

<pre class="command-line" data-user="ec2-user" data-host="kali"><code class="language-bash">python instagram.py username passlist.txt thread</code></pre>

where ```username``` is the username of the account you are targeting, ```passlist.txt``` is the document containing your passwords, generated by CUPP and ```thread``` is a number, dictating how many words the program should test every second, which should be <= 16.

For instance in my case, I ran

<pre class="command-line" data-user="ec2-user" data-host="kali"><code class="language-bash">python instagram.py markmuthii00 mark.txt 16</code></pre>

The script should start running and you should see this on your screen

<img class="img-fluid" src="../img/posts/kali-instagram-bruter-running.jpg" alt="Kali Instagram Bruter Running"><span class="caption text-muted">Instagram Bruter Running</span>

Now, depending on factors such as the speed of your internet, how many words are in the password list, how complex the password of the target account is among others, the script may take seconds, minutes, hours, or even days to uncover the password (yeah - imagine you have a list with 1B words). 

If you're confident in your list and the naivety of your target, then wait for IGB to do her thing. Once the right password is found, it will be displayed like so:

<img class="img-fluid" src="../img/posts/kali-instagram-bruter-password-found.jpg" alt="Instagram Bruter Password Found"><span class="caption text-muted">This is the password you were looking for</span>

## Wrapping Up

The password list created using CUPP can not only be used on your Instagram account, but also for just about anything that can be brute-forced (think Facebook, gmail, yahoo etc). 

And yes, there are tools just like IGB for almost every platform worth the effort on the Internet. And if a tool doesn't exist, then a determined hacker will simply write up their own script that works for that platform.

So how do you protect yourself and prevent unauthorised access into your accounts? 

Well, if I'm being honest, it is impossible to be 100% secure on the Internet. Unless, of course, you're an InfoSec jedi master, trained in the ways of information security and penetration testing for ages. And I bet you're not.

But not all hope is lost. You can still minimize the chances of being hacked by doing the following:

1. **Use strong passwords**. This is a no-brainer. You've seen how password profiling is done, so avoid using terms such as your name in your passwords. Don't even substitute them with numbers (for instance a with 1, b with 2 or any other kind of substitution). Activating the leet option in a password profiler can easily crack these.

2. **Don't use the same password across multiple accounts**. Once a hacker gets access to one of your passwords, chances are that it will be the first to be tried in subsequent attacks. Hatch your chicks in separate baskets.

3. **Use two-factor authentication (2FA)**. If the above dummy account had 2FA activated, just having the password would not be enough to gain access into the account. The hacker would still have another obstacle to overcome, one which is a lot more difficult than cracking a password. 2FA adds an extra layer of security, and most times, requires physical access to your phone in order to bypass. So, don't make it easy for them. Activate it in all supporting accounts.

4. **Don't save your passwords in your browser**. I know, no one wants to have to remember all their passwords, especially after finding out they shouldn't use one password in more than one account, and most people result to saving their passwords in their browsers. For the love of what is good, don't. do. this. All it would take to have access to _all_ your accounts' credentials would be to hack your one email account. Alternatively, a USB drive and physical access to your pc for just 20 seconds would be more than enough to harvest them all. And the worst part is, _anyone_ with an Internet connection and a pc running whatever OS can learn to do this in minutes (which reminds me, be very paranoid about the flash drives you allow to connect to your pc). Find a secure password keeper program instead, or even better, store them where no one can reach, your mind.

5. Implement all the other tips you read about on securing your digital life. There are other things you can do, but listing them here would be a redundant feat because these tips are spread all over the Internet. I mentioned the above because they are most relevant to this post. You can google the rest.


Alright folks, I'm done for today.

Remember, if you want to be the first to know when I release a post in this and future series, use the 'Never Miss a Post' button on the <a href="/">home page</a>.

Got a question or comment? Tweet me <a href="https://twitter.com/muthiimm" target="_blank">@muthiimm</a>, or <a href="https://mark.muthii.me/contact">send me an email</a>. 

I must reiterate, do not use what you have learnt in the post for unethical activities. Get consent from account owners first, or use it to test your own account security.

Till next time, stay awesome and hack on!

<hr>