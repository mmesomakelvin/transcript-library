---
video_id: "9tmsq-Gvx6g"
title: "Never Run claude /init"
channel: "Matt Pocock"
topic: "ai-llms"
published_date: "2026-02-24"
ingested_date: "2026-10-30"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=9tmsq-Gvx6g"
duration: 637
word_count: 2088
---
If you
use claw code
or any other
agent for
programming, there
will definitely be
some kind of
initialization command. It
promises to create a
new claw.md file or
possibly agents.md with
documentation for the
codebase. I
strongly
recommend that you
never, under any
circumstances,
do this. And if you
find a claw.md
or agents.md file that
you think was created by an
agent—delete it.
The file it
creates will burn
tokens,
distract the agent,
and become obsolete faster
than steam on a hot
day. This article
evaluates whether
repository-level context files, such as
agents.md, are useful for agent
developers. This
has indeed been tested
in practice, and
the conclusion is this: unnecessary
requirements in context files
make tasks more difficult
to complete,
so files written by humans
should contain
only the minimum
requirements. In this video,
we'll break down what this
means and what you
should actually
use
claw.md files for. If you
like this kind of
content, subscribe
to my newsletter, where I
post my new
agent skills as I
invent and test
them. Also, I'm
working on a course with
Claude code, which will be
just bomb. But
let's test
this and run the
initialization in
my working
repository to
see what
happens. For
context: this is a fairly
large repository. It has a
bunch of
package.json scripts and a lot of
dependencies. This is a
React Router application
with an Effect backend—my
favorite stack
lately. And
now there is no
claw.md file here.
Let's
initialize it and
see what happens.
By the way, we see that the
research step is currently being performed. And
for this
study,
Sonnet 3.5 is used
. So, he calls
the subagent. I have
this subagent
investigate the
codebase and it will report back to the
main
orchestrator agent.
It reads a bunch of files
, performs searches, and
tries to get a
general idea
of ​​the code. The
agent
will perform this research step every time
you give it a
task. He
needs to explore the
codebase before
he can confidently
make changes.
In fact, there are
several
main tasks of an
agent, or ways in
which it spends
its context window.
The first part of
the usage
is at the
system prompt.
That is, everything that is
built into the agent and
that it has
access to in every
request. These will be
things like MCP
servers, and maybe
any system
tools
will be here too. And everything
you add to your claw.md
will make this block
bigger and
bigger. If I
move this up a little bit, you'll
see that there's less room for
other steps in the context window
. The other steps are
research. So,
studying the
codebase, understanding what's
there. Then we get to the
actual
implementation,
task execution, and
file writing.
Next—testing,
running
feedback loops,
unit tests, and
debugging is also included. This could
balloon significantly
if
something goes
wrong during implementation. Most of these
phases are quite flexible.
If it's a very simple
implementation, it can
be quite
small, like this one. If
not much
testing is required, this stage
can be quite
short. But what is
not flexible at all
is the system prompt
, since it is "
stitched in" the
moment the agent
starts its work.
So anything you can
do to reduce
that initial
prompt will give you
more room to
work with, and also
reduce your costs.
Personally, I think
making it as
small as possible is the best
possible outcome.
But when should you add
information to a query
that will help the language
model? Common
advice: If you
notice an AI
agent doing something
you don't like,
add it here. In
other words, if
it tries
to use the
wrong
package installer,
such as npm instead of
pnpm, you can specify
this in claw.md and it will
remember it for the
future. Or if
it uses a
certain pattern in React
that you don't
like, you can
add that to agents.md and
it won't
do that again. So,
even if you don't
run Claude, this
block
will grow over time, and it's
a little annoying because
this part is
global—and that's a
problem because not all of
it will be
relevant for
every request
your agent makes. And
yes, what you added
there about React will be
useful there. The
first session might be
about
the frontend, but
the next one might be
purely about API or
database work, where your
React advice
would be completely
useless. Moreover,
you can have another
session dedicated
purely to documentation.
So when you add
something to claw.md, you
have to think about
all these different
use cases that
agents might have in
your codebase,
because anything you
add to that
global scope
will affect everything
you do and
cost you
tokens every time. So with that in
mind,
let's take a look
at the wonderful
initialization file that
Claude created for us.
This file provides
guidance to Claude's code
when working with the code in
this repository. Oh,
what a brilliant opening
statement. Who is this for?
Like, what's even
going on here? Why
print this at all?
This will cost me
tokens on each
individual request, Claude.
Then he gives us
commands. Okay, they're
incredibly easy
to find. You literally
just go into
package.json and they're all
right there. If you
need to know
what commands are available,
you can look
at the original source,
right? You don't
need this
additional
documentation. And again
, this costs
tokens on each
request. So delete
this. I don't
like it at all. Now
the section on
architecture. Full stack
React router SSR application for
managing
workflows for publishing
video courses. React 19 with the
React compiler enabled. Does
he need to know
this for every
single request? And
how easy is it
to find? Well, it can
see that there is a
React router configuration file.
So he knows that this is a
React router project.
If he needs
to know if it's
server-side rendering,
he can look at
this tiny file,
which might be even
fewer
tokens than the
explanation itself, or
at least comparable
. If for some
reason he needs to
know that we're
using the React
compiler, which he probably
shouldn't,
he can go into
v.config.ts and just
see it there. Yes.
Perfectly. So,
you can
easily find all this information
yourself. The only thing that might make
sense is the
purpose of the project.
But again, the whole
project is called "
video
course manager." So I think I
can safely
delete this too. Now
we move on to
things that are perhaps
a little more useful. All
backend logic
uses effect to
inject
dependencies, handle
errors, and compose
services defined
through effect services. And I
really hate it
when
specific files are referenced here.
What really worries me is that
this
will get old very quickly. As
soon as we change
any implementation
here, this file will become
obsolete and
conflict with the
reality of our
codebase. Again
, it's easy
to see that we're
using effect
because the effect imports are
scattered throughout. If
we search for effect.service,
we will find eight
instances of it, and
all of them are also visible
in the file system: DB
service, drizzle service, dump service.
It's not what you
might have thought.
Repository processing service. The file
system is a really
great way
to explain to Claude what's
going on. And if
you structure
the file system correctly,
you can give it
a sense of the
overall architecture
that is defined in the
code itself, rather than in
documentation that can
become outdated.
This especially applies to
key services:
drizzle services, DB function services,
database dump services. If I
change the name of any
implementation here, I'll
have to
go back and
check everything. Errors
marked with GH
disappear again. Here I have
a video editor as
part of this. So
operations with clips
go through
a single post endpoint API clip
service. This, again, is
easy to detect from the
code. There is no reason
to keep this in every
request because
most of my actions do not
affect this clip service.
Again,
routing configuration. I
won't need it in
every query.
Remove. Complex
interface functions
use effect
reducer. I won't
use this in
every query. You
get the point.
Too much of everything
global.
Too much will become
obsolete and
simply
useless. And it
just takes the hell out of me
, man. I
look at this and think
about a key idea that I
always keep in
mind when I
talk to LLMs: they
have a context window, of course,
but there is also a
limit to the number of
instructions they
can process
at once. We can
think of this sentence as,
say, an instruction to
use effect
for
dependency injection,
error handling, and composition.
This is another instruction
inside. Services
are defined
using this. This is
another instruction.
Routes execute
the effect via runtime live.r run
promise. LLMs actually
have a realistic
instruction budget of
around 300 to 400.
This increases
depending on the size of
the model you're
using, but
even then the limit
is around 500.
So if you add
a bunch of instructions to
your claw.md file,
most of which are
n't even relevant to the
current task.
You are simply tying
your agent's hands
before he even starts
work. But this
management, that is,
providing such
information to LLM,
must be
stored somewhere, because there are
useful things here that I
want to use in general
to
guide LLM.
For example, LLMs
seem very
reluctant
to use
reducers in their
frontend logic, but
I find that
reducers
work great with LLMs
because they can be
isolated as a
testable unit and
used to
control the entire
interface, or
at least fairly
large
parts of it. So I would
most likely
put this in the skills
that LLM can discover
, but wouldn't
waste
their
instruction limit on it ahead of time.
But talking about that and
skills is probably a
topic for another
video. So, if
management is a
skill, and basic
setup like
package.json scripts and the
like is
not a skill at all, then what is
actually worth
adding to your claw.md?
Well, the only thing I
have in any
claw.md file on my system
is if I go into
memory and open the
file, there's just one
line of six words: "
you're running WSL on
Windows." This is just because
such a setup is not
entirely intuitive and
has some issues
when it comes to
recognizing paths
between Windows and Linux. And I
found that this single
instruction gave
him a lot of the
additional
context he
needed. I have
also previously advocated
using this
file to control the
agent itself.
For example, for a while
I had this: "in
all interactions and
commit messages, be as
concise as possible and
sacrifice grammar
for brevity."
Instead, I now
believe it's better
to place it inside a
skill. But even
then, I do
n't actually launch it yet. I
just keep the
global
settings to a
minimum. Hopefully, it's
now clear why
you should never
run Claude init. It
will fill your
global context with a
bunch of unnecessary
garbage that simply won't
be relevant for
most operations, and
it really likes to
add
specific patterns
and files here that will
become obsolete as soon as the
underlying
code changes. So that means
you either have to
spend tokens to
keep it up to date
,
which seems
crazy to me, or
just delete it.
Goodbye, claude.md.
Instead,
rely on the
built-in
research phase that
every agent must now perform to
generate the necessary context in time
before
implementation begins. Thanks for
watching, friends. I
will talk about this in more
detail in my
upcoming course. And
I already have something about
this in the
newsletter. So, thanks
for watching, and what should I
cover next?
Let me know if
you have any questions about
the LLM or anything in this
area of ​​AI coding.
Anyway,
thanks for watching and
see you very
soon.
