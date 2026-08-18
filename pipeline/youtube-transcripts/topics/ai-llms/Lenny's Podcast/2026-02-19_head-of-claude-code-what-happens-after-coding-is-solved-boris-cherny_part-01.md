---
video_id: "We7BZVKbCVw"
title: "Head of Claude Code: What happens after coding is solved | Boris Cherny"
channel: "Lenny's Podcast"
topic: "ai-llms"
published_date: "2026-02-19"
ingested_date: "2026-08-18"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=We7BZVKbCVw"
duration: 5265
word_count: 3997
chunk: 1
total_chunks: 6
parent_video_id: "We7BZVKbCVw"
---
100% of my code is written by Claude
Code. I have not edited it a single line
by hand since November. Every day I ship
10, 20, 30 pull requests. So, at the
moment I have like five [music] agents
running. While we're recording this?
&gt;&gt; Yeah, yeah, yeah. Do you miss writing
code? I have never enjoyed coding as
much as I do today because I don't have
to deal with all the minutiae.
Productivity per engineer has increased
200%. There's always this question,
should I learn to code? In a year or two
it's not going [music] to matter. Coding
is virtually solved. I imagine a world
where everyone is able to program.
Anyone can just build software anytime.
What's the next big shift [music] to how
software is written? Claude is starting
to come up with ideas. Looking through
feedback, it's looking at bug reports,
it's looking at telemetry for bug fixes
and things to ship. A little more like a
co-worker or something like that. A lot
of people listening to this are product
managers and they're probably sweating.
I think by the end of the year
everyone's going to be a product manager
and everyone codes. The title software
engineer is going to start [music] to go
away. It's just going to be replaced by
builder and it's going to be painful for
a lot of people.
Today my guest is Boris Cherny, head of
Claude Code at Anthropic. It is hard to
describe the impact that Claude Code has
had on the world. [music]
Around the time this episode comes out
will be the one-year anniversary of
Claude Code. And in that short time, it
has completely transformed the job of a
software engineer. And it is now
starting to transform the jobs of many
other functions in tech, which we talk
about. Claude Code itself is also a
massive driver of Anthropic's overall
growth over the past year. They just
raised a round at over $350 [music]
billion.
And as Boris mentions, the growth of
Claude Code itself is still
accelerating. Just in the past month
their daily active users has doubled.
Boris is also just a really interesting,
thoughtful, deep-thinking human. And
during this conversation we discovered
we were born in the same city in
Ukraine. That is so funny, I had no
idea. A huge thank you to Ben Mann,
Jenny Wen, and Mike Krieger for
suggesting topics for this conversation.
Don't forget to check out Lenny's
Product Pass dot com for an incredible
set of deals available exclusively to
Lenny's newsletter subscribers. Let's
get into it after a short word from our
wonderful sponsors.
Today's episode is brought to you by DX,
the developer intelligence platform
designed by leading researchers. To
thrive in the AI era, organizations need
to adapt quickly. But many organization
leaders struggle to answer pressing
questions like [music] which tools are
working? How are they being used? What's
actually driving value? DX provides the
data and insights that leaders need to
navigate this shift. With DX, companies
like Dropbox, Booking.com, Adyen, and
Intercom get a deep understanding of how
AI is providing value to their
developers and what impact AI is having
on engineering productivity. To learn
more, visit DX's website at
getdx.com/lenny.
That's getdx.com/lenny.
Applications break in all kinds of ways.
Crashes, slowdowns, regressions, and the
stuff that you only see once real users
show up. Sentry catches it all. See what
happened, where, and why.
&gt;&gt; [music]
&gt;&gt; Down to the commit that introduced the
error, the developer who shipped it, and
the exact line [music] of code all in
one connected view. I have definitely
tried the five tabs [music] and Slack
thread approach to debugging. This is
better. Sentry shows you how the request
moved, what ran, what slowed down, and
what users saw. Sear, Sentry's AI
debugging agent, takes it from there. It
uses all of that Sentry context to tell
you the root cause, suggest a fix, and
even opens a PR for you. It also reviews
your PRs and [music] flags any breaking
changes with fixes ready to go. Try
Sentry and Sear [music] for free at
sentry.io/lenny
and use code Lenny for $100 in Sentry
credits. That's sentry.io/lenny.
Boris, thank you so much for being here
and to the podcast.
&gt;&gt; [music]
&gt;&gt; Yeah, thanks for having me on. I want to
start with a a spicy question.
About 6 months ago, I don't know if
people even remember this, you actually
left Anthropic, you joined Cursor,
and then 2 weeks later you went back to
Anthropic. What happened there? I don't
think I've ever heard the actual story.
&gt;&gt; [laughter]
&gt;&gt; It's the fastest job change that I've
ever had.
Um I joined Cursor because I'm a big fan
of the product. And honestly, I met the
team and I was just really impressed. Uh
they're an awesome team. Uh I still I
still think they're awesome, and they're
just building really cool stuff. And
kind of they they saw where AI coding
was going, I think, before a lot of
people did.
So the the idea of building a good
product was just very exciting for me.
I think as soon as I got there, what I
started to realize is what I really
missed about Anthropic was the mission.
And that's actually what originally
drove me to Anthropic, also.
Cuz uh but before I joined Anthropic, I
was, you know, I was working in big
tech, and then I was I I at some point I
wanted to work at a at a lab to
just help shape the future of this crazy
thing that that we're building in some
way.
And the thing that drew me to Anthropic
was the mission, and it was, you know,
it's all about safety. And when you talk
to people at Anthropic, just like find
someone in the hallway, if you ask them
why they're here, the answer is always
going to be safety.
Um and so the this kind of like mission
drivenness just really, really resonated
with me, and I just know personally it's
something I need in order to be happy.
Um and I that's just the thing that I
really missed. And I found that, you
know, whatever the work might be, no
matter how exciting, even if it's
building a really cool product, it's
just not really a substitute for that.
Um so for me it was actually a uh
it was pretty obvious that that I was
missing that pretty quick.
Okay, so let me follow the thread of
just coming back to Anthropic and the
work you've done there.
This podcast is going to come out around
the year anniversary of launching Claude
Code. So I want to spend a little time
just reflecting on the impact that
you've had. There's um this report that
recently came out that I'm sure you saw
by SemiAnalysis that showed that 4% of
all GitHub commits are authored by
Claude code now. And they predicted
it'll be a fifth of all code commits on
GitHub by the end of the year.
The way they put it is, "While we
blinked, AI consumed all software
development."
The day that we're recording this,
Spotify just put out this uh headline
that their best developers haven't
written a line of code since December
thanks to AI.
More and more of the most advanced
senior engineers, including you, are
sharing the fact that you don't write
code anymore, that it's all
AI-generated, and many aren't even
looking at code anymore is how far we've
gotten.
In large part, thanks to this little
project that you started and that your
team has scaled over the past year.
I'm curious just to hear your
reflections on on this past year and the
impact that your work has had. These
numbers are just totally crazy, right?
Like, 4 4% of all commits in the world
is just way more than I imagined. And
like you said, it still feels like the
starting point. Um these are also just
public commits. So, we actually think if
you look at private repositories, it's
quite a bit higher than that.
And I I think the craziest thing for me
isn't even the number that we're at
right now, but the pace at which we're
growing because if you look at Claude
code's growth rate kind of across any
metric, it's continuing to accelerate.
Um so, it's not just going up, it's
going up faster and faster.
When I first started Claude code, it was
just going to be a like it was just
supposed to be a little hack. Um you
know, we we broadly knew at Anthropic
that we wanted to get a we wanted to
ship some kind of coding product.
And you know, for Anthropic for a long
time, we were building the models in
this way that kind of fit our mental
model of the way that we build safe AGI,
where the model starts by being really
good at coding, then it gets really good
at tool use, then it gets really good at
computer use. Roughly, this is like the
trajectory.
Uh and you know, we've been working on
this for a long time.
And when you look at the team that I
started on, it was called the Entropic
Labs team. Uh, and actually Mike Krieger
and, you know, Ben Mann, they just
kicked this team off again uh, for kind
of round two.
The team built some pretty cool stuff.
So, we built QuadCode, we built MCP, we
built the desktop app.
So, you can kind of see the seeds of
this idea, you know, like it's it's
coding, then it's tool use, then it's
computer use.
And the reason this matters for Entropic
is
uh, because of safety. It's kind of
again, just back to that. AI is getting
more and more powerful. It's getting
more and more capable. The thing that's
happened in the last year is that for at
least for engineers, the AI doesn't just
write the code. It It's not just a
conversation partner, but it actually
uses tools. It acts in the world. Um,
and I think now with Co-work, we're
starting to see the transition for
non-technical folks also. Um, for a lot
of people that use conversational AI,
this might be the first time that
they're using the thing that actually
acts. It can actually use your Gmail. It
can use your Slack. It can do all these
things for you, and it's quite good at
it. Um, and it's only going to get
better from here.
So, I think for Entropic for a long
time, there was this feeling that we
wanted to build something, but it wasn't
obvious what. And so, uh, when I joined
Anth, I spent one month kind of hacking
and, you know, built a bunch of like
weird prototypes. Most of them didn't
ship, and, you know, weren't even close
to shipping. It was just kind of
understanding the boundaries of what the
model can do.
Then I spent a month doing
post-training. Um, so, to understand
kind of the research side of it. And I I
think honestly, that's just for me as an
engineer,
I find that to do good work, you really
have to understand the layer under the
layer at which you work.
And with traditional engineering work,
you know, if you're working on a
product, you want to understand the
infrastructure, the runtime, the virtual
machine, the language, kind of whatever
that is, the system that you're building
on.
But, uh, yeah, if you're like if you're
working AI, you just really have to
understand the model to some degree to
to do good work.
So, I took a little detour to do that,
and then I came back and just started
prototyping what eventually became
QuadCode. Uh, and the very first version
of it I I like a There's like a video
recording of the summer cuz I recorded
this demo
and I posted it. It was called Quad CLI
back then. And I just kind of showed off
how it used a few tools. And the
shocking thing for me was that I gave it
a bash tool and uh, it just was able to
use that to write code
to tell me what music I'm listening to
when I asked it like what music am I
listening to.
And this is the craziest thing. Right?
Cuz it's like there's no I I didn't
instruct the model to say you know, use,
you know, this tool for this or kind of
do whatever. The model was given this
tool and it figured out how to use it to
answer
this question that I had that I wasn't
even sure if I could answer what music
am I listening to.
And so I I I started prototyping this a
little bit more. Um, I made a post about
it and I announced it internally and I
got two likes.
That's the
Those likes Those likes sent to the
reaction at the time.
Cuz I think people internally, you know,
like when you think of coding tools, you
think of like you think of IDEs, you
think about kind of all these pretty
sophisticated environments.
No one thought that this thing could be
terminal based. Um, that's sort of a
weird way to design it and that wasn't
really the intention.
But uh, you know, from the start I built
it in a terminal because you know, for
the first couple months it was just me.
So, it was just the easiest way to
build.
Uh, and for me this is actually a pretty
important product lesson. Right? It's
like you want to under-resource things a
little bit at the start.
Then we started thinking about what
other form factors we should build and
we actually decided to stick with the
terminal for a while.
And the biggest reason was the model is
improving so quickly.
We thought that there wasn't really
another form factor that could keep up
with it.
And honestly, this was just me kind of
like struggling with kind of like what
should we build, you know, like for the
last year QuadCode has just been all I
think about. And so just like late at
night, this is just something I was
thinking about like, okay, the model's
continuing to improve. What do we do?
How can we possibly keep up? And the
terminal was honestly just the only idea
that I had.
And uh, yeah, it ended up catching on.
After
after I released it, pretty quickly it
became a hit at Anthropic and you know,
the the daily active users just went
vertical and it really early on actually
before I launched it, Ben Mann
uh nudged me to make a DAU chart. And I
was like, you know, it's like kind of
early, maybe you know, should we really
do it right now? And he was like, yeah.
And so the the chart just went vertical
pretty immediately. Uh and then in
February we released it externally.
Actually, something that people don't
really remember is Quad Code was not
initially a hit.
When we released it, it got a bunch of
users. There was a lot of early adopters
that got it immediately. But it actually
took many months for everyone to really
understand what this thing is.
Just again, it's like it's just so
different.
And when I think about it, kind of part
of the reason Quad Code works is this
idea of latent demand
where we bring the tool to where people
are and it makes existing workflows a
little bit easier.
But also because it's a it's in a
terminal, it's like a little surprising.
It's a little alien in this way. So you
have to you have to kind of be
open-minded and you have to learn to use
it.
And of course now, you know, Quad Code
is available, you know, in the iOS and
Android Quad app. It's available in the
desktop app. It's available on the
website. It's available as edit
extensions in Slack and GitHub, you
know, all these places where engineers
are. It's a little more familiar. But
that wasn't the starting point.
So yeah, I mean, at the beginning it was
kind of a surprise that this thing was
even useful.
And uh you know, as the team grew, as
the product grew,
as it started to become more and more
useful to people, just people around the
world from, you know, small startups to
the biggest FAANG companies started
using it and they started giving
feedback.
And I think just reflecting back, it has
been such a humbling experience cuz we
just we keep learning from our users and
just the most exciting thing is like,
you know, none of us really know what
we're doing.
Um and we're just trying to figure it
out along with everyone else and the
single best signal for that is just
feedback from users.
Um so that's just been the best. I've
been I've been surprised so many times.
It's incredible how fast something can
change in today's world. You launched
this a year ago, and it wasn't the first
time people could use AI to code, but uh
in a year, the entire profession of
software engineering has dramatically
changed. Like there's all these
predictions, oh, AI's going to be
written 100% AI's uh of code's going to
be written by AI. Everyone's like, no,
that's crazy. What are you talking
about? And I was like, oh,
of course, it's happening exactly as
they said. It's just that things move so
fast and change so fast now.
Yeah, it's really fast. Back at Back at
Code with Claude back in May, that was
like our first uh you know, like
developer conference that we did as
Anthropic.
Um, I did a short talk and in the Q&amp;A
after the talk,
people were asking, what are your
predictions for the end of the year? And
my prediction back in May of 2025 was,
by the end of the year, you might not
need an IDE to code anymore. And we're
going to start to see engineers not
doing this. And I remember the room like
audibly gasped.
It was such a crazy prediction.
But I think like at at Anthropic, like
this is just the way the way we think
about things is exponentials. And this
is like very deep in the DNA. Like if
you look at our co-founders, like three
of them were the first three authors on
the scaling laws paper.
Um, so we really just think in
exponentials.
And if you kind of look at the
exponential of the percent of code that
was written by Claude at that point, and
if you just trace the line, it's pretty
obvious we're going to cross 100% by the
end of the year, even if it just does
not match intuition at all.
Um, and so all I did was trace the line,
and yeah, in November, that you know,
that happened for me personally, and
that's been the case since, and we're
starting to see that for a lot of
different customers, too. I thought that
was really interesting what you just
shared there about kind of the journey.
Is this kind of idea of just playing
around and seeing what happens? This
came up comes up with Open Claude a lot,
just like Peter was playing around, and
just like a thing happened. And it feels
like that's a central kind of ingredient
to a lot of the biggest innovations in
AI is people just sitting around trying
stuff to pushing the models further than
most other people. I mean, this is the
thing about innovation, right? Like you
can't uh you can't force it. There's no
road map for innovation. Um you just
have to give people space. You have to
give them maybe the word is like safety.
So, it's like psychological safety that
it's okay to fail. It's okay if 80% of
the ideas are bad. Um you also have to
hold them accountable a bit. So, if the
idea is bad, you you know, you cut your
losses, move on to the next idea.
Instead of investing more
uh in the early days of Claude code, I
had no idea that this thing would be
useful at all. Cuz
even in February when we were we
started, it was writing maybe, I don't
know, like 20% of my code, not more. And
even in May, it was writing maybe 30%. I
was still using, you know, Cursor for
most of my code. And it only crossed
100% in November. So, it took a while,
but even from the earliest day, it just
felt like I was onto something and I was
just spending like every night, every
weekend hacking on this. And luckily,
my, you know, my wife was very
supportive.
Um but it it it just felt like I was
onto something. It wasn't obvious what.
And then sometimes, you know, you find a
thread, you just have to pull on it. So,
at this point, 100% of your code is
written by Claude code. Is that is that
kind of the current state of your
coding? Yeah, so 100% of my code is
written by Claude code. Um I'm a fairly
prolific coder. Um and this has been the
case even when I worked back at
Instagram. I was like one of the top few
most productive engineers.
Um and that's actually that's still the
case uh here at Anthropic. Wow, even as
head of head of the team.
Yeah, yeah. Do still do a lot of coding.
Um and so every, you know, every day I
ship like 10, 20, 30 pull requests,
something like that. Every day?
&gt;&gt; A hun- Every day. Yeah.
Good god. Uh 100% written by Claude
code. I have not edited a single line by
hand since uh November.
And
yeah, that that's been it.
I do look at the code. So, I I don't
think we're kind of at the point now
where you can be totally hands-off,
especially when there's a lot of people,
you know, like running the program. You
have to make sure that it's correct. You
have to make sure it's safe and so on.
Um and then we also have Claude doing
automatic code review for everything. Um
so, here at Anthropic, Claude reviews
100% of pull requests. Um, there's still
a layer of like human review after it,
but you kind of like you still do want
