---
video_id: "QCf8BCT-Kzo"
title: "I Gave OpenClaw Its Own Computer (Here's Why)"
channel: "Sean Matthew"
topic: "ai-llms"
published_date: "2026-02-24"
ingested_date: "2026-07-12"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=QCf8BCT-Kzo"
duration: 553
word_count: 1848
---
Open Claw is one of the most inspiring
things to happen in the AI space in a
long time. So much so that it inspired
me to get back in the game and make this
video. Now, truthfully, my Open Claw
journey got off to a super shaky start.
I thought, why not start with my 2015
era
iMac.
&gt;&gt; [snorts]
&gt;&gt; Big mistake. After spending 2 hours
trying to install the latest version of
Node, I found out this thing can't even
run Claude Coder Codecs. Then I thought
to myself, what would Andrej Karpathy
do? And if you already know what he did,
you already know the answer.
Enter the Mac mini. Now, admittedly,
these are a bit hard to come by these
days, and it seems like everybody is
posting about using one of these. It's
getting a little bit crazy. But, I have
to admit, I am a true believer now
because I have an agent running locally
on my desk 24/7 managing my calendar,
managing my YouTube channel, important
daily briefings, managing my to-do list.
And these are all pretty basic, easy
things, but I'm just getting started
realizing the potential of Open Claw.
And today, I'm going to show you guys
the whole thing and why I think giving
Open Claw its own computer is the way to
go. Let's get into it. Open Claw is
everywhere right now on YouTube, X,
Reddit, you name it. Everybody is
posting their amazing workflows, setups,
all these cool use cases. And honestly,
after seeing that, I had to try it for
myself. If you're not familiar with what
Open Claw is, it's an open-source
framework for running your own personal
customized agent 24/7 who does anything
you really want. The sky is the limit.
You connect this thing to skills and
tools, and through an amazing
self-learning and recursive process,
which is really the secret unlock of
using Open Claw, that it can learn from
itself and improve, you can create
pretty much any workflow you want to
help you run your life, your business,
whatever. I'm not going to get into
exactly how to get this up and running
because I think it is pretty simple.
They give you a quick start here. Just
copy and paste this into your terminal
and walk through a very simple
onboarding process where you can pick
the models you want to use to run your
agent and various things like that.
Again, it's a really simple step-by-step
process. Getting up and running is not
really the hard part. The hard part is
tinkering with your setup and making it
basically do what you want. So, once you
hook up tools to it, you will have to
constantly tinker with it to make it do
what you want. be frustrated at first,
believe me. Not everything will work
right out of the gate, but that's kind
of the beauty of working with this. You
can constantly tinker with it and make
it better. And the agent's memory system
will learn from that and basically do
any workflow you teach it better and
better each time. But, the crux of this
video, why give OpenClaw its own
computer? I want to get into my setup
and why I think giving OpenClaw a Mac
mini is an amazing way to use for your
own personal workflows. So, let's get
into that. So, why give OpenClaw its own
computer in the first place? Okay, so
let's talk about one thing, and that is
what if you just put OpenClaw on your
main machine, like your main MacBook
that you use? The issue is that OpenClaw
is a persistent process. It needs to be
always-on 24/7 in order to do work 24/7.
It's basically like a server. So, if you
run this on your main laptop, the laptop
closes, the agent dies. If there's a
restart needed, the agent dies. Also, it
can be resource-intensive depending on
the workflows you give it. So, if you're
running it on your main machine, it can
run into problems there. Also, OpenClaw
can be fairly unhinged, meaning you can
give it basically full access to your
computer. And if you're putting it on
your main work laptop or personal
laptop, you probably don't want to give
it access to the full computer, the full
file system, et cetera. You want to
narrowly scope its permissions to give
it only the access that it needs. Now,
enter the solution of using a separate
Mac mini. You basically have a dedicated
machine that is on 24/7 and that is
dedicated solely to using OpenClaw. And
the Mac mini is also special because
it's pretty low power draw, it is quiet,
it's compact, and there's also something
really cool about having an agent that's
living on your desk that you can look
at. And of course, Apple products are
awesome. I use a lot of Apple products,
so being a part of the Apple ecosystem
has its advantages, which I'll get into
next. Now, what about running this thing
in the cloud? Yes, you can use Digital
Ocean or Hostinger or Railway, and
indeed these services have very
easy-to-use one-click templates where
just for a few dollars a month, you can
spin up and run an OpenClaw instance in
the cloud for very cheaply. The issue
is, unless you are a very experienced
user who understands a lot of things
about cybersecurity and network
permissions and things like that, you're
going to potentially run into trouble
with securing your OpenClaw. Keeping it
secure in the cloud is way, way harder
than keeping it secure on your local
network on a machine that sits on your
desk. So, that's one of the main
advantages of having this thing run
locally. But, the main advantage of
using OpenClaw on its own Mac mini or
Mac Studio, especially if you use a lot
of other Apple products like I do, is
this: it's part of the Apple ecosystem,
meaning that you can give your OpenClaw
agent its own Apple ID on its Mac mini.
And that means you can add it to your
iCloud family, and you can share a lot
of things super easy and super
seamlessly, like calendar access,
reminders access, shared iCloud Drive
folders. I've got one right now sharing
an Obsidian vault between my main
MacBook and the OpenClaw Mac mini. And
with the podcast app, you can give your
OpenClaw agent access to any podcast you
follow, and it can pull transcripts
natively for free using that app. Any
native Mac app it can easily integrate
with and you can easily share between
devices and it syncs automatically. So,
you can AirDrop stuff between your
iPhone and your OpenClaw Mac mini. You
can just seamlessly integrate all these
pieces together and I think that's what
makes the Mac mini route really
compelling. So, this is my OpenClaw
architecture and we'll get into each of
those pieces in a minute. But, one other
thing I wanted to point out, which is a
huge advantage of running an OpenClaw
instance locally on your own machine, is
the ability to set up a Tailscale
network. Now, if you're not familiar
with Tailscale, don't worry. It's just
basically a private VPN. It's a private
encrypted network for all of your
devices. And setting it up is super
easy. You just download Tailscale on
each of your devices, your iPhone, your
MacBook, your OpenClaw Mac mini, and it
creates a virtual private network. So,
each device gets its own Tailscale IP
address and name. And what that enables
you to do, and why this matters, is you
can access any device on your Tailscale
network through another Tailscale device
from anywhere. It doesn't have to be on
your home network. And through the
Tailscale serve process, you can
actually serve your OpenClaw computer.
And what that does, it will expose it as
a local service. So, you can reach your
OpenClaw gateway from anywhere. And the
best part about it is the communication
between your Tailscale devices is
encrypted end-to-end. And again, this is
a big advantage over using a virtual
private server. I'll put scale link in
the show notes so you can learn how to
set it up on your own. So, just to
recap, why give OpenClaw its own
computer? Well, it's an always-on
available device that sits on your desk
and not on your main computer. But, it
has full access to all the native Mac
apps that you need, whether that be
podcast, calendar, a task management app
like Things 3, Reminders, Apple Notes,
etc. And you can use shared iCloud
folders as another method to share data.
There's also family sharing for app
access and calendar, which makes these
things a lot easier to sync. And of
course, secure remote hosting via
Tailscale, which brings me to my Open
Claw setup and how I run this on my Mac.
As you can see, I've named my Open Claw
agent Jarvis, and right now he does a
lot of different things for me. So, I
interact with Jarvis through Telegram,
and I have a bunch of different topics
that I use in a group chat for each of
the workflows that I engage with Jarvis.
Whether that be a chief of staff to
manage my calendar and tasks, or a daily
podcast digest, or interacting with my
Obsidian Vault, I can communicate with
Jarvis in real time. I also can email
stuff to Jarvis because through Agent
Mail, Jarvis has its own email address.
I use a combination of different models
to work with Jarvis, but I find that
Claude Sonnet 4.6, which is of course
Anthropic's latest release, is a really
good model to use as your main driver.
Now, in the coming weeks, I'll be going
into some deeper dives into these
workflows, including my storage system,
my Obsidian second brain, my podcast
digest, and each of the various use
cases that I use. But, I wanted to
preview this for you guys and show you
at a high level how all of these things
fit together on my Mac mini and how
Jarvis runs. If you're thinking about
setting up Open Claw, I highly recommend
that you give it its own computer. And
if you're interested in any of the
workflows I discussed today and the deep
dives, make sure that you're subscribed
to my channel so you don't miss out on
those. And drop a comment down below
tell me what you want to see next.
Thanks for watching, and I'll see you
next time.
