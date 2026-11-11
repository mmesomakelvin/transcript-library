---
video_id: "2-0lxK2wgJ8"
title: "Loop Engineering: The Future of AI Coding?"
channel: "Ray Amjad"
topic: "ai-llms"
published_date: "2026-06-09"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=2-0lxK2wgJ8"
duration: 964
word_count: 3650
---
Okay, so over the last 24 hours almost
everyone has been having a paradigm
shift where they realize that they
should no longer be prompting their
agents, but instead prompting and
designing loops that in turn prompt
their agents for them. Now, this was
started last week because Boris
Cheshirkov said this in an interview.
&gt;&gt; Now, we've actually leveled up, I think
again, to the next level of abstraction
where I don't prompt Claude anymore. I
have loops that are running. They're the
ones that are prompting Claude and kind
of figuring out what to do. My job is to
write loops.
&gt;&gt; And then this was repeated again by the
creator of Open Claude saying that you
should be designing loops that prompt
your agents. Now, what's causing a lot
of frustration with people is that no
one has taught folks how to do this. It
feels both evidently the future and also
somehow gatekept. So, I'll be focusing
on the higher level picture and then
going through a few examples inside of
this video. Now, before getting started,
I want to quickly mention that I have
been teaching this for over 3 months
inside of my masterclass. So, I made a
bunch of videos about this back in
February and I'm still making more. And
I have been running loops pretty much
every single day. So, for example, I ran
this loop that ran for about 19 hours
and verified over 500 different user
flows inside of my new application. And
then I ran another loop after that that
basically fixed a whole bunch of the
issues that the previous loop identified
over the course of 11 hours. Now, before
reaching this level, let's quickly go
back to where we were. So, about a year,
2 years ago, we were hand coding with AI
auto complete. So, we would be writing
in like a line of code and then it would
complete the function for us. And then
about a year ago, 6 months ago, we
started juggling many different agents
together. So, you probably seen people
with like six different agent windows
open and they're jumping between each of
them prompting one after another, but
they're still inside of the loop of each
agent actually prompting each one
individually. Now, most people are at
stage two and if you're at that stage
and completely happy with that, then you
can end the video right now. But if you
want to move on stage three kind of like
Boris, then you got to be writing loops.
Now, Boris has a couple of different
loops that he mentioned in the video. He
didn't go into too much detail about it,
but he has some that look through
GitHub, find any issues, flag those
issues, and make any fixes. He has other
ones that go through Slack and identify
what other people are doing, and then he
also has some that go through Twitter as
well, different agents running on a loop
that kind of decides what to build next
for Cloud Code. Now, to give you a
really simple example of a loop that I
have running is a scheduled task where
every 24 hours it looks through Sentry,
identifies any issues affecting more
than 20 users, and then automatically
creates a brand new PR fixing that
particular issue. And besides Cloud Code
routines, we've seen this in a couple of
different ways. So, we have the slash
loop command inside of Cloud Code. We
also have slash goal, which I made a
previous video about inside of Codex and
Cloud Code. So, what I showed you
previously where Cloud Code tested over
300 user flows over 19 hours, that was a
slash goal. And in the case of that
loop, I had Cloud Code automatically do
a screen recording for every single user
flow that it tested, and it stored it
all into a folder over here. So, I can
just watch through all the recordings
and make sure that it did a good job.
So, here is one of the recordings that
it did, uh where it's basically testing
out this like lead collection model. We
have also seen this in the form of
Andrew Kapafee's auto research, where we
have a loop optimizing some code and
then scoring it against a benchmark. And
if the optimization led to a better
result, it would keep it. If not, it
would discard it. And interestingly
enough, Microsoft have also applied the
same idea of like what if instead of
changing code, we changed agent skills
instead and had self-improving agent
skills. I'll have a separate video about
this coming soon, so do stay subscribed
for that. But, I have also been using
auto research quite a lot recently in
the form of slash goal, whereby I was
basically optimizing Gemma 4 to run
locally on my machine, and you can see
that it tried a whole bunch of things,
and then it kept what worked and
reverted what didn't work. And then we
saw this in a different form in in by
having the raffle loop. So, we would
break down a big task into many small
tasks and then do each in a brand new
context window. But, the same principle
still applies whereby we have some kind
of trigger and that can be a prompt, a
time of day, or like a event happening
at a data source. We would have some
kind of variation running and that could
be a goal loop, auto research, a rough
loop. We would check whether it's done
and if it's not done, then it would
basically repeat again. Okay, now let's
go for a more concrete example of
something you may have been doing until
now. So, you may have worked back and
forth with a coding agent to come up
with a spec and once you have that
ready, you then tell the agent like,
"Hey, implement this for me, please."
And this would be your prompt. And then
after it's implemented, you may say like
do code review or you may have another
code review skill. So, we already have
one inside of Cloud Code which is code
review and it would spin up a bunch of
sub-agents and find any issues with the
implementation. And then next up, you
would prompt it and be like, "Hey, hey,
fix these issues for me. So, fix these
issues for me." And then after it's
fixed the issues, you may do another
code review and you may kind of like go
back and forth between these two stages
two or three times until you're happy.
Then you may have prompted it again
being like run the tests, open like
Cloud in Chrome, for example, and then
it would open Cloud in Chrome, test it
out, do everything for you, maybe record
some like screen recordings for you to
check later. And then for anything
that's broken, it would then fix those
issues again. So, you can see right now
we already have two loops happening that
you're kind of doing manually and you're
driving manually. So, we have this loop
over here of the code review fix going
back and forth and then we have another
loop over here of the verification
like fix going back and forth. And then
you would say something like, "Open and
merge PR." And then you may prompt your
agent after the PR has been merged
saying something like "slash loop 2
minutes, check for errors." So, like
check if there are any increase in
errors because this feature has now been
merged. And then if I identify there's
some kind of error, you may have
prompted it being like, "Okay, cool. Fix
this error for me." So, you can see in
this white text, this is why you're
prompting Cloud Code Codex every single
time. And then, when it fixes the error,
it may go back over to the
implementation stage, right all the way
over here. So, you can see this is now a
bigger loop that's happening. Now, if
you have been doing something like this
until now, you were in the middle of a
manual loop. And a unit of work for you
was the prompt itself.
But now, if we're moving on stage three,
we want to have a unit of work being the
loop itself, rather than just a prompt.
So, we have an input, and then it goes
through the cycle that we just showed,
and then it makes an output, which can
be a merged PR, and some screen
recordings that you can be confident to
know the feature works. So, essentially,
this entire process over here should be
one big loop instead. So, we have some
smaller loops, which are inside of this
bigger loop. And our input to a loop
over here is a spec that we will still
write ourselves, because we want to kind
of decide how a feature should look. And
then, the output of the loop here would
be a screen recording with a merged PR
to show the feature works as intended.
And this is exactly what the big labs
are talking about. We should be
designing a system kind of like this, a
loop which is now a single unit of work.
So, all of this here is now a unit of
work. And of course, you don't have to
design a loop like this alone. You can
design it with the help of a agent. So,
you decide what the inputs would be,
which can be a spec, what kind of
actions it would take, what kind of
checks it would do, where any memory
would be stored, when it would exit the
loop and decide that it's done, and then
where it would surface anything that has
been done for you. So, that could be by
sending you a Telegram message, it could
be sending you a message on Slack, or
something else. So, you can kind of
imagine at the very end of this loop
over here, our agent sent us a message
on Slack with a bunch of screen
recordings, and then also the final PR
as well, for us to read it through. Now,
I will be releasing a brand new class in
my masterclass all about agents
engineering called Loopy AI, and I have
been working on this for the last couple
of weeks because I noticed that this was
going to be the future. So, if you want
to go into much more detail in a lot of
the concepts, then this class will be
available on Monday next week. And if
you sign up now, then you can get 30%
off lifetime. By signing up, you also
get access to all the previous videos,
about 300 that I made about Cloud Code,
Codex, a bunch of fundamental and
advanced techniques when it comes to
using these agents, context engineering,
prompt engineering, and a bunch more
stuff. Many people have found a lot of
what I covered in the class to be many
months ahead of the curve, and you may
find that too. So, the Loopy AI class
will be exactly like that because this
is the direction we're going to be
seeing going forwards. And finally, for
the Loopy AI class, there will be some
live office hours that you can bring
your questions if you're interested. And
there is also a 30-day money-back
guarantee if you don't feel satisfied
for whatever reason. Now, experimenting
around, learning a bunch, and then
sharing my insights in this class will
be my focus for the next couple of
months. So, if you want to sign up now
at a discount, then the link will be
down below. Now, we want to take this
loop to the next level, and that would
be by making a outer loop that manages
the inner loop. So, we can kind of
imagine it like this. So, the inner loop
that we defined earlier is basically
implementing a spec, but we may want
like new specs being regularly delivered
to the inner loop to implement. And we
could have another loop that is
monitoring our competitors. So, it
automatically goes to our competitor's
website and notices any new feature that
was added, and then automatically passes
this into the inner loop to then
implement that feature. So, essentially,
the outer loop to our inner loop could
look something kind of like this. We
check our competitors' LinkedIn, X, and
their change logs every single day to
know when they announced a new feature.
We then use like browser use or computer
use to click around and find out how the
feature works. We could also inspect
like network logs and stuff like that.
And then based on that, we would write a
brand new spec being like, "Hey, we'll
implement the same feature ourselves as
well." So, this could also be a new a
smaller inner loop as well, where we
have a good inner loop for writing
specs. Then we may have some kind of a
human in the loop to approve. And if you
do approve it, then you trigger the
inner loop. That would then trigger the
entire build for us, this build over
here. And if you don't approve it, then
it would just await until tomorrow.
Okay, so let's go for two more examples
of inner loops and outer loops. So, you
may have an inner loop running {slash}
goal to kind of find performance
improvements for a ML model that you're
working on. And then you would have a
outer loop that monitors archive.org
every single day for any new strategies
that may apply to the ML model you're
working on to get better performance.
So, it could look something kind of like
this. Anytime it finds a new strategy,
it passes it down to inner loop. And
then once the inner loop like beats your
existing strategy by a certain like
percentage, then it'll notify you on the
channel you care about like Slack. As a
non-technical example, let's say you're
running some kind of cold email
campaign. You may have some kind of
inner loop that is doing auto research
to improve the email copy on 10% of the
list. And that would be like asking for
feedback, human in the loop kind of
every single day. And then you would
have a longer-term outer loop that may
run every single week. And it monitors a
bunch of fake inboxes that you set up to
receive campaigns from any competitors
in your niche. And that could be feeding
into the inner loop to kind of see if it
would beat your existing campaigns in a
way. Now, every single time the loop
runs, it will be stateless. Which is why
we want to have memory for our loops.
Now, this could be some kind of file
system or Git, for example. So, the loop
that I have set up to fix Sentry issues
every single day, it knows which ones
have already been fixed yesterday
because it can just look at the commits
from yesterday. But it could also be an
external memory layer kind of like Slack
or AirTable. So, you may have AirTable
set up, and then you connect it to your
Cloud Code schedule routine via the
connectors over here. And then when you
define your loop inside of instructions
over here, you would tell it, "Hey,
first can you check the Airtable to make
sure that we haven't done this before."
Now, one thing I personally like to do
is to have Slack as a memory layer and a
decision surface for many of my
longer-term loops that would run every
day or every week, for example.
So, I have a channel over here, which is
for optimizing my landing page in this
project, and then I have many different
channels, each belonging to a different
loop. Now, I have a bot that
automatically posts to channel. So, this
one is analyzing my landing page and be
like, "Hey, these are some of the
issues. Here are some of the
recommendations I have for fixing them
and the uplift by fixing them."
So, for example, it says, "Okay, do
this." And every time the loop runs, it
can see any previous messages that it
sent yesterday, and then I can also make
decisions from here. So, I like this
suggestion over here, which is number
four. I can basically right-click, do
add reaction, choose number four, and
then the next time the loop runs, it
will look at the previous message, my
reaction to it, and then make that
change and automatically send a message
to that channel. So, this is both a
memory layer for the loop cuz I can see
the previous messages and also a
decision surface for me because I can
leave reactions, which automatically
tell it like what it needs to be doing
next. Now, memory is really great for
our loops because it means that they can
compound over time, but one of the
problems with that is that we can have
our slop compounding as well. So, if you
don't keep your loops in check, you can
just lead to way more slop over time.
And this is one of the problems that
many people face, and the way that I see
it is that entropy is slowly increasing
over time anyway, and agents, because
they can do a lot of work, basically
collapse that into a much shorter time.
So, the amount of entropy we're facing
on a day-to-day basis is much greater
than it was like 2 years ago. And there
are a bunch of things that you can do
about it. So, for example, you can have
outer loops that can kind of ground like
your inner loop that is increasing
entropy and like external sources, for
example. But one thing that I like to
do, especially when it comes to coding,
is having adversarial code reviews. So
for example, the reason I have this code
review in the previous loop redefine
over here and the verification step is
to reduce the entropy from increasing a
lot over time. So ideally, you want some
kind of oracle outside of the model and
that could be like test passing, the
real production errors, Stripe revenue,
like actual reply rates, for example,
that kind of keeps a loop in check and
prevents slop from accumulating. Now the
way that Boris kind of talks about this
is that loops are the next evolution. So
he kind of talks about punch cards being
a thing in the 1940s, then we moved up
one layer to assembly, and then we moved
over to high-level languages like C, and
then we moved over to libraries and
frameworks like Rails, Next.js, and so
forth, and then we moved over to
prompts, and now we finally have our
loops which are then running our prompts
for us. So eventually, you stop being
that runs. You design the thing that
runs and the leverage moves up one more
layer. And I think one thing that we
will be seeing over the next couple of
months is having loops that check up on
your work and your loops to find
opportunities for future loops. So it's
kind of like having a meta loop. So for
example, when making this loop, you may
give it access to everything inside of
your organization as well as the ability
to view existing loops, and then it
could kind of identify which loops are
working and making impacts on the bottom
line, which are not working, and then
also create new loops for you as well
with your approval, of course. And I
don't think we've quite reached the
stage where the models have enough taste
to decide what should be good loops and
not good loops, for example. So maybe it
would give you like 10-20
recommendations and then you apply your
own taste and filter it down, for
example. But if you do want to compound
over the next couple of months, then
this is what you should be thinking
about. Now of course, this can end up
using a bunch of tokens if you're not
careful and wasting them. So that's why
like you got to be mindful of like,
"Hey, are these tokens actually
economically valuable? Are they making a
difference to my bottom line for my
business over here?" So, for example, in
this situation, I used 4.1 million
tokens, but I know these tokens were
economically valuable because I will
make more money back from the kind of
work that was done here than the amount
of money that was spent on the tokens.
Anyways, if you do like this kind of
stuff, then do subscribe to the channel
because I only upload videos when I feel
like there's something worth saying. And
if you do want to stay in the loop,
quote unquote, then you can also join my
email newsletter that will be linked
down below. And remember that if you do
want to save money on my Loopy AI class
that will be launching next week, then
there will be a link down below for that
as well.
