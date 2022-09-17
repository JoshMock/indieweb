---
title: Personal backups and file archival
description: "How to organize terabytes of personal data, for fun and definitely not profit!"
date: 2022-09-17
tags: post
layout: post.njk
---

I've built up a fairly robust strategy for how I manage my personal files. I had a conversation with some fellow computer enthusiasts the other day where I was describing it, and figured I'd capture it here. In the past I've talked about [my home-rolled NAS](https://joshmock.com/post/raspberry-pi-nas/), which is where a lot of this magic happens, but I'm mostly going to focus on the software here.

First, I make a distinction between _backups_ and _archives_. I conflated the two ideas for a long time, and dividing data into these two categories has made it clearer how to go about storing and organizing things effectively.

_Backups_ are for covering my ass in case of hardware failure or accidental data loss. Any files and directories that I'm reading and changing often are stored as backups. They need to be easy to access in case of emergency, but most of the time they're stored and ignored.

_Archives_, on the other hand, are collections of files that I regularly access, probably from multiple locations and devices. The files usually don't change much; they're read heavy but not write heavy. My photos, music, movies, ebooks and the like are all stored as archives.

Aside from that, I do my best to ensure a level of redundancy similar to the [3-2-1 strategy](https://www.seagate.com/blog/what-is-a-3-2-1-backup-strategy/) for everything.

## Backups

Backups are straightforward. Since the goal is to store and ignore, I run a backup automatically once an hour on my laptop using a [cron](https://en.wikipedia.org/wiki/Cron) job.

[Restic](https://restic.net/) is my backup tool of choice. It's stable, easy to learn, and encrypts my backup data. It also writes incrementally, so after the initial run where it backed up everything, it only ever sends data that's changed since it last ran. This means it runs fast, and saves on bandwidth and storage costs.

The cron job sends data from my laptop to my NAS. They share a [Tailscale](https://tailscale.com/) network so they can communicate securely even when I'm on a different network. It backs up almost everything in my home directory (desktop, downloads, documents, etc.), other than a few sources of noisy, large or useless files.

I also have some jobs on my NAS that send data on to [Backblaze B2](https://www.backblaze.com/b2/cloud-storage.html) using [Rclone](https://rclone.org/), a fantastic utility for working with tons of cloud storage providers.

Restic also [has the ability to delete backups over a certain age](https://restic.readthedocs.io/en/stable/060_forget.html) to save space. I've configured it to keep my last 10 backups, 7 daily backups, 5 weekly backups, 12 monthly backups, and 20 yearly backups, then delete everything else. This weights recent changes heavily, letting older snapshots of my home directory lose the granularity of their change histories as they age.

Finally, I use [Healthchecks.io](https://healthchecks.io/) to keep track of every successful backup. I get an email alert if backups have not succeeded after a set time threshold. Usually it's because my laptop has been off for a few days, or a Restic repository gets [locked](https://restic.readthedocs.io/en/stable/100_references.html#locks) due to an interruption, which is an easy fix.

## Archives

This is where things get fun. Or perhaps intimidatingly overkill for those who don't find hoarding, organizing and storing large collections of data intrinsically rewarding, or if using [Git](https://git-scm.com/) is a technical blocker for you.

The essential tool in my archival toolbox is [git-annex](https://git-annex.branchable.com/). It's built on top of Git, using some symbolic link gymnastics similar to [Git Large File Storage](https://git-lfs.github.com/) (LFS) to efficiently store large files. Some core features:

- It's distributed file storage in the same way [Git is distributed](https://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows).
- It builds on [Git remotes](https://git-scm.com/docs/git-remote) to sync metadata and file contents.
- It tracks and can tell you what files are available on which remotes, since not every remote will necessarily have everything.
- It can sync with [many remote data storage services](https://git-annex.branchable.com/special_remotes/), often with encryption support.
- It lets you [set preferences](https://git-annex.branchable.com/git-annex-preferred-content/) for what files sync to which remotes, and prioritize where to pull files from [based on cost](https://git-annex.branchable.com/special_remotes/#comment-3bf2ad5a8785c8163fb76bbfc4910656).

The organization scheme is up to you. I've chosen to keep a separate repository for each type of archive: music, movies, ebooks, etc. I have some remotes&mdash;like a USB drive or spare external drive&mdash;that I use for different purposes, so having some logical separation is useful.

Some downsides to using git-annex:

- You have to be comfortable using Git.
- Even if you are familiar with Git, there is a learning curve.
- I have accidentally racked up a small AWS bill (like, under $100, but still) by setting up a cron job that unknowingly (see aforementioned learning curve) made redundant, billable requests to S3 for every file in a repo with thousands of files.
- You will find out real quick which tools you use don't play nice with symbolic links. Fortunately, if you have spare storage space, you can just keep a separate [exported copy](https://git-annex.branchable.com/tips/publishing_your_files_to_the_public/) handy for those tools.
- There's no way to use an iOS device as a git-annex remote. I chatted with the maintainer of [Working Copy](https://workingcopyapp.com/) about it and he confirmed it was not feasible. You can still access them on other networked devices [via the Files app](https://www.howtogeek.com/devops/how-to-connect-to-network-shares-with-the-ios-files-app/), but it's not quite the same.

### Organizing files

On top of my git-annex archival repositories, I have configured some opinionated organization of their file structures. I use:

- [Beets](https://beets.io/) to organize my music
- [Jellyfin](https://jellyfin.org/) to manage movies and TV shows
- [Calibre](https://calibre-ebook.com) for organizing ebooks
- [`git annex importfeed`](https://git-annex.branchable.com/git-annex-importfeed/) to keep copies of some paywalled podcasts I pay for

For photos, it's messier. My wife and I both use iPhones, and iOS limits our ability to treat photos as files. I've been burned by iCloud storage, so I'd prefer not to depend on it. We use [Dropbox's camera uploader](https://help.dropbox.com/create-upload/camera-uploads-overview) to move photos off of our phones. A cron job that uses Rclone and [exiftool](https://exiftool.org/) pulls Dropbox photos down to my NAS, renames them, deduplicates them, adds them to a git-annex repository, syncs them to a B2 bucket, and removes old photos from Dropbox. This is less than ideal, but somehow it usually just works. I use Healthchecks.io to keep an eye on it. To view and sort photos, I point a self-hosted instance of [PhotoPrism](https://photoprism.app/) at the repository.

## Conclusion

Much like the conclusion to [that post about building a NAS](https://joshmock.com/post/raspberry-pi-nas/), it's important to point out that this is, somehow, a pursuit that brings me intrinsic satisfaction. Organization, redundancy, availability, security, and not depending on FAANG could all be assigned some monetary value, but for many people it's not a reasonable alternative to just dumping everything into Google Drive or backing up laptops with a subscription backup service. I do this because I _care too much_ and enjoy the process as much as the end result. Also, the amount of data I've hoarded (legally!) now requires more drive space than the average laptop can do singlehandedly.

I'd say the primary downside to this project is that, sometime in 2019, I told my wife that I had mapped out a way to manage our photos without forking our private memories over to Google Photos, and almost 3 years later she's still not certain I've made that a reality.

However, I _can_ run `git annex whereis "Rage Against the Machine/The Battle of Los Angeles/05 - Sleep Now in the Fire.mp3"` and feel warm and fuzzy when it tells me a happy story about the redundancy and availability of the files that soundtrack my personal resistance to late capitalism.
