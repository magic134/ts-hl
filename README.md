# 游戏数据库模型 TypeScript 实现

本项目将SQL文件夹中的所有SQL文件实现成了YxUser.ts格式的TypeScript类，提供了完整的数据库操作功能。

## 📁 项目结构

```
src/
├── db/
│   ├── DbClient.ts          # 数据库客户端
│   ├── YxUser.ts           # 用户表模型
│   ├── YxPet.ts            # 宠物表模型
│   ├── YxItem.ts            # 物品表模型
│   ├── YxSkill.ts           # 技能表模型
│   ├── YxSyndicate.ts       # 公会表模型
│   ├── YxSynMember.ts       # 公会成员表模型
│   ├── YxMonster.ts         # 怪物表模型
│   ├── YxNpc.ts             # NPC表模型
│   ├── YxTask.ts            # 任务表模型
│   ├── YxStorage.ts         # 存储表模型
│   ├── YxUserItem.ts        # 用户物品表模型
│   ├── YxUserPet.ts         # 用户宠物数据表模型
│   ├── YxUserSkill.ts       # 用户技能数据表模型
│   └── index.ts             # 统一导出文件
├── index.ts                 # 主入口文件（包含使用示例）
└── ...
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置数据库

在 `src/db/DbClient.ts` 中配置数据库连接信息：

```typescript
const DB_CONFIG = {
    host: '192.168.171.128',
    user: 'root',
    password: 'root',
    database: 'hlyx',
    port: 3306,
    charset: 'gbk'
};
```

### 3. 使用示例

```typescript
import { DbClient, YxUser, YxUserData } from './db';

async function example() {
    const db = new DbClient();
    try {
        await db.connect();
        
        // 创建用户
        const yx_user = new YxUser(db);
        const userData = new YxUserData();
        userData.name = '张三';
        userData.account_id = 1;
        const userId = await yx_user.createYxUser(userData);
        
        // 查询用户
        const users = await yx_user.findYxUser({ name: '张三' });
        console.log(users);
        
        // 更新用户
        await yx_user.updateYxUser(
            { monicker: '新称号', money: 1000 },
            { id: userId }
        );
        
    } finally {
        await db.close();
    }
}
```

## 📊 已实现的表模型

| 表名 | 模型类 | 数据类 | 说明 |
|------|--------|--------|------|
| yx_user | YxUser | YxUserData | 用户基本信息 |
| yx_pet | YxPet | YxPetData | 宠物信息 |
| yx_item | YxItem | YxItemData | 物品信息 |
| yx_skill | YxSkill | YxSkillData | 技能信息 |
| yx_syndicate | YxSyndicate | YxSyndicateData | 公会信息 |
| yx_synmember | YxSynMember | YxSynMemberData | 公会成员 |
| yx_monster | YxMonster | YxMonsterData | 怪物信息 |
| yx_npc | YxNpc | YxNpcData | NPC信息 |
| yx_task | YxTask | YxTaskData | 任务信息 |
| yx_storage | YxStorage | YxStorageData | 存储信息 |
| yx_useritem | YxUserItem | YxUserItemData | 用户物品 |
| yx_userpetdata | YxUserPet | YxUserPetData | 用户宠物数据 |
| yx_userskilldata | YxUserSkill | YxUserSkillData | 用户技能数据 |

## 🔧 每个模型类提供的功能

每个模型类都提供以下标准方法：

- `findXxx(condition?)` - 查询数据
- `createXxx(data)` - 创建数据
- `updateXxx(data, condition)` - 更新数据
- `deleteXxx(condition)` - 删除数据
- `connect()` - 连接数据库
- `close()` - 关闭连接

## 🎯 特性

- ✅ **类型安全**: 完整的TypeScript类型定义
- ✅ **中文支持**: 特别处理了中文字符编码（GBK）
- ✅ **统一接口**: 所有表模型使用相同的CRUD接口
- ✅ **错误处理**: 完善的错误处理和验证
- ✅ **连接管理**: 自动管理数据库连接
- ✅ **字段验证**: 必填字段验证

## 🛠️ 构建和运行

```bash
# 编译TypeScript
npm run build

# 监听模式编译
npm run watch

# 使用ts-node直接运行
npm run tsnode
```

## 📝 注意事项

1. **数据库编码**: 项目使用GBK编码支持中文，确保数据库配置正确
2. **字段完整性**: 部分表字段较多，实际使用时请根据完整SQL结构补充
3. **必填字段**: 每个模型都有必填字段验证，创建数据时请确保提供
4. **连接管理**: 使用完毕后请调用`close()`方法关闭数据库连接

## 🔄 扩展

如需添加新的表模型，请按照以下步骤：

1. 在`src/db/`目录下创建新的模型文件
2. 按照现有格式实现Data类和Model类
3. 在`src/db/index.ts`中添加导出
4. 更新类型定义

## 📄 许可证

MIT License
