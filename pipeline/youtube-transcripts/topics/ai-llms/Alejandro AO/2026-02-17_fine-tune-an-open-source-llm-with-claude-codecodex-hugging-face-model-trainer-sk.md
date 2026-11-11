---
video_id: "HGPTUc7tEq4"
title: "Fine-Tune an Open Source LLM with Claude Code/Codex (Hugging Face Model Trainer Skill)"
channel: "Alejandro AO"
topic: "ai-llms"
published_date: "2026-02-17"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=HGPTUc7tEq4"
duration: 1349
word_count: 3471
---
Good morning everyone.
How are you doing
today? Today we
will look at how
to train a model for
your own
agent, and it will be very
simple because we will
entrust
all of this to CodeEx or
Cloud Code. Of course,
fine-tuning a
language model can
be a complex
task that
usually requires
an expert, but not
today. After all, these
agents, CodeEx and Cloud Code,
will not only help you
make
difficult decisions, but also
send
training tasks to HF so that
you don't have to
do all the hard
work yourself.
So, in
today's video,
we'll first choose a
base model that
we'll train.
We will then train it,
evaluate it to
make sure
the tweaking
was successful, and
use it in a
quick app
to classify and
summarize
support tickets. And
we'll do all of this for
less than $1.
So let's
take a look at this.
Good. Let's say
you have an application
that works as a
customer support service, and
your users
can send
messages along
with contact
information. All of this
will be input
to your API, which will
then go to a
classifier that
will assign a
specific category to the user's message
. For example,
if a user writes:
“I would like a
refund” or “
I want my
money back”, the classifier
will identify this as “
refund”. And
this is not just an
ordinary
classifier. Otherwise, a
much
simpler model could be used instead of a
large language model.
Our classifier
will output a full JSON
containing the intent,
confidence level, and a
short
summary or reason
why the ticket was
assigned to this
category. OK.
After that, when you
get all the
result, you can
save it in your
database. Here's what we'll
be doing.
Good. OK. So, the
first thing we
need to do is
choose a model that we
will
customize for
our specific
task. In this
case, I will
use the Qwen 0.6
B. It is a very small
model, but this is very
convenient because it
will be very accessible
for further customization. And
we're going to
fine-tune it
on this dataset
that I have here. This is a
dataset for
training the
Bite customer support chatbot. This is a
huge
data set with many
instructions that
are essentially questions from the
user or
client. Additionally, you
have the category of
the question and the intent
that the customer had.
For example, if
a customer said something
like, "I
need help
canceling a purchase
blah blah blah," you
'll see that the intent is
to cancel the order
, as well as a response
from LLM. Now we will
use this
specific
dataset to train
our small language
model to determine
the intent for each
ticket we
will send. This will
allow us
to run the entire model
on our server and
not use a
model with a trillion
parameters just to
quickly
classify a ticket.
So, that's exactly what we're
going to do. In
this case, I
already have a
dataset loaded into Hugging Face.
But in your case,
you can
customize your
model for
specific needs.
For example, your
chatbot could have
user feedback
: a thumbs up if
you liked the answer, and a thumbs
down if you didn't. This is
extremely valuable
data that can be
used to
further
fine-tune
the model. You can
use this
method that I will show you for
exactly that. If
your data is in Hugging Face, you
also have access to
Data Studio, which allows you
to explore the entire
dataset. There is a great
SQL console for
queries, as well as a
convenient agent that
you can interact with
like a database. It
runs on the
OSS120B GPT, and I can
ask, for example,
what unique
values ​​the
"intent" column has in
this dataset, and
it will execute the query for
me. Here's what you can
expect when
you use Data
Studio by Hugging Face with
your dataset.
Once you have chosen
the model and dataset you
will
use, it is
time to start
training. But before
that, let me
show you what the
model looks like before the
tweaking so
you can see
the difference. OK. So,
now we're going to
test the model
before we actually
start
training it. So,
the very first thing you
need to do is
initialize the
virtual
environment
using UV. In my
case, I almost
always use
UV and am going to
install those
dependencies right here.
Here, this fairly simple
cell simply
displays the
hardware you are
currently using
, to make sure
you have chosen the correct one.
You also need to
authenticate with Hugging
Face, as we
will of course be
downloading the models we
are going to
use
from there. So, you
need to have your HF
token right here, or
if you have already
authenticated via the
HF CLI, that is
enough. After
that, I just
copied and pasted a
very quick
configuration and
parameters for my
model here. Here is the model
I use.
Here I have the ID of
the final model that
I'm going to train.
And here is the name of my
dataset.
We also have a text column
and a label column.
The column of text is,
of course, the instruction
that will be the
message for
my client. And here
I have a label column,
which is the target
column. I will
work with a
sample size for
the evaluation of 60 out of 4000. And
my seed is, of course,
the answer to everything. What it's
really going to do is
this: we're
going to send this
short query that
I have here to CodeX,
Cloud Code, or whatever
model you're
using, and
it's going to do all the
pre-training work
for you. This is simply
incredible. This is so
wonderful. So, I'll say:
retrain Qwen 3 0.6 B as a
customer support ticket router
using the text
and name of my
dataset. Next, the
task definition
will be as follows: the input
column is the
instruction. The target
column of labels is
intents. I want to
keep only the 12
most frequent intents
in the first 5000 rows of
training data.
Chat-style training sample format—
user. And the
assistant's message here will
contain intent,
confidence, and
reason. And all this in
JSON format. Now the
learning strategy
will be SFT. The maximum
sequence length is 512. In
my case, I have already
specified what
hardware I want
to use. But
if you don't know what
equipment you want
to use, you
can simply
ask the system
to recommend the best
option and
calculate the cost
that awaits you. And,
of course, Codeex or Cloud Code
will calculate
the cost of the entire
training procedure for you
, so you know exactly
how much it will
cost.
Additionally, I instructed
the system to save the
result under this
specific
model ID. After
training, we will also
run evaluation
on the deferred
sample and get a
report on accuracy,
proportion of correct JSON,
percentage of
schema passing, and accuracy by
schema. So, this is what
we're going to
do. So what does
this model look like?
What does the model look like
before this task?
Let me show you.
This sounds pretty
funny, because I
only have auxiliary
functions here. You are
free to read
them in your notebook. But
here I loaded the
model using
transformers. Transformers, if
you're not familiar, is a
great library
that allows you
to run any
Hugging Face model on
your computer.
Incredible. The team
here is also made up of
geniuses. And now we
will evaluate
this model. We will
take a few
lines from our database
for evaluation, 60
lines, as we
seem to have
agreed earlier. And
we will check if
the model produces the
correct label. And, as
you can see, since she
wasn't trained properly,
the result is, of course,
terrible. So,
the accuracy is 0.2
, the JSON fraction is 0.28, and the
schema pass percentage is 0.28. These are just
terrible, just
terrible figures.
Of course, this is quite
logical, because the model
was not fully trained.
Let me now
show you how to
train her, and then we'll
see how everything
will change significantly
after
the training is complete. So,
let's go to Codeex and
get everything set up to
work, as you'll
need to complete
a few steps before
sending a request
. OK. So, to
use the
Hugging Face model training skill, you will
first need
a few things. First,
you need a
professional
Hugging Face account. You
must also create a
token in your
Hugging Face account that
has write permissions and
allows you to create
tasks. Let me
show you how it
works. You will go
here and then go
to the access tokens section
. You will create a
new token and grant
it the right to write
content, as well as the right
to run and
manage tasks
on your behalf.
Of course? Since
we are going to
train or
fine-tune our
model using a
task. And after
that, of course, you
will need Codeex, Cloud
Code, or any
other AI agent for
programming that
you desire. You will also
need the
HuggingFace MCP server, as this is what
we will
use to
run tasks. And
to do that, you
just need to
go here, to the
settings. You
move down here
to the MCP. Here are instructions
on how to
install it on
whatever agent
you are currently
using. In
my case, I
use Codeex. So
I just need to
run this on the
command line and I'll be good
to
go. And, of course,
after that you will also
need to
install the Hugging
Face skill. And the easiest
way to install
skills, if you're
not familiar with it, is to
use
skills.sh. So what we're
going to do is we're going to open up a
quick terminal right
here. And we'll go
here, where we'll enter npx
skills add. So, npx skills add.
And we'll add this skill
here. A good idea is to
simply copy
Hugging Face and the skills. That is, the
username and the
repository name. You
press Enter, and here
you will see a request
to select the skills you need
. In this
case, you simply
press Tab on "hugging
face model trainer". You
press Enter. You
choose the agents you
want to
set this for. In my
case I want for Cloud
Codeex and probably also
Gemini. I'll just leave
everything as is. And here you
choose whether
you want to set this for
the project or globally
. That is, it is available for
all your Codeex
or Cloud Code sessions. In my
case, I will focus on
the project. I
won't actually press Enter
because I already have it
installed.
If you're not familiar with
how
skills work, I have another
video here where I
explain everything you
need to know about
skills. And once that's
done, you
can get
your skill right here.
So if I type in /skills
, I can see the
Hugging Face model trainer right
here, which is my skill.
Training Hugging
Face models. OK. But
before you can start
using this
skill, we also
need to
authenticate with Hugging
Face. So you will
have to
install the CLI for Hugging
Face. In fact, you
can just search for
Hugging Face CLI on Google.
Follow the first
link. Here you
will find instructions on
how to install it.
Once you have it
installed,
go back to the
command prompt and
type hf auth. If you are
already
authenticated,
you can type list and it will
show all available
tokens and the one that is
active. In my
case, I want
this one to be active
because it has
write permissions to my
repositories as well as
initializing
tasks. If you
don't have one, all you
need to do is
hf login and it will
prompt you
to initialize a session
. If you already have a
token, just add
--token and paste your
token here. This
initializes a session with the
specific token
you just
created. OK.
Once that's done
, you can
launch your
agent and ask it to
do what
I said. So
let's open the Codex
and I'll show you how to
do it. Good. As I
said before, I will be
using Codex
from OpenAI to
run this. But you are
free to
use
any model you
want. You can of course
use Claude,
Gemini CLI, Kimmy CLI, etc. In
my case, I'm currently
using Codex, and
I also
like this user-
friendly interface.
So what I'm going to do—I'm
just going to select the
Hugging Face model trainer skill. Don't
forget to first
complete all the steps
I mentioned in the
previous part of
the video: installing
the skill, installing the
MCP server,
authenticating, and
having a Pro
account on Hugging Face.
Then just insert
the query like this. I'll
just give him
full access. I won't
sandbox it to
make sure everything
works correctly. And I'll
just send it. I'll be
back as soon as
everything is ready. That's
all. He
has completely completed the work. It
took a little over an
hour. And just for
the record: in this
example, I sent a
very detailed and very
clear request right
here. But you
don't have to be
that detailed,
especially if you don't
really understand what you're
doing. Just be
sure
to ask what the
final cost will be
before
confirming the
job submission. In
this case,
since I clearly
stated and defined what
I needed, it
was very easy,
so I just
sent the assignment,
but this feature
also allows Codex
or Cloud Code to help
you determine what
learning method you
will
use.
So, in this case,
I have already determined that
I need to
do SFT. But,
for example, if your
dataset
is based on
your
users' preferences. That is,
for example, questions or
answers that your
users found
more useful than others,
and you already have a
dataset. Codex could
suggest you
use,
for example, a DPO instead of an
SFT. And you don't need
to be an expert in
all of this. Codex is
designed to
help
you with these blind
spots. Additionally, I
decided in advance
what equipment I wanted to
use. But
you can also
ask Codex what
equipment he
recommends for
training. This is also
great for
estimating the final
cost of the entire
training assignment
so you can see
the price before
submitting the assignment
to HuggingFace. Good. So, here it is
. Now that
the task is fully
completed, you can
see here that
the system has analyzed
all of this and figured out how
to use the
dataset to further train
my model. Additionally
, while the setup was in progress
,
the system provided me with a
task monitor so
I could monitor the
process. By the way,
it also provides a
great tracker for
tracking the
learning process itself. And
so it is. That's all. Now
you also have the
evaluation result
that was obtained
here because we
requested it, although we will
also evaluate it
manually in the notebook
that I showed
earlier. But here you
see that the accuracy is
already much higher than it
was before. We
received 100% valid
JSON and 100%
schema compliance. So this
model seems
much more useful
than the one we had
before. Let's
try it in
Notepad. OK. And
before we
move on to the
next part of
the video, I wanted to
make sure you
see this. So,
as you can see, this is the full
cost of the entire
pre-training process
that we just
completed. As you can see,
it's less than $1. The
total
running time was
about 55 minutes.
So the cost
is about
36-37 cents at a rate of
40 cents per hour, which is
just incredible.
Now I have a
fully trained
model that I can
upload to my
own server,
add to my
Fast API app, and run
from there, without having to make
requests to the OpenAI or
Anthropic APIs every time
I need to
classify tickets
. It's incredible, and all for just
$1.
Good. Let's
take a look at the
results on our
laptop. Here,
please. As you can
see here, I have the
evaluation results
after the model
has been retrained. As
you can see, I'm uploading
both the base model and my
LoRA. And here I run the
same
evaluation method that I announced
earlier. Let's
look at the
results. As you can see
, we are still working with a
sample of 60 rows.
We have an accuracy of 85%, which is
slightly lower than what the
Hugging Face task showed, but it is still
significantly higher than it
was before. The percentage of
valid JSON is 98%, and
the percentage of successful
schemas is 88%, which is
incredibly high
compared to what we
had before.
Let me show
you the difference and
comparison. As you can see
, we used to have
an accuracy of 20%, and now
it is 85%.
The share of valid JSON
was 28%, now it is 98%, and so
on. Here's a nice
visualization so you
can see the actual
results of the
model training, and
as you can see, I didn't even
know how to do DPO
, SFT or anything like that.
Everything was done
automatically because
I simply asked Codeex
to retrain the model for
me. And as you can see,
I have a model that
works much
better than the base one. It is
much more powerful
for my specific
task. As you can see, the
accuracy rate
has increased from 20%
previously to over 80%, and the
percentage of valid
JSON has also increased. And here are the changes in
indicators. So we
have a positive
delta of 60% in accuracy, a
positive delta of
almost 70% in the fraction of
valid JSON, 60% in the
schema pass rate and
schema accuracy.
Simply, simply
incredibly good. And,
um, like this. And here I've
actually added a very
quick
playground so you
can try it
again and see how the
model behaves before
and after. So, I
have a very quick
demo ticket here. Hi, I
placed an order
this morning but
chose the wrong
shoe size. Can
you please upgrade
the order to a size 42
before it
ships? And,
of course, in the demo,
the expected intent is
to change the order.
We're going to
run this
first with the base
model before
pre-training, and then with the pre-
trained
model. And this is just
to show you the
actual request that
will be sent. And, as
you can see, the result is
very funny. So,
before the model
was fully trained, it
exhibited some strange
thought cycle. It
was, "yes, I can
do that." "Please
make sure you
upgrade your order
to size 42." "
The client asks this and
that." And she just
somehow got caught in an
endless loop. Um
, and after some further study—
here's my answer,
which is much, much
better. And, of course, exactly what
we expected.
So, before the retraining
we have virtually
nothing, and after
the retraining we have
that the intention was to change
the order, the scheme is in
order,
99% confidence. And, um, like this.
I hope this was a
good video. I know
that retraining
may
seem a bit
daunting at first, but I
hope this
skill will help you
overcome that fear and
learn how to retrain
your models by asking
Codeex or Cloud Code
any questions, and they will
definitely help you
solve them. And also, and
most
importantly, huge
respect to Ben and Sean,
who are the creators of this
skill. I'm sure
this will help
many people
start working with
pre-training and
actually
use
open
source models in their
real-world applications
. As you can see, we
already have a fully
trained model that
you can simply
run
using transformers,
connect to a
fast API application, and
start
using on
your own server. That's
all. Thank you very much for
watching. It was a
real
pleasure, let me
know in the comments
if you have any
questions, and
I'll see you
next time.
