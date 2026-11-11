---
video_id: "_IDbFLu9Ug8"
title: "AI Finds Vulns You Can't With Nicholas Carlini"
channel: "Security Cryptography Whatever"
topic: "ai-llms"
published_date: "2026-03-26"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=_IDbFLu9Ug8"
duration: 4560
word_count: 3992
chunk: 2
total_chunks: 5
parent_video_id: "_IDbFLu9Ug8"
---
ask me for anything. You can do whatever
you want. I give it a prompt. The prompt
is yeah, I don't know. It's like maybe
in practice 30 lines or something. Um I
I don't know what the prompt says. I
didn't even write the prompt. I asked
Claude to write the agent that writes
that finds the bugs. Um and just like
you know I just like sort of told it
what to do. Um and then uh yeah and then
it goes off and and and runs until it
finds something. Um, and then it writes
a report and then I run these critique
agents on all the reports and then at
the end of the critique agent I ask it
to write um a CVSS score which you know
are fake but like um it's like good
enough that I can just like you know
grapp like you know CVSS you know 9876
and then just like find stuff and then
go through them.
&gt;&gt; Okay. So when you in this kind of
contraption that you've set up here,
right? Like I It sounds like you're
doing multiple runs against ghosts say
like and like like those runs like most
of them don't pay off like you just keep
doing until you get
&gt;&gt; Yeah. Right. I mean like I I run it for
almost literally every file in the
program in the project that has
something interesting and I then try to
have each one write a report and I tell
the model, you know, maybe there's
nothing here. If there's nothing here,
just write no findings. Uh, and then I
run the critique agent over all of them.
And a good model most of the time will
tell you no findings and then it will
find a bunch of somethings. And you
know, sometimes it turns out that it it
like it's like like the most common
failure mode is early on in the session
the model um adds some code to some
debug thing that like gives it a bypass
so that it can like log in without
permissions. And then later on, like
after it's compacted the summary
multiple times, context window is
cleared five times, it like finds a bug
which like it added a while ago and
isn't like entirely fake. And then like
it's like, "Oh, I found something." And
then you have the triage agent run and
the triage agent runs it on like the
clean image and it's like, "What do you
mean?" Like, you know, this is like
clearly not a bug. And it will like
remove it. And you end up with a bunch
of these kinds of things.
But like there was um I'm asking this
because there was last year like I think
in the middle of last year somebody
wrote a blog post about how they had
found I think it was like Linux kernel
Wi-Fi or something. They found a kernel
vulnerability using I I forget which
model it was right but like for for me
like the nut graph of that piece like
the core of that piece was like they
were running it thousands of times right
there was burning they're burning like a
I don't by the way I don't care about
how many tokens you're spending. the
whole token economy thing seems very
silly to me, but like they're running it
they're running it a thousand times and
like one of those runs pays off with
something actually interesting, right?
Uh is that is it a similar situation for
you or are you just iterating over the
files and that's the only iteration that
you do?
&gt;&gt; Yeah, so I'm just iterating over the
files. Um it's definitely not one in a
thousand. I don't know what the exact
rate is, but um you know, okay, like of
course there's a spectrum of
&gt;&gt; each time each time you each time you
give it a new file to look at, right,
you're really just giving it a new entry
point into the code, right? Like
&gt;&gt; Exactly. I don't even force it to like
read that. Like there's no constraint.
Like there's like literally a line
that's like, you know, um please look at
and then I, you know, bracket, you know,
file name and bracket and then in
Python, I just like, you know, format
this and like swap in whatever file name
I want. And like this gives it an entry
point to like you know launch off
looking from there. And sometimes it
finds a different bug somewhere else.
But yeah, I I don't do any like fancy
stuff here.
&gt;&gt; I'm stuck on like So first of all, so
there's like there were some screenshots
of the presentation that you gave at
Unprompted like one of them that um that
got posted and people were like liked it
or whatever. It's just that you believe
that Claude is a better vulnerability
researcher than you are. And I worked
with you in the past and I already knew
that Claude was a better vulnerability
researcher than you were. But
&gt;&gt; [snorts]
&gt;&gt; um but there was also like there there
is like there was the
Nicholas wrote all of the good parts of
microcorruption. Um Nicholas is much
better than I am. I'm saying I'm really
really bad but like um there was another
slide which I actually found dispiriting
which was just like you're you're like
the slide where you're kind of talking
about the methodology is just you
showing claw dangerously skip
permissions find me a zero day
vulnerability right so like that by
itself is surprising to me and like as a
nerd who wants to like look at this
thing like an analog synth with lots of
different things to plug in together and
lots of cool toys that's I'm I'm a
little bit disappointed that there isn't
more room for little you know making
little always and I'll get back to that.
But also like this whole idea of so each
each iteration that you're doing over
the files which is just like giving it a
little hint maybe start this like here
this time and maybe start there next
time. Right? So essentially you're just
kind of randomizing like what you're
really doing is just like doing like a
randomized like start for each thing.
&gt;&gt; Why do you ever stop
&gt;&gt; as there are more things in the world to
attack?
&gt;&gt; Okay. When when you're done with that
loop, do you feel very confident about
the security of say ghost?
&gt;&gt; No. Um yeah. Like so we if we run this
over the loop once um we so okay so so
when we found the 500 bugs um in like a
bunch of OSS things
I think we ran over every project
sorry over every entry point maybe 20
times or something
um just to like be like even more
thorough and you know there are some
entry points that like only found bugs
two out of 20 times um and when I run
over so eventually ran over in the Linux
kernel. When I did the Linux kernel, I
ran over every file in the kernel that I
thought was interesting and reachable
from user space and whatever bunch of
stuff maybe like five or 10 times. And
there are like sometimes where like it
finds a bug and sometimes where it
doesn't. And so like I I don't have like
a very nice like scientific plot yet on
like you know extrapolating where this
is going to plateau. Um, but the main
reason why we stop is because there's
enough software in the world where like
after we've run it a couple times, we're
like, okay, we've sort of gotten a bunch
of bugs here, like let's move on and
like try and not spend all of our time
on exactly one piece of software and,
you know, distribute it amongst all of
them. You know, there's like a enough
code in the world that um you could do
only one pass over each project and be
running for a very long time. Do you
have like your own, you know, homegrown
spidey sense of being a vulnerability
researcher about which files you're
like, "All right, you've given it a pass
or two, but like I really want you to do
like five or 10 passes before I feel
comfortable moving on or I feel like I'm
not going anywhere."
Yeah, I I I probably could like if I
went and looked at the files
individually, I could probably do this
better than the model still a little
bit, but like I don't um like I just
like pointed at the project and just be
like find me things. And like
&gt;&gt; I mean the reason why is just like the
scale is enormous. Like the like it's
like I yes like on the slide of like I
said the models are better vulnerability
researchers than me. It's not the case
that like if you gave the model a like
very small piece of code that was like
self-contained and 300 lines long and I
could reason and it could reason the
same amount of time on that piece of
code, I would win. Like I'm still like
sort of I'm still more intelligent than
the model. But what I can't do is
analyze literally every program or every
every C file in the entire Linux kernel
and try to find bugs. Like I will spend
most of my time having like a really
good intuition about where to look.
&gt;&gt; But like the model could doesn't it
doesn't need to be intuition. It could
just look everywhere. Like it's
something so much faster and cheaper
that like half of its work will be
completely wasted because it's looking
in like you know drivers that aren't
even loaded. And like fine like I I fine
we waste that. I will just go look at
the points where there's actually
something to be found
&gt;&gt; uh eventually and then it will come back
with yeah interesting bugs that have
been dormant for decades. Mhm. Even for
the short ones, I feel [clears throat]
like you both can achieve the same
result, but I feel like the model might
be able to do it faster than you.
&gt;&gt; Oh, certainly they're enormously fast.
Yeah. Like these like you know I mean
especially Yeah. Like like Thomas you
were saying
the model like there only so many
classes of bugs, right? right? Like you
know I don't know like security people
like like to think of themselves as you
know like brilliant sort of whatever
people but like I don't know honestly
it's just like there's some amount of
just like you need to know what the
classes of bugs are that people have
found and like 90% of doing
vulnerability research is like okay
let's like pattern match this on the
thing that we've seen before and like
there's differences every single time
but like you can imagine that like if
you had read all of the code on all of
GitHub or something then like you would
be very very good at a pattern matching
against whatever the use after free
pattern that this one in particular
needed.
&gt;&gt; Yeah.
&gt;&gt; So, like I want to get back to whether
or not like, oh, you switch to a new
thing because there's like so many
things to look at. Um, but also we're in
like we'll just like find something to
pattern match on and we could in theory
just like keep pattern matching until
it's gone. So, like I kind of remember
when like fuzzing it wasn't wasn't new,
but like OSS fuzz was new
&gt;&gt; and like uh uh like some people like
popped out like you know let's say like
10 CVE in every single codec for like a
year in like 2015 2016 or something. I
don't know. Um and then everyone was
like wow this is amazing. We're just
going to fuzz all these things. And like
fuzzing found like 10 bugs in every
single library. And then like people
kept running fuzzers for years and those
like OSS fuzz like like you said it like
doesn't find a whole lot of new bugs.
Like there's definitely like people
working at offensive firms that like
figure out a new way to jury rig up a
clust a cluster once to fuzz like some
in slightly new way it pops out 10 bugs
and it doesn't find anymore. Um or like
people who build careers doing that to
submit to bug bounties because it's just
like
&gt;&gt; it turns out it's like it's not actually
enumerating the bug space. And it's also
far far easier to like juryrig some
fuzzer for like a month than it is to
like run it consistently over time. So
like in terms of costbenefit analysis
for defenders, it's it's like helpful,
but it's not exhausting the space.
&gt;&gt; But also, we don't see necessarily see
like a ton a ton a ton of like fuzzing
bugs like 10x, you know, every month.
&gt;&gt; Mhm. So when it comes to like bugs found
by like agents again or or tools like
cloud code like you can throw it at like
some files and say like find me bugs and
then there's a run of that and then
people can jury rig it up a little
better to find more bugs. But like do
you think that we could exhaustively
like actually make a piece of software
more secure in the sense of like we
removed a bunch of the bugs and like if
we all run these agents for the next two
months like we'll have found all of the
bugs that agents are going to find aside
from the margins and it will go back to
like there are 10 people in their
basement submitting the bug bounties and
one of the tools they have as agents or
is is there an infinite plethora of
bugs? Like like there's something to be
said about the population of bugs and
then like how these agents are finding
them. Um and like are we approaching
zero or yeah
&gt;&gt; okay um I think it's a very good
question uh okay high level answer I
don't know um I think yeah I wish I knew
the answer this would be great to know
but yeah not yet okay let me give you
two better answers Christ that help a
lot of work [laughter]
&gt;&gt; yeah so okay yeah so um first answer is
that um even if it was the case that you
could exhaust all of the bugs with one
specific language model it's still the
case that these models are getting a lot
better over
And so like you can imagine a world
where like we exhaust all of the bugs
that can be found with you know Opus 4.6
and then OpenAI comes out and releases
GPT 5.4 which they did I don't know
whatever 2 weeks ago and then like maybe
this one finds a bunch of new bugs and
then Google comes around and releases
Gemini let's see they're on 3.1 so they
release 3.2 two and this one like finds
a bunch of new bugs. Like so you can
imagine a world where even if you could
exhaust all the bugs with one model like
we're still in this increasing
exponential capabilities and like it
seems likely to me that we will be stay
there for a little while longer. So
there's there's this aspect of it and
then the other aspect is um
I like to think of this as like okay so
so fuzzers find a restricted class of
bugs that like are fairly easy to
enumerate and so [clears throat] it's
like fairly small the attack surface is
fairly fairly low and this means that
once you've probed it a bunch like you
can sort of have hardened that shell as
you get better and the models are able
to find attack a larger attack surface
like you have to do more work to like
exhaustively find all of the bugs that
can be scanned in that surface and each
time the models get better the space of
attacks grows again. So you know now
that we can have pretty good bug finding
without Oracle that like you know gives
you as crashes this like gives you
another attack surface that you can
start to measure against and you know I
think that each time you do this you
have to do more work to make sure that
you've you know done like you know what
pigeon hole principle whatever like you
need to like have have done a huge
amount of work in order to like make
sure you found all of the bugs even if
they were finite and each time that you
increase the surface like it gets even
harder.
like this is maybe my other concern is
it may be the case that it's finite but
um you could imagine that yeah the more
powerful models might have a bigger
surface to hit between
&gt;&gt; really
&gt;&gt; um and so getting back into that like
like for the Firefox example then like
um
do you have like an estimate in terms of
even if it's finite like not not getting
there um do you have an estimate to how
much time it took Firefox engineers
to patch all what was it like 50 bugs or
or whatever it is relative to how long
like Claude ran um to find and then even
for for say you to validate um let's
include the time that you or anyone else
at Anthropic spent validating the bugs
&gt;&gt; um relative to how long it took Firefox
to to patch them and not to like knock
them like not like if Firefox shelves
some of them like let's not count that
time just like actual time spent by
engineers trying to patch these things.
So I don't know exactly how much time
Firefox spent. Um the bugs that we found
there were found by one person if who
yeah was working for I don't know not
more than a month on some harnessing
probably a couple weeks probably most of
this was reusable work because like I
don't okay some people
&gt;&gt; it takes a while to rig a browser but
once you've done it once you're
&gt;&gt; rig yes but some like he sort of did it
properly and like hooked it up into the
anthropic infrastructure in the right
way. Um I sort of do some things just
like I don't know I just like turn on a
bunch of Docker containers on the same
machine. I go grab a machine with like a
100 cores and just like call it a day
and just like run it over a weekend. Um
other people like do do actual
engineering and like you know make it
like properly distribute and like he did
it that way. So it's like a reusable
infrastructure that like you know if he
wanted to spin on something else he
could do that. And so like you know so I
don't know how much how much the work
was was on this but um you know it was
like not more than a couple weeks of
work to like harness the whole thing up.
Um, and then yeah, we like let the
models go and churn for a while and then
we sent off the bugs. Um, so yeah, I
think we sort of got most of the bugs
that we could find with with Opus 4.6,
but like I don't know. My guess is if we
were to run it for the same amount of
time, we we'd come up with a couple of
more. I don't know how many. We should
probably have some numbers here at some
point. I'm I'm hoping to try and run
some like sciency experiments like
measuring these curves over time, but
like we don't have that quite yet. It's
like still yeah very early.
&gt;&gt; But [clears throat] so we can probably
then like at least estimate on the short
end you spend let's say 2 weeks and then
let's say each bug took an engineer day
for Firefox to patch of of those 30. And
so that's at least like roughly 2x the
engineering time to fix the bugs than it
was to find the bugs. And that's
including like reusable engineering
time.
&gt;&gt; Yeah. I also like that it's like just
legitimately harder to patch than it is
to find those because like you can't
like you can't just like like the models
are great because you know yeah finding
crashing inputs is like gives you the
the most perfect oracle like you know
but but yeah if someone wants to like
fix it you have to like understand first
like how it happened. Actually, as a
sort of aside, um, language models are
actually very nice because while they
don't always give you a perfect
explanation of what went wrong, it's
like so much easier than like here is a
fuzz crash, like you know, like
[laughter] just like here's some binary
like the the the bugs that we sort of
have come with Python programs that
generated them. And so like even if like
it sort of misunderstands why like if
you at least like so so it's a the
Firefox people found it a little bit
easier to actually fix these than like
normal fuzz crashes but yeah like they
did have to spend quite a lot of work on
like you know making sure that what
they're going to submit is not going to
like break some user functionality and
so I think this is one of the
asymmetries here
&gt;&gt; and you were kind enough to give them
effectively 100% valid bugs
&gt;&gt; because another approach could be to
just use the bug bounty as an additional
Oracle
uh to help with with with the
&gt;&gt; and some people in the past have have
tried this and have gotten many people
mad at them and yes we are trying very
hard to not have
&gt;&gt; also the Oracle is pretty pretty large
[laughter]
&gt;&gt; like from from Chrome's side like
relative to February 2024 February
&gt;&gt; eating his feelings here
&gt;&gt; 2025 had five times the submissions um
