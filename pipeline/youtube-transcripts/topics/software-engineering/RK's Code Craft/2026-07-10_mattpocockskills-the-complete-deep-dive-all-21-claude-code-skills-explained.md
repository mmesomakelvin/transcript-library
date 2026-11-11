---
video_id: "M3jYrNKQjEg"
title: "mattpocock/skills — The Complete Deep Dive: All 21 Claude Code Skills Explained"
channel: "RK's Code Craft"
topic: "software-engineering"
published_date: "2026-07-10"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=M3jYrNKQjEg"
duration: 1180
word_count: 3797
---
One GitHub repository crossed 160,000
stars in about 90 days, and it did it
without being a framework, a library, or
a product. It's something stranger than
that. It's one engineer's actual dot
cloud configuration folder, Matt
Pocock's, published for anyone to copy.
Matt is a well-known TypeScript
educator, and this is the setup he
genuinely works out of every day.
Over the next 20 minutes or so, we're
going to walk through every single skill
inside it. What each one does, when
you'd reach for it, and which failure of
AI coding it's built to fix.
No skipping, all of them. [music]
Framing is deliberately blunt. Skills
for real engineers, not 5 coding. And
that distinction really matters.
5 coding is what happens when you let an
agent sprint ahead on gut feeling. Lots
of code produced fast and often subtly
wrong.
These skills are the opposite instinct.
They're the boring, proven engineering
habits, specifications, tests, reviews,
and shared language. Encoded so an AI
agent actually follows them every single
time, instead of only when you remember
to ask.
Everything in this repo exists to fix
four specific ways that AI agents fail
you.
First, misalignment. The agent
confidently builds the wrong thing
because it misread what you actually
wanted.
Second, verbosity. Without your
project's vocabulary, it rambles and
re-explains itself, burning tokens as it
goes.
Third, broken code. With no real
feedback loop, bugs [music] sail
straight through to you.
And fourth, architectural decay. Every
change is locally reasonable, but
together they slowly rot the code base
into a ball of mud.
Hold those four in your head, because
every skill we're about to see is aimed
squarely at one or more of them.
Chapter 1, the engineering skills.
These are the ones that shape how code
actually gets specified, built, and
reviewed. There are 16 of them. Nine you
invoke yourself by name when you want
them, and seven the agent reaches for
automatically as part of doing the
[music] work well.
We'll take them in order, the ones you
drive yourself first, then the ones the
agent reaches for on its [music] own, so
you can see how they naturally hand off
to each other.
&gt;&gt; First, the simplest one, ask Matt. It's
a router, the front door to the entire
toolkit. Here's the problem it solves.
Once you've installed 20-odd skills, the
hardest part isn't using them, it's
remembering which one fits the moment.
You're staring at a vague ticket, you
freeze, and you fall back to just
winging it.
So, instead you type ask Matt, describe
what you're trying to do in plain
English, and it points you at the right
workflow. Maybe grill with docs to align
first, maybe straight to wayfinder
because the work is huge. Small skill,
but it's the piece that turns an
intimidating wall of commands into
something you can navigate on day one.
In practice, it earns its keep on day
one and after long breaks when the
toolkit feels like a wall of unfamiliar
commands.
You describe the situation in a
sentence. It suggests the right starting
move. And you're off instead of quietly
defaulting back to old habits and
skipping the skills entirely, which is
how most tools end up unused.
Grill with docs is the skill most people
fall in love with first. Before you
write a single line of code, it
interviews you, and I mean it really
interrogates the problem branch by
branch, then writes what it learns into
a context.md file and a set of
architecture decision records right in
your repo. Say you're adding billing to
an app.
Instead of the agent silently guessing
what a subscription or an invoice means
in your world, it asks, you answer, and
now that vocabulary is written down and
shared. Every session after that is
shorter and sharper because you're both
speaking the same language. As
domain-driven design puts it, with a
ubiquitous language, the conversations
and the code all come from one model.
This is the skill that kills
misalignment at the root.
In practice, the real magic is that
context file. Once it exists, you stop
re-explaining your product every single
session, which directly attacks the
verbosity problem, because the agent
already knows your nouns. And because
the interview surfaces disagreements
early, you catch the building the wrong
thing mistakes while they're still a
cheap conversation, not an expensive
pull request.
Triage moves issues through a state
machine of roles and statuses. Most
backlogs are really just a junk drawer,
a hundred half-formed tickets nobody's
looked at in weeks. Triage gives every
issue a defined place, who owns it, what
state it's in, whether it's even ready
to be worked. So, before you start
building, the work is sorted and
categorized instead of piled up. It's
the unglamorous discipline that keeps a
project's queue from turning into
archaeological layers of good
intentions.
In practice, you reach for it the moment
your issue list has quietly grown past
what you can hold in your head. It won't
write a line of code, but turning an
intimidating pile into clearly staged,
owned items is very often the exact
thing standing between you and actually
starting the work.
Improve code base architecture scans
your whole code base for design
problems, hands you an HTML report of
what it found, and then walks you
through fixing the ones you choose. The
trick is cadence. You run it every few
days, not once a year in a panic. Maybe
it flags a module that's quietly become
a god object or duplicated logic
drifting out of sync. You pick which to
tackle and it guides the refactor.
This is Kent Beck's principle made
operational, invest in the design of the
system every single day, and it's the
main defense against a code base slowly
rotting into a ball of mud.
The anti-pattern it prevents is the big
bang refactor, the one where you finally
can't stand the mess, block out a whole
week, and rewrite half the app while
everything else stops.
Little and often beats that every time.
A short scan every few days keeps
entropy from ever compounding to crisis
level.
Setup runs once per repository and it's
the first thing you do. It wires the
whole suite into your specific world,
which issue tracker you use, GitHub,
linear, or just plain local text files,
the triage labels you care about, and
where your documentation should live. It
sounds mundane, but this is what lets
every other skill behave like it belongs
to your project instead of fighting your
conventions. Skip it and you'll be
correcting the agent constantly. Do it
and the rest just fits.
The mistake people make is skipping it,
then wondering why the agent keeps
filing issues in the wrong place or
inventing labels you don't use. Two
minutes here saves you correcting the
same thing 20 times later. It's the
least glamorous, highest leverage two
minutes in the whole suite.
The spec is beautifully narrow. You've
already had the conversation, maybe a
long back and forth where you and the
agent figured out exactly what to build.
To spec takes that conversation and
synthesizes it into a real published
specification on your tracker. No new
interview, no relitigating decisions. It
just captures what you already agreed
and makes it official and actionable.
It's the fastest possible path from we
talked about it to it's written down, so
the decision doesn't evaporate the
moment you close the tab. In practice,
reach for the instant a good discussion
is about to scroll out of view. The
decisions you just made together are
worth far more written down than half
remembered next week, and this is the
zero friction way to capture them before
they evaporate.
To tickets takes a plan or a spec and
breaks it into traceable tickets, small
end-to-end slices, each with its
blocking edges explicitly declared. So
instead of one giant do the feature
ticket, you get an ordered
dependency-aware work list. This must
land before that, these two can go in
parallel. It outputs as local text or as
native links in your tracker.
The payoff is that the agent can execute
in the right sequence, and you can
actually see the shape of the work
before a single line is written. The
failure it prevents is the giant vague
ticket that the agent quietly interprets
three different ways across three
sessions.
Small, ordered, dependency-aware slices
make each piece unambiguous and
independently verifiable. You always
know exactly what done looks like for
the very next step.
Implement is the workhorse of the whole
suite. You point it at a spec or a set
of tickets and it builds, but not
recklessly. It drives test-driven
development at the seams you agreed on
and it runs a full code review before it
ever commits anything. So, the code that
lands has already been tested and
critiqued. This is the skill that turns
all that upfront alignment and planning
into actual shipped work with the
guardrails switched on the entire time
rather than bolted on afterward.
In practice, this is where all that
upfront alignment finally pays off.
Because the spec and the shared language
already exist, Implement rarely goes off
the rails and its built-in test and
review gates mean broken code gets
caught before it ever reaches you.
It's the one skill that ties specify,
build, and review into a single motion.
Wayfinder is for the work that's simply
too big for one session, a migration, a
gnarly refactor, a feature where you
don't even know the right approach yet.
Instead of pretending it can one-shot
the whole thing, Wayfinder lays the work
out as investigation tickets on your
tracker, then resolves them one at a
time until the path forward becomes
clear. It's planning as navigation. You
don't need the entire map upfront, you
just need to see the next turn.
And because it lives on your tracker,
you can pause and resume across days
without losing the thread. The
anti-pattern here is asking an agent to
one-shot a huge migration and watching
it confidently produce a plausible,
well-formatted, completely wrong
megadiff. Wayfinder simply refuses that.
It insists on learning the terrain one
ticket at a time, so the plan is
grounded in what it actually discovered,
not what it guessed before it had
looked.
Prototype builds throwaway code to
answer a design question and the word
throwaway is the whole point. Maybe
you're unsure how some state machine
should behave, so it spins up a tiny
runnable terminal app you can poke at.
Or you can't decide between three
layouts, so it generates all three
behind one route and lets you flip
between them. You learn the answer
cheaply without committing to the code
and then you delete it on purpose.
It's a way to buy certainty before you
spend real implementation effort on the
wrong design. In practice, it's a way to
be wrong cheaply and safely. 20 minutes
on a throwaway to learn the right shape
saves you days of carefully building the
wrong thing.
The only discipline it demands is that
you actually throw it away afterward. It
answered a question. It was never meant
to be production.
Diagnosing bugs replaces guessing with a
disciplined loop. Reproduce the bug
reliably, minimize it down to the
smallest failing case, form a
hypothesis, instrument the code to test
that hypothesis, fix it, and then add a
regression test so it can never silently
come back. That sequence matters most on
the bugs that make you want to change
random lines and pray, the Heisenbugs
and the performance regressions.
It's the difference between fixing the
symptom you happen to notice and
actually understanding why the thing
broke. The anti-pattern it kills is
change a line and pray, poking at code
hoping the bug just goes away, then
declaring victory the moment the symptom
vanishes.
The loop forces you to genuinely
reproduce and understand the cause, and
the regression test at the end makes the
fix permanent instead of a coincidence
that quietly regresses next month.
Research is the antidote to an agent
confidently making things up. When
there's a real technical question, how
does this API actually behave? What's
the correct way to configure this?
Research investigates it against
high-trust primary sources instead of
the model's fuzzy memory and write cited
findings straight into your repo as
markdown. And it runs as a background
agent, so you keep working while it goes
off and reads the actual documentation.
What you get back isn't a vibe, it's an
answer with receipts you can check. In
practice, use it the moment you catch
yourself trusting the model on a
specific factual detail, an API
signature, a config flag, a version
difference. It goes and reads the real
source, sites it in your repo, and runs
in the background so it costs you no
momentum.
The output is checkable, which is
exactly what you want before betting a
design on it.
TDD red, green, refactor is the
discipline underneath almost everything
else here. Write a failing test, make it
pass with the simplest thing that works,
then clean it up one vertical slice at a
time. The reason it matters so much for
AI agents is feedback. A tight test loop
keeps the agent honest, catching drift
the instant it happens instead of 10
files later. As the pragmatic programmer
says, always take small deliberate
steps. The rate of feedback is your
speed limit.
When Implement builds something, this is
the engine turning under the hood. In
practice, the reason it matters so much
with agents is that they'll cheerfully
generate 100 lines that look correct and
simply aren't.
A failing test first turn should work
into does work, one slice at a time.
It's the tightest feedback loop you can
hand the agent, and tight loops are
precisely what keep it from drifting off
course.
Domain modeling is grill with docs, but
running continuously as the project
grows. It actively keeps your language
honest. It challenges the terminology
you and the agent are using against the
glossary, stress test it with edge
cases. Wait, is a canceled order still
an order? And updates context.md and
your decision records inline as the
answers change. Language drifts silently
over a long project, and drifted
language is where misunderstandings
breed.
This skill is the maintenance that keeps
the shared model from quietly going
stale. The failure it prevents is slow
semantic drift, where a word like user
quietly starts meaning three different
things in three corners of the code
base, and nobody notices until a bug
traces straight back to the confusion.
Continuously sharpening the model keeps
the language coherent, and coherent
language is what keeps the code
coherent, too.
Codebase design is a shared discipline
and vocabulary for designing deep
modules. The idea, straight from a
philosophy of software design, is that
the best modules are deep. They pack a
lot of functionality behind a small,
simple interface placed at a clean seam.
A shallow module, lots of surface,
little value, leaks complexity
everywhere it touches. So, when you're
building something new or refactoring,
this skill pushes toward interfaces that
are easy to use and implementations that
hide the mess.
It's how you keep complexity contained
instead of smeared across the whole
system. In practice, the tell of a
shallow module is that using it is
almost as complicated as just writing
the thing yourself. Deep modules invert
that simple to use, complex inside,
complexity contained.
Applied consistently, this is what stops
a code base from slowly accumulating the
thousand small leaks that eventually
make every single change feel scary.
Code review is smarter than a single
pass. It runs two reviewers in parallel
as separate subagents, each with one
job. One reviews against your coding
standards and a baseline of classic code
smells, the Fowler catalog of things
that quietly rot code. The other checks
something completely different. Does
this diff faithfully implement the spec
it claims to? Quality and correctness
are genuinely different questions, and
answering them separately means neither
gets glossed over.
It all happens before the commit, so
problems are caught while they're still
cheap to fix. In practice, splitting the
review is exactly what makes it
thorough. A single reviewer trying to
hold both coding standards and spec
fidelity in mind at once tends to do
neither really well.
Two focused subagents each do one job
properly, and because it runs before the
commit, the cost of any finding is a
quick edit, not a painful revert.
&gt;&gt; Chapter two, the productivity skills.
These are less about code itself and
more about thinking clearly and handing
work off cleanly.
There are five of them, and they're the
connective tissue that keeps the
engineering skills from happening in a
vacuum.
You'll notice a theme here. Several of
these are the very same [music]
instincts as the engineering skills,
interviewing, capturing context,
questioning hard, just pointed at
thinking and collaboration instead of
code.
&gt;&gt; Grill me is relentless interviewing for
the decisions that aren't about code.
Should we even build this? Which of
these three directions? It keeps asking
branch by branch until every fork in the
decision tree is actually resolved. No,
it depends. No, we'll figure that out
later. It's the same instinct as grill
with docs pointed at strategy and
product thinking instead of a domain
model.
And it's the cheapest possible insurance
against committing to a direction that
everyone quietly had doubts about, but
nobody voiced. In practice, it's the
meeting you really should have had
before you started building anything.
Every it depends you force to a decision
now is an expensive reversal you avoid
later.
It's mildly uncomfortable in the moment
and remarkably cheap in hindsight, which
is exactly why people skip it and
exactly why they regret skipping it.
Handoff solves a problem every long task
eventually hits, context evaporating
between sessions. It compacts your
entire conversation, the decisions, the
dead ends, the current state into a
clean handoff document so another agent
or future you next week can pick the
work up without missing a beat. Instead
of re-deriving everything you already
worked out, the next session starts
warm.
It's the antidote to that sinking
feeling of opening yesterday's task and
having no idea where you left off. The
failure it prevents is context collapse,
that moment a session ends and all the
hard-won understanding just evaporates.
A good handoff document means the next
agent, or yourself on Monday morning,
restarts warm and oriented instead of
re-deriving the entire mental model from
cold.
Teach turns the agent into a tutor that
actually remembers. It guides your
learning across multiple sessions using
the current directory as a stateful
workspace, so it tracks what you've
covered, what you struggled with, and
what's next instead of starting from
zero every conversation. Say you're
learning a new framework over a week,
Teach builds on each session rather than
repeating the basics. It's less answer
this one question, more take me from
here to competent over time.
In practice, it's the difference between
asking scattered one-off questions and
following an actual curriculum.
Because it remembers across sessions, it
builds on what you learned yesterday
rather than re-explaining it, which is
how you genuinely go from beginner to
competent instead of looping forever
through disconnected answers.
Writing great skills is the reference
you reach for when you start authoring
your own. Because the moment you've used
this suite for a while, you'll want to
encode your own workflows the same way.
This skill lays out the vocabulary and
the principles that make a skill
predictable. How to structure it, how to
name things, what makes an agent follow
it reliably. It's how the toolkit stays
consistent as it grows. Your custom
skills end up behaving like the ones
Matt shipped instead of surprising you
at the worst moment. In practice, you'll
want this the first time one of your own
custom skills behaves unpredictably.
The principles here, clear vocabulary,
tight scope, a predictable structure,
are what make a skill reliable. So, your
extensions feel like a natural part of
the suite rather than a wild card that
surprises you at the worst possible
time.
And grilling is the quiet engine
underneath two of the skills we've
already met. It's the reusable interview
loop that powers both grill me and grill
with docs. The relentless
branch-by-branch questioning factored
out into one place, so any skill can
call it whenever it needs to resolve
ambiguity. You almost never invoke it
directly. It's the shared muscle the
others flex.
And it's a nice illustration of the
code-based design idea in action. One
deep, well-made capability reused
everywhere instead of copy-pasted. It's
a small but telling piece of design.
Rather than copy-pasting the interview
logic into every skill that happens to
need it, they built it once deeply and
share it everywhere.
That's the code-based design eating its
own dog food. And it's precisely why the
questioning feels equally sharp no
matter which skill happens to invoke it.
&gt;&gt; So, that's all of them, but the real
trick is that none of these work alone.
They compose. Grill with docs sets the
shared language. To spec into tickets
shape the work into ordered slices.
Implement builds it with TDD and code
review guarding the gates the whole way.
Domain modeling keeps the language
honest as you go. Improve code-based
architecture keeps the structure from
rotting. And handoff carries the whole
thing cleanly to the next session. It
isn't magic, and it isn't a framework.
It's a set of engineering habits chained
together
and encoded so an agent follows them
every time.
And it is genuinely one command to
install. npx skills add
mattpocock/skills
The link is in the description. Now go
build like a real engineer.
