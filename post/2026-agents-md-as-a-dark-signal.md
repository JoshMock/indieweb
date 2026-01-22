---
title: AGENTS.md as a dark signal
date: 2026-01-22
description: "Is an AGENTS.md or CLAUDE.md file in a repo a sign of possibly poor code quality?"
tags: post
layout: post.njk
---

It's been a while! Over three years since my last post, to be exact.

Jesus Christ, how things have changed. The main one being, for me, the unavoidable impact of AI on software engineering, both as a practice and in the resulting tools and products we build.

I am, as many senior-leaning engineers are, ambivalent about whether AI is making us more productive coders, and especially whether it's even worth it when LLMs are wreaking havoc on economies, lower-wage employment, intellectual property law, and the environment. However, ambivalent as I may be, it would be a bad idea to completely ignore this tidal wave of change. Complete avoidance would make my stubborn parts happy, but it feels irresponsible to be in a position where friends and family ask me things about LLMs and agents and humans-in-the-loop and not have _something_ useful to say about it.

I have a long reading list of good links about all of this that I'll share sometime. (Hopefully less than three years from now.) For now, just an anecdote, and a thought:

To stay familiar with developments in the AI space, I try to follow the big developments, and experiment with tools that are made available to me. My current round of experiments is using [Github's Copilot agents](https://github.com/copilot/agents) to automate tedious tasks that have been on my backlog for literal years, to see if I can get agents to knock a few dusty things off my list while I work on other things.

A teammate saw what I was doing, and we had a couple good chuckles about some traps and blind spots that the agents walk right into, like (smartly) [writing unit tests to validate its changes](https://github.com/elastic/elastic-transport-js/pull/344/changes#diff-636284ceac14acac0f90c819c372fe736dbb12b034b94493799266c713ed8741), but then (dumbly) not noticing that [unit test globbing patterns prevented the CI jobs from even running the tests against its work](https://github.com/elastic/elastic-transport-js/pull/346), which would have failed on Windows in this case had they run.

The recommendation for solving this is to give your agents some durable memory by instructing them to [write their learningsthat might be useful later to an AGENTS.md](https://ericmjl.github.io/blog/2026/1/17/how-to-build-self-improving-coding-agents-part-1/) that lives in the repository. A smart idea, clever in its simplicity, to ensure that future agents have a more fully-formed context about the code they're editing.

The other side of this coin is that, for many senior engineers, the mere presence of an AGENTS.md or CLAUDE.md file in a repository serves as a signal that **the agents have been here**, and the code in this project is of dubious quality at best. I tend to fall into this camp; knowing that there are software projects whose code is 100% vibe-coded. Some [admit to it](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04), but the total impact is impossible to measure. A file in a code repository meant to instruct agents is, then, a dark sign.

The final thought just struck me today, though, and comes from the perspective of my current role as a maintainer of heavily-used open source software projects: while an agents file may be a hint that makes us curmudgeons roll our eyes and step away in disgust, **the dark forest of vibe coders exists, and they're probably opening PRs on your projects**. Some people are probably vibe coding without even knowing it, because LLM-generated autocomplete is enabled in their IDE by default or something. In that reality, **an AGENTS.md might also be the best protection you have** against agents and IDEs making dumb mistakes that are, often, very hard to notice.

You might not trust vibe coders, but if you can at least guide their vibes, maybe it's worth the cringe or two you'll get from seasoned engineers.
