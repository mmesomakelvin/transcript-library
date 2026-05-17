---
video_id: "t78-JUnTK5Q"
title: "This Sandbox Tool Makes Claude Code Unstoppable (Code On Incus)"
channel: "Better Stack"
topic: "software-engineering"
published_date: "2026-02-08"
ingested_date: "2026-05-17"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=t78-JUnTK5Q"
duration: 595
word_count: 1812
---
If you've been following the headlines
lately, you've probably seen all the
warnings about the dangers of running
autonomous AI agents. It could be
accidental data leaks or high-profile
security breaches like we saw with
OpenClaw. The reality is that giving an
AI agent full access to your host
terminal is pretty dangerous. But we're
not going to stop using these tools just
because of security concerns, right?
What we need is a better sandbox. And
there is this little incredible tool out
there called Code on Incus, which lets
you run Claude code in a completely
isolated Incus container. So you can
safely run your coding agents without
worrying about having your SSH keys or
environment variables leaked. In today's
video, we're going to take a closer look
on how Code on Incus works, and then
I'll show you how to set it up yourself
so you can safely start running your own
fleet of autonomous AI agents. It's
going to be a lot of fun, so let's dive
into it.
&gt;&gt; [music]
&gt;&gt; So first of all, what is Incus? Well,
actually, I covered Incus in greater
detail in one of my previous videos, so
go check that out if you want to dive
deeper into how it works. But
essentially, Incus is an open-source
system container and virtual machine
manager that allows you to run full
Linux systems in isolated environments.
And Code on Incus takes this idea to the
next level by letting you deploy fully
isolated mini Linux machines with Claude
code pre-installed on them, so you can
use them as sandboxed Claude code
agents. It's a pretty cool idea. It
basically gives Claude its own dedicated
Linux environment. And unlike Docker's
privileged mode, Incus system containers
behave like full Linux machines, and
they also have a persistent state, so
you can stop and start sessions without
losing progress or conversation history.
One of the best parts about this setup
is that it solves the permission hell.
Usually when a container creates a file,
it's owned by root and you're stuck
running CHOWN just to edit your own
code. But Incus uses UID mapping, so it
effectively tricks the system so that
everything Cloud creates in the sandbox
is natively owned by you on your local
machine. And in my previous video, I
showed you how to set up Incus
containers on a Linux machine, but this
time I will show you how to set them up
on a Mac. So we will basically be using
a tool called Colima, which is its own
container, and we're going to be running
Incus inside of it, which is another
container, and we're going to be running
Cloud code inside of that, which is a
true Inception-style scenario. So first
and foremost, make sure you have
downloaded Colima. And on the right over
here, I have set up a simple folder
called my test app, where we will store
everything that Cloud code produces
through our Incus containers. So now
let's start a simple Colima instance,
and we will pass the mount flag to allow
writing permissions to the folder that I
just created. Once we've done that, we
will SSH into our Colima container, and
from here we basically need to follow
the instructions laid out in the code on
Incus repository. So copy these lines to
install and configure Incus, and then it
says that we should run the bash
command, but in my previous tests, this
didn't actually work as expected. So
instead, you can do the same thing by
copying the contents into an install SH
file and then running that. The setup
script will now run, and it detects that
Incus is already installed, which is
great, but we still need to configure
our firewall. But we will do that in a
moment. Right now, just click one to
build from source and let the script do
its job. Once you've done that, we can
go ahead and run our firewall
configuration commands. And according to
the instructions, the next thing you
should do is run koi build. But in my
previous tests, I encountered some
network connectivity issues. Since Incus
is running inside the Kalima virtual
machine, it creates its own virtual
network bridge. Usually it's called
incus br0 to give Claude containers
internet access. But here's where it
gets tricky. By default, Linux firewalls
and even Docker's own networking rules
can sometimes conflict with this bridge.
To fix this, we need to ensure that the
Kalima virtual machine allows traffic to
flow freely between the Incos bridge and
the outside world. We do this by adding
the Incos bridge to our trusted firewall
zone and enabling IP version 4
forwarding. And once you see success
printed out twice in the terminal, we
are now officially ready to build code
on Incos. Now, the documentation can be
a little bit confusing here because to
build the tool, you need to run a setup
script, which is inside the repo. So,
the easiest way forward is to clone the
code on Incos repository directly, then
CD into it, and then run koi build from
there. At least that's how I got it
working. The build process takes about a
minute or two to compile everything, but
once that's finished, then the fun
begins. We can now finally spin up our
autonomous Claude code agents inside
their own Incos bubbles. So, let's do
that now. To show you how this works in
practice, I've set up two terminal
windows. I'm launching our first
instance on slot one, passing in the
workspace path so Claude knows where to
save the files. And I'm also adding the
network open flag. And this is crucial
because it allows the agent to reach the
internet, download dependencies, and hit
the APIs it needs to function. I'll do
the exact same thing for slot two,
essentially creating like a tag team
duo. One agent will be entirely focused
on the back end, and the other is
dedicated for the front end portion. For
this demo, I'm going to ask them to
build a Star Wars Holocron app, a tool
that fetches character data from the
SWAPI API. And to make it more
interesting, I've also asked the
front-end agent to give the UI a
flickering blue hologram effect inspired
by the classic 1977 Star Wars terminal
look. And then, we just let them cook.
And a few minutes later, we see that
both of our agents have successfully
collaborated working in the same
workspace, and they've created both the
back-end and the front-end interface.
So, now let's open the browser and see
how it looks. Okay, so it's looking
pretty good. We have that classic Star
Wars hologram glow effect going. And
now, if I query data about Darth Vader,
we can see it successfully retrieves it.
Same thing for Yoda. And same thing for
Luke Skywalker. So, this is the power of
safely orchestrating AI agents without
ever exposing your primary host machine
to unknown dependencies or messy
codebases. And now, I want to show you
another example where this kind of
security is very useful. So, let's say
you've downloaded a file, and you
suspect this file might contain malware.
And for this demonstration purposes, I
will actually use a sample malware file
provided by the EICAR Institute that is
usually used as a demonstration file
mimicking a real computer virus. Now,
the file in essence doesn't do anything
harmful, but it does contain a malware
signature inside of it. So, now let's
suppose you have that file, but you
don't want to unzip it on your local
machine. So, this is where again, you
can use Code on Incus to do the archive
extraction for you. And then, maybe we
can use Claude Code to run a
comprehensive analysis on the contents
of that file. So, in this second
example, I've started a new Kalima
instance, and this time I'm passing in
the folder that contains the EICAR file
as a workspace, so we can then pass it
to Incus. So, I've gone through the
whole process again of installing Koi
and configuring it. And now we've
launched a new AI agent. What we can do
now is in a separate terminal window,
push the file onto the Inkoo's instance,
and you can do this by using the Inkoo's
file push command, and by specifying the
container ID of that particular Koi
instance. And once we've transferred it,
I can now ask Claude Code to examine the
contents and run a comprehensive
analysis report. So, a few moments
later, we see that Claude Code has
finished the analysis, and as expected,
it has determined that this file is
completely safe and not malicious at
all. And it did identify that this is
indeed an Eicar malware test file, and
it has laid out all the details of it in
the analysis report. So, this is pretty
cool. If you're a security researcher or
just a developer who receives a lot of
untrusted files, you can definitely use
the same process to safely and securely
inspect them. You can get all the
analytical power of Claude with the
impenetrable shield of an Inkoo's system
container. So, there you have it. That
is code on Inkoo's in a nutshell. There
are all sorts of other helpful commands
this tool provides that I didn't get the
chance to highlight in this video. Like
for example, you can launch instances
with your own custom images, and you can
manage snapshots and sessions. So, do
check out the full project to get a
deeper dive. I think nowadays, with so
many security threats on every digital
corner of the web, tools such as this
one really helps to manage AI agent
orchestration safely, and it's using
Inkoo's to do so, which I'm a big fan
of. So, that gets my stamp of approval.
But, what do you think about this tool?
Have you tried it? Will you use it? Let
us know in the comments section down
below. And folks, if you found this
video helpful, please let me know by
smashing that like button underneath the
video, and don't forget to subscribe to
our channel so you don't miss out on any
other of our future technical
breakdowns. This has been Andrus from
Better Stack and I will see you in the
next videos.
&gt;&gt; [music]
[music]
