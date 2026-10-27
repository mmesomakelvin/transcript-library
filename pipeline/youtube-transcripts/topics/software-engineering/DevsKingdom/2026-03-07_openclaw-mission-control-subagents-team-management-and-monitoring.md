---
video_id: "PMkgPhcXYjQ"
title: "OpenClaw Mission Control: SubAgents Team Management and Monitoring"
channel: "DevsKingdom"
topic: "software-engineering"
published_date: "2026-03-07"
ingested_date: "2026-10-27"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=PMkgPhcXYjQ"
duration: 747
word_count: 2108
---
Well guys, welcome to another video. So,
in today's tutorial, we're going to talk
about the Open Claw Mission Control. So,
what is the Mission Control? So, Mission
Control is
a
orchestration dashboard for agents
management and monitoring. So, as you
can see from this
GitHub repo, uh the about section, it
says
the AI agent orchestration dashboard
manage AI agents, assign tasks, and
coordinate multi-agents collaboration
via the Open Claw Gateway. So, that's
what the Mission Control does. You can
see from the
interest, so you got a lot of stars uh
just in a few weeks. So, it's very
welcome by the community. And you can
see this readme, so it's very well
documented. So, it has all the
screenshots.
&gt;&gt; [gasps]
&gt;&gt; And it pretty much demonstrated how this
works. So, when you control, you can
actually manage a lot of agents all at
once.
And to achieve a mission or missions.
So, we can create dashboards,
a board group of agents together to
achieve some tasks, and also assign
different agents to different groups,
um so and so forth. So, they also
provide marketplace for skills, which is
very nice. And uh
you can see here you can also add agents
within different um mission control
groups or mission control board.
You can talk to agents directly to see
how they are doing, what is the status
of the tasks they're working on, so and
so forth. So, very nice project. So, in
this tutorial, we're going to show you
first
to go over everything.
If you have seen this screen, so that
you can see everything is supposed to be
set up. So, we go through this project
to
see how this works, and also we'll show
you how to set this up step by step
later in this video. So, that being
said, let's get started.
So, this is basically set up on Kaggle.
So, everything has been running on
Kaggle Visual Studio instance. Um
so,
if you have not set this up on Kaggle
before, so we have a lot of tutorials
show you how to set up Visual Studio on
Kaggle
and how to set up the Open Cloud Kaggle.
So, feel free to check those out. Um
but, in this video we're going to just
go through the mission control
aspect. So,
um you can see here everything is
actually set up on
uh because we have to set up everything
inside one notebook. So, you need to run
different
environment. So, first we have to
basically set up Visual Studio to go
through the interactive uh
configuration. And also, then we have to
set up Angrok to actually
running this
Open Cloud mission control. So,
if you go to the dashboard, you can see
that uh everything has been displayed uh
correctly, even though there's agents
still working, still provisioning. So,
if you go to agents, you can see agents
are still provisioning.
And so, that's why you see this three
total, but there's still agents.
You can see the
different sessions here. So, you can see
some of the gateway agents probably is
being spin up and some of the other
sessions are still being
working or still being provisioning. And
you can see also the recent activities
as well for the
Open Cloud
processes. And if you go to the live
feed, I can see
the feed is loading. So, basically
there's a researcher agent is loading.
And there's board groups. So, the board
groups can create any as many groups as
possible.
Uh basically, it's grouping grouping
teams. So, the board is a team of
agents. You can see the board you can
create different boards for different
agents.
Uh so, you can see there's one agent
here. So you can see there's inbox,
there's in progress for tasks, but the
agent still provisioning. So there's
really nothing right now here, but the
board is basically a team of agents. And
the board groups is basically
many groups of teams. So hope that makes
sense. You can create different groups.
So once you create a board, they will do
ask you to select the gateway. So if you
configure different gateways. So if you
go to the gateway section, so you have
configured like different gateway based
on your setup. For example, you can set
up on local, which is the 0000.
And if you set up remotely, there will
be a different configuration. And if you
go to the edit, you can see
basically you have to set the gateway
URL and also the workspace root. To make
it simple, you can also disable the
device pairing.
And allow self-signed TSS TLS. Then you
put the gateway token. So that's very
simple setup.
You can configure this probably in more
complicated way in production, but this
is just for demo purpose. So let's go
back to
the gateway.
For organizations, you can also create
different organizations.
For example,
you have
basically created a testing organization
and you also you can also invite
members.
All right. And then
this is basically for administration of
the team, so the gateways and agents to
group them to different teams and
groups. You can also go to marketplace
to
get all different skills for different
agents. So that's very nice as well. So
there's a packs that
they have by default. You can see each
pack have different skills. And you can
just default to those skills and also
maybe import your own skills.
So it's very nice. And so that should be
everything for the mission control. But
eventually you can go to the
different boards or different teams to
check with the agent to see how they're
doing and which different tasks that
they actually demo in the readme. So,
it's a very nice project. So, but it's
still being developed.
And
that being said, let's go to how to set
this up. So, first you have to basically
install Open Cloud. We have demoed how
to set up Open Cloud
a lot in this channel, so feel free to
check those out. And uh if you want to
install the Mission Control of Open
Cloud. So, first you have to install the
different packages. So, first you have
to do a
APT update. Then you have to install the
postgre and just follow the prompts or
the uh command line here and you should
be able to set up everything for the
base Mission Control. And after you set
up the postgre and set up the different
dependencies for postgre, then you can
actually clone the Open Cloud Mission
Control to do the installation. Make
sure everything is local, not Docker,
including the databases. So, the
database basically uh should be selected
as external, so not Docker or base.
That's one thing to note. But after you
install the
using the install.sh script, you can see
basically
uh everything has been spin up would be
similar to this one. You can see
basically there's a
prompting that uh the access URLs is
this and also the
logs are here and also there's local
auth tokens.
So, but
after you set everything up on the
studio uh directly, you can close the we
studio. So, as you can see here, so we
already closed everything. Then you can
go to the notebook to set up the rest
using the ngrok
tunnel. So, to set up ngrok, so first
you have to um
uh run a command to
create this uh ngrok process. So, then
you have to install the pi ngrok ngrok.
So, we have demoed it on this channel.
So, we don't
continue to explain everything in here.
It's just follow everything on the
screen that you should be able to set up
and Grok. And also, you have to go to
the Open Cloud Mission Control
environment to update different
variables. So, um
if you go to
this section, the Open Cloud Mission
Control environment, which is the uh
repo root folder. So, basically, you
have to update the local off token to
whatever uh generated. So, this should
be generated already while we're doing
the setup process, but just mention
here. So, if you have not set up the
local off token, you have to set that
up. Also, you have to make sure the next
public API URL is the one that you
set up for the Open Grok. So, for
example, this is the 8 850. So, you can
see here, this 850. So, basically, you
have to set up the Open Grok URL, public
URL in the next public API URL. Then,
for the front end, you have to also set
up the next public API URL, so in here.
So, that's for the front end. For the
back end, it should be
able to set up the base URL as the Open
Grok URL. And also, make sure that
the
local off token also being set up
correctly. So,
that should be it. So,
after everything is configured, so
you probably want to see if there's any
existing process running for the Mission
Control. So, if there is, just um
close them. After that, you have to go
to the front end folder to actually run
everything again, to build everything
again, to take the latest environment,
and then to restart everything. So, for
example, for the front end, you have to
restart the NPM run restart to
restart the front end and also restart
the back end also. So, back end is using
the fast API. So, I think you have to do
the unicorn
um to the app that made the app. So, as
you can see here. So, that should be it.
And lastly,
you have to reconfigure the Open Claw if
you
have issues with the gateway. So, first
you have to
configure the gateway and rerun the
gateway. If you have issues with the
gateway such as the allowed origin, uh
you have not configured the allowed
origin, you might have to reconfigure
that based on the Engrok.
Because the
Visual Studio has a different
public URL, which is using the Gradio.
But, the
second phase is using the Engrok. So,
you might have to add that public URL to
the
allowed origins for Open Claw, and also
set up the allowed insecure off because
everything is in testing mode. So, you
can set the allowed insecure off to
true.
And after that, you want to also set up
the dangerously disable device off. So,
this is not recommended for production,
but for testing for demo purpose, you
can just set this to make things easier.
So, that's it. And
if you want to set up everything, you
might also want to check the binding.
So, either the loopback or LAN. So, the
default we set up during the other demos
are using LAN, which is for remote
access. So, want to make sure that is
set up.
Then, if you set up the device
pairing, so you might want to also
make sure that devices are approved.
Then, everything should be ready to go.
So, last not but the least, so you just
go to the engine section to actually
install everything in engines. If you
have not set up engines during the setup
phase one, then you might do
set up everything in here.
And for the Open Claw Mission Control,
you definitely want to run this routing.
So, make sure that default traffic is
routed to the front end 3000 and the
back end traffic API is routed to the
back end 8000. So,
that's for the engine setup. So,
everything
when everything
setup completed, then you can go to
the public mission control
URL
to see if it works. So, when you ask for
a token, when the Open Cloud
mission control ask you for a token,
then just use the token that you
specified in the Open Cloud
configuration right here.
So,
that's it. This is how you set up Open
Cloud Mission Control with Open Cloud
instances.
So, hopefully this is helpful. And if
you do like this video, please
subscribe, like, or comment if you have
any questions. Thank you so much for
supporting channel, and see you in the
next one.
