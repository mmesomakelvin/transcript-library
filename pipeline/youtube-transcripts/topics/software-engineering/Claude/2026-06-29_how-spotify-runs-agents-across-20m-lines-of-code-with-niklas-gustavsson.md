---
video_id: "9DHZLw5653E"
title: "How Spotify runs agents across 20M+ lines of code, with Niklas Gustavsson"
channel: "Claude"
topic: "software-engineering"
published_date: "2026-06-29"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=9DHZLw5653E"
duration: 1571
word_count: 4512
---
I remember
talking to you, I
think it was September of
last year, and you
said something like,
"Yeah, I don't think
anyone
will be using
ID by the end of the year," and I
thought that was
crazy. This will
never happen.
I could imagine it
would happen in two
years, but two months
seemed extremely
difficult, and after
two months I found myself
no longer
using
an ID and the
way I worked had
completely changed.
Changes I haven't seen
in the 30 years I've been doing
this
job.
Interestingly,
it felt exactly the
same inside as it did outside.
OK.
But you know, we had a head start of
about a
few weeks.
Yes.
That was all, but
the feeling was exactly the same
. So
okay, I'd like to
start with how you
got started in
programming?
My formal education is
actually related to
biology, so
I am a
molecular biologist by training.
And in this field, when I
was in
graduate school, we
started working with what was
then
considered big
data. So, we
had a lot of data from
genome sequencing.
So I felt I
needed to improve
my
programming skills. So I
turned what was supposed to
be a year of creative
sabbatical into
almost 30
years of working in the
industry.
So, fast forward to
today, with
all the changes
happening with
agents and LLMs, I
feel like your
personal
use of Spotify
is on the edge of what
I see in the
industry. What was
your first personal
feeling about AGI?
I think I
had a few
feelings, depending
on the problem we were
trying to solve.
We started quite early
when LLMs came out to
try to
use them
to automate
code changes. And it was a
real struggle
at first, but after
a while, as we
started to understand how
we could
use LLMs,
judges, etc., we
started to get some
pretty inspiring
results.
And that was a few
years ago?
Yeah, that was before, before
Claude, and before, it was kind of the
early
days of GPT, something like that. And
again,
the results we
got back then didn't
show that we
could solve all of
our problems, but
they gave an idea
of ​​where this was
headed in the
future. So this
was definitely one of
them. Because I have to say
that for my
personal
programming, the
real breakthrough
was probably Opus 4.5 in
November-December. It
went from
something
like a smart
autocomplete to
something that I could
actually throw
real problems at and
I didn't have to
do as much
operational
engineering.
The most important thing for
me was also that
I didn't
have to
edit the code anymore,
because my workflow
up until then was
: I had a
model, you know,
about 80% of the code or
70% of the code, depending on the
model, and then I
always had to
go into the IDE to
make the final changes.
And I just stopped
doing it.
Right.
And it was madness.
Yes.
Um, but yeah, I think that's a
big part of the
reason why it
felt like such a
leap.
What is your
workflow like today?
For example, how do you
use
quad code? How
does Spotify use
quadcode?
Yes, I use
it, I would say, in a
pretty simple
way, I think. I
run it in a bunch of
tmux sessions in the terminal. I
usually have a
bunch of agents running in the background
when I'm doing some
work.
How many
terminal tabs?
So I'll have
five to ten
tabs, and then I
use some
panels because I
like to have a
terminal where I can
get the diff and
so on. So, I have a
matrix of cloud
sessions and corresponding
terminals in a set of
worktrees
I'm working in. We are
set up so that
we have a very
large unified mono
repository, which
we are gradually
moving towards. But we
still have thousands of
small poly
repositories for
this. So most of
my work
happens in these
mono repositories.
So I usually have
several clouds and
terminals
running there at any given time
. And
then I need to
look into one of
our
polyrepositories, I'll
open a more
temporary cloud
session there.
Do you think
monorepository or
polyrepository is a
better fit for
Quad, or to be
honest, I was a little
worried about
setting up
monorepository and
agents at first
because, um, I think with
some of the previous
tools we
used, we were
seeing
issues with
indexing and so on. Hmm,
and these are pretty large
repositories, our
backend
monorepository
contains over 20
million lines of
code. But it turns out
that Claude
works great in these
repositories, and I
think one of the things
we discovered is
how well
Claude looks at other
code in the repository
to get
inspiration for the
problem you're
trying to solve
.
Hmm, I would like to
ask about some of the
infrastructure
you have created.
Hmm.
So, you know, on Spotify
, you obviously created
Honk. Yes. I feel like
from the early
days of experimenting with
models to
building Honk and
building background
agents on, you know, on the
agent SDK...
Yeah.
You see the future before
others. What is it about
the culture or
the people working on it
that
leads to this?
Just tell
me this story and how is it
going?
5-6 years ago, we
found that our
code base was growing
much faster than
the number of engineers
we had to
support it.
About seven times
faster. This meant
that over time we had
more
and more code that
we needed to
maintain. Uh, and
Spotify is a company that
has an endless
source of ideas about what
we want to
offer our
users. So
getting bogged down in
maintenance was
n't the best place
to work. So we
started
automating,
trying to
automate
as much of this
maintenance as possible.
A lot of it was
pretty boring
work, like
upgrading to the latest
version of Java or
updating a library
or something. Uh,
a lot of it
was moving from
one API to another across
all of our code.
Um, so we created
this infrastructure
that we call
fleet management, which is that
instead of
imagining that during a
migration, we
send out a
migration description, or, um,
a guide, to all our
teams and ask them
to do this migration
manually for all their
components. And
instead, we
imagined that we could
find ways that we
could make
mutations to
our entire codebase,
instead of having
it stored in
thousands of repositories
.
Because every team
did the same thing.
Yes, yes. Hundreds of teams
were performing the same
operation manually
on thousands of
components. So
each of these migrations
took months and
months and months. We
could do
maybe 10 of these a
year. So we're barely keeping up
with the
supported
version of the frameworks
we're working on.
So, again, we
started
automating that. We
created all this
infrastructure for
this. We have combined
millions and millions of
these types of PR. And
they all relied on these
deterministic
scripts that you would
apply, and that would
make these code changes
or
configuration changes. And one
of the things we
discovered pretty early on
is that the code has a
huge API surface area
. So trying to make
changes to the code
gets complicated very quickly
. So we pretty quickly
hit the limit of
how
complex the changes we
could make. Even
switching a method in an
API becomes quite
complicated when you
can call it
five different
ways.
So we deal with
this only using
traditional
static analysis,
such as AST
transformation.
That's right.
Because let's say there's an API
that you just
call a variable or
something like that.
Now you know that
you need something
like
variable and state tracking.
That is absolutely true.
This is messy.
Yes. So, every
script whose code we
had to
port
turned into
thousands of lines of code
addressing
every edge
case in that code.
So that inspired us,
as I mentioned
before, almost immediately
after the early LLMs came out,
like, "Hey,
can we
apply these things
to this problem?" And
it didn't
work very well in the beginning.
Partly because the
models weren't
good enough
, partly because we
were just very
naive in how we
tried to
do it. We simply
placed the code
in front of the model and
tried to make
it change in one
go. So it didn't
work. Over
time, the models
improved and our
ideas about how to do this
improved. We
started using
LLM as an assessment to
make sure the
outcome was as
intended. We began
to analyze the problem,
to decompose it in
different ways.
So there were many,
many, many
iterations of this, uh,
and many internal
hacks to try to
solve this problem in
different ways. Uh
, we started
consolidating it, and
it became what we
now call Honk.
Hmm, that was a whole
different beast.
He wasn't originally based on
Claude. Hmm, it was more like a
pile of personal belongings.
But it was the first
ray of light at the end of the
tunnel, like: yes, this is
actually a problem
that we can
solve. And then we
did many,
many iterations on Honk
, yeah. So today we
released what we
call V2, but I
think
it's actually V8 or something like that.
We just didn't
keep track of
the iterations we were
doing. And it all
started with
automating
code changes, scheduling, and
orchestrating all of
our repositories.
But pretty quickly,
the engineers realized, "
Hey, this is useful for
other things too." I want to
mention this in Slack and have
it do
the task for me.” Or
for all that.
So, today Honk
has become a
much more
ubiquitous tool
for us.
Tell me about
Honk's architecture.
For example, how does it
work? What are its
main parts? You
talked about there being an
agent who codes. And
it's just built
on a four-
agent SDK.
Yes.
And you also have a
verification step,
for example, an agent
verifier.
Tell me
more about...
So, we used to have a
judge at Honk, but we
actually removed
it because we found
that the agent and the models,
going back to
four fives, had become
good enough
that we no longer
needed a judge. The judge
was very important in
the first iterations of Honk.
So that took us
from, if I
remember
the numbers correctly, about 20 to 30
% success rate of
verification requests to
about 80%
success rate. So that
was a big, big
change, but again
, when we
talked about models,
they caught up, and, uh
, the complexity of the agent
caught up. So now
we've eliminated this
judge from Honk. So, Honk is
architecturally quite
simple. This is an agent SDK
running in a
Kubernetes pod. He has access
to a
toolkit. Previously,
before V2, these tools
were, uh, a
predefined set of
tools that we
trusted to provide
to this agent. Now
we, V2 users,
can add
our own tools,
directly from these
tools. So
now the agent can
use
any of our
internal
tools. And one
of the most important
tools
it has access to
is that it can
run validation,
that is, run
CI builds. And it can
run them on both Linux and
Mac OS. So, Mac
OS is especially important
to us because
any development for iOS,
for example, requires
builds for Mac OS.
Hmm. And is it just a build
, or are you doing something like
fully
opening the
iOS simulator, running the app with the
model? How
deep does it go?
He can conduct
such tests. We
definitely have cases where
we integrate the
simulator and Claude to
automate
things like
going directly from design
in Figma to UI implementation
. And we
use this
to port,
for example, our
TV apps
from our iOS apps
.
I think
verification is one of
those things we
talk about a lot.
Yes.
But I think when
you're doing this kind of
closed-loop development where
the agent is given a
task and then they
have to maybe break the
task down into parts
and they just have to
do
a lot of work without a
human in the loop.
Yes.
It's just the
most important thing.
Yes.
And I think one of the
common mistakes
I see is that
companies don't
invest enough in
how well
that
verification works.
I think that's very
true, and I think that's
true for us too.
One of the main
changes we made to
our engineering
practices as part of
this was to increase
test automation. We
have divided our
code base into many
thousands of components.
Each of these
components has
clearly defined
ownership rights. He
belongs to a certain
team. And this team
bears full
responsibility for
that. They probably
designed it
originally, implemented it,
and are managing it. And
part of it was like,
before the investment
we made in
fleet management, that this
team was aware of
every change that was
being merged with that
code in their codebase
. Uh, and that
meant that in some
cases we could
be a little sloppy
with
post-test automation
because that team
could always
test every PR
if they
needed to. But with
the start of
PR automation for
our source
code, one of the things
was that we
needed to
change the expectations
of the teams.
You may no longer be
aware of these changes. We're
going to
automatically
merge
most of these changes, uh
, without you
even seeing the PR.
So, that meant
we had to
build much
better
test automation to
make sure that, um,
all of our
software could
withstand such
automated changes
. Now, given
where we are
today, it was
very beneficial for us
because now we
can
use
agents and the same, um,
verification that we had
before.
There's one of these
trade-offs that
people talk about all the time
in engineering,
which is reliability and
quality on one side
and speed on the other
.
Yes.
And to me, that seems like a
false dichotomy
because if you want to
move faster, you
need to
automate your
quality assurance practices so they're
better coded. It's
not in anyone's head. It's
actually something
like a skill, or
QuantumD, or some
MCP set, or something
that Quad can do.
Yes.
And ultimately, that's what
allows you to
move faster. And this is
another example of
how in engineering,
productivity
always comes down to
investing in
infrastructure.
It's not about
working more
hours. It's simply
about making the
infrastructure
better and better. And this sounds like what
you're
talking about.
We see that
we are maintaining
neutrality in our
quality metrics
while significantly
improving our
speed. But it doesn't come for
free.
We needed to
make that
investment in
test automation that
we talked about. Um, I
think we're going to have to
continue our
investment in our
reliability practices.
Some of them
are also changing as part of
this transition.
And I think as you
try to move
faster and faster,
you have to
invest even
more in reliability.
Yes. Yes, that's absolutely
true. So, yes, we
do about
4.5 thousand deployments in
production every day.
Oh.
Um, so there are a lot of
possibilities for
things to go wrong.
Um, so we need to
have proper
practices in place to
make sure that everything
that comes out of
production is of the
desired quality.
What is the idea behind doing so
many deployments
? It's kind of...In
the past it was
just continuous
deployment, and now
maybe it's a faster
signal to the agent or
what do you think about it?
I think that's something
we've always
worked to
optimize for
as long as Spotify has existed. We
want to be
able to have an idea,
and the developer to have an idea
and be able to
implement it into
production as quickly as possible. It used to be
weeks or months
ago, um, a few years
ago, and we just, um,
kept
trying to
optimize it, and
now it's, you know, an
hour or something.
As I mentioned
before, we have a lot of
ideas. We want to
test and
explore these ideas. And
the sooner we can
get feedback
on them. In some
cases, this may be
feedback from our
internal
users. In
some cases, there may
be feedback from our
, er, external
users. But in
both of these cases,
the faster we can
iterate,
the more we've found
that we, um, build
better products and
can
deliver them to our
users faster. Not
every idea
gets sent in
an hour, a lot of ideas
need, you know,
a lot of research
before we can
send them, but the
very idea of ​​being able to get
confirmation quickly is
extremely
important to us. Yes, agents
are definitely
part of this cycle as well.
So for Spotify, the
engineering
organization is quite
large. That's thousands of
engineers, right?
Yes, that's 2,900 engineers,
something like that.
2900 engineers. How do you
think about all of this, how do
you feel about ROI,
that is, measurements,
just making sure
you're moving in the
right direction
?
As for
measuring ROI, as
we've already done, it was
easy and we saw
very clear signals in
this area. We see,
for example,
an improvement in PR rates of
over 75%, which we
can directly
attribute to
AI tools. And I
think that currently
about 73% of PRs are
directly
related to the fact that
they were created by AI
. Um, so we're doing pretty well with these
metrics
. But of course
we want to
tie this to
user value and
revenue.
Hmm. And how do you measure
something like that? Is this something
like AB testing or
something like
case
studies? What do you
think? Yes, we
want to link the
deliverables that
engineers perform,
i.e. PR requests,
deployments, to what we
call
work items,
i.e. the planned
work that we have.
And then it
ties into AB
testing and
deployments. And then
we can see from that
how that PR
contributed to this,
uh, the
US Department of Defense that we
have, and that contributed
to this
user value. This is an idea,
and we are currently
trying
to build these connections
.
Yes. I feel like
once upon a time, you know, we've
been working
in the
developer productivity space for a while now. When
you have a large team,
you want to make them
more productive.
Yes.
And it seems to me that
once upon a time a big
win was
something like a
few
percent,
one percentage
point.
That's right. That's right.
If you are lucky enough
to measure it.
Yes.
And as with modern
improvements, it's so
obvious to everyone.
However, you know, as
engineers, we still
want to measure it.
Yes, I will say that the
ROI discussion
was pretty easy at first
because we
could see such
significant improvements. And,
um, but as
maturity
approaches and
costs improve
, I think the accuracy of
ROI estimates, the expectations
for accuracy also
increase. So we're
trying
to improve how we
can do this
type of measurement.
Part of this is
about
improving
productivity. And
part of it is about
how much does it cost
to get this
improvement?
That is absolutely true.
And now, you know, people
are seeing these tens or
hundreds of percentage
points of improvement. And
now you really
want to explain this
by how many tokens it
took? How many
hours did it take?
What was the
productive
outcome?
Yes, that's right.
Hmm, I want to end with
one
question, I guess. What advice would
you give to your
colleagues? What advice would
you give to other
CTOs
and, you know,
engineering leaders like
VPs of
engineering at other
companies?
We found that these
investments in core
capabilities, we
talked about
test automation and
verification. I will say the
same goes for
, um, or another
aspect that we
saw, which is, um,
standardization. So,
we were looking for more
consistent
codebases, more
consistency in the
tools that we
used, ahem,
frameworks that we
used. And we
saw that initially
we were making these investments
to simplify
things for people and
make them more
productive, but we
saw the same thing
translate very well to
agents. So, if you
, um, I mentioned
this earlier about
Claude being able to
find inspiration
from other pieces of
code in our mono
repositories. If
they consider
10 different ways,
Claude will be more
confused. So we
see that the more
consistency we have,
the better
our agents perform. So, I
think if there's one piece of
advice I would give, it's
not to ignore such
investments. You
need to have the
same smart
engineering practices
that we had before, and
they still
apply in
this new world.
It may look
different.
There's a new
player in your codebase, but the basics
seem to
apply just as well
. At least
, that's how it was in our
environment.
What's your advice to
engineers who, you
know, maybe have been in
engineering for a while, and
I know Spotify
was talking about
engineers, you know, like
shipping
piers in the subway,
um. This is
really cool. So,
you know, obviously
engineering is changing
. What's your advice to anyone
who's in
the middle of this and,
you know, trying to
figure this out?
Yeah, let me
talk about this from a
more personal
perspective, I guess.
So I'm someone who has always
really
enjoyed
solving problems in
programming. This is
going to sound kind of
boring, but in my
free time I sometimes
do competitive
programming because it's
just a fun
mental exercise.
Deep down, I was always
a little worried, as
we said
before, that these changes
would completely change the
way we work. And I was
really excited about
this, from my
personal perspective,
because I won't miss
this part as a
complex mental
challenge of
problem solving. And now I
find that I have
five
agents working in the background, and the way I
interact with them is very
different from the way
I worked a
year or two ago. And for
me, it turned out that I was
wrong, and I
love what I
love to do, which is
solve problems,
and the way I
solved those
problems turned out not to be the
most important thing for
me. It's always going to be
personal, because different
people will have to
go through this transition
differently, but I think
focus on the
types of problems you're
capable of solving. Hmm, I
think I can become
more productive
because I can
get more
value out of the
work I do. I can also
solve problems
that I couldn't
solve before. I can
jump into
codebases
that would have
previously taken me
days or
weeks to dissect, and
contribute to things I
simply couldn't do
before. So for me
it was great. Hmm, and
again,
it
will look
different for different people, but I think it's
worth trying and
finding a way to
use these
tools in a way that
you like.
I feel like I'm seeing a
big shift in
implementation time because
now, you know, Claude is
doing it in the
background while I'm
doing other
things.
Yes.
Instead, I'm
spending this time
thinking about what's
next,
talking to
clients, and doing
a lot more
prototyping than I
expected. And some of
this is for
external products,
some of it is for
internal
automation. How do you like
this change? How did this change
work for you?
I think I had
something similar happen to me, and
yeah, we didn't talk
about it, but one thing
we invest heavily in
is
prototyping in particular
. Hmm, and it's
geared towards both, I would
say, engineers and the
non-engineering
cohort. One of the things
that Claude and similar tools have discovered
is that anyone can
take their idea, whatever it is
,
express it in
natural language, and
then ask Claude
to implement it. So
as we humans started to
figure this out,
including again
non-engineers,
they started
trying to do
this in our real, uh
, applications, and it's a
pretty complex
piece of code, uh,
but they started to
see signs of light again
that they could
do it. So a few
months ago we
started, uh, essentially
building
the infrastructure to
make it simple.
So today we have a
very easy way to
start building a
comprehensive
prototype in our
mobile apps
and our
backend, and we have an
internal
app store for these
prototypes where you
can share them
and, for example,
look at someone
else, try
someone else's prototype in
your, um, your
app. And it was a
real eye-opener
for people who
maybe before and
again, including
engineers who
maybe weren't very
familiar with how
to build something in
our mobile
apps, to be able
to express ideas
that previously
motivated a bunch of
engineers to try to
build it for you. And
now you can go in
, and with the app,
within an hour or two,
you have a working
prototype that you
can start
sharing with people
to show what this
actual idea
looks like in real
life with
users,
real data,
and so on. So, yes, these kinds of
things were
unthinkable a year ago,
and now we do them
every day.
Yes. I
like it. Have
you seen a change in
who is creating it?
Is it like the engineers who
do this? Does it
mostly
come from
designers and
product managers
? How has this changed?
Right now, everyone, down to
one of our
co-
CEOs, has
prototypes in this
app store.
So,
was it actually good? Uh
-huh. Yes, yes, yes. There are a
bunch of, uh, our
senior executives
who have created good
prototypes. Again
, ideas they
always had in their heads.
They have a whole team of
engineers who could
develop this, but that
team is focused
on other things. So that
they can
try something out
faster than before and,
you know, get a feel for what it's
going to look like. Yes, this
allows you to test
an idea in a day, not
weeks or months.
Nicholas, thank you very much.
