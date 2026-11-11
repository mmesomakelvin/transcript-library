---
video_id: "mMbPEf4V_hE"
title: "Why Every Agent Needs a Box — Aaron Levie, Box"
channel: "Latent Space"
topic: "business"
published_date: "2026-03-05"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=mMbPEf4V_hE"
duration: 4618
word_count: 3995
chunk: 3
total_chunks: 5
parent_video_id: "mMbPEf4V_hE"
---
it's doing at at you know kind of test
time compute capabilities thinking
levels all like the context rot issues
so many interesting you know kind of uh
uh capabilities that are that are now
improving. one sector that you have
that's interesting. Uh people are
roughly familiar with healthcare and
legal but you have public sector in
there. Yeah.
&gt;&gt; Uh what's that like? What what is that?
&gt;&gt; Yeah. And and we actually test against I
don't know maybe 10 industries. We we
end up usually just cutting a few that
we think have interesting gain. So
public sector is one a lot of like
government type documents. Um
&gt;&gt; what is that? What is a government type
documents? Like government filings tax
return
&gt;&gt; probably not tax returns. [laughter] It
would be more of what would the
government be using uh as data. So um so
think about research that that type of
of of data sets and then we have
financial services for things like data
rooms and what would be in an investment
perspectus.
&gt;&gt; That one you can dog food.
&gt;&gt; Yeah. Exactly. Exactly. Yes. [laughter]
Yes. So uh so we we run the models um in
now you know more of an agent mode but
but still with with kind of limited
capacity and just try and see like on a
like forlike basis what are the
improvements and again we just continue
to be blown away by how how good these
models are getting.
&gt;&gt; Yeah. I I mean I think every serious AI
company needs something like that where
like well this is the work we do here's
our company EVL and if you don't have it
well you're not a serious AI company.
&gt;&gt; There's two dimensions right? So there's
there's like how are the models
improving and so which model should you
either recommend a customer use which
one should you adopt but then every
single day we're making changes to our
agents and you need to know
&gt;&gt; if you regress if you know yeah you know
I've been fully convinced that the whole
agent observability and eval space is
going to be a massive space um super
excited for what Brain Trust is doing
excited for you know Langmith all the
things and I think what you're going to
I mean this is like every enter like
literally every enterprise Right now
it's like the AI companies are the
customers of these tools. Every
enterprise will have this. You'll just
have to have an eval of all of your work
and like we'll you'll have an eval of
your RFP generation. You'll have an eval
of your sales material creation. You'll
have an eval of your uh invoice
processing and and as you you know buy
or use new agentic systems, you're going
to need to know like what's the quality
of your of your pipeline. Yeah.
&gt;&gt; Um so huge huge market with agent eval.
&gt;&gt; Yeah. And and you know, I'm gonna shout
out your your team a bit. Your CTO, Ben,
uh did a great talk with us last year
and he's gonna come back again for
World's Fair. Y
&gt;&gt; just talk about your team like brag a
little bit like I think I I think people
take these email numbers in pretty
charts for granted, but no, there I mean
there's there's lots of really smart
people at work doing all this.
&gt;&gt; Biggest shout out uh is we have we have
a couple folks at Ditia Sedarth uh that
that kind of run this. They're like a
you know kind of tag tag team duo on our
evals. Ben, our CTO, heavily involved,
Yash ahead of AI, uh, you know, bunch of
folks and, um, Eval's one part of the
story, and then just like the full, you
know, kind of AI agent team is, uh, is a
is a pretty, you know, is core to this
whole effort. So there's probably I
don't know like maybe a few dozen people
that are like the epicenter and then you
just have like layers and layers of of
kind of concentric circles of okay then
there's a search team that supports them
and an infrastructure team that supports
them and it's starting to ripple through
the entire company but there's that kind
of core agent team um that's a pretty
pretty close uh close-knit group.
&gt;&gt; The search team is separate from the
infra team.
&gt;&gt; I mean we have like every every layer of
the stack we have to kind of do except
for just pure public cloud. Um but um
you know we we store I don't even know
what our public numbers are in you know
but like you can just think about it as
like a lot of data is is stored in box
and so we have and you have every layer
of the of the stack of you know how do
you manage the data the file system the
metadata system the search system just
all of those components and then they
all are having to understand that now
you've got this new customer which is
the agent and they've been building for
two types of customers in the past
they've been building for users and
they've been building for like
application
And now you've got this new agent user
and it comes in with a different sub
property sometimes like hey maybe
sometimes we should do embeddings an
embedding based you know kind of search
versus you know your your typical
semantic search like it's just like you
have to build the the capabilities to
support all of this and we're testing
stuff throwing things away something
doesn't work and and not relevant it's
like just you know total chaos but but
all of those teams are supporting the
agent team that is kind of coming up
with its requirements of what what do we
need?
&gt;&gt; Yeah. Uh we just came from a fireside
chat where you did and you you talked
about how you're doing this. It's it's
kind of like an internal startup within
the broader company. The broader
company's like 3,000 people, but you
know there's there's this is a core team
of like well here's the innovation
center and like that every company kind
of is run this way.
&gt;&gt; I want to be sensitive. I don't call it
the innovation center only because I
think everybody has to do innovation. Um
there there's a part of the the the
company that is is sort of do or die for
the agent wave.
&gt;&gt; Yeah. And it only happens to be more of
my focus simply because it's existential
that we get it right.
&gt;&gt; Yeah.
&gt;&gt; All of the supporting systems are
necessary. All of the surrounding
adjacent capabilities are necessary.
Like the only reason we get to be a
platform where you'd run an agent is
because we have a security feature or a
compliance feature or a governance
feature that that some team is working
on. But that's not going to be the make
or break of of whether we get agents
right. Like that already exists and we
need to keep innovating there. I don't
know what the right exact precise number
is, but it's not a thousand people and
it's not 10 people. There's a number of
people that are like the the kind of
like you know startup within the company
that are the make or break on everything
related to AI agents, you know,
leveraging our platform and letting you
work with your data and that's where I
spend a lot of my time and Ben and Yosh
and Diego and Terry, you know, these are
just, you know, people that that you
know, kind of across the team are
working.
&gt;&gt; Yeah. Amazing. How do you how do you
think about I mean you talked a lot
about like kind of read workflows over
your box data right you know genic
search questions queries etc but like
what about like write or like authoring
workflows
&gt;&gt; yes I've already probably revealed too
much actually now that I think about it
so um I've
just us
I guess I would just uh I'll make it a
little bit conceptual uh because again
I've already I've already said things
that are not even GA but but we we've
kind of like danced around it publicly
so yeah okay just like hopefully nobody
watches this um It's tidbits for the
highly engaged to go figure out like
what exactly um you know is is your sort
of line of thinking. They can connect
the dots.
&gt;&gt; Yeah. So, so I would say that that uh we
you know as a as a place where you have
your enterprise content. There's a use
case where I want to you know have an
agent read that data and answer
questions for me. And then there's a use
case where I want the agent to create
something and use the file system to
create something or store off data that
it's working on or be able to have, you
know, various files that it's writing to
about the work it's doing. So we do see
it as a total read write. The harder
problem has so far been the read only
because because again you have that kind
of like 10 million to one ratio problem
whereas writes are a lot of that's just
going to come from the model and and we
just like we'll just put it in the file
system and kind of use it. So it's a
little bit of a technically easier
problem, but the only part that's like
not necessarily technically hard. It's
just like it's not yet perfected in the
state of the ecosystem is, you know,
building a beautiful PowerPoint
presentation is still a hard problem for
these models like like we still, you
know, like like the these formats are
just were not built for
&gt;&gt; they're working on it.
&gt;&gt; They're they're working on it.
Everybody's working on it.
&gt;&gt; Everybody launch is like, well, we do
PowerPoint now.
&gt;&gt; We're getting Yeah. getting a lot
getting a lot of better each time. But
then you'll do this thing where you'll
ask the update one slide and all of a
sudden like the fonts will be
&gt;&gt; just like a little bit different, you
know, on two of the slides or it moved,
you know, some shape over to the left a
little bit. And again, these are the
kind of things that like in code
obviously you could really care about if
you really care about, you know, how
beautiful is the code, but the end user
doesn't notice all those problems. In
file creation, the end user instantly
sees it. you're like, "Yeah, but like
paragraph 3, like you literally just
changed the font on me." Like, it's a
totally different font and like midway
through the document.
&gt;&gt; Those are the kind of things that you
run into a lot of the in the content
creation side. So,
&gt;&gt; we are going to have native agents that
do all of those things. They'll be
powered by the leading kind of models
and labs. But the thing that I think is
is probably going to be a much bigger
idea over time is any agent on any
system again using Box as a file system
for its work. And in that kind of
scenario, we don't necessarily care what
it's putting in the file system. It
could put its memory files. It could put
its, you know, specification,
you know, documents. It could put, you
know, whatever its markdown files are,
or it could, you know, generate PDFs.
It's just a it's a workspace that is is
sort of sandboxed off for its work.
People can collaborate into it. It can
share with other people. And and so we
we're thinking a lot about what's the
right, you know, kind of way to to
deliver that at scale. I wanted to come
into sort of the sort of AI
transformation or AI sort of uh
operations things. Um, one of the tweets
that you that you wanted to talk about,
this is just me going through your
tweets by the way. Okay. I mean, like
[laughter] this is read one by one.
&gt;&gt; You're you're the easiest guest to prep
for because you you already have like
this is this is what I'm interested in.
I'm like, okay, well,
&gt;&gt; are we going to get to like like
[laughter] February, January or
something? Where are we in the in the
timeline? How far back are we going?
&gt;&gt; Can you can you describe boxes a set of
skills? Right. Like that that's like
that's like one of the extremes of like
well if you you just turn everything
into a markdown file then your agent can
run your company.
&gt;&gt; Like you just have to write find the
right sequence of words to
&gt;&gt; Yes. [laughter]
&gt;&gt; to do it.
&gt;&gt; Oh, sorry. Is that
&gt;&gt; So I think the question is like what if
we documented everything the way that
you exactly said like um let's get all
the Fortune 500s uh prepared for agents
and like you know everything's in golden
and and nicely filed away and
everything. what's missing like what's
left right like
&gt;&gt; you've you've run your company for a
decade like
&gt;&gt; I think the challenge is that that that
information changes a week later
&gt;&gt; and because something happened in the
market for that customer or us as a
company that now has to go get updated
and so these systems are living and
breathing and they have to experience
reality and updates to reality which
right now is probably going to be humans
you know kind of giving those g giving
them the updates and you know there is
this piece context graphs as the kind of
very viral. Yeah. And I I I was like a I
I I thought it was super provocative. I
agreed with many parts of it. I disagree
with a few parts around, you know, it's
not going to be as easy as as just if we
just had the agent traces, then we can
finally do that work because there's
just like there's so much more other
stuff that that's happening that that we
haven't been able to capture and
digitize. And I think they actually
represented that in the piece to be
clear. But like there's just a lot of
work, you know, that that has to you
just can't have only skills files, you
know, for your company because it's just
gonna be like there's gonna be a lot of
other stuff that happens
&gt;&gt; change over time.
&gt;&gt; Yeah.
&gt;&gt; Most companies are practically
apprenticeships.
&gt;&gt; Most companies are practically
apprenticeships.
&gt;&gt; Like every new employee who joins the
team like you spend one to three months
like ramping them up. Yes.
&gt;&gt; All that tacet knowledge is not written
down.
&gt;&gt; Yes.
&gt;&gt; But like it would have to be if you
wanted to like give it to an Asian,
right? And so like that seems to me like
to be
&gt;&gt; one is I think you're going to see again
a premium on companies that can document
this much. There'll be a huge premium on
that because because you know can you
shorten that three-month ramp cycle to a
twoe ramp cycle that's an instant
productivity gain.
&gt;&gt; Can you dramatically reduce rework in
the organization because you've
documented where all the stuff is and
where the answers are. Can you make your
average employee as good as your 90th
percentile employee because you've
captured the knowledge that's sort of in
the heads of of those top employees and
make that available. So like you can see
some very clear productivity benefits if
you had a company culture of making sure
you know your information was captured,
digitized, put in a format that was
agent ready and then made available to
agents to work with. And then you just
again have this reality of like at a
10,000 person company mapping that to
the you know access structure of the
company is just a hard problem is like
it's like yeah well you just not every
piece of information that's digitized
can be shared to everybody and so now
you have to organize that in a way that
actually works. There was a pretty good
piece um this this uh this piece called
your company as a file is a file system.
I don't did you see that one?
&gt;&gt; Nope.
&gt;&gt; Uh yes you saw it. Yeah. And and uh I
actually be curious your thoughts on it.
um like an interesting kind of like we
we agree with it because because that's
how we see the world and uh we have it
up. Okay. But but it's all about
basically like you know we've already we
we're already organized in this kind of
like you know permission structure way
uh and and these are the kind of you
know natural ways that that agents can
now work with data. So it's kind of like
this this you know kind of interesting
metaphor but I do think companies will
have to start to think about how they
start to digitize more more of that
data. What was your take? Yeah. I mean
like the company is probably like an
acid compliant file system
&gt;&gt; which I'm guessing box is right. So
yeah.
&gt;&gt; Yes.
&gt;&gt; Yeah.
&gt;&gt; Which you have a great piece on. But
&gt;&gt; uh yeah. Well I [laughter] I my my my
direction is a little bit like I want to
rewind a little bit to the graph word.
You said that's the the magic trigger
word for us. I always ask what's your
take on knowledge graphs
&gt;&gt; because every especially every data
database person I always want to see
what they think. There's been knowledge
graphs cycles and you've seen it all. So
&gt;&gt; I actually am not the expert in
knowledge graphs. So so that you might
need to
&gt;&gt; you don't need to be an expert. I think
it's just like well how how seriously do
people take it? Like is is there a lot
of potential in in the HVAI?
&gt;&gt; Uh well can I can I uh understand first
if it's um is this a loaded question in
the sense of are you super pro super con
super anti medium?
&gt;&gt; I see I see pros and cons. Uh but I I
think your opinion should be independent
of mine.
&gt;&gt; Yeah. No no totally. I just want to see
what I'm stepping into. No, I know it's
a and it's a huge trigger word for a lot
of people in our audience and they're
trying to figure out because
&gt;&gt; like why is this such a hot now it
&gt;&gt; because a lot of people get graph
religion
&gt;&gt; and they're like everything's a graph
like of course you have to represent as
a graph or well how do you solve your
knowledge um changing over time well
it's a graph
&gt;&gt; and and I think there there's that line
of work and then there's there's a lot
of people who are like well you don't
need it and both are right [laughter]
&gt;&gt; yeah and what do the people who say you
don't need it what are they arguing for
&gt;&gt; markdown files simplicity
&gt;&gt; versus it's it's structure versus less
structure, right?
&gt;&gt; I think the tricky thing is um is is
again when this gets met with real
humans, they're just going to their
computer. They're just working with some
people on Slack or Teams. They're just
sharing some data through a
collaborative file system and Google
Docs or Box or whatever. I certainly
like the vision of most most knowledge
graph, you know, kind of futuristic kind
of ways of thinking about it. Uh it's
just like, you know, it's 2026. We
haven't seen it yet kind of play out as
as I mean I remember you remember Lee um
in like actually I don't I don't even
know how old you guys are but for for to
show my age I remember 17 years ago
everybody thought enterprises would just
run on wiks
&gt;&gt; and uh and not even I mean Confluence
actually took off for engineering for
sure like unquestionably but like this
was like everything would be in the wiki
&gt;&gt; and I think based on our uh our uh
general internal style of of what we
were building like we were just like I
don't know people just like want a
workspace they're going to collaborate
with other people.
&gt;&gt; Exactly. So you you were anti-nowledge
graph.
&gt;&gt; Not anti not anti
&gt;&gt; I'm not I'm not anti because I think I
think your search system I just think
these are two systems that probably but
like I'm I'm not in any religious war. I
don't want to be in anybody's YouTube
comments on this. This is not a fight
for me.
&gt;&gt; We love your comments. Get in the
comments.
&gt;&gt; Okay. Uh but like but I [laughter] I
it's mostly just a virtue of what we
built and we just continued down that
path
&gt;&gt; and um and that that was what we
pursued. But I'm not this is not a you
know kind of this is not a
&gt;&gt; it's not existential for you. Great.
&gt;&gt; We're happy to plug into somebody else's
graph. We're happy to feed data into it.
We're happy for agents to to talk to
multiple systems. Not not our fight.
&gt;&gt; Yeah.
&gt;&gt; But I need your answer. You know, graphs
are nerd types is very effective nerd.
&gt;&gt; See, this is this is one one opinion and
then I've
&gt;&gt; I think I think the actual graph
structure is emergent in the mind of the
agent in the same way it is in the mind
