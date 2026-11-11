---
video_id: "xD9JEvfCH9k"
title: "Developers Finally Got an Open-Source Voice AI Platform (Dograh)"
channel: "Better Stack"
topic: "ai-llms"
published_date: "2026-05-14"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=xD9JEvfCH9k"
duration: 385
word_count: 1213
---
You just built a voice AI agent. It
works. Then the bill shows up and you're
paying for the LLM, the voice, the phone
call, and then another platform fee on
top of that. That's not even the worst
part. The worst part, you still don't
really even own the system. Today, I'll
show you Dogra, an open-source Vapi
alternative you can self-host, inspect,
and control.
&gt;&gt; [music]
&gt;&gt; Voice AI nowadays can look somewhat
simple from the outside. Take a phone
call, turn speech into text, send it to
the LLM, turn the answer back into
speech. It's done. That's easy, right?
Well, as any of us know who have tried
this, not really. Because real calls are
messy. People interrupt, people go
silent, they're going to change topics.
They can ask really weird questions.
Your agent needs to call APIs and when
it breaks, you need to know why. That is
where most voice AI projects become more
of a pain. A voice agent is not just
ChatGPT with a phone number. It is a
live system with a bunch of moving
parts, right? That's speech-to-text,
LLM, text-to-speech, state, tool calls,
a boatload of other things. You get it.
There's a lot of moving parts that we
don't actually see happening. And when
the call fails, the bot gave a bad
answer is not enough. Was it the prompt?
Was it the model? What was it? Why did
it fail? And this is where Dogra comes
in. If you enjoy coding tools that speed
up your workflow, be sure to subscribe.
We have videos coming out all the time.
All right. Now, let's look at this in
practice. I'm going to start locally
because if a tool says it's built for
devs, I want to see Docker before
anything else. This was super easy to
spin up. I'm going to clone it from
GitHub. I'm going to CD into the folder
and then I just have to run Docker
Compose up. That's simple enough, easy
enough for us. Once the containers are
running, we can jump into the Dogra UI.
Now, I'll build a simple lead
qualification agent. So, what do I mean
by that? Someone's going to call in, the
agent asks what they want to build, then
it asks about the company, the size, the
budget, small things like this. It'll
then call an API tool to create or
update a CRM lead if we embed that. And
maybe I could even say if the lead was
qualified, it transfers to a human.
So, I add a prompt node,
then a qualification step,
then an API tool call,
and then I can add a branch and a
transfer.
There's no custom orchestration code
yet, and that's kind of the point here.
Uh this looks like a no-code canvas, but
for devs, and the value is not no code.
The value is not wasting code trying to
tie everything together. Now, let's try
to run a test call here.
Hi, this is Sarah from Inbound Calls.
Are you still there?
We are looking for an AI phone agent for
inbound demo requests. That's great. I
can definitely help you with that. To
make sure I connect you with the right
solution, could you tell me a little
more about what you're looking to
achieve with an AI phone agent for your
inbound demo requests? Let's say around
20,000 minutes.
&gt;&gt; Thanks for sharing that. And what is
your company size and industry? Now we
can see the transcript here. We can see
the trace. We can see the tool call that
actually happened, and we can see the
state changes. Plus, here's the
recording, which I wanted in the first
place. And that is what I want as a dev,
not just the bot worked. I want to know
why it worked, when it fails, I want
evidence of this actually happening. So,
what is Dogora? Dogora appears to give
us three different things out of all
this. We get a voice agent, a visual
workflow builder, and the platform layer
you usually have to build yourself. The
voice engine is the part that connects
the caller, the phone provider, speech
to text, the LLM, and text-to-speech.
That is what makes the call actually
happen. The workflow builder is where
you design the logic of this whole
system. So, instead of hard-coding every
prompt, branch, API call, and transfer,
you can map out the flow visually. So,
huge win here. I like these kind of
maps. Ask this question,
wait for the answer. That's kind of what
we're mapping out here. I can call this
API, branch here, transfer there. That
kind of logic should be easy to change.
Then to all this, there's the platform
layer. Testing, tracing, recordings,
analytics. That is the boring stuff
every Series Voice project eventually
needs. With all this, you can bring your
own providers, your own LLM, and your
own TTS. Because Dogora is open source,
you can inspect the code, change how it
works, and self-host it. As of this
recording, GitHub stars are low. So,
this is a super new find that I found,
but it's honestly a rather cool one.
Now, let's compare Dogora to other
things we already have out here. You
have three main ways to build voice
agents. First is hosted platforms. Vapi,
Bland, Retell. These are good when you
want to move fast and you don't want to
run infrastructure. You get clean
dashboards, APIs, transcript, testing
tools. All that's really useful, but you
start to lose control right there. If
the platform changes pricings, you deal
with it. If the platform changes limits,
deal with it, right? If you need custom
deployment, anything like that, again,
you might hit a wall. Hosted tools are
fast though, so I guess that's a win.
You have some of these raw frameworks,
like I came across Pipe chat, VoCode,
LiveKit I think is one of them. These
give you a lot more control. You can
build almost anything. But now, you're
building everything around this
framework. Off UI workflow editor, so
that's a big trade-off using things like
that. Now, Dogora is still way too new,
but it's here. So, and I think their bet
is kind of simple. What if you could use
a visual voice agent builder without
giving up the self-hosting, choosing a
provider, tracing, and control? That's
what this appears to be. Write code
where code matters, use the builder
where your flow matters, inspect the
runtime when things break, and swap
providers when costs change.
Self-hosting gives us a lot of control,
which is huge. Vappy bland retail are
best for fast host deployment. But, the
trade-off, cost, lock-in, and less
control. If you enjoy coding tools like
this, be sure to subscribe to the Better
Stack channel. We'll see you in another
video.
