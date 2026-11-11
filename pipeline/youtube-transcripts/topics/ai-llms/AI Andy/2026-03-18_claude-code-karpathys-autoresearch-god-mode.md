---
video_id: "vjJwgXsMfjM"
title: "Claude Code + Karpathy's Autoresearch = GOD MODE!"
channel: "AI Andy"
topic: "ai-llms"
published_date: "2026-03-18"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=vjJwgXsMfjM"
duration: 676
word_count: 1830
---
I used Andre Karpathy's auto research to
build an automatically improving content
machine. It makes five videos per day,
publishes them, gathers real data,
figures out what worked and what didn't,
then rewrites its own prompts to get
better every single day automatically.
Let me show you how I built it, and I'll
give you the entire template for free.
But, before that, just let me show you
how it works. So, what is auto research?
So, a couple weeks ago, Andrej Karpathy,
one of the founding members of OpenAI
and former head of AI at Tesla, released
this repo that is called auto research.
And the idea is dead simple. You give an
AI agent three things: a file to change,
instructions on what to optimize, and a
way to measure whether it got better.
Then, you just let it run. And in his
case, he was optimizing for machine
learning training script. So, his
experiment right here, the agent would
tweak the code, run it, check if the
results improved, then kept the changes
if they did, throw them out if they
didn't, and repeat. He ran hundreds of
experiments overnight and got an 11%
improvement. But, here's what most
people miss. This isn't just for machine
learning. You can apply this to
literally anything that has a measurable
output. I looked at this and thought,
"My content pipeline has all three of
these. The prompt is my train.py, the
loop instructions are my program.md,
and the eval is real views from
Instagram and Facebook. I built it, and
here's how you can do it, too. Pulling
the data. So, it all started when I
posted this repo into Claude code and
asked if it was actually possible to use
this repo with a feedback of views taken
from social media instead, because I
kind of wanted to self-optimize based on
views. After a quick confirmation that
it wouldn't be exactly the same, cuz
this has a slow loop using 24 hours as
the time base, I kind of started getting
obsessed and just had to figure out if I
could do it. So, the actual work was to
pull Instagram data and Facebook data to
analyze it and start creating my E Val
basically what to optimize for based on
real data. I have fully unleashed my AI
avatar to Instagram and Facebook using
my AI clone. And as you can see, most of
the views are 1,000, but some actually
get over 100,000 views without me having
to film anything. And the real question
was, what are the criteria that are
basically 198 views, right? So, I set
this all up through a meta graph API,
which is completely free. I made a new
app, and then I went to the tools, the
graph API explorer, added some Instagram
basic permissions, and read pages, and
just like that, he found our 30 last
reels sorted by views as top performers
and the bottom performers as well. It
said, "A clear pattern already jumping
out. The wow factor, visual demos crush
it, where Claude code or productivity
content underperforms." And I was like,
"That doesn't really make sense. Can you
actually pull a lot more data?" And just
like that, it pulled 200 Instagram reels
and started getting even more key
patterns of what was working and what
was underperforming. But, because
Instagram is a bit different than
Facebook, we had to pull from there as
well, so we can actually sandbox it
based on just Instagram and Facebook, no
other social media platforms. Now that
it had all the data, but we had to build
the eval. So, this is where most people
screw up auto research. They make the
eval criteria something like, "Is this
engaging?" or "Does it sound good?"
That's just vibes, and what we need is a
clear yes-no question, no gray area. And
please roast me in the comments. I would
love for this to improve by you guys
improving it as well. But, here are the
evals that we ended up with. This is no
vibes, it's just a yes-no. Does the hook
describe a result or transformation, not
just a feature? Does the hook feature a
person or story, not just a company?
Those are for the hook quality, and the
content framing is the short framed
around what you can do, not what it is.
Does the script avoid sounding like a
press release or change log, right? So,
you can see these are yes-no questions
that can be answered easily. Would the
first frame of this video make someone
stop scrolling? These were the 10
questions that we ended up with. And the
key is that binary criteria are machine
readable. You can feed a script into
Gemini and ask it these 10 questions,
and you get a score out of 10. No
subjectivity, no rate this on a scale of
1 to 10 just on vibes. It's just yes-no.
But, now that we had all of these, we
started on wiring the loop. Here is the
actual system, I'll show you in a
minute. Here is the actual code that it
wrote, 1,000 lines. A auto research loop
that is working exactly like this. The
first thing is that we pull our views
from Facebook and Instagram. This is
really important cuz every morning,
maybe we got views, maybe we didn't.
Then we match an update with views to
our air table. This is kind of our
production system. It looks like this
right now, and this is essentially where
we make all the videos, and here is
where the videos are stored as well. As
you can see,
&gt;&gt; Stop everything. Robots are now
mastering your favorite sports just by
watching our messy YouTube clips.
Pretty cool, and as you can see, we have
the database here for the eval score,
performance tier, etc. And the
automation in the back end, just to show
you, looks a bit like this, and AI can
improve this by itself over time. But,
I'm getting ahead of myself. Next we
pre-score new ideas. So, we scrape
social media every single morning. We
have an eval that is actually based on
just the sources as well, even before
creating. So, there's two sets of evals
here, and if it gets above a five score,
it enters the creation queue. Next, we
score published script. So, Gemini reads
each script and answers 10 yes/no eval
questions, that's the one you just saw,
and outputs a score for every published
short. Next, we correlate with high eval
plus high views equal validated winners.
High eval plus low views false
positives. That means we have to fix the
eval plus handle rankings plus approval
rate tracking. As you can see, it's
getting smarter. Then we generate and
push. We write an improved prompt from
correlation data, winners, failures,
push new prompt to N&amp;N workflow via API,
and this self-improvement loop is going
every 24 hours starting at 8:00 a.m. my
time. All fully automated with one
Python script. But, you might be
wondering how it evolved. As you can
see, we started with the original prompt
that had a hook detail tone close word
budget and etc. Then it started
reframing it from announcement to a
curiosity trigger. It pushed it to be
broader, more dramatic. Then it tried to
deepen the personalization with
life-altering language added. The hook
scoped away from events more into
universal and timeless discoveries. And
we ended up at hook framing sharpened
with secrets about to be revealed. So it
went through five meaningful revisions
across two days. And we can see it all
here in this auto research prompt JSON
that get updated every single day based
on the criteria. But the last part I had
to figure out was how to run it daily.
The last piece is making it hands-off.
So the script runs every morning at 8:00
a.m. via launchd. So that's macOS's task
launcher. Every day it pulls yesterday's
views count and it does all these
things, right? And at the end it
actually gives me a summary or auto auto
research daily report. Here it has the
top performers that we have done, the
prompt updates with a bunch of changes
that it's done, with top handles and
human approval as well. Currently I have
a team member that is using Content Made
2.0.3 where he is using it himself
manually. And we got Content Made V2.1
now that has this auto improvement
feature built into it. And literally
every single day five videos get made
and my coworker, what he does is watch
the video and if it's good, he puts this
one on schedule. If it's not good, he
just says no. And AI learns from this as
well, making it almost 100% fully
automated besides quality inspection and
the beautiful thing is that it never
stops getting better. Every day the
pipeline publishes five shorts. 24 hours
later the loop checks back in what
happened. The prompts get slightly
better. After a week and seven
iterations, after a month, 30. Unlike
manual tweaking, every single change is
a logged with the data that caused it.
So, when a smarter model comes out next
month, I hand it that research log and
it picks up exactly where it last left
off. And Karpathy said this himself, the
research log might be the most valuable
asset. And you can apply this to
anything, your thumbnail prompts, your
email sequences, your landing pages. If
a prompt has a measurable output, auto
research can improve it. This is the
coolest thing that I found in a long
while and I'm giving it all the way for
free. If you want Content Mate, if you
want the NAN template, and you want the
auto improvement loop, head to our free
school community where I give away all
the resources here inside of the AI
Clone Automation. But I can understand
that it is maybe a little bit technical
for some people. So, if you want to
implement this way easier, customize it
for your business, head into the AI Made
Plus community where I will help you
more hands-on. Now, I guess all we need
to do is wait. I want to make a video in
a month from now showing the exact
results and what ended up happening. So,
subscribe. Maybe it's gotten better or
it's posting corn. Who knows? But it's
going to be fun anyways. Thanks for
watching and I'll see you tomorrow at
lunch.
