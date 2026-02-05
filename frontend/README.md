# 🛰️ SignalCraft Biz

> **무설정 AI 시설 관리 솔루션**

SignalCraft Biz는 AI를 활용하여 복잡한 설정 없이도 설비의 건강 상태를 진단하고 미래의 고장을 예측하는 엔터프라이즈급 시설 관리 플랫폼입니다.

---

## 🚀 Getting Started (실행 방법)

프로젝트는 프론트엔드(React/Vite)와 백엔드(FastAPI)로 구성되어 있습니다.

### 1. 프론트엔드 (Frontend) - Vite + React
프론트엔드 서버를 실행하려면 아래 명령어를 사용하세요.

```powershell
# 프론트엔드 디렉토리로 이동
cd frontend

# 의존성 설치 (필요한 경우)
npm install

# 개발 서버 실행
npm run dev
```
- 기본 주소: `http://localhost:5173`

### 2. 백엔드 (Backend) - FastAPI
백엔드 서버는 가상환경(`.venv`)을 사용하여 실행합니다.

#### 가상환경 활성화 (Windows)
```powershell
cd backend
.venv\Scripts\Activate.ps1


cd backend
.\.venv\Scripts\Activate.ps1

python main.py
- 기본 주소: `http://localhost:8000`
- API 문서(Swagger): `http://localhost:8000/docs`

### 3. Development Accounts (Debug)
초기 개발 및 데이터 확인을 위해 다음 계정을 사용할 수 있습니다:
- **Email**: `admin@signalcraft.com`
- **Password**: `password123`

---

## 🛠 Project Structure

- `frontend/`: React 기반의 대시보드 및 리포트 UI
- `backend/`: FastAPI 기반의 데이터 처리 및 AI 모델 연동 서버
  - `app/features/`: 프론트엔드와 1:1로 매칭되는 기능별 모듈 구조
- `docs/`: 프로젝트 기획 및 기술 문서

---

## 🏗 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion, Lucide React
- **Backend**: Python 3.x, FastAPI, Pydantic v2, Supabase SDK
- **Database**: Supabase (PostgreSQL)

---

© 2026 SignalCraft. All rights reserved.
