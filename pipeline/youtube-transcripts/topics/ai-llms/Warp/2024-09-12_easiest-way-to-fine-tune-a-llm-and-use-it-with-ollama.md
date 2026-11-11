---
video_id: "pxhkDaKzBaY"
title: "EASIEST Way to Fine-Tune a LLM and Use It With Ollama"
channel: "Warp"
topic: "ai-llms"
published_date: "2024-09-12"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=pxhkDaKzBaY"
duration: 317
word_count: 1124
---
you want to fine-tune your large
language model and run it locally on
your machine using
AMA well in today's video we're going to
do exactly that so let's
go first for the fun part which is
finding the right data set the reason
why finding the right data set is so
important is when you train a small
large language model with a data set
that is relevant to the task you're
trying to do it can actually outperform
large models what I'm going to be doing
today is creating a small fast llm that
will generate SQL data based off of
table data I provided one of the biggest
data sets to do this with is called
synthetic text to SQL which as over
105,000 records split into Columns of
prompt SQL content complexity and more
I'm running a Nvidia 4090 GPU so I'm
going to be fine-tuning this on my
machine using Ubuntu if you don't have a
GPU feel free to do this using Google
collab which allows you to run training
code in the cloud the great news is that
this project does not require a lot of
Lex Hardware to get it up and running
we're going to be using UNS sloth which
allows you to fine-tune a lot of
open-source models really efficiently
with about 80% less memory usage and
we're going to be using llama 3 which is
an llm used for commercial and research
purposes especially an English and has
really high performance make sure that
you have Anaconda installed on your
machine as well as the Cuda libraries I
will be using Cuda 12.1 and python 3.10
for this project you want to install the
dependencies required by UNS sloth which
you can find in the readme but for
Simplicity here it is this creates a new
environment for us and installed pytorch
Cuda libraries as well as the latest UNS
sloth you'll also want to install
Jupiter if it isn't there already and
then run your Jupiter notebook and now
you're done with the setup so let's go
into the jupyter notebook and get
started first we want to make sure that
all the installed requirements are
actually there if you're using Google
collab this command will install all the
packages next we're going to import the
fast language model by UNS sloth here
we're specifying that we want to use the
Llama 3 8bit Model we also want to set
up a Max sequence length of 20 48 tokens
this means that the model will only
consider up to 20 48 tokens where a
token can be a word subword character or
even punctuation when processing or
generating text and we'll set load in
four bit to True which essentially means
we're using less bits as opposed to
using the typical 16 or 32 bits to
represent the information in the model
doing this is going to help you reduce
memory usage and Al reduce the load on
your machine after running this you're
going to get a cute asky image and that
means that your model is loaded after
this we're going to load in the PFT
model which are basically Laura adapters
if you don't know what these terms mean
that's totally fine basically the Laura
adapters mean that we only have to
update 1 to 10% of the parameters in
this model without them it means that we
would have to retrain the whole model
not just a small portion which takes a
lot of time energy and even money and
UNS sloth provides this here with the
recommend mended settings I trust them
so feel free to read each comment now
this is where things can get a little
bit tricky depending on what data set
you're using now each data set comes
different from each other but they're
each formatted in the same way such that
the large language model can understand
it llama 3 uses alpaca prompts which
look like this now if you remember our
data set it is not as easy as just
plugging it in and letting it go off to
the races I have to format my response
first before plugging in the data I'm
only interested in the SQL of my
Database The Prompt I will be asking for
as well as generated code and
explanation so I'm going to update my
code to reflect this now we set up the
training module the supervised
fine-tuning trainer by hugging face is
what I used there are a lot of
parameters to use all that can be
described in their own video so for
example we have mac steps which tells us
how many training steps perform seed is
a random number generator we use to be
able to reproduce results and warm-up
steps gradually increases the learning
rate over time so now that we have
everything set up let's run
it and that's it your model has been
trained now before we move on we
actually need to convert this into the
right file type so that we can run this
locally using olama luckily UNS sloth
has a oneliner we can use to do this
after this is done we only need to do
one step to be able to run this with
olama first open up your terminal I'm
using the warp terminal here go to the
path of where the file is saved then
create a file called Model file and open
it up in the code editor this is ama's
Docker like file configuration where we
can create new models with specific
parameters in our model file we're going
to put a prompt so something like you're
an SQL generator that takes a user's
query and gives them helpful SQL to use
finally make sure o llama is running and
then we're just going to run this
command this command will then read all
the items in the model file you just
created and start using llama CPP under
the hood to make sure that the model
runs on your machine and congrats you
can now use your flying tune llm locally
all with the open AI compatible API and
more in your applications
if you're curious to know more about
olama we do have a 2-minute video out
about everything you need to know about
olama here otherwise thank you for
watching and I'll see you next time
[Music]
