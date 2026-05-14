---
video_id: "Jjz4YxtlwHQ"
title: "How I Use Claude Code For B2B Outreach (35% Reply Rate)"
channel: "Oleg Melnikov"
topic: "ai-llms"
published_date: "2026-04-02"
ingested_date: "2026-05-14"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=Jjz4YxtlwHQ"
duration: 710
word_count: 2310
---
Hey guys, in this video I'll show you
how to use Cloud Code to do high
quality, hyper-personalized,
value-driven cold outreach on LinkedIn.
So, I'll explain to you on example what
it will look like. So, here's Bob. He's
my ICP and I'm selling marketing
services to B2B business owners. I'm
helping them grow on LinkedIn so they
can get more leads. So, I wanted to
reach out to Bob and [music] the first
thing I want to do, I want to provide
value. I don't want to be sending just
text saying, "Hey Bob, do you want me to
help you?" No. This is BS, it's not
actually working. So, here's the message
that I sent. Here's the text and then
I'm sending the value. I'm basically
saying, "Your LinkedIn profile packaging
is not good enough. You can be
converting better and here is an
improved packaging for you. Take it for
free." [music] So, this thing, look at
it. Professional banner, professional
picture, professional text and it is all
generated using Cloud. I was not
actually [music] doing anything to get
it, but for Bob, probably it looked like
it was actually made by a human or we
spent a lot of attention to it, right?
Because it looks so professional. And of
course he says, "Sure, sounds good.
Thanks and here's my email, send it
over." So, I successfully started a
conversation with Bob by leveraging
Cloud for hyper-personalization.
And I'll teach you how to do it. So,
this video will have three parts. First
of all, I'll show you how to find leads.
Then I'll show you how to score them
because we want to be focusing our
attention only on the best of the best.
Here's how it looks like. This is my
platform that I built using Cloud Code
and I'll show you how you can do the
same. And these are all the leads that I
got. So, I'm opening this lead and we're
scoring them based on multiple factors.
Company size, LinkedIn presence because
this is important for me. Location and
buying power, etc., etc. So, you will be
able to score a lead based on any
factors that you want. You will be
analyzing their posts, their
description, all the stuff that is
presented on their LinkedIn. I'll show
you how to scrape it. It is very easy
even if you're non-technical. And
finally, after we score them, I'll show
you how to prepare cold outreach
messages with free value just as I
showed you. And in my case, they're
getting 35% response rate which is quite
high. So, let's dive in. So, let's start
with how to find leads. I'm using Sales
Navigator for that. Here I just have a
convenient way to search for leads. I'll
just select the location, select the
titles that I'm looking for, select any
sort of other filters that I want and
then on the right side, I will get a lot
of results. And then I will start
reaching out to them. So, I'll save them
to this list and I will start sending
connections without any messages first
because first we want to be connected
with them and there is a research that
has proven that sending a connection
request without any message has higher
conversion rate if you compare to
sending a a message because it looks
like more salesy, something like that.
So, that's why I'm sending the
connections first and I'm using Cloud
Code work for that. So, I have this
Cloud application on my desktop. I will
simply
ask it to go through the lead list, send
connections because it's a manual work.
I don't want to be using any third-party
automations for that, but also doing it
just by hands is too laborious, right?
So, after we have the connections, then
the next step is to actually understand
to whom we want to be reaching out to.
For that reason, here in Sales
Navigator, you can select only people
who are already connected to you. You
will just find here connections of
or here connection. You can can select
third-degree connection. That means that
we are already friends with these
people. And this list I want to extract,
download from Sales Navigator and then
process it using Cloud Code so we can
score the leads and generate something
for that. Here's how to do it. I was
thinking about the right approach for a
long time and I figured it out. Here's
how it works. Open this search. Now you
have those people searched on the right
side. Then you will just go here and on
the left you will copy this query and
then you will go to the service called
Apify. apify.com. By the way, all the
instructions will be down below so
you'll be able to open it and follow
step by step, but now I'm just showing
you the general process. This is the
platform that helps you scrape any sort
of data and it also helps you scrape the
LinkedIn Sales Navigator data. So,
here's the specific scraper. I already
used it. It is working quite well. So,
when you open it
and here there is an input. Basically,
you need to provide a URL of the Sales
Navigator to this thing and it will give
you all the results that are related to
this search. You will also need to
provide your LinkedIn cookies because it
needs to understand what is happening
inside your Sales Navigator because in
our case we're connecting we're
searching our own connections. So, this
is important. From here, once we run
this query and once again, the
instruction will be down below how to
use it. I can actually show you. Let's
press try for free. We'll go to the
console
and here, once it is loaded, here you
just paste your search URL and then here
you are just pasting your cookies. It's
also very easy to provide. Here's the
instruction. You press here, it asks you
to download a specific Chrome extension
to extract your cookies. You put it here
and then you just press execute it and
then you will get all the results. Here
are my runs that I was executing. As you
can see, I scraped 600 my own
connections. I was scraping only those
guys who are founders, CEOs, business
owners, etc., etc. So, I got the whole
list right here in the outputs. It was a
valuable as a CSV table and basically I
just downloaded it and put it inside my
Cloud Code project so now we can process
it further down the line. So, here's my
Cloud Code project. It is initialized in
some way, you don't need to care about
it. I will show you the instructions
down below how you can set up your
project, but basically I just created a
project and pasted the whole list of
these LinkedIn connections. So, here's
the whole list of these connections with
all the columns like descriptions,
LinkedIn URLs, everything like that. As
you can see, there is so many different
fields and sources of data that we can
use to actually score our leads. On this
stage, we already have our lead list and
now we're moving to the second part
which is scoring, right? So, I will just
ask Cloud to analyze the whole list and
according to my own metrics, score the
leads and create an HTML page where I
can easily access them. So, here is the
result that I got for myself, this admin
page and here is the whole list. I can
search through them, I can filter them.
So, we have the final score from 1 to
10, how qualified is the lead. So, as
you can see here in this column, we have
it. We can select only ideal fit and it
will show us only people whose score is
at least eight. And here are all the
leads to whom I am already connected to
and I can check them out. And obviously,
it took some iteration to make the score
actually reflect how relevant and how
valuable is the lead to me, but after I
nailed it, then I asked Cloud to, "Hey,
go ahead, score every single lead that
we have inside." And by the way, you
might be asking, "How Cloud will be able
to understand what is the score?" We are
connecting it to the Apify API. Another
one, another actor which is specifically
for LinkedIn profiles. LinkedIn profile,
let's search for that. One of these
scrapers, I will also show it in the
description in the instructions below,
which exact one. Basically, by
connecting this specific scraper to
Cloud Code, we're allowing it to scrape
any information about the person. So,
their company, their about section,
their work experience, their current
status, anything that might be important
for you to score the lead. So, Cloud
will be triggering Apify, getting all
information, scoring them and showing
you all this info in a beautiful way. I
think that I was doing something very
similar to what Clay does, but here I
have all the flexibility. I don't need
to know how to work with Clay, I don't
need to spend my money on it. I can just
do everything here internally inside
Cloud Code which I really love because
I'm a technical person. But even if you
are non-technical, you just speak via
text and that's it. And also
qualification is important because so
many leads are getting disqualified. So,
I can just show it to you. In this case,
we don't have too much, but let's remove
the score. Bam! We have 143 out of 600
right here disqualified because either
they are from non-paying countries or
there are some other things that are
actually preventing us to reaching out
to those people and we're not spending
our attention thinking about those guys,
right? This is important because we're
doing high quality, hyper-personalized,
value-driven cold outreach. It's not
100% automated, it's 95% automated. So,
we still have some manual touch. For
that reason, we want to be spending our
attention on the leads who will never
ever convert. So, now once we understood
how to score them, we're moving to the
third part which is preparing cold
outreach messages with free value for
those people. So, I'm basically, once
again, going to Cloud Code and
explaining that. In my case, we want to
be preparing nice packaging for them,
nice LinkedIn packaging. So, I'm
explaining how nice packaging looks like
and for that reason, in my case, I
personally found great examples. For for
instance, this guy,
let's say Adrian.
Or I can actually you can look at my own
profile. It is actually well packaged.
The banner is clearly communicating how
I'm helping to my ICP build a personal
brand and get inbound leads in just 1
hour per week. It is well designed, it
has nice visual hierarchy, it has social
proof. Here is my client, here is my
YouTube stats and by the way, I already
have 15,000 because of Cloud Code
content
&gt;&gt; [music]
&gt;&gt; not 14,000. So, we're growing. And we
have professional profile picture and
have good headline. So, I'm just
providing multiple examples of good
packaging. And I'm asking, "Transcribe
those messages. Understand Sorry,
transcribe those images like a banner or
profile picture. Understand what makes
this packaging great?" And then, based
on that,
use this to generate new packaging for
people who to whom we want to reach out
to, right? And basically, I'm using here
two APIs. One is 80fy to once again
scrape the data about the leads. And
second is Kai AI to be able to generate
images. So, here it is.
This is the API which is connecting you
both to Nana Banana Pro and any other AI
image generation models. And with that,
we're able to generate this profile
banner and improved profile picture. Let
me show you a bit more examples on how
it looks like. Here's the original
profile of the person, right? It's not
good. It's not yet optimized. But then,
here I will show you the improved
version of the same profile. Here it is.
So, we generated a beautiful banner that
is clearly communicating what this guy,
Aaron, is doing. So, as you can see, all
these new banners and profile pictures,
they're shown here also inside this HTML
dashboard that I built using CloudCode,
which is super convenient. And then,
we're just sending all this information
to LinkedIn, where we are doing cold
outreach. Hopefully, it provides you a
clear idea on how you can do
hyper-personalized cold outreach with
high conversion. Specifically, if you're
selling high ticket, if you're selling
B2B, this is really useful. So, check
out the instruction down below. You can
set it up in less than 10 minutes, even
if you're non-technical. And also, if
you're interested, here's another video
on how to use CloudCode to automate any
sort of marketing tasks from ads
creation to content creation to cold
outreach in some other different
manners.
So, check it out.
