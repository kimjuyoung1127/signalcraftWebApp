# 📡 SignalCraft Biz Frontend

SignalCraft Biz는 설비 진동 및 소음 데이터를 AI로 분석하여 실시간 상태와 건강도를 시각화하는 프리미엄 대시보드 어플리케이션입니다.

## ✨ 프로젝트 개요
이 프로젝트는 **"Zero Config"**와 **"Auto-Report"**라는 핵심 가치를 바탕으로, 복잡한 설비 모니터링을 토스(Toss)와 같은 친숙하고 직관적인 UI/UX로 제공하는 것을 목표로 합니다.

## 🛠 Tech Stack
- **Framework**: React 19 (TypeScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (PostCSS Pipeline)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Pretendard (Global Font)
- **State/Routing**: React Router Dom v7

## 🎨 Design Principles
- **Toss-Style Aesthetic**: 넉넉한 여백, 둥근 모서리(`rounded-[2rem]`), 선명한 타이포그래피.
- **Micro-interactions**: 버튼 탭 피드백, 카드 진입 애니메이션, 상태 인디케이터 펄스 효과 등 살아있는 UI 지향.
- **Glassmorphism**: 은은한 배경 블러(`backdrop-blur-xl`)와 투명도 있는 레이어를 활용한 깊이감 있는 디자인.

## 🚀 시작하기

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```
환경 설정에 따라 `http://localhost:5173` 또는 `5174`에서 대시보드를 확인하실 수 있습니다.

## 📁 주요 구조
- `src/components/ui`: 재사용 가능한 원자 단위 컴포넌트 (Button, Badge, Card 등)
- `src/components/shared`: 공통 레이아웃 컴포넌트 (Header, BottomNav, NotFound)
- `src/components/features`: 기능별 페이지 컴포넌트 (Dashboard, Reports)
- `src/lib/utils`: Tailwind 클래스 병합 등 유틸리티 함수

## 📈 주요 기능 및 최적화
- **Code Splitting**: `React.lazy`를 통한 페이지 단위 지연 로딩으로 초기 구동 속도 최적화.
- **Build Optimization**: `manualChunks` 설정을 통해 벤더 라이브러리를 분리하여 캐시 효율 증대.
- **AI Live Monitoring**: AI 감시 상태를 시각적으로 강조하는 실시간 인디케이터.
- **Daily Reports**: 설비 상태 통계와 AI 분석 노트를 제공하는 영수증 형태의 리포트.

---
*Anything else to highlight or include that I might have missed?*
