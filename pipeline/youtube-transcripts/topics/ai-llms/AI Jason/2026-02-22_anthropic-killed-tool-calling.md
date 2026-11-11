---
video_id: "3wglqgskzjQ"
title: "Anthropic killed Tool calling"
channel: "AI Jason"
topic: "ai-llms"
published_date: "2026-02-22"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=3wglqgskzjQ"
duration: 849
word_count: 2866
---
So, Anthropic has released a list of
really interesting updates for the
Agenda 2 calling that not a lot of
people are talking about or paying
attention to. But, I think it is really
a big deal if you are building agents,
particularly for long-running and
complex tasks. And this is what I want
to talk you through today, what it is
and how can you apply to your agent. So,
what Anthropic here has, I can almost
consider as tool calling 2.0. If you're
not familiar with tool calling concept,
tool calling is the foundation of
agents. It transform large language
model from outputting pure text to
outputting a specific JSON that can be
used to invoke any API or functions. So,
that enables large language model to
take actions in real world. And the
mechanism of tool calling or function
calling hasn't been really changed for
the past 2 years. Basically, you will
give large language model a list of tool
definitions. It has title, name,
description, and most importantly, the
parameters that agent need to generate
to run this function. Then, when user
ask an agent question like, "What's the
weather in Paris?" it will send both the
user question to schema to the large
language model, which will return tool
call text look something like this,
where the model decide to call get a
weather function with param Paris. Then,
on server side, we will run the function
with this specific param, get a
response, and then send all the previous
message plus this new tool response back
to model. And in the end, the model
return a synthesized message. So, when
you look at this process, it's actually
kind of manual and basic, but because
everything is happening automatically,
it feels kind of magical. This is
exactly what is happening when message
your cloud bot and it is showing typing.
Behind scenes, it's doing this ping-pong
round trip to decide what tool to call,
output params, run function, get a
response back, decide the next step.
But, this tool concept was introduced 2
years ago also has a lot of problems and
limitations. The biggest issue is
efficiency. So, for more complex tasks
where agent will run multiple different
tools in a row, we're basically purely
relying on large language model to
generate the parameters for each
function. And this can lead to some
non-deterministic behavior, as well as
those of waste in the token context
window. Let's just take one basic
example. Let's say your agent has access
to a list of Gmail related tools, and
you ask it, "What are the all the emails
we have from Bob in my Gmail inbox?"
What happened is agent will first say
you try to call the function search
email with parameters Bob, which can
return a list of different email IDs,
because that's how their API endpoint
works. Then to get each email, agent
will need to run read email tool with ID
one, then do it again for the other
email ID, repeat multiple times until it
get all the information. And here we are
relying on large language model to
regenerate the ID exactly same. And also
some of tool MCP, their response result
is gigantic.
Like for the search email function, it
return us a huge amount of metadata that
we don't really need, even though we
just need the ID to be able to invoke
the next function.
But all those information just stay and
eat up our context window unnecessarily.
And this type of situation can get even
worse in some other situation where the
function tool call param is actually
complicated. Let's say you give your
agent a task to write a blog about AI
news. And it can run a web search first,
which return list of URL. And for each
of URL, it will run the web fetch tool,
which will return HTML alongside a whole
bunch of noise in the HTML as well. And
in the end, if you have a specialized
tool to write blog where it would take
raw content and output a well-written
blog, then large language model will
need to manually recreate all the raw
content from each web fetch function to
pass into this write blog tool. And this
is going to be very expensive and with
whole bunch token unnecessarily. And
this problem is not going to be solved
by just having model with bigger context
window, cuz even though today's modern
model has a 1 million context window,
the actual effective context window is
just somewhere between 128k to 200k. So
you almost always want to optimize what
goes into context window. And this is
what Anthropic's new advanced tool call
release is so interesting. They released
a list of different improvements to its
tool call capability to solve exactly
this problem. And I will talk you
through one by one. Firstly, let's talk
about programmatic tool calling. This is
one of the most important release here.
The main idea here is very similar to a
paper called executable code actions.
So instead of using large language model
to be the glue to take a response from
one action and passing to next action,
what if you can just give a model
environment where it can access any
tools the agent has access to and just
let large language model to output a
piece of a code to run multiple
different functions. It will know how to
use code to passing the result from one
function to the other. It can even use
things like for loop, conditional pass
to achieve more complicated workflow in
a very deterministic and token efficient
way.
And this paper was released when we were
still on like GPT-4 era, but the
improvement of tool use was already
significant. And Cloudflare also had
something similar released last year
called code mode.
They found that large language model is
much better at writing code rather than
outputting JSON like this for calling a
tool. So getting large language model to
perform task with tool calling is almost
putting Shakespeare through a month long
class in Mandarin and then ask him to
write a play. So their point of view is
that large language model is just going
to be so much better at writing code
rather than outputting JSON and
reasoning about it, designing the next
step. So they also have code mode where
it has function to convert any MCP to a
TypeScript so the agent can write a code
to invoke those MCP tools. And this
Anthropic's programmatic tool calling is
exactly the same concept. So instead of
just getting model to run one tool call
time, see the response and decide to
next action, they can just get a model
have access in an environment they have
direct access to all the MCP tools. Then
the model can just write a piece of code
like this to invoke those MCP tools so
that they can contain whole bunch of
noise and the context within the
function rather than exposed in the
context window. And in their
experimentation, they compared two
methods side by side to get same model
performance on puzzle resolving tasks.
You can see the context window of
programmatic tool call is so much
smaller than the traditional tool call.
And Ops 4.5 is able to perceive much
further on this task completion compared
with previous one. And the way they
design this make it very easy for you to
enable programmatic tool calling in your
existing agent setup without
restructuring the whole agent
orchestration. All you need to do is in
your large language model response,
making sure you include this code
execution function. So code execution
function is a sandbox where agent will
use to write and execute a code. Then
for each tool that you pass into the
large language model, you can pass this
new param called allowed caller. Pass
this code execution 2026 0120 as one of
the callers here. With this, the
programmatic tool call is already
automatically activated. It will firstly
return a response look like this. So
when you pass large language model a
function for query database
with a request query customer purchase
history from the last quarter and
identify the top five customer by
revenue. Large language model will
firstly return a response of a piece of
code that it written and inside this
code you can see it will try to call
this function with certain param as well
as another one with tool used for this
function and input param. So you can
take out this response by filtering out
all tool use and caller to do the actual
database query. And once finished, you
can send back all the past conversation
history with a new user message of tool
response. Then a large language model
will just take your new tool result,
feeding back to the piece of code it
written before, running it to get a
response and synthesize and in the end
get a final response back. So the change
on agent side is fairly minimum. All you
need to do just adding this code
execution tool alongside a loud caller
param for for the functions and update
your agent runtime to be able to extract
those type of tool use. And this comes
with a bunch of benefits because with
code, large language model can use for
loop to just batch processing tasks that
can be run in parallel. And you can also
use conditional loop to set up some more
complex structure, as well as some
deterministic filtering to making sure
only relevant information are returned.
It fundamentally reduces all the model
round trip to just minimum amount of
large language model call. So, you can
reduce 30 to even 50% of token
consumption and run agent much faster.
This is particularly good for use cases
where you're processing large data sets
that needing aggregations or fairly
deterministic tool call sequence that
can be represented in code. And if
you're interested in learning more, we
have these step-by-step examples and
tutorials in AI Builder Club about how
it works and how you can set things up
properly for both programmatic tool call
and all the other techniques that we're
going to talk about. Meanwhile, we have
courses and content to cover their AI
coding, building production agents, and
weekly workshop where industry experts
and myself will come and share the
latest learnings of building large
language model software. And most
importantly, we have this community of
top AI builders who are building and
launching AI products now. So, if you
want to follow and learn what myself and
other builders are reading and learning
every day, this is a great place to be.
I put the link in the description below
so you can join if you're interested.
But yeah, this is the first part of
programmatic tool call. Next, let's talk
about dynamic filtering for web fetch.
Dynamic filtering is a subset feature of
this programmatic tool call. So,
Anthropic released this dynamic
filtering capability for the web fetch
tool. The problem trying to solve is
that web fetch tool traditionally dumps
a large HTML page into Claude's context
window, but most of those HTML content
is irrelevant. And this leads to a lot
of wasted token in Claude's context
window and reduced accuracy. And what
dynamic filtering do is that it will add
a layer in the middle instead of
returning the full raw HTML, it will run
a code that filter out only relevant
content and extract only those relevant
ones into context window.
And from their testing, this dynamic
filtering method is able to reduce on
average 24% of token consumptions. To
activate it is also pretty
straightforward. You just need to making
sure you're pointing to the special
version of web fetch tool 2026-02-09.
You will see in API response it will
automatically seeing those code
execution step happening in the middle
to extract only specific relevant keys.
So in the end it return back only the
relevant content back to large language
model. Meanwhile, Claude also introduces
two search concept. So the problem tried
to solve is that the way agent use tools
or MCP is not really scalable. Where
either it is loads up context window in
your agent regardless whether this tool
is always needed or not. And this
doesn't feel very optimal and also why
so many people are dropping the concept
of MCP instead of moving towards the
skill plus CLI version because it is
just so much more token efficient.
However, agent skill is not a complete
replacement for MCP because MCP also
comes with a lot of benefits especially
around the type safe. Since large
language model will know exactly what
the input schema is and will try to
follow the exact input schema which you
don't really get from the skill plus CLI
easily. That's why Anthropic released
this tool search concept. What that
means is instead of loading up hundreds
tool schema into context window, it just
have one tool called tool search tool
that can be used to retrieve relevant
tools. And that takes only around 500
token. So for many scenario, it can lead
to up to around 80% of context window
operation. And the way that works is
that you can give your large language
model call a tool search tool. And then
for each tool MCP, you can start setting
this deferred loading data. Once the
deferred loading is true, then this tool
won't be visible to the agent at
default. Instead, large language model
can use this tool search tool to
retrieve the information dynamically.
And in the large language model call
response, you will just see some
additional steps show up in the middle
where you will see that it will try to
invoke this tool. And this works with
MCP as well. For the MCP server, it's
actually very flexible. You have this
one config called default config. And if
you set differ loading to be true, that
means all the tools from this MCP server
default won't be visible. But you can
set specific actions within this MCP
like search events here to be differ
loading false, which means only this
specific function will be always
visible. So, this is really good message
if your agent has more than 10 different
tools or MCPs. And use this to
significantly reduce the amount of token
consumptions.
And lastly, tool use example. So, this
is try to solve another problem that for
some of the complex tools, you will find
large language model, even with MCP,
will struggle to know how to use this
tool. Think about a tool you might have
for customer support called create
ticket. It has many different properties
that agent need to fill in. Even though
schema were clearly describe what kind
of field needs to be put in, but it's
not entirely clear how to fill in each
field. For example, for due date here,
it's not clear which format you want
agent to output for due date. And also,
there might be some correlation between
one field to another. Like in this
escalation, you might have different SLA
hours depends on level field here. And
all those things can be probably
achieved before by adding more
description and prompt to indicate how
to use the tool. But now they have more
specific field for you to adding those
information in called input examples.
So, when you define a tool, you can also
passing a array of examples of how this
tool will be called, so it can be used
as example for agent follow. And this is
particularly useful for complex nested
structure where valid JSON doesn't imply
the correct usage. Or your tools have
many optional parameters and large
language model just keep forgetting or
not feeling certain optional parameters
when it should in Anthropic's own
experimentation using two-use example
can improve accuracy from 72% to 90% on
on complex parameter handling. So, those
are a few new use cases and patterns
Anthropic released about tool calling
that I thought is really exciting and
interesting. And again, if you want to
learn more, there's step-by-step
tutorial in AI Builder Club you can read
and follow. And every week we have
weekly workshop to talk through those
latest learnings from both myself and
industry experts. And if you want to
follow and learn what I'm reading every
day about this constantly changing AI
field, this is a great place to be in. I
put the link in the description below so
you can join if you're interested. I
hope you enjoyed this video. Thank you,
and I'll see you next time.
