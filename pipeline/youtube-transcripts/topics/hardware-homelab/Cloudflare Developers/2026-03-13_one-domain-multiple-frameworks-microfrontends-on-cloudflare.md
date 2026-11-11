---
video_id: "pXoaZCXhrxU"
title: "One Domain, Multiple Frameworks: Microfrontends on Cloudflare"
channel: "Cloudflare Developers"
topic: "hardware-homelab"
published_date: "2026-03-13"
ingested_date: "2026-11-11"
source: "youtube"
youtube_url: "https://youtube.com/watch?v=pXoaZCXhrxU"
duration: 285
word_count: 732
---
So, imagine this. You've got a marketing
website, a documentation site, a blog,
and maybe a dashboard, too. It's very
likely that these have been built by
four different teams, and maybe they
have used four different frameworks. It
could be React, it could be Astro, it
could be TanStack Start. Doesn't matter.
You just want one website domain with
seamless user experience, and that's
exactly what Cloudflare's vertical
micro-frontends do.
I just wanted to show you how it works.
Here's the situation most teams and
applications run into as they scale. You
start with a monolith, everything just
lives in one repository, you just have
one deploy pipeline. Then your team
grows, and now everyone has to
coordinate deployments.
This thing is very error-prone.
A bug in the documentation site can
break your dashboard, too. We don't want
this. Vertical micro-frontends solve
this by splitting your app by URL path.
Slash or the root index is your
marketing site. Slash docs is for
documentation built on Astro. Slash
dashboard could be built on TanStack
Start application or your dashboard, and
slash blog is a blog that lives
completely separately. Each one is its
own project, its own repository, it has
its own deployment pipeline. But for the
user, it's just one single website.
So, I've got four different projects
deployed as workers on Cloudflare
already, and I just wanted to show you
what we're dealing with.
This is the marketing landing page. It's
built with Astro and Tailwind. It's
clean, it's fast,
and it's static, and making and it makes
sense using Astro here.
Also, let me know in the comments if you
want this template as an open-source
thing, I'll just publish it.
And then we have the documentation. This
one is built with Astro, but it uses the
Starlight theme.
And then we have the blog. This is using
MDX
uh along with Astro.
And you can see that it has its own URLs
for articles.
And again, a separate worker altogether.
And then finally, we have the dashboard.
This is again a separate worker. It's
built with Shadcn and recharts. So, four
projects, three using Astro and one
built with React. All deployed as their
own workers. Right now, they're just
sitting there independently and
isolated. So, let's just stitch them
together in 5 minutes using the vertical
front ends feature.
Let's open the Cloudflare dashboard.
nash.cloudflare.com
Head over to compute.
Select workers and pages.
You can see these four workers that I
was just demoing you.
Let's create a new application.
So, here's where you select a template.
If you scroll down,
you'll see a create micro front end
button.
Let's select this.
Let's give this a name. I'll name it as
my application.
And it requires a domain. Let's select
this empty domain that I have lying
around.
And let's add /
for demo website.
Let's add another one.
/docs
for the documentation.
/blog
for blog.
And then finally,
/dashboard.
Which is our Shadcn dashboard. And I
also want to select this preload this
app for faster transitions.
Once you do this, just hit deploy.
It usually takes like 1 to 2 minutes.
And you should have a
micro front end ready. So, all these
websites will now come under just one
domain.
And yeah, there we go.
If you visit this, inboxtool.com
Let's head over to blog. You can see
it's opening the blog immediately.
And if you go back to documentation,
it opens the {slash} documentation as a
separate router, but under just one
domain.
And also the dashboard.
If you hit back,
you'll be back to the original website.
And that's the best part. Each of these
projects get deployed independently. The
blog team can deploy articles whenever
they want. The dashboard team can roll
back without touching anything else. No
coordinated releases. That was the whole
point. And that's it for today. If you
want to try this feature out, I have
linked the documentation and an article
explaining more about vertical fragments
in the description or the thread or
comments. Go build something with it and
let me know how it goes.
