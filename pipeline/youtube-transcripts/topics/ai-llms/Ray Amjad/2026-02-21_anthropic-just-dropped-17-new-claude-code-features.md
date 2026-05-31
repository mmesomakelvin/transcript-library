---
video_id: "F_frSYyhzOE"
title: "Anthropic Just Dropped 17 New Claude Code Features"
channel: "Ray Amjad"
topic: "ai-llms"
published_date: "2026-02-21"
ingested_date: "2026-05-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=F_frSYyhzOE"
duration: 1006
word_count: 3953
---
Okay, so we had a lot of Cloud Code
updates to go through from the last two
weeks. But before getting started, if
you want to sign up to my brand new free
Cloud Code newsletter, then that will be
linked down below. You will get access
to a bunch of free videos as well about
how I'm currently using Cloud Code and
some of my own workflows. Okay, now
first of all, one of the biggest recent
changes is they now made it easier to
deal with Git work trees in Cloud Code.
So first of all, you want to make sure
you're on the latest version of Cloud
Code by using Cloud update, and then you
can run Cloud work tree or just run
Cloud {dash} w and call it whatever you
want. So I'm going to call it like
assistant mode for my application
Hyperspace, and this is my own
speech-to-text application. Anyways, you
can see now made a brand new work tree,
and I can have it implement one of my
specs in a isolated branch. And then I
can do the exact same thing on the
right-hand side with another spec that I
have. And now I can have two features
being implemented at the exact same time
without these two sessions of Cloud Code
interfering with one another. And then I
can open up a pull request for this
later on. Now you can take this further
and have any sub-agents in Cloud Code
being able to work in an isolated work
tree as well. So a good use case here is
that, for example, with my Cloud Code
masterclass, which will be linked down
below, it is the most comprehensive
Cloud Code class online. If I wanted to
make like five different variations of
the landing page, then Cloud Code main
stores and packages for one variation
that's required, but that's not required
for a different variation, or it might
delete some components and move
components around. Having all of that
implemented in the same folder file
structure would get really complicated,
and these different sub-agents would be
stepping on each other's toes. So if we
go to Cloud Code and give it a prompt
kind of like this and tell it each
sub-agent to use its own work tree, then
it will go ahead and do that for us. We
can add this to the front matter of any
agent that we always want to work in its
own work tree. So for example, I could
go to this sub-agent over here, just add
it right to the top, isolation work
tree, and then after calling that
sub-agent, I can go and see in the dot
Cloud work trees folder for the project,
it made agent {dash} A722 blah blah
blah. I can also see the previous
changes that also happened and come back
to any of these work trees if I were to
exit Cloud Code and just put in the same
name of that work tree. And bear in mind
that now, if you do {slash} resume, then
it will firstly show all the sessions in
our current work tree, but then we can
press control W to show all work trees,
including the default main branch. And
then if you try to exit out of that
session of Cloud Code, it will tell you
you have free uncommitted files on that
work tree, and you have the choice of
either keeping the work tree or deleting
it. So, I'm going to keep the work tree
for now, so I can come back to you
later. Now, you can also combine work
trees with tmux as well. So, if you run
cloud {slash} {slash} tmux normally,
then it won't work. But if you run cloud
{slash} {slash} work trees, I'm going to
call it like research {slash} {slash}
tmux, then it will launch Cloud Code
within tmux
inside of the folder that you're
currently in. So, you can see this is
our tmux session name, and the advantage
here is that I now have many of the
benefits of tmux. So, if you've seen my
video from 2 weeks ago about Cloud Code
Teams, if you have that inside of tmux,
every single team member running in its
own split pane. But we can also use the
benefits of things running in the
background, even if you exit Cloud Code.
So, if I give it a research task, so for
example, my Cloud Code Masterclass, if I
copy the URL, paste into Cloud Code, and
say,
"Can you tell me why this is the best
Cloud Code Masterclass on the internet
right now?" and then press enter. If I
press control B, and then press colon,
you can see on the very bottom over
here, it's like in this orange section.
If I type detach, press enter, then it
will detach from that session of Cloud
Code that was just running, and then I
can reattach to later, and see that
Cloud Code has continued working on it.
So, if I run the exact same command
again on the exact same work tree with
tmux, and now reattaching to session, I
can then see that Cloud Code had went
ahead and completed the research task in
the background. Now, of course, you
could have done these things before
Cloud Code added this functionality, but
these commands basically just make the
whole process of using it much easier.
Because if you use it with tmux, then
you can have long-running background
agents, for example. If you want to do
some testing, then you can basically do
that in a work tree, and not worry about
it affecting any of the tasks that are
currently running. And if it goes
sideways or like it doesn't work
properly, then you can basically destroy
that work tree by exiting out of the
session and using that command. You can
have different features being
implemented in parallel, and the key
benefit here is that firstly, for
example, if you use plan mode with Cloud
Code, then Cloud Code establishes,
"Okay, we got to find this file in this
part of the code base, this file in this
other part of the code base." But if you
had three sessions of Cloud Code all
editing the same file structure without
work trees, then one could make a change
or move a file around, and then the
other two sessions would be confused
being like, "Okay, wait, this like
suddenly changed." But by having it in
separate work trees, the file structure
stays constant until that thing has been
implemented. And then you can commit
that as a PR to merge into the main
branch. You can also do you like random
investigations or testing with Cloud
Code in the work tree and throw that
away later. That includes like running a
full test suite, for example. You can
prepare a brand new PR without stashing
and switching. So, for example, if
you're working on a like big task, and a
colleague asks you to like make a quick
change, you can just spin that off in a
new session of Cloud Code inside a work
tree, and then update that PR, for
example. And speaking of which, there is
a brand new command, which is cloud
{dash} {dash} from PR. So, you can put
in a PR ID. So, let me make a new PR. I
can then say I now have a conversation
linked to this PR. Going to from PR,
typing in 71, I can then load in that
previous conversation that just happened
that was linked to that PR. So, that's
like an easier way of basically finding
previous sessions from Cloud Code. You
can do the thing that I showed before,
where you can have different sub-agents
implement different solutions without
interfering with each other, installing
different packages, removing different
packages, and so forth. And then make a
brand new PR from whichever sub-agent
solution that you like the most. So,
that makes experimentation much easier,
like I showed with the early example of
having different landing pages being
created in different work trees. And
finally, you can now hook into work tree
events with work tree create and remove,
which basically allows you to do things
like installing packages which may not
be installed in some cases, injecting
any config or like adding anything to
environment variable files. So the work
tree could actually run locally if you
require environment variables for it to
run locally. And will work tree remove
once the work tree is deleted, you can
stop any docker instances that were
created for that work tree and delete
any temporary databases, caches or
files. If you do want to learn more
about hooks then I do cover that in my
cloud code master class in a whole new
section about hooks. It will be linked
down below. Okay, now in a limited
research preview cloud code added the
ability to have it automatically scan
your code base and find security
vulnerabilities. So they said that using
Opus 4.6 they found over 500
vulnerabilities in open source code
bases. Bugs that had gone undetected for
decades despite years of expert review.
Now unfortunately I did not get early
access to it, but this is kind of what
it looks like behind the scenes. And I
imagine they're using a different model
in this version of cloud code compared
to the one like on your computer.
Probably using a model that is less
restricted when it comes to like
identifying security vulnerabilities.
Which means I can probably identify more
of them compared to you just having a
security tester sub-agent inside of
cloud code itself. Because this kind of
stuff is a double-edged sword. Like the
better the model gets at hacking the
better gets at identifying security
vulnerabilities. Now they did add a
bunch more features to cloud code
desktop application. The biggest of
which is previews where cloud code can
run a website locally and then click for
it to make sure that everything works as
intended and take screenshots along the
way. So let's quickly test it out. So
clicking over here you want to switch to
your local and you can see they added
the work tree functionality to desktop
application too.
And then choose your folder and I'm
going to do auto accept edits and then
say
Can you go to a landing page of the next
JS application after running the server
locally and then test it to make sure
all the buttons work as intended. And
then if you click the button on the top
right where it says preview, press setup
then it will start setting up a
development server, and you can see we
kind of have a browser-like
functionality over here. And it also
passed a command telling it how to set
up a development server automatically.
And this launch.json file will be saved
for the future if you commit it to
GitHub, so it will be faster at spinning
up the environment in the future.
Anyways, we can now see which server we
need set up, so we're going to choose
Next.js only, and then you can see it
navigates to that particular website
server.
Uh except it's kind of misplaced over
here. And then I can see the logs at the
very bottom for and you can see it's
still clicking around to make sure
buttons work. I can switch it to a
mobile device, so I can ask it to make
sure that everything works well on a
mobile as well. And then I can select a
particular element, so let me just stop
it from doing uh what it's doing.
Select this element, for example, over
here, and then it kind of like attach
the image with the class ID as well, and
say, "Change this to a green button."
Press enter, and now this button is
green. So this can be pretty handy for
design-related work, and also getting
Claude Code to click around and behave
like a user for you to make sure things
work as intended. So I can also do
persist sessions as well, so that any
cookies and local storage will be saved
across server restarts, which can be
pretty handy to prevent any logging in
every time. And then I can do the
reverse where I clear the session data,
so it will log in again. And now if I
allow Claude Code to make a PR, in
addition to viewing the PR, I can see
any CI monitoring, and I can set up like
auto fix, which basically means that any
commands I have failed with the CI
monitoring, it will automatically
identify them and then fix them. And
then doing auto merge, like once all the
CI commands have passed successfully,
then it will do the merge for me. Now if
you did make a change in the Claude Code
CLI, and you wanted to move over to a
desktop app to take advantage of the
newer features like the element picker,
then you can do {slash} desktop in the
CLI. It will then load that session into
a desktop app, and then you can continue
previewing it and stuff. They now also
made it easier to view diffs on the
desktop app, so you can press the view
diff button over here, the like line
count, and then you can see all the
changes that were made and anything that
was removed. You can click the plus icon
on any line and then enter in a comment
and then submit that comment over to
Cloud Code, so it will make those
changes. So, this can mean that you no
longer need to use VS Code or Cassa just
to view diffs because you can do that in
the Cloud Code desktop app by doing
{slash} desktop to move the session over
and then you can view the diffs on that.
The desktop app now supports SSH
connections, so you can go here, add SSH
connection,
and let me add one of my Hetzner
servers. So, if I fill in all the
details over here, add SSH connection,
connect, then I can see it's now
connected, so I can go over here and
choose any remote folders from the
server. So, I have this folder over here
and then say,
"Can you make it a light theme and then
redeploy the application?" And then this
will basically connect Cloud Code to a
server and have it running on there. And
this can save you a bunch of hassle in
doing very quick commands on servers
with Cloud Code. So, often I just have
very tiny side projects hosted for me
and my friends online uh that I use
Cloud Code to help manage. And if a
project is small enough, then I just get
Cloud Code to make it directly on the
server and don't bother using Git or
anything else. So, now claims to have
made all the changes, so let me refresh
application.
And
yeah, it seems to be working just fine.
We also now have support for plugins on
the desktop application, so you can go
to plugins. I can see that I already
have one installed, which is a code
simplifier one. I can then press add to
add a plugin. So, I'm going to choose
the front-end design plugin, which is
pretty popular, and install just for the
project. And of course, when looking
through plugins, I can see exactly what
they contain. They now made it easy to
share Cloud Code sessions via the
desktop application and the website, so
you can make a public link and then
share it to any colleagues. They added
default skill called {slash} debug, and
you can put in any issues that you
observed with Cloud Code and it'll
basically figure out why that issue is
happening using the logs that are stored
in your dot cloud folder in your root
directory. So, for example, if you're
just coding a cloud code and you notice
the hook that you had set up did not
trigger properly, you can just say like,
"Why did this recent hook not trigger
for like blocking migrations?" And then
after you identify the problem and you
fixed it, you can then rewind the
session to before you gave this
particular command by doing {slash}
rewind. And just before that command, it
was commit push over here. Restore
conversation. Likewise, if you do
{slash} rewind, you can now select a
point and do a summarize from here. So,
cloud code will summarize a conversation
kind of like the {slash} compact command
up until that point and then start a
brand new conversation. So, just
pressing enter, it will compact it and
then restart a brand new chat. The ask
user question tool in cloud code can now
display markdown. So, if I say something
like, "Can you suggest four different
orders for the FAQ and how it should be
displayed on the landing page? Show me a
markdown of how it works." Use the ask
user question tool. So, often that will
happen automatically, but I'm just
trying to force it happen for the sake
of demonstration. So, it kind of looks
like this. If you remember previously,
the ask user question tool did not have
this section over here, the right-hand
section. But now, if I switch between
it, I can kind of see a few different
options for how it should look.
Unfortunately, it's kind of cut off at
the bottom over here. So, if I zoom out,
then I can see like more of how this
would be. So, if you have a bigger
monitor, that would be helpful. So, if
let's say you wanted to go for this
two-column approach, I'd press N and
then I can add in any notes. So, say
swap the columns and then press enter
and then it will start doing that. So,
you can ask for like tiny mockups in the
ask user question tool for how things
should be laid out. The recently
acquired Bun team have been making a
bunch of memory improvements to cloud
code. So, they say that the bash tool
runs much faster and uses less memory.
So, on the desktop version of cloud
code, you can use your {slash} commands
and skills. So, I can use my spec
developer {slash} command and now you
can do the same thing on the web version
of cloud code. So, typing it out, I can
see all the ones that I have over here.
Let's do spec developer again and that
will load the skill that I have in this
particular project. So, this can be
slightly better for interfacing with
your skills if you don't like using the
CLI. On the web version of Cloud Code,
there's now multi-repo support. So, I
can add another repository over here,
and then I can do like cross-repo work.
So, for example, I can say something
like copy the design of the FAQ part of
the master Cloud Code landing page to
the Hyperwhisper application. And
pressing enter, I can see that I now
have two repos that are going to be
cloned, and it's going to like do the
cross-repo work. So, I usually find this
most handy when it comes to comparing
two different repos to see how an
implementation differs, or sometimes I
find a better implementation for
something, and I want it quickly copied
over from one project to another one.
They now added support for using plan
mode from the Cloud Slack application.
So, you can @Cloud and then say, "Can
you plan some color scheme changes for
the landing page?" And then you can
basically collaborate with your team on
coming up with a plan for how something
should be implemented. And finally, they
added two more things to front matter of
subagents. So, if you do background:
true, then that subagent will always run
in the background. So, you can see I
just triggered the subagent, it's now
running in the background, and I can
actually kill all background agents by
doing control F twice. So, control F
twice, all background agents killed. So,
that's also a new command. And subagents
now also have memory. So, that can be on
the user level, project level, or local
level. So, that means that if you want a
subagent to remember things from the
previous time it had run, then you can
do like memory, so user, project, or
local.
So, let me do project in this particular
case. Control save. And you may want to
update the prompt for the subagent to
tell it to make use of its memory, or
just tell it directly when you're
triggering it. So, I can say,
"Can you tell the subagent to basically
write a poem into its memory?" So, in
this particular case, the subagent
declined the request for some reason, so
I'll tell it to write something else.
And then once the subagent has finished
writing something its memory,
you can see there's a new agent memory
folder in the dot cloud folder for the
project with the name
of the agent, so Mac OS log analyzer,
and this is its own memory.md file,
which is injected into the sub-agent
every time it runs. So, this can solve
the issue of having sub-agents remember
something previously they did the last
time they ran. But, you may have to
change your prompt for the sub-agent to
tell it to make a better use of this for
whatever functionality you have given
the sub-agent. So, combining it with
background true, you could have like
self-improving, self-iterating
background research sub-agents, for
example. Anyways, that's everything for
the video. If you are interested in my
cloud code newsletter, then that will be
linked down below. And you can also
check out my cloud code masterclass that
goes through pretty much every single
feature of cloud code. Many people have
taken the class and have gone on to be
the best cloud code users at their
company and have even gotten promoted
because of their newly learned cloud
code skills. Many of the biggest
companies in the world are already using
cloud code and expecting proficiency in
cloud code to be a given like nowadays.
I also recently added a class where I go
through my own workflows of what I'm
doing day-to-day when it comes to using
cloud code, and I will be updating it
over time on a month-by-month basis, so
you get a sense of what I'm currently
doing and how I'm making use of many of
the features that I have described to
you. There will be a link down below if
you are interested, and if you want to
buy the class for your team as well,
there will be another page for that, and
you can also book a call as well to like
discuss any requirements.
