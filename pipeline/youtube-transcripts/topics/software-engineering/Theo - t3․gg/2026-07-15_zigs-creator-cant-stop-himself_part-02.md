---
video_id: "kAjNWanR3n8"
title: "Zig's creator can't stop himself"
channel: "Theo - t3․gg"
topic: "software-engineering"
published_date: "2026-07-15"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=kAjNWanR3n8"
duration: 3606
word_count: 3998
chunk: 2
total_chunks: 4
parent_video_id: "kAjNWanR3n8"
---
engineering [&nbsp;__&nbsp;] It sounds insane,
but when you find the problems and they
are at this scale, setting up a system
to allow the agents to prevent it or fix
it is a new type of engineering. And
it's cool to see it in practice and
written up as well as this is. There is
no piece of like media out there that
does this good of a job of explaining
something this chaotic and new. And it's
a weird artifact. Like I bet this blog
post will be referenced in five years
for very interesting reasons as the
start of this shift. It's super cool and
I get why he took so much time to
rewrite it.
Rewrite is not the right word. Writing
this blog post. I'm sure he didn't
rewrite this a bunch. And I know he
didn't have Claude write a lot of it.
This is a great Claudism here, too. I've
had Claude write longass comments
justifying things that it thinks are
okay. And he told it specifically, if
you need a paragraph long comment to
justify why the workound's okay, the
code is wrong. Fix the code. I like this
a lot. I'm going to steal this.
Specifically, he had to do this cuz
Claude was interpreting let's get all
the CR to compile as stub out the
functions with compilation errors.
Claude also started adding suspiciously
long explanatory comments to document
workarounds. So he added that rule
specifically for that. And then the
smoke tests models love saying smoke
tests. Once cargo check passed, getting
it to compile and run was next. It had
linker errors and then it panicked
immediately on start. So then you had to
get it to run the bun test like helper.
Once that worked, they could start
actually running the tests. He had a new
loop for that. It kept going. A lot of
the tests had memory leaks which is
crazy because Rust but again line for
line it's using a lot of uh unsafe not
going to have the benefits immediately.
He also noticed that the tests were
exhausting the maximum number of TCP
sockets on the machine. Tests were
reading and writing gigabytes of stuff
to disk and tests were spawning 10,000
plus processes. I had this problem too
with a big port I was working I hinted
at it earlier. I was working on porting
Go to Rust inspired by what he did here
and I had the processes spin up and fail
and memory leak and crash the machine so
many times that I had to build a lot
around that too. As he said, he needed
something stronger than please. So we
used systemd run with croups to limit
memory and CPU usage and isolate PIDs by
their namespace. The machine ran out of
disk space and crashed several times
regardless. Yep. And then they got the
test suite passing in CI. 2 days after
the first run, the failing list was down
from 972 test files to 23. A day and a
half after that, Linux went fully green,
and for the first time, it felt like
this Rust rewrite was actually going to
work. That is insane. Just crazy. The
rest of the time leading up to merging,
it was straightforward. A workflow that
looped on fixing CI test failures for
each platform until there were no more
test failures. Several workflows for
Windows related cleanup to ddup code, to
reduce unsafe usage, and to generally
clean up some stuff. Then he merged it.
Once 100% of the test suite passed in CI
on all platforms and he manually
verified the tests were actually running
and not being skipped. He ran a bunch of
commands locally to test things. Then he
pressed merge. Merging into main isn't a
versioned release. This is another big
thing that I've been emphasizing. Maine
shouldn't be prod anymore because
merging is too useful to have it also be
deploy. I have an action that you can
manually trigger in my projects that
will take what's on main and move it to
a prod branch and then trigger a deploy
manually rather than having main
autodeploy because then I can more
freely merge to main if things break on
staging or when I manually build the
package revert change etc. So the merge
to main wasn't a release it was
confidence to start really making sure
this could happen. This ended up being
over 6,500 commits and 1.78 million
lines written or rewritten. As I hinted
at at the start, this was an insane
number of tokens premerge. 5.9 billion
uncashed inputs, 690 million inputs, and
72 billion cached input reads, which
would have been 165,000 if you paid API
price. Crazy to have this number public.
And I know it seems insane because it
is, but there's a few things we need to
recall. First, if this was done by
humans, it would have been three
engineers over a year. And that year
isn't just, oh, you lost three engineers
for that time. It's all other
development has to kind of be paused or
mirrored, which makes it either more
expensive or unrealistic. Instead, it
happened in just a few days. So if you
assume all three engines made 200k a
year and it would have taken three
years, this is still cheaper because
it's 165k in a week of edge time instead
of 200k * 3 in a year of time. But
there's two other layers I want to dig
into here because the first and arguably
most important is that this just
wouldn't have happened. If this would
have taken a year, they wouldn't do it
because there's too much other [&nbsp;__&nbsp;] to
do. as a shortterm experiment, it is
absolutely worth it just to to know if
it can happen and then if it does to go
further with it. So this isn't like 600k
versus 165. This is it didn't happen
versus 165k. But the other layer I want
to call out is that this is $165,000
right now. This is the most expensive
it'll ever be. This level of
intelligence is already accessible via
cheaper models because 56 soul just
dropped and it's way cheaper. And over
time, Anthropic and other labs will
release models that are this smart or
smarter for this price or lower. So, the
prices are going to keep getting better.
And when you factor in the margins that
Anthropic already spikes into their
product, between 50 and 80% from recent
rumors, this number is really not that
big in practice. So, yeah, 165K, big
scary number to have on the front. It's
going to get cheaper from here. It
wouldn't have existed otherwise. and it
was subsidized to all hell by the fact
that it was anthropic and this yeah this
just wouldn't have happened otherwise.
So people who think this number means
this that AI engineering is doomed or
whatever be [&nbsp;__&nbsp;] realistic. The idea
that you can spend under 200k to port a
project as big and important as bun to
an entirely different language is a
thing that wouldn't have even been
fathomable 6 months ago. It is
unbelievable how fast the stuff is
moving. The most wrong I've ever been is
when I said we hit a ceiling. We are
blasting through any ceilings I thought
were there faster than I could have
imagined. And we're already getting dumb
comments. How can we say prices get
better? If anything like this continues,
it will get more expensive. No. Again,
use your brain. When new models come
out, they are either the same price or
more expensive because they are smarter.
At any given intelligence level, at any
given capability level, the price drops
constantly. So again, could a smarter
model come out that would be more
expensive for this? Perhaps, but you
don't need a smarter model. Fable 5 was
able to do it at this price. So as new
models come out that are just as smart
and cheaper, you can still do this for a
cheaper price. Will there be a new
smarter model you want to use for bigger
things? Perhaps. Will that model be more
expensive? Probably. But again, that
doesn't mean that what we're doing today
gets more expensive later. If you have a
task you can do today with an LLM and
then the same task with the same output
quality next year, on average that gets
five times cheaper year-over-year. So
yeah, I I've seen so much dumb
commentary around this number that it's
almost enough for me to crash out on
just that. But the dumb things that the
Zigg guy said are stupider. So we're
going to go there right after. I like
how he describes all of this as well. So
I'll read a bit more of what he said. If
he had three engineers working on this
for a year, they wouldn't have been able
to improve node compatibility, fix bugs,
fix security issues, or implement new
features, they never would have been
able to sacrifice that. The realistic
alternative was to do nothing and just
keep fixing bugs at the top of this post
forever. This is the bleeding edge of
what's possible today. Jared used a
pre-release version of Claude Fable 5, a
mythos class model. He also used Cloud
Code's new dynamic workflows, which
would keep 64 Clouds running for 11
days. He would have had to handwrite his
own harness to pull this off otherwise.
[&nbsp;__&nbsp;] didn't have to. This is why it's
one of the things I've been so positive
about quad code for. It's a really cool
thing. Since merging the Rustport,
they've done 11 rounds of security
review with the Claude Code Security,
which is the white labeled whitelisted
special Claude code that can do security
stuff, probably using Methos. They've
had a 24/7 coverage guided fuzzing on
every parser in bun. Only 4% of the code
is sitting inside of unsafe blocks. I
called them out for the unsafe thing
before, but the important piece is that
78% of the blocks are literally just one
line, usually a pointer that came from
C++ or a call into a C library. The
number should go down over time as they
refactor from a faithful Zigg port over
to idiomatic Rust, but they're going to
have to keep using the C and C++
libraries like JSC. So, there will
always have to be unsafes, unlike pure
Rust apps. The rewrite only introduced
19 regressions, which is crazy. He says
he doesn't say only here, but I will.
And most of the regressions came from
code that's syntactically identical in
both languages but semantically
different. He has some cool examples
here. Link in the description if you
want to see all of these syntax things.
But we're a vibe coding channel now. We
don't read syntax. Joking, but I want to
get into the other fun details here.
Specifically, the improvements. He fixed
128 bugs that are still reproducible in
the latest non Rust version back in
1314, which is the last Zigg one. They
reduced memory usage meaningfully
because of the cleaned up uh memory
utilization. They fixed every
instrumentable memory leak, which is
kind of crazy. In bun 1314, this build
process would slowly leak. So when you
ran up to 2,000 builds, it would have
almost 7 gigs of memory leaked. And now
it it leaks a little bit, but way way
less aggressively. It would only have
600 megs, a tenth as much RAM being
used. The binary is a bit smaller, too,
which is cool. Now it's 20% smaller on
Linux and Windows as a result of other
changes they made. It's two to 5% faster
which is pretty cool and it's already
been launched in production by plenty of
things including cloud code. Prisma
using it with Prisma compute and I
believe those are the only two examples
they have here but more coming very
soon. The team says it feels similar to
the zig codebase. They show syntax
examples so it hasn't been that bad for
them. Awesome. With one engineer using
fable and closely monitoring cloud code
we went from a start to 100% of the test
suite passing on all platforms in 11
days. One engineer can do a lot more
today than they could a year ago. I
absolutely agree. This is an awesome
write out up. Shout out to Jared. I am
sure nobody has anything stupid or rude
to say about this. How could you
possibly be dumb about something this
well written? This is going to be fun. I
have heard mixed things about Andrew
Kelly and I don't like calling out
individuals. When you call out my
friends, I'm going to read what you have
to say and if I have to do it publicly,
I will. So, here are Andrew Kelly's
thoughts on the bun rust rewrite.
remember creator of Zigg, he has
opinions. Let's see what he has to say.
Bun was almost inarguably the biggest
Zigg project and also a pretty heavy
contributor to Zigg both financially and
code-wise. And they've had a bit of a
rift. I personally know Jared put a lot
of work into trying to form a proper
Zigg community in SF and even like
hosting events and things. So, let's
read what he has to say. I'm already
getting mad just skimming. When Jared
joined the Zig community about 5 years
ago, I described him as someone who had
strong beginner energy. Referring to
Jared Sumar, one of the best engineers
I've ever known, as a beginner or having
beginner energy in your first sentence
sets up for quite a read, Andrew,
excited for you to call me a JavaScript
soy boy that has no idea what he's doing
after I give my thoughts. Back to the
article. He moved fast and tried a lot
of different stuff, jumping head first
into problems that he was not yet
equipped to solve, leading to mediocre
outcomes in terms of engineering, but
learning a whole heck of a lot in the
process. I see it as quite a healthy
attitude, particularly for young people
and students. This is the best way to
level up and learn new things. This is
such a pathetic attempt to look nice as
you belittle. We'll see where this goes.
You know, I would think that the
low-level engineering guy would want to
talk about the engineering and not this.
He's trying to make Jared sound like he
just learned how to code, not like a
very experienced engineer that we all
look up to. As Jared focuses efforts on
Bun, he began to attract attention. JS
being the most popular programming
language in the world, there are a lot
of potential eyeballs on a promising new
tool chain. The attention could have
been harnessed in a few different ways.
For example, he could have easily
achieved a solid living via
crowdfunding, even for San Francisco
standards. You guys have any good
examples of popular things that are
crowdfunded? Because I have a few.
Here's E18E, a very beloved thing in the
JavaScript ecosystem. It's the ecosystem
performance group. These guys look
through all of the packages we use and
find dead or undermaintained
dependencies in our tool chain. They are
so goddamn important and I have poured
quite a bit of money into supporting
them because again they need to be
successful. They need to do well. For
reference, they have raised a total of
$20,000.
$20,000
total from sponsorships, crowdfunding,
and individuals donating, including
individuals like the Chrome team
donating 10 grand and myself donating
five. And this is one of the most
important things in the JS ecosystem. 20
grand. I'm sure that's enough to fund
the SF standards. [&nbsp;__&nbsp;] delusional.
Absolutely delusional. This is somebody
who doesn't understand how little money
there is in donating to open source
[&nbsp;__&nbsp;] And now we get to where this
starts being very dirty. Having
graduated from the Teal Fellowship
School of Thought rather than
university, he was essentially groomed
from a young age into uncritically
embracing the Silicon Valley mindset.
and he took venture capital. I wonder if
somebody has a bone to pick. I can say
pretty confidently that everyone who is
currently betting on Zigg should
reconsider because the guy who makes
your language might crash the [&nbsp;__&nbsp;] out
at you for no good reason. From the
beginning, Jared was appreciative
towards the Zigg project. He credited
Zigg on the Bun website for the
project's performance achievements. He
sent monthly donations to the Zig
software foundation that amounted to 60
grand per year. Remember that thing I
said about donations just a minute ago?
The total budget for E18E, by the way,
link in the description. You should
donate to these guys. They're really
important. Was a third of how much Bun
was donating just to Zigg. So, the Zigg
Foundation was getting three times more
money than one of the most important
JavaScript foundations I can think of
because he raised VC money to use for
things like hiring engineers and
donating to the language foundation.
According to our friend Andrew, he
didn't have to do either of those
things, but he chose to, and it was
pretty cool of him. Even in his blog
post that's being referenced here about
the rewrite, he expresses what is
perceived to be sincere gratitude
towards the Zigg project. It is sincere.
However, once Bun became a VC backed
startup, he started racing towards the
finish line. This is so obvious that you
do not know Jared at all or you're
willfully trying to misrepresent him
that it's crazy. Jared's whole thing
from day zero, from when I first met
him, was pushing to 11, going way harder
and way further than any human should,
contributing on GitHub so much that the
one day he didn't have any commits was
suspicious, got called out by Dax, and
turned out to be the day he was
discussing the acquisition. This is a
person who doesn't know how to not race.
He's either not moving, which means he's
asleep, or he is going to like
unbelievable speeds to get wherever he
is trying to. Trying to accuse him of
doing this cuz he's VCbacked instead of
him just being like this means you don't
know jack [&nbsp;__&nbsp;] [&nbsp;__&nbsp;] about Jared and
you better shut your goddamn mouth. Now,
instead of working on free and open-
source projects, learning and growing
with the community, Jared was running a
business. No, this is just how he does
things. Remember earlier when you said
that he moves fast and tries a lot of
different stuff, jumping head first into
problems? Seems like you know this trait
of his and instead of acknowledging this
trait of his, you're trying to
dishonestly represent him as other
because he was successful and raised
money. You're mad at him for doing what
it took to be successful in the space
because he will do whatever it takes to
make his [&nbsp;__&nbsp;] happen because that's how
Jared is. It was at the point where he
suddenly became a manager that the
beginner energy started to hit
differently. It's one thing to choose a
poor work life balance, a different
thing entirely to demand it of others.
This is him [&nbsp;__&nbsp;] on the Jared post
where he said that like working at Bun
isn't going to be a nice 40hour work
week with long vacations that he was
grinding and he wanted others that would
grind with him. And here I'll say a few
things. First and foremost, as much as I
love Jared, he isn't a great manager. I
talked to a lot of his team and we would
have to find ways to convince Jared of
important things that varied wildly in
our implementation methods. I have had
videos I put out about Bun that weren't
really because I wanted to do a video on
Bun. They were attempts to help the team
leverage important points against Jared
so the business would be more successful
and Bun would be more likely to win.
Sometimes you have to engineer a person
like Jared into the right box to do the
right thing. And that's just how it is.
I know I am this way too. I know my team
has a weekly meeting where they all talk
without me on how they can sigh up me
into doing the things I'm supposed to
do. That's just reality. Another part of
this reality is that Jared is really
hard to work with if you take a lot of
breaks. You could take a weekend off and
when you come back the project's been
rewritten in Rust. Like that's just how
he is. And if you're not trying to work
at that level, you shouldn't. And rather
than pretend or build a workplace he
doesn't want to work in, he just said
upfront what it's like. And if you think
this is a unique to bun thing that a
team formed by a person who works 80 to
90 hours a week wants people who work at
least 50 hours a week. If you think that
is crazy, there are much crazier things
I would have to show you in the city,
including but not limited to someone
coming for a oneweek trial, staying at
the office, and then not being allowed
to leave at risk of losing their dream
job for 6 months to a year living in the
office on an air mattress. I had other
examples, but honestly, I think I'm just
going to leave it at that because I
don't want to get in too much trouble.
And the amount of these types of things
I know of is insane. Jared was one of
the better people to work for. His
employees all love him, even when they
are frustrated with him and his
admittedly narrowfocused lockin mindset.
But the godamn guy was transparent about
this, and I don't think it's fair to
fault him for it. You even quoted him
here, and I don't think this quote's
that bad, especially in retrospect.
oven, which is the company that makes
bun, is going to be a grind, especially
the first nine months or so. If work
life balance means a lot of time spent
not working, this probably isn't a good
fit. Entirely realistic. Fun fact,
people talk to each other. You're right
about that, Andrew. And some of those
people have an audience like I do. And
now they're all going to talk about you
and how much of a [&nbsp;__&nbsp;] you are. He
talked to those who interviewed for a
job at Oven. He talked to people who
worked there. Those people talked to
each other. Everybody talked to
