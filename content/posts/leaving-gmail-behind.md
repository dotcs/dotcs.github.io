---
title: Leaving Google's Mail Services behind
excerpt: I decided to leave Google's e-mail services behind. This post describes how I changed to another provider and how I use my domain at the same time so that I can switch between e-mail providers more flexibly in the future.
keywords:
  - tech
authors:
  - dotcs
published_at: "2019-11-01T13:55:00Z"
updated_at: "2019-11-01T13:55:00Z"
---

I decided to leave Google's e-mail services behind. This post describes how I changed to another provider and how I use my domain at the same time so that I can switch between e-mail providers more flexibly in the future.

A year ago I decided to leave Google and their e-mail services behind. The reason that lead to this decision was that Google decided to kill Inbox - my absolute favorite e-mail service. They did it although many people loved Inbox and after operating the service for about 4 years.  
Inbox was simply fabulous. It had a clean web based UI, came with powerful features, such as auto-grouping related e-mails into a thread, marking e-mails as done, so that one could establish a zero-inbox pattern, a very well working Android app, and so on. Thinking about the shutdown of Google Inbox still makes me sad. Google killed the better of their e-mail services and forced users migrate back to GMail, the much more bloated and annoying variant of the two services. In my opinion Google should have killed GMail instead and migrate their users to Inbox. But they have decided differently any many people followed their decision - many, but not me.

---

Since last year I have had quite a journey to switch e-mail providers. I decided to never use an e-mail address again that is not tied so a domain I do own – simply because it's a mess to change the e-mail address for hundreds of accounts.  
Let me explain my steps to migrate to another e-mail service.

## Step 1: Choose an alternative

There are countless alternatives on the market – many of those belong to larger companies, such as Microsoft.
I did not want to move from one web-giant to another, so I decided to use a smaller provider.
First I thought about hosting e-mails on my own server, but I quickly got rid of this idea because I cannot guarantee uptime and hosting an own e-mail server comes with its own difficulties.  
And I wanted a mail provider that does cost money.
Why you ask? Because hosting e-mails and providing a proper e-mail service is serious business.
E-mails contain a lot of personal and sensitive information.
If the service is free then users are the product – Inbox was no exception to this, GMail is neither.
In my opinion it is worthwhile to think very carefully about this topic, because most mails are not encrypted, often they contain sensitive information, such as information about accounts, bank credits, shopping information that helps to create an exact profile of the user.
E-mails are a paradise for data scientists.

What I needed instead was an e-mail provider that fulfills these requirements:

- **Reliability**:
  The service should have a history in which it worked flawlessly.
  No profile building, no ads: I want to have a service that does not scan my e-mails (automatically) and display ads based on the content.
  I don't want to see any ads at all.
  I do not want the e-mail provider to use my data for a kind of profile which is then sold to third parties – even if this is only done via an advertising network.
- **Secure authentication**:
  I want the service to provide a two-factor authentication.
  This way an attacker does not only need my username and password combination, but also needs to have physical access to my second device.
  This should be standard nowadays.
- **Custom domain**:
  I want to use a custom domain, so the mail provider must provide support for e-mail aliases.
- **GDPR compliance**:
  Since we have this wonderful EU General Data Protection Regulation (GDPR) in place, I want the service to be hosted in such a way that it is compliant with GDPR.
  Actually most services are compliant, but I favor services that are also hosted in the EU.

In the end I came up with two providers that looked very interesting: [mailbox.org] and [posteo.de].
In my opinion both providers are absolutely worth their money.
One of the main differences is how custom domains are handled.
While Posteo does not allow for custom domains by default, Mailbox is fine with it.
Posteo has a good point of not allowing it.
Their FAQ explains why they have decided against custom domains:

> Can I use Posteo with my own domains?
> 
> No. We are an email provider with a particular, privacy-oriented model – and this is not compatible with incorporating own domains. [...]
> Even if only the MX record pointed to us, we would still need to store the assignment of the domain in your Posteo account as  user information.
> Thus we would possess your user information and be required to give it out.
> For this reason, we have decided not  to offer this possibility and instead to use data economy. [...]
> In order to be able to read replies to these messages, you need to set up forwarding to Posteo for the external address.
> 
> Source: https://posteo.de/en/site/faq

A year ago I have decided to use Posteo.
Nowadays I think it would have been better to go with Mailbox, because of the custom domain problem.
I am not so sure if Mailbox allowed setting up custom domains a year ago, but since Mailbox [natively allows for custom domains nowadays][mailbox-custom-domain], I guess it makes much more sense to use their offering.
I will outline below why this is important.

![Image of the posteo landing page](/posts/leaving-gmail-behind/posteo.png)

Creating an account is straight-forward, I will not explain how to do that.
Maybe it is worth mentioning that Posteo does provide a large amount of anonymity.
It does allow to create new accounts without the need to enter any personal details.
Also the payment does work anonymously.

## Step 2: Setup with custom domain

As mentioned in the requirements I want to use a custom domain for my mails.
Doing so has several advantages and one major disadvantage.  
Advantages are that you can have as many e-mail addresses as you like.
<any-name>@yourdomain.com is possible, so you have a lot of freedom here.
Another advantage is that those mail addresses are independent of the mail provider, which means that I can, at some point in time, if I am no longer satisfied with Posteo, simply change the e-mail provider and do not have to inform others that my mail address has changed.
Isn't that great?! I mean changing e-mail addresses is a tedious task – it took me several days to update my e-mail address in all the services that I use.    
Instead of changing mail addresses one could also forward e-mails from one provider to the other.
Although it would be simple and can be configured in most e-mail services, including GMail.
Why? Because it would still route mails via Google – all my mails.
And Google will for sure analyze those mails.
So I would not have won anything.
Instead I take the burden once in my life, change my mail address and then stick to it.
This is possible – but only if the domain is yours.
Which brings me to the major disadvantage: You have to own this domain.
Forever – or at least as long as somebody sends mail to this domain that should be kept private.
**You must make sure, that this domain never gets lost.**
Most domain providers do provide options here, so please check carefully.
If you lose the domain, it could be registered by someone else who sets their own MX records and receives mails intended only for your eyes.
So be warned!

