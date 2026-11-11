---
video_id: "zAe-sau06io"
title: "How AI Coding Agents Understand Your Codebase & Developer Tools"
channel: "IBM Technology"
topic: "software-engineering"
published_date: "2026-08-24"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=zAe-sau06io"
duration: 413
word_count: 1035
---
I used an AI coding tool recently for
what I thought was a tiny change. Just
update one piece of logic and fix the
test around it.
But then I looked at the difference. It
changed the file that I expected, which
was great, but then it also touched the
files I did not ask it to touch. Added
helper that already existed, imported a
library for something that the repo
already had utility for. And I just
thought, okay, technically this is
correct, but does it belong here?
That is the real problem with a lot of
AI coding tools right now. They're
getting very good at making changes
fast. You ask for a function, they'll
write one. You paste in an error and
seconds later you have a pass that looks
convincing.
But speed is not the same thing as
understanding. If you have worked in a
production repo, you know this
immediately. A code base is not just
folder full of files. It has history,
patterns, shared utilities, tests, and
all the weird decisions that usually
exist for a reason.
So when an AI tool starts editing before
it understands the systems, it can
create very fast chaos. Let me give you
an example.
Imagine your app has a service layer.
Every database call is supposed to go
through that layer
because that is where permissions,
logging, retries, and error handling
happens.
Now you ask your AI tool to add a new
endpoint.
If it only looks at the files that
you're editing, it might just write a
direct database query inside the
endpoint. At first, that sounds fine. It
returns the right data, maybe even the
test passes. But architecturally, it is
wrong. It is bypassing the service
layer. It skips the place where
permissions are enforced. It creates a
pattern someone else might try to copy
later. So the code works, but the system
got worse. That is why the question
cannot just be can AI write code?
Clearly, yes. But the better question is
can it write the code that respects the
code base? Because in production, a good
code is not just code that runs. Good
code fits.
First, we have
repo
awareness.
The AI needs to understand more than the
file in front of it.
A real coding task are rarely contained
in one file. A small change might affect
type definition, an API contract, a
test, or documentation no one remember
that even exist. So, before the AI ask,
what code should I write? It should ask,
what do I need to understand? And note,
that does not mean dumping the entire
repo into the prompt. More context is
not always better context. If you give
model thousands of irrelevant files,
you're just hiding the useful signal
inside more noise.
Good repo awareness means finding the
right context at the right time.
Relevant files, existing examples, tests
that matter, and code that already
solved a similar problem.
Second,
architectural context.
Architecture is not just where the file
is. It is the set of rules that keeps
your system maintainable.
Where should the business logic go?
Where does validation happen? Which
service own this data? Or are we even
allowed to add dependency here?
When an AI tools ignore those rule, you
get the code that works but feels
foreign to the repo.
Maybe it imports a new library when the
project already has standard utility.
Maybe it writes a helper that duplicates
something that already exists. None of
that feels catastrophic in the moment,
but over the time, this is how code
bases get messy.
Third, we have
planning before patching.
The first output from AI coding tool
should not always be code. Sometimes the
first output should be understanding.
Before it changes anything, it should
make its reasoning visible. It should
say, "Here are the files I checked.
Here's the pattern that I found. Here's
where I think the changes should go. And
here is what I recommend doing next."
And then it can write the code. That
pause lets developer catch mistakes
early. You can say, "No, do not touch
that package. Use this existing service
instead." This is how real collaboration
works. Good engineers align first. AI
tools should do that, too. AI-generated
code is very good at looking right. The
names are clean, the structure looks
familiar, the comments sound confident.
But confidence is not a test result. A
code-respecting AI tool should run the
same checks a developer would run. Unit
tests, type checks, linting, build
commands.
But verification should go beyond
did the test pass?
It should also ask, "Does this change
still fit the system? Does it follow the
existing pattern? Did it respect the
architectural standards of the repo? Or
did it introduce a shortcut that might
cause problems later?" Because in
production, a change can work and still
be wrong for the system. And if
something fails, a tool should
understand the failure and not just
randomly edit until error disappears.
That is the difference between debugging
and guessing. And finally,
boundaries.
A good coding agent needs to know what
it can touch, what it should not touch,
and when to ask for approval.
Should it edit deployment files or
change authentication logic, install
dependencies?
For most teams, probably not without
reviews.
It should work on a branch, run test
safely, avoid secrets, and ask before
doing anything risky.
Basically, it should have manners. It
should knock first. So, the workflow
should be simple. Read first, plan
second, patch third, verify fourth, and
review last. Not patch first and
apologize later.
And as developers, we should be just as
intentional.
Point the tool to the right files. Show
the existing pattern. Tell it the
constraints. Ask for plan before code.
Because if the instruction is vague, the
model fills in the gap. And in software,
filled-in gaps becomes bug.
The future of AI-assisted development is
not just faster code. It is more
context-aware code.
Tools that read before they write. Tools
that understand before they modify.
Tools that preserve architecture instead
of just casually reinventing it.
