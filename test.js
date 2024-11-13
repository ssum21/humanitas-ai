// test.js

const HumanitasAI = require('./humanitas');

async function test() {
    const ai = new HumanitasAI();
    
    try {
        // 위인과의 대화 테스트
        console.log("\n=== 위인과의 대화 테스트 ===");
        const response = await ai.talkWithHistoricalFigure(
            "소크라테스",
            "정의란 무엇인가요?"
        );
        console.log("소크라테스의 답변:", response);

        // 교과목 정보 테스트
        console.log("\n=== 교과목 정보 테스트 ===");
        const courseInfo = await ai.getCourseInfo("인간의 가치탐색");
        console.log("교과목 정보:", courseInfo);

        // 학년 가이드 테스트
        console.log("\n=== 학년 가이드 테스트 ===");
        const guidance = await ai.getGradeGuidance(1);
        console.log("1학년 가이드:", guidance);

    } catch (error) {
        console.error("테스트 중 오류 발생:", error);
    }
}

test();