---
video_id: "rJCgvnXgOiU"
title: "Claude Code + RAG-Anything = LIMITLESS"
channel: "Chase AI"
topic: "ai-llms"
published_date: "2026-04-03"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=rJCgvnXgOiU"
duration: 1160
word_count: 4145
---
Almost every rag system suffers from the
exact same problem. They can only handle
text documents. So, if you try to give
it images, charts, graphs, whatever,
most rag systems just can't handle it.
And when I showed you Light Rag
yesterday, it suffered from the exact
same problem. But today, I'm going to
show you the fix. And that fix is Rag
Anything. Rag Anything solves this
document problem for us. It can handle
images, it can handle charts, it can
handle graphs, and it allows us to
create a rag system that actually deals
with the documents you use. Rag Anything
is from the same team that built Light
Rag. It plugs in directly into the Light
Rag system we already built yesterday.
So, it's really easy to introduce this
into our stack. And so today, I'm going
to show you exactly how to set it up and
how it works under the hood, so you can
begin using one of the most powerful rag
systems out there. So, in case it wasn't
obvious enough from the opener, I'm
going to assume you've already watched
yesterday's Light Rag video. I'll put a
link above if you haven't done that
already, because today, I'm going to
assume you've already set up your Light
Rag server, you understand how rag
works, and you understand this whole
knowledge graph thing. Because Rag
Anything is essentially going to be a
wrapper around Light Rag. We're still
going to have the same Light Rag web UI
with some differences, but everything
that gets pushed into Rag Anything, you
know, these non-text documents,
eventually find their way to the same
knowledge graph. We're going to be
asking it the same questions. We're
going to be using the same API to query
it through Claude code that we did
yesterday. And the functionality we are
going to be adding today is significant.
It's not enough to build a rag system
that is purely text. We don't operate in
a world that's purely text. How many of
you been given a PDF document that isn't
even technically text? It's just
scanned. Light Rag can't really handle
that. Rag Anything can. Now, we will go
a little technical today. We'll get
under the hood and I'll explain exactly
how this whole system works. But big
picture, what is it doing? Rag Anything
is just looking at the documents that
aren't text. It's basically doing
exactly what Light Rag does except to
these non-text documents. And after it
creates its own knowledge graph and its
own vector database, it merges it with
the light rag one, which is why
everything ends up being in one nice
neat little place for us to ask
questions about. Now, the only downsides
about rag anything is it's a bit
heavier. We have to download some models
that live on our computer that help
parse some of these non-text documents.
And when it comes to actually ingesting
non-text documents, we can't do it
really through the light rag UI. We have
to use a script. Luckily, this is where
Claude code comes in. So, for you the
user, after you've set all this up,
all's you have to do to ingest non-text
documents is tell Claude code, "Hey,
go ahead, use the rag anything skill,
and ingest this document." It's that
simple, and you ask the questions the
same way you did before. So, really not
too bad. And again, you get all this
functionality just by doing that. Now,
before we go into how rag anything
actually works, just want to give a
quick plug for my Claude code
masterclass. Just came out a couple
weeks ago, and it's the number one place
to go from zero to AI dev, especially if
you don't come from technical
background. I update this literally
every week. There's a new update coming
tomorrow. So, if you're someone who's
really trying to master Claude code and
has no idea where to start, well, this
is for you. There's a link to that in
the comments. It's inside Chase AI Plus.
I also have the free Chase AI community.
If this is just too much for you, you're
just getting started, link to that is in
the description. That is where you also
will find the prompts and the skills
that I'm going to talk about today. So,
make sure you check that out regardless.
Now, let's talk about rag anything and
how this thing actually works. To be
honest, it's pretty simple, pretty
self-explanatory. So, not to waste your
time, I'm just going to keep this image
up for like
10 seconds, and then we'll move on to
the next thing.
All right.
Pretty good, all right? Let's move on.
I'm just kidding.
&gt;&gt; [laughter]
&gt;&gt; It's It's actually a bit going on. This
image makes it more confusing than it
actually is. And if you understand what
we did the other day with light rag,
remember all this conversation, you're
going to be good. Rag anything kind of
operates in a similar fashion just with
a few extra steps and I want to go
through because I think it's important
to understand how these things work. You
know, I think in AI in general it's easy
to become like super practical focus
like I just want to know how I install
it chase and then how to use it. That's
fine. You can skip ahead if that's you
but I think if you want to become a more
mature AI dev and you kind of want to
separate yourself from the monkey I
could replace you with that just hits
accept accept accept and copies prompts
and skills then I think it's important
to have some you know
understanding of architecture because
this is what's going to separate you
from other people and not just in terms
of like how you can use this rag system
but in bigger level and higher level
bigger projects, right? This is how you
begin to sort of like
create your own skills like actually
become good at this stuff. So, let's
talk about it. So, rag anything. Let's
talk about the problem, right? The
problem is I have a PDF that is a
scanned PDF and it's not really text and
yet I need to put it into my rag system.
Light rag can't handle it. So, in comes
rag anything, right? It's got the cool
llama with the six shades.
So, the first thing that happens is I'm
going to ingest this document into rag
anything and the first thing it's going
to do is it's going to use a program
called minor U which runs on your
computer completely locally for free and
it's going to essentially break down
this document into its component parts.
Minor U is an open source project.
Again, it's essentially a document
parser that includes a bunch of like
miniature specialized models. All you
need to know is if you're scared of
this, it's open source. I'll put a link
down below and again this is what's
going to be running and doing most of
the work for us today. So, minor U is
looking at this document and it says,
"Okay,
this is a header." It creates a box
around the header. It says, "This is
text."
It says, "This is a chart. It says,
"This is an image of a bar graph." and
it says, "This is an equation written in
latex." What it's done is it's looked at
the document and it's broken it out,
okay, into its special parts. Miner U
doesn't understand what's inside here.
Miner U isn't reading the text. It
doesn't get the text. It doesn't
understand what the chart is about. It
just knows
chart, text, image, okay?
From there, it's going to send these
component parts to individual
specialized models that are part of
Miner U.
So, this is all invisible to you. This
is all happening automatically under the
hood.
So,
the model, one of the models is called
like Paddle OCR. That's what's going to
look at the text. So, Miner U is sending
this text block to Paddle OCR on your
computer and it's going to pull out the
text, okay? So, now instead of being
scanned text, it's actual text that
reads Company X reported strong Q3 '23
results with revenue growth blah blah
blah blah blah, right? Same for this.
Text. Same for the chart, right? It's
also going to turn it into text, right?
Something an LLM can handle. Same thing
with LaTeX equations. It has a whole
model that handles that, right? This is
now
no longer LaTeX, it's actually text.
Except for images. So, whether this is a
bar chart or just it's really anything
that it can't transform to text. What
it's going to do instead is it's going
to take a screenshot of it and this is
important, all right? So, now this is a
screenshot. It's an image. Screenshot.
I love that. So, what do we have? We
inserted a non-text document. It's been
identified into its component parts and
we've taken those component parts and we
broken it down into two buckets, right?
We have the text bucket
and we have the image bucket. It's
important to realize this.
There's two paths it can go down, image
or text, all right? You with me?
So, what it's going to do now is we're
done using these internal models. Now we
need to bring in the big boys. Now we
need to bring in something like GPT-5.4
Mini. Of note, that isn't necessarily
the case. You could keep this all local
if you wanted to. You could use
something like Ollama. So, now I take
the text bucket and I push it to GPT-5.4
mini and I include a prompt that says,
"I want you to break out this text for
two things.
I want you to take that text and break
it out into
entities and relationships. Remember
entities and relationships? Remember our
knowledge graph?
entity
entity and sort of the relationship
between them, okay?
And
I want you to break it out into what
will be embeddings for a vector
database. So,
embeddings
embed and then I'm just going to say
entities plus relationships. Now,
thinking ahead, what's going to happen
there? Well, the embeddings are going to
become embeddings in a vector database
and the entities and relationships are
going to become a knowledge graph, just
like we did with LightRAG. Right? Same
thing. Same thing. Except now
now it's from the text bucket.
But what about those images we had,
right? What are we going to do with
these guys? Same thing. This is going to
get pushed to 5.4 as well, but it's
going to be as a screenshot, as an OCR.
So, we're telling GPT-5.4, "Take a look
at this screenshot and break it out into
two things.
Right? Embeddings
and also entities plus relationships.
Now, why do we do that? Why don't we
just shove it all into the same exact
prompt and have it just OCR this entire
thing, right? Why don't we just treat
this entire thing as a screenshot?
Because it's expensive and slow.
What RAG anything decided to do, and I
think it's kind of smart, is it kind of
takes a scalpel to this on your computer
at the local level, breaking it out into
text, breaking out into screenshots. So,
when we go through these two paths,
you're saving a ton of money and time.
Because imagine you were trying to have
ChatGPT look at 10,000 screenshots and
then break out all the text and from the
text break it out into embeddings and
entities and relationships. It's going
to take a lot of time and money.
This is smarter. So,
entities and relationships from the
image side, same exact thing. It also
gets
a vector database.
And it also gets a knowledge graph.
So, what does that mean? That means
from one document, we've now created
four kind of things, right? We have two
vector databases, and we have two
knowledge graphs
from our single non-text document. You
with me?
Now, what do we have to do? Well, it's
kind of obvious. We need to merge these.
So, it's going to take
these four things and just push them
together, right? They're going to pretty
much overlay on top of one another. It's
going to match them based on entities
essentially, and you're just going to
get,
you know,
at the end,
one
vector database and one knowledge graph.
Pretty much the exact same thing we did
up here with Light RAG.
Simple enough.
If we were just using RAG anything, that
would kind of be the extent of it.
However, remember, we're trying to
lay RAG anything on top of Light RAG. I
want all the power of Light RAG, and I
want all the power of RAG anything. So,
what happens now? Well, what happens is
just a repeat of what you just saw. So,
let's kind of bring this guy down. So,
now
we have
our RAG anything set
with a vector database and a knowledge
graph, and we have our Light RAG set.
So, what do we do? We just merge those
together.
So, then what happens is we get the RAG
everything and the Light RAG combined,
which gives us finally,
one vector database and one knowledge
graph. And from there,
it's just like it was before with
Light RAG on its own, right? You ask a
question about whatever. That get That
question gets turned into a vector up
here. It pulls the relevant vectors and
then it also goes down here, finds the
correct entity, and then takes a look at
what's
nearby.
Okay?
Maybe that was a little confusing. I
hope I explained that okay.
To kind of recap,
to confuse you even more, what happens
when I add a document that cannot be
text? It goes into rag anything.
Rag anything breaks out what text it can
and then breaks out what images it can
as well. It sends both of those to chat
GPT or whatever AI system you want.
It breaks that out into embeddings,
entities, and relationships.
Those get turned into knowledge graphs
and vector databases. We then merge
those together.
We now have one vector database and one
knowledge graph for rag anything. And
since we've already been running this in
light rag or if you've added any more
documents on top of that, you have an
existing
vector database and an existing
knowledge graph.
Solve that, we simply merge them, and in
the end, you didn't notice a dang thing.
Again, as the user, all of this is
invisible to you. Okay?
None of this really matters to you. The
only thing that might matter to you is
what's happening over here with GPT 5.4
cuz it's going to cost you some money.
But,
for educational purposes, that is how
the rag anything system integrates with
the light rag system. And at the end of
the day, it just means that you have a
rag system that can handle non-text
documents. And if you're still around
after all that, now we can go into how
you actually install this thing and use
it. So, now let's talk about the install
and how to actually use it and a couple
things you need to watch out for. So, I
created a one-shot prompt that you can
give Claude code that will install
everything for you and update the proper
models and all of that. All you need to
do is just make sure you're in your
light rag directory when you run this.
So, there's really three things it's
going to be doing. First of all, it's
going to make sure we update that
correct storage path since you already
have a Docker LightRAG instance running.
Two, we want to update the model because
based on the GitHub it you know was
created a little while ago originally,
so all the example scripts and all that
use things like GPT-4-Mini, so I have it
on 5.4-Nano. Understand you can change
that if you want to, but I had it use
5.4-Nano as well as keep text embedding
three large so that we can just use
OpenAI for everything. It just keeps it
simple. Play with it as you wish.
Lastly, since we're using RAG-Anything
as essentially a wrapper on top of
LightRAG, some of the example scripts
given in the GitHub repo
are kind of wrong. So, there's like this
embedding double wrap bug, which again
we just tell Cloud Code to fix and it
will fix it. So,
you're just going to use this prompt.
Again, it is inside the pre-school
community. Link is in the description.
Just look up RAG-Anything and you will
find it there. And once you run that
prompt, it will begin downloading
everything and understand it's a little
heavier cuz it needs to download Miner U
and all those dependencies as well. Now,
let's talk about ingesting documents cuz
this is kind of annoying and a pain in
the butt. In a perfect world, the
LightRAG plus RAG-Anything situation
would be very streamlined and I could
dump whatever I wanted to into LightRAG
{slash} RAG-Anything through singular
interface. I could come into the UI, I
could go to upload, and I could do that.
You really can't with RAG-Anything with
LightRAG. You can still do this for text
documents. So, you can still do the
normal workflow that I showed in the
previous video where you go to the UI or
you use
the LightRAG skill to upload documents.
You can't do that with RAG-Anything. It
has to go down essentially a different
tunnel, a different pathway. But, that
different pathway with RAG-Anything is a
Python script. There's no UI, there's no
button to press. It's literally a
script. It's code you have to run. Now,
luckily this is where Cloud Code comes
in and makes it very simple because
we're just going to turn that script
inside of the repo into a skill. So, for
you, once that skill is created, all you
have to do is say, "Cloud Code, use the
rag anything skill to upload all these
documents, all these non-text
documents." And when it does that, it
will go through the Mindee U process. It
will take some time because it has to do
all these,
you know, things to it like we explained
in the kind of technical section, but it
will upload it to Light rag and it will
show up inside of your documents and
inside of your knowledge graph. Okay,
that's the only weird part you need to
know. The other weird part, to be
honest, is once you do that, it also
requires you to restart the Docker
container, but as part of the skill,
that happens automatically. So, again,
from your point of view as a user, the
only difference is you just need to
invoke the skill. Now, this skill, the
rag anything upload skill, is also
inside the free community, so just
download it and then put it in your dot
cloud folder, and then it will work just
fine. Now, the one note on Mindee U
taking a while, that's because the way
rag anything works, when you download
it, it's going to run on your CPU. If
you want it to run on your GPU, you have
to have a different version of PyTorch.
If that all went over your head, just if
it's too slow for you, just tell Cloud
Code, "Hey, can we run PyTorch, can we
run Mindee U on our GPU?" And it will
walk you through it. Or in fact, it'll
just do it all on its own, but by
default, it's just going to run on your
CPU, so just know that. So, let's see an
example of this in action. So, one of
the documents we ingested was this PDF
of Novatek, right? SAS revenue analysis.
It's totally fake, but the point is,
we ingested something that has this
sorted bar chart, right? So, this is
something that obviously would have been
pulled out as an image, sent to ChatGPT,
yada yada yada. Normally, Light rag
wouldn't be able to handle this because
it's just an image, it's a chart, it's
hard for it to sort of break that out.
But, since we ran the Sue rag anything,
we can now ask a question via Cloud Code
about this. And so, I asked Cloud Code,
"Can we query our Light rag database
about the monthly revenue trend for
Novatech Inc for January through
September 2025. You can see here it
actually didn't even use the skill. It
just straight up did the API request,
which is fine as well with the query,
what was the monthly revenue trend for
Novatech Inc from blah blah blah blah
blah. Now, it gave a full response, so I
can take a look at the raw response if I
wanted to, but what it did do, it came
back with the full monthly breakdowns.
You see January 4.6, 4.6, February 4.9,
4.9, March 5.4, 5.4, on and on and on.
So, in terms of asking questions about
these new documents, same thing as
before. The only difference is the
upload. All you need to do is to invoke
that skill that I'm giving you, and then
tell Claude code what you want to put in
there. You could point it at a whole
folder, you can point it at a specific
download. It's just as easy. This is the
only really weird thing you've got to
get used to is these two upload paths.
But the actual question and answer
is just plain language.
Plain language, even if you have the you
have the skills as well, which I also
gave in the last video, but Claude
code's also smart enough to understand
the API structure of this whole
cuz it's it's local, it's on your
computer. So, that's really it when it
comes to rag anything. I know the
majority of this video was focused sort
of on the technical aspects, but as you
see, once we built that light rag
foundation, actually adding rag anything
on top of it isn't too hard, especially
if you just use that one-shot prompt I
gave you. There are some things you can
tweak along the edges, like anything
when it comes to querying it, but really
with Claude code,
it's kind of in charge of all the
weights that you can tune inside of
light rag. And for that, I'm talking
about if we go to the retrieval section,
all the parameters here on the right.
Again, Claude code knows which ones tend
to be best for you. So, overall, I hope
this
kind of explained how easy it is to set
up rag anything, and also how easy it is
to add this level of functionality to
your rag systems, which in many rag
systems just isn't possible, or it's
very expensive. And this is relatively
cheap, especially with that whole minor
you local parsing system we're able to
set up. So, as always, let me know what
you thought. Make sure to check out
Chase AI Plus if you want to get your
hands on that Claude code masterclass,
and I'll see you around.
