---
video_id: "ASAaKhK1B5w"
title: "Even Anthropic Engineers Use This Claude Code Workflow"
channel: "Ray Amjad"
topic: "ai-llms"
published_date: "2026-04-15"
ingested_date: "2026-06-23"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=ASAaKhK1B5w"
duration: 750
word_count: 2804
---
Okay, so I've been doing a lot of Claude
code consulting lately to help companies
and people improve their workflows. And
one of the most powerful ideas that
people have found handy is that of
interactive artifacts. So, I'll be going
through all three layers of that, and
hopefully by the end of the video you
will be one step closer to being a power
user. Okay, so layer one, we have static
artifacts. And you may already be doing
something like this, but just in case
you aren't, I'll quickly go through what
this is. And that is generating a single
HTML file with Claude code to basically
do some brainstorming or exploration
with. So, for example, one of my most
common use cases is doing design
variations. So, this is one of my
upcoming projects, and I have this page
of application, and it looks fine, but I
feel like it could look better, but I
don't exactly know what better looks
like. So, usually in these situations,
what I do is say to Claude, "Hey, so for
the retrieval settings card, can you
give me like uh 10 variations on a HTML
file, one after another, each one should
be fairly distinct and follow the same
light theme?" So, giving a prompt kind
of like this, Claude code would then
extract this code out onto a separate
page, give me a couple of variations, I
look for it, I know it when I see it,
like "Hey, this is the one that I was
after," and then I just tell it to put
that back into main application. So,
whilst we're waiting, here is an example
that I made before, which is essentially
different design variations for the
Hyper Whisper iOS settings. So, I'm
making the iOS application for my
voice-to-text application, and I was
like, "I don't really know what the
settings should look like." So, then
Claude code made me a nice HTML file
with 10 different variations over here,
and I can kind of look through this and
be like, "Okay, this looks kind of bad,
this looks a bit nicer, but a bit too
long, and then this kind of looks like
the best one over here, but some things
need changing." And this is especially
helpful for design because I don't know
how to describe what I want, but I will
know it when I see it. And you don't
necessarily have to do this for design
variations. So, another use case that I
like is if you have a LinkedIn skill to
basically help you write LinkedIn posts,
then you can have it generate you a
final HTML artifact to show you what the
post would look like on LinkedIn. So,
this is the artifact that's included in
the skill, and this is a much nicer way
to view the output compared to the
Claude UI. So, I could just read through
the one that I like, copy it over,
change a few things around to make it
like more natural, but it's already kind
of in my writing style, and then paste
it onto LinkedIn. Now, I would
personally recommend having a HTML
artifact as an output for any of the
skills that you have, especially when
you're making decisions between many
different variations. And when it comes
to design-related work, I do this so
often that I turn this into a design
variation skill. So, if I do {slash}
design variations, I can reference any
component on my website, and then it
will make variations for that. So, for
example, for my Claude code masterclass,
which by the way, there is a sale going
on right now, so there is a lifetime
plan, which I will be removing on April
23rd. So, if you want to buy the
lifetime plan at a discount for the most
comprehensive Claude code class that is
updated almost every single day, then
there will be a link down below for
this. And you may be wondering, "Why
would I buy lifetime access when I don't
know if Claude code is still going to be
relevant a year from now?" And chances
are, a year from now there will be
another more powerful tool, which I will
then be making classes on. So, by buying
lifetime access now, you get access to
all future agentic coding-related
classes that I make. Anyways, I made a
new component right over here, and I
don't really like the design. So, I can
get Claude code to make some variations
here for this with the design variations
skill. So, I just reference this and
say, "The bottom right card that shows
how many people have enrolled in the
class on the landing page." And then I
type in the number of variations that I
want. So, I'll say 20 variations, press
enter, and it will make them for me
isolated. And these are the variations
that it made, and I think the one that I
like the most is probably two and maybe
17. Okay, now we can take this further
onto layer two and make this an
interactive artifact. So, for example,
here it'd be really nice if I could just
like leave a comment with like a bubble
here, and then somehow send that
feedback back to Claude code, and then
make us some modifications. And one of
the really good ways of doing this is to
have Bun, which you may have installed
on your computer, make a mini server.
So, this is like a really lightweight
server, where Bun can basically hot
reload the HTML artifact, make this
interactive by adding the ability for me
to click somewhere and leave a comment,
and then add a export to JSON button in
the top right, where any feedback will
be exported to my clipboard, and I can
copy and paste back to you, and then
also make it a Bun interactive HTML
artifact that is running on a local
server instead. Now, whilst we're
waiting for this to complete, I also
really like using this to help me make
interactive artifacts to understand an
idea better. So, for example, let's say
Claude code decided to add row-level
security to my code base, and I'm like,
"Hey, what on earth is this? I want to
understand this idea better." I can just
say to Claude code, "Hey, can you make
me an interactive HTML artifact uh
explaining what row-level security is?
Add buttons, help me click around. I
basically want to understand this
concept better at like three different
levels. And it seems that our previous
artifact was made interactive with Bun
hot reload on this endpoint. So, this is
what it looks like. I can click
somewhere. So, for example, if I clicked
over here, I could say, "This looks
okay, can you make it like 10 uh like
avatar profiles instead?" And let's say
for this one, I can click on this, say,
"Can you add country flags here instead?
That seems more interesting." And then
press save here, and I can press export
to JSON. This will copy the comments
over to my clipboard, then we can paste
it into Claude, and those comments will
go back, and then Claude code can do a
quick update of that artifact to
implement those changes that I just
mentioned, and then it will
automatically reload without me having
to refresh the page. So, hot reloaded
over here, and now in a second, I think
it should also make the change over
here, and then hot reload. So, you can
see it has flags instead. And yeah, I
could add something like this to my
LinkedIn post variations one. So, I
could just have this being editable for
me, and then I can copy over, and it
will highlight the changes back to
Claude code, so I can update my skill to
like better adapt to my style. Now, we
have our row-level security explained
already as well.
Uh so, you can see it gave me a nice
explainer here. I can then click through
the different levels, the different
ideas, and then I understand it better.
Now, of course, you can use this for
more complicated ideas. I said in this
case, "Can you make me one to show me
how PG bouncer works? Add diagrams,
animations, and stuff." And then this is
what it came up with. So, this looks
pretty handy. And then looking through
this animation, I'm like, "Okay, this
makes way more sense about what is
exactly happening behind the scenes."
Now, moving onto layer three, this is
like even more complicated, but can be
even more powerful. And that is by
connecting your HTML artifact with
Claude code channels to explore data
more visually. So, this uses the
built-in Claude code channels feature,
and you may already be aware of this
because we use it for Telegram, Discord,
iMessage, so you can message with Claude
code, but you can also build your own
channel as well. So, we're going to
quickly build a channel between our
interactive artifact and Claude code, so
we can have things pass back and forth
more easily. So, let me use the example
of my Claude code masterclass. Now,
let's make a HTML artifacts for this,
whereby I map the customer journey with
the help of any events that were
captured in my analytics tool, also
using any Stripe data and stuff, so I
can explore the data in a much richer
way using the channels feature that we
have. So, firstly, I want to make sure
that I have my MCP servers connected, so
I have PostHog over here, and then
Stripe. So, these are the two main data
sources that I'm using. So, first of
all, I will tag the Claude code guide
agent here, and then say, "Using my data
from Stripe and PostHog, the MCP
servers, can you make an interactive
HTML artifact with the help of Claude
code channels, and make it such that I
can leave a comment, like pin comment,
for any of the data that's being
visualized for the customer journey, and
then that will go directly back into you
for the channel with that question, and
then the like artifact will be
automatically uploaded after you fetch
that relevant data. Use the code base to
help you map the customer journeys with
the events that are being triggered, and
then give me like actual numbers." So,
in this case, I'm blurring out the
revenue data, but you will get the
bigger picture idea. So, essentially,
what is happening here is that like with
our previous example, where we had to
press export to JSON, and then paste it
back into Claude code, the whole idea
here is that what if I just clicked
here, left a comment, and then that
comment would automatically go back into
Claude code, and it would make those
adjustments. Now, in many cases, that
can be a bit overkill, like in this
example, but if you're doing like deep
data analysis and work for something in
your business with the help of MCP
servers and stuff, this can be more
powerful. So, you can see over here,
this is how it would do the Claude code
channels extension, and it would make us
a custom channel plugin, so that when I
leave a comment, that information will
automatically go back into Claude code,
whereby it will query PostHog and Stripe
for us, and then update the artifact for
us. So, I will say, "Go ahead and do
this whole implementation here," and
then give me a new command to run Claude
code with, so I can copy this over, go
to a new tab, and it's essentially
Claude dangerously load development
channels server customer journey. Press
enter. This is a local development one,
so I can press enter here, and then it
will load that in. And it tells me the
server will be running on this port over
here. So, clicking on that, I can open
it up. Now, this is what the interactive
artifact looks like. Now, this is a
bunch of fake data, but you kind of get
the point. So, we can use a pin mode to
send a message back into the Claude code
client. So, I can click on this uh
section over here, leave a comment, and
say,
"Can you expand on this? Essentially, uh
looking at PostHog, make another Sankey
diagram to show like how far people
scroll down the page or something like
that." Pressing pin comment here, that
should then go back to Claude code.
So, you can see right over here,
customer journey sent a message, "Can
you expand on this?" So, the comment
that we left. And now Claude code is
going to run its bash commands, MCP
servers, and stuff like that to expand
on the data, and then update that
artifact dynamically. So, essentially,
what we've done here is that we've made
our own mini app, custom front end, with
Cloud Code as the back end. And I can
click around and actually change a UI
itself. So, click over here and say,
"Can you remove the revenue card?" And
then that will also go back to Cloud as
a brand new message of, "Can you remove
the revenue card?" And then going back,
I can see this pin comment removed the
revenue thing I mentioned earlier. And
now this pin comment leads to another
thing where I can see how many people
have viewed each section of the landing
page. Okay, now to summarize, a layer
free with our channel, what we're doing
is that we have our artifact
communicating with Cloud Code via the
channel. Cloud Code has the relevant
skills, MCP servers,
uh context about our code base and stuff
like that. And then it dynamically
updates the artifact again. And it's
communicating via the Cloud Code
channels feature, which is exactly the
same way that Cloud Code can communicate
with Telegram. And essentially, each
artifact of ours is doing two things at
the same time. The first of which is our
UI is capturing any decisions that we
made. So, for example, I could be like,
"Okay, well, not enough people are
viewing the pricing section over here.
Maybe this needs to be moved up." And
then I can tell like Cloud Code,
"Hey, can you move up the pricing
section in the projects because it seems
not as many people are viewing it?"
That will then go back to the channel.
And then it's also serving as a
conversational surface to edit the tool
itself. So, of course, this is like a
really basic version of a tool. We can
make this better over time and very
hyper specific to our use case by doing
something like clicking over here and
saying, "Okay, can you add tabs?" So,
instead of having one long page, I just
have tabs to flick through between. And
then pressing pin, waiting a while,
Cloud will then automatically update the
UI. So, essentially, it becomes much
easier to switch between actually using
the tool, the artifact, and building the
artifact. And if you get a form factor
that you really like, then you could
turn this into a product or like an
internal dashboard or something like
that. This can be a really good starting
point, especially to get the feel for
the product. Anyways, to make Layer Free
a little bit easier for you, I have a a
free video in my Cloud Code masterclass,
so you can literally just go here. And
if you don't want to purchase it, then
you can sign up, make yourself an
account, and then clicking on the class
for my daily workflows, you will see
that there will be a video about this
particular thing and showing you how to
set up alongside a skill that you can
download. And of course, if you do want
to take advantage of the sale on the
lifetime plan before it is gone, and get
access to all future Agent to Coding
classes that I make, then there will be
a link down below for that. And if you
are a business owner or a business
manager, and you want to get some Cloud
Code coaching for yourself or your team,
then there will be a link down below for
that as well.
