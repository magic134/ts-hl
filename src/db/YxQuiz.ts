import { DbClient } from "./DbClient";

export class YxQuizData {
    id: number;                             // 题目ID（主键）
    type: number = 0;                       // 题目类型
    level: number = 0;                       // 题目等级
    question: string = '';                   // 问题
    answer0: string = '';                    // 答案0
    answer1: string = '';                    // 答案1
    answer2: string = '';                    // 答案2
    answer3: string = '';                    // 答案3
    result: number = 0;                      // 正确答案索引
}

export class YxQuiz {
    constructor(private db: DbClient) { }

    connect() {
        return this.db.connect();
    }
    
    close() {
        return this.db.close();
    }

    /**
     * 查询 yx_quiz 数据
     * @param condition 查询条件（可选）
     * @returns 符合条件的题目数组
     */
    async findYxQuiz(condition?: Partial<YxQuizData>): Promise<YxQuizData[]> {
        return this.db.find<YxQuizData>('yx_quiz', condition);
    }

    /**
     * 新增 yx_quiz 数据
     * @param data 新增题目数据（不含id）
     * @returns 新增题目的id
     */
    async createYxQuiz(data: Omit<YxQuizData, 'id'>): Promise<number> {
        // 校验必填字段
        const requiredFields = ['question', 'answer0', 'answer1', 'answer2', 'answer3'];
        const missingFields = requiredFields.filter(field => !(field in data));
        if (missingFields.length > 0) {
            throw new Error(`缺少必填字段: ${missingFields.join(', ')}`);
        }
        return this.db.create<YxQuizData>('yx_quiz', data);
    }

    /**
     * 更新 yx_quiz 数据
     * @param data 要更新的字段
     * @param condition 更新条件
     * @returns 影响的行数
     */
    async updateYxQuiz(data: Partial<Omit<YxQuizData, 'id'>>, condition: Partial<YxQuizData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('更新条件不能为空');
        }
        return this.db.update<YxQuizData>('yx_quiz', data, condition);
    }

    /**
     * 删除 yx_quiz 数据
     * @param condition 删除条件
     * @returns 影响的行数
     */
    async deleteYxQuiz(condition: Partial<YxQuizData>): Promise<number> {
        if (Object.keys(condition).length === 0) {
            throw new Error('删除条件不能为空');
        }
        return this.db.delete<YxQuizData>('yx_quiz', condition);
    }
}
