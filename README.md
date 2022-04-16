
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

