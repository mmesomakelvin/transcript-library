---
video_id: "tFyKaGP64M4"
title: "How To Create Stunning AI Image Ads with AI (Claude Code + Nano Banana 2)"
channel: "Mike Futia | SCALE AI"
topic: "ai-llms"
published_date: "2026-03-13"
ingested_date: "2026-07-05"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=tFyKaGP64M4"
duration: 1078
word_count: 3432
---
In this video, I'm going to show you how
you can use Nano Banana 2 and Claude
Code to create AI static ads like this,
this, this, and this all in one shot.
So, before we even get into the video,
full credit here to Alex Cooper. I saw
his video pop up yesterday on how to
create unlimited image ads with AI. So,
this was more of a manual process copy
and pasting prompts back and forth with
Claude, copy and pasting prompts back
and forth with Higgsfield, but he got
really good results. So, I thought can
we automate most of this process inside
of Claude Code? And the answer is yes.
So, in this video, we're going to use
Alex's framework, we're going to use his
prompts, and we're going to create a
system where we can generate these at
scale inside of Claude Code. Now, I
created a full step-by-step playbook
that you can follow and paste into your
own Claude Code. If you want to get this
set up yourself, you can opt into that
below, but in this video, we're going to
do it step-by-step. So, we're going to
be using Google Anti-Gravity, we're
going to be using Claude Code, we're
going to be using Fau AI to generate the
images with Nano Banana. So, let's get
started. So, on my desktop, I'm just
going to create a new folder. Let's call
it static ad generator. And now, we can
kind of link this project to
Anti-Gravity. So, I'm inside Google
Anti-Gravity. Let's click on open
folder, and then let's grab this static
ad generator folder, which is empty. So,
let's open that up. All right, so let's
actually access Claude Code in here. I'm
going to go up to extensions. You can
see Claude Code is already up here for
me, but you can search for it in the
marketplace if you want. Let me click on
that, and then I'm going to click on the
icon here, drag it up here, X that out.
All right, so now, we are working inside
of Claude Code. All right, so let's have
Claude help us kind of set up the
project folder here. So, I'm saying
create a project folder, I need a skills
folder with a references subfolder and a
brands folder at the root. So, let's
send that off. Again, we just want to
set up the project here so we can kind
of dump our files in here. All right, so
we can see in the sidebar here when we
open this up, we've got our brands
folder, we've got our skills folder and
under skills we have references. All
right, we're going to start with a
skills file here. So, we're going to ask
Claude to create a file called
skills.md.
And then we're going to paste in a a
long document that I'll walk through
that talks about Alex's
process. And so this is basically going
to be the brain behind this entire tool.
So, it's going to have the full brand
research prompt, the prompt generation
instructions, and details on how to
actually generate the images using the
Fowl API. So, let's just send this off
to Claude. It's going to create that
file and then I'm going to provide it
with the actual document. All right, so
here is the skills file that we're going
to give Claude code. Don't worry, I'll
leave a link below this video where you
can access this. So, let's just kind of
walk through very quickly what we're
doing here. So again, we're doing three
phases here. Again, this is fully
following Alex's framework with the
brand research, then the prompt
generation, and then we're also going to
do the image generation within Claude as
well. There's no need for Higgs Field
here. We're outlining the folder
structure and here are the three phases,
right? The brand research and DNA
generation. Here is phase two, which is
the prompt generation, and then phase
three, which is the Fowl API. So again,
we're using this to call the Nano Banana
API instead of using Higgs Field so we
can do everything inside of Claude. And
so these are just instructions for how
Claude is going to use Fowl AI to
generate the images. Then we've got the
user interaction flow. So, how should
Claude interact with the user who's
using this tool? What does the user need
to provide? And then some key technical
notes. So, I'm just going to copy this
entire thing to my clipboard. Let's go
back to Anti-Gravity. I'm going to paste
that in and now Claude is going to use
this to create the skill or fill in the
skill. All right, so Claude has finished
up. You can see it says that it's
written that skill. So, if we open up
this skill folder and go to the skill.md
file. So, here is that entire document
that I showed you in my Google Docs
inside of Claude, right? So, now Claude
has this as a skill and it knows how to
run this process end to end. All right,
so now Claude has the process. What we
want to provide next are those 40
templates. Credit to Alex. I'll show you
his Notion page here. So, first let me
just handle the prompts and I'm going to
ask Claude to create a new file in the
skills folder called template prompts,
okay? So, I'm going to say, "Hey, create
that folder or create that file." I'll
paste in the actual document. So, let's
follow the same flow. We ask Claude to
create the file, then we'll provide it
with the content, right? So, it says
it's ready, paste in the contents. Now
again, full credit to Alex's video here
for these prompts. He left them below
his video. This is actually from his
Notion. I'm just going to paste this
entire thing in. Right? So, these are
the prompts for the 40 different ad
concepts. So, I'm going to copy this.
Let's go back to Anti-Gravity. Let's
paste it in to Claude code. And now what
it's going to do is create that new file
with all of these prompts. So, now
again, we're building this out with
Claude. All right, it understands the
process and now it's understanding the
40 different prompts that it can use for
these new concepts. All right, so you
can see that Claude created that file
under references here. So, here are
those 40 prompts, right? So, now it has
access to all of these prompts and can
use them in our workflow. All right, now
let's talk about how we're actually
going to create the images. So, in
Alex's video, he used Higgs Field. I I
used Higgs Field as well, but since
we're using Claude code, we want a
reliable API to generate these images
cuz we're not going to be creating them
manually in the Higgs Field interface.
There's many many API options. I prefer
Fal AI. I just think it's a nice
interface. The docs are very easy to
understand. There's other options. You
can use other options as well. So, what
we're going to do is try to see if
Claude can create a Python script or use
a Python script, which is going to call
the API for Fal AI, right? So, it's
going to send our prompt. It's going to
send our reference images to this Fal
API to get the images back. All right,
so again, the first thing that we want
to do, let's just have it create uh that
file first and then I'm going to paste
in the actual Python instructions or the
Python script that Claude itself
generated for me in another terminal.
All right, just so you can see it on my
screen. This is the Python script. I
have no idea what any of this does.
Again, Claude separately created this
for me. I just want to show you kind of
on screen what we're using. Again, all
of this will be available at the link
below where you can access it. But, this
is going to be and I have not tested
this yet. This is going to be the the
Python script we're going to give to
Claude code so it can create the script,
which will actually generate the images.
So, let me just select all of it. Let's
go back to antigravity. Same idea. Let's
paste it in. All right. So, let's have
Claude now create that file with the
Python script, which we're going to have
to test and see if it actually works.
All right. So, Claude has created that
file up here. So, this is that Python
script in the generate ads.py file. All
right. So, the next thing I need to do
is provide Claude with my API key for
Owl, so it's able to actually use my
account. So, first I'm going to try to
replace this myself. I could have Claude
just do it, but I believe it's this line
right here. So, I'm going to replace
this text with my actual API key. All
right. Now, let's talk about the actual
brand that we're going to do this for. I
take these electrolytes almost every
morning from Element. So, let's use this
as an example.
So, let's go back to Claude. And again,
what we're going to do is we're going to
save, I don't know, at least one image
from Element to Claude code as kind of a
product reference, right? So, we'll be
using this image in our static ads that
Claude helps us create. So, back in
Antigravity, let's say create a new
brand folder called Element with a
product images subfolder inside of it.
So, in this brand folder up here, we're
going to create that new Element product
images. All right. That's done. So,
let's go back to the Element page.
Let's open this image in a new tab. All
right. So, let's just copy this image.
Go back to Antigravity.
Paste that image in there. Let's see if
there's any other ones on the Element
page that would look kind of just the
product. It doesn't actually look like
they have. All right. This is a decent
one. Let's grab this one as well. Go
back to Antigravity and say, "All right.
Please save these two product images to
that folder. All right, Claude doesn't
want to save the images for us, so we
can just drop them into the project
folder directly. So, I've got the image
pulled up and I'm just saving it
directly to my desktop in the product
images folder. So, let's save that one.
Let's go back to the second one, same
thing. Open up image in a new tab, right
click, save as. And again, we're in the
product images folder, so let's save
that. And now we can see in anti-gravity
we have those images saved. Now, I do
notice they are .avif
files. That might be an issue for
Claude, but we'll figure that out. So, I
think the file API is going to have an
issue with those file types. Let's see
if Claude can convert these files to
PNG. All right, cool. We can see it
happening at the top. It kind of cloned
it and then we can see we have the PNG
files up there and now it removed the
.avif files. All right, perfect. So, we
converted those to PNG. All right, at
this point we have the architecture in
place. We've got the brand elements in
our folder. We've got the skills built.
We've got the Python script built. We
haven't really tested anything. So,
let's start working. So, I'm going to
say, "Hey, read the skill file at
skill.md." Then run phase one for
element. The brand URL is XYZ. The
specific product is this electrolyte
drink. So, what we're going to say is,
"Build the brand DNA document and save
it to brands {slash} element." So, this
is again step one of Alex's process to
build the brand DNA. Let's see if Claude
Code can do all of this on its own. All
right, so it's coming up with a to-do
list. It's going to read the skill file.
It's going to research element, get the
design, the font, the colors, and
packaging. So, it's going to search the
web. This may take a few minutes to go
out and find all of these things. Now,
if we wanted to get a little fancier,
you know, we could have plugged in an
API, maybe like Perplexity or even
Firecrawl, but let's keep it simple and
use the native Claude web search. All
right, so we can see that Claude has
finished the research, the design, the
font, color, and layout, all that stuff,
the advertising style. And now it's
going to generate that brand DNA
document. All right, so Claude has
finished up here, and if we go into the
project under the brand DNA, we've got
this nice document that it created here
about the brand overview, the visual
system, photography direction, product
details, all this good stuff that we're
going to need when we're generating the
prompts for the images. All right, we're
ready for phase two, and what this
prompt is going to do, I'll paste this
in in just a second. Claude's going to
take the brand DNA document it just
created, and it's going to merge it with
those 40 ad templates to create the
finished prompts, right? 40 finished
prompts specifically for Element. So,
I'm going to say, "Hey, run phase two,
read the template prompt files and the
brand DNA, fill in all 40 templates with
Element-specific details for the
electrolyte drink, save the output as
brands_element_prompts.json." So, this
may take a second. Again, it's taking
those
40 template prompts from Alex, which
have placeholders in them, and it's
going to fill in those placeholders with
the research that it just did on
Element. All right, that took a few
minutes, but Claude has finished up.
Phase two is complete, saved all 40
prompts. So, if we go into this prompt
document, you can see it's filled in all
of the templates, right? So, that first
template is the headline. Now, we have
the prompt here that is specific to
Element. You can see it's got their
brand colors in here, their font, right?
And it's doing this for all 40
templates, filled in automatically in
one shot. All right, now is really the
moment of truth. We are going to test
the image generation, right? Up until
this point everything has been
text-based, which is easy enough.
So, let's test the image generation with
a couple a handful of these templates.
So, I'm going to paste in a prompt here
that says, "Hey, now run phase three,
but only for templates 1 7 9 13 and 15.
Read the skill file, then copy the
Python script, and then run the script
with templates 1 7 13 9 and 15 against
the element brand
using the product images in the element
folder, right? So, again, Claude has all
of this context now. It's got the
product images. It's got the brand
document. It's got the prompts for Fal
AI for Nano Banana. Now, we're asking it
to execute that Python script. Again, I
have not tested this script yet. It's
possible we'll run into some errors, and
hopefully Claude will be able to figure
it out. All right, so it found an error
in one of the prompts because there was
a quotation mark. It's going to try to
fix that. All right, so Claude found
another issue in our Python script,
which is totally fine. So, what I did is
I pasted in the full documents. So, Fal
AI, if you come up here to this LLM
section and click this arrow, you can
copy all of the content. Let me just
open this in a new tab. So, this is
basically all of the documentation that
any AI tool I Claude code needs to
understand how to actually use the Fal
API. So, I copied this entire thing,
went back to antigravity, and say,
"Here's all of the documentation. Just
fix the script." So, now you can see
it's kind of doing a redline here of the
changes and improvements it's making to
the Python script to hopefully get it
working. All right, the good news is the
generation is working, the script is
working. The bad news is I think the way
that I prompted this is it's creating
multiple outputs kind of in one shot.
So, I can actually click into these
individually and that looks really good,
by the way. But, it's giving us kind of
six outputs in one shot. So, I'm going
to change the prompt to request just one
image per output. I already asked Claude
to make that change. So, that's what
it's doing right now. It's going to fix
the script, fix the prompt, but the
actual output in file is working and
these images look really good. All
right, so Claude is still working. I
told it to go ahead and run the script
for all 40 of the templates. I'm not
going to make you wait for all 40 of
them to come in, but we can see now in
the project structure, it's structured
by the prompt, right? So, this first one
is the headline. Here's a great looking
static ad here. Offer promotion, get
your free sample pack, right? We can
zoom in on these. Let's look at a
testimonial one. Game changer for my
morning routine. Feature benefits. Wow,
this one looks really good. What makes
Element different? I mean, that is
actually an ins- insane generation
there. This one might be my favorite.
Let's go through a couple more. We've
got the bullet point ones, social proof.
Other than the quote going over the line
there, I think this one looks really
good. We've got the Joe Rogan icon icon
at the bottom. All right, so Claude is
literally filling this in in real time
as the script is running. Here's us
versus them. That one's all right.
Negative marketing. This one is really
good. The stat surrounded hero. All
right, so these images are honestly
insane. This entire workflow is honestly
insane. Again, full credit to Alex for
the workflow, for the idea. Hopefully, I
added a little value on top. I'll be
sure to link his video below mine.
Again, if you want the full complete
step-by-step guide written out so you
can just follow it step-by-step, I'll
leave a link below where you can opt in
to get this playbook. Just follow it.
Just paste it into Claude and you can do
this from scratch on your own. If you
want the complete package already built
out entirely for you, ready to go into
your Claude account, be sure to check
out my Scale AI community. This is AI
for agencies, DTC brands, and
performance marketing teams. We've got
over 300 brands and agencies inside. You
get access to this Claude code project
along with a bunch of other custom
tools, trainings, and automations.
