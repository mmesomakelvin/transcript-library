---
video_id: "p37qo3oLai8"
title: "The Easiest Way to Get Ahead With Claude Code"
channel: "Simon Scrapes"
topic: "ai-llms"
published_date: "2026-03-21"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=p37qo3oLai8"
duration: 819
word_count: 2998
---
I've spent over 200 hours now inside of
Claude code, not just building one-off
skills or running quick prompts, but
designing full systems that run entire
parts of my business. And here's what
I've realized. There's this idea called
the 80% problem. AI gets you most of the
way there, but that last 20% is where
everything falls apart. The outputs
start drifting, it forgets your context,
and it starts making the same mistakes
again and again. And as a result, you
end up spending more time fixing it than
doing the work for yourself in the first
place. And I see this constantly with
Claude code. People building skills,
getting decent results, and then hitting
the same wall. And it turns out there
are four patterns that almost completely
fix it. They're simple, and once you see
them, everything else is going to click.
So, in this video, I'll show you what
they are and how to start using them
right away. Let's get straight into it.
So, here's what's happening right now
with most people using Claude code.
They're discovering skills, they build
one for writing content, maybe another
for research, maybe something for
outreach, and each one works fine on its
own, but the problem is none of them
talk to each other. And worse, most of
them are built incorrectly. So, think
about it like this. Imagine you run a
business, and every single morning you
hire a brand new employee. They've never
met you, they don't know your brand,
they don't know your audience, they
don't know what you did yesterday, and
you have to explain everything from
scratch every single time. And I know it
sounds like a silly analogy, but that's
effectively what most people are doing
with Claude code right now. Every
conversation and skill file starts from
zero. Your content skill doesn't know
what your outreach skill wrote last
week, your research skill doesn't know
what topics you've already covered.
There's no shared memory, there's no
shared standards, no shared anything.
And so, you end up spending half your
time just re-explaining context, pasting
in brand guidelines, reminding Claude
what tone of voice to use, correcting
the same mistakes over and over. This
might feel familiar, and that's the 80%
problem in action. And don't get me
wrong, Claude code is incredibly
powerful, but without the right system
around it, you're going to be stuck
fixing that last 20% forever. So, you've
probably got skills that work
individually, but without these four
patterns, you are still the bottleneck
holding everything together. So, let's
fix that, and we're going to start with
the most fundamental pattern. So,
there's a saying that's been going
around the Claude Code community, and I
absolutely love it cuz it's spot-on. AI
context is like milk. So, it's best
served fresh and condensed. And this is
the pattern that underpins everything.
The number one reason people get bad
outputs from Claude Code is not bad
prompts, it's not bad skills, it's
context pollution. So, let me explain
what I mean. Your context window is not
unlimited, it's finite, and everything
Claude is holding in memory at any given
moment, your instructions, your skill.md
files, your conversation history, the
outputs it's just generated, all of that
is competing for the same limited space.
And when that space fills up with stale
information, like your failed attempts,
your errors, your old corrections, or
irrelevant details, Claude is going to
get progressively worse. So, it's
drifting from your instructions, it's
starting to slow down, and it's not
because it's broken, it's because you've
overwhelmed it. And this is what people
call context rot. And almost everyone is
doing this without even realizing
because it happens quicker than you
think. And just because a context window
of a model is large, it doesn't mean we
can fill it and still expect the same
performance. So, there's a really
popular Reddit post called I was wrong
about agent skills and how I refactored
them. And the story is so common that I
had to share it. This developer started
building skills the day they dropped,
and within 2 weeks he had a Claude first
skill at 1,131 lines, a UI skill at 850
lines, and a Next.js skill at 900 lines.
And every time Claude activated multiple
related skills, the context window he
was using just exploded. So, loading
five to seven skills was like loading
5,000 to 7,000 lines into the context
window, flooding it immediately. So,
naturally, he was getting slow outputs,
drifting instructions, and Claude
flat-out ignoring parts of his skill
files that were necessary. So, here's
the principle. In everything you do with
Claude Code, you want the right context
at the right time, and nothing more. And
this applies everywhere, it's not just
skills, it's everywhere. So in your
skill.md files, keep them under 200
lines. The skill.md should be just a
table of contents, not an encyclopedia.
All of the deeper knowledge should sit
inside the reference files, and Claude
pulls them in only when it needs them,
bit by bit, not all at once. So each
time Claude code hits a process step,
step two, let's say, on a skill.md file,
it's able to just load in the most
relevant context and all of the relevant
reference files, and then unload it
before it hits step three. And in your
claude.md, it's the same principle. Keep
it lean, point to your reference files
for the detailed stuff. And if your
claude.md is 2,000 lines, Claude is
ignoring half of it because the
important rules are probably just
getting lost in the noise. Then even in
your conversations, you should be using
the slash clear command between
unrelated tasks, always. And when a
conversation's running long, make sure
to compact it, too, using the slash
compact command. So don't wait until
Claude auto compacts it, because by that
point, you've already been operating
this degraded output mode for ages. So
compact it proactively to keep it fresh.
And if you really want to level this up,
use planning frameworks. So I use
something called GSD, or the Get
Done framework, which basically breaks
down complex tasks into phases. So each
phase gets a clean context, you plan in
one session, you execute in another, you
review in a third, and each one starts
fresh with just the context it needs for
that specific phase, keeping it narrow.
And I'm even going to give one bonus tip
for power users here. If you want to
compress your context even further, you
can use mermaid diagrams instead of
text. A few hundred tokens of mermaid
syntax, basically process diagrams, can
convey what would take thousands of
tokens in written descriptions. And LLMs
can actually parse structured diagrams
more efficiently than paragraphs. So the
format of your context matters just as
much as the content itself. So now we've
got the most important one out the way,
pattern one. So context is milk. It
fresh and condensed is best, and only
load in what's needed at that exact
moment. Get this right and everything
else we talk about becomes 10 times more
effective. So, now that you understand
the foundation, keep context lean, keep
it fresh, keep it relevant. Here's the
next question. If every skill should be
lean, how does Claude actually know
about your business? How do you put
enough context in there? How does it
know your voice, your audience, your
standards without having to re-explain
every single time? Well, that brings us
onto pattern two. So, instead of each
skill carrying its own business context,
or worse, you pasting it in manually
every single time, you create one single
source of truth that every skill can
access. So, shared brand context, or I
call it your business brain. And this is
where pattern one and pattern two work
together in sync. Because your business
brain follows the same rule, fresh and
condensed, you're not building a 2,000
line brand bible. You're building a
tight, focused shared context files, or
set of files. So, you'll have your tone
of voice, your audience, your ICP, your
positioning, your standards. So, 50
lines to 100 maybe max, and that's it.
profile. And then, every single skill
you build just references that
foundation at the right point. So,
brings it in at the right process step,
like we mentioned. So, when your content
skill writes a LinkedIn post, it already
knows your voice and brings it in at the
right time. And when your research skill
pulls data, it already knows what topic
matters to your business. And you
guessed it, when your outreach skill
drafts a message, it already knows your
positioning. So, you can literally set
this up once, right? And every skill
inherits all of the context at the right
time automatically. So, there's no more
copy pasting, no more correcting the
same tone of voice issues, and no more
re-explaining who your audience is for
the hundredth time. And because it's
lean, because it follows pattern one, it
doesn't bloat the context window. And
this is the difference between
onboarding that new employee every
single day versus someone who's been
working on your team for a year. They
already know the brand, they know your
standards, and the output quality as a
result is going to jump immediately
because the foundation is already there.
So, pattern two is one business brain.
So, you set it up once, and Claude never
forgets who you are again. Okay, so now
every skill shares the same brain. They
know your brand, they know your
standards, and they're lean. But, here's
the thing, they're still operating in
isolation. So, your marketing skill
produces content, your strategy skill
produces analysis and research, but they
have no idea what each other is doing.
And in real business, that's not how
things work, right? Which brings us on
to pattern three. Now, before we talk
about that, my YouTube analytics tells
me that 94% of you are not subscribed,
but are still watching this. So, if that
is you, then do me a favor and head down
below, subscribe to the channel so you
can get more value from my content in
the future. So, pattern three is a
pattern that takes you from having a
collection of isolated tools to having
something that actually feels like a
team operating together. So, it's based
on a really simple idea. Skills should
be able to hand off to each other. And
right now, most people are running one
skill, getting the output, then manually
taking that output and pasting it into
the next skill, or asking Claude to do
the same. So, you run your research
skill, copy the results, ask Claude to
take that research, and then run your
content skill, copy that output, put it
into your repurposing skill, etc., etc.
But, what if your skills could actually
just talk to each other directly?
Wouldn't that save a lot of time? So,
for example, you run a content strategy
skill, it produces a plan with topics,
the distribution channels, the angles
you want to cover. And then in your
content creation skill, it's able to
pick that up automatically and execute
against that plan. So, each piece of
content already knows the strategic
context, the audience, the voice to use,
because it's got all of that from the
skill that came before it. And then your
repurposing skill takes that content and
adapts it for all of the different
platforms, and it doesn't need you to
explain the context again, because it
inherited everything else from the chain
before that. So, effectively, workflows
between skills. And here's what connects
this back to pattern one so well. Each
skill that runs in a chain can operate
in its own context space. So, your
research skill can go deep for thousands
of tokens of data, do all of the heavy
lifting, and then hand back a clean
condensed summary to that next skill.
The next skill's context stays fresh and
it's not polluted at all by all that raw
research data. And this is extra
important for founders, right? Because
you wear every single hat. You you run
content, sales, operations, strategy,
and there is massive overlap between all
of those. So they should never live in
isolation. Your marketing strategy
should inform your content, your content
performance should feed back into your
strategy, and your operations should
support both. So when skills do
collaborate, they do exactly that. One
skill's output becomes another skill's
input, and you stop being the bottleneck
moving information around. So now that
your skills share the same brain, they
can hand off work to each other. There's
already a massive upgrade from what you
had before, but here's what's still
missing. The system is still static. It
doesn't get better over time. It makes
the same quality of output on day one as
it does day 30. And that's pattern four.
And honestly, this is the one that blows
people's minds. So this is the pattern I
didn't even know was possible until I
started building it myself. And it
changes everything about how you think
about skills. So Boris Cherny, the guy
who actually created Claude code at
Anthropic, shared his entire workflow
earlier this year, and it went viral.
Developers were actually losing their
mind over it. And the most interesting
part wasn't the fancy stuff. It was one
simple practice. So at Anthropic, every
team member maintains their own
Claude.md file in their code base. And
here's the rule. Anytime Claude makes a
mistake, they don't just fix the
mistake. They add the correction to
Claude.md so Claude knows not to do it
next time. During code reviews, they
literally tag Claude and ask it to
update its own instructions. Now, the
longer you work with that kind of
system, the smarter it gets. Because
you've effectively built a
self-correcting loop. And this is
exactly what self-learning means for
skills. So every time a skill runs and
produces something great, the system
captures what worked and when something
falls flat. And those learnings get fed
back into the next run, so the next run
is even better. And I'm not talking
about anything complicated here. This is
so simple in practice. It's basically a
learnings file. We can call it
learnings.md. It says, "Here's what
worked, here's what didn't work, and
here's what to do differently next
time." And you can segregate that on a
per skill basis. And the compounding
effect is massive here because over the
course of a week, 2 weeks, a month, the
system has run hundreds of tasks, you've
given it a bunch of feedback, and it's
absorbed all of those learnings. So,
your content is getting tighter, your
skills are getting better, your research
is getting more targeted, and it's not
because you're manually tweaking things.
The system is able to tune itself. So,
in my own business, we even go one level
further by using an additional wrap-up
skill that runs at the end of every
session to make sure all learnings are
captured and any associated files inside
that skill.md and the Claude.md are in
sync. So, you can actually grab that
full system called the Agentic Operating
System, and everything we've spoken
about today, by the way, in my community
linked down in the description below. It
takes about 10 minutes to set this all
up. But effectively, what we're doing
here, pattern four, is self-learning.
Every mistake that Claude makes then
becomes a rule, and your system gets
smarter while you sleep. And of course,
you have to clean that up over time and
make sure that you're not bloating
context, but you've got a self-learning
system here. So, let's now zoom out
because when you put all four of these
patterns together, you've basically
solved that 80% problem we spoke about
at the start. Context is milk means you
only feed Claude what it needs when it
needs it. It's fresh, it's condensed
context, and doesn't bloat that window.
You then have one business brain, which
means every skill knows who you are. It
has that shared context that's lean
enough to load without polluting the
context window. Then skill collaboration
means they hand off work to each other
without you being the middleman. And
again, that keeps the context clean. And
then self-learning means the whole thing
is improving over time without too much
manual inputs. And when you stack all
four together, you've basically built
yourself a business operating system, an
Agentic Operating System. And it's the
difference between just having a set of
tools that you can use and having an
actual team that's going to run and
operate without you. Which leaves us
only with one question. How do you
actually build this logic and what does
it all look like when it's running
day-to-day? Well, check out this next
video to find out.
