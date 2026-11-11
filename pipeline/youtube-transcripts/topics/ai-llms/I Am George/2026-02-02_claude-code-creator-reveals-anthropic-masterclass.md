---
video_id: "yANt4NysZw4"
title: "Claude Code Creator Reveals Anthropic MASTERCLASS"
channel: "I Am George"
topic: "ai-llms"
published_date: "2026-02-02"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=yANt4NysZw4"
duration: 616
word_count: 1698
---
The creator of Claude code just released
a master class lesson on the best ways
how to use Claude code. And I believe
that just implementing a few of these
tips can 10x the speed and quality of
your Claude code. So, on his Twitter,
Boris just posted a master thread
detailing everything that you need to
implement into your workflow if you want
Claude code to actually work a way
better. So, the number one tip here is
to do more in parallel. What does that
mean? It's basically saying that you
need to do multiple things at the same
time. If you're only using Claude code
in one instance, you're basically losing
efficiency. So, how do you fix this?
Spin up from three to five Git work
trees at once, each running its own
Claude session in parallel. It's the
single biggest productivity unlock and a
top tip from the team. Personally, I use
multiple Git checkouts, but most of the
Claude code team prefers work trees.
It's the reason that Boris code built
native support for them into the Claude
desktop app. So, some people also name
their work trees and set up shell
aliases, so they can hoop between them
in one keystroke. Others have a
dedicated analysis work tree that's only
for reading logs and running big query.
The second tip it says, "Start every
complex task in plan mode. Pour your
energy into plan, so Claude can one-shot
the implementation." So, one person has
one Claude to write the plan. Then, they
spin up a second Claude to review it as
a staff engineer. Another says that the
moment something goes sideways, they
switch back to plan mode and replan.
Don't keep pushing. They also explicitly
tell Claude to enter plan mode for
verification steps, not just for the
build. So, what is happening here
actually? So, you need to think of as
Claude code not as just a single agent
or like a single worker working on your
code. What you actually need to do is
think of it as a massive dev team. And
the entire dev team needs to work
together to create your app, your
website, whatever you actually want for
yourself to create it, it can do it. But
don't But don't think as it's just a
straightforward thing. Think of it as a
massive dev team working on your
project. So, just have somebody who's
actually working on the code. Then you
make a Claude instance and actually just
going to do the design. So, if you make
different Claude instances, then what's
going to happen is that they're going to
have their own job. Like an entire
person just having one single job. And
then them interacting with each other is
going to make the synergy to make the
best code possible and optimize
everything so it just looks and feels
perfect. Number three here, invest into
Claude .md. After every correction and
with update your Claude.mds, so you
don't make that mistake again. So,
Claude is eerily good at writing rules
for itself. Ruthlessly edit your
Claude.md over time. Keep iterating
until Claude's mistake rate measurably
drops. One engineer tells Claude to
maintain a note directory for every task
project updated after every PR. Then
they point Claude.md at it. Very, very
massive again tip here. Number four,
create your own skills and commit them
to get. Reuse across every project. So,
tips from the team. If you do something
more than once a day, turn it into a
skill or a command. Build a tech debt
{slash} command and run it at the end of
every session to find and kill duplicate
code. This is for optimizing your code
again cuz if you have duplicate code,
there's no reason for it to be there.
So, set up a slash command that syncs 7
days of Slack, G Drive, Asana, and
GitHub into one context dump. Build
analytics engineer-style agents that
write DBT models, review code, and test
change in dev. You can actually check
out this whole post for yourself, so if
you are interested for more info. Number
five is Claude fixes most bugs by
itself. Here's how to do it. So, this is
if you want to fix all of the code bugs
you're having with Claude, you need to
follow the step here. So, it says,
"Enable the Slack MCP, then paste the
Slack bug thread into Claude and just
say fix. Zero context switching
required. Or just say go fix the failing
CLs test. Don't micromanage how. Point
Claude at Docker logs to troubleshoot
distributed systems. It's surprisingly
capable at this. This is very, very
interesting. This is like a simple way
to actually fix all the bugs you have in
the code. So, number six here is level
up your prompting. Challenge Claude.
Say, "Drill me on these changes and
don't make a PR until I pass your test."
So, make Claude be your reviewer. Or
say, "Prove to me this works." And have
Claude different behavior between main
and your feature branch. Number two
here, after a mediocre fix, say,
"Knowing everything you know now, scrap
this and implement the elegant
solution." So, when you do see the
Claude that makes something mediocre,
you just tell it to scrap the whole
thing, make it again, use the knowledge
from this failure to make something
better. And number three here, write
detailed spaces, write detailed specs,
and reduce ambiguity before handing off
work. The more specific you are, the
better the output. So, you need to
specify what you truly want. To help
that, you can use any other chatbot and
just ask it to make things more specific
and just copy that into Claude, and
that's it. You can even do that in
Claude for yourself if you want so.
Number seven, your terminal and
environment setup. So, number seven,
terminal and environment setup. The team
loves Ghosty. So, multiple people like
it cuz synchronized rendering, 24-bit
color, and proper Unicode support. For
easier Claude juggling, use status line
to customize your status bar to always
show context usage and current Git
branch. Many of us also color code and
name our terminal tabs, sometimes using
tmux. One tab per task work tree. Use
voice deduction. You speak three times
faster than you type, and your prompts
get way more detailed as a result. So,
if you're using Claude every single day,
instead of just typing everything, you
want to speak it for two reasons. If you
speak it, you're going to speak it way
way way way faster. You can give way
more context, and Claude will understand
you better. The second thing is, Claude
wants to learn about you. It wants to
learn about you as a person, and when it
does learn about you more and more,
they're really going to know what you
want from them, what you need from them,
and how you would do something, and it's
incredible. It's absolutely incredible.
So, number eight, use sub agents. So,
append use sub agents to any request
where you want Claude to throw more
compute at the problem. If you want to
have more computing power added to a
specific task, then you use sub agent,
and that's it. It's very simple. Offload
individual tasks to sub agents to keep
your main agent's context window clean
and focused. And the third one here it
says route permissions requests to Opus
4.5 via a hook. Let it scan for attacks
that auto approve the safe ones. You can
check out the code here in the hooks for
yourself. Number nine. So, use Claude
for use Claude for data and analytics.
So, ask Claude code to use the BQ CLI to
pull and analyze metrics on the fly. We
have a big query still checked into the
code base and everyone on the team use
it for analytics and queries directly in
Claude code. Personally, I haven't
written a lot of SQL in six plus months.
You don't need SQL knowledge anymore
because Claude knows everything. This
works for any database that has a CLI or
MCP or API. Amazing. Absolutely amazing.
Number 10 here, learning with Claude. A
few things from the team to use Claude
code for learning. So, enable the
explanatory or learning output style in
/config to have Claude explain the why
behind its changes. That's very
interesting. This is very cool. Have
Claude generate a visual HTML
presentation explaining unfamiliar code.
It makes surprisingly good slides. Okay,
so if you want to visualize the problems
and the changes, you can actually just
make an HTML and just check it out for
yourself. Ask Claude to draw a diagram
of new particles and code bases to help
you understand them. This is awesome.
Build a space repetition learning skill.
You explain your understanding, Claude
asks follow-ups to fill gaps and stores
the results. You can basically make code
with Claude and learn about the code at
the same time. So, the more you learn,
the more detailed questions or tasks you
can give to Claude and then Claude can
ask you back about those questions and
about your task and then you can learn
to optimize even more. So, it's a loop
of optimization where you get better,
Claude gets better, and you make better
stuff.
That's the insane part. You don't need
anybody anymore. [laughter] You just
need to talk to Claude
all the time and just create stuff. As
you improve your skill of using Claude,
then Claude will give you better
outputs. It's It's pretty simple and it
can create incredible stuff. So,
hopefully everybody you did enjoy this
video. Don't forget to smash the like
button and subscribe and I'm going to
see you guys in the next video.
