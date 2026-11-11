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
chunk: 2
total_chunks: 3
parent_video_id: "I5X4_mYoiM8"
---
where more of the priorities can make it
above the cut line and also we can spend
a lot more time in the planning stage.
You asked me like does this start with
with design or with code? Actually I
start a lot of it with planning and just
like really riffing and allowing myself
and indulging in the possibilities and
then kind of riffing in in something
that you know if if it I need it to be
something that can only exist in code
it'll be coded but otherwise I will
diverge in design but I see design as
much more at this kind of like what
should we be building
stage of the conversation which we were
before but it was like a very rushed
moment there
and now we can spend a lot more time in
it because we know that actually the the
building will happen a lot quicker and
so we do that and then on the other side
we spend a lot more time in the craft
because we can because we can reach
higher for ideas
because before we're like well I don't
know hope hope hopefully an engineer
will get my attention. Now I can spend a
lot a lot longer in that moment.
&gt;&gt; I love that you call this a decadent
moment because it was two years ago at
Config actually I gave a talk on the
future of product management and I said
this is the era of yes like this idea of
the cut line has to disappear and how
many planning meetings have we all been
in where we look at a design and an
engineer goes oh well that's just going
to add scope like we got to cut scope or
we look at a a priority planning meeting
and we say, "Oh, that that that little
fix that everybody hates in our app, I
know that everybody hates it, but it's
not a P0 priority, so it's got to, you
know, go go next year." And I do think
this idea that you can really have an
abundance
a feature level abundance mindset
is is and and the craft level abundance
mindset where you can put the polish and
all the things that make these
experiences night are one of the
benefits of working with AI right now.
&gt;&gt; So, it's done here. It's applied the
patch and um now you can actually see
that the uh app has been updated and it
looks exactly like what the Figma design
looked like, but uh has been applied
entirely within code.
&gt;&gt; And so, the benefit we got here, just to
reiterate for folks that are not
watching, is
to get an existing app
that had drifted very far from the
original file in Figma. Happens to the
best of us. We programmatically pulled
it into Figma. We used our beautiful,
fine-tuned opposable thumbs and fingers
to actually drag and create the perfect
design that we wanted in Figma, and then
that's very easily pulled in by an
engineer like Alex, Claude code,
whatever your code is,
built the code, didn't even look.
I mean, you you did look, but like
didn't have to look at the design, and
now it can be deployed pixel perfect.
Everybody's happy. That's how it works.
&gt;&gt; That's how it works.
&gt;&gt; Okay, now we're just hitting the rubber
wall and we're going the other
direction. So, you're going to show me
how we can start with no design, go from
Claude code into a design, and then I'm
presuming back to Codex in this
episode's just going to be
a ping pong back and forth. So, Alex,
how would you, as a engineer,
no design setup, actually start
designing something in Figma?
&gt;&gt; Oftentimes, like the code base gets way
ahead of where the actual design file
is, and there's states or workflows that
just don't exist at all within the
design file. And I want to show you a
little demo of like how you can actually
take all of those states that don't
exist within your design file, but exist
within your code base, bring them into a
Figma design file so that uh your design
collaborators can work directly off
those. Uh here I've been working on a
sign-up flow for a uh new app that I've
been working on and there's a few
different states of the sign-up flow,
but not all of those states exist within
my design file. And so what I can do is
say uh send all five states
of the sign-up flow to Figma.
Now the agent's going to do is uh read
my code base, understand what I'm
referring to when I say those five
states. And for each one of those it's
going to individually import that one by
one into Figma. Such that the Figma
document will then have all of those
states laid out all side by side so that
G, my design partner, can uh work
against it.
&gt;&gt; Yeah, again, I'm just going to go back
to how it was before and I'm having
flashbacks to these design packages that
I used to send over to engineering where
every single error state, every bit of
copy, every this flashes yellow, this
flashes red, this has orange, this is
the hover state was documented,
designed, lovingly crafted pixel by
pixel.
And the ability here I again, I think
for a designer even to say like, "Can
you remind me what happens when
you have a correct email but an
incorrect password on this sign-in flow
and like what is our error state?"
Without having to go into the code and
without having to replicate that
in production
is pretty powerful. And then you layer
on top of that,
"Oh cool, it's actually in a Figma
component so I can go in and and edit
it. It's not just a screenshot." is is
quite nice. And so right here
is this in Figma?
&gt;&gt; These are all the browser windows that I
had opened up, but here is now the Figma
document that has all of those states
laid out side by side Um and you can see
that each one of them was imported as
part of this like exact flow all into
the same Figma file and I can now send
this link over to my design partner so
that while I'm working on my side of the
code base
they can actually
get started on riffing on this
experimenting with different colors
patterns etc. All while I'm doing my my
normal development work.
&gt;&gt; This feels like pair programming for
designers and engineers together. It's
such an interesting new way new you know
as you said at the beginning like a new
workflow to think about where you're
both in different expressions of the
same part of the app and you can work
very quickly back and forth using the
MCP as a connector here.
Do you find yourself doing more
synchronous work or more asynchronous
work because of this?
&gt;&gt; I find that asynchronous work tends to
be like my default now. However, I do
find that like there's something that's
really special about synchronously
working through things like with your
collaborators whether it's other
engineers or designers remote oriented
environments like you know you you get a
lot of benefits about being able to like
work you know around the clock basically
regardless of you know where everyone's
located but there's something that's
still really special about putting
everyone together in one place and
having that collaborative canvas
experience that really brings everyone
together. I think it's still something
that you can't quite replace even with
pull requests even with you know
jumping on you know screen share
there's something that feels different
when you know folks can freestyle over
here and other folks can be working on
something else totally unrelated but in
the same shared space and see each other
like kind of work in real time.
&gt;&gt; I think with this kind of tool
it's really re-enabled a lot of the sync
work we went. It's funny you're talking
about the handoffs of packages. It's I
often feel that it's it's like the
Planet of the Apes analogy where we've
gone so far into the future or in the
past where like technology is sci-fi,
but we're back in this like thing of
handing over USB sticks. Here's my
version. Here's version controlling
things. And you know now with this I can
like be working on an idea with my team
together and
the energy that we've rediscovered
around those spikes where we're all just
prototyping and throwing it all into the
same place and it doesn't feel like oh
I'm going to work into this and tomorrow
I'll show you a version and then you'll
show me a version. Like momentum begets
momentum and so having the team together
riffing and yes anding and trying the
stuff out is
really great. There are going to be
moments where it's like all right, I
think we've we we've had a good good
uh jam here now let's go deep and that's
fine. Let's go converge, but there is
something to be said about even in
remote environments uh jumping into a
Figma file and just seeing cursors
flying around and trying out stuff. I
haven't found a better alternative for
that and I'm hoping if anybody does
it'll be us
um to be honest.
&gt;&gt; One one thing that I want to call out is
we've talked a lot on this podcast about
engineering toil and reducing
engineering toil through AI and Alex we
might see some of that in in just a
little bit of how do you structure your
process and reduce the you know as you
say the mechanistic parts of your work
or the kind of tactical parts of your
work. There is design toil out there.
There is copying and pasting files.
There is this version final final V2 V3
final final signed off by boss. Just
kidding final again. Like there you know
there's who's rounding these corners and
checking that you know the fonts are
matching or that the capitalization's
right. There's a lot of design toil that
goes into building a beautiful product.
And the other thing that I see is AI can
just strip a lot of that work away and
again
leave you focusing on the higher
leverage uses of your talent and
contribute contributions to your product
which I think results in a higher
engaged team.
&gt;&gt; That's good.
&gt;&gt; Yeah, absolutely.
&gt;&gt; Great. Okay, we're going to wrap with
one last use case which is not Figma
related but is has been really powerful
in your workflow Alex which is
everybody's favorite new primitive of
the AI stack the skill. So let's see a
couple of skills that you found useful
to install as an engineer why you picked
them why you built them and how you use
them.
&gt;&gt; Uh so I may actually be someone in the
minority here where I I actually just
write a lot of the skills myself or ask
the AI to write them for me. Um a lot of
it is based on um just consistently
having I I kind of think of them as just
like large like macros like prompts that
I can uh invoke at any like um point in
my workflow. One of the ones that I've
been using frequently uh is uh this
slash ship skill that I wrote. Um I use
it all the time uh in my workflow. Uh
often in order to get something into a
large repo like the Figma repo there's a
lot of work that's involved in just
making sure tests pass making sure um
all of the like pre-flight things are in
order and also then once it's pushed to
uh the repository checking on CI and
making sure that it correctly built and
is all green so that I can actually
merge it. Previously I would have to
kind of baby sit these um you know kind
of processes like all the way at every
single step and it just created a lot of
friction for me. Um so I wrote this
slash ship skill that I use all the
time. So inside of uh Figma we have
these things called dev boxes which are
hosted development environments that we
do most of our work in now. Part of that
dev box environment is that uh we
automatically insert like bootstrap
scripts in order to uh make it so that
when you boot your new dev environment
that any of your customizations that you
specifically have for your dev
environment also get put alongside it.
So, what you're looking at right here is
my internal Git repository that stores
all of my personal configuration for my
dev box. And I have a couple of commands
here, some of which are underneath the
the dev box command that I'll I'll talk
about in a little bit, but this this is
how I manage the dev box itself and
create new skills via it. So, I have a
skill for creating more skills
as well as a couple of just really
popular ones that I use all the time
such as addressing PR feedback and the
slash ship command that I just
mentioned.
So, what does that do? It boots up a
bunch of things and runs a bunch of
checks against the repository.
These are what I refer to as preflight
checks.
They check for things inside of the
commit to make sure I didn't
accidentally commit something that
doesn't make sense in the context of
this particular like it as well as
running lint, querying for various
packages to make sure that we're
correctly running the Basil build
commands. We use Basil for Basil for
build systems. And then finally like
pushing it to the Git repository. So,
monitoring the CI checks after push
using GitHub pull request checks in
order to do that. We use Buildkite for
our CI loop and that also gets checked.
So, once the build either succeeds or
fails, the scripts will then check
Buildkite for whether or not the logs
represented anything. And if there are
minor fixes like lint issues or
otherwise, it'll automatically push
another commit in order to fix that
particular like more minor issue. And
it'll do this up to five times with a
1-hour timeout waiting for CI. There's
also a handful of things that are
you know as things as I I went through
like encouraging and not to force push
just in case
&gt;&gt; That's the one I was looking at.
&gt;&gt; overrides something inside of my
repository or commits credentials or
things like that. But I use this skill
pretty much all the time in my dev loop
as a way once I've like hit a good state
where I think that this is ready to go
and should be like um you know
um pushed to our repository, I do
{slash} ship and then walk away from my
laptop and um it usually takes it from
there.
&gt;&gt; So one thing I want to call out, this is
giving me such inspiration, which is
every engineering org that I've ever run
has an internal wiki that has that page,
which is this is what you do before you
push a PR and you get in everybody's way
in the deploy pipeline. And every
engineering team should go through their
onboarding wiki and pull every page out,
every this is what you should do
into a skill and then give give access
to that to their entire team. And so I
think we're really shifted from this
idea of like an SOP into a skill or a
doc into a skill and I know so many
folks that have this buried in GitHub,
in um Confluence, and you can just give
somebody the job for a week to take all
that stuff and make it a skill, push it
in your repo,
and then let everybody benefit from a
systematic way to to roll out those best
practices.
&gt;&gt; Absolutely. Yeah.
&gt;&gt; Awesome.
&gt;&gt; It turns like a lot of these like
processes that would otherwise just be,
you know, based on best intentions and
whenever people remember into something
that can be fully automated and um
brought workflows by default.
&gt;&gt; Amazing. Okay, well this has been great.
Just to recap what we saw, we saw Codex
to Figma to Claude Code to Claude Code
to Figma to Figma. Um basically just
calling out you don't have to think
about your designs as a static asset
anymore. You don't have to think about
building components in code only or in
design only. These things can interact
together. Calling out the benefits of
just being to touch the design with your
cursor and collaborate live with your
colleagues and then encoding some of
your best practices into things like
skills,
encoding some of your capabilities into
things like MTPs and then everybody can
can access stuff. So, I'm going to ask
you a couple lightning round questions.
You both have to answer. They're clear
rules, so you cannot say it depends. I'm
going to start with the one that I
started this episode with with which is
Gee, code first or design first if you
had to pick one?
&gt;&gt; Design first.
&gt;&gt; I love it. And Alex?
&gt;&gt; I'd probably pick code first and
&gt;&gt; You're breaking the mold here.
&gt;&gt; And this is why Figma had to make this
MCB cuz there will never be never be
agreement here. You know, my second
question for you all
I'm in Gee, I'm I'm interested in your
opinion. Is are there any things around
AI not let's put software and you know,
design systems all this stuff aside that
you're really excited about as a
creative as a designer
that you hope people are going to start
using more talking about more?
&gt;&gt; Honestly, it's just been a
a
like platform for me just to learn more
about something that I was always
curious about and I hope that people
like see the
educational and the up skilling aspect
of it and not just outsourcing any
potential capability because it happens
across everything. Anything you wanted
to get a little bit deeper on, you can
now do it without having to troll
through links. Like it just it just
there at whatever moment you need it.
And I think
I've been diving deep into getting
deeper into shaders which before was
just pure mathematics that I had no
business playing in and now it's like,
oh wait, I can talk about it in natural
language and I can learn more about the
specific that I want to learn about.
&gt;&gt; Alex, what about you?
&gt;&gt; Yeah, I I mean I love going really deep.
We have a a massive code base at Figma
and so I love asking all of the like
quite crazy questions that I had always
like wondered about. We have an internal
service, for example, that I didn't know
the origin of its name. And so, I asked
Claude to go and figure out based on the
commit history
what the origin was, and it came back
with a really good story about like how
that came to be. It got renamed multiple
times that, you know, contributor has
since left the company many years ago.
So, this was kind of lost in the ether,
but now now
all of this lore honestly it from the
company is actually like embedded inside
of the code base and I can I can find it
now.
&gt;&gt; I'm going to bridge both of your
excitement, which is I think it's such a
fun thing to learn by querying
open-source libraries. And so, the
example of this recently is, you know,
open claw now named open claw came out,
and everybody's like so mystified.
They're like, "It's working overnight,
and it's doing all this stuff for me."
And I was like, "I'm just going to go
into this thing and figure out how it's
architected and how it actually does the
thing it does." And it was such an
interesting learning experience just to
de- compose how you would design a an
agent, and what were some of the kind of
new things that it had built. And so,
that's another thing that I recommend
either going deep in your own code base
or going deep in an open-source code
base to learn something is something
that was so inaccessible before and now
you can do basically on any open-source
library out there, which I think is is
really cool.
Okay, last question. I'll just start
with you first cuz you
know, we had a little tiny bit of
friction with with Claude code. I
noticed I sweat a little bit.
When AI is not replying how you want,
it's not doing what you want, what is
your prompting technique? Do you do you
like just slash clear and kill it? Like
what do you do?
&gt;&gt; That that can work, but I find that the
more successful one is
is it's either cursing a little bit
in the prompt.
I I you know,
I am somewhat ashamed to admit that it
that's extremely effective, but the more
common one I I use now is that my boss
is mad at me
and it seems to work pretty well.
It it kind of sympathizes with you and
it's it's it's kind of cute.
&gt;&gt; I you know I say sometimes say about
this about parenting. I tell my kids I
only yell at you because it works.
I don't want to yell at you.
But sometimes it's the only thing that
you guys listen to. Guy, what about what
about you? Are you also Do you also
&gt;&gt; I I have to take the gentle parenting
route. I'm terrified of the robots
taking over and reading through my
prompt history.
I'm still on the make no mistakes camp.
&gt;&gt; Make make no mistakes. I am very polite.
I I kind of go with like no like I sound
really like sad. I'm like no or I do
sort of growth mindset parenting where I
say I believe you can do it. I believe
you're capable of solving this problem
if you just apply yourself.
&gt;&gt; You can do all things.
&gt;&gt; Alex, Guy, this was so great. Where can
we find you both and how can we be
helpful to you?
