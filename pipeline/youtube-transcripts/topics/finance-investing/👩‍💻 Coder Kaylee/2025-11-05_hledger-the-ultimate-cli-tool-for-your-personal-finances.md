---
video_id: "hshDr2Af2RU"
title: "Hledger: The Ultimate CLI Tool for Your Personal Finances"
channel: "👩‍💻 Coder Kaylee"
topic: "finance-investing"
published_date: "2025-11-05"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=hshDr2Af2RU"
duration: 342
word_count: 1067
---
I deleted Mint 3 years ago, cancelled my
WAB subscription, and I haven't paid a
single dollar to track my money since.
My secret, this ugly text file. I know
what you're thinking, Kaylee, that looks
terrible. And you're right, but here's
what blew my mind. This free plain text
file gives me more control, more
privacy, and more power than any app
I've ever used. And it'll outlive every
financial app on the market. In this
video, I'm going to prove it. You'll
record your first transaction, run your
first financial report, and understand
why developers and accountants have been
using this system for decades. Before we
set anything up, let me show you the end
result. This is what we're building
toward. This is my actual financial
snapshot right now. Every asset, every
liability, every expense, calculated
instantly from that plain text file.
Want to see every food purchase I made
this year? One command, half a second.
Want an income statement that would make
an accountant jealous? Done. Okay, I
know what you're thinking, but how hard
is this to set up? Way easier than you'd
think. And once you understand the one
concept that makes this work, you wonder
why you ever trusted your money to
someone else's database. Let [music] me
show you. First, we need to install
Hleter. It's free, open- source, and
works on Mac, Windows, and Linux. I'm
putting the exact install commands for
your operating system in the
description. For Mac users with
Homebrew, it's literally brew install
Hledger.
Done. to check it worked. Hledger D-
version.
Awesome. Now, here's where it gets
interesting. Every subscription app
keeps your data locked in their system.
Proprietary formats, cloud servers,
terms they can change tomorrow. But you,
your entire financial life is about to
live in a simple text file that you own,
you control, and you can read with your
own eyes. Create a folder. I called mine
finance. Inside, make a file called
main.journal. That's it. This plain text
file will hold every transaction you
ever make. And here's the beautiful
part. It's just text, human readable.
You could edit this with Notepad if you
wanted. But wait, there's a power move
here most people miss.
Put this folder under Git version
control. Every time you save changes,
you've got a complete backup snapshot.
Time travel for your finances. Okay, now
let me show you the one thing that makes
this entire system work. The secret is
something called double entry
bookkeeping. Now, don't let that scare
you. All it means is this. Every dollar
that leaves one account must show up in
another account. Money can't just
vanish. It has to go somewhere. It's the
same system banks use, Fortune 500
companies use, and it's the reason
you'll never lose track of your money
again. Let me show you how stupidly easy
Hled Ledger makes this. We're going to
record a trip to the grocery store using
Hled Ledger ad. Description: Safeway
Groceries.
first account expenses
and this is case sensitive
food
groceries.
See those colons? That's the magic. It's
like folders for your money. Expenses
colon food colon groceries means I can
later view all expenses, just food
expenses or drill down to just
groceries. It's a hierarchy. Game
changer. Amount, let's say $50 Canadian.
Second account assets
colon bank colon TD colon
check checking. Now watch this. I didn't
type the amount. H Ledger figured it out
automatically because every transaction
must balance to zero. $50 left my
checking. $50 became the grocery
expense. And there it is written to your
plain text file. Human readable forever.
That's it. You just recorded your first
double entry transaction. And honestly,
you could stop using the command and
just use these entries as by hand. If
you're thinking, "Okay, I'm actually
going to try this." Drop a fire emoji in
the comments. I want to see who's
following along. Now, let me show you
why this matters. You've got a
transaction logged. Cool. But so what?
It's just a text file. Watch this. Boom.
Every account balanced. Instant snapshot
of what you own and what you owe. This
is your balance sheet updated in real
time. No loading, no syncing, no
calculating spinners. Every expense
you've ever logged chronological one
just food expenses just food. That
hierarchy we set up. This is why. But
here's my favorite. An income statement.
Income minus expenses formatted like an
actual financial report. All from that
simple text file. Imagine this with a
year of data. Every purchase, every
paycheck, every investment, all
queryable in milliseconds. No ads, no
subscription, no company tracking your
spending habits to sell you credit
cards. You own this completely. One more
thing before we wrap up. Right now,
Hleter doesn't automatically know where
your journal is. We need to tell it. If
you're on a Mac or Linux, add this to
your shell config. Windows users,
slightly different command. Reload your
config, and now Hedger always knows
where to look. Okay, real talk. You just
broke free from subscription software
and take control of your financial data.
That's huge. But I know what you're
thinking, Kaye. I'm not typing every
transaction by hand. And you're right,
you shouldn't have to because there's a
dead simple way to import your bank's
CSV files directly into H ledger. One
command and months of transactions just
appear in your journal. I made an entire
video on that and it's linked in your
screen right now. I'll show you the
exact script I use and how to automate
the whole thing. But before you go,
three quick things. If this saved you
from another subscription fee, then hit
that like button. Helps other people
escape the subscription trap. Drop a
comment. What financial app are you
about to quit? I genuinely love reading
these things. Subscribe if you want more
tools like this. Plain text power tools,
privacy focused workflows, taking
control of your digital life. Pick your
path. I'll see you in the next video.
