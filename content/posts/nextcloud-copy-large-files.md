---
title: Copy large files to Nextcloud
excerpt: Copying large files to Nextcloud can be time consuming as a lot overhead is involved in passing the files through the LAMP stack. This blog post shows how files can be copied directly in the underlying file system and how Nextcloud's caches can be invalidated to inform Nextcloud about the new files.
keywords:
  - linux
  - tech
  - notes
  - nextcloud
authors:
  - dotcs
published_at: "2021-01-02T16:49:22+01:00"
updated_at: "2021-01-02T19:35:57+01:00"
---

I'm running my own Nextcloud instance in a [docker container][nc-docker] with the `data` directory mounted from a local folder on my disk.
Unfortuantely it's not very satisfying to use the web UI or using a [davfs2 mount][nc-davfs2] of the disk to copy large files to the Nextcloud instance.
This is because files must be passed through the full [LAMP stack][lamp] which involves a lot overhead and slows down any large file uploads.

An alternative to upload files via the browser or WebDAV is to copy them directly into the user data folder and then force Nextcloud to sync the content with its internal file cache and database entries.

Say our Nextcloud instance data lives in `/opt/nextcloud/data` and our source files live in `/tmp/stage` on the server.
Further let the Nextcloud username be `my-user` and say the source data should be copied to `~/my-folder` in Nextcloud.

Copying the data would then look like this:

```bash
# copy files
rsync -avP /tmp/stage/ /opt/nextcloud/data/my-user/files/my-folder/
# fix permissions
chmod www-data:www-data /opt/nextcloud/data/my-user/files/my-folder
```

It's necessary to fix the permissions since the [default user][nc-default-user] in the [official Nextcloud docker images][nc-docker] is the `www-data` user.
See also the [Nextcloud documentation][nc-file-operations].
Details:

```console
$ docker-compose exec nextcloud id www-data
uid=33(www-data) gid=33(www-data) groups=33(www-data)
```

After the files have been copied, Nextcloud must be forced to re-index all files within this directory:

```bash
$ docker-compose exec -u www-data nextcloud ./occ files:scan --path="/my-user/files/my-folder"
Starting scan for user 1 out of 1 (my-user)
+---------+-------+--------------+
| Folders | Files | Elapsed time |
+---------+-------+--------------+
| 6       | 354   | 00:00:01     |
+---------+-------+--------------+
```

The internal database and caches have been updated and your files will pop up in the web UI afterwards.

[nc-docker]: https://hub.docker.com/_/nextcloud/
[nc-davfs2]: https://docs.nextcloud.com/server/16/user_manual/files/access_webdav.html
[nc-default-user]: https://github.com/nextcloud/docker/blob/b23910be9215f8338aee419007feb70cdacb7741/20.0/apache/entrypoint.sh#L16
[nc-file-operations]: https://docs.nextcloud.com/server/stable/admin_manual/configuration_server/occ_command.html#file-operations
[lamp]: https://en.wikipedia.org/wiki/LAMP_%28software_bundle%29