// humanitas.js

const axios = require('axios');
require('dotenv').config();

class HumanitasAI {
    constructor() {
        this.project = process.env.PROJECT_CODE;
        this.apiKey = process.env.API_KEY;
        this.baseURL = "https://api-laas.wanted.co.kr/api/preset/v2/chat/completions";
        this.presetHash = process.env.PRESET_HASH;
    }

    getHeaders() {
        return {
            "project": this.project,
            "apiKey": this.apiKey,
            "Content-Type": "application/json"
        };
    }

    async talkWithHistoricalFigure(figureName, question) {
        try {
            const requestData = {
                hash: this.presetHash,
                messages: [{
                    role: "user",
                    content: `위인 ${figureName}님께 질문: ${question}`
                }]
            };

            const response = await this.callAPI(requestData);
            return this.processResponse(response, 'historical_figure');
        } catch (error) {
            console.error("위인과의 대화 오류:", error);
            throw error;
        }
    }

    async getCourseInfo(courseName) {
        try {
            const requestData = {
                hash: this.presetHash,
                messages: [{
                    role: "user",
                    content: `교과목 정보 조회: ${courseName}`
                }]
            };

            const response = await this.callAPI(requestData);
            return this.processResponse(response, 'course_info');
        } catch (error) {
            console.error("교과목 정보 조회 오류:", error);
            throw error;
        }
    }

    async getGradeGuidance(grade) {
        try {
            const requestData = {
                hash: this.presetHash,
                messages: [{
                    role: "user",
                    content: `${grade}학년 수강 가이드 조회`
                }]
            };

            const response = await this.callAPI(requestData);
            return this.processResponse(response, 'grade_guidance');
        } catch (error) {
            console.error("수강 가이드 조회 오류:", error);
            throw error;
        }
    }

    async callAPI(requestData) {
        try {
            const response = await axios.post(
                this.baseURL,
                requestData,
                { headers: this.getHeaders() }
            );
            console.log('API Response:', JSON.stringify(response.data, null, 2));
            return response.data;
        } catch (error) {
            console.error("API 호출 오류:", error);
            throw error;
        }
    }

    processResponse(response, type) {
        try {
            if (!response.choices || !response.choices[0] || !response.choices[0].message) {
                throw new Error('Invalid response structure');
            }

            const message = response.choices[0].message;

            switch (type) {
                case 'historical_figure':
                    return {
                        role: message.role,
                        content: message.content,
                        responseType: 'historical_figure'
                    };

                case 'course_info':
                    return {
                        content: message.content,
                        responseType: 'course_info'
                    };

                case 'grade_guidance':
                    return {
                        content: message.content,
                        responseType: 'grade_guidance'
                    };

                default:
                    return message;
            }
        } catch (error) {
            console.error(`응답 처리 오류 (${type}):`, error);
            return {
                content: "응답 처리 중 오류가 발생했습니다.",
                responseType: type,
                error: true
            };
        }
    }

    async testConnection() {
        try {
            const response = await this.callAPI({
                hash: this.presetHash,
                messages: [{
                    role: "user",
                    content: "연결 테스트"
                }]
            });
            console.log("API 연결 성공!", response);
            return true;
        } catch (error) {
            console.error("API 연결 테스트 실패:", error);
            return false;
        }
    }
}

// 메인 실행 함수
async function main() {
    const humanitas = new HumanitasAI();

    try {
        // 연결 테스트
        await humanitas.testConnection();

        // 위인과의 대화 테스트
        const socrates = await humanitas.talkWithHistoricalFigure(
            "소크라테스",
            "정의란 무엇인가요?"
        );
        console.log("소크라테스의 답변:", socrates);

    } catch (error) {
        console.error("실행 중 오류 발생:", error);
    }
}

// 모듈 내보내기
module.exports = HumanitasAI;

// 직접 실행 시 메인 함수 호출
if (require.main === module) {
    main();
}