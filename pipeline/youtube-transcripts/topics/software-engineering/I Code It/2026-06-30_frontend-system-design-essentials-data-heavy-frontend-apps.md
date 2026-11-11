---
video_id: "nw-7ry_hhio"
title: "Frontend System Design Essentials: Data-Heavy Frontend Apps"
channel: "I Code It"
topic: "software-engineering"
published_date: "2026-06-30"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=nw-7ry_hhio"
duration: 984
word_count: 2681
---
Have you ever
worked on a
frontend feature where
the data is already loaded,
but the UI
still
seems extremely
slow? Maybe
it's a large tabular
component, an
analytical dashboard,
or a map with multiple
markers.
The user enters
a query in the search field,
changes the future, or
selects a time
range. The API request does not
occur, but
the page still
freezes for a moment.
Input seems
delayed, the spinner
has stopped spinning,
and the app seems
heavier than it should be. This is a
common problem in
front-end applications with
large amounts of
data. Sometimes recording does not
happen over
the network. This is work
we do in
the browser after
the data has already arrived.
In this video, I
will use a
small
log analyzer as a
demonstration. It
loads 50,000
log lines into the
browser. Then
let's perform
search filtering aggregation, build a
timeline, and
fully port the
result to the
frontend. First we'll
do the analysis in the
main thread, and
you'll see the
UI phrases, and, uh, we
can't do
any interaction.
We will then move
the same work to a web
worker so that the
user interface can
remain
responsive while
the computation
is performed in the
background.
The key idea is simple.
Even though
we have techniques like
caching,
paging,
code separation, and
virtualization to
make our
application faster, the
user interface
can still hang if
resource-intensive
calculations
are performed on the
main thread. And this is where
web
workers come in handy. Generally
speaking, we want the
frontend to be lightweight.
The frontend should
focus on
rendering,
using
interactions, and
coordinating data.
Heavy calculations and
expensive data processing are
often better
handled by
server-side services.
This is still a good
default setting
, but in
some cases it makes
sense to keep
the work in the frontend.
For example, if the data is
already loaded and
the user wants
to explore it
locally, sending a
new request to the
server for every
small interaction
may be unnecessary.
Log Analyzer
is a good example.
The user may
want to filter
by keyword,
time range,
log level,
service name, and
error messages. If all
the logs are already in
the browser, local
analysis may
seem very
fast. But now
we have another problem.
JavaScript in the browser
typically runs on the
main thread, and
the main thread is also
responsible for
event handlers for
rendering
user input,
animation frames, and
page updates.
So, when we
run a long
synchronized
task on the main
thread, everything else has to
wait. This is why the
UI
freezes
in our
log analyzer. Every time a
user
changes the
search keyword or
time range, we need to
scan 50,000
logs. So even though
the table only shows
50 rows, that's not where the
real cost is, the
expensive part
happens before
we even
render anything. We
still need to
scan four
datasets that are
about 10 megabytes in size
,
apply functions,
calculate summaries,
and prepare the data
for the chart. The solution
is to
move the heavy
lifting into a separate
thread. This is what
web workers give us.
Instead of
running log analysis
directly on the
main thread, we
send a
message to the worker
. The worker receives
the request, performs the analysis,
and sends the result
back. Then the
main thread
only needs to
update the
user interface. So,
the scheme looks
something like this.
The user enters a
keyword to
bring up the
query object. The main
thread sends a request to
the worker. The worker
performs
resource-intensive
analysis, and after
some time, when
the worker completes
the calculations, it
sends the results
back. React then
displays the summary
chart and table.
The important thing is that while
the worker is performing
expensive work, the
main thread
remains free.
It can
continue to
respond to
user input
. It can
continue
to run the animation.
It can
continue
to update the
user interface. This does not
mean that
calculations are getting
faster. In our
demo, analysis
can take anywhere from 400 to
1500 milliseconds in both
modes, but the
user
experience is very
different. In
our main
thread, the program
hangs during
this time. In
worker mode, the job still
takes the same amount of time,
but the user interface
remains
responsive. Before
we get to
the demo,
let's
take a quick look at the basic API
. In our main
thread, we create a
worker like
this. Um, basically
using the
worker API, passing in a
worker file, uh,
basically it's a JavaScript file
that defines how the
worker works, and
then in the main
thread we send
data to the worker using a
post message. Uh,
you can define a
certain type of
message and, uh,
with a
payload. This is
actually a
customized JSON
object that you can
pass to the worker, and
then we
listen for
the result; we can
use
the worker's own message, and the worker
can send data
back to the main
thread. Inside
the worker file, we
listen for
messages from the
main thread. Uh,
we use
self-on messages where
we can get data.
Uh, if it's a certain
type of message
that we're interested in, we
can perform
a calculation, and then, uh
, after, you know, a
time-consuming
calculation, we can
send the result
back to the main
thread. So, the basic
idea is very simple. The
main thread
sends
the message. A
worker performs a
certain job.
The worker sends
the message back.
Note that
the worker
does not directly update the DOM. It does not
run
React components. It is best
used for
pure computing. You
give input, and
it gives you the
result. This makes
it useful for
things like
large
file transfers, local
search, aggregation,
image processing,
and more. Now let's
look at our
actual
demonstration. Here
we have a small
log analyzer.
It looks like a
simplified
Splunk dashboard.
The server sends 50,000
log entries to
the browser when
the application is launched.
If we check
the console or refresh
the page, we'll see
that we have this
log request, which is
about 10
megabytes in size. And after that,
everything
happened on the
frontend. Of course,
you can change the
time range or
log levels here.
Or, you know, type in a
keyword to
search for, and we can
look up
relevant journals in a
table at the bottom of the
page. You can
see it here and
go to the next
page. The important thing is
that the server does not perform
the analysis. The server
only provides us with the row data
at the beginning. All
research logic
for each query is
client-side.
The frontend scans
the logs, filters them,
aggregates them, builds the timeline
below, and then
returns the first 50
rows from the dataset
. So, when the main
thread is working, the FPS should
stay close
to 50 hertz, which
is essentially my
monitoring frequency. If you
run this on your
local network, you'll
probably get 60
FPS. If you
use a different
monitor when the
main thread
is blocked,
the average FPS drops and
the minimum FPS can,
ahem, drop even more.
We can do a
short demonstration
here. So you see
that currently the
minimum FPS
is 48 49. It
varies, and
the average is–um, 50.
We are currently running in the
main stream.
All analysis
will occur in the
main thread.
Let's review
all the levels of logs. And
when we look to,
you know, apply
the discount, you can
see that the
minimum and
average IPS drop.
When I type
apply discount, and
also if we have
any random
rows or the
time range changes, that
will change as well.
The calculation, hmm,
happens in the
main thread,
which is blocked, and
if I go to the
arrow or the
warning, you
can see that the FPS
changes as well.
The discount, ahem, drops
to exactly three. This
keyword is
part of the
simulated
incident in the
dataset. So, essentially,
where the payment
service has a repeated
price calculation error. So, our
application
uses
jump elimination.
So it doesn't run
an analysis every time you
press a key.
It waits about 300
milliseconds
after I stop
typing. That's good.
But after the
de-jump delay,
the analysis
is still performed in the
main thread. And
now you can
see the problem. FPS
drops a lot. The
user interface is
inconsistently responsive until
the analysis is
complete. The
last launch
takes about 400
milliseconds, and this is the
key point.
Eliminating jumps
helped us
avoid
running
the analysis too often, but it does not
make the analysis
non-blocking.
Once work
starts on the
main thread, the
user interface is still
blocked. Now
let's switch to
web worker mode.
I have a
switch here. You can
click on it
to switch to
web worker mode.
And now we can
do the same thing,
for example,
apply a discount. And
then you can see
that when it looks for FPS
here, the minimum and
average don't change at all
. And let's
try another
query. You can
see that when I
type and stop
typing for 300
milliseconds, it
starts performing the
analysis. But this
happens in the
background in a web
worker. So it doesn't
block the main
thread. When we
switch to
worker mode, it receives
logs and stores
them in its own memory.
This is an important
design choice. We don't want to
send all 50,000
logs to the worker
every time
the user changes
the filter. We send the
magazine once.
Then for each
request we
only send the request object.
So we have
exactly the same
data set,
using the
same keyword and
the same
analysis logic. As you can see,
the work didn't
magically make the analysis
faster. The job
still takes as long as it
should
, but the UI
doesn't
hang because the
main thread is
free to
render or
respond to
any other
user interactions. So,
that's the main
comparison. In
main thread mode,
the browser is busy
executing our
JavaScript through
UI phrases. In
worker mode, the browser can
maintain a
responsive
user interface while
the worker performs
resource-intensive
calculations in the
background.
Now let's take a quick
look at how the
code is structured. The
main
analysis log is located
in a shared function
called
analysis log. Both the main
thread and the worker thread
use the same
function.
So, she
will do all the
hard work. It
will perform all
the calculations. It
performs search,
aggregation, and
pagination. So we
put the calculations
in a shared function because we
don't want two
versions of the
same logic in the
main
thread model. We call
the function
directly
inside this
hook. We
will use
effect and check if
we are using
worker mode. If
it's a worker, we simply
ignore the pass.
Otherwise, it is the
main stream. We
will call this run main thread
um demo analysis
directly. And in
worker mode, we
send a request to the
worker. So here we
will check if it is
a worker, if we
are using it
in worker mode, we will
use this
hook. So, essentially, we'll
create a worker
using this
worker.ts analysis. We'll
get to that in a
minute. And then we
will register a
handler that
listens for changes
from the worker. If it
is received or
gets a result, we
will use
the result and you will be
back to
updating the main
thread. If we
move on to
employee analytics, this is the
employee code.
Inside
the worker itself, we
will listen for
changes from the main
thread. If the event is
ingest, we will do something like
copy the
data to the local
disk. And if the event is
a request, we
will simply run a
demo
analysis of the employee;
essentially, we'll run a
demo
analysis, which is the same
function we just
saw. And, once
the calculation is
complete, we simply
get the data,
prepare a JSON object,
and send it
back to the main
thread. So, good
worker design
is not just about
moving
code into the worker. We
also need to
think about the
data flow. If possible,
send a large
amount of input
once, then
send small
request messages
and return only
what the UI needs
. It is worth
mentioning one more
detail, since
the communication between
employees is
asynchronous.
The result may
come back in the wrong
order. For example,
a user can
change a
keyword and then quickly
change the time
range. The old
request may
complete after the
new request. If
we blindly
update the
UI
with every
uh result, the old
result may
override the
newer one. It's almost like a
risky uh condition in a
network query.
To prevent this,
each request has a
request ID
. When the worker
sends the result
back, we compare the
result's request ID with the
last
request ID. If it is not the
last result,
we simply ignore
it. This is a small
detail, but it is very
important to notice it
and try to
apply it in
your
um worker script to
fix this.
Once we move
the work off the main
thread, we no longer
just call a
function and immediately
get the result.
Now we have a
small
message-based system.
Therefore, we need to
think about
lifecycle error handling
and the cost of
date transmission. This is
a compromise. Rober
improves
responsiveness, but also
adds some
architecture. So when
should we
use a web
worker? I wouldn't
use a
worker for every
piece of UI logic
.
In fact, as
mentioned earlier,
most of the UI logic
should
remain simple
and lightweight. I would
suggest starting
by understanding the bottleneck.
If the bottleneck
is the network,
try improving
data sampling,
for example, using
lazy
loading code splitting, etc.
If rendering is the bottleneck
,
consider
using
pages or
virtualization. If
the bot uses
repetitive
calculations,
consider
memorizing them and
using the
Badger data structure.
But if the bot
is using a lot of
CPU, i.e.
JavaScript is blocking the
main thread, then a
web worker is a very
useful
tool to
consider. In CPU-intensive front-end
applications
, the bot
is not always the server
part. Sometimes the data is
already loaded, but
the browser still has
a lot of work to do
before displaying
the results. This is what
web workers are used for
. They
allow us to
move
CPU-intensive work to a
separate thread so that the
main thread can
focus on
rendering and
user interaction. A web
worker does not necessarily
speed up work.
It makes the
user interface more
responsive while the work
is done in the
background. And
for many
data-intensive front-end applications, this is exactly what
we need. If you're
preparing for
front-end development interviews or
trying to grow
from a mid-level
to a senior front-end
engineer, this is the
trade-off you
want to
make clear. I know not
only web workers,
but also the bottleneck.
This is why
repeal is
not enough. That's why the
main thread
is blocked. And this is what
should be transferred to the
worker. And here are
the compromises. And this is
also the type of
thinking I
cover in my
book and course on the
basics of
front-end system design. The goal is to
help you move
beyond building
individual
React components and start thinking
more like a senior
front-end engineer
who designs
realistic and
usable front-end
systems with a lot of
data. If
this seems useful,
check out
the link in the description. And that's all I have
for
today. Thanks for
watching, and
see you
next time.
