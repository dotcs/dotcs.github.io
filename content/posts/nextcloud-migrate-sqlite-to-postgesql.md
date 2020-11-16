---
title: "Nextcloud: Migrate from SQLite to PostgreSQL"
excerpt: This article describes how to migrate a Docker based Nextcloud instance from SQLite to PostgeSQL. 
keywords:
  - tech
  - nextcloud
authors:
  - dotcs
published_at: "2020-05-11T11:28:00Z"
updated_at: "2020-05-11T11:28:00Z"
---

I recently changed the database in my personal Nextcloud instance.
Migrating databases is quite simple and took about an hour in my instance (~70GB of data).
I noticed a huge improvement in speed when using the PostgreSQL database – especially when it comes to concurrent access of multiple users.

I'm running Nextcloud in a Docker container, so this post describes the procedure when using Docker containers.
It might be slightly different in cases where Nextcloud has been directly installed to the server.

*I have done the migration in Nextcloud 18.0.4. Older or newer versions might differ, so please be careful.*

## Step 0: Preparations

Make sure to backup old data – especially the SQLite database file.
In case the migration will fail your original database will be left untouched, but still it's good to have a backup in case things are messed up accidentally.

## Step 1: Stop routing traffic to the Nextcloud instance

Make sure to stop any traffic to the instance.
In my case I disabled the rules in the reverse proxy which sits in front of my Nextcloud application, so that the instance does not receive any traffic and thus updates/modifications during the migration phase.

## Step 2: Add database to `docker-compose.yaml`

Let's first add a database to our `docker-compose.yaml`.
The sample below shows the absolute minimum configuration to run a Nextcloud instance with a PostgreSQL database.

```yaml
services:
  nextcloud:
    image: "nextcloud:18.0.4"
    ports:
      - "8080:80"
    volumes:
      - ./data:/var/www/html
  db:
    image: postgres:9.6
    environment:
      - POSTGRES_USER=ncuser
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=ncdb
    volumes:
      - ./db:/var/lib/postgresql/data
```

After the `db` service has been added make sure to start the database by running `docker-compose up`.

## Step 3: Run migration

Now comes the database migration.
Fortunately the Nextcloud developers provide a tool for that which can be used to essentially make this a one-liner.

First connect to the running `nextcloud` instance as user `www-data`

```console
$ docker-compose exec -u www-data nextcloud bash
```

then run the database conversion script

```console
$ ./occ db:convert-type --port 5432 --all-apps --clear-schema pgsql ncuser db ncdb
```

The arguments `ncuser` (database user) and `ncdb` (database name) might differ depending on your setup.
The tool will interactively ask for your password and once it has access start the migration.
Both flags `--all-apps` and `--clear-schema` are optional.
The first one define if database tables of deactivated apps should be migrated or not.
The second one drops tables in the target database in case they have been existing before the migration.

This might take a while.
For me it took under an hour for a Nextcloud instance that has a size of about 70GB.

## Step 4: Confirm that config has been updated

After the database has been migrated successfully check that the config file has been updated properly.
It should list `dbtype` as `pgsql` and have values for the properties `dbname`, `dbhost`, `dbuser` and `dbpassword`.
This can be checked with the following command:

```console
$ docker-compose exec -u www-data nextcloud bash -c "cat /var/www/html/config/config.php | grep db[a-z]"
```

Restart the service once so that the new config is read and applied.

```console
$ docker-compose restart
```

## Step 5: Start routing traffic to the Nextcloud instance

You can now start to route traffic again to the instance.
Now the PostgreSQL database will be used instead of the SQLite database file.
Well done! :)
