# Assigment2 Backend Expressjs mongoose pembuatan game Clash Of Village

this game a lot of attack system and CRUD system 
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

> This error describes resources access attempt by userId

```json
{
    "message": "FORBIDDEN!"
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

| Field         |  Type  | Constraint       | Required |
| :-------      | :----: | :------------    | :------: |
| username      | String | username format  |   True   |
| email         | String | email format     |   True   |
| password      | String | 4 - 32           |   True   |

_Example:_

```json
{
    "username":"angga1",
    "email": "user@example.com",
    "password": "password",
}
```

#### Response (201 - Created)

```json
{
    "succes":true
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
    ]
}
```

#### Response (409 - Conflict)

```json
{
    "message": "Email or username already Exist, please use another email!"
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

| Field         |  Type  | Constraint | Required |
| :-------      | :----: | :--------- | :------: |
| username      | String | -          |   True   |
| password      | String | -          |   True   |

_Example:_

```json
{
    "username": "angga",
    "password": "password"
}
```

#### Response (200 - OK)

```json
{
    "data":"oke result"
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

## Market

### POST / market

> Create new market

#### Request Header

```json
{
    "access_token": "<access_token>"
}
```

#### Request Body

| Field     |  Type   | Constraint  | Required |
| :-------- | :-----: | :---------- | :------: |
| name      | String  |             |   True   |


_Example:_

```json
{
    "name": "My Market",
}
```

#### Response (201 - Created)

```json
{
    "data": [
    {
      "lastCollected": 1602426749538,
      "_id": "5f8318a40d4ea94c525d0f80",
      "_userId": "5f83186c0d4ea94c525d0f7f",
      "name": "MarketAngga4",
      "__v": 0
    },
}
```

#### Response (400 - Bad Request)

```json
{
    "message": [
        "server_error!",
    ]
}
```

---

### GET /market

> Get all market

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
      "lastCollected": 1602426749538,
      "_id": "5f8318a40d4ea94c525d0f80",
      "_userId": "5f83186c0d4ea94c525d0f7f",
      "name": "MarketAngga4",
      "__v": 0
    },
    {
      "lastCollected": 1602427693334,
      "_id": "5f831b9de93ece509abbf341",
      "_userId": "5f83186c0d4ea94c525d0f7f",
      "name": "MarketAnggasusah",
      "__v": 0
    }
    ]
}
```

---

### GET /market/:id

> Get single product

#### Params

| name |  Type   | Constraint | Required |
| :--- | :-----: | :--------- | :------: |
| id   | Integer | marker ID  |   True   |

_Example URI:_

```text
/market/123
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

  "data": [
  {
      "lastCollected": 1602426749538,
      "_id": "5f8318a40d4ea94c525d0f80",
      "_userId": "5f83186c0d4ea94c525d0f7f",
      "name": "MarketAngga4",
      "__v": 0
      "createdAt": "2020-06-22T15:05:49.637Z",
      "updatedAt": "2020-06-22T15:05:49.637Z"
},
```

---

### PUT /markets/:id

> Update single product

#### Params

| name |  Type   | Constraint | Required |
| :--- | :-----: | :--------- | :------: |
| id   | Integer | Task ID    |   True   |

_Example URI:_

```text
/market/123
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

_Example:_

```json
{
    "name": "marketz name Updated",
}
```

#### Response (200 - OK)

```json
"data": [
  {
      "lastCollected": 1602426749538,
      "_id": "5f8318a40d4ea94c525d0f80",
      "_userId": "5f83186c0d4ea94c525d0f7f",
      "name": "MarketAngga4",
      "__v": 0
      "createdAt": "2020-06-22T15:05:49.637Z",
      "updatedAt": "2020-06-22T15:05:49.637Z"
},
```

#### Response (400 - Bad Request)

```json
{
    "message": [
        "server_error",
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
/market/123
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
    "message": "marketz deletion success!"
}
```
#Attack


#### Request Body

| Field             |  Type  | Constraint | Required |
| :-------          | :----: | :--------- | :------: |
| acces_token       | String | -          |   True   |
| soldiers          | Number | -          |   True   |

_Example:_

```json
{
    "soldiers":0
}
```

### Respon

```json
{
    message:NOT ENOUGH
}
```

#### post attack request bosy

```json
{
    "access_token": "<access_token>"
    "soliders":10,
}
```
#### Response (200 - OK Attack Succes )

```json
{
    "message": "attack succes!"
}
```
