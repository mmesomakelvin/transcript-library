---
video_id: "nzP_UcpaBZ0"
title: "My Minimal Zsh Setup Is Ridiculously Good"
channel: "Sam Natale"
topic: "software-engineering"
published_date: "2026-09-25"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=nzP_UcpaBZ0"
duration: 488
word_count: 1830
---
Okay,
welcome to another
video. Today we'll
take a look at some
cool things you
can add to your
ZSH configuration. We'll
look at a
super minimalist
configuration where I
only use
three plugins and I
have all the
features I need. So we
will have automatic
suggestions. We
will have a search in history.
We'll have nice
syntax highlighting. I
will have a good tip.
If you just want a
good tip, I'll
talk about it at the
end of the video. Now we
will create a nice
functional
shell that
will perform all the
functions we need.
So let's
move on to our
ZSHRC file. And now
we have a nice empty
file. The first thing we will
do is add a
plugin manager
so we can
install some
features to our ZSH.
So I will
use Zinit.
It's just a
super simple
plugin manager. I
installed it via
Homebrew, so this is how I'm
going to create
it in a ZSH file. And,
essentially, this will allow
us to install
plugins from different
plugin sources.
The first plugin
we'll look at is one
you may not have
heard of before. It's called
Deja, and it's essentially my
newest replacement for
ZSH's auto-suggestions, because
it's essentially the
same thing, but much
smarter. And before
you say, "Hurray-
hurray- wah," I don't want
artificial intelligence in
my terminal. Don't
worry, it's not
artificial intelligence. These are
simply smarter
automatic
suggestions based on
your
command history.
Everything
is explained pretty well here. It
uses fuzzy
matching,
directory recognition, and
command sequence prediction
to suggest
what you actually
want to run.
Let's just
show you how it
works in the terminal.
So, I just
copied this from
their GitHub. This is
the way they
recommend
initializing the
plugin, and we'll just
do exactly that and
then see what
actually happens.
So, I'll open a
new terminal here and
type make dir. I'm going to make a
typo.
So, for example, make dr.
And as you can see,
it's fixed with make dir
, and rip grep is suggested
, which is what I did
before. Let's say I
started typing tmux
but mistyped it,
so I typed tx, for
example. And as
you can see, after
typing mkdr tmx I can
automatically
suggest tmux. That's
it. So, basically, it's
very, very smart.
If you make
typos,
or just in general,
it just provides
much better
auto-
suggestions. Let's
look at another of
their functions. So
if I go into the
repository here,
I just have a
React project. I'll split
the terminals and I'll also
move into the Go project.
Now, if I start
typing a command
here, I can just
press Control N and it
will cycle
through some of the
suggestions that I
typically run in
this repository. And
if you look, I
usually run
Neovim, um, run dev,
etc., right? But if I'm in
the React project on the left,
if I run N, as
you can see, it suggests
yarn dev. So it
actually filters
suggestions based on
the repository
you are in. So,
this is another great
feature. The commands
you typically
run in one
repository or
one directory
may be different
from others, and Dedja is
contextually aware
of where you
are and will
give you better
suggestions based on the
directory you
are in. Again
, another great
feature. And everything is just
local, everything is on
your machine, it doesn't
transfer LLM or anything
like that. It's just a
nice, cute
algorithm. And I
actually
like adding
some keymaps here
. So if I
just add them, I'll
get some
Dedja overrides.
So, essentially, I'm
going to set
my Accept key to
control L instead of Tab
, as it is now. I'll
keep my cycle
gears and
just
get rid of the other gears because I
don't really
use them so I don't
want them to be
assigned to anything. And
now, basically, when I'm
in the terminal, I can
type, and if I
want to accept a
suggestion, I can
press Ctrl and L. But
my Tab key is still stuck
and
says it's staying
exactly as it
is. So now I have a
Tab key, which could
be like if I
press CD somewhere, I
use Tab to
move between
items, right? I do
n't want Deja Vu to
redefine that. So
I have Ctrl and L, which
looks like L 4 on
the right on Neovim, for example. So, that's
all for Deja Vu. I'll
stop
glazing them over, but
honestly, this is a
great plugin. Next
we have
syntax highlighting. Now everyone
wants
syntax highlighting right in
their terminal. This
looks much
better, much better
. So, I'll quickly
open a terminal here,
start with LS, and look,
it's colored, because it
exists. But if I
enter a command that
doesn't exist, well, it's
red, it doesn't exist, my
friend. Perfectly. This is so
useful in so many
different situations, and
it honestly
makes the UI UX so much
better. And as
for plugins,
I only have one. I'm
pretty boring. I'm
just adding a nice
invitation
called powerlevel10k.
This is an old but
gold plugin. I
mean, you could
use something
like starship if you
wanted something more
modern, but in my
opinion, the speed of
powerlevel10k is just amazing
. It is no longer
actively developed, but bugs
are fixed from time to time
. And, honestly,
it's just a
very mature code base.
And in terms of
features, it has everything
you probably
need. And this is the
invitation I have
. If you want to
create a similar
window, you just
need to type pkt
configure and you will simply
use
the services of a wizard
that will give you a
beautiful window. Then there's
one little
cheeky thing I
did at the end. Um
, I actually just
went into the Codex. I pointed
to my p10k file and
said, "Convert
this to the
Rose Pine color theme." Just a nice,
lazy way to
make your
P10K match your
color scheme. This is what
it looks like.
Okay, now that we've
covered plugins,
let's look at
some options you
might want in
your ZSH configuration
. So, adding
history will simply
cause every
command you
issue
to be added to your
ZSH history file. And
if I open
this quickly without doxing myself,
it will essentially just
show you your entire
command history. And that's how
your
automatic
suggestions
are pulled from that
story.
You'll probably
want to save this story too.
Sharing the
history means that
it will be shared across
multiple
terminals in different
directories, etc., etc.
History ignores
duplicates, making
it obvious that
any duplicate commands
in your history are not
saved multiple
times, they are simply
ignored.
Duplicates run out first, so that
means if you
reach your
capacity in history,
it will...Get rid of
the oldest,
sorry, but duplicates
will be removed first
, not the others. "
History does not find
duplicates" means
that
nothing that has already been
shown before will be shown because
it is a duplicate. "His-History
reduce spaces"
means that if I
type a command like ls
space space space, it won't
be saved as ls space space
space. It will get rid of spaces
. "No
beep" means that
your terminal will not
emit the
"beep-beep-beep" sound. "
Enable
append history" means
that every time you
enter a command, it
will be saved to the
history file immediately, not
when you close
the terminal. Another
addition, a nice
thing to improve the
quality of life. And while
we're talking about
history, let's
just look at
some of the useful
history stuff I've
set up. So,
obviously I have a
history file
stored in my
.zsh_history. I set the
story size
so high that
I shouldn't
reach it. Or if I
reach it, they won't
. will no longer be
useful to me. I would still
type them a few
times. Save
the story, another one.
Keep exactly what is written. And then
I have two
key bindings that
go up and
down my commands
if I need to.
For example, if I'm in a
new terminal, I
just want to go
to the last command
I executed, I can
just use
my Vim key and
bind it to
move up and
down. No problem.
Next in functions we
have FCF. So, I
use FCF quite often
in my terminal.
So if I'm in a project
and I want to find a command
that I've
used in
the past, I can
just press Control
and R. And now I can
search through all the
commands
with a handy
fuzzy search. It's
much easier, um
, yeah. And if you
need the layout that
I just showed, it's
just these
configurations right
here. And we're basically
there, now. I'll just
show you some
aliases that
I have to show
you some quick ones that
I could
recommend if
you want. So I
just
remap everything
so I have ls-a or
ls-l just on ls, la and ll.
So, basically ls, la,
ll. And this is just a simple
way to do it. I
use eza because it
looks
nicer, and it's
basically the same thing,
just in a different
way. I also
use eza to
just type tree in the
terminal and I can
easily see the
tree of the repository
I am in.
Instead of using
cat, if I
use cat,
let's go to the
readme file for the wallpaper.
So, here's what it
looks like. It's just that I
can flip it
with HJKL and it's
just a prettier cat
and it's bat. Uh, rip grep, I
just set
it up to use
color, so if I
rip grep for vim, I
have my nice colors and
so on there. And I also have
a few lazy ones, i.e. N for
neovim because it's just
faster, LG for lazy git because
it's...faster, uh, TMS for
tmux sessionizer, etc. So,
this is my
zsh configuration. It is very simple.
What is this? 60 lines, 62
lines, three plugins.
Yes, this is just a nice
minimal
configuration and that's
literally all you
need. You just
need something that
will allow you
to easily view your
search history. You will
receive good
offers. Just
makes your life easier,
right? I hope
you enjoyed
today's video.
If so, hit the
like button
below and also
subscribe while you're
there. Why not?
See you
next time. See you later.
