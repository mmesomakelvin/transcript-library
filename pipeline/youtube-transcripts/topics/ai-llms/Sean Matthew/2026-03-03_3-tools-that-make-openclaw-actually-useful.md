---
video_id: "QvfqAMUJTT4"
title: "3 Tools That Make OpenClaw Actually Useful"
channel: "Sean Matthew"
topic: "ai-llms"
published_date: "2026-03-03"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=QvfqAMUJTT4"
duration: 836
word_count: 3147
---
If you've just installed Openclaw and it
feels kind of limited, or if you've been
experimenting with it for a while and
you've just hit a wall, let me tell you
something. Out of the box, Openclaw
actually doesn't have its own email. It
can't remember what you did last week,
and it can't reliably browse the web.
Today, I'm going to show you three tools
that completely change that. And I
promise you, by the end of this video,
you will have a completely different
Openclaw working for you. So, let's dive
in. So, if you caught my last video, I
set up a Mac mini M4 running Openclaw as
my 24/7 AI personal agent. It's got
access to Telegram, my calendar, task
manager, my Obsidian vault. But, one
thing I didn't get into was that even
after hooking up all those really cool
skills, there were three big pieces
missing from that setup. Today, I'm
going to show you how to fill in those
gaps. So, here's what we're hooking up.
Number one, we're going to give our
agent its own dedicated email. Number
two, we're going to give the agent a
reliable memory backbone, so that it
actually remembers the things that you
do and the things that you work on. And
number three, we're going to give the
agent its own browser. A better browser
that's built specifically for agents, so
that it can browse the web faster and
smarter through the command line. Each
one of these only takes a few minutes to
set up. It's really pretty easy, but the
payoff, I promise you, from putting all
these together is huge. Number one is
Agent Mail. This is a really cool
startup that's backed by Y Combinator,
and they've done something really
interesting. They've created an email
client that's built specifically for AI
agents. So, you don't have to worry
about setting up a Gmail account, and
then having Google ban you because
you're using an agent to actually
control that inbox. This is designed
specifically for use with AI agents.
It's a way for agents to send and
receive emails programmatically through
code. Setting this up is really
straightforward. Just go to agentmail.to
and click on get started, and it will
navigate here, where you can just create
an account. You can sign up with Google,
and it's really easy. It's free. There
are paid plans, but there's a very
generous free tier. Now, once you do
that, you'll follow a really simple
onboarding process to create your first
inbox. You get three inboxes free with
the free plan. You can name it whatever
you want. It will be whatever your name
is @agentmail.to.
And that's where OpenClaw will access
emails that you send and receive to
Agent Mail. Once you've got your email
inbox configured, you're going to want
to write down the name of that inbox,
and you're going to want to grab an API
key from this part of the Agent Mail
dashboard. Go ahead and copy that API
key, and then we're going to go into
Claude Code and give some commands to
set all of this up. Okay, now once you
have that, we're going to open up a
terminal window, and we're going to
paste this command right here. And I'll
put this in the show notes. So, whatever
computer you have Claude Code running,
this command will navigate to the folder
where OpenClaw is installed. And as I
mentioned before, we're going to be
using Claude Code to implement all of
these skills and tools. And you might be
wondering, why not just use OpenClaw to
do this? OpenClaw can improve itself. It
can install its own skills. As you may
know, Anthropic has cracked down on
people using their Claude subscriptions
with OpenClaw. Basically, forcing people
to use API keys. So, in almost all
cases, you're not going to be using your
monthly subscription to run OpenClaw.
You're going to be using API keys, which
costs money, whether you're using
OpenAI, Anthropic, OpenRouter, whatever,
to run OpenClaw. That's why I like to
use Claude Code in the background as the
engineer to build all the systems and
tools that ultimately power OpenClaw.
So, when OpenClaw is running, burning
through a bunch of tokens to build
things. It's executing systems that have
been built precisely with Claude Code,
Codex, and other agents. So, with that
note aside about why we're using Claude
Code in the background for all of this,
let's talk about how we add skills to
OpenClaw. You can do it in two ways. So,
you can do it manually, basically teach
OpenClaw how to use a certain skill. And
every skill is built into a skill.md
file, and you can use Claude Code to
build that out, put all the required
language in there to show OpenClaw how
to use a skill. And then there's option
number two, which is ClawHub. Now,
ClawHub is basically a repository of
skills that you can hook up to OpenClaw.
Some of these come from the actual
creator of OpenClaw himself. Some of
these are official skills from the
people that actually write the tools
that it's connecting to, like Slack and
things like that. And then some of them
are just open-source tools created by
users. Now, a word of warning here,
there have been reports of malware being
deployed on this site. So, exercise
caution whenever you download a skill
from ClawHub. But we're going to be
installing the Agent Mail skill from
ClawHub. And this one comes from the
actual creator of Agent Mail himself.
And what this skill does is it basically
sets up some scripts that your OpenClaw
can use to interact with Agent Mail to
send email, check your inbox, and set up
webhooks. Now, in order to use ClawHub,
you have to install ClawHub on your
OpenClaw machine, and that is done
through a simple npm command. I'll put
this in the show notes, but it's right
here. You just copy and paste that,
press enter in your terminal, and then
you can use and download any skill from
ClawHub. But the good news is we don't
have to run any more commands. We're
simply going to feed a prompt to our
Claude code. So, this is the exact
prompt that I'm going to put in the show
notes so that you can run to install the
Agent Mail skill. It basically tells
Claude code to look at the Agent Mail
documentation in ClawHub, install and
download the ClawHub skill, and it will
prompt you to give it the API key and
the Agent inbox name that we saved
earlier. Once you do that, your OpenClaw
is officially hooked up to Agent Mail,
and we can test it out. So, what I've
done here is I've actually forwarded an
email that I got in my personal email to
my Agent Mail inbox. And this is just a
newsletter about actually how to set up
your first AI agent in OpenClaw. And so,
OpenClaw is going to see that in Agent
Mail, and it's going to prompt me in
Telegram. And now, as you can see, it's
showing up in my Telegram, alerting me
that this just got dropped in my Agent
Mail inbox. And now, I'm going to ask it
just basically, "Give me the main
takeaways from this email." And you can
see it comes back with a really nice
summary of all the key takeaways from
that email. So, there are a ton of
possibilities you can build with Agent
Mail. Obviously, this is a really simple
personal use case. I'm forwarding
invoices and newsletters and other
things that I get in my day-to-day life
to Jarvis, to my open claw, and it's
coming back and giving me actions,
summaries, other things based on those.
But, you could build this into your
business. You could have a support inbox
where Agent Mail is acting as a first
line of defense to field any user
inquiries, any user bugs, things like
that people are reporting about your
products. The possibilities are really
endless. Okay, tool number two, and
honestly, this might be the biggest
single upgrade that you can make to your
open claw. So, let me explain the
problem first. So, right out of the box,
open claw has a memory system. When you
interact with it, it creates markdown
files that it stores in a local SQLite
database. And anytime you want to ask
about previous work, previous sessions
you've run with open claw, it uses a
keyword-based search to search through
those memories. Now, the problem with
that is if you're asking about, "Hey,
what did we do with XYZ last week?" And
the actual conversation didn't use the
words XYZ, the keyword search is going
to fail. So, it can easily forget things
that you've worked on. And it gets worse
the more context your agent accumulates.
So, the more you interact with open claw
and the more memories you store, the
more bloated your queries get when
you're asking about the history. The
more tokens you burn and it costs a lot
of money. But, luckily, there is a
solution. This is where QMD comes in.
So, QMD is an open-source tool built by
Toby Lutke, who is the CEO of Shopify.
It's a local hybrid search engine for
markdown files. It combines three
different search strategies. So, it is
using a keyword search, but it's also
layering on top of that a vector search
as well as an LLM-powered re-ranker to
give you the best possible results. Now,
you don't need to worry about the
technical details. All you need to know
is that this is a much better way to
interact with and search your memories
in open claw. And the best part about
all this is because it's open-source,
you don't have to pay for this, There
are no API keys. It's all running
locally on your machine. Even the actual
AI part of it, the LLMs I mentioned,
these are local models and they're
really small. They don't take up a lot
of space on your computer. So, it's
super efficient. So, how do you set this
up with Open Claw? So, there's a very
detailed guide actually in the Open Claw
docs. But, the best part is you don't
have to read any of this. You can just
prompt Claw code to build it for you.
So, go ahead and open a terminal window,
open Claw code, and paste this prompt
in. I'll put this in the show notes, so
no need to read it right here. But,
basically, we're just asking Claw code
to read the documentation we just showed
and to set up the QMD skill so that you
can use it going forward. And once you
do that, that's it. You'll have QMD
installed and you can start seeing the
benefits right away. I'd say this is one
upgrade that is absolutely
non-negotiable. All right, the third and
final tool is Agent Browser. Now, Agent
Browser is a command line tool built by
Vercel that allows your agent to browse
the web. Now, this is not just simply
pulling HTML and scraping HTML. This is
actually interacting with a browser like
a user would, i.e. clicking on stuff,
taking screenshots, filling out forms.
Now, you might be thinking, "Why not
just use Playwright or whatever browser
that Open Claw has built in?" Now,
Playwright is just fine. But, if you've
ever used it before, you probably have
seen how it is so token inefficient.
Now, what that means is every time
Playwright is interacting with a
website, it is generating a ton of
information. And if your AI agent is
hooked up to Playwright, it has to
process all that information, which
fills up your context window and gives
you ultimately a worse outcome. Agent
Browser takes a completely different
approach. Now, we don't have to get into
the technical details of the how and
why. But, basically, what you need to
know is everything that Playwright can
do, Agent Browser can do it with 93%
less tokens used. That means that your
agent can do a lot more for a lot less.
So, in order to get access to Agent
Browser and to use it, you need to
install agent browser locally. So, on
your open claw machine, just run this
command. I'll put this in the show
notes. Uh and once you do that, you will
have agent browser ready. But, there's
one more thing we need to do. The next
thing you're going to want to do is open
up Claude Code and paste in this prompt.
Again, this is going to be in the show
notes for you to copy and paste into
your own open claw instance. But, what
this is basically doing is it's taking
the skills that Vercel has published for
agent browser, it's pulling them from
GitHub onto your open claw machine, and
it's telling your open claw how to use
them and how to run agent browser. And
it's also telling it that anytime that
open claw needs to interact with the
internet or browse a webpage, it should
use agent browser. Once you do that, you
will have the agent browser skills on
your local machine, which you can use
with open claw or any AI agent that you
have on there, including Codex and
Claude Code. I'm going to show you a
simple command that we can use in Claude
Code through agent browser. You can do
the same thing through your open claw
instance. Because mine is running on a
different machine, my Mac mini, I just
can't showcase what's happening locally
on that machine here. All that stuff is
happening in the background. I'll just
show you right now how agent browser
works. Okay, so I'm going to ask Claude
Code to use the agent browser skill,
navigate to Hacker News, and tell me
what's trending today. Okay, and you can
see it's actually open Hacker News,
news.ycombinator.com,
through the command line. It's taking a
snapshot or screenshot of that webpage,
and then it's closing the browser. And
here you go, it gives me all of the
trending topics for today in a nice
little chart here. So, it's distilled
all that information from just searching
the website through the command line,
taking a screenshot, and it only took 42
seconds to do all of that. All right,
and you see if I run the exact same
query through my Jarvis AI assistant
through open claw, it gives me a nice
neat markdown formatted response of that
chart we just saw in the command line.
Okay, browsing Hacker News is certainly
cool, but that's a very simple demo of
what agent browser can do. There are
some really advanced use cases of where
you can take this thing. I'll just go
over a couple of them briefly here. So,
number one, a no API workflow.
Basically, any site or service that
doesn't have an API where you actually
have to go to a web console or some
dashboard to interact with, you can use
agent browser to programmatically pull
that information or interact with that
dashboard so you don't have to open a
browser and do that yourself. Number two
is self-verifying code. So, anytime
you're using playwright to sort of
automate and check front-end changes
that your agent is making to code, your
agent can just use agent browser
instead, take a screenshot, send that to
you, or just validate it itself to make
sure that the changes it made are
actually good. Number three, website
monitoring. Any website where things
change like prices, product listings,
things like that, you can basically use
agent browser to monitor that page.
Number four is not really a use case,
but it's just something to point out for
agent browser. Agent browser does have
some built-in security guardrails,
specifically against prompt injection,
which is huge when you're using an
agentic browser to navigate the web. You
don't want your AI agent getting
poisoned with any prompt injections on
those sites. It's not perfect, but it's
good to know that it's there and it's
providing an extra line of defense. And
number five is a new skill that is
actually available with agent browser,
and that's the electron skill. So, in
addition to being able to control and
interact with any browser, you can
actually use agent browser to control
any electron app on your computer,
whether that be Slack or Notion, VS
Code, Discord. I haven't tested this out
yet, but it sounds really cool. All
right, so there you have it. That's
three tools, three simple but highly
effective upgrades for your open claw.
Agent mail gives your agent its own
dedicated inbox. QMD gives your agent
real memory. And agent browser gives
your agent a better and faster way to
browse the web. Each one took only a few
minutes to set up, but together, they
turn a really basic open claw setup into
something that feels like an actually
useful assistant. If I had to pick just
one to start with, I'd start with QMD.
The memory upgrade is the single biggest
quality of life improvement for Open
Claw. But honestly, hook up all three.
It's totally worth it. If you found this
helpful, drop a comment below to let me
know what tool you're most excited about
for using with Open Claw. And if there's
any tools I should check out, also let
me know. I'm always trying out new stuff
and I like to see what you guys are
using. And if you haven't already, make
sure you subscribe because I've got a
lot more content in the pipeline in the
coming weeks for Open Claw. Thanks for
watching and I'll see you next time.
