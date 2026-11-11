---
video_id: "gwduNjsOaNA"
title: "Agentic Design Skills For Claude Code and Codex"
channel: "Owain Lewis"
topic: "ai-llms"
published_date: "2026-08-14"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=gwduNjsOaNA"
duration: 1015
word_count: 3850
---
Today we're talking about the two most
important skills for AI engineers,
design and planning. Most content online
is focused on the wrong things,
optimizing your cloud code setup, the
latest agent harness tips and tricks,
&gt;&gt; [music]
&gt;&gt; or even choosing the best model, but
none of that will really help you build
better software. So, in this video I'm
going to show you how to think about
design and planning as an agentic
engineer. We're going to design and
build a feature together. I've been
building software professionally for the
last 20 years, and all of the ideas and
techniques I'm going to show you today
are the same ones that the best
engineering teams in [music] the world
have been using for decades. If you
stick around to the end, I'll give away
the four skills that I use every single
my personal and professional [music]
projects. So, let's get into it. So, an
obvious question is why do I think
design and planning matters so much when
it comes to agentic development? So, if
you think about software development,
there are five phases. The design phase
is where we think about what are we
building, why are we building it, and
then how are we going to build it? So,
this is about understanding the problem
and making decisions or choices about
how to solve that problem. Then we break
our work down into a number of tasks, we
give those tasks to agents to write the
code, we do some kind of verification
step, and then finally we deploy to
production. But, if you think about
these last three phases, largely agents
can do most of them or the entire thing.
So, pretty much you should be able to
give a task to an agent and have it open
a change request for you to review.
Humans aren't writing the code anymore
if we're honest about it. And so, really
there's very little to do in the build
process. If you're still manually
prompting or you're doing things
differently every time you have a piece
of work, that's not going to scale very
well. So, typically you want to get to a
point where you can give an agent a
well-defined task
and be confident that you've built your
process in such a way that the agent
will then open a pull request that is
just ready to go, pretty much.
Verification will depend on what you're
doing. A controversial thing to say here
is it really depends on what you're
doing. I've worked on mission-critical
systems with millions of users. You're
obviously going to do a lot more human
review, human testing in those
situations, but equally I work on side
projects where I'm quite happy for
agents to do a lot of the code
reviewing, a lot of the verification and
testing cuz this is really about
building the verification systems,
automated code review, automated browser
testing, automated checking, automated
everything basically at this stage. But
if you're working on something like a
design, you still want to have a human
in the loop. You don't want to trust
agents to evaluate a design, for
example. And then deployment to
production has been automated for a
really long time. Humans don't really
deploy software anymore. We merge our
code changes in and then the this system
will deploy that to production. So
really the only things left for us to
focus on as developers are design, where
we decide what to build and how to build
it. This is really on us because these
decisions are really, really critical
and important. Planning is about
breaking the work down and then
verification. Again, depending on what
you're doing, you still need to do some
level of verification and checking of
the quality and to make sure everything
is good. So I like to think about design
as two phases. The requirements phase is
where we think about what are we
building, why, and then for who. Then
the technical design is the stuff we all
think about when it comes to design.
It's about making the the choices around
the stack, the database, the
architecture, thinking about edge cases,
security, operations, metrics,
monitoring, alerting. How are you going
to support this feature in production?
All of those things are part of the
technical design process. You can
definitely use an agent to help you a
lot here and that's what we're going to
be doing throughout the process. But
really if you work in a large company,
you'll find that the most senior
engineers in that company spend most of
their time focused on technical design
because it's the highest leverage and
the most important part of the process
to really get right.
So we're going to look at four skills in
this video. The design skill is going to
allow us to build a technical design doc
that we're then going to use to break
down into tasks. We're going to use the
architecture review skill to find edge
cases, flaws, mistakes in the original
design and basically improve the the
original design.
Then I'm going to show you the HTML doc
skill which will allow you to visualize
your designs much more elegantly. It's
very difficult to read markdown
documents sometimes as humans. And then
finally the planning skill will allow
you to break your design down into tasks
automatically.
One technique I really like to use right
now when I'm building any project is to
have an architecture.md file. The
architecture.md file is an overall
high-level architecture for the entire
system. So if you imagine you're
building a project from scratch like a
new web application or any new project,
[music] having this architecture.md file
is a really great reference both for you
and also for agents working on your
project. So again, this is the same
design doc skill that we're using
elsewhere in the video. But this is
focused on the high-level system design.
It's the you know the highest level.
Here's the moving pieces, the database
choice. So this is talking about the
architecture where we have a you know a
server using React. We have a worker
that dispatches to these you know
different coding agents. So these
documents can be really detailed. So you
can see here this is the API definition.
So we have a health check endpoint. We
have a separate API for our worker. You
can kind of just see there's just a ton
of detail. We also have limits detail as
well. These are the little things that
get missed most of the time when
developers build software. They forget
about you know what are the edge cases,
what are the limitations, what are the
controls, what are the rate limits. All
of these little things will protect your
application and make it really really
high quality.
If for example you're building a SaaS
application and you forget to add
limits, a customer could you know
generate a thousand resources and cost
you a load of money. So these kind of
things are actually really really
critical when it comes to building
software. Thinking about limits,
thinking about you know edge cases, rate
limiting. All of these kind of
protections will really help you when
you build out any real software. So for
this video we're going to pick a random
application I happen to be working on
that we can build a feature in. So let's
run the server. So we're going to type
just serve.
And now we're going to start the
application and then go into the browser
and take a look at what this looks like.
So, for this demo, we're going to be
building a feature in an existing
application I've got here called Slate.
This is just a project I happen to be
working on at the time. The idea here is
it allows you to manage your tasks and
assign those tasks to agents. Pretty
standard stuff. It looks pretty similar
to many apps you're probably familiar
with. We have an idea of a board and we
have tasks on the board. We can create
lists of things we're focused on. We
have like a Kanban view. We have a table
view and then we obviously have a
calendar view as well.
So, the idea here is that we can add
tasks to our queue that we want to work
on. Let's say I want to write an email
draft response to, I don't know, Tim.
And then we want to have the agent
basically pick up that task and do it
for us.
So, in order for us to do that, we need
to connect our agents. So, you can
define an agent over here.
But, in order for us to assign work to
the agent, the agents need to be
listening and watching these tasks. So,
that's the feature we're going to be
building today. So, the first thing we
want to do is think about the feature we
want to build. So, the idea here is that
we want to build a feature that allows
an agent to listen, monitor the task
board, and then basically automatically
pick up the work. So, what I'm going to
do is use the design skill
that I have written and I'll link all of
this in the description. We're going to
say something like, "I want to build a
feature that allows me to adapt the CLI
tool that we have so that it listens and
watches the board for tasks to pick up.
A task is suitable for an agent if it
matches the agent's name and it's in a
ready state. Any tasks that match those
criteria, we want the CLI to
automatically pick up and then delegate
to an agent to implement the task and
then we want the agent to update
the task board once it's finished,
comment back on the ticket, and move it
into a review state. So, before we use
the design skill, I'm just going to
basically brainstorm first to help me
ideate
this feature.
So, before we even move into writing
this down into the document, I think
it's helpful to get clear about what it
is we're building. While I think you can
get away with using a cheaper model for
the implementation, the design is such
an important part of the process. You
need the agent to really think about all
of the different conditions, the edge
cases. So, typically I will use the
higher reasoning settings or like the
best model available to do the initial
design, whether that's, you know, Claude
or whether that's GPT. So, this is an
example of where the agent's opinion and
my opinion may be different on the
implementation details and you want to
go in a different direction. So, you
don't want to always accept the agent's
opinion. You may be want to challenge it
a little bit. So, in this example, we're
deterministically updating the state of
the ticket after we've updated it, which
seems pretty reasonable.
But, what I found is that this actually
adds a lot of complexity and I would
rather the agent to do the update
because agents are pretty capable today.
So, I'm going to make the change so that
it's the agent that is responsible for
updating the task
using the CLI tool.
So, what you'll find is as you go
through this process, the agent will
make a decision and you might disagree
with that decision or challenge it or
think about something in a different way
and you want to constantly kind of go
back and forth with the agent on these
design decisions. Okay, so Codex is now
finished doing the initial design and
what we have here is like a clean
executive summary basically describing
what this feature is, what the goal of
what we're trying to do is in a really
sort of simple and understandable way.
Then, we have some context about the
system and we have a diagram of how this
is going to look. And we've got a
proposal on the design. I like to spend
a lot of time thinking about the user
experience when it comes to these kind
of things. So, what does the the user
experience as they use this product?
Like, what are the commands that they
actually run? Do they make sense? Are
they intuitive? Things like that,
basically. You'll also notice we have a
ton of detail in this document. Some of
this is important because when you think
about a task like this, there are kind
of all of these little edge cases and
race conditions that might happen. An
agent might claim a task, but then what
if two agents are competing to claim the
same task at the same time. So, there's
kind of these weird edge cases that you
might not have even considered when you
first started thinking about this
particular feature. And really, the
design phase is a chance for you to kind
of surface these hidden like things that
you might not have been thinking about
in the original design phase.
So, one of the things you might notice
is how big and detailed this design doc
is. And this is one of the reasons why I
always break things down into smaller
tasks, because this is just too much
information, in my opinion, for an agent
to handle generally in one shot.
There's far too much going on here.
There are so many different edge cases,
task conditions, uh like implementation
details we need to get right. So, we're
going to have a much better result if we
can kind of break this down into smaller
tasks. Okay, so now we have the initial
design, but it's quite hard to read
through that design initially. So, what
we're going to do is use the HTML doc
skill. I'm going to say, "Use the HTML
doc skill to make this more readable."
So, this is the document that was
generated by our skill. It's taken the
initial design and turned it into a
slightly more readable HTML version of
that design doc, essentially. We have
all of the same information, just maybe
presented in a more readable format. We
have a diagram which is easier to read.
So, we have this kind of slate watching
CLI tool that is watching
the API.
We've got the database over here.
So, these diagrams are really, really
important for understanding. If you're
like me, maybe a a visual learner, then
having diagrams here can really, really
help you understand what's actually
going on. What might be interesting is
to use a different model to critique
this design. I typically would use the
existing Codex model, but it might be
interesting to spin up Claude and see if
we can get Claude to review the design
as well. So, I'm going to ask Claude to
review this. So, review the at docs/
Let's find the actual document.
Agent task watcher design MD file
using the architecture review skill.
All right, so we're going to ask Claude
now to review this using the
architecture review. You can see here
we've loaded this architecture review
skill.
And we're going to see what Claude
thinks about our design that was done in
Codex. Like I said, I wouldn't always
use a second model. I don't think it's
necessary. But it can be quite
interesting to see if you get a
different result or different feedback.
I think it's worth using the best models
and spending more tokens on design
because this is going to save you money
in the long run. If you make mistakes or
you implement the wrong design, you're
going to have to go back and correct
those things. And it's much more
expensive to correct mistakes both in
terms of token usage, but realistically
in terms of, you know, customer impact,
development time, it's far better to
spend a bit of time early on in the
process getting this right than it is to
kind of, you know, take shortcuts at
this stage. If you're going to spend
tokens, spend your tokens on design.
When it comes to reviewing a design,
there are lots of things you need to
think about, which is what makes design
somewhat challenging in general because
there are all of these different edge
cases that you probably haven't
considered. Things like rate limits to
protect, you know, against the number of
requests a customer can make in a given
time period. You also want to think
about, you know, scalability. Does this
design scale well? If I have 10 users,
it might work great, which is the
problem with live coding, right? You
have something that looks great on a
demo, but as soon as you put it into
production, it completely falls over
because it's not scalable. It wasn't
designed very well. So, what I'm going
to do now is simply ask the agent to
break this down into a number of tasks
and then store them in an issue tracker.
The The reason I think you can largely
just let agents do this because it's
mostly mechanical. So, I would
definitely recommend using agents to do
the task breakdown. Having worked in
software for a long time, I can tell you
for certain that humans are not very
good at this kind of work because it's
incredibly complex, incredibly
mechanically detailed. So, for example,
you can see that the agent is now, you
know, making sure that all of the the
invariants and the task conditions are
captured within a task. This stuff is
very time-consuming for a human to do.
I generally don't bother writing the
tasks by hand anymore. I'll always use
an agent to do the task breakdown. I
just feel it leads to a higher quality
result. The agents are just much better
at keeping the the detail. Okay, so what
you can see is that we've now broken
this down into five discrete tasks. So,
we're adding the run contract.
All right, this seems reasonable. You
can obviously review the tasks and make
sure they make sense to you. Maybe
there's something the agent has missed,
but generally I will take the output of
the agent.
And you can see here we have a very
clear summary of what the task is,
the outcome that we want,
and any kind of constraints,
and yeah, what's in scope, what's out of
scope, things like that. So, I'm pretty
happy with these tasks. They seem
reasonable to me.
So, what I'm going to do now is just ask
the agent to create the tasks for us.
Create
these as GitHub issues. What I didn't do
here is link them all to a parent
ticket. So, it can be quite confusing if
you have a large number of tasks or
tickets in a task manager, it's very
easy to get confused. So, all of these
tasks relate to the same unit of work.
So, I'm going to ask the agent to
correct itself. Link these tasks to one
parent ticket. Okay, so you can now see
that we have these five tasks. As I said
before, the the level of granularity in
your tasks will depend on what you're
doing. Some people might just want to
vibe code the whole design, like just
run through it in one shot.
If it's a simple design, you can
probably do that, capture it in one
task. But if it's anything more complex
where you need to kind of test and
iterate as you go through the cycle,
it's just helpful to break things down
into smaller number of tasks. So, we
have one parent ticket here, which we
can take a look at. This is what it
looks like in the browser. We have this
one task, so build the agent task
watcher, which is what we've been
planning out. And you can see here we
have linked all of these, you know, sub
issues that need to be done. And we also
have the delivery order. So we have an
acceptance criteria that all of the
issues are complete. We have, you know,
a rollout plan to deploy this.
So a pretty detailed ticket. And at this
point, you can just hand this off to an
agent and let the agent work through all
of these tasks.
So what I would typically do is just use
Codex to build out the rest of the
tasks, but there's nothing stopping you
using a different agent if you wanted
to. So I'm going to go ahead and just
use Claude to build out these tasks
because all of the tickets are really
detailed. We have, you know, the design
document, all of the details in the
ticket. There's really nothing else that
the agent needs to know at this point.
So let's go ahead and build these out.
So I'm going to use the task to PR
skill.
And then I'm just going to pass it in
the parent ticket.
And then that's pretty much it. I'm just
going to wait now for the agent to work
through these tasks, sequence them. This
skill is going to make sure that all of
the changes are tested. They've got code
review. And it's pretty much just a case
of now waiting for the agent to burn
through these. Thanks for watching the
video. I hope you found it useful and
valuable. If you did, please remember to
like and subscribe because it massively
helps out this small channel.
And I'll link all of the resources for
free in the description below. I'll link
the, you know, the the skills that we
talked about as well, so you can
download those,
&gt;&gt; [music]
&gt;&gt; use them in any way you want. You're
free to adapt them. Whatever you want to
do with them is totally fine.
Thanks again for watching and I will see
you in the next one. Take care.
