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
chunk: 1
total_chunks: 3
parent_video_id: "00Y-p62sk0s"
---
[music]
&gt;&gt; What's up engineers? Today we're going
to have some fun. On the left I have my
new fully specked out M5 MacBook Pro. On
the right I have the previous generation
fully specked out M4 Max MacBook Pro.
Today we're going to push the limits of
these devices by using some of the best
models and tooling from Apple, Google,
Alibaba, and Nvidia. I'm filming at the
perfect time here because once again the
Claude APIs are down. You know what I
wish I could do? I wish I could use
private, cheap, fast, performant, local
models right on my device. Here's
everything we're going to cover in this
video. If you want to see the insane
gains you can get from using the
dedicated MLX models specialized for
Apple hardware, definitely stick around.
Many engineers are wasting time not
using the dedicated MLX models. We're
going to look at the M5 versus the M4.
We're going to look at GGUF versus MLX
models. And if you want to see how much
Google cooked on the Gemma 4 model,
stick around as well. We're going to
compare Gemma 4 versus the Qwen 3.5
series. All of these innovations are
coming together to create
state-of-the-art model performance from
Apple, Google's Gemma 4, Nvidia
optimized models, of course the cracked
Qwen 3.5, and then we're going to
supercharge it with Apple's MLX machine
learning framework designed for Apple
silicon. This helps us push away from
our dependency on Anthropic's APIs, on
OpenAI's APIs, on any cloud provider's
APIs. It's almost a guaranteed future we
will be running powerful models on our
devices in a private, cheap, fast, and
performant way. It's only a matter of
time. But the only way to know when the
time has arrived is to prepare ahead of
time. That's what we're doing here. So
the first thing we're going to do here,
when you're running local models, is you
have to warm them up. We have our M5 on
the right, we have the M4. I want to
show you the models we're going to be
using here. So on both sides we're going
to run Jade Bench Ping, and we're going
to kick off our models on both sides. So
at the same time, we're going to run
these and we're going to compare them in
this simple first prompt test. 1 2 3.
This is what's called a cold start. The
models are not in memory yet, so both
devices are loading the models into
memory. And here we're going to show
exactly the models we're going to be
using throughout our benchmarks. But
we're going to start small, we're going
to start simple. So the first run always
takes a bit of time. You can see here my
M4 actually was able to warm up the Qwen
3.5 before the M5. There we go, there's
the M5 device. M4 just got Qwen 3.5 with
the NVFP4
format from Nvidia. M5 just completed.
Gemma 4s are complete, and then we have
the Gemma 4 MLX variant also complete.
I'm going to run this again and get
another cleaner benchmark now that these
models have warmed up. So we have that
first result on the M5. There's the
second result on the M5. There's the
third result, and we should get the
fourth result here in a second. Stats
look great, and on the right you can see
the M4 with the Qwen GGUF model 35
billion parameter is coming in as well.
So here are the key metrics we're going
to cover here. Prefill speeds. This is
the processing of the incoming prompt.
Decode. This is what people refer to as
the true tokens per second. And then the
wall. This is the thing that really
matters. Wall is the end-to-end time to
actually execute with all costs,
including the cold start, including
prefill, decode, and a couple other kind
of hidden costs of running models
locally. So this is the true time. This
is what we really, really care about.
Already you can see here on the M5
prefill and decode speeds across the
board for every single model are
generally higher. We're prefilling
faster and we're decoding faster,
resulting in faster times. We of course
can't benchmark anything meaningful
going one prompt at a time. Instead
we're going to use a live benchmarking
tool to track what's going on with each
one of these models. So over on the M4
here, you can see we're going to live
track prefill, decode, total wall clock
time, and then random access memory at
peak usage. So this is really important
because if you can't fit the model into
RAM, it just can't run. There are new
LLM innovations coming out all the time
to help with the KV cache to get some of
that hard work out of the RAM. But right
now this is how it works. So now we're
going to run five prompts increasing in
complexity. We have all of our models
aligned at the top. So let's go ahead
and kick off our first benchmark to
really compare these models side by side
by side.
&gt;&gt; [music]
&gt;&gt; We'll run these on both devices. J Bench
QG. It's Qwen versus Gemma. And this is
going to be the M4. We're going to copy
this over, and with the screen
connection feature here, jump right over
to the M5. And then we're going to kick
these both off. 1 2 3. So you can see
the available baseline memory. And now
we're going to start booting up these
models and actually executing on each
prompt. I'll share more about the
architecture of this application. The
big idea here is that you can run
benchmarks from multiple devices, and
the results are going to be streamed
right to this live interface. Open up
your new terminal on the M5, and if we
type J Ping, you'll notice on the live
bench UI ping received. Our first
benchmark just came in. On the right
we're going to have our M5 Max device,
and on the left we're going to have our
M4 device benchmarks as well. And so how
this is going to work is across these
five prompts we're going to kick off
Qwen 3.5 GGUF Nvidia optimized version
with the MLX variant, and this is the
model that Ollama announced. Ollama now
supports models that can run directly on
MLX and Apple silicon, and this is that
exact model. Gemma 4 GGUF format. But
then we also have a MLX community built
version of the Gemma 4 model that's
going to be optimized to run on Apple
silicon, and you'll see that as the
numbers come in. So right now things
look pretty close. There isn't a huge
difference between the M4 and the M5. If
we scroll down to the wall time, our M4
is actually moving a bit faster with
this Qwen 3.5 GGUF model. And so we're
kind of going back and forth a little
bit, but as these models execute the
clear advantage of the M5 Max chip is
going to emerge. Our M5 device has just
finished running all of the Qwen 3.5
GGUF formats, and now it's going to kick
off the MLX. Now this is where things
get really interesting. So the MLX
variants are going to run very, very
fast. They're going to smoke the GGUF
format.
&gt;&gt; [laughter]
&gt;&gt; And it's not really even going to be
close. You can see we already got the
second response from the M5 Max using
the Qwen 3.5 MLX variant. There's a
couple big optimizations in this thing.
First off, MLX, it's the mixture of
experts just as the GGUF format is. So
that's great, but it's also the Nvidia
optimized NVFP4.
This thing is souped up. It's quite
powerful and it's quite fast. You're
going to see this on both devices, but
you can see it especially on the M5
here. So if you look at some of the
stats, prefill speed is almost double
using the MLX variant. You can see the
M4 is also completing very, very
quickly. The difference isn't as big on
the M4 device, but it's still there. If
we check out the decode speeds, the GGUF
format on the M5 got 60 tokens per
second. Pretty good, right? Very fast.
But it's not close. The MLX Qwen 3.5
version got 118 tokens per second. You
can see that this is pretty consistent
across each one of these prompts. After
you run prefill, which is the more
variable speed, this is that initial
loading of the prompt, the decode is
very, very consistent. 118 tokens per
second for every single one of these
prompts. And so speaking of the prompts,
what are we actually running here? These
are very, very simple tasks. And so if I
just click into this, you know, the
first prompt here is explain what a hash
table is in two sentences. So just very,
very simple surface level questions.
We're not pushing the performance quite
yet. We'll do that in our future
benchmark coming up. But what we really
want to see here is what are the model
statistics on these different models on
both devices. The Gemma 4 model is
starting to run on the M5 device. This
model is really, really incredible. The
Gemma 4 GGUF model that we're running
right now. It's got about 100 tokens per
second, so it's not as fast as the MLX
variant, but the prefill speed is
faster. So in the prefill step we're
getting about 550 tokens per second, and
it's beating out in every prompt. And
now if we look side by side, right? If
we just scroll down to wall time, this
is the total time it takes to run.
Overall we're getting faster speeds out
of the M5 with some variants, right?
These are non-deterministic systems, so
you can see here the first three Qwen
3.5 GGUF runs on the M5 were quite slow,
but the MLX and the Gemma model are
much, much faster. They're getting a lot
more performance. There are a lot of
ways to measure local model performance.
The thing that matters the most is the
wall clock time. How much time did you
actually sit and wait end-to-end? You
can see something really special
happening now. The Gemma 4 MLX variant,
our last model, is blitzing through this
stuff. And that's going to lead us to
our first big takeaway here. You know,
there's a clear trend. I set these
models up in this order on purpose. If
we focus back over in the M5, the
benchmark is complete. It's run all the
models back-to-back. You'll notice here
my M4 Max MacBook Pro, the fan is on and
it's pretty heavy right now. But
throughout that whole time, the M5 Max
was relatively quiet. We're getting
really, really great prefill speeds out
of both of our Gemma models on both
devices. The blue here is our Gemma
models. If we scroll to the bottom here,
we can look at our max random access
memory, and you can see the smallest
model here we have is that Gemma 4 MLX
variant. And so this thing is compact.
It's fitting in just 16 GB of RAM. And
we can actually visualize this as well,
right? If I open up a new terminal and I
type MacMon, we're going to see a live
visual here. This is what really
matters. We have 128 GB of RAM, and
we're using about 42 right now. Looks
like things are completing, memory is
getting swapped in and out here. So, it
just completed. It just kind of dropped
down that memory back to some base
level. That looks good. Let's just
understand and internalize this first
benchmark run. Prefill speeds. What do
we see here? We see that the Qwen 3.5 GG
of model is the slowest at prefill. From
there, pretty much every model just
increases up till the GG and MLX. So,
the MLX is not prefilling as quickly as
a GG file. Now, if we take a look at the
actual prompt we're running here,
prefill speed doesn't matter a ton. Why
is that? It's because our prompts are
relatively small. But for our next
context benchmark, prefill speed becomes
very, very important because this is the
time you're waiting for the model to
actually load the prompt into its memory
and to start processing it. All of these
prompts that we just ran, very, very
simple, two, three, four sentences, and
that's it. And then we can see the
responses for each model here on the P5
deep, the final prompt, design a rate
limiter. And you can see how every model
went through that example and kind of,
you know, came up with its response. So,
fantastic. So, that's prefill speeds,
but let's look at tokens per second.
What is the pattern here? The pattern is
very, very clear. The MLX model variants
of Qwen 3.5 and Gemma 4 are extremely
fast. We're talking about 100 tokens per
second. The slowest here is the Qwen 3.5
GG of coming in at just 50 tokens per
second, which is fully usable, by the
way. Anything over 30 tokens per second,
I consider fully usable. Once you drop
below 20, I consider that the dead zone.
I just can't wait for that token speed.
Comment down below, let me know your
minimum viable speed for these models.
All right? And so, again, in our next
context benchmark, we're going to see
how the total wait time is affected by
the prompt length. This is something
that's often left out of small local
model benchmarks. The bigger that prompt
gets, the bigger the total context
that's going to run in your agent, which
will be our final benchmark, the slower
the total time is going to be because
they have to process all that context.
But you can see here, the theme is
pretty consistent. The Gemma models are
faster in general, both formats. But
when we start using the Apple silicon,
the performance goes up by quite a lot.
I mean, almost double from the Qwen 3.5
GG format. And I do think we need to
give credit to Nvidia's floating point
format here, NVFP4, but it's also due to
the MLX. Right, it's very clear that MLX
is a huge, huge, huge speed gain on the
Mac devices. So, 5 is clearly faster on
average. The slowest speed here we got
was 60 tokens per second over that 45
tokens per second wall clock time, which
is the thing that really matters. The
big takeaway here between the M4 and the
M5 is that the M5 is about 15 to 50%
faster than the M4, which is a pretty
massive jump. And we're going to see the
trend continue as we increase the
context size of the prompts that we're
executing. And then memory, pretty
simple. Gemma 4 is an incredibly packed
model, like they say it here themselves,
right? They're maximizing intelligence
per parameter, and they've definitely
accomplished that. It's great to have a
model coming out of the US that's truly
open and actually competitive with the
Qwen series and the other Chinese labs.
So, that's great to see. I don't really
discriminate at all when it comes to
where the model's coming from, but it's
great to have something from the US.
Fantastic. Let's move on to our next
benchmark. These are simple prompts.
These are a fraction of the prompts that
people are actually running now. We've
run some pretty heavy, serious prompts
with the state-of-the-art models. Let's
start to scale this up. Let's throw
harder problems at this. So, I'm going
to hit back here, and we're going to
move into our context scaling benchmark.
So, here we're just going to look at
these MLX models. The big takeaway, by
the way, from these four models is if
you're running on Apple silicon, always
find an MLX model. There's just really
no debate about this, and they're up to
twice as good as their GG counterparts.
So, this is big. This is a really
important thing to understand. If you're
on Apple silicon, use MLX. Now, whether
to use the MLX Qwen model or the Gemma
model, that's not so clear. Let's see if
we can get some more clarity out of Qwen
versus Gemma in this next benchmark. So,
let's go to our context scaling, and
let's go ahead and kick this off. So,
we're going to run just bench context,
and this is the M4. And then I'll copy
that same thing over, cross over to the
M5. So, let's go ahead and kick this off
at the same time. Here we go. 1 2 3.
&gt;&gt; [music]
&gt;&gt; And now we're going to start streaming
updates to our live bench tool from both
our M4 and our M5. Let's see how they
run. So, side by side, they're both
kicking off right now, and this is
running the graph walks benchmark. So,
this is something we looked at in last
week's video when we were talking about
Claude Mythos. Graph walk is really
interesting. The models have to perform
breadth-first search across increasing
contexts. 200 tokens here, 500 tokens
here, 1,000 tokens here. And so, we're
scaling up the prompt size. Let me be
super clear, this is the size of the
prompt. And so, here we're keeping track
of prefill, decode. You can see results
coming in already. The M5 is running
pretty steadily here, 117 tokens per
second. And then we have our total wall
clock size. So, this is the most
important thing, just how fast did that
thing run? And then we have the
accuracy. So, we're all keeping track of
the actual graph walks F1 score, higher
is better. And if we click into this, we
have an expected answer. They're
performing breadth-first search along a
graph. I'm not going to go into the
details of that too much. If you're
interested, you can check out the graph
walks code base. This is the benchmark
we looked at last week. Mythos was
performing a staggering 80% success rate
on this benchmark all the way up to a
million tokens. And so, you know, just
for comparison here, you can see our
model already made a mistake here at
just 8K tokens of context length. If you
want to get the behind-the-scenes scoop
on my take on the Mythos model, check
out last week's video where we dug into
the Mythos model and really looked
behind the curtain at what Project
Glasswing really means. Anyway, back to
local models here. So, once again, we
are seeing as these models perform
breadth-first search through
increasingly complex and longer and
longer graphs, the machines are starting
to work. I'll be quiet for a second
here, and you can just hear the M4.
Okay. So, the M4 is making some noise,
and we're even going to get my M5 fan to
really kick on here in a second. You
know, for instance, let's look at some
of the work that these have to do. You
can see some of the chain of thought
here. This is the Qwen 3.5 35 billion
parameter MLX variant, and you can see
it's thinking through, working through
the
uh traversing the nodes inside of a
graph. And you can see, you know, the
expected answer is becoming more and
more complicated. And this is just at 4K
context. It got close to the answer,
actually. Looks like it made a mistake.
So, we docked some points from that.
These devices are fully on. So, we're
making these Mac devices work all
through ultra hard to perform this work,
right? The fans are on, GPUs are
cooking, and we can go ahead and just
see that as well, MacMon here. And let's
go to the M5 MacMon as well. GPU
utilization here is quite high, almost
100% here, 55 RAM. So, we're only
running two models here, so and they're
running one at a time. Both of these
devices absolutely cooking right now.
Uh working through breadth-first search
as a language model, which is pretty
crazy. That's very precise token
reading, token traversing, and
reasoning. This only works because these
models can now think. And so, you can
see here, on 32K, both systems are now
processing that. The 32K is what I'm
seeing as the proper context limit for
these small language models. I'm talking
35 billion parameters and below. Even
with the mixture of experts running,
right? We have A4B here and A3B. These
are both the MLX variants. We are
getting that top-tier performance thanks
to the Apple silicon we're running on
here, but yeah, it's very clear that
this is a hard problem for our models,
both Qwen and, as you'll see here, Gemma
as well. But the differences are pretty
apparent here. The M5 is really chewing
through these problems relatively
quickly. And here we go. So, now we're
getting the Gemma
Gemma 4 MLX variants running here. It's
actually getting fewer tokens per
second, right? Tokens per second is not
the full story. The full story for us is
wall clock time. The Gemma model's
starting to come through here on the M5
device side. We're just focusing on the
M5 Max. You know, you can see that
accuracy is coming in nicely here as
well. The correct graph nodes are being
mentioned by both models. So, it looks
like the performance is going to be
pretty neck and neck here between Gemma
and Qwen 3.5. So, that's great to see.
You know, the devices are fully, fully
working now. Maxed GPU, the efficiency
cores, performance cores, and this new
super core is quite activated, doing a
lot of work. It's clear that the M5
doesn't need the performance core for
this work, and it's only using the super
core for this work. But what is for sure
being used is our RAM, our GPU, our
power utilization is quite high as well.
On the M5, we got 35 W, and on the M4,
we're up to 40 W. So, the M4 is doing a
lot more work here, and this is pretty
consistent. So, prefill looking good.
Prefill is the prompt processing. The M5
is nearly double the M4. Just to say it
super clearly, you know, out loud, if
you want local model performance,
upgrade from your M4, from your M3, from
