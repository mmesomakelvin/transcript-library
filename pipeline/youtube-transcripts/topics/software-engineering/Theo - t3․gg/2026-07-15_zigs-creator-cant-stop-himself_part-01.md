---
video_id: "kAjNWanR3n8"
title: "Zig's creator can't stop himself"
channel: "Theo - t3․gg"
topic: "software-engineering"
published_date: "2026-07-15"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=kAjNWanR3n8"
duration: 3606
word_count: 4000
chunk: 1
total_chunks: 4
parent_video_id: "kAjNWanR3n8"
---
Stop me if you heard this one before.
Buns being ported from Zigg to Rust with
Claude. Well, it was. And there's a blog
post now. And I think it's fair to say
that this blog post is the end of Zigg
and the respect the community has. You
might be thinking that's cuz this blog
post tears Zigg apart and talks about
how terrible it is. That is not what
we're talking about at all. In fact,
this blog post does a great service both
in sharing the details of how Jared did
this port, but also being super kind to
Zigg and the Zig Foundation.
So, why is this the death of Zigg? You
should ask Andrew Kelly because the blog
post that's going to kill Zigg wasn't
written by Jared or the Bun community.
It was written by Andrew Kelly, the
creator of Zigg itself. He crashed out
so hard at Jared over him making this
move that I ended up crashing out, too.
I am refilming this intro for the third
time because the first time I filmed it,
I hadn't read the article yet. And the
second time I filmed it, I don't think I
accentuated how absurd things were
properly. This whole thing is stupid and
it is absurd just how stupid it is. And
as such, I had to split this video into
two parts. Part one is the smart part
where we go over how Jared did this
insane million plus line port in just a
week because he used the hell out of
Claude and AI tools to make this happen.
And I do genuinely believe there's a lot
we can learn from this. The other half
is me going through Andrew Kelly's post
and being the angriest I think I've ever
been in a video because it is you want
to see what it looks like to kill your
own language, it's this blog post.
Personally, I think the first half is
the better half of this video. But if
you just want to skip to the crash out,
I understand. But I would politely
request that you wait for a quick word
from today's sponsor. I'm going to be
real with y'all. If you're working on
something that other companies have
built before, there's a very good chance
you can vibe code it. Once the code is
in the training data, it's able to be
reproduced a lot, which is why something
as trivial as O should be really easy to
vibe code, right? Well, it is, but it's
hard to get right. And importantly, it
is changing really fast now, more so
than ever. If you want to replicate a
basic Google signin button that every
site uses, cool, fine. But what happens
when you need to onboard enterprises?
What happens when their agents want to
be able to sign up themselves? At that
point, I certainly hope you're using
work OS because these guys understand
what businesses really need. Not just
the libraries, which obviously they have
all of the frameworks, SDKs, and things
that you would expect, but more
importantly, what a business expects you
to have ready for them when you go to
negotiate a contract or trying to sign
up their teams. Or if their agents are
trying to sign up for your service, you
need a way for them to do that, too. And
computer use is great and all, but
filling out forms and dealing with
captures is far from the best use of
GPT56, especially in a world where
agents want to sign up to lots of
different things at the same time, and
you don't want to be rate limited. If
you set up an OMD for your service, then
agents can register on the behalf of
their users, which is a pattern I think
is going to catch on huge in the not too
distant future. And I'm not the only one
who feels this way. Cloudflare,
Firecraw, and more have already
partnered with Work OS to make this
standard real. Make sure your OTH is
user ready, enterprise ready, and agent
ready at soyv.link/workos.
Let's read what Jared has to say. I'm
actually pretty excited about this. I've
only seen parts of the article so far.
So, let's dig in. He opens with the
disclosure that he's now part of
anthropic, yada yada. Bunst started as a
line for port of ESU's JavaScript and
Typicer transpiler from Go to Zigg. He
wrote his first line of Zigg in April of
2021. He bet on Zig after seeing the
single page Zigg language reference on
HackerNews and getting really excited
about the low-level control and care for
performance. From the start, Bun's scope
was massive. There's going to be a JS,
TS, and CSS transpiler, minifier, and
bundler, npm compatible package manager
just like testr runner, node and
typescript compatible module
resolutions, proper HTTP1 and websocket
clients, as well as a Node.js full API
implementation for things like FSN, Net,
TLS, and dozens of other built-in
modules. The initial version of Bun was
written by Jared in one year in a
cramped Oakland apartment pre-LM in
Zigg. Fun fact about this, I had Jared
come over to my current apartment when I
first moved here so we could hang out.
And he was surprised by how close it was
to the bun office. And we had a
conversation about that and he realized,
oh, I didn't realize I could just like
live closer to the office. This seems
really nice. I should probably stop
living in my cramped Oakland apartment
after raising a bunch of money. and I
yelled at him about it and convinced him
to move here where he lives in a much
nicer spot. Back in like 2023, I want to
say he stayed in that apartment way
longer than he should have. Silly aside,
but like I have known this kid for a
while. He just kind of sits and does the
thing until somebody taps him on the
shoulder and says, "Hey, this other
thing next to it also matters." And his
apartment is one of the silliest
examples. Back to the article. The
default outcome for ambitiously scoped
projects like Bun is joining the
graveyard of dead side projects on a
GitHub profile page. Don't call me out
like that. Zigg made bun possible. I
would never have been able to build this
much in one year if it wasn't for Zigg.
Nowadays, the Bun CLI gets over 22
million monthly downloads. Popular tools
like Claude Code and Open Code bet on
Bun as their runtime. Open Code is
moving to Node for what it's worth.
Verscell, Railway, Digital Ocean, and
more all have firstparty support for
Bun. Bun Scope's also been a challenge
for stability. Here's a small sample of
bugs that they had to fix in the most
recent release. A bunch of weird
crashes, memory leaks, and out of
bounds. We could have kept fixing these
kinds of bugs one-off in perpetuity, but
we owe it to our users counting on us to
do better than that and systematically
preventing these kinds of bugs from
recurring. So, what did they start
doing? They patched the Zig compiler to
add address sanitizer support. They ran
their test suite with an address
sanitizer checks on every commit. They
shipped the Zig safety checked release
safe builds on Windows. They fuzz buns
runtime APIs 24/7 using fuzzy, which is
a JS engine fuzzer used by the V8 and JS
core teams. and they have a whole bunch
of endto-end memory leak tests. Most
projects don't go this far. He says it's
more than most do and I totally agree.
So why don't you just be really smart
and not make mistakes? Our bug fix list
felt bad and I was tired of going to
sleep worrying about crashes in bun. I
don't blame Zigg for that. Other users
of Zig don't have the bugs that he has
in mixing GC with manually managed
memory is an uncommon enough thing for
software to need that no language really
designs for it. We wouldn't have gotten
this far if not for Zigg and I'll always
be grateful. Until very recently,
programming language choice was a
one-way decision for a project like Bun.
Notice all of the nice things he's
saying about Zigg. Remember that for the
next thing we read, JS is a garbage
collected language, and a modern JS
engine like JSC or V8 have strict rules
around exception handling and the
garbage collector. Zigg like C doesn't
memory manage for you. And this is a
trade-off that for many projects is a
great reason to use Zigg. Z does not
have constructors and destructors and
most cleanup is expected to be written
out explicitly at each call site with a
deferrun correctly handling the
lifetimes of garbage collected values
and manually managed values has been a
major source of stability issues most
often small memory leaks and
occasionally crashes. Every memory
allocation has to be meticulously
reviewed. Where do these bytes get
freed? How do we ensure it only gets
freed once? Do we check for JS
exceptions properly? Is the garbage
collected pointer visible to the
conservative stack scanner? Is this
garbage collected memory or manually
managed memory? Versibility issues.
Knowing as early as possible is best.
Buzzing happens after code is merged. CI
happens when code is pushed. Runtime
safety checks in address sanitizers
happen when code is run, hopefully in
development before you get to CI. One
common way to reduce this class of
issues is to ensure cleanup code is
always run exactly once for the code
that needs it. Zigg's designed to be a
simple language with no hidden control
flows. So it prefers explicit defer
keyword to run code at the end of a
scope over C++'s implicit destructor or
Russ implicit drop for zig code. When
exactly should we be running this
cleanup though? If we're passing the
same pointer to many different
functions, how do we know when it's no
longer accessible and can be cleaned up?
How does it work when some functions
need to continue to reference the memory
after the functions called? Our current
approach is a mix of lifetimes,
reference counting, and paying really
close attention. This is a a scary one.
Many projects opt to answer these
questions through style guides. Tiger
Beetle's Tiger Style is an example in
Zigg and Google's 31,000word C++ style
guide is another. The challenge with
style guides is enforcement. How do you
make sure that the style guide is
followed? Historically, code reviews
were the answer with best effort
enforcements via llinters and static
analyzers. Having a rigid style guide
with clear ownership expectations
explicitly spelled out the type system
was a real option for Bun. Since Zig had
no operator overloading, we would likely
end up with a lot of code looking like
this. Just a ton of types all over the
place. Normally with Zigg, you write
much simpler, more elegant code, and you
don't have to manually dreference and
defer all over the place. And a lot of
why people like Zigg is this crazy
flexibility and simplicity they get out
of it that goes away if you have to
triple check every single thing you do.
About 20% of their code is written in
C++. So why not consider that? Things
like the JavaScript core which is the
engine that powers both Safari and Bun.
U Web Sockets and Usockets are both
phenomenal libraries which they use for
HTTP and the websocket server. IshPac
and isquick which are built on top of
C++ as well. Boring SSL, Google's open
SSL fork and SQLite. C++ instead of ZIG
would be a reasonable choice for bun. We
would get constructors and destructors.
We could delete lots of external C
wrapper code, but we would still be
reliant on style guides and forced
through code review. And even with ASIN,
memory corruption and memory leaks would
still happen. So why Rust? And I will
tell you as a friend of Jared, Rust is
far from his favorite language. He made
this as the right choice, not his
preferred choice. A lot of the bugs he
was talking about before are from use
after free, double freeze, and forget to
freeze in error paths. In safe rust,
these are compiler errors and they are
guarded with cleanups and drop. Compiler
errors are better feedback loops than
style guides. I absolutely agree. And
now that we have agents writing our
code, getting that feedback early
through a compiler is really useful.
Historically, rewrites are a terrible
idea. Yes, everything he is saying is so
agreeable here, I'm amazed anyone could
be mad as they read this article.
Excluding comments, bun is 500,000 lines
of Zigg. A rewrite in another language
would take a small team of engineers a
full year. It would mean freezing bug
fixes, security fixes, or feature
development for that time. The least
risky approach to getting something
shippable would be a mechanical port
from Zigg to Rust with a minimal number
of behavioral changes using the exact
same test suite we already use for
testing Bun. Fortunately, Bun's test
suite's already written in Typescript,
which means it doesn't depend on the
runtime's programming language. A year
of no userfacing impact is not a
realistic option they could consider.
So, enforcement through code style to
fix stability issues was their best bet,
and it was their plan when they added
the Rust inspired smart pointers to
Bun's codebase. But honestly, Jared
didn't want to do it. Homegrown smart
pointers offer worse ergonomics than
Rust and have none of the guarantees.
What if instead he spent a week testing
if Anthropic's new model could rewrite
bun in Rust? He didn't expect it to
work. A few days in, a high percentage
of the test suite started passing and he
saw how much the new Rust code matched
up with the original Zig codebase. His
opinion went from this is worth trying
to I'm going to merge this. I watched
this happen real time. I was in a group
chat with him. I did not think he would
bite the bullet and he did. Claude,
rewrite bun and rust. There's a lot of
ways to do a terrible job of this. For
example, prompting Claude to just
rewrite it. Don't make mistakes.
Definitely not what I did with
Typescript Go and Rust video probably
out by the time you're seeing this. and
then praying it would work is not what
he did. Think about how a person would
do this. The first big question is
incremental rewrite or everything at
once. Since he's already done ports like
this, like ES build from Go to Zigg, he
knew that everything all at once was
better. An incremental rewrite adds
temporary code that you hope gets
deleted eventually. It'll be painful in
the short and medium term and probably
never get deleted if I'm being real. The
second big question is how how do we
keep bun and rust the same bun as before
with the same architecture performance
and feature set while also getting the
language features of rust like the
borrow checker. How do we ensure the
team can still maintain it after the
rewrite? Their plan was to do the
rewrite that makes it look like they
transpiled the zig code to rust. They
can gradually refactor it to reduce
unsafe usage and look more like
idiomatic rust after the 1.4 release
ships. There's only two big questions
left. Loops that write and review code.
A lot of day-to-day engineering work as
software engineers can be oversimplified
into a loop. You task and while there is
stuff on the to-do list, you get a
result from calling the task. Then you
wait for feedback. promise.all review
result review result. Then you apply the
feedback to the result. Then you do it
again and again and again forever. A
task has some context associated with it
like a Jira ticket, a GitHub issue, etc.
The result is the code you wrote to fix
it. Code reviewers review the changes to
check for regressions and correctness
and then you address the feedback. He
rewrote bun and rust using about 50
dynamic workflows in cloud code. All run
continuously over the course of 11 days.
Each dynamic workflow was a loop like
this. A workflow for generating a
porting guide mapping zig patterns and
types to rust patterns and types.
Mechanically porting everyzig file to a
rs file matching the porting.mmd and
lifetimes.tsv files. Fixing every crates
compile errors. Get subcomands like bun
test and bun build to work. Get every
test and bun's entire suite to pass. And
several large refactors and cleanup
passes. These are the things that make
the dynamic workflows in cloud code so
powerful. If you haven't seen my video
called the good things about cloud code,
watch it cuz I go in depth on workflows
and how cool they are there. For most of
those 11 days, as well as afterwards, he
monitored the workflows, manually
reading the outputs to check for issues
and bugs and prompting Claude to edit
the loop to fix things. How do you
review a PR with 1 million lines added?
How do you start to build the confidence
needed to responsibly merge large
quantities of LLM authored code? You do
it with a language independent test
suite with a million assertions,
adversarial code review, and then when
something goes wrong, you fix the
process that generates the code instead
of just handfixing the code itself. They
did a bunch of adversarial review as
well, always splitting the context
windows because you don't want to have
the knowledge of how it was built in
your brain. You just want to check it.
This is another one of the things that
dynamic workflows do well is you can cut
off that context window and set up
something else with a different one to
go explore by itself. Super powerful
tactic. So you'd have one implement and
then two or more adversarial reviewers
per implement. The reviewer's only job
was to find bugs and reasons why the
code doesn't work. The implement doesn't
review. The reviewer doesn't implement.
Yep, I do this a lot, too. The one thing
he doesn't have which makes it even more
impressive that this worked is I get
much better reviews when I have
different reviewers using different
language models and families of models
from different labs. So having one
reviewer on codeex and one on claude
meaningfully increases the quality of
the responses. You had to do something
big and expensive. It saves a lot of
time and money to derisk it first. And
then he discusses how he prepped. He
started by talking for 3 hours with
Claude about how to map the patterns
from the Zig code base closely to Rust.
Claude serialized the discussion into
the porting MD document which somehow
ended up on hacker news. After fighting
GitHub for 15 minutes, I found the
document, the ZGS porting guide. It has
the ground rules for how it wants to
structure the files, not inventing crate
layouts. Instead, use the ones that they
already set up. Don't use all of these
different packages because bun owns his
event loop ancest calls. No async, yada
yada, and the map to all the different
crates, all the allocators, all this
type of like how to map things. If
anybody saw this port and assumed it was
just like a blind go port, make no
mistakes, I would implore they read this
and see how much time and thought Jared
put into doing this port. I know I
hadn't done that before making my first
video and now I feel a little bad about
it because this is a great document with
a lot of useful context on how hard he
worked to do this right. He did a bunch
of adversarial reviews on these guide
files and as he says also manually read
over them. I love this be called out but
it's important. They did a trial run
before asking Claude to translate all
1448.zig files to RS files. He started
with just three. For each of the three
files, one implement wrote the new Rust
file. Two reviewed the changes and made
sure the behavior in the file matched
and then it followed the porting MD and
lifetimes MD files. And then one fixer
applied the suggestions. He wanted to
make sure he did this right. So he
started with just a handful of files. I
believe three he said here. And he
noticed that all of the claude instances
were stepping on each other. And if you
put each Claude in a separate work tree,
he would run out of disk space because
Bun's git repo is too big. So instead,
he asked Claude to edit the workflow and
instruct Claude to never run git stash
or get reset or any git command that
doesn't commit a specific file at once.
No cargo either, no slow commands at
all. Jar and I had a long talk about
this bit. I think the future is your
tool calls executing on another machine
so they don't step on each other. He
thinks you need to prompt around it and
he prompted around it here. I think this
idea of agents stepping on each other is
going to be one of the next arcs we go
through in the like agentic coding
world. How do we solve this problem? And
I would guess the different labs will
solve it entirely differently. And now
after all of that and breaking up the
workflows more, it finally started to
really write the code. At peak, Claude
was writing 1300 lines of code per
minute. Get on this level, Gary Tan.
You're not even close. Is this the first
real 100x engineer? It's insane, but it
worked.
11 days and 652 commits. Notice the egos
assistant timing. He forgot to increase
the default IOPS on the EC2 instance
that this was running on. So one slow GP
command was all it took to freeze disc
reads and writes for minutes. Yep, I've
even had that problem. And then he
treated the compiler errors as a work
cue. Another very interesting strategy.
When crate by crate, the trickiest class
was the cyclical dependencies because it
just Rust does not like that type of
thing. Also, Rust compiles really
slowly. So instead of having just one
crate or package like he did with Zig,
he wanted to split the code base into a
100 separate crates so the Rust code
could compile faster, but it needed to
avoid cyclical dependencies while
minimizing changes compared to the Zig
code. His PR to do this immediately
before starting the Rust rewrite was
insufficient. Instead of starting over,
he wrote another workflow to classify
where the code with cyclical
dependencies should go and write it all
down. Then another workflow to actually
do that work. This is the loop
