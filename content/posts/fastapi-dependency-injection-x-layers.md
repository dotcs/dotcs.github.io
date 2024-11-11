---
title: Combining FastAPI Dependency Injection with Service and Repository Layers
excerpt: Learn how to integrate FastAPI's DI system with other DI systems at different application layers to improve testability.
keywords: [FastAPI, Dependency Injection, Service Layer, Repository Layer, Testing, Pytest]
authors:
  - dotcs
published_at: "2024-11-11T21:50:16+01:00"
updated_at: "2024-11-11T21:50:16+01:00"
---

FastAPI has a wonderful Dependency Injection (DI) system that works reasonably well at the controller level.
However, to build a robust and testable application, it is essential to combine FastAPI's DI with other DI systems that work at lower application levels, such as the service layer or the repository layer.
This approach not only promotes a clean architecture but also significantly improves the test situation.

## Combining DI Systems

### Controller Level

FastAPI's DI system allows to inject dependencies directly into route handlers.
For example:

```python
from fastapi import FastAPI, Depends

app = FastAPI()

def get_db():
    # Return a database session
    pass

@app.get("/items/")
def read_items(db = Depends(get_db)):
    # Use the db session
    pass
```

### Service Layer

The service layer contains business logic and can also benefit from DI.
Here is an example of a service class:

```python
class ItemService:
    def __init__(self, db):
        self.db = db

    def get_items(self):
        # Business logic to get items
        pass
```

### Repository Layer

The repository layer handles data access.
Here is an example of a repository class:

```python
class ItemRepository:
    def __init__(self, db):
        self.db = db

    def fetch_items(self):
        # Data access logic to fetch items
        pass
```

### Integrating All Layers

To integrate these layers, you can use FastAPI's DI system to inject dependencies into the service and repository layers:

```python
from fastapi import FastAPI, Depends

app = FastAPI()

def get_db():
    # Return a database session
    pass

def get_item_repository(db = Depends(get_db)):
    return ItemRepository(db)

def get_item_service(item_repository = Depends(get_item_repository)):
    return ItemService(item_repository)

@app.get("/items/")
def read_items(item_service = Depends(get_item_service)):
    return item_service.get_items()
```

## Improving Testability

Combining DI systems across different layers makes it easier to write tests.
You can use pytest and fixtures to mock dependencies and test each layer in isolation.

### Testing the Repository Layer

```python
import pytest

@pytest.fixture
def mock_db():
    # Return a mock database session
    pass

@pytest.fixture
def item_repository(mock_db):
    return ItemRepository(mock_db)

def test_fetch_items(item_repository):
    items = item_repository.fetch_items()
    assert items is not None
```

### Testing the Service Layer

```python
import pytest

@pytest.fixture
def mock_item_repository():
    # Return a mock item repository
    pass

@pytest.fixture
def item_service(mock_item_repository):
    return ItemService(mock_item_repository)

def test_get_items(item_service):
    items = item_service.get_items()
    assert items is not None
```

### Testing the Controller Level

```python
from fastapi.testclient import TestClient
import pytest

@pytest.fixture
def mock_item_service():
    # Return a mock item service
    pass

@pytest.fixture
def app(mock_item_service):
    app = FastAPI()

    @app.get("/items/")
    def read_items(item_service = Depends(lambda: mock_item_service)):
        return item_service.get_items()

    return app

def test_read_items(app):
    client = TestClient(app)
    response = client.get("/items/")
    assert response.status_code == 200
    assert response.json() is not None
```

## Conclusion

By combining FastAPI's DI system with other DI systems at the service and repository layers, you can create a clean and testable architecture.
This approach allows you to isolate and test each layer independently, improving the overall quality and maintainability of your application.
