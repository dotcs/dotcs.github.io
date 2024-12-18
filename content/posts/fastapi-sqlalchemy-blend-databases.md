---
title: Blending Databases with FastAPI and SQLAlchemy
excerpt: This post will show you how to blend multiple databases in a FastAPI application using SQLAlchemy.
keywords:
  - fastapi
  - python
  - sqlalchemy
  - tech
authors:
  - dotcs
published_at: "2024-12-18T18:00:00Z"
updated_at: "2024-12-18T18:00:00Z"
---

In this post, I will show how to blend multiple databases in a FastAPI application using SQLAlchemy.
This is a common use case when multiple databases are being used and one wants to interact with them transparently through a single database session.

An example where this could make sense is having a common database for user data and separate databases with sensitive, maybe immutable, customer data that should not be mixed and where access should be restricted based on the tenant.

## Introduction

FastAPI is a modern web framework for building APIs with Python 3.6+ based on standard Python type hints.
SQLAlchemy is a SQL toolkit and Object-Relational Mapping (ORM) library for Python.

The goal is to create a FastAPI application that connects to two databases: a SQLite database and another SQLite database.
But the same principles can be applied to any other database supported by SQLAlchemy.
SQLAlchemy will be used to interact with the databases and FastAPI is used to expose the data through an API.
Two base classes will be created to handle the database sessions and models.
The FastAPI application will be created with two endpoints to query the data from each database.

## Code

You can find the complete code for this post in my [GitHub repository](https://github.com/dotcs/fastapi-blend-db-demo).

The magic happens in the `VirtualSession` class, which configures two database sessions, which are created through FastAPI's `sessionmaker` function.
We mimic the behavior of a single session by creating a virtual session that can be used to interact with both databases.
By proxying the session methods, such as [`query`](https://github.com/dotcs/fastapi-blend-db-demo/blob/a1570b05c6ce1fd10c7e1d485ad798e5a77bc209/fastapi_blend_db/app.py#L77-L84) or [`add`](https://github.com/dotcs/fastapi-blend-db-demo/blob/a1570b05c6ce1fd10c7e1d485ad798e5a77bc209/fastapi_blend_db/app.py#L86-L92), we can interact with both databases transparently.

By making use of FastAPI's dependency injection system, we can inject the virtual session into our endpoints and interact with both databases through a single session.

[Integration tests](https://github.com/dotcs/fastapi-blend-db-demo/blob/main/fastapi_blend_db/tests/test_app.py) are included to demonstrate how to interact with the databases through the session using the FastAPI test client.

## Conclusion

In this post, we have seen how to blend multiple databases in a FastAPI application using SQLAlchemy.
This is a powerful feature that allows you to interact with multiple databases through a single session transparently.
It is flexible and can be extended to support more databases or different database types by adding more database sessions and models.
