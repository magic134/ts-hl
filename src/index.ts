import { DbClient } from "./db/DbClient";
import { 
    YxUser, YxUserData,
    YxPet, YxPetData,
    YxItem, YxItemData,
    YxSkill, YxSkillData,
    YxSyndicate, YxSyndicateData,
    YxMonster, YxMonsterData,
    YxNpc, YxNpcData,
    YxTask, YxTaskData,
    YxStorage, YxStorageData,
    YxUserItem, YxUserItemData,
    YxUserPet, YxUserPetData,
    YxUserSkill, YxUserSkillData,
    YxSynMember, YxSynMemberData,
    YxAction, YxActionData,
    YxAssembly, YxAssemblyData,
    YxBonus, YxBonusData,
    YxColosseum, YxColosseumData,
    YxContestAward, YxContestAwardData,
    YxEvent, YxEventData,
    YxGoodFriend, YxGoodFriendData,
    YxItemType, YxItemTypeData,
    YxLeaveWord, YxLeaveWordData,
    YxPetCollection, YxPetCollectionData,
    YxPetColor, YxPetColorData,
    YxPlayerMap, YxPlayerMapData,
    YxPlayerNpc, YxPlayerNpcData,
    YxQuiz, YxQuizData,
    YxSkillType, YxSkillTypeData,
    YxSubGroup, YxSubGroupData,
    YxUserColor, YxUserColorData,
    Account, AccountData,
    BallCard, BallCardData,
    FwItem, FwItemData
} from "./db";


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
// ------------------------------ 综合使用示例 ------------------------------
async function testAllModels() {
    const db = new DbClient();
    try {
        await db.connect();
        console.log('数据库连接成功');

        // 1. 用户操作示例
        const yx_user = new YxUser(db);
        const userData = new YxUserData();
        userData.name = '测试用户';
        userData.account_id = 1;
        const newUserId = await yx_user.createYxUser(userData);
        console.log('创建用户成功，ID:', newUserId);

        // 2. 宠物操作示例
        const yx_pet = new YxPet(db);
        const petData = new YxPetData();
        petData.name = '测试宠物';
        petData.owner_id = newUserId;
        const newPetId = await yx_pet.createYxPet(petData);
        console.log('创建宠物成功，ID:', newPetId);

        // 3. 物品操作示例
        const yx_item = new YxItem(db);
        const itemData = new YxItemData();
        itemData.name = '测试物品';
        itemData.cost = 100;
        const newItemId = await yx_item.createYxItem(itemData);
        console.log('创建物品成功，ID:', newItemId);

        // 4. 技能操作示例
        const yx_skill = new YxSkill(db);
        const skillData = new YxSkillData();
        skillData.name = '测试技能';
        skillData.power = 50;
        const newSkillId = await yx_skill.createYxSkill(skillData);
        console.log('创建技能成功，ID:', newSkillId);

        // 5. 公会操作示例
        const yx_syndicate = new YxSyndicate(db);
        const syndicateData = new YxSyndicateData();
        syndicateData.name = '测试公会';
        syndicateData.title = '测试公会标题';
        const newSyndicateId = await yx_syndicate.createYxSyndicate(syndicateData);
        console.log('创建公会成功，ID:', newSyndicateId);

        // 6. 查询示例
        const users = await yx_user.findYxUser({ name: '测试用户' });
        console.log('查询用户结果:', users);

        const pets = await yx_pet.findYxPet({ owner_id: newUserId });
        console.log('查询宠物结果:', pets);

        // 7. 更新示例
        await yx_user.updateYxUser(
            { monicker: '新称号', money: 500 },
            { id: newUserId }
        );
        console.log('更新用户成功');

        // 8. 用户宠物数据操作示例
        const yx_userpet = new YxUserPet(db);
        const userPetData = new YxUserPetData();
        userPetData.userid = newUserId;
        userPetData.pet_count = 1;
        userPetData.pet0_id = newPetId;
        await yx_userpet.createYxUserPet(userPetData);
        console.log('创建用户宠物数据成功');

        // 10. 账户操作示例
        const account = new Account(db);
        const accountData = new AccountData();
        accountData.name = 'test_account';
        accountData.password = '123456';
        const newAccountId = await account.createAccount(accountData);
        console.log('创建账户成功，ID:', newAccountId);

        // 11. 卡片操作示例
        const ballCard = new BallCard(db);
        const cardData = new BallCardData();
        cardData.card_id = 'CARD001';
        cardData.password = '123456';
        const newCardId = await ballCard.createBallCard(cardData);
        console.log('创建卡片成功，ID:', newCardId);

        // 12. 问答操作示例
        const quiz = new YxQuiz(db);
        const quizData = new YxQuizData();
        quizData.question = '什么是TypeScript？';
        quizData.answer0 = 'A. JavaScript的超集';
        quizData.answer1 = 'B. 一种新的编程语言';
        quizData.answer2 = 'C. 数据库管理系统';
        quizData.answer3 = 'D. 操作系统';
        quizData.result = 0;
        const newQuizId = await quiz.createYxQuiz(quizData);
        console.log('创建题目成功，ID:', newQuizId);

        // 13. 留言操作示例
        const leaveWord = new YxLeaveWord(db);
        const leaveWordData = new YxLeaveWordData();
        leaveWordData.user_id = newUserId;
        leaveWordData.send_name = '系统';
        leaveWordData.words = '欢迎来到游戏！';
        const newLeaveWordId = await leaveWord.createYxLeaveWord(leaveWordData);
        console.log('创建留言成功，ID:', newLeaveWordId);

        // 14. 好友操作示例
        const goodFriend = new YxGoodFriend(db);
        const friendData = new YxGoodFriendData();
        friendData.userid = newUserId;
        friendData.friendcount = 1;
        friendData.friend0 = 999; // 假设的好友ID
        await goodFriend.createYxGoodFriend(friendData);
        console.log('创建好友数据成功');

        console.log('所有操作完成！');

    } catch (err) {
        console.error('操作失败:', (err as Error).message);
    } finally {
        await db.close();
    }
}

// 执行测试
console.log('=== 执行用户操作测试 ===');
testYxUserOperate();

console.log('\n=== 执行综合模型测试 ===');
testAllModels();