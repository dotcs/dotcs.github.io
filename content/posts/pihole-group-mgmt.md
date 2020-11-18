---
title: Pi-hole User Group Management
excerpt: In this post I discuss how a Pi-hole can be controlled so that different rules apply to different groups of devices in the local network.
keywords:
  - pihole
  - notes
  - tech
authors:
  - dotcs
published_at: "2020-11-18T08:10:34+01:00"
updated_at: "2020-11-18T08:10:34+01:00"
---

At home I have a [Pi-hole] in service which acts as my central DNS provider for all devices in my network.
This means that by default all devices share the same filter lists, so effectively ads are blocked on all devices.

This setup is most likely the setup most people need and prefer.
For our home it's not working, because some devices should see clear and unfiltered DNS entries.
Let's see how we can exclude certain devices from the filter lists.

## Pi-hole Group Management

Since [Pi-hole v5.0][pi-hole-v5-release-notes], which has been released in 2020-05, groups can be configured.
Known devices can be put into groups which can have different filter lists assigned to them.
The group management can be found under `http(s)://my-pi.hole/admin/groups.php`.

In my setup I created a group for all my devices which I named `dotcs`.

![Pi-hole Admin: Group management](/posts/pihole-group-mgmt/pihole-admin-groups.png)

By default this group does nothing.
First devices need to be assigned to the group.
Those settings can be found under `http(s)://my-pi.hole/admin/groups-clients.php`.

![Pi-hole Admin: Device management](/posts/pihole-group-mgmt/pihole-admin-devices.png)

After that the adlists need to be configured and attached to the group.
In my case I removed all of the lists from the `default` group and attached them only to the `dotcs` group.

![Pi-hole Admin: Adlist management](/posts/pihole-group-mgmt/pihole-admin-adlists.png)

With this configuration all devices listed in the `dotcs` group see filtered DNS entries whereas all other devices see unfiltered DNS entries.

*Thanks to the Pi-hole developers for this awesome feature and please consider [donating to the project][pi-hole-donation] if you like it.*

[pi-hole]: https://pi-hole.net/
[pi-hole-v5-release-notes]: https://pi-hole.net/2020/05/10/pi-hole-v5-0-is-here/#page-content
[pi-hole-donation]: https://pi-hole.net/donate/
