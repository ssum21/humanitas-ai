# humanitas-ai
KHU X Wanted LaaS Project_Team생소

# 환경 설정 방법

1. `.env.example`을 복사하여 `.env` 파일 생성
```bash
cp .env.example .env

2. .env 파일에 실제 값 입력:
PROJECT_CODE: Wanted LaaS 프로젝트 코드
API_KEY: Wanted LaaS API 키
PRESET_HASH: 프리셋 해시값


3. 의존성 설치
bashCopynpm install

4. 개발 서버 실행
bashCopynpm start

## 3. 보안 관련 주의사항

1. `.env` 파일이 절대 Git에 커밋되지 않도록 주의
2. API 키와 같은 민감한 정보는 항상 환경 변수로 관리
3. 실제 API 키를 코드나 커밋 메시지에 포함하지 않도록 주의
4. 배포 시 환경 변수 관리 방법 확인 (예: CI/CD 설정)