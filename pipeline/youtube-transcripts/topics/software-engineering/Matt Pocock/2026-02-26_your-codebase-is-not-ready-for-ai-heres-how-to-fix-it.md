---
video_id: "uC44zFz7JSM"
title: "Your codebase is NOT ready for AI (here's how to fix it)"
channel: "Matt Pocock"
topic: "software-engineering"
published_date: "2026-02-26"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=uC44zFz7JSM"
duration: 530
word_count: 1854
---
AI imposes very
strange restrictions on your codebase. And
most of the codebases that
exist, probably including yours
, are not ready. Your codebase,
much more than the prompt you used,
much more than your agents.mmd file,
is the biggest influence on
AI results. And if it's poorly
designed, it can cost you dearly in
many different ways. It could
mean that the AI ​​is not receiving
feedback
quickly enough. So, he doesn't know if what he
changed actually did what it was
intended to do. You may find it very
difficult to understand things, find
files, and even figure out how to test
something. And finally, it can lead to
cognitive exhaustion as you try to
keep the AI ​​connected to your code,
patching everything and trying to
remember everything. And my thesis here is
that software quality matters
more than ever. In other words,
how easy it is to change your
codebase has a big impact on how
the AI ​​proceeds to change it. And what
we've known about
software best practices for 20 years
remains truer than ever. And
if you're interested in improving in this area,
then check out my newsletter,
AI Hero. I'll teach you everything about
AI programming, but this isn't
for "vibe" programmers. This is
for real engineers solving
real problems. And if that's you, and you
're not sure how to handle these
new tools, then you're going to
love it. Now, let's imagine that this
here is our codebase.
Each of these small squares
represents a module. And this module
could export some functionality.
You could export a function, some
variables, or a component, if it's
something like React or frontend.
I want you to imagine that this is the
image of your codebase that you have
in your mind. Now, within this
you could have some
vague groupings of different functionalities.
For example, here you could have a
thumbnail editor function and
all these different modules
contribute to it. You could
have a small video editor function here
or something like that. Below is
all the code related to
authentication. Up here there are a
bunch of CRUD forms for
updating things, maybe in a CMS. And
here are a couple of
example functions that I haven't bothered
to think of examples for. Now, this map I
've created here of all the
modules located in this
particular codebase isn't
really reflected that much in the
file system. They're all really
mixed up together. If I simply
want to take, say, an export
from this module and import it into this
other module, I can do that.
Nothing can stop me. And then, what
you could end up having is a
lot of disparate relationships between
things that are not actually
related to each other. Now, you
as a developer understand the
mental map of all these modules, but what
the AI ​​sees when it first enters
your codebase is this. It does not see
all natural groupings or
all natural relationships. What you
see is a bunch of disparate modules
that can all be imported into each other.
That's because AI, when it enters your
codebase, has no memory. He has not
experienced your codebase before. He's
like the guy from Memento who just
walks in and says, "Okay, I'm here. Uh,
what am I doing?" So my
first assertion here is that you need to
make sure that your
file system and codebase layout
match that internal map you
have of it. This is because if
you describe something in the
video editor section and use it via a
prompt, you'll want the AI ​​to be able to
find it easily. AI will not
come in knowing every function, every
module, what they are supposed to
do, and how they are linked together. And
the best way I've found to
do that is with deep modules.
Now, the in-depth modules come
from this book here, which is a
philosophy of software design. And
the idea is that to make your
system easily navigable,
easy to change, and also easy to
test, you have a deep module, that is,
a lot of implementation controlled
by a simple interface. What that
means in terms of our
graph is that, instead of many
small modules, you end up with
large blocks of modules with
simple, controllable interfaces, and
this means that any
export of these modules must
come from that interface. When I read
that about deep modules, I
immediately thought of putting AI
in charge of these modules, because it's
an opportunity to introduce a
kind of unification into the codebase. I do
n't really care what's going on in here
, which is the
implementation. I only care about what
happens in the interface, because the
interface, which is, you know, the
publicly accessible API of this module
, I can carefully control and
apply my own taste and design to. And then, what's in here
, I can
delegate to an AI to
control, and I can write tests that
completely block the module in
terms of its behavior. So,
these are not just deep modules
with simple interfaces, but also
grey box modules. In other
words, I don't actually need to look
inside these modules. I can do it
if I want, if I wish to influence its
outcome, if I need to give a
personal touch to the implementation or improve
its performance, but as long as the
tests are good, I don't need to
worry about what happens inside.
Now, this has three
huge benefits. The first is that I can make
my code much easier to
navigate. Let's say, for example, that
we'll call each of these
services, right?
Video editing service,
thumbnail service, whatever. If I document
each one within its own folder and
have the public access interface
quite clear in a types section
, then the AI, when exploring my
code, can see all these
distinct services in the
file system. You can read and understand the
types they export before looking at the
implementation. And then you can say:
okay, I've seen the interface. I understand what he's
doing. I don't need to look inside
because I can simply trust what it
gives back. In other words, we have
designed our codebase for
a progressive revelation of
complexity. The interface is located at the
top and explains what the
module does; When we need to, we can
look inside, make changes, or
analyze it to understand its
behavior thoroughly. The second is
that we reduce cognitive fatigue
when managing this codebase. As a
user, I can say: I need some of, I do
n't know, this invented function or,
let's say, the authentication part
here. Let's see what the public interface is
. Let's take it and use it. And
instead of thinking about the
interrelationships between all these
modules, I can only keep about
seven or eight blocks in my head and
think: well, the AI ​​manages what's
inside. I only need to worry
about designing the interfaces and how they
fit together. Of course, this
is light years away from "vibe coding",
because you have to apply judgment to the
limits of these modules. You need to be
very good at deciding what to include in
each module. And what you really
want to avoid are lots of
small, shallow modules, which is pretty
much what we had up here,
right? Each of these modules is
, of course, interrelated and
grouped, but in reality they are many
small and superficial modules that
can be tested in these
tiny units, making it very difficult to keep them
all in your head. So, by
simplifying the mental map of the
codebase, we reduce the
cognitive exhaustion involved in managing this
code. And again, this is nothing
new. This is a
software practice from 20 years ago. And the third one
here, I mean, I'm really just
repeating myself, but this is what we
've been doing all this time.
This is how
good codebases are supposed to be designed.
So, what works here for
humans is also great for
AI. We need to stop thinking of AI
as this super-powerful developer
that, you know, is going to reach AGI and
understand that it has some
strange limitations. And the limitation is that it's
a new member in your
codebase. So you need to make
your codebase user-friendly and
ready for new members
, because you'll be creating like 20
new ones every day, or probably more,
just for them to look at your code and make
changes. This means that
your codebase map should be easy to
navigate and should be strengthened by
using these modules. Now, some
languages ​​make this easier than
others. For example, in TypeScript and
JavaScript, it's not actually that
easy to make these services and
modules have these limits in this
way. I want to make a
quick mention of Effect, because I posted a
video about Effect a few months ago. In
fact, I'm using Effect a lot more
than before, and it makes this kind of
code modularization
really easy. The last thing I
want to say here is that you should think
about these modules, how you affect them,
and how you design the interfaces in every
coding session you do.
That means that, from the
early planning stage, when
you write your PRDs or when you turn
your PRDs into implementation problems
, you need to think about the modules you
are affecting, the interfaces, and
how you are going to test them, because
testing and
feedback loops are essential for
an AI, because, of course, they are
essential for a new member
joining the code. If you want the
new member to contribute
effectively, you need a
well-tested codebase so they can see what
their changes do as they
propagate. So that's my opinion
for today. Your codebase is probably
not AI-ready
because you're not using enough
deep modules; Instead, you have a network of
interconnected,
superficial modules like this, which are very
difficult to navigate, test, and
keep in mind. Now, if you
like this, you'll definitely love my
newsletter, where we
delve much deeper into topics like
this. Thanks for watching the video, friends.
What else do you think is needed to
create a large codebase for
AI? I love this metaphor of
deep modules, but I know it's not
the only one that exists. There are many others out
there. Thanks for watching the video and
see you very soon. So, when
you think about your AI codebase,
what are you thinking about? What kind
of books from 20 years ago do you want to
recommend? Leave it in the comments.
It's the easiest way to stay up to
date with all my content, and the link
is below.
