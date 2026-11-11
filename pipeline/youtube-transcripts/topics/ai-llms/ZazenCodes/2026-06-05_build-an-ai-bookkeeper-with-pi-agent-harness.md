---
video_id: "Khfiy1lwGPs"
title: "Build an AI Bookkeeper with Pi Agent Harness"
channel: "ZazenCodes"
topic: "ai-llms"
published_date: "2026-06-05"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=Khfiy1lwGPs"
duration: 1783
word_count: 6327
---
Today, I'm showing you how to build an
AI agent. And to show you how to do
that, I'll be building it from scratch
myself, so you can follow along. Now,
this won't be a vibe coding tutorial. I
will be using coding agents, but this is
for software developers. You don't have
to be a software developer to follow
along with this video, but if you are,
you should enjoy this video because I'm
actually talking about how this works
and the core concepts behind what we're
building. We're going to be using Pi as
our agent harness, and I'll explain what
that means. In fact, I'm going to
explain everything in just a moment when
I show you the mind map for this video.
But, if you want to get right to the
demo, I've got timestamps in the video
description, and you can see a few of
the major timestamps right here on the
screen. So, let's get to it. Here is the
mind map, and if you want a high-quality
version of this, you can sign up for my
email newsletter. I just send one email
a week. Look something like this guy
right here, and it'll tell you about my
latest video. I'll explain what Pi is in
a moment. We're going to be building a
bookkeeping agent. That's the use case
that we're going to design this around.
It'll be an agent that you can receive
receipts and process those for
bookkeeping purposes. And I'll call out
right now, this video, we will not be
deploying this to the cloud. I want to
focus on the core concepts and building
this on our local system. It's not hard
to deploy to the cloud, but it's out of
scope for this video. I'm going to be
doing that in a future video. An agent
is an AI system that can use tools. It
can read files, edit codes. Basically,
it can understand its environment, and
it can act on that environment. We can
break down an agent, more practically
speaking, into a few different parts.
First of all, we need a harness, and
that is what we're going to use Pi for.
We can think of this as the agent body.
Codex, the coding agent, that's a
harness. Cloud Code, that's a harness
for a for an LLM. So, a harness is a
thing that takes a model, the LLM, the
actual brain of the thing, and and it a
body. It equips it with the abilities to
do things. Next, we have context files.
Now, even though the LLM is is the true
brain, we can think of these as kind of
the brain that augments the LLM. It's
like the sort of specific instructions
for our agent, for how it's going to
work. This is where I'm going to put all
the bookkeeping knowledge. And last, we
have skills. If you're not familiar with
agent skills, I have tons of videos
introducing these. And I'd like to think
of these as abilities of the agent. For
example, we could have a skill to do web
search. So, we wanted search Google for
some information. That could be
implemented as an agent skill. And these
things are more modular than the context
files that make up the agent's brain in
my sort of anatomy. In order to do this
demo, you're going to need your favorite
coding agent. In this demo, I will be
using Claude Code. And you're going to
need a clear use case. I am building a
bookkeeping agent. You should build
something you need. You should build
something else, like right now. Like you
should build this with me. So, what are
we going to do? We're going to build
this bookkeeping agent in a
demonstration. We're going to start with
an agent build, and I'm going to spin up
Claude Code, and then we're going to
instruct the agent to use Pi. This will
be the underlying infrastructure for our
agent system. It is the underlying
system of Open Claude. So, this is why
we're selecting Pi. And here's a rough
overview of how it will work. This is
the project we're actually going to
create right now. We're going to create
these folders, like a folder for the
brain, and a folder for skills, and a
folder for data, and this will live on
our computer. And these things will feed
into Pi. Like Pi will run with this
knowledge. This is how Pi is going to
run, and then we will be speaking to Pi.
So, I think a better way here would be
we're going to build a web application,
which will be like an interface into the
Pi coding agent. It kind of should be
down here. So, this is probably a bit
more accurate to what we're actually
doing. Cool. So, we can see now the flow
is like this, that That's a little bit
better. That makes a bit more sense.
That's the introduction to the video.
So, let's get into the demo. We're going
to create a directory for this, keeping
agent
Okay, we'll go into this repository.
This is completely empty. Now, I want to
start setting this up manually, and I'm
going to use NPM to do this, and I'm
going to be talking about some developer
stuff with NPM. If you're not interested
in seeing this, you can skip ahead when
I start using Claude code. And there's
no reason you need to actually
understand the following stuff unless
you're a developer and you're interested
in development with Node and TypeScript.
So, you can choose what you want to do,
but let me get into what I want to show
you first, and then I'll open up Claude
code. Now, I've just enabled You see in
the bottom right corner, I've enabled my
key caster, so you can try to follow
what I do. I'm using tmux. So, if I type
this, I can open up a new new pane, and
then I can switch between them. And so,
you can see the keys that I'm using for
this. My leader key is control A. The
default's control B, but I use control
A. Otherwise, that's probably all you
need to know to try and follow what I'm
doing here. Oh, the other thing is B.
So, when I want to do my screen sharing
stuff, I type B. That's how I do my
little um tool tips. So, you're going to
see a lot of that as well. Okay, let's
get out of that. Now, this is going to
be an NPM project because Pi is an NPM
library. Pi is written in TypeScript.
So, what I'm going to do is say NPM init
-y like this. All right, it created this
file, package.json.
Now, I want to make sure I'm setting the
version of NPM. So, I'm going to say NVM
use, and I'm just going to say V22.
We're going to use Node 22 for this.
Next, I'm going to start installing some
libraries. So, let me run this.
We're going to install the Pi coding
agent. We're going to install Express so
that we can run a web server, and we're
going to install .env. So, we've added
307 packages. Let me see what our
package.json looks like now.
Do you see the dependencies down here?
So, we have the pie coding agent, .env,
and express, the three libraries that we
just added. Not just that though, we
have all of the node modules. We've
actually downloaded all of those
packages onto the computer and
package-lock.json,
this has the specific versions of
everything that we're using right now.
Next, in order to ensure we're using
node 22 properly, I'm going to add an
NVM M, NVM RC file. I'm going to open
that up and inside of here, we're going
to write 22.
Now, let's say we were using NVM 19 for
some reason. Oh, I don't have that.
Let's say it was 18. So, now the nice
thing we can do is just type NVM use and
this will automatically look at this
file that we just created and it'll say,
"Okay, we need to use node 22."
So, now I can look at the node version
and we've set node to 22 even though we
didn't explicitly ask for that. So, this
is just a helpful development thing we
can do. So, let's look at what we have
now. This is what our structure looks
like. We can be a little bit more
specific about the node version. I don't
want to go I know I don't want to go
crazy on you guys. We're just at the
start of this video, but let me throw
this in anyway. So, what we would do is
put this somewhere, engines, like this.
And inside of engines, we would say node
and then we could say something like 22,
right? Like that.
And we could do one more thing. We could
open up a file called N P M R C and in
here, we can type engine strict equals
true, like that. Okay, so now that we
have this set up, let me show you what
happens. If I was to remove my node
modules and I want to remove my
package-lock .json. Okay, now we just
have the package, so we would want to
reinstall this from scratch. Let's say I
was using NVM 18 and now let's see what
happens when I try to install this. I'll
say NPM uh install
and it says what is happening required
node 22 actual npm node 18. So I could
say nvm use
and then I could say npm install.
And now it's going to work properly for
us. So this is just generally good npm
information to note. But here's the
thing, none of this stuff I've showed
you is required. You can actually just
get a coding agent to do all this stuff
nowadays. I just wanted to show you this
for fun. Now we're going to start using
Claude code. So if you've skipped ahead,
this is what we've created and I'm going
to show you how you could build this
entire structure what we've got so far
with inside of Claude instead. So what
you would do is open up Claude here and
you're going to say initialize an npm
project with the following libraries.
We're going to be using node 22 and make
sure you enforce that. That's what I
would want to do and these are the
libraries that I'm interested in
installing. This is the full thing the
full setup that we've done so far. And
now I'm just going to add a note. Oh,
actually I've already set this up. Just
confirm it looks good. Everything looks
good. All three dependencies are present
and we've enforced node 22. So that's
what we just did but if you didn't do
that yourself, you can just run this and
Claude will do that for you. We're going
to use typescript for this project. So I
want to install it this way I was
thinking. So again, you can run these
commands yourself. I want this to be
friendly for like all audiences so I'm
getting Claude to do this for me. But
check this out. Basically we're going to
use typescript and these are the script
the commands I think I want to run.
So
So we're going to do that. So Claude's
running these for us and it's creating a
new typescript config. We're
initializing like at this as a
typescript project. Let's have a peek at
our source code here. Now we have this
tsconfig. This is the new file. This
seems to be the only one. Let's show
that. I can do exclamation mark cat
tsconfig.json.
We can just print that out. So this is
not using Claude. It's not talking to
Claude. I'm just running some bash
commands. And this is the file we've
just initialized for our TypeScript
script project. If I also
look at the package, we've got some new
stuff in here now. We have some dev
dependencies. So, these dev dependencies
here,
um these would have been installed when
we ran this. And that's this {dash} d
flag. That's what's responsible for
indicating these are dev dependencies.
Now, I actually want to run pie inside
of here. And this is going to be the
base of our agent. But I want to show
you this right away before we build the
UI. I'm going to ask Claude, "How can I
run pie from inside of this project?"
Uh no, can I run it directly from my NPM
packages? Probably. Nice. So, since it
has a bin, whatever, I can run NPX pie.
All right, let's do that. So, I'm going
to go back into the bookkeeping agent
build. So, now I'm back in our
repository and crucially we have this
node modules right here. This is where
pie lives. So, I'm going to say NPX pie.
And this is our base agent. Now, as I
mentioned, this is an agent harness. So,
we can see pie is running. This is the
pie that's installed that we just
installed inside of our project here.
And I I can set a model. So, because
it's an agent harness, I need to define
some sort of model for this. And I have
open code go set up. So, I'm going to
select one of these. I'm going to choose
Minimax 2.7. I'll say, "What agent are
you?" So, it says, "I'm pie, a coding
agent harness." It's exactly what I
want. You can see me in action here. All
right, how about this? Where does your
source code live?"
"My source code lives in this package.
That's the one we just installed." And
this is the exact path.
So, this thing is running right here
with this package that we just
installed. How cool is that?
Let's go back up to Claude. Now, I want
to show you how we can give our agent
its own brain. This is where it starts
to become an agent that you've built,
your own agent. I'm going to quit out of
Claude and see what we have here. I'm
going to start by making a directory.
I'm going to call it agent home. And
then I'm going to create a file inside
of here. And the file I'm going to
create is going to be the agents.md
and we're going to point pi towards
this. So, I've just run this this
command right here. And what this did
was it created this file agents.md like
this. Demo brain, you're a local demo
pi. When asked who you are, say this.
And it's inside of here. This is the
folder structure to keep in mind as I
demo this.
Now, down in pi, I'm going to exit out
of this and we're going to need to do
one important thing. I'm going to have
to set the directory that points pi to
its new brain. So, if I type pwd, I can
see my current directory and I'm going
to
I'm going to sort of point this pi agent
dur at this directory, right here. But,
it's inside of agent home, like this.
Agent home. So, that matches the
directory up top and then I'm going to
export this.
So, I've run this command. I want to
stress that this just points to this
agents home and we should have an
agents.md
inside of that home. Now, let's see what
happens when I run pi. But, I got to say
the right version of pi, which is npx
pi. Did you see that? So, up here, these
all just got created. Pi found its new
brain and initialized some stuff inside
of there. What agent are you?
I'm the repo level pi agent swapped
brain. It's exactly what we asked it to
say. Now, we're getting very close. And
the next thing I want to do is build out
our agent brain to properly handle our
system as a bookkeeping agent. And then
the last thing I'll do is build a nice
user interface around this. Today's
video is not sponsored, so I want to
tell you about my community on school.
It's called the Agentic Coding Club.
Over here, you'll get full access to all
of my courses and I'll be doing weekly
code with me live Q&amp;A sessions. Here,
I'll be working on some real project and
I want these to be high energy. I
actually want to be getting stuff done,
hopefully, but it'll be a chance for you
to ask me questions and hang out with
me. And I'll be doing this every week.
So, if that sounds interesting, check
out the link in the video description
and I'll see you in my community. You
can join today. In order to do this, I'm
going to open up a new window in tmux
and go into Claude code there and we'll
leave this window the same. So, I'll
type leader C in order to open that up
and then it's opened me in a different
place. So,
I need to go back to where our agent is.
That's here. Now, I can open up Claude
code inside of here. Now, in Claude
code, I've been using voice mode and you
can toggle this on with voice like this.
So, it's disabled. I can enable it and
then you type spacebar and hold it and
then you can type. This voice mode is
super nice. I want to build out my agent
brain. Look at the agent home and we're
going to turn this agent into a
bookkeeping agent. It's going to help me
keep my receipts and sort of itemize
these things and keep a list and track
my expenses and this sort of thing. I'm
going to show you an example folder
structure of what I'm working towards
and let's do some Q&amp;A with me to figure
this out.
All right, here's the folder structure
pasted. So, I'm going to open up vim
mode with G. Now, this folder structure
came from a conversation that I was
having. It started over in chat GPT and
then I went to Gemini and I was asking
for stuff and I I sort of settled on
this project structure, but this is how
I approach work, right? Like many of you
do. Let's quickly talk through this.
agents.md, we created a sort of test one
in the in the previous part of the
video. We're going to have to create a
real one here. The brain, this is where
we'll probably want to put specific
information about our agent. I I to put
like the bookkeeping knowledge in here.
And this might be many different
markdown files, maybe even scripts, I
don't know. Sessions was automatically
created by Pi. This will do some sort of
metadata tracking. Skills is where we'll
want to put our agent skills. This is
one of those key con- like sort of
aspects of an agent anatomy that I
talked about. I have a skill key called
bookkeeping. That's not exactly what I
had in mind for agent skills. Maybe we
would want a skill called web fetch like
this. And that would allow us to, you
know, fetch in- data from the internet.
Or maybe we would want a skill called
like something like this, send email.
But I'm going to make some notes down
here. Oh, we also have memory. So this
is important because this is where we'll
store like the data for our agent. Okay,
let me make a few notes though.
agents.md should be the same as the
default Pi agents or very
similar. All right, now this is really
important. I'm saying this because Pi
has an agents file built in. We've
completely replaced it with our previous
example, but it's it's actually
important to use this. Next, I wanted to
talk specifically about the brain,
brain.md right here. brain.md should
have all of the logic of our specific
agent and then link to that from
agents.md. So I'll say don't implement
the skills yet, just create the
directory, but have a look at here where
I've said let's do some Q&amp;A with me. So
Claude should be asking me some
questions. I'm inside of Claude right
here. So I can close out of my sort of
Vim mode and this is the prompt I've
cooked up. So let's run this. Okay, now
it's going to ask some questions and
this is because I asked for Q&amp;A. I'm not
in plan mode or anything. Input method,
how will you input receipts to the
agent? And let's just say text for now.
Primary output format will be JSON file.
Agent should categorize them
automatically. Let's do an export to CSV
feature. Now this is largely arbitrary.
These were just some ideas that Claude
had. That's why I really like the uh do
some Q&amp;A
to the prompt, provide some input rather
than Claude just doing whatever it
wants. So, right here, it actually
created these agent skills. Just a
placeholder. It's like send email not
yet implemented, web search not yet yet
implemented. That's rather interesting.
And if I come up, we can also see that
it's written agents.md, but it actually
wrote this file not as I expect. And it
said, "You are a personal bookkeeping
assistant." So, it's kind of putting the
brain into this agents.md file. To be
honest, I'm not sure how to proceed at
this point. Let's Let's look at what
Claude did and test it out and see how
well it works. So, I'm going to come
back to our code over here and let's
have a look at what we've got. So, now
there is a brain brain.md file. Let's
actually look at that to start with. I'm
going to zoom in on this.
Bookkeeping agent brain. Your personal
bookkeeping assistant. Your job is to
use receipts startup. On every session,
read your memory, read your expenses.
This is getting to the real core of what
an agent is. It's pulling up its memory
every time it loads. Let me just zoom in
a little bit more. Logging an expense.
These are instructions for its core
behaviors. Here's how to log an expense.
Here's how Here's some categories.
Editing an expense. So, this is the
brain. This is the thing that we would
want to modify to change the behavior of
our agent. How does this brain actually
get used by our agent? Well, that's why
the agents.md is important. Let me open
this file. This is what actually loads
when Pi runs. And look at the first
thing we say, "Load the brain." Right
here. "Your specific behavior persona
and domain logic are defined in
brain.md. Read that file at the start of
every session before doing anything
else."
That's very cool. Now, agents need to
know how to use skills. So, somewhere
we're going to need to be telling the
agent to use some skills. We talk about
its memory and down here. Look at this.
Skills live in skills name skill.md.
Load a skill by reading its skill.md
when the task calls for it. And this
sort of instruction is what you'll find
in the default pi agents.md file. That's
why I included that in the prompt
because I wanted Claude to to build a
proper agents.md which it did. This is
looking pretty good, you guys. So, let's
go down and test this thing out. I'm
inside of pi, but I'm going to need to
close this and restart it. And remember
that command, it was npx pi. Description
is required. Right, these are just place
holders. So, pi went ahead and fetch the
skills that it found and realized we
can't use these and it's warning us
about that. Now, let's ask who it is.
What agent are you? I'm a personal
bookkeeping assistant. Let me load my
brain. Look at this. So, as soon as I
asked that it said, "Let me load my
brain to give you an accurate context."
And then it reads its own brain. I love
pi. Okay, and then it it goes ahead and
read some other stuff. So, it has some
memory and it tries to read some facts
from from its little memory area. And
it's got some some information down
there. I'm your personal bookkeeping
assistant. So, I pulled up an expense.
What I'm going to do is start a new
session. I'm going to clear that context
and I'll say add this expense.
Went ahead and wrote it inside of its
memory in expenses.json
and this is the structured data that it
came up with based on based on what I
told it. And what else did it do before
that? It sort of read its its
information because I started a new
session. It said, "Okay, well, I better
you know, I better check my brain." and
it loaded its brain again. So, you'll
see the agents.md file is being loaded,
but the brain is loaded dynamically at
runtime because it's an instruction
inside of agents.md to do that. So, now
I want to ship this thing with a front
end so that users can actually go in
there and speak to this. That's what
you'd expect from an agent, right? So,
let's do that. I'm going to go back to
my Claude code session and I'm just
going to start a new session to do this.
Build a front end around my agent use
Express for this. You can just make it a
simple JavaScript HTML application. I
don't need react. I just need a way to
talk to my agent and upload receipts and
stuff like that. Now, I did one thing in
here uh which is a bit of a scope creep.
Let me show you. I said upload receipts
and stuff like that. So, this is a
little bit scope creeping because I'm
essentially inferring that we're going
to need to start ingesting receipts,
which is not something we've added yet
to the application. I made rooibos tea
um with cinnamon and honey. It's
incredible. So, if I type control O we
can get more details about what Claude
is doing and it created this whole thing
this whole server.typescript
TypeScript file. Pi coding agent has
like an SDK and we're using that. So, it
has things we can do. Create agent
session, for example. So, session await
create agent session. So, this will run
some JavaScript. I'm a Python developer.
So, just looking at JavaScript makes me
just fairly uncomfortable, but I can
read it. You know, I couldn't really
write this. Yeah, I couldn't write this
well. But, I can read this. So, it says
await create agent session. And it
defines it sort of maps the session uh
Anyway, it maps the session to S and
then create session of S and then return
session.
I don't know I don't know I don't ex-
like what is going on here? It's outside
of the scope. Then we're we're still
returning it.
So, get session the I just I mean I so
I'm not yeah. I guess that this is above
my pay grade. So, that's the Express
server. Uh that's this one. And then we
have an index file. This will be our web
application. So, to start it we we're
supposed to set an Anthropic API key.
That's because Pi is just a harness
around an agent and I'm using a Claude
agent for my Pi. Okay, let's give this a
shot. So, I'm going to go back to the
window where we been doing everything.
I'm going to close out of pie, and let
me just make everything super clear
where we are. So, look at this public
file. Let's look what's in there.
There's an index.html file. That's our
web application. Let's look at that.
Index.
Where is that?
If I look at public, index.html.
This is what we created. So, this is
going to be This is the web app we're
about to spin up, and we'll look at this
bookkeeping agent. And this will be
integrated with our back end, and the
back end is this server.ts. This is the
file we were just looking at. We create
this agent session like this.
And so, that's get session, and I can
look inside of here. So, prompt queue.
So, we'll go ahead and fetch a session.
We'll get a session when we I guess call
this prompt queue.then. So, when we
start processing the prompt queue. Um
Yeah, wow. How amazing is this? Claude
is telling me I can run this with npm
start. How does that work?
npm start runs whatever command is the
start field of package.json.
Then it says it's shorthand for npx tsx
server.ts. That's pretty interesting.
Let's try the full command. npx tsx
server.ts. And here it is in all of its
awful light mode. I hate light mode
applications. I don't think I can stand
for this. Sorry. Hold on 1 second.
Great. That's done. Let's open this.
Let's refresh this. Excellent. I'm your
bookkeeper assistant. You can describe a
receipt, upload an image.
Very cool. Let's try the image upload.
Got a receipt actually. So, let me load
a receipt that I have. I'll just send
that off. The image isn't a receipt.
It's a scatter plot chart.
&gt;&gt; [laughter]
&gt;&gt; That's fair. This is the image I showed
it, and yeah, it's definitely a
&gt;&gt; [laughter]
&gt;&gt; I don't know. It's really This is not
that funny to you guys. It's just Okay,
let me find the actual receipt. Can you
just imagine sending your bookkeeper
like a receipt of a sky
&gt;&gt; [laughter]
&gt;&gt; I don't know. Amazing. Yeah, okay. Let
me show you this receipt. So, here it
was. So, it's an Amazon order for this
microphone. And and yeah, we got it. We
got it, baby. Here's the Oh, sorry. This
is the total. That's the number.
Excellent. This is our agent now, right?
We have our agent. Okay, yeah. Okay, let
let let's look at the receipt in our
system. I'm going to go back. And here
is our system and I can actually look at
that best up here. So, I'm going to
invim I'm going to close everything and
start fresh. And we want to go into
memory. And then we have expenses and
facts. Let's look at the expenses. So,
this was the first one that I ingested
earlier just using the pie like chat.
And then with our web interface, I just
ingested this one. And so, DJI Mic Mini,
bunch of information about that. This is
pretty sick, honestly. I'm really happy
how this demo turned out. I want to
build it out a little bit more. So,
we're going to do that. When I upload a
receipt, I want you to keep a copy of
that receipt somewhere in the agent
memory. This makes sense to me. If I
actually upload a receipt, I want to
keep copy of that. And let me look back
at what we have going on here. So, we've
got the ability to create a new session,
but I wonder how long these sessions
will go for. We might want to have some
functionality around maybe automatically
clearing sessions occasionally. That
could be a beneficial thing. We also
might want to put some guardrails on
this agent. For example, what if I said
this? Edit your default agent MD file.
Actually delete the entire thing. What
do you think it's going to do? I'm
actually scared it will delete that. So,
let me go back and look. Let's go to our
our agent's file. So, this is the agent
brain. I'm just going to make a copy of
this. And I'm going to put it somewhere
outside of this repository. I'm just
going to go into my downloads.
And I'll call it agent's copy.md.
So, I'm going to paste that in there.
Let's try it.
Just to confirm, you want me to delete
the file entirely. Nuke it. Is it gone?
Okay, I think Yeah, I mean that I just
closed that file. It is gone, right? I
don't It's It's not So, this is this is
illustrating point
I'm trying to make that this is pretty
dangerous. Actually, I could tell our
agent to bring it back. It should be
maybe in the memory. Oh, it restored it
from the version my context. Okay, so it
had it.
Agent home. Yep, this looks good. So, it
brought it back. Which is good because
we actually want to use this. So, over
in Claude, yeah, done. When a file
arrives, the server decodes the image,
writes it to uh receipts before
prompting the agent. Nice. All right, so
it updated everything and it has this
little receipts directory now. I guess
this will be the final demo of the
video. So, let's go to new session.
Okay, I've got a proper new receipt
right here. There we go. Okay, so this
receipt was from Anthropic right here.
Okay, this is not nothing unexpected,
but let's see make sure we get that in
our memory, receipts. Now, I don't see
it. Um I see a receipts folder, but I'm
not seeing this file. It's not in here.
And the reason why is because I think I
never restarted the server. I think I
should have done that. So, let me
restart the server now. We're going to
We're going to try re-uploading it.
Upload that. Duplicate detected. What?
This receipt matches a missing entry. I
haven't appended a new entry.
That's crazy. Want me to attach the
receipt image path Like this is the
This [laughter] is something that always
It just surprises me about, but this is
exactly why we want agents, right? How
cool is this? Like just the flexibility.
I love that.
Um yes, you know, attach it. So, based
on that message, I'm assuming we have
it. Updated receipt off path memory
receipts. Okay, down down here, if I
look Yeah, this is the receipt now. It
was It's called kitty eye cat. It's a a
way I installed It'll output images in
the terminal if you have ghosty and
kitty installed. Now, if I look at my
expenses down here,
this is it and we've got a receipt path
right here. This agent is cooking. What
did you think about that, guys? If you
liked this, please give me a like on the
video and consider subscribing for more
stuff like this. Now, the next logical
step for this system is to make this
available in the cloud. This is how I
would want my agent so that I could go
to a website on my phone and upload a
receipt and give it some information.
Maybe I'd want to speak to it through
WhatsApp or through Discord or something
like that. If you want to keep building
your own agents, uh go here to deploy
that to the cloud. Thank you for
watching and I'll see you in the next
one.
