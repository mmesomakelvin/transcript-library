---
video_id: "c9292MtK8EA"
title: "Pi Agent + a Real Browser = This Is What Happened"
channel: "Steel Browser"
topic: "ai-llms"
published_date: "2026-04-14"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=c9292MtK8EA"
duration: 324
word_count: 826
---
So, crazy Austrian guy, Mario, built by.
By is the thing that drives open claw.
It's the agent behind open claw.
Um it can easily be extended. You can
add bunch of stuff to it. Steel is
providing a browser, obviously. When you
work with your agent, you wish to add in
some kind of access to web and it should
be able to fetch stuff and docs or
whatever. So, I created this extension
uh which allows by to use um Steel. And
now, if you go to your terminal of
choice and you just run uh by install.
And then, we can also like fetch uh this
line to install our extension.
Uh it takes a second and now you can run
it easily with just by and we can give
it a task. Uh visit apple.com
and confirm me all recent MacBook
models.
So, it can take more complex tasks, not
only like very simple stuff. Um but, if
you need simple stuff, it can scrape
pages. It will just feed you back
markdown, HTML, or whatever. Uh
and if you need more complex stuff, it
can even use computer actions to
navigate the page. It's now we are
seeing like it's on a web page. Um it's
taking a screenshot. It's scraping the
content.
Uh it's figuring its way around. You can
see like there was a bunch of content on
that page. It's just found the new
MacBook Neo model. Um it's it's visiting
a comparison page. So, this by uh
concretely is run via uh the AI GLM 5.1
model with medium reasoning, which is
really impressive when you can see how
much stuff it can do.
Um we see here that it's now scrolling
the page.
These Apple pages are really heavy with
a bunch of stuff.
Uh
it's not easily accessible to agents.
And now, we see this is not any kind of
this very general agent. This is not
like a browser-specific agent. This
agent just has tools to operate a
browser and just a small scope of tools,
not all.
So, it's now fetching MacBook Pro
models.
MacBook Air models. So, it's through the
process of self-discovering the links.
It's just going through it and
fetching and doing some reasoning around
it.
Um and it should return us by the shape
of the results we are seeing, it should
return us uh a complete uh
complete report on the task we have
given it.
Okay. So, this is done. Uh it's creating
a final report and we can now see the
current MacBook lineup comparison
from the cheapest neon budget model or
Air
13-in 15-in models.
MacBook Pro.
So, it basically fetched all of the
content and created this nice report for
us.
Uh with Steel, you can even like scrape
PDFs and it can return you screenshots.
For example, you could do like
competitor monitoring or stuff where it
takes a screenshot and like tracks the
changes. So, this was nice. Let's try
one more example. This is clean session
with by. Uh we see here that the
extension is loaded and we are tasking
it to visit open AI docs and
um
tell us how can we use the latest model.
And open AI page is not super easy. Uh
they're using Cloudflare and even Codex
uh their own CLI agent is basically
implementing tools for fetching their
own docs. So, it kind of tends to break
and we here are seeing that uh Steel is
going through the docs uh giving us some
outputs. Um it's navigating the page.
Um so, it found the responses API
create.
This is cool because typically, if you
just ask agents to write you something,
it will
uh it's not aware of the latest models.
It needs some grounding in
documentation.
Uh and like it will always uh try to use
uh chat API instead of responses. Now,
it's trying to figure out the reasoning
effort that we have seen.
Um
it's like taking some time. Again, very
impressive from the GLM 5.1 model to see
how it operates the web. Uh we are just
giving it the tools. Um we are just
giving it the browser and by is doing
the heavy work uh backed by GLM.
Um yeah. So, it looks like we are coming
to something.
Okay. So, it's done. Uh um
It's now returning the facts from the
docs, a concrete example of
implementation, which looks uh okay. Uh
this is exactly how would you do it.
And yeah. So, this is by uh and Steel by
Steel extension, which now you can use
with your favorite coding agent, which
obviously is by. And yeah, go crazy,
have fun, and report your experiences.
