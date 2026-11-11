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
word_count: 3999
chunk: 1
total_chunks: 5
parent_video_id: "_IDbFLu9Ug8"
---
really bitter lesson to learn.
&gt;&gt; Yeah, I was going to say it's terrible.
It actually is terrible, right? All of
the fun problems are gone.
&gt;&gt; Hello and welcome to security
cryptography whatever. I'm Deerra.
&gt;&gt; I'm David
Thomas. [laughter]
&gt;&gt; Uh [snorts] and we have a set special
guest today, our returning champion for
vulnerability research. I think Nicholas
Carlini. Hi Nicholas.
&gt;&gt; Hello.
&gt;&gt; Hi. Um, we had to have you back because
you I think you wrote a blog post that
Thomas was giddy over and basically
saying how vulnerability researchers who
once were able to find a bug class and
then point their guns at software, crank
the handle and get lots and lots of vols
out of it by trying to find instances of
that bug class. are now gonna have to
work a lot harder to crank that handle.
Can you tell us a bit about what you
wrote
&gt;&gt; or or less or less?
&gt;&gt; Go ahead. [laughter]
&gt;&gt; But like just just before we jump in,
right? So um I don't know like two weeks
ago, three weeks ago, there was like a
security nerd conference about AI and
security called Unprompted.
&gt;&gt; Um I was like on the program committee
for part of it, but I did no work. My
name should not be on there at all. It
was had life stuff going on. But uh
Nicholas presented um some of the same
stuff from like this that from this like
there was this anthropic red blog post
from February I think um which got like
a lot of coverage because it claimed to
have generated 500 zero day
vulnerabilities which is a um you know
kind of a grabby stat and then Nicholas
kind of presented some of the same work
at unprompted um and it kind of really
lit people up. So, I'm really psyched to
kind of have a conversation about that
whole space of stuff, Nicholas, that
you've been working on. And um we've me
and Deerra have not done a great job of
introducing it. So, I'll let you
[laughter]
&gt;&gt; So, I'll let you I'll let you take it
from the top, just kind of what what
you're what you're kind of working on
and then I'll drill into it.
&gt;&gt; Yeah. Um Okay. So the basic setup that
we've been trying to understand is how
bad is it going to get when you have
these language models that are getting
increasingly capable and they are now
able to be used to try and find
vulnerabilities and potentially exploit
them. uh and you know so the reason why
I'm curious about this yeah I don't know
many years ago I used to do yeah pent
testing stuff um and this was like the
thing that got me into security in large
part and uh for a long time when I was
doing security and machine learning the
only thing you could do was you could
attack the machine learning models
because like they were too dumb
&gt;&gt; um but like I don't know within the last
like year or so six months the models
have gotten good enough that you can do
security meaning use the models to help
you with security. And so the thing
we've been trying to understand is yeah,
what what can you do? And it's been
growing from basically very very little
to yeah, as of uh last month, a couple
months ago, like you can actually use
them to find real bugs that people care
about in the world. And so we've been
trying to understand both where things
are right now uh but maybe more
importantly to me you know where things
are going in the near future because the
models have been getting a lot better
and um this like I I see I see no
immediate end in sight in like let's say
the next 6 to 12 months and so I'm like
trying to understand like what are the
bugs we're able to find now and then can
we like try and roughly extrapolate what
we'll be able to find in 6 months or 12
months
&gt;&gt; like a a couple of different places I
kind of want to go with this. The first
thing though is like you're saying like
there's been improvements to the models
lately such that they're now able to
find vulnerabilities. But like for
people that were, you know, kind of
building pentest type tooling before and
were also using like the responses API
or any other API for any LLM, like it's
been possible to use an LLM to find
vulner to find real vulnerabilities for
quite a while, right? like um if you
have like a harness set up for it, like
if you have the right set of prompts for
it and like whether or not it like it
oneshots a vulnerability for you, it
will give you essentially it's been like
for probably more than a year. Um like
LLMs have been a reasonable way to get
enough information to get like a really
strong hypothesis about a vulnerability
somewhere, right? What's what's the
difference between that like the status
quo ante and where we are now with the
stuff that you're talking about?
&gt;&gt; Yeah. Okay. So, yeah. So, like um you
know Google Deep Mind has had a project
looking at doing this for a long time.
OpenAI announced something like seven
eight months ago looking at this. Um
yeah, this is definitely a thing that
like if you tried hard, you can
definitely get the models to find bugs
for you. Um the thing that we've been
finding most recently is like you don't
really have to try very hard. um we have
like I don't know let's say you know
10line bashcript plus docker container
like you know like I just sort of like
point it at the thing and be like you
know um I've compiled this program with
asan um you know please run against it
read the source code and try to find a
bug that you know makes as trigger and
like you know depending on which program
you're looking at sometimes more often
than not it comes back to you with an
input that makes asan trigger and like
this is not always problem. You know,
sometimes it's just like some stupid
like, you know, it's now going to, you
know, read from null or something, but
like every once in a while it like gives
you a much worse version of this. And if
you ask it nicely and say, "Please
disregard all of your null pointer
references," then it's even more likely
to find something that's important for
you. And you don't Yeah, you don't
really have to put in a huge amount of
work, which like is is both good and
bad. Um it's nice because it makes it
easier to find a lot of bugs, but like
in a world where like you the only
people who could find these bugs were
the people who put a bunch of work in.
Um you know there was some barrier to
entry and it's not the case that just
like you know any random person could
ask it to find a bunch of bugs for them.
I mean there still and there still is a
lot of work that you as a human have to
do but like again rate of progress like
you know you previously had to like to
have fancy scaffolding and now you could
just like open up you know cloud code or
codeex or whatever and just like point
it at something and say find me a crash
and it more or less will succeed and
this is getting um yeah only easier.
&gt;&gt; Okay so like the headline from like the
blog post and presumably the talk is
like this 500 vulner this 500 zero day
vulnerability thing, right? So there's
like I'm kind of inferring from that
that there's like a discrete project
inside of Anthropic to like find a bunch
of vulnerabilities. So like I guess one
thing I'm really curious about is what
that project looked like, who that
project was, who was working on it, how
did you guys pick targets? Um like what
what was the project internally?
&gt;&gt; Yeah, so there are a number of things
that we've been doing. Um that was the
result of a
somewhat old project where we took OSS
fuzz and instead of running fuzzers on
the you know the the harness endpoints
uh we like ran a language model and said
you are a fuzzer you know your job is to
find an input that triggers ASAN um you
know where like now like you're
instrumenting right into the middle of
whatever the thing is at the ASAN point
um sorry at like the fuzzer point and
like trying to trigger yes some some
crash which
is useful but like has some problems. Um
you know one of the lots of times you
find things that can never be triggered
from the real code.
&gt;&gt; Um
&gt;&gt; there are some harnesses for OSS fuzz
that have bugs in them and so you find
occasionally the bottle will find a bug
in the harness. It will just like
constantly return to you in the
JavaScript um ones in particular. There
are some that uh like you you can
basically escape your way out of the
JavaScript string. Um and and you know
when being called the V8 we got a bunch
of like you know fake style JavaScript
bugs where it was actually just like
escaping the harness and then just like
crashing the outside program but okay so
so there's various program reasons why
this is not perfect but this was like
the first thing that we started with
because it's like about the simplest
thing that you could look for and um
even in this um we found yeah a huge
number of bunch of of crashes that are
like yeah pebbuffer overflow rights
various things that like are very um
yeah kind of harmful and the reason the
other reason why we picked this is we
were looking for something that people
could say or like they couldn't say like
this is like random code that was like
untested like we wanted code that like
you know OSS fuzz has tested this for a
very long time we have found crashes in
this code that like is different than
what the fuzzers found and it's not the
case that like we're the first person to
have ever looked at this um this is why
what we found is at least marginally
interesting. Uh now the models have
gotten a lot better since then and so
now we could just like recently we've
just like pointed them at the Linux
kernel and be like you know find crashes
for me and it succeeds. Um, and so like
this has like gotten a lot better, but
like yeah, the initial thing that we
started with the 500 bugs um was mostly
from OSS fuzz.
&gt;&gt; And you're pretty sure that it's the
model is doing whatever it thinks it
emulating a fuzzer is rather than
calling out to a fuzzer or like or
whatever.
&gt;&gt; Yeah. Okay. Yeah. So we don't actually
literally say, you know, you're a
fuzzer. We we we actually say you're
playing in a CTF. Um, and you know, the
goal is to trigger asan. Um but like uh
you know we do this in part so that the
model doesn't refuse but um
&gt;&gt; you know okay so so but yeah so yeah so
why are we pretty sure it's not just
calling out to a fuzzer u because
presumably this is part of oss fuzz if
calling out to the fuzzer was all you
had to do then we would have been found
before right
&gt;&gt; um and so this is like the the main
thing that uh you know we're we're
relatively sure there um but also like
we just sort of have been reading a
bunch of the bugs and you could just
like look at the traces and it's just
very very clear that the things that
it's finding are not the like, you know,
fuzzer sort of found findings.
&gt;&gt; Cool.
&gt;&gt; You guys You guys do not have a special
model where you don't have to pretend
that you're in a CTF for [laughter]
&gt;&gt; we we've just been using the production
model that everyone else in the world
has access to. Um yeah, I mean we get
the model a little before everyone
because you know we're training it. Um
but the model that we were using has
been deployed.
&gt;&gt; How uh how focused are you on memory
corruption in this work?
&gt;&gt; Yeah. Okay. So initially we were very
focused on it because it gives a very
very nice oracle right like you know if
if I I sort of have a copy of the
program running in a separate VM um with
the compiled with as
the first model gives to me a binary and
I give it to the other one and I run it
on there and if the other one crashes
with the binary on with an asan crash
then I'm like okay great this is a bug
and so you know we did we did this um we
for example we we ran this on Firefox um
with Opus
6 and um we sent Mozilla
122 crashing inputs and like they
confirmed all of these are bugs like
100% of the things we crashed them
perfect true positive rate all bugs
because we have a perfect crash oracle
and they're sort of competent security
people who understand that if you have
an input that's crashing ASAN like you
should actually treat this as something
that's worth looking at and so like they
they sort of treated them all as bugs
now some of them were not you know high
severity sort of potential escape
vulnerabilities and so they triaged I
don't remember exactly how many I think
it was 22 total of them got CVEes that
because they thought they were like bad
enough and so the rest were you know
crashing inputs that were are bad but um
are not like immediately it's not
immediately clear how you would exploit
this and so they didn't treat triage
these as you know high severity
vulnerabilities that need CVS but like
this is why we started with memory
corruption as the thing because you can
get this very very nice oracle um we've
Um, additionally tried to do other
things that don't have such a nice
oracle. Um, so somewhat recently I
pointed it at a bunch of content
management systems and have been finding
&gt;&gt; uh Okay. So the best one that we have is
an example. There's this project called
Ghost which has I don't know it's like
50,000 stars on GitHub or something.
&gt;&gt; Oh yeah. It's like WordPress but in
[clears throat] node.
&gt;&gt; Yeah.
&gt;&gt; So literally like CMS's but yeah. Okay.
Sure. Yeah, it was like standard
&gt;&gt; ghost.
&gt;&gt; And ghost is an important target. Like
there's a lot of people running ghost.
Yeah.
&gt;&gt; Yeah.
&gt;&gt; I used to run ghost and I was
&gt;&gt; paranoid about running it and I put it
login behind an additional oath to 2
proxy because I was very worried about
it.
&gt;&gt; Yeah. Um yeah, Ghost was actually pretty
good. Um so Ghost in the history of the
project on their like you know security
tracker has never had like a critical
severity bug before um
&gt;&gt; uh before. Yeah. And then Opus 4.6 found
one. Um, and so it found a SQL injection
that goes from an unau unauthenticated
user who has literally no perms um who
can compromise the admin database, mint
himself a new admin account and then log
himself in and yeah complete the
complete account takeover. Um, and like
it was like so okay, not only did it
find the vulnerability, it also wrote
the exploit which was like a non-trivial
blind SQL injection where you only
control some parameter after a wear
clause. And so like you can't actually
do things. You can like either parse or
not parse invalidly a JSON object. And
so you have to like, you know, depend
like see whether you got like a 500 or a
403. And then you like sort of do some
binary search to read out the like the
the keys and like it sort of it wrote
the whole thing for me. Um and yeah,
like it was like a quite bad bug. But
yeah, like this one we didn't have a
greater. So it was a little bit harder
to do. Um but the models have gotten
&gt;&gt; good enough that most of the time you
can just have them write a report and
then you have them read the report and
you ask like here's a report that I
received from someone. Is this real? can
you go and replicate this on the on the
thing or not to like separate instance
of the model and then it will sort of go
off and say um you know the here's the
following flaws that I found I don't
think it's quite as real and so we like
yeah run this critiqueer over all of
them and then after that's done then we
like look at the highest severity ones
ranked by by this critique agent um and
then we we filed a couple of these ones
that were like yeah the highest severity
and so this this isn't as as perfect and
clean as an oracle so we've been doing
this only more recently once the bottles
have gotten good enough that we trust
them for this. Um, but I think it's
highly likely that the world is going to
move more and more in this direction
where you can just kind of trust that
for the most point, most most of the
time the models are good. But again,
like we these ones we like are very very
careful to manually review all of them,
you know, like I I sort of have like
walked through the trace of myself. I
like spun up the thing because like I'm
still very paranoid the model's just
going to lie to me. I don't want to be
the person generating AI slop. This will
be very bad. So like we can yeah we can
let you off the hook for having to hedge
about this for the rest of this whole
time, right? Like we assume that you're
like you know you're verifying things
before you send them upstream and all
that. I want to lock in on like the
methodology here. So um so with the with
the asan builds with the memory
corruption oracle it's kind of easy to
see how you would kind of build that
out. Like intuitively it's like you also
have like giant fuzzer farms that
produce crashes and like the the like
the limiting reagent there is how much
time people have to go verify all those
dumb crashes and you have kind of
infinite ability to verify crashes and
that will that's not I I get the
impression that's not actually what
you're doing like really like OSS fuzz
is just kind of like a it's itself a
harness to give the LLM access to you
know the code in the environment and all
that but like I assume it's it's
predicting vulnerabilities from code as
well as from behavior, right? But you
have like a you have a really good uh
you have both a really good oracle for
knowing when you found a vulnerability,
&gt;&gt; but also like um it knows how to find a
memory corruption vulnerability. Like
the the space of different like C and
C++ vulnerabilities like they're
interesting vulnerabilities and they're
very corner Casey. There's lots of bank
shots you have to take to get them to
work and all that. But the core idea of
the vulnerabilities simple, there aren't
that many of them, right? which is not
the case for a CMS. So my question is
when you're doing something like finding
a SQL injection in ghost, right? How
much prompting are you giving it about
what a SQL injection is?
&gt;&gt; Zero. Yeah. Again, so like we we sort of
I wrote a single prompt which um was the
same for all of the content management
systems which is um I would like you to
audit the security of this codebase. Um
this is a CMS. You have complete access
to this docker container. Um it is
running
please find a bug. Um, and then I might
give a hint. Um, you know, please look
at this file and and I'll give different
files each time I invoke it in order to
inject some randomness, right? Because
the model is going to do roughly the
same time each time you run it. And so
if I want to have it be really thorough
instead of just running it 100 times on
the same project, I'll run it 100 times,
but each time say h, you know, look at
this login file, look at this other
thing, and just like, you know,
enumerate every file in the project.
Basically, I'll filter out the files
that are header files or okay, it's it's
whatever in node, so it's not header
files, but I'll filter out the files
that have obviously nothing interesting
going on in them. Uh, and then just give
it the files that have plausibly
security relevant code. And again, I
just I use a language model for this. I
I run it over the files. I say rate on a
scale of 1 to five, how likely is this
file to have something interesting in
it?
&gt;&gt; And then just like discard the ones that
are ones and twos, and then I keep the
three, four, five, and then I just run
it on this and say, please find me a
bug. And yeah, sometimes it gives me SQL
injection. Sometimes it gives me, you
know, login bypasses. Sometimes it gives
me XSS. Sometimes it gives me CSRF.
Yeah. Just like, you know, it knows what
all the bugs are.
&gt;&gt; Okay. And you're literally automating
claude here. Like the the CLI cloud.
You're not driving the API.
&gt;&gt; No, I I run cloud, you know. Yeah. You
can run cloud code and dangerous get
permissions, which means just like don't
