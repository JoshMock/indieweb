---
title: Use AI to make code better
date: 2026-08-04
description: Writing more code is the wrong goal.
tags: post
layout: post.njk
---

If you write code for a living and you aren't your own boss, there's a solid chance by now that you are using AI-powered coding tools somewhere in your workflow, whether you want to or not. There's also a decent chance that someone in your org thinks that "bots write code" means "coders get more done, faster" despite plenty of evidence to the contrary.

Agents can indeed write code faster than most devs, but most of the time it's kinda shitty code. As a person who has written lots of shitty code over the last 25 years, I feel pretty qualified to make that judgment. Shitty code slows developers down, and slows software down too. It introduces bugs that are hard to find and performance regressions that take serious effort to unravel. Shitty code has inspired a lot of total rewrites, despite most of us knowing [it's rarely a good idea](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/).

If shitty code slows down delivery schedules or performance, why are we confidently throwing agents that write shitty code at everything. They create the same problems humans already do, just at 20x speed. Over the last couple years, we've witnessed the quality of software and services (and political speeches, and blog posts, and...) in steady decline thanks to AI being applied in the wrong ways on the wrong problems. We should be throwing them at problems we've already created and save the interesting work for ourselves. We should be optimizing for quality over speed, because that ends up getting us further in the long run. Endurance over speed. Tortoise vs. hare. "Slow is smooth and smooth is fast." etc. etc. etc.

## Tech debt

Technical debt is side effect of cutting corners: in order to deliver a change faster, some non-ideal tradeoff is made to keep code in an optimal state because it would take too long. The idea is that we "take out a loan" from our future selves to get this thing done sooner, knowing that we will have to eventually pay down the debt to keep the project healthy in the long term.

Tech debt usually arises because the *correct* change is tedious, or a bit too complex for a search/replace or codemod, or crosses too many files or projects to resolve quickly, or involves adding missing test coverage to avoid regressions. Guess whose brains don't burn out when given tedium, can use tools that easily keep track of dependencies, and are great at writing unit tests? Agents!

So now, instead of introducing new tech debt, we can work on the problem we care about, leaving bits of unresolved tech debt in our wake. Then we can throw agent at the tedium and have it iterate on the debt until it doesn't exist any more, or reaches some agreed-upon stopping point.

Existing tech debt isn't much different: identify what debts can be resolved by an agent, and let them loose. If you don't have a list of said debts handy already, gather your senior engineers for an hour and catalog them. I've done this exercise before; it's a wild and humbling experience. Coding agents probably won't be able to remove all of them but anything tedious, or that takes some annoying amount of yak-shaving to unravel, and can be verified by automated testing and a code review, may be solvable.

## Test coverage, and other deterministic guardrails

I've always included unit tests in my code changes but always felt that aiming for 100% test coverage isn't the best use of time. I still think 100% is rarely necessary, but deterministic guardrails like good unit tests are more essential than ever when LLM-generated code is added to a project.

[Red-green TDD](https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/) is a great way to keep an agent focused on the right work and a concise solution. A nice side effect of working this way is that your latest change always has test coverage, and thus coverage improves over time. I've also gotten into the habit of prompting an agent to identify any simple opportunities to improve tests on the area of code I'm working on, either while adding the new test, or tacking it on at the end of a set of changes just for some good karma.

Many other deterministic guardrails exist and are equally worth the investment:

- Integration/end-to-end tests
- Static analysis, via [CodeQL](https://codeql.github.com/) or similar
- Fuzzing
- Linting

If you aren't using these yet, the effort to add them, and then immediately resolve many of the issues they uncover, has never been easier. The quality of your code will permanently improve if the guardrails are used.

## Security

All those fuzzing and static analysis results might scare the hair off your head the first time you run them. Fortunately, many of the problems they raise are not hard to fix, and are often more tedious than complex. Agents are great at this!

I once worked on a project where a third-party red team found literally hundreds of XSS vulns in our web app. One of the templating libraries used did not HTML-encode strings by default. An agent could have added needed test coverage then cleaned them all up in a fraction of the time it took us to fix everything they found.

## Performance

I don't prefer letting an agent loose on a repo with no clear implementation plan, but [Andrej Karpathy's autoresearch tool](https://github.com/karpathy/autoresearch)&mdash;or, in my case [the Pi plugin inspired by it](https://github.com/davebcn87/pi-autoresearch)&mdash;is an exception, when you have a measurable metric you want to improve in your code, but no clear direction on how to get there yet.

I recently ran autoresearch overnight on [a CLI tool](https://github.com/elastic/cli) I've been building at work, and its results improved the runtime speed of a preselected set of commands [by an order of magnitude](https://github.com/elastic/cli/pull/400). I had to spend a day cleaning up the results, stripping out some ugly micro-optimizations and turning the changes into a coherent PR, but the same effort done manually would have taken far longer.

## "I don't care what you do as long as it works"

Not every part of a software project is as critical as every other. Sometimes you just need something to work, and you don't need to know how it works as long as it works.

I recently got stuck in release limbo, needing [release-please](https://github.com/googleapis/release-please) to publish an specific version of a package, but it kept opening a PR that auto-bumped the version to the wrong number. I don't care how release-please works, and I didn't want to skim the docs for an hour. An agent took five minutes to write a throwaway Bash script that used `git` and GitHub CLI commands to put things right. I skimmed it for obvious problems, ran it, verified it worked, and deleted it. 10 minutes vs. 2 hours.

On another instance, I wanted to use [Jujutsu](https://docs.jj-vcs.dev/latest/) to reorder and squash a bunch of commits on a branch into a more coherent, readable history. Again, I asked for a throwaway Bash script, reviewed it, ran it, deleted it.

Mario Zechner, creator of the Pi agent harness, [said something similar on the PragProg podcast](https://youtu.be/n5f51gtuGHE?t=4240) about how different parts of Pi were built:

> There's a lot of slop in Pi, but I try to avoid it in the bits and pieces where I know that it's important code. Like, we have an HTML export functionality where it takes the current session and just spits out an HTML file that you can then host on GitHub and whatever. I have not looked at a single line of code for that function. I don't care if it's broken, if it looks right when it comes out. But then there's the agent loop itself or the extension loading mechanism and all of that stuff. And that's important.

## Writing blog posts

Just kidding. Stop publishing AI slop under your own name! Don't take credit for words that lack the very essence of humanity. If you must publish slop, use a pseudonym or the name of your team so it isn't associated with you directly.

There's a lesson to be learned here with code, too: the written word carries our human essence, but it's a little different with code. Code targets the computer running it, so there's a strictness to it that isn't expressive in the way written languages are. It makes it a bit easier to justify letting AI write its share.

*However*, our humanity is still in the code in so many ways: the structure and organization, its readability and maintainability, the overall architecture of the system, the user interface... At the end of the day, there's a human somewhere at the other end of the software we write. We have to keep this in mind with whatever code we allow to be generated under our watch.

## More reading

- [Thoughts on slowing the fuck down](https://youtu.be/n5f51gtuGHE?t=4240)
- [John Regehr on "executable oracles"](https://john.regehr.org/writing/zero_dof_programming.html)
- [Giving LLMs a Formal Reasoning Engine for Code Analysis](https://yogthos.net/posts/2026-04-08-neurosymbolic-mcp.html)
- [Multiple things can be true at the same time](https://frederikbraun.de/feels-and-llms.html)
- [You need AI that reduces maintenance costs](https://www.jamesshore.com/v2/blog/2026/you-need-ai-that-reduces-your-maintenance-costs)
---

*All words&mdash;including emdashes&mdash;written by me without the use of LLMs.*
