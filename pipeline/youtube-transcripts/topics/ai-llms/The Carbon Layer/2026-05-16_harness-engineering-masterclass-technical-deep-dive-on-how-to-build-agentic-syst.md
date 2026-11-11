---
video_id: "mQfTdNVCOB0"
title: "Harness Engineering Masterclass: Technical Deep Dive on how to build Agentic Systems"
channel: "The Carbon Layer"
topic: "ai-llms"
published_date: "2026-05-16"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=mQfTdNVCOB0"
duration: 1686
word_count: 4565
---
Hello everyone. Today
we will try
to understand what
harness engineering is
. In particular, I mean
the design of
AI agent control systems
. So I'm
going to try to walk through
all the different
components and
primitives, as I
call them. They are
not all clearly
defined now. This is not something
everyone has agreed on
. This is just my
way of explaining what
happens when you
use
systems like Codex and Cloud
Code. And it's not just a
model, right? So,
designing
control systems is probably a
good way
to start—it's a system
around a model.
The model, of course,
matters, which is why we
see the “
model wars” with all
the tests and things
going on around them. But
once you start
building real
agent-based
workflows, the model becomes
just one part of this
whole machine.
So the
control system decides what
the model sees, what
it can influence with
tools, what it
remembers, what
tasks are delegated
, how and what it
checks, and in general, how
it
recovers from
failures. This is a deep
dive into the topic to
uncover the magic
we see in Cloud Code and
Codex 2 and show the
mechanism that
enables it. The center of
all this is the model
, right? And what
happens with the model is
this: you give it a
query, and the model outputs
text, right?
It returns text,
and that in itself
was already useful in the
very beginning, when the
ChatGPT era was just
beginning, and that's all
most people
did. They would
create these great
queries, get
text, and that text
could be
used to
explain the concept.
This can help you
make a plan. It
might even write
an email
if you provided a
good request. And that
was it. It's just a
model, and you
interacted with it
directly through
some API. But it has
limits, and those limits are
obvious. The model
only sees what is
inside that
query and all the data
it is trained on. This is what will
help it
give you the result
or text. So if
your current project,
repository, ticket,
incident, or
workflow is not part of
this
input, the model
will start guessing, and this is what
we call
hallucination. So the
first question is
not really
whether the model is intelligent. I
think the first question
is, what are we
giving her to work with anyway?
What is in
the query will become the
basis of the result.
So, if this is a model,
what does "agent" mean
? Again, the word
"agent" is thrown around
quite often.
OpenAI's Agent SDK
defines it as an LLM,
or model,
configured with
specific instructions
, provided with
tools, and
placed in an
environment in which
it can operate. Here is
the definition of
an agent, and Codex and Clot Code
demonstrate a
product version of
such an agent. But
this cycle, where it
follows
reasoning, action,
observation, and
repeating this
cycle, we call it the
agent cycle. But
before we start
talking about
primitives, it's worth
clarifying three things
to avoid confusion: a
model is the engine of
reasoning; The second is the
execution environment
we talked about, the
loop where the model
observes, resolves,
invokes, and acts. And
the third thing that
we will be discussing in
detail
is the harness itself
. This is a system around the
runtime environment
. And we'll talk about
some of them in turn.
When an agent
fails, we usually
blame the model.
We're saying the model
may not be that
good. And sometimes this is
true, because there is an
obvious difference between
the capabilities and
intelligence of the model.
But often the problem is in
the level or in one of the
components or layers
around it. He
just didn't support
the model, and that's actually what
I want to
talk about in the rest of the
video. So, with that said
, let's move on
to the first primitive
—the instruction. What does this
mean? You tell
the model who she is. You
tell her what kind of work
she does. You
set the tone of
communication. You
define the limits
. You specify your
coding styles. You
give her your rules
about how to
review the code and what
she shouldn't
do. This becomes an
instruction that you
give to the model, and so
we should
consider it a
primitive. This is where
agents MD as a
form of instruction belongs, or
cloudMD if you
are using
cloud solutions that
fit into this
primitive. Again
, the same
category
includes system
prompts, custom
instructions,
repository rules that
support some of
these agents and their
shells. Cursor calls
this Cursor rules.
So, all of this, in one
form or another, is one
primitive:
an instruction. They are
powerful because
they transfer the
repetitive instructions
that you would otherwise give to the
model
directly into the
environment itself. You, as
a user, don't
need to repeat
these things over and over again.
You don't even
have to
copy and
paste these
instructions all the time. There is a
certain orchestration
of this primitive
instruction that the
mechanism itself will take care of.
That's why they say, "hey,
agents.md will be
automatically provided to
the model." So,
instructions are the
first level of the
mechanism, because they
shape the behavior of
everything that
happens to the
model. But there is a limit to
what instructions
can do on their
own. So
the instructions are
passive. They
can say "
follow the
project conventions", but they can't
detect those
conventions if the
corresponding files aren't
available.
For example, they
may advise to be
careful with
migrations, but they
cannot verify the
migration itself because
the agent does not see it.
Instructions
help the model
behave better, but
do not give her a complete
picture of the world. You
can't give it all, can you
? With that in mind
, let's see
what the next
primitive will be. And next
is providing context.
This context-providing mechanism
in the
toolkit
provides the model with the
necessary
materials. You
used the
"@" symbol to
link to the file,
right? All of this
is somehow part of the
context-providing primitive. Here you
immediately see
the difference between a bare
model and an agent
working in such an
environment with
context provision.
Because now you
can give it the
file you want, the
failed test, the
stack trace—and
you have a whole
new level of
possibilities.
Previously, if you asked
the model to fix
an error without files,
it would give a general
solution. Now, if
you add the source
file, you'll get a
completely different
answer. But here we
start to see
limitations at this
level as well. Isn't that right
? So, this in
itself is also
not enough. Let's
see why.
You have instructions and a
mechanism for providing
context where you can
reference files,
logs, and documentation.
Truth? But just
downloading all this
doesn't mean
context engineering.
Your chat may become
too long. Sometimes
in
production incidents, the logs are
too voluminous. If
you just pour all of
this into a model, you won't
get a reasonable
result. You
will see "AI garbage"
because, as we know,
the model has a limited
context window. If
you start stuffing
everything in there, it
simply won't fit
in that window. So even
within this window
that the model has, attention
is not free.
Sometimes the wrong
context is much
worse than no context at all
, because it
creates a
plausible
distraction for the model. So
the problem changes:
we can no longer
simply ask whether it is
worth providing
context. I think we're
starting to ask who
exactly decides what
context is important, and
that's an interesting question.
Harness is designed to
help with this
aspect to some extent. So yes, we
as humans certainly
play our part,
but at the same time Harness
can do a lot
for us. And this
brings us to the
third primitive—
context management
. This is where
managing this
context comes into play. Harness, as
you may have noticed,
does a lot of the
management work of
determining what
context to provide to
the model. This means
you may have heard of
RAG or
search-augmented generation.
This may help in
this aspect.
The system can
re-rank the data
and determine which
parts of the received
fragments are worth
including. She can
summarize
at certain intervals
. When it
sees that it is reaching the
context limit,
it can trigger the
compression process.
You may have
heard this term too.
Putting it all together
, it forms a
holistic context.
The task essentially
boils down to
deciding what
exactly is entering the
model at a particular
moment. This seems like a
small thing until you
try to complete a
real task. So
if the repository is
too big and the chat is
too long, and you
dump all of that into the model, you
won't make the agent
smarter. You will simply
make the query more "
noisy". Popular
names for this include:
context compressors
, prompt caches, search
, ranking,
session summaries, compaction.
The names change, but
the task remains
the same: how
to protect the
model's attention? How do we make
the model focus
on the right
context to
perform the task
we want? The gist is
simple: Harness manages the
model's attention through
context management. But it is
context management that makes
the agent smarter in the
dialogue process. It
can preserve
important parts,
summarize
outdated ones, and
retrieve the right
files at the right time
. Avoid wasting
half the window on
noisy context.
But the agent is still
mostly just "
chatting." He can
tell you what he's
going to do.
It can
identify the file.
It can
suggest a
command to run.
He might say that the
next step is
to run the test that
fails. Perfectly. But at
some point this is no longer
enough. If
the work requires action,
the model needs a
way to ask
the outside world to
do something. Someone has to
perform the part of
the actions that the model
has identified at this
stage. And that brings
us to the next
primitive, which is the
tool interface.
Tools give
the model the ability
to act. This is no longer
just a
talking agent. This seems like a
structured action
he could take.
The tool must
have a name.
The tool must
have a description, a diagram, and
may also have an
output diagram. And the model
decides that I should
call this
tool with these
arguments. This is the
model's side of the deal. And if you
have noticed an increase in MCP
, then this is exactly this
level. MCP is useful
here because it
serves as a way
to abstract
how these tools
become available
to the model. This is the
model context protocol. So if any
service provider creates such
MCP servers, they
open up their
tools to the
model so that it
can act, not just
talk. So if you
have used
OpenAI function calls,
Anthropic tools, MCP
tools, bash, or
GPT, you are using
this primitive. The model
no longer simply
describes the work. It
can also
request actions to be performed
. But then again,
this also has
limitations. Let's say
the model correctly
decides that I should
run a test
command. Perfectly. Where?
On my laptop, in a
container, in a cloud
sandbox with
network access, with
secrets, with
access rights to the entire
repository. What
about the result?
Tools can
malfunction.
Tools may
return garbled
text. Web pages
can contain
prompt injections,
right? The API may
return partial
data. The model may
choose the right
tool and valid
arguments, but
the binding still
has to answer
the operational
question: where does it
run, within what
bounds, and how much do we
trust what is
returned—this is the
runtime environment
, and this is our next
primitive. So, the
runtime environment is
where
tool calls become a
limited reality
. This is the file
system area, network
credentials,
sandboxes,
containers,
browser sessions, cloud
workspace—
we put all of this into
this primitive. This is
where the terms you
might have heard about: sandbox
, container,
development environment,
work tree,
browser profile—these are
companies that are
formed for
this level as well. Daytona is
one example
that comes to mind,
E2B is another. I know
Docker now has a
development sandbox. So this is a
primitive that we
also have to think about,
and it's the binding that
provides,
configures, and
interacts with the
tool call, making
this possible. Actually,
this is why it is important
to run each
task in an
isolated "
sandbox". This is not
just a
deployment detail, it is a
basic element of the
control system at
this stage. Um, and
the model can
ask to execute a
certain command. The
control system
decides where
the command is executed,
what it sees, what it
can change, and what
requires, say,
human approval. So
at this level, trust
takes on practical
significance. We don't
just tell the model,
"Please don't touch the
secret data," but at
this level we can
make sure that it does
n't get it at all
. So,
the environment provides
the agent with a place to
work, but a sandbox alone is
not enough for
long-term tasks.
Real tasks are
sometimes
paused, resumed,
branched out, and
sometimes
fail. They need a
plan, a logbook,
they need to
record what has already
been tried. They
need
continuity so that the
next step
continues the work rather than
starting all over again.
If the only place
to store all of
this was the
model context, then in the event of a
crash or other problems,
we would lose everything.
The system needs
something much more
reliable than “yes, I
think I
remember that,” right?
This brings us to the
next basic
element to
consider when
creating your own
control system—that is,
durability.
So, durable
state is the
workspace that
is saved after the
current step:
plan files,
checkpoints,
task status (
what stage it is in
),
session summaries,
action logs, differences (
diff)—all of this is
stored here. Is
n't that right?
Context management determines
what is being passed to
the model right now.
But durable state
preserves facts,
artifacts, and progress
out of
context so they
can survive the
current run. For
agents writing
code, a durable
state might be a
branch with changes, a
test log, a
plan document, or a
bug report.
Of course? For
research
agents, this could be a
source map,
extracted quotes, or a
confidence table. The
data storage format is not important. What
is important is that
progress becomes
available for
inspection outside the
model's field of view at the
moment. And this is very
important. Um, the
durable state
preserves the
work done, but it doesn't
coordinate it. A
plan file can specify
what should happen. But
he doesn't decide what
to repeat and when to
do it. The log may
record that
the command
failed, but it does not
decide whether
to ask for approval
or not. Similarly,
memory can retain a
learned lesson, but
it does not plan for the
next launch.
So, when a
workflow has a
lifecycle,
state alone is no longer
enough. You
need something that
indicates: start here,
stop there, resume
after that, perform a
post-action check,
ask the person before taking a
risky step.
This part is a completely
new primitive. And in the
agent's toolkit, this primitive
manifests itself as
orchestration. So I took
a little distance
from the big
picture. Now we
see that all the
previous elements are in
place. There are
instructions,
context delivery,
context management, persistent
state, runtime model
, and now we have
another primitive—
orchestration.
Orchestration is the
mechanism that
decides how
work progresses.
Lifecycle interceptors,
heartbeats like we saw in
Open Claw,
retries, approval stages
, handoff to
a human,
tool wrappers,
step sequencing,
task list,
model routing
—it all goes here.
So, "before calling
the tool do this"
and "after failure do
that" all become
part of this
particular
primitive. Cloud-based
code interceptors
are a great example of
this.
Agent frameworks expose
lifecycle events
because real
systems need
places to intervene in
behavior. The model doesn't
do all this by an
effort of will. The
workflow
is supported by
the toolkit. And it is
this primitive that
performs the main
routine work. At
this level, the
agent's work begins to
resemble less a chat and
more an
execution environment. But as you've
seen, orchestration
helps one
agent do more,
but one agent
still has one stream of
attention. Sometimes you
need
branching.
You might want
someone to go and
research something for you as you work
, look at a git
repository, or
draft
something separately.
Check the diagrams,
verify that
the browser displayed them correctly
. If one agent
does all this
sequentially, the process
has two problems:
first, it becomes
slow, and second, the
context we talked about becomes
overloaded.
So when work
branches, the
toolkit
must also
support that
branching, and that
brings us to the
next primitive
—subagents. OK.
So, not all
tools or
providers that
offer them, even
among the open ones,
keep this,
right? I think, if I'm not
mistaken, Pi is a
classic example
of where there are no
built-in
subagents. If you
want, you can
add them to the Pi, but yes,
they have a purpose.
Subagents allow
the toolkit
to divide work into
bounded cycles. Now
, instead of just one
of all the things
we had, we have
many of them. One agent
examines the
codebase, another
reviews changes,
another checks
sources, and the next one
makes a plan. You
understand what I mean,
right? And the main one, who
launches all these
processes, takes
responsibility for
integrating all the
results. And I
think the OpenAI Agent SDK
has two useful
templates for this.
The first is agents as
tools. We've
talked about
tools before. What if
we
also consider agents as a
tool? This is
actually where you
come to the
concept of a subagent,
where the manager
maintains control,
calls in specialists, and
then hands them
control,
shifting the active
dialogue to them.
Right? But that's
just an observation.
A primitive is
the ability to launch
and create
branches with a
pure context, given the
existing context of the
main agent.
So, a subagent is not
just more
models. This is a model with a
narrower task, a
narrower context, and,
often, a narrower set of
tools. This is
why
the term "experts" is used; this is
why subagents
help
because they
reduce the amount of
data
each
employee has to process. Remember
all that context
and attention? Well, that's exactly what the
frame does.
Because of this, the framework
helps by saying, “
Don’t worry about all
this; focus only
on these tools,
on this specific
aspect of the job that
needs to be done,” and
move on. And then when
the result
comes back, it
integrates it all together
. But delegation
creates a new
problem, doesn't it?
If each subagent
invents its
own process, you
get parallel
inconsistency. So,
this is the problem
of delegation. This
seems faster
until everyone
comes back with a different
interpretation of the
task they were given. Therefore,
agents need
procedures. They
need
reusable knowledge
that can be
downloaded at the
right time. And
one of the primitives
that helps in this
aspect is
skill level. These are essentially
skills and procedures.
So, if these
subagents are going to be
launched to
perform a very
narrow task, wouldn't it be
great
if we could provide a
clear checklist or
procedure that they
can follow in a
reusable
pattern? So that
whenever you need a
narrow subagent to do
this, you would just
give them
the task, give them
the skill, and you're done,
right? So, skills are
reusable
procedures for
repetitive work,
right? How to view
PR, right? Or a
pull request.
How to prepare for
an episode, right? How
do you use a
specific git repository
? How do you perform
in-
browser validation and testing? Um, and so
on, and so on.
I think at this point
everyone is pretty familiar with what
skills do and
what types of skills are
available. But you'll
see it as
skills, slash commands
, playbooks, runbooks,
recipes, and
workflows. However,
they are all part of this
particular
primitive. A good
skill encodes
a workflow: when
to use it
, what inputs to
provide, what steps
to follow, in
what order, if
any, and what
tools to
prefer. In this way
, they make
the binding less
dependent on
each agent
reinventing the
same process every time. They
transform
repetitive
examination from an
instruction to "don't
forget to do this" into a
named opportunity
that can be triggered by
a binding. Isn't that right? And that's
really important.
That's why it was a
key moment when
the skills became
a reality, and of course,
they became part of the
Linux Foundation. Now
skills make
work repeatable,
but they don't prove
that it was successful
: a skill might
say "run a
test," but it might
pass; it might
say "check
if the
browser screenshot is clean."
So, the procedure is
necessary, but it is
not proof, so this
primitive is
verification and
observation.
Verification requires
validation: tests,
builds,
type checking, linting,
browser screenshots, visual
inspection, certain types of
evaluations. Essentially,
the agent is saying, "I'm
done." And the strapping
can then ask:
"Well, show me." So this is
one of the biggest
changes in thinking when
designing a
harness. You don't
trust the final
sentence just because
it sounds
confident. You
ask what
external verifications
can
confirm it. For
code writing, this is
easy: you want the
test to run and
pass. For
a presentation, this could
be a
browser screenshot without any
text overlay,
etc. For research,
this could be
primary sources and a
table of statements. I
remember my first
interaction with an agent within the
harness.
Of course, when I
asked him
to do a
programming task, he
automatically said, "
Okay, let me
run the test." And I'm
like, "Wow, that's great.
" I didn't even
have to ask for it
. And this was before the
concept of
skills, right? But that's
because the binding was
written in a way that
told the model
to look for verification
as an additional step, and
for a very
long time that was a
differentiating factor.
Many
attributed this to the
model's intelligence, and of course there
was some of that, but the harness
also played a
big role. If
the framework requires
validation, it
will direct
the model to
perform it. So,
in the end, it's the
model that does it, of course, but the
framework helped to
give it the
right attention at the
right time so that
it would do
the check correctly.
So “looks good”
is not a
verification strategy; In general,
some
control mechanisms are needed, and
this is where a framework can also
come in handy.
Now, the validation tells
you whether something passed
successfully, but it doesn't tell you
why it
failed. So, the test
failed, but was
the context wrong,
or did the tool give the
wrong
result? Did
the agent edit the
wrong file? Did
the subagent miss a
certain restriction? Is
n't that right? Without a
run record, debugging
becomes difficult, and it doesn't
scale. You
need to know what the
model saw, what
tool it called
, what arguments
it used, what was
returned, and what
changed. And this is
part of
observability. So,
observability
is a recorder of
agent execution traces,
tool call timelines, logs,
cost, latency,
request versions,
tool versions,
approval events, the
full chain from
user intent
to the final
result. The error is
often not in the last
message. She is in
one of these
intermediate steps. That's
three
tool calls earlier
where the agent looked for the
wrong symbol,
trusted the
wrong
page, or
skipped a failed
test. And this
observability
turns the
agent's confusing work into a
system that can be
debugged. Isn't that right?
And that's important because
you can't
improve what you can't
test. And
then comes the
evolution of the
frame itself. This is the moment
when failures
become
infrastructure. A
repeated
lack of
context could
indicate something
you need to
add a
search rule for, right? A
poor
tool result becomes a
stricter scheme. The
dangerous command
you saw through
observability
becomes the
permission barrier you
add after you
discover a
missed edge
case, which becomes a
test. The repetitive
correction that
the model has to make can
become memory, and the
repetitive
workflow can become a skill.
What the Hermes agent does
is an agent version of the
post-incident analysis cycle
. Not just
explaining the incident, but
changing the system to make
similar failures
more difficult to repeat.
The point is not to
make a perfect
run once, the point is to make
each
subsequent run
start with better
conditions, and without this
level, each
agent session becomes the same
lesson in a new
wrapper, if you will
, but with it the complexity
accumulates
correctly. This is where
harness engineering
becomes more
than just
agent supervision, so to
speak. So
if you put all of this
together, all of these
components that
we talked about, and
go back to the time
when the articles
were discussing and
creating
the architecture of how
Claude Code works, you'll
realize that it's
very similar to that
diagram. At some
level, that's how
Claude Code works, that's how Codex works,
and that's how Gemini
CLI works. And that's useful now
because it all
shouldn't seem like
some random
complicated thing that
you see here anymore. Each
primitive listed
here has its own purpose.
It matters. It
was added here for a
reason. This is the
result I
wanted you to
get. Here is a
practical test that
I will leave to each of
you. When an agent
fails, don't
just ask if
the model was
good enough.
Ask at what
level of strapping the
path ended. Were
the instructions not enough? Was the
context
wrong? Is
the memory outdated?
Was the tool diagram
blurry? Was
the command executed
in the wrong
environment? Did
the workflow require a
steady
state?
Was orchestration necessary? Was it
worth
delegating this
task? Was there no
corresponding skill? Was there
no verification, did
we not have a
trace that would
allow us
to look inside,
and did we not
learn anything from the past
mistake? That's what
change is all about, isn't
it?
Harness engineering is how we
move from
intelligent agents to
reliable systems.
The model is still important
, but reliability
is built into the system
around the model.
I hope this was
helpful. Thank you.
