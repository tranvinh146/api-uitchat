

# API Reference

## SERVER

All server's api **require** Authorization token.

#### Get servers by user_id

```
  GET /api/v1/uitchat/servers
```

#### Create new server

```
  POST /api/v1/uitchat/servers
```

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string` | **Required**. Name of server      |
| `avatar`  | `string` | **Required**. Image URL           |

#### Update server information

```
  PATCH /api/v1/uitchat/servers
```

| Body         | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `server_id`  | `string` | **Required**. Server Id           |
| `name`       | `string` | **Optional**. Name of server      |
| `avatar`     | `string` | **Optional**. Image URL           |

#### Delete server

```
  DELETE /api/v1/uitchat/servers
```

| Body         | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `server_id`  | `string` | **Required**. Server Id           |

#### Get server by id

```
  GET /api/v1/uitchat/servers/:id
```

| Param        | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `server_id`  | `string` | **Required**. Server Id           |

#### Add users into server

```
  POST /api/v1/uitchat/servers/users
```

| Body         | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `server_id`  | `string` | **Required**. Server Id           |
| `user_list`  | `Array`  | **Required**. List of UserId      |

#### Remove users in server

```
  DELETE /api/v1/uitchat/servers/users
```

| Body         | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `server_id`  | `string` | **Required**. Server Id           |
| `user_list`  | `Array`  | **Required**. List of UserId      |

<hr>

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

