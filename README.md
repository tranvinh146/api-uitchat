
# API Reference

A brief description of what this project does and who it's for

## Server

All server's api **require** Authorization token.

#### Get servers by user_id

```http
  GET /api/v1/uitchat/servers
```

#### Create new server

```http
  POST /api/v1/uitchat/servers
```

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`    | `string` | **Required**. Name of server      |
| `avatar`  | `string` | **Required**. Image URL           |

#### Update server information

```http
  PATCH /api/v1/uitchat/servers
```

| Body         | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `server_id`  | `string` | **Required**. Server Id           |
| `name`       | `string` | **Optional**. Name of server      |
| `avatar`     | `string` | **Optional**. Image URL           |

#### Delete server

```http
  DELETE /api/v1/uitchat/servers
```

| Body         | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `server_id`  | `string` | **Required**. Server Id           |

#### Get server by id

```http
  GET /api/v1/uitchat/servers/:id
```

| Param        | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `server_id`  | `string` | **Required**. Server Id           |

#### Add users into server

```http
  POST /api/v1/uitchat/servers/users
```

| Body         | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `server_id`  | `string` | **Required**. Server Id           |
| `user_list`  | `Array`  | **Required**. List of UserId      |

#### Remove users in server

```http
  DELETE /api/v1/uitchat/servers/users
```

| Body         | Type     | Description                       |
| :----------- | :------- | :-------------------------------- |
| `server_id`  | `string` | **Required**. Server Id           |
| `user_list`  | `Array`  | **Required**. List of UserId      |

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



## CHANNEL

#### Post Channel

```http
  POST /api/v1/uitchat/channels
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `serverId` | `ObjectId` | **Required** |
| `channelName` | `string` | **Required**|
| `channelType` | `string` | **Required**|
| `leadersList` | `[ObjectId]` | Optional|
| `usersList` | `[ObjectId` | Optional|

#### Update Channel

```http
  PUT /api/v1/uitchat/channels
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `channelId` | `ObjectId` | **Required**|
| `channelName` | `string` | **Required**|

#### Delete channel

```http
  DELETE /api/v1/uitchat/channels
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `channelId`| `ObjectId` | **Required**|

#### Get Channel by Server Id

```http
  GET /api/v1/uitchat/channels/:serverId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `serverId`| `string` | **Required**|

#### Delete Users by Channel Id

```http
  DELETE /api/v1/uitchat/channels/users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `channelId`| `ObjectId` | **Required**|
| `usersList`| `[ObjectId]` | **Required**|

#### Update Users by Channel Id

```http
  PUT /api/v1/uitchat/channels/users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `channelId`| `ObjectId` | **Required**|
| `usersList`| `[ObjectId]` | **Required**|

#### Delete Leaders by Channel Id

```http
  DELETE /api/v1/uitchat/channels/leaders
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `channelId`| `ObjectId` | **Required**|
| `leadersList`| `[ObjectId]` | **Required**|

#### Update Leaders by Channel Id

```http
  PUT /api/v1/uitchat/channels/leaders
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `channelId`| `ObjectId` | **Required**|
| `leadersList`| `[ObjectId]` | **Required**|

