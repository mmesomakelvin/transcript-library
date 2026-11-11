---
video_id: "LF3aUIM57uw"
title: "The Supply and Demand of AI Tokens | Dylan Patel Interview"
channel: "Invest Like The Best"
topic: "ai-llms"
published_date: "2026-04-23"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=LF3aUIM57uw"
duration: 2733
word_count: 2232
chunk: 3
total_chunks: 3
parent_video_id: "LF3aUIM57uw"
---
I think logic also has humongous
capacity problems too. TSMC just had
their earnings. Uh they keep up in
capex. Ultimately, you know, it takes
them quite some time to build fabs. Um
they're trying to do everything they can
to squeeze every little output out of
every fab that they have. But
ultimately, they're not raising prices
fast because they're good people that
seems like. Um you know, single-digit
price increases instead of you know,
triple-digit price increases like the
memory guys have had. And so, you
ultimately have like this like market
where you know, TSMC's a great company,
but are they are they actually going to
extract all the value? I mentioned
things like copper foil, glass fibers
for PCBs, lasers. These are things that
are like well-understood and niche
supply chains, but they're very, very
tight. Um
and ultimately upstream, the
semiconductor wafer fabrication
equipment supply chain is one that like
I still think is it's gone up a lot, but
it's still very underappreciated. TSMC
capex this year, they say 56. Uh we've
had 57.4 billion since January.
Um and we may up it slightly more just
cuz we see some some ways that they can
get incremental capex. But what people
aren't focusing on is what does that
mean next year? What does that mean the
year after? And it turns out three years
from now TSMC is going to spend a
hundred billion dollars on CapEx.
Maybe two years from now, right? Might
be 28. Sincerely, they may spend a
hundred billion dollars on CapEx in
2028. And people like just can't fathom
that. But what does that mean for their
downstream supply chains?
You know, companies like Lam Research or
Applied Materials or ASML or their
further downstream supply chains like
MKSI and and all these other companies
the tail whip just gets whipped harder
harder and harder and ultimately that's
a shortage if you know TSMC wants to
spend a hundred billion dollars in 2028,
which is a real possibility. I think
people would think that's insane, but
that's a real real possibility.
&gt;&gt; What about other parts of the chip
ecosystem where GPUs have been
completely dominant? What about like
CPUs or ASICs or things that start to
pop out as both opportunities and
bottlenecks beyond just like Nvidia's
GPU dominance?
&gt;&gt; I mean ASICs are obviously taking off,
but I'll sort of pivot away from AI
chips to talk about these other things.
There's a project we did on FPGAs and
then turns out there's a hundred twenty
FPGAs per per
next generation rack
AI rack and then like what about all the
FPGA names? CPU wise all these
reinforcement learning environments plus
all the slot code you and I are
generating that is now running on some,
you know, Versel instance or whatever it
is
or some AWS instance or some bucket that
we've spun up. All of that requires CPU
and so CPUs are completely sold out and
demand is skyrocketing there.
&gt;&gt; Yeah, help people understand the role
that CPU plays in everything.
&gt;&gt; Yeah, so there's two there's two main
reasons why you need tons of CPU. One is
when you're doing reinforcement learning
the CPU is very critical to that. So so
before you would throw all the
internet's data into the model, train
it, spit it spit some it's it's some
stuff out. Now you train all the world's
internet's you put all the internet data
into the model, then you put it in this
environment. This environment is like
hey model
try this out and it tries stuff out
tries a bunch of different things and in
the end there is an environment which
scores whether or not what it tried out
is successful and it grades it. And
these environments can be anything. It
can be, "Hey, check if the text was
outputted in the right way, structured
output." It could be very simple stuff
or it could be very complex stuff. Um
and people are starting to get into very
complex things, right? Like, "Hey, I
want you to open this file, change it,
edit it, update it, submit it to this
website." I want you to open up this
physics simulation from Siemens and edit
this CAD model. So, the environments can
get more and more complex and those
environments run on CPUs. They don't run
on GPUs. They don't run on ASICs. The
ASICs run the model that takes the input
data from the environment, runs it
through the model. The model creates
outputs of various different
trajectories, right? Ways that it think
it could solve it um in different
instances.
Those trajectories are graded {slash}
scored. And the ones that are
successful, you train on and you update
and you reiterate and you iterate
iterate iterate. And so, CPUs are very
useful for that, one. And then, once you
have these great models and you're
deploying them, those models are
generating code. They're generating
useful output. That useful output, it
doesn't go from a GPU straight to the
human brain.
Um it goes from a GPU or an ASIC through
to, you know, a deployed app that you're
deploying somewhere. That actually just
runs on CPUs. So, that's another area
where there's a lot of demand and things
are sold out um in a large large way.
&gt;&gt; As you continue to assess and try to be
the world's best informed person on both
the trajectory of supply and demand,
what are things that you wish you knew
to make that understanding that you
don't know?
&gt;&gt; I think the hardest area for us
um and for everyone is understanding
tokenomics, the economics of tokens.
Um
I think we have a really tremendously
like good insight into how much it cost
to run infrastructure, what the cost of
tokens are, what the cost of models are,
what the margins of these labs are.
But, the usage and adoption is what's
really difficult to model. You know,
continuously, right? We We have these
like We had like crazy In January, we
had crazy estimates for February.
Anthropic smashed them. How do we
calibrate this model? What are the data
sources for this? February, uh we had
crazy assumptions for March and then
they smashed them. And everyone sees the
number of 10 billion and they're like,
what the How do they add 10 billion
in revenue? Who is using all these
tokens? Why are they using them? What
are they building with them? And then
more importantly, with what they're
building with these tokens, how is that
actually diffusing into the economy and
what value is that generating? Cuz it's
not really something that you can
capture in any
any GDP statistic, right? All of the
value of the tokens that I use get
transformed into better information,
which I then sell at a discount to what
people used to sell information for
relatively because
and therefore that information is now
making its way throughout the economy
and and people are making better
investment decisions or better
competitive decisions but if they're
semi-direct company or data center
company or hyper scalar. And now how how
much what what is the value of this and
what is that what is that done to the
economy? It's clearly by every
subjective metric amazing.
But where is the phantom GDP? What is
the phantom GDP? How do we track the
real economic value cuz cuz the GDP
metrics are not, you know, accurate if
you were to say, what is the GDP that
Dillon Patel is making? It's tiny
compared to what the value that I think
is being created. And so ultimately,
what is the value being created by these
tokens? Not on a basis of, you know,
just simple, you know, what is the
knock-on effect, right? What is the
knock-on effect of all the things that
these things are doing? I think that's
the real
question and challenge that's hard to
measure. I think we've got a tremendous,
you know, reading on the supply side of
things. I think we've got a tremendous
reading on even a lot of the demand side
signals but it's it's what is the value
these tokens are generating? That's hard
to quantify and measure.
&gt;&gt; I hope we get a chance to do this like
every 3 months because this changes so
quickly. What do you think's going to
happen next? Like when I when I come
back 3 months from now and we're in San
Francisco together again, what do you
expect?
&gt;&gt; Large-scale protests.
&gt;&gt; Really?
&gt;&gt; Yeah, I think there'll be a large-scale
protest against Anthropic.
And up at AI.
&gt;&gt; Expand on that a little more.
&gt;&gt; Uh people hate AI.
Um, AI is less popular than ice, less
popular than politicians. Confused how
Pew surveyed this, but apparently, AI is
less popular than politicians. You know,
with Anthropic adding so much revenue,
that's going to start causing business
changes downstream. People are going to
get more and more scared of AI. They'll
start blaming more and more of their own
problems and things that are, you know,
global, you know, have been deep-seated
problems for a long time. Those will
bubble up and be blamed on AI. Um,
probably some politician or some social
media people will start to be able to
take, uh,
influence or will be able to start
taking and weaponizing AI against
people. You look at the comments of news
articles where Sam Altman had a Molotov
cocktail thrown at his house twice in
like 2 weeks. They're like, people are
cheering it on.
Uh, and this is just the beginning. So,
I think I think we'll see large-scale
protest against AI in 3 months.
&gt;&gt; What is the counterweight to that? Like,
how should the AI industry head that
off?
&gt;&gt; First of all, Sam Altman and Dario have
to stop getting on interviews. They're
so uncharismatic.
I don't know what they're doing. Every
interview they do is like, well, normal
people are going to hate you even more.
Like, Sam being on Tucker Carlson
probably made all Republicans hate
OpenAI. And same with Dario, they just
have no charisma. I think that's first.
Two,
they need to start showing uplifting
things that can be done with AI.
Um, three, they need to stop talking
about how the capabilities are going to
change the whole world constantly
because then people are going to get
fear of that capability cuz they have no
connection.
&gt;&gt; to use it.
&gt;&gt; There's no connection to it, either.
Like, the average person doesn't know an
Anthropic employee. Average person
doesn't know an OpenAI employee. Average
person doesn't know who these people
are, what their goals are, and they just
view them as like this like sneaky cabal
of like 5,000 people at this company
that are going to change the world and
automate all the jobs and and destroy
society. That's what they view it as.
And and as people who are funding the
building of all these data centers and
and power plants that are going to
pollute the world, right? They don't
quite understand what's happening. You
know, they have to stop talking about
the future thing that's going to happen
and only talk about present, how
uplifting AI is. I think it's a huge
reorg and rebranding needs to be done.
&gt;&gt; I love doing this [music] with you.
Thanks for your time.
&gt;&gt; Awesome, thanks.
&gt;&gt; Your finance team isn't losing money on
big mistakes. It's leaking through a
thousand tiny decisions nobody's [music]
watching. Ramp puts guardrails on
spending before it happens. Real-time
limits, automatic rules, zero
firefighting. Try it at ramp.com/invest.
[music]
As your business grows, Vanta scales
with you, automating compliance and
giving you [music] a single source of
truth for security and risk. Learn more
at vanta.com/invest.
Ridgeline is redefining asset management
technology as a true partner, not just a
software vendor. They've helped firms 5x
in scale, enabling faster growth,
smarter operations, and a competitive
edge. Visit ridgelineapps.com [music] to
see what they can unlock for your firm.
Every investment firm is unique and
generic AI doesn't understand your
process. Rogo does. It's an AI platform
built specifically for Wall Street,
connected to your data, understanding
your process, and producing real
outputs. Check them out at
rogo.ai/invest.
The best AI and software companies from
OpenAI to Cursor to Perplexity use
WorkOS to become enterprise-ready
overnight, not in months. Visit
workos.com [music]
to skip the unglamorous infrastructure
work and focus on your product.
