import { DbClient } from "./db/DbClient";
import { YxUser, YxUserData } from "./db/YxUser";

// ------------------------------ 使用示例 ------------------------------
async function testYxUserOperate() {
    const db = new DbClient();
    try {
        const yx_user = new YxUser(db);
        await yx_user.connect();

        // 2. 查询数据库中的用户（验证中文是否正常）
        const user1 = await yx_user.findYxUser({ id: 1 });
        console.log('查询用户结果:', user1[0]);

        // 1. 新增用户（包含中文和特殊字符）
        const userData = new YxUserData();
        userData.name = '张三';
        const newUserId = await yx_user.createYxUser(userData);
        console.log('新增用户成功，ID:', newUserId);

        // 2. 查询新增的用户（验证中文是否正常）
        const user = await yx_user.findYxUser({ id: newUserId });
        console.log('查询用户结果:', user[0]);

        // 3. 更新用户信息（修改中文昵称）
        const updateRows = await yx_user.updateYxUser(
            { monicker: '新幻灵', money: 200, last_login: 20240101 },
            { id: newUserId }
        );
        console.log('更新影响行数:', updateRows);

        // 4. 再次查询验证更新结果
        const updatedUser = await yx_user.findYxUser({ id: newUserId });
        console.log('更新后用户信息:', updatedUser[0]);

        // // 5. 删除用户
        // const deleteRows = await yx_user.deleteYxUser({ id: newUserId });
        // console.log('删除影响行数:', deleteRows);

    } catch (err) {
        console.error('操作失败:', (err as Error).message);
    } finally {
        await db.close();
    }
}
// 执行测试
testYxUserOperate();