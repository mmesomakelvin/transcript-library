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
word_count: 3998
chunk: 3
total_chunks: 5
parent_video_id: "_IDbFLu9Ug8"
---
and then March of 2026 today is the 19th
already has um over twice as many
submissions as the entirety of February
did. Um and you know, some of that is
our own like damn fault for um basically
being particularly like lenient and nice
for years. um because that was like you
know you know what we uh uh um that's
just the way that the the Chrome VRP has
been known for like being very easy
access to get to engineers and so
&gt;&gt; um but uh
&gt;&gt; Firefox saw the same Mozilla had a plot
um where they like report showed the
number of bugs that were found um over
time and yeah so like we found I think
it was like 20 something which is I
don't remember what the exact number was
like 25% of all bugs that were found in
last year. We found like in one like in
a one batch of reports. Um but what like
many people didn't notice is like that
this this chart had like two bars stop
stacked on top of each other. There's
the ones that we found and the ones
everyone else found. And the bar was
like a lot bigger because we found many
more. But if you remove all of the bugs
that we found, um last month was also
the biggest month that they had seen in
like the last two years.
&gt;&gt; Oh, right. And so like I I can't I mean
I have no inside information on on
Firefox but I can't sort of tell you
that this is causally related but I
don't know it's it seems plausibly
related
&gt;&gt; every bug bounty right now
&gt;&gt; and and this was like to be clear like
the like these are the real bugs they
got CVs for and so you know the numbers
on submissions I'm sure are going up but
like the number of outputs is also going
up.
&gt;&gt; Yep. I think like bug bounty incentives
were always kind of weird to begin with
and these programs are all kind of like
they're all in I guess maybe except for
Google they're all kind of ad hoc I
don't worry that much about like the
long-term impacts on bug bounty programs
I think people just iterate and come up
with better bug bounty terms and stuff
&gt;&gt; there's some of that but also like I I
don't worry too much about bug bounties
I worry about the people at bug bounties
on like large platforms and browsers
like in the the sort of near term um but
I I I think like it was actually Jeff
Beltnap who used to work for you Thomas
I think um when he was CISO of LinkedIn
like over 10 years ago I think he was he
gave this talk that was like bub
bounties are stupid and you should stop
running them like the only people that
run that should be running bug bounties
are basically platforms are you an
operating system or a web browser or
like a phone vendor sure run a bug
bounty otherwise or like are you running
other people's code maybe run a bug
bounty but otherwise like get over
yourself you're you're just like wasting
time. And I feel like everyone's just
going to come to that that that
realization. Like Curl did it um is a
notable example, but like everybody
that's not huge is going to shut their
bug bounty down. Um and then the big bug
bounties are all going to be much much
more strict about what they'll accept.
&gt;&gt; Yeah.
&gt;&gt; Just because of overload.
&gt;&gt; Yeah. Because it's very easy to generate
a a reasonable looking bug report now.
And that might be wrong. Like previously
like how well you format did you follow
the format? Did you submit the requested
thing? Was it fully filled out was like
a good proxy for are you reasonable and
now it's not
&gt;&gt; whether you're some human should invest
their time actually validating it and
testing it and trying to reproduce it
and coming up with a patch.
&gt;&gt; Yeah. You're also going to see more of
like
&gt;&gt; you're not allowed to give us a bug that
isn't basically like coming with a pock
&gt;&gt; unless you've previously given us bugs
that came with a pock. And then we'll be
willing to listen to you because you
have a reputation.
&gt;&gt; Mhm.
&gt;&gt; But like otherwise, good luck.
[laughter]
&gt;&gt; I want to talk more about the science of
finding bugs.
&gt;&gt; I want to talk more about like what the
what the [&nbsp;__&nbsp;] is going on here, right?
So yeah.
&gt;&gt; All right. All right. So hold on a
second, Nicholas. when we're when you're
looking at what's happening right now
with 46 maybe and just like going
straight into there like is it that like
is it that the models um are like have
superhuman attention spans and they're
basically doing what you and I would do
um looking at code but they can hold up
attention over huge amounts of code and
keep lots of context in their heads and
find more stuff and it's just a fact
it's just a function of thoroughess or
is it also the case that the models are
maybe for some of the same reasons
really good at finding intricate corner
cases that even if you and I stared at
things like we can't hold enough stuff
in our heads to find all the weird bank
shot conditions that would make these
things work. Is it either or or both or
how much?
&gt;&gt; So far all of the bugs that the models
have spit out once it produces the like
report I can understand like I can like
it's like pretty clear to me what's
going on. Like if it's not yet producing
reports where I read them and I'm like
&gt;&gt; what is this? Like it's like
&gt;&gt; you haven't seen the model do like the
equivalent of AlphaGo which is like it
does moves that no human would ever see
or think of. It's not doing that yet.
&gt;&gt; I I I don't know how it got there but
like you know the final report like when
when I when I filed a bug report like I
am able to like you know concisely
explain in you know a page or two of
text like you know what has happened
&gt;&gt; right? Sometimes these bug reports are
well so so the Linux one for example
this was like some uh so the bug we have
was we have several of them um one of
them is in
I think this is in NFS demon it's the
bug was 22 years old um the bug so in
Linux you um what the way the commit
format works is they like you to say
like you know fixes colon you give a get
commit hash of the the commit that
you're fixing
&gt;&gt; um
So like I had to give a change set a
fresh fix has to go back 22 years be
like this commit is the one that
introduced this bug.
&gt;&gt; I couldn't give a commit because the bug
predates git.
&gt;&gt; Oh my god.
&gt;&gt; And so I was like finding the change set
from 2.6 syncs that introduc and so like
okay so um yeah okay this so like you
know like this clearly has something
interesting going on because like you
know many eyes have seen this but like
when when I tell you what the bug is you
know like you can understand it like so
it turned out that like there was some
thing where you know if two clients are
cooperating and they take a lock on the
same file and one of them has a really
big name and the other one like gets a
lock denied error they'll like or big
person's name gets echoed to the other
person and overflow some buffer on he
like this is like not
&gt;&gt; you know some obscenely complicated like
magic that's happening here. It's just
like it's a bug that like you can see
why this like might have been hard to
discover because it's like requires
multiple clients that are like leaving
packets in the right way and but like it
it's understandable once I tell it to
you what's going on. You know all bugs
are shallow in some sense at least you
know for the moment they still are. That
that one reminds me of how like
concurrency and async always tend to be
just gnarly and like part of the reason
that you know Chrome not Chrome Rust is
not like completely free of concurrency
and async bugs but it does make the
severity because of the memory safety
and type safety and all things that come
out of that a lot easier to do and a lot
less severity if you you shoot yourself
in the foot. It's logic bugs, but that
sort of bug definitely feels like of a
piece of like humans are really bad at
looking at a piece of code and
transposing that to the network topology
and state machine of asynchronous
clients doing a state machine.
&gt;&gt; Yep.
&gt;&gt; transition together.
&gt;&gt; You know, I don't know. I wouldn't have
thought that the a model could also
reason through that in its brain. you
know, I don't I'm going to like like
it's context like you know it has it has
in some sense like understood this at
some deep level in order to come up with
with this bug like this is a non-trivial
sort of piece of reasoning you had to do
in order to like you know construct
multiple clients querying in the right
order right like you know yeah just like
there's like some of these things that
like are quite interesting and like
those are one class of bugs um that it
finds that are interesting the other
class is like just things that fuzzers
can't find that like are just boring
&gt;&gt; but just like you know
&gt;&gt; I have so many bugs in protocols that
have check sums
like just like you know
AFL has a very hard time generating
valid CRC32s. Um and so like it's just
like not a thing that you can fuzz once
you have to include this in your
protocol. Um but like language model can
just like find the bug and then write
the write the input and then check write
a Python program compute the like check
sum add it to the packet and then send
it off and then it crashes and so you
other class of bugs. Yeah, that that
makes sense because like a fuzzer is a
brute force search, right? Exactly.
&gt;&gt; Right. And like Yeah. Okay. So,
okay. I thought I had more to say about
that, but I had a fuzzer is a brute
force search and that's where my insight
capped off there. Keep going. I'm sorry
for interrupting it. Oh,
&gt;&gt; that's fine. No, no. I mean, like, yeah,
this is exactly why like even if you
like are doing some kind of branch
coverage kind of thing, right?
like it's very hard for AFL to like
discover the right sequence of bytes
that like you know happens to give a
check some that's valid and so it will
just like very very fast
&gt;&gt; and so yeah
&gt;&gt; it doesn't have a theory it doesn't have
a theory of the code and whatever the
[&nbsp;__&nbsp;] is happening inside the model the
model has a theory of the code that it's
chasing
&gt;&gt; well the model can just like ignore the
it knows that there's this line that
says you know it's going to do like this
compute CRC32 it will reason about the
rest of it and then when it gets to the
point where it needs the CRC32 to match
it can just go run some Python Python
code to generate the correct CC32 hash,
add that into the into whatever the
object you need and then it will it will
pass. And so this is like a sort of the
power that the model has that like you
know the fuzzer which is just looking
locally at like this individual branch
is like unable to to do. And so you can
find a bunch of bugs that are entirely
trivial things. Um there's like another
bug that we um that we just um was just
patched in ffmpeg 8.1 um which again
20some years old. Um, it's a bug in
H.264 introduced in the original commit
that added H.264 to ffmpeg. [laughter]
&gt;&gt; Um, and it it's it's a bug because
there's like some overflow where if you
have some number of frames that's
exactly, you know, 65535 frames, then
you can overflow something. And like no
fuzzer in the world is going to like,
you know, run through the loop 65,000
times and then eventually have a crash,
right? It's like it's like a very very
boring bug, but like the fuzzer is not
going to find it for this reason.
&gt;&gt; Knowing what the knowing what the code
is that's broken there, if you looked at
that code, would you have spotted it?
&gt;&gt; Maybe. And I think if I if I think I
think if I gave you a one sentence
description, I think you would find it.
&gt;&gt; But like empirically, you know, the code
is 20 years old. It's in ffmpeg. It's in
H.264. It's not like some obscure codec
and like it's still present. So I mean
like you know knowing that there was
something to look for is like a very
very big hint especially if I tell you
like you know what kind of thing you're
looking for. there was like um earlier
this year or earlier last year whatever
it was right there was the DARPA cyber
challenge thing right where a bunch of
different teams put together kind of
complicated systems for finding
vulnerabilities right so if we if we
think about the work that you guys were
doing with 46 um and if you kind of
divide the universe of you know finding
vulnerabilities with AI into like the
quality of the model the quality of the
harness and the tooling that you build
around the model and the quality of the
prompting that you Right. Like the
domain specific knowledge bring about
the target and about the vulnerabilities
to that that thing. Right. It sounds
like for the for the 46 work that you
guys were doing for like the anthropic
red 500 you know zero day thing heavily
heavily biased towards just the model
right like there wasn't basically almost
no you know work done at all there right
and like I would have said before we
talked just now like like this or before
I saw the slides for the the talk and
all that right that like the
state-of-the-art is coming up with
better and better harnesses right um
like
&gt;&gt; do you see like do you see the result
that you guys got and the success that
you got as like an indication that you
have the right allocation there or is it
really just a function of like you guys
have time to do this amount of stuff and
also your incentive is to make the model
as good as it can possibly be at doing
this stuff and like other people's job
can be to figure out what the best
harness thing is. Yeah, it's definitely
some of all of these, right? Like, okay,
so like part of the reason why we are
looking for these bugs is okay, so I am
looking at these bugs because I like
finding bugs. The reason why Enthropic
is willing to pay me to find bugs is
because like they in part just like want
to understand the capabilities of their
model,
&gt;&gt; right?
&gt;&gt; Like they sort of like they want they
have this model, they want to know what
can this thing do. Um they want to
ensure that it's not going to go and
cause a bunch of harm. And so part of
what they care about is like
&gt;&gt; just tell me how good this thing that I
have is in front of me. And so
&gt;&gt; and what it can do, not even how good it
is, what it's capable of in general.
&gt;&gt; Yeah. Exactly. Yeah. And so part of yeah
the like you know incentive structure
here is just like we are in some sense
incentivized to just to try and get some
base understanding of what's capable and
then yeah like I could almost certainly
scaffold this better and probably find
some more bugs but like in the time
would have spent doing that like there
will be another model and then like I
could just like find more things and
like I don't know often times you find
this
okay so I think that happens is is you
write a harness
that's like really really really good
for a particular model and then the next
model comes out and it's better in ways
that like your hardness is no longer
helpful. It's now like restrictive.
&gt;&gt; So like there's like a couple of like
examples. It's like okay so so I am I I
did this once um like so last year I
wrote a paper where I had some language
models try and break some machine
learning stuff and at the time when I
did this I started writing the harness
in like November of 2024. Before the
paper came out in like January 2025 in
order to get the models to do anything
sensible like I had to like say you can
edit the following six files you can run
exactly these three Python commands and
do nothing else because like if I give
you some like you know agency you will
like brick the machine. like I couldn't
do anything. But then like today I last
couple days I've been running this this
harness again. And if you run that with
today's models like they're just like
they're trying to you know launch jobs
in the background so that like they can
then like read code while something else
is running to save time and it's like
good idea like harness needs to let you
do this. Um there have been some
benchmarks that like you know even you
know other people have have found um
there's this you know science adjacent
benchmark by some folks out of Princeton
where with Opus 4.5 they initially found
that opus 4.5 was scoring like 40% I
trashed their entire harness I just gave
Claude code the harness the the thing
and I said like solve it and it was like
92% or something. It was just like, you
know, it's like this is like a common
thread where like, you know, you spend a
bunch of time building something fancy
and the next model just like doesn't
need that fanciness, which is not to say
that this is like a useless endeavor,
but like, you know, it's just like, you
know, at the when things are increasing
at the rate that they are, like it's
kind like like kind of hard the time
that it takes you to write the fancy
harness, the next model comes out and
like it's good enough that like you
didn't need to have written that
harness. There's kind of like a thing
there's a thing with like coding agents
where if you watch carefully what's
happening there, they really kind of
collapse down to just the ability to run
bash, right? Like they only need the one
to they only need the one tool,
&gt;&gt; but they can pyth bash, right? Like all
they need is bash and then they can find
their way into the rest of everything
else there, right? and a and stuff
&gt;&gt; like you're giving you're giving the LM
you're giving 46 access to an
environment that has fuzzers and
debuggers in it like to what extent is
it using tools versus to what extent is
it like looking at code and then making
inferences about what's in the code?
&gt;&gt; Yeah. So, it usually is just looking at
code to like an annoying degree where
like I'm I'm sure that someone could
come up with like a better prompting
thing that like would like have it use
the tools more, you know? Okay. It's
like
&gt;&gt; a thing that has a really hard time with
is running GDB interactively.
&gt;&gt; Um.
&gt;&gt; Huh.
&gt;&gt; It's like like the harness is just like
not set up like yeah the quad code
harness the codeex clonus because like
it has to launch the program and then
send in send keys to it which is like
just like not exactly how the harness is
set up. And so like what you'll find
when it does is instead it runs GDB um
and just reruns the program from init
passing the sequence of commands that it
wants and then it runs and hits the
break point and stops and then it reruns
the whole command again and just like
adds on like the next step which is like
a terribly inefficient way of doing the
thing.
&gt;&gt; Yeah, [laughter] exactly. But like you
know like it's like sometimes like
they're just like not very good and like
they do these dumb stuff. Um, sometimes
it would be generally better if they
done did more of this, but like yeah,
again, we could do more to like improve
the harnesses.
&gt;&gt; They are smart enough to go through the
git logs and see if there were previous
vulnerabilities and then generalize from
the vulnerabilities.
&gt;&gt; Yes,
&gt;&gt; they do. They do this too. Yes,
&gt;&gt; they're also dumb enough when I'm like
in a fresh context to be like revert the
thing you just did. They're like, okay,
I will go to a previous git commit. I'm
like, there is no previous git commit.
&gt;&gt; Commit. do like shut up robot.
&gt;&gt; Yeah. What [snorts] So like while you're
on the topic of like 45 and harnesses
and all that, like what changed 45 to
46? Like is there like was it like a
step function there for you or like
