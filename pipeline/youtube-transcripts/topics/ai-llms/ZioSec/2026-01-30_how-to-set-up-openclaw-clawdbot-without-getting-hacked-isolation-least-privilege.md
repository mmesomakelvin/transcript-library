---
video_id: "fooZAZsBmpg"
title: "How to Set Up OpenClaw (Clawdbot) Without Getting Hacked: Isolation + Least Privilege + Firewall"
channel: "ZioSec"
topic: "ai-llms"
published_date: "2026-01-30"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=fooZAZsBmpg"
duration: 395
word_count: 816
---
Today is a truly
exciting day. We are
hiring
our first AI
employee. His
name is Jerry. It
lives on this brand
new Mac Mini and
is powered by Open Claw,
formerly known as
Cloudbot. So, we will
go through a full
adaptation process from a
security perspective. And those
of you who
have set up
corporate accounts
for other
employees
will find it very
similar. I really
wanted to take the time to
talk about this
today because there's a
list of all the
critical issues with Open
Claw or Cloudbot floating around the internet. These include
SSS spoofing attacks,
open
control gateways,
Telegram whitelisting and blacklisting vulnerabilities,
browser hijacking,
password manager data extraction,
Slack token theft,
uninsulated root access
,
prompt injections, and malicious
extensions—all of which, when
combined, can
turn an
incredibly powerful
assistant into something
you'll regret from the
start. So,
let's begin. I also want to
make a reservation
. This is not a comprehensive
guide to
safe
installation. This is
still very new stuff.
Today we are on
the cutting edge, and especially
with the advent of new
extensions and features,
you need to be
careful and
understand how it
fits into your
overall
security strategy. So be
careful, but it's a
great way to
start if you want
to experiment.
Okay, let's dive in.
Unpacking the Mac mini.
Who doesn't love
discovering new
equipment? I'd be
lying if I said
it wasn't a big
motivation because we get to
play around with the
new Mac mini. So, here's
what
the setup will look like. The Mac mini
will be the server, and
Jerry will be
installed in a
virtual machine
on that server. This is the
first principle:
virtual
machine isolation. If something
goes wrong, Jerry
will remain within the
virtual machine and will
not have access to the
server kernel. The
second principle is
network segmentation. We will install a
server-side firewall and
configure it
to allow access
to only a few
select sites that
Jerry needs
for his work. Principle
three—least
privilege. Jerry will be a
regular
user.
No sudo access,
separate
browser profiles, access to
passwords or
sensitive
files. Principle
four—
authentication and
authorization. Jerry
gets his own
accounts. No
anonymous access
or shared
credentials. We
will connect it to your
own Claude
or OpenAI login, your own
email, and your
GitHub account, just like a
regular
employee. The fifth
principle, perhaps
the most important, is
monitoring and
auditability.
So if something goes
wrong, we need to be
able to
track it. We will
record everything
Jerry does,
set up
alerts for
anomalies, and
regularly
check this
activity. So, we will
configure UTM for the
virtual machine environment. I
will choose Mac OS as our
operating system.
It will install
automatically. While
this is happening, we'll
load Lulu as our
network firewall
. In Lulu, we can
decide which sites
to block, which
traffic to allow, and
it will also provide
us with
server-side logging.
Okay, we're ready
to install Mac OS on a
virtual machine
for Jerry. This is
Jerry's new home. So let
's go through all these
setup steps.
Making sure everything is
locked by
default. So,
that would be Jerry. We
will set a
password for Jerry. We will not
create an
Apple account. Without
geolocation services. We
will not share
anything with Apple. No
screen time. Without
Siri. Yes, enable
FileVault. We will write down this
recovery key. Well
, let's install
Jerry. Open the
Claude.ai browser.
Let's copy this. sudo
Insert this.
Enter our password.
Let's go. We
install Jerry.
I quickly went
through the settings in the
command line. I
entered our API keys for
Claude and ChatGPT. We've
reached the
user interface. Now in
this interface we
can continue to
configure
additional features and
connections. But
really, security
depends on the
environment
you place it in. Is
n't that right? A virtual
machine isolated on
its own server, with
monitoring,
logging, and a
firewall. And we
grant the minimum
necessary
access rights, right? The
next step is
to remove
administrator rights from
this
account before
starting
use. We
created unique
Claude and OpenAI logins that are
tied solely to
Jerry. Now we
can monitor
Jerry and shut
him down if he does
something wrong.
The reality is that
OpenAI is still very
probabilistic and can
hallucinate. It
can mess up whatever
you
connect it to. So,
if you follow these
steps and set up
your virtual
machine, it can be an
extremely powerful
tool for
your research. And
until someone
releases a
truly secure
enterprise version,
I would be very
cautious about
using it, but this
setup will give
you a head start and at least
minimize the devastating
consequences if it does
happen. Well,
good luck with your creation.
