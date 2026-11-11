---
video_id: "BmGC58Opifc"
title: "Context Windows are Stupid"
channel: "Jaymin West"
topic: "ai-llms"
published_date: "2026-03-09"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=BmGC58Opifc"
duration: 833
word_count: 2773
---
I have yet to see a company or product
take context management very seriously.
And what I mean by that is how are we
mitigating context blow? How are we
improving LLM performance? So today I'm
going to talk about a few different
strategies that I've seen other
companies take and some strategies that
I'm coming up with as well as some
researched strategies that I think are
interesting. So if you're interested in
keeping the cost of your LLM usage down,
reducing context blow and improving the
performance of your LLM, I recommend
stick around for this one because I'm
going to do a deep dive into context
management strategies. Let's start with
the main problem here and that problem
is context blow. So right now the way
that LLM work is you have a conversation
with them or they do turn-based
conversations with themselves and as the
context grows larger and larger as they
continue to do work, the per API call
cost goes way up and the performance of
that LLM, that specific agent session
that you're running, goes way down
because everybody knows that when LLMs
have more tokens, more context blow, the
output tokens are going to be worse and
worse. Let's start by talking about the
most basic but most widespread context
management strategy which is this
conversational pattern. So what we have
is you use a website like ChatGPT or
cloud.ai and when you start a new
conversation with the agent, that agent
gets the system prompt as well as any
memory files that it has produced by
itself like in the background based on
previous conversations or anything that
you have given it to remember for future
sessions. And then you can imagine you
have a conversation with the agent, you
go through multiple turns and then the
context window just ends and you're
prompted to start a new conversation.
This is something that I think we're
going to look back on in a year or two
and say why were we using that pattern
because this is such a naive approach to
the context problem that I'm blown away
that companies haven't jumped on the
opportunity to make this system better.
Imagine a chat GPT interface or Claude
interface where you just go and it
already has all the memories of your
previous conversations. You don't have
to start a new conversation. There's no
such thing as like these email thread
type conversations. You just have an
agent that you go talk to and it has all
the memories of the previous things
you've worked on and that's just handled
very well in the back end. So, let's
take a look at something more advanced.
This is how Claude code manages context.
So, if you have used Claude code, you
know that once you get it to a certain
point in the conversation, Claude code
tends to compact that conversation. So,
we can imagine just for the purpose of
this example that 90% is the threshold
where Claude code will take that and
then compact that. So, how this works is
you boot up a Claude code session, it
gets that system prompt, right? You have
a conversation with it.
You hit that context threshold and then
all of that context, so in this case
180,000 tokens, is sent in a single API
call back to Claude, back to Anthropic's
API, and then that context is compacted.
And so, what you end up with next is
this new chain where you have the system
prompt file as well as a summary for the
older turns and then the output of the
most recent turns. So, there is some
recency bias here, which is great.
That's a step in the right direction,
but this is still a very naive approach
cuz imagine this LLM call
where this agent is receiving 180,000
tokens and it has to return a 5,000
token or whatever number token summary.
That is just inherently going to be very
lossy, right? You're going to lose a ton
of context, a ton of valuable
information. And this new agent session
that starts up, this new version of the
conversation, is not going to have the
information that it needs to work with,
to proceed with the task as you are
hoping to. This is better than having to
start a new conversation, like you run
out of context and you just have to
start a new conversation. This is a step
in the right direction, but again, I
think this is a very naive approach.
Now, I'm going to talk about a few
examples that I have been building, that
I've been working on and thinking about.
I'm not saying that these are better by
any means than any other current system
out there. These aren't a comprehensive
list, but I'm just showcasing how I'm
starting to think about this problem and
how I think other people should start
approaching the problem of context
management. This is a diagram of what a
project I have called sapling does in
the background. I'll link sapling down
below. It's basically a custom agent
runtime that I've been building, but
sapling essentially treats context
management as an active and continuous
part of the system. So, instead of this
like reactive step that happens at the
end of a context limit, sapling is
constantly pruning context, making
context more dense so that agents
working with a specific context window
aren't going from this 180,000 tokens of
rich context to 5,000 tokens of
cross your fingers, I hope it's good
context. So, let me walk through here
what sapling does. So, sapling looks
initially like any other LLM
conversation. You have the system prompt
and the task that you've given the
agent. The agent will go through turns.
These could be tool calls, these could
be reading files, this could be user
messages even. And then in between,
let's say turn four and turn five here.
So, turn five hasn't happened yet. After
turn four, context is nearing this
threshold, let's call it 50%.
And all of this context is passed to a
pipeline. Sapling ingests this,
evaluates it, compacts it, budgets the
context, and then renders an updated
version of that context window. So, this
is a complicated step. There's a lot
happening behind the scenes here. But in
the case of sapling, there is no second
LLM call that needs to happen. This is
all being done with code, which I don't
know if that's the best approach. That's
the approach I'm taking to save on cost,
but I'm not saying that this is by any
means the best solution to this problem.
So, the context pipeline gets the result
of all of these steps, this ingest,
evaluate, compact, budget, render steps,
and then turns one and two have been
processed by the pipeline. So, say the
pipeline evaluated that turn one and
two, these can be condensed. What this
looks like is that now we have an agent
where this is the same conversation,
right? This is the same conversation I
was having over here, but in the
background, what happened to the context
window of that conversation of that
agent run is now we have the system
prompt in the task that's remained
unchanged, but we have this working
memory step,
which is the result of turns one and two
having been processed. And then we have
active context. So, this is current
things that the model is working on, any
errors that I ran into, any tasks that
it has to work on.
And then we also have turn three and
turn four, which are the same from over
here. Those are just verbatim copied in
because there's a recency bias, right?
This is just a toy example of what
Sapling does. I'm not necessarily saying
that this is a concrete rule where the
most recent two turns are carried over,
right, by any means. Let's just say that
the system determined that these two
turns were still important for the LLM
to have in raw context, and so those
were carried over just without any
changes made to them, without any
compaction.
And then we can see that in between turn
four and turn five, like I said, the
context is condensed, and then turn five
happens with this being the API call
rather than this being the API call.
So, the goal is that context remains
below a certain threshold, let's call it
50%, without information that is
important, that is guiding the agent
being lost, and also without any context
bloat happening. Once again, this is an
active process. This is happening
between every API call. This isn't
something that the user has to manage.
This isn't something that the user has
to be paying attention to when it comes
to how much context they're we're the
agent. This is just always happening in
between every API call to the model.
Now, let's move on to an example of a
conversational agent that doesn't run
out of context, that doesn't hit this
context limit, you have to start a new
conversation. What this looks like is we
have this orchestration agent, which is
a conversational agent, and while it is
working, it's actively told to delegate.
So, this does a few things. Right off
the bat, it saves context from the
orchestration agent, so that the
orchestration agent doesn't have to go
read a bunch of files and fill up its
context window with things that may or
may not be related. That is what
delegation does. It parses through all
of the data and then returns back just
the most relevant pieces of information
that this top-level agent is going to
need. Now, while the conversation is
happening with the agent, we can imagine
these turn three, turn four, turn five
here. These take up context, though. So,
you can see we're getting close to this
threshold that we have here.
Call it 80%, whatever percent you want
it to be.
So, instead we have this focus agent,
which is just a one-shot agent. This is
not a long-lived process. This isn't
like a another conversational agent. And
what this does is it has the same system
prompt and task as the orchestration
agent, as well as instructions on how to
compact that information from turn
three, turn four, turn five. So, we can
imagine that as the agent is running, it
determines turns three through five can
be deleted, and the focus agent results
are just put back in there. So, then you
end up with a context context window
that is never really running out of
space, because there's always this
background process of context bloat
mitigation and context compaction that's
just happening in the background. So,
this is a paradigm that I expect
companies like OpenAI and Anthropic to
introduce into platforms like ChatGPT
and Claude.ai, where instead of having a
single conversation that just goes until
you hit a context limit, you are
introduced to an agent that is
long-lived or seemingly long-lived where
you're just always having a conversation
with ChatGPT or Claude and you're not
having to split up your different
conversation, your different topics into
different conversations. So, there's
this shared context that happens and
whether this orchestration agent has
access to other memory files, whether
that's something that is delegated away,
I want more memory on this specific
thing or more context on the user for
this specific domain, then it delegates
that and returns the results. I'm not
saying that this is the exact pattern
that these companies are going to use.
I'm just saying something I'm looking
out for is a platform like ChatGPT to
become less of like you have all of
these threads of conversations and more
of you just show up and ChatGPT is just
there and you can just talk about
whatever forever. You're not going to
hit a context limit because there's this
background context processing that's
happening. This would be much more
complicated, I think, in a real use
case, but this is just how I'm thinking
about it. Something else that I wanted
to mention was this recursive language
models paper that came out at the end of
December in 2025
and talk about their approach to context
problem. It's a bit different than the
other things that I've talked about, but
I'll dig into what exactly this looks
like and why it's important and why I
think we already have this, but let's go
over what it's actually doing. So, in
this paper, what we have is a
arbitrarily long context. In the paper,
they give this example of a 10 million
plus token data set or corpus that is
being
Right, you ask the LLM a question about
this corpus and then obviously you can't
fit all 10 million plus tokens into a
single context window. So, their
approach was to use uh Python
environment where the input is loaded as
a variable here and then the LLM is
writing code to look at the input,
decompose it into chunks, and invoke
itself recursively.
So, what this looks like is we have this
sort of base LLM agent down here, which
is recursively calling upon these
recursive language models to go through
and look at specific snippets of this
massive data set that was input. So, you
can imagine this section here is a loop
where these three agents could scale to
any number of agents of recursive LLM
agents. At the end, once the base LLM
here is satisfied with its answer, it
provides that back to the user. Now,
this is super interesting. I think this
is a cool paradigm, but this isn't
anything new, right? You can think of
how Claude Code operates, where your
code base is probably several million
tokens in length, and you're not dumping
that all into Claude Code. So, Claude
Code uses sub-agents, uses explorer
agents, uses bash commands, and writing
Python code. This thing already happens.
This already exists in the world right
now in systems like Claude Code, where
we have this base agent that is calling
recursive LLMs, as well as doing things
like writing Python code to understand a
big piece of data, aka your code base.
And then, once it's satisfied with its
answer, it presents that to the user.
So, again,
the paper is interesting, but this isn't
anything new. Claude Code already does
this, and other agent runtimes already
do this. So, these are just a few
possible approaches that I've been
thinking about when it comes to the
context blow problem, and why I think
context windows as a limitation for LLMs
are stupid, and why I think we're going
to see huge shifts in how we're
interacting with agents, right? Agents
are going to become less of these
conversational one-off things that you
have like
one chat about one topic, and then you
have to start a new chat about new
topic, and no memory is persisted. That
is just going to be seen as a very
naive, arcane approach, I think, in the
next few years here. Hopefully, this was
of value to you. I'll link Sapling down
below. I'll link the paper down below.
If you want to go take a look at those
things more in depth, I'd recommend
doing so. Let me know what you think
about the context below problem. If you
have another approach that you're taking
for this, let me know down in the
comments below cuz I am very curious.
And these are just the approaches that
I've been taking, not necessarily the
approaches that I think are best or will
be like the end all be all for the
context below problem. So,
thank you so much for watching and I
will see you again in the next video.
