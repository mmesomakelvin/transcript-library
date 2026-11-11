---
video_id: "00Y-p62sk0s"
title: "My M5 Max, Gemma 4, MLX LOCAL Stack. (This KILLS MODEL PROVIDERS)"
channel: "IndyDevDan"
topic: "ai-llms"
published_date: "2026-04-20"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=00Y-p62sk0s"
duration: 2343
word_count: 3999
chunk: 2
total_chunks: 3
parent_video_id: "00Y-p62sk0s"
---
your M2, from your M1, whatever you're
currently using. I have a fully maxed
out M4, and the M5 is outperforming it
by a wide margin. It especially
outperforms in prefill speed. And this
becomes very, very important as the
prompt size increases. Look at the M4,
it's still processing the 32K context
prompt. So, this is a huge graph that is
a set of nodes that our language model
has to work through, and it has to give
the correct answer to. But the Gemma 4
MLX on the M5 is just burning through
this. It just completed the 8K and and
how quickly they do that? In 13 seconds.
All right, so it's very very fast, but
you can see here something interesting.
The wall clock time, so the total time
of the Quinn models are actually
performing a bit faster here. You know,
Quinn's got a nice leg up here even
though it's a 35 billion parameter
model. Of course, this is mixture of
experts, so they're both only using
three or four billion parameters to
answer each question. Gemma models are
going to be a little bit slower here and
actually quite a bit slower if you look
at this on an average basis. We'll see
how this last 32K
&gt;&gt; [laughter]
&gt;&gt; context window prompt looks. Overall
though, performance looking really good.
They're both answering the question,
which is really important. These models
are incredible now. These local models
are doing significant challenging work.
Let's look at the 16K. So they have to
work through a very very complex set of
nodes. Looks like it's looking at 14
depths of trees in a graph. And then
here it's a little tricky, it has to
find just one answer. Just one node. MLX
got the correct answer. Gemma did not
find the correct answer. It's really
really important for these models to
think and to process properly. Looks
like our M4 just completed that huge
run. Look at this wall clock time. So
this is end-to-end time. So about 400
seconds on the M4. And my M5 took 280
seconds. Okay, so that's, you know, 40%
improvement in speed for a large prompt.
And right now the M5 is working through
that final prompt on the Gemma 4 MLX
variant. This is taking quite a bit of
time as well. I'm expecting it to come
at you know, 308 seconds or something
for the Gemma 4 26 billion parameter MLX
model. But once again, in terms of like
raw usage, the M4 is working its ass off
to compete with the M5.
And you can hear it. Pretty incredible
stuff. Again, stats, if we look at the
tokens per second, M4 versus the M5 is
getting about what is this? Maybe 15%?
No, a little bit more than 15. It looks
like 20% tokens per second, but we do
lose tokens per second here as the
prompt size goes up. So this is an
interesting observation. And it kind of
leads us to another big takeaway from
running these models side by side and
really seeing what they can do. As
prompt size increases, local model
performance goes down very very quickly.
This might sound obvious, but it's
important to realize the impacts of this
when you're expecting your local model
to do agentic work. These one-off
prompts aren't really that important
anymore. Everyone is putting language
models inside of an agent. And that
context window stacks up very very
quickly. I can almost guarantee you
every time you put up Claude Code and
you run two or three prompts, you're
already at 32K tokens. What's limiting
our models now, our local models, isn't
so much the performance because we're
doing breadth-first search on up to
32,000 tokens and getting correct
answers out of these local models. Looks
like we're breaking down here a little
bit at the 8K and 16K mark. You know,
the point here is uh performance
matters. And in our last benchmark,
we're going to look at how these models
perform inside of the Pi coding agent to
get a real like agentic view at these
models. But the bottleneck here for
local models is context window size. At
that 16K mark, we have to wait 30
seconds for a response. That's tough,
right? [laughter] In fact, it's
unusable, I would say, right? Waiting 30
seconds for a response is frankly just
unusable. Again, as a general rule,
these local models say they can handle,
you know, 250 context windows, 160K
context windows. That's all great if
you're running it on Nvidia cracked
GPUs. We are not, right? We are running
it on local hardware. And even with the
best state-of-the-art M5 Max MacBook Pro
device here, we are consuming a lot of
time when the tokens hit about, you
know, 16,000 token context window
length. Accuracy is still there. What we
do lose is these models completing in a
reasonable amount of time. Just like
large language models who say they have
a 1 million token context window, it's
really like the true context is 500K,
maybe 700K, maybe 800K. The Claude 4.6
series has been the best so far with
their true 1 million context window. For
local models, it's much much more
limited than that. We're running a lot
of like state-of-the-art game-changing
hardware and now we're getting the wrong
answer at 32K, right? This is just too
complex. Check this out. Expected answer
is all these nodes and Quinn didn't
respond. It just crapped itself. And
Gemma 4 gave an answer, but it's not
correct. So we spent all that time to
get a incorrect answer out of these
models. 32K is pushing it. 16K is it's
still viable. But again, at 16K context
window, we waited 30 seconds for an
answer. So, you know, this is going to
kind of tell a story as to what you can
actually do with these models locally.
And so now we're just waiting for my M4
to finish the final 32K long prompt
running the Gemma 4 26 billion parameter
MLX variant. And, you know, final notes
here, you can see tokens per second
looking pretty good, then going downhill
at that 8, 16, 32K mark. That is a
signal that the model is just not
processing. It's having a hard time. And
then prefill speeds kind of that same
deal on the M5 where prefill speeds are
improving as we increase the size of the
prompt. And then around 8K, 16K, we
start to hit a wall. At 32K, we really
fall off the cliff. Before I filmed this
video, I actually had an agent cut out
the 64K just because it took too much
time. If you scroll down here, you know,
280 seconds and we have 400 seconds here
and we're probably going to get like
maybe a 500 second run here out of the
Gemma model on the M4. We'll see. The M4
Max worked its butt off here and finally
completed the final graph walk at 32K
and it got the answer wrong. So again,
just reaffirming this idea that larger
context windows are really really hard
for local models to process. And really
the falloff starts at that 8K context
window length level. So if you're doing
work underneath that level, you're
probably in good shape to use a powerful
local model. Gemma 4, Quinn 3.5, they're
both equally viable if you look at the
benchmarks here in accuracy for long
context. They're both about the same.
They're going to answer right or not at
all with a slight edge to Quinn 3.5. But
you can see here wall clock time, this
benchmark took a lot longer to run. Just
really that key takeaway, context window
length is the true limitation for local
models now. It's not really performance,
right? The intelligence of these models
is great, but you can only use them up
to a certain context window length.
Otherwise, the speed just takes too
long. The wall clock time, the
end-to-end latency is just too high. The
numbers are even worse on the M4, right?
At 2K, we're already up at 30 seconds.
At 1K, we're already at that 20 second
mark and the 36 second mark. M5 running
the Quinn 3.5 MLX model, very very fast.
So we're using the best local models
with the best tooling at a decent
parameter size. So the speed is here.
This is at that 35 and the 26 billion
parameter mark. If you push the
parameter size lower, you can expect to
see your accuracy go down while you
increase your speed a little bit. For
simple problems, this is fine. But I'm
really looking at this 26, 35 billion
parameter level model to get top-tier
performance in a decent amount of time.
Let's move on to our final benchmark
here. Let's look at the Pi coding agent.
What happens when we put these models
inside of the Pi coding agent and make
them do agentic work for us. Let's find
out. All right, we're going to run
Jbench Pi M4 and we're going to take
that exact same prompt, go over to our
M5. Let's go ahead and kick this off and
let's see how our models perform inside
of an agent. This is where most agentic
work is happening. One-off prompt calls
aren't really that useful, right? We
want agents operating our software and
our products. Here we go. One, two,
three.
&gt;&gt; [music]
&gt;&gt; Unloading the models, restarting them,
and then they're going to do a quick
warm-up. And after that, we're going to
start doing agentic work. So here's what
we're looking at here with our Pi coding
agent. M5 just came in really really
fast followed by the M4. You can see our
model lineup here. We are leaving off
the Gemma 4 MLX variant due to some
configuration issues. As I mentioned,
the Claude API just went down
and I didn't want to finish the work
with GPT 5.4. We didn't get the full MLX
server up. That's some local model work
that I have to continue doing in agentic
coding tasks. What's going on here? So
we do have a correctness check here. And
we're also tracking total tokens and
total tool calls. All right, so you can
see two, two, three. Looking good so
far. We want to see these numbers be the
same on both sides. Of course, we know
that our M5 device is going to do a
little bit better here when it comes to
the raw speed and performance of this.
But you can see the correctness looking
the same on both sides, which is
fantastic. And you can see the total
tokens that our models are using to
complete the task. So input and output
tokens. So this is going to matter here
as you saw in the previous benchmark, as
tokens increase, performance goes down.
Already we're starting to see a break in
performance. M5 completing all these
tasks, 7 seconds, 10 seconds, 14
seconds. And let's go ahead and look at
some of the tasks, right? What are we
actually running? So we're starting
simple, create file hello, print hello
world, nothing else. Super super simple.
Testing file writing, testing execution.
And then our correctness test is
actually going to execute the code and
make sure that it's right. We're moving
to Fibonacci. And so just slowly scaling
up the difficulty for these models
inside of the Pi coding agent. Create a
file called fib. Here we're memoizing
with a dictionary. And then we're
printing out Fibonacci 10, which should
be 55. Easy to validate, very very easy
to scale and add complexity. So right
now we're running the Quinn 3.5. We're
going to run Quinn 3.5 MLX and then
finally Gemma 4 GGUF. So this is what
really matters now. It's can your model
run inside of an agent. Both these
models are really really great at
running inside of the agent up to a
certain context window length, okay?
Because of course, as mentioned, as that
context window increases, performance
goes down in these local models. You
know, something I'm really happy about
here with both is serious real work you
can do on your local device. These
models are great at coding, they're
great at parsing, summarizing, doing
what I like to call micro agent tasks.
I'm starting to incorporate these local
models into my pie coding agent
specifically and into skills and into
kind of sub agent processes where I can
run micro agents to do a little bit of
work in a very consolidated simple way.
Why am I doing that? I'm preparing for a
future where these local models become
more viable. If you don't understand
what these models can do now, you won't
understand the next step. And I, maybe
like you, want to have the advantages of
these local models, private, fast, zero
dependency on an outside API. We want
these properties inside of local
intelligence that we can run on our
device. I'm really, really excited for
what Apple could do next here. They've
really fallen into or fallen into a
position is
not giving them enough credit here, but
they're taking advantage of their
silicon, their chips, right? The M5
Ultra or the M6 chip running in a Mac
Mini is the next device that I'm really
waiting on, that I'm really keeping my
eye on because that is going to be the
moment. If they give you 500 GB of RAM
in one of those, we are going to have
very, very powerful local models right
on device. Truly, it's going to change
the industry. So, I'm looking forward to
that and all that to say, when that time
comes, you want to know what you can do
with these local models. You want to be
able to spin them up in micro agents and
sub agent processes. That's really the
frontier I'm looking at for local
models. What simple work can I hand off
to my local model to run very quickly,
very cheaply on my device? There's
engineering work, there's your, you
know, personal life work, and then
there's product work, right? These are
kind of three key buckets that you can
think through when you are assigning
tasks to these small models, cheap, fast
models, to workhorse models, and then to
state-of-the-art models. So, as you
would expect, our large packaging
prompt, so we're actually having the
agent build a full package or some
files, multiple writes. That's been the
right format, it has to execute
properly. For you have a bunch of pure
functions that we want them to implement
and we're using clean function syntax
here. This is going to take quite a bit
of time. What we effectively have is a
spec for our agent to work through and
build out a simple calculator app. And
this could be anything. The trick is
that we're having our agent do more
work. Look at the tool calls down here
on the M5 and on the M4. Test T1 through
T4, relatively simple, three tool calls.
But, test five and test six is requiring
our models to do 14 and 26 plus tool
calls. Okay, nice. We got 26 out of both
the Quinn 3.5 and the MLX. That's good.
You want to see these be relatively
similar. Total tokens, you can see that
used quite
&gt;&gt; [laughter]
&gt;&gt; a bit of tokens to complete. So, our
models are really, really being pushed
here. To be super clear here, these are
running one-shot prompts. We don't
actually have the full 200K inside of
the context window of the agent as it
continues to stack up its work.
Correctness is looking really good. So,
these models are actually able to
perform and to get the job done. Once
again, of course, you can see that the
M5 is quite a bit ahead uh thanks to its
lower total end-to-end agent execution
times. You can see here the M4 across
Quinn 3.5 GGUF and MLX and Gemma, you
know, 9 seconds, 10 seconds, 20 seconds,
40 seconds, 60 seconds, 160 seconds.
While the M5, 7 seconds, 10 seconds, 14
seconds, 25, 50, 180, 100, so on and so
forth. So, the M5 is the device you want
if you're doing any local model work. I
recommend you max this thing out if you
have extra cash in the bank and you
really want to understand what you can
do with local models. I would just go
all the way. I don't really think
there's a purpose in buying the lower
tier of these models unless you're
getting the base model. Just go all the
way, get all the RAM, get all the cores.
If you boot up even a 35 or a 20 billion
parameter model, you will be using a
decent chunk of your RAM and all of your
GPU when that thing executes. You know,
side note, whenever you run these
models, plug your device in. Running
this, running the fans, running the GPU,
running your cores like this saps your
power very, very quickly. So, we're
coming up to the last test here for M5.
I don't think we need to let the M4
complete. It's going to take some time
for the M4 to work through all this.
Local models can absolutely run inside
of agents now. They can do agentic work
for you. The complexity of that work is,
of course, going to be on the simpler
end for now, but you can absolutely do
useful local model work up to that 8 to
16K token level. So, really, really
impressive here. Okay, yeah, Gemma's
doing a lot of work here. It didn't
quite get the answer right. Looks like
it got 0.7 on the package generation,
but um it ran this with just five tool
calls. Moreover, I'm really impressed
with both of these models, both the
Quinn 3.5 and the Gemma model. But, a
big takeaway here is if you're on Mac
devices, find the MLX model variants.
Absolutely use the MLX model variants.
Okay, so it got the answer wrong.
&gt;&gt; [laughter]
&gt;&gt; The M4 just kind of gave up here, one
tool call, and then it just like could
not finish. But, um all benchmarks are
now complete. Yeah, you can see that
this is clearly not a legitimate result.
It tried, uh that's fine. This entire
code base is going to be available to
you. I can go ahead and just pull this
up quickly here. The structure is
relatively simple. You have four
benchmarks, including a simple mock test
YAML file benchmark. This is what
defines every single benchmark. You can
see kind of the general structure there.
Um and then inside of apps, we have the
kind of core back end, front end, the
CLI that the M4 and the M5 use to ping
messages to the server. And then we have
the actual benchmarks that execute all
of the tests. All of this is going to be
here for you uh from me as a thank you
for making it to the end of the video.
Link will be in the description for you.
This benchmark isn't perfect. There's
always something to miss when you're
creating these benchmarks, these local
benchmarks, and cloud benchmarks,
frankly. But, I think it's useful to sit
down every once in a while when there's
a stack of innovations coming out of the
local model space and just understand
what you can really do. So, feel free to
play with this, customize this, create
your own benchmarks, and, you know,
throw an agent at this, throw a
state-of-the-art agent at these
benchmarks, have them tweak it, tune it,
make it your own. Couple additional
directions I want to go here. We saw
here that, you know, the decode speeds
are really, really good on these models
up to really, really large context
windows. This means that we can push to
even larger parameter models. I'd love
to find a good 50, 60, 70 billion
parameter model to run on my M5. So,
we're going to be looking out for that.
Um I'm also going to be running a ton
more pie coding agent related
benchmarks. Uh the pie agent is just the
simplest way to customize and understand
what your agent can do. You can imagine
a fully customized uh pie agent harness
that can spec out a lot of the model
performance right inside the UI since if
you're using the pie coding agent, as
we've talked about in previous videos,
you can customize the entire agent
harness. This is a big idea in 2026,
control your agent harness to control
your results. So, I'm going to be
digging into specialized pie agent
harness variants specifically built for
SLMs. And then, you know, there's a ton
of other directions here. The Gemma 4
models can also take in images and
audio. So, that's another benchmark.
Quinn model can also take in text and
images. So, there's a lot more work to
be done here to understand what you can
really do with local models. But, when
it comes down to it, local models are
still a work in progress. For 90% of
tasks, using a model provider is the way
to go. But, this is a space I'm keeping
a sharp eye on because as soon as you
can save all the costs, all the time by
just running your model locally on your
hardware, it's going to be a massive
advantage that's going to compound very,
very quickly. Those who prepare for
local models and understand what's
possible will be the ones saving
resources. If you don't need a large
model, don't use one. This especially
matters for product engineering when you
have hundreds, thousands, and hopefully
hundreds of thousands of users hitting
your service and your models over and
over and over. The future is agentic, so
make sure that you can control the
performance, the cost, and the speed of
your models over time. And of course, as
you know, local models are going to play
a huge role in that. Comment down below,
let me know what other types of
benchmarks, what other models, what
other input types, output types you want
to see in a local model benchmark. I can
spin up my M5 and showcase what you can
do with the best Mac hardware right now.
So, feel free to comment down below.
It's clear the AI improvements are not
going to stop. In fact, they're speeding
up. That means costs go down and
performance goes up. It's only a matter
of time, you know, and I'm predicting by
