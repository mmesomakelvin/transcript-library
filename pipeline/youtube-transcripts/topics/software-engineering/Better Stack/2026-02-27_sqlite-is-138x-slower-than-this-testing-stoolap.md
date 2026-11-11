---
video_id: "t6fbNGC_48c"
title: "SQLite is 138x Slower Than This?! (Testing Stoolap)"
channel: "Better Stack"
topic: "software-engineering"
published_date: "2026-02-27"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=t6fbNGC_48c"
duration: 453
word_count: 1338
---
When you're spinning up a new project,
and you need a database, what's the
first option that comes to mind? SQLite?
It's probably SQLite, right? I mean,
it's great, and it's reliable. It has
zero config. It's an industry standard.
But, as our local data gets heavier, and
our queries get more complex, we're
starting to hit that ceiling of what a
single-threaded file locking engine can
do. But, now there's a new player in
town that's trying to solve these
issues. It's called Stu l ap, and it's a
database engine written entirely in
Rust, and it just released a native
Node.js driver that is, quite frankly,
showing some really strong performance.
The database is 138
times faster than SQLite. So, in this
video, we're going to take a look under
the hood of Stu l ap, see how it works,
and run a live benchmarking test to see
if it's really as powerful as it claims
to be. It's going to be a lot of fun, so
let's dive into it.
So, what exactly is Stu l ap? Well, at
its core, Stu l ap is an embedded OLAP,
or online analytical processing
database. Now, if you're used to
standard databases like SQLite or
Postgres, those are typically OLTP,
or online transaction processing
databases, which are, as the name
suggests, optimized for transactions.
But, Stu l ap is different. It's
designed for analytical workloads, and
it's built from the ground up in Rust,
focusing on high-speed data processing.
Think of it as having the portability of
a SQLite file, but with the raw
analytical power of something like a
DuckDB or BigQuery. But, the coolest
thing is that you can now use it with
Node.js, thanks to its native Node
driver. Now, when I say it's a native
driver, I'm not talking about some
standard wrapper. Usually, when a
database is written in a different
language like Rust or C++, your Node.js
app has to talk to it over a bridge.
Often, that means converting your data
into JSON or some other format, sending
it over a local network socket, and then
converting it back on the other side.
That is called serialization overhead,
and it's a massive performance killer.
But, Steel App Node does things
differently. It uses Napi RS, which is a
framework that allows the Rust engine to
be compiled into a native binary that
loads directly into your Node.js
process. So, there's no bridge and no
translator in between. When you send a
query, Node.js and Rust are essentially
sharing the same memory space. And,
there are three big reasons why Steel
App is blazingly fast. First, it's using
MVCC or multi-version concurrency
control. Unlike SQLite, where a single
writer can lock the entire database,
Steel App allows multiple readers and
writers to work at the same time.
Secondly, it uses parallel execution.
Steel App uses a scheduler called Rayon.
And, with Rayon, when you run a massive
query, instead of sitting on one CPU
core, it breaks that query apart and
utilizes every core your machine has.
And, thirdly, it uses a cost-based
optimizer. So, it doesn't just execute
your SQL blindly, it actually analyzes
your data, estimates the cost of
different paths, and picks the fastest
way to get to your results. So, that's
what supposedly makes Steel App a much
faster option than SQLite. But, let's
test it out to see if that's actually
true. For this test, we'll be using a
simple Node.js project, and we will
install both Steel App and SQLite as
dependencies. So, one of the biggest
wins where Steel App really shines is
using count distinct. So, I'm really
curious to know if that really is the
case. So, I set up this simple script
where we spin up an in-memory version of
each database and create a simple sales
table. We then populate this table with
10,000 rows of random sales data, where
each row represents a sale from a user
whose ID can vary from 0 to 1,000 and
which has one of the specific
categories. We will then batch insert
the data in both databases and then run
the benchmark where we select a distinct
count of sales made by a specific user
on a specific category and calculate the
performance of each database. Now, I do
have to note that it is a bit
frustrating that as of now the package
install does not work. If we run the
benchmark test now, we see that it's
complaining about a missing native
binding. So, the project's author
clearly forgot to add the binaries or
link the correct ones to the package.
So, what I had to do is build it from
the source. So, I cloned the repo, ran
the build inside of it, and then hop
back to my benchmark project and linked
my source directory as the dependency.
This is a bit frustrating at the moment,
so I hope the authors of the project
will fix this in the future. But
nonetheless, after doing so, we're now
finally able to run the benchmark. So,
let's do that now. As you can see, the
count distinct operation is indeed a lot
faster on Stuw App, although not as much
as advertised. It's only four times
faster. So, what if we add another zero
to the number of data we want to
populate and then run the test again
with 1 million rows. So, let's try that
now. So, even for a million rows, Stuw
App is only six times faster, not 138
times. But nevertheless, it's still a
great result. So, that's the count
distinct test. I decided to do another
benchmark test to test how the distinct
plus order by operation. And in this
second test, I did a setup where we
ingest some random logs with different
IP addresses and status codes and then
try to find distinct logs by IP address
and status code pair and then order them
by IP ascending and status code
descending. And as you can see, once we
run this test, Steel Lap still performs
better than SQLite, but not by 14 times,
just one to 1.5 times faster. So, the
measurements listed here are a bit
inflated in my opinion, but
nevertheless, Steel Lap is indeed faster
than SQLite as we just saw in the tests.
To be fair, the author also mentions
areas where SQLite still performed
better than Steel Lap, and these are
mostly situations where you perform
single row operations. So, Steel Lap is
great for analytical and complex
queries. So, is Steel Lap the SQLite
killer? Well, honestly, no. They're
built for totally different things.
SQLite is still your reliable daily
driver for transactions, but Steel Lap
might be your high-performance race car
for data analysis. But, the fact that we
now have a pure Rust analytical engine
that we can now drop into a Node.js
project with Napi-RS is pretty great.
The project owners just got to make sure
they patch their current NPM package, so
we don't have to build it from source.
So, there you have it, folks. That is
Steel Lap in a nutshell. But, what do
you think about it? Is the performance
boost worth switching to Steel Lap, or
are you sticking with the reliability of
SQLite? Let us know in the comments down
below. And folks, if you found this
video useful, please let me know by
smashing that like button underneath the
video, and also don't forget to
subscribe to our channel. This has been
Andrus from Better Stack, and I will see
you in the next videos.
&gt;&gt; [music]
[music]
