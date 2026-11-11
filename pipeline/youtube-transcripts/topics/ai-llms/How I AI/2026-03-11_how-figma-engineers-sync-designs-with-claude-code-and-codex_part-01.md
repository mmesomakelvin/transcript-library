---
video_id: "I5X4_mYoiM8"
title: "How Figma engineers sync designs with Claude Code and Codex"
channel: "How I AI"
topic: "ai-llms"
published_date: "2026-03-11"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=I5X4_mYoiM8"
duration: 2421
word_count: 3996
chunk: 1
total_chunks: 3
parent_video_id: "I5X4_mYoiM8"
---
The energy that we've rediscovered
around those spikes, where we're all
just prototyping and throwing it all
into the same place, momentum begets
momentum. And so, having the team
together riffing and yes anding and
trying the stuff out is really great.
&gt;&gt; This feels like pair programming for
designers and engineers. And you can
work very quickly back and forth using
the MCP as a connector here.
&gt;&gt; Oftentimes, the code base gets way ahead
of where the actual design file is and
there's states or workflows that just
don't exist at all within the design
file. So, what I can do is say send all
five states sign up flow to Figma. Now,
what the agent's going to do is read my
code base, understand what I'm referring
to when I say those five states, and for
each one of those, it's going to
individually import that one by one into
Figma such that the Figma document will
then have all of those states laid out
all side by side so that my design
partner can work against it.
&gt;&gt; It's definitely changed our workflows in
a way that it's kind of really blown up
what our workflow even is.
&gt;&gt; I spend quite a lot of my time just
sitting here inside of my terminal now.
I often have two, three, up to five,
maybe Claude code instances running all
at the same time working on different
aspects of the work that I'm tracking.
&gt;&gt; Welcome back to How I AI. I'm Claire Vo,
product leader and AI obsessive here on
a mission to help you build better with
these new tools. Today, we have Alex, an
engineer, and Gee, a designer from
Figma. And they're going to show us the
new world and the new workflows of
design, code, and back to design. I'm
really excited about this one because
it's going to show you how more
forward-looking teams are thinking about
the interplay between design and
engineering teams, how designs don't
have to be static artifacts either in
Figma or in code, and we're going to get
some tips and tricks on how you can use
skills in your repo to take away toil
both for engineers and for designers.
Let's get to it. This episode is brought
to you by Optimizely. Most marketing
teams aren't short on ideas, but what
they are short on is time. And that's
exactly what Optimizely Opal gives you
back. With AI agents that handle real
marketing workflows. You know, like
creating content and checking
compliance, generating experiment
variations, personalizing user
experiences, analyzing pages for GEO,
even tasks like approvals and reporting.
It's your AI agent orchestration
platform for marketing and digital
teams. Plugging seamlessly into the
tools you already use, handling the
boring busy work, and keeping everything
on brand. That leaves marketers with
more time to do your actual job. See
what Opal can automate for your team by
signing up for a free enterprise agentic
AI workshop with Optimizely. Find out
more at optimizely.com/howiai.
Attend live and you'll get a free pair
of Ray-Ban Meta AI glasses. Welcome to
How I AI, Alex Gee. I am so psyched for
you all to be here because we get to
finally answer definitively the question
on everyone's mind, which is which comes
first, the design or the code? Is that
right? Do we get to Do we get to finally
decide that today or are you going to
force us to watch both directions?
&gt;&gt; I think the answer is it depends. So, my
my favorite answer.
&gt;&gt; Your favorite answer. And what I love
about what Figma is doing right now is
it's building the product for every team
that has realized it just depends. What
are we going to do here? And so,
I know that your business has to have
changed a lot. Your product has to have
changed a lot in the last couple years
because the way people design and build
software now changes so much. And I'm
sure that has impact both on how you
think about what product you're
building, but also how you yourself
build products. So, I'm curious, how has
this shifted how Figma approaches the
internal design and development process?
&gt;&gt; I mean, it's definitely changed uh our
workflows. Um and in the way that it's
kind of really blown up what our
workflow even is.
Uh before, you know, for the the
majority of our careers, we've had a
very like
uh linear agreed-upon workflow where the
where you increase fidelity as you go
on, right? Because it's really expensive
to work in code, and it's really cheap
just to trade ideas and sketch them out.
But, AI basically collapsed that, and
it's just as cheap to riff in code as it
is to riff in design. And so, a lot of
times where we used to like mock up
these kind of grayscale wireframes to
point at what things should be, we can
get functional wireframes straight away.
And a lot of times that's what we treat
these kind of vibe-coded outputs as
like, let me get to something that I can
just is malleable, I can play with, and
then let me kind of work into it, let me
bring my team in. And we're still, like
many companies right now, trying to
figure out what is the best kind of step
process. And to to Alex's point, it
depends. It really depends on the scale
of the feature, whether it's a feature
or bug or product, like what are we
trying to get to? Uh we find ourselves
reinventing a workflow almost every day,
multiple times a day, depending on the
case, um you know, uh that we have to
solve for.
&gt;&gt; What I like about what you said is is a
couple things. One, I do think up until
this point, you know, both design and
engineering felt very scarce and
expensive resources. And so, you were
always trying to reduce effort in design
by doing things like wireframes. And I I
tell the young people today, they don't
know how spoiled they are. You don't
know what like Balsamiq is or like those
old those mock mockups used to be like,
you don't know what we used to have to
do
um with wireframes. So, I think we were
always trying to figure out that and
then we were always like scarcely
protecting engineering resources. And
part of that meant more work fell on the
design team to make lots of very
specific decisions about design
implementation so that you didn't waste
engineering's time trying to figure out
is this supposed to be a rounded corner,
what's the hover effect, what's the
error state, all this kind of stuff. And
what I do appreciate about AI is
now the cost of generating really
high-quality stuff has gone down, which
means you can invest more in the pieces
that really matter and then more people
can contribute to the ultimate
experience in design. And you know,
Alex, I'm sure you feel like you can
contribute more and and you know, and
and so I think that's an interesting
change to how we had historically been
doing more of a waterfall style
product development process.
&gt;&gt; And to add to that, you also have more
exploration capacity. Because you're not
spending so long on one idea, de-risking
that one idea through meetings and
prototypes, etc. If you can shortcut to
that, you can explore more ideas. You
have more more divergence potential. And
I think that's really interesting as
well. I think we got to like going deep
on quality, but can also go wide as
well.
&gt;&gt; Yeah.
&gt;&gt; Yeah. I find that I'm spending a lot
less time doing like the mechanistic
even on the engineering side, the
mechanistic like, you know,
changing of syntax and um you know,
trying to thread data through different
call sites and more focused on the
problem-solving aspects. And I feel like
that same, you know, focus on like
problem-solving as opposed to the
mechanical work um is really what AI is
enabling on engineering as well as like
design teams.
&gt;&gt; Awesome. Well, we're going to actually
dive in and show some of this not in
theory, but in practice. And we're going
to see design starting in Codex, which
is not what I not what I expected when I
dialed into this call today that you all
were going to say, "Hey, we're going to
start over in Codex." But, that's what
we're going to do. So, do you want to
share your screen and show us what I'm
going to call the sandwich of code,
which is going to be code design code, I
think is is the process.
&gt;&gt; Love it. Yeah, let's do it. So, yeah, we
thought we'd start with Codex cuz we've
just uh recently launched this as well.
We had a launch uh for Claude, we just
launched on Codex, and we're bringing
this uh kind of MCP functionality to a
bunch of stuff. Let me see if I can just
go
go to my local host
for this project. Something that happens
a lot is uh the sources of truth diverge
between design and code. So, sometimes
some things only really exist in a state
in code, uh or you start working with a
developer and you really like elevate
what the thing was, the artifact that
you originally supplied. Or sometimes
like that just doesn't exist in code,
you've just inherited someone else's
project from forever forever ago. And
so, what's really interesting here is
that I can just open up a local page.
So, so now we've been working on as a as
a demo app, Alex and I put something
together just to show you the power of
this. Let's imagine I am working on a
thing that there isn't really a
coherent source of truth for.
Um it's just a financial tracking app.
And I really want to do some editing in
here. And the the the case that usually
comes up is that yes, I could prompt it
for these things, but it's kind of a a
wish and a hope that it gets it, or I
have to be super specific, or I have to
do install a bunch of tools that help me
kind of manipulate closer to the
material. But, what I really want to do
here is uh just ask Codex to send the
budget allocation page to
Figma.
&gt;&gt; Got it. So, what what we're seeing here,
and I think the problem you're setting
up, which I can empathize with, which is
no one ever keeps their Figma up to date
with what's the latest in prod, and prod
rarely has the hopes and dreams of what
has been designed in Figma. And, you
know, a lot of times even I do this at
Chat GPT, we've created like a Figma
page with a bunch of screenshots and
they always go out of date. And so even
for using recent designs in things like
marketing assets, not even just the
software development process, it's
really hard to keep these things in sync
because code and designer moving in
parallel tracks and there's not a common
substrate between them yet, I would say,
that can keep them sort of up to date on
both sides.
&gt;&gt; Exactly. Exactly.
&gt;&gt; That's exactly right.
&gt;&gt; Great. So then what you're using here,
if I can if I tell me if I'm wrong,
which is you have the Figma
MCP connected to Codex. So that's a
hosted MCP that you've connected. Do you
have the Figma skill also installed here
in Codex cuz I know Codex has made a big
deal about skills and so I'm
wondering if you're using those two
together.
&gt;&gt; Honestly, at some point I installed all
the skills.
&gt;&gt; Perfect.
&gt;&gt; I have no doubt that at some point I'm
using it. We also have you know, we're
yeah, we're we're exploring on how we
improve those. Alex can talk more to
those for sure.
&gt;&gt; Yeah, you can use the skills in order to
do this but you could also just ask the
MCP directly and it seems to pretty
reliably get you to uh
&gt;&gt; Ooh.
You got a clear vote. Ooh. Uh
This is really
good.
&gt;&gt; So if you actually I mean if you look at
the the page and you look at the
comparison kind of side by side,
now I have all of this in Figma. And so
not only can I do more intense kind of
direct manipulation, I can go in here
and I can like move stuff around in a
way that's much more free form that
perhaps I would have had to like really
like express with words that it should
be really burdensome and laborious to
explain which bits I want to move where
and etc. Um but my whole team can also
jump in and now we can just
exponentially scale this work versus me
solo having to do everything. Um, and
when you work in a team it's like really
helpful to leverage that.
&gt;&gt; So, for those that are listening and
maybe not watching the screen share,
what we just saw is taking a locally
hosted web app, um, and code base, and
then using the Figma MCP to then pull
the whole design of a page or component
into Figma, into a frame, and then you
can just edit that frame. And a benefit
that I didn't really think about, which
is really useful, is it's really, you
know, Figma's really built for
multi-person collaboration, multi-
player collaboration in a way that
prompting code in something like a Codex
or a Cursor or Claude code really isn't
built for. And so that broad exploration
is very, very hard to do. The other
thing that I want to say for people is,
look, I I'm a true believer, every
designer should be in in their IDE,
playing with GitHub, all that kind of
stuff.
And also, there are some orgs that just
like aren't there yet. There are some
guys and designers that aren't there
yet, that don't have the front-end
language, the prompting skills,
whatever, that are super pros in Figma,
and this is a nice stepping stone to
say, "Okay, we can get you back into a
place where you're really comfortable
with, but also use that as a way to
educate, upskill them
on how to use some of these more coding
tools to also bring their design design
skills to bear. And so I think there's
there's a kind of halfway step here that
is really useful for folks that are used
to a a design tool like Figma.
&gt;&gt; For sure.
Um, and and also to to me it's just the
I don't think with AI in general, with
uh, these kind of code tools in terms of
the precision editing that you want to
do. Um, and trust I'm I I use
the whole kind of landscape of tools to
really see kind of where these workflows
are going, and I think still the the
gold standard for me is just being able
to drag stuff around.
Um and you can do a lot with a click
that would take you 100 words to kind of
write and to like really precisely nail.
Like me no one wants to prompt for the
exact hex code or the the shade of
yellow and and that kind of stuff. Um
that's just easier to just quickly do um
and directly manipulate.
&gt;&gt; Yeah, I I just think like where are
humans get where are humans going to be
in the loop and it's going to be like
fine motor skills. And honestly, being
able to eyeball is that yellow happy or
not? Like it's very hard to go through a
a design loop or prompting loop of like,
"Oh, no, make that yellow just like a
little bit more cheerful." But when you
pull up the color picker and you start
going like this, you can really um find
the one that that works for you. So,
once you've gotten this into Figma,
you're collaborating with your team,
you're you're updating the design.
What's the next step here? Because, you
know, I can imagine you could pull this
into um another ticket and then send it
send it to an engineer and say, "Please,
could you make these updates?" But what
do you think about doing once you've
pulled it into Figma?
&gt;&gt; There's definitely a few ways that we
can do this. I can keep working myself
as I'm
working a late night because I'm really
kind of into this project and I can just
uh use MCP to bring it back to my to my
local host. I could also just ping my
engineer and say, "Hey, do you have an
instance of this running? Do you want to
like just
up like upload it yourself and just work
on it?" Um so, from here we've created
this kind of shared common ground where
uh different people can plug in and just
grab things out um versus it living on
my machine, having to branch it, having
to get grapple with all that uh
technical uh complexity. Um and
actually, it's a good point. Alex, do
you want to
uh try and implement some of these other
changes that we've kind of put together?
&gt;&gt; Yeah, absolutely. So, let's say I want
to implement this particular variant. Um
what I can do is I can copy the URL of
that and go right back into
my cloud code session. So, uh I have the
uh uh app also loaded uh here locally,
and I can say, "Bring the changes from
this component into my code base."
And which component is it? It's the
This is for uh
on the budget allocations page.
And it's going to then use the Figma MCP
server in a different way. This one
allows it to take uh stuff that's
currently within the Figma document and
automatically transform that into code,
which then gets reconciled with your
local code base, and automatically
applies those changes um for you
automatically. So.
&gt;&gt; Again, I need to have like an old lady
moment, which is I tell people, you
know, when I used to have to like walk
uphill both ways for my CSS. Thinking
about what I used to have to do to get a
close to pick and I was on both sides of
the table. I was a designer, and then I
was an engineer, to get like a
pixel-perfect version of whatever
somebody had mocked up. And I mean, we
didn't even have Figma that I was doing
thing I was making Photoshop PSDs for
the real olds out there. And I just the
ability to like pull in what's the size
of this, how's it supposed to look,
what's the alignment,
all through just typing, still to this
day blows my mind. Alex, I'm curious how
this has just changed your relationship
with what your job is as a software
engineer. I know you said like the
mechanistic pieces
are have gone away, but what does this
do from you for from like a time like
how you spend your time perspective?
&gt;&gt; Yeah, I mean, I spend quite a lot of my
time just sitting here inside of my
terminal now. Um I I do so much less, I
think, of the uh like what I used to
have to do where I had to have a browser
window open at the same time as having
my code window open. Uh there are times
where I need to check those types of,
you know, product-oriented flows, but
there's actually quite a few changes,
especially when they're kind of
mechanistic in nature like this, where I
don't even necessarily have to have, uh,
you know, the visual, uh, in order to
get the work done. So, um, I often have
two, three, up to five daily Claude
code, um, instances running all at the
same time, working on different aspects
of the work that I'm I'm tracking. So,
some of them might be doing things that
are just reconciling the design file
with the code base, but other ones might
be working on exploratory things,
answering questions that I have about
the code base, writing specs and
documentation that we've talked about in
a little bit, and kind of my workflow
around, uh,
grounding technical specifications
inside of code bases.
Um, I'm just going to allow Claude to
progress here. Um, so, it was able to
find what those differences were between
the, uh, design file and the code base,
and, um, it's actually going ahead and
applying them.
&gt;&gt; And what's amazing to me, and I think
people don't don't articulate enough
about, let's call it a multimodal AI,
or, you know, computer vision, all this
stuff, is it doesn't have to be you
dragging a PNG of the file into Claude
code, it it reading that through a
vision model, and then making some
inferences about it, and designing it.
You're actually doing this like sort of
pseudo structured data to pseudo
structured data translation through the
MCP, which has to have much higher
accuracy, but it's translating
functionally visual information, which I
think is
just so nifty. I I love it. Um,
ha has has this changed kind of your
mental model of what is I mean, I think
Figma in general has pushed forward
everybody's mental model of like how you
encode design into data, but I'm
curious, how are you all evolving your
thinking when you have all these
multimodal models at your, um,
at your fingertips, when you can do kind
of structured data to other structured
data translations? Has that inspired any
ideas internally about what the future
of design looks like?
&gt;&gt; What's really interesting about like our
our role with all of this is kind of
really moved upstream
and we're in this really
I find almost decadent moment in time
where before we had to be so conditioned
on
really sharp product decision-making
skill that would have happened like
almost immediately and being able to
like quickly reason with stuff and
quickly get to really good craft because
the bulk of the time was spent building
and so the longer you ate into that the
more P0s became P1s and P2s and so now
we're kind of actually at this point
