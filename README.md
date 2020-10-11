# eCommerce App Server

eCommerce is an application to manage products for web store. This app has:

-   RESTful endpoint for asset's CRUD operation with JSON formatted request & response

Before running this app, please adding the following environment variables:

-   JWT_SECRET

# Restful Endpoints

## Global Response

#### Response (401 - Unauthorized)

> This error describes invalid user on resources access attempt

```json
{
    "message": "Invalid user!"
}
```

> This error describes access token missing

```json
{
    "message": "Missing access token!"
}
```

#### Response (403 - Forbidden)

> This error describes resources access attempt by unprivileged user

```json
{
    "message": "No access!"
}
```

#### Response (404 - Not Found)

> This error describes resources not exists

```json
{
    "message": "Resource not found!"
}
```

#### Response (500 - Internal server error)

> this error describes access token invalid

```json
{
    "message": "Invalid user access token!"
}
```

> This error describes server errors and undefined errors

```json
{
    "message": "Internal server error!"
}
```

---

## USER

<!-- ### POST /users/register

> Create new user

#### Request Header

```json
no needed
```

#### Request Body

| Field    |  Type  | Constraint    | Required |
| :------- | :----: | :------------ | :------: |
| email    | String | email format  |   True   |
| password | String | 4 - 32        |   True   |
| role     | String | admin \| user |   True   |

_Example:_

```json
{
    "email": "user@example.com",
    "password": "password",
    "role": "admin"
}
```

#### Response (201 - Created)

```json
{
    "message": "User registration success!"
}
```

#### Response (400 - Bad Request)

```json
{
    "message": [
        "Email must not be null!",
        "Email must be valid!",
        "Password must not be null",
        "Password length from 4 to 32 characters!",
        "Role must not be null!",
        "Role must be either admin or user!"
    ]
}
```

#### Response (409 - Conflict)

```json
{
    "message": "Email already registered, please use another email!"
}
```

--- -->

### POST /users/login

> Login user

#### Request Header

```json
no needed
```

#### Request Body

| Field    |  Type  | Constraint | Required |
| :------- | :----: | :--------- | :------: |
| email    | String | -          |   True   |
| password | String | -          |   True   |

_Example:_

```json
{
    "email": "user@example.com",
    "password": "password"
}
```

#### Response (200 - OK)

```json
{
    "access_token": "<access_token>"
}
```

#### Response (401 - Unauthorized)

```json
{
    "message": "Email & password combination not found!"
}
```

---

<!-- ### POST /users/google

> Register or Login user using Google account

#### Request Header

```json
no needed
```

#### Request Body

| Field    |  Type  | Constraint            | Required |
| :------- | :----: | :-------------------- | :------: |
| id_token | String | Google OAuth id_token |   True   |

_Example:_

```json
{
    "id_token": "<id_token>"
}
```

#### Response (200 - OK)

```json
{
    "access_token": "<access_token>"
}
```

--- -->

## Product

### POST /products

> Create new product

#### Request Header

```json
{
    "access_token": "<access_token>"
}
```

#### Request Body

| Field     |  Type   | Constraint  | Required |
| :-------- | :-----: | :---------- | :------: |
| name      | String  | 4-255 chars |   True   |
| image_url |  Text   | URL format  |   True   |
| price     | Integer | min 1000    |   True   |
| stock     | Integer | min 0       |   True   |
| category  | String  | 1-255 chars |  False   |

_Example:_

```json
{
    "name": "Product Name",
    "image_url": "<image_url>",
    "price": 1000,
    "stock": 1,
    "category": "product"
}
```

#### Response (201 - Created)

```json
{
    "data": {
        "id": 1,
        "UserId": 1,
        "name": "Product Name",
        "image_url": "<image_url>",
        "price": 1000,
        "stock": 1,
        "category": "product",
        "updatedAt": "2020-06-23T12:09:04.569Z",
        "createdAt": "2020-06-23T12:09:04.569Z"
    }
}
```

#### Response (400 - Bad Request)

```json
{
    "message": [
        "Name must not be null!",
        "Name must be 4 to 255 characters!",
        "Image URL must not be null!",
        "Image URL must be valid URL!",
        "Price must not be null!",
        "Price must be greater than 1000!",
        "Stock must not be null!",
        "Stock must be equal or greater than 0!",
        "Stock must be integer!",
        "category must not be null!",
        "Category must be 1 to 255 characters!"
    ]
}
```

