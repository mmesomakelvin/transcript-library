---
video_id: "JQ_We_ztxrI"
title: "I was building loops wrong..."
channel: "AI Jason"
topic: "software-engineering"
published_date: "2026-07-13"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=JQ_We_ztxrI"
duration: 846
word_count: 2938
---
It was midnight today,
and
numerous
merge requests (PRs) continued to arrive in our codebase. And
it's not because we
worked too
hard, but because
our agent
wakes up every 30
minutes, scans the code for
bugs and
improvements, checks
server logs, and
creates PRs. And each PR
agent-verifier
fully tests and
adds evidence for
our review. For
some minor
fixes, it can
even merge them right away
. The CRM
lifecycle agent also
scans our
use cases,
finding segments
for contact and
interaction. All support requests
are processed
automatically,
regardless of the
language
the user speaks. This is not
just a demonstration.
All of these cycles have been driving
our company
over the past few
months. Today I'll
show you exactly what
we learned while
creating these cycles:
what worked and what didn't
. Hopefully, by the end of
this video, you'll
understand cycles better
than most people in
your feed.
Last week I
wrote about “
cycle engineering”: moving from
prompting an agent to
perform tasks to
designing a system
where the agent decides
what to work on,
executes, verifies, and
improves.
Many of you
said, "Okay, I
agree, but how do you
build a
cycle that actually
works?" Because,
honestly, anyone can
put together a loop
using Cloud Code
or Codex and call it a
finished product.
But that's only a light 5%.
The real work
is how to
design
safeguards that
allow you to
step away from the process. A
cycle that can
consistently perform
the job safely and
improve over
time. Therefore, every
cycle that we build
internally has exactly
this structure.
Typically, we have one
Markdown file containing
what we call the “
loop contract” as well
as the state and log of
that loop. This
serves as a "living"
documentation of the
cycle itself. Next comes the
trigger level, which
wakes up the agent to
work; There are several
types of triggers, which
I will explain in
more detail. Then the
actual agent who
finds the work,
performs it, proves
the correctness of
the execution, and updates
the documentation. So that the
next round
starts smarter.
The first part—the
cycle contract—is the
basis of the MD file. It's
like the constitution of a
cycle, where the
most important are the three
things written
inside, and the first of
them is the goal. So what does
victory look like, is
there even a finish
line, and also boundaries:
you want to clearly
define what the agent
can do
on its own and what it should
delegate to a human. And
the third is SOP. If
you have a specific
workflow or
principle that an agent
should follow every time,
and then there are status and
logs. This is what
allows the agent
to remember what it
did before and what
conclusions it reached;
usually it is divided
into two parts. One of
them is the state. So, the state is like a
long-term
snapshot. What is the
agent's current hypothesis? What
are the uncompleted
tasks? What the agent
has already released, but
needs
further development; This
part should
be kept small,
unlike a journal,
which is a record just
for adding everything
that happened during
each cycle. Without
this log, the
loop would simply
reopen
the same noise every morning,
wasting tokens on
keeping track of what had
already been attempted.
For most
small loops,
you can simply
combine the
loop contract, state, and log into a
single file. Let's
look at one
example. This is a loop
we run in our
codebase
called react doctor checks.
It uses an
open source command line tool
called react doctor that you
can run on
your frontend
codebase and it will
automatically detect
critical issues and
provide a score. So
this loop runs a daily
react doctor scan of our code
and selects one of the
most critical
issues to
automatically
fix. So, in
the contract for this
cycle, we have a
"goal" section that describes
the purpose of the cycle,
and a boundaries section
that specifies how it
should create a
subagent for
remediation in an
isolated
environment, how to
go through the
review process, and
which changes can be
merged
independently and which
require
human review. Below
are SOPs for the
general workflow to
follow, as well
as a status section
that mentions the
current understanding of
this cycle. Which
tickets and PRs are already
open or completed,
what needs
to be improved, as well
as a journal where
everything that happened is recorded after each round
. So,
every day the agent
will wake up with
this documentation
as a cue to get
started. We
actually created an
internal
tool—a
dashboard—
to track which
PRs were opened or
merged and how the
React project's health score was improving over time
. This
cycle contract documentation is
not only applicable to
engineering tasks. As
I mentioned, we
also have a
CRM lifecycle where
every day I task an
agent to track
all daily
active
users,
grouping them into different
segments: for example,
small influencers
we should
approach for
partnerships;
users who are clearly
disappointed,
based on our
logs; as well as
users who are
quite engaged but have
not yet upgraded to the
paid version. And for
each segment,
depending on
priorities and
risk level, the agent can
either automatically
send
a message or
prepare a draft
for my approval.
This daily CRM
process has a very similar
structure: we have
documentation
describing the goal and
standard
operating procedures
for this cycle. Next
we have a list of
restrictions. What points
and pitfalls
should an agent
consider during
research, and which
messages
can the agent send
independently and which
require approval
? Then there is a status section
, which lists
current understanding,
hypotheses, and timeline
. Since we've
been running this cycle for
almost a few
months now, this
documentation
is constantly updated
after each
run. Our
structure
is mainly based
on the loop folder:
each loop
contains one
readme file, and sometimes there
may be other
artifacts that are also
stored in the folder
and referenced
in the file. So those are the
first two parts: the
loop contract and the
state log, and the
next part is the
trigger. Each loop
has a specific type of
trigger, but depending
on the type of loop you
can define the
trigger differently, and that's
partly why running
loops can
seem a bit
confusing because of the
different types of triggers.
We all know that Codeex
and Cloud Code have a
“go” command, where you can
define a condition and
give a “go” command,
after which the loop
continues to
execute until
the task is
completed. And this is the
first type of trigger;
it's like a continuous
"for" loop. You can
imagine that behind
the scenes it is just a
“while” loop: until the goal
is reached, or you
can define a
maximum
number of
replica exchanges or a
token budget, and until these
limits are reached,
it will continue
its work:
load
the contract,
execute the
next step, until
the goal is
reached. And this, as I
mentioned earlier, is
essentially a target
team. It is
especially useful in
situations where
immediate
feedback can be obtained,
such as fixing
bugs or developing
complex
software with a well-
defined
specification.
Meanwhile, the second type of
trigger is
task types. This is similar to
Codex automation,
Cloud Code loop, or
scheduled command.
Essentially, it simply
launches and "wakes up"
the agent at certain
intervals, and the only
difference between a loop and a
schedule is that
one runs in the cloud, while the
other runs in the same
session. These two types of
triggers already
cover a lot of
scenarios, but I
often find it
useful to also have an
event-based loop,
i.e. a reaction to
certain events:
for example, when a
new
email arrives, you
can wake up
an agent to
process it, or if an incident
occurs on the server
, you want to
wake up an agent to
fix it immediately. Such
event-based triggers are
especially useful for
tasks that
require an immediate
response. However, neither Cloud
Code nor Codex
support these
trigger types natively. So
you need to
set up a
local background
process (daemon). It
provides a URL to
which any webhook
can send
notifications.
For example, you can
create a webhook on
Render and specify your
local
daemon URL to receive
certain crash events
. The fourth, and probably
the most useful type of
trigger I've
found, is what I
call a combined
or workflow trigger.
We can have
triggers that
run continuously, but instead of
immediately starting the
agent, we first
run a
data fetch script
to programmatically
check for new
work. For example,
for our
inbound
support message sorting loop, we
define the JavaScript here.
You can get the
latest
updates from Intercom for the last
30 minutes. If there are
real updates,
run the agent
to process them. If
not—just
skip this
launch. We found
this approach to be particularly
effective because it
allows us to run
the loop much more
economically in terms of
costs and tokens by
grouping the
workload for the agent and
“waking” it only
when there is real
work to do. The first two
trigger types
are supported out of
the box in Cloud Code and
Codex. But for the
other two trigger types,
you will have to
set up your own
local scripts and
daemon service. We
have an internal
tool that we
built to run
these types of triggers,
which we just made
public, and you
can run
it locally. It
communicates
directly with the
local agent,
but your team
will have a
centralized place
to manage all
cycles, contracts,
states, logs, and
triggers. I'll talk
about this project a little
later, but regarding
the third part of the
trigger: I believe that
choosing the right
trigger for the
specific type of
loop you're
running will significantly
reduce costs. The
third element is the
actual agent that
wakes up and
performs the task.
Typically, an agent
goes through three stages:
first it collects
signals, finds and
prioritizes work;
then begins
execution; and if it's a
complex,
responsible
task like
engineering, you
usually add a
verifier for
quality control
before considering
the work complete.
For simpler
tasks, you can
have just one agent
that performs all three
functions. But for
more complex types of
tasks, you usually
want to split them
into three different roles.
The most common
structure is an
orchestrator agent that
receives a request,
conducts
research, and
schedules the task.
Then, the executive agents
each work on a separate
branch of tasks. So
tasks can be
executed
in parallel, and each
executor must
pass the result to
the verifier, who
checks it and
adds evidence to the PR. This makes it
much easier for a person
to review tasks,
and all updates
are sent back to the
lifecycle contract documentation. This is a
key element of
each of our cycles,
and I've already
talked a lot about
verifiers,
especially for
engineering tasks.
This is a must
for any loop
that performs
responsible work
, such as making changes to
real code or
communicating to
real customers.
Essentially, you want to
make sure the
process is simple and
creates evidence that a
person can easily
verify. In general,
this means that the agent
needs to be provided with an
environment in which
he can effectively
test his
work. If you
follow my
content, you know
that I have already written several
articles on how
to use
tools
like Playwright CLI to allow an
agent to test
and record video
or images as
evidence, as well as
using CrabBox
to create a
remote
sandbox
for testing. So
you won't be limited to
the number of
development servers you can
run in parallel
on your local
machine. I have combined this
link into a toolkit
called "Verifier Setup". You
can simply provide
it to Cloud Code or Codeium in
your codebase
to set up
proper
verification systems. I've
left a link in the
description below to this
GitHub repository with
all the tools
we're talking about here
. You can
use it
for free. So, this is the
general system and
structure of what a
successful cycle looks like
in our case, and
at the same time, another very
useful level that
we found is the cycle of
evolution. The concept
is that
most cycles
when you are just
starting out may
not be ideal.
There could be a lot of
room for
improvement, such as
how to design the
trigger to be
more cost-
effective. How
to turn some of the
repetitive
standard procedures
into scripts that an
agent can run, and
many of these
improvements can be
optimized by the
large language model itself.
If you provide
the agent with all the existing
configurations, the status of
past runs and
logs, and the
conversation history for
more detailed analysis
, then all we need to do
is run an evolution session after
every five or
ten cycles
, where the agent
will be provided with the current
configuration and
log history to
prioritize changes;
These changes may
concern the
cycle contract itself,
legacy states,
or the creation of
scripts to
automate
repetitive actions. Here is
, in fact, a perfect
example. It was during the
evolution session that he
began setting up a
software trigger
to wake Adrian
only when
necessary. So, this is the
general system and
structure of what a
successful cycle looks like
for us, and we can
go through
some examples together to
set it up. And
one very good
option to start with
is the documentation maintenance cycle
. I know
most of you
have documentation or
some kind of cloud base.
MBN codebase documentation file to
help the agent
get full
context. But this
context can often
become outdated. You
can solve this by
setting up a simple
loop where every day you
wake up the agent to
check what
has been released in the
last 24 hours, what
are the discrepancies, and
compare those changes to the
readme file,
setup guide,
examples, and
instructions. For
each
discrepancy, he
can check what is
true, and if
nothing has changed,
end the session; but
if there are changes, he can
do a quick
fix to
update the documentation
and open a PR for it
. This loop is very small
, but quite useful,
and our loop contract
looks like this: it
clearly lists the purpose
and boundaries of what the agent
can issue
on its own, and what it is
allowed to do. You will
notice one
rule here: “Never
rewrite the exact
documentation for an
activity view”,
because the typical
agent behavior
we have observed is
that it
tends to do things
even when it is
not required, so
such rules are quite
useful for
getting
results, SOPs,
states and logs.
So you can simply
provide this markdown file to
your Cloud Code or Codeex
and ask them
to set up a loop
based on it. But as I
mentioned earlier,
we have created an
internal
tool that
we use to
coordinate and
customize the cycles
for us. It allows you
to define the programmatic
triggers we
mentioned, as well as
configure
the context based on the
best practices we have learned,
while all past
execution logs are
also retained.
So the agent can
remember everything on
its own, and it has a
built-in
automatic
loop development function. You
see that after
every few sessions, a
blue
dot appears, and that blue
dot is a separate
evolution trigger. It
analyzes past
launches and determines
what improvements can be
made. As in
this particular
case of evolution, it
polished
the specifications and SOPs,
cleaned up some
outdated states,
and updated the dashboard
for
more convenient
performance tracking, which
turned out to be quite
useful since
often you don't quite
know the outcome of a
cycle's work. But with
this tool, we can
easily track
open issues that
need our
attention and see how
performance
changes over time;
if needed, I can
just click a
button that will copy the
entire context of this
loop to my
local computer.
So I can
communicate with the
agent to develop the
cycle, and we've already added
a few templates here,
one of which is
documentation support. So, I
can just
copy this query,
go to my
repository, and
paste it. It
automatically contains a
list of instructions
on how
this cycle should be built,
along with the best
practices we have
laid out here.
It will then automatically
create a loop folder
in your codebase,
as well as this
documentation review loop. This is a loop
that
discusses the scope
of what to
review: readme, claw.md
, everything in the docs folder,
schematics file, scripts, and
then it will go
through the SOP, current
understanding, and
chart points. And finally,
we have this loop
created on Loopnney
that will automatically
run the agent
on a schedule and
keep a log of all
released updates,
artifacts, and all
runs. And there are a
few other
patterns that we
use, and you
can just
copy and
paste them like this:
react doctor loop, all the loops
that periodically
clean up technical
debt. It's completely
open source
software,
free to
use, so
feel free to head over
to GitHub and start
using it. I've
added a
GitHub link in the description below so
you can give it a try.
