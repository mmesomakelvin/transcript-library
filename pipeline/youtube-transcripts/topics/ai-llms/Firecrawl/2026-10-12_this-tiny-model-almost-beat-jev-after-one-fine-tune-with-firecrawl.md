---
video_id: "SHoFr4D9cjM"
title: "This Tiny Model Almost Beat Jev After One Fine-Tune (with Firecrawl)"
channel: "Firecrawl"
topic: "ai-llms"
published_date: "2026-10-12"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=SHoFr4D9cjM"
duration: 476
word_count: 1448
---
If you spend any amount of time on tech
Twitter, you'll notice Jev has taken the
world by storm to the point that there
are copycats from Cloudflare,
Perplexity, and even OpenAI has recently
released its decision API. But all of
these models, including Jev, have a big
problem. They're too big to run on a
laptop and so live in the cloud, meaning
every decision has to go across the wire
before the model gives you a response,
meaning there's always some latency.
This is where layer or liar comes in.
It's an open-source decision model that
was worked on a year before Jeff,
meaning you can run it locally and
there's almost no latency, but it's not
as clever as Jeff. So, let's change this
by training layer on data from firecrawl
to see if we can make a fast and clever
model. But before we start, here's a
quick recap on Jeff, a system one model
from Typesafe designed to make very fast
decisions, not to write text. So you
give it some data and a question with
fixed answers and it responds with a
confidence number for each of those
answers really fast. Roughly 70 to 500
milliseconds end to end. Leia does the
same thing but it's open source and its
creator spoke about decision models a
whole year before Jev. Although no one
really listened until Jev came out and
then it got more popular. It even uses
the same API as Jev. The code written
for Jev can also work in layer, but it
only has 421
million parameters. And even though type
safe haven't got public numbers on Jev,
the best open-source version of it is 27
billion parameters, which may explain
why Leia isn't as clever. However, all
of Leia's 421 billion parameters can be
trained on specific data to make it in
some cases even more clever than Jeff.
And because layer doesn't take up too
much space nor require a lot of memory
to run, you don't need a whole data
center with Nvidia graphics cards to
train it. You could just use one of
these. But then that brings the problem
of where to find the data to train it
on. And luckily, Firecrol has over 113
million data sources from many different
categories that can be used to train any
model, including layer. So I'm going to
use some of that data to fine-tune layer
for one job. If I give the model a
coding query with a bunch of results,
which result will most likely answer
that question? Let's see how Leia
currently performs on that test. So for
this query about an MPM dependency tree
and for this search result that's
supplied, Jev got the answer correct and
Leia didn't. And for this query on Bash,
Jev again got the answer correct. In
fact, I've run this with 600 search
results with Claude doing the labeling.
And compared to Claude's answers, Jev
got them 74% right. Leia got them 44%
right. And this is the search rank from
Firecrol's developer index. So let's see
if we can improve layer for this
specific scenario using four different
steps. The first step is to get the
training data. And for that I'm using
firecrawl Alexandria which you can
install using the official chatgpt or
claude plugins, the MCP or CLI which is
what I'm using, the API or language
specific SDKs. So I got called to come
up with 298 different developer queries.
Then I got 10 search results from
firecru for each query resulting in
2,980
search results. A small amount for
training but this should be enough. The
next step is to get answers for the
model to use for training. And for that
I used opus 55 to grade every result. So
for every one of the 2,980
results opus gave them a relevant score.
So either 0 1 or two if it contains a
fix and a reason. The whole process took
about 16 minutes. And here is how it
labeled all the search queries. But I
held back 600 of these search results so
Leia never sees them which I'll explain
why later. But it ended up training on
search results. This is called
distillation. The big model teaches once
and the tiny model does the job forever.
The next and longest step was finetuning
on my Mac. So layer has fine-tuning
built in. You give it an example file
which is usually a CSV or JSON L and it
does the rest. So trains and calibrates
the confidence scores and saves the
finished model. And this was a super
resource inensive moment for my M5
MacBook Pro. The training process took
around 98 minutes and at its peak used
21 GB of memory. My Mac's GPU ran flat
out the whole time and it sounded like
it was about to take off. Also, if
you're planning to fine-tune with a
laptop, I recommend having it plugged in
the whole time since it uses up a lot of
power. And the reason this process is so
resource inensive is that training
involves a lot of steps. Leia went
through each one of the 2,380
search results twice for each question.
So, that's 4,760
in total, but 400 were set aside and
used for temperature calibration, which
again I'll explain later. But that means
4,360
search results we used. And it goes
through each one of these questions,
guesses the answer, and adjusts its 421
million parameters based on how far off
it was. It goes through 64 search
results at a time, so not one by one.
And this is why a GPU was used so it
could do all these results in parallel.
A full read of the 4360
search results took about 24 minutes.
And this was called one epoch. It did
four epochs in total. And after each
run, it ran through the 600 search
results I saved earlier and used these
as a test to see how much the model had
improved. It did the most amount of
improving after the first epoch, and the
other ones only improved it slightly.
Now, for the 400 search results I put
aside earlier, these were used after the
last epoch to calibrate the temperature.
What's the temperature? Well, this is
the model's confidence score. So,
imagine if the model went through a
bunch of queries and scored them 90%,
but it was right 75% of the time. This
means that it's an overconfident model
and may have to dial its temperature
down so that its results are more in
line with what's correct. That was a lot
to go through, but after all of that, we
have a fine-tuned model that we can
test, which brings us to the last step,
testing the model. So for our previous
npm peer dependency question, our
fine-tuned model now has that answer
correct. It has a lower confidence score
than Jev, but it did it in a fraction of
the time. For the bash query, the
fine-tuned model also got it correct.
And for this new query about Python
multipprocessing, Jev actually got this
question wrong, and the fine-tuned model
got it correct with a higher confidence
score and the fastest time of the three.
In fact, for this big test we ran
earlier, after fine-tuning our model, we
can see how much the relevant accuracy
improved, how much better it is than the
stock layer, and how much faster it is
than Jev. This is one of the craziest
experiments I've ever had to run, and I
can't believe it actually worked. We
massively improved the stock layer model
for our specific use case, but overall,
Jev is a better model because it has
more general knowledge. And even putting
our new fine-tuned layer head-to-head
with Jev, it still came out on top. But
that doesn't mean this was a waste of
time. I'm pretty sure if we supplied
some more search results and ran some
more epochs, we could have got that
number incrementally higher.
Nevertheless, if you need a small,
private, fast decision model for any
reason, like for filtering job listings,
finding research papers, or sorting
through product reviews, then
fine-tuning layer on data from Firecrawl
Alexandria is a great option.
