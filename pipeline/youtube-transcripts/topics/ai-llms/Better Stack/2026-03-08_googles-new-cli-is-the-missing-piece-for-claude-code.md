---
video_id: "EKG9kX86u0s"
title: "Google's New CLI Is The Missing Piece for Claude Code"
channel: "Better Stack"
topic: "ai-llms"
published_date: "2026-03-08"
ingested_date: "2026-08-28"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=EKG9kX86u0s"
duration: 511
word_count: 1792
---
Google Workspaces has just become much
better for AI agents because they've
released a Rust CLI tool that lets your
agent interact with any Google Workspace
API. So, read files from Drive, send
emails, and even create slides, all
built from the ground up for AI agents,
meaning they use as little tokens as
possible and dynamically create commands
at runtime, so the APIs are always up to
date. But, now with a bigger company
like Google creating a CLI for what was
previously and still is an MCP server,
what does that mean for the future of
MCP? Hit subscribe and let's
[clears throat] find out.
Last month I made a video about
Playwright making a CLI for what was
previously an MCP server. Now, it looks
like Google Workspaces have done the
same thing and people on Twitter are
going crazy for it. It's a CLI tool
built by Justin, who's written a blog
post going through everything he did to
make it specifically for agents, which
we'll talk about later. But, it does
have over 100 skills you can download
from skills.sh, which of course has made
the G Man very happy. But, before we
jump into what it can do, we need to go
through the setup because if we know
anything about Google Cloud related
tools, it's not that straightforward.
Let me show you. First and most
importantly, you'll need access to the
Google Cloud console. You can make a new
project or use an existing one. I made a
new one. Then, you'll need to have the G
Cloud CLI installed, which you can do
with Brew if you're on a Mac. And then,
with your Google Workspace CLI
installed, you'll have to run this
command to go through the setup, which
is pretty self-explanatory. Use your
email for auth, select a GCP project or
set one up, and then choose the APIs you
want access to. Then, once you're done
with this stage, you'll have to go to
API and services, credentials, and
create a new auth client ID, which I
believe can be for any application type.
I've done web, but I'm sure it will work
with desktop because all you need is
this client ID and secret. Then, after
you've done that, the next stage is
where things get a bit tricky because
after running this command, you'll have
to select your all scope. For this demo,
I selected everything, which isn't
ideal, but I was just testing the API.
Then, you'll get this huge URL to
authenticate in your browser. Now,
first, you need to make sure there
aren't any typos in this cuz you might
get some errors, but you'll need to make
note of the port after localhost, which
in my case is 51065,
and then back in the Cloud Console,
click on API and Services, OAuth consent
screen, then click on clients, choose
your web client, and then down here
where it says authorized redirect URIs,
change this to that port number, so
51065, and then we're not quite done
yet. Go to audience, scroll down, and
add your email address here if it's not
already. Now, if you already have a
published app, you won't have this
issue, but because I'm just testing the
API, I'm using it in test mode, so I
need to add my email and the email of
all the users I want to use the CLI over
here. Now, with that done, you can copy
this URL and follow the steps to
configure the CLI. And once you're done,
you should have a status of success. If
you don't see the screen, then wait for
a few seconds and try again because it
does take a while to register the
redirect URI. This whole process, so
just the setup, took me the longest
amount of time to figure out, which goes
to show I don't use Google Cloud tools
that often. But, once you're done, you
should see your details here, meaning
the fun can really begin. Check this
out. Now, I'm going to start simple and
ask Claude to give me information about
my latest 10 emails. Hopefully, there's
nothing sensitive in there. And using
the GWS CLI, it's given me information
about each email with from, subject,
date, and labels. And we can see for
doing this task, it's just used 9% of
the overall context, purely because
there are no MCP tools here. Most of the
context has been used by the messages.
Okay, let's try something else. I'm
going to ask Claude to write me a draft
email with the subject of I love Claude
and a body with a nice poem. Again, it
uses the GWS CLI, writes some Python
using Bash, and now that it's finished,
we can see I have a new draft email here
written by Claude. Let me zoom in a bit.
That contains an email with a poem
saying how much I love Claude. Now,
there's something really interesting
about the way Claude uses the GWS CLI.
If we take a look at the commands that
it's done in the past, we can see here
that there are lots of subcommands and
there's a params flag with JSON inside
it. What's really interesting about this
is that if I, as a human, wanted to do
the same thing by typing in GWS help to
have a look at all the subcommands, I
don't get all of them. I get a handful
and if I want to dive deeper into a
specific command, I'd have to use help
to get even more information about it
and keep doing that over and over again.
But the agent is able to get this
information really quickly and even
knows the exact params to use to get the
right data. I mean, look at this. I
typed in the prompt over here, it used
help once and was able to figure out all
this just from that. Now, we're going to
go into a bit more detail on how it's
able to do that, but we can see here
that the CLI help section outlines the
usage and mentions service, resource,
and sub resource. So, we can see service
down here and if you want more
information, we could also look at GWS
schema with service, resource, and
method. Okay, let's try one more thing.
I'm going to ask Claude to create a new
slides document with one slide
containing the title of Claude cat and
four other slides containing images of
cats. Again, it uses the GWS CLI asking
for help, then digs into help for the
slides and presentations commands. And
now it's finished making our
presentation. Let's take a look at it in
the browser. Here it is. You can see
I've already made a test with Claude
dogs, but let's try this one. And we
have the title Claude cats with a
subtitle a purified collection with five
slides containing images of cats. This
is really cool and we've only used 15%
of the context. So, we could keep going
on and on doing different things. Like
here, I've created a Google Sheet
document containing the population of
each of the US states with a total at
the bottom and even scheduled events in
my calendar. Now, you may have noticed I
did all of this without installing any
Google Workspace specific skills, but
the project does have lots of skills
available containing helpers, personas,
and recipes for more complex actions
like blocking focus time and
rescheduling a meeting. So, how did
Justin get this to work so well? First,
he prioritized nested JSON, which is
difficult for humans to read, but much
easier for agents. He also made the
documentation queryable at runtime,
which we kind of went through earlier,
but this schema section over here makes
it so that if something updates or the
agent enters a wrong parameter, it knows
exactly where to go to check what the
correct one is without any confusion.
The parameters or fields can also be
used to reduce the amount of information
that comes back from the API. So, the
agent can limit the information to just
what it needs instead of getting some
extra information it doesn't need, which
reduces the amount of tokens that are
used. And of course, he uses skills for
agent specific guidance, which I didn't
use in the demo, but they provide more
information than the agent can get from
using the help flag. So, it's clear. MCP
servers are out, skills and CLIs are in,
right? Well, not quite because with
MCPs, the agent can just call functions
directly instead of having to construct
shell commands and pass JSON, which is
what the CLI does. MCP tools are also
better for chaining complex steps and of
course, you don't need a terminal to run
them, which is why the Google Workspace
CLI does have an MCP option. However,
CLIs do use way less tokens even with
the tool search tool enabled. They're
portable, meaning they can work with any
agent harness or without an agent
harness if you don't want to use one,
and it's easy to reproduce the commands
independently for debugging. So, I guess
it really depends on your use case, but
I did have a few issues when using the
CLI like the generated URLs containing
typos which I have no idea how that
happened. The whole redirect URL
localhost port thing took me a while to
figure out. I'm not sure if that's
specific to Google Cloud tools or just
the CLI, but it wasn't fun. And I did
have an issue with the tokens not
updating correctly that I even created a
GitHub issue for. Well, Cloud wrote it
for me. I actually didn't write any of
it. But for a project that's less than a
week old with more than 10K stars on
GitHub, it already has a promising
future ahead of it. And speaking of
promising future, if you ever wanted to
create an Electron app powered by Bun so
you get the speed and you get the small
bundle size, then check out this video
I've made on Electron Bun that shows you
how to use it for a simple Vit project.
