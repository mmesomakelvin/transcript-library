---
video_id: "M6mYodf0dJM"
title: "mattpocock/skills: A complete AI Coding workflow, end-to-end"
channel: "Matt Pocock"
topic: "ai-llms"
published_date: "2026-07-16"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=M6mYodf0dJM"
duration: 1037
word_count: 3355
---
Hi friends, it occurred to me
that I have
never made a
full
tutorial for my
skill repository.
At the time of
this video recording,
the repository had
162,000 stars. We have 7.5
million
downloads, and I still have
n't created a tutorial for it
. I'm
constantly asked
questions: in what
sequence should
I use these
skills, how do I
install them, how do
I configure them? So this
video will be an overview of the
basic
workflow when
using these
skills. We will not
consider complex
or new features, but
will focus only on the
main flow. On what is
needed to get
started. To
demonstrate this, I will
use one
of my working
repositories—AI Hero CLI.
This is the
command line interface
that powers
many of the
exercises in my courses. I've
never
set up these
skills for this
repository before, so
now is the time. If
you want to
set up my
skills for a new
project, do the same thing
, but in an empty
directory. This works
equally well for an
existing code base
or a project from
scratch. I open a
command prompt and
type npx skills@latest add
mattpocock/skills. This
involves several
things.
It is assumed that
you have Node.js installed. The
npx command comes from
Node.js and runs the
skills.sh installer from
Vercel. Essentially, this
installs a GitHub
repository
called mattpocock/skills and
allows you to answer a
few questions
during setup.
First, the system
informs you that
the following packages need to be installed. Yes,
it looks
normal, after
a few actions were taken
, we now have a
long list of
skills to
install.
38 skills were found,
which is a lot, and if you
scroll up and down,
you can see that
they are divided into two
groups. We have mattpocock/
skills, as well as other
skills. The skills from
mattpocock/skills are those that
I have approved and consider to be of
sufficient quality
for public
use. The others
are ones I'm currently
experimenting with and
may remove in the
future. I
recommend that you
go to the top of
the list and
scroll up or
down. I have to admit, it
works a little crookedly
. And if you press the
spacebar, as you
can see if you
scroll up,
they're all now selected
. You press
the spacebar, then the
Enter key, and now you
have selected all the official
skills. I don't really
like Vercel's CLI
, so I may
change that in
the future or
even create my
own. But for now,
this is the best there is. The
good thing is that this will
set up your
skills to work with
any agent. I
use Claude Code,
but you can
scroll down and
just choose the ones
you need. I
use the spacebar
to select. It seems that
by default,
if you zoom out a bit,
it supports all of these
universal
options above. That is,
Cursor, Codex, Claude, etc. But
anything that uses
Claude-type skills,
such as Claude Code,
needs to be
configured
independently. So, I
press Enter, and now
everything should be
set up for
my
Claude Code skills to work. The
installation scope determines
where
your skills are installed: whether only
in the current
directory or
globally. This
will depend on
what rules are adopted
in your team. If
you work in a team
, I would say that
project skills are the
best choice.
This way, everyone
uses
the same set of
skills on every
project, and you can
develop those
skills together and make
shared decisions. But the
global option is
suitable if you
work alone, like
me. So I press Enter,
install to my home
directory, and choose
symlink as the
recommended
method. The choice here is
whether
to copy this to the
agents folder or to the
.Claude folder. And that's actually
not the best way. A
symlink is just a
convenient and easy
way to do this.
So I wouldn't even
hesitate, just
choose the symlink.
The program now provides a
summary of all the things
you install. There
seems to be a
notice about Socket in
the specification. I'll
look into this later
. But yes, we can
continue with
the installation and now
all the skills are
installed. This
means I can
launch Claude here or
any other
agent and I'll just
say "hello" to
exit
agent view mode.
Depending on the
tool you're
using, this
may look
different, but in Claude Code
I can press the slash
and see that I have
several
skills available to me. I have grill me
, grilling, way finder, grill with
documentation, etc. A
bunch of everything. So,
the difference between my
skills and many
other
skills repositories is that
my skills are
mostly
user-invoked. This
means that if I
run the context here,
not many of my
skills actually
make it into the description. And
the descriptions I have are
quite short and
precise. So that means
that even though we've
loaded all my
skills, they only take up
660 tokens. So
it's very, very easy in
terms of
context load. So, okay,
we got the skills.
Now we need to
run the
Mac Pocock skills setup. And this will do
a few things. My
skills rely
on a specific
configuration
inside
the repository, and it
does a few things for you
. First thing—this
means you
need to
use a bug
tracker. We'll
keep
specs, we
'll keep
tickets, and we
need to store them somewhere
. You have
seemingly endless
choices here. You can
use GitHub,
local markdown, or
anything else. The way
Skill works is that it
looks at your
local
configuration. So you
can configure
it for Jira, you can
configure it for
Linear. And the way to do
that is to simply tell
the agent what you
want
to configure it for, and it will
do it. I just
want to
emphasize this. People
ask me all the time,
"How do I get
skills to work with Jira,
with Beads, with Linear?" They are already
working. All you
need to do is
launch
Mac Pocock's setup and
just say, "
Set this up with Jira."
Although I don't want to
configure this with Jira
. I'll just set this up
with local markdown,
please. So I'm
quite happy with that. The
next question to
answer here
concerns
triage labels. There is a set of
tags that the
skill relies on
to convey
information about the
tickets it
creates. It's not that
important here, so I'll
just accept the
default values
. You
can check out
the documentation for the triage skill
if
you want to learn
more. So, the
default settings
are
fine. The following
applies to
domain documentation.
My skills like to
have a little
documentation, a
context.md file, and an ADR inside the
repository. And this is
essentially a question of whether
it will be one context
or multiple
contexts. I think
one context is what
we need.
Multi-context is
when you have a large
monorepository and
you need many
different limited
contexts within it.
But for 99% of people,
one context
will be
enough. Okay, so
it's already written
a few things here.
The first thing it
wrote—inside
claw.md, it added
a few links. So
, these are new elements.
It simply
links to the
task tracker documentation, triage labels,
and
domain documentation. And each of them
is located along the
path docs, agents, domain,
issue tracker. So we
see that it is
going to keep
all the tasks and
specifications in
draft. So, with that,
our setup
for this
repository
is complete. You're probably
wondering where to
start? Well, before we
start, I'll show you
something else very interesting.
If you're watching
with me, you can
just pause
the video now and
use one
skill. You can
use the "
Ask Matt" skill. This
"ask Matt
" skill is essentially me in
the form of a skill. He
knows everything you need to know
about the
skill repository and where you
should start. So we
can say, "
Ask Matt how do
I get started?" I want to
make some changes to the
code here. What
basic
workflow should I
use?
Now I can
send this and
see what it
responds with. By the way, I
use Whisper for
transcription. So, that's it
. It says
that the main
workflow is from idea to
implementation. Since
you have the codebase,
start at the top of the
main thread and
walk through it in
one coherent
context window. So
it gives you pretty good
tips on how
to use your
sessions as well. I believe that
conscious use of the
context window and
tokens is
critical to
effective
use of AI. It
says you should
start with grill with docs.
It polls you to
refine the idea, and
since you're in
the repository, it
keeps the state. It
records what it
learns in context.md
and ADR. This is where you
turn “I want to
change X” into a clear and
reasoned plan. "
Reasonable" is
such a typical LLM
word, to be honest.
Can you resolve
all open issues
just by talking?
If the question
requires an answer in
code, you
can use
the prototype, which I already
made a video about.
Go to it and
back via handoff, if
not—skip it.
Once you
have conducted the interview and
document survey, you
can
move straight to
implementing the skill
or, if it takes
several sessions to
work through, move on
to specifications and
tickets. Let
me explain this
a little more clearly. The
standard
workflow looks like this.
You start with a
survey with
documents, and it
interviews you
based on the idea you
want to implement.
For example, if I
clear the
query history, of course I could
ask
more questions
here, use
this as a guide, but
let me show
you. I'll choose "
document survey" and
start with one
idea. I will say that I want to
remove most of the
internal
tools in this
CLI to leave only the
public functions. There is
a lot of unnecessary stuff here. I
want to simplify
this repository a bit. It
really can be
that general.
You don't need to
do much
here. The "
Document Survey" will do the
hard work
by asking you a series of
additional questions.
It explores a bunch of
code here. By the way, I'm
using Claude Code,
Opus 4.8 version at
medium
effort level, but you
don't have to
use the
same configuration at all. These
skills
are used by
many different people,
different environments,
different models, and levels of
effort. And we see
that it has already asked the
first question. So
, it got a clear
map of the entire
repository. It
explores the internal
namespace with 11
subcommands. Here's what a
survey session looks like. You
go through all
the questions until you, or
you and the agent,
feel you have reached a
common understanding.
I'll do it now and
then get back to
you when I'm done.
Okay, that didn't take
long. We're
done with, well,
six questions? That's
not a lot for a
survey session.
I usually
get about 20
questions, depending on
the size, but we
came up with a pretty good
plan. We are going to
remove 10
command files, three tests, and
reconfigure
shared modules. And all
I did was just
answer
questions until
the system said, "
Okay, we've gone
through the whole tree." "We
have reached a common
understanding." "
Let me
lay out the plan."
Note, I didn't
use
planning mode for this.
I was in auto mode in
Claude Code, which is kind of the
default mode. And
now you have a choice of
further actions. If
you think this
work will be quite
large and
will require
multiple agent sessions,
you can skip
steps two and three and
go straight to
implementation. You can
do this by simply
writing:
slash, implement this. And in
this case, I
believe that is exactly what
we should do.
I still have, well, I think
my context
window is ending
or losing significantly in
quality at around the
140k mark. I
see this as a
kind of LLM “smart
zone”. If you
go beyond 140
thousand, you face
some deterioration in
attention. The model begins to
go crazy, exhibiting
strange hallucinations.
So I'm counting on
us having a budget of
100k tokens to
remove 10 teams. This
seems very easy.
That's exactly what we,
you know,
can definitely do. So,
normally I would do this
. I would just say
"implement", leave
everything as is, let the
system run, and
it would finish the
job. However, to
show you everything, I'll
pretend that this
work will take
more than one session,
that I may have
run out of
context or
"smart zone" in the
current window, and
I need to
spread this out across
multiple context
windows. So instead
I'll call "to spec
". So instead of
writing "implement this",
I'll write "to spec". And that's it
. This will do
the following: it will take
our entire discussion, all
46.1 thousand tokens, and
compress it into a document
that we can
use later.
This is where our task tracker comes into play
. In
this tracker, we
will
only use
local files in
markdown format, so it will
simply output
the specification to a
local folder. This
specification will be the
endpoint
we will work towards
throughout this
multi-stage
sprint. In other
words, this is what we will
get as a
result. This is a description of everything that
will look like in the end.
And tickets are a description
of how we
will get there. Okay, we
see that the file has been
created and
published in the
task tracker. If
I open it, we'll
see that he's here.
So, it's very beautiful
and detailed. There's a
description of the problem, a
solution, a bunch of
user
stories,
implementation decisions,
testing decisions—a lot of
things. And this will be very
useful because
at the end we will
be able to compare this
to make sure that
our implementation
meets
the specification. So,
now that we have
the specification, I'll
stay in the same
session, not
change it, and now I'll
say "to the tickets." And this is where
the system
will try to turn
the specification into an
implementation plan. Each of
these tickets should
correspond to the size of
one context
window or one "
smart zone". And
if we look
here, we see that
we were given three tickets
. So, three fragments.
I think these three
fragments are a bit
too much. Actually,
I think it can be
done in one go.
Do it in one
piece. And
now it's saved to a
file. That is, the ticket
was added to the
tickets.md file. This is a pretty
bad example
because it partially
copies what is already in
our
product requirements documents.
So let me
show you a
real example.
Here is a spec
I implemented a few
days ago to
remove a bunch of everything
from a repository.
I've
been really into
deletion lately. And you
see that this is a
specification, and under it there are
11 subtasks.
So, 11 tickets under
it. And each of these
tickets is a very
detailed
specification, each
ticket corresponds to
one session of the
context window.
So if we
click here,
we'll see that it's
quite short.
Most of the
acceptance criteria are already in the
core
specification, so
this ticket is literally
about what exactly you
are creating in this
session. So, this is session
number one, then
session two, then
session three. You see
how this breaks down a
huge amount of
work into manageable
pieces that an agent
can complete. However,
here we are left with
only one controllable
part. So I'm
going to clear up the
context here. Now
we have everything we need
so we can simply
run a few
agents to
solve this
problem. So, I can
clear the context,
then just say "
to tickets" here, and
before that I'll add "
implement this." Now that
we have a
specification
defining our
direction and tickets
defining the path, the
agent has everything it
needs and we are
ready to implement.
Now, when you do
it manually, the idea is to
implement each
ticket one by one.
So, you don't say
to execute every
single ticket, you
say "okay, we're
going to implement"
and then we see if
we hit the
target zone. If not,
we may be able to
add another ticket,
but I usually advise
clearing the context between
each individual
ticket. Then, when
you have completed all the
implementation and have a
fully
implemented product
, you can move on to
code review and
final verification
against the specification. Here
we see that it
was actually a very
small amount of
work. It's only 42.7 KB,
and now, as part of the
implementation process
, we're going to
run a code review.
Within the
deployment script, it
runs all
type checks,
builds, performs even
more verifications,
checks
AI Hero's internal help, shows
only commit edits,
and has already
loaded the
code review skill. This
review is based on
two directions.
First, it compares the
work performed with the
original
specification. This is
very useful when you
have completed a huge
amount of work and the agent
might have forgotten something in the
tickets or the
tickets themselves might not be
clear enough.
Making the final
pass means
you've really
considered everything. And then
it also checks
against the standards
documented in
your own
repository.
We
don't have
documented
coding standards in this repository
, but if it doesn't
find them, it
uses
classic ones, such as those
from Martin Fowler.
So he looks for “
code smells” and
tries to detect
any flaws.
Having sub-
agents do this is very
important because if
you do it in the
main agent, it has
already written this code, and
agents often do not do a good job
of
editing or
improving code they have
just written.
Because they
wrote it, they just
think, "Oh, that's
fantastic." "That's
good." Whereas if
you run individual
agents, they will
have a clean
context window and will
handle
code review much better. Okay, we see
that both
results
are returned. So,
all the
acceptance criteria are cross-checked with
the specification, everything
is checked for
compliance with
the standards, and that's
cool. We are ready to
work. And now it's
committed to the
current branch.
Perfectly. So, our
process is complete. We
agreed on everything before we
started. We created
a specification and
tickets to
make sure everything
worked over
several sessions. We
then implemented this,
and the implementation skill itself
used
code review. This is the basic
workflow that
all
my work is done by. And what's not
included in the main
flow are the things
I
experiment with, which I
improve,
constantly trying
to make this cycle
faster, better, and
more convenient to
execute. And if you're
interested in this, you
should subscribe to
my newsletter about these
skills. This YouTube
channel is a great place
to subscribe and
learn more about
the skills, but the
real
fun is in the
newsletter. If you
want to get
fresh updates when
I release new
skills or add something
worth knowing about, then
this is exactly what you
need. But
thank you very much for watching
. I hope this
guide has given you
an idea of ​​how
to set up skills
and what the
basic
workflow should be. Thank you for
watching, good luck with your
studies, and
see you soon.
