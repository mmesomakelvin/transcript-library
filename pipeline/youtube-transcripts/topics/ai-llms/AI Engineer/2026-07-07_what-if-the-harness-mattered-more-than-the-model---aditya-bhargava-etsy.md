---
video_id: "2e9ANoOEn28"
title: "What if the harness mattered more than the model? - Aditya Bhargava, Etsy"
channel: "AI Engineer"
topic: "ai-llms"
published_date: "2026-07-07"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=2e9ANoOEn28"
duration: 1923
word_count: 4366
---
Hello everyone. My
name is Oddit,
pronounced Oddit
like tax
audit. Um, and I'm here to
talk to you
about what if the
gear
mattered more than the
model? First,
a little about me. I am a
full-time engineer at Etsy.
I am also the lead for
Etsy's
communications
technology initiative for the
sales agent. I
wrote "
Shredding Algorithms" - an
illustrated book
about algorithms. Um, and I
also do
illustrated posts on
ducktyped.org. Um, and I want
to talk to you about what
if the
equipment
mattered more than the
model? By this I
mean that if we
should have paid
more attention to
developing expertise
in equipment. Um, and
my controversial
opinion is that
I hear a lot of
people say, “Oh, the
models are so
good, you can
just keep the
gear simple.
Just give the model
a few tools
and it will do the rest
.” And I hear it so
often that now it's, uh
, starting to become the
wisdom of the
tech
industry. Uh, my
answer is yes, but
it's going in the
wrong
direction because it makes
us dependent on
fancy
proprietary models
that can't be
run locally. So what
if we
talked about a
different direction instead? What
if we focused
on
open source models that
could be run
locally? What if we
focused on
building a system
that was so
good that we could
get
the performance of a
leading-edge model with an
open-
source, local model? So what if
the system mattered more
than the
model itself? What if we
focused on the
system? How
important is the system?
Right? This is something I've
been researching a lot in my
free time. There is a very
interesting article that
talks about Harness
Bench, which is a benchmark
for systems, something we have
n't seen often. It has
106 tasks. She
tests different models
and different systems. But
the point is that it
works with the same
setup. She
conducts the same
assessment. Same
model, but testing
different systems. And
the results are quite
interesting. So, the scores
range from 52.4% to
76.2%. So the difference
is over 20
points. And
only the support has changed. Hmm, and what's
really interesting is that
for weaker models,
support matters more
. Hmm, if
support
matters more than the model,
that's great news. Um,
because if the model
matters more,
then we depend on
a few companies that are
able to build and
train these models. Um,
but if good
support can
compensate for that and
improve the performance of a
weaker model, then
we can create
our own supports, and that's something
any of us can do. And we
don't need to depend
on paid models.
Um, so I spent
a lot of time and
did a lot of
research on exactly what it
takes to
create really
good support. Hmm
, and I realized early on that
none of the existing
tools or
frameworks could
do what I wanted
. And I realized that what was
actually needed was a
solution at the programming language level
. So
here's my other
controversial thought in
this talk: I
believe that building
good support
actually requires
support at the
programming language level.
Um, and that's exactly where
my research has been going for the
past 6 months, and
I've spent a good portion of those 6 months
building a new language
called "agency," which is
designed to
build agents. Um
, and I'll just briefly
talk about
terminology, because
the terms "agent" and "harness
" are not yet very clearly
established in the industry.
They are not very well
defined. Um, but in
this talk I will
use them
interchangeably. But
when I talk about
agent, I actually mean
“harness” and
“model.” So, if
you take, for example,
Claude's code, Claude's code
is an agent. It
uses Opus, which
is a model, and everything else
is a harness. Um, but,
you know, when we
talk about "agency,"
it's actually for
creating agents,
but what it
provides is a "harness
." Hmm, "agency" is
really good. Um,
you know, it's still new.
Creating a language is a
lot of work, and it's
only been 6 months.
Um, but I
like this
quote from Alan Kay: "
Simple things should
be simple,
complex things should
be possible." And that's what
I
like about
agency, is that
I think when
people create
agents, there are a lot of
primitives, a lot of
things that every
agent should be able
to do, and those things
should be simple
to do. Hmm, and there are
a lot of complex
things that we want to be
able to do with
agents, and it
should be possible to
do these things within the
framework of your choice,
and with an agency, that's
possible. Hmm, now
we have a clear goal, which is to
try to create the
best possible
mechanism. And we have a
great tool
for this, which is
agency. So,
the rest of this talk I'm
going to talk
about creating
coding agents in
agency. And we
will see how the
same agent
develops in seven
different examples. We
will see the same
model, the same
task, but the
mechanism will
improve each time
, and we will see how the
mechanism
improves the
agent's performance each time. So, you know,
like I said, I
did a ton of
research on this
. My goals in
this talk are to give
you the basics of creating a
mechanism. When we
talk about
creating a good
binding, what does that
mean? You know, you're
starting from scratch, what are the
basics? Hmm, I'll
go into
agent security a little bit, because,
you know, when we
talk about
creating agents, we
actually want
them to be able to act on
our behalf. Hmm, but the
big problem
is how to
give agents
the ability to
act, but not
so much the ability to
do something
dangerous. So,
when we talk about
agent quality and capabilities,
agent security goes hand in hand
with that. Hmm,
at the end I will
introduce some more
advanced concepts
, such as subagents
and self-optimization. I
think that's where,
you know, the more
interesting things come up and we
really start
talking about what
all the possibilities are, you
know, because when
you talk about
creating a good
strapping, there are so
many things to
explore. So I
hope you'll
stick with me until
the end, because this is where
we get to
some really
interesting stuff. So,
this is the code that we
will ask our
coding agent
to edit. This is code
to calculate
the median of an
ordered
list of numbers. If it's an
odd-
length list, you just
take the middle
element. If it is an
even
length list, you need to
take the middle two
elements and find the
average of those
two elements. But right
now this feature does
n't do that. So,
there is an error in this function
. There is a test that
shows an error, and we
will ask our
agent to fix this
code. So, let's
get started. Let's
just dive in. This is the
first example. This is the
agency code. And you'll notice
that agency is very similar
to TypeScript. It is heavily
inspired by TypeScript with
some
Python syntax. So, the entry point
is this node mean.
I have a simple
invitation. The
Python median function in demo/median.py has
an error. Please
correct the error. And I just
passed on this
invitation to the
LLM function. I get
the result and print
it. Hmm, and of course that
won't work because you can't
read or
write to that file
. So, let's quickly
run this
example. OK.
Of course, as
expected, it
says that in order to
fix
the error, I will need to
see the existing
code. Hmm, it's just a
model, very few
features, and
of course it ca
n't do anything. So
the most obvious
improvement to
any feature is to
give it some
tools. So,
quickly, let's
talk about how the
tools work
in an agency, because it's
very simple. Hmm, I'll
define a function, in
this case, just
for example, I'll
define a greet function
that greets
the user, and then
I'll make a call to LLM
that says, "
Use your
greet tool to
audit greet," and then I'll
pass that
tool. Hmm, and
each feature can be
automatically
used as a
tool in
an agency. So there's
nothing more to do
. The agency
creates a JSON schema from
this function and
sends it to the
LLM call. This line
of documentation will be
used as a description of the
tool. So,
let's run the
second example. So, the
NPX agency. Oops,
actually. Example of
NPX agency from 01. So
first we
will talk about
tools. So, how do
you conduct an audit? And
how can we know that
he ran this
tool and then
just generate an
example, right? So, I'll
also quickly show you.
The agency records
logs and has a
great built-in
log viewer.
So, I'll just
expand on this last
run. And you can
see here that it
calls the greet function
with these parameters.
The tool
responds
by returning howdy audit, and
the assistant just
passes it
directly to us.
So, these are tools.
Now let's
look at
the use of
tools and
agency. So, again
, this is the
next step for
our agent, which is to
give
him the tools.
Here is an example where we
provide the agent with
read and write tools.
Again, reading
and writing are just
functions built into
Agency, and since each
function can be
used as a
tool, I can
just pass it
directly to LLM.
Besides,
giving an agent
the ability to read and
write arbitrary
files on our
file system is
truly dangerous.
Therefore, by
default, Agency will not
allow you to
do this. Agency has a
"man in
the loop" feature that
will require some
approval. We
don't provide it anywhere, so this
code will
crash
and
throw an error. So
let me
show you what it
looks like. Perfectly.
So, the standard
interrupt for
reading was not
handled. Here is our
main message
. Are you sure you
want to read this
file? You can
see the name of the file it's
trying
to read, and that
essentially tells us that
we didn't approve this
interrupt. And this gives
us a pointer to the
manual that
tells us how to
use the
handlers. Um, we
started with just the model.
We tried
the tools. Now the
next step is
to make the tools
safe. So, we're
going to do
exactly what we were
asked to do in
this message and
use a
handler. So here's the
same code you
know, skipping
those read and
write functions as
tools, but
now it's wrapped
in a descriptor block. And
here it has a
handler function. So, when
these tools
call or
trigger an
interrupt, this code
will execute. It will
output information
about this interrupt.
It will prompt the
user for input
using the
built-in
input function. And if
the user approves, the
tool call is
approved. And I know I
say "interruption"
and I don't really
explain what that
means. I may
come back to this
a little later, but it's
essentially a way to
pause
execution at a certain
point. And ask for
data entry from a
human. So,
interrupts are a
great feature in an
agent. And all functions
in the
agent's standard library
that modify code,
change something, have
some destructive
effect, or read
sensitive data
first cause an
interrupt. So
here is a safe version of
our agent where the
default tools
will cause
interrupts. And now
this code will ask
the user: "Do you
approve?" Let's
run this
example. Okay, are you
sure you want
to read this file? I'll just
say yes.
You see what he is
reading. Now it
tries to write
to this file. So,
you know, this is an example of
how we make the
agent more secure by
asking for
user input. And it's
better, and it's safe,
but it's also very
slow. So, the
next thing we
want to do is
make the agent
autonomous
while still maintaining
its security. And that's the
tricky part, is
n't it? How do you give it
enough
power so that you
don't have to manually
approve every action,
without giving it them, without
giving it so much
power that it
could do something
destructive to your
file system?
So, Agency has a really
cool feature to
solve this. It
is called
partial
application
of functions. This is a concept
borrowed from
functional
programming. It's a
really fancy
term for a pretty
simple concept.
So, that's the signature of a
reading tool,
right? Accepts a
file name and directory.
Um, and when you read a
file, it will look
inside that
directory for that
filename. And with partial
function application, we take that
read function and
call dot partial on it
. And we give her a
catalog. And here we
block the
directory argument for demo. Um, LLM
won't be able to change that
argument. He
won't even know this
argument exists. When
we pass the
reader tool,
it will only see
one parameter, which is the
file name. It
will pass the file name.
And it will read this file
from this directory.
So, we have locked down the
directory option.
Now the agent can only
read files from this
directory and
write files to
it. Partial
feature implementation is a
really great
way to limit
your
agent's capabilities. Now no
human
intervention is required, but it's still
safe. So,
let's take a look
at this. So, again
, we'll move on to the
NPX agency examples. PFA is partial
function application
. So, here he is thinking,
and you can see that
he read the file, he didn't
need our
permission. And now he
said, you know, to
fix this
problem, he's like
giving us new code,
but he's not updating the code.
He asks, "Do you
want me to update
the file with the fixed
feature?" but he
doesn't do it himself. So,
you know, this version of
this agent is the
best one we've
seen so far because
it gives us the
correct solution
without any
human intervention, but it has
n't actually
fixed the code. So the
next step is
to get him to
actually fix the
code. Hmm, and this is where the
feedback loop comes in.
Hmm, there is a very popular
agent pattern
called React, and React
stands for "
mind" and "act." And
essentially, you're asking the
agent to work in
this cycle. Where you
reason, act,
observe the
consequences of your actions,
and then decide what
to do next. So, in
this case,
reason, read two
files, act,
run tests,
observe if the
test fails,
read the error, and
then reason again.
So, look at
this failed test and
think about what you
want to do next. And
just do it in a
loop until the tests
pass. So this is
really a key
pattern for
agent improvement. And
now let's
look at the same
agent, the only thing we
change is the query and
give it
the ability to run
these tests. And now the
agent should work
better. In this
case, I'm also
going to print
all the
tool calls so you
can see what's
going on. Emm. Well,
maybe it has. Okay,
wait. It's always
there. Aha. That's it.
OK. Now let's
see this in action.
Emm. So now you
can see that it
calls tools
. It reads these two
files, as we said.
He runs tests.
The test failed. It
writes to a file. He
runs the test again.
And it confirms success.
So this is a really
important stage in
system development
because now we
finally have an agent that
successfully solves
the task, checks
if the code is broken,
changes the code, and
checks if the code
now passes. So
, let's talk
about how we've
improved the system so
far. So, we
started with just a model, we couldn't
do anything. Then we
added tools.
But the agent was not
safe. Then we
added handlers that
added security but
required
human intervention.
Then we added
partial
function application
, which was safe
without the need for
human intervention. And
finally, the last one
that we just
looked at is the
feedback loop,
which added
reasoning. So,
the agent made the changes and
confirmed that the changes
worked. So, I have
two more
examples. With this, we're
going to go in a slightly different
direction. And this is where
we move on to
some more
complex concepts.
So, these are subagents. Hmm
, everything we've done
so far has improved the
same task. But with
subagents, we
ask, "How do we
make an agent
do more things?"
Um, and let me
quickly show you
what this code looks like.
Good. So, I'll start by
showing you
the query for this program,
because it's a little
different. So,
fix the failed
test in test_median.py, then
investigate
Jensen's inequality for medians using the
Wikipedia agent and
explain it to me in a
concise manner. So
here's a case where we're
actually asking the
agent to do a little
more, right? And
this case is interesting
because this is our
main agent, but
for the tools, we
don't give it
read and
write capabilities. Instead, we
provide him with two
subagents as
tools. And I
really like this
pattern in the agency
because I've seen
a lot of frameworks
that make
subagents their own
concept and
make them quite
difficult to
understand. Um,
agency, subagent -
it's just another
function. And you just
call it up,
use it as a
tool, just like
anywhere else. And this
consistency has
many advantages. This
makes it very
easy to write
and reason about. So,
here is the subagent of the
coding agent. Hmm, the same as
before
. You know, there is a system
message. This
subagent has its own
LLM call, gets its
own set of
tools.
Similarly, you have a
Wikipedia agent. It
has its own
tool, a
search tool. Uh
, this is a tool
built into the
standard
library of this
agency that
allows you to search
Wikipedia. Um,
the agency has a big
standard
library that
lets you do
all sorts of things,
including this
Wikipedia search tool. I also
use a callback function
to output
information about the
tool call.
Now let's
see this
example in action. And this is an
example where we're
actually asking the
agent to do a little
more. And we give
him two subagents
to carry out his
task. So here you
can see that it
calls these two
subagents. Uh, he
calls them in
parallel. So, the
Wikipedia agent
performs the search. The
encoding agent modifies
the file. And that fixed the
error. And now here's a
little note.
So, subagents are cool
because they
allow you to add
new capabilities without
bloat the context
. Um, and it's a good
pattern because it
allows your
agent, when they have
a lot of different
tools at their
disposal,
to do the right
things more
consistently. Often,
when agents
get confused and
fail, it's
because
they have too much
context, and also
because there are
too many
unrelated
concepts in their context. And they have
too many
unrelated
tools, so it's
hard for them to choose the
right
tool to
use. In this
case, we make this
problem much
clearer. For a
top-level agent, we
simply say, "
Select the subagent
you want
to call." And then
subagents have these
tools that are
grouped in a way
that makes sense.
So now let's
look at the last
example, which is
self-optimization. Um,
the agency has a
built-in
Jepa optimizer.
It actually has
several built-in
optimizers, but
the one called Jepa, um, is
really interesting. And
the way the
optimization function works is that
you
label any
variables that you want the
optimizer to
optimize. You
can simply
use this
optimization modifier. And then
you run
the optimizer and
set a goal for it.
So, you know, in this
case, you can
see that the two
initial queries that
I have are very simple. I
hardly give them
any information. And
then the goal I
set for myself is to
fix the bug in
median.py using TDD.
And the reason this is
such a great move
for our
hounstown is
because we're not
doing trial and
error anymore. We are no longer
just trying something
to see what
works. Instead,
we now have a way to
systematically
measure and
improve
performance. So I'll
just run this code
. Hmm, and I'm actually
going to reset too.
Here I'm going to
change this code.
Cool. So I won't
show the full
run now because
the optimizer takes
a while, but you
can see that
at first it looks like it's
checking the queries
that need to be
optimized. It
will run the agent to
establish a
baseline. So the baseline
target is 0.2, and he will try
to improve it. So in
this case, I
ran the optimizer
earlier to show
you what a
full run looks like. Hmm, and
here's one example where
you can see
that the goal was
achieved in the first
iterations. In this
case, it was
pretty quick. Hmm, and
you can see that
this invitation is
rewritten. Hmm. So the
reason why this
self-optimization is so
great is because
we don't guess
and we don't check. We
systematically
measure and
improve, which is a
big step
forward. So, this is the ladder
we just
went through to
improve the
complexity. Hmm,
you know, the first step
was nothing,
the model just couldn't even
read the file.
Then we added
tools, but in a
way that
was unsafe and
not allowed in the
agency. Next, we
added handlers, which
added security but
made the job
slower
because they
required
human intervention. Then we
added partial
function invocation
, which was safe
and fast. We then
added reasoning, which
gave us more
confidence in the
agent's performance. Uh, and then we
switched to
subagents, added
more capabilities, and
finally we did
self-optimization.
So we got a
measured improvement,
not guess and
test. So,
you know, I hope
this gives you
an idea of ​​how you
can create
associations and then
gradually
refine those
associations. And I
hope you'll
try to do this
and join me in
this, you know,
experimenting with
me to see if
we can create a
better unification, um,
because what if the unification was more
important than the model,
you know? What if we
could create a
pool that was
good enough
that we could start
using
local models and
still get
the performance we
need for the
tasks we
want to do?
So, what kind of language support does
the Agency provide? You know, we
used Agency
for all these
examples. How did that
help? Hmm,
simple syntax
for defining
tools. Again
, you know, simple
should be simple.
Every agent
will need
tools. Let's
make
using them simple
.
Security tools are very important
for agents, i.e.
interrupt handlers
, PFA. True pause and
resume. I didn't go into
detail about this because I didn't want to
make this story
too long. Hmm,
but one of the really
killer features of
Agency is that
when you call this
interrupt, it
actually pauses
execution and
returns control to
the user, but in a
way that you
can resume
execution later. Er
, and as far as I know,
very few languages
allow you to do
something like that. So
usually most
frameworks that you
use, if
they have a
human function in a loop, have
a lot of limitations. There are
many things you
need to do to
get around this. Agency is completely
different. If you wanted to,
you could, you know,
trigger an
interrupt
inside a for loop,
inside a
tool call,
inside a subagent.
Hmm, and that would properly
pause
execution,
return to
the user, and then
resume
execution at this exact
point inside
this subagent,
inside this
tool call, at this
point in this for
loop. Hmm, that's
really cool. You
can serialize
the execution, you can
come back to it
in a week, and you
don't have to
change anything in all the
code we
looked at. It
just works, which is
really cool. Um, um,
it also has these
built-in
optimizers that are
great,
you know, they give
you a more
analytical,
mathematical
approach to
improvement. So
if you want
to try it,
please do.
Install NPM Agency Lang.
All you need
is a package and an API key, and you're good to go
. Um, the
main takeaways,
you know, the agent is the
model plus the
equipment for this
conversation, at least.
Um, better hardware
equals better
performance,
especially for weaker
models. And then, how do
we create better
equipment? Give
it tools,
make it
safe, make
it autonomous,
make it
reasoning, give
it subagents, and
make it
self-optimize.
Thank you very much. Again
, my name is
Aditya Parikh,
visit
agency.agencylang.com and then
please
follow me
on Blue Sky if you like.
Thank you. Take care of yourself.
