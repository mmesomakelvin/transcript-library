---
video_id: "z6mgrQCg1NM"
title: "Context Is Eating Software Development"
channel: "AI Native Dev"
topic: "ai-llms"
published_date: "2026-02-17"
ingested_date: "2026-08-07"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=z6mgrQCg1NM"
duration: 1835
word_count: 6213
---
The big question is agentic development
just coding faster with agents, or is
there a bigger, more fundamental
paradigm shift that we need to make with
our software development today?
&gt;&gt; We think there is a new development
paradigm in agentic development. The
primary challenges in agentic
development are one is it's
non-deterministic. The second is that it
revolves around intent, not code. The
third is that agentic development is
faster than anything we've seen before.
And that means that we can't rely on
noticing when things go sideways.
&gt;&gt; What is the solution to this? I do think
that the hammer that we have is context.
LLMs eventually are just stateless
machines that we pass a bunch of context
to. They calculate their weights, and
they figure out what the next words are.
An easy way to understand this is to
think about humans. What are your tools
for managing a team? Communication. So,
along side talking about it, we actually
have been building products around this.
And we have a platform from a business
perspective, think of it as an agent
enablement platform. Onboards agents
onto your environment with all of those
policies and practices, and then it
helps continuously educate them,
continuously improve the context.
&gt;&gt; When we use something like context, what
is the key to using context and making
agentic development successful?
&gt;&gt; The first thing you need to do is you
need to
&gt;&gt; [music]
&gt;&gt; Before we jump into this episode, I
wanted to let you know that this podcast
is for developers building with AI at
the core. So, whether that's exploring
the latest tools, the workflows, or the
best practices, this podcast's for you.
A really quick ask, 90% of people who
are listening to this haven't yet
subscribed. So, if this content has
helped you build smarter, hit that
subscribe button, and maybe a like. All
right, back to the episode. Hello and
welcome to another episode of the AI
Native Dev. My name is Simon Maple. I'm
your co-host for today. Joining me, Guy
Pagani. Indeed, you're a
slightly less frequent recently co-host
here. That's true. We've been together a
little bit more recently. Um so, what if
we take a step back and actually zoom
out a little bit? In this episode, we're
going to be asking the big question, is
agentic development just coding faster
with agents, or is there a bigger, more
fundamental paradigm shift that we need
to make with our software development
today? We're going to be asking the
questions, is do I just need to learn
how to talk to agents better, or are
there greater things that we need to
learn in the practices of agentic
development? I think agentic
development, I mean, it's clearly
powerful, right? And we've spoken a lot,
and we'll probably speak more, you know,
on how how the daily practices have
changed.
But, I think there is also the broader
kind of agentic development as a team
practice. And over there, there are a
whole set of
fundamental changes and challenges that
come along with them.
I would say the primary challenges in
agentic development are one is it's
non-deterministic. And so, we're all too
used to We We run a build. If it
compiles once, it'll compile twice. Yes,
there's the it works on my computer
versus not, but otherwise, it's fairly
deterministic. So, that creates a whole
new set of considerations about how do
we develop software when repeatable
processes are so hard to make. Um the
second is that it revolves around
intent, not code. You know, we said that
from the very very beginning, you know,
that software development will become
spec-centric, not code-centric, and that
code will become disposable.
Uh that felt more controversial a couple
of years ago than it today. It's still
not something that everybody will agree
with, but I think it is very clear that
it software development
anchors on intent, on what you want to
build, on your constraints.
Uh and so, that's another kind of
primary change or challenge that that we
face on on what are these kind of
nuggets of intent, how do we enforce it,
how do we express ourselves. A lot of
human analogies. And then, the third is
maybe just a multiplication,
uh and that is agent development is
faster than anything we've seen before.
And we've had a version of this when
DevOps came about where we said, "Well,
wow, it's moving so fast." And all of
our kind of human processes of how do we
identify a problem and intervene, right?
How do we prevent it? All of those
broke apart when DevOps came about, and
we had to introduce these continuous
processes. Now we see another one or two
orders of magnitude acceleration, and
that means that that we can't rely on
noticing when things go sideways on
um
intervening and changing it at that
time. It's hard for other people to
supervise one person's work because a
single person, a single developer can be
so productive. And so, I'd say those are
the three
primary kind of
deltas or challenges that agent
development introduces that we have to
think about how do we adapt to and how
do we change the way we develop. uh to
to deal with. Yeah, and it's interesting
like a lot of them not new today. Things
like the non-determinism, the intent,
and so forth. These are These are things
that we're talking about from the very
very start.
What else have you heard in kind of like
conversations? I know you've been
speaking with so many people at events
as well as the users and customers.
What other things have you have you
learned?
Yeah, I think
it It's so hard to reduce these things
to the three. So, like if those are the
three primary elements, I'd say the
other the next three, you know, that I
would highlight are
one is that
LLMs and agents have a bias for
re-implementation versus reuse. So, that
is something we battle with all the
time. It's interesting because in some
cases reuse is less important because
creating software is cheaper than ever
before, but there are still various
cases in which if instead of calling the
relevant function of a library, the LLM
has chosen or an agent has chosen to
re-implement it, now you can't upgrade
or fix that functionality. It's new
bugs, you know, it's there's reasons we
do reuse of software. So, I'd say
that's a bias that we need to deal with.
Some humans have that as well, so maybe
not not quite unusual, but it's very
it's very significant.
The second is that their LLMs and agents
are constantly a little bit outdated.
You know, by the very definition of how
they're built, their knowledge is at
least a few months old from the the time
the last model was trained. Mhm. And so,
that is another challenge we always have
to sort of think about how do we deal
with. And then
I I think of LLMs and agents as cheap
than expensive.
They are they are cheap in the sense
that you can build things so much faster
and with so much less human effort than
than before, and that is cheap. But then
once you start using them, you know, now
Opus 46 runs with its fast mode that is,
you know, 2 and 1/2 times the speed at 6
times the cost, you know, and already at
the top model. It's amazing. It adds up.
And so, it's gone from a great way to
save money to Okay, this is now also a
significant spend and introduces
questions on how do you manage spend? We
knew how to do that with humans and with
hiring locations and a variety. What's
the right way to do that with agents?
So, all of those and and I'm sure even
these six are not a comprehensive list,
but I think I think it's a useful
starting point. So, there's a lot of
problems there, Guy. What what is the
solution to this? I'm guessing you're
going to say something about context.
&gt;&gt; [laughter]
&gt;&gt; Well, you know, now that you put this in
context, it is So, yes, I think
there are a lot of challenges over
there, and some of them are human and we
need to deal with them. But I do think
that the the hammer that we have as we
look at all these nails or nail-like
problems
is context. And the reason for that is
that LLMs eventually are
just sort of stateless machines that we
pass a bunch of context to, you know,
and they calculate their weights and
they figure out what the next words are.
And so, managing what are the words that
come in, what is the information that
comes in,
is really our primary tool. It is both
our
human means of alignment. Those are the
words, the institutional knowledge
preservation, and how do we make sure
that we work as a team and as an
ecosystem. And they are the way in which
you communicate and convey things to to
the LLMs.
I guess an easy way to understand this
is is to think about humans. What are
your tools for managing a team?
Communication. Well, that that's that's
really, you know, how you can work with
it, you know, how do you
incentivize behavior as in, you know,
what do you respond to and how do you
respond to it? And
I think a lot of those analogies really
come down to context. And so, I think
the core competency in agentic
development is context management.
And there are a lot of types of context.
There are rules that you are kind of
kind of explicitly and
aggressively pushing. There are skills
that you are hinting and making
available to the agents to try and pull
down. There are docs, that is
information that is available for the
agents to find and use at its time. And
I'm sure there will be other variations
of how do you
drive the agents to consume and load to
the right context.
And then you have to think for yourself.
When you think about the development
paradigm, how do you manage that
context? And that's actually to keep
that parallel with humans and people,
it's really interesting because, you
know, rules for example, things that are
mandatory for an agent to to learn, is a
very similar to the the rules that we
have to abide by, whether they're, you
know, organizational rules or or
development rules which we want to
follow.
Docs for example, could be reference
docs. A developer doesn't keep all of
that in their mind, but as and when they
need to learn something, they they know
where to go and then they can learn
that. So So realistically, it's kind of
like a little bit like onboarding these
agents with amounts of knowledge and
intelligence or you know, those types of
things.
You wouldn't expect a human to do that
without without this type of knowledge.
So So I guess when we when we use
something like context what is the what
is the key to to using context and
making agentic development successful?
Is it you to write down what it is that
you want the agent to do, right?
Consider, you know, you have a you have
a team, you know, people have different
opinions. Consider that there's a lot of
institutional knowledge. You have to
write those down. You should absolutely
use agents to help you write that
content and and refine it, but you need
to review it and understand what is
written. Again, think about a team.
Think about aligning between the team.
At some point you need to talk through
the
possibilities and choose which ones you
want.
The second bit is you have to evaluate
how well do the agents listen.
Agents vary in the type of content and
the type of, you know, length and
robustness that they would need to be
able to apply changes. They
It's really the models that vary, not
the agents.
But even so, some are tuned to use more
tools. Some are
smaller models that need more explicit
instructions. Some are very big models
that, you know, lean into intelligence.
So you know, we've discussed many of
these things on this
on this podcast and you really have to
after you've defined it, optimize the
way you say things.
Once again, human analogies work very
well. You can communicate some things
better or worse and it depends on your
audience. The The third is you have to
then kind of communicate it out or like
broadcast this to the broader set.
Understand that Make sure that the
agents that needs to hear your words
hear those words.
And then lastly, you want to observe
what happens in the real world. If If
evaluations are more like your tests
before you roll something out, right?
They're more the the focus audience, you
know, that you've tested your message
with,
uh the observation is really actually,
you know, polling to see what happened
after. Uh and just like we've learned
from DevOps and that, you know, in the
in the non-deterministic systems that
are our runtime servers and that you
can't just anticipate whether they will
go down or not, you have to monitor them
and respond. Similarly, agents are, you
know, non-deterministic creatures uh and
you have to assess, okay, are they
actually working the way I expect them
to, learn from that, and come back. So,
these notions of like define and capture
evaluate,
communicate, or or distribute, or
broadcast, you know, your your uh your
context, uh and then observe what
happened, and rinse repeat. And this
isn't something that you quickly run,
you know, back-to-back and then kind of
like learn from straight away. This this
happens in our existing workflow at
different times, right? You have
different loops that can kind of help
you with this feedback. Uh where would
you say each of those fit in with the
today's development workflow? Yeah,
there definitely are various places in
which you'd apply, you know, these
different steps. Uh I I think,
especially for a developer audience, the
most useful thing to imagine is the
DevOps loop. Uh we're all familiar with
that sort of infinite loop. You always
keep going back to that loop, right? You
might say it's infinite.
&gt;&gt; Yeah, it is. It's infinite. Returning to
it.
Uh and so, uh clearly that the DevOps
loop, you know, has more dev on the side
on the left side and more ops on the
right side, but really you can start at
any point depending on kind of what your
current situation is. So, you can think
that on the on the more dev side of it,
the left side, you can think about uh
analyzing your current situation. So, uh
you know, what do you already know about
your code base, about, you know, what
has happened, about people desired. So,
that's a little bit of that define and
capture. So, you analyze that, then you
generate the right documentation, and
then you evaluate that. And you can
continue with that loop as much as you
can, you know, as much as you feel is
needed. So, you've evaluated, you've
seen whether it's good, you know, maybe
you've learned something, so you come
back, you analyze those results, you
generate again. So, you repeat that as
much as you uh as you think is right.
And then once you're ready, once your
context is good, then you go on to more
of the up side, which is you distribute,
similar to deploying, you leverage, so
you actually kind of execute, you run
the context.
Non-trivial effort over there, right?
You have to think about activation,
there's a lot of complexity over there.
And then you observe, coming back to
running system. And so, this type of
infinite loop continues again and again.
You observe, you now have more
information, you might modify your
synthetic tests to represent the real
world again, and that might imply some
problems you identify, therefore you
regenerate the context, and so on and so
forth. And in that in that infinite
loop,
I think there are the classic needs and
sort of tools that you need that are
similar to those that we have in
development. There are some build time
interactive sort of development time
systems, there are some tests like the
evaluations that we need to put at
certain points in time. You might not
have a comprehensive test, but they need
to be sufficiently representative of
reality, so you don't regress, you know,
with the different changes.
And then in the run time you need things
that are more scalable, you might sample
behavior versus, you know, tackle all of
it. You need statistically successful
behavior, you might not need perfection.
So, I think you need that type of
looping and and this is
I guess what we we think of as the
as the context development life cycle,
right? As it evolves, that
complements the SDLC. Mhm. Absolutely.
And I it's it's it's funny how we keep
going back to that
figure of eight, right? But I think what
what's most interesting is we use the
right tools at the right time. And so,
for example, evaluate, as you were
mentioning, the the the evals that we
use there, they're fast because we're
able to do it with the data that we have
at that right time.
They're not necessarily going to be the
most precise given all the data that we
have, but it's that feedback that then
then adds back into that eval to
actually provide us with the data that
we know that actually this is a correct
eval or actually we need to update this
eval in this way. And so that that kind
of like gets us that more close to that
perfection. Yeah, correct. And and we
have like we're familiar with that from
tests, right? We have unit tests, we
have integration tests, we have
end-to-end tests, and they are
increasingly expensive to run, you know,
and harder to run. And so we we use sort
of smaller scope indications. So maybe
we evaluate our pieces of context
frequently every time we change some
some policy and structure and or some
documentation about a library, you might
want to evaluate that every time.
But other types of systems like maybe
evaluating
repo's context, sort of say, well,
there are there are a lot of bits of
context in this repository on it. Can
agents handle that? I want to run an
evaluation for that. I want to draw
conclusions about how how well does it
work and what can I do to improve it? So
those might be more expensive. You might
run them more like end-to-end tests,
right? Every every now and then, but not
regularly. So I don't know if the
one-to-one analogies of unit test
integration tests
end-to-end tests will will work, but I
think there will be a version of kind of
lightweight evaluations and local
evaluations that expand into broader
system ones. Yeah, until it gets us
closer to where we need to be to to to
tune. Exactly. I think the very first
guest we had on the podcast was Dez from
Anthropic.
And he talked about how at the time even
for the agents they had built in,
it was before coding agents were really
a thing,
they had their regression test
evaluations for their agent to know if
it's doing the right thing. Then they
had their torture test, you know, God
what sort of the comprehensive
the comprehensive ones. And so they
didn't run the torture test for every
change, you know, to their prompts. They
ran it when the new model came along. I
think as we as we use agents to
understand our unique environments in
development, we kind of need to develop
our regression evals and our torture
evals, you know, for uh for agents as
they enter our development environment.
Yeah. Still the best name tests, by the
way, that I've I've the torture tests.
&gt;&gt; Yeah, so much better than end-to-end.
Yeah, it's true. You're very true.
Let let's get deeper into context and to
maybe talk about use cases of context.
What people want to use context for?
What would you say? Yeah, I think that's
probably the part that has evolved the
most uh and we had to see it in in kind
of the real world. Uh I'd say today I
see three types of context. I know I'm
sort of keep repeating things in three.
I don't know maybe it's uh too too
ingrained into the corporate world. Uh
but I feel there are these sort of three
uh
types of context that we see development
teams and organizations roll out. Uh one
is more uh policy or best practice uh
related context. So, this might be a
security policy you're disseminating or
uh a choice of uh
uh what is good design over here or uh
sometimes constraints around uh
financial like how much to optimize for
budget versus for
uh uh speed or something like that. So,
those are often times wrapped in skills
or in some other document. They're not
tied to a specific piece of code. And
they're fully reusable across an
organization, you mean? And they should
be. You can have actually what what we
see in enterprises is that we see that
they are hierarchical. You might have uh
just like with any policy, you have just
like you would communicate to humans.
You might have something that is
company-wide and then there might be a
slight override within a business unit
and maybe an even more specific override
uh in maybe uh a specific application, a
specific team. And so, they they might
augment, inherit from one another,
right? To the uh to the Java fans uh
in our in our audience. And so, so you
have those. So, in those cases, you want
to create
create the words, right? Like write it
down, you know, that is the core of it.
You want to evaluate how well would
agents listen. And in this case, it's
very important to define what does good
look like. As you might say, here's a
policy to say
write something, you know, make sure my
code is secure. Well, that's a very
broad definition. Be specific. You know,
get a little bit more
detailed. And often times the
evaluations are the ones that indicate,
you know, what do you mean by
by the words that you that you say. And
so you want to evaluate it and then you
can optimize to that evaluation. If you
didn't invest in the evaluations, you're
going to optimize for the wrong thing.
So, be mindful. Once you have that, you
want to distribute that and make sure
the right agents are getting the right
information and that they update that
over time and of course observe
behavior. So, that's kind of one strand,
right? That's the the kind of
policy/practice
path.
The second one that we see is
documenting your internal platform.
It's maybe the most common, which is I
have libraries of my own in my
organization. I have my billing system.
I have my
kind of a technical cloud infrastructure
that I am
that I'm using that all my applications
need to be deployed on.
There's no reason for the agent to know
any of this stuff. It shouldn't.
&gt;&gt; It will being well it's there is no that
guy if it didn't leak into the weights
of it in some of the first waves of the
LLMs,
it doesn't know about it. It's not in
its weights. And so you have to inform
the agent about that.
Yes, technically the agent can sometimes
go out and try and find it amidst the
code base and extract that out. That's
error-prone, expensive,
very inefficient cuz you're going to
need this information again and again.
And if it gets something wrong, you
don't Well, how do you find out? Cuz
often times the consumer of the platform
is not the one that actually has built
the platform. And so this notion of a
central rollout of the knowledge of your
ecosystem, of your technology
is is very very common. Once again, you
want to generate the documentation. In
this case, you typically have a source
of truth, which is
the actual code of that platform,
examples of usage of it. So, that
generation can often times be quite
automated. You want to evaluate it to
know that modifications to it do not
regress. You want to roll that out and
make it available to anybody consuming
the platform and then you want to
observe that behavior and follow it.
Importantly for this one also you have
to maintain it because your library,
your platform will change over time. You
now need regular processes to update
that.
Then the last one I would say is
is more application context or in repo
context. So, this is the case where
increasingly people understand that with
agentic development you have to be
somewhat disciplined around capturing
the definition of what your app does,
you know, what is the functionality
here? Because otherwise if you ask the
agent to make a change and it went
sideways
you don't know
like where did it go wrong? There was
never a definition of what right is.
So, you have to have some definition of
what correct is. You have to have some
documentation
and and those get captured. But again,
just like software rots, context will
rot. So, over time if you created those
docs but you're not methodical about
knowing that it's good, that it hasn't
regressed, that it stayed up to speed as
things changed.
So, what we see over there is actually a
flow that starts with evaluation. So,
you have
your your first question is can agents
handle my code base? Maybe if it's small
enough and it's written very well, they
can handle the code base fine. You don't
need any additional context. But as the
systems grow, you need
you would need more support to be able
to effectively work. This challenge is
that you kind of like outlined at the
very start. Amplify as you as that code
base
and the team grows.
&gt;&gt; Precisely. As the team grows, the code
base grows, the kind of the complexity,
the subtlety of some decisions. And so,
I'd say this flow starts with an
evaluation. It starts with take the
repository, go back in history, extract
out some set of representative commits
or pull requests that that show typical
work in this repository
and turn those into evaluation
scenarios.
And that is by the way, already very
interesting to see well, how well can
agents develop here? And out of those,
you can say, okay, seeing the failures
that they've had, what type of context
changes might I need over here? What can
I add? What can I remove? You will find
that there are some documents that you
have that are just not necessary. The
agent totally gets it, doesn't need it.
So, you're just wasting context space.
And then you'd find there are other
cases in which the agent is is failing,
it doesn't understand some type system,
it keeps airing on uh
on you know, some specific piece of the
code.
And so, for those you can create
context. Once you have that evaluation,
you do that optimization, you come back
to make sure that context is available,
observe real-world scenarios, and keep
that context fresh as it moves.
&gt;&gt; And that's the that's the important
thing, keep it fresh because this is a
point in time of how this project looks
today. In 6 months' time, in 1 year's
time,
it's going to look differently, and you
need to keep that up to date. Yes, and
this is an evolving process, continuous
process, and needs to continually
update. Yeah. And it's like the weight
on each of these different steps changes
from team to team, from application to
application. There might be some cases
in which observing, for instance, is is
sufficient for you. Like your team is is
very nimble, very fast-moving, the
application is sufficiently small that
you feel like it's okay for you to
observe and identify context failures,
create some new context, and roll it out
without evaluating, without tests.
Right? And you might be you might be
fine with that for a while because
evaluations are created tests are you
know, it's an effort. But I think as
we've seen with tests,
you're going to regret that decision at
some point in as a as a system goes
because it means every time you make a
context change, you you have no way of
knowing whether you've just introduced a
problem. It means when a new
platform comes along, a new model, or if
you want to run it on something cheaper,
you have no means of knowing whether
that system would work. The only way
that you have to do that is to roll it
out and hope for the best and see how
people respond
or even observe the logs. And so I think
different emphasis on do you want to
lead with evaluation, lead with
observation, lead with generation, you
know, lead with your position. All of
these things
they are choices
and they're okay and they will vary from
time to time. But I think they all
repeat in various orders in these sort
of three use cases of kind of policy
dissemination or sort of practice
dissemination, platform documentation
and um kind of application context. Yep.
So we talk about this a lot
so alongside talking about it we
actually have been building products
around this
for quite a few months now and been
working with with partners and building
it out and we have a platform we from a
business perspective think of it as an
agent enablement platform. So it's a
platform that helps agents you know be
enabled successful.
It
onboards agents onto your environment
with all of those policies and practices
and then it helps continuously educate
them, continuously improve the context.
And so we have that. On a technical
level it's more of a context development
and distribution platform. So we give
you that sort of CDLC and I don't like
dubious dubious choice of acronym of
that just drop a new acronym in there
the context development life cycle not
sure we're going to use that
but but we we enable this context
development life cycle. We help you you
know, generate context, evaluate that
context, extract evaluation scenarios
from existing knowledge. We help you of
course run them, observe. So we do all
of that sequence so you can develop and
own your context and then we of course
help you distribute. You've sort of seen
that we are the package manager for
skills. We are you know, we support and
enable skills within organizations as
well but also externally. And so we
we're very committed to making these
types of evaluation services and context
distribution available for the so the
open source context as well.
And and we help you do both of those.
And it
in general
uh coming back maybe to the root of it,
we think there is a new development
paradigm uh in agentic development. It
is
uh it is substantially different than uh
what we've seen in software. And it
doesn't actually replace the SDLC, it
integrates into the SDLC in various
places. Uh and we think that context is
needed in many places. For instance, we
see uh the same uh skill or the same
tile, which is our kind of package of
context, uh get consumed while someone
is locally developing and trying to, you
know, get the agent to succeed. We see
that very same tile be used in code
review uh when you are deploying it or
maybe in incident uh review when it
tries to understand what has happened
and it needs some information about uh
how the system operates.
The same context is applied across
different agents, across uh different
models. And and so we think context is
uh
a a a separate asset that you want to
develop, and your SDLC will uh right now
is very very critical, but over the
years it'll become closer to a build
system. It'll become a very critical
system
uh in in within your your platform, and
one that you should invest in,
but one that is uh kind of run by bots,
used by bots mostly. Like it is not
uh it it is set up and configured, but
most of the activity within it is done
by automated workflows. Um so, we're
excited to be the sort of new agent
enablement platform, maybe CDLC
platform, we'll sort of uh we'll see.
And you'll see us use the word skills in
our kind of communications a lot. You
know, we think context is broader than
skills, but skills are very helpful term
right now as people think about a unit
of context that they move around. And so
we embrace that. We think terminology
will probably shift, you know, three or
four more times, you know, as the world
uh moves around Uh and that's not our
focus. Maybe in and out of a CDLC maybe?
Yeah, maybe CDLC is premature because it
tells us that C is going to be the word
there. We started our journey with
specs, yeah, and we
it's the same thing, you know, it
doesn't really matter what it's called.
And so we are emphasizing the term
skills, all those skills are really just
a subset of the context that we support.
But really we're committed to this
notion of, you know, whether it's skills
or it's context or it's tiles or it's
specs, we help you create it, we help
you own it, we help you develop it over
time, and we think that will become the
core competency for software development
organization.
Awesome. And if you're interested to
learn more, why don't you head over to
testal.io where you can actually do a
lot of self-serve. You can go ahead and
discover, you can use, download and use,
you can even publish your own context,
skills, and tiles. And and if you wanted
to learn more, maybe you have a more
complex, larger environment that you're
trying to use context to enable, why
don't you reach out at
contact@testal.io.
But for now, thank you very much, Guy,
that was really enlightening about about
how the space has evolved and changed
and and and how Testal is positioned in
that. Yeah, thanks, Simon, and you know,
again, a good opportunity to say thanks
for the amazing team that we have that's
been building all this thing and I'm
just here sharing a bunch of their
wisdom and hard work. But and thank you
to the amazing users and early customers
that have helped shape a bunch of these
practices and truly are shaping the
future of software development. So
looking forward to hearing from more of
you amazing people and organizations as
you reach out.
Thanks very much and tune in to the next
episode.
