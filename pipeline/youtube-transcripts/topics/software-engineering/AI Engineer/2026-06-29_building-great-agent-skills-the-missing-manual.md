---
video_id: "UNzCG3lw6O0"
title: "Building Great Agent Skills: The Missing Manual"
channel: "AI Engineer"
topic: "software-engineering"
published_date: "2026-06-29"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=UNzCG3lw6O0"
duration: 1243
word_count: 4098
---
Hello, friends! I was really
hoping to make it
to the World
AI Engineering Expo,
but family matters
intervened and I can't make it
. However,
I will not leave you
empty-handed. I'm
going to give a
talk that I was supposed to give
in San
Francisco. This
report is called
"The Missing Manual."
How to write great
skills. And I think
the ability to distinguish
good skills from
bad ones is becoming increasingly
important. As
developers, we
seem to be quite
talented at finding
different forms of hell
we can end up in
. A few
years ago, we had
tutorial hell
, where you would
go through a bunch of
tutorials
trying to
learn something, but you couldn't
put it together and you
just got into
this cycle that you
couldn't get out of.
We had a
framework hell where every
10 minutes a
new
JavaScript framework was announced, and, you know, you
constantly had to
learn some hot
new thing. And now, I
think we have another
version of hell
called
skill hell.
Skill hell is when all
these skills are available,
freely available, that
you can
download, that you
can
contribute to, that you can
figure out on your
own, but you
don't really know
how all these pieces
work together. You
can't tell a
good skill from a
bad one. And that means
that people are trying to
put these structures
together, trying
to try everything there is
at once, and they
can't seem to get it, or
rather, they don't
get the
results that the
skills themselves promise. This
applies to both the
individual
level and the
organizational level.
Organizations don't have a
way or don't
understand how
to build good
skills. How to take
your operating
procedures and
turn them into
things an agent can do
. And if you
don't, it's hard to
get the
rewards that
skills can offer. Another
skill, brother.
I think that's what
we're talking about. And I also
feel a little
guilty here because
we have Matt's PCO skills
, which are my
skills repository
, which is one of the
most popular
engineering
skill sets. And so I
feel like I want to
help people who
use my
skills get out
of skills hell. So how do
we do it? How do we
get out of this?
What is really
missing here? In my opinion,
we are missing what
makes a skill
great. We can't yet
look at
a skill and say, "
Okay, this skill
does these good things
, and these bad things." There is no
common rubric,
no framework for
reviewing a skill and
improving it. And that's exactly what
I'll tell you in
this report. I'll give
you a checklist of
skills. A
checklist of
things you
can look for
inside a
skill to
make sure it
does what it promises
and ways to
improve it, ways to
write skills.
This
checklist looks like this
. We start with the
skill trigger. How
the skill is invoked
and what solutions
need to be
developed there. Then the
internal structure of
the skill, how it is
actually
composed and
structured. Then,
thirdly, how do you
actually manage
the use of
the skill? How do I get
a skill that allows
an agent to tell
him what to do? And,
fourth, how can we make
this skill as
small as possible? Because once
we have a working
skill, we need to
maximize it.
Cross out everything
irrelevant,
cross out everything superfluous.
There is one convenient
advantage to
not having me around
, and that is that you
can
try this right away, because I have
coded all of this into a
new skill in my
repository
called “writing
great skills.” So
, if you have an
immediate
use case, just
head over to my
skills repository.
Just close this
browser, get out
of here, and
use this
skill to
improve your
skills or write great new ones
. But
let's start with a
checklist.
Then we have number
one–the trigger, the way in
which
the skill is triggered. And to
talk about this, I'm
actually going to do
a little comparison,
which is that
my skills are often
compared to another
set of extremely
popular
engineering skills
called
superpowers. And I'm
often asked
the question: how do your
skills compare
to superpowers? What is
the difference between them? To
understand this, we
need to understand
the difference between
user-driven skills and
model-driven skills
. Whenever you have
a skill, you
can always summon it
manually. So the skill
is in your
file system.
The agent will simply be able to
open the skill and
understand what is there. And
you can always
do this by
informing the
agent. This doesn't always
look like a
slash, depending on
the hardware, but you
can always
invoke your
skills as a user
. Another way
to challenge skills is through the
agent itself. These
are called
model-driven skills
, or
model-driven skills
. You can take the description
. So the skill description
always goes into the
agent's context, and
the agent can
look at it and
based on that description
decide, "Okay, I'm
going to invoke the skill, and as
a result, I'm reading the
skill.md file, where the
essence of
the skill is, in my
context window.
This is how you invoke a
skill. Here's what
happens when
a skill is invoked
. So, this description
serves as a kind of
context indicator
. It is in the
agent context,
pointing to another
file where the agent can
go if it
needs more
context for that
context pointer.
You don't need to
put it in
the context of an agent. It
may simply be
invisible to the agent.
And this is what we
call a
user-invoked skill. So
some skills can
only be called
by the user because
they don't have this
context pointer.
This is optional.
For example, in my
code design, we
see that this is a skill
called by a
model. It has a
description that
appears in the
agent context window. But
if we look at
my "ask
me" skill, we see that
it has the value "
disable model invocation"
. This means that this
short description here
will only be shown
to the user. It
will not be visible to the
agent. So, that's
tip number one.
Decide whether
your
skill is user-
or model-triggered. You
might think that
model-driven skills are
better, right?
Because either the model
can call it
itself, or the user
can call it. It's
more flexible. But
every time you
add a
model-driven skill
to
your agent's environment, it
increases what I'll
call the
context
load on
that agent, it
adds a new description
that costs you
tokens per
request, but it also
adds another thing for the
agent to
think about. So, if
you have 100
model-driven skills
, that would be 100 descriptions in
context for your
agent. Therefore, it seems to make
sense to either
reduce the number of
skills
called by the model
, or simply
use all
skills
called
by the user. But
user-invoked skills have a
different load,
which is that
the more
user-invoked skills, the
higher the cognitive
load on the
user. In other
words, the more
things the user
has to keep in
mind, the more
skills you require
from the pilot. And so,
if you compare
Matt Pott's skills to
superpowers,
superpowers are
primarily skills
triggered by a model
that gives the agent
superpowers. While
my skills I
much
prefer
full control. This
means I can
minimize the
contextual
load on the
agent, but it
puts
more cognitive
load on me. Therefore,
I need to
understand
the skills very deeply to get the
most out of them
. So why did I
do it? Why did I
prefer
user-invoked skills? Well,
any time you have a
skill
called by a model
, it essentially
introduces
unpredictability
because any time
you have a
context pointer pointing
from one resource to
another, the model can
simply decide not to
follow it.
You know, even if
he's absolutely
perfect for
the task, he might
just decide not to
trigger the skill. I
much
prefer
removing this level of
unpredictability
by imposing a little
more cognitive
load on the
user. And what you
get is that you
just deprive the
class of problems of even
problems, because that
unpredictability
forces people
to evaluate their
skills to
make sure they're
being called upon at the
right time, which, uh, is
very frustrating, and it's a
problem I'd rather
avoid. But I
hope to show
you here that
model-calling skills and
user-calling skills have
equal value.
Therefore, it is not easy
to decide which one to
choose. So, this is the
trigger for how
the skill is triggered
. Now let's
talk about
the structure, the internal
structure of the skill. I
think there are two
basic building blocks that
need to be included in
most skills. These
two blocks are steps and
links. Steps are a
step-by-step procedure
that a skill will go through. A
reference is any
supporting information
that helps you
complete these steps. You
can have skills
that have no steps and
are just links. And
you can have
skills that are not
links and are just a
set of simple
steps to
follow. But if
you start thinking of
skills as being
made up of these two
blocks, it really
helps to just
break them down a lot
more. If we
look at an example,
one of my skills
called two PRD
creates a
product requirements document from the
current
context window. It
has three steps. So
he finds the
appropriate context
. It confirms that the
test stitches
match
the user. So, there's kind of a
human there at the loop checkpoint to
make sure we're
not doing anything
weird with the
testing, which I
think is really important.
And then we write a
product requirements document to
handle these three steps
. We have two
pieces of
reference
material. We have a
little reference
on what a
test seam is. And then
we have a product
requirements document template
. That is, the
literal Markdown template
used to
write PRD. This is a
great way
to write a skill from
scratch. You determine
whether you need to take any
steps. Then you
write those steps and
determine what
reference material is
needed for those
steps and put
it in a separate
little place in
the skill that is
designated for
reference
material. However, there is a
very important
limitation that
we need to
think about, and that is tip
number three. We want to
make the main
skill.md file as
small as possible. Each skill
consists of its
description, then a
skill.md file, and then
any reference
material that
branches off from
it. And this skill.md file
, if we make it
smaller, we'll
store it in
a couple of different
ways. Smaller
skills are simply easier
to maintain, easier
to test, and have fewer
words to
think about. And every time
you lose a
word, it takes away a
token. This
getting rid of
a few tokens
costs your skills.
So I think
small skills are
really important
for both developers
and users.
One really
useful way
to reduce your skill is
to think about the different
branches of the skill, the
different ways
to use the skill
. Because if you have
reference material
that is
only used in one branch, then
it is a candidate for
removal from the
main skill.md.
For example, if we
look at my two
PRDs here, we have two
pieces of
reference
material. What is a
test seam and
PRD pattern? Well, we need a
PRD template every time
because we always
create PRDs. And we
probably also
need information
about what a
test seam is every time,
because we always
ask about
test seams. So, by
the way, there is only one
branch, and all the
reference material
belongs to that
branch. Therefore, it
probably also
belongs to the
skill.md file. However, if we
look at another
skill of mine, which is
domain modeling,
domain modeling
does two things.
It updates a
local glossary
called context.md and
then creates
architectural solution records
. In other words, it
does two different
things. Or it may not
perform any of
these actions, in which
case it does not need
a template, nor does it need an
ADR template. In other
words, domain modeling
has two or perhaps
three branches. This
means that we don't
need to include the
ADR template or the
context.md template in the main
skill. They can be
moved to separate
zones. This can be
done like this: you have a
skill.md file. Then you
place it behind the
context pointer, and the
context template points
to a separate markdown file
in the skills folder. This
context pointer
literally just
says that if you
need a template or
if you need to
update the context.md file,
go to that
file. And I call this an
external link.
This is a link that is
external
to skill.md that
you can
easily reference.
The agent can connect very easily
because it is
associated with a skill
. So, this is a technique
you can
use to
make skill.md as
small as possible, which has so
many benefits.
Hide
branching reference material behind
context
pointers. In other
words, if you
feel like your
skill will be
used in
many different
ways, then
take the reference
material that
pertains to those branches
and hide it behind
contextual
pointers. Here is the
structure. We
need to think
about making
skill.md super small.
We need to
think about branches in
our skill,
moving material
beyond contextual
pointers. And we
need to think
about steps and
links, which are the
two basic
units within a
skill. Next, let's
move on to
control, the actual
ways in which we
make an agent
do what we
want. And for me,
management comes down
to one really
cool technique, which
is the main thing
I want you to
get out of this
talk. This technique
solves this problem,
namely that the agent doesn't
do what I want. In
other words, I'm
clarifying something in the
skill. I think I
made myself clear, but
then it just doesn't
work. I believe the
main reason for
this is that
you are not
using
a technique
called
lead words.
The idea behind key words,
or lightworth if
you're into
literary theory,
is that there are
certain words that
pack a bunch of
meanings into a very
small space.
These key words are
really powerful for
agents because you
put the key
word in the skill itself
in the text, and then
the agent repeats it to
itself as part of
its operations, as
part of its
thinking tokens, and
as part of its
output to you. And
then, because he's
emphasizing
that word again, and that
word hopefully
describes what you
want from the agent,
then he changes his
behavior. Let's
make this more
concrete with an
example. Let's imagine that
we have a problem that is a
classic
agent problem, namely that
they encode layer by
layer. In other words
, if you give them a
large amount of work,
they will typically
write code for the
entire database layer
, then for all the
schemas, then for all the
API endpoints, and
then for the entire
frontend. They don't
do the typical
human thing, which is to
ask for feedback
early on,
tweak something
small to work, and
then expand
from there. Now we
can try to
encourage the agent to do
this by simply
saying, “Don’t write
code layer by layer.
Make sure you
create a
small slice first and
then move on."
But what if
we used a
leading word instead? We
said that "
vertical cut"
is our
watchword. We want
to divide the work into
vertical slices instead of horizontal slices. "
Vertical slice"
is a fairly well-known
terminology in
development. And
hopefully, this will get
agents up and running sooner, and
they will understand what
we mean. We
don't just need to
have a two-word
skill that simply
says "
vertical slice."
We put a lot of
meaning into a relatively
short phrase, which we
then repeat
throughout the
skill. The coolest thing about
this technique is that you
can tell if
it worked because
you say "vertical
slice" in your skill
, and then you notice in the
reasoning trail that
it says, "
Okay, we'll do this
as a thin
vertical slice."
Then you should
get better
implementation plans. Everyone
I explained this
technique to felt
something like, “Oh yeah
, I’ve been doing this for
a while. I
use these
short phrases to
try to encourage the
agent to do what I
want.” All I
ask of you now is to
use them
consistently within
your skills and
watch in the
reasoning trails as the
agent adopts your
way of doing it.
So often, if
an agent isn't doing what
you want, you
need to make
your lead words
more consistent,
more powerful, and
look for others; because,
you know, English
is a pretty
broad API in
terms of different functions
you can
call, different
things you
can
experiment with, and
there are a lot of
candidate
lead words, and
agents are actually
pretty good at
helping you
come up with them. Another
little lever
you can
use with
agents is that
sometimes the agent
just doesn't do
enough work. I
mean, we're,
let's say, at a step, and
maybe that step is to
ask clarifying
questions or
explore the code
base, but the agent
just isn't doing
that enough. He is
not putting
enough effort into
this particular
step. A classic
case of this, which
I have found almost
everywhere it exists,
is planning mode.
Because in
planning mode we have
two steps. We ask
clarifying questions
and then create a
plan. And what I've found
in every implementation of
planning mode
that I've tried is that
asking
clarifying questions
just, you know,
never does
enough work. He
sees that his
ultimate goal is
to create a plan. So
he just does a
little work of
asking
clarifying questions,
asks you a few
things, and then willingly
creates a plan. So what
was my decision?
Instead of
planning mode, I have a
skill called “
document grilling,” which is
kind of like my
clarifying questioning phase.
And then I separated it
into a separate skill.
So I separated
planning into a separate
skill. So, grilling with
documentation is now a
separate skill,
where the agent only sees
this part of the process. And
then, after the
documentation grilling is complete, we
move on to
executing two PRDs. In
other words, we
have step one and step
two, but the agent
only sees one step at a time.
So this is a really
cool technique for
increasing the amount of
work you're doing on the step
you're on
by hiding the
future goal,
hiding the
future steps. It's not
always necessary
to break down skills into
separate steps, but in
some cases
where you really
need an extra
amount of work, there
really isn't a
technique like that. This
works very, very
well. So it's
management,
using
leading words to
capture what you
want in small
reusable
tokens, and then
making sure it
does the right
amount of work per
step. So let's
now move on to
circumcision. Now,
pruning
is really just a quick
set of
failure modes, different things
you can
do wrong.
And the first is pretty
obvious: we don't
need massive
skills. Mass
skills are usually a
kind of symptom
that something else is going
wrong. So, a symptom of
one of these other
failure modes. And the
first one is quite
simple. Don't
repeat yourself. You
need to
make sure you keep an
eye on
duplication. And
in general, I
like
each part of a
skill to have a single
source of
authority.
In other words, if
you have a piece of
reference
material, like a
PRD pattern, or something even
smaller like a test
stitch, you make sure
you don't repeat
it in multiple places
or cover
multiple steps in
multiple places.
Just make sure
that each part has a
single source of
credibility, and you
don't repeat yourself
even in reference
material. The next
way skills
become great is through
sediment. And a sag is just a
classic thing where
people are working on the
same
set of documentation
, meaning everyone starts
contributing to a
shared markdown file.
People add their
own things. They don't
feel
brave enough
to delete and
change other people's. And as
a result, you just
get a huge
amount of sediment with
often irrelevant
material for
the skill, especially that
which has not been
properly formatted. If
a skill has a lot of
outdated elements
, you really need to
pay attention to the
structure. This is the first thing
you need to
do. You need to
make sure that the
added material is
relevant to all
branches. If not,
move it to the
correct branches. Or,
if it's completely
irrelevant,
maybe just
delete it or
end it. Or
maybe there's
material there that's
completely outdated,
in which case you
just need to
finish it. The
following
failure mode is very
common when an agent
writes your skills
that are not operations.
So, things inside a
skill that appear to
do something but
don't actually
affect the
agent's behavior in
the context of the skill.
Let's imagine we have an
implementation skill, and
we have a whole paragraph in
that skill that
instructs the agent
to write a long
detailed
commit message.
What happens if you
just delete this
paragraph? Well, the agent
will probably write a decent,
like a long
commit message anyway.
I often get asked
how I manage to
shorten my
skills so much, and it's all down to
these
techniques, the
deletion tests, um,
making sure I'm
squeezing things down to the
leading words, I don't have
anything
irrelevant, and
I don't have any
sediment. And this finally
brings us to the
full picture.
First, we
check the trigger.
We make sure it
works at the
right time. We
check whether
we are imposing a
contextual
load or a
cognitive load. With
structure, we
think about
branching. We
think about
structuring things
into steps and links
, and we make sure
that material that is
relevant to only
one branch
is
outside the core
skill. For
control, we think
about compressing the text
to key words and
watching
how these key words
appear in
reasoning traces. And we also
think about
footwork. Should we
break this
skill down even further to
increase its focus on the
current phase
while hiding the
future
phrase phase from it? And with
pruning, we do a
final
pruning pass across the entire
skill. Watch for
sediment, dirt, and
especially for
lack of operations
. Now, regarding all of
this, the best
way to get started
with this framework is to get into
the habit of writing
great skills. You
can check it
on the map. Do you have skills?
Download them,
use them to
improve your own
skills, and maybe
even use
them to work with
some community-developed skills to
see if
you're really getting good
skills. If you
want to follow
my work,
I have a mailing list at
aihero.dev. And my plans
for the next few
months are to release a
crash course in
AI coding
, which is an
introduction to a lot of
the things I've
talked about and how to get
started with
engineering and
AI.
I hope what
I've given you is
enough to
help you
avoid
skill hell or at least
try to navigate the
bitter path out of there.
I'm so sorry I
can't be there in
person,
but thank you for watching
. See you later.
