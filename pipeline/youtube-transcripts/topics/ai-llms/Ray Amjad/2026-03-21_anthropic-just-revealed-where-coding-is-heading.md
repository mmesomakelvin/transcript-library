---
video_id: "pOsGxVKYd3s"
title: "Anthropic Just Revealed Where Coding Is Heading"
channel: "Ray Amjad"
topic: "ai-llms"
published_date: "2026-03-21"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=pOsGxVKYd3s"
duration: 740
word_count: 2713
---
Okay, so I woke up about 20 minutes ago
and it turns out Anthropic released yet
another Claude code update. And this one
is quite interesting cuz it kind of
gives us an idea of where Anthropic will
be taking Claude code and where the
wider software engineering AI coding
space will be heading as a whole in the
next couple of months and over the
course of this year. And that is
essentially being able to run recurring
cloud-based tasks on Claude code.
Now, I'll quickly explain what this is
and then go through an example and then
some of the consequences of doing this
as well. So, essentially we kind of had
the ability to run scheduled tasks on
Claude code, but that happened locally
on your computer instead and that
required you to have your computer
running all the time. But now it can run
on Anthropic servers instead and then to
connect to MCP servers and stuff via
their own cloud servers. So, essentially
you would define a GitHub repo, you
would give it a prompt which would run
on a recurring basis and then you would
give it a schedule of like every hour,
every day at 9:00 a.m. or something and
then you can just exit out of Claude,
you don't have to have it running and
then it would just run in the background
on that schedule. And some of the things
Anthropic have been doing with this is
having a bot that would go through all
the pull requests and fix any errors or
obvious mistakes. They would have like
another schedule to find CI failures,
for example. They would have another one
auditing their dependencies on a regular
basis and then they would have another
one to regularly update the
documentation with what is written in
the source code. So, let's set up one
really quickly. So, you want to go to
Claude and then go to scheduled over
here. Press new task and you'll see a
new option of new remote task. And one
of the main benefits here is that this
is just easier to use because you don't
have to worry about turning off your
computer.
And then you choose a project. So, I'm
going to choose Hyperspace. I want to
have this run on an hourly basis
and then I'm going to call this like
Sentry fixer.
So, we can add connectors as well. So,
we have Gmail and Google Calendar and
then I can add Sentry too, but I need to
firstly go over to customize over here.
Go to connectors, search for Sentry, but
we can also add a custom connector which
is basically a remote MCP server here.
So, browse connectors, Sentry, connect
that to my Sentry right over here. And
now that we have Sentry hooked up, I'll
give it access to all the read-only
tools
uh and this looks good. And then I will
basically say something along the lines
of, "Can you go through Sentry, uh find
any recent issues for the recent version
of the application that are affecting
three or more users, find a fix and then
create a brand new PR after applying the
fix." And this will run continuously in
the background on the cloud every hour.
So, pressing create right over here. And
we can also take this one step further
by making custom environments. So, doing
a new task, new remote task.
Clicking on default right over here, we
can add a brand new environment and then
I can call this something like default
with Telegram, give it full unrestricted
internet access over here and then I can
add environment variables for my
Telegram bot token and user ID
and paste it here, create environment.
Once you make a fix, can you basically
send me a message on Telegram using the
environment variables that you have and
let me know what the issue was, how many
people it affected and the fix that was
made. And now whilst this is running, I
want to talk about some of the
implications here. So, if you spend any
time on X, then you will know that we're
increasingly moving towards a software
factory where you can kind of imagine
that overnight an AI assistant is
basically going through your GitHub
issue backlog, tackling each feature and
then making brand new PR for you to
review when you wake up in the morning.
So, we basically have agents running all
the time around the clock, always
improving our software. And with the MCP
connection like I showed you with
Sentry, for example, you can just have
errors automatically fixed around the
clock and just there for you to review.
And then have any alerts or messages
sent over to Slack for you if something
happens, a PR for you, any tickets
automatically dealt with on Linear and
then have it connected to other things
as well, kind of like User Jots which
are online feedback boards where users
can leave feedback on your application
and upvote and downvote features.
Essentially, by combining all this stuff
together and having it running on the
cloud on a regular basis like Anthropic
added today to Claude code, it basically
means we're moving towards a software
factory model where we essentially have
some kind of information going in on the
uh left, whether that be some kind of
specification or a bug report or like a
Slack message or a Linear issue and then
AI will automatically go through the
entire process of writing the code,
running any test or build commands that
may be connected to your own custom API
integration, making any optimizations,
maybe getting a second opinion from
another model and then you just have to
be there to maybe give a quick glance
over the code and then you can ship it.
And I do think another part of this job
will basically be that maybe over the
day you would just be spending the
entire day writing specs and then wake
up the next day for all your specs to be
built out. And a lot of people have been
doing this to like some kind of degree
over the last few weeks with the brand
new loop feature in Claude code and
scheduled tasks running locally on your
computer. But I think by Anthropic
basically allowing scheduled tasks on
the cloud with Claude code, it's taking
it one step further in the sense they
want to be part of this software factory
model because it essentially means that
we will be consuming even more tokens
from them. And you could kind of do this
before by having Claude code running
inside a cloud-based sandbox, but
Anthropic just made it even for us with
a native integration which kind of
suggests that this is a direction that
they're heading. So, I'm sure that
sooner or later we will be seeing like
headless versions of Chrome running on
Anthropic servers that will do the
manual QA testing for us as well. Kind
of like we've seen with the recent
cursor updates and essentially overnight
Claude code would just be picking up the
highest priority ticket, automatically
executing on it and making PR pretty
much every single day. And the average
engineer or developer would just be
waking up to a brand new draft of a PR.
They may leave a few comments for Claude
to execute on and then they would be
shipping features at like a crazy rate.
And it may even be the case that when
the agent has some ambiguity of what
should be like implemented or done or
has a few different ways, then it could
just send you a like voice message on
Telegram that you could listen to and
send you a few images about like, "Hey,
what do you think needs to be done in
this situation?" You quickly reply and
then it would just continue on from
where it left off and make those
changes. So, we kind of imagine these
agents as actively working for us around
the clock and we're just like responding
to them and making some of the key
decisions along the way. And this is
leading on to the software factory model
that many people have been talking about
where you may have some kind of agent
monitoring your dashboards continuously
like every hour or every day and
automatically flagging any issues or
errors. It may then write a file or
something or ask you some questions and
then make a spec which would be saved
into a folder on the repo and then
another agent would pick it up or
something like that. And then we would
have some like testing agents. And it
may even be the case that when you make
a task, a remote task, you give it
access to your Gmail in case you have
bug reports coming in by Gmail because
for my applications I'm really fortunate
to have users who send me bug reports
via Gmail and also feature requests. And
then using the Gmail connector over
here, Claude could automatically pull
those in and then make those fixes
around the clock. Essentially, more and
more people are believing that we're
going to have this approach in the
future where we have agents working for
us around the clock and it's more
important to have the right pipelines
set up for the agents to work
effectively inside, whether that be via
the right connectors, whether to use
Telegram or Slack. And the average
developer role is slowly shifting from
being a worker along that assembly line
to being like a factory floor manager
where agents are doing most of the
production and you're just like testing
the output, approving it, like declining
things and then just optimizing the
factory line. And I can see that this
literally happened whilst I was
recording this video because it
automatically ran the task, it found a
bug and then fixed it and then sent me a
Telegram message right over here
explaining what it did alongside the
records and I can just click on this,
open up the PR and be like, "Hey, this
looks good." Or I can give it a message
and change my scheduled task prompt to
be like, "Look at any of the recent PRs
and look at any comments that have been
left there and then continue on with
that particular task, for example." And
I think that because of this software
will be evolving at an even faster pace
than it currently is. And whilst this
setup may not be completely replicable
within side of Claude code right now or
like the cloud version, I imagine that
many of the features that adding over
the next couple of weeks and months are
kind of pushing us towards this approach
because ultimately these AI companies
want us to consume even more tokens to
increase our AI spend and this is one
way of them doing so. And now you may be
thinking to yourself like, "Why would I
even want to do this? If the model is
already introducing this many bugs into
my code base and causing problems left,
right and center, why would I want it to
run around the clock and make even more
commits and changes and open more PRs?"
And when you watch interviews from the
Anthropic employees or just any startup,
&gt;&gt; From the very beginning, we bet on
building for the model six months from
now, not for the model of today. They're
building for where the models will be
six months from now rather than where
the models are right now. So, whilst you
may not want to do this with Opus 4.5
and having it running your software
factory at full capacity, you should
kind of like start thinking about this
over the coming weeks and months because
this is where we're seeing things
heading. Right now, you may be in a
situation where you're reviewing pretty
much everything that Opus 4.5, Opus 4.6
is writing. And then once we get to Opus
5, it's likely that you will just be
doing a quick glance over like anything
it's written. And eventually we may even
have this lights out factory running all
the time without any human intervention
whereby essentially errors are
automatically discovered, bug requests
and features are automatically
identified and then humans only have to
put in a small amount of judgment of
like, "This is clearly a a feature, we
don't want this in our product." Or this
is a good feature. And the way that I
see this right now is that Anthropic is
basically focusing on setting up the
infrastructure for us right now. So,
whenever Opus 5 releases, Opus 6
releases, then people will just be able
to turn on their software at factories,
and then just have like a huge amount of
code being produced overnight, and the
application just getting better and
better by the day, by the hour, or
something like that. And I don't really
have an opinion on whether this is a
good thing or a bad thing. I guess we'll
have to wait and see. Um but
essentially, this is what many of the AI
companies right now are building
towards. So, all I can say is right now,
you may want to play around with this,
try and set up a mini software factory
yourself where it's solving like century
issues around the clock. Maybe you can
do something like using Granola MCP, and
then connect Claude Code to Granola, and
have it so that anything that's
discussed in like product manager
meetings is automatically built out as a
prototype in a brand new PR branch. So,
then you can test it like 1 hour later
or something like that. Ultimately, I
would just say like play around with
this because once we do get to a stage
of having a software factory, as many
people on Twitter are talking about, and
as many companies are building towards,
then you will see production of software
like massively ramp up in the sense that
many big organizations will be shipping
new features almost every single day.
And I imagine that right now Anthropic
have their own version of a software
factory with some kind of internal Opus
5 managing it, which is why they're able
to ship a brand new update like pretty
much every single day or sometimes twice
a day. Anyways, no matter what happens,
I will be covering this in much more
detail in my Claude Code Masterclass,
setting up a software factory, thinking
about it, and so forth, because it's
clear that this is a likely direction
that we're going to be heading in from
now. And this video was mostly my own
thoughts about where I think things are
going, and I do share much more of them
in my Claude Code newsletter that will
be linked down below. And if you do have
any opinions on this, then do leave a
comment down below or send me an email,
because I think it's really interesting
where things will be heading over the
coming weeks and months, and software
has changed more over the last year than
it has over the 20 years prior to it.
So, yeah, it's really interesting,
really fun. And if you do enjoy this
kind of stuff, then do let me know and
subscribe to the channel because it
means that I should be making more about
this. And if you're one of the software
engineers who are like, "Wow, this is
like way too much for me. Like, I'm just
going to quit my job, like open a cafe,
move to countryside, and start a farm,
or whatever." Then I don't really blame
you because I also feel like that
sometimes.
