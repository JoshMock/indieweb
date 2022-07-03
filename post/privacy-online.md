---
title: "Protecting yourself online: a primer for most people"
description: "Technology plays a central role in our lives, and our governments will leverage it any way they can to enforce their agendas. Learn to cover your tracks."
date: 2022-07-02
tags: post
layout: post.njk
---
I've come across a few threads this week giving helpful advice, following the reversal of Roe vs. Wade, about to protect yourself and others when getting an abortion or assisting others in doing so. There were many valuable warnings about being careful what you say and do online. Still, the recommendations for covering digital tracks were reduced to a one-liner, like "use a VPN." While VPNs are helpful in some cases, they're only protecting you on one of several layers in the complex, multilayered crepe cake that is the modern consumer tech stack.

If your goal is to organize online or use technology to coordinate activities that can expose you or others to legal action, it's critical to understand where your data goes and who can see it. [Companies will happily give your data](https://www.nytimes.com/interactive/2019/04/13/us/google-location-tracking-police.html) to [law enforcement](https://reclaimthenet.org/google-repeatedly-hands-over-user-data-to-law-enforcement-without-a-warrant/) without a warrant, so if they have valuable data about you, a warrant or subpoena is a guarantee that they'll give it up.

Let's talk about where your data goes, who can see what, and how you can fix that.

## Who can see my data?

### Your internet service provider

**What it is:** Your home internet and cell phone providers, e.g. AT&T, Comcast, Verizon.

