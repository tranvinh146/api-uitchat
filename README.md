
# API Reference

A brief description of what this project does and who it's for


## USER

#### Get all users

```
  GET /api/v1/uitchat/users
```

#### Get users by server id

```
  GET /api/v1/uitchat/users/serverId/:id
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Required |

#### Get user by id

```
  GET /api/v1/uitchat/users/:id
```

`Requires access token.`

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Required |

#### Update a user

```
  PATCH /api/v1/uitchat/users
```

`Requires access token.`

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | Optional |
| `password` | `string` | Optional |
| `name` | `string` | Optional |

#### Delete a user
```
  DELETE /api/v1/uitchat/users
```

`Requires admin access token.`

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | Required |

