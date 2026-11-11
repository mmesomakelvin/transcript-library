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
word_count: 3999
chunk: 2
total_chunks: 3
parent_video_id: "AtgCcMjtqF0"
---
not going through some third party or
being scanned on someone else's server.
So, you're going to need some hard
drives to store all of your stuff. Now,
this is why I was saying if you're
looking to do self-hosting stuff, do it
now before it's too late. Hardware
trends, unfortunately, are not in our
favor here. Data centers buying up tons
of PC hardware is the reason we're in
this situation in the first place. So,
first they came for RAM, then SSDs, and
now hard drives are going up next. We're
right here. Yes, I know that prices are
starting to go up already, but I I want
to be clear about this. This isn't going
to get better anytime soon. And
unfortunately, this is not one of those
situations where just waiting it out is
going to help. Costs will get worse
before they get better. And companies
like OpenAI and Microsoft have already
bought out a majority of the hardware
supply until 2029.
That's a really long time to be waiting.
And then by then, be honest, do you
really think we're just going to go back
to $90 for a terabyte SSD again? Like,
it really feels like the end game here
is to make ownership of your hardware
unreachable. Little tangent, by the way,
but man, it's been a really bad decade
for PC parts, I feel like. Uh we just
can't win. It's been bad for almost
every single year this decade. At some
point, this just becomes like the new
normal now, right? Anyways, if you're
just now starting out, don't focus on
getting the perfect setup and filling up
all the drives and all that ones and all
that. You don't have to do that. My
suggestion, get two 4-terabyte drives
for now, and then upgrade if you can
down the line later. The type of hard
drive also matters a lot, too. There's
usually server-grade ready hard drives
that are designed to be running 24/7 in
a NAS or a home server. For example,
Western Digital has WD Reds, which
signify, yeah, they're built for
extended use compared to their regular
WD Blue drives. Full disclosure, they
were kind enough to send me these for
the video because I would have had to
sell my car to be able to get this
amount of storage now. But, they do make
smaller sizes, too. Don't don't worry.
You do not have to go overboard like
this. I'll link some in the description.
Now, we should probably talk about hard
drive pools. For servers, hard drives
aren't read in the same way that your
laptop or your PC would use them. It
would be very slow and efficient to
store files that way. So, servers use
something called RAID, where instead of
it being like, you know, five, six,
seven smaller RAID drives, they're
combined into one super big single drive
that you can host your files on. And
your operating system will be smart
enough to know how to distribute that
data for optimal speed. You usually
don't have to do anything special to do
this. The setup process of the OS
usually asks you what kind of setup that
you want. Now, this setup is called RAID
0. However, because they're all linked
together now, if one of those drives
dies, all of your data is gone. If
you're just hosting movies or TV shows
or something like that, yeah, that's
fine. No Who cares? You can just always
redownload those. But, if you're hosting
personal stuff like photos or
irreplaceable documents,
that's not good. So, there's another
version called RAID 5, which is what I
use. This setup still makes one really
big drive out of all your drives, but if
one of your drives dies for any reason,
your data is still completely intact and
safe. Now, if two drives die, then yeah,
you're you're screwed. But, this setup
should at least give you some time to go
replace that dead drive. The catch?
Well, this setup requires you to
sacrifice one drive in your pool. So, if
you have four 10 TB drives, you don't
get a full 40 TB to use. You get 27 TB
of usable storage. Yeah, you basically
lose an entire drive for the storage.
But, it's worth it if it means that your
server has some line of redundancy.
There are more versions of RAID, but
really those two are the only important
ones to know, honestly. So, if you want
my advice, do RAID 5, and I'll link this
calculator in the description so you can
test configurations for yourself.
Once you've created your pool, you can
usually just start dragging and dropping
files into it. Cool. But, you can now
also access this from any device on your
network, too. So, for example, on macOS,
I can just click on connect to server in
the finder,
type in my server's IP, sign in, and
that's it. Look, now it's just being
detected as some big-ass external drive
that you can just use it for anything.
If you have a decent Ethernet connection
to your server, you can even use this as
an editing drive for photos and videos.
It's really, really nice. And this isn't
just on computers either. You can even
connect to it on your phone. It's really
nice. Now this will only work as long as
you're connected to the same network as
your server, but I'll show you how you
can access it remotely from anywhere
later. Don't worry.
So now we got that figured out, let's
talk about apps for your server. Yeah,
now this is the fun part. Now almost all
of the big operating systems will have
app stores, so you never have to even
configure anything yourself. You can
just click install and you're done. It's
all set up for you. But the amount of
apps that a store might have varies
depending on what operating system
you're using. And some operating systems
have like four apps total on their app
store. So I want to show you how to get
familiar with how to install any app
that you want onto your server. So
almost every app that you'll install is
run through something called Docker. And
most apps are run through Docker
containers, which are just super little
lightweight isolated containers for your
apps that have all the right settings,
components, drivers, whatever it may
need, all set up for you. That is
isolated from the rest of your apps so
they can't destroy each other. Now each
OS has their own Docker manager, but
honestly some of them are great and some
just suck. And the variances make it
really difficult to follow along if
you're just starting. So my advice, go
to your app store and see if they have
Portainer. This is a Docker management
app that makes it way easier to see all
of your Docker apps, install new ones,
and make changes to your existing one.
Also it just makes it much easier to
look up installation tutorials. So now
you can just go look up how to install
blank app Portainer. Then it's way
easier now. So now that we got that out
of the way, what can we install? I want
to go over a few sections I feel are
essential for a lot of people, but this
isn't everything unfortunately. I'm
going to miss some things. This video is
already really long, so just keep that
in mind. There's no way I could have
gotten to everything.
Photos are really important to me. I
noticed somewhere around my teenage
years that man, like no matter how big a
memory might be for me, I somehow always
slowly end up forgetting it. Memories
fade, but photos
photos don't forget. So, I photograph
everything. I take my camera almost
everywhere, even where places where it
doesn't really make much sense to bring
one. But those always end up capturing
some of my most favorite memories. So,
keeping those photos secure and safe is
really important to me. I've been using
Google Photos for the last, you know, I
want to say like 10 years now. God, I'm
getting old. And I switched over for the
same reason probably a lot of you guys
did. Unlimited storage forever. Yeah,
big fat ugly stinky asterisks on the
forever part, by the way. By the way,
look at how big these chips were on
these phones. Oh my god. And those were
the good examples that they had. Well,
turns out forever actually meant 6
years, as they no longer offer free
unlimited storage since 2021. And if you
want to keep uploading photos, you got
to buy more storage, which sucks because
I'm sure a lot of people signed up under
the expectation that their stuff would
just be safe there forever, right? I
mean, let's let's call it what it was.
It was a bait and switch. Their plan was
to get people hooked on the unlimited
storage, make them move their entire
life over there, and then jack up the
price when they're ready. Yeah, you're
going to see that pattern a lot in this
video. So, let me introduce you to
Image. This is one of my favorite apps
that I found to replace Google and
iCloud Photos. It has pretty much
everything you'd want from a photo
management software. It can sort by
dates, detect duplicate photos, crop
images, and can even detect faces, all
locally, offline, which is amazing. I
also love sharing pictures with friends
after a trip, so that was super
important for me. Thankfully, Image also
makes sharing albums really, really
easy. You just make a link, and just
text it over to your friends. And you
can make users, too, so everyone in your
family can have their own separate Image
account login, and no one's photos are
all mixed up together. It even has a
wonderful map that takes all the
location data from your pictures, and
shows you where all of your photos were
taken. A feature that somehow Google
Photos still doesn't have on their own
desktop site. They also have a phone
app, too. So, you can just use it like
photos, where it'll automatically back
up your camera roll, and your stuff is
safely backed up to your home server,
not Google servers. It also has support
for highlights, which I just love that.
And iOS widgets, which this is this is
actually really important to me. I I
love seeing where I was 5 years ago,
exactly to this day. Like, that's really
cool. Now, I know what you're thinking.
Is Is that a new studio space? Did he
Did Jeff move or something? And the
answer is yes, I did. I did a whole
video explaining all of that on my new
second channel. Ah, new second channel!
Link in the description. But, also,
you're probably thinking, "Immich sounds
great if you're starting a brand new
library. But, I already have all my
stuff backed up on iCloud or Google
Photos, and it sounds like such a pain
figuring out how to download and
transfer all of that over to Immich. Oh
my god, it's going to take like 4 days
to organize everything and make sure the
dates are right, and I have like 80 gigs
of photos of just my stupid dog." All
right, relax. They thought of that, too.
So, for iPhone people, Apple actually
gives you a way to download all of the
photos from your iCloud account, amongst
other things, and send them over in 10
or 20 or 25 GB sections. It's kind of
hidden, but I'll link it in the
description so you can find it. Now,
this might take anywhere from a few
hours to 4 days, depending on how many
photos you have. But, eventually,
they'll send over download links to all
of your stuff with EXIF data and live
photos information attached to. This is
really important because Immich does
have the ability to detect live photos
properly, which is really, really nice.
Same thing for Google Photos, they have
a page where you can request all of your
stuff in one go. My only suggestion is
when your files are ready, just download
Firefox on your server real quick, and
download them through there. It's just
that way you can just download it
directly to your server, and you don't
have to spend an extra day downloading
everything to your computer, then
transferring it over to your server. Now
that you got your photos, you can use an
app called Immich Go that knows how to
read iCloud and Google Photos
directories, and sync them over
seamlessly to Immich. Literally,
everything is done for you. I have
almost 15 years of my life stored on my
Google Photos, and I'm sure I'm not the
only one. Photos are a really big part
of my life, and being able to know that
all of these are stored safely back at
home is a big deal to me. Without having
to be stored in some random server being
scanned for who knows what.
So, there's a lot of video game related
self-hosted stuff that's really helpful
in removing dependence from outside
services. A big one for sure is ROM
managers. I I love these things.
ROM Man is the most popular one that
I've seen. If you're one of the people
that has like thousands of ROMs for
emulators just sitting in a ROMs folder
on your desktop or something, ROM Man is
a much more elegant solution to that.
Man, these app names are terrible to
search up. Google literally thinks
you're just misspelling the word ROM the
whole time. It's a database for your
ROMs, so we can scan your folders and
display all your ROMs with the matching
cover art, title, release date, etc. And
automatically sort everything by
console, genre, and it'll even
auto-generate collections from your
library, too. Just search up the game or
consoles that you're looking for, find
your game, and just click download. And
it'll just grab it from your self-hosted
collection of ROMs. What, doesn't
everyone have their collection of 35,000
Switch ROMs backed up somewhere? I'm not
crazy. And again, because this is
accessed through a web browser, that
means you can access this on your phones
or your handhelds and download stuff
without having to get a USB cable and a
computer anymore. It's like your own
virtual Vimm's Lair. Oh, and you can
even upload BIOS files, too, so you
don't have to check your downloads
folder anymore to see where the hell did
you leave that file. And you can even
store save files, too. There is so much
more configuration here and ways to
manage this app. I'd be here all day
showing everything off, but this is the
craziest feature, honestly. Built-in
emulator support. Yeah, ROM Man has a
built-in web emulator that can let you
play your ROMs right in your web browser
from anywhere. It supports consoles all
the way up to PSP, which is crazy to me.
So, in theory, you could hook up a
controller to your laptop or your phone,
boot into ROM Man's game mode, and just
pick the games that you want and start
playing. Currently supports all the way
up to PSP, which I mean I mean still
bonkers to me. I know it's not a hard
device to emulate anymore, but dude,
this is being streamed and played on my
NAS of all things across the internet.
And since this is running on your
server, that means you can invite your
friends so that they can also download
and play from your collection, legally,
of course. And I'll show you how to
connect your apps to the outside world
later on in the video, don't don't
worry. This is a crazy customizable app
that lets you do so much with your
totally legit, completely legal ROM
collection. However, and the devs have
acknowledged this to me,
the file structure to get this running
is very finicky and the database itself
is kind of difficult to set up. So, I do
want to mention an alternative. Retro
ROM. It does almost everything Rom em
does, so it lets you categorize your
games, lets you download them, console
mode, built-in emulators, etc. But I
just personally really like the user
interface a lot more compared to Rom em.
And it's a bit easier to set up the
folder directories for your games.
Totally subjective though, I know, but I
did figure I should mention it. Not many
people know about this one, which sucks
because I think it's really really
great. If you want to keep it alive, go
give it a try. I'll link in the
description. Another amazing app that I
would suggest is Application Management
Panel, or AMP. Again, what what is it
with these names, dude? I I
This app lets you make one-click game
servers for any game that you can think
of. Minecraft, Counter-Strike, Palworld,
G Mod, even TeamSpeak servers if you
want. So, if you want to start another
two-week Minecraft phase again with your
buddies, instead of paying another eight
bucks a month for a Minecraft Realm
server, you can just create a new
instance, pick Minecraft, and that's it.
You're up and running. And your
Minecraft server is live. But this is
only a local IP though. It's only
accessible in your network. So, how do
we get this out into the public
internet? All right, I remember back in
the day we would have to learn how to
port forward from some YouTube tutorial
from a 12-year-old with a Bandicam
watermark on the screen.
And those who didn't want to deal with
that used LogMeIn Hamachi. Yeah, there's
like 30 people right now watching that
just sat up here in that name again.
Yeah, I I know what you were doing. I I
know what you were. Thankfully, we don't
have to do any of that anymore because
now we can just use a service like
playit.gg to expose your servers to the
internet. Oh, and don't worry, they have
a paid plan, but like you don't need to
pay for what we're using it for. That
way we can take any of our server IPs,
run it through their service, and then
publish it out into the internet safely,
so you're not just exposing your IP
willy-nilly. Then they give you a link
that you can give to your friends, and
look, now anyone can use this link to
join your server, and you don't have to
go into your router settings anymore.
&gt;&gt; You got me feeling like SkyDoesMinecraft
again.
What ever happened to that guy anyways?
Oh my god.
Jesus Christ.
&gt;&gt; Now, I should mention that this app is
great, but it's not free. But, it's not
crazy expensive either. A pro license is
20 bucks, and that's for a lifetime
license, which is awesome. 20 bucks for
15 of your servers for any game that you
could possibly want compared to 2 and
1/2 months of a Minecraft Realms
subscription. Come on, that's that's
totally worth it. Plus, you get to be
the cool friend that can set up servers
for game nights, so that way no one's
got to pay for a server anymore figure
out port forwarding. You got to stock up
on RAM though. Game servers tend to
really like a RAM. If you want to host
multiple servers at the same time,
you're going to want to get as much RAM
as possible. I'm going to link some
cheap sticks in the description, so that
way you can
Huh. Oh, and before I forget, quick
shout out to this app that I've been
actually personally helping contribute
to, Fireshare. Think of it like Google
Photos, but for your game clips. So, you
can upload your game clips to it, and
it'll automatically detect the game,
date, etc., so you can keep them
organized, and generate a link to send
to your friends, so they can watch it,
too. You can even open up your server
for any of your friends to upload, and
have it be a really great big group
database for all of your friends to
share their clips together in one spot.
So, anyone can access it whenever. It
also has really great transcoding
options, so as soon as you start
uploading, it can start making 1080p,
720p, or 480p versions of your clips.
So, they can load faster for your
friends with slower internet
connections. I personally have mine set
up with Syncthing, so every time I clip
something with ShadowPlay when I'm
playing games, it automatically gets
sent over to my Fire Share folder, and
it can get scanned right away and start
detecting the game, date, thumbnail, and
transcoding the video in 1080p and 720p
versions. I've kept a lot of old game
clips over the years dating all the way
back to like 2014.
And having a decent interface to be able
to document them and keep them organized
is so nice. Now, I want to be clear,
this is not my project. The devs working
on this have done a phenomenal job
making a usable database to organize
everything, but I noticed that their
interface was kind of
lacking, to put it nicely. But before
YouTube, my background was actually in
graphic design and UX design. So, I know
that there's places where my experience
can help, and that's how I've been
contributing. Seriously, I'm really
proud of how much this app has grown in
just the last few months, and I could
like personally say that I contributed
to that. I'm I'm so proud of that.
Please, go download it, check it out. I
would really really love some feedback
from more people to make sure that we're
on the right track.
Okay, so what about movies and TV shows?
I was going to explain why you should
switch over to self-hosting your own
media, but honestly, I don't think I
have to. Probably because odds are, you
probably already experienced it.
Streaming subscriptions are constantly
going up that it's become a yearly thing
now at this point. And it's not just one
platform, either. All of them are doing
this. Dude, I remember Disney Plus
launched in 2019 for $7 a month with 4K
and all of that. And yeah, I I bought
into it. It was a pretty easy way to
shut up the little siblings, you know?
Why not? Now, Disney Plus is 12 bucks
for the ad-supported version, and $19
for the ad-free version. So, now you pay
more than double compared to when it
