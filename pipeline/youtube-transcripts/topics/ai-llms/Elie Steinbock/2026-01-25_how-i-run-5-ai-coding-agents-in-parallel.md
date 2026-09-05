---
video_id: "b06w8JoOoRc"
title: "How I Run 5 AI Coding Agents in Parallel"
channel: "Elie Steinbock"
topic: "ai-llms"
published_date: "2026-01-25"
ingested_date: "2026-09-05"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=b06w8JoOoRc"
duration: 486
word_count: 1907
---
Hey, so I'm going to take you through
conductor.build in this video. This is a
tool that I've been using the last few
weeks. I really enjoy working with it. A
lot of people have been asking me why I
choose to use it. And so I'm going to
take you through it in this video. It's
built off of Claude code or code X. It's
not a big shift away from what you've
been doing previously if you're using
one of those tools. If you want to
install the app, just go to
conductor.build. And here you can see it
running on my own computer. So when you
get started, you'll add some
repositories and then you can start
working immediately. So here you can see
I've added the inbox zero repo that I
work on daily and then I've also added
the dub repo just to show you how it
works across multiple projects. So for
this, I'm just going to tell it add a
test file. This is regular Claude code
which is running over here. You can also
switch to different models or to code X
if you have this installed. This is a
demo account I'm running it on so it
doesn't actually have it installed on my
machine here. And what you can see has
happened immediately is it's created a
new branch at test file. And I it's
asking me some questions. So I've just
asked it to make a small change to the
read me so we can see this in practice.
And by the way, I can keep doing this on
other projects. So make a test change to
the read me. I'm demoing this to
someone. So let's see what happens
there. This is busy going. Oh, this one
wasn't actually sent. So now it's making
two changes at the same time to two
different projects. Okay, so it's done
here. We can see the change it's made. I
can also click in down the side to get a
diff of it. You can see it's added a
word so you can focus on what matters
most. It's added that word to my read
me. And you can see in dub it's also
gone and done that. It's added demo note
as well. Now this is regular Claude code
here. We can do shift tab to get into
plan mode as you can see. We can disable
thinking. We can add attachments. It
does all the regular stuff. Here you can
see a bunch of other things that it can
do. PR comments, review, memory. A few
of these things you can see for example
if we have to uh do MCP, it's just going
to open a Claude code terminal separate
from this, but we're not going to in
that daily, so it's fine. And anyway,
now that we've done the changes, we want
to create a PR. So, there's a create PR
button. I'm running the PR now in the
Inbox Zero repo. You can see this is
what the actual instructions are for the
PR. Not super critical. I It's actually
the first time I've clicked into it, but
you can see a new PR has been created
that we've added the word most to the
read me. Okay, that's cool. What else is
very nice is now you can see the PR is
over here. So, we can see the branch
name. We can also see PR 1387 is here.
And we can see checks are now running.
We can see all the tests here, which is
really nice.
Some comments that are going to be
added. And what's actually happened here
is that we have a different work tree.
So, I want to show you Let's say we
start working on another feature. Let's
do another test change to the read me.
And so, you can see this now is in its
own work tree. You can see it's got zero
changes over here. If you're not
familiar with it work trees,
it basically copies your Git repo into
another folder, and so you can work on
two things at the same time. It wasn't a
very heavily used feature, but now with
AI, it's become very popular to use it.
The thing is with other tools like
you'll see work trees in Cursor and
other tools, they're quite a pain to
use. With Conducted or Build, it just
does it all for you automatically. And
so, the great thing is that I now have
this workspace over here with the read
me change. And then over here, I have
another read me change. And you can see
over here it's test change. And these
don't conflict at all. So, you basically
have a different tab for different
agents that are running. They can run on
completely different tasks. They can run
across repos as well. This has been
super handy for me. And yeah, the
workflow is just really nice. Here you
can see I still have a few checks
pending. And now if I go, as soon as
what will happen once these checks are
over, we'll see a green merge button
here. So, I can just click it, it merges
it, and then it will allow me to archive
this workspace. So, I can archive it
now. They will just pop up on screen. We
might see that in a minute. And what's
really nice here about these different
workspaces, even though we use a mono
repo, we do have lots of smaller
projects like test scripts or other
files that I might want to be dealing
with. Maybe you have a blog in a
different repo, things like that. And
so, this is really nice that you can go
just directly into what you need and
just start chatting here. It's all just
like you're entire computer could down
here down the side. All the different
projects you need quick access to.
That's the core of Conductor. It's worth
trying out. I'm going to show you some
other things about the app since we're
doing a video on it anyway, but
hopefully in these first few minutes you
got the real value. Some other things to
know about here, you can open the app in
different tools. So, if you want to open
this work tree, which is called
Islamabad, this was automatically named
Islamabad, you can open it in cursor or
in finder. You have the file tree here.
As I mentioned before, you have
comments. So, you can see these over
here. You can add different to-do's.
I've actually not used this yet, but it
could definitely be helpful. One more
thing is the setup. So, you can add a
setup script, a run script, and you also
have the terminal here. This is a
regular terminal. I'm Mine is usually
styled a bit differently, but because
it's a demo account, you see just the
plain standard terminal. If I show you
setup scripts, the reason this could be
interesting is you want to do an npm
install because it's like in a brand new
folder. So, it's not going to have your
npm packages installed. So, you might
want to do pnpm install or a run script
of pnpm dev, for example. And so, you
can have lots of different versions of
your product running say in each branch,
basically.
So, I could click run here, and then
it's going to run this pnpm dev command
for me. And each one could be running on
a different port. Conductor makes that
very easy to do. Going into the
workspace settings, so I've gone over
here and clicked repo settings over
here, and you can see where everything
is, the remote branch, we're using
different scripts. So, this is the setup
script I mentioned. The run script,
where you can one-click run something.
And then, you might run want to run a
script on archive as well, potentially.
Not critical. You have different
integrations. You can set the
environment variable. Here you can see
what is actually happening. Once we get
to that merge state, you'll see there's
a merge button that will pop up. Here
you can see lots of different
workspaces. You can tag files and so on,
just like you can in Castle Cloud Code.
Here you can see your terminal in the
bottom right. If you go to the docs,
you'll find other things to learn about
the product. So, for example, with the
run scripts I mentioned, you can do
custom ports. So, Conductor has specific
environment variables you can use. I
think there are four of them, maybe
more. Conductor port, workspace path,
root path. There's a bunch of them, and
these can be helpful for the scripts.
And this is what a full app would look
like. You can see you have lots of
different branches going down the side.
Each one is its own work tree, and then
also turns it into its own branch and
its own PR.
And so, here you can see seven different
projects, a few branches, a few parallel
agents running on all of them. Here you
can see this PR is actually ready to
merge. So, they just have to click merge
over here. It's got the terminal that I
mentioned, a little prettier over there.
You can tag files, everything you can do
in regular Cloud Code or Code X. And
just a lot of things just become really
easy. For example, if I want to open the
PR in GitHub, I just click here. This,
for some reason, is taking its time. I'm
not sure, maybe it's cuz I haven't
signed the CLA. Maybe that's why it's
not getting to merge yet, because it's
not saying it's ready. But, if we click
here, we can get directly to the PR
itself. Yeah, it looks like it's
blocking me for this one, which is weird
that I have to sign a CLA on my own app.
But, this is specific to our own GitHub
repo setup. It's actually not related to
conductor.build.
Anyway, that was a quick video. If you
liked it, be sure to check out Inbox
Zero. It's my own project. Also, give it
a star on GitHub. We are almost at
10,000 stars. So, I'd love it if you are
the 10,000th person to go and star the
repo.
But, let me know what you think about
it.
There are quite a few apps which work
like this right now. One coder is
another one that I've seen come up, and
I can see the UX from Conductor making
its way into lots of other places. I
found it like a
an amazing experience using it. So,
that's why I decided to do this video.
Hope you enjoy it.
