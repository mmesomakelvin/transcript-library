---
video_id: "nxH-BrsCPTo"
title: "The End of .env Files as We Know Them"
channel: "Better Stack"
topic: "ai-llms"
published_date: "2026-03-12"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=nxH-BrsCPTo"
duration: 507
word_count: 1713
---
This is Varlog, an open-source tool for
managing environment variables that
makes it so that you never have to store
plain text secrets on disk again and
works by resolving environment variables
locally or through a password manager
like 1Password, Bitwarden, AWS, and many
more by using a type-safe schema and
then injects your secrets into your
application at runtime, making your .env
file safe for AI and even to commit
publicly to GitHub. But, how does this
actually work and what's the deal with
this weird syntax? Hit subscribe and
let's get into it.
How many times have you started a new
dev role, get access to the code, get it
running locally, and it doesn't work,
only to find out you're missing a .env
file you need to get from another
developer or some kind of encrypted
storage, and you have to go through this
process over and over again each time
that .env file updates? This is the
problem Varlog exists to solve and also
to fix the problem of current injected
AI agents fetching secrets they
shouldn't is a small project
I've been working on that generates
articles from Twitter videos using
OpenAI's Whisper to transcribe the video
and using Claude to write the article.
But, we're going to start with something
simple and use Varlog to change the port
number. So, with Varlog already
installed, we should have a .env schema
file which is currently empty. This will
be the source of truth for all of our
environment variables and should be able
to be committed to GitHub in a public
repo. We'll start by adding a simple
@env environment variable and we'll set
it to the value of testing. And now I
can create a new tab to run Varlog load,
which will validate our schema. Now, we
can see over here it's read our
environment variable and has set it to
sensitive. This is because all
environment variables in Varlog are set
to sensitive by default, but we can
change that. In this file, I'm going to
add our first decorator, which will be a
root decorator because it will affect
all the environment variables in the
file and will set default sensitive to
false. Notice the syntax here has a
hashtag in front of it, and usually root
variables are separated with a divider.
Now, this whole file uses a
domain-specific language called nspec,
which is an open spec written by the
Firelock team. So, now if I validate my
schema again, we can actually see the
value of the environment variable
because it's no longer set to sensitive.
But, we can do some other cool things
inside our schema file like giving our
environment variable a type. So, I'll
give it a type
which means everything should still
work. But, if I were to change it to
number, then we can see we get an error
because it's expecting a string. I can
also give it the required decorator, and
then remove this text, meaning if we
check our file, we get an error because
it's expecting a value. These are called
item decorators, and you can find a full
list of them in the Firelock
documentation, as well as a full list of
the available types. Let's now add
another environment variable, and this
time I'm going to call it port with a
value of 3002. I can give it a type of
port, and what I'm also going to do up
here is set this to sensitive, and
change this back to a string. Now, it's
picked up both of our environment
variables and hidden this because it's
sensitive. But, now how do we get these
values into our application? Well, all
we have to do is run Firelock run
followed by the script we need to run
our application. So, if I cut the
package.json file, we can see we need to
run the vite command to run the front
end. So, now if I run Firelock run
followed by the vite command, it should
load the config, resolve it, and then
inject it into our environment
variables, which is exactly what it's
done because now the port is 3002, which
works in our code because it first
checks for the port environment variable
currently being injected by Firelock.
This script doesn't just have to be a
JavaScript file because Firelock works
for any project. So, Python, Go, Rust,
you name it, everything should still
work as expected. And, if you don't want
to install it with npm, then there's
also a Firelock CLI, which works just
the same. This is all well and good for
local environment variables, but now
let's go through the process of fetching
them from one password instead of using
my shell local variables for things like
this OpenAI and Anthropic API key. Now,
I don't use one password personally. I
signed up for a trial just to make this
video, but as you can see, I've created
a new vault, which is very important.
I'll explain why later. And inside this
vault we have two items. One is the
OpenAI API key and one is an Anthropic
API key, which I don't mind showing
because they're completely made up. So
if I reveal this, this is not a real API
key. Now, in order to get those values
inside our Varlog schema, we first need
to install the one password plugin. And
note, plugins in Varlog can add their
own root and item decorators. So you may
see some new ones here that don't exist
inside the documentation. For example,
this init one password decorator. So
after installing Varlog one password, we
can load the plugin root decorator
containing the plugin we just installed,
and we can run the init one password
decorator. So all I need right now is
the token, which I can load from here.
Now, in order to get this token, you do
have to connect it to a new vault, not
your personal one, and you can find it
in developer service account, then
follow the steps to create a token. Now,
since I'm going to delete my token and
one password account after this video, I
don't mind showing it. And I'm going to
give this a type of one password service
token, which is set to sensitive and is
a type that comes from this plugin. You
may also notice that this file doesn't
have any syntax highlighting, and that's
because the Varlog team have created a
VS Code plugin that does support it, but
right now there isn't one for Neovim,
which means I might create one in the
future or just get Claude to do it. Now,
I'm going to create a new environment
variable called OpenAI API key ID, and
then in order to get that from one
password, I have to run the 1Password
function, followed by this protocol, and
then I need to add the name of my vault,
which is test, the name of the item,
which is Open AI, and then the field's
name, which, if we double-check, we can
see over here that it is credential. I
can also set that to sensitive. And now,
if we run Varlog load, it takes a few
seconds before getting my Open AI API
key from 1Password. And we can check
it's working by even changing the value
here to something like 1 2 3 4. And if
we run Varlog load again, it gets the
correct values. And there we have it,
our env schema file should be good to
commit. But, I know what you're
thinking. What about this 1Password
token? Is that safe? Well, to be honest,
if you were developing locally and you
had 1Password, you may have the desktop
app installed or you're using the CLI.
In that case, you can use this
configuration to unlock 1Password with
your fingerprint instead of using a
1Password token. But, Varlog also
supports other plugins like one for AWS,
GCP, and even Bitwarden, as well as many
other integrations including those for
Veet, Next.js, and Cloudflare Workers.
There are also so many other features I
didn't get round to going through like
generating TypeScript types from your
schema, importing environment variables
from other files, and even redacting
sensitive outputs from logs and outgoing
HTTP responses, which is a very nice
touch. There's even an MCP server to
help your coding agent set up an env
schema for you automatically. And
there's also a GitHub action to load and
validate your environment variables in
your CI/CD process. But, as cool as
Varlog is, there are a few issues with
it. For example, you can't use it
offline, so if you're coding at an
airport, you'll have to use your
hard-coded environment variables. But,
honestly, who's really coding without
the internet? Also, speaking of
internet, there is a bit of delay when
it's fetching passwords from a different
provider, So, it will take a tiny bit
longer to start up your scripts. There's
also a lack of providers such as
Dashlane and others. And I did
experience a weird bug where if I used
the same name in my schema file as the
name of an environment variable for my
local shell, it used that environment
variable locally instead of the one from
one password. But, Varlog is actively
being developed and I'm sure lots of
these things will be addressed in the
future. Nevertheless, the product as is
right now is still incredibly useful to
me and I think I'm going to be using it
for all my side projects going forward
and maybe even replace my local shell
files with Varlog schema files if
there's a way to do that. I really hope
there is because I don't want any agents
to [clears throat] scrape my
information.
