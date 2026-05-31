---
video_id: "cT22fTzotYc"
title: "FREE Phone Calls with Claude Code"
channel: "NetworkChuck"
topic: "ai-llms"
published_date: "2026-01-23"
ingested_date: "2026-05-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=cT22fTzotYc"
duration: 1191
word_count: 4538
---
Hey, watch this.
Hello, I'm Stephanie. How can I help you
today? Hey Stephanie, can you tell me
how healthy our storage cluster is right
now?
Chuck, your storage cluster is healthy
overall. One drive is down on
Gryffindor, but everything else is
running perfectly.
Thank you, Stephanie. Have a good day.
Did you see that? I just called my
server. My server has a phone number.
That's not the coolest part. By the end
of this video, you're going to watch my
server call me.
&gt;&gt; Hello.
But how? Three things: 3CX, Claude
[music] Code, and coffee.
Let's go.
Okay, first 3CX, my phone system. I was
not supposed to do this, connecting my
phone system to Claude Code. Because
here's the thing, 3CX, they are
sponsoring this video and they reached
out to me and said, "Hey Chuck, can you
make a video about our AI receptionist
and transcription features?" And I'm
like, "Nah, that sounds kind of awesome.
Sure." But I took it too far, way too
far. And I hope they're okay with this,
cuz disclaimer, the AI features they
have, that's a paid feature. It's worth
it. But what I did to get this phone
system connected to Claude Code, all of
you can do it. It's part of the free
tier. You can do it right now. Now,
we're going to go down that rabbit hole
here in a second. It's going to require
a lot of coffee because it's awesome.
Little coffee break.
Ah, networkchuck.coffee. Now, turns out
their built-in AI features are actually
pretty cool. It took me like 10 seconds
to set it up. I just went to settings,
added my API key, created my AI
receptionist, Dolores Umbridge, gave her
some contacts. Oh, look at these
settings. If caller is abusive or
frustrated, end call. We're going
[music] to have to test that. Actually,
let's test it out now. Let's see if she
knows me.
Hello, Chuck. This is Dolores. How may I
help you reach the right person or
department?
&gt;&gt; Yeah, I just want to know more about
Network Chuck. He loves coffee,
especially coffee from Ethiopia. He has
around 5 million subscribers.
&gt;&gt; All right, listen, Dolores, I'm tired of
this crap. I'm being belligerent. I'm
being rude. I'm sorry, but we won't be
able to continue this conversation.
That's It works. Not going to lie,
that's pretty cool and it was really
easy to set up. And they also have AI
transcription. You can use Open AI,
Google, or even 3CX locally. But
anyways, this AI receptionist had me
thinking, thinking about context.
Because what if I could connect my 3CX,
my phone system, to Claude Code? Why
would I want to do that? Well, because
Claude Code is where I live nowadays.
It's where I build my workflows and it
contains a lot of the context about me
and my business. If I could just pick up
the phone and call and talk to Claude
Code from anywhere, even with an old
analog phone, think about that. No
internet required. I could be in the
middle of nowhere and all I can find is
a payphone, I could still call and talk
to the most advanced AI known to man.
There's something kind of romantic about
that combo. And seriously, doing this
unlocks superpowers I didn't even know I
was missing, like having my servers call
me. That's just It's crazy. But how are
we going to connect a phone to a
terminal?
So, here's our mission. We're connecting
old technology to new, a phone system to
Claude Code in the terminal. How are we
going to do that? SIP. A SIP of No, I'm
just kidding. Actually, you know, it'll
help.
SIP is the Session Initiation Protocol.
This is the protocol that makes Voice
over IP work, which is how most phone
calls work across the world right now.
When I pick up my desk phone and make a
phone call, it's sending SIP messages to
3CX, the brains of the operation, who is
then sending SIP messages to my PSTN,
which will route my calls wherever I
want them to go, the world. It's these
SIP messages, this protocol, that
establishes communication and makes
phone calls possible. So, what if I gave
Claude Code the ability to SIP? I could
give him a phone number and 3CX could
communicate with him over SIP. I mean,
it's just a messaging protocol, it
should be pretty easy, right? Well, I
almost spent a thousand dollars a month
to get this working. I'm not kidding.
Because to get this working, I needed
two things. First, I needed a SIP server
that could handle all that communication
on behalf of Claude Code. But setting up
the phone calls is only half the battle.
I also needed a media server. And it was
handling this little part of the diagram
you see right here. This is a good
example of a SIP call. Notice, once the
call is set up with all of this fun
stuff right here, all the SIP messaging,
then we have the media. This is the
actual audio files, the voice, the hold
music. That's a whole separate thing.
Now, the good news is I found out people
do this all the time. They build VoIP
applications. The bad news is that there
was one solution that all my research
kept pointing to, an awkwardly named
product called Jambones.
I don't I don't know. And it sounded
like the solution, like it handled both
SIP server and media server stuff. But
then look at this price.
So bad. $1,000 a month for a single node
self-hosted server. I was about to do
it. I was reaching for my wallet, cuz it
was either this or build my own SIP and
media server from the ground up. But
then I learned something. I was so happy
I found this. It turns out that Mr.
Jambones here, he's a big fan of open
source. What I mean by that is, under
the hood are two open source protocols
or solutions that make him happen. One
is a SIP server solution and one is a
media server. Both of these are free and
open source. So, a few Claude Code
sessions later, boom, I had a completely
free SIP application. And shout out to
them, by the way, they are awesome. So,
here's the diagram that Claude made me.
This one's pretty easy to follow. It
also made me this very cursed one, which
looks kind of awesome, but it's really
hard to follow. So, we got Drakteo and
FreeSWITCH as my SIP stack. And at this
point, I was almost there, but I did
need some kind of interface, some
wrapper that could accept the SIP calls
and hand them over to Claude Code, and
then Claude Code hand his messages back
over to the SIP side. This is a fun
little server running on the Well,
actually, the Mac I have right now. This
Mac. There he is. This little server
running on my Mac does voice activity
detection, so it knows when I start
talking and when I stop talking. It uses
Whisper to take my speech into text and
then Eleven Labs to go TTS,
text-to-speech. I know it looks
complicated because it is. This took a
lot. But don't worry, the tutorial I'm
going to show you, which will actually
be a separate video you can check out
here on the second channel. I made it
pretty easy to install. It's like a
one-liner in the command line. But
before you go out there and go crazy,
let me show you my favorite thing about
this. You see, with traditional Voice
over IP, when you add an external
service, let me get back to Photoshop
here. There he is. Most of the time,
this connection between 3CX and my
Claude Code SIP magic would be a SIP
trunk. But I didn't want to do that
because 3CX, with their SMB free tier,
they don't allow custom SIP trunks. So,
instead of doing a SIP trunk, I have
Claude Code, and this is so cool, I love
this. I have it registering with the 3CX
phone system like it's a phone.
Just a phone. It shows up as a person.
It has a ready status. It can make calls
and we can make calls to it. And now I
can just call Claude Code. And I added
in some fun things like the hold music
because, you know, Claude likes to
think. It's not real-time voice like the
AI assistant on 3CX, although I may try
to add that. It's a good idea. Maybe
another layer on top of that. Okay,
we're we're getting off track. And of
course, I had to add some special
prompts so it wasn't too verbose. And my
main assistant is Morpheus. He's my
executive AI assistant for everything.
This is his voice.
His number is 9000.
Hello, I'm your server. How can I help
you today?
He's great. But the power here is not
that I'm just talking to some AI. This
is Claude Code, my Claude Code,
unlocking ridiculous things like skill
access and access to all my stuff.
Seriously, I built this just before
Christmas break and during all during
Christmas, I was telling everyone about
this. I was showing them this. I'm like,
"Look, I can call my stuff." Not a lot
of people got it. I'm hoping you
understand.
Okay, let me show you three things real
quick that make this incredible, that'll
make you just have to do it. That's my
goal, cuz you got to do it right now.
Let me get my Claude Code visual up so
you can see it actually happening. I'm
going to call Morpheus.
Hey Morpheus, I want you to create a
ClickUp task, um, assign it to me, and
just have it saying you need to finish
this video, Chuck, right now because
you're way behind on it, and that's it.
It's a nice hold music.
And then,
boom!
It starts going. And he's using a skill,
you can see that here, and he's creating
a ClickUp task for me. That's my project
management software.
Okay, thank you. Um, also, can you send
me a direct, um, Slack message with that
ClickUp link?
Now, what I'm showing you is number two.
Notice, he's keeping context. We're
keeping that session going. Oh, I just
got it. Let me go see. Yeah, there it is
from Morpheus.
Thank you, that's all.
Let's see if that worked. There it is,
assigned to me. Done. The third thing is
that you don't have to wait. You can
fire and forget. Like, watch this. I'll
call Morpheus back.
Hello.
Hey Morpheus, use your thumbnail skill
to make a thumbnail of me holding an
analog phone, and I want the phone
connected to a, uh, terminal running
Claude Code. Make it hyperrealistic.
Send me the finished thumbnails as a
Slack message.
And I'm just going to
hang up. Because what's going to happen
is he's just going to go Watch. He's
going. So, I can be out and about and
just call Morpheus, be like, "Hey, I got
this crazy idea. Do this one thing or
run this whatever, create a task,
whatever." Hang up and I'm done. Now,
this process does take a while because
it'll create a bunch of thumbnails,
it'll verify that it looks like me, and
then kick it off to me. Okay, I just got
a Slack message. Let's check it out. And
there they are. Not bad. That's not me.
I think it heard me say cloud and not
Claude.
Now, I think it's time to introduce you
to somebody. She's nice, a little bit
sassy, and knows a heck of a lot about
Ceph storage. Her name is Stephanie.
Stephanie is my Ceph cluster. Now, I
really can't take credit for the name
Stephanie. My AI actually came up with
that. And I'm like, "Okay, that's
awesome. I'm going with it." Do you have
a better name? Comment below. We can
call it Dr. right now. Extension 9002.
Hello, I'm Stephanie. How can I help you
today? New me, same sweater, different
mug. Had to go home and get dinner. Now,
where was I? Oh, yeah, getting back to
Sephanie. I realized I didn't really
explain how Sephanie works. I mean,
we're calling and talking to Claude,
right? But what does it mean for her to
be Sephanie? How did she become Sephanie
versus just like the basic Claude code?
It's just a few prompts and a few
guardrails. And the beauty of this is
that you'll be able to create whoever
you want to create and plenty of
distinct extensions. Cuz remember, we're
connecting to a phone system, which
means you can have as many free calls as
you want. You can create an entire
company of these guys, these agents.
Now, Sephanie, her brain lives inside
Claude code. And it's actually right
here, the AI server or rather the API
server. This is going to be running on
your machine, whether it's Linux or Mac.
I'm not supporting Windows. Sorry.
Sorry, Windows. And it's here that we'll
see like you are Sephanie with a prompt.
And this will send this Claude code
command to Claude code. And we can
specify like, "Hey, you have access to
these skills." So, you might have access
to my storage skills, so you can only
work on storage stuff. And whenever I
ask about anything, you do this. We can
be very specific. We can add as many as
we want. It's very fun. Now, I think
it's time. I think we show off how
Sephanie can call me and not me just
asking for it, but monitoring my stuff
and going, "Oh, no, something's wrong. I
got to call Chuck and let's talk about
it. We'll have a conversation."
That's crazy, right? But let me show you
this. As part of my Claude phone, this
is what I'm calling it now cuz I'm kind
of a developer now. Everyone is. I've
created what's called a call skill. So,
I can do this. I can say,
"Call extension 1000
and tell me I'm awesome."
So, now I've given Claude the ability to
actually call me.
Just wanted to let you know you're
awesome.
&gt;&gt; [laughter]
&gt;&gt; How cool is that? I can also do this.
So, that was just like a drop it and go.
Just wanted to call you and tell you
you're awesome. Or I can say, "Make it a
conversation.
Keep it going."
&gt;&gt; [bell]
&gt;&gt; Hey, I just wanted to call and tell you
that you're awesome. Seriously, you're
doing great. How's your day going?
Uh my day is going great. You're so
encouraging. Thank you.
Now, he just put me on hold cuz he has
to think. We should all be more like
Claude code. We have to think before we
speak. I just wish I could put on
elevator music for people. That's an
idea. I'll think about what we can do
with that, right? I can say, "Hey,
Claude, real quick, I need you to call
my wife and tell her something." Like,
I've done that and it totally works and
it's so weird. I had Sephanie call my
wife and she did not like that.
But I can also do this. I can be like,
I can be like, "Hey, look at my latest
YouTube stats and then when you're done,
call me and tell me about it."
And I can just walk away. And that's
what you probably saw in my my Mac
Studio videos. I was working on a bunch
of things and I'm like, I I I I'm not
I'm going to forget Claude is finished.
So, I'll just have it call me when it's
done with something and tell me about
it.
Hey, Chuck, your latest video, I built
an AI supercomputer again, is doing
great. You're at 386,000 views.
You get the picture. But how cool is
that? That right there, I'm hoping will
just make a billion ideas burst into
your brain cuz you can do anything with
phone now. Now, right now, this is all
internal. This is 3CX. This is a phone
system, unlimited calls to all the
extensions I set up on 3CX. If you're
new to phone systems, welcome. It's
really fun. You should put a phone
system in your house. I did it right
here. It's free. But also, if you
connect your phone system to the PSTN,
like you get an actual real number that
people can call, that opens up so many
more things.
I legit tried, this is very basic, I
tried to find out if a restaurant was
open on New Year's Day. I'm like, "Hey,
call them and figure it out." It kind of
did it. It told me they were closed but
only because it reached voicemail. But
just think about what we can do with
this. Now, let's have Sephanie
troubleshoot my NAS. Before this, I'm
relying on N8N. And it's the simple
workflow right here. And the reason I'm
using N8N is because it's a great way to
orchestrate tasks. I could do a cron job
or whatever kind of orchestration tool
might be coming out now. There's 15
things coming out every 3 seconds. But
this is a great option. Right now, I
just have a manual, boom, but I can have
it scheduled or whatever, webhooks,
whatever you want to do. It's it's you.
And then right here, I have an HTTP
request. Now, all this is doing is going
out to my API server that we have
running on my Mac here. It's how when I
pick up my phone and I call Claude code,
it's doing the same thing, talking to
the API server. And here in the request,
I'm just telling it, "Hey, check the
Seth cluster health." And then I'm
giving it an alert. If my SSD pool is
over 70% capacity, then alert me. And
I've got it configured to where it will
spit out JSON that can be parsed. For
example, we have the Boolean field call
Chuck. And if that becomes true, it will
call me. If it's false, it doesn't care.
So, it can keep logging in and checking
my server and go,
"Oh, no, something's bad. Call Chuck."
But if it's not bad, it just ignores it.
Now, right now, I know it's over 70%, so
let's watch it happen. And by the way,
this other HTTP request is just simply
what this would normally do. Ready, set,
fingers crossed. Thank you, demo. Work.
All right, it's making the request. It's
talking to Sephanie. Okay, so we kicked
off our flow. I hope this works. Right
now, you're about to see Sephanie
troubleshoot my NAS. Like, log into it,
check it out, run some checks, and if
she sees a problem, she should call me.
She's like an IT person. Moment of
truth, here we go. Get your coffee
ready.
My stomach was waiting here, it kind of
scared me. I wasn't expecting the call.
I got distracted.
It did scare me.
Hey, Chuck, cluster health check. One
OSD down. Six SSDs over 70%. Want
details?
Figure it out and then send me a Slack
message using your Slack skill when
you're done.
Now, I just told her to send me a Slack
message when she figures it out, which
is so cool, by the way. I could ask her
to fix something if she knew how to fix
it and if I had procedures for it. I
could also have her call me back. Like,
she has the call skill. She can just
call me back. Like, that's so crazy,
right? Oh, I love this so much. Okay, so
what you saw here is very much a POC,
proof of concept. Don't yell at me if it
doesn't work. But I do have a separate
video right here. If it's not out, it'll
be out soon. I'll I'll at least have
documentation where you can install this
yourself. I may have changed a few
things since this video, but it should
be pretty easy to get set up and it
should be free. All you'll need is
Claude code. But also, I wanted to point
out that 3CX did sponsor this video.
Thank you, 3CX, for helping me go down
this rabbit hole and get lost in this
idea. This was very fun. Also, this is
janky. Like, this solution, 3CX's
solution is not. And if you want a real
AI receptionist for your business or a
personal assistant with AI
transcription, they are the place to go.
But if you're a hobbyist like me and you
want to play with stuff and do something
very cool, this option's also there.
Also, if you do the AI receptionist like
I have, you can also do the Claude code
thing. I'm hoping people who have
enterprise 3CX stuff can try this. It's
interesting, right? So, think back what
we did in this video. We can now from
anywhere, from a payphone in the desert,
no internet, no anything, I can call and
talk to Claude, Morpheus, or Sephanie
and access anything within my business,
do anything, create thumbnails. And yes,
in case you're wondering, you can
connect your cell phone and everything.
I have it call my wife's cell phone when
you connect it to a PSTN and I'll cover
that in the other video. It's just crazy
powerful and I love the idea. Now, also,
you might have better ideas than me. In
fact, you probably do. I would love to
hear in the comments below or if you
want to open up some issues and do some
pull request on this project, I welcome
that. I'm not going to promise I'll look
at it. You'll probably be better off
just forking it. But I just wanted to
show this off and like just show what we
can do now. Keeping in mind, I'm not a
developer. I just cobbled this together
because I understand VoIP technology and
how it's supposed to work. So, um I
would love your honest assessment on
this. Am I crazy?
&gt;&gt; [laughter]
&gt;&gt; Let me know. Is this like just a weird
thing to do? I thought it was fun. You
should have seen me as I was getting
this set up. I'm like, "Oh my gosh, I
got it to work." And I was just freaking
out. Uh anyways, this is the first video
of the year. I hope you're having a
great year, 2026. It's going to be a fun
one. It's going to be an interesting
one. That's all I got. I'll catch you
guys in the next video.
Hey, you're still here. Um if you're new
here, I do a thing at the end of my
videos where I like to pray for you, my
audience. It's kind of weird. I get it.
I know. I'm going to do it anyway.
Now, one thing I specifically want to
pray for, and this is something that's
been weighing on me, and that's AI.
Claude code has been the thing that
everyone's been talking about. And if
you haven't played with it, you should,
but be careful because it's very
addicting and it can kind of
consume you. The more you get into it,
the more you feel left behind. And
that's what I'm feeling, a ton of
impostor syndrome, a ton of stress over
all this. And I know if I'm feeling it,
I can't be the only one feeling that.
So, I'm going to pray over that right
now. Pray over our careers and our
futures.
Um let's go ahead and do it.
God, I thank you for the person watching
this video right now on the other other
side of the screen, possibly on the
other side of the world.
I just thank you that they're here and
that they're passionate about
technology.
I thank you for who they are, their
unique personality,
everything about them.
And I ask in your name that you just
bless their lives right now. Uh if
they're like me and they're
they're wanting to be really good in
their career, they're wanting to
keep up with all the new changes and
become really good at their craft, but
they're feeling overwhelmed with AI and
how fast it's moving, I ask that you
just give them peace over that and give
me peace over that.
Um
give us a path forward, a clear path
where we don't feel
burdened or overwhelmed,
but we can take all these changes in
stride and that we won't be afraid of
the change cuz we have to change with
it,
but we'll see what the change means for
us and how we can navigate this new
world, what it means for our jobs and
our careers and what we should be
learning. Let that become so crystal
clear. And I ask that you bless us, go
before us and make our paths straight.
Let our careers take off, Jesus. Asking
in your name.
The person Let the person watching this
video just be so inspired by all this
and walk away from this moment
excited to just tackle whatever they
have in the new year. Bless their goals.
Bless their discipline.
Bless their plans.
Thank you for everything, Lord.
I ask this in your name, Jesus. Amen.
Thanks, guys. I will see you guys in the
next video.
