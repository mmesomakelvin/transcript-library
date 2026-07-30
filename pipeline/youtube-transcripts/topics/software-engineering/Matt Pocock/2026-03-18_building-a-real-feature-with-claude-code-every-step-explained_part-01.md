---
video_id: "hX7yG1KVYhI"
title: "Building a REAL feature with Claude Code: every step explained"
channel: "Matt Pocock"
topic: "software-engineering"
published_date: "2026-03-18"
ingested_date: "2026-07-30"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=hX7yG1KVYhI"
duration: 2656
word_count: 3991
chunk: 1
total_chunks: 3
parent_video_id: "hX7yG1KVYhI"
---
I've been posting a lot recently about
things you should do with Claude code
and mostly I've been approaching it from
the kind of philosophy angle. In other
words, kind of everyone's thinking this
is a new paradigm shift, but actually
just the stuff we've been doing for 20
years is really, really good with Claude
code. You get the most out of it when
you treat it like someone you would
delegate to in your team. In other
words, you focus on the architecture,
you focus on making sure that you've got
good feedback loops, you focus on all
the things we've been doing for the last
20 years, not planning too much up
front, all that stuff. And in all the
comments, people have been saying, "Show
us something practical. Show Show us you
doing it." And so this is that video. I
have no idea how long this video is
going to be. I have no idea exactly what
we're going to cover. I'm just going to
go into actually doing some work with
Claude code in my work repo and I'm
going to talk you through it. I'm going
to show you all of the skills I'm using,
I'm going to show you my process, and
we're just going to give you all the
context you can on how these tools are
actually used. And if you dig this, then
I'm running a cohort in a couple of
weeks for Claude code for real
engineers. It is 40% off this week and
it teaches you either teaches you the
skills that you need to do real
engineering or it gives you the
conversion course you need to take the
existing skills you have and apply them
to this new age. So if that sounds good
to you, then the link is below. Okay,
let's start by understanding the project
that I'm in and what point it is in in
its life cycle, all that stuff. This is
my course video manager. It's It's
about, you know, 1,200 commit. I've
closed around what, 637
issues on this project. And what I'm
using this for is this is my main kind
of entry point for anything I do
regarding creating content. In other
words, I create videos on here. I
organize my courses on here. I post
videos on here. I do thumbnail editing
on here. I do writing on here. It really
is my one-stop shop for everything I
need to do my job and it's amazing. In
terms of the code, it's a React router
application which uses TypeScript and
Node and uses drizzle for the database
ORM, use Postgres as its database, does
some a lot of testing with V test. And
the way I run this is I don't actually
deploy it, I just basically run it
locally. So, I just tend to run start. I
build it and I'm just, you know, run it
with the start script. This is a
confusing video for me to make because
actually right now I'm recording the
video that I'm making on the course
video manager. Here you go, this is me,
this is the clips that are being
detected from the video that I'm
recording and there you go, that's the
previous clip. This is a confusing video
to me to make, you know what I mean?
This is just got loads of stuff here.
This is what the main view looks like.
We've got courses down the left-hand
side here, then we've got lessons and
sections within those courses. And the
stuff I want to show you is inside the
free videos over here. Inside the app
I've got a concept of ghost lessons and
real lessons, which you can see on the
filters here. These ghost lessons
basically don't exist on disk and I need
to right-click the lesson and say create
on disk to actually create the lesson
in like a repo in the disk. And the
logic for this is fairly complicated
because I can turn this back into a
ghost here. So, and then when I do, I
need to delete all of the files that are
on the file system, convert it back to a
ghost. The idea here is that it lets me
plan and kind of create courses in the
same UI, which ends up being really,
really nice. But the thing I want to add
are some enhancements here. So, I want
to be able to when I create a lesson, I
shouldn't just need to create a ghost, I
should be able to add a real lesson
instead of a ghost lesson. Same when I
delete a real lesson, I should be able
to just delete it instead of needing to
turn it into a ghost first. So, this one
here. Now, this part of the code base is
really well tested and so this should be
a relatively simple build. But there is
another thing I want to do as well,
which is I want to when we go up to
these courses up here and add a new
course, I want to be able to basically
create a ghost course, a course that
doesn't yet exist on the file system
because currently every course needs an
entry in the file system. So, that is my
idea. I've got a very loose set of
requirements here, and this is maybe how
you enter most days as a developer. You
have some small tweaks that you need to
make to your application that are based
on some vague ideas. Maybe those are
ideas that you've come up with. Maybe
those are ideas that have come from
somewhere else. And the first thing you
need to do is actually road test those
ideas and harden those ideas. But, the
first thing we're going to do is open
this up in VS Code, and we're going to
um go into this and say "Grill me." I'm
going to use my dictation tool to
dictate some stuff into here. The way
that we handle ghosts in real lessons is
a little bit cumbersome in places. It's
annoying that you have to create a ghost
lesson before you then create a real
lesson. And it's also annoying that when
you delete it or delete a real lesson,
you can't just delete the real lesson.
You have to turn it into a ghost lesson
first. Now, at this point, I'm thinking,
"Do I also in this session want to
tackle the other thing? Do I want to
tackle the idea of ghost courses as
well?" My decision space for that is
like, "Will this crowd out the grill me
session, or will it all actually fairly
seamlessly link together?" Because the
idea of this grill me session is I'm
going to create a document out of this
that I'm then going to use to um
do future builds on, basically. So,
that's my decision here is, "Do I want
to create a PRD, a product requirements
document that has both of these things
in, or are these separate concerns that
I need to separate into separate PRDs?"
I'm going to say that this stuff
actually sort of belongs together. But,
I'm just making that decision kind of
arbitrarily really. I also want to
extend the courses functionality so that
it allows me to create a course without
having a file path. This would be a kind
of ghost course, a planned course that I
haven't actually decided whether I'm
going to build yet. Now, this second
section here, I haven't really explained
the why. That's something that's on my
mind now. I've sort of like I've
explained what I want the feature to do,
but I haven't explained why I want the
feature to exist. It's always really
important when you enter these sessions
that you explain the why to the LLM
because
sure, if the LLM has the what, then it
understands what you want to build, but
if it doesn't know the why, then it
can't suggest alternatives. The reason I
want this is so that I can plan courses
freely without needing to commit to an
exact shape on the file system.
Initiating new repositories is kind of
cumbersome, and I sometimes just like to
prefer or I prefer building stuff in
empty space instead of having to commit
to an actual shape. Ghost courses would
have slightly different constraints on
them. Ghost courses would likely have to
No, I guess ghost courses could have
real lessons. It's just the moment that
they have a real lesson inside them,
then they become a real course, and
you're then required to put it in the
file system, I guess. Or I don't know,
I'm not sure about that flow. Maybe we
can work on that together. Notice how
rough this is. This is just a super
hashed-out sort of idea that I'm kind of
you know, just spewing out the LLM and
making it do all the work. If you've not
seen my Grill Me skill, then head to my
I'll I'll send it in a link below. It's
in my top five skills article. But
you'll be able to see what it does. Here
it is. Really, really cool. Okay, it's
going to do an explore phase. I'm going
to
head and get a glass of water. And by
the way, if you don't know what explore
is, explore is it's basically invoking a
sub-agent. So it's essentially just
passing a message to another agent to
say explore this codebase. That agent
then
explores it within its own context
window, and then it takes that context
it takes a sort of summary of that, and
it hands it back to the parent agent. So
it allows you to get a lot of juice out
of an explore phase because the explore
can just go bam, bam, bam, bam, bam,
read tons and tons of files, and then
the parent agent only gets a summary of
it. So it's very token efficient. But
anyway, I need a glass of water. Okay,
Grill Me has come back with a let me
challenge your framing of the current
pain points. It says that looking at the
code delete lesson in in course right
service already handles both ghost and
real lessons directly. If it's real, it
deletes the directory and renumbers. If
it's ghost, it just removes the DB row.
So, you can delete a real lesson without
converting to ghost first. Is there
something in the UI that forces the
convert to ghost then delete flow? Well,
yeah, there is. Yeah, in the UI there's
no option to delete the lesson
immediately. And
what I mean by deleting a real lesson is
it would both delete the entry from the
database and um purge the on-disk
representation. I'll ping this off while
I explain something very cool that I've
just recently started doing. I've been
reading a book called um
domain-driven design. And in this book,
they talk about how important it is that
you maintain a sense of a sort of
glossary of all of the terms that you
use to describe the system. This
ubiquitous language can then be used
basically to um bridge the gap between
uh devs and domain experts, the thing
the people you're actually building it
for. So, I love this because this is
exactly what the LLM has to have with
me. I'm the domain expert and the LLM is
the dev. And we need some kind of shared
language so that we can talk together
precisely. So, for instance, here we
have a concept of a ghost lesson, a
lesson that exists on whoopsie, a lesson
that exists on the database. Where is
it? Yeah, a lesson that exists on the
database but not yet on the file system.
And so, whenever the LLM is searching
for stuff about ghost lessons, it's
going to come up come across this
ubiquitous language file. Okay, so it
has come back and it said, "Yeah, the UI
currently only exposes convert to ghost
for real lessons, not a direct delete
entirely option. That's a
straightforward UI gap." Okay, that's
useful. Let's quickly talk about like
the way it's using service here and um
what this actually means in my code
base. I might actually try the new um by
the way side question thing here. This
is really useful when you just want to
ask a quick question and you don't want
it to kind of enter into the chat
history. Describe what's going on with
the course right service. uh describe
the shape of it, describe its
capabilities. Let's see what it comes
back with here. The reason I'm uh asking
about this and want to show you what it
is is that um I'm really proud of the
way that I've designed this repo. I
mean, there's definitely stuff in there
that definitely needs to be um looked
at, but the way I've done this service,
I think is quite nice. And the course
right service is the main business logic
layer for mutating course data, the
right side of the system. It coordinates
between the database, the file system,
and the path numbering and renumbering
logic. It's got a really clear interface
here, like you can add ghost lessons,
you can materialize a ghost, so convert
a ghost lesson to a real lesson, uh
convert it to ghost again, uh delete
lesson, etc. So, this is a big, big blob
of functionality. And the tests for this
course right service are all in one
place. So, course right service.test.ts.
Oh, no, okay, it used to be there, not
anymore. Yeah, here they are, course
right e2e.test.ts.
And this actually creates a test
database, it sets up a temporary Git
repo, and so it tests all of the
synchronization between this. This repo
is using effect, and effect makes it so,
so nice to create these kind of like
units within your system that you can
test really easily. Other languages have
this as a first-class thing, but effect
um sort of bolts that on on top of
TypeScript in a really beautiful way.
I've made a video about effect before on
this channel, just one video, and uh
suffice to say I still love it, and I
use it for literally everything. Or at
least every back end thing that I build
is all in effect. Anyway, this huge
service, the course right service, uh
where is it? DB function service, here
it is, the course right service. It just
lives in here. So, it's a file with
essentially a bunch of methods inside
here, and these methods, like
materialize ghost, like add ghost
section, add ghost lesson, delete
lesson, etc. This is what we're talking
about when we talk about this service.
So, then I can exit out of this by the
way thing by just pressing space, enter,
or escape, and now I'm back here. So,
this is a great question. What flow do
you actually want here? Are you saying
you want to create a lesson action that
immediately creates the directory on
disk, skipping the go step entirely? Or
is the pain more that the two-step
process, create ghost and then
materialize, feels like unnecessary
ceremony when you already know you want
a real lesson? Yes, exactly, the
two-step process feels unnecessary. And
it says, "Okay, so you want a single
create lesson action that creates both
the DB entity and the on-disk directory
in one shot when you already know that
it's going to be real." Yep. Okay, and
now it's gone to the bigger topic, ghost
courses. Yeah, here we go. Then you said
something interesting and immediately
hedged on it. Ghost courses could have
real lessons, and when they do, they
become a real course and you're required
to put it in the file system. Let me
break this apart. First question, a
ghost course has no file path, so it has
no Git repo. Sections and lessons inside
it would all be ghost by necessity.
There's no way to put them on disk. When
you say a ghost course could have real
lessons, what does real mean without a
file system? Right, so here what it's
doing is it's fleshing out my kind of
woolly language a little bit and forcing
me to be a bit more specific. This is an
easy question for me to answer. I don't
want them to have some kind of
intermediate status, like flesh more
fleshed out than a ghost. What a great
phrase. But yeah, A is pretty obviously
the thing here. Adding a real lesson to
a ghost course is the trigger that
forces you to assign a file path and
materialize the course. Now, I'm already
thinking from a UI point of view, what's
going to be the easier thing to do, or
rather the most obvious thing for the
user, the cleanest UI? Either when we
create a like real lesson inside a ghost
course, we basically say, "No, you can't
do that. to choose a thing in disk
first, and then you need to click away."
Or we create a kind of integrated flow
where you say, "Okay, you're writing
this to disk. When you do that for the
first time inside a ghost course, you
need to choose a place that it's going
to live." I think I'm like veering
towards the second because it's not that
complicated to do that in terms of UI,
and
I think it'll would a nicer flow. So,
let's say that to it. Yeah, we're going
to choose A here um and I think it makes
sense that when you press um convert to
or convert reveal in file system or
whatever the button is, whenever you
make it and material
Notice here, this is where the
ubiquitous language comes in really
handy because I was just sort of
fluffing around there, but what I mean
is that when I materialize a ghost
lesson, when you materialize a ghost
lesson, you should have a modal pop-up
that forces you to materialize the
course as well. Look how clean like how
much cleaner that language is because
I've got a concept of materializing and
the word agreed on between me and the
LLM. Anyway, let's fire this off and see
what happens. Right, yeah, we've got a
concept of um versions inside the
application, so course versions. This is
really important for me because I have a
team of people who actually apply the
course to the CMS and so I have a course
and a change log. For instance, here in
my Claude Code Cohort, I've got several
versions here and
like the sooner I approach the cohort,
the more I'm sort of fixing bugs or like
um switching out videos, that kind of
thing. The latest version is always the
draft version and then I can like
publish that draft version and add a
commit message to it and it goes into
the change log. Here you go, this is the
UI for publishing the new version and
here's a preview of the change log. So,
yeah, I'm pretty sure that the schema
that we rely on needs the ghost course
to still have versions. Yeah, I'm fairly
sure that the schema that we need um
will require us to have versions because
versions are needed in order to have
sections and lessons and stuff inside
them. However, it makes zero sense to be
able to publish a ghost version, so we
should just hide the bits of UI that's
um and the actions in the menu that
allow you to publish. So, let's fire
this off. I can see in my video editor
that we're about like 15 minutes in and
just notice like how long we're spending
here on fleshing out these ideas. The
more we do here, the less we're going to
end up needing to do
when we actually guide the LLM. Okay,
let me push on the file assignment
moments. When you materialize a ghost
course cuz you're materializing a lesson
inside of it, you need to give it a file
path. Either the repo already exists or
the repo doesn't exist yet. When you
assign a file path to a ghost course,
should the app handle repo creation for
you? No, it shouldn't handle repo
creation. It's just pointing at an
existing directory. That's an easy one
to figure out there. Okay, this is such
a lovely smart question that it's given
us here. It's laying out what you're
asking for. Direct delete for real
lessons, direct create for real lessons,
ghost courses, and then materializing a
lesson in ghost courses. Question, does
direct create apply inside ghost
courses, too? That's so freaking smart.
That's such a nice question. I can
imagine my old boss, Willow Reagan,
asking that question, who is the guy I
learned a lot of this lead developer
stuff from. He had this incredible
ability to just basically sit in a
meeting and ask smart questions for
hours and hours and hours. And this is
exactly what the AI is doing here. It's
asking really smart questions at the
right point in the process. So, if
you're inside a ghost course and you hit
create lesson, should that immediately
trigger the assigned file path modal and
create it on disk? Now, again, there's a
trade-off here, and instead of me
thinking about this in my own head,
which is not particularly fun viewing,
why don't we model what it might look
like if I sort of work this through with
the LLM? Can you give me the trade-offs
of both of these approaches? Okay, so
it's saying on option A, create lesson
inside a ghost course always creates a
ghost ghost lesson. Keeps the ghost
course as a pure planning space. The
assigned file path moment only happens
when you explicitly choose to
materialize, which is a clear deliberate
action. There's downside if you've
already decided this course is real and
you're just adding lessons, you're back
to the two-step annoyance you're trying
to fix. Option B, create lesson inside a
ghost course triggers the
materialization cascade. Yeah, it's
saying option A is the obvious choice
given your stated goal. The two-step
annoyance you described is specifically
about real courses where the file system
exists and you want a real lesson. Yeah,
I probably agree with it. If we want a
consistent UI, then we do want the
ability to both create real lessons and
create ghost lessons
at whatever stage the course is at,
whether it's real or ghost. That will
mean a bit less work in the front end
