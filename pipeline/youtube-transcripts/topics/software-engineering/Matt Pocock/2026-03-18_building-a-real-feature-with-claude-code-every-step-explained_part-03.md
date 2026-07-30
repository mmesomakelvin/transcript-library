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
word_count: 2243
chunk: 3
total_chunks: 3
parent_video_id: "hX7yG1KVYhI"
---
Save that QA plan in a GitHub issue. The
QA plan should give me a step-by-step
guide on how to test every single part
of the new implementation." This is
something I've been sort of playing
around with adding into my skills
because I think it does make sense
almost in every single sort of uh
user-facing change. And while it's doing
this, I'm going to rebuild the
application and rerun it locally so that
we can see exactly what's happening with
it. Okay, so it has created for us a QA
plan. Beautiful. Now, I have to say
there is nothing more boring than
watching else or watching someone else
do QA. So, what I'm going to do is just
walk through this um myself, and I will
come back to you if I have any issues.
Okay, the first one actually came super
early on, which is pressing this add
course modal. I can see now there's two
tabs in here. I actually really hate
this. Like, I just want uh every time
you add a new course, it should be a
ghost course, and I don't really like
the ghost course terminology appearing
in the UI. So, what I'm going to do is
exit out of this, and I'm I've got a
little feedback button here, which you
can see if I just remove myself there.
This feedback button, I can just
describe my feedback in detail, and then
it will create a GitHub issue for me,
which can then be picked up by the Ralph
loop. So, I'm going to say, "When I open
the add course modal, I want the only
option to be to add a ghost course. And
I don't want the ghost course to appear
in the UI. It should just look like
we're creating a course and then it
creates a ghost course. So, I'll submit
this and when I go to the GitHub issues,
we can see that we've now got a new
issue saying hide ghost course option
and add course model create ghost course
silently. So, I actually used high code
to generate me a title here and then
we've got the route it was submitted
from and then what I said in the
feedback button. This is how I do QA.
This information is enough for Ralph
[snorts] to do a really nice job here.
So, I'm actually going to start my Ralph
loop as I'm going here. I'm going to go
back to the QA plan and I'm just going
to add a comment to this and I'm going
to say Ralph loops should not work on
this one. This is a human in the loop
task only. Well, in fact, I'm just going
to rename that first one to AFK in fact.
I've got something in my prompt that
says if there's a human in the loop like
label on it or it looks like it's for
humans, don't work on it. And so, let's
go back in here. Let's run PNPM Ralph
again and it's going to actually work on
that issue while we're QAing other
stuff. So, I'll go back to doing a bit
of QA and I'll see you in a second.
Okay, a new thing is when I create a
ghost course here and I say new fun
course for instance, then when I press
create ghost course, nothing appears to
happen. But actually, as you can see in
the top left, oh, first of all, we get
the weird minified React error. So, I'll
just copy and paste that for the
feedback form later. It does actually
create the course, but we don't go to
the course and the model doesn't close.
So, let's add this back into feedback.
When I create a ghost course, it doesn't
direct me to the new page and it shows
this error. There's also no loading
state present on the button, which looks
confusing uh from the user's
perspective. So, let's submit that
again. The agent that we kicked off to
fix the previous bug is actually already
finished, so let's just kick it off
again and I'll keep QAing. This time I
won't interrupt. I'll just kind of keep
going through the issues and uh
attempting to fix them with Ralph in the
background.
Okay, this one I did think was showing
off here or worth showing off rather.
When I see a new ghost section inside a
ghost course and I right click here,
this create ghost lesson and create real
lesson doesn't seem right to me. I feel
like when I go into like create ghost
lesson here or create I just want an add
lesson kind of thing. We've already got
a modal here. What we should do is just
have a checkbox that says also create
this on the file system. So this is
something that came up in our early
discussions about this feature that kind
of like I couldn't get of sense for
which way to go until I saw it in
reality. So that's the way that
something's go sometimes. We could have
had an extra design phase or we could
have had an extra prototype phase, but
you know, I don't mind just jumping to
code and fixing it there. So I will add
some feedback for that, but I'll spare
you hearing my dictation.
All right then, I've walked through the
QA plan and I have created uh seven
issues here over the last uh or six
issues over the last 8 minutes. We can
see that while I've been QAing, Ralph
has been going in the background and is
fixing the issues. Most of these issues
are bugs, but some of them are features
that we just didn't think about. So for
instance, when we're deleting real
lessons, we want to add a confirmation
model to make sure that it doesn't just,
you know, like um
we don't accidentally click it and it
deletes or whatever. There were
certainly some showstopper bugs here.
For instance, if there's if it's not a
Git repo, uh then it gets into a super
weird state. Yeah, if the course repo's
not a Git repository and anything about
that fails, then we should walk back the
creation of the directory inside it
since the directory and file system and
the database will then be out of sync.
something again we didn't think about in
the grill me session at the start, so
we're now having to find out about it in
QA. It's this kind of stuff this kind of
stuff that makes me think that like the
specs to code approach is just never
going to work because when you're in
there, when you're in the QA loop, when
you're iterating towards something, you
are going to find little weird edge
cases like this that is really hard to
plan for before. Anyway, rant's over.
The point here is that I've now done a
extra QA step. Uh Ralph is now going to
chew through these issues. I can
probably actually close this QA plan. on
I might want to reopen it if I like um
sort of want to redo it, let's say, but
the behavior has slightly changed. So,
I'm closing it to take it out of Ralph's
or or rather the agent that I'm using's
context, so it doesn't look at this as
like the the source of truth for what
it's supposed to be building. Either
way, I'm going to go do something else,
and then we'll see what happens to Ralph
when it comes back.
Okay, we're back, and we've got
iteration eight, which is very nearly
complete. This looks like the final
issue here where it's just adding the
confirmation modal with file details
when deleting real lessons. We can see
we're up to 14 commits that have been
added kind of in this entire feature
build as we've been going along. And the
issues here are very nearly closed. You
can see I last opened this one 30
minutes ago, so that's how long it's
been running kind of. One thing I would
like to add here is potentially
parallelizing these Ralph loops and sort
of having like a team of agents working
on it at once. But to be honest, it's
quite nice having these gaps because it
means that I get to do some deep focus
on something, for instance, like
grilling me on something, and then later
I can come back and sort of come back to
code and do a big QA session, send it
off again, you know, you get the idea.
Something that's crucial to the success
of these Ralph loops is making sure it
runs tests and types on every single
commit. We can see that in most of these
loops it's adding tests, too, so it's
updating the reducer test to cover the
new action. Now, it's committing and
closing the issue, so we should be
nearly there. Okay, and we are good to
go. I'm going to
rerun the build, and let's do a little
bit more QA. And I'll spare you the
extra QA step here, but suffice to say
what I would do from this point on is I
would go back here and I would continue
QAing it, find more bugs, and at some
point I would call this done, and I
would stop working on it. One thing
that's great about having this really
flexible backlog approach is that
anytime I could just queue up a bunch of
bug fixes, and it would go in and fix
them. Let's just check one thing, which
is we can see that the add lesson now it
no longer says ghost lesson and real
lesson and we can see here it's saying
create on file system in a little
checkbox. If I go foobar and I say
create on file system, then it's going
to add the lesson and we should be able
to see once that's done. It's quite slow
that, isn't it? I'm interested in why
that's quite slow, especially because
this is all local. It should now be
complete and it creates that foobar as
the second lesson. So there we go. We
are, by my count, which is not entirely
accurate, it'll be about 42 minutes into
the video at this point.
If you're here, thank you so much for
watching all the way to the end. What I
hope you take out of this video, I'm not
sure to be honest. Like this is so much
looser than the videos I usually put
together, which are usually fairly
tight, focused on a specific goal. I
hope that you're able to pick up some
vibes from me in terms of how much
detail and how in-depth I look at the
stuff that I'm producing. You can also
notice how little I looked at the code
really. Like what I'm doing here is I'm
reviewing inputs and outputs. I'm
interested in the code, absolutely. I'm
interested in how the interfaces are
changing, I'm interested in how the
modules what the modules are sort of
looking like. And every so often I'll go
and have a little poke around in the
code just to make sure it's on the right
track. But for me really, what I'm doing
is reviewing the outputs that come from
AI, passing more information to it and
getting into a tight loop with it. And
crucially, because I'm able to run the
run Claude AFK, I'm able to parallelize
my own QA with the fixing of the bugs,
you know, which is just amazing. I
imagine though you have just dozens and
dozens of questions. Um feel free to
ping them into the comments below. Or if
you want to learn this from the ground
up instead of just diving through this
messy video, then the cohort is the
place. This one starts on March 30th,
but if you're seeing this sometime in
the future, then there'll probably be a
place you can sign up for the next one,
too. This has been the last kind of two
months of my life really, full-time
working on this. And I'm so proud of how
it's come together because everything
that you see here in this sort of big
video has come from me thinking about
this stuff deeply and the cohort is the
kind of perfect encapsulation, the
easiest way to learn this from the
ground up. Anyway, thank you so, so much
for watching. Thank you for getting to
this point, and I'll see you in the next
one.
