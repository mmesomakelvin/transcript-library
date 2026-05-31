---
video_id: "We7BZVKbCVw"
title: "Head of Claude Code: What happens after coding is solved | Boris Cherny"
channel: "Lenny's Podcast"
topic: "ai-llms"
published_date: "2026-02-19"
ingested_date: "2026-05-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=We7BZVKbCVw"
duration: 5265
word_count: 3995
chunk: 4
total_chunks: 6
parent_video_id: "We7BZVKbCVw"
---
in the last 6 months is a little bit
different and
it's look at what the model is trying to
do
and make that a little bit easier.
And so when we first started building
Quad Code, I think a lot of the way that
people approached designing things with
LLMs is they kind of put the model in a
box. And they were here's this
application that I want to build. I want
it to do. Model, you're going to do this
one component of it. Here's the way that
you're going to interact with these
tools and APIs and whatever.
And for Quad Code, we inverted that. We
said the product is the model. We want
to expose it. We want to put the minimal
scaffolding around it, give it the
minimal set of tools. So it can do the
things. It can decide which tools to run
it can decide in what order to run them
in and so on.
And I I think a lot of this was just
based on kind of latent demand of what
the model wanted to do. And so in
research, we call this being on
distribution.
Uh you want to see like what the model
is trying to do. In product terms,
latent demand is just the same exact
concept, but applied to the model.
You talked about Quad Code. Something
that I saw you talk about when you
launched that initially is you your team
built that in 10 days.
That's insane. Uh I think that it came
out I think it was like, you know, used
by millions of people pretty quickly.
Something like that being built in 10
days.
Uh anything there any stories there
other than just it was just, you know,
we used Quad Code to build it. That's
it.
Yeah, it it it It's funny. Uh
Quad Code, like I said, when we released
it, it was not immediately a hit. It
became a hit over time and there was a
few inflection points. So, one was, you
know, like Opus 4.
Uh it just really really inflected. And
then in November, it inflected. And it
just keeps inflecting. It The growth
just keeps getting steeper and steeper
and steeper every day.
But, you know, for the first few months,
it wasn't a hit. Uh people used it, but
a lot of people couldn't figure out how
to use it. They didn't know what it was
for. The model still like wasn't very
good.
Quad Code, when we released it, it was
just immediately a hit. Much more so
than Quad Code it was early on.
I think a lot of the credit, honestly,
just goes to like Felix and and Sam and
the and Jenny and the the team that
built this. It's just an incredibly
strong team.
And again, the the place Quad Code came
from is just this latent demand. Like,
we saw people using Quad Code for these
non-technical things.
And we're trying to figure out what do
we do. And so, for a few months, the
team was exploring. They were trying all
sorts of different options.
And in the end, someone was just like,
"Okay, what what if we just take Quad
Code and put it in the desktop app?"
And that's essentially the thing that
worked.
And so, over 10 days, they just
completely used Quad Code to build it.
Uh and you know, Quad Code is actually
there there's this very sophisticated
security system that's that's built in.
And essentially, these guardrails to
make sure that the model kind of does
the right thing. It doesn't go off the
rails.
So, for example, we ship an entire
virtual machine with it.
And Quad Code just wrote all of this
code. So, we just have to think about,
all right, how do we make this a little
bit safer, a little more self-guided for
uh people that are not engineers. It was
fully implemented with Claude code. Took
about 10 days. We launched it early. You
know, it was still pretty rough and it's
still pretty rough around the edges.
But this is kind of the way that we
learn, um, both on the product side and
on the safety side is
we have to release things a little bit
earlier than we think
so that we can get the feedback, so that
we can talk to users. We can understand
what people want and then that will
shape where the product goes in the
future. Yeah, I think that point is so
interesting and it's so unique. It
There's always been this idea, release
early, learn from users, get feedback,
iterate. The fact that
it's hard to even know what the AI is
capable of and how people will try to
use it is like is a unique reason to
start releasing things early. That will
help you as you
exactly describe this idea of what is
the latent demand in this thing that we
didn't really know. Let's put it out
there and see what people do with it.
Yeah, and at Anthropic as a safety lab,
the other dimension of that is safety.
Cuz, um, you know, like when you think
about model safety, there's a bunch of
different ways to study it. Sort of the
lowest level is alignment and
mechanistic interpretability. So this is
when we train the model, we want to make
sure that it's safe.
We
at this point have like pretty
sophisticated technology to understand
what's happening in the neurons, to
trace it. And so, for example, like if
there's a neuron related to deception,
we can start We're we're starting to get
to the point where we can monitor it and
understand that it's activating.
Um, and so this is just This is
alignment. This is mechanistic
interpretability. It's like the lowest
layer.
The second layer is evals. And this is
essentially a laboratory setting. The
model is in a petri dish and you study
it. And you put in a synthetic situation
and just say, "Okay, like model, what do
you do? And are you doing the right
thing? Is it aligned? Is it safe?"
And then the third layer is seeing how
the model behaves in the wild.
And as the model gets more
sophisticated, this this becomes so
important because it might look very
good on these first two layers, but not
great on the third one.
We released Claude code really early
because we wanted to study safety.
And we actually used it within Anthropic
for, I think, 4 or 5 months or something
before we released it because we weren't
really sure like this is the first agent
that you know, the first big agent that
I think folks had released at that
point. Um it was definitely the first,
uh, you know, coding agent that became
broadly used. And so we weren't sure if
it was safe. And so we actually had to
study it internally for a long time
before we felt good about that. And even
since, you know, there's a lot that
we've learned about alignment, there's a
lot that we've learned about safety that
we've been able to put back into the
model, back into the product.
And for Claude work it's pretty similar.
Uh, the model's in this new setting,
it's, you know, doing these tasks that
are not engineering tasks. It's an agent
that's acting on your behalf. It looks
good on alignment, it looks good on
evals. We tried it internally, it looks
good. We tried it with a few customers,
it looks good. Now we have to make sure
it's safe in the real world. And so
that's why we released a little early,
that's why we call it a research
preview. Um, but yeah, it's just it's
constantly improving. Um, and this is
really the only way to to make sure that
over the long term the model is aligned
and it's doing the right things.
It's such a wild space that you work in
where there's this insane competition
and pace. At the same time, there's this
fear that if you get some if that like,
you know, the god can escape and cause
damage. And just finding that balance
must be so challenging. What I'm hearing
is there's kind of these three layers
and I know there's like this could be a
whole podcast conversation is how you
all think about
the safety piece. But just what I'm
hearing is there's these three layers
you work with. Uh, there's kind of like
observing the model thinking and
operating. There's tests, evals that
tell you this is doing bad things and
then releasing it early. I haven't
actually heard a ton about that first
piece. That is so cool. So you guys can
there's an observability tool that can
let you peek inside the model's brain
and see how it's thinking and where it's
heading. Yeah, you should, uh, you
should at some point have Chris Olah on
the podcast because, uh, he he's just
the industry expert on this. He he
invented this field of, uh, we call it
mechanistic interpretability. Uh, and
the the idea is, uh,
you know, like I I did this core like
what is your brain? Like what are
what is it? It's like a a bunch of
neurons that are connected. And so what
you can do is like in a human brain or
an animal brain, you can study it at
this kind of mechanistic level to
understand what the neurons are doing.
It turns out surprisingly a lot of this
does translate to models also. So model
neurons are not the same as animal
neurons, but they behave similarly in a
lot of ways.
And so we've been able to learn just a
ton about the way these neurons work,
about, you know, this layer or this
neuron maps to this concept.
How particular concepts are encoded, how
the model does planning, how it how it
thinks ahead.
You know, like
a long time ago we weren't sure if the
model was just predicting the next token
or is doing something a little bit
deeper. Now I think there's actually
quite strong evidence that it is doing
something a little bit deeper.
And then the structures that allow it to
do this are pretty sophisticated now.
Where as the models get bigger, it's not
just like a single neuron that
corresponds to a concept. A single
neuron might correspond to a dozen
concepts. And if it's activated together
with other neurons, this is called
superposition.
And together it represents this more
sophisticated concept. And it is just
something we're learning about all the
time.
You know, and for Anthropic as as we
think about the way this space evolves,
doing this in a way that is safe and
good for the world is just this is the
reason that we exist.
And this is the reason that everyone is
at Anthropic.
Everyone that is here, this is the
reason why they're here.
So a lot of this work we actually open
source. We publish it a lot.
And you know, we publish very freely to
talk about this. Just so we can inspire
other labs that are working on similar
things
to do it in a way that's safe.
And this is something that we've been
doing for Claude Code also. We call this
the race to the top internally.
And so for Claude Code for example, we
released an open source sandbox. And
this is a sandbox they can run the the
agent in. And it just makes sure that
there's certain boundaries and it can't
access like everything on your system.
And we made that open source and it
actually works with any agent, not just
Claude Code. Because we wanted to make
it really easy for others to do the same
thing. Um, so this is just the same
principle of race to the top. Um, we we
want to make sure this thing goes well
and this is just the this is the lever
that we have.
Incredible. Okay. I definitely want to
spend more time on that. I I will follow
up with this suggestion. Something else
that I've been noticing in the in the
field across engineers, product
managers, others that work with agents
is there's this kind of anxiety people
feel when their agents aren't working.
There's a sense that like oh man oh
needs to has a question and answer or
it's like blocked on something or it's
or I just like I I'm like there's all
this productivity I'm losing I can't I
like I need to wake up and get it going
again. Is that something you feel? Is
that something your team feels? Do you
feel like this is a a problem we need to
track and think about?
&gt;&gt; I always have a bunch of agents running.
So like at the moment I have like five
agents running. And at any moment like
you know like I I wake up and I I start
a bunch of agents. Like the first thing
I did when I woke up was like oh man I I
want everybody want to check this thing.
So like I opened up my phone, Claude iOS
app, code tab,
uh you know like agent do do blah blah
blah. Cuz I I wrote some code yesterday
and I was like wait did did I do this
right? I was like kind of double double
guessing something and and it was
correct. But now it's just like so easy
to do this.
So I don't know there is this little bit
of anxiety maybe. I personally haven't
really felt it just cuz I have agents
running all the time. Um, and I'm also
just like not locked into a terminal
anymore. Maybe a third of my code now is
in the terminal but also a third is uh
using the desktop app and then a third
is the iOS app which is just so
surprising cuz I did not think that this
would be the way that I code uh in even
in 2026. I love that you just describe
it as coding still which is just talking
to the to Claude code to code for you
essentially. And it's interesting that
this is now like this is now coding.
Coding now is describing what you want
not writing actual code.
I I I kind of wonder if uh the people
that used to code using punch cards or
whatever if you show them software what
they would have said
&gt;&gt; Isn't that crazy?
I I remember reading something. This was
a maybe like very early versions of like
ACM
uh
like like magazine or something.
Where people were saying, "No, it's not
the same thing. Like this isn't this
isn't really coding."
Uh and then you know like they they
called it programming. I think coding is
kind of a new word.
But I kind of think about those like in
the back in the you know my family's
from the Soviet Union. I would you know
I I was born in Ukraine.
Um and my grandpa was actually one of
the first programmers in the Soviet
Union.
And he programmed using punch cards.
And uh you know like he he told my mom
uh growing up told these stories of like
or she she told these stories of when
she was growing up he would bring these
punch cards home and there was just
these like big stacks of punch cards.
And for her she would like draw all over
them with crayons and that was like her
childhood memory. But for him that was
like his experience of programming and
he actually never saw the software
transition.
But at some point it did transition to
software and I think there's probably
this older generation of programmers
that just didn't take software very
seriously. And then they would have been
like, "Well, you know, it's not really
coding."
But I I I think this is a field that
just has always been changing in this
way.
Uh I don't think you know this, but I
was born in Ukraine also.
Oh, I don't know that. Yeah, which town?
I'm from Odessa.
Oh, me too.
You what? [laughter] Yeah, that's crazy.
Wow, incredible. Wait a moment. Uh maybe
we're related in some small way.
Uh what year did your did you leave and
your family leave?
Uh we came in '95. Okay, we left in '88.
A little earlier. Um yeah. What a
different life that would have been to
not to not leave, huh?
Yeah, I just I feel I feel so lucky
every day that uh get get to grow up
here.
Yeah, my family anytime there's like a
toaster or a meal they're just like to
America.
Yeah,
it's like it okay, enough about that,
but you get it, you know, once you start
really thinking about what life could
have been.
Yeah, yeah, exactly. Yeah, we do the we
do the same toast, but it's still vodka.
Still vodka, absolutely.
&gt;&gt; [laughter]
&gt;&gt; Oh man. Okay, let me ask you a couple
more things here.
You shared some really cool tips for how
to get the most out of AI, how to build
on AI, how to build great products on
AI. One tip you shared is give your team
as many tokens as they want, just like
let them experiment. You also shared
just advice generally of just build
towards the model where the model's
going, not to where it is today. What
other advice do you have for folks that
are trying to build AI products?
I'd probably share a few more things.
So, one is don't try to box the model
in.
Um I I think a lot of people's instinct
when they build on the model is they try
to make it behave a very particular way.
They're like, you know, this is a
component of a bigger system. I I think
some examples of this are people
layering like very strict workflows on
the model, for example. You know, to say
like you must do step one, then step
two, then step three, and you have this
like very fancy orchestrator doing this.
But actually almost always you get
better results if you just give the
model tools, you give it a goal, and you
let it figure it out. I think a year ago
you actually needed a lot of the
scaffolding, but nowadays you don't
really need it.
So, you know, I don't know what to call
this principle, but it's like, you know,
like ask not what the model can do for
you. Maybe maybe it's something like
this. Just think about how do you give
the model the tools to do things? Don't
try to over curate it. Don't try to put
it into a box.
Don't try to give it a bunch of context
up front. Give it a tool so that it can
get the context it needs. You're just
going to get better results.
I think a second one is um
maybe actually like a a more even more
general version of this principle is
just the bitter lesson.
Uh and I actually for the Quadko team we
have a you know, hopefully hopefully um
listeners have have read this, but Rich
Sutton had this blog post maybe 10 years
ago called the bitter lesson.
Uh and it's actually a really simple
idea. His idea was that the more general
model will always outperform the more
specific model.
And I think for him he was talking about
like self-driving cars and other domains
like this.
But actually there's just so many
corollaries to the bitter lesson.
And for me the biggest one is just
always bet on the more general model.
And you know, over the long term, like
don't don't try to use tiny models for
stuff. Don't try to like fine-tune.
Don't try to do any of this stuff.
There's like some applications, you
know, there's some reasons to do this,
but almost always try to bet on the more
general model if you can, if you have
that flexibility.
Um and so these workflows are
essentially a way that uh
you know, it's it's not it's not a
general model. It's putting the
scaffolding around it. And in general,
what we see is maybe scaffolding can
improve performance maybe 10 20%
something like this.
But often these gains just get wiped out
with the next model.
Uh so it's almost better to just wait
for the next one.
And I think maybe this is a final
principle and something that Quad Code I
think got right in hindsight. From the
very beginning, we bet on building for
the model 6 months from now.
Not for the model of today.
And
for the very early versions of the
product, I just wrote so little of my
code cuz I I didn't trust it. Cuz you
know, it was like Sonnet 3.5, then it
was like 3.6 or
forget 3 3.5 new whatever whatever
whatever name we gave it.
Um these models just weren't very good
at coding yet. Um they were they were
getting there, but it was still pretty
early.
So back then, the model did uh you you
used to get for me. It automated some
things, but it it really wasn't doing a
huge amount of my coding.
And so the bet with Quad Code was at
some point the model gets good enough
that it can just write a lot of the
code. And this is the thing that we
first started seeing with Opus 4 and
Sonnet 4. And Opus 4 was our first kind
of ASL 3 class model
uh that we released back in May.
And we just saw this inflection because
everyone started to use Quad Code for
the first time. And that was kind of
when our growth really went exponential.
And like I said, it's kind of it stayed
there.
So I think this is some This is advice
that I actually give to to a lot of
folks, especially people building
startups. It's going to be uncomfortable
cuz your product market fit won't be
very good for the first 6 months.
But if you build for the model 6 months
out,
when that model comes out, you're just
going to hit the ground running, and the
product is going to click and and start
to work.
And when you say build for the model 6
months out, what is what is it that you
think people can assume will happen? Is
it just generally it will get better at
things? Is it just like, okay, it's like
