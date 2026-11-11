---
video_id: "4jy0T98dYoI"
title: "If you're building with AI, watch this (System Design Overview)"
channel: "Ras Mic"
topic: "software-engineering"
published_date: "2026-07-02"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=4jy0T98dYoI"
duration: 1818
word_count: 5863
---
Creating apps
has become much
easier thanks to
artificial intelligence.
But, let's be
honest, when I
say apps, I
actually mean
prototypes.
Not
much quality is provided. Every time
you see
someone writing Vibe code for
an app, as soon as it
gets 10
users, that
app
crashes. And that's
because they don't
know how to design a
system. And this is the same
reason why a
developer who
uses AI
creates a more reliable
application compared to
someone who is not a
developer. But this is exactly what
today's video will help with. I
will show you how to
design a reliable
system using
genetic engineering
when you build
your applications
with AI. And I'm
going to do this by
explaining to you
how my Pluto app was
built from scratch. All the
tools I
use, the
technology stack
I use,
the information I
use,
the decisions I
made, how the
code is structured, how
I use AI. I'm
literally going to
cover everything. If you
plan to build
an app that will be
launched in production and
used by people,
you will need to
watch this video.
I will leave no stone unturned
. It could
be 20 minutes, 30
minutes, whatever
the length of the
video is. Let's
get straight to the point.
So, building
reliable applications
using AI. First
of all, what does
system design mean? And I'm
going to
focus on that
more in our
AI era. A simple
definition of
system design, a
refined definition
is that it is
the process of planning
the architecture,
components, modules,
interfaces, and
data flow of a
software system
to meet
specific requirements. In
the old days, before AI, we
watched a lot of
these videos to
learn how
to design systems,
right? You
needed to
figure out what you
were going to
use for
storage, where you
were going to
put your
load balancer, what
service you were going to
use for
notifications, what
your
CI/CD pipeline would look like. All of this
was something a
system designer
should think about. But in
today's era of
artificial intelligence,
there are many
tools that
abstract this away, making it
much easier for us
to implement these
things into our system.
Now, one thing
you need to
realize about
system design
is that in engineering
, whether
you're an engineer or not, one
thing you need to
understand is that
engineering is all about
trade-offs. That is, there
is no such thing
as an ideal system.
There is no such thing as
this system
handling every
scenario, every
case. Everything has
compromises. Every
stack has tradeoffs.
Every tool
you
use has
tradeoffs. Every
information provider you
use has
tradeoffs. Nothing is
perfect except Jesus
. So, understanding this,
we
need to think
about a few things when designing our system.
First, it is
scalability.
The ability of a system
to handle increasing
amounts of traffic or
data by
adding resources.
That is, if your
application starts to get
overloaded, is
your
system designed in such a way
that all you
have to do is
go to some
dashboard,
add some
servers, and then you're all
set. Does it
scale automatically?
Reliability. What is
the probability that
your system will
fail? Is it known that the
service provider
you use will
always go down?
This is a decision we
must consider.
Does this allow your
program to be
fast? Isn't that right?
We need
our applications to
scale quickly. If
the tool we
use or
the way we
designed
the program is slow,
that's something we
need to think about. And
last but not least,
it's money. Will
it cost us a
fortune?
Can we
just afford the price,
can we
afford a fortune, or
can we
afford nothing? These are
things we
need to think about.
Engineering is about
compromises. Before
we get into
designing
Pluto systems, I want to give you a
breakdown of all the
information available
and how it all
works. In the old days,
websites and applications
were hosted by
companies having
their own servers. They
had their own metal.
They had server
racks in the office. There were
several IT specialists.
There were a few, you know,
programmers. There are
several DevOps specialists.
And you are essentially
scaling the website yourself.
So, if you have a lot of
traffic and
not enough hardware to support it
, you will
lose. If you
have all these server
racks and
no traffic, you just
wasted a bunch of
money. So it was a time
when you had to
be very
calculated. This is very
expensive. It's hard
to predict, and it's
not easy to scale. Then
companies like Amazon, Google,
and Microsoft created
their own cloud
providers,
right? Amazon created AWS,
Google created GCP, Microsoft
created Azure, and then
you have Cloudflare. And these
guys essentially
bought their own
metal, put
it in different places,
and said, "We'll be the
provider where you
can run
your applications,
right?" And what was
cool about AWS, GCP, and Azure was that
I
no longer had to
manage my
own server
racks. I didn't
need IT
specialists on site
connecting different
things. I could just
deploy my
application
directly to AWS,
directly to Azure.
They have all these different
services and
tools that
they manage. And they
deal with
the little things and the
hard things. And that's
when the web
exploded. That's when
the sites exploded, the
server
parts exploded.
Many interesting things began to appear on the Internet.
And this is also what we
call
abstraction. You may
think that all these are
big engineering
terms. If you
want to create something
cool, record it
and listen.
Abstraction in
computer science is
the process of hiding
complex
implementation details and
focusing only on the
most important
functions of an object or
system. So they're
essentially AWS, GCP, Azure, and the
cloud, because they've essentially
abstracted away the need
for a physical server,
the need to
configure
software to
run things on a
physical server.
They took care of it. And
then, over time,
another
level of abstraction emerged,
right? And you have Convex,
you have Versel, you have
Superbase, you have Neon and
all these different companies
. Now, you know, if
any of the
company employees are looking,
yeah, Versel, for example,
has its own
metal. I think Planet
Scale too, but just
hypothetically, Vercell,
when they were starting to
wrap AWS, GCP or
any of those guys
, right? Convex wrapping
is the same, right? So this
layer abstraction has made it
much easier to
use these
tools, which has
made it much easier to
use this,
because I don't know if
many of you
have used AWS. AWS is
pretty good. I do
n't know if many
of you have used
GCP or Azure. I have an
Azure certificate. Azure is
terrible to
use. GCP is
terrible to
use. I do
n't even know anyone
who knows how to
deploy a React
app to Azure in less
than 5 minutes. It's so
messy and everywhere.
So you have
tools and
information providers like
convex, versel, superbase and all
these other companies that
essentially wrap
or abstract AWS, GCP,
Azure and Cloudflare. The reason
I say this is because
this
layer of
infrastructure has
essentially made it easier for you
and me to build
our applications. I don't
deploy to AWS, GCP, Azure
. I sometimes
use Cloudflare,
but mostly
I use Versell.
I use convex for my backend
.
If I need a
Postgress database, I
will use
planet scale. I
don't need to
go to that level of
abstraction or
that level anymore. You may
ask, "Why are you
explaining this to me?" I
try to do
engineering because when I
talk about
Pluto's system design, all of these
things will help him
understand it. And
just to tell
you how things are
today, you still
have people
using
their own metal that they
don't recommend.
You have things that are already
created. You have
companies that provide
you with this service,
like AWS, GCP, these things are very
powerful, but the
developer experience, or should I
say the
agent experience, is terrible. And
then you have
tools like
Convex, Versell, and all these
other companies that
have amazing
developer experience,
can
scale easily. They
do
a lot of the hard work for you that you and I
don't have to
worry about
.
Yo-yo, wake up.
You can't sleep at
work. Who will
review the code? I
hate
code reviews, but it has to be
done. And that's why
I love Gretile. You see, I have a
huge PR here
for an open
source project I call
Ralphie. Over 4341 lines
completed by this
author. Well, that's
a lot of lines of code and
I'm probably
missing something, but the way I
use Gravile in
my code reviews
is as follows
. I have a review of
Gravile that is
being conducted
based on this PR.
Please note, this is
quite a big PR. And what
I like about
Gravile is the
summary it
gives me, plus the
credibility score. The
credibility score
tells me whether
it's worth checking
or not. Anything below
four out of five is something
I'm not going to
personally check out.
Imagine spending
all that time only
to find out that this
PR still needs
work. But with Gravile, all
I have to
do is read the
summary,
review the
credibility score. If
it is below four out of
five, then the merger is
not worth it. This
allowed me and
my team
to develop technology
at an incredible
speed. So be
sure
to check out Greile.
The link is in the description
below, or you can
go to
rosmike.link/greptile. They have a
two-week
free
trial, and it's pretty
generous. So
take advantage of it.
Believe me, once you
start
using it, you won't
want to stop.
Get to know them.
The link is in the description
below. So, let's
talk about Pluto.
So, there
are
some pretty
interesting things going on during the creation of Pluto. First
of all, with Pluto, I
needed an OOTH that
companies could use, right?
I needed a
big OOTH. I
needed people
who maybe wanted to
comply with
Sock Two and all these other
things, right? So
I had to
think about O. And I
know there might be
people who
use this
for personal
use, but there
might also be
companies. And if
companies want
to use it,
maybe it's the manager
who sets it up. And
then the manager
invites the
company's employees, and they
set it up. And
then I need to
think about
billing
, right? What type of
billing do
I want? Do I want
a subscription? People already
pay for subscriptions,
and I think people are
tired of
subscriptions. Maybe we
can create a
credit-based system where you
can just
top up your balance and
use it
as needed. Then
you will have to
work that out too. Another
question, this is an agent,
right? So I
need to think
about where I'm going to
deploy this
agent. The place where I
deploy it
needs to be
affordable, but it also
needs to be
scalable and
shouldn't sacrifice
performance. It
has to be something reliable
. So, that's all I had to
think about when I was
originally planning Pluto
. Now let's talk
about Pluto. Pluto has four
client surfaces,
right? There is a web
application, there is a desktop
application, there is a mobile
application. Well, the
mobile app
was just one
run of the fable, and
then there's the
admin site,
right? As an internal
administrator site.
Now, as you
build your
app, you need to
think about a few
things. You need to
think about the client, the
server, and the database.
The client is essentially where
people
interact with your
application. So, it
could be your
website, your mobile
app, or your
desktop app
. Now it's important
to choose a tool that
you are familiar with. And in
this case, for
my web applications, I
use spelt kit.
So, spelt kit is
essentially nex.js for spelt. I
love Spelkit. A: I love
Spelkit. It is very
minimal. He is
fast. It makes it
easy
to create websites to
increase
productivity. So,
I'm using Spelkit
for a client. But here's the
thing. What if I
wanted a mobile
app, right?
If I wanted a
mobile app, I
could create a
native app for
Mac OS. But let's say I
also want an
Android app. Expo Plus React Native
for mobile
app, right? And
let's say I
need a desktop
application. And for the
desktop application
I will use
Electron. And I'll just
wrap up the website. Yes?
This is what I can
do with
Electron. Now I have a
web app, I have a
mobile app, and
then I have a
desktop app.
Will I have, for example,
three different projects with
three different
repositories? How
will I manage this?
Let me
introduce you to
our good friend
called the mono
repository. Monorreo is
essentially one
giant
code repository where
different parts of your
application can be stored. Yes? So I
can have my web
application in one
repository. I can
have my mobile
app in one
repository. I can
have my desktop
application in one
repository. And I
can have my own
backend too, right? It's all these
different services, right? A
desktop application
interacts with the backend, a
mobile application
interacts with the backend,
and a web application
interacts with the backend.
The reason why the
monor repository is
cool, or
having all of
this in one
codebase is cool, is
because when I
use my
agent, when I
use my
AI of choice
, in this
case Fable 5, it's
finally back.
When I use
Fable 5 or any other
chosen model, Fable 5,
the agent has access to the
entire codebase,
even if I have a
web app, a
desktop app, a
mobile app,
right? If I have,
for example, a web
application, a separate
repository for the web
application, a separate
repository for the
mobile application, a
separate repository
for the desktop
application, then there are all these
separate contexts, it is
very difficult for me, a human, to
manage them.
And you might be
someone who
doesn't really know how to
program. Good luck.
This will be a difficult time.
So every time I
initialize my
applications, every time
I run my
application, I almost
always start with the
monor repository. And in
this case,
since I'm
using Vercell for
deployment, I'm
using Turbo Repo. And that's how
I design
the architecture of my
applications, right?
So, I always
start with the
monor repository. The
reason I'm
starting with the
monor repository
is because it
allows me to have,
you know, multiple different
clients, one
unified backend.
I can even have
one
component library, one
UI library
, and it
will be common to
all these different
client services,
right? And as for what
I use for
my web application,
I already said that I
use Felt. for
mobile devices,
unless I need an
Android app.
I usually like Swift,
but I'm going to
use Expo
and React Native. And then I
use Electron
for the desktop
application. But now
I need to
think about my
server and database. And
by the way, if you
think this is a
lot of information, I'm
literally going to
bring it all together.
So just listen
and take notes.
When it comes
to my server and
database, and
especially my
server or my
backend, there are a few
things I need to
think about.
My server will allow
me to read data from
my database. My
server will allow
me to write data
to my database. My
server will allow
me to interact with
external services
, right? For example,
call an API,
for example, to the
weather API, right? And there are a
few more things I
want. I want
to make sure they
don't crash or
run slowly.
Now here's the thing.
One thing I want
you to know: you should never,
never, never,
never, never
read data from
the client
directly into the
database. The client should never,
never, never,
never
interact with the
database. And that's one of the
main reasons why
I'm not a fan of Superbase. Superbase
has a server
library so you
can't
do this, but
most people
do this and then
set up RLS. And to
me, that's just
nonsense. A real
system should
work as follows
. The client
calls the server.
The server calls the
database. The database
corresponds to the server. And
then the server
notifies the client.
It's safe. But if
my client interacts
with my database, then
essentially someone can
inspect the element,
go to the
network tab, view the
networks, read your
API key, and you're done.
Absolutely ready. So
when I design my
backend, I need it to
do all of these
things, but I also need to
make sure that my
backend interacts with
my database. In the
old days, whether it was
or not, that is, people
still do it. You
could have a NodeJS backend
and then a
Postgress database, right? You would
create this and then
that, and they would
interact.
Remember I told
you that there are abstractions
that simplify things,
right? In those days,
I had to
deploy my
Node.js app, backend
on AWS, and then I
had to
set up an
AWS Postgress instance,
or I could
use GCP,
whatever it was, and then
I would interact with them.
But then we have an
abstraction layer
above AWS called Convex.
And Convex is a wonderful thing.
Why is Convex so good
? Convex takes my server,
yes, my backend, and
combines it with my
database. And by
combination,
let me
use better
language, I'm essentially
getting both in
one device. So
, I get a backend, I
think the backend is
better here, where I can
read data from the
database, write
data to my database,
interact with
external services
. They don't crash
and they aren't slow. And I
also get the
database. So instead of
managing a
separate backend and a
separate database,
I manage one
infrastructure, and that's
called convex.
And what's cool about convex is that
everything
happens in
real
time. So it's fast. I
can read data from a
database, I can
write data to
my database, and I
can interact with
external services
. If you're familiar with
convexity, it's basically
called queries
, mutations, and actions,
right? Queries are
requests for data. Reading
. Mutations are
data mutations, right? And actions
are interactions with
external services
. But here's another thing
I need to
think about. When I'm
building a backend, what
if, say,
I'm building a
chat app and someone types a
message and then
leaves the app, right?
Will the chat continue
or will it end
in failure? If you
create the
standard way,
it probably won't
work. If you
code Vibe and don't
understand how the
chat flow etc. works, it
probably won't work. I
know I
need sustainable
processes. Again,
you feel like I'm
throwing all these big
words around. I'm
telling you, record it.
It's simple. Sustainable
processes. A sustainable
process is essentially a
process that is
sustainable, right?
It continues to
go on. Even if
you close the tab,
close the page,
refresh the page, whatever it
is, it
will continue to
work. Now,
if I didn't have
Convix, that's an extra thing
I'd have to create.
Convix is ​​already creating this.
They call it a
workflow. I
can set up a
workflow
using their
workflow component
. And if you don't
know how
to set it up,
literally, if you
have Convix, you go
to convex
components, right? And you
go into the search
workflow and you can
literally copy
and paste that into
your agent.
Simplify
programming
long
code streams. The workflow
runs
stably with
configurable
retries
and delays. So
I need this
because I'm building an
AI agent, and an
AI agent
can't stop
working if people
leave. What if I
wanted something like a
queue? For example, you
create a "
ticket wizard" type site and
people just
download the site.
You have thousands of people
using your
site and you
need a queue,
right? Again, with
backend engineering
you would have to
build this
yourself. But with
a bulge it is
available. I can have
signals. I can have
coordinated
parallel tasks,
which means I can
do things in
parallel. This is a difficult
word. In parallel.
In parallel. Do
you understand what I'm
trying to say?
Let group
tasks be performed
in parallel. And I could do it
. And they have a
component for this
called workpool.
Right? Again
, if I wanted a
queue, I could
use,
I think, Amazon AWS Q. It's
called SQS, right?
Simple Amazon Q service,
right? So if I
needed a queue,
I would have to
use that.
If I needed a
database, I would have to
use RDS.
If I needed
virtual
servers, I would
use this,
right? So, there are all these
different services. They are
powerful, but it is a
terrible
user experience,
developer experience,
agent experience. Convex simplifies
it, abstracts it, and
gives me one
complete package. So, I
get all of that, and
then on top of
that, I have my
database. So when it
comes to
my backend and
database, instead of
building them
separately, why don't I
use a
service like Convex
to do it? This simplifies
my life. Another
advantage of Convex is that
everything is code.
And the reason why this is
necessary and important is because
I
want the agent to
do the work. I
want the agent to
build these features. I
want the agent to do
this and the third. And if the
whole backend is
all code, if the
database is all code,
if everything is code, then
the agent can do these
things for me. So,
going back to
Pluto, we have a
client surface,
right? And then the
Pluto control plane,
which is the main
orchestrator, the
main backend, is
convex. Convex is the
source of truth. Convex
is a bridge. Convex handles
everything, and I use
Convex components. And
again, that's the
thing. Another thing
I love about Convex, and
it just makes
life easier, is the
integrations, right? And what
I mean by
integrations is that,
let's say I wanted to
integrate
Cloudflare's R2 storage. All I
do is look for R2, and
Convex has a component for
that. Do you know how I
set it up? I copy
this link, give it to
my agent, and
my agent sets it up.
Now I have a
repository in my
app and it is
connected to my
backend. That seems
amazing, right?
I have my client.
I have my backend and
database. And that's it. That's
all. That's all
Pluto is. But
wait. Pluto has
a lot going for it. One thing
Pluto has is
services. And to
best explain
the service, I'm going to
use
artificial intelligence. It
says: “A service is a
self-contained, reusable unit of
software
functionality
that
performs a
specific task for
other parts of the
application or for
external clients.”
So, there are two services:
Pluto: inference/payments and iMessage
. Let me
explain iMessage because it's
easier. So with Pluto,
one way to
communicate with your
agent, besides
internal chat
or using
Telegram, Slack, Discord, is to
use iMessage. You
can communicate
with your agent
using iMessage. Now
, hmm, there's quite a bit of
work here, and it
almost
felt like the iMessage code
should live in its
own little
box. The reason is
that it
doesn't really
interact with the rest of the
codebase. It's like
he doesn't have that
much support in
many different
places, and it seems like
he's better off being a
separate, limited
thing. This is a decision
made based on
experience/impression, and it made
sense for iMessage
to be a separate
limited thing. So
, in my
Monor repository, I can remove the
UI
, and then I'll have
iMessage here. This is a
separate service. And as
for the logical
conclusion/payments, that
might be too far-
fetched. I
plan for Pluto to have
its own
inference system, and
that inference will be
very much related to
payments, right?
Again, people
can finance
loans, and those loans
can be
used to
logically conclude, and
they use
different models. It
looked like a separate
system because the
convex backend started
to grow. I wanted to
separate out some
things that could be a
separate standalone
service. But
secondly, God willing,
if Pluto
succeeds and other
developers
work on
it, I assume there will
be a specialized
person who
will work exclusively
on it, right? There would
be a
specialized
person focused
solely on this.
Now, iMessage may be
too small, but
then again, it's
literally a separate thing, a
separate box, and it
makes sense to me for it to
be a separate service.
When we think about
services, I want
us to imagine a block of
code that can
touch one
area of ​​the surface and
do one
specific thing, that
doesn't really have a
point of support in the entire
codebase, but
can be clearly
designed in isolation.
I think it makes
sense to be a service.
Again, it's
more about experience and
vibrations than a
specific formula.
So I decided to
make these two things
separate services.
What stack did I
use? This
may shock you. I
used effect TS
and Postgress. I
used effect TS
to output
payments and Postgress. For
iMessage, it was just
effects. You may
ask me why the
effect. And the reason
I
used effect
is because AI is
actually very good at
writing effect code. But
secondly, I
needed really
strong
error handling because if
something goes wrong with
withdrawals and
payments, I would
need to know about it
. It must be
clean. This must be
designed separately.
And when it
comes to
error handling, nothing
beats effect,
right? That's why I
use effect in the
output service. I
use effect in
iMessage. And
there is a
separate database for payment items.
I have a
Postgress database. I use
Planet Scale for this, but
you can
use any
other
provider. And this
again
is also in the
Monor repository. So
when I use
any agent,
that agent has access
to all the information
and understands how the
system works. Again,
going back to
how to set up your
services, think about
what things in your
app you want to
segment. You
can also ask
this question to Fable 5, which is
back. And regarding
payments, you may
ask, what do I
use,
payments? There is Stripe, there is Polar, there is
Autumn. Most of you are
probably thinking:
why don't you just
use Stripe.
I wanted to
use Autumn
because I have a
credit-based system, and the way
my payments are structured is
very
unique: there are credits
, and there are things that
consume credits, there are
things that are free
, there are things that need
to be topped up, and all these
different things. For example
, on Pluto, you can
give your agent a
card, and from that
card you obviously
need to give him
money, and you can
use your
credits to
top up. So that's something
Autumn takes good
care of. And what's
cool again about
using Convex is that
Convex has an
Autumn component. So
you know what I did? I
literally copied
it and gave it to the agent.
So for payments,
if it's just a direct
subscription,
use Stripe.
If you have any
credit transactions, I
would use Autumn.
You can already tell that
this is a pretty big
app. There are many
places where things can
go wrong, right?
There are many places in
the client, on the
backend, in different
services.
Damn it,
monor repository, you can
use Nex.js,
Tanstack star, you can
use
whatever you
use. There are
many places where this
goes wrong. I
recommend
checking out, and this is not
sponsored, Sentry and
Post Hog. This is what I
use for
analytics,
error logging,
and all that. You
need reliable
logging because you
want to make sure
that when something goes
wrong, when your application
crashes, whatever it is
, when
a build fails,
whatever it is, you
want to make sure that
you know exactly what
happened. And if you're a
non-technical person and
you ask how do I
do that, you just
tell the AI, "Hey, I
want to make sure that
every time there
's an error,
I need to know
how to track it. I
need to know
when it happened.
Use Sentry
and Post Talk to make that
happen."
System architecture diagram
drawn by the
Cursor agent. Um, explain about
con, explain to you Convex
convex plane, explain how I
use
components. Uh, we
have a logbook system
, right? It is
again
built
using Effect. We have a
Postgress wallet registry
; we use
open router as the basic,
you know,
output provider, and I obviously
use open claw. The
OpenClaw agent
is deployed on Daytona
. I need Daytona
because Daytona is a great
sandbox provider, and not
only do I get a
sandbox from Daytona, but
every agent also
gets a computer,
right? So here you'll
see that my
own agent Pluto has its
own computer with a
browser. I asked
him to take a
screenshot and,
believe it or not, something
broke. It
self-repaired and
then sent me
a screenshot. Right?
So, this is something I can't
create myself.
Again, I
need a level of
abstraction that
will simplify this. Daytona is
great. And for OOTH I
use a working
OS. And the reason I
use a desktop
OS is for one
simple main
reason. First of all,
she's pretty good. And
secondly, it's ready
for enterprises,
right? Pluto, I don't
focus on
personal agents
. I really want to
target
businesses, you know, small
to medium-sized businesses, 15 to
60 employees.
The manager sets
it up, invites people. The
working OS creates OOTH
for
companies like this, and if I
need some
compliance, it makes
the process very, very easy. And agents
like it, so I
use it. When
I look at this
system that I
designed for Pluto,
what compromises did I
make? The first is the
cost. I don't know
how this business
will make money. I
want more people to
try it and
really like it,
and that's a problem for
later. So that's the one
thing I didn't
like to think about,
like
cost optimization,
this, this, that, and the third. I
just want to
make sure that when
people use
the app, it doesn't
break. Even the
Daytona consoles we
use are, you
know,
medium and
large-sized devices. I
want to make sure
every agent is fast.
You know, the desktop OS has a
pretty generous
free tier. Just like
Convex. And
again, I have a
separate service. If
I wanted to save
money, I would literally
put everything on Convex,
but I have a separate
service. Hmm, I
use Versell for
deployment and I can
show you that. And from
Versel. So I have Pluto,
I have a
testing environment,
I have a pull service,
I have an
admin site,
you know, all this
deployment and
making changes. As
you can see, I have a
$20 per month plan,
but I've already spent
over $100. So
the cost is what
I think about: "You know what
, we're limping." So
I think it's really
important when you're
building your
app to think about
that, right?
Think it through in such a
way that adding
new features,
tools, etc. doesn't
break your app.
That's why I always
start with a
monorepository,
right? One
repository that
can have several
different things. Web
app, mobile
app, desktop
app, one
unified backend,
many backends,
many services, whatever it is
, right?
Because the agent has everything
in one repository,
it has access to all the
code. And even the
tools I
use are
tools that
agents are very
familiar with and know how to
use.
Versel, great, isn't it?
Great place to
deploy. Er, Convex,
great. It's all code.
Agents like it.
Payments, Autumn. Autumn is
really quite
good. Like me, again
, because I
use Convex, there are
tools that the
agent may not
work well with, but
it
uses the
Convex component well. So, the
Convex component
helps me
integrate
tools that I
like, like
Autumn, Reset, Stripe,
whatever. I literally
just go to the
Convex components and
then search for them. And
since this is how I
run my
apps, adding
services, segmenting
specific things, it's not
difficult. The agent himself
can do this. And
every tool
I use
can handle
scaling. Versel
can handle
scaling. Convex
can handle
scaling. Autumn
can handle
scaling.
You know, all these
tools that I
use are
tested and
reliable. Many people
use them.
Many successful
companies
use them. And
for the most part, there's no
increase like,
say, a thousand
users joining the
program. The only thing
I need to
do for the most part
is upgrade my
subscription, and then I
can
use
artificial intelligence to do
some optimization of the
app. There would be no
reason why
the application could
break because I
built it on a
reliable
infrastructure, unless
there was bad code,
but we are talking about
system design. That's
actually all. This video is
quite long.
I hope you
enjoyed it.
I hope you
enjoy how I
talk about
solutions, design, and how
I create them. Again
, I'm not saying this is the
best way
to do it, but that's how
I think about
apps. This is how I
build apps at
my agency,
Hello, Fabrico. And I
hope that's
clear.
I hope you
enjoyed it.
Be sure to
like, comment, and
subscribe. Let
me know if
you want to see
more
videos like this. I will prepare them
for you. But, as
always, you were
wonderful. My name is
Ross. See you
next time. Peace.
