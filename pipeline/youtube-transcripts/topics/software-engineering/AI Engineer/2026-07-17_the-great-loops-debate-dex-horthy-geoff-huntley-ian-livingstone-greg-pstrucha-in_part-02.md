---
video_id: "c35YoMdnI78"
title: "The Great Loops Debate — Dex Horthy, Geoff Huntley, Ian Livingstone, Greg Pstrucha, @insecure-agents"
channel: "AI Engineer"
topic: "software-engineering"
published_date: "2026-07-17"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=c35YoMdnI78"
duration: 3616
word_count: 3999
chunk: 2
total_chunks: 3
parent_video_id: "c35YoMdnI78"
---
the hysteria, as
competition in
business becomes closer
and faster.
Okay, let's move on to
our next
question, which will be for
Greg. It seems like
this is a big
turning point
for loops, as I
said, compared to
Jeff's announcement of the Roth
loop a year ago and the mass
implementation in
late 2025–early
2026. The reason why
it has become popular is
perhaps in the new
feature stack where
models are now better at
processing
images. They
need better
verification.
Contextual windows
have become larger and
reasoning models
have improved. Greg,
given all these
advances, why do
you think the way
we
use cycles
today is still
wrong?
I don't think the
intelligence of the model matters
much right now
. The point,
I agree with you, is
semantic
verification, the
ability to close the
feedback loop
to
verify that the
agent's results are correct. And this can be
done to a certain
extent. I don't think it's
possible to do it
holistically, at least not right
now. I think it's
possible for things
that are subject to
deterministic
verification. You can
improve typing
in the system, add
better linters,
simulation
testing, etc.
You can keep
adding to it, and as long as it
stays cheap,
I think it's fine.
But as soon as you
start adding
more and more
non-determinism to the
verification process,
it becomes less and less
correct. This is
only starting to hurt.
You know, if you give an
agent a task where there is a
5% probability of error
, and you start
looping it, then after
10-20 iterations the chances of
success will be 50% or
even less? That's what I
mean, and it
cost you
too much
money. I will keep
coming back to the
economic
feasibility of all this
. Um, and to
rely on some
evidence, I'm pretty
sure
most of the big AI
companies still
use Sentry.
But why is that? They
only use it to detect
simple errors. These are
not security errors.
These are not
performance regressions or anything like that.
These problems still
exist in the way we
currently work with
cycles. And we haven't
solved these
problems yet. So,
thank you.
For Dex, Ralph Loop
pioneered the idea of
feeding fresh
context into each
iteration to
avoid
context degradation. This has become
even more convenient now that
context
windows have become much
larger. Dex, are we
out of the woods yet regarding
context degradation
and context
engineering?
I'll answer your
question,
but will there be any
open
mic part? Because
I have another question for
Jeff.
They drove.
We're trying
to do this in an
Oxford debate style
to make the
structure
clearer and prevent...
You don't want it to
turn into a
chaotic chatterbox.
She's trying
to prevent what you and I
do
when we just
start chatting
. Yes.
Yes. It has already
begun.
Yes. I tried
to control you
both this time.
Okay, I'll
answer as soon as I can
, and then I'll start
getting Jeff.
Yes, you can
say whatever
you want, in your own time. You
can just...Yes, that's
perfectly normal.
Okay. Uh, well, the
coolest thing about
Ralph back in the day was that
you were constantly
clearing the context
window, and is
that effective? Probably not from a
token perspective, but it
meant you could
leave the process
running overnight and
it would never
overflow if
you just
kept
adding
messages. But
if you just
restart it
and say: here is my
desired state of the world.
Check the code, see
what we have, and take the
next step to
get to it. This was a
very clean way
to keep most
of the work in
what we call the "
smart zone" of the
context window.
If you tell it to
do just one thing
, and then we'll clean up
and restart. Um, the
context windows
have become longer. And I
will update the information. I
think I said this in
Miami, but that video is
still in the
editing process. Um, the "stupid
zone" is actually
more of a
learning aid
than anything else. If
you spend
70 hours a week with Claude
for two or three
months, you probably
don't need to think about the "
smart zone" or the "
ignorance zone" because
you've already developed your
intuition. This is just a
guideline; That's why
we train people, because
it helps those who are
just starting to
work with artificial
intelligence.
Try to
stay within
100,000 tokens. For a
wider context
window of a million
tokens, we probably won't
look past this
limit of 200,000. But
for the most complex
tasks, I usually
try to stay
within 60k. I often
went over 300
thousand when just
talking to an
agent, and I was too
lazy to squeeze everything in
to start
from scratch.
However, it all depends
on your intuition.
One of the main signs
that you are in the “
ignorance zone” is
when the model has processed
200,000 tokens,
tries
to finish the job,
passes the tests, but
nothing works, and
it resorts to
strange “hacks”. You
read her train of thought
and see, "Oh, it's a test,
but it's from
somewhere else, I don't need to
fix it, it's
outdated data," and you
realize that's not the
case. That moment of
frustration when you
see the model
just frantically
trying to
do something is a signal.
This is an instinct that I
think many people
develop after
a few months of
working with such
models. And if you
don't have one yet,
follow our
recommendations. So yes
, context windows
are getting better. I think
they are getting
bigger. And so the
main principle is the
feedback loop
: do
as little as possible in
each iteration, because
the more data you
provide to the system, the
more it can
do autonomously.
If you have
deterministic
processes that make
decisions and create
little prompts for the
agent, you don't
have to
remember to do it every time or
tell them, "Hey,
check the
PR comments and fix them," and
then wait for
someone to leave another
comment to
come back
three hours later. It's
like, "Oh,
check the comments
again." If you can
automate this
process—that's great. And
this, in my opinion, is the
basis of how
automated cycles work today
. I
would like to ask...
That's all we have
time for. I'm sorry. I
really have to
stick to a
schedule. Um, okay.
So now we'll
get to the
anatomy of what
makes a good cycle a
good cycle. So,
okay, part of what
makes a cycle
good is
verification. However, it
seems
contradictory that people
are saying that our
job is to stop
writing prompts and
start writing loops,
when loops with bad
prompts lead
to agents
cheating and
achieving their goals
by changing tests
instead of
working to
pass them.
Geoff, how do you keep a
model from cheating
when checking
their own work?
Um, I'm actively
using pre-commit
hooks, friends. Um, and I
create this
back pressure
by analyzing the
work done. Um, the other thing
I do—Dex
mentioned that with
Ralph, one of the things
was that
everyone tried
to do compression.
Think of
compression as a
lossy function,
like uploading
a video to YouTube and then
uploading and
downloading it multiple times. You
lose clarity, and
this is already a
non-deterministic and
probabilistic system.
So the theory of how
Ralph came about is
that
there's a "stupid zone," and
I wanted to
deterministically
distribute whatever was
needed, because if it's
not distributed, then the
search space for what
he can do is
not limited, but
at the same time there's still some
margin left. So I
also get nervous when I
go beyond
100k, even with these
million-plus
context windows
, and that's a really
important thing to remember.
A lot of people think they
want
to use an LLM in a
company and say, "
I have this data." I
replied: "Great."
Okay, you'll have to
use a loop
to batch process
this data. I want
you to think of
context windows like a
720KB floppy disk.
You only have about an
eighth of that
floppy disk of usable
memory that you
can actually
use for LLM.
So you actually
have to process
them in batches. You
can
roughly estimate the volume of "
Star Wars". If
you take the script for
the first episode of
Star Wars and
tokenize it,
you can only fit
two such scripts in
memory before the
context window “
burns out.” This is
approximately 150
kilobytes of textual data for the
film script. So be
very careful with this.
Something I've been doing for a
long time and that seems
really stupid: I
run the model "
naked", without any
skills or markup.
I actually
get rid of all
my skills, all my
markups and everything
else when a
new model comes out, because
these models actually
have their own tastes and
preferences.
For example, Jupiter 55,
when it first
appeared: if you
shouted at it in
capital letters,
it became weak
and timid. But if you
use Anthropic,
she wants you to
yell at her. Read the
model cards, friends
, especially
integration developers, because they have their own
unique
tastes. Therefore, keeping
everything within normal limits is
truly engineering. This is
real engineering.
Thank you. About 10 days
ago, Jeff coined the
term “converged
engineering”. He
said this is the moment
when your cycle
coincides. This is when the "
flawed" parts of your
cycle are brought
together as a complete
system for
testing until it
stabilizes.
Dex, what's wrong with the way
we use
cycles today? How can
we make sure that
combining “
incompleteness” into a cycle doesn’t
lead to even
more chaos?
You have to read the code. I
want to highlight
an experiment that
Jeff conducted
earlier this year.
I think it was
called Loom, where we
had Ralph Loops
trying to create the
software platform of the
future. And I
think you built
AWS, you built GitHub,
and then you realized:
how do we give the model
feedback
on what it's
not yet strong at,
like
interface testing? Well,
a way to create a loop
to check "is
this interface good?"
"is to give the model something
like PostHog, where
you can deploy
lots of different
experiments,
see what
people are using, and
instead of looking at
screenshots, the model
can analyze
the data and see, "This is what
works better."
This is probably the right
color for the button. And
now you've already removed
human visual
perception from the
equation. And it all
sounded really cool. And
as for the question, how
to guarantee that
cyclicality does not
multiply "deficiencies"
? I don't think that's
possible. This is a perfect
example of hype
trumping
discipline. Jeff,
what's
going on with Loom right now?
It still exists. It's
on GitHub. Ahem.
He's still there. But are you
continuing to
work on it? It's been
six months since I've been looking for
engineering
verification methods.
Of course. What did you
tell me? You said that
Loom won't work until
we get better
programming languages
or much more
advanced models. And
for me, this is a
textbook
example of how hype
trumps
discipline. We are
really excited about
all of these things. And by
the way, everyone should
do what
Jeff did. Loom—it's just
great.
Experiment.
Try
to push the boundaries, because that's how
you
learn where they
go and what's
possible. Otherwise, you
just keep
using your
old skills with
each new model,
assuming it
has the same limitations
. But it's also a
key point, like
... I don't know how to say it,
but it's not working yet.
This thing doesn't work yet.
It will work someday,
it's inevitable, but
again, we need to
distinguish between what
works today and what
is hype. So I don't
know if this is a complete
answer to your
question, but the way to
not mix garbage in
loops and
create even more
garbage is to read what
comes out the other
end and
make sure it's
not garbage.
Yes, that makes sense.
No, the developers haven't
found a solution yet. So
why do you think you'll
find it?
Yes. That's right. And now
we're all trying to
figure out how to make
it all work.
Yes,
definitely. Skeptics
say cycles
fail
quietly. They either
spin forever for
your money, or the agent
prematurely declares
success, having done the
job halfway.
Executives
are already starting to ask
questions about
token costs. Greg, when does
the cycle pay off? And how
often does this
actually happen?
I don't think they
will fail
quietly. I think they're going to
fail
very, very loudly,
especially when
you look at the bills.
But there are cases, as I
said, where I
use cycles
or do
engineering, and I would
say that in those
cases, cycles are very
useful, or when you
make a conscious
decision to pay those
costs. A concrete
example: we perform
security scans on
our PRs locally, and
after the PR has already
been accepted, because they
always find
real vulnerabilities.
Which we might have
missed, and in this
they are superior to
humans in
code review, although it is expensive
. It costs us, I
think, about
five dollars per PR or
something to
run all the
necessary checks,
but this is a case where
we consciously decided
it was worth it. Um
, there are cases where,
say, if
you look at very
well-defined
systems, like
the experiments with
rewriting Next.js
or Bun on Rust, or running
a browser, where there are
years of
test suites and
specifications, you can
verify
the results very well. Then
iterating and
achieving these
results
seems to work. From what
I can see, Bun on
Rust works quite
well. So,
there are definitely
use cases, like what
I do quite
often, where you can,
for example,
create prototypes
. I often create
prototypes of products
we need to
develop at Sentry.
They are disposable, so
I just write them quickly
and forget about
them. And if we
like them, I
start reading the code and
am horrified. Then
we go back to
the beginning and start
writing down
the specifications of what
we actually had in
mind. And we are moving towards
this solution, but it
will require
much more
human participation.
Overall, I think
they have their place
. But, as Dex said, the
problem is the hype
around them. Hype
trumps
discipline, as he
said. I also really
agree with the idea that it's
worth just
trying different things.
It's worth
experimenting yourself.
Try to see what
works for
you and what it
ultimately leads to. And,
you know, spending
less time on Twitter
right now is probably
beneficial.
Yes, valid
comments. An
efficient, cost-effective cycle
should
track status
to know what has already been
tested. This
memory
is stored somewhere on
disk and increasingly in
shared storage
that is read and
written by many
agents, especially when
moving from
single to
multi-agent
mode. An access
control problem arises
: it is impossible
to determine which agent
recorded which data and
who has the right
to read it. Maybe it's suitable for a
personal
computer
, but
definitely not for production.
The essence of the problem lies precisely in
this. Shared
memory is what
loops use
to learn from each
other and
achieve
results faster. But
restricting access
for each individual
agent to
solve the
control problem isolates them,
killing collaborative
learning. Ian, how do we
solve the problem of
controlling access to
shared memory so that
loops can
converge to a
result faster?
Excellent question.
Ovva. Ovva. Um,
if only someone were working
on a product that
could,
if only someone would
think about it.
I mean, first of all
, this is still an
unresolved problem.
Let's be honest:
our
access control systems
were not designed for a
world where machines
act and reason on
our behalf. But
overall, I think
some of the basics are
starting
to emerge, and if we
put aside
cloud IM and stuff for a moment,
markdown—it's just
great. So, if we
say that memory
is markdown for
conversational purposes, the main
question is: what exactly are these
things, how do I
share these
files and
use them
as memory, and how do I
manage access to
them? And if we
use this
model, I believe
we already have the foundation for
most of these
processes today. It's
just difficult to
perceive. A good
example would be my
recent tweet. I've
been experimenting with
Notion, and we at Keycard
use Notion a lot. I
just wanted all
my Notion materials
to be available in
markdown format because it
was easier for the agent to
work with than
through MCP, and I'm a
CLI fan and I was
dealing with it. So
I think what we're
really missing—and
Dex and I
discussed this
last time at MCP—is the
main challenge: how do we
present the world to the
agent in a way that they can
understand it? And how do you
determine what is
available at a given
time and
make it convenient
for everyone? I don't think
we've figured it out yet,
but certain
patterns that
make sense are already
emerging.
Okay, now that we've
discussed the anatomy of the
cycle, we'll discuss
its future. Are
we ready now to
create “
software factories”? Has
cycle engineering become so
effective that we are
ready for
full-fledged
software factories?
To begin with,
if loops are
only suitable for
verified
tasks, then fully
autonomous factories
must be able to
verify everything
they do. Greg, is this
realistic
given other
aspects of engineering, such as
deciding what
to build, whether the
chosen
abstraction is correct, and what
tradeoffs are
acceptable? Is
this even
realistic? I think
if computing
power were
free, it would be a
good start.
But, um... uh, I think, I
think we're getting to a point
where,
or let me
put it this way: the decisions
that you make as a
person involved in the
process are
design decisions,
architecture decisions,
important decisions that
I wouldn't
trust to an agent, in my opinion. and I don't yet
see a
future where this
will become a reality.
I think the reason is
that when you look
at large
organizations, and
any engineer with
many years of
experience will confirm
: it's not always about
what you should,
what you are. We must
build, and even in what we
should not build. What are the
really right
compromises? Where is the
complexity that you
want, um,
want to invest in, and
where is it worth, um,
betting on
maximum simplicity
. In my experience,
agents love
complexity. They
will continue to
add elements to the
stack, mm, without limit
. So I think we're
shifting the emphasis. We're
getting to the point where
by adding more
validation, more
semantic
checking, they're
able to do
much, much
more. And I, um,
don't deny that. But I
want to stay in the
architectural decision-making process
, and I don't see them
taking it over
anytime soon.
Thank you. Shopify's head of
engineering
told everyone at
Kerser's Compile conference that your job is
just to write
loops. Steinberger
tweeted: "
Here's a monthly
reminder that you
shouldn't be
prompting your coding
agents anymore. You should be
designing loops
that prompt your
agents." The number
of views of this
tweet reached 8
million. Jeff, in
your initial
Roth blog post you
mentioned that cycles
require
senior-level expertise and sometimes
only achieve 90% of the
result. So, is it
safe to give
the advice "just write
loops" to 3,000 people, or to 8
million, or only to
those who
have actually learned how
to set up those
loops?
Yes, that's an interesting
question. mmm, it's very
difficult to adapt and
teach, like what to
do and what not to do,
for such a wide
audience. So all
I can do is write the way
I wrote it in the beginning. I
wrote for my colleagues
, for the people I
looked up to. For some
reason, it occurred to me
that everything
had changed. The rules of
the game have changed. But I
was very concerned that
some of the
best
functional
programming experts and my
real colleagues. I
remember how, um, Flyio
Thomas PC it made him
think. He
has a blog post where he
writes about it. So I
started writing for
my colleagues and those I
looked up to, to
spread it around the
world. This is difficult. But
at the same time, you go
on YouTube, and you see
people creating
things that they've never
done before.
They go to bed,
wake up, and they have a
new Discord bot. This is
magic. I want
people to remember that this
was a
distribution template, essentially an
orchestration template.
This was reduced to a
simple "while true
" loop using "cat", because "
cat" is the simplest
learning primitive;
If you want
to teach someone, you have to
make everything as
simple as possible.
Make it as
simple as possible.
So cat prompt, that is, you
design the prompt as
it should be. You
use
the file system as
state, recycle the
context window,
run a loop. It
reminds me a bit of me,
but it was effective
with minimal
effort. It just
works. But the whole idea is
that there should be
some kind of PID controller
on top, or some
mechanism that
determines whether the
loop should continue.
This is really difficult. Is
it safe or
dangerous? "Safe
" is an interesting word. No
one should
use
coding tools on their
local laptop.
And it's not because of AI, but
because of attacks on
NPM supply chains. This has always been true
. I've been trying
to solve this
problem for seven years. And
now we've once again drawn
attention to the fact that AI
can be
dangerous by
executing dangerous
commands, but your
everyday
development methods are already
dangerous, friends.
So fix that and
then these methods
will become safe.
Thank you. Dex, you
tweeted that
most engineers
get
2-3x speedups with
coding agents, and that's
realistic. And if
you chase
100x speedup
, you will get lost
in optimization meta-problems
. And you
may never
achieve that
life-changing 10x speedup if you don't
stay
pragmatic. If
only a
2-3x speedup is possible,
how do we get to a
fully autonomous
software factory
?
Yeah, and I think that's...that's a
good question. I
think there's...there's a bit of a
mix here, isn't there? We
talk about what
works and what is just
hype. I think it's
worth emphasizing: you
should try again
; you should
try to
push the boundaries and
do things that might not
work today.
But don't assume
that all your work
has changed just
because you saw
something work on
Twitter. Essentially, it's like "
don't throw away everything
we've learned."
Don't try to
dismiss
the decades of software development careers
that we
as a community
have built and
created together. And
this brings us back to
what I consider the
biggest
anti-pattern in
designing and
building a “
software factory”: when
