# 幻灵游戏服务端 HTTP API 文档

## 概述

- 服务地址：`http://<host>:8081`
- 响应格式统一为 `MResponse<T>`：
  ```json
  {
    "code": 0,
    "data": {},
    "msg": ""
  }
  ```
  - `code = 0` 表示成功
  - `code > 0` 表示业务错误
  - `code = 500` 表示服务器内部错误
- 除登录/注册接口外，其他接口需要在请求头中携带 `Authorization`：
  ```
  Authorization: <jwt_token>
  ```
  也兼容 `Authorization: Bearer <jwt_token>`。

## 接口列表

### 1. 登录

- **URL**：`POST /auth/login`
- **请求头**：`Content-Type: application/json`
- **请求体**：
  ```json
  {
    "account": "string",
    "password": "string"
  }
  ```

  > `token` 字段在客户端 `ReqLogin` 接口中有定义，但服务端登录逻辑不使用，可传可不传。
- **响应**：`MResponse<{ token: string; user: UserVo }>`
- **说明**：校验账号密码，成功后返回 JWT 和用户信息。客户端应将响应中的 `data.token` 保存到 `Player.inst.token`，后续接口通过 `Authorization` 请求头携带。

### 2. 注册

- **URL**：`POST /auth/register`
- **请求头**：`Content-Type: application/json`
- **请求体**：
  ```json
  {
    "account": "string",
    "password": "string",
    "nickname": "string",
    "QQ": "string"
  }
  ```
- **响应**：`MResponse<{ token: string; user: UserVo }>`
- **说明**：创建账号、用户、初始宠物，并返回 JWT 和用户信息。

### 3. 获取用户信息

- **URL**：`POST /user/info`
- **请求头**：
  ```
  Content-Type: application/json
  Authorization: <jwt_token>
  ```
- **请求体**：
  ```json
  {
    "acc_id": 0,
    "user_id": 0,
    "token": "string"
  }
  ```
- **响应**：`MResponse<UserVo>`
- **说明**：根据 `user_id` 查询用户信息。

### 4. 人物排行榜

- **URL**：`POST /user/findRank`
- **请求头**：
  ```
  Content-Type: application/json
  Authorization: <jwt_token>
  ```
- **请求体**：
  ```json
  {
    "rankType": "string"
  }
  ```
- **响应**：`MResponse<UserVo[]>`
- **rankType 取值**：

  | rankType | 标题 | 排序字段 |
  | --- | --- | --- |
  | "0" | 人物红利排行榜 | additional_point |
  | "2" | 人物修为排行榜 | degree_lev |
  | "3" | 人物金钱排行榜 | money |
  | "4" | 人物爱心排行榜 | id（临时） |
  | "5" | 人物功德排行榜 | deed |
  | "6" | 人物养宠排行榜 | exp_medicine |
  | "7" | 人物创招排行榜 | exp_creative |
  | "8" | 人物声望排行榜 | repute |
  | "9" | 人物炼化排行榜 | exp_smith |
  | "10" | 人物偷窃排行榜 | exp_steal |

### 5. 宠物排行榜

- **URL**：`POST /pet/findPetRank`
- **请求头**：
  ```
  Content-Type: application/json
  Authorization: <jwt_token>
  ```
- **请求体**：
  ```json
  {
    "catena": "string",
    "isEvolution": "string"
  }
  ```
- **响应**：`MResponse<PetRankBean[]>`
- **参数说明**：
  - `catena`：属性过滤
    - `""` 全部
    - `"2"` 水
    - `"3"` 火
    - `"4"` 金
    - `"5"` 木
    - `"6"` 土
    - `"7"` 无属性
  - `isEvolution`：进化过滤
    - `""` 全部
    - `"1"` 进化
    - `"7"` 不进化

### 6. 人物排行榜（WWW不加密 风格）

- **URL**：`POST /user/leaderboard`
- **请求头**：

  ```text
  Content-Type: application/json
  Authorization: <jwt_token>
  ```

- **请求体**：

  ```json
  {
    "type": "hongli" | "deed" | "money"
  }
  ```

- **响应**：`MResponse<UserLeaderboardRow[]>`
- **说明**：
  - `hongli`：人物红利榜，按 `floor(additional_point/100000)` 降序，再按 `degree_lev` 降序。
  - `deed`：人物功德榜，按 `deed` 降序。
  - `money`：人物幻币榜，按 `money + money_saved` 降序。
  - 均只返回 `account_id` 在 `1~9999` 之间的玩家。

