// 数据库客户端
export { DbClient } from './DbClient';

// 用户相关
export { YxUser, YxUserData } from './YxUser';
export { YxUserItem, YxUserItemData } from './YxUserItem';
export { YxUserPet, YxUserPetData } from './YxUserPet';
export { YxUserSkill, YxUserSkillData } from './YxUserSkill';
export { YxUserColor, YxUserColorData } from './YxUserColor';

// 宠物相关
export { YxPet, YxPetData } from './YxPet';
export { YxPetCollection, YxPetCollectionData } from './YxPetCollection';
export { YxPetColor, YxPetColorData } from './YxPetColor';

// 物品相关
export { YxItem, YxItemData } from './YxItem';
export { YxItemType, YxItemTypeData } from './YxItemType';
export { FwItem, FwItemData } from './FwItem';

// 技能相关
export { YxSkill, YxSkillData } from './YxSkill';
export { YxSkillType, YxSkillTypeData } from './YxSkillType';

// 公会相关
export { YxSyndicate, YxSyndicateData } from './YxSyndicate';
export { YxSynMember, YxSynMemberData } from './YxSynMember';
export { YxSubGroup, YxSubGroupData } from './YxSubGroup';

// 怪物相关
export { YxMonster, YxMonsterData } from './YxMonster';

// NPC相关
export { YxNpc, YxNpcData } from './YxNpc';
export { YxPlayerNpc, YxPlayerNpcData } from './YxPlayerNpc';

// 任务相关
export { YxTask, YxTaskData } from './YxTask';

// 存储相关
export { YxStorage, YxStorageData } from './YxStorage';

// 地图相关
export { YxPlayerMap, YxPlayerMapData } from './YxPlayerMap';

// 动作相关
export { YxAction, YxActionData } from './YxAction';

// 组装相关
export { YxAssembly, YxAssemblyData } from './YxAssembly';

// 奖励相关
export { YxBonus, YxBonusData } from './YxBonus';
export { YxContestAward, YxContestAwardData } from './YxContestAward';

// 角斗场相关
export { YxColosseum, YxColosseumData } from './YxColosseum';

// 事件相关
export { YxEvent, YxEventData } from './YxEvent';

// 好友相关
export { YxGoodFriend, YxGoodFriendData } from './YxGoodFriend';

// 留言相关
export { YxLeaveWord, YxLeaveWordData } from './YxLeaveWord';

// 问答相关
export { YxQuiz, YxQuizData } from './YxQuiz';

// 账户相关
export { Account, AccountData } from './Account';

// 卡片相关
export { BallCard, BallCardData } from './BallCard';

// 所有数据库模型和数据类型的统一导出
// 使用示例：
// import { YxUser, YxUserData, DbClient } from './db';
// const db = new DbClient();
// const userModel = new YxUser(db);