**What it can see:** What sites you visit and what servers your devices communicate with (i.e., what apps you're probably using), but rarely the pages you're visiting on that site or any data sent back and forth.

**How to fix it:** Use [Tor](https://www.torproject.org/), or a VPN. Just not a free VPN, because those can be fronts making empty claims of protecting privacy while collecting your activity data and selling it. So, preferably a paid one. Consumer Reports [recently published a white paper](https://digital-lab-wp.consumerreports.org/wp-content/uploads/2021/12/VPN-White-Paper.pdf) evaluating many VPN services, including how well they protect your privacy. Don't pick one just because you heard about on a podcast. Additionally, a privacy-friendly DNS service like [1.1.1.1](https://1.1.1.1/dns/) is free, simple to set up, and helps you avoid sending data to your ISP. And _always_ make sure the sites you're visiting always have `https://` in the URL, not `http://`.

### Your web browser

**What it is:** The app you use to browse web pages, like Chrome, Safari, Firefox or Edge.

**What it can see:** Every page you visit and when. In many cases, this data is synced back to the browser's vendor, so Google in the case of Chrome, Apple in the case of Safari, etc. Firefox is the only one I know of that [encrypts this data](https://support.mozilla.org/en-US/kb/how-firefox-sync-keeps-your-data-safe-even-if-tls-fails) so that even they can't read it. Any vendor that isn't promising this can probably see your entire browsing history.

**How to fix it:** Use [Tor browser](https://www.torproject.org/) or the [private browsing setting](https://www.howtogeek.com/269265/how-to-enable-private-browsing-on-any-web-browser/) of your preferred browser. Except for Chrome, which has been accused of [collecting data from private browsing sessions](https://www.theverge.com/2021/3/13/22329240/judge-rules-google-5-billion-lawsuit-tracking-chrome-incognito-privacy). (You may notice a pattern here that Google is generally not to be trusted with your data.) 

### Your search engine
**What it is:** The sites you use to search the internet, e.g., Google, Bing, DuckDuckGo. If you're searching social media sites like Facebook and Twitter for specific content, or Amazon for specific products, those count too. I don't know if Amazon sells Plan B, but I'd bet they've seen an uptick in searches for it lately.

**What it can see:** If you're logged in, _even in private browsing mode_, your search engine sees and stores a complete history of everything you search for and every result you click on, and often tracks your activity on those websites as well. If you're logged out, they can make a pretty good guess as to who you are and record that activity too. As mentioned above, even in private browsing mode and logged out, _Google knows_. Even DuckDuckGo, who heavily market themselves as pro-privacy, [got caught sending tracking data to Microsoft](https://thenextweb.com/news/duckduckgo-microsoft-tracking-sparks-backlash).

**How to fix it:** Don't do your searches on an engine that can track you. Definitely don't do sensitive searches while you're logged in to one. I recommend trying a [Searx instance](https://searx.space/), which takes your query, anonymizes it, passes it on to other search engines, cleans tracking and ads out of the results, and sends them back to you. Using a safe search engine&mdash;or rotating through several regularly&mdash;while using Tor or a VPN makes your search activity pretty hard to trace. Browser extensions like [LibRedirect](https://libredirect.github.io/) go an extra step and route you randomly around the internet to many proxy services like Searx.

**Note:** Paywalled search engine options like [Neeva](https://neeva.com/) and [Kagi](https://kagi.com/) market themselves as having no tracking, but since they're paid, you have to be logged in to use them, _and_ they know your identity because you probably paid with a credit card. Proceed with caution.

### Messaging apps
**What it is:** Every app on your laptop, tablet or phone that you use to communicate with other people, e.g., SMS messaging, Facebook, Twitter, Instagram, WhatsApp, Slack, Discord, Zoom, TikTok, email, multiplayer games, etc.

**What it can see:** Whatever data you put into it. The text of every message, every photo or video, who it's sent to, whether or not they read it. If the data is sent to a central server, which is how most messaging apps work, then anyone with access to those servers can read your data. The only exceptions are a select handful of apps that promise end-to-end encryption (E2EE), ensuring that nobody except you and the person you're sending it to can see the contents. But, even then, [sometimes the encryption is just marketing fluff](https://arstechnica.com/gadgets/2021/09/whatsapp-end-to-end-encrypted-messages-arent-that-private-after-all/), so don't trust it unless experts have verified it. 

**How to fix it:** As hinted, only use messaging apps that offer E2EE that experts have verified. There are, unsurprisingly, not a ton of apps like this. Fortunately, the few that do exist work well on most devices. My favorite is [Matrix](https://matrix.org/docs/guides/introduction) because the data isn't all held in a single central service. [Signal](https://signal.org/en/), [Telegram](https://telegram.org/) and [Keybase](https://keybase.io/) are other popular choices.

**Note:** Be cautious about email in particular. No email provider offers true E2EE unless it's asking for the public encryption key of the recipient you're sending to. Even if they say your email data is encrypted so they can't see it, the minute you send an email to another person, it's stored in two places, and at least one of them is likely not encrypted. So if you _must_ use email, [learn how to encrypt it](https://www.openpgp.org/software/).

### Your physical device (and anyone who has access to it)

**What is it:** Your phone, tablet or computer. Specifically, the storage drive on that device. And anyone who has physical access to your device.

**What it can see:** Whatever you put on it. And, if the drive is not encrypted, any sufficiently technically-inclined person can see what's on there, even without your password.

**How to fix it:** Ensure your device's hard drive is encrypted. On a Mac, enable [FileVault](https://support.apple.com/en-us/HT204837). On Windows, enable [BitLocker](https://docs.microsoft.com/en-us/windows/security/information-protection/bitlocker/bitlocker-overview). Newer iPhones, iPads and Android devices are encrypted by default, fortunately. Check your specific device to verify.

**Note:** Even with full-disk encryption enabled, the key to decrypt and read the data is your unlock code, which is often a facial recognition scan, a fingerprint, or a typed passcode. If anyone with physical access to your device has that info or can force you to provide it, all bets are off. Many recommend not bringing your devices to higher-risk environments like protests, or at least ensuring that they're in airplane mode and face- and fingerprint-scanning are disabled before arriving.

### Anything that touches Google, Facebook or Amazon products

Most of the above covers this, but I had to drive the point home. **Know who controls the services you use.** 

All of these companies harvest shocking amounts of data about you; every move you make within their products is recorded in their permanent ledger. There are sometimes ways to request them to delete everything they know about you, but in the US they aren't legally required to, and [there _is_ a precedent](https://www.inquirer.com/health/abortion-reproductive-status-social-media-online-searches-20220629.html) for them sharing what they have with law enforcement.

The following organizations control the apps and services mentioned (and more!) and collect as much about you as possible when you use them:

- Facebook/Meta
  - Facebook
  - Instagram
  - Messenger
  - WhatsApp
- Google/Alphabet
  - Google Search
  - Gmail
  - Google Hangouts
  - Google Photos
  - Google Calendar
  - Google Maps
  - YouTube
  - Google Chrome
  - Google Fiber
  - Nest
  - Google Docs
  - Google Drive
  - Android mobile operating system
- Amazon
  - Amazon Prime
  - AWS
  - Whole Foods
  - Ring
  - Alexa/Echo
  - Eero
  - Goodreads
  - Twitch
  - Audible

## Please be careful

These are scary times, and many governments have been on a war path of oppression against the bodies, rights and private lives of the people they claim to serve. Given the central nature of technology in our lives, governments will leverage it and the companies that control it in any way they can to carry out their agendas. Learning to protect your digital identity and cover your tracks is critical to your safety and privacy, especially if you are a direct target of increasingly common authoritarian agendas.
