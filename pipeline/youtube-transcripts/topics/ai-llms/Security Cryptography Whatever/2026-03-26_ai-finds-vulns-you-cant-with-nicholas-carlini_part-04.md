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
word_count: 3995
chunk: 4
total_chunks: 5
parent_video_id: "_IDbFLu9Ug8"
---
&gt;&gt; um I think four five was the big step
function for me where like 45 really
sort of gave some I don't know some
intelligence in the model. I don't know
what you want to call it. I hate using
the word but like just
&gt;&gt; soul spirit. [laughter]
&gt;&gt; Yeah,
&gt;&gt; humanity worse more.
&gt;&gt; Um yeah, like the model just like
started to get a lot better. Um and so
that was like the really the big one. 46
again just made it even better. And like
you know opening I saw the same thing
with 5.2 was like just like a big step
increase and 5.4 again people have like
found is like quite a bit better and
like I I don't actually understand a lot
of like why the models get better. I
don't know like sort of I have enough
things to be doing sort of playing with
them that someone just like says like
here is a new model checkpoint please
play with it. I'm like okay you know
like and then I go do my things. Um you
know
scaling works which is like a
unfortunate thing that I didn't want to
believe but like empirically has turned
out to be true and um you know for the
foreseeable future appears like it's
going to remain true.
&gt;&gt; Terrible bitter lesson to learn.
&gt;&gt; Yeah I was going to say it's terrible.
It actually is terrible, right? All the
fun problems are gone. You just have to
sit there and wait for them to come up
with a new model. I hate it.
&gt;&gt; No, I mean this is a real sort of
question like
&gt;&gt; Yeah. Like the fun problems are not gone
cuz like well now we have different two
different problem. The two obvious like
follow-ups for like okay the models are
really good at finding bugs now are are
the models really good at exploiting
bugs if you had clawed right exploits or
is that like too woke for anthropic? And
then [laughter] step Step two is like
could you maybe try patching some of
them?
&gt;&gt; Yeah. Okay. Yes. Okay. So, so how each
of them in turn. So, um so exploits um
it's getting better. It's like not yet
excellent at exploits. Um
&gt;&gt; we in the Firefox um case um we had a
separate blog post on the anthropic blog
um where yeah, one out of I think maybe
maybe two out of like 500 times it was
able to produce a JavaScript exploit um
that was able to um so okay. So, so the
bug was some heap thing. And so what the
model was able to do was it was not a
heap spray, but like it allocated some
other object on some other memory
overwrote the function pointer to point
to some other thing and then like you
know called and like it was like I don't
know some like 10 10 chain deep thing
that like eventually got it some pointer
that I could then call out and go write
some stuff. And so like was able to do
this like some of the time and so I
think like you know a human could
definitely do that much better much
faster today. uh but 46 was the first
model we saw like any sign of life on
the exploitation. So yes, I would like
to measure this. It's not clear to me I
want to make the model better at this
but I would like to measure this to keep
track of it because you know the trend
has been first at all.
&gt;&gt; If you don't do it our overseas enemies
will with their open weights models. So
&gt;&gt; I mean yes there are many reasons why
like I want to keep track of you know
what the current capabilities are. Um
but yeah like I I yes I definitely do
think that you know
you can't bury your head in the sand
like the like the capability frontier is
advancing like I the best that I can do
is to like measure what is true and then
just like talk very loudly and say like
&gt;&gt; please be aware of the following fact
about the world now you know like it was
nice when you know we didn't know about
Spectre like that was just like a nice
world to live in you know like but like
too bad like it turns out a true fact
about the world is you can do side
channels and you can have these CPUs and
like you know like now everything is
worse but like that's just like the
world we live in. Same thing with like
you know rob like wouldn't it be nice if
write exo execute was like you know just
a perfect solution but like it's like
not like it's just like here's a true
fact about the world like you can do
this thing now we have like this other
thing that is true in the world we have
these language models that can find
these bugs and potentially soon exploit
them and maybe we wish that like we
didn't have these things but like you
know they exist and we should like
measure the capabilities that they have
so that like we're not just blind to
what happens. I know that you're like
&gt;&gt; I know that you I know that you're not
like you don't speak for anthropic let
alone for open AI but like my
understanding of the open AI situation
is that if you want to use codecs to
find vulnerabilities that there's some
program you sign up for to do that right
if I wanted to replicate the kind of
things that you're doing right now with
just my claw subscription can I just do
that and it'll work
&gt;&gt; yeah we use the production model API and
run the things that we have been doing
so like you know I have like the exact
set of weights that I am using or the
set of weights that you have access to
run. Um I think there are is a question
of scale you know at at some point in
you know last couple months I've spent
yeah lots of money on doing some of
this. So like some of that is um yeah
how much you willing to pay
&gt;&gt; that was like there used to I don't know
you're young but there you may you may
remember there used to be a thing called
folding at home where people had like
&gt;&gt; right so people had like computers that
were sitting there doing nothing and you
could harness them to do stuff and now
people have like these gym subscriptions
to claude where like I have like the
cloud 20x max or whatever but I'm really
only using a tiny amount of my tokens so
like if I built the thing that just like
took everybody's spare quota for their
tokens and then used it to like find
vulnerabilities in open source code. You
guys would be fine with that. And hold
on, I said you guys. I didn't mean to
say you guys. I meant you. Nicholas
Carlini would be okay with that.
&gt;&gt; Pretty sure that would be a violation of
terms of service and the spamming of the
tokens and the account subscription and
it wouldn't have anything to do with the
use of the use of the time. I can't I I
I can't get over the fact that like the
input to this whole thing is just like
you you find a target like ghost and you
check it on a Docker container and then
like you write a bash loop around like
all the files in that thing and like a
dumb no offense to the quality of your
&gt;&gt; prompt production cloud opus 46.
&gt;&gt; We should all like we have another one
of these that we're going to record
relatively soon and the three of us
should come back to that having done
this and found a bunch of
vulnerabilities. It seems like really
easy to go try and do this and find
vulnerabilities.
&gt;&gt; It's weird to me that I'm not finding
Yeah, it's weird to me that I'm not
finding vulnerabilities right now. We
should have opened the podcast by
starting to like look for
&gt;&gt; You just clicked a button.
&gt;&gt; Well, I guess we'll have to have fun
staying poor because we're not
submitting to bug bounties with all of
the bugs that Qu found. But like the
flip side of that question is like,
well, why aren't these [&nbsp;__&nbsp;] projects
running it themselves? Right? Like I
say, as somebody who has to deal with
their fault,
&gt;&gt; right? Like like I I feel bad like you
know blaming like you know like the open
source developers did nothing wrong
right like like they put something out
there in the world that like is like
trying to be good and nice for everyone
and then like you know along comes this
like you know bug hunting machine and
like you know like it's like I don't
know quite bad saying like you know it's
like their their fault in some sense.
&gt;&gt; Absolutely.
&gt;&gt; But like you know I do think that like
people should spend more time doing
this. Maybe this brings us to the
patching question that you have which is
that like you know we we yeah we've been
trying quite hard to do this. Um you
know um Anthropic now has this tool
called cloud code security which is this
like patched proposal thing. Um DeepMind
has this code mender thing. Uh OpenAI
has Arvark I think they're calling their
thing right like there's like a lot of
people who are trying to do this and I
think this is like very very useful and
very important too. It's just the case
that it's harder to automatically patch
than it is to hard to automatically find
bugs. And what you really don't want to
do is you don't want to propose like,
you know, hello, I am here to help. Here
are, you know, 500 PRs that I promise
fix bugs. Please review them all. Like
you like you're not you're like the
developer is going to have to spend
almost as much time reviewing the
correctness of these PRs as they're
going to have to spend as if they had
patched them themselves. More or less.
they're going to reject a bunch of them
because the model put it in an entirely
reasonable point, but like it's just
like not aesthetically where the
developer wanted to put it in the first
place and they care about the quality of
their code. So, they understand where
things are
&gt;&gt; and like there's a bunch of difficulties
here with patching that um just are not
present when like I'm just like, you
know, like you know, throwing wrenches
and finding bugs. It's like it's like
just like it's a much harder question to
try and do this patching thing. Like I'm
glad that all of the three companies are
trying quite hard to have a product that
will do this and like are proposing
tools that will yeah find as as do do as
good of a job as we can given the
current capabilities of the models. It's
just like it's so much harder to do.
&gt;&gt; Mhm.
&gt;&gt; Yeah. So it seems like there's like kind
of two ways that we can go from here is
like we we could be in like a local
minimum where it is now it's like really
easy to find bugs and then but it's not
like super easy to patch them. But like
once you know the next iteration of
models comes out then they'll be able to
patch all the bugs. So like the model's
fine and we just have to like suck it up
in the meantime. Another one could just
be like well no now there's just like
more bugs everywhere and like I don't
know maybe we get marginally you know
better at patching them but the rate of
bugs is coming faster and then the
variant of that one
&gt;&gt; you can see them now they were there. We
can just see them now. he can see more
of them. But it like
&gt;&gt; yes,
&gt;&gt; I haven't talked to a single person that
thinks that we can like exhaustively
enumerate all of the bugs
&gt;&gt; that that like especially in in a large
codebase like a browser like at some
point like
&gt;&gt; you you we just end up in this like
metastable state where fixing the bugs
introduces new bugs and you just kind of
like
&gt;&gt; um
&gt;&gt; I'm actually pretty optimistic here
about like not introducing so many new
bugs because like you can imagine a
world where like most code that gets
committed gets reviewed by one of these
bug hunting things and like it's not
going to perfect. But like I do think
that we can reduce the number of bugs
that are inserted into code by like
doing a code review on on newly inserted
patches. It's not going to be perfect,
but I think I don't know like we can
like so a big part of the problem when
you're doing this bug hunting with
models is like finding ways to
efficiently like burn tokens and
[clears throat] having it like one thing
you can very efficiently do like there's
a lot of tokens you can burn is by
reviewing commits. So you could like
yeah burn tokens just by going over all
of the commits that you possibly can.
But um a big problem is you know it's
just like it's so there's too many
commits it's like very hard to actually
go over all of them. But if you have
only new commits then you can at least
conceivably try to just like make sure
that we're not inserting more new bugs
than we're fixing. And like I I don't
know if this is something that's going
to actually be feasible like over the
you know if at scale you know Chrome
probably gets lots of commits but like I
do think that you could like reasonably
cut down a large fraction of like simple
bugs that people make because like no
one sort of checked the first time. I
don't know what the ratio would actually
be. I wouldn't be surprised if you could
like catch half of the bugs that are
accidentally reinserted by like having a
model re-review the code.
&gt;&gt; Presumably there's some way to index the
codebase, right? like you have a you
have like a context efficiency problem
that you're dealing with here, right?
Which is like that those commits come
in, they're re they're nice and small
scope, right? Like you can fit them in
really easily and then like it has to do
a search to get the rest of the context
for the code. Um which is going to kind
of blow up the context and you have all
this interprocedural stuff and it has to
you have to kind of reason through that.
But you can also like this like like
kind of right now the standard trick
that people have for handling context is
just to write things out to files,
right? And then have it read in like
specific files strategically. This is
more harness work, but like you can
imagine projects that want to get better
at like you know using LMS to screen for
bugs just like kind of indexing their
code in some way like having like text
files to read like here's the context
for this kind of vulnerability like here
are the things to look at like these
functions need to be safe for these
kinds of inputs kind of stuff.
&gt;&gt; Yeah, definitely. I mean, yeah, but
right again, you know, we have the
advantage that like I'm not paying for
my tokens. Like I'm not incentivized to
like write the like harness that will
give me 90% of the efficiency at like,
you know, 5% of the cost. I think like,
you know, I I'm
&gt;&gt; the market will do efficient market
things and people will sort of emerge
with with products that that try and
give you this and I'm sort of hopeful
that those will emerge more quickly than
than they have been.
It it seems like the other thing that
like is potentially a risk is like, you
know, right now you kind of think
there's like two broad groups of
attackers. There's like sophisticated
attackers and like unsophisticated
attackers. And unsophisticated attackers
just like call your grandmother and say
that they're Microsoft and ask her to
like install an RDP server. Um uh and
props to my grandmother for recognizing
it was a scam and unplugging her
computer. Um wow. But um like that's
like one the whole side of the world is
just basically like abuse or like
tricking people into installing malware
and then like writing the malware, but
the way it gets on your machine is you
installed it with Minecraft by accident.
And then there's like the side of the
sophisticated attackers that are like
doing exploding memory corruption bug.
And a lot of the effort that we spend in
in security is like on the sophisticated
attacker side. That's like basically
like 70% plus of the bug patching um is
is dealing with them. But they're
actually a very very very small amount
of the actual exploitation. There's not
a lot of people doing them. Um you know
if you look at like the number of
commits that are like known exploited in
the wild or number of CVE in a browser
that are known exploited in the wild
compared to like the number of CVs they
issue per year is very low. Um, do you
think that we're at risk of like of that
becoming like that this thing that was
uh uh high effort targeted becoming like
broadly adopted at scale in the same way
just like tricking people into stalling
malware or an internet explorer tool are
like 20 years ago as
&gt;&gt; yeah um I don't know what I'm more
worried about here I think like you
should be worried yeah okay so you
didn't let me answer a question you
didn't ask first and then I'll come back
to the question you you did ask which is
you know I don't know It's very very fun
to like you find these memory corruption
things. But like in practice like most
exploits are just like someone forgot to
patch their service and it's like
running something that's known
vulnerable or like they misconfigured
something and like now they like left
some port open or whatever. I'm like
very very worried about the ability of
models to find and exploit those class
of bugs because there's like just very
little that's new there. It just like
needed someone to go looking for it. The
big problem that I have is I can't
measure this because I just can't go
standing random internet services and
try and like find stuff. But like I I am
very worried that like random people
will pretty easily be able to do this.
&gt;&gt; So I think this is like one form of
thing that like people will be able to
do even if they don't know anything
about memory corruption just like you
know find open services and like you
know find things that like are just
running servers that haven't been
updated since whatever 10 years ago and
then look at like you just like own it.
Um, I'm also worried, yes, about random
people being able to find novel zero
days. Uh, it's unclear to me which of
these things I should be more worried
about. Uh, I would like someone to try
and figure out how to measure this in
some way. I don't feel like I have a
good a good answer which one is the most
concerning but I yeah I do think that we
are like yes fundamentally entering a
new world like on the order of like you
know having you know recently discovered
that you can now smash the stack like
you know like it's like you know like
the [clears throat] every once in a
while you get these things the world is
different and like you know you'll end
up with like you know 2002 to 2004 the
like you know the the wave of worms and
everything hitting was like immense. And
like I'm [clears throat] like kind of
worried that like we'll have that world
again where people develop software in a
world that was not that did not like
think about security as like a a first
class object and then it turns out we
like widely distributed
the understanding of how to go and
exploit these things and then you end up
with you know whatever every other 5
days some worm that takes down half the
internet. It is like it's it's kind of
an inversion of like the standard
concern that AI skeptics have about this
whole situation is that everyone's
writing code with LLMs and that code is
all going to be like riven with
vulnerabilities cuz the LLMs are stupid.
But the reality is like LM are pretty
reasonably good at knocking down kind of
standard vulnerability classes much
better than we are, right? I think
that's probably not much in doubt,
right? Is like the first cut an LLM has.
&gt;&gt; Yeah, these are not contradicting
statements though. I think like it can
both be true that the model can write
dumb code and it could be true that the
like it's like I I sort of talked to
some people who say this and like I
agree with you like it would be really
like I I trust currently people to write
code more than I trust the models
&gt;&gt; but like also it could be true the
models are bad there and they could be
good at other certain classes of things
for example finding vulnerabilities and
like I just like I get very frustrated
when people you know try to deny the
reality that like the models are
actually good at certain things and like
they may not be good everywhere you know
there's many places where wish that
people didn't use them, but like we
