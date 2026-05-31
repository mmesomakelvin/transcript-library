---
video_id: "CQeKmG1o85E"
title: "Stop Using Claude Code Without This Tool"
channel: "Leon van Zyl"
topic: "ai-llms"
published_date: "2026-02-23"
ingested_date: "2026-05-31"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=CQeKmG1o85E"
duration: 959
word_count: 3010
---
With all the hype around agentic coding
tools like Claude code and cursor,
people are asking, is n8n still
relevant? Why would you drag and drop
workflows together if you can simply
vibe code the entire thing? As a
professional software engineer and
educator here on YouTube, I use Claude
code every single day. And the truth is,
n8n is still a valuable part of my daily
workflow. These two tools together is an
insane combination. And in this video,
I'll show you how I use them side by
side from exposing n8n flows as MCP
servers to receiving notifications on my
phone when Claude code completes its
work. If you're building anything with
Claude code or n8n, you definitely don't
want to miss this. n8n makes it really
simple to rapidly build out a prototype.
Take this workflow for example. This
generates a short video script. It then
uses Sora 2 to generate the video, and
then it then automatically uploads the
video to YouTube. I created this
workflow in less than 5 minutes using
n8n. This makes n8n the perfect platform
for rapidly prototyping an idea. And
once we prove that it works, we can
easily move this into a separate
application. And there's different ways
of doing that as well, which we'll
explore in this video. Right, so n8n
just created this video using Sora 2,
and the video was uploaded to YouTube.
And we can see that video on the YouTube
channel as well, complete with a title
and description. And this was all
created within a few minutes. Now, of
course, we can simply run this on a job
which will automatically generate a
video and then upload it to YouTube on a
daily basis. Or we could also build an
application around this workflow,
something maybe with a UI and user
authentication, anything we want. And
there are many ways that we can use
Claude code to do exactly that. The one
technique is to simply download this
workflow. Then, back in our Claude code
project, I'll just create a new folder
called docs. Then we'll add that n8n
workflow to docs. I'm just going to
rename this to N8N. And what we can do
then is simply pull in this workflow and
say, "Hey there, so we're starting off
with an N8N workflow." I actually want
to convert this workflow into a Next.js
application. It correctly identified
that there are two triggers, one manual
and one that runs every day at 4:00 p.m.
There's also a script generator that
uses GPT-5 to generate a humorous
8-second micro documentary script with
structured output. And that will return
the script, the title, and description.
We also have the video generation step,
which uses OpenAI Sora 2 to create a
short in a vertical format from the
script. And then it also uploads the
video to YouTube. And of course, our
project is currently empty. So, Claude
is going to ask us a few questions, like
what do we want to do? What kind of
Next.js app do we want? A web UI where
we can trigger generations and see
results, or a headless API backend that
replicates the automation pipeline. So,
this is really where we can flesh out
our app idea with Claude Code. And after
answering these questions, Claude Code
will now convert our N8N workflow into
an actual application that we can deploy
along with user authentication, anything
we want. Just to be clear, that
technique will not use the N8N workflow
at all. It's going to build its own
solution that mimics this behavior.
Which might be exactly what you want.
Maybe you're using Open Router with a AI
SDK or the Claude Code Agent SDK, who
knows? But that's a great way to take
this proof of concept and to build a
standalone application which you can
deploy to production. But what if you
wanted to build a beautiful UI that
simply invokes your N8N workflow? Well,
that's really easy as well. In this
example, we can actually add another
trigger. So, we could simply add a
webhook trigger connected to this very
first node. Then, we can grab this URL,
and in Claude code, we can simply do
something like
"Please create a web app that generates
Sora 2 videos and automatically uploads
them to YouTube." Now, for the back-end
logic, we will actually use an n8n
workflow. Here is the n8n webhook, and
then we can paste in our webhook URL,
and now we can get Claude code to build
a UI for our application. Again, with
any user authentication and anything we
want. And the actual complexity of the
application, so all of this sort of
back-end logic, will remain in n8n. So,
we're kind of using n8n as our back-end
infrastructure. And the great thing
about this approach is we can actually
go to executions, and we can see all our
previous executions as well. And from
here, we can even debug any issues, and
we can restart these workflows as well.
This can be really useful if you're
building super complex workflows that
might upload a video, but also send an
email, and also update Slack. I mean,
you can really go as wild as you want.
You know, we can have our YouTube node,
we can also add Slack integration, we
can maybe send WhatsApp messages,
anything we want. But from our UI
perspective, it's simply a button to
generate a video, and all of the
complexity is handled in n8n. One of the
most popular use cases of n8n, and
probably the easiest way to make a side
income, is to build customer support
chatbots for business websites. Now,
this means we can add this chat bubble
to any website, and now we have a
chatbot with knowledge about this
business. So, we could ask, "What are
the current specials?" And this agent
will have access to the menu or any
information related to this business.
For example, the current specials. And
you will also notice that this chat
bubble does have the same theme and
style of the main website and it then
makes it really easy to customize these
chatbots and setting up a workflow like
this could not be any easier. We simply
have an AI agent node. We're using open
router for the AI inference. We have
conversation memory and of course access
to the restaurant's information. It's
even able to make reservations as well.
If you want a step-by-step tutorial on
building this agent and embedding it
into any website, you can simply watch
this video over here. I'll link to it in
the description of this video. But you
might be wondering how this is related
to Claude Code at all. Well, this
chatbot has this when chat message
received trigger and if we open this, we
get these instructions for embedding
these chatbots into websites. So, this
gives us access to this N8N chat widget
with a lot of technical details on
adding it to a website. So, if you don't
want to deal with with trying to embed
this yourself and creating the custom
styling, which can be quite a challenge
as well if you look at all of the
customization going on here, really all
you have to do is copy this article. You
can send it to Claude Code and do
something like, "Hey, please can you
embed this chatbot widget into my
website and also adjust the colors
accordingly to match the website's
brand." Something like that. So,
obviously you want Claude Code to be
open in your website's project and it
will do all the customization for you.
Here's another really popular use case.
You can expose any workflow or tool as
an MCP server from N8N. And trust me,
N8N supports a lot of different
platforms. There's like hundreds if not
thousands of integrations here.
For example, the Gmail node, which
allows us to create drafts or read
emails or send emails. For this demo,
what we can do is actually use a data
table. This is a database that's built
into N8N and And are really easy to set
up. So, let me show you. If we go to
data tables, we can easily create a new
data table like this to-do table. And we
can specify any columns we want like the
title, the status, the category,
whatever we want. We can easily add or
remove columns as well. And we can
manually add or remove records. It's
really that simple. So, let's say we
wanted to expose our to-dos to our Cloud
Code instance. So, that way we can ask
Cloud Code about our daily to-dos or
even add to-dos, update them, whatever
we want. All we have to do is create a
new workflow. Then let's search for MCP
and the MCP server trigger. We can add
authentication if we want. I'm simply
going to rename this to Let's just call
this N8N to-dos. I'll get back to this
node in a second. And now we can add any
of those integrations to this node. So,
for our example, we'll search for our
data table. Now we can specify any
operation. Let's do get. Then from this
list, let's select to-dos. And that's
really it. Now we have an MCP server
that can retrieve our to-dos. I'm just
going to rename this one to get to-dos.
Maybe we can add another one like data
table. And for the operation, let's
leave it on insert. Let's select to-dos.
And let's rename this to add to-dos.
Cool. So, now we can actually just
publish this workflow. Back in this
node, let's grab the production URL.
Then I'll just exit out of Cloud Code
for a second. And now we can run Cloud
MCP add {dash} {dash} transport SSE
{dash} S for scope project. Then we can
give the server any name we want like
N8N to-dos. Let's paste in that URL like
so. And that created this mcp.json
file. And if you want, you can simply
create this file yourself. It's probably
easier than that command. So, now that
that's done, what we can do is run
Claude. And now, if we go to n8n, we can
see our n8n to-dos, which is
authenticated and connected. And if we
go to view tools, we can see the two
tools that we added. So, you can add as
many workflows as you want with as many
tools as you want. So, you can get
Claude Code to send emails, update
Slack. There's just so many different
options here. Let's try this. Please
retrieve my to-dos. And look at that,
it's going to call our n8n to-dos tool,
which is perfect, and we get the
results: buy bread, call mom, and buy
dog food. And if we go to our data table
in n8n, we can see those to-dos as well.
If you've ever used Claude Code, I'm
sure that you know exactly how long it
can take for the agent to complete
certain tasks, sometimes going on for 20
or 30 minutes. And I don't want to sit
around and babysit the agent. Now, we
can use n8n to send that notification to
any platform we want, really. It could
be Slack, it could be an email, WhatsApp
message, Telegram, you name it. Now,
setting this up is really easy. So, we
can simply create a new workflow. Let's
call it Claude Code notifications,
and I'm just going to use Telegram for
this one. In fact, I've got an entire
video showing you exactly how to set up
all of this. So, I'll link to that video
in the description. Now, in order for
n8n to reliably communicate to Telegram,
you will need to run n8n in the cloud.
Now, of course, you could just pay for
their service. So, if you go to pricing,
you will see that this is actually 24
euros per month. So, what I would
recommend instead is to use Hostinger.
This gives you 64% off n8n self-hosting.
So, you can self-host n8n for as little
as $5 per month. All you have to do is
select your plan, select your period
from 1 month, 12 months, or 24 months.
It really doesn't matter. What you need
to do is select n8n the bottom of the
screen over here under applications,
then you can get an additional 10% off
if you use the code Leon. And just like
that, you're getting N8N for even
cheaper. Simply continue with the
checkout process. Then from your
dashboard, simply click on manage app.
And now you have access to your very own
N8N instance at a fraction of the cost.
All right, so once we've set up our very
simple workflow that exposes a webhook,
then I'm only grabbing certain messages
from Cloud Code. I don't necessarily
want to receive everything, and I'm
sending a message to my Telegram
account. Then back in Cloud Code, we can
use a built-in feature called hooks. So,
if we run the command hooks, we have
access to a whole bunch of hooks that
get triggered while Cloud Code is
running, like notifications as well as
stop. So, I'll go with stop, add new
hook, and for the command, I actually
don't know. So, I'll just say "Not yet."
Let's run this. We'll store it at
project level, and that should be it.
So, now in our Cloud settings file, we
can see the hook that we just
configured. So, now we have to replace
this command with a call to our actual
N8N webhook. So, I'm simply going to
copy my webhook URL, and then I'll let
Cloud Code do all of the hard work. So,
let's pull in the settings file. "Hey
there, I need you to complete the setup
of this webhook. The idea is that we
want to receive notifications from Cloud
Code once the agent completes work." So,
effectively, we want the final message
produced by Cloud Code. Then we want to
send that message to an N8N webhook. And
here's the URL to the webhook. And I'll
just paste that in. So, there is
documentation related to using hooks in
Cloud Code. So, I'm actually going to
just copy this URL, and then here's the
link to the Cloud hooks documentation.
And that's really it. Let's send this,
and within a second or two, we should
receive notifications from Claude Code
on Telegram. So, Claude created this
Python file that calls this N8N webhook,
and it's passing this payload to N8N.
And of course, we can tell it exactly
what to include in the payload. And now,
when we send the message to Claude, we
should receive a message to Telegram
once Claude completes, which we do. So,
your messages can be customized to look
however you want. I'm simply including
the project folder along with the event
that was triggered and the final
message. How cool is that? So, I can let
Claude cook, I can go off and do
whatever I want, and once Claude is
done, I'll receive a message. So, as a
little bonus round, here's another way
that you can use Claude with N8N. This
is not necessarily Claude Code specific,
but of course, you can use Claude Code
to do this as well. You can expose N8N
as an MCP server itself, which means
that Claude or Claude Code can remotely
access your workflows, and it can create
workflows, edit them, execute them, etc.
So, that way, you don't even have to
expose a webhook at all. Claude will
just have access to your workflow. But
here's a really silly way to use it as
well. If you install the Claude browser
extension, of course, we can change the
model, and in this extension, we can
say, "Please create an N8N workflow with
a chat trigger node with an AI agent
node with memory. You can use OpenAI for
the inference, and for the system
prompt, make the agent respond like a
pirate." So, even if you don't know how
to use N8N, just fire off Claude in the
browser, and it will just create the
workflow for you. And by the way, I'm
not touching anything. This is simply
Claude using the browser to create this
workflow for us. It can even
troubleshoot issues itself. So, from my
perspective, it's not really a debate on
whether you should use Claude Code or
N8N. My answer is use both. They both
have their place. Especially when
building complex solutions. If you would
like to improve your skills in Claude
Code or anything, then definitely
consider joining my school community at
Gentick Labs. We have a vibrant
community of like-minded people who
build real solutions using all of these
different AI tools. And we also have
structured classrooms for both N and and
Claude Code. And we also have weekly Q&amp;A
sessions. If you join now, you will lock
in your subscription at $7 a month even
when the price is increased. I hope to
see you there. And YouTube thinks you'll
enjoy this next video. So, I'll see you
in the next one. Thank you for watching.
Bye-bye.
