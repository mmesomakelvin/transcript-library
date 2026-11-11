---
video_id: "AtgCcMjtqF0"
title: "I Spent a Year Replacing My Subscriptions. Here’s How."
channel: "Dammit Jeff"
topic: "hardware-homelab"
published_date: "2026-02-28"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=AtgCcMjtqF0"
duration: 2799
word_count: 4000
chunk: 1
total_chunks: 3
parent_video_id: "AtgCcMjtqF0"
---
HBO Max is raising prices for all of its
plans.
&gt;&gt; Disney is increasing subscription prices
for Disney Plus.
&gt;&gt; Users will have to pay $6.99 a month for
each additional user.
&gt;&gt; ride era of streaming is coming to an
end.
Big Tech has been getting more and more
aggressive every single year. They used
to be much more subtle about it, but now
with rising subscriptions and hardware
costs, their goal is becoming much more
obvious. Own nothing, then rent it back
to you.
So, I built my own home lab, and now I
can stream movies, photos, music,
download games, even run video game
servers, and so much more, all without
having to subscribe to anything. And
it's way easier than you think. I spent
the last year documenting everything
I've learned, detaching myself from as
many services as I can, and I want to
share everything with you, from the
cheapest and most expensive hardware, to
software, the best apps, and getting
everything online. It's time to take
back control over your data before it's
too late.
So, most of our day-to-day lives, like
our photos, our files, our ring cameras,
even random stuff like video game saves,
are incredibly dependent on other
companies holding everything together,
and storing your files on their data
centers somewhere in some random field
in Texas. The idea was, at some point,
to make your life more convenient. Let
them take on the stress and cost of
managing all that data and files and
stuff, and you don't have to worry about
your stuff being lost or damaged. But,
as I'm sure you've noticed, times have
changed, and what was at one point just
like, "Oh, this is a nice like
convenient thing." is now dependence on
these services, which means when they
decide to raise the prices, remove
features, delete your account, or change
the terms of service to start scanning
your images and data for things that
they should have no reason to keep,
you're just stuck there. So, you know
how people say the cloud is just someone
else's computer? Well, home labbing is
basically the reverse of that. Instead
of putting all your files, photos, cloud
storage, etc. on Google servers, they
live on a system that you control at
home without ever having to worry about
what Google or Microsoft or Apple is
going to do next. Like think of it like
Minecraft servers. You remember setting
up one of those on your PC for your
friends to all play together? It was
really great until you turn off your PC
and then your friends couldn't play
anymore. Now, imagine if you had a
low-powered compact little machine
that's whole job is to just always be on
all the time, always, so it can run
things like your Minecraft server, but
also a lot of other apps like
self-hosted cloud storage or self-hosted
photos or self-hosted media player,
self-hosted YouTube, and yes, even your
friends' Minecraft server. That's what a
home lab is at its core. So, if that
sounds interesting to you, awesome. Now,
there are a billion different ways to
configure your server with different
hardware, different apps, different
workflows. I'm going to show you mine
and then hopefully it gives you some
ideas as to what you want to pursue in
your own setup.
So, you want to get into home labbing.
Okay, awesome. So, what what do you buy
exactly? Do I need like hardware or like
hard drives? I keep hearing people talk
about like DAS and NAS and AAS and
common or not use or what is all that?
Well, there's a whole range of prices
that you can start spending on for a
home lab server, anything from
completely free all the way up to like
thousand of dollars Linus Tech Tips
setups. But, the common thing in all
these hardware setups is that they're
usually low power by design, they can
stay on for super duper long periods of
time, and they have a decent Ethernet
jack so we can communicate with the rest
of the house. So, if you're wondering,
can I use X as a server? Check and see
if they meet all three of those
requirements. So, no, your old Xbox 360
unfortunately can't be run as a server.
But, your old Wii can, apparently. We
should do a video on that. I want to
show you a range of different setups
from the low end all the way up to super
duper high-end stuff and then you decide
how much that you want to spend on your
home lab server. But, I want to make it
clear because I didn't know this when I
first started, you don't need a super
duper powerful machine to run a server
unless you're explicitly running
something that requires that much
hardware. Good examples are like local
AI models or like, you know, video
transcoding. Self-hosted apps tend to be
really, really light and that's by
design. Got it? Okay, so what are our
options?
So, probably the cheapest option is
actually going to be completely free. If
you already have an old laptop or a
desktop PC that you may have lying
around that's just too old to really run
anything anymore, you could totally wipe
Windows off of it and repurpose it as a
home lab server. I got this one from my
dad that he just you forgot the password
to, but it's just it's so old now that
there's no point in even trying to use
it anymore. If you're doing the laptop
route though, the only suggestion I'd
give is since this is going to live
forever, maybe consider removing the
battery from the laptop. Those things
can get uh pretty spicy over time. With
something like this, you can easily
start running like a server OS on it and
start running self-hosted apps. But, I
won't lie, it's kind of clumsy to store
and stash away somewhere. So, what if we
wanted something a little bit more
designed for a server? Now, the next
step up above that would be a recycled
office PC. Yeah, you know the little
office PC that you see at places like a
pharmacy or the DMV or at school or
whatever. Yeah, so companies and schools
buy out like a hundred of these little
tiny PCs at a time every few years and
then sell all their old ones for super
duper cheap. They sip power, they're
super reliable, and they're perfect for
what we're using them for since they're
meant to just run stuff like Microsoft
Office and Excel and whatnot. Just so
you know what you're looking for, most
of the big computer companies tend to
have a special name for their special
like business class PCs. So, Lenovo has
Lenovo ThinkCentres, HP has EliteDesks
and ProDesks for their nicer stuff, and
Dell has OptiPlex. Bigger desktops also
have the benefit of having way more room
for proper hard drives, which means you
can buy a bunch of hard drives and then
just stick them in there. Now, in terms
of specs, that this is is a Jeff's
opinion, okay? I would look for
something that has at least 8 gigs of
RAM and at least an 8th gen Intel CPU.
Now, the current RAM shortage is making
this It's bit harder than it used to be
and I do see prices already going up.
So, if you're thinking of maybe picking
up one down the line, do it now before
these things end up being worth more
than like gold or something. I'll link
some places to buy these in the
description. I was able to pick up this
HP 600 from OfferUp for 75 bucks, which
has a 9th gen Core i5 processor, 8 gigs
of RAM, and a 120 gig SSD, which is
plenty for what we're trying to run on
this thing. I mean, we're just running a
bunch of self-hosted apps. And the crazy
part, this thing just sips power even
when it's actually running apps and
stuff. It It's insane. And these ones
are super cool because they literally
require no tools to open up in case you
need to swap out RAM or a new SSD or
anything. Now, just this by itself is
cool, but add an external USB hard drive
like this one, and now you have a home
lab server with storage, which means you
can do a lot more like cloud storage,
file backups, a media server to hold
movies and TV shows and stuff, and
access it from anywhere. It's really
really great. Link in the description if
you want the one that I'm using, by the
way. I got a 26 terabyte one, but they
totally make much smaller ones. Don't
Don't worry. This little office PC and a
26 terabyte USB drive is what's going to
be running my home lab server here, at
least until I can afford something a
little bit nicer. So, if it's good
enough for Jeff, it's good enough for
you, okay? Now, the only downside with
this setup is that there's no
redundancy, meaning that if this hard
drive dies, that that's it. Everything
is lost.
But, as a first real proper server
setup, this is a great way to get into
it, and lots of people just stop here.
Another downside, though, is
upgradeability. You can't keep plugging
USB hard drives in this thing since it
starts to get really messy and slow,
and cables get everywhere. It's It's not
really great. So, the next setup that
you'll see is a mini PC and a DAS. This
is where you start separating things
between the processing power and your
storage. Mini PCs are great for this
because they're still pretty cheap. They
got newer processors and usually cost
less than like a specked-out office PC.
Something like this from GMK Tech has
these specs and could be had for about
300 bucks. And some people just straight
up use Mac minis for their server since
they're like the only good deals left on
computers right now. And you can go even
cheaper if you look for them in the
right places. I'll link these ones in
the description. If you're paying more
than this for a refurbished office PC,
yeah, honestly just just go for the mini
PC at that point. These are also great
because you can run virtual machines on
them no problem. So if you need a copy
of Windows real quick for something or
Linux, Debian, freaking Hannah Montana
OS, great. You can spin up multiple of
them and run them on your server and
connect to them from anywhere. As for
storage, you're going to want a direct
attached storage or a DAS. It's
basically just a box that's just meant
to hold hard drives that plugs straight
into your server via USB. So you can add
more drives down the line or you can
have redundancy set up so that way if
one of your hard drive dies, like your
whole data doesn't get completely
destroyed. And it's generally much
cleaner of a setup. This one from Orico
can be had for less than 100 bucks and
gives you way more upgradeability
options. Now it's starting to become
like a proper server setup.
Now the DAS is just that. It's just an
attached storage. There's no brains or
drive management or anything happening
on here. It's just a box. That's it. All
of the hard drives have to be managed by
some sort of software, uh usually the
mini PC. Now at this point you're
setting up the hardware, installing the
software, running a DAS, getting all the
wires set up, and this is great, but
what if I just want something to do all
of this for me, ready to go right out of
the box? And that's when you finally
move to a proper NAS system or a network
attached storage. It's like a mini PC
and a DAS all in one that's specifically
designed to just be a server. Now NASs
used to be considered not good home lab
servers like a long time ago, but
nowadays the hardware in these things
are pretty good. Good enough to be used
for running apps and doing more than
just managing your files.
Ugreen, Synology, and QNAP are the most
popular ones in the NAS space. They're
also great because they're literally
just plug and play. Just put in your
hard drives and you're done. You're all
ready to go. And they all have their own
operating systems, too, that usually
have the stuff that you already want
pre-installed, like a cloud sync,
Docker, an app store, and an interface
you can already just start accessing
your files. These are considerably more
expensive, but they really just
configure everything for you. And you
can get right to doing home lab stuff,
and they can fit anywhere. I mean, I
literally have one sitting in my closet
like right now back at home. It's It's
really really nice. So, now you know the
basics. That's basically all that a home
lab is. A computer, an Ethernet
connection to your network somehow, and
usually some hard drives to store stuff.
A server is basically just some
combination of all of those. And then
down the line you can add other stuff,
too, like a UPS, which think of it like
a battery bank, but for your server. If
your power dies or something, it'll
still run on battery for like 10-ish
minutes, so that way you have time to
shut down everything safely and not lose
any data. So, the high-end business
stuff with server racks and everything
you see like in movies and stuff like
that, they're literally the exact same
thing, but some people might just want
more Ethernet jacks to hardline their
server to multiple computers. Or like
way more hard drive slots to be able to
store stuff. Or some people like having
multiple PCs connected together, so that
way they can combine processing power
together on tasks. That's called
clustering, by the way. Okay, it's pop
quiz time. You didn't You weren't going
to get away from here without, you know,
actually testing what you learned. So,
uh I asked my Discord members, a bunch
of them just to send pictures of their
home lab servers, so we can kind of look
through them and look through examples
and identify what they're doing. So,
let's try something really easy. I mean,
this is a really basic one. Let's Let's
try this one. Okay, so can you identify
all three things here? PC, hard drive,
and a network connection. Okay, simple
enough. Let's try something a little bit
tougher. Same thing with this one. Let's
try this one. Same thing. We got PCs,
hard drives, and a network connection.
Are we getting it? Okay, let's try
something else. Okay, this one's really
long, so I'm going to try to crop it or
something, but basically, same concept,
right? PCs, hard drives, and network.
Same thing, right? So, those little
things they're little slots so you can
put in hard drives. Makes sense, right?
Some people like a lot of hard drives
though. Jesus Christ. I
Yeah, no, it's well, that's
Yeah, that's a server. Oh god. But, it
technically counts though. PC, network
connection, hard drives, and a UPS there
so that way stuff doesn't shut down.
Good lord. Looks like it's coming out of
Silent Hill or something.
Hold on, this is just in your living
room? Bro, what do guests say when they
come in here? Like you got the entirety
of Facebook running in your living room.
What What do you even do with that? Wow.
Uh
Well, it you got PC, we got storage, and
we got a network connection, so it it it
counts.
If this was a horse, I would shoot it.
So, that's the hardware side. If you
take nothing else from this video, at
the very least, you know what servers
do, and you can tell what they're doing
just by looking at them. Yeah, no one
had a decent explanation on all of this
when I looked it up on YouTube.
Hopefully, Jeff's explanation finally
cleared up what people are talking about
when they say home lab or NAS or DAS or
whatever. And at the very least, I
earned your subscribe, too. Come on, I I
worked so hard on on this explanation. I
I think I earned it.
So, you got your hardware secured. Now,
what do we do with it? So, first, we
need to install a proper operating
system to run all of our server stuff.
Windows is almost never used for home
server stuff because they're pretty
bloated and have a bunch of features
that we won't ever use. They're not
really designed to manage stuff like
this. Plus, this thing is going to be in
a closet somewhere or tucked away under
the entertainment center. So, we're
going to want to be able to still
interact with it even without a mouse
and keyboard and a monitor. Some
plug-and-play NASs like U Green and
Synology will already have a built-in
interface you can connect to using a web
browser. So, you just type in the IP
address of your NAS, and bam, you can
start fiddling with it from whatever
machine you want. And that's the main
way we'll be interacting with our server
when we use it. And some of them even
have plug-and-play apps, so you can
still tweak stuff on your phone.
But if you're starting from fresh
hardware, you're going to want to wipe
Windows entirely. That means we're
running Linux.
&gt;&gt; god, bro.
&gt;&gt; Oh, wait. Come on, guys. It's really
cool. Just give me a sec. Yeah, so
there's operating systems that are
designed from the ground up to manage
home servers, just like the ones from
the pre-built companies. It's really
easy. You usually just have to download
an ISO, install it to a flash drive
using something like Balena Etcher, plug
it into whatever hardware that you're
using, spam the out of the F12 key like
it owes you money or something, and
eventually you'll be able to get into
the BIOS where you can boot your flash
drive and install your OS of choice.
Now, this is mostly personal preference.
Seriously, go try them out yourself and
see which one you end up liking. And if
you realize down the line that you
wanted something else or you want to
start over, don't worry. It's usually
really easy to transfer over everything
without wiping all of your stuff. I'll
show you some of the more popular ones.
TrueNAS is the industry standard and
even the business standard. And they do
have a free version that will be more
than enough for most people. But, man,
there are a lot of options, almost to a
fault. But if you love tinkering with
stuff, there's a lots of guides for the
software and it's super duper
accessible. Unraid is cool because it
lets you combine hard drives of
different sizes, which isn't usually
possible with normal RAID
configurations. And has pretty decent
app support and community support, too.
But this isn't a free OS, though. It is
paid, about $50 for a year of updates.
Still, it's really popular and there's a
lots of support around it. Now, I found
one that I really liked for new
hardware, ZimaOS. This one has the most
normally looking interface that I found
that I think would be the best start for
most people. It has a really pretty,
super easy to understand interface that
doesn't feel like it's overwhelming you
with information. It has support for all
the big file formats, backup support,
Dropbox, Google Drive sync, etc. And it
even has an app, like the big guys do.
Android only, though. And an awesome app
store that I honestly I struggled to
find missing apps for. Like this store
really has pretty much everything you'll
ever need. Now, Zima OS is free,
however, it only supports up to four
hard drives on the free version. I don't
think most people will ever be hitting
that limit, so for 90% of people, you're
good to go. But, the full version with
unlimited drives is $29, and that's for
a lifetime license. No subscriptions. On
my McChicken scale, that Yeah, that No,
that that checks out. Yeah, that's only
8.3 McChickens, so. I'm going to be
using Zima OS for the rest of the video,
but every OS has their own equivalent
feature of what I'm talking about. It
just might be named differently.
Hey, do you hate having to make doctor's
appointments? I mean, I'm sure it's not
because you don't want to. I mean, you
still want to be able to be around to
see GTA 6 come out, right? It's just
that it's such a pain having to deal
with finding the right phone numbers,
being placed on hold, figuring out if
they actually take your insurance at
all, and then waiting an hour on hold to
find out if maybe they might have some
time to see you. Thankfully, we have a
really nice solution for that now, and
we don't have to deal with that anymore
with our sponsor, Zocdoc. Zocdoc is a
completely free website that helps you
book any doctors, dentists,
psychiatrists, eye care, whatever you
need, and helps you find people near you
that actually fit your needs. So, if you
want to filter by which ones take your
insurance or in-person meets only,
Zocdoc lets you do that seamlessly. And,
you can check out reviews from people
that actually met with that doctor. And
when you're ready, you can book an
appointment right then and there, with
some even being able to meet within 72
hours of booking. As someone who hates
having to make phone calls to make a
doctor's appointment, being able to find
a professional the same way I look at
reviews for like a restaurant is so
nice. Take care of yourself this year.
Scan the QR code up here or click the
link in the description to try it out.
It's free. And thanks again to Zocdoc
for sponsoring this channel so we can
keep making cool videos like this.
So, let's talk about storage. So, the
main big reason most people want to set
up a server at home is to use it as
their own personal cloud storage, which
means you can access it from anywhere,
even outside of your house, and feel
safe knowing that it's back at home and
