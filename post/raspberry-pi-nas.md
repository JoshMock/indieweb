---
title: Building a NAS with a Raspberry Pi
date: 2020-11-22
description: "Or: why you maybe shouldn't build your own NAS."
tags: post
layout: post.njk
---

Over the past year, I’ve been building out a NAS-based file archival and backup system for our home. The original goal was to relieve our laptops of being the primary place we store our memories, giving us easy access to all of our music and photos, and a place to store incremental backups in-house. As a bonus, it gives us [some of that power](https://joshmock.com/post/digital-freedom/) I've been talking about by letting us control our data.

In the interest of saving money (narrator: he didn't) and being more DIY, I decided to get a Raspberry Pi 4 and two identical USB 3.0 1TB drives and [build my own NAS](https://www.pcmag.com/how-to/how-to-turn-a-raspberry-pi-into-a-nas-for-whole-home-file-sharing). I set up the two physical drives in [a RAID-1 array](https://www.ricmedia.com/build-raspberry-pi3-raid-nas-server/) for local redundancy, applied full disk encryption on top of the RAID array, and configured Samba so I could mount the NAS as a network drive.

But this blog post is not a tutorial about how to do what I did. It's more of a series of warnings about why you probably shouldn't, unless you have some extra time and share my fascination with learning how computer sausage is made.

## Raspberry Pi wifi is unreliable

Originally I wanted to connect the NAS to our home network via wifi. This would let me move the machine and its drives into any part of our house that had wifi reception, ideally away from the curious hands of my kids. I was willing to sacrifice some transfer speed for this convenience.

Unfortunately, the on-board Raspberry Pi wifi antenna is very prone to unexpected disconnection. Configuring a Pi to self-heal and reconnect without entering networking limbo is less straightforward than I wanted.

**Solution:** I decided to go back to a hard-wired network cable.

## USB 3.0 data cables can cause wifi interference

I moved my NAS to a shelf next to my router and connected them with a network cable. Almost immediately, the router’s wifi signal got incredibly weak. Many wifi devices in our house more than 10-15 feet from the router had a choppy connection, causing frequent wifi dropouts and incredibly slow transfer speed.

Several evenings of troubleshooting and [Duck Duck Go](https://duckduckgo.com)-ing later, I learned something surprising, but verifiably true: [USB 3.0 data cables emit a frequency that causes interference with 2.4Ghz band wifi](https://www.pcmag.com/opinions/wireless-witch-the-truth-about-usb-30-and-wi-fi-interference). If you have an unshielded cable within a few feet of a wifi antenna—that can be either your router's antenna or your computer's—it will start dropping packets faster than the USPS when the Trump administration realized how many Americans intended to vote by mail.

A few suggested solutions to this issue:

- move your USB 3.0 drive away from all wifi devices in your house (not possible in my case without a lot of network cable and some time in the attic)
- only use wifi devices that support the 5Ghz band (maybe someday)
- buy shielded USB cables, or shield the ones you've got with ferrite bead sleeves
- “maybe try wrapping your USB cables in tin foil?”

I'm still not sure if that last one was a joke.

**Solution:** I bought a pack of ferrite bead sleeves and attached them to all involved USB cables. I also, for unrelated reasons, moved our home wifi to a mesh-based system with multiple wifi repeaters that mesh on the 5Ghz band, significantly increasing our wifi signal redundancy.

## Transferring 20,000 photos over wifi is incredibly slow

The NAS might be hard-wired to the router, but my laptop is not (wifi transfer rates peak at around 300 Mbps), and Samba isn't exactly zippy, either. For a file or two this is tolerable. When you're moving 20,000 photos, _you can tell_. My Macbook Air spent an entire overnight session attempting to send photos to the NAS and barely put a dent in the work.

**Solution:** For my initial transfer, I ended up putting all the files on a spare external drive and [sneakernetting](https://en.wikipedia.org/wiki/Sneakernet) them over to the NAS. The transfer was done in minutes.

## Always mount external drives on startup

Editing your `/etc/fstab` can be annoying or nerve wracking if you’ve never done it before, especially when mounting an encrypted drive. If you do it wrong, the machine can get stuck during boot, and you might end up needing to boot from a rescue thumb drive. All very inconvenient for a NAS that's supposed to be headless. This makes it tempting to manually run a script that unlocks encryption and mounts the drive on the rare occasions that the machine needs to restart.

But then, one day, the power goes out for a bit, right after you've set up a cron job to automate some file-moving work. If a drive in Linux is not mounted to its specified directory, those scripts will write files to the underlying directory anyway. And, once the drive _is_ mounted, those files are not visible any more. This leads to an incredibly confusing situation where files appear and disappear in ways that, for a NAS system that you want to be dependable, can cause panic attack symptoms when 20,000 files sudenly go missing, but _a few of them are still there_ somehow.

**Solution:** Don't be lazy like me; just set up your `fstab` right away so you never have to think about it again.

## Conclusion

I've spent a lot of hours over several months of evenings getting my home-rolled NAS to do the bare minimum necessary to even call it a NAS. I didn't even end up saving much money: I've probably spent around $250 or $300 so far, which is only about $100 shy of two SATA drives and an entry-level [Synology NAS](https://www.synology.com/en-us/products/DS220+), which comes with a suite of well-polished file management tools baked in.

But building something from scratch isn't always about the destination, _it's about the friends you make along the way_.

Wait, wrong life lesson. I didn't make any friends doing this. But I did boost my confidence administering Linux and learning some fascinating lessons about physics, hardware, and a lot of the shit we take for granted that modern operating systems do for us.

Not to get too philosophical about storing files, but "productivity" as a metric for success is a harmful side effect of a capitalist society. Our self-worth should not be defined by how efficiently we produce things. I'm trying to unlearn years of habits built around productivity. When it comes to my free time, I want to do things that maximize my happiness, my freedom, and the health of my community. Learning about computers, somehow, is a hobby that manages to bring me some happiness, despite how often they fail me on a daily basis.

So, build your own NAS if it will make you happy. If it won't, maybe don't.
