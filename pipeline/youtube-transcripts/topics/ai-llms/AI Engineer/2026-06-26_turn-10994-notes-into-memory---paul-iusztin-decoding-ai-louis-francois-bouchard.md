---
video_id: "ZRM_TfEZcIo"
title: "Turn 10,994 Notes Into Memory - Paul Iusztin, Decoding AI & Louis-François Bouchard, Towards AI"
channel: "AI Engineer"
topic: "ai-llms"
published_date: "2026-06-26"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=ZRM_TfEZcIo"
duration: 2372
word_count: 6321
---
I spent 18 months turning my second
brain into my living research memory
. Let me explain. In my
second brain I currently have more
than 5000 notes in Obsidian, another 5000
in Readwise and some scattered across
Notion and Google Drive. And all this
grows at an average rate of 250 files per
month. And this is what I want. On the
left you can see my entire
Obsidian vault, this enormous mass. And
whenever I start working on something
like an article, a new project,
a new codebase, a new
feature, or whatever, I want to extract
high-signal nodes that are really
useful for my current work. And you might
ask why not just use
the codex code or
the notebook's LM code directly. And the thing is, I do
, but you need a
system that sits between those
harnesses and your second brain. Okay,
let's get back to the root of my problem, which is that I
always lose my research
. For example, my reading list is
a graveyard. When I'm browsing
social media and I come across an
interesting post, a new article, a
new YouTube video, or a
GitHub repository, it doesn't matter.
When I want to start working on
something, I never remember what I have in my
second brain, or I have to spend a
lot of time finding
meaningful notes that I can use in my
work, right? Another problem I
have is that I want this system to
be anchored in my personal notes,
my personal values, my
personal faith. I want this system to be
personal, to reflect my own
thoughts, right? That's why, in
today's video, Luis Franuis and I
will teach you how to create your own
AI research operating system. It
also includes code, so
you can try it yourself. I'm Pauline.
I am the founder and CEO
of Decoding AI, where I create a lot of
course content on how to
ship A-products. I am also the
co-author of the bestselling LM Engineers
Handbook. And the system, the
Air Research operating system that I
will show you in this video, is the system I
use in my daily work. And now, I'll
pass the torch to Lu Franis.
Thanks, Paul. I am Lu France Bush. I am
the co-founder and chief
technology officer of Towards AI, where
we create educational courses, and
I am also the creator of What's AI, a
YouTube channel where I explain
AI engineering techniques. I used to explain
AI research, but
now I'm focusing on AI engineering.
I am also the author of the book Building for
Production and, before that, I was a
doctoral student. So,
honestly, I make a living doing
research. I used to do a PhD
, as I said, in AI and doing tons
of research and
investigative work. Now I create courses,
write videos, do research for videos, and
create training programs for companies to
earn a living. And all these things I
do start with very good
research and also leveraging
tons of knowledge and
insights that we gain from creating
for clients. Well, I also
have a lot of nodes, just like Paul
, and we try to make the best use of them
. And, as you will see, we created some
kind of tool to take advantage of
our second brain, where, as
you will see, there will be some differences
between how I use it and how Paul uses it
. And that is the main objective
of the repository we created and of this
project: we want you to adapt it to your
needs. The overall goal is
how we can improve research
, but more specifically how
we can make better use of what we have
. So let's dive into it,
and first we need to figure out which
tool to use and when, because
this whole research system we
created isn't for every query.
If you just need a quick answer
, like a few quick questions
or just something
you'd simply Google, well, obviously
, just Google it or
ask JGBD Cloud, whichever system you
prefer. But the problem with
doing that is that if you have a lot of
follow-up questions or it's a
larger project that
you need to develop on, and you basically
have a very long context or
tons of information to
share, relying on Chibi isn't
ideal. And it also means that
you are completely dependent on the
architecture that OpenAI or the
Chibbit team built. So, the
next step here is to pose a
more complex problem. Do you need to
act quickly or do you want to build
a new feature and
do something very difficult? If you only have
a small repository for a
quick change or write an article, just
do one thing that you know won't be
repeated that much, definitely use
Codeex or Cloud Code or some agent you
trust. Sometimes you need to
keep investigating to improve it,
to increase efficiency, you can
optimize it further. And, generally,
when you have to do that, you want
your research sources, your
research, to be preserved so you can
refer to them in the future. So, if
you want a process like this where
the sources you find, the notes you
take are maintained over time, and
an agent can efficiently leverage them
and return to this information
to ask follow-up questions and
assimilate the content even better. And right now
, for example, when I make
a new video, I want the
system agent to also understand the
previous videos I made so as not to
duplicate content, not to repeat myself, and to
reference other content. In
this case, there are some
very interesting tools that you may
have tried before, such as Notebookm,
which is super powerful for researching,
efficiently assimilating content,
and returning to it. But the problem with
Notebook is, well, the main
problem is that it's not yours. You can't
do whatever you want with him. You can't
customize it as much as possible. It
is not native to the agent and
is obviously weak for coding tasks,
as it is browser-based only.
Therefore, it is far from ideal
for something that Paul and I needed
and that most
AI engineers generally need. Therefore,
if you need your agents to be able to take
advantage of everything you do, whether it's
a great research project, a new video
, whatever you write, make, or
program, you usually want your
other agents, your other projects, to be able to
take advantage of what you learn from what you
just did. And one thing we
recommend, especially for
production, obviously for a
product, is to create some kind of
recovery rack pipeline
with vector databases. But
this requires an infrastructure. It
's not really easy for people to
digest it quickly, check
notes, or make edits. It's difficult
to inspect by hand. You have to
build everything around it. It's
definitely far from
ideal for something I want to use
daily. Obviously, it's super powerful on a large
scale, very interesting, especially
in a product. But, as I said, this
project is for us, and I don't want
something live, super professional as a
product. I just want something that I can
use and that my agents and different
projects can take full advantage of
. So, the last question we
need to ask ourselves here is whether
we want everything there, but more
personalization. Therefore, a
custom research assistant that builds a kind
of Wikipedia that grows over
time and is easy to inspect
and use, where you have tons of
sources, documents, videos,
comparisons, implementations, new
research, new topics that you
keep adding and that you keep
wanting to easily take advantage of and review
. This is where you might
want to create something yourself. And in
our case, we created the custom
research operating system
that we will share in this
talk with exactly what we created and
how. But the downside is that it
definitely needs a bit more
setup than simply opening
the code in the cloud. Right now, the
main problem with using Agentic
's cloud code and other tools
is that you provide links to
codecs, PDFs, and
other information. For example, my most
recent video on loop engineering. And
then, in the next session, you use
Codeex, and you have to paste it all back together
or ask it to use the skills
and whatever structure Codeex or
jgpd, or whatever tool you use,
has created on the fly to
take advantage of what you did. The scripts
it ran, the scripts it had: you either
lost them all or stored them
within a skill that you have to
ask it to reuse, and that's usually not
ideal and it just grows and
grows over time. And the problem is
that all this information you're giving
the model isn't the bottleneck.
The bottleneck is how you can
leverage it in the future. Which
means that with an agent, the
context window is everything. The
database, the file system, the
memory, the reasoning space, it
has to do it all. And when
you stop the conversation, he loses
everything. And the point is that we don't
necessarily need to provide
more and more context for better
research. You need a
good memory and context management and
ideally some personality,
especially in my case when I make
videos. So what we did was
we decided to create a system with
simple files, mostly
Markdown files, that we can
easily leverage and that
agents can easily leverage. I
won't go into much detail here because
Paul will talk about it in depth and,
as I said, Paul has like 5000 notes or
something like that. I only have a few hundred.
But that's just to say that we must
keep in mind that we didn't start from scratch
. We both already had some kind of
large database. In my case, I made
hundreds of videos and took a lot of notes.
Therefore, I still need to
take advantage of these years of content I've
already created and tons of meetings I
have with my team, with clients
when we create for them, which I also
want to leverage because we learn so
much creating for people.
We have highlights of
interesting tweets that I see,
interesting articles that I see. And I want
all my projects to be able to take advantage of
my skills as an agent. So
I decided to change course and, instead of
having a folder for
coding skills in the cloud and having all
my meeting summaries in granola
and years of notes in Apple Notes and
tweets in a saved
Chrome tab, I automatically moved everything to
Obsidian. Obviously, it's just a
note reader, so you don't have to use it
. You can simply save it
locally. But I used Codeex to
set everything up so that granola would be
saved there automatically. I now
transfer my notes to Obsidian simply because it
has a good interface. I like it and
I can use it from my phone, my
computer, my Windows, Mac, everything.
Anyway, I moved everything to Obsidian,
which means it's stored
locally on my file system,
which means it's basically my
go-to tool for researching and building
everything I build now. And what
we built obviously takes advantage of that.
We created a repository called AI
Research OS for this workshop, which is
basically about
cloud coding skills and Codeex with
plugins to be able to do
very in-depth research on a
topic or a simpler search or destination
. Different tools
you can use. The most useful and complete
will be the research tool I
use, for example, when I start a
new video topic. And the goal of
this repository is for you to implement it,
install the cloud plugins, and
adapt it to your needs. Right now
, you can connect to, as I said,
Obsidian with my local notes. You can
use Readwise, notebook, lm, your
GitHub repositories, any
links you send to GitHub
or YouTube videos, and obviously web links and
documents. But there are many
things missing, as we will see at the end, which
you can easily implement by simply
asking Cloud Code or CodeEx to
do it. For example, I implemented
YouTube video transcription in just
a few seconds, with only one
prompt. It's very easy for CodeEx
to implement. The point is that this entire
repository and this entire project
are a very useful complement to my
own work. But, as I said,
it implements many cutting-edge
context and memory management features and techniques
that I think
AI engineers should be aware of. And now
Paul will dive into this whole
three-layered system we created with the
raw content, the index I
mentioned, and the synthesized
wiki-like version of all your notes, all your
research, and all your work. So it
will cover everything we did, how it
ended up, and show you how to use it. Okay.
Now I want to review the three versions
of our system, how it has
evolved over time, and,
more importantly, why we have
added more complexity. In the
first version, we wanted to limit it
to creating lessons for our
agent engineering course.
We wanted it to be very simple, with
an entry topic and a
research MD as the output. At the
entrance we had the theme plus a
set of golden links that
we had manually selected.
We applied this
in-depth research algorithm and generated a
static research MD file.
If we delve into architecture,
we first extracted the links from the
golden links, right? Because we already
know them. And we used them as
seed for the context of the
in-depth research algorithm, which was a
very powerful technique because we had
more context on how to formulate
our questions. During the
consultation rounds, we basically used
a very classic deep research algorithm
in which we had a
main agent, the orchestrator, who
created several questions based on the
initial topic and the extracted context.
Each agent managed their own
question and used Google-based Gemini
to essentially create Google
and gather various resources. And each
agent collects these resources that
return multiple links and creates
these executive summaries of each
link. And then it passes all this
information back to the
main agent, where the main agent
basically aggregates all this
information in a summarized way so as not to
exploit the context. We did this
for three rounds. Basically,
after three rounds of generating six
queries per round, we ended up with
about 40 or 50 links in total. So
you can imagine there's a lot of noise
there. That's why we also applied a
classification algorithm in which
we wanted to find the information
with the highest signal. And basically
, we compared each source to the theme,
the user's initial theme, and thus
extracted only the
top K elements based on the
ranking score; And for
the rest of the links,
we only keep the summaries and then
compile everything into this research MD file
, as a single
flat file that we use for each lesson of
our course in our particular use case
. But as you can imagine, it
was quite limited for the course.
It worked really well, didn't it? We generated
35 lessons very quickly. But
we wanted more. So we started
directing this deep research loop
to the second brain as well.
TRUE? Previously, it only directed to the
public web, which made it quite
generic, and we had to
manually find all those golden links.
So by directing this
deep research loop to the second
brain, where we basically
organically track all the
information from all the research
that we really want and filter,
we can organically bring together all
those golden rings in our
deep research algorithm.
Let's see what this new algorithm is like.
It's basically the same loop,
right? But now we turn to
our own sources instead of just
the public web. Now, for the
entry, we only have the theme because we don't
need the golden links. As I
said, golden links are
actually a reflection of our second
brain system. In theory,
you can also add them if you really want,
but that's the beauty of this new
strategy because you can simply
enter a topic as input and
you'll find everything you need. And
then we use this theme only as
seed 44 for the context to
generate the queries. And now we do
the same in-depth research algorithm
, right? The same rounds
of consultations, but instead of
just targeting the public web,
we now connect all our
secondary brains like Obsidian,
ReadWise, Notebook LM, GitHub. You
can also use, for example, Gemini Deep
Research for this, similarly to
how we use Notebook LM, or you can
extend it with whatever you want, for
example, YouTube, Google Drive, Notion,
or whatever makes sense in your
infrastructure. The idea is that
we now direct our
deep research algorithm queries to
our second brain plus the
public web, and then apply the same
algorithm as classification,
full scraping, summaries, and compile everything
into this research MD file.
But now we have another problem,
right? This research MD file
is static; It's a
stack of static data, and
research isn't usually static,
right? So, after you
finish with this file, you often
realize that you want to ask another
question, or that you're missing information and you do
n't need it anymore, or
you basically want to get more out of this
research MD file, and that
means you need to start all
this from scratch. And the operation I
showed you above is an
expensive operation; It consumes a lot of tokens and takes a
long time, so you don't want
to run it from scratch. And that's why
you need to add a wiki layer on top,
and that's why V3 of this system
is actually a
deep research algorithm plus an
LM knowledge base on top, also
known as a wiki layer. So, the
new algorithm looks like this. We have
input sources and an output wiki,
and the sources, as I said before, can
be like Obsidian, Notebook LM, Google
Drive or YouTube, Notion, even
custom URLs, right? That
's powerful too, because you use
tools like Bright Data to
analyze basically any
single-page application,
any type of site, any type
of public information out there.
You can put it in and then apply the same in-
depth research algorithm.
You store everything in row files,
right? Instead of compiling everything into one
research MD file,
we now store each file
individually and create an index
from all of these files. And
ultimately, we generated a wiki
about it, which we can consult.
Basically, we can consult the wiki
plus the index. Okay. This is just the
high-level architecture of the new
system. Let's get closer. So, what
I want to say to begin with is that you should
forget about the infrastructure you
think you need, such as
vector databases,
knowledge graphs, semantic search, and
text search. All of that is nice,
but it adds a lot of complexity,
especially for these
personal research operating systems,
personal wikis, that you want to use in a
very lightweight way. Therefore, I want
a file-based system
, a simple mechanism that is
deeply ingrained in the way
your computer works, and that's why we'll create
this entire system based solely on
files and references. There is no
database, only a simple reference-based index
. And to find out how it
works, we have an agent that reads an
index.tml file. Basically, it's a
catalog of all your data plus
summaries of each source and some
related metadata. For example,
here on the right, you can see part of
an index.tml file containing 10
sources and 38 wiki pages derived from
the sources, where we can see the list
of sources from the YAML file. The first
source. For example, as you can see,
it has the link to the original file
plus metadata such as the source,
title, authors,
publication date, abstract, and things like that, which
can be flexible, right? And
the next step is that, based
on this index file, we need to
point to all wiki pages,
all wiki derivatives, and all
row sources. Basically, this
ymo index file is an
entry point for our agent, right?
This is what we will give to our agent
so that he can reason how to find
our data; It's an index,
ultimately, right? The
next step is to understand what
the wiki actually looks like. On the left,
you can see the wiki's highlighting structure
, where we have the
raw folder, the wiki folder, and the
index. In the raw folder, we
actually only have the raw data
, which is immutable.
You don't want to touch them. The index points to
everything we need. And in the wiki,
we actually have derivatives created
by the LM that contain things like
comparisons between multiple
concepts, entities, or simply
simple notes as a reflection of our
questions or repositories that we ingest,
and we can create multiple notes
based on a repository, right? Or
open-ended questions that, based on
our questions that LLM has not yet been able to
answer, and everything you can
analyze about your raw data.
And on the right, based on Obsidian
, we can see the subgroup chart
reflected only as a function of this
index, and this is like the first
iteration. But as the wiki
grows, you can see connections made
between entities and concepts; For
example, concepts are things like
tool registration,
context compaction,
sandboxing, or entities are
open source, code, MCP, right?
So, as you can see, you can
start creating connections in a
visual and practical way. Now, the next
question is: how do we
actually consult this wiki? So, as I
said, the agent will have as input
this index file that contains
summaries and metadata about each
source. But what happens next?
Correct. The next step is
actually to go to the source wiki page
, where the source wiki page is
like an executive summary of each
page, which is basically not just a
summary, but a more expanded summary
of each source. And sometimes the agent
simply searches through this, gets what it
needs, and returns, which is very
token-efficient, right?
And if you can't find it within this
source wiki page, we also
need links to the derivative wiki,
such as concepts, entities, notes,
comparisons, etc. And only if you can't
find the necessary information
up to this point, do you really need it and
actually read all the raw source code
, right? That
basically contains the entire article
, the entire document, the entire video, or
whatever. This is achieved simply
through pure references and creating
this simple hierarchy, making
everything very
token-efficient. Now, the beautiful part is that
this wiki is truly alive; for
example, every question leaves a trace
on your wiki. So, for each
question, you can create a new
concept file, a new
note file, a new
comparison file, and each question is tracked
in a log. So basically,
the wiki doesn't evolve only when
you ingest new data or do a round
of in-depth research. Actually
, it evolves as you start
talking to her. TRUE? That's the
beautiful part, really. And in that
way, you can see a true reflection of
yourself, of what you haven't understood,
of all your questions from the past. And the
great thing is that the wiki never freezes,
right? Similar to
empty research files,
you can introduce a
new custom link that you think you
need in the wiki at any time, or even
conduct a new round of in-
depth research; Or, as I
said before, the wiki continues to
evolve based solely on
your questions. And another important thing
to understand is that this wiki is
not above your
second brain. TRUE? For example,
in my particular use case, I use
the PAR method, coined by Thiago
Forte, in which all my data is
structured between project areas,
resources, and archive. Where all my
notes, resources I save, sources I
save, PDFs, articles, or
whatever, are channeled directly into the
flat list of resources, and whenever
I need something, I simply
reference them in projects and areas,
right? And this obsidian is just an
immutable snapshot that the LLM never
touches. TRUE? So these are my
details. I really don't want the LM to
touch my personal notes that I write
manually. TRUE? So,
how can we use this wiki? As I said
, we have the great
obsidian snapshot, which is our second
global brain. And then, every time
we start working on a new
project, we reference this
second brain through this
deep research algorithm
that I explained and narrow it down to our
own project. TRUE? Basically
, every time we want to start
working on something, we run this
deep research cycle or start
ingesting some repositories,
articles, particular notes, etc. And we
generally do it through a
set of skills connected to a
harness. And a project can be
basically anything, like
writing a new article, making a
new video, or creating a
slideshow. I'm applying this technique
by making this slide, or
you can even apply it to something more
complex, like writing a book, creating
a course, or keeping track of an entire
codebase, right?
You can also use it for that. Basically,
a project can be anything you
want to do, as I said at the beginning,
transform research into
work. The project is the work and your
second brain is the research.
Now I want to show you some
demonstrations. What you need to do
is go to the AI
Research Operating System Workshop repository
, where you will find all the
skills necessary to run what
we presented in this presentation.
Everything is packaged as a
cloud-based code plugin, but
you can easily modify and install it
with any other harness.
Additionally, in the Readme file you can
find details on how to install
all the other dependencies, because
the problem is that this system depends
on tools like Obsidian, Readise,
Notebook, LM, etc. Therefore, you need to
configure specific
CLI or authentication issues. But I don't want to
waste your time with
configuration problems and I want to go
straight to the examples. Here I have
prepared three examples. The first is
an investigation into one of my
previous articles on
agent engineering, and within these files
I have a dump of ideas of everything I
knew I wanted to talk about on
this topic. And in addition to that,
I also added some references that I knew
100% that I wanted to add to this wiki.
And what we need to do to
actually activate the algorithm on this
file is open a cloud session
and then simply call the
investigation skill and direct it
to this file, and that's it. Everything
else is directly integrated into
the skill. You will understand my intention to
create a wiki about
agent harness engineering just by
looking at these files and the
topic; And you'll know that, before you start the
deep research algorithm, you
actually need to extract this
information to use as context
when formulating the questions for the
deep research algorithm.
Now we have to wait a little while for
the agent to think about this. In fact, I'll
put it in automatic mode to
speed this up. Correct. I used it
hundreds of times. I know it won't delete
anything from my computer or do anything
strange. Okay, this is the most
important part, right? It asks me how
deep I want the
deep research algorithm to be.
We have light, deep, and fast.
This primarily controls how many
questions you want to run per round and
how many rounds you want to run. And,
generally, light or fast is
more than enough because remember that
this process consumes many tokens.
Therefore, you only need to do a deep scan
when you really want to check
tons and tons of nodes. And for
this use case, I'll choose the light one
to speed it up. And in this use case, it
only does one round of three queries,
right? And for the quick one, he does two
rounds of three consultations. So I would
keep it within that spectrum. And now the
process will take between 10 and 20 minutes
to check my Obsidian, my readwise, my
notebook lm and run those queries
on it. And in fact I execute this
well and now let's open this wiki that
we created based on the previous promo
in Obsidian. And let's see what's inside
the wiki. We have three
large objects. Row files, which are
basically a row copy of what we
find. The index, which
contains all references to the
wiki. Correct? We can also
have this nice subgraph in Obsidian
where we can quickly understand what's going on
. This is created
based solely on this file.
And then the most interesting part is
inside the wiki where we have
comparisons, concepts, entities, and
sources. The sources contain the
executive summary of our
raw sources. Therefore, the LM does not
need to do it every time they read them and
needs to read the raw sources
, but only needs the
executive summaries that are calculated
only once during ingestion. And, for
example, for comparisons,
he immediately understood that he needed to
make comparisons between, for example,
AIC RAG versus file systems, or
compaction versus
recursive language models, or anything of
interest based on the sources. And the
most interesting part is the
concepts. Therefore, it
automatically extracted all the concepts we
need to understand from this stack
of resources. For example, if we open
the agent loop resources,
we can automatically search and
obtain this beautiful summary that
contains, for example, graphics, text,
and explains everything we
need to know about this topic. And we can
do the same with all the concepts
in this wiki or with the entities in the
wiki, etc. Okay. Now let's move on to the
second example. It's a simple example where I
want to learn more about
harness engineering and how
harnesses work. So in this
notice, I just want to share the three
open source repositories about
open source, Pi, and Hermas. And I don't
want to do any in-
depth research. TRUE? I just want to ingest
those repositories and explore topics like
the overall architecture,
agent architecture,
child agents,
memory system, and
final agent permission flow. Let's conduct the
investigation into these indications
. Now, what the research will do
is automatically clone all
these repositories and explore all the
repositories on the topics I
mentioned here, and it will create
individual-level nodes for each repository
on how they work, how
the architecture works at the repository level
. Then, we can create higher-level nodes
directly within the
wiki derivatives and compare other
architectures or create
aggregated architectures based on the
general trends of all those harnesses and
basically explore and learn everything we
want about
harness engineering directly from the code.
Again, I usually just run it in
automatic mode and let it do its own thing
, but I already ran this, right?
Here is the wiki for these
GitHub repositories, and again,
we have the row files, and we have
the index and the wiki. And here,
probably, within the
repositories, we can see the three
repositories. For example, within
the open kernel repositories
we can see empty files that
explain everything we need about
specific topics, such as the
permission flow, the memory system, etc. And
we can see this in all the other
repositories. And the most
interesting part here is that we have
comparisons in all of them, right?
So we can understand the
differences within the architecture
within these harnesses, or we also
have all the concepts extracted
from these repositories and we can
understand what the
key architectural decisions of these
repositories are. So you can go
crazy with this and it's very useful if you want to
, for example, write your own
harness. And the third example is
actually the simplest, which is based
simply on the ingestion of some
simple links. TRUE? And again, I'll
exit the previous run and
want to run this example from scratch
. And here I just want to show you that
you can also use this with a
very basic setup where I
just want to ingest three
custom random links. And as before
, I just pass this indicator and
the investigation process will begin. I want to
emphasize that you can run example
two in the GitHub repositories and
this example without any other
configuration, such as Obsidian, ReadWise,
or anything else. You can install
this plugin and run this
example because it doesn't depend on any
service other than Google
Core to obtain these URLs.
Again, if we go to Obsidian and explore
the wiki created from this
third example, we can see the index. We can
see the wiki itself with all the
sources, an executive summary for each
source, and all the extracted concepts
, entities, etc. The idea is that, as
you start asking questions
about it, everything starts to get
more interesting. Now, suppose we
want to ask, for example, a
question about harness engineering
based on the wiki created from
the GitHub repositories. So,
what we need to do is simply
press the research skill again
, point it to the wiki we
just created, and then ask our
question. Let's say I want to
learn more about the sandbox,
more specifically how the
remote sandbox works and how it
connects to Archers. Basically, it can
be any other question. And now what
will happen is that it will basically
consult this wiki. It will give you an
answer. And based on this,
you can also start creating notes,
comparisons, or perhaps it will extract and
find new entities that
interest you. Basically, it will start
updating the wiki. Very good. So,
where is this project headed? What
is it? What should you do first? It's
still difficult in some places. It
seems to need more connectors, as
you saw. We need to add Google Drive
, Notion, Slack, and many other
connectors that might be useful to you.
But to be honest, it's not really
helpful for me and my
current workflow, nor for Paul. Well, we haven't
added them yet because the core of
this project is that it's useful
to us and that you can take
care of adding whatever
you need. And the other
main objective of this project is to teach how to
manage memory and context.
Therefore, all these
additional functions are not really useful
for that purpose. There are other
weaknesses, such as the difficulty in knowing
which sources are outdated or
weak or strong compared
to other systems we build.
We know we can improve this, but
I insist that it's not really the
priority here. And finally, it's still
obviously a
builder workflow. You use it through
cloud code and CodeEx, and for me it's
simply in the terminal and I like it a
lot. Therefore, it is not a
polished final product with a beautiful
user interface or a nice
user experience. And, frankly, that's
by design. So we don't really
care about this because our goal is to
teach AI engineering. It's not about creating
the next best product. Even so,
we have some improvements that we want to
make very soon. From having
more robust linting to better
memory compaction, because that
's a big problem and, in general, it's
very complicated to manage memory
correctly. And the state of the art
is always progressing in that
direction. As I said,
we need better
source verification so we can trust them,
classify them correctly,
reuse them appropriately if
necessary, and
quickly assess as users whether a
source is relevant or not. And we have
other improvements to make, but they are
mainly for optimization and
for the future. And the thing is,
we've actually integrated all of that into
another product that you can even create
yourself, because we created a course
called Agent Engineering, in which
we created a
similar in-depth research system with a
writing and research agent, in which
we created a system with the same
goal: to be able to learn the best
practices of AI engineering. It's a
very in-depth course that I suppose
takes about 60 hours to complete, with a
final project that will be the
multi-agent system I just described and
that you will create yourself. So, if
this presentation and the
demo repository you viewed seemed
interesting to you, consider checking out the
Towards AI Academy with our courses
there, including the Agent Engineering course,
to learn more about
best practices when building
around and with agents.
