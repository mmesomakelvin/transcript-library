---
video_id: "oN__gKJnPls"
title: "Why your OpenClaw agent forgets everything (and how to fix it)"
channel: "VelvetShark"
topic: "ai-llms"
published_date: "2026-03-06"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=oN__gKJnPls"
duration: 2253
word_count: 4949
---
Meta's Director of Alignment had
to physically run to her computer
to stop her AI agent from bulk
deleting hundreds of emails.
Summer Yue, Director of Alignment at
Meta's Superintelligence Labs, told her
OpenClaw agent: check this inbox and
suggest what to archive or delete.
Don't do anything until I say so.
The agent had been working fine on her
test inbox for weeks, but when she pointed
it at her real inbox with thousands of
messages, the context window filled up,
the agent compressed its history and
that "don't do anything until I say so"
instruction, given in chat, not saved
to a file, disappeared from the summary.
The agent went back to autonomous
mode and started deleting emails
while ignoring her stop commands.
In her own words, it was a rookie mistake
and turns out that alignment researchers
aren't immune to misalignment. Whether
or not compaction was the only problem,
the lesson is the same:
safety rules given in chat
don't survive long sessions.
If Meta's Director of Alignment can
lose control of her agent because
instructions given in conversation
didn't survive compaction, then it
can happen to you too, unless you
understand how memory actually works.
And that's what this video is about.
Now, to be clear.
Compaction is normal.
The problem is relying on chat instructions
to stay alive in long sessions.
Prompts aren't enforcement. For real safety,
you still need permission
gates and tool restrictions.
Full disclosure, I'm one of the maintainers
of the OpenClaw codebase, so I'm going
a little bit deeper than most guides, but
everything here is based on public docs,
the codebase - it's open source - on
GitHub issues, and my own more than two
months of running this system daily.
Before we go deep, here are the
three things that matter most.
Do just these three and you are
ahead of like 95% of OpenClaw users.
One: put durable rules in files, not in the
chat. Your MEMORY.md, your AGENTS.md files.
Those survive compaction.
Instructions typed in conversation,
I wouldn't rely on that. Two:
check that the memory flush is enabled
and has enough buffer to actually trigger.
OpenClaw has a kind of a built-in safety
net that saves context before compaction,
but most people never check if it's even
working or give it enough room to fire.
And three, make retrieval mandatory.
Add a rule to your AGENTS.md
file that says, search memory
before acting. Without it,
the agent guesses instead
of checking its notes.
Now let me explain why those three work and
the full system I've built on top of them.
Most people think of memory as one thing.
It's actually four different systems,
and they fail in different ways.
Knowing which layer broke
is 90% of fixing it.
Layer one is bootstrap files.
These are your workspace files.
The SOUL.md, the AGENTS.md, the USER.md,
MEMORY.md, TOOLS.md. They are loaded from
disk at session start and they do survive
compaction because they are reloaded from
disk and not from conversation history.
This is the most durable layer.
Layer two is the session transcript.
Every conversation is saved as a file
on disk. When you continue a session,
this transcript is rebuilt into context,
but when the context window fills
up, this transcript gets compacted.
A compact summary replaces
the detailed history.
At this point, the model cannot see the
original messages anymore, even though
the raw transcript file is still on
disk. Layer three is the LLM context window.
This is the fixed-size container
where everything competes for space.
System prompt, workspace files,
conversation history, tool calls, tool
results, all of that in one 200,000 token
bucket. When it fills, compaction fires.
And layer four, the retrieval index.
This is a searchable layer that
sits beside your memory files.
The agent can query it with memory_search
tool to find relevant context from your
past sessions, but this only works if
information was written to files first.
When your agent forgets something,
it's always one of three things.
Think of these as a diagnostic checklist.
First failure mode is
that it was never stored.
The instruction, the
preference, or the decision.
It only existed in the conversation
and it was never written to a file.
And when compaction fires
or a new session starts,
it's gone. And this is what
happened to Summer Yue, and this
is the most common cause by far.
Second failure mode is when
compaction changes what's in context.
For example, when a long session
hits the token limit, the compaction
summarizes the old messages.
The summary can be lossy, it can
drop important details, drop nuance,
or specific constraints.
And the agent now operates from
the summary and not from your
original words and instructions.
And the third failure mode
happens when session pruning
trims tool results.
Tool outputs like file reads,
browser results, API
responses are trimmed by session
pruning to optimize caching.
So quick exercise to understand
which failure happens when. If
the agent forgot a preference,
this probably was never written to MEMORY.md.
That's failure A. If the agent
forgot what a tool returned,
that's likely pruning, and that's failure
C. If the agent forgot the whole
conversation thread, that's
compaction or session reset.
So that's failure B, and there are
fixes for all of those failures,
and I'll show exactly how to do it.
Most guides and most users
mix up compaction and pruning.
And they are completely different systems.
Compaction summarizes your entire
conversation history into a compact
summary, and it changes what the
model sees from that point forward.
It's triggered when the
context window fills.
It affects everything.
User messages, assistant
messages, tool calls.
It fires only when the
overflow is about to happen.
Pruning is totally different.
It trims old tool results in-memory.
The on-disk session history is untouched
and it only affects tool result messages.
User and assistant messages
are never modified.
The important thing to remember is
that pruning is actually your friend,
because it reduces bloat without
destroying the conversation context.
Compaction is the dangerous one
because it changes what the model sees.
Pruning is technically off by default,
but Claude setups usually turn on cache
TTL
automatically.
So if you are using Claude, it's
probably already enabled and you can
check or adjust the TTL in your config.
TTL is time to live.
It's five minutes. Before changing
any configuration, run /context
list command in your OpenClaw session.
This is the fastest way to
diagnose why memory isn't sticking.
This is a sample output.
I'll show mine in a second, but
here's what you have to check.
Is your MEMORY.md actually loading? If it
shows that it's missing, or isn't listed,
it's not in context.
Is anything showing truncated?
For example, TOOLS.md here. The maximum
per file is 20,000 characters, and if
something is more, then this is truncated.
And for example, in this case, more than
half of TOOLS.md is invisible to the agent.
This is my output.
So maximum per file is 20,000 characters,
and maximum total is 150,000 characters.
Important thing to check here is
that the raw number of characters
in the file is equal to injected
number of characters in the file.
This means then that everything is in
context and the agent actually sees
what's inside all of those files.
If files are being truncated, you can
adjust the limits in the configuration.
For example, the per-file limit or the
combined limit. The defaults are 20K
characters per file and 150K combined.
And remember that these are
character counts, not tokens.
So for example, 150K
characters is about 37-38
thousand tokens.
And if a file or part of the file is not in
context, it has zero effect on the agent.
So before doing anything else,
when checking memory issues, always
start with analyzing the output of
the /context list command in here.
Now let me walk you through exactly
what happens when compaction
fires. First, your context
fills up with messages and tool outputs,
and as it approaches the threshold,
the pre-compaction memory flush kicks in.
That's when the agent automatically
saves important context to disk before
compaction starts, without you seeing it happen.
Then auto compaction fires.
The model summarizes all the
conversation into a compact summary.
And from that point on, future requests
use the summary plus the recent
messages and not the full raw history.
The model in this conversation
effectively loses access to all
the original detailed messages.
Now, there are two paths
that compaction can take.
This is the good path.
The maintenance compaction.
Context is nearing the limit.
The memory flush fires first.
Saves important context to disk.
Compaction summarizes the old history,
and the agent continues with the summary.
This is the path that our configuration
optimizes for, but there is also a bad path.
This is when compaction needs
to recover from overflow.
It happens when the context
gets too big and the API
rejects the request. And we are
already past this point, so the
memory flush doesn't happen.
So now OpenClaw is in damage control.
It compresses everything at once
just to get it working again.
There is no memory flush, no saving
important stuff to disk first, and
that's when you lose the most context.
And the entire point of the headroom
configuration that I'll show you
in the next part is to stay on the
good path and avoid the bad one.
Now, what survives or doesn't survive
compaction. Here's what you should
assume gets lost in compaction:
instructions that you only gave in chat.
Preferences or decisions
mentioned mid-session.
Older images, all tool results, the exact
wording and nuance of earlier messages.
Here's what does survive. All
the workspace files, like
SOUL.md, AGENTS.md, and USER.md,
MEMORY.md,
TOOLS.md. Also, daily memory logs
when accessed via search, and anything
that the agent wrote to disk before
compaction happened. That's the flush.
One thing to know is that compaction
doesn't touch your most recent messages.
Roughly the last 20,000 tokens stay
exactly intact. And here's the single most
important principle of OpenClaw memory.
If it's not written to a
file, it doesn't exist.
Now, nobody has 100% solved
memory in AI agents yet.
What I'm about to show you is a
system that I've refined over a
couple of months of daily use.
And you can set it up once
and it compounds from there.
Everything here that I will be
describing is principles-based.
So even as OpenClaw evolves, the
why behind each layer doesn't change,
and no single mechanism is enough.
You need all three working together.
Pre-compaction memory flush.
This is the most important config
change that I can give you today.
The flush is already built in and
it triggers a silent agentic turn
before compaction, reminding the model
to write anything important to disk.
The bad news is that most people
don't realize that it even exists,
don't verify that it is active, and many
setups accidentally disable it with
default thresholds that are too tight.
I'll show you the configuration so
you understand what each setting does.
Don't copy this from memory.
Use the latest version
linked in the description.
What matters most is understanding
why these settings matter.
reserveTokensFloor: 40,000.
The concept here is headroom.
You want enough reserved space for the
memory flush turn and the compaction
summary without hitting overflow first.
So staying on the good path and
not overflowing into the bad path.
The flush triggers at the context
window minus reserve floor
minus soft threshold.
So for example, with 200,000 context
window and our configuration here,
that's 200,000 minus 40,000 and
minus 4,000 equals 156K tokens.
And the docs currently show
slightly different example defaults.
Some show 20,000 here, others 24,000, so
don't treat any single number as gospel.
I use 40,000 as a practical starting point
after testing it for quite a few weeks.
If you rarely use big
tools, you can run lower.
If you read large files or web
snapshots regularly, you can go higher.
The exact number matters less than
the principle, and the principle
is to give the flush enough room
to fire before the overflow.
Memory
flush enabled: true.
This should be
on by default in recent versions, but verify
in your config. softThresholdTokens: 4,000.
This is how far before the reserve floor
the flush triggers. Default is 4,000,
and that's fine for most setups. And
the automated flush is a safety net.
This is not a guarantee.
The agent might not save
everything important.
And that's why we need the other two layers.
The second layer is
manual memory discipline.
The automated flush exists, but
experienced OpenClaw users
complement it with manual saves.
It's a simple habit that
catches what automation misses.
When to save manually.
For example, when I'm finishing a large
task before switching to a new one, or
before giving a new complex instruction, or
when I've just made an important decision.
I just manually tell the agent,
save this to MEMORY.md, or write
today's key decisions to memory,
and then I can start a new session.
There's another nice trick for
you to use from time to time, and
this is the /compact command.
Most people think of compaction
as something to avoid, but
manual compaction on your terms,
it's different. And this is how it works.
For example, I am mid-session here.
I have 123K tokens out of 206K, 62%.
I want to keep going with this
context and continue doing this task.
So I want to compact it on my own
terms and let's see how that works.
It takes a little while, but now my context
window went from 123K to 21K, and within
this task that I'm doing, I'm ready to
give new instructions and continue working,
and my new instructions land in a fresh,
post-compaction context, and I again
have more lifespan for this task.
You can be even more specific and
tell compaction what to prioritize.
For example, compact and focus
on decisions and open questions.
And this guides the summarizer
to preserve the most relevant
details from what you told it to.
But if you wait until you get
close to context overflow, you can
get stuck in a situation where
the /compact command also fails.
At that point, your only
option is a new session.
And why do we need both
manual and automatic?
The automated flush fires
at a token threshold.
So it's timing-based, it's not
relevance-based. And your manual saves
are relevance-based - when you know that
something important just happened.
And you have more control over it.
And together they cover both cases.
The file architecture is where
everything comes together.
So let's see where the
files are in the workspace.
The workspace is split into two categories.
The bootstrap files like SOUL.md,
AGENTS.md, USER.md, MEMORY.md, TOOLS.md, or HEARTBEAT.md.
These are loaded into context
at every session start, and they
survive compaction because they are
reloaded from disk at every turn.
And then there is the memory
directory in your workspace.
These are your daily logs.
These aren't bootstrap-injected.
The memory system usually reads today
plus yesterday automatically, and
everything else is pulled in on demand
via memory_search or memory_get tools.
One thing worth knowing is that
sub-agent sessions, when the agent
calls sub-agents to do different
tasks, those only inject AGENTS.md.
TOOLS.md and the other
bootstrap files are filtered out.
So if you spawn sub-agents and wonder
why they don't have your personality
or preferences, that's why.
Now let me walk you through
what goes where in those files.
SOUL.md file is who the agent is.
Put tone, personality, and
broad boundaries in this file.
AGENTS.md is how the agent operates.
So put workflow rules, tool conventions,
specific do or don't rules in here.
Things like search memory before acting,
or never send email without draft approval.
And a simple rule to distinguish those two.
So character goes in SOUL.md.
Process goes in AGENTS.md.
One useful tip that I discovered
after lots of testing: negative
instructions are often the most valuable.
So when the agent does something
annoying or wrong, add a rule so
that it does not happen again.
And that's worth a lot, both for the
quality of the agent's work and for your
own mental health. And one reality check:
these files are prompts.
These are not real security. For
actual protection, use system
controls like tool permissions,
workspace isolation, and allow lists.
USER.md file is who you are.
Your projects, clients, current priorities.
Communication preferences,
key people or relationships, or
technical environment details.
All of that goes to USER.md. And MEMORY.md is
an important file where you keep the stuff
that should be true across every session.
Important decisions and why you made them.
Preferences that the
agent learned about you.
Rules from past mistakes, like always
check the day of week before stating it.
You should keep it short, with only
important stuff, under 100 lines.
This isn't a journal, it's a cheat sheet.
It's always loaded, so
it's always in context.
So
it is important and expensive in terms
of tokens and attention. And the memory
daily files are your daily working context.
What happened today?
Decisions made in conversations,
active tasks, the status of the tasks,
and the output from pre-compaction
flush lands here automatically.
So what should or
shouldn't you store?
Store decisions, principles,
project states, or user preferences.
But you don't want to store API keys,
tokens, secrets, or anything you
wouldn't want seen in plain text.
Now, the piece that makes all of this
actually work, and let's call it the
memory protocol. Add this to your
AGENTS.md. And why do you need this?
Because the agent doesn't check its memory
automatically unless you tell it to.
So without this rule, it just
answers from whatever is in context.
With these rules, it looks things up
first and then answers. And because
the memory files are so important, you
might want to back up your memories.
So run git init in your workspace
directory, set up auto-commit
by daily cron or by heartbeat,
and then you get full history.
All the diffs.
You can roll back as far as you want.
Just make sure that you do not include
the credentials folder or OpenClaw
JSON file into the repo because those
contain API tokens, API keys, so you
don't want to commit them to GitHub.
And one last thing on
memory hygiene over months.
Daily logs accumulate and
MEMORY.md can become quite large.
And remember the bootstrap
file truncation limits.
We want to stay within them.
And the way to handle it is simple.
So daily you append to the daily log, and
that happens automatically. And weekly,
what's important is to promote durable,
important rules found out during that
week, or decisions from daily logs.
Promote those into MEMORY.md and you can
set up a weekly cron job to analyze the
last seven days of memories and run
this automatically for you every week.
And what's important is to
keep the MEMORY.md file short.
During that weekly cron
job, you can decide that
anything that doesn't need to be in
every session, or is out of date, or is not
important anymore, you can remove that and
replace it with whatever is important or
current at the moment. And the rest can
live in the daily logs and the agent will
find that through search when it needs it.
This is just the most important stuff that
is always loaded into the context window.
Okay, so by this point we took care about
putting our memories into files
and storing them permanently.
But memory files are useless if the
agent cannot find information in them.
So this section is about retrieval.
Now, OpenClaw has two
tools for memory access.
The first is memory_search.
It searches across your memory
files, MEMORY.md, daily logs,
everything in the memory directory. You
can configure hybrid search, so it uses
both keyword and meaning-based matching.
That way it can find
the pricing decision,
for example, even if you wrote,
"we picked the $29 tier." There's
also an alternative backend called
QMD that I'll cover in a minute.
Same tool, but different engine under
the hood. And memory_get, which reads
a specific memory file directly.
Here's the rule you want in AGENTS.md.
Before doing anything non-trivial, search
memory first. And that shifts the agent from
"I'll guess based on provided context" to
"I will check my notes before I act."
There are a couple tracks,
or a couple ways, how to
retrieve memories and files.
And I'm going to present this as a
decision tree, not like a pile of options.
Pick one and go.
And you should be good.
The first track is built-in memory
search, and this is the default.
This is easiest to set up and
you should probably start here.
A variation of track A is
A+ where you add extra paths.
This could be extra directories
or notes or project folders living
outside the workspace of OpenClaw,
so that you can find information from
your own files and knowledge base.
And then track B is more advanced.
QMD. When you have thousands of
files and you need it to be fast,
let's look at those in detail.
The built-in system indexes MEMORY.md
and everything in the memory
directory automatically. It watches for
file changes and rebuilds the index.
No separate installation needed.
The local embedding model downloads
automatically the first time you use it.
Now, what does hybrid search mean?
Which is enabled here.
When you search your memory files,
there are two ways to match.
So keyword search finds exact words.
So if you search for "pricing," it
finds files containing "pricing."
But if you wrote, "we picked the $29
tier" and later search for "pricing decision,"
keyword search misses that. And that's
where embeddings come in. An embedding
model converts your text into numbers
that capture what sentences are about,
not just the words that they use.
So "pricing decision" and "we picked the $29 tier"
end up close together in meaning
and are returned in search results.
And for most users, it's all you need.
A variation of track A is A+,
which is where you can index additional
Markdown files outside your workspace.
So you can add extra paths to your config.
Point it at your project folder,
notes directory, whatever you have.
So when should you graduate to track B?
When you need to search large
vaults, like thousands of files.
Or thousands of past session transcripts,
or multiple independent collections.
And track B is QMD
backend.
QMD is Query Markdown Documents, and
it's an experimental memory backend that
replaces the built-in indexer of OpenClaw.
It's for when you need to
search beyond your workspace.
For when you have thousands of files,
like for example, I have a huge Obsidian
vault with a few thousand files, or when
you have a lot of project docs, meeting
notes, past session transcripts. And
the difference between track A and B
is conceptually that track A is the
agent kind of checking its own diary.
And track B is the agent searching
your entire brain, your entire
computer, for free and locally.
So let me show you how that looks like.
When I enter the OpenClaw memory status
command in my terminal: 3,009 files.
This is my entire Obsidian vault.
My daily memory logs, my past session
transcripts, all indexed, all searchable.
And when the agent calls the
memory_search tool, it's searching across
all of this in milliseconds.
By default, QMD starts
with fast keyword search.
And you start there, and if it's missing
things because the wording is different,
switch to semantic search.
And one important thing to remember about
QMD is that it's DM-only by default.
So it works only in direct
messages with the agent.
It doesn't work in group chats by default.
So if memory search seems broken
in Discord or Slack group channels,
check the scope in your config.
And QMD also helps with compaction
because it returns small, relevant
snippets instead of whole files,
which keeps context much smaller.
Here's something most
people don't think about.
Every message that you send to your
agent includes the entire system
prompt and conversation history.
And prompt caching means
that you pay about 90% less
for those repeated tokens.
In each message. But compaction actually
invalidates the cache, and the next request
after the compaction pays the full price
to re-cache everything going forward.
So every unnecessary compaction is both
a reliability problem and a cost problem.
And two things can break the cache.
First, compaction, which rewrites
the conversation history.
So the next request has to
rebuild the cache from scratch.
And second, changing prompt inputs. If
parts of the prompt change every turn,
the cache no longer matches.
So for example, if you keep rewriting
MEMORY.md, which is always in context, and
inject a constantly changing status block,
or add dynamic instructions per turn,
then you get fewer cache hits. And that's
why it helps to keep your workspace files
stable and MEMORY.md files small, instead
of constantly rewriting them. Now, only
to briefly show you two config blocks for
both track A and track B, to quickly see
what's in there and to see the difference.
Track A: built-in memory search.
No extra installs. Includes the compaction
configuration at 40,000, memory flush enabled,
and local hybrid search with the embedding
model, and cache-TTL pruning. Copy-
paste this, or copy only specific sections.
This all should be well optimized.
Track B is QMD backend for searching beyond
workspace. Same compaction and pruning
configuration as in track A. And point the
QMD to your Obsidian vault or any other
directory with your knowledge base,
enable session indexing, and you're good to go.
So here's the full system at a glance.
Workspace files for compaction-
immune instructions.
Pre-compaction flush as an
automatic safety net. Manual
saves for relevance-based preservation.
Strategic /compact command for
clearing the decks. Session pruning to
delay compaction and save on caching. Hybrid
search, so the agent finds things even
when wording differs. And extra paths or QMD
for searching beyond the workspace.
On top of that, git backup for
rollback if something goes wrong, and
weekly memory hygiene to prevent bloat.
Some essential slash commands for
memory management. I think I showed
most or all of them. /context
list is to check what's loaded,
/compact with optional focus guidance.
/status to verify your model, your
context window, and your thinking level.
I use it all the time.
/new.
I only mentioned that,
never showed this.
I use it very, very often when
I finish working on one task and
I'm about to start another one.
I want to start with a clean context window.
That's when I use /new. And /verbose
to debug memory search. Both
configurations and all the slash
commands and all the practical
cheat sheet file is linked in the description.
Linked in the description.
You can start with track A. If you are
just starting out with OpenClaw, you can
then graduate to track B when you need to
search your Obsidian vault or past sessions,
and there are more and more of them.
Either way, you are running the
same memory architecture that I've
been using for more than two months
now, and it's working great for me.
Hope it works great for you too.
Now, let me leave you with
five things to remember.
Number one is: files are memory.
If it's not written to
disk, it doesn't exist.
Two, verify and tune the flush. Set reserve
tokens floor to 40K and you should
be comfortable. Compact proactively.
When you are in the middle of the session
and you want to keep going, then /compact
is your friend. Search before acting.
That's the rule for your agent to
put into AGENTS.md for
it to always remember that.
And number five, pruning is your friend.
It trims tool bloat and helps caching.
And compaction is the one that hurts, not
pruning. And I'm making more videos like this on
running OpenClaw reliably for daily use.
So subscribe if you are interested.
And now go save this to a file.
You know what happens if you don't.
