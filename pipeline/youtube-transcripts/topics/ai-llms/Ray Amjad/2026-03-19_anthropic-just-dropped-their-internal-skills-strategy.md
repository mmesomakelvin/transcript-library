---
video_id: "7PnF8qctDi8"
title: "Anthropic Just Dropped Their Internal Skills Strategy"
channel: "Ray Amjad"
topic: "ai-llms"
published_date: "2026-03-19"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=7PnF8qctDi8"
duration: 1123
word_count: 4135
---
Okay, so yesterday Anthropic released
the most incredible guide on writing
good effective Claude code skills that
everyone has seen. Now, this covers a
lot of the key lessons that they learned
from making hundreds of skills that they
have been used across pretty much the
entire organization. I'll be breaking it
down with a bunch of nice images,
examples, and things that you can be
doing to improve your own skills and
workflows. All right, now starting out
they talk about why skills even matter,
and that is because of the default
output problem. When you give a prompt
to a model, it will give you
statistically the most likely thing
based on its training data. And this can
be good in situations because if you're
implementing an authentication system,
you want to be given the most likely
most common authentication system
because it will work. You don't want the
models be overly creative when it comes
to designing something that important.
You want to follow the standard
procedure that everyone else is using.
Now, the problem is when it comes to
things like design, it can lead to bad
output. For example, we've all seen the
purple gradient into font like same
layout AI looking design websites, and
that is because of distributional
convergence. In the training data, all
these examples of designs have been
blended and washed together that Claude
will only give the safe common patterns
that it finds. But by using a skill, you
can make the model sample differently
from its training data distribution. So,
with the right words, you can basically
make it use unique fonts, move towards
experimental layouts or different kinds
of animations, and essentially move it
away from the high probability boring
center to like a more specific and
creative regions of its training data.
So, you can kind of think of skills as
being a way to differentiate yourself
from everyone else. So, for example, if
a thousand people say build me a landing
page, they will all get pretty similar
designs from Claude code. But if
everyone has their own unique design
skill that is kind of influenced and
contains information about design they
like, and also their own experiences and
kind of what they're after and their
brand guidelines and so forth, then
everyone will be seeing a different
outcome. So, the way to think about
skills is that they're basically
overriding the default behavior and
pushing the model to less common and
more specific parts of its knowledge.
You're kind of invoking a different part
of the model's latent space to get
better and more distinct outcomes.
Another way to imagine this is that you
will get the Claude code default
behavior by not using a skill, and your
outputs will be very similar to pretty
much everyone else's over here. But a
skill is kind of like a forcing function
that forces the underlying distribution
to take a different shape and give you
different outcomes. So, while the
knowledge that you're after does exist
in the model, for example, right over
here, it has a low probability. But by
using a skill, you're kind of activating
this low probability region over here to
give you different outcomes. Now, what
this means is that a bad skill would be
restating obvious behavior to Claude
code. You'd be restating something that
Claude already has a high probability of
being able to do and achieving. So, for
example, if I said make me a landing
page in a brand new project, and I
didn't give it any additional
information, then it would give me a
pretty generic AI looking design right
over here. And then if I told Claude
code, okay, you know what? Like turn
this into a skill. So, I would trigger
the skill creator and be like, okay,
turn this into a skill for me. Then it
would take that default behavior, turn
it into design-related skill, and make
all successive design with that skill
look very AI-related. Which means that
the bad distribution that would kind of
look like this without a skill would end
up pushing up to look more like this
with a skill instead. But good skills
are pushing Claude's to new outputs and
then steering the underlying
distribution. And this means that when
you're making a skill, you usually want
to be encoding something such as your
own lived experience, your own
expertise, or something that you found
online. So, for example, if you ask
Claude, "Hey, can you help me with
marketing?" then it would give you
really generic and boring advice that
won't really help you stand out because
everything that it's trained on already
contains a lot of that advice, and
people are already following it. Now,
Claude does know like better marketing
advice, and it does know how to do
things more uniquely. So, if you gave it
a few examples, then you can turn that
into a skill because that skill would be
steering the underlying distribution to
give you better outputs more suitable
for your goal. And one of the common
ways that I've seen people do this is
that they listen to really good podcast
episode talks about an idea that not
many people are talking about, and they
kind of want to expand on this idea and
understand how it applies to their
projects and like start applying it
every single day. So, they would get the
transcripts of that podcast, turn that
into a skill, and then triggering that
every time they're getting help with
Claude for marketing. Now, I have talked
about this idea in more detail a few
weeks ago at my Claude code masterclass,
which is the most comprehensive class in
Claude code that you will find online.
Now, I am working on the Claude skills
class of the masterclass, which will be
the most comprehensive class on Claude
skills that you will find. So, if you're
interested, there will be a link down
below to sign up. Now, they say the most
valuable part of any skill is a gotchas
section. So, things that Claude has to
be careful of when it comes to using the
skill. And it's very similar to hiring
and training a brand new employee. You
wouldn't just give them instructions and
be like, "Hey, here's a work, go do it."
You would usually tell them about things
that they have to watch out for, things
that will come back and bite them, and
basically all the experience that you've
gained so far in doing the thing
yourself. Similarly, you should be
ingraining this knowledge into your
skills as well. So, for example, let's
say you made a skill to help you draft
customer support replies,
you might make the skill and then
realize that it starts promising like
timelines to customers of, "I promise
that this will be resolved in 24 hours."
And this is a real failure that your
customer support people learn to not to
make, and you did not tell Claude the
exact same thing. So, you would add to
your skill like at the bottom, "Never
promise specific timelines. Say we're
working hard on it." And you would use
the skill again, read for its output,
and it would be improved. And as you add
in more and more gotchas as well, your
skill becomes like a rich knowledge base
that will be applied consistently over
time. And this is exactly the flywheel
that makes skills more and more valuable
over time. A lot of people make a skill
once, then they notice Claude makes one
mistake, and then they never bother to
improve on the skill or add it as a
gotcha. So, by you taking the time to
add that to your skill, you will already
be doing better than most other people.
And the example that they use is they
have a skill for an internal billing
library that isn't really captured
inside Claude's default behavior. So, by
making it a skill, they will see Claude
does a better job at dealing with
anything billing-related inside their
repository. Now, the first gotcha they
add is like prorations round down, not
to nearest cent. Then they add another
gotcha for like test mode, another one
for like keys. And a lot of this
knowledge would already be ingrained
inside the heads of
so ideally, you should be getting this
knowledge, this like implicit knowledge
outside of people's heads inside your
Claude skills. Now, next up they talk
about avoid railroading Claude. And this
is very similar to another idea that I
talked about a few weeks ago in my
Claude code masterclass,
but essentially what many people do with
skills and just Claude in general is
they give it a really rigid set of
instructions cuz a lot of people like
say skills are kind of like recipes, you
want to give it some workflows,
instructions. And this can be helpful in
some situations when there's a very
specific way of doing things, but in
other situations, it's not as flexible
or versatile. So, for example, let's say
you made a skill to help you interview
candidates, and it came up with a bunch
of questions that you should use. A bad
skill would kind of be like, "Write
three behavioral questions, write three
technical questions, and like write one
culture fit question." So, this is
really rigid, and it doesn't allow for
any flexibility. Now, what would happen
is that if you used a skill like this, a
senior architect would get very similar
questions to a junior intern, and you
won't really be able to pull out the
best in them. Essentially, you have a
rigid recipe that gives you identical
outputs regardless of the context. So,
you want to take a more goal-oriented
approach where you give Claude some
information and the flexibility to
adapt. So, a better example would kind
of be like, "Prepare interview questions
for this role. Test for what actually
predicts success here. Here are the
traits our best hires have had." And
then you give it a bunch of relevant
context for your organization, and then
you will find your interview questions
are much better for whichever roles that
people are applying for. And if you
notice its output being bad, then you
can go back to previous section and then
add the gotchas such as, "Never ask
family-related questions" or something.
Which means that in many situations, it
can be better to take a goal-first
approach with context than to take a
constraint-first approach instead. And
to relate this to the distribution thing
that I said before, the way that I
imagine this in my mind is that when you
railroad Claude, then you're basically
collapsing this wider distribution that
it has for creating like a creative
solution, an optimized solution, and so
forth, you're collapsing this down into
a really rigid like small path instead.
You basically eliminate all optionality,
and you have no room for Claude to make
its own judgment. Now, next up you want
to make use of progressive disclosure,
and you don't want to cram every single
thing into the single skill.md file. So,
for example, if you had a content
repurposing skill, then you know that
different types of content does well on
different platforms. What works on
LinkedIn will not necessarily work on
YouTube or Twitter. So, you would have
your main skill.md outlining any gotchas
and the main goal to avoid railroading
Claude, and then you would have separate
markdown files inside like a formats
folder that contains information on
effective LinkedIn posts, effective
newsletters, and then Twitter threads,
and so forth. And that means that if you
were repurposing one bit of content,
then Claude wouldn't be able to load in
only the files that are relevant, which
means that if you wanted something
repurposed from a newsletter to a
LinkedIn post, then Claude will be able
to load in only those files that are
relevant, keeping the context window
high signal and avoid adding irrelevant
noise to the context window. Now, the
way I do this in my skills is that I
have reference files. So, I have one
file for kernel tuning, I have another
one for operations like certificate
management. And this is helpful because
Claude code may not always be
troubleshooting something and just needs
to know some operations stuff instead,
which means that only the irrelevant
context will be loaded in when it needs
to be. Now, next up your skill
descriptions should be routing logic for
Claude and not marketing copy. So, many
people write their skill descriptions
kind of like they were advertising the
skill to human, for for
or telling a team member or like what
exactly it does.
So, bad description would be something
like a comprehensive tool for monitoring
pull request status across the
deployment life cycle. But, you may
notice that Claude may not know when to
trigger the skill because it doesn't
mention any of the keywords that a user
would be mentioning in that query. But,
a good skill description would be
something like "Monitors a PR until it
merges, triggers on babysit, watch CI,
make sure this lands." And then, Claude
can semantically match any user question
or query to your skill easily. And you
can kind of see this in this skill that
I have, which is a image cleanup skill
for my ray OS folder, and it says over
here, "Triggers on clean up images,
delete unused images, flatten images,
tidy up images, and so forth." And these
are all semantically similar to things
that I would potentially say when I want
my images cleaned up in this project.
Now, you also want to be improving your
skills with scripts that Claude can run.
And this is especially important for
skills that are fetching data and using
data from an external source
because otherwise, if you just give it
an API key and say like go figure it
out, then Claude will spend a bunch of
time looking at API documentation,
figuring out how to make the requests
and stuff. And if you don't save that
information inside of the skill, then
that can lead to wasted tokens and time
every single time that skill is
triggered in the future. But, if Claude
has pre-built functions in a library
file, then it can simply compose them
together in the right way to analyze the
data and give you insights rather than
wasting tokens and potentially being
distracted by the fact to figure out how
an API works. And a practical example
would be something like, let's say I
wanted to make a skill that would
combine my YouTube analytics and then my
Stripe data and then also Posthog as
well for the website to figure out which
of the videos are driving most of the
traffic and sales to my applications.
What I can do is I can basically make a
read-only API key for Claude Code. I'll
give it read-only access to everything
because I don't want it doing something
crazy. And then, I can copy this API
key, give it to Claude Code, which
should be fine because it's a read-only.
And then, I can say something like,
"Using the Stripe API key and also super
data, can you figure out which of my
recent videos have been driving most of
the sales? Can you correlate the like
release date with the revenue that came
the days after? I think there's also
some metadata attached to checkout that
should help you with that." And then,
once you figured out how to use the API
effectively, can you turn that into a
set of scripts that you can call
reliably so that you don't always have
to make up the requests every single
time. And then, I can go to something
like super data, for example, give it an
API key from there as well. And then,
also give it a link to the documentation
as well. And finally, I can trigger the
skill creator skill by just doing
{slash} skill creator and say, "Make
this into a skill." Now, you can see
that Claude Code is trying to figure out
with a bunch of Python code and testing
all these scripts that it should make
and run. Okay, so now I've finished
making me the skill with a bunch of
Python files that I can use next time to
run through the skill faster and focus
more on the results rather than building
out the scaffolding pipeline to gather
that data. And the final report kind of
looks like this, so it looks pretty good
to me. And then, the scripts kind of
look like this. So, we have a Stripe API
script. We also have a report HTML
template that can use every single time.
And then, we have a dot env that
contains API keys going forwards. Now,
they also talk about using on-demand
hooks with Claude skills. And if you
don't know much about Claude hooks, then
I have a whole video about that in my
Claude Code Masterclass, linked to down
below. But essentially, what you can do
with Claude hooks is restrict the scope
or access of the skill to make it more
secure going forwards. Now, one of the
problems in the skill that we just made
so far is that Claude Code may decide
like, "Okay, I'm going to gather some of
the data. I'm going to edit this Python
script around and then read the
environment variable directly or
something like that." Then, it might
decide to access a random website on the
internet and maybe get prompt injected
and give our API key away. So, we can
make our skill even more secure with a
bunch of Claude hooks. So, the way we do
this is we can use a Claude hook to
restrict Claude Code to only being able
to run those scripts and then banning
pretty much everything else. And hooks
are defined at the top in the front
matter, but writing hooks manually is
like kind of tedious. So, we can get
Claude Code to make them for us. And the
way we do this is by triggering the
Claude Code guide sub-agent, and then we
can describe the behavior that we want.
"Can you make a hook for the skill that
will basically restrict the skill to
only being able to use those Python
files? It should not be able to read the
dot env. It should not be able to do any
color requests or access data online, or
do like a web fetch or something like
that. It should only be able to use
those scripts and then make a HTML file
for us. Basically, add any relevant
hooks that blocks any behavior that is
not what I just described." All right,
so now we can see that it made a bunch
of hooks to block any kind of web
access,
editing the library files that we made
earlier,
reading the environment variables, and a
bunch of other stuff. So, this will make
our skill even more secure going
forwards. And it will make sure that it
only does a behavior that is expected of
the skill. All right, so next up, you
may also want to add some kind of log
file or storage to your skills so it can
help remember earlier things that have
happened the last time it ran. Or for
example, you may have a skill that helps
you write content, and any previous
suggestions or outputs that are bad or
stored into one log file or data file,
and then anything that you have
previously written about and published
before is stored into another file so
the skill knows not to write about the
same topic again. Or if it does write
about the same topic, then it knows to
write about it from a different angle,
perhaps. And essentially, this will help
ensure continuity between skill runs
because the skill will know what it did
the last time it was called. And this
can either take the form of a JSON file,
a simple log file, TXT file, or like a
SQLite database. And then, you can
either commit this so the rest of the
team can use it, or you can do get
ignore so that everyone has their own
copy for when the skill last ran. And if
you tell Claude Code to add this to your
skill.md,
called Claude plugin data, then it will
store it reliably on your computer
somewhere such that if the skill was
updated from the like external plugin
library, then the data would not be
lost. Okay, now combining everything
that we talked about so far, we want to
be thinking of skills more as
operational packages for completing a
specific task. And that means that they
should contain any scripts, assets,
reference files, configuration, and also
any data from the last time that they
ran. Essentially, it's kind of like
having an employee whose sole role is to
do one particular task. And the people
who are treating skills like this are
getting the most value out of them. And
you will also notice the best skills
fall cleanly into one category. You
shouldn't have skills trying to span too
many categories or complete too many
different distinct tasks at once. They
should only be focused on doing that
particular task really well. The analogy
that I personally find helpful is that
each skill is kind of like its own mini
application that has a specific goal.
So, one skill may be for gathering data
from a certain source and then just
making a nicer visual out of it. Another
skill would be only dedicated to finding
the relevant websites of competitors,
for example. Another skill they have is
gathering data from DataDog, for
example, and that would of course be
different from their bug hunting skill.
And their bug hunt skill may realize
that they need to use the DataDog skill
to gather more data about what the bug
should be. So, skills should be able to
combine together, and you should be
having complementary skills rather than
overlapping skills. Now, finally, if
you're going to be sharing your skills,
you may want to consider having a setup
wizard inside your skill. Now, let's say
I wanted to share my video revenue
report skill with some friends who want
to run it on their own data or YouTube
channels,
then I can make a nice like config.json
file here. And then, I can have
something like this, a YouTube channel
ID and YouTube channel handle. And then,
in my skill.md, I can have something
like this. So, it says your config. And
what this command does is it's a bash
command that loads in the data from the
config file, the skill folder that I
have. If there's no config file, then it
will just say not configured.
And then, if I edit this, I can
basically say, "Ask the user what their
channel handle is and then use that and
the super data API to find their channel
ID and update the config." Now, this can
be really handy for skills that are
shared widely within an organization and
everyone is using the same skill but
needs slightly different config. But, if
you're not really sharing your skills
with others or in an organization, then
there's no real point in doing this.
Anyways, there's a bunch more
information article that I will be
covering later on this week in my Claude
Code Skills class. So, if you are
interested in signing up to it, then it
will be available within my Claude Code
Masterclass. And there are a bunch of
other classes that you may find handy
about prompt engineering, context
engineering, my own daily workflows, and
a bunch more things as well. You also do
get access to free videos from the class
if you sign up to my Claude Code
newsletter. And you also get many
insights from me whenever I discover
them.
