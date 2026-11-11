---
video_id: "pHstb0JGGhE"
title: "How To Use Codex To Build Insanely Beautiful Websites Using GPT 5.6 Sol"
channel: "AI LABS"
topic: "ai-llms"
published_date: "2026-07-17"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=pHstb0JGGhE"
duration: 1521
word_count: 5520
---
In case you didn't know, we're a
software company, and we've
developed seven steps you can
use to ensure that Codex
creates websites that don't look
AI-coded, but actually
look professional and belong to
a real brand. Whether you're
completely new to
AI coding or already have experience with
it, we have something here for you. If you
've never opened Codeex before, don't worry,
we're going to start from the
beginning. And if you already have experience
with Codeex, this is not the same process
for beginners. We've found
new ways you can use to
create better websites.
Below are timestamps,
so you can skip anything you already
understand and go straight to the
newer stages. Ultimately, you'll be
able to create truly impressive landing pages and
websites, and
even sell them to clients
. So let's not waste any more time. Let
's start with the video. If you already use
Codex, you can skip this
setup and move on to the first
stage. But if you've never opened it
before, you'll need to download the
GPT chat app because Codex
is now a mode within it.
After downloading it, you'll see something
like this. Next, you need to log in
to your account. While the
free version offers very
limited use, we recommend purchasing
the $20 plus plan if you want to
compile, and that will be sufficient for your
needs. If you want to do more with it,
you can upgrade to the $100 or $
200 plan, but for now, the $20 plan
is fine. The first thing we'll do is
switch to Codeex. As you can see,
we have several projects here. To
create a new project, you can
start from scratch and name it whatever
you want. It will create a folder for you.
To start working in that folder
, just write your first notice. As
you can see, Codeex has started
working and will respond here. Now,
you can think of them as different
chats within a folder. If we open
a new chat, you can see that it creates another one
here. In case you didn't know, Codeex calls
these chats threads. Here you can see
that we have the model selector.
For this video, we are using the
latest GPT 5.6 model. If you haven't used
this setting before, effort
controls how much work the
model spends on its response. We recommend
that you always keep it between light and
high and never exceed it because it only
consumes your usage and does not actually
provide any benefit. For
speed, we recommend keeping it
on standard. These Codeex models
are comparatively faster than
other models like Claude. That's why we
've never felt the need to
switch it to fast because that also
consumes additional usage. To check
your limits, you can click on this
menu here. You'll see that we still have
81% of our weekly usage left.
Therefore, you should make sure to keep an
eye on this. Now, there is one
more thing we want to explain before we
get into the part about creation. In
case you didn't know, a
Codeex project is a real folder on your
computer. If we click here and
open the files,
all the files within that
folder will be displayed. So you'll never need to
leave the Codeex app. You'll never have to
open the terminal, and you wo
n't need to open
any IDE like Visual Studio Code either.
Let's start with the first phase. Before
Codex designs anything, it needs to know
what the website is supposed to do
. A prompt like "create a
landing page for an AI community"
gives you a topic, but it doesn't explain who
the page is for, what
that person needs to understand, or what action
the page should lead them to. Therefore,
Codex has to guess those
decisions, and even if the page
looks good, it may solve the
wrong problem. Here you can see
that we started by telling him that
we wanted to create a landing page
. You can mention that Codeex should
use Nex.js. If you haven't worked with
it before, Nex.js is basically the
system that Codex will use to create the
website. If you still don't understand what
this means, include this line.
Next, you need to define the purpose of
the landing page and what it is for
. For example, here we are creating
a landing page for an
application called Beacon, which is a
podcast analytics platform.
Next, we define what the
platform will do based on which it
generates the actual content for the
landing page. Then we have the
most important part. What is the
actual function of the landing page?
Here, the function of the landing page
is to get users to
click and join the
waiting list. This is the most
important line of the notice. Some
landing pages are for products that have already been
created. You'll usually see a
sign-up button on those pages,
but here we just want people to
join our waiting list.
Therefore, Codex knows exactly what
to create. Now, Codeex can create
a website from a single ad,
but it only knows what you've told it
within that conversation.
Therefore, when you start a new thread or
move to another section, you may begin to
make different decisions about the
same project. If you've never used an
agents.mmd file, it's basically the
instruction file that C codex
reads before working on your project. It
gives Codex the context it needs
about what you're building. Thus,
instead of repeating the same
instructions in each notification, each new
task begins with the same information
. So, in order to generate an
agents.md file, you don't have to
write all of this by hand. There is a
custom command built into
Codeex that you can use. Just
type a forward slash and it will give you
a bunch of options. We're going to cover
the important options in this video
, so you don't need to start
thinking about all of them right now.
Below, you'll see that we have the
init option. Once
you select it and press Enter, it will give
CEX this notification. With this, Codex will create
an agents.md file and include all
the context we gave it in the
initial notification. If you want to see the file,
you can open it. You'll see that we have
many files here. This is because
the project has already been created. But don't
worry, we'll guide you through
all the stages one by one. If
we open the agent.m MD file, you can
see that it contains basic information
about how Codeex should work, along
with important details such as the
project structure and
folder organization. Basically
, Codex has listed all our
important information in the
right places. For example, you have written
here that this folder contains the
next.js home page for the
Beacon website. Further down in the
file, he has also listed all
the other details. Another
important thing is that you must tell
Codex to add an instruction at
the top stating that
whenever Codex can perform an
action by itself, it should do so.
This includes launching the application and
verifying that it has been created
correctly. We'll come back to this
later, but the reason is that these
Codeex models have a flaw.
Although they have improved a lot with the
launch of the latest models,
they tend to ask you to do things for
them, even though they can
do them themselves. Adding this instruction at
the top of the
agents.mmd file helps Codeex work
autonomously. This way, you don't have to
constantly supervise it.
Now that Codeex knows what we're
building, the second stage is to
provide them with a reusable set
of design instructions. If you haven't
used skills before, they are
basically instruction files
that Codex reads each time it performs a
specific type of job.
Therefore, instead of explaining the same
web design rules in each application
, you save them within a skill and
Codeex loads them before you start
designing. This is important because a
better model doesn't automatically provide you with
a unique design.
Even without additional instructions,
the model can generate a
pretty good website from a brief
request. The problem only becomes
obvious after
enough of it has been generated. The content changes, but
the same design language keeps
appearing. And as thousands of people
create websites using the same
templates, that design language
begins to appear everywhere.
This is what they call AI garbage.
A website may look good on its
own, but it still gives the impression that it
comes from the same template as
all the other AI-generated websites
.
Anthropic's original interface design skill was created
to avoid
older AI design defaults, but
newer models already avoid
many of those options and have
developed a different visual style
that the original skill doesn't
account for. For this website, we used the
GPT tastes design skill.
It provides Codeex with
updated rules for the entire
visual system and moves it away from the patterns that
newer models now repeat.
Now, the GPT taste ability comes
from this set of 13 skills. While there are
many skills, the one that is best
to use with GPT models is the
GPT likes skill. If you're
using any other model,
you can also experiment with the
rest. Adding it to the Codex is quite
easy. You just need to run this
installation command, copy it,
go back to Codex, and tell it to
install it for you. You can see that he
installed all the skills first. Now,
before you can use them, you have to
leave Codeex and return to this chat.
Since it's a thread, everything will be
saved and you won't lose any of your
work. After that, you should
reference the GPT taste skill
in Codeex. Type the command/and type
the command name. Once
you press Enter, it will be inserted into your
indicator and C Codeex
will basically read everything inside the
skill. Now, you can see that
after adding the ability,
we told it to start the build and
specifically told it not to
use the site ability. If you haven't
used the site's skill before, it's
OpenAI's replacement for
Anthropic's front-end design skill, and it copies many of the same
concepts. But we've experimented with
it and it doesn't really produce good
results. Therefore, we
recommend that you stay away
from it and specifically tell
Codeex not to use it because it will use it
by default if you don't
mention it. You can also ask it to
write in the agents.md file that it
should never use this ability for
design. We say specifically for
design because there is another use for this
skill that we will see later in
the video. After that, he's basically going
to build the entire website.
You can see that it worked for 17
minutes and built the entire site.
Once the site was built, he
gave us this link. If you've never worked
with a local website before,
local hosting means the link only
works on your computer. If you
share it with another person, they will not be able to
open the website you just created.
But don't worry, we'll talk about
that later in the video. To
preview the site, you don't need to
leave Codeex. You can open the
side panel and here you'll see that you have
a browser. Simply enter this
link there and you'll be able to see the site it
generated for us. This is the site it
generated and, honestly, it looks
really cool. The animations
are well done and not deficient
. There are a few minor issues that
we will correct in
later stages, such as
stock images, some animations that are
too poor, and another problem
that we will mention later. But
something we want to mention is that,
because we clearly defined what
this site was for, it precisely configured
the user journey. First, he
gave us the product presentation. If
we had a real product, we
could show it here too. Then he gave us
these smaller charts, which
also look really amazing.
And finally, by clearly specifying
that it was a lightweight landing page,
a call to action was created for
users to register beforehand. The
third stage is browser verification
. A website can function
correctly and still have
visual problems because
working code doesn't mean the
finished design will look good.
Browser verification provides
Codeex with real-world site feedback,
allowing them to detect bugs that only
appear when the page loads on
screen. This is also one of
Codeex's strongest areas. If you
've never heard the term
computer use before, it's basically the
model's ability to understand and
interact with what's on the
screen. GPT models are the most
robust for computer use.
So, in our tests,
Codex's browser verification has
been much more reliable than what we
've seen from other
coding agents. However, we didn't have to
manually ask it to verify
that everything on the landing page
looked correct. This is because in
the agents.md file we already told him that he
should perform the verification
himself. That's why he didn't ask us to do
anything. If we scroll
down, you can see that he used the
browser several times to
inspect the website. It did not find
any errors, so it did not edit
any files during the
browser verification. Yes, he edited
some files here, but they were
code-related changes
that you don't need to worry about. Another
thing it does during
browser verification is check
responsiveness. In case you didn't know,
responsiveness is
basically how well the website adjusts
to different screen sizes.
For example, if we stretch it out, which is
how it will look on a desk, you can
see that it looks great. And if we
zoom in, which is how it will look on a
mobile device, you can see that
Codeex has taken care of that
automatically. Normally, you had to
ask the models to make the
site responsive. You no longer need to do
that because it's handled
automatically. But as a
quick test, you should drag the window
and make sure everything responds. If
any element is unresponsive, you can
take a screenshot and
give it to the model. There is a
tool called the
annotation tool, but we found it to be very
unreliable and not very useful, especially
when you zoom in. Therefore, we only use
the screenshot method and
we would say it is the best option at the
time of recording. Perhaps
this feature will be improved later and you'll be able to
start using it. And if you're
enjoying the video so far,
subscribe to the channel and hit the
Like button. This small gesture of support
helps us a lot. The fourth stage
solves the other problem we
mentioned earlier. Even after
using GPT's tastes ability, the
website continues to use the
same types of colors that
GPT models use in other designs. The
skill improves the
overall design decisions of the model, but it does not
give this specific brand its
own visual identity. If everyone uses
the same model with the same skill,
the results can start to look
quite similar. This is where
design.md comes in. In case you didn't know
, Google introduced the design.md format
through Stitch, which is its
AI-powered design tool. A
design.md file is basically an
instruction file that contains
the complete visual system of a brand
. It gives the model a
specific design direction to follow
instead of letting it choose from its
usual default values.
Therefore, GPT's taste ability
teaches Codeex how to make better
design decisions in general,
while design.MD tells him how
this particular website should look
. This is an example of the
problems we face
here. You know that
design skill created this website, but without
it, GPT 5.6 was able to achieve it.
However, it's a pretty
good website even without all that glitz. But
you can clearly see that many of the
elements have been reused,
especially the
color scheme. This green color and this
purple color have been reused quite a bit. The
design skill used
the color purple a little less, but it still used it. That's why
design files are so
important. Now, the question is
, where do you get these
design files from? There are many resources
available. One of them is called
getdesign.md and it has a lot of
designs from different people. You can
get design systems from
Claude, Cursor, Discord, and other
well-known companies. But we really like
this design.md collection from Aura
Build, which is actually a
website builder. But they also have this
free library, design.md. You can
scroll down, click on
the most popular ones, and you'll find these
amazing design systems. It's not
like this is going to change the design
or style of your website. Instead,
apply elements such as spacing,
colors, and other design details that
give your site a
completely different look. That's why
we downloaded this design.md file.
Just click on this
button and it will download to your
downloads folder. Next, go to CEX,
click this button and attach the
files or folders you want. You can
see that this is the file
we downloaded. After attaching the file, we
instructed Codex to create
a design.md file in the project,
copy the contents of this file into
it, and then redesign the
site according to that
design.md file. We specifically instructed them
that the structure,
design, and animations should not be
changed. Because something important is that
the GPT flavoring ability we
installed is really good for
animations. Actually, there's no
need to do anything else
regarding the overall
page animations. She handles most
of them on her own. And you can
clearly see that they look great together. And you
can see that, once finished, he
indicated that he had created the
design.md file and that he had applied the
visual system to our
beacon platform. Now you can see that the
design and structure remain
the same and have not changed,
but the
color scheme has been completely changed and the site has a
totally different look. If we
compare it to the original greenish design
, it doesn't look like it was
generated with one of the GPT models. That's why
having a design.md file is so important
. One more thing before we
move on to the next stage.
Whenever we create landing pages
or even entire applications,
we use phosphor icons and
add them to the agents.md file so that
whenever CEX needs to create something
new, they can use them. This is our
favorite icon set because it's
truly minimalist and looks great.
Although it's mainly used in
small places like arrows, in our
opinion it's still the best
icon set out there. But before we
move on to stage five, let's talk to
our sponsor. Let's talk about
how I launched an e-commerce store
ready to accept
real orders in just minutes without spending
weeks on setup. I pasted a
link into Copify and minutes later
I had a fully active Shopify store
. Product descriptions,
text, design, all generated by AI and
ready to convert visitors into
buyers. A real showcase,
fully stocked and
professionally designed. That is the real
victory. Not just having a store,
but having a business-ready store
that generates money before your
first sale. That's exactly
how it happened. I clicked Connect to
Shopify directly from the store's AI
and everything was published instantly.
Then, I added more products to the
same store and created a second
complete store from a totally
different link in just minutes. No
manual setup or
design work is required. But this is what
makes it truly powerful. AI Chat
offers you proven marketing angles
for each product, and Creative AI generates
real ad creatives to
sell. Everything you need to
run a profitable,
conversion-generating store is already integrated
and ready to go. Go to the link in the
pinned comment and launch your store.
Now, the fifth stage solves another
problem we pointed out earlier, which is
the stock images. The
design file has given the website its
own visual system, but the
stock images do not yet belong
to that system. They can fill the
empty space, but they rarely match the
exact brand. This is another reason why
AI-generated websites look
assembled rather than designed. This
is where the original GPT images come into play
. Codex already understands the
product through the
agents.md file and understands the
visual direction through design.md. In this
way, you can use that context to
generate original brand images
with the GPT image model and add
those files directly to the website
. What you need to do is tell it to
create a resources folder and
link it in the agents.md file as well
. This folder will contain
all the resources generated by the
GPT models or anything else we
want to add to the
landing page ourselves. For example, if
we want to use our own
custom images. After
that, we told him he had to
replace all the
stock images on the landing page. These
are the important things you need to
mention. You need to tell them that
the images must match the
design and content they are intended to
represent. In this way, it not only
generates random visual elements. It
generates visual elements that are
truly relevant. Here, we asked him to
generate illustrations for
us, as there was a higher
probability that he would make mistakes
in this task. And, above all, if you have
the $20 plan, in which
image generation may be
limited, we
strongly recommend that you activate
plan mode first. If you haven't used
planning mode before, let
Codeex determine what needs to be done
before changing the project. You don't
need to mention it in the notice.
Simply click on this button.
After that, he will not touch any
code or make any changes to the
website. Instead,
he will first develop a plan and then generate
the images. We reviewed the plan,
told him everything looked good, and then
asked him to implement it.
After that, he generated these
images and you can see that they match
the website design very well.
If you're wondering why some of
these images are different from the
previous ones, you'll find out when you see
where they were placed. He also added
instructions to the agents.md file
about where the
image files should be placed. If you look inside
the application folder in the
public folder, you will find the
resources folder. Whenever
you need to add images,
simply place them there and
tell Codeex what to do with them
, and it will add them to your site. As for
the final result, this is what
we obtained. And you can see that these
illustrations look truly
amazing. It's not just about matching
the website design. They also
match the descriptions
written under the cards. That's
the advantage of using these
custom templates to generate images.
Aside from that, you can see that he also
placed these images in this
animated section. If you're wondering
why the last three images were
different, it's because he generated these
avatars for the testimonials.
Honestly, they look really, really good. The
sixth stage is to improve the design with
visual inspiration. At this point, the
website has its own
original design system and images, but
Codex still decided where everything should go
using the
design patterns it already knows. Thus, the
colors and images may appear
original, while the structure
feels like a standard
AI-generated page. This is most noticeable in
the hero section because it's the
first thing people see. The design
is also difficult to explain
with text alone. So, giving Codex a
visual reference shows it the type of
composition we want. The goal
is not to copy another website. It's about
using design as
inspiration, while maintaining our
own brand and content. So,
where do you get your inspiration? One of
the most common places is Pinterest,
where you can find a lot of
inspiration for whatever you're
creating. For example, we look for
featured sections for
SAS applications because that's what we're
creating and we have many
different designs here. This one is really
interesting, and you can see that we also
have similar designs.
Therefore, this is a great place to
get inspiration. Aside from that,
we have awards that showcase some
truly amazing websites. If
you go into their directory, you can
find some truly
impressive designs. These are some of
the best places to get
inspiration if you're not happy
with the design the model has generated
. In our case, as you already saw,
most of the featured sections we
found on Pinterest for
SAS applications looked very
similar. Honestly, we're
happy with this, so we're not
going to change it, especially this
section here. It looks really great
and clearly shows all the
features the
app has. But if you're not
satisfied, you can always give the
model a screenshot of another
design and ask them to recreate it
. The seventh and final stage involves
improving the individual parts of the
website. If you've never worked with
components, a component is
basically a reusable part of
the page, like a button. At this
point, the overall design is already in
place, but some of these
smaller parts may still look
generic. Instead of asking
Codeex to redesign the entire website,
we can replace only those parts with
components created by other
designers. This gives us more control
over the smallest details without
changing the direction of the design we
have already created. There are many places to obtain these
individual components
. One of them is 21.dev and it has both
free and paid components. Apart
from that, there are divine and
sophisticated components. They all offer
components for specific parts of
your application. For example, we have
this
liquid crystal navigation switcher, this background for a
heroes section, and this
navigation expander with a smooth animation.
There are many things, and anything you think would
improve your application,
you can add. For example,
we only believed we could improve the
landing page in one way, which was by
improving the background of the
hero section. So at 21.dev, we found
these backgrounds called shaders. And
we really liked this one. We thought it was very
good. All you have to do is
copy the prompt. It contains all the
information necessary to apply it.
Give the prompt to CEX and tell him to
apply it to the hero section.
We specifically asked him not to use
the skills because he would be using an
optimization skill that we'll
talk about later. After
that, he applied the change and then we
asked him to tweak the colors a little
. This is the final result
we achieved and, honestly, it looks
truly amazing. It's a big
improvement over what we had
before. Now, you can see one thing
when we navigate through the application, it
feels very slow. That's due to the
amount of heavy animations it
has. It's not that you need to remove
these animations. You just need to
optimize your site so that it loads
quickly. To do this, you just need to
ask the model to optimize the site,
and that alone can solve
most of your problems. But we've
created a custom skill to
optimize landing pages with a lot of
animation. Since it's a skill,
you can activate it with the slash command.
After that, it took quite a while,
and you can see the metrics showing
how it reduced a large part of the latency
on the website and made it much
faster. This is part of our
AI lab design system that we employ when creating our
products and working on
customer projects. You can see that the
optimized skill is right here. And we have
many other skills that we use throughout
our
design process. This custom skill,
along with other resources, can be
found in AIABS Pro, which is our
community. That's where you'll get
resources, starter packs and more
, along with a place to interact
with lots of like-minded people
, including our team. So
, if you found value in what
we do and want to support the channel, this
is the best way to do it. The
links are in the description.
Now, before we continue with the
implementation so that anyone on the
Internet can see it, we wanted to give you
a little advice. If you've never used
Git, it allows you to create
local commits, which are basically
checkpoints for your project. You don't need to
register for anything to use them on your
computer. For example, here you can
see that we asked Codecs to make
a local confirmation. He created the
confirmation and gave it a name. What it does
is create checkpoints that you
can return to if something goes wrong.
You can see that we created this entire
website and have been using these
checkpoints to go back and show you the
different stages of the project. Right now
, we are in the
final confirmation stage, where the website is
complete. Then, you just need to
ask Codeex to make
local confirmations and it will know
exactly what to do. It will also
give you the name of each confirmation.
You can even ask it to list
all the confirmations if you forgot
their names. And then you can
easily revert to any of them if
Codeex makes a mistake. The website
is finished, but right now it only
works via localhost, which
means it can only be opened on your
computer. If you've never implemented a
website, implementation is
basically the process of putting it
online so that anyone can
visit it via a regular link
. Previously, implementing a website
involved creating a Versal account and
connecting the project through
GitHub. The process worked, but it
involved several independent steps.
Now Codex makes it much easier
through the site ability we
mentioned earlier. We don't use it to
design the website, but we can
use it to publish the
finished project directly from Codeex.
Simply click this
plus button, add the
site skill, and ask it to implement the site
for you. It will take some time, and then he
will implement it. Now, before
you visit the site, you can view this
separate section of the site in the
sidebar. Open it and this is where
you'll find all the sites you've
posted through the GPT chat. For
example, this is the old site
we designed using the site's capabilities
. That's why we asked you not to
use it, because the design is very
basic and it didn't satisfy us at all
. This is our second site
. If you click the
share button, it will initially be
set up only for me. Trade it to
anyone on the internet and
post it. Then you can copy the
link and send it to anyone, who
will be able to open the site and visit it. Since it
's already implemented, you can also
visit it yourselves. If you want to
use your custom domain,
just go to settings and
you can add it there. It will guide you
through the entire process and you can
implement a landing page for
yourself or for a client through
the Codeex application in just a few
simple steps. This brings us to the
end of this video. If you'd like to
support the channel and help us continue
making videos like this, you can
do so by using the thank you button
below. As always, thanks
for watching the video and see you in the
next one.