## Step 3: Set up e-mail forwarding

*This step is only needed if the mail provider does not allow for custom domains (e.g. Posteo). In case the mail provider does allow for custom domains (e.g. Mailbox) this step is not necessary.*

I have bought my domain at [GoDaddy], one of the very large domain registrars out there.
GoDaddy offers up to 100 e-mail forwarding configurations per domain for free.

![GoDaddy offers 100 e-mail forwarding configurations for free.](/posts/leaving-gmail-behind/godaddy-email-forwarding.png)

Configuration is simple.
Just configure the e-mail address, that the service should listen to, e.g. foobar@domain.tld and enter the mail address that it should be forwarded to, e.g. mymailaddress@posteo.de.
This way you can configure up to 100 different e-mail addresses that can later be used as aliases for your one e-mail address at Posteo.

![Configuration dialog at GoDaddy](/posts/leaving-gmail-behind/godaddy-email-forwarding-2.png)

DNS records are typically managed by the registrar itself – in my case GoDaddy.
I manage my DNS records via Cloudflare, but this is absolutely not necessary.
The following is still valid for GoDaddy or any other service that is used to manage DNS entries.
The UI might look different though.

## Step 4: Set up MX, SPF and DMARC records

The missing pieces are now setting up [MX records][mx-record],  [SPF][spf] and [DMARC][dmarc].
The first one is necessary so that other e-mail servers know which inbox server they should use to deliver the messages to.
SPF and DMARC are necessary, so that sent mails can pass the SPAM rules of various mail providers.

Let's talk about the MX records first.
Each e-mail provider does have some servers that are responsible for receiving mails from other services.
Since Posteo does not allow for custom domains I have to use the inbox servers from GoDaddy and forward mails to Posteo.
If you go with Mailbox, please enter the Mailbox MX records instead.

To find out GoDaddy's MX records go to the Workspace Control Center, this is where you can configure your e-mail records for your domain.
Then go to Tools → Server Settings.
Here you can see the MX records and their priorities that are to be set up.

![MX records as needed to work with GoDaddy.](/posts/leaving-gmail-behind/godaddy-mailserver-mx.png)

Finally use these MX records to change the DNS records of your domain:

![DNS settings: MX records and SPF and DMARC settings.](/posts/leaving-gmail-behind/godaddy-mailserver-settings.png)

The image above also shows the [SPF][spf] record, which I set to `v=spf1 include:posteo.de -all`.
We basically inherit the SPF record of posteo.de and advice that other mail providers should strictly reject messages that do not pass the SPF test (`-all` flag).  
In case you are interested in SPF record configuration and want to learn more about SPF records, I can recommend [spfwizard.net].
Posteo recommends at least to have the `include:posteo.de` part, their recommendation can be found [here][posteo-postmaster].

![Configuration as shown by spfwizard.net.](/posts/leaving-gmail-behind/spf-generator.png)

Please note that if you use Mailbox, you might want to use the SPF record `v=spf1 include:mailbox.org` as described in their help pages.

I also configured [DMARC][dmarc] with the value `v=DMARC1; p=quarantine; rua=mailto:DMARC-report@dotcs.me; ruf=mailto:DMARC-forensic@dotcs.me; pct=100`.
A generator for the DMARC format can be found [here][dmarc-generator].

I have not configured DKIM, because to my knowledge it is not possible in combination with Posteo as the mail provider.

## Step 5: Final checks

Last but not least, I want to make sure that our mails are delivered properly.
What I found quite useful is to send a mail to GMail and check the mail headers there.
The good news first: mails are delivered properly.
Neither are they rejected, nor marked as SPAM.
Our configuration seems to work – strike! Let's check in more detail if SPF and DMARC worked as expected.

The relevant part of the header is this one:

```
Authentication-Results: mx.google.com;
    spf=pass (google.com: domain of fantasymail@dotcs.me designates 185.67.36.142 as permitted sender) smtp.mailfrom=fantasymail@dotcs.me;
    dmarc=pass (p=QUARANTINE sp=QUARANTINE dis=NONE) header.from=example.com
```

We see that both SPF as well as DMARC tests passed. I have used that setup for quite some time now and I had never experienced any issues so far.

[google-kills-inbox]: https://killedbygoogle.com/
[mailbox.org]: https://mailbox.org/
[posteo.de]: https://posteo.de/
[mailbox-custom-domain]: https://kb.mailbox.org/display/BMBOKBEN/Using+e-mail+addresses+of+your+domain
[godaddy]: https://godaddy.com/
[mx-record]: https://en.wikipedia.org/wiki/MX_record
[spf]: https://en.wikipedia.org/wiki/Sender_Policy_Framework
[dmarc]: https://en.wikipedia.org/wiki/DMARC
[spfwizard.net]: https://www.spfwizard.net/
[posteo-postmaster]: https://posteo.de/site/postmaster
[dmarc-generator]: https://mxtoolbox.com/DMARCRecordGenerator.aspx