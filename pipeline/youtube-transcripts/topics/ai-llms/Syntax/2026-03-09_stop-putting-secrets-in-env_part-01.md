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
word_count: 3999
chunk: 1
total_chunks: 3
parent_video_id: "M5IkdUunf8g"
---
Welcome to Syntax. If you have a .env
file sitting on your computer, this is
the episode for you because we're going
to talk to you about why you shouldn't
be doing that. My name is Wes Bos and
with us today we've got Theo Ephraim and
Phil Miller. They work on Varlock, which
is a solution, a library that will help
you inject your secrets into your app
and into your coding agents. But
we also just want to like talk about
just like why is everyone just putting
that text files on their computer with
all of their secrets when we have all of
this
like logging into notion for me is like
a ritual where I have to like use a
thousand things and there's there's beep
boop boop and pin codes and everything
and then then we just put the like
database string in a .env file. So,
welcome guys. Thanks a lot for coming
on. Yeah, thanks for having
&gt;&gt; Thanks so much for having us. So, let's
start there. Yeah. What's wrong with
.env files? Yeah, I mean why don't we
first just talk about like, you know,
you have these files sitting there.
Often you're putting plain text secrets
in there and you know, maybe you don't
have any like super sensitive production
secrets in there, but you still probably
have some or you know, maybe you needed
to run some script that connected to
production, so you put it in there once
and you know, you forget that the file's
even there. And you know, especially now
in the era of AI coding agents where
they're just reading all your files,
slurping it all up, sending it off to
some server. Like the only real safe way
to ensure that they're going to be not
sent up to you know, Open AI is to get
them out of plain text altogether. To go
back a bit to to answer your question, I
think the reason they're sitting in
plain text is because every tutorial on
the internet, the first step is put the
secret in plain text in a .env file and
then then do the rest of the tutorial.
Um so, everyone is still telling people
to do that even though we know that it's
wrong. And then we copy and paste those
files on Slack, right?
&gt;&gt; Yeah. I think that even the harder
challenges is for the most part that
most people don't even know of a
different way to do it. Like that's just
the way, right?
&gt;&gt; Yeah.
&gt;&gt; Or the way that the way the easier way
or sorry, the right way is like such a
pain, right? Or has seat fees of, you
know, $20 per developer per month. So
it's like you're like, "I could do it
that way, but it's just not worth the
hassle." And people like to say that
they do, you know, security best
practices even if they don't always do
them, right? They're going to choose
They're They're going to choose the path
of least resistance, especially if it's
a last-minute thing, right?
&gt;&gt; Yeah, I'll I'll give you an example. Um
so uh me and Serge were working on the
Mad CSS website and and he was sort of
like scaffolding it out and and building
like kind of the first run of it. I had
some like GitHub secrets that uh for
like the login, right? And like I threw
them in one password as an environment.
And then he went through it and he's he
said he spent like half a day just
trying to like get them injected with
the like one password CLI thing. And
then he ended up just being like "Screw
it, you know, I can't get it to work
with like these two specific things."
Um which I think happens probably more
often um where people are just like,
"Ideally, yes, I would have something,
but it's it just doesn't work as well.
It doesn't work with my setup and
whatnot." So like what is What What is
the solution here? So.
&gt;&gt; what should we be doing? So like let's
also let's go back a second and just
talk about like .env.example cuz like
regardless of how you're shoving stuff
in there, like the common way is like
okay, at least we have a .env.example.
That's clearly better than having
nothing, right? It's clearly
well, arguably better than having it,
you know, buried in a readme in a custom
table. But like what are the What are
the problems there, right? So like you
open it up, it's a mix of half of them
Half of the values are real values that
should be used, right? Like a port
number or some feature flags or things
like that. And half of it is like a
placeholder that's like your put your
key here, you know, talk to Bob to
provision a key, right? It's unclear
which are real things to use, it's
unclear which are placeholders. Like the
the utility of having an example there,
depending on the item, is arguable. And
then you copy-paste this thing
and now you suddenly have this like
problem of trying to keep these two
things in sync, right? You don't have a
single source of truth. So, like half of
the you know, there's documentation in
that file, there's also documentation in
your validation code, if you have it at
all.
You have maybe have type generation, or
maybe you're hand maintaining types. So,
like
all this stuff gets spread out all over
the place to the point where you just
say, you know what, if I can avoid using
this at all, I'm going to. So, you don't
put things that should be environment
variables or just like sort of static
config in there anymore. You just you
just put them in const, scattered all
throughout your code base. Dude.
I I you're just like speak you're doing
it. You're speaking exactly what I do.
&gt;&gt; Yeah, have you Have you been looking at
our code?
Oh my god. You just hit me. Yeah.
So, so the solution there, and this is
kind of how Varlog came into being, is
like, okay, rather than having a tool
that tries to keep your, you know, in
example or your schema in sync with some
other file that actually has values,
what if we unify this, so you have one
file that contains both schema
information and can set values
declaratively, or just have static
values. And what if we make it sort of a
unified toolkit to deal with sensitive
things and non-sensitive things, and we
understand exactly which ones are
sensitive?
So, Oh. that's kind of what Varlog is
all about. So, we it looks like a normal
.env file, but we use J S doc style
decorator comments. So, you can say, in
a comment right above the item, at
required, at sensitive, at type equals
email, at type equals string, starts
with whatever ABC underscore, right? So,
there's this very rich schema uh that
you can express through just these
comments that feel still familiar cuz
it's like a dot env file. Um and then
aside from the schema sort of stuff that
you that you use through comments, we
also have a function call syntax so that
you can declaratively say, "Go fetch
this from one password." Like similar to
the OP injector OP run or whatever,
except for that it's totally general and
you have a function. So, there's a
plugin for one password, OP whatever.
There's a plugin for AWS, for GCP, for
Azure, for whatever. And it's super easy
to write new plugins. So, you have this
sort of unified toolkit like
fetch it from here, validate it,
generate types, single source of truth,
documentation, everything all in one
place. The nice thing there is that you
don't have to put all your eggs in one
basket, right? So, you can use one
password for development or up to
staging, you can use secrets manager in
production, you can inject from Vercel
in production, whatever you like. So,
you're not sort of like tied to one
vendor for the actual persistence of
those secrets. Okay. So, I'm I'm looking
at it right now. It's a it's a
.env.schema
file that you I assume you commit to
your repo, right? Like this is something
that's that's allowed to go
into your repo. And then you declare the
types, which is really nice because like
like half the time like I try to get
somebody else spun up on a project, you
like "Oh yeah, here's here's what I
think you need in like the .env file."
And then they're like they run it and
they get an error, process.env.whatever
not defined, right? And your example is
out of date, all that type of stuff. So,
this really nice that you do that as
well as as the actual types. Um which is
also nice like you can describe starts
with dot like SK-
um because like somebody might call it a
token, somebody else might call it an
ID, and you're like, which one do I
need? Um that's that's really cool. So,
and then so everybody who's working in
your project then has the .env.schema
file. Then does everybody in your team
need to use the same way to expose
those? Like if somebody if one of them
uses one password, do they need to use
the one password as well? It's up to
you, right? So, there's there's you
could have it so that this only has the
schema and does validation, and then
you're putting values in, you know, in a
.env.local file that you're still
whatever copy-pasting, doing whatever
you want. You could in the schema
declaratively say, "Hey, go fetch this
from one password." and wire up sort of,
you know, each item to the right place.
You can load a whole bunch of stuff from
one password at once, like an as whether
it's an environment or a single item
that's like a .env blob. You could load
from, you know, a variety of other
places. Or like in production, you know,
often the first step of sort of
implementing this is
set this up, the validation will run,
but you're still going to inject real
environment variables from, you know,
the Vercel secrets UI, right? For prod.
And you're still getting that extra
validation, and, you know, especially
when it fails, now instead of getting
this weird runtime explosion
&gt;&gt; Oh, yeah.
&gt;&gt; that's like, this thing blew up. When it
goes to try to build or boot or
whatever, it's going to say, "Hey, this
environment variable is missing and it's
marked as required." or this thing
doesn't, you know, it's it's typed in
wrong. Yeah, I remember when I first saw
this, I was worried about like
production. But you're you're not
modifying the .env file, you're just
you're still copying and pasting the
.env vars in the Vercel or whoever's
dashboard the same way, but you are
still getting all the features. So,
that's
that's that's really
&gt;&gt; do either. You could do it you could you
could, you know, the first step would
be, "Here's a schema, run validation,
leave that stuff being injected how it
was before." The second step is, you
know, I want to actually centralize all
this. So, I'm going to move everything
to one password. And then on production,
you would just set one single key, which
would be like a service account token,
which enables it to talk to one
password. And especially if you're in
sort of a like multi-cloud,
you know, microservice situation and you
got a million things going on, like
centralizing everything into a sane way
of dealing with it is going to be, you
know,
much, much easier. Yeah, that makes a
lot of sense. I it it it's funny because
like when you first hear about like,
"Okay, we're adding we're adding a
schema to your ENV vars." Uh and, you
know, type-safe comments and all this
stuff. It all feels like maybe that's
too much for ENV vars. And then you
realize I hit every single one of these
use cases in which this would have made
my life better. Every single one of
them. And like the buy-in is like so
insignificant that like why why isn't
everybody using this? This is like it
feels like uh this is like kind of a
missing piece of technology, right?
One of the best feelings is when you
implement this and then you go and
delete all of that
code that's just checking node ends.
&gt;&gt; Oh, yeah.
&gt;&gt; So, you set a value in production or a
value in staging, all of that goes away,
right? What Theo didn't mention it
before is like you can have a
hierarchical set of files based on the
current environment, too. So, you could
have a a dev schema, staging schema,
production schema. They could either be
expressed in separate files or you using
some of our sort of primitives in one
file. Yeah. And so, you know, you can
you know, there's also like there's an
import syntax, right? So, you can import
from other places. In a mono repo, that
means, you know, you can have shared
stuff at the root and each service can
then import just the things they need
from, you know, it's it's very, very
flexible.
Uh
&gt;&gt; Yeah. So, what does that buy-in look
like for the import? Is it really just
swapping out your process.env imports or
whatever with uh varlock imports?
So, well, so what I'm talking about is
importing from within a .env file
importing another .env file, right? So,
there's a new root decorator at import,
you know, dot dot slash dot dot slash,
and that will import the the root .env,
right? Or you could import specific keys
from it. In terms of implementing it in
your code,
uh we have sort of drop-in integrations
for a bunch of different frameworks,
Vite, Next, uh
you know, Astro, all that. And you you
could continue to use process.env cuz
they are just injected as environment
variables, but we also have a sort of
a nicer helper that gives you uh coerced
values and better type completion. So,
like, if you mark something as a
boolean, then when you actually go, you
know, env. whatever boolean thing, it's
going to be true or false. It's not
going to be one or zero or true and hey,
check if this thing is a string or, you
know, all that extra coercion logic you
end up shoving in five different places.
All that just goes away.
Is Is there ever a standard Like, is
anyone working on a standard for this
type of thing? Because with with
Cloudflare, you you import env
um from Cloudflare Workers, which I like
better than just process.env, but I
don't like that because
then it makes my code like kind of
pigeonholed into
Wait, didn't Node doesn't Node do that
as well? You tell You're the expert.
I mean, you can use process.env. There
There's also import.env for
import.meta.env, right? And um
I I think why all of this really gets
confusing for people is because
in a front-end context,
there are no environment variables, yet
we use environment variables to inject
things like statically in a build time.
So, like, what even is an environment
variable and how are they used really
varies depending on what kind of
framework you're working with, what kind
of project you're you're with.
Um you know, we we really do try to
simplify a lot of that, so
we have this import-env from varlock/env
helper, and that does try to just make
it work in all cases. So, that works in
the front end and the back end, and it
does the replacements with Veet and all
that stuff. Mhm. One other cool thing,
like it does those replacements
based on your schema. So, you say, "Hey,
this is sensitive." Or it's not. It's
not based on some weird prefix, right?
And uh like it's a lot it's a lot more
explicit uh in terms of what you what
you want it to be doing.
Yeah, it's not just this this random
thing that's available in the air. Like,
where does where does process come from,
you know?
Yeah. Yeah. And if you want to see all
of the errors in your application,
you'll want to check out Sentry at
sentry.io/syntax.
You don't want a production application
out there that, well, you have no
visibility into in case something is
blowing up, and you might not even know
it. So, head over to sentry.io/syntax.
Again, we've been using this tool for a
long time, and it totally rules. All
right.
What about other languages as well?
Like, this is not just a JavaScript
thing, right? Yeah, I mean, why, you
know,
one could argue, you know, why are you
using even using a .env file with these
weird decorators to do this stuff,
right? Like,
but we started there because it's what
people are used to. So, we're trying to
meet people where they are, and it feels
very familiar
uh and it it feels applicable in any
kind of language, right? Like,
we did have a first kind of version of
this uh called Domino, where the schema
was written in TypeScript. And it worked
really well, and a lot of things were
cool about that, but it, you know,
trying to convince some Rust developer
to like use this TypeScript schema in
their code like it's just not going to
happen, right? Whereas, if you say,
"Hey, look, it's a .env file with some
extra little markup on it." They're was
"Oh, that actually makes sense.
Um so, for for Varlog, we have a
standalone binary build that you can use
with any language. So, you could still
do Varlog run. It will load, validate,
do all of that, and then inject it into
your code, which could be any language.
We do also though like part of what we
do is generate types. So, there's a root
decorator at generate types, and you can
say language equals TypeScript, and it
will generate TypeScript types. So, we
don't generate types for other languages
yet, but that should also be possible.
So, you can imagine like, you know, hey,
just generate my go types for my config,
or generate, you know, Rust, like what
whatever, right? It's By separating it,
it becomes a lot more applicable for for
anything. Yeah. The benefit of the
JavaScript ecosystem today is the is the
sort of deep integration. So, we do, you
know, console log redaction of those
sensitive values. We prevent you from
leaking them in HTTP responses, that
kind of thing. So, you know, we would
need to do integrations in other
languages to give you that level of
integration, but that that's coming,
too.
One of the reasons why I think people
like the one like one password directly
hasn't caught on is that you have to
change your your run commands to like
run something first, and then then it
injects it into the environment, and
then that
then it runs. Like like it would like
inject it and then run NPM run run dev,
and then you'll have that. But then
there's these weird issues where if it
has like a sub process, the variables
don't get pushed to it sometimes. Is
yours like that as well? Like do I have
to run Varlog something and and NPM run
dev? Only if you're trying to like if
you're injecting it into say a
non-JavaScript language. For the
JavaScript languages,
uh or like for different frameworks,
like we have a Vite integration, we have
a Next integration. So, those kind of
happen at the like, you know, Vite
config level, and it just works. Um and
same with Node like or Bun or whatever
like we have an auto import command that
reaches out to the CLI and loads and
injects it. So, in all those cases
you're not you're not prefixing
everything with Varlock run. It would
just be like and this is a a real other
problem. Like say you wanted to run some
like database migration, right? And you
need to feed in that database URL into
the migration
or into the migrate command, right? You
could do Varlock run
whatever Prisma migrate and it would
inject that in correctly without having
to do any you know weird stuff having an
extra JSON file or whatever, right?
Yeah, cool. Um also I'm uh curious your
opinions here on like when something
should be a like a constant versus go in
environmental variable. Cuz like
sometimes I go nuts and just put like
every single URL ever into it. I'm like,
well that that might change.
Um but then like when I'm searching
through my code it's kind of tricky.
Like at what point is something a
constant and what time does something
become an environmental variable?
I mean I would say the purest would say
when it's dependent on the environment.
So, if you know, if that URL is going to
change
it should be an environment variable.
But I don't know what do you what do you
think there Theo?
I I will say this. Because dot env is
such a pain, I think everyone avoids it,
right? You avoid putting stuff in envars
because your your your dot env.example
gets so long and you copy paste it and
it's like illegible, right? Whereas now
when you have this schema, the more work
you put into it, the more comments you
put in there, the more validation you
put in there, the more valuable it gets
and you're not trying to keep anything
in sync anymore. So, I've I've
personally found as we start using it,
I'm putting more and more stuff in there
because I have this really nice tooling,
nice like really nice type completion,
really nice validation. It's like
if I think this thing might change or
just kind of even feels configgy,
why not throw it in there?
Throw it in there. I agree. Like the not
having it typed is a major reason why I
often would be like, "Eh, maybe maybe
throw this in like a
constants.ts file."
Um and like recently, I don't know, in
