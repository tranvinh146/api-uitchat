
# API Reference

A brief description of what this project does and who it's for


## USER

#### Get all users

```http
  GET /api/v1/uitchat/users
```

#### Get user by id

```http
  GET /api/v1/uitchat/users/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required** |

#### Add a user

```http
  POST /api/v1/uitchat/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required** |
| `password` | `string` | **Required** |
| `name` | `string` | **Required** |

#### Update a user

```http
  PATCH /api/v1/uitchat/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required** |
| `username` | `string` | Optional |
| `password` | `string` | Optional |
| `name` | `string` | Optional |

#### Delete a user

```http
  DELETE /api/v1/uitchat/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | **Required** |

