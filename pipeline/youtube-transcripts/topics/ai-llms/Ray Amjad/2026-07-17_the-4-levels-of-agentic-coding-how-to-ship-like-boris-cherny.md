---
video_id: "XLA-sTSJ-Wc"
title: "The 4 Levels of Agentic Coding: How to SHIP Like Boris Cherny"
channel: "Ray Amjad"
topic: "ai-llms"
published_date: "2026-07-17"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=XLA-sTSJ-Wc"
duration: 1965
word_count: 6772
---
Okay, we have a new post from
Boris, the Creative Cloud programmer
, about the steps to adopt AI,
specifically regarding
agent coding. I want
to explain it in much more detail in
this video with several examples. Because it
's very dense, and I think that when it
comes to material as dense as this, it
helps a lot to see someone go through it on
their screen and show you what they do on a
daily basis, so you can extract
some ideas and implement them in your
own workflows. Ideally, you should
get to step four, where
Boris is, and most of us
are stuck between step one and
step two. So, basically,
I'll start here with several examples and
then gradually move on. It is worth
mentioning that there is no single
right way to do all the steps.
It will depend on your own
circumstances, and I don't think anyone
is trying to say they have it
all figured out because if you pretend to have it
all figured out, you'll close your mind to
any future possibilities, for
example, future techniques.
Anyway, there will be timestamps
below for this video. So you might
want to skip this step
if you already know it. But otherwise,
we'll start from step one here,
which is assisted because step zero
basically doesn't use any
coding agent or AI model at
all. Now, I will
quickly mention that I have been covering
level three and level four topics
within my
aseptic coding skills classes for some
time. And in the coming weeks and
months, I plan to increase the
amount of content I have in the
classes on level three and level
four. Most of the other classes you
find online these days
, like more than 90% of them,
are still stuck covering level
one with no intention of moving up the
ladder here. Well, if you want to
stay ahead of the curve, my classes
might be useful to you. And since I
'm updating them regularly,
almost daily, I've added 41
new lessons over the last 30 days.
I think a subscription model
will be better for classes going
forward. Therefore, I'm going to change it to
an exclusive subscription instead of
a one-time purchase. If you want to make
that one-time purchase right now,
then now is the time to do it
. Otherwise, in a couple of weeks
, it will just be a subscription. And if it
turns out there's a level five
that we discover together, then
I'll start making videos about that
topic too. Well, anyway, we have
step one here, which is an engineer,
an agent, primarily supervised
as fast-pair programmers.
And this specifically involves
being at the terminal, one agent at a
time, and then giving instructions like this
: "Can you add this to the new
voice call mode?" pressing Enter. And you may
use certain
skills to interview yourself, create
specifications and tickets, and then
proceed to implement it. You
're also approving permissions manually and
basically just babysitting
one agent throughout the entire
task lifecycle. Now, this is something
that I would say 80 to
90% of people do, and sometimes they
like to pause this by using another
version of the code in the cloud that
runs in parallel, and usually
to do this they would use a
Claude working tree, for example. So they would do
claw-w for the
working tree and then do something like grock
4.5. Here, I can say, "Add gro
4.5 to the model selector," and then
people would start more sessions
in parallel, and they could have like
four or five sessions on the screen,
jumping between each one,
giving them directions, and then testing
the feature once it's completed. And they
basically think they've reached the
highest level, but unfortunately,
this is still level one because
we still need a
self-checking loop we can
rely on, as well as some kind
of code review. So
basically, for this
self-checking loop, we want Claw to be able to
check his own work before we
bother looking at the
changes he's made. And we also
want to activate automatic mode; You
just need to press Shift + Tab
until you have automatic mode
activated below. So, to
simplify, I'm going back to a session
, which is adding Grock 4.5 as a model.
And we can see that these changes have been
implemented, but we're still stuck
at level one because Claude hasn't
really gone through the
verification phase of all the changes from
start to finish. So, by
default, we had some
unit tests. So he ran a
unit test, but he didn't actually
check if this appears in the
user interface, and that's because,
firstly, we haven't told
Claude to do it, and secondly, we have
n't provided the
infrastructure for Claude to do it
. So in this case,
you would even have to install
Claude's Chrome extension, basically by going and
installing it from the Chrome Web Store
, or maybe you want to install something
like Playright by going to /plugins and then
searching for Playright and installing it.
But in my case, I already have it installed right
here. So, normally
at the end, we want to say something like, hey
, can you open Playright and log
in and verify that this appears in
the user interface? And since this
will be a very noisy tool call
, we want to delegate this to a
sub-agent. Therefore, I'm going to say
that you should use an OP sub-agent to do
this basically. And one additional thing
I like to say is that I basically
make a recording for myself because I
just want to watch the recordings. Okay.
Can you tell him to make a
recording for me that I can watch later
? Now, the cloned code
added a /verify ability a
couple of weeks ago, which is quite
interesting. And I previously made a video
about this in my
class. And, in essence, the ability, what it
does is verify a change on the
surface on which it interacts with the
user, whether this user is human or
programmatic. In our
particular case, we're verifying a
sticky change, which means
pixels, and that means I should
use PlayRight to basically
record it and take a
screenshot to make sure it
works. But, for example, if the
change occurred on some kind of
server or API endpoint,
it would try to send a request and
capture the response. If you change
any type of agent, I would verify it
by running the agent. However, where
most people go wrong is
that they generally don't have the
agent check for its own changes and
then make corrections based on
what it finds. First of all, they don't
tell him something like, "Hey, you should
verify your changes using something like
the slashverify ability." And to
do this you can simply add something to
your claw.MD file like, when
verifying any changes, use the
/verify ability within a subagent
. And then he'll go ahead and
verify those changes every time he
finishes implementing something. And then
you can add extra things here,
like using a copyright MCP
for sticky changes. And once
the verification is complete, send me
a recording on Slack using the
MCP server. Now, another
important point is that, depending on your project, you may
want to configure
additional things so that the agent can
perform an internal check. For
example, in the previous task we
gave you to add GPT RealTime 2.1,
we cannot perform the
internal verification locally because,
firstly, we do not have LiveKit installed.
So, I need to tell him: "Hey,
can you install LiveKit
locally on my machine using the CLI?" And then I
would also have to give him the
relevant API keys that he can also use
locally. And a good way to
find out what you need is
basically to do slashverify and then
say, "Can you tell me what you need
from me to verify this change from
start to finish and verify any
additional changes in this part of the
project from start to finish?" And
we can see that our
previous end-to-end verification has passed
within a subagent. And when I
click here, it basically has a
little image here to show me
something like "hey, gro 4.5 now
appears in the dropdown menu." Now
, of course, he didn't send a
test message to make sure it works
because I didn't give him an API key.
Therefore, you will find that much of
your final verification may be
limited in some way because you haven't
given it the correct API keys, the
right tools. Basically, you have
n't given it the right environments.
And we can see here that it basically
says: "Well, you need to have the
Live Kit CLI disabled." You must choose an
audio strategy to verify
end-to-end voice, as the
browser cannot speak. So, either
we would need a
fake microphone or I would just go ahead and speak instead
. So, I'm going to choose the
fake microphone option. And it's like:
"Okay, maybe you want to set
a limit on how many
credit tokens we use for
test calls." And we would also need a
Slack channel to basically send
the verification recording. And I believe
that the verification recording in
this case would not be a
screenshot, but an MP3 recording
to show that the voice agent
works as intended. For
example, when I went to the recent
Code with Claude conference in Tokyo,
I was able to chat with many
Enthropic employees. And one thing that
one of the Enthropic employees mentioned to me at the
event was that, basically, the
Claw desktop application
runs in a cloud container,
a Windows machine in the cloud where
the cloud can use the computer to
verify that any changes to the
desktop application
actually work, and then it would simply
send a recording to the
Neopropic employee. So yes, often the
reason the verification
isn't complete is that you haven't set up
the right environment, and you should
brainstorm with your agent about
how you can do that. And one thing
you're probably thinking when you see
this is something like: "Well, if the
models are so good, why do
we have to verify their changes?
Why can't they be correct the
first time?" And while it's true that the
models are improving, it also
means they are more likely to
cheat. For example, on the
Fable 5 system card on
page 133, they basically mention that
for the objective defined above,
Fable 5 basically lied as a
negotiation tactic. And Fable 5 was
the only model in their
test suite that also initiated
price collusion. So, while
the models are getting
smarter, they're also
getting more cunning when it comes
to pretending they've been implemented
correctly. And that's why
we need some kind of
verification in a new subagent that
has an isolated context window
to verify that the changes have been
completed because if they haven't been
completed successfully, then it can
tell the original model to
cheat, that this hasn't been done
correctly. Can I do it
correctly? Okay. So now
we have Claw checking its own
work before we see it and with
automatic mode active, but
we also need a security
or code review. Therefore, these
exist within the code in the cloud.
There is the ability to perform
A/SE security review and there is also
code review. This is by
far the best code review skill I
've ever encountered. And I think it
works better than all the
automated code review tools like CodeRabbit or
Reptile, for example. Therefore,
I highly recommend running it
as well. Basically, I can say, "
Okay, medium code review" to a
new child agent. And to
make sure this happens every time,
I need to add this to my MD file in the
cloud. Therefore, let's say
quickly before verifying the
changes: can you run the
skill's code review on
medium setting if it's a
small change of less than 100 lines and on
high setting if it's a change
larger than that? And we should say, "
Do this in a secondary agent." And
now, at the beginning, we can also
add that when implementing what the
user requested, you can also
do it within a secondary agent.
This is step one here. This is
step two here. This is step three,
3.1 and then also 3.2. And now
you can see that our
main session behaves like an
orchestrator that doesn't actually do
any of the work, but does it all
within the subagent. We have
sub-agents for
code review. We have others for
verification. Ideally, we should
also move our
compilation to subagents. So
let's add it at the beginning. When
you're compiling a function, use a
subagent for that. This is number
one here, number two here. And
we're going to add a nova step here, which
is number three. Pass any
medium or high severity issues from the
code review to another
build agent that would handle those
fixes. And then I'll say for
step number four, repeat step
number three up to three times. And now
I call this step five. So
check for changes. This is our
task lifecycle. Our
input is basically a
specification. Then, our
result will be a recording and an
open PR. And it seems we also
forgot to do the
security check. Can you run the
SLC code review on the
medium configuration and also reduce the
criteria review? And, of course, you may
want to change this according to
your needs. And you might notice
that, a couple of times when doing this, the
agent might do something wrong, in
which case you should update the
task lifecycle to account for it
. And you might not want to
repeat step number three up to three
times. You might want to reduce it
if it's a minor change, a
smaller function. Or you might notice that it
sends you a single recording if it's an
important function. Actually,
we want several. So you can say one
or several recordings if it's an
important function. Okay. Basically, we did
our code review and it gave us
a verdict here, which is a
plausible failure case for
price changes if it is above 200,000 tokens
. Perhaps we should take that into account
somehow. So, in this case, it wouldn't be
solved automatically
because it's plausible and not as a medium or
high issue. In which case, you might want to
add something like: "For any
plausible verdicts, please send me a
message on Slack, uh, once you've
opened the PR request
, explaining that
additional change and why it's important." And
now this is much better, because
our main session is now a
coordinator; He's not doing any of the
work, and everything else is happening in the
sub-agents. Therefore, the creation
is done in the sub-agents that
verify and make the corrections, and
that will be repeated a couple of times, and
then the verification as well.
Therefore, we don't have to
constantly restart the context window
to move to the next stage. Here,
everything happens within a sub-agent. And
one last thing I'd like to
add is that if any verification
uncovers problems, can you pass it on to
another sub-agent of the generator to
make the corrections and then repeat
step five again until you're
satisfied? Cap three times. If it fails
because you don't have the
correct settings, pause and notify the user
via Slack. And this
extra line here basically means
that it will constantly remind me that
we need this new feature to
set up a better
verification environment. And over time, our
verification environment will improve. For
example, for my application agent stack
here. If you want to
implement customer service agents
for your business, there will be a
link below. Take a
look or send me an email about it
. Basically, one thing we don't
have right now is
a good email verification environment
. So, if
I made changes to the email channel
here, I couldn't pretend
to be a user sending
emails back and forth to
verify that everything is working as
intended. Similarly, if
you were to add some kind of
Instagram channel and wanted to add an
entry verification here,
then you might have to grant access
to some kind of Instagram account
with a username and password. I
might have to give you access to the
browser database, as well as the
MCP server. I can pretend to log into
Instagram to send a message to
a test account. And the same goes
for Messenger. SMS. Basically, right now there are
many things missing from the
infrastructure to perform
end-to-end verification
properly. And it's worth investing
time upfront in developing
these verification environments for
your applications, because it means
you'll get even more benefits from
the agents as they improve, and
you'll be able to move even faster and you wo
n't be at the terminal
driving all these changes. Okay.
Now, at this stage, we can start
managing multiple agents and have them
work end-to-end across various
functions. You can do it with the
agent view simply by creating
cloud agents, for example, and then it will
load into this type of
agent view here, or you may simply
prefer to have horizontal and
vertical tabs using some kind of
tool like Semox or Conductor, for
example. There are many
different terminals that support this, or you might
want to use the
Claw desktop application. Basically,
we need a better interface for
managing multiple sessions. For example,
within the agent view, I can
add Kimmy for free. I will specify
another task and say that
administrators can customize a
photo of the sent email,
that is, the color and also the text. I
now have these two sessions
running in parallel. Or I would
spend my time working out new
specifications that I would pass on to another
session and then wait here in
Slack for these
changes to be applied and ideally I would see something like
this. For example, this is an
end-to-end verification that it's
doing for me. But in this
case, it's using Claw and Chrome's MCP
instead of Playright's. And
then he would also send me a
PR request. I would simply look at
the recording and the PR, and then say,
"Well, this seems fine to me, it's
correct." If not, I would leave
comments on the PR and ask the
agent to look for the comments
within the same change request
. Therefore, you may want to
add that to your agent as well, or,
after notifying the user,
monitor the RP for about 6 hours
with the monitoring tool. If
they leave any comments and you need to
correct them, or if they decide to merge them,
then you can end
the work session. And I'd like to
emphasize this: when you notice that you're doing
something manually, you should try to
automate it somehow by
adding it to your cloud-based MD.
Some of you may want to take
this out of your cloud MD and then
put it into some kind of skill you
can call task lifecycle
. This way, they can activate it
manually at the beginning of each session
. Now, of course, you can use
view agents in the terminal, the
calling desktop application, or
a bunch of other things. What I
personally like to do is use
Slack. Basically, I created my own
custom Slackbot that has
cloud-based code and codecs
running in the cloud. My Slackbot
is like my own
customized version of the Claw tag. I
call him Percy and basically say, "Hey
user, implement a
role skill that covers the entire
lifecycle of the task we just
talked about, along with a couple of other things,
to create conversation notes in
the agent stack repository."
This is a specification and you can
see that I reject it here. And 19 minutes
later, he opened a new PR and
is now conducting an
adversarial review. And then, Percy
continued to have problems because I'm
improving the harness around Percy.
Then I thought, "Okay, try
again." Blah, blah, blah. And then he did
another round of review. He found no
further findings. So basically he
stopped here and then gave me a
recording here. This is a gift he gave me
. Hey, this is what it looks like.
Basically, the user can add
a note in the bottom left
or right here and then it would be added to
this particular chat. This is a
recording that Percy made in the cloud
for me. And then, once I had reviewed
the recording, I manually said, "
Can you make it foldable in the sense
that it doesn't show up by
default?" Then you press
a button and then it makes another
recording that says, "Hey, this is what it looks like
now." And then I made an
additional change that I just pointed out to him and
then I said, "Okay, great,
let's merge this now." And then he
merged the change and oversaw it all the way to
production to basically make sure
everything was working properly.
Now, personally, I prefer this
type of system because some of these
tasks are quite long in the
sense that the
entire lifecycle of a task can take about
2 hours to complete and I may have to
pack up my computer and
things like that. Therefore, it's better if it
happens in the cloud. And I prefer this to the
Claw tag because then I can
use things like codecs. I can add
extra things like Live Kit CLI
Playright and a bunch of other things.
And, essentially, I can create my own
custom harness that runs
within the cloud. So here's my
custom harness for Percy.
Persie has a lot of skills.
One skill teaches you how to send
messages through Slack. One is
for verification. One is the
complete task lifecycle here. One is to
show him how he can use Codeex to
get a second opinion. And then
Percy basically does all of this in the
cloud. You can see that Percy did another
full demonstration here.
Basically, I added something
completely new so that
agent owners can
specify additional buttons, such as
view prices or give me more information.
Then he gave me a recording of something
like, "Hey, it works now. This is what it looks like
." And I was saying something like, "Hey, do
you want to merge this?", but it seems
Percy didn't send me a recording
of what it looks like to set this up.
Then I can send a
follow-up message and say something like, "Hey,
can you send me a recording of what it
looks like so I can set this up in the
agent settings?" And you can
see Percy react with an
eyes emoji and basically say, "Well, now
I'm working on this." And then
I can say something like, "Hey, can you
update this for next time?"
So you do it automatically and I don't have to
remind you again. So
, yes, this basically means
that for me, level two consists of
all my low
and medium difficulty tasks now being done through
Slack. And keep in mind that many other
organizations are doing
similar things to what I just showed you.
For example, we have Stripe's minions
, where a
Stripe engineer would simply say to a
Slack bot a message like, "Hey,
can you do this?" and it would follow a
very similar flow to mine. They have a
bit more built-in observational capability
in their own agent so
they can see exactly what tool
created it and things like that. And then
Shopify also has something very similar
, where they have their own agent called
River. And River is his own
AI agent who lives in his company's Slack.
It's basically their own version of
the Claw label. So many
companies are creating very
similar things. In fact, I have an
upcoming class at my agent coding school
that teaches you how to
create something very similar to what I just
showed you. So, if you want to
get it when that class is published,
there will be a link below. Okay.
Well, we're basically done with
level two here. Now we can
orchestrate many agents at once.
We can jump between them in the
agent view or via Slack. Claude
now reviews his own work, in
our case with Playright, performing
code reviews and
security scans. Automatic mode
is also running. We have an
automated code review and security review, where
we automatically fix
medium and high priority issues, and
now we are reviewing the
final differences and screen recordings.
So now, since it means that each
unit of time we have
we can now do more work, our
backlog is starting to
shrink. So now
we're basically just reviewing the results.
We reviewed the recordings and also
the open PR requests. And we may be
doing a little bit of
direction, as I just did by
asking him to send me another
follow-up screen recording.
And you might be doing it on the
cloud desktop, in the terminal,
in the cloud label, or in your
own version of the
cloud label somehow, or in the CLI, or
remotely, or something like that. There are many
ways to do it, but personally
I think many people will switch to
some variation of the
cloud label. Okay, now we're going to go up one
more level, from level two to level three
, where we have
supervised autonomy. So at this stage, we
basically have Claude
proactively doing the work you would have previously had to
start manually
, and maintenance and cleaning are
performed automatically and
continuously in the background. And one of the
biggest bottlenecks
here would be trust in your loop.
Therefore, the task lifecycle
that we just defined earlier, we want to
run it ourselves a couple of
times manually to make sure it
works well, and we are
editing and refining it so that cla can
reliably complete a task on its
own for that
particular project. And we need to do a couple
of things here to make that possible
. We need to give it a way to
extract its own context. Of
course, Claude can already read the
codebase, but we need to give him
access to any wikis or discussions that are taking
place. In practice, what
that would mean is that if your wiki
is Notion, for example,
you would basically have to go to claw.ai and then go to
your organization or your account. Here
I am in the organization view and
then add a new connector for
Notion, for example, and then you have to
remind it that this actually exists and
then you would add something like this to the
cla file. So you can say something
like when you explore in a sub-aent
look at the Notion product wiki
through the MCP. We have a lot of
information about upcoming
functions there. If you find a
contradiction between what
the user has told you and Notion, ask for
clarification before continuing. And this
basically gives Claude a way
to gain additional context so he
can make better-informed decisions
and function autonomously
for longer. So we have
agency speed and
code review. Agents can access
code owned by other teams.
Basically, this means things like,
if you're on a team, does your team
have permission to change code
that's owned by another team?
Therefore, it would require some kind of
negotiation between teams, and even if it
involved code that is owned by another
team, you would need to do some kind of
inter-team public relations review
. Therefore, I will not go into
further detail about this. Basically,
you can ask an agent to help you
with that because this is an
organizational issue. Now we need to divide
your work into loops and routines. A
very simple example of this is that you should
consider what work I am doing
on a regular basis. For example, one of
your engineers can go to Planet Scale
regularly and then review the
most expensive queries and then
pass them on to an agent and say, "Hey
, can we make some quick profits
here?" Can we optimize this in
any way? Instead, you should
set this up in a loop.
Therefore, you can go to Claude Code, the
web version, for example, go to
connectors and then add the
Planet Scale connector. You can search for it because
I think it already exists in the
exploration connectors, but I already have it
installed and you can have it extract
that data periodically and make
those changes by going to routines and
configuring a routine there. As
you can see, I have a routine here,
weekly query optimization on a
planetary scale, that has been
running and basically has a
lot of strict constraints, and it
runs periodically. Another
example is that you can have something like
session repetition settings with Post Hog or Microsoft
Clarity. And one of the advantages is that they
detect friction. They detect
dead ends and clicks of
fury for you. In which case, we can set up
another loop that runs
periodically, in which it extracts data from
Post Hog and then automatically redesigns the website
to address that
friction. And by doing this,
you also allow Claude to extract
additional context. You can see in those two
examples that we basically divide
our work into loops and routines. And
something I did that I quite like
is that I set up another loop here
where I gave it access to literally everything.
It has about 30 or 40 connectors for
Gmail and Stripe. And then I said, "Okay,
can you give me five
daily recommendations of things we can do to
boost this business?" And then, one
of the examples I gave here is sending
lesson diagrams as
downloadable resources. Then one of the
agents automatically responded to
a user for me and basically said,
"Hey, we should probably do
this." And then, one of the good things I
can do is, for example, if I
like number four, I can
reply to this, tag Percy, and
say, "Hey, can we implement
number four? Give me some
suggestions on what it could look like.
Also, send me some
HTML artifacts via Slack. I'll choose the one I
like, and then I'll give you access to my
Excaliraw account, and then you can
fill in all the videos in this case
." And this is one of the really
great things about Slack because I receive all the
reports through Slack and then
I can tag the agent to take
care of that particular task for
me through Slack. However, one
of the most difficult challenges here is
identifying new loops and routines.
Therefore, what I personally do
is have Codeex set up and always
running on my machine, and
then, within what I believe is
customization here. I have something
called Chronicle Investigation Preview
enabled and it takes a
screenshot of my screen every
minute or so. And then I have a
loop set up here called Search
Loops. And basically it gives me
recommendations every day for
the loops I can generate.
Therefore, the loop might detect something
like: "Hey, Ry checks
LinkedIn direct messages every day for
feedback on any
of the features that have
recently been released. Why don't we
turn that into a loop where
I automatically load
LinkedIn direct messages and generate
HTML artifacts of what
that new feature would look like in the
existing app, and then tell him via
Slack: 'Hey, this is a
brand new feature.'" This is what it would
look like." And if he likes it, he can
tag Percy, and then Percy
can start working on it. Here's what they
mean here. Tag
Claw, have him monitor a channel or
data source, and have him proactively initiate tasks
. So, I won't
show the feedback channels.
But basically, I can create a
new channel here in Percy Test and
call it X feedback, and then I could
connect it to the X API and then have
a scheduled task that runs
periodically, looking for any
mentions of my products and then
automatically reporting them to me here. It can
suggest some responses I
can give a user, and then
I could make a rough draft of
that particular change or feature.
I can do a quick approval, and
then Percy will develop it. And when it comes
to proactively initiating tasks
, I might have to define
some kind of vision for the product
because I don't want to implement every single thing
every user mentions. If it aligns
with the vision, then I don't mind it being
implemented automatically.
But if it doesn't align with the vision,
then I would need some kind of
approval stage. And the stage
Approval could be as simple as
Percy saying something like, "Hey,
can you give a thumbs
up?" "If you react with a thumbs
up, then I'll start
implementing it. If not, then I'll
basically ignore it. And finally
, they say, 'Let Claude initiate
Claude.' So, if I go back to Slack,
you can see that it says 'Sent using
Claude.' 'Sent using Claude.' 'Sent
using Claude.' So, Claude
is actually telling Percy what to
do. And then, if I
scroll back up, like in this
thread, Claude automatically replies
to Percy for me. So it's not me
doing it most of the time
. Claude automatically tells
Percy what to do next.
Now, regarding this
interesting part about letting Claude
initiate Claude, what I can do in
my setup here is basically
that in this new channel, I can tag
Percy and then have Percy as the
coordinator for other Percys.
So, I could give him a heads-up like this: '
Can you upload all the issues
to Sentry that affect more than 10
users and then send a message to...'"
Hyposter P's Slack channel, the
demo one? Well, this is a
demo I'm doing for
this video. Tag Percy
specifying the problem. Tell Percy
to first verify that the bug
exists. Then, go ahead and open a
PR request for that
specific problem. Each instance should be a
new Percy. If Percy gets stuck,
help me unstick him and continue
until all the PRs are open.
If you can't help Percy
unstick, send me a
notification on my phone
saying, "Hey, Percy is stuck on
this, I can't help it." And I'm going to
do a 10-minute loop. And I'll tell it to
repeat every 10 minutes until
all the PRs are
open. So now I press Enter
to add Percy to the channel. We have
one instance of Percy monitoring
other instances of Percy and launching
more work. This means I
basically initiated a large part of the
work. Okay. So, after I
sent that message, Percy triggered other
instances of Percy within the channel.
You can see there are a couple here. I think there
are like 10 or something. And
essentially, for each instance of
Percy, it resolved the issue at
hand and then monitored it until it was
completed. I don't know why Percy
started generating this randomly.
So maybe I'll have to look into that
later. But it looks like
the issue was resolved with a pull request. It
says here that it doesn't have the
Xcode or Swift toolchain. So
I'll have to try and fix that for
Percy. And then it fixed this issue
here. And you can see that the
main Percy session that triggered all
the other Percy instances
was pushing them until they were
completed by answering any
questions they had. But yeah, I think
before we do the next batch,
it's pretty important to look at this
because I don't know why Percy is
trying to do something like this. But right
now you can see here that it's been
running for about 40
minutes and doing a
Codex review of the changes it made. And now
you can see that we're getting close to
level four, where we have
massive amounts of automation for tasks
specific. So, in this case, we
have it for
bug fixing, which is the easiest. But
you could also have it for
feature creation, where
user request data would be loaded, or for handling feedback
to address confusing features.
Basically, you have a set
of domain-specific tasks, like
bug fixes, executed in
the Android cloud. He says the loop
is fully closed and that Claude
starts most of the sessions. At
this stage, you might have
hundreds or thousands of agents
running automatically every day
. I think when Boris
talks about agents, he also includes
subagents, in which case you might
have many agents per session, and you
stay on by intent and
monitor by exception. For example,
I might create a new channel and call it "
Hyper Whisper Bug Demo
." Basically, I have some
kind of automation within this
channel that feeds a constant stream
of bugs here, and then Percy
monitors the channel and
automatically deals with each issue that
comes in. Basically, I just have one
live stream or job
coming in, and Percy would tag me only
when he needs to be There. Percy would
tag me and say, "Hey, I'm
stuck on this." I don't have the
correct API key. This API key has
expired. "These credentials are missing."
And then it basically just notifies me
about exceptions that are
blocking the work I should
be doing. Now, this is the
most ambitious version, and it can be
quite difficult to get there. And I think
one component of this is that the
models have to be more reliable and
even better than Fable 5, which is why
Boris said he personally just
reached level 4. And it's
quite likely they're using an
even better model than Fable 5
internally. And depending on the type of
work you're doing, you might
find that this can work in
some cases. For example, it works
very well for routine bug fixing
, but it might not
work well for
feature creation because the models don't
really have a knack for identifying which
features are worth creating and which are
n't. So, you might have to
provide it with an insight into your
product, and even then, it might not
be that good. Again, you can see
that the cloud tag is mentioned here at the final level
. Percy is my
own version of a claw tag that
automatically responds to
posts in a specific channel,
triggering Then on most
similar channels. So yes, there was a
lot of information in this video, and
hopefully, this is starting to make more
sense. Since the video was
getting quite long, I skipped over a
lot of things that I'll cover in much
more detail in my
Agent Coding School in future
lessons because most of my
future lessons will be about
setting up an effective Level
4 system, which Boris talked about here. I
've already covered about 70-80% of
these ideas so far in the lessons I've
recorded. But there's still about
20% that isn't available right now
.
