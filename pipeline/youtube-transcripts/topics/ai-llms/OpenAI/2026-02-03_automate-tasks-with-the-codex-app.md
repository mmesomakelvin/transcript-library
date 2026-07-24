---
video_id: "xHnlzAPD9QI"
title: "Automate tasks with the Codex app"
channel: "OpenAI"
topic: "ai-llms"
published_date: "2026-02-03"
ingested_date: "2026-07-24"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=xHnlzAPD9QI"
duration: 275
word_count: 1013
---
So, there there's a lot about the job
isn't actually that fun that I have now
um automated away almost entirely. Um
and so, I'll show you a few of those
here in our automations tab. And we've
got a bunch running now, but we can run
down a few of these cuz I I kind of have
set up a few different types of
automation. And the first type is just
sort of information. I'm asking Codex to
look at the last day of commits into
this section of our mono repo. And
basically, like group them, tell me who
worked on what, um what got done, what
do I need to know about? And so, I I
wake up in the morning with almost like
a, you know, if you've used ChatGPT
pulse, it's it's like a personalized
pulse that I walk I open the app in the
morning and sitting there is like,
here's what happened yesterday in the
code base.
Um which is, you know, super super
useful. So, I have one called upskill.
And what upskill does is it looks at the
last day of skill usage. So, it says,
"Hey, you know, skills are really
useful, but sometimes they take a little
bit of tinkering to get right." And so,
it looks at Codex usage throughout the
past day and detects if any skills like
if Codex had any trouble with skills or
if any of the scripts
um didn't work correctly or if like
something could be sped up. And it makes
improvements to the skills. So, it's
upskilling like overnight. Like I'm
going to sleep, I wake up, Codex is
smarter in the morning based on what we
are trying to do here. Similarly, update
agents.md, like this I just have run
every, I don't know, 6 hours and it just
looks at what we've been doing. And if
there's any like disagreements or
misunderstandings that I've had with
Codex or things where things took longer
to communicate than or I used some short
hands that Codex wasn't familiar with,
it will just add that to the
personalization. So, the next time um
things can just be quicker. I've got a
few others that are integrated deeply uh
into our other tools. And so, one of
them is Sentry.
This is kind of a different type of
automation um where it's going to go
through on a whatever schedule, whatever
cadence, and it picks off one of the top
Sentry issues. So, that could be like a
performance regression or a crash or um
you know, an error that's being thrown
in in the app. And it like goes through
all of the information that we have
about it. The logs, um everything, you
know, the maps, everything that Sentry
has, it looks at the code base, and it
it picks something to fix, basically. Um
and automations have memory, so it
remembers what it tried to solve last
time, and so you're not going to get a
PR like solving the number one issue
every, you know, every hour, right? Um
but it's really good because what this,
you know, what this type of automation
does is is it allows us to focus on what
is going to make the Codex app great to
use and and useful and joyful and all of
the things that like,
you know,
bugs and things that fall through the
cracks that like aren't quite as fun to
figure out, at least for me. I know some
people love it. Um that stuff can happen
kind of behind the scenes, right? And
so, it's really common that you run into
merge conflicts when you try to merge
your thing and like you find, you know,
you you iterate on your approach and and
you've got like different types of
people giving reviews and then you're
you're finally ready to merge something
and there's a conflict. Your CI is
failing for, you know, some small
reason, you got to kind of dive into
that. And so, um I don't like dealing
with any of that. Um not maybe, you
know,
&gt;&gt; Most people probably do.
&gt;&gt; Some people love doing that and they
work on CI tools. Um
but I like green PRs uh automation here.
It uses some of our skills. So, we use
Buildkite, we use GitHub, um and so,
what this does is it checks if I have a
um any open PRs, and I usually have like
at any given time between 10 and 20 PRs
these days open at a time because of the
Codex app. Um
a separate problem. Um and this is going
to go through and it's going to say
like, do any have CI failures because of
like, you know, something lint that like
linted wrong or like didn't get get
caught in the pre-push um or maybe it's
going to merge conflict because someone
is like also changing it because we're
rushing to you know finish up a project
or something like that.
And this is going to go through and it's
going to make sure that all my PR's are
green. It's going to update the base
branch. It's going to intelligently
resolve merge conflicts by looking at
like what have people been trying to do?
So it's not just a factual like
you know I'm going to clean up the like
conflict markers. It It can look at
Oh like Joey was putting in this
feature. So he changed this block for
this reason. I'm trying to do this. I'm
changing it and there's a conflict and
like kind of knows how to do that. And
so that's a very long way of saying my
PR's are always green.
