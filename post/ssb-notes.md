---
title: Initial notes about SSB
description: Some initial thoughts and tips regarding Secure Scuttlebutt after using it for a few weeks.
tags: post
layout: layout.njk
---

In light of, you know, the whole internet yelling about this week's Twitter news, I figured I'd write down some ([more](https://joshmock.com/post/scuttlebutt-anecdote/)) thoughts about my experiences with [SSB](https://scuttlebutt.nz/) after using it for the last few weeks as a social media alternative. Just some observations, tips and warnings about things that weren't immediately obvious until I got started.

## It attracts a certain kind of crowd

It's a fairly small, but active, community right now. Many conversations are about SSB itself: the protocol, its implementations, its clients and their features. Unsurprisingly, this means that a lot of participants are also developers who participate in the open source or FOSS ecosystems. It's also largely anti-capitalist (or, at the very least, not motivated by money or Silicon Valley's rapid growth curves). Despite the protocol having things in common with blockchain tech, most folks are not enthusiastic about cryptocurrency. The conversation tends to have a lot of overlap with the [solarpunk](https://en.wikipedia.org/wiki/Solarpunk) ethos.

In short: the medium is very much the message. There's more than enough room for that to expand, of course, but that's what it is for now. Unsurprisingly, I'm into it.

## You can't edit or delete posts

Every feed is append-only and, being a decentralized protocol, your posts are stored on the devices of the people who follow you. So, even if you _could_ change or delete a post from your feed, there's no guarantee that change will propagate to every device containing the original post.

Thinking before you post is a feature!

## Each device/app is a separate profile (for now)

Since each feed has a unique crypto key, and there are undesirable repercussions to sharing that key across devices, each device is effectively a unique identity. In practice, most folks just link to each of their separate identities in their profile descriptions, but this was a surprise to me.

[There is a proposal for working around this](https://github.com/ssb-ngi-pointer/fusion-identity-spec/), but it's only a proposal for now.

When I asked about it, I got some wonderful feedback that made me even more enthusiastic about the community's motivations:

> namely only rich people (relatively) have their own computer AND smart phone. some people only have a smart phone,  and some places the phone is a community resource that is share.
> which of these people are we building for? what does "growth and success" mean?

And, later on, a highlight of [ahau.io](https://ahau.io/), a tool to help indigenous communities capture and preserve their histories:

> if things go well in the next year, there is a decent chance the largest community using scuttlebutt will be Indigenous people.

- Mix Android, post ID `%ZWApSBOhWSyGSbQTRWzCPOnTN9HW7cwMRfQIT1wHuPQ=.sha256`

## Pubs are not exactly communities

My understanding early on was that SSB pubs (always-online peers) act like communities, where social connections are made and curated conversations are facilitated. In reality, pubs are just there to help posts propagate. Following a pub ensures you receive posts that it knows about; accepting an invite from one ensure it also receives yours. That's it.

## Have at least 1GB of free space available

Your feed, and the feeds of your friends and their friends, all live on your device. Depending on how many people you follow, this can fill up space quickly, especially when you first get started and your client backfills entire feeds' worth of content. Media like images, video or audio are also stored on your device, but most clients enforce an upper limit on how much of that media gets stored, fortunately.

## This is not a space for sensitive data or conversations

The protocol is optimized for open discourse. Your posts could be seen by any device that happens to receive a copy of your feed. Unlike Mastodon or Twitter, you don't have much control over where your posts propagate. Private direct messaging is supported, and while the contents of messages are encrypted, it is possible for anyone storing your feed on their device to inspect the data to see _who_ you're messaging. In theory you could maintain a private circle if you could convince everyone who you sync data with to be judicious about who they sync data with and keep things contained, but that's a pretty flimsy strategy.

If you're looking for a place to have private conversations, stick to Signal, Telegram, Matrix, Keybase, etc. SSB is called a gossip protocol for a reason.

Don't get the wrong idea, though: just because it's public doesn't mean it's noisy! I have yet to get that overwhelming sense of "everyone is yelling about today's headline!" that happens regularly on Twitter. The decentralized nature of the network has, so far, felt to me much more like the organic, scalable nature of real human socialization that I've [harped on before](https://joshmock.com/post/the-best-kind-of-social-media/).
