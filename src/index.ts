import { DbClient } from "./db/DbClient";
import { YxUser } from "./db/YxUser";

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
        const newUserId = await yx_user.createYxUser({
            name: '测试用户',
            mate: '称号',
            monicker: '配偶',
            look: 0,
            face: 1,
            life: 30,
            power: 20,
            money: 100,
            money_saved: 0,
            repute: 0,
            level: 1,
            exp: 0,
            exp_smith: 0,
            exp_creative: 0,
            exp_medicine: 0,
            exp_steal: 0,
            physique: 1,
            stamina: 11,
            force: 7,
            speed: 5,
            degree: 1,
            recordx: 12,
            recordy: 15,
            recordmap_id: 140000,
            metempsychosis: 0,
            deed: 0,
            additional_point: 0,
            task_mask: 0,
            pk_enable: 0,
            home_id: 0,
            syndicate_id: 0,
            pet_count: 1,
            petused_id: 1,
            pet0_id: 1,
            pet1_id: 0,
            pet2_id: 0,
            pet3_id: 0,
            pet4_id: 0,
            skill_count: 0,
            skill0_id: 0,
            skill1_id: 0,
            skill2_id: 0,
            skill3_id: 0,
            skill4_id: 0,
            skill5_id: 0,
            skill6_id: 0,
            skill7_id: 0,
            skill8_id: 0,
            skill9_id: 0,
            skill10_id: 0,
            weapon_id: 0,
            armor_id: 0,
            shoes_id: 0,
            treasure0_id: 0,
            treasure1_id: 0,
            account_id: 1,
            degree_lev: 0,
            lockkey: 0,
            intellect: 0,
            quiz_point: 0,
            coin_money: 0,
            marriage: null,
            last_login: 20200507
        });
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