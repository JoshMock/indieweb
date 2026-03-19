---
title: On using spec-driven development and agent swarms
date: 2026-03-19
description: Initial experiments in search of the elusive order-of-magnitude productivity boost.
tags: post
layout: post.njk
---

I've been experimenting with specification-driven development (SDD) using [GitHub's Spec Kit](https://github.com/github/spec-kit) on some greenfield work as well as for some long-open issues on a couple TypeScript projects I maintain at work. My hope has been that I can put the up-front effort into being technically exhaustive in describing what I want built, so that handing it to a swarm of coding agents will lead to quality results and saved time versus manually coding things myself or iterating with a coding agent via chat. I'd argue&mdash;and some popular early studies, shared among every agent-ambivalent engineer ever, appear to show&mdash;that manually coding vs iterating with an agent are within the same order of magnitude, so my goals are:

- at least one order of magnitude in time savings: 1-2 days of effort should produce what would before have taken me a week or more.
- no loss in code quality; this should be a given for any code that is run at production-level scale.

There is still a lot of hand-wringing about energy usage of LLMs, and whether the tradeoffs are worth it for that reason alone. Even if we find over the long term that this is not a significant issue, I believe it is the responsibility of software engineers to always be seeking ways to make software more efficient and less wasteful. So, aside from the time savings, if the effort requires notably more tokens/LLM time than other methodologies, it's not viable in the long term unless there are identifiable ways to optimize the process.

Spec Kit's constitution-building process requires some initial overhead, so I'm not including that in my (very anecdotal) measurement of time spent on implementing a code change. Any effort that improves context for all future work has a multiplying effect.

## My initial results

After a couple weeks of experiments, my sense is that Spec Kit is not the problem. It's very good at building an exhaustive spec that addresses corner cases effectively and can easily build a concrete list of tasks. However, handing the list of tasks to coding agents is not yet leading to significantly better results. In all cases, the finished result still requires several rounds of code review and significant reworking. Things that would be caught much earlier if I were an active participant in the code changes the whole time. Which is exactly what I'm trying to optimize away.

In one case, the task was to refactor a CLI tool with a lot of redundant code for each subcommand, so that commands would use a shared factory function to reduce duplication and improve consistency. This goal was clearly stated in the spec, both generally and in more detailed technical terms. The outcome was functionally complete, but it did not take several clear opportunities to reduce code with the factory pattern it built. It also, inexplicably, expanded its scope to refactor far more commands than I instructed it to.

In another case, the task was to move a chunk of code that supports optional behavior out of the critical path and into a middleware, add add one straightforward feature improvement to the middleware. In this case, the feature improvement was built correctly. Great! However, it also made changes to the middleware engine to support new hooks that the middleware needed, which diverged from the clear pattern for new hook types, making both the engine and the new middleware overly complex. It added layers of asynchronous behavior and function-wrapping where none was needed, making the code dense and hard to follow.

## The missing link

In all implementation attempts, I reviewed the specifications and tasks that Spec Kit produced at every step and found them to be clear, concise, and unambiguous. It seems that, even though context and memory are stored in a persistent place that the agent knows to inject into its model's context, it will still go off track, creating a snowball effect where one poor choice compounds complexity.

I haven't broken through this problem quite yet. I've backed out and restarted a few specs to tweak various variables, with marginal improvements:

- improving context via AGENTS.md
- adding [popular skills](https://skills.sh/) for the language ecosystem in use
- trying different models (Claude 4.6 variants, Gemini Flash and Pro) and model thinking levels
- grouping tasks into larger agent sessions vs. smaller single-focused sessions
- ensuring agents use red/green TDD, as suggested by [Simon Willison](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/) and others

It's also possible that agent orchestration is the problem. I use [Pi](https://www.npmjs.com/package/@mariozechner/pi-coding-agent) as my coding agent. To orchestrate a swarm, I've built a simple, in-memory [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph) tool that wraps Pi (npm package coming soon, probably). Each node on the graph represents a Pi coding session, and each session is responsible for completing one task from the spec using the `speckit.implement` skill. The DAG's dependency tree is constructed by an agent after analyzing the Spec Kit task list to understand order of operations and inter-task dependencies. Every session's prompt includes clear instructions, both from Spec Kit's explicitly-triggered skills and additional text and file references I add, so it has all the context it needs to complete its task.

Perhaps each agent session needs more context still, beyond what is picked up by the agent already. One thing my DAG wrapper does not (yet) support is a way for one agent to leave notes for the agents that follow it, which could help. Or maybe each agent needs reminders, or a sidecar agent powered by a different model, to check its work.

## What's next

A deep dive into every Pi session's logs may be needed here. These logs can grow into the megabytes within 5-10 minutes of work. So I'll have to, you know... ask an agent to analyze the logs of several other agents, whose prompts were devised by another group of agents. Therein lies the struggle to keep my LLM usage within economical constraints.

On one hand, this can get exhausting. On the other, it's the kind of systems-level challenge that I love to solve. This system just has a lot more non-deterministic black box layers than I'm used to.

I also would like to experiment with other SDD tools and methods. [Get Shit Done](https://github.com/gsd-build/get-shit-done) and [OpenSpec](https://openspec.dev/) are on my radar. More to come soon, if I remember to write about it.
