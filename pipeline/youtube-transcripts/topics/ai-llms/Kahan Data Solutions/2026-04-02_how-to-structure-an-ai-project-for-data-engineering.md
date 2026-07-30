---
video_id: "EhNrAtnuMuM"
title: "How to Structure an AI Project for Data Engineering"
channel: "Kahan Data Solutions"
topic: "ai-llms"
published_date: "2026-04-02"
ingested_date: "2026-07-30"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=EhNrAtnuMuM"
duration: 669
word_count: 2678
---
Last week I had a video on Claude Code
and showed you how I made an end-to-end
project using it without writing any
code. And I think it became pretty
obvious that this is going to be
something important to understand as
data engineers. So, in this video, what
I want to do is dive into one of these
specific components of it, which is the
Claude.md file. And really how I'm
starting to think about designing the
framework of a project. A Claude.md file
looks something like this. And when I
say MD, it's a .md file, which stands
for markdown. And as you're going to see
as you get more involved with these
agents and all these tools, markdown
files are actually really a big part,
which is interesting, especially coming
from a development background. We're so
used to having, you know, code-based
files with scripts and all that stuff.
But AI agents, AI tools, and LLMs, they
really like to read regular language.
When you're used to working with LLMs,
let's say ChatGPT or even Claude, just
the regular chat, we all, I think, more
or less understand that you need to give
it a good prompt. You need to say, you
know, your role, your task, what the
expectation is for that prompt, and
therefore you'll get a better response
as opposed to just giving it a generic
answer. And the same concept applies
here, but it's more thorough than just
writing it in one prompt. You're
creating a baseline that it can then use
for future prompts, for all prompts. So,
here how a Claude remembers your
project. You give Claude a persistent
instructions with Claude.md files.
Persistent instructions meaning it's
going to always be able to reference
this every single time. And then as it
goes on, it's going to have its own auto
memory where it builds on it and
understands things. So, super
high-level, that's what this is. We
create it, we're setting instructions
for what's going on. And every single
time you start up a new session, if it
exists, it's going to read it as opposed
to you having to redefine the prompt,
the task, what the expectations are with
every chat. Just coming back to this.
When you open up a session something
like this, this would be starting from
scratch. It's almost like you're opening
a brand new chat with another LLM. And
that's really what it is. So, if I were
to close this and open up another one,
we're starting from scratch. But the
idea here is I don't have to re-prompt
it the baseline every single time.
That's where something like this
Claude.md file comes into play. But it
works along with your project. So,
things that you put in here, it will be
able to understand what it's walking
into in all of this stuff here. Imagine
you were giving instructions to a
developer starting a team and you wanted
to explain the expectations, the
framework, the layout, all that stuff.
That's how you can think about what this
is. You're giving it the baseline
instructions. All right. So, hopefully
that was helpful enough to set the
groundwork there of what we're talking
about. So, now I want to talk about what
I've put in here, how I'm thinking about
it, and how it relates to what I built.
And instead of walking through it in
this format because I think this is a
little bit hard to read sometimes, I'm
going to just hop over to my GitHub
repository. All right. So, what I have
here is something that I've just
referred to as the APT framework,
agents, playbooks, tools. This is based
on something else I've seen, which was a
slightly different framework. I've just
applied this to what I think makes sense
for a framework for data cuz I think
about playbooks being actual
instructions of how to go about things.
You know, we have playbooks for how we
build and the steps you're expected to
take to accomplish a task. And this is
not built in. You're determining the
structure of the project and then
telling Claude Code, this is the
structure that we have and this is what
I want you to follow and what to expect.
So, we're saying we're creating an
architecture called the APT
architecture. Layer one, our playbooks.
These are the instructions. You can
think of them like SOPs. These are the
instruction manuals for different things
that we'll be doing. And so, if I look
at an example over here, I'm not
following this perfectly yet. Um this is
still being built out. But for example,
how to build a DBT project, how you
expect it to be designed, that would
live in this playbook. How you expect to
generate and load test data. If I were
to do that again, here's an example
playbook step-by-step of what you should
do and the type of data you should make,
things like that. Layer two, agents, the
decision-maker. This is I'm saying your
role, this is the role of the agent.
They're in the middle kind of directing
traffic. So, they're reading the
relevant playbook, understanding the
objective, and then they're going to
look in the other layer, the tools, to
actually know how to do it. So, the
playbooks are the instructions, the
agent is the one reading the
instructions and figuring out what to
do. And then layer three, in this case,
tools, is the execution. These are the
actual scripts. This is where the actual
functions are happening. So, scripts,
SQL files, API calls. And then down here
I'm kind of explaining to the AI why
this is important. I'm essentially
saying when they try to do everything
directly without directions, it can be
slightly inaccurate, so I want to give
it more instructions so that it's more
accurate more of the time. So, again,
high-level, that's the structure that
I've designed in this project and how
I'm looking to build off of it. Hope
that makes sense. And I've outlined it
over here. You can see that's that's
more or less the design. One of the
other things I mentioned in the last
video was that I was confident that when
it came time to commit and create a new
branch that it would do it and that it
would know to do that. And how did that
actually know to do it? And again, this
is actually indicated in this file. So,
one of the other things that I put down
here are a couple instructions of what I
would expect it to do before any task,
before it did any of this stuff. So,
number one would be activate a virtual
environment, so making sure that that is
always done. Pull the latest main, then
create a feature branch. Never commit
directly on main. And then check for
other contacts. But this is really what
I wanted to mention here is the fact
that I'm telling it that this is the
best practice. It would be like telling
another developer on your team that they
started to say, "Hey, make sure that you
always check out a new branch before you
develop." And the thing is, even though
we'd say that, a lot of developers will
not do that or they'll forget to do it
or they'll bypass it. In this case,
they're not going to do that. The agent
just will follow the instructions. And
if for some reason there are situations
where it misses it or it doesn't do it,
you can come in and correct it and
constantly be updating this. Down here
we have file structure and it's
outlining what the structure is expected
to be so it knows where things live and
how to find stuff. Now, one thing I will
say here is when it comes to this, like
I mentioned, this gets loaded every
single time when you start a session.
You don't have to re-prompt this every
time. It would be as if you gave this
prompt to ChatGPT or to Claude or to
Gemini or whatever when you first
started every time and then you went on
with your prompt. This one is a little
bit long. I would probably want to
shorten this up because you don't want
to take up too much what's called
context with this because every time you
do this, it has to remember it and keep
it effectively in a short-term memory
type of situation. And so, the longer
this is, the more it has to think about.
And so, it's a good practice to try to
keep that pretty tight. So, I might go
through Well, I will likely go through
and and tighten some of this up. But I
want to show you some of the other
things here. So, the project guide, for
example, is giving an overview of what
an example DBT project would look like.
So, again, imagine you're just telling a
developer, this is what the expected
design should be. And instead of the
developer, it's the agent, it's the AI.
And it knows what it should look like or
where things should live and what it
should look like. I think we've all run
into situations where there is a style
guide, but rarely do people actually
read it, unfortunately. It's something
that people will brush over and then not
follow it. In this case, you're able to
truly have something that's going to
follow the style guide. And that's
really what's happening here. And as
things get maybe a little bit off and
you want to correct it. I think in the
last video I did make a slight
adjustment to how I wanted the code to
be written with the spacing. All that
stuff will continuously be updated here.
It's like you're continuously updating a
style guide, but it's actually going to
be followed every single time. So,
that's what this represents. And one way
you can expedite this process to get the
layout that you want, even if you're
just starting from scratch, is to feed
it an example project that you can say,
"This is what I expect it to look like.
Here are some example conventions. I
want you to follow this." And so, a
great way to do that is to actually
upload a sample project. And that's
exactly what I did here. I uploaded it,
it read it, it came up with this
playbook, and then I was able to just
delete it. And if that's something you
want to do as well and you don't have
one, you can come to my free community,
the Modern Data Community. And in here I
have a full sample DBT project that
follows all of these conventions, and
you can just download the zip file right
from here and then just drop that into
your project. So, I'll leave a link
below where you can come in here, grab
this, and use it for yourself along with
any of these other templates. But that
will help expedite this process for you
and make sure that you're following some
good conventions from the start with
these playbooks. Now, if we come down to
the tools as an example, let's
for replicating data using Sling Data
and moving it into Snowflake. And this
is a bash script that you would
typically see in some other file or
maybe you wanted to create it as Python,
whatever you wanted. It's the script
that actually does the extract and
loading in this case. Typically, what
you want is also some documentation
around
what's happening. So, this is an example
of where it will work together. So, we
have an example of the data extraction
here. And then the playbook not only
explains the process but documents how
to use it. So, it's just like having
somebody document a process for you. So,
here's how you run it. Here's how you
run specific sources. Here's what
happens. Here's how you add a new one.
Here's the layout. Now, a lot of times
we're going to be instructing the AI
again to do this, but this is giving it
all the instructions it needs in all of
these specific use cases. Imagine in
your company all of the different minor
little processes that you have or maybe
they're big processes for data
ingestion, for transformation, for
updating things, for formatting,
whatever it is. You can have all of
those instructions outlined as unique
playbooks. And then you can have the
specific tools, the actual code here in
the tools. And have them work together.
And then you're explaining to something
like Claude Code how to interact with
those by creating a Claude.md to
understand the high-level architecture
and what's going on here. So, as you can
see, this can get pretty complicated
pretty quickly. And so, that's why I
think it's really important that you
educate yourself on how to use these
types of AI agents and frameworks. And
also that it's really important that you
understand how the underlying tools
you're using work because you want to be
able to navigate it to look like
something you want to see, to make sure
it's following best practices and doing
what you expect. That's where all this
is going to work together. Now, final
thought here. One thing I think about
with this, obviously this is very
open-ended and it can feel overwhelming,
is this kind of like, to me, when I was
first getting started with DBT. Because
DBT, when you create a new project, they
give you some sample models and some
sample notes, but it's really up to you
to decide how do you want to design it.
It's pretty open-ended. You can design
it in the way I typically follow, which
is a three-layered design, but other
teams do different things, and it's
really up to you. But, if you understand
how the underlying process works and the
functionality, you can customize this
and make this work for you. And in a
similar way, what we're doing is the
same thing, but with cloud code. It's
another layer up, though, and so instead
of the different model directories, I'm
coming up with different directories for
what lives in these cloud files. So, I'm
creating a framework around playbooks
and tools and saying this is how they
should work together, but you could
technically create your own. Now, all
these ideas and concepts are going to
continue to evolve as we grow along with
these new technologies, but it's really
important that we have a framework and
that we have structure to what we're
doing and not just go completely blind
into using these tools and have no
structure. And hopefully this video
helped give you some ideas on how to
approach that in your project, including
things like the cloud MD file and how to
align it with an entire framework for
using this tool in your data engineering
pipelines and data engineering
workflows. But, with all that said,
thanks as always for watching, and I'll
see you in the next video.
