---
video_id: "9gcOfgh5T8s"
title: "Flue vs Sandcastle vs Building It Yourself"
channel: "Elie Steinbock"
topic: "ai-llms"
published_date: "2026-05-11"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=9gcOfgh5T8s"
duration: 666
word_count: 2552
---
Two new TypeScript libraries were
recently released. One is called Flu,
it's the agent harness framework, it's
by the Astro team, and the other one is
Sand castle by Matt Pocock. It's a
TypeScript library for orchestrating AI
coding agents in isolated sandboxes. In
this video, I'm going to go through both
of them, show you how each of them work,
and then a third option, which is
ignoring the library and just building
something yourself. I actually went with
the third option myself for Inbox Zero.
It's the AI email assistant company that
I run. The reason I did this is that
neither Flu nor Sand castle support your
Claude Max subscription. I wanted to be
able to easily switch between Codex Max
and Claude Max, and so the easiest way
to do it was just creating it myself. I
like to give a quick thank you to
Screenshot One for sponsoring the video.
They're a screenshot API for developers.
This is how easy it is to take a
screenshot of the stripe.com website.
It's just a single URL. If you've ever
had to do browser rendering with
Playwright or setting this stuff up by
yourself, it can be a massive headache.
So, that's where Screenshot One comes in
to make it easier, and it has a lot of
different custom izations. It's also
free to get started, so go check that
out. Link in the description below. Now,
back to Flu. Flu is an agent harness
framework. So, quickly, this is what it
looks like. You can see that we have
some TypeScript code over here, and this
allows us to call different models, send
in a prompt, and then get back a result
in JSON format. Now, so far this doesn't
look that interesting. Flu actually uses
Pi under the hood. That's the same
library that Open Claw uses. It also
uses Honcho. So, over here you can see
this is an actual endpoint that we can
go and call. It's a webhook that
receives a payload, and we're saying
translate this payload.language into
payload.text. One nice thing it does
automatically is it uses just Bash. Just
Bash is a project by the Vercel team.
It's a Bash interpreter for AI agents.
It's pure TypeScript with in-memory file
system. So, if I could do about here,
you can see it's actually running. And
so, I can run a command like cat
package.json, and you can see we get the
version. And so this is super helpful
for an agent to have its own bash that
it can run against. It doesn't need a
full terminal. It can just run against
the TypeScript version. On the Flu
framework website, you can see they
initialize an agent, then they create a
triage agent. So it's literally just a
skill. We don't see the skill over here,
but you just create a skill.md file and
that gets passed in here. And you can
see the arguments we need, for example,
the GitHub issue number and then the
result by the end if we were able to
apply fix or not. As a next step, we put
a comment on GitHub. So the comment is
basically the prompt, write a GitHub
comment summarizing the triage. Then if
a fix was applied, we're going to do a
git commit. And then finally, we're
going to go and post the comment on the
GitHub issue. It also has built-in
support for sandboxes. So here you can
see we're using a virtual sandbox called
knowledge base. What's happening is
mount the R2 knowledge base bucket as
the agent's file system. The agent can
grep, glob, and read articles with bash,
but without needing to spin up an entire
container sandbox. So this is cool how
it has built-in support for R2. So
everything the agent is doing is being
stored in this R2 bucket, which is
Cloudflare's alternative to S3 if you're
not familiar with what R2 is. So this
entire session can be stored to R2
because this agent is deployed to
Cloudflare. Message history and session
state are automatically persisted for
you. So you or your customer can revisit
the support session days, weeks, or
years later and pick up exactly where
you left off. And one other nice thing
it can do is define commands like npm or
GitHub. Now, why is this helpful? It's
letting the AI work with certain CLIs.
It doesn't have access to everything,
only the things you define for it. But
here you can see it can use GH, the
GitHub CLI. You pass in the GitHub
token. The AI never sees the token. All
it can do is use GH. And so it can
interact with GitHub without you leaking
sensitive data to the AI. One last
example is that you can also use remote
sandboxes. So, there are a lot of tools
out there right now that let you spin up
a remote sandbox very quickly. Daytona
is one of them, and here you can see
we're creating the sandbox and letting
our agent use it to do its work. And
then, they also have support for
integrating remote MCP tools, which is
nice as well. So, that's the overall
idea behind flu. As I mentioned before,
I started playing with this. I was like,
"Okay, new project, why not try it out?"
My exact use case what I wanted to
happen is that an issue gets posted to
linear, and I want an agent that goes
and solves it end-to-end. There's lots
of different ways to automate this, but
really I wanted more control over the
steps that happen. So, I want the AI to
first get the linear issue, then
implement a fix with TDD. So far, so
good. Then, the next stage I'd like it
to do is a slash simplify. This is a
built-in Claude code command. Usually,
the first pass of an AI leaves a bit of
mess, so doing simplify cleans that up.
After that, I want it to do a review.
After that, I want it to push to GitHub.
Then, I want it to address review
comments. So, I have other bots like
Cubic running, and they're going to
leave comments about mistakes they
found, so I want my AI to basically loop
on those and fix those issues. And then,
lastly, I want it to message me on
Slack. I want to know what happened in
the PR. I want to know if there are any
performance issues I need to be aware
of, just the overview of what happened
and if it thinks it's ready to merge or
not. Once all of this has happened, I
can now go to the PR myself to give it a
review and see if it really is ready or
I have to keep working on it. And so,
you can imagine all of this would be
very doable with flu. The main reason I
didn't do it is, honestly, that it can't
use my Claude Mac subscription or Codex
Mac actually. But also, flu doesn't
necessarily give you that much.
Everything it offers you, I can do
myself anyway. And when you write it
yourself, you have full control to
adjust exactly as needed. So, I didn't
feel like I necessarily had to be tied
in. Now, I mentioned before Sandcastle,
that's another variant. Could we use
this? So, the same thing, the reason I
didn't use it, it's possible to use
Claude subscription. No, basically, so I
skipped on this as well. It is an
interesting project, so let's go over
what this does. It's a bit different to
flu. How it works is you do this run
command, it has built-in sandbox
support. So, here it's using Docker to
run everything in. Here you see it's
using Claude code to go and run your
task, and here's the actual prompt you
pass in. So, pretty simple. This run
command is doing slightly more. It is
basically doing a Ralph loop on whatever
task it's being given. So, it's making
sure the task is fully complete. If
you're not familiar with Ralph loops,
very simple concept. Claude code has the
slash loop command built in, and this is
basically you can do say loop every 5
minutes or so, and complete the task.
So, imagine you have 10 steps to
complete in the task, the agent decided
to only do seven of them, so it can keep
looping until it's fully complete. The
other version of it is something like
this where you called Claude in a loop.
So, here we're calling Claude, complete
the next step, and we just keep looping,
and your steps might look something like
this. So, first do the front end, then
the back end, then add tests. So, each
time it's just doing one more step, it
gets a completely new context, and it
can go through all the steps until
complete. When the run is complete,
you'll be able to see how many
iterations it actually did as part of
the output. Now, there's a lot of
different configuration you can put in
here. You can use different types of
sandboxes. Here you can see just endless
options you can pass in, different ways
it can branch. Here you can see you can
pass in arguments as well if you need,
and it handles things like work trees.
Here for example, it's copying the dot
end from your repo into the work tree,
which is a super common need when you're
using work trees. And then one last idea
to share here is that it provides you
with templates. So, you can keep things
blank and simple and just build whatever
you want yourself. You can do a simple
loop or something like I described for
myself, a sequential reviewer or
parallel planner with review. But for
example here, sequential review will
implement issue one by one with a code
reviews after each step. So, the main
idea here is that it can run things in a
sandbox for you. You write it all in
TypeScript. And again, do you need to
use it? No, not really. It might be
interesting to play around with, but I
think you could do a lot of this
yourself anyway. And so, now heading
back to what I implemented for myself,
these were the seven steps that I
wanted. This is for Inbox Zero. This is
the company I run. It's an AI email
assistant. It's open source, so go and
give it a star on GitHub. And it
basically helps you organize your inbox
better and draft replies and a whole
bunch of other stuff. But, basically, if
you want to hand off your inbox to an AI
agent, manage it from Slack or Telegram,
this is for you. Now, in our version,
you'll see there's a lot more code.
Firstly, it's doing more than the
previous examples we showed, but also we
have full control over everything here.
So, I don't actually mind that there's a
lot of code. So, as a first step, we're
resolving the linear task that we are
trying to fix over here. Then, we are
going to download images. We're going to
update in linear that we're working on
this issue. Here, you can see we go and
create a work tree. Now, all of this is
literally just running regular commands.
Like, if we jump into the code, it might
look a little bit complex, but
ultimately, it's just doing a Git work
tree add and then giving it a branch
name. And so, for each of these steps,
also for calling linear, it's the same
idea. All of this you can one-shot very
quickly. I mentioned the symlink of the
environment variable file, so we do that
as well as in the example we saw before
in Matt's project. We install the NPM
dependencies. So, here you can see we're
using PNPM, so we do PNPM install. We
give ourselves updates at every step.
Now, we go and handle the actual task.
So, this is going to run this index
stage. And if we look at the actual
prompt for it, it's basically analyzing
the task and classifying what type of
work it is. Is it a bug fix or is it a
new feature? If it's a bug fix, we'll
handle it one way. If it's a new
feature, another way. You can see the
next step is implement another very
short prompt and I'm basically saying
implement the task using TDD. You can
see that step happens over here in
implement. Then after that, we have a
simplify step, a review step, then we go
and create a pull request. We do some
follow-up. This is exactly what we spoke
about before and so we keep going till
we're finally done and then we notify
ourselves on Slack and we clean up the
work tree. Now, there's a lot going on
here. Now, it looks like there's a lot
going on here, but if you think about
it, the reality is this is a one or two
shot and the nice thing about it all is
that I can go and change it exactly as I
need. I can update these prompts. I'm
not super happy with every single stage
right now as they were one shotted, so I
can go and do some cleanup. But it's
like very easy for me to do. By the way,
a way simpler version of all of this is
you could literally just write a skill
in Claude or Codex that just goes
through all of these steps for you. I've
played with ideas like that in the past.
The advantage here is it's going step by
step. I control exactly what's
happening. I don't need the AI to try
and figure it all out on its own. I
control every step of the way basically
and I know each step is going to happen.
Another variant of this could just be a
100 line bash script. I wonder if that
would be doable. I am surprised by how
much code was involved here by writing
it all up in TypeScript, but ultimately
I don't care that much about how many
lines of code this whole thing is as
long as it works for me and I have
control to change it to what I need in
the future, which I do. If you enjoyed
this video, be sure to subscribe and
also give Inbox Zero a star on GitHub.
It means a lot to me.
