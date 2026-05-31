---
video_id: "sOPhVSeimtI"
title: "THIS is how to expose your apps to AI: WebMCP"
channel: "Syntax"
topic: "ai-llms"
published_date: "2026-02-16"
ingested_date: "2026-05-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=sOPhVSeimtI"
duration: 1005
word_count: 3388
---
Welcome to Syntax. Today we're talking
about Web MCP. This thing is brand new.
It's a new specification and we're going
to explain what it is. We're going to
show a demo and I got a couple hot takes
about it, but essentially Web MCP is
surfacing tools and ways to interact
with your website via your website
itself. So this is different than
MCP servers and this is different than
MCP UI and MCP apps. It's related. It
works in the same way, but this is a new
way to surface functionality simply just
through your website without having to
have additional servers. So let's get on
into it. My name is Wes. With me as
always is Scott. How you doing Scott?
Hey I'm doing good. How are you doing
man?
Yeah, I'm interested to learn about this
cuz I hear Web MCP my first thing goes
to Chrome DevTools MCP or agent browser
or those types of things. I'm curious to
know
&gt;&gt; at all. Yeah, so that that that in
itself to me is a revelation here. So
I'm excited to learn what this thing is
and how people can take advantage of it.
Yes. All right, so all of this in
context is going to be I built a little
app called a grocery app, right? And
it's just a very simple kind of like a
conban where you have each of your
grocery stores that you might want to go
to and then under each of those grocery
stores you can add, remove and check off
food items that you want to do, right?
So that's pretty standard. You're going
to have if you're building out an app
like this, you're going to have
something like add a store, add an item,
reorder items, uh
rename, delete item, like check off, you
know, like all the standard kind of
to-do list application stuff. Now, if
you have an application and you want to
now surface your application's
functionality to some sort of AI, you
have you kind of a couple options,
right? Like one option is you can just
build AI right into your application and
your users can do that and you sort of
like foot the the for that. Another way
is you can create a MCP server, which
surfaces all of the tools, and then the
AI chat will simply just talk back and
forth via the MCP server, adding,
removing, and whatever. And then we also
learned we had Kensey Dodds on the other
day where we have MCPUI, or now it's
called MCP apps, where you'll be able to
actually return and generate, like maybe
you want to embed components in in like
stylized structure right into a chat.
This is different than that because the
web MCP essentially says, "Okay, I have
a website, I have an app, and it it does
these things." And if someone were to to
visit my my website, or if if an AI were
to programmatically open up a browser,
and it wants to use your website, right
now you kind of have a couple options,
which is like you can set up Playwright,
and Playwright will either like dump the
HTML or take the accessibility tree, um
or take screenshots of the UI, and then
it will just go ahead and like use the
website you were a human. It'll click on
buttons and and whatnot. And in my
experience, that's decent, but it's
extremely slow to actually use because
it has to like parse all of it, figure
out which buttons it should press, etc.
etc. So, the solution to that is to for
your website to explicitly publish,
"These are the things that I can do."
Right? So, I have a grocery list here,
and I have several different tools,
right? You have you have add item, get
items, delete delete item, delete store,
create store, get items by store, move
item, all of these things. And that's
not any different than like an MCP
server that you would normally just
publish these things. And then the way
that that works is that you would you
would publish these tools, and then you
also define what the input and output
schemas are. Meaning that like you say,
"Hey, AI, here is a tool called add
item. Here is a description of of what
it does. Um and then here is the input
and output schemas." This is like if you
wish to call my tool, you must provide
me
which item you want to add and which
store you would like to add it to, and
then I will then return to you the
following information, right? It's It's
a nice structured way
to talk back and forth with with an AI,
right? Interesting.
&gt;&gt; [snorts]
&gt;&gt; So,
I I I've been wondering about this in
regards to some projects that I've been
working on. I was thinking about working
on an API for my AI to consume for my
habit tracker, which honestly this feels
so similar to your your to do list, your
grocery list here. So, this seems like
that would be a better fit for that task
than creating just what an API and API
key and then telling the AI how to use
the API or would you do both? You would
create the API and then you'd create the
MCP to communicate with that API? It
depends on how you you want people to
interface with it. But if I'm looking at
the web right now, there are millions of
applications out there and in order for
an AI to interact with it right now, you
either have to like publish your own MCP
server and essentially like re-implement
a lot of your your logic as an MCP
server. What this does is it allows you
to imperatively or declaratively
just publish as part of your website
either in the HTML or in the JavaScript
and say, "These are the tools that you
can then use when you visit it." So,
watch this example. So,
Chrome has published a little Chrome
extension just as one example of of what
it might look like to interact with it
and I can simply just go to it and say,
"I load the page up." And it says, "All
right, I found all of the tools." And
then I can I hooked it up to Gemini
Flash 2.5 Flash and I I just say,
"Please add bananas to Costco shopping
list." Once that's done, show me
everything on my grocery list. Oh, and
can you remove then move bananas from
Costco to Whole Foods?" And then I just
go ahead and send it to the AI and it
will parse what I need to do, look at
the tools it has available to itself,
and you'll see that it added bananas to
Costco, and then it went ahead and moved
it to the Whole Foods. I can do
something like um I might go ahead and
say something like, "Please add all
items for chicken noodle soup to Whole
Foods." Right? So, it's going to go
ahead and parse that. It's going to
figure out, "Okay, what what do I need
for [snorts] chicken noodle soup?" And
boom, it went ahead and just added
chicken broth, chicken breast, egg
noodles, carrots, celery, and onion. And
I can say like um mark off anything with
chicken. I already have it. There we go.
I spelled I spelled chicken wrong. Go
ahead and send that off. And it should
There we go. It marked off chicken
breast and chicken broth.
&gt;&gt; Can I Can I just say
Ben, one of the benefits of AI is that
like
&gt;&gt; [laughter]
&gt;&gt; I can spell things wrong and it's just
like, "Sure, whatever. Doesn't care." It
knows what you mean. Yeah. Yeah. That's
actually really fantastic. Yeah.
[snorts] So,
that is just like kind of like a dead
simple example of how this works. And
the way that
the browser is able to know what the
tools are is there there's kind of two
ways to do it. And this is the the
documentation for um Web MCP.
Essentially, what you do is you as part
of publishing your website, you simply
just publish what the tools are. And you
can do that in in two different ways.
You can imperatively declare them with
the JavaScript. It's So, it's the it's
just
window.navigator.modelcontext.registertool,
and you can go ahead and register
[snorts] the tool with a description,
the input, and the and then as well as
the the output data that you get, right?
However, the other way that you can
execute or sort of declare what your
tools are is with form elements, which I
thought this is This is absolutely
genius because
if your website already has like forms
or if you just want to simply
declaratively publish what something can
do, there's just a couple different
properties that you can add. So, tool
name, tool description, tool param
title, and tool param description. And
then it will just simply just parse out
the HTML elements and figure out, "Okay,
these are the things." And in this case,
you don't even need to publish the
schema because it can infer the schema
from
your form, right? Yeah.
&gt;&gt; Uh which is which is I think is is
awesome that you can you can do it in
both ways. Wow, that's cool.
Yeah. Yeah, I love that this this
meeting of worlds here. That's neat. And
if you want to see all of the errors in
your application, you'll want to check
out Sentry at sentry.io/syntax.
You don't want a production application
out there that, well, you have no
visibility into in case something is
blowing up and you might not even know
it. So, head on over to
sentry.io/syntax.
Again, we've been using this tool for a
long time and it totally rules. [music]
All right.
So, let's talk about couple benefits,
couple questions, and then a couple
takes I have here. So, the first one is
this sort of mixed UI approach. I really
enjoy because like we had like Kent C.
Dodds on and he says, "Yeah, like
everything's going to be like a UI
widget that's either embedded into your
chat." Or he talked about it several
different ways to do it. And I don't
know that every single
thing is going to want to just be a UI
widget. Um it especially like you you
look at like um booking a flight or
whatever. I don't think that these
people that sell flights are simply want
want to be distilled down into like just
like a utility like a your paying a
water or electrical bill, you know, like
book book a flight. They want to provide
you with a good experience. They want to
upsell you. They want to say, "Oh." And
And not that those things can't be done
inside of a a chat interface, but
sometimes people want to actually visit
the website and and use that UI. And if
I'm able to now just use the website as
as I always have been, right? Like
everything out there right now is simply
just an app in a website, but then I can
also interact with it with my natural
language, which is way better. Because
if I'm I'm adding chicken noodle soup
here,
I'm not adding five or six different
items and dragging them into the thing.
It's way faster for me just to type,
"Hey, could you add X, Y, and Z?" Or if
I'm in my um accounting software, I
might just paste six or seven
transactions from a credit card and say,
"Hey, can you add these and categorize
them all?" Yeah.
&gt;&gt; Um
that natural language is the best. You
could get further with that. If you have
historical grocery lists, you could say,
uh "Add all of the vegetables from last
week to this week." You know, and that's
something that would be harder to do
with an actual UI because you're getting
into the natural language of it. If it
wasn't uh natural language, you'd have
to be building in a whole tagging system
for all of the different types of
things. You'd be getting into like so
many things to be able to even just get
that piece of functionality.
Uh I think that's really neat. The other
thing is that like this is a great This
is way faster than Like I've used
several of these like AI interacting
your browsers, um and they work great
when you simply just like let them rip
and then you can walk away and do
something else. But like if you're just
sitting there waiting for it to do it
because you need it, it's so slow. And
there's no chance that like
it was so painful using the chat GPT
browser, whatever that was called. What
is it called? I don't even know what it
was called. It was It was It was
brutally [clears throat] slow. And I've
used many of them in the past and
it is just it's just way too slow right
now. So being able to explicitly do it
rather than it try to infer it from your
HTML is way better. Like watch how fast
this is. Add a new store, a drugstore,
add lip balm, send. 1 2 3 4 5 5 seconds
and it added a new store and added lip
balm to it, right? Wow, that's pretty
fast. That's pretty cool.
&gt;&gt; Um the other thing is that it's like
it's much more token efficient, right?
If you're if you're paying by the token
for these types of things, it's simply
just sending the tool calls along with
the possible options to the AI rather
than having to send the entire like DOM
tree or like a whole screenshot and then
have to
um go through that screenshot and figure
out where the buttons are to click.
Yeah.
&gt;&gt; Um and then finally like this seems just
this seems ripe for
rife ripe, whatever that is, for
frameworks to implement this, right?
Like you already have all of this data
as part of your application, right? You
already have your schemas, you already
have your validation, you already have
your your UI later for for mocking up
what your forms are going to be or or
whatever. Simply just taking one more
step and publishing those things that
you can do via um in in your HTML
website is so easy and then this doesn't
require somebody else to now spin up a
second MCP server. You're not hosting
anything more than than just your
website. Yeah. [snorts] Now.
&gt;&gt; Wow, what a what a neat API. Yeah, no, I
I just uh
um I love finding out about stuff like
this and then immediately understanding
the utility as opposed to being like,
"Oh, I have no idea when I would use
this or how." Yeah. Couple questions I
have and and this is this is like just
released yesterday. I'm part of the
early access, so obviously this is very
early and they're trying to figure out
what the spec will be. Um but some
questions I have is like will cross apps
be possible? Cuz one thing Kent said
when we talked about MCP UI
is he's like, "Yeah, like people don't
want to just like go to one website and
do their thing." Like you want you want
to say like, "Ah,
grocery lists, um go look at my calendar
and see
when that dinner is and then if if I
have any dinners planned this week, add
it to my group. You know, you want
things to interact with each other. So,
will cross application stuff be
possible? And and I I assume so because
this like little sidebar here in Chrome,
this is not like the end UI for this.
This is just for you to be able to test
it out and debug it. Like what I assume
will happen is that you will be using
some sort of
chat application or whatever and
very much like the MCP UI, it will
simply just visit the website, discover
the tools, see that you're logged in and
then it can visit several websites at a
time and sort of move data between the
two of them.
Yeah. Wow, cool. Damn.
&gt;&gt; yeah. Headless, it probably will be
headless. I assume it will be headless
at some point. And then last thing I
have here is just like my my take. Um, I
I think that this is a great way for the
web to adapt to AI, right? Because I
don't know that you're going to get
every single person under the sun to
publish an MCP server and have it make
an app with ChatGPT and make it work. We
might. We saw it it happened with iPhone
apps, right? Every Everybody has an
iPhone app now. So, but I think that
this is a very good bridge to that space
where somebody can simply just go at a
couple properties to forms on their HTML
or or publish whatever tools they want
to be available in their JavaScript
bundles and then your website is just
it's it's ready already, right? It's
similar to like responsive design where
like, "Oh, I just need to change a
little bit of things and now my my
[clears throat] website is ready for
mobile."
And then the other thing is like
APIs, like I don't know
that every website's going to want to
like surface these types of things. We
saw it happen with APIs. Like very early
on, every website ever had an API and
anyone could go and use that API for
free. Everybody was building. There was
like a hundred different Twitter
clients, you know, we were making
mash-ups. Everything was was totally
fine. And then very slowly but surely
all of these apps were like, you know
what?
API access sucks. We want people to come
to [clears throat] our site. Reddit API
totally gone. Um the Twitter API went
away and it was like $40,000 a month or
something. Now they they just released
the ability to pay as you go and it's
like 200 uh requests for a dollar. Still
very extremely expensive. Instagram,
impossible to to interact with it via an
API, right? They all of these big
companies don't want you just being
like, oh sure, would you like to use us
as a utility? Just interact with us this
way. They want you on their platform
using it in their way so they can sell
you stuff and and make the most money.
So
I don't know if if this is going to be
the the total end game for all of this
stuff, but I certainly think for people
who do want AI to interact with their
their applications, this is a great way
forward.
Yeah, I I think this is neat. I'm stoked
to dive in more and uh
Thank you as always, Wes. This is a
great little explainer. Yeah.
That's it. You can sign If you want to
test it yourself, um you can sign up for
the WebMCP early preview. I'll leave
links in the description below. But
that's it. Peace.
&gt;&gt; Peace.
