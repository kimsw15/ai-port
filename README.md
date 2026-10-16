# AI-Assisted E2E Test Automation

AI(LLM)를 테스트 설계·코드 작성·실패 분석에 활용하고, **AI 결과물을 사람이 검증·개선한 과정**을 기록한 E2E 테스트 자동화 프로젝트입니다.

- 대상 사이트: [Sauce Demo](https://www.saucedemo.com) (테스트 연습용 공개 쇼핑몰)
- 스택: Playwright, TypeScript, GitHub Actions

## 프로젝트 구조

```
├── pages/          # Page Object (화면별 요소·동작 캡슐화)
├── tests/          # 테스트 코드 (기능별 spec)
├── ai/             # AI 활용 결과물 (프롬프트, 생성된 케이스, 실패 분석)
├── .github/workflows/  # CI (PR마다 자동 실행)
└── playwright.config.ts
```

## 실행 방법

```bash
npm install
npx playwright install chromium
npm test            # 전체 실행
npm run test:ui     # UI 모드
npm run report      # HTML 리포트 열기
```

## AI 활용 방식

| 단계 | AI에게 시킨 일 | 내가 한 일 |
|------|----------------|-----------|
| 테스트 케이스 설계 | 화면 설명을 주고 정상/예외/경계값 케이스 생성 | 중복·비현실적 케이스 제거, 우선순위 지정 |
| 코드 작성 | 시나리오를 Playwright 코드로 변환 | 셀렉터 검증, 불필요한 대기 제거, Page Object로 리팩터링 |
| 실패 분석 | 로그·스크린샷으로 원인 요약, 버그 리포트 초안 | 실제 원인 확인 후 수정 |

## AI 결과물 검증 기록 (직접 채우기)

| 항목 | 수치 / 내용 |
|------|-------------|
| AI가 생성한 테스트 케이스 수 | 예: 30개 |
| 실제로 채택한 케이스 수 | 예: 18개 (60%) |
| AI 코드에서 발견한 문제 | 예: 취약한 CSS 셀렉터 → role/data-test 기반으로 교체 |
| 직접 작성 vs AI 보조 소요 시간 | 예: 2시간 vs 40분 |
| 플래키 테스트 개선 | 예: 고정 대기(waitForTimeout) → 자동 대기 assertion |

## 배운 점 / 한계

- (여기에 본인이 느낀 AI의 한계와 사람이 꼭 검토해야 하는 부분을 적으세요)

## 앞으로 할 일

- [ ] 결제(checkout) 시나리오 추가
- [ ] AI 실패 분석 스크립트 (`ai/analyze-failures.ts`)
- [ ] API 테스트 추가
