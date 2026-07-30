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
word_count: 3996
chunk: 2
total_chunks: 3
parent_video_id: "hX7yG1KVYhI"
---
because we don't want to or won't need
to conditionally show things. Blah blah
blah blah blah. Yes, this makes sense to
me. Option A sounds good. I think it
mostly makes sense in the context of
having
two buttons, one to create a real lesson
and one to create a ghost lesson. Could
you just talk me through the UI a little
bit and how this is going to look?
Notice that I'm driving this a little
bit more now. That's okay, too. The
is nice and flexible so that you can
drive sometimes and the AI can drive.
This is nice, too. It's actually
checking the current UI for lesson
creation first. This is part of the
skill is I get it to, instead of asking
me questions about everything, if it's a
question that can only be answered by or
can be answered by looking at the code,
it should look at the code first. I do
wish that explore was faster. Explore is
the thing that's like, you need it in
every single session, sometimes multiple
times a session, and I just wish it was
quicker. Okay, so here's how the current
UI works. You right-click a section
header, you add a lesson, right-click an
existing lesson, add lesson before, add
lesson after, also creates a ghost.
Inside a real course, you right-click a
section, you'd see add ghost lesson and
add lesson. Inside a ghost course,
right-click a section, you'd only see
add ghost lesson. Yeah, right. That's
the question. Inside a ghost course, do
you want the create real lesson button
to exist at all? Now, at this point, I
don't know. Like, I'm imagining this UI
is going to get pretty crowded with this
like, cuz you're going to have multiple
buttons there. You're going to have
like, add a lesson
before this one, and then do you make it
ghost or real?
I guess like, oh man, this is actually
quite gnarly. I'm thinking, do I
actually want a prototype of this so I
can sort of see how it looks? Because
there's multiple ways that we could
fiddle with this and and get it like,
nice. You could have it where you add a
lesson, then it opens a modal, and you
whether um
it's a ghost lesson or a real lesson. I
think probably what I'm going to do is
I'm just going to build it one way and
then maybe offer feedback afterwards.
So, let's say yes, inside a ghost course
let's have the create real lesson
button. You know, I could like stop this
whole grilling session. I could go into
prototyping mode here where I just sort
of prototype, you know, three different
versions, five different versions of
this just to see what the UI would look
like, but I'm quite keen to get into
implementation now. Okay, so create real
lesson inside a ghost course triggers
the full cascade. Modal asks for file
path, course becomes real, section
materializes, lesson gets created on on
disk, all in one flow. That's right.
That modal is doing a lot of work.
Correct. It needs to grab the lesson
title and the course file path. Yeah,
that's it. Correct. That's it. We just
need the lesson title and the course
file path. That's it. I can feel it.
We're getting to the end of this
grilling session. Oh, maybe not.
It's asking about section behavior,
sections inside ghost courses, and the
state of a section is basically just
derived from um
the lesson. If there were any ghost
lessons inside a section, then it's
going to be a ghost. Oh, sorry. If there
are any real lessons inside a section,
then it's a real section on disk. A
section basically looks like this. It's
just essentially a directory on disk.
You can rename it and rename the
directory or you can add things to it,
but that's basically it. Section logic
should obey the current rules that we
already have. There's nothing really new
about sections. For instance, when we're
inside a ghost course and we create a
real lesson inside that section, then we
basically flow all the way up so it
becomes a real section, becomes a real
lesson, and becomes a real course. Here
we go. Let's keep going. Let me switch
to the database schema. Right now,
courses table has a file path as a
required text field. For ghost courses,
this would need to be nullable. That is
the only schema change I'm envisioning.
Yeah, just going to say yes to this.
It's going to grill me on a tricky edge
case. I see. Have a real course with a
file path. It has some real lessons and
some ghost lessons. You delete all the
real lessons or convert them all to
ghost, does the real course become a
ghost course? Again, this is like a
classic Willow Reagan question. It's
fantastic, really, really good. No, the
real course does not become a ghost
course. Once a course has a file path,
it stays real forever because the thing
that's on disk is not going anywhere.
Yeah, I was thinking about that before
and so I'm super glad that it answered
it because now it's in the context and
it's spelled out. Another edge case, you
have a ghost course, you materialize a
lesson, you assign a file path,
everything becomes real. Now the course
has a file path but no real lessons. I
feel like we just answered that, right?
That's a weird one. I mean, I don't
think Willow Reagan would ask that
question. Yeah, let me move to the
deletion side. You want to direct delete
action for real lessons in the UI.
Currently, the context menu for real
lessons shows convert to ghost but no
delete. Yeah, this is a UI thing. Should
real lessons have both options, convert
to ghost and delete?
I think we need
both. Okay, we're getting there, we're
getting there. I think I've covered the
main branches. Let me lay out the full
scope as I understand it and you tell me
if I'm missing anything. Courses file
path becomes nullable, ghost course
creation, a new course creation flow
that only asks for a name, no file path,
correct. Ghost course UI, hide the
publish and export actions, correct.
Create a real lesson button available in
both real and ghost courses. In a real
course, creates on disk immediately. In
a ghost course, triggers modal asking
for the file path first then cascades
materialization. That looks good. Create
ghost lesson works as today, available
everywhere. Delete action for real
lessons purges from the disk and the
database in one step. Yes. Delete action
for ghost lessons already unchanged. And
finally, convert to ghost stays for real
lessons that you want to keep planning
but remove from the disk. Exactly. So,
we've got that. This was essentially the
eight bullet points that we just spent
whoa, 22 minutes of video just uh trying
to get. This to me feels really, really
familiar. This is how I'm working with
AI a lot. I, you know, block out half an
hour in my calendar to work out exactly
the feature I want and from here it's
pretty much all on rails. Like we have
done the hard bit now. We have done the
human in the loop bit. What I do next is
I now I've been trying this for a few
days. I get it to update my ubiquitous
language documents to basically just
keep it up to date with any of the ideas
that I've got in here. For instance,
we've got some new terminology now.
We've got this idea of
ghost courses, which is new. Let's see
what edit it decided to make In In fact,
I'm just going to accept it and review
it afterwards. So, there we go. We can
see it's updated its idea of ghost
entities here. It's got ghost lessons,
ghost sections, and ghost courses. The
verb materialize is now properly in
here. The act of transitioning a ghost
entity to a real entity by creating its
on disk representation. I like too that
it has this create on disk and realize
like the aliases to avoid. That's really
cool. And it's even got a concept for
the materialization cascade. The chain
reaction when materializing a lesson
inside a ghost course. It signs file
path to course, materializes section,
then materializes lesson. I freaking
love this because later on I can say,
"Yeah, there's a bug inside the
materialization cascade." And it knows
exactly what I'm talking about. commit
this. Update to the ubiquitous language
document. Look at this. Yeah, sometimes
I am actually committing code myself.
Okay, so it's gone back to the grilling.
Yeah, it's now just sort of repeated the
eight sections. The existing plan entity
is a separate disconnected planning
tool. Yeah, I did used to have a
separate planning area, but then I sort
of used this ghost concept to integrate
it into my actual courses thing.
I've got it inside the ubiquitous
language inside here down here. A plan,
a plan section, and a plan lesson there.
But this is basically deprecated. I am
going to remove this at some point. And
so, we can say plans are deprecated and
ghost courses are the new way to do it.
And in fact, I think I'm going to go
ahead and say I'm satisfied. Let's and
I'll invoke my next skill, which is
let's write a PRD. So, if we think about
the conversation that we've just had
with the LLM, it's incredibly good
fodder for just turning this into a sort
of more
concise summary document of everything
that we want to build. I freaking love
question and answer because it
co-locates the question with the answer.
I know that sounds like such a sort of
basic thing to say, but the way that
these attention mechanisms work is that
stuff that's close together tends to
like it sort of shows up as a hot spot
for the LLM in terms of its attention
mechanism, just like it does for humans.
And what this ends up meaning is that
this is such a rich document for it to
pour through. Now, it's doing another
explore phase. We should probably do
like a cursory check on our context
window down here. We're currently only
at like 40K tokens, which is pretty
impressive given how long we've spent
with the LLM working on this stuff. A
lot of folks have asked me why my grill
me skill doesn't use the ask user
question tool. Like we weren't actually
sort of like using Claude's built-in
mechanism for asking questions. And the
reason for that is that I don't really
like that UI, first of all. And second,
like if you have a choice between
calling a tool and not calling a tool,
then like not calling a tool is always
going to be more token efficient because
every time you call a tool, you need to
wrap it in JSON, you need to do various
things. Okay dokey, we can see here that
okay, it's now sketching out the major
modules before writing the PRD. I've
talked before on this channel on how
important I think
modules are and like understanding the
modules in your code base without
necessarily needing to look inside them.
Like the course write service that we
looked at before, that's a big testable
module that I was very careful in
designing and designing the interface
for. And I think this is so important
that I've baked it into my write a PRD
skill. So, it sketches out the modules
and surfaces them to you. I don't
necessarily need to look inside these
modules. I just want to know how they're
changing. For instance, here I can see
something that's a bit dodgy, right? It
wants it to make a new method on the
course write service, materialize course
and lesson. Reuses the existing
materialize ghost and section
materializing logic internally. I'm
thinking about whether it could just
instead use the existing materialize
ghost and pass it like an additional
parameter,
but I think that would be a little bit
dodgy API API wise. So, I think it is
probably right. I think it should have a
new method. Notice how I'm thinking
about the interface more than I'm
actually thinking about the
implementation here. The implementation
I don't really care about, but I want to
make sure that this is testable and um
you know that the rest of the um
kind of repo and any future AI agents
can understand what it's doing. And
again, notice how easy these functions
are to name because we've got this
concept of the ubiquitous language. So,
module one is the ghost course schema DB
operations. That seems fine. The
materialization cascade service. That
seems fine. It's just a new method on
the course right service. Here we've got
two new API routes, which makes sense
because we're doing direct real lesson
creation, direct real lesson deletion. I
could um put them into like other API
routes, but because this is just an
internal tool, I don't really care about
what my API like looks like from the
outside, then I don't really care about
um how many API routes I have or what
they look like. It's just an
implementation detail. Now it's talking
about the
ghost course UI new add ghost course
option in the sidebar. Yep, that seems
fine. A materialization model two lesson
creation buttons in context menus and a
delete action. And then module six, the
plans deprecation. Hey, I mean I do want
to deprecate the plans at some point,
but I don't think I want to deprecate
plans now, certainly not as part of this
PRD. And it's asking me a second
question, which modules do you want
tests for? I want tests in the places
that we already have test harnesses. So,
for the course right service,
definitely. And if we have some stuff
for direct deletion, I think that would
be as part of the course right service,
too, right? So, let's see what it says
here. Now, this is funny. It's saying
there's no existing test harness for
course right service. The tests in the
repo are mostly for pure functions and
reducers. That is rubbish. So, I'm going
to do a Rafiki and I'm going to say,
"Look harder." And there we go. There
they are, a whole suite of them split by
concern.
Okay, and it's satisfied it has
everything it's needed. It's now going
to write the PRD and submit it as a
GitHub issue. This is what I do with my
PRDs. This is what I do with all of my
issues. I stick them in GitHub because
then when we go to actually implement
this with an AFK agent, the AFK agent is
going to pull down all of the GitHub
issues, choose the one it's going to
work on, and then just work on that one.
Now, a question becomes, am I going to
review this PRD? And no, I'm not going
to. LLMs are really, really good at
summarizing things. And so, I know that
this PRD will probably be a pretty good
summarization of this conversation. So,
I'm just going to accept it on faith,
and I'm then going to say, "PRD to
issues." So, it's now time to break this
PRD down into individual issues. The
benefit of doing this is that this now,
the PRD is already in its context from
having written it, and so we get to just
break the issues down straight from
there. These all have blocking
relationships in, so it's blocked by
nothing. This one's blocked by number
one. This one's also blocked by nothing.
That's cool. Now, let's just see how
many there are here. Six does feel about
right, I think. And what I mean by that
is this is going to get picked up by a
Ralph loop. And so, it's going to just
sort of work through each of these tasks
sequentially. And so, I want to pick
tasks that are not too big and not too
small because if they're too small, then
we pay the cost of like having to kick
up an entire agent just to do like
number two here, hide the publish export
UI on ghost courses. This is a tiny task
and it can be melded in with something
else. But maybe ghost course creation,
maybe no, that seems like decently sized
because it touches the UI, it touches
the schema, it touches the API. Two
lesson creation buttons, create ghost
lesson and create real lesson. This
seems super small. And actually, I think
it has broken them down a little bit too
far except maybe the materialization
cascade. That needs to live in its own.
So, I think maybe we just merge two and
three together and I think we'll be
happy. So, let's go down to the bottom.
Let's say merge two and three together.
Okay, now we got four slices. There goes
course creation, the UI stuff, the
direct delete action, and the
materialization cascade. Good stuff.
Let's go. Let's create the issues. Am I
going to review these issues? Absolutely
not. I understand like I've already sort
of pre-reviewed them. It's just
expanding out stuff that's in the PRD
and then, you know, putting them in
issues. This will be fine. just show you
one of them just to sort of see what
they look like. It links to the parent
PRD. It says exactly what to build. It
gives some acceptance criteria. Says
what it's blocked by and it also says
the user stories that are addressed in
the parent PRD. If the parent PRD is the
kind of destination, then these things
are the journey to get there. And notice
the PRD just has a bunch of user
stories, some implementation decisions,
and testing decisions as well. All of
this stuff essentially just comes from
the skills that I've put together and I
found that they're good enough to keep
the LLM on rails. I really like adding
in the testing decisions because it
means that it's more likely to follow
TDD and do some
um kind of create some feedback loops as
it's going, which is great. So, all
right. We have now set everything up so
make our AFK agent to give it the best
chance possible to produce good work.
Now, I've been like cooking my setup for
this a little bit over the last 24 hours
and I've sort of built like a mini
library to um
make it work better than I had it
before. The provisional name for this is
Sandcastle and we have a like a
Dockerfile here. It's going to spin up a
Docker container. It's going to mount
the
working directory inside this
Dockerfile. And then it's going to any
commits that are made then inside the
Dockerfile by Claude, which is going to
run in there, it's then going to patch
those out. So, pull out those commits as
patches and apply them to my local
repo. I found that this setup is just
like super flexible. I have a Dockerfile
and a prompt here and I can just run a
Ralph loop again and again and again,
passing in a bunch of issues and passing
in like the last X number of commits.
But, you can check out the repo to sort
of see the most up-to-date file on this.
I'm going to run, where is it? I think
it's PNPM Ralph. So, I'll run PNPM
Ralph. This is going to now spin up my
AFK agent with a max number of
iterations of 100. What it should do is
it will run out of GitHub issues because
it's going to close the GitHub issues as
it creates commits for them. But, at
this point, I can essentially just walk
away because, you know, we can see it's
like doing things in the terminal. It's
saying looking at the issues, directed
lead to action for Ralph, blah blah blah
blah. But, I can now have a cup of tea,
or I can go make a coffee or something,
or have my lunch. Or more likely, I can
just open up another terminal and enter
another grilling session. So, for folks
who say this approach seems really,
really slow, what you need to understand
is that it's slow because you're trying
to extract ideas out of your human
brain. And while this is happening,
you've got AFK agents running in the
background implementing your previous
grilling sessions. This is why this is
revolutionary because, like, once we've
completed thinking through the idea, our
work is kind of done until we actually
QA the outputs. My friend Jaman on
Twitter called this the day shift and
the night shift, where I'm doing the day
shift, I'm like, you know, thinking of
ideas, I'm grilling with the LM, I'm
turning this into PRDs, and turning
those PRDs into issues. And then the LM
takes the night shift. Claude goes and
actually implements this stuff AFK. So,
I'm going to take a little break. I
might even go for a little walk, and I'm
going to just wait and check back in
with this once it's done.
Okay, we are back. It is like an hour
and a half later. I, you know, went for
a walk. I went and had a cup of tea with
my parents. Uh, yeah. Let's see what
it's done. So, we can see that the agent
signaled completion after five
iterations. So, we essentially ran
cleared Claude code agent five times in
the repo, and it should have produced
for us, yeah, I think six commits here.
I think those commits, one of them might
be one that I just haven't pushed up
yet. Yeah, we can see the entire like
commit history here. It's been leaving
really nice detailed commit messages for
us, and it should be yeah. I think this
was the update that I pushed before or
haven't pushed so far. So, at this point
in the process, I need to um kind of
look back over these commits. I'm kind
of tempting to look over the code, but I
think I just want to review the
implementation first. going to open up a
new Claude session, and I haven't come
up with a skill for this yet. I so, I'm
just going to sort of free blast it. So,
I'm going to say, "Take the last five
commits and create a QA plan for me.
