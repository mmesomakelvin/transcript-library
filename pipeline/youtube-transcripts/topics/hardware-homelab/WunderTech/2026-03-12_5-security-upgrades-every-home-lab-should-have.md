---
video_id: "s53RoGddF6Y"
title: "5 Security Upgrades Every Home Lab Should Have"
channel: "WunderTech"
topic: "hardware-homelab"
published_date: "2026-03-12"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=s53RoGddF6Y"
duration: 813
word_count: 2185
---
Home labs are awesome, but they're also
the kind of setup that can quietly turn
into a security mess if you're not
careful. Most people start by getting
services online and only think about
security after something breaks or
worse, gets exposed. In this video, I'm
going to walk through five practical
changes that will immediately make your
home lab harder to compromise, easier to
recover and safer to run day-to-day.
These aren't enterprise only ideas or
complicated overhauls, just real
improvements you can implement without
turning your lab into a full-time job.
Quick disclaimer, security is never
guaranteed and it's always changing.
This video is general best practice
guidance for home labs. You should
always use your own judgment and test
changes in your environment. Before we
get to that, I want to thank today's
sponsor, monday.com. I've been running
Wonder Tech for over 5 years and the
biggest problem I ran into wasn't
hardware, it was process visibility.
Video ideas were coming in from multiple
places, sticky notes, texts and
different apps, but I had no centralized
system to track state, priority,
deadlines or where a video was getting
blocked. For that reason, I built a
production pipeline in monday.com. I use
a board with status, priority and due
date columns, then switch views
depending on what I need. Kanban for
stage-based workflow and
timeline/calendar
views when I need to check scheduling
and publishing windows. That gives me a
single source of truth from idea to
published instead of managing everything
across disconnected tools. I also use
automations to standardize intake and
status updates, so every new video
follows the same process path without me
rebuilding it manually. And the AI
features help in pre-production. I use
monday.com AI to summarize rough notes
and improve planning text so I can clean
up inputs before I start filming. The
result is better visibility, fewer
bottlenecks, and a much more repeatable
workflow. If you want a more technical
way to manage your projects, my viewers
can try monday.com for free by using the
link in the description or pinned
comment. Thanks again to monday.com for
sponsoring this video. Now, let's get
back to it. The first is the most
obvious, probably the easiest to
implement, and also something that will
immediately increase the security of
your home lab, and it is to stop
exposing stuff to the internet. Exposed
admin portals are the number one
avoidable mistake that you can
immediately implement to ensure that no
one outside of your local network can
access any of your services. To ensure
that everyone outside of your local
network cannot access anything
internally, you should audit your port
forwards and delete anything that you do
not need. You should also disable UPnP
if you can. UPnP will automatically port
forward on your behalf. What that means
is that for certain devices, like a NAS
device for example, if UPnP is turned on
and you perform the correct set of tasks
on that device, it can and will port
forward on your behalf. That means that
potentially there are devices on your
local network currently that have
automatically port forwarded on your
behalf by utilizing UPnP, and they're
possibly services that you are not even
aware of. So, it is best practice
generally to disable UPnP if you can.
So, if all of your port forwards are
removed, what is the best and safest way
to access your local network? And it is
generally by utilizing a VPN. With that
said, from a VPN perspective, you are
increasing security and limiting
accessibility. If that is a problem to
you, you can utilize something like a
zero trust network. Depending on the
type of zero trust network that you use,
you can put yourself in a position where
you have increased accessibility
compared to something like a VPN, but
also increased security compared to
something like port forwarding. There
are various zero trust networks that you
can use and implement. And the idea
behind them is a zero trust network is
designed to give you access to exactly
what you need and nothing more. A
traditional VPN will in essence give you
access to everything on that local
network, where a zero trust network adds
an additional layer of security on top.
If you must port forward, there are some
guidelines you can follow to also ensure
you're following best practices.
And it generally involves increasing
security from an authentication
perspective, meaning to utilize
two-factor authentication if you can, or
even better, passkeys, which we'll talk
about later. You can ensure that a
firewall is configured to limit access
if possible, and ensure that the
security patches for that device are
always updated as soon as possible. Next
is properly segmenting your network, and
this involves creating multiple VLANs.
So, the reason to do this is because if
you were to assume that some device was
to get compromised, you can ensure that
it will not be able to access your
critical services. An example of this
would be if a security camera or an IoT
device was compromised, if they were on
their own VLAN, you would be able to
ensure that they cannot access your NAS,
which holds your sensitive data. To do
this, there are some baseline VLANs that
I suggest everybody implements, and I
generally create a trusted VLAN, an IoT
VLAN, a guest VLAN, and if I have
security cameras, a surveillance VLAN.
Those are four VLANs that you can
isolate entirely and ensure that all of
your sensitive devices cannot be
accessed by anything that is not
generally something that you consider to
be secure. With that said, VLANs don't
tell the whole story. So, you have to
ensure that while you have VLANs, you
have firewall rules in place that deny
traffic between those VLANs. There are
various different routers and firewalls
that you can use that will limit access,
and there's not necessarily one that is
better than the other. But, what you
must ensure is that depending on the
types of VLANs that you have, that the
devices that are not considered trusted
cannot access your sensitive data. And
for situations where you do have to
allow access from VLAN to VLAN,
punch a hole rather than allowing entire
device access. So, what I mean by that
is if you have an IoT device that has to
access your NAS for whatever reason,
ensure that it can only access the NAS
on the port that it is using and all
other traffic is blocked. That is
something called punching a hole. You're
allowing access to one port on one
device from one device, rather than
allowing full device-to-device
communication. The next is to practice
least privilege. Breaches generally get
bad when a device that has been
compromised has admin access. You can
easily get around this by separating
your admin and {quote} {unquote} user
accounts. What I mean by that is if you
have a NAS device, have a dedicated
admin account that you use to access the
NAS management console, then have a
regular user account that you use to
access the SMB shares on that NAS
device. This ensures that you're
separating admin access from your
regular user account. Next is that you
shouldn't grant broad permissions. So,
what I mean by that is if you have a
folder that only needs access by one
person, don't go through and grant
everyone access to that folder just
because it's something they can
technically see. If you can, ensure that
your permissions are configured in a way
that users that actually need access to
that folder have permission, but
everyone else is denied. This philosophy
extends everywhere. So, if you're
running something like a Docker
container, don't run it as the root
user. Ensure that you're configuring the
container properly to be able to access
the resources that it needs to access,
but not anything more. There's also
additional security that you should add
to your user accounts, which we'll talk
about a little later. The overall goal
here is just to ensure that when you
sign into account, the blast radius is
smaller than if it was to be able to
access everything. Limit access for all
of your users, and that will overall
increase the security God forbid
something was to happen. The next is to
implement strong recovery.
So, in general, security is recovery.
What I mean by that is ransomware's goal
is to destroy recovery points. If you
have multiple recovery points that a
compromised device cannot access, you
have security in recovery. You can
recover from that situation God forbid
it was to happen. The way that you can
do this is on devices where ransomware
attacks are rampant. You want to ensure
that you have snapshots configured. If
you can, meaning if the device supports
it, you want to ensure that you have
immutability or a retention lock turned
on. This will ensure that those
snapshots cannot be deleted. The next is
to separate credentials for your backup
system and also use pull if you can as
opposed to push. So, generally there are
two ways to do backups. You can push
backups from your local device, from
your local NAS, to a secondary NAS or
you can pull backups from your secondary
NAS from the data that exists on your
primary NAS. Now, I have a video for
this that I will leave a link for in the
description. The whole goal behind this
is that if you're taking a backup of
your NAS device, that the source NAS is
not really aware of unless it was to go
through and check logs and stuff like
that. You have a pretty good recovery
point because the source NAS should have
an entirely different set of credentials
than the destination NAS. So, God forbid
that source NAS was compromised, the
secondary NAS, even if they knew it
existed, one it would have different
credentials and two, it would have a
pull replication or a pull backup,
meaning that you could not delete that
data from that source NAS that was
compromised. It is also best to ensure
that you have an offsite copy of your
important data. So, that could be an
entire replication of your NAS or it can
just be backing up to a cloud location
that has a separate retention setting on
that side to ensure the important data
is being backed up regularly and you
have a safe restore point. Finally, the
one that is also one of the easiest
things to implement is to use strong
authentication everywhere. This can be
either a strong password with a password
manager and multi-factor authentication
or in a better case, passkeys if
whichever device or service you're using
supports them. With a password manager,
you can set unique passwords for
everything. This ensures that even if
your username is the same, every
service, every device has a different
password. So, if one gets compromised,
nothing else can be accessed. Next, for
anything that is admin account related,
you should always have multi-factor
authentication turned on. This ensures
that if the password was compromised, a
second factor is required in order to
access the account. Passkeys are the
future and they replace something that
you know, which would be a password,
with something that you have like a
device and some form of authentication
like your face or a fingerprint. They
can't be fished, they're resistant to
data breaches, and they exist on your
device rather than just being something
that you know. Passkeys are not only
more secure, but they're also more
convenient. In my opinion, any service,
whether it's in your home lab or outside
of your home lab, that supports a
passkey is something that you should
implement immediately. So, to recap
everything, in general, if you follow
these best practices, you will increase
the security of your overall home lab.
This does not mean again that it's
impossible to have some sort of a
breach, but you are following best
practices and ensuring that God forbid
something was to be breached, it is not
going to be able to access other
services or compromise any of your data.
So, I know that this was a lot and there
are a lot of different devices that you
most likely have. So, I tried to keep
these general that can apply to multiple
different systems, but I'm hoping you
got some value out of this. If you have
any questions, feel free to leave those
in the comments, but other than that, if
you made it this far, thank you very
much for watching. I'll see you guys
next time.
