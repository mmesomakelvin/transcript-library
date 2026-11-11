---
video_id: "M5IkdUunf8g"
title: "Stop putting secrets in .env"
channel: "Syntax"
topic: "ai-llms"
published_date: "2026-03-09"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=M5IkdUunf8g"
duration: 2829
word_count: 4000
chunk: 2
total_chunks: 3
parent_video_id: "M5IkdUunf8g"
---
the last couple years, all of my
Cloudflare worker stuff, they do a
really good job at typing your
environmental variables. And they have
this they have this new thing where it
will just auto-generate for you and it's
all beautifully typed. And you just
import ENV and like I'm like, "Oh, this
is like a nice experience for
environmental variables." It sounds like
this is a lot
like maybe even better, right? You can
you can have everything fully typed.
Yeah, and you get and it's
self-documenting, too.
So, there's a we have a docs decorator
where you can give it a URL, so you can
literally like link out to
documentation. So, when you
you know, you hover over that variable,
you get the nice intellisense with a
description and a link to the docs. So,
it's it's a nice sort of onboarding tool
for new developers or debugging tool, as
well.
Yeah, like the intellisense is pretty
awesome. Like and it's
it's
just not possible to get this from
something like Zod, right? Zod is doing
all this crazy magic TypeScript voodoo
to extract like the the types from this
big crazy schema. We just generate a
normal TypeScript like file. And each
one of those the when you look at it,
like the comments are really long
because we actually also have like a
little SVG in there. So, we use like
Iconify. You can attach an icon to
everyone, too. So, it's like you hover
over the like whatever Google API key
and there's like the little Google logo.
Like it looks really slick. Uh and it's
just it's to a level where you would
never do it yourself, but it's just when
you're actually using it, it's it's
beautiful. Yeah. And you can picture a
world where, you know, some of these are
vendor-provided and you know, you don't
even have to write them by hand. Like
we'd like to
get eventually get there, like have a
big schema registry for off-the-shelf
stuff. Yeah, right. That'd be cool.
Yeah, I was wondering about that. I I
love the the decorator syntax, honestly,
because it's really readable. I was just
seeing the one that was prevent leaks.
What is that doing? That that's like
it's seeing if your var is used in an
HTTP request and then throwing an error?
That's
&gt;&gt; So we do we do two things with
sensitive, you know, we know exactly
which values are sensitive and we know
the real value. So we're not trying to
do any like oh this thing looks like an
API key, so we better be careful with
it. Like it's like no, this is the API
key. And there's there's two things we
do
currently only in JavaScript, but
we patch global console methods to
automatically redact that value if it's
written out Oh, man. Yeah, that's great.
And then we also do that if you do var
lock run like it's it's redacted in
standard out and like sort of on the
way.
The other thing that we do is we patch
global
what is it? Server response and response
objects so that if like say you have an
express server whatever anything
basically
if you return one of those sensitive
values in the outgoing HTTP response, it
will block you.
So like especially if say you're writing
an MCP server, right? That needs access
to a bunch of sensitive keys.
It's probably not going to leak
anything, but this is just an extra
layer of protection where you know, it
is physically impossible for it to leak
it.
Yeah. Or in this sort of RSC world where
it might be hard to reason about where a
component is rendered in that tree
on the client or the server and then you
know, you change one dependent in that
tree and all of a sudden it's now
rendered on the client. It'll prevent
that. Oh, that's great. Yeah, I mean
it's it's just so easy to do the wrong
thing and it's like why do I have to
know all the rules and how to which
things I should put a prefix on? And
it's like let's just make it so you
can't shoot yourself in the foot. Make
the easy way to secure.
&gt;&gt; easy to do the wrong thing and which is
what I like Yeah, what I like about this
whole setup anyway.
&gt;&gt; You know what you guys should do and I
know that we shouldn't be putting them
in dot ENV files. One thing that I I
tweeted about many years ago is like I
when I'm recording courses, you got to
make sure you don't actually tab to the
wrong dot ENV file.
We I saw a couple couple weeks ago
somebody was streaming and they're they
they tabbed to the wrong
tab and then their their key was on
there and somebody racked up a $3,000 AI
bill just in in like an hour or two,
right? Like it's so quick to do those
things. And John Papa made a VS code
extension that is called cloak Yeah.
&gt;&gt; which it basically just like blocks them
out so you can you can show your dot ENV
file but you can't actually look at
them.
But it stopped working, hasn't been
updated in four or five years. You guys
should like fix that Chrome extension
and then just put a huge banner Yeah.
and be like you shouldn't be doing this.
Stop doing this. Yeah. Stop doing this.
Use Varlog. Yeah. The official one
password VS code extension I I believe
does that with a little bit of
setup. Oh, okay.
Yeah. There's a few more extensions I've
seen pop up now lately. Um
Yeah, I mean that the something I wanted
to talk about was like because AI coding
is so much easier now, the rate of like
hey, I built a tool that injects
environment variables or validates
environment variables or you know,
encrypts them and you can send them to
your teammates. Like they're popping up
literally every day. There's a new one.
It's insane and which clearly shows that
people are not satisfied with the
tooling as it is today.
Yeah. You know, I think a lot of them
get it wrong where they're like hey, I
built a tool. It checks to make sure
that your example file and your real
environment is like still in sync. It's
like
no, you still have the same problem.
Actually use a schema. Actually load it
so it can never be out of sync. Like
just remove the problem. Let's talk
about like
just like AI agents in general, right?
Like you're using Claude code or open
code or Gemini CLI, any of these things.
In some cases, it's nice for them to
have environmental variables, right? And
and I haven't seen a really good way of
how to like necessarily inject those
things. What's your take on that? Yeah,
I mean we
I I think we have a pretty great
solution for that. So like you can do it
with Varilock run
and just load the ones you need and pass
those in.
I think Theo has a quick demo if you
want to see it, but we we don't have to
do that now. Um Yeah, no I I would like
to see like what that process is like.
And I can I can talk a bit about that
while he's setting that up. Like I think
the difference there, especially with
Claude, is like those secrets might not
necessarily live in a repo, right? Like
those might be sort of like outside the
repo because you want to
you know, for example, the way we use
it, we need to pass in the sort of like
Amazon Bedrock config so we can use that
for our Claude instead of the default
thing. So that doesn't necessarily live
in the repo, it lives
in the invocation of Claude, right? So
you can you can stick that in your home
folder and just pass that in when you
when you load the when you load Claude.
Yeah, so I mean there's there's a a
bunch of different parts of this
problem, right? But this is one specific
part which is like I actually just need
some keys to run the AI agent itself,
not like that the AI agent will need. Um
but I've got this .env.claud file that
lives in my home folder, right? And it's
using a a plugin to say hey, I'm you
know, I want to be able to talk to one
password. Uh I initialize it with some
settings.
I have my function that's going to fetch
that from one password, you know, I mark
it as sensitive, some other
configuration, right? And then in my
sort of, you know, setup, I have an
alias for V Claude, which calls varlock
run, points at the
.claud file that's in my home folder,
and then runs Claude. So,
like, that is obviously it's only part
of the problem, but this lets me have,
you know, a centralized place outside of
the context of one repo to fetch these
environment variables, feed them to
Claude itself. Which like, I think is
just super handy, right? As soon as As
soon as I had it set up, I've been using
it all the time, and it's awesome. And
those variables could be, you know, off
keys for MCP servers, or anything, you
know,
downstream of Claude itself.
&gt;&gt; Yeah, I mean, obviously then there's
then there's like the next part of the
problem, which is like,
how do you,
uh, you know, how do you limit sort of
the agent from having access to things,
and you know, there's
there's some different things there.
Like, you could use a proxy. Yeah, at
the very least, you can limit what
environment variables are passed to it
in the first place.
Um, that's something that you can do
with us.
Ben, uh, at Modum is just using it for
Bodbot, which is sort of like his open
claw, you know, teammate kind of thing,
very cool.
&gt;&gt; about Ben Vinegar? Yeah, we are.
Uh, former Syntax, uh,
team manager, Ben Vinegar. Yeah. Yeah,
shout out to Ben.
&gt;&gt; So, he just he just started using, um,
this for to run Bodbot, right? And he's
got all these different keys that his
that the the bot needs, right? So, at
least having that schema there, it's
very clear what's there, what are the
types, you know, explode if they're not
if they're not correct.
&gt;&gt; Yeah, so I think there's there's two
sides to this, right? There's the
security guardrails we already talked
about to prevent the secrets from being
leaked to the agent. So, you know,
getting them out of plain text, and then
preventing leaks in those HTTP
responses, in your your console log
statements, etc.
And then,
I think
one of the big benefits is schema-driven
approach. So, the the agents themselves
are pretty adept at writing it because
it's, you know, a known
DSL that they can reason about, and they
have a the CLI method they can call to
validate the output. So, you know,
schema in, validation out. They They You
can write a pretty short quad skill, and
it it usually does a good job. That's
great.
&gt;&gt; Yeah. Yeah, and speaking of like AI
stuff, um I noticed you all have both an
MCP
and a LLMs.txt, which is just like, you
know, the docs in a text format. But,
what's the MCP doing for you all? It's
just a doc search. So, it's it's just
uh I believe it's
using the Cloudflare AI gateway and then
Auto Reg uh pointed at the doc site
itself. Um
so, just an easier way, you know, I
think I think if you just like pointed
at that server and tell it to install
Varilock and do the onboarding, it'll do
a pretty good job, but I probably need
to retest that cuz it's been a few
weeks. Sure. Yeah. A few weeks is a
lifetime here. I know. Yeah. I
appreciate you all having open code
config in your copy and paste uh config
for the MCP. So many people don't put
that in there. I don't know why. I think
open code's getting a little bit more
ubiquitous, but still uh Yeah. Great
Great Toronto startup. We We both spoke
at one of Ben Vinegar's events a few
months ago. Ben is Ben is the man uh
uh for sure. I actually have a quick
question here.
You have like GitHub uh
GitHub Actions integration.
I hate working with ENV vars in GitHub
Actions. What does this do for me there?
Yeah, so it's it's a pretty thin wrapper
on the CLI, but it allows you to do, you
know, just a quick validation in CI. Uh
so, you know, that would be the
equivalent of running I think it
actually is just running varlock load.
So that way you can validate your env as
a first step before you do the rest of
your workflow. Oh, I hate when my action
fails because the env var is wrong or
missing or something and I don't find
out till like the third step and I have
to sit and wait and like for me that
like feedback loop of like it takes so
long that I just like lose my mind with
that stuff. Yeah, and then you get you
get a nice pretty printed redacted
output. Right? So you can see what key
was missing or which one failed
validation. And if in the case where
you're using, you know, GitHub secrets,
you can just go in and paste in the key
you forgot or whatever.
Sick. That sort of output in CI to show
you what is the current state of all
your environment I have found extremely
useful. Um, you know, it just it's such
a nice debugging tool to be able to go
and see what what was actually going on
here cuz, you know, in the past you'd
just the amount of back and forth you'd
have to do to start, you know, logging
things and like then take it out of the
code is just such a pain. Um, and just I
did want to clarify one thing about the
GitHub action um is that like if you're
using a sort of, you know, say you have
like a whatever Svelte app or Next app
or some JavaScripty thing like you
probably don't actually need to use that
action. It's already built into your
code and you know, how it's loading and
everything. So like that action would be
just for
if you weren't really using varlock like
deeply tied into your code also like
otherwise
&gt;&gt; So if you're using varlock in your code.
You you're saying if you were using like
the Vite varlock plugin, not not just if
you were using a SvelteKit app off the
shelf.
&gt;&gt; Like or like if if you have varlock
built into your code base already, um,
then you wouldn't need the action. Like
you'd you'd already have it installed.
You could just, you know, you could
invoke it yourself. You can it's already
going to fail if your build fails at the
beginning. So it's Hell yeah. But But,
nice if you say if you have like a
multi-step workflow and you need to, you
know, thread an environment variable
through later steps, so it gives you an
easy way to reuse them, output them. I'm
curious what your opinions on like
secrets managers are and like like
should we be using them? I know some
people have like services that they use
and like you've got a thousand
developers and you can manage access to
them. Probably for smaller folks, just
throwing them in one password is
probably good, but it's like what do you
think about like signing up for
something and a having a place where you
can put all of your secrets?
We're big fans of one password. Um you
know, I think that even for a lot of
people that are using something else on
top of it, the secret still probably
lives in one password as the source of
truth. So, it's like
why not just use it as the source of
truth instead of copy pasting it?
Um you know, Vault is a nightmare. Um in
physical is a bit better. All the cloud
providers have their own things. Doppler
seems like
They're all fine, but they're all
they're all enterprise tools that would
only make sense if you are like an
enterprise and willing to pay all this
money. And so, like we wanted to build a
tool that would make sense to use even
when you're a solo dev and you're doing
everything yourself and then scales up
to a giant team and, you know, having a
lot of complex stuff going on. Yeah.
Man, and and and this is not anything to
do with Varlock, but I'm just curious if
you have any thoughts on it is I every
time I spin up a demo, I need to go grab
an API key from somewhere, you know, you
you log in to got to remember what the
open AI play like playground URL is or
like you have to do like slay the
dragons that is the Google
developer console
finding
They're just all so awful and and I'm
reminded of like some of these tools for
AWS to set them up, you have to like set
up a when I am rule that allows to you
to do anything and then then the tool
itself will act on your behalf. I'm
curious if you've ever thought about
something that will allow you to
generate API keys from multiple services
as you need it cuz I always want like an
API key from whatever and put like a $10
limit on it, you know, and just fussing
around. I don't I'm not reusing API keys
across projects cuz if that gets out
then I'll I'll have no idea
which one how that leaked, right? Yeah.
Yeah, I mean the the the holy grail of
all this is like automated secret
rotation and dynamic keys, right? So you
have a master key, right? That only
lives in say say that lives in
like we'll talk through the CI case,
right? So let's say you have a master
key that lives in GitHub, but as part of
the like deployment CI run, it's going
to issue a new key that has, you know,
less privileges and is only going to be
around for a little while. Um and it is
something that we're working on. Like
it's just it's tricky.
It's really tricky.
And like I'm sure a lot of like these
companies don't want you giving out API
keys as well, you know, like is there an
API for API keys to every business? No.
Open AI actually has one.
Oh, really? Yeah, which is it's slightly
terrifying because if you have a master
key, I believe you can just mint new
master keys. Just a whole bunch.
So don't leak those master keys.
Oh, yeah. Yeah.
&gt;&gt; Oh, man. So okay, so this is this
project is is is just like it's free to
install and use, right? Like what what's
the what's the
like
&gt;&gt; you guys make money? Yeah, what how
how's this thing going to stay afloat?
Is it sponsored or what's the deal?
Yeah, I mean we've we've got investors.
We've we've got runway. Uh, I I do think
anything like this that you're trusting
to put in your repo, you're trusting
with your secrets, it has to be open
source. It has to be I mean, most of it
has to be free. Like, I don't know about
you, but I would I don't think I'd I'd
be putting like a black box binary on my
computer and trusting it with my
secrets. Although, maybe maybe that's
not the case anymore.
&gt;&gt; Uh, we NPM install those every single
day.
And then it installs five more and then
takes your crypto wallets. Yeah, I mean,
long-term obviously like there's a
secret management play here. Um,
today we're kind of, you know, that
platform platform agnostic control plane
that sits in front of all of them. But,
you know, there's obviously a future
where we have our own offering there as
well. We're exploring some sort of
more enterprisey workflows right now
around dynamic secrets, secret rotation,
that kind of thing. Which, you know,
there's a pretty hefty cost to running
the compute. So, it certainly will not
be free.
Yeah. So, there's no like there's no rug
pull coming with the library, right? You
just You just install the library. We're
all good.
&gt;&gt; day one we we both agreed there will
never be a rug pull. Especially seeing,
you know, a company like HashiCorp lose
so much good favor with the community
after after doing that. Or, you know,
Redis, etc. All of these
licensing changes that never really
make anyone happy except the people who
make money from it. Yeah, but you you
can easily imagine our own hosted
secret, you know, sort of back end,
right? Uh, you can imagine uh, some
additional features around like logs um,
and policy, right? Like, so
ensure that none of my developers have
any
plain text secrets on their machine,
right? Like, you can imagine sort of
some of those enterprisey features. The
the automated rotation, dynamic secrets,
um,
but you know, we we we always were like,
let's let's start with just making the
tool useful for everyone. Yeah. Rather
than like, here's a, you know, secure
place to put your secrets. Now, have fun
wiring it into your code. Like, we start
on the other end.
That's awesome. Well, I definitely want
to give a shout out. We We recently
participated in the GitHub Secure Open
Source Fund
with a bunch of the like most popular
open source projects in the world.
It was really great to be, you know, one
of the smaller participants.
So, shout out to them. We just announced
that last week. Hell yeah.
&gt;&gt; Yeah.
Yeah, that rules. You know, I think for
a lot of people, like, if you're using
one password already, like, so many
people we talk to are using one
