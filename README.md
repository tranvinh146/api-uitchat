
## USER

#### Get all users

```
  GET /api/v1/uitchat/users
```
`Requires access token.`
#### Get user by id

```
  GET /api/v1/uitchat/users/:id
```
`Requires access token.`
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Required |

#### Add a user

```
  POST /api/v1/uitchat/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | Required |
| `password` | `string` | Required |
| `name` | `string` | Required |

#### Update a user

```
  PATCH /api/v1/uitchat/users
```
`Requires access token.`
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | Required |
| `username` | `string` | Optional |
| `password` | `string` | Optional |
| `name` | `string` | Optional |

#### Delete a user
`Requires admin access token.`
```
  DELETE /api/v1/uitchat/users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | Required |