### 7. 宠物排行榜（WWW不加密 风格）

- **URL**：`POST /pet/leaderboard`
- **请求头**：

  ```text
  Content-Type: application/json
  Authorization: <jwt_token>
  ```

- **请求体**：

  ```json
  {
    "type": "all" | "nonEvolution"
  }
  ```

- **响应**：`MResponse<PetLeaderboardRow[]>`
- **说明**：
  - `all`：所有宠物总榜，排除 `floor(class/10000) = 7` 且 `level <= 1` 的宠物。
  - `nonEvolution`：不可进化宠榜，只保留 `floor(class/10000) = 7` 的宠物。
  - 按 PHP 成长公式 `(attack+defence+dexterity - base_stats)/(level-1)` 降序排列。

## 数据类型

### UserVo

```typescript
interface UserVo {
  name: string;
  mate: string;
  monicker: string;
  look: number;
  face: number;
  life: number;
  power: number;
  money: number;
  money_saved: number;
  repute: number;
  level: number;
  exp: number;
  exp_smith: number;
  exp_creative: number;
  exp_medicine: number;
  exp_steal: number;
  physique: number;
  stamina: number;
  force: number;
  speed: number;
  degree: number;
  recordx: number;
  recordy: number;
  recordmap_id: number;
  metempsychosis: number;
  deed: number;
  additional_point: number;
  task_mask: number;
  pk_enable: number;
  home_id: number;
  syndicate_id: number;
  pet_count: number;
  petused_id: number;
  pet0_id: number;
  pet1_id: number;
  pet2_id: number;
  pet3_id: number;
  pet4_id: number;
  skill_count: number;
  skill0_id: number;
  skill1_id: number;
  skill2_id: number;
  skill3_id: number;
  skill4_id: number;
  skill5_id: number;
  skill6_id: number;
  skill7_id: number;
  skill8_id: number;
  skill9_id: number;
  skill10_id: number;
  weapon_id: number;
  armor_id: number;
  shoes_id: number;
  treasure0_id: number;
  treasure1_id: number;
  account_id: number;
  id: number;
  degree_lev: number;
  lockkey: number;
  intellect: number;
  quiz_point: number;
  coin_money: number;
  marriage: number;
  last_login: number;
  hongli: number;
  toutaishu: number;
  love: number;
  qq: string;
  token: string;
}
```

注：`hongli`、`toutaishu`、`love`、`qq`、`token` 为派生字段，不在 `yx_user` 表中。

### PetRankBean

```typescript
interface PetRankBean {
  id: number;
  owner_name: string;
  prop: string;
  pet_origin_name: string;
  pet_name: string;
  grow_rate: string;
  grow_point: number;
  level: number;
  attack: number;
  defence: number;
  dexterity: number;
  life: number;
  generation: number;
  medal_attack: number;
  medal_defence: number;
  medal_dexterity: number;
  treasure_id: number;
  pet_treasure: string;
}
```

### UserLeaderboardRow

```typescript
interface UserLeaderboardRow {
  rank: number;
  name: string;
  look: number;
  level: number;
  metempsychosis: number;
  toutai: number;
  degree_lev: number;
  money: number;
  hongli?: number;
  deed?: number;
  total_money?: number;
}
```

### PetLeaderboardRow

```typescript
interface PetLeaderboardRow {
  rank: number;
  owner_name: string;
  pet_name: string;
  class: number;
  className: string;
  level: number;
  grow: number;
  generation: number;
}
```

## 运行与测试

```bash
# 安装依赖
npm install

# 开发模式启动
npm run dev:server

# 编译
npm run build:server

# 生产启动
npm run start:server
```

### curl 示例

登录：
```bash
curl -X POST http://localhost:8081/auth/login \
  -H "Content-Type: application/json" \
  -d '{"account":"test","password":"123456"}'
```

人物排行榜：
```bash
curl -X POST http://localhost:8081/user/findRank \
  -H "Content-Type: application/json" \
  -H "Authorization: <token>" \
  -d '{"rankType":"3"}'
```

宠物排行榜：
```bash
curl -X POST http://localhost:8081/pet/findPetRank \
  -H "Content-Type: application/json" \
  -H "Authorization: <token>" \
  -d '{"catena":"2","isEvolution":"1"}'
```