---

### GET /products

> Get all products

```json
{
    "access_token": "<access_token>"
}
```

#### Request Body

```json
no needed
```

#### Response (200 - OK)

```json
{
    "data": [
        {
            "id": 1,
            "UserId": 1,
            "name": "Product Name 1",
            "image_url": "<image_url>",
            "price": 1000,
            "stock": 11,
            "category": "furniture",
            "createdAt": "2020-06-22T15:05:49.637Z",
            "updatedAt": "2020-06-22T15:05:49.637Z"
        },
        {
            "id": 2,
            "UserId": 1,
            "name": "Product Name 2",
            "image_url": "<image_url>",
            "price": 2000,
            "stock": 12,
            "category": "fashion",
            "createdAt": "2020-06-22T15:05:50.769Z",
            "updatedAt": "2020-06-22T15:05:50.769Z"
        },
        {
            "id": 3,
            "UserId": 2,
            "name": "Product Name 3",
            "image_url": "<image_url>",
            "price": 3000,
            "stock": 13,
            "category": "gadget",
            "createdAt": "2020-06-22T15:05:50.769Z",
            "updatedAt": "2020-06-22T15:05:50.769Z"
        }
    ]
}
```

---

### GET /products/:id

> Get single product

#### Params

| name |  Type   | Constraint | Required |
| :--- | :-----: | :--------- | :------: |
| id   | Integer | Product ID |   True   |

_Example URI:_

```text
/products/123
```

#### Request Header

```json
{
    "access_token": "<access_token>"
}
```

#### Request Body

```json
no needed
```

#### Response (200 - OK)

```json
{
    "id": 1,
    "UserId": 1,
    "name": "Product Name 1",
    "image_url": "<image_url>",
    "price": 1000,
    "stock": 11,
    "category": "furniture",
    "createdAt": "2020-06-22T15:05:49.637Z",
    "updatedAt": "2020-06-22T15:05:49.637Z"
},
```

---

### PUT /products/products/:id

> Update single product

#### Params

| name |  Type   | Constraint | Required |
| :--- | :-----: | :--------- | :------: |
| id   | Integer | Task ID    |   True   |

_Example URI:_

```text
/products/123
```

#### Request Header

```json
{
    "access_token": "<access_token>"
}
```

#### Request Body

| Field     |  Type   | Constraint  | Required |
| :-------- | :-----: | :---------- | :------: |
| name      | String  | 4-255 chars |   True   |
| image_url |  Text   | URL format  |   True   |
| price     | Integer | min 1000    |   True   |
| stock     | Integer | min 0       |   True   |
| category  | String  | 1-255 chars |  False   |

_Example:_

```json
{
    "name": "Product Name Updated",
    "image_url": "<image_url>",
    "price": 1000,
    "stock": 1,
    "category": "updated"
}
```

#### Response (200 - OK)

```json
{
    "data": {
        "id": 1,
        "UserId": 1,
        "name": "Product Name Updated",
        "image_url": "<image_url>",
        "price": 1000,
        "stock": 1,
        "category": "updated",
        "updatedAt": "2020-06-23T12:09:04.569Z",
        "createdAt": "2020-06-23T12:09:04.569Z"
    }
}
```

#### Response (400 - Bad Request)

```json
{
    "message": [
        "Name must not be null!",
        "Name must be 4 to 255 characters!",
        "Image URL must not be null!",
        "Image URL must be valid URL!",
        "Price must not be null!",
        "Price must be greater than 1000!",
        "Stock must not be null!",
        "Stock must be equal or greater than 0!",
        "Stock must be integer!",
        "category must not be null!",
        "Category must be 1 to 255 characters!"
    ]
}
```

---

### DELETE /products/:id

> DELETE single product

#### Params

| name |  Type   | Constraint | Required |
| :--- | :-----: | :--------- | :------: |
| id   | Integer | Task ID    |   True   |

_Example URI:_

```text
/products/123
```

#### Request Header

```json
{
    "access_token": "<access_token>"
}
```

#### Request Body

```json
not needed
```

#### Response (200 - OK)

```json
{
    "message": "Product deletion success!"
}
```

---
