---
video_id: "2Yy8EJlZJFE"
title: "Codex Runs My Inbox Now"
channel: "Every"
topic: "ai-llms"
published_date: "2026-06-05"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=2Yy8EJlZJFE"
duration: 433
word_count: 1807
---
This is my inbox. There's 30 emails in
there and it's
2:00 p.m. That's crazy. That never
happens. And what's crazy about this is
I've hit inbox zero for 13 weeks in a
row. That is literally never happened
before in my life. And Codex has just
like completely changed how I'm able to
process information that come into my
email. It allows me to spend less time
on stuff that like scheduling and stuff
that I would procrastinate on and more
time on doing like fun creative projects
like building more stuff with Codex. I
want to show you how I do it. So,
basically what happens is I have a
long-running thread called inbox.
And what people don't really know about
Codex is it has an in-app browser in it.
And what that allows you to do is do all
of your work. Any work that you would do
in a browser, you can do it in Codex
over here.
And then you have an agent that you can
bring to all your work. So, you're going
back and forth and collaborating with
this super smart agent that has access
to your computer, access to all your
apps, access to everything it might need
to get work done.
And it's sitting with you on any app
that you want to use. And in this case,
this is actually an app I built. So, the
other cool thing about Codex is it can
just make stuff. Like I just vibe coded
this app that lets me do my email with
Codex. So, let me explain how it works.
So, basically a few times a day Codex
will sweep through all the emails in my
inbox. And for each email, it will give
me a little card. The card looks like
this. It tells me a little bit about the
email. It lets me see the email if I
want. And Codex also drafts a reply. And
what I can do is I can just say, "Hey,
can we actually maybe I'd like to meet
with Doug near my office. Can we propose
somewhere in Brooklyn?" And see if he's
okay with that. And now I'm on to the
next email. So, new card, new scheduling
thing. And now we can just keep going.
Here's someone who's asking for
sponsorships. He wants to sponsor every
It automatically drafts a reply to the
right person. I can say, "This looks
good." Now we're on to the next one.
Now, someone else who I want to make an
intro for. I can just say, "I already
made the intro. You can archive this
one."
Next card. And here it's Greg Eisenberg.
We're we're scheduling a Codex
walk-through and it already gave me
schedules that it has access to my
calendar, so it can propose times. This
is it's crazy. Like all the stuff that I
would normally procrastinate on cuz I
have to look at my calendar or I have to
go look up a bunch of documents and
propose a reply. Codex just does it and
I just scroll through my email and and
talk to it and then it goes and does it.
And what's cool is the way that I built
this, it's just a list of feeds. All of
the information I care about, so this is
for my inbox, but there's other stuff.
So I have this company feed, which I
keep in a separate Codex thread, so I
can deal with it separately.
And what the company feed does is it
gathers everything that's happening in
the company. Remember, it's a 30-person
company, there's meetings all the time,
there's slacks everywhere. It gathers
all the stuff that's happened in
meetings that have been transcribed and
put in Notion. It gathers everything
from Slack and then it just gives me a
bunch of cards of stuff that I might be
into. And so basically each card has a
status. So it's stuff I need to look at,
it's stuff that Codex needs to do, it's
stuff that's Codex is currently working
on, or it's stuff that we've already
dealt with. And
all I have to do to get through my inbox
or any other feed of information I care
about
is review everything in to review and
queue it for Codex and Codex takes care
of the rest. So I can be like, okay,
we're talking about positioning for
every and how we want to do our plans.
There's a debate going on internally for
Quora. There's a debate going on about
whether we use the word archive or mark
as done. And I'm kind of into the mark
as done category. Can you just tell
Brandon and Kieran that I vote for mark
as done? Yeah.
And now it's just going to go do that.
And these are meetings or slacks that
I'm not in.
And what I can do is I can just say,
okay, execute. And it's going to go take
all of the work that I just did. I can
do the same thing for inbox. It's going
to go to take all the work that I just
did and it's going to send out the
emails, it's going to do the research,
it's going to do whatever I want. What's
amazing about this is all these
decisions get recorded. So it's all
recorded on my file system. It knows for
any given email
what did I say to do? Did I say this is
interesting? Did I say archive it? Did I
draft a reply? And and it gets better
over time. So, I compound my learnings.
And you can see that these are the
prompts that I use. And Codex maintains
all this. Basically, it just watches
what I do, and then it just gets better
over time every time I do this at
getting a prompt that's better at
finding things I might be interested in,
archiving or hiding things I don't want
to see, and then figuring out, "Okay,
what's the right next action for this
thing?" So,
it's just incredibly powerful. So, how
can you do this yourself? One, use Cora.
cora.computer will have a flow like this
that's just built out. So, you can just
do any of this inside of Codex as a
Codex native app. We're going to have
that coming out in the next couple
months. So, cora.computer or subscribe
to every if you just want to be notified
when all of this stuff comes out as it
progresses. But, if you want to do this
yourself, okay, let's say how how would
I do this? Honestly, just go into Codex.
And let's see, I'm going to just use
Monolog here. Okay, I want you to help
me make a inbox sweep app. And here's
how it should work. It should connect to
my email. You can either use the Cora
CLI or Gmail. Either one should work.
For every email that's in my inbox, I
want it to create a card that shows me
what the email is about and then
proposes a next action, whether that's a
draft or any other thing that makes
sense.
And then it should allow me to just like
swipe through my email or scroll through
my email and just get through my email
just by talking to each card. And what I
want it to do is I want it to track
every single step in the process. And it
should be Codex native. So, what that
means is I want the app to be
responsible for the state. So, all the
state should be on the file system. And
I want the app responsible for rendering
the view, but it should be built to be
used inside of Codex in the in-app
browser. Can you just build that end to
end? I want you to set a goal with an
unlimited budget. And make sure the goal
is really detailed and you have a set of
validation steps where you step through
it yourself to make sure that it works.
So, I'm just going to say something like
that, which is pretty basic. And there
may be some things in there that you
don't understand, but that's totally
fine. We'll give you this prompt in the
show notes so you can just paste that in
there yourself. And what I'm going to do
is I'm just going to press go. And Codex
is on auto review mode.
I'm on 5.5 with extra high. That's
probably what you want to do for this
kind of a experiment. But what's really
great about Codex is it's going to set
itself a goal. And the goal, you can see
this, it's like
build an end-to-end Codex native inbox
feed app in
in my folder the after connect to email
after the best available local path
preferring the core of CLI.
And I can just leave it.
I'll come back and it's going to be
something very similar to this app.
That's what's so powerful about it. It's
taking something that used to require a
lot of time and a lot of engineering and
making it available to you regardless of
your level of technical skill. So,
that's the video. It's a quick one for
you today. If you want more, you should
check out our compound engineering
workflow. We'll put it up here.
It's going to tell you everything you
need to know about using compound
engineering, our engineering philosophy
that builds stuff like this whether
you're technical or non-technical. And
you should subscribe to Every. Every is
the only subscription you need to stay
at the edge of AI. You can think of us
as like a frontier AI lab for the future
of work. Like all we do all the time is
explore how to take these models and
these products and use them to do better
creative work whether that's writing or
coding or design. And we put that into
our videos, into our newsletter that
comes out every day, into our products
that we make like Cora, Monologue.
You've seen some of them today. So, if
you love this video, you should
definitely subscribe.
every.to/subscribe.
