---
video_id: "jFl5Fewrieo"
title: "EASIEST Way to Train LLM Train w/ unsloth (2x faster with 70% less GPU memory required)"
channel: "AI Jason"
topic: "ai-llms"
published_date: "2024-12-16"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=jFl5Fewrieo"
duration: 1496
word_count: 4797
---
So today
we're going to talk about Large
Language
Model Fine
Tuning
.
One area that has seen remarkable progress in the past 12 months, 2024, is the
gap between the best closed-source models like GBT and the best open-source models, which has
narrowed significantly
. The
Lama 2.2 launched by Meta and
all
the models launched by Mistral are
testament to this.
This is great
news for AI developers
because
you can take those
open source
models
,
fine-
tune them to your desired application, and
deploy them anywhere
. However,
fine
tuning
remains a frequently discussed topic. But in
reality,
this
process is
so
complicated
that not
many people
know how to do it correctly.
You
can see a variety of models on Hugging Face,
but you
may not know which one to start with.
Apart from fine tuning,
this also requires
a lot of knowledge about other things
. For example,
how do you
properly
prepare your training data?
How to
bring a model into production
and
use it
? This may
seem difficult at times,
but don't
worry
. I will walk you through the entire process of fine tuning, from
preparing training data
to executing the model, step by step
. I also
show you how to use Unslacks.
This is an open
source
package that
helps you fine-tune the model twice as fast and with 70% less memory,
meaning
you
can do it on a regular GPU.
So,
without further ado,
let's begin.
Before we get into fine tuning, we
need to talk about another method people use to bring personal information into the Large Language Model, RAG.
Many of you
may not have experience with fine tuning,
but you have
definitely
tried RAG
, as it is the
easiest way to add new information to a large language model.
So, instead of asking a large
language
model to
answer directly
, RAG
(Retrieval Augmented Generation)
converts your PDF or website information into a vector database,
extracts relevant information based on the questions asked, and adds it to
the prompt
,
providing additional context to the model.
Compared to fine tuning, which changes the structure of the model itself
, this is
much
easier to get started with.
You
can consider basic models like the GPD-3.5 or Lama 3 as a new graduate.
They
already
have basic skills like reasoning, logic, and common sense. But,
to prepare them for a specific job,
additional
training must be provided to embed that knowledge within the model itself
. So, when
the user
asks a question that is not in the base model,
it
can provide the correct answer without relying on an external data source. Therefore,
both RAG and fine-tuning will
help you bring your domain knowledge and personal knowledge into the model.
In many cases
, RAG is the best
choice
because
the knowledge of the model
remains frozen during fine-tuning.
Its
latest
knowledge will be based solely on the training data you
provided in the fine-tuning phase.
But, if there are any updates to that
data
,
it
cannot be handled properly. In
contrast, it is much easier to update the
knowledge
base
and bring in real-time
data with RAG
. This is
why in
most
cases
, RAG is the default option you
should select
. However,
apart from domain knowledge and personal knowledge,
there are also application scenarios where RAG is not sufficient.
For example, a
default
multi-model like GPT-4 O, while
capable of reading images,
cannot perform specialized tasks such as reading medical images. While you can retrieve
some
examples using RAG and
put them into the prompt as few-shot examples and
get quality results
,
you'll want to inject those intuitions into the model itself
. Similarly, if
you
want the model to follow a specific process in the legal field, it would be
better to train the model on a wide range of cases in that field rather than prompting
. When it comes to creating an AI
companion
or
trying to make it speak like celebrities
, ordinary
models
can't do it.
80%
can be achieved with prompts,
but
fine-
tuning is
necessary to accurately reflect. Therefore,
fine-
tuning is an
effective
method to train the model for specific tasks and behaviors.
In addition
,
fine-
tuning is a
great
way to dramatically reduce the cost of large language models.
Many of you are
concerned that using models like GPT-4 for your application is too expensive
. However,
the cost can be
greatly
reduced by collecting usage data and fine-tuning a smaller and faster model
.
In general, both RAG
and fine-
tuning are
suitable for different applications, and
you
can choose the right method according to your needs. As a
general rule,
if your application is bringing private knowledge, such as a website or PDF, into the language model, it's best to start with RAG
.
But if you find that the
basic
model is
struggling to perform specialized tasks in your field and
you are using
strange
prompting
strategies to get it done correctly
, then '
fine-tuning'
is
a great
option for you.
Here is the process for fine-tuning and deploying your own Large Language Model.
First, you need to prepare the training data needed to fine-tune the large
language model
.
After that,
you
need to choose the right basic model and the techniques needed to fine-tune that model.
But
most of the
time,
fine-
tuning is
not a simple process, and it is difficult to get it right on the first
try
.
You may need to evaluate the fine-
tuned
model and
then re-verify it a few
times
. You should set up proper evaluation metrics for the model you have fine
-tuned and
revise it until you reach a level you are satisfied with
.
Finally,
you
need to upload it to the right platform, the right hardware, and the right inference methods. The most
important
first step is to
prepare the training data
.
The ability and
performance of a fine-tuned model
depends on the data you provide it with
.
Depending on your application needs, there
are three ways to prepare training data.
One,
you can use existing data
. You can get it from your own app that you have been using for a long
time,
or
from a
public data set created by others
. On platforms like Kaggle
and Hugging Face
, there
are already many high-quality public datasets maintained by people and organizations.
You have a
higher
chance of finding one that suits your needs
.
For example, if I
were to create a customer service agent and
needed a model to classify the sentiment and priority of a ticket
, I would just search for 'customer support'
.
Existing
customer
complaint sentiment
and
preference
data
sets
can be found on Hugging Face.
Data
sets
already exist that contain medical images, along with their correct interpretation and diagnosis.
Therefore,
we can use this data set to build a specialized model that reads and identifies problems from medical images
. Of course,
you can also
create the data set manually.
But many
times,
you may have
a lot of
organizational
data that you need to teach the model, such as your PDF documents, websites, or videos, meeting recordings, etc.
That's why
I
want to introduce you to AssemblyAI
. They
are the leading speech-to-text model providers. They
can provide highly accurate transcription for both audio and video, whether it's English, Chinese, French, or Spanish. It goes
beyond transcription and
offers many advanced features such as automatic topic detection, content summarization, and speech recognition.
And it is
very
easy to use.
They provide an SDK that you
can use right away
. What I
like most is that
it allows you to define your own custom spellings for less popular industry-specific terms
. For
example,
I can define special terms like LangGraph
and LangChain
.
After that,
transcription will
accurately
identify those words.
They have introduced a new model called Universal-2
, which is the next
generation
speech-to-text
model.
It provides excellent accuracy even in difficult environments such as special
numbers,
enhanced
text file,
and numeric
precision
.
Therefore, it is a model that can handle real-
world complex
audio and
video
data
.
With this, you can
convert all videos and meeting recordings into text data that helps you fine-tune models.
But what you
need to know is that
for fine-tuning, the
dataset
must follow a specific structure that includes the system message, the user query, and the AI ​​assistant's response. This
means that if
you have a PDF
file or a
website with your personal data
,
you will need to convert them to this
specific
system
.
For example
, if you provide information that your office
hours are 9:00 AM
to 5:00 PM,
a
user might ask, "
What are your office hours?"
To ask,
the assistant should convert it into a question-answer structure, such that the answer is "
9:00 AM to
5:00 PM."
Likewise, if
you are
trying to create a chain of thought model that performs complex mathematical calculations.
That too
will follow a similar structure.
The user enters a mathematical
formula and
asks for an answer, and
the assistant
thinks through it step by step and
generates an answer with high-quality analysis.
So,
to transform your data into the format needed to train large language models, we'll often
use large language models or codes
, which I'll
quickly show you as an
example
.
On the other hand,
another
thing that is becoming increasingly popular is '
synthetic data'
. What
this basically
means
is that
larger language
models can
be used to generate the additional training data needed to fine-tune a particular model
. Typically, the process involves using a
large
and
knowledgeable
model to
generate data to fine-tune smaller models
.
For example,
you can use a
very large,
powerful
but slow
model to generate chain data for solving mathematical questions
. This will usually
produce a variety of answers.
On the other hand,
we will have a
reward model
. This is
a
model that has been meticulously trained to evaluate and rank the answers provided by other large language models, so that the
best answer
can be stored as a dataset. This
has many benefits. One advantage is that using a large
and
powerful
model
,
you
can train smaller, faster, and cheaper models that excel at specific tasks
. Furthermore,
it
helps us not be limited only by the data we have.
NVIDIA has introduced a model family called NeMo Triton with 340
billion
parameters
. It
includes both an instruction model used to generate training data and a reward model that evaluates responses. Therefore,
you
can generate very specific training data using this method.
There are detailed tutorials and code explanations on this in the AI ​​Builder community I am creating. So, if
you are
interested
, click on the link below to learn more about synthetic
data
generation
. As a
small
example,
I'm going
to show you how to create training data for a custom language model that can improve your mid-journey prompts
.
For this application
, we need a
specific
format of
training
data. It
should include a pair of both the original prompt, which is simple and basic, and the enhanced prompt, which adds more detail.
We can
fine-tune the model with this
. To
do this,
you can
collect the best mid-journey prompts yourself
or
find existing data sources on the internet.
Then,
models like GPT-4
can be used to generate what a simple and basic original prompt would look like
, so that
these data
sets
can be generated in bulk. I will show you how you can use existing data sets using platforms like Hugging Face
or Kaggle
. In Hugging Face, I will
go to the Data Set page and
select the task
. There will already be a
'
text-to-image' task there
, and
I
can search to see if there is any data related to mid-journey. So,
you
can see that there is already some data. I assume that this data, called '
Mid-Journey
Prompt High
Quality',
could contain filtered prompts to produce high-quality images
. If
I go into this
table
,
you
can see that there is a very detailed prompt for each image. It's
very
simple to do that data generation method.
We install the OpenAI
and Datasets
packages
.
They allow you to download the dataset directly
from Hugging Face
. Then
we will set up the OpenAI API
key
so we
can use the GPT-4 model to create the dataset
. So, we download it with a specific dataset name that
you can
copy and
paste from Hugging Face
. And
split train
means that we are getting a streaming dataset.
I'm only going to take the first 1,000
data points
, which
I
think is enough for this fine-tuning. Since I don't have any
other things in this dataset that I don't need
,
I will try to extract only the actual enhanced stimulus data from it
. I want to extract only the information within these
asterisks
. This
function does that
.
So, for each
improved
stimulus
, I will use the GPT-4
model
to create examples of the improved stimulus and the simplified stimulus
. Eventually,
I will save that string
data so that
I can
download
and
use it later
. So, this is the
whole
process.
I can turn this on
. If I
use the default mini model
, this might take about 15
minutes
. If
you
use a complete model
, it may
take longer.
Okay, this wo
n't even take a few minutes in total.
Then
we can save this data into a
downloadable
streaming
file
,
which will contain about
1,000 examples
.
We can then
convert this data into a format that can be used to fine-tune the model.
So, once the
initial
training
data is
ready,
we can start fine-tuning next.
There are a few different options you can use. You can use
closed-source model
platforms provided by both OpenAI and Anthropic
; If you provide training data in the correct format there
,
they will do the fine-
tuning
and
deployment
. OpenAI supports all GPT-4
models
, as well as the 3.5
Turbo
model
.
In Anthropic,
you
can fine-tune high-quality samples.
But the key thing to note about these
closed-source
models
is that
those
models are
not yours. They
only provide you with an API to do inference
. So, you are in
a way
tied to their platform only
. You
cannot download the model and host it elsewhere.
Therefore, the
cost of inference will
be an important issue.
Because, once you fine-tune your model on this
closed-
source
platform
,
you only need to use
their API for inference
. Therefore,
you will have less
control over reducing costs
.
Another way is to
try to fine-tune open-source models instead of those closed-source models
.
But, the problem with fine-tuning these
open-source
models
is that you have to
build a fine-tuning pipeline yourself
.
After fine-tuning, you
need to deploy it yourself. If
your user
base
increases,
this becomes difficult
and requires more
engineering work
.
That's why
there are intermediary platforms that help fine-tune open-source models and deploy them directly to platforms like Together AI or Fireworks AI.
Those
sites
usually
take care of the pipeline and deployment
, and even allow you to download fine-
tuned
models
,
so
you do
n't get stuck anywhere.
So, if you
are just starting out
and
don't want to use closed-source models
,
these
platforms are a
great
choice.
But, if
you want 100%
complete
control
, you
can practice and deploy on your own. Platforms like RunPod
or Modal make
deployment
easy
.
In this video, I'm going to
show you how to practice and deploy on your own
, so that you
can understand the entire process and
then
move on to closed or open-source platforms with
ease
.
One
question that may arise for you is how to choose the most suitable base model for fine-tuning.
You
need to consider two things.
One is the
cost and
speed of inference. In general,
you
might think that since the largest models are more efficient, why not always use them?
But,
using the largest models will
cost you more in the long run
.
In addition, it also
works slowly.
So, if you
are creating a real-time chatbot
, they may not be the
best
choice
. The
smaller
models are
really
progressing well
.
So, I usually
choose smaller models like 3B or 8B to start with
. Depending on the results of the fine-
tuned model
, you can decide whether to move to a larger model for more
accurate
answers
or to an
even smaller
model to speed up the experience
.
Apart from inference cost and speed,
another
thing to consider
is the use case
. Common utility models, such as Llama
or
Mistral, are
capable of performing a variety of tasks well
. If your task is
very
unique
,
for example, you
want to create a data asset agent that converts a user query into an SQL command to retrieve information from a database.
You just need to search
for 'text to SQL'
. There are many specialized models for that
specific
task
. By fine-tuning such
specific
models,
you can achieve a cost-
effective
solution
.
Similarly, you can find models for coding,
math,
and other
tasks
.
Therefore,
you should initially
find out which model is best suited for your application
.
However, in addition to which
basic
model to
use
, you also
need to consider the fine-tuning method. There are
two
popular
ways to fine-tune.
One is
full
fine-tuning,
the other is
LoRA.
If you haven't heard of LoRa, the
difference between full alignment and LoRa is that if you
consider a large language model as a book,
full
alignment
is
like rewriting the book,
which requires more
effort and
time
.
But
in LoRa,
you
don't have to completely replace the book
, instead it's
like sticking post-notes on it. This will
provide additional information to those reading the book.
LoRa
fine-
tuning has become
very
popular
because
it is
much
less expensive and time-consuming. A
complete
alignment
can take a long time,
but with LoRa, it
can be completed in a few hours on a regular GPU
. However, since
we
don't change the weights of the base model, you
will mostly use LoRa to tune certain functions
. To look more technically
in-depth
, '
Three Blue One
Brown' has created a wonderful video explaining how the weights of large language
models
work
. At a glance
, you
can think of a large language model as a black box that
predicts what the next word will be based on a given sentence. It is
basically
a
computational
engine that calculates the probability for the next words
. If you look inside a large language
model
,
how it
predicts the next word
,
you
can see that there are billions of parameters, or what we call weights, inside it.
You
can think of each individual parameter as a dial that performs its own calculation. It is the accumulated computational results of these
billions of
parameters that
help predict the next word in advance. For
each
parameter, the
base model
is calculated
as X equals the weight times Y. In
complete
fine-
tuning,
we obtain new weights for each parameter to perform this calculation.
But with LoRA,
we
don't actually change the weights of the underlying model
. Instead
, we try to include some factors that affect the calculation
result
,
but
the weights of the underlying model
are not actually changed
. This is why when
you observe LoRA
, you usually
only have a very small file
.
But it will be used in conjunction with a
basic
model
. In general,
the cost in terms of time, resources, and the amount of training data required is
minimal.
Typically,
you can start with LoRA
fine-
tuning
,
look at the results
, and then
decide whether a complete fine-tuning is needed.
Today, I'm
showing you an example using LoRA,
as
a package called Unsloth is becoming
increasingly
popular
.
In short
, Unsloth
is an
open source
package that
helps you train AI models quickly, cheaply, and easily, even if you don't have a powerful GPU.
With Unsloth, you can fine-tune
the model
twice as
fast, using less than 70% of the memory on a typical GPU.
So,
I'm going to show
you an example of how to turn the training data we created from Midjourney prompts into a model that can help improve user-friendly Midjourney prompts
. This entire
training
process
runs on a free T4 GPU provided by Google Colab.
You
can get results in just 15 to 20 minutes. Okay, let
's get started.
I'm going to do the entire
fine-
tuning
process
in Google Colab,
on the free T4 GPU they provide
. But first
, we need to install the Unsloth
package
. Here is a list of all the models
you
can use for fine-tuning Unsloth
. In
this case,
we select the Llama 3.23 B
model
. There is an option here called
load in 4-bit
. Or in
other places,
you might
find things like 8-bit. They are the
concept of quantization.
Quantization
is
a
technique used to reduce the size of the model and speed up computation by using smaller and less precise numbers representing the parameters of the model.
By default,
each
parameter can be a 32-
bit
floating
point,
meaning its
calculation
will be a number like this, which can
be represented by a 32-bit binary number. 4-
bit and 8-
bit basically means that
we will try to use smaller and less precise numbers to represent each parameter
.
So, it's
not as accurate, but
the amount of computation required for this will be very
minimal
.
So, 4-bit
basically
refers to using a 4-bit integer to represent numbers in binary.
Next we are going to start setting up the LoRA
adapter
.
And there are
a few different
systems in it
. So, R
basically
indicates how many parameters will be affected by LoRA. The
larger the number
, the
more
parameters will
be affected
, but this will
take up more space and resources
. So, generally
you
can start at 16. The
target module is
basically,
if you consider the basic large language model as a robot, it will
already
be trained to walk and run
, but
if you want to teach it to dance,
you need to focus on training only its
leg module
. The entire
block is
exactly the
same.
Each
module here
represents a specific area you want to improve
. But
if you're not sure,
you can
always
start with everything and
reduce the alpha. The
larger this number
, the greater the impact
this behavior, enhanced by LoRA, will have on the
model
.
Often
you have to find
a
balance in this
. If
you set this number
too high
, you may
encounter the problem of overfitting,
meaning the
model
can only perform tasks within the training data set. It ca
n't do anything better than that outside of the training data set.
Likewise, if this
number
is set too low,
there will be no significant behavioral change in the model after a micro-change.
If you're not sure,
you
can always start at 16. These are the main settings required to set up LoRA
fine-
tuning
adapters
.
The next thing we
need to do is
prepare the data
. From the
previous
notebook
, all of our
training
data
looks like a simple prompt and an enhanced prompt pair.
But to
make the model better, we need to convert them to
model-specific
syntax
. So,
for Llama, there is a
very
specific
syntax like this
.
We will have a
user tag, a
message from the user,
and a
system
message
.
Therefore,
to improve the Llama model, we
need to convert the training data to this specific format.
To prepare the data, we are going to use a feature
called Standardized ShareGPT provided by Onslaughts
. This is
a
feature
where we
can keep the training data in a combined format with 'from' and 'value'
, and it
will automatically be converted to the correct format required for different models.
So, in my
particular
case, I'll pull in the
training
data JSON file that we created earlier
, load it, and
convert it to this unified format.
Then, I will
load the SAT template and run the
standardized
ShareGPT
function to get the exact format required for the various models
.
Now let's
see, if
I run the Data
Set dialog
,
it will give me the same format as OpenAI
's fine-
tuning
data set
. But, if
I give it 'text'
,
it will give the specific format required by Llama 3.1
.
That's it,
this is the
basics.
Now that
we have the data
, we
can start fine-tuning.
Before we start fine-tuning, let's
run the default model and
see what kind of results we get.
You
can see that this is the default result,
which isn't that
great
. It only looks like a
detailed paragraph
, but it does
n't include the intricacies of how to write a midjourney prompt. This is
where
we are going to start the fine-
tuning
process
.
For that,
we will use the FF T Trainer package provided by Hugging Face
. They
already have the fine-
tuning
pipeline
ready
.
Then,
we will use Anslat's 'train-on-completion' method to ignore the user's inputs and train only the assistant outputs
. This
will basically remove the inputs from the training data set and
focus only on the output
.
That's it,
this is the
basics.
You can start the training process by pressing this button.
You
can see that this entire training process is completed in just two and a half minutes.
Now, let's test this
.
I'll give the same
prompt and
see what results I get.
You
can see that this is similar to the midjourney prompt you get on the website. If
the result is not correct
, there are
a few things you need to do
. The
simplest
and most
feasible
way, you may
still
need to provide additional training data
. Here, I have provided 1,000
training
examples
, but if your
model is large
,
you should
provide an even larger data set
.
The second
thing is that
you
can also change the model. If
your
task requires a lot of
reasoning
skills
, it may get bogged down no matter
how much data you
provide
.
Instead,
you can try a
larger model
. After fine-tuning a few
times and
getting the result you want, you can
export the model and
use it somewhere
. When exporting the model
,
you can export just the
Lora adapter
, which
will be a very small file
and
will be used in conjunction with the base model
, or
you
can export it as a GGUF file, which is
a
special
file containing both the base model and the adapter,
which you
can run immediately. You
can also upload it using the API key you received from Hugging Face.
Also,
you
can get an access token from the Hugging Face Access Token site.
After that, you need to
enter your username here and define a
repo
.
Once done,
you will see that a new one has been created with the adapter file.
Next time, if
you
want to use this, you
can use this code to load the model you uploaded to Hugging Face
. However,
you
can also export the GGUF file, which can be
used directly in Llama CPP or Ollama platforms
. So,
this is how to fine-tune large language models using Unsloth. If
you want to learn more about the topic of fine-
tuning
, you can
join the AI ​​Builder Club I'm creating, where
I
collaborate with industry fine-tuning experts
to teach in-depth topics like how to take and use a fine-tuning model, how to use platforms like Together AI, and how to evaluate a fine-tuning pipeline
. I will share
interesting
learnings
and
practical
projects to learn more about building AI products
.
Importantly,
we have a team of top AI creators who have already experienced the problems you face today
. So,
you can come here and
ask any question you need.
I and other
community
members will be
available to answer your questions
.
So, this is
today's video.
If this video was helpful,
please
like and
subscribe.
See you in the next video.
