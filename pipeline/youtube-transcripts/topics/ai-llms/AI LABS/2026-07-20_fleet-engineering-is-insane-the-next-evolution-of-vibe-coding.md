---
video_id: "qxjII6x2yPY"
title: "Fleet Engineering Is Insane... The Next Evolution Of Vibe Coding"
channel: "AI LABS"
topic: "ai-llms"
published_date: "2026-07-20"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=qxjII6x2yPY"
duration: 774
word_count: 2828
---
We never
run Claude's code in
just one session, and
our entire team
works that way. While
one session is busy,
we review what the
other just passed and pass it on to the
next one to
work on. So no one is
really waiting for
any agent. That's the
whole point,
because your time
remains fully
utilized while
one session is running and
you're dealing with
another. But as soon as you
run them
in parallel, you
run into
problems, and at
first glance, everything
looks wrong
. Each session
seems busy and the
output reads
fine, but
deep down they are
interfering with each
other and you don't
notice it until
something breaks. And
even when they don't
step on
each other, you still
reach a point where
you have so
many sessions running that you
lose track
of what
each one does or what
it's even for
. So, as
always, we had to
find ways to
manage it. And some
of them are already built-in, while
others are external
tools that
work incredibly
well. If you don't
know us, we are a software development company
. and this is
our AI Labs channel, where we'll
show you how to
optimize your
processes with
AI, just like we
optimized
ours. So in this
video, we'll go over
everything we
use to
keep
multiple sessions running in parallel without
letting them fall apart.
If you are working with
multiple sessions with
fixed code
at the same time, there are a number of
issues that you
usually encounter.
You don't know which
session you're in
or what
each one actually does.
It's hard to keep track of
all of them and the
results
they give you. Sometimes
you need to
return to a
specific session that
had important
context and you don't
remember where you
saved it. And if you
start too many
sessions, you can
easily forget what this one
was for in the first place.
But that's just
tracking them. The
real problems
start when
they all work at
the same time. Because
if you
use
multiple sessions, you already
know that they don't
share active
context with each
other, since each one
has its own
memory. So, if
all your context and
settings
are in the
global
claude.md file, essentially the
main
instruction file that claude
reads to understand
your project, or
any other file
that one session
constantly updates,
other sessions will not
know about the
context change. They
will not update data
from global files on their
own. So they
will just continue to
work with
outdated
information. Each
session
only reads global files
at the beginning or
later if you
manually ask it to
. And if they
need to edit
the same files, they will
also overwrite
each other's changes.
Now, Claude's code is
no longer
just for
coding. So you
can
use
multiple sessions for
things other than
coding as well. But it is
in
coding tasks that the complexity of the
problems really
starts to
pile up. That's why
we divided this video
into two parts.
First, we'll
look at how to
overcome the main
challenges you
face when
using
cloud code in general.
And then we'll
focus on the
problems you
encounter in your
coding tasks
and how you
can fix them.
And the solutions we
cover in the
general section
will also help you
with your
coding tasks. So,
let's start with the basics. You
probably already know
some of them, but they are the
basis for everything
else, and right after that
we will move on to more
complex things.
If a session
closes for
some unexpected
reason, you
don't actually
lose it. You can
resume your last
session by running the
clawed command with the
continue flag, and
it will continue the
last session that
was running on
your device. And
if you need a
specific session, not
just the last one, you
run the
clawed command with the resume flag,
which allows you
to resume it from the
list. Or you can
add the session name
right after it
to immediately
return to that
specific session with
all its context. When
you return to
the session, you may
not even remember
what it was doing. So to
catch up, you
simply run the
recap command in your
terminal and it will
give you a quick
overview of what
this session was working on. And
if you want to
move from one
session to a new one, but
transfer everything, you
use the
export command. This
essentially converts
your entire chat into a text
or Markdown file that you
can then
drag into a new
session to
pick up where the
old one left off. These are
all really simple
commands, but in
everyday
use they have a
significant impact
on both your
performance and
what the model
returns. Take,
for example, the animation in
our videos. It is
created using an
internal
animation system and
sophisticated code.
So when we
go back to
change the animation, we
restore the session in
which we created it,
or continue it
if it closed.
And if it's
been hanging around for so long that we
can't remember what
that session was about, Recap catches up with
us again.
But let's say you have
multiple sessions
working on the same
shared file.
Now you don't want
them to
conflict or
overwrite
each other's changes. So you
decide who
owns the file
right at the beginning. You
give one
session
ownership of a file, and
only that session can
modify it. Others
can read it and
use it as a
reference, but they
cannot write
data to it. And you
configure this by
simply telling
each session directly
in its request not to
write to these files
. Now, let's say
you're building something from
scratch that has
independent parts,
something that can be
built
in parallel to
make it faster. In
this case, the
workflow
our team follows is to
first
create a plan
using
Claude
Codes' planning mode. During
scheduling, you
provide the agent with all
the information you have
about the task and
ask it to break
it down into independent
tasks that each
session can
execute
in parallel to
achieve the same
end goal. This
planning and
partitioning stage is really
important because it
gives you a near-
perfect
configuration for
your sessions to work
without fighting over files
or overwriting
each other's changes. This also
ensures that each
session has the same
shared context
needed to
complete the task.
Once you've completed
the planning, you
hand off each
independent task to a
separate session so
they can all
work together to
complete the entire
project. And for this we
use
the skill of
transference. Now
you remember the
export command from the
previous step.
Transmission
is essentially a smarter
version of this. Export
simply dumps
your entire chat into a file. So, the
new session
inherits all this
messy
slow-motion
context. Handoff
actually compresses everything
into a clean
handoff document that points to
your existing files,
instead of
copying them. So a
new session
begins with a
clean and
focused state.
This document contains
all the necessary
information, as well as
links to files
related to this
context, and even
includes a list of
skills that the agent
must establish
to properly
perform the task.
You set
the skill with
this command and then
invoke it in
your session with the
handoff keyword. So,
after
planning is complete, you simply
ask your
planning session to create
handoff documents
for each task
with the handoff skill, and it
generates one
handoff document
for each task,
each pointing
to the plan file it created
. Now, to
actually hand
each task off to a
separate Claude session,
you use the
Claude agent toolbar. The
toolbar is
essentially an interactive
interface right
inside your
terminal where you
can see all the
sessions currently
running in the
background. You can
navigate between
them or open
any one to
see what it's
working on. You
open it with the
agents claude command and you will see a
list of sessions that are
either completed or
still running. You
can also type a
query and it
will launch a claude code-behind session for it
. So you
direct it to
each
transfer document individually, and
it starts
working towards
your
end goal in
parallel in different
sessions.
You can monitor all of this from the
dashboard.
You can also
run background
sessions another
way, by running the
claude command with the
background flag,
followed by your query. And
if you're already
in a session
and want it to
continue
running in the
background, you just
use the
bg command, which is
short for
background, and it
continues running
in the background,
leaving your
terminal free. In
any case,
you can see all
your background sessions and
their execution in the
dashboard.
Using this
workflow, you
can break down almost
any task into
smaller parts and
manage them from the
clawed agent dashboard. So these
fixes
cover you for
general
use. But
the moment you
actually build
software, a
whole
new set of problems emerges,
in addition to the ones we
just talked about. When
you run multiple
clawed code sessions in the
same project, they
can overlap
each other
by editing the same
files. They
overwrite
each other's changes because they
have no context of what
other sessions are doing
. If you have a
remote
GitHub repository,
meaning your code is
online, then sessions
also start to
conflict when
they need to
download new
code online and when they
need to
switch between
GitHub branches. One
session can push
changes to one branch while
another switches
to another, and this quickly
corrupts your branches and
your entire repository.
And if you run
the application on
localhost and
you have multiple
localhost servers involved, they
will try to "
kill" each other
because they all
want to run
on localhost 3000. All your
cloud sessions also
have the same
project dependencies.
So if one session
replaces a dependency
or changes the way the
entire application is built
or modifies the
database, other
sessions are interrupted
because they
have no idea that the
change even
happened. To
overcome these
development-related problems
, the first solution
we have is
git working trees. A
Git worktree is a
built-in git feature
that allows you
to work on multiple
branches at once,
each in its
own folder, all from a
single project on
your computer.
So instead of
cloning the entire
project into a separate folder
every time you
need a different branch,
each branch just
gets its own
folder and you don't
have to keep
switching back and
forth. To
use
working trees, you
can simply
ask Claude Coda
to create a new
working tree for you, and
then you can
start your
experiments in that
working tree. So
when you run
multiple sessions, each one
runs in its own
separate working
tree. This means
they can't
override
each other's changes
by editing the same
files, and they also won't
conflict
between branches because
each session has its
own isolated
copy to work with. And
if you
like the video so far,
subscribe to the channel
and hit the
hype button. This small
gesture of support means a lot
to us.
Working trees
prevent
your
sessions from conflicting through code, but
you still manually
pass each
task to each
session. Open AAI Symphony
automates this
part. You may have
heard of this
tool before, but we've
never
talked about
it on this channel
. It's an
open-source orchestrator, which
is essentially a system
that manages a group of
coding agents
working simultaneously, and
it was built for
OpenAI's own agents
based on Codeex. The basic
idea is
that your to-do list
becomes a single place
that keeps track of everything.
Thus, it
shows the progress of
each session of
work on it in
real time. This
way, you can
see how much
has been done and how much is
left, and it
ensures that all
tasks remain
independent of each
other. Symphony does
this with
linear code, which
is a
project management tool
where each column
corresponds to the current
status of a task, and
OpenAI, built on
the principles of
Harness engineering, which means the
entire code base
is planned, then
written, and then
tested by
AI agents, not humans.
Since Symfony is an
open
source project, someone created
their own version that
works with code that
uses pita breads.
It runs a daemon,
which is essentially a
background process that
always runs on
your computer and
checks issues in
your
GitHub repository, i.e. the tasks
you create there.
So, if a
new issue appears with a
specific label,
such as "task
", it automatically
starts a
background fixed
code session and starts
working on it. Then
it creates a separate
branch for this
task. And when it's
complete, it
opens a
merge request, which essentially
asks to merge the
completed work into
your main code.
But Symfony's working trees and
forks
only solve part of the
problem. Working
trees simply
stop
your sessions from overwriting
each other's files and
causing chaos in git,
while forks simply
smooth out your
workflow. The sessions
will still break
when one of
them changes a
dependency, and they will
still
fight for
each other's local servers. To
actually solve these
development problems,
you need a "
sandbox". This is
essentially running the agent in a
disposable,
fully isolated
copy of your
development environment so that
it can run on its
own without
touching your
real machine. And
for this we
use Docker
Sandbox, which also
sponsored
today's video.
Each sandbox
runs on a dedicated
microvirtual
machine with tight
security boundaries. That is
, when Claude
installs packages
or builds a project,
all of this remains
inside the sandbox,
and your real
system remains
untouched. This is the
only
sandbox approach that
allows the
coding agent to create
and run
containers while
remaining
isolated. And it
naturally integrates
with
Claude
Koda's parallel subprojects, each in its
own
git workspace. To
install Docker Sandbox
on your computer, you
run the
install command and then
log in using
that command. Once
logged in, you create
a sandbox
with the sbx command,
using the
name flag, then
the name of your
sandbox, and then
claude. Once launched, the
AI ​​agent
you
interact with runs
inside this
isolated
sandbox. By
default, the agent
inside the sandbox
writes its changes
directly to your
working tree, i.e.
to your actual
project files. To go even
further, Docker sandboxes
give you a
clone mode. When you
create a sandbox,
you add the
clone checkbox, and this
creates a sandbox with a
clone of your
project. This way,
any changes the
agent makes
inside the sandbox
don't affect your
real files. They
only occur
inside the clone.
Now, let's say
you need to
create a large
feature in your
application and you're thinking
about manually
starting multiple
sessions using
cloned code
to do it. You
don't need to
do this anymore. Modern
models are
powerful enough to
handle this entire
workflow for
you, as their
ability to launch
and manage various
subtasks or
tasks has
improved significantly.
Today, you can
simply ask Claude
Code to first
plan the entire
function, then
take each
subtask in turn,
create a
Docker sandbox for it, and
submit that
subtask to
the sandbox. This
way, each
subtask
runs in
its own
isolated
environment, and changes
don't affect what
other sessions are doing.
The same
planning session acts as an
orchestrator, managing
all sandboxes and
making changes from
each of them. When
the sandbox completes
its work,
the scheduler can
delete it as soon as it
confirms the
task is complete.
While the sandboxes are
running, you can
monitor
their progress in the
sandbox control panel. Now all
the skills,
workflows, and everything else
we create and
show you in these
videos can be found in
AIABS Pro, our
community. That's where
you'll get resources,
starter packs, etc.,
as well as a place to
interact with a bunch of
like-minded people,
including our
team. So, if you
find value in what
we do and
want to support the
channel, this is the best
way to do it.
Link in the description. This
brings us to the
end of this video.
If you want to
support the channel and
help us
continue to
create
videos like this, you can
do so by
clicking the
super thanks button below. As
always, thanks for
watching, and
see you
next time.
