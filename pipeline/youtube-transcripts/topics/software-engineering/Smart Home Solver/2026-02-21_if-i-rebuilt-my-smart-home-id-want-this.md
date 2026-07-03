---
video_id: "Wkzg8sNkm8Y"
title: "If I rebuilt my Smart Home, I’d want THIS"
channel: "Smart Home Solver"
topic: "software-engineering"
published_date: "2026-02-21"
ingested_date: "2026-07-03"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=Wkzg8sNkm8Y"
duration: 1043
word_count: 3493
---
I'm here in Colorado, way up in the
Rocky Mountains at Joel's house, and
it's full of amazing smart home tech
that I didn't even know was possible
before visiting. Not only that, but
everything is extremely reliable,
possibly the most rock-solid smart home
I've ever seen. That's because Joel had
an unfortunate event happen, but there
was a silver lining. A harrowing day in
Boulder County with two significant
fires fueled by dry conditions and very
high winds. Yeah, so about 4 years ago,
the Marshall fire burned about a
thousand homes in our area, including
ours and every house in our
neighborhood.
&gt;&gt; More than a thousand homes were
destroyed and two people died. Many
people still rebuilding.
And kind of a silver lining was that I
had always wanted my dad, who is an
architect, to build me a house, and we
spent about a year designing it and
built a lot of things kind of from
scratch to be
&gt;&gt; [music]
&gt;&gt; smart home capable. I get asked all the
time if I were starting over on my smart
home or if you were building a new home,
what you should focus on. Well, Joel has
done that here at his house, so there's
lots of great tips that I can't wait to
show you. So, let's go check it out.
So, I think this is maybe the most
unique part of our smart home. This is a
piece of software I've been working on
for about a decade now that I call time
frame, and it runs on a system of
e-paper displays throughout our house.
So, this one is a 25-in 4K e-paper
display from Boox. It displays what's
effectively a web page driven by a Mac
mini, and the application combines data
from Home Assistant and also has data
directly from Apple weather, and it
really unobtrusively displays critical
information that we find relevant. So,
if any part of our smart home is
unhealthy, this is a big way that we've
made the smart home so reliable is it
will actually tell us if a device is
unavailable or if an automation has
failed. There are hundreds of smart
devices in this house. It'd be really
overwhelming to have a dashboard that
had even a tenth of them. It will just
show us the state of a device if it
needs attention. So, we have a young
toddler and we should know when our
doors are unlocked. So, for example, it
now shows us that the front and alley
doors are unlocked. And right now it's
actually telling you that I need to
refill the dog's water bowl. I am a huge
fan how this looks. The e-paper just
blends into the house. You don't have
that bright screen. And these displays
are actually throughout the entire
house. And there's some really cool
smart home tech that's going to blow
your mind that can be displayed on the
screen that I'll show you in a minute.
Unlike most e-paper displays, it can do
real-time information. So, typically
you're probably used to a Kindle like
kind of almost like flashing when you
update say a changing a page or
something like that. This one can
actually display moving text and
sometimes video. So, it's technically a
computer monitor. For other screens in
the house, we have more traditional
e-paper displays from a company called
Visionect. Those are thin clients and
they load this and display this webpage
about every 10 minutes, which means that
they can't display real-time
information. So, one nice side effect of
having all this information on the
screens is that we don't necessarily
need to have our phones on us. Because
of that, we put in these charging
drawers that hide our devices out of
sight. One important thing with doing a
charging drawer is that you use a
thermally protected system. This has a
temperature sensor. So, [music] if for
some reason a device overheats, it will
automatically turn off the outlet.
That's really important for fire safety.
So, a fun way to listen to music here in
Joel's house, he has these RFID cards
with different artists and you can just
grab one, tap it against the RFID reader
and it'll automatically start playing
music throughout the house on the Sona
speakers and show what music is playing
here on the display. So, these cards
are, believe it or not, inkjet
printable. So, there's a company that
makes an adapter for inkjet printers
that are meant to print on CDs, but you
can put blank printable RFID cards in
instead. So, the automation this runs is
it's a tag in Home Assistant. So, when
you scan the tag, it pairs a couple of
our Sonos zones in the ceiling and sets
the volume to be the same and then sends
a Spotify playlist to that group zone.
So, one of the key design constraints we
had for the smart home was that
everything needed manual local control.
One of the ways we did that for a lot of
the devices that didn't have a good
local control option, like Sonos, is we
programmed Pico remotes. So, inside here
we have a Sonos controller that uses the
Pico audio remote that allows us to play
and pause the current music, change the
volume, skip to the next track, and then
this center button will regroup the
speakers, which anyone who uses Sonos
knows is that that's a nice shortcut to
have.
So, here in the kids' room, Joel has a
really awesome automation that makes it
so easy to put the kids down for nap
time. All he has to do is close the
door.
Now,
the sound machine turns on,
the lights turn off, and the shades are
closing here behind me,
and look how dark it's getting.
&gt;&gt; [music]
&gt;&gt; Yeah.
I think I need this for myself. That's
right. As my kids get older, I'm the one
who needs the naps. But, the automations
don't stop there. Joel also has some
really creative ideas in their home gym,
too. One problem we had to solve when we
were designing the gym is that the
Peloton devices have audio. They play
music when you do a class, and same with
when you do one on the Apple TV. And we
were going to use like a traditional,
you know, audio-video receiver, but then
you'd have to switch the inputs, which
was going to be really annoying. So,
instead, we put Bluetooth receivers in
the server rack and tied in all of them
together into a mixer that allows us to
to just set the correct volume for every
device. So, that when you come in here
and turn on the bike to do a class, it's
at the perfect volume. I love how
seamless this is. You don't have to use
any buttons or anything. All you have to
do is start riding the Peloton device
and the automations run. There's also
some really fun RGB light strips in here
that are modded into the ceiling so they
sit nice and flush. They look great and
they're just a lot of fun. So my wife
and I like to do yoga or strength
training together, but we need to keep
an eye on the baby. So we use our
Ubiquiti camera system fed through
scripted in Home Assistant into HomeKit
which allows us to have it in picture in
picture on the Apple TV while we work
out. And of course the smart bassinet is
also integrated with Home Assistant. So
when we turn it on, it automatically
enables the camera to record. Smart
bassinet connected to Home Assistant?
All right, maybe I want to have another
baby now.
All right, if you're my kids or any kids
watching right now, turn it off.
Seriously, stop watching.
All right, now that they've stopped
watching, good thing because if they saw
what was behind this door, you would
have a massive project on your hands.
Welcome to the kid cave.
Come in here underneath the stairs,
there's a hardwired contact switch
that just turns on this light
when you open up the door.
But check this out when you close it.
&gt;&gt; [music]
&gt;&gt; So in here we have a massive Light
Bright board. Joel built this entire
thing. There's smart light strips
powering it with a Zigbee motion sensor
that turns it on when any kids come in
here and it looks incredible. My kids
would love this. Actually,
I love this a lot too. I'd probably be
in here playing with it as much as the
kids would.
This is why Joel's smart home is so
great. There's fun tech, and clever
ideas. So, Joel came up with a really
creative solution. Their dog drinks a
lot of water, and they want to be
notified if the dog water bowl is empty.
So, Joel is using an Aqara water leak
sensor, and he tied some wires to it
that go into the dog's water bowl, and
he's using it the opposite way that you
would use a normal water leak sensor
because if the water leak sensor is dry,
then he gets alerted. And the Aqara
water leak sensor is actually a really
good use case for this because most of
them have an alarm that will beep when
there's water detected, but it would be
going off all the time if there's water
in the bowl. So, it's actually a benefit
that the Aqara sensor doesn't have a
siren. And speaking of Aqara, Aqara is
sponsoring this smart home tour series.
Traveling for these is expensive, so I
appreciate Aqara sponsoring this, and
Joel's actually using Aqara devices all
throughout his house. A lot of contact
sensors on doors, and there's one right
here on this door to the server rack.
And I really like the Aqara contact
sensors because they're so small, and
the battery life is very good, which you
wouldn't think for how small these
sensors are. And when you open up the
server rack door, the contact sensor
triggers automation that turns on the
Aqara T1 light strips here in the server
rack. The Aqara T1 light strips use
Zigbee, so they're extremely reliable.
They look really good. They have warm
and cool whites and great RGB colors.
I'm using them on my server rack. And
Aqara has lots of unique smart home
devices, and they're also very reliable
cuz many of them use Zigbee. So, I'll
have those linked down in the
description, and thanks to Aqara for
supporting the channel. So, down here in
the utility room, we have our server
rack with a fully Ubiquiti setup. One of
the cool things about the Ubiquiti setup
is that you can have two internet
connections. So, the first one on top,
we have a fiber line that runs right
here. And then, as a backup, we have a
5G modem. And originally, I had it
installed here, right on top of the
rack, but it got really bad reception
cuz we're here down in the basement. So,
what I did is I installed it in my
office upstairs, and then used PoE from
the rack to power the modem and bring
the data back to the rack. What's really
great about that is that we have our
backup power for the rack, which now
provides backup power for the modem
upstairs without having to have a
separate backup power supply. More
generally, when we were wiring the
house, we ran, I think it's almost 100
Ethernet drops everywhere we could,
corners of the house, couple for each
room, and they were pairs of Cat 6A. And
that's what makes this smart home so
reliable. There's Ethernet running
throughout the entire house, and you
don't have to worry about wireless
signals. Like, I have some Ethernet
running through my house, but if I had
100 drops going everywhere, oh man, that
would be so much better. So, if I had to
start over, this is definitely something
that I would do. It makes things way
more rock solid. And the reliability
doesn't stop there. Joelle's smart
shades are also very thought out. While
we were framing the house, we had
low-voltage lines run to every single
window, and we use these Hunter Douglas
power supplies that run all the power
for every shade to a central location.
Yeah, so I think we have maybe 45 shades
in the house, and they all thankfully
run back to this one bank of power
supplies that keeps them powered without
any need for batteries. We wanted to
have top-down, bottom-up shades, which
is where you can control both the bottom
rail and the top rail of the shades to
cover, like, the bottom half of a
window. Our bedrooms have these shades
where there's a light-filtering version,
like what you see here, and then there's
a blackout behind it, so we [music] can
choose between the two. And Joelle has
dialed in all these shades around the
house so perfectly. Depending on where
the sun is in the sky, like the angle of
it, the window shades will open or
close, that way direct sunlight isn't
like beating down on the countertops.
And as I've been walking around, they've
been slowly adjusting. It is incredible.
It's so fun to see. I'm extremely
jealous of all these window shades that
they're powered, they're reliable, and
how versatile they are. Funny people
have asked me whether it was worth it to
do this kind of intense of a shade
setup, and what I tell them is that it's
actually one of my favorite features of
the smart home. Once you can automate
your shades and not have to control them
manually, you actually just use them a
lot more. If you could always have every
shade in your house be exactly where
you'd want it to be, wouldn't that be
awesome? And it really has proven to be
true. Like anytime I walk in a room, the
shades are already where I want them to
be.
Well, I keep getting more jealous of
Joel's setup as the tour goes on. And
just wait till you see a smart lighting.
So, when we were picking lighting
controls for the house, we kind of had
two criteria. One is we wanted it to be
rock solid reliable, and the other is
that we wanted it to be crammer proof.
And that anyone who was in our house
could control the lights without having
to know anything about the house. That
led us, I think pretty obviously, to a
Lutron system. We used a combination of
RA3 and Caseta. We picked RA3 for our
wall dimmers because they have this
really great interaction where you can
touch to dim the level, and this level
will change when you do an automation.
So, it always stays in sync, which is
something that even the newest Caseta
dimmers won't do. So, I've never used
these RA3 switches from Lutron before,
but I am blown away by the sensitivity.
You can just press anywhere along the
side, and it just jumps straight to that
brightness. And you can move up and
down. It's so responsive. Like,
way more than I thought it was going to
be. I'm blown away. We're able to use
Home Assistant to bridge the Caseta and
RA3 systems together, so we can have
automations that use devices from both
sides and together do cool things like
having a light come on at a different
brightness based on motion at a certain
time of day
or based on say the brightness of the
sky outside. So Joel's not using any
smart bulbs in the house, just using
smart dimmers. That way they stay very
reliable, plus easy to use since anybody
can [music] use a switch on the wall,
but he still wants the benefits of a
light changing colors. So he has these
bulbs in the ceiling that are dim to
warm. When they're full brightness,
they're a little bit cooler, and as you
dim the lights, they get warmer. So you
get the best of both worlds. I've been
wanting to add these types of lights to
my own house because I don't really want
smart light bulbs all over my ceiling,
but I do want them a little bit warmer
at night. So this is a perfect solution.
Joel also built step lights into his
stairwells to see better. These and all
the other light colors match perfectly,
[music] and he even strategically placed
accent lighting to light up pictures and
the dashboard, which looks [music]
incredible.
So we're outside of the house and
there's some really cool things that you
have to see. Starting here with the
gate. Joel did something that I did not
think was possible. Our winters get
really cold here, which means that we
really can't use battery-powered devices
outside, and that includes contact
sensors. So for this gate, I found a
long-range contact sensor that was meant
for vehicle gates, and I wired it using
our existing landscaping wiring, and
that allowed me to have an ESP32 device
inside where I could plug it into power
where wasn't cold, and give me really
reliable uh performance [music] for the
sensor. This is such a creative
solution. And this next automation
combines technology and nature. So my
wife and I are really big birders, and
we wanted to see what birds were coming
to our bird bath cuz some of them get
scared away really easily if you get too
close. So we installed an Ubiquiti
camera here pointing at the bird bath,
and it records motion events that we can
see later to review all the different
species that came to our house. It's
mounted on this pole with a PoE cable. I
was really happy that I ran so many
lines because we ended up having to dig
this under the gravel here and under our
walkway and tie it up to one that we ran
under our deck. But just so happened
because we ran pairs of them everywhere
in the house that we had the line that
we needed. This is so much fun to see
the birds coming near our house and we
have a camera in our bird feeder that
our kids absolutely love. But Joel took
this camera set up with the birds way up
a notch. So another cool thing we've
done with our cameras is we feed them
into a neural network called Birdnet.
And what it does is it takes an audio
feed and tells you what bird is making a
sound in that audio feed. We in this
case feed in a couple of Ubiquiti
cameras including the one at the bird
bath and it sends these taggings to the
BirdWeather API that we then use to
display the bird that was tagged the
least in the last 24 hours on the
displays, which basically tells us like
what was the coolest bird or most
unusual bird that has come across our
property in the past day. That is so
smart that Joel's using the microphones
on the cameras to identify the birds. I
never would have thought that was
possible. But what about the birds'
privacy, you know, using microphones to
listen in on the birds?
Just kidding.
Since Joel designed every square inch of
this house, he was able to add another
layer of specialty lighting that you
wouldn't normally think about but adds a
lot. Like up here, he has Hue bulbs in
outdoor casings lighting up the second
story. The wiring runs through the
gutters and it [music] looks amazing.
All right, that about does it. Thanks
Joel for letting me tour your smart
home. The reliability is off the charts
and you have so many cool fun smart
devices around your house.
&gt;&gt; Well, thanks for stopping by. It was
really cool to share it with you. Yeah,
and thanks for watching.
&gt;&gt; Mhm.
