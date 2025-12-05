# 🍹 React Cocktail Lab

> 칵테일 레시피를 탐색하고 나만의 커스텀 칵테일을 제작할 수 있는 React 기반 웹 애플리케이션

## 📘 개요 (Overview)

본 프로젝트는 **React + Vite를 이용한 SPA(Single Page Application)**으로,  
칵테일 레시피 조회 및 커스텀 칵테일 제작 기능을 중심으로 구성되었습니다.  
Zustand를 활용한 상태 관리와 Styled Components를 통한 스타일링을 구현하며,  
React Router를 통해 페이지 라우팅을 처리합니다.

## 🧱 기술 스택 (Tech Stack)

| 구분 | 사용 기술 |
|------|------------|
| Frontend | React 19, JavaScript (JSX) |
| 스타일링 | Styled Components |
| 상태 관리 | Zustand (persist middleware 포함) |
| 라우팅 | React Router DOM v7 |
| 빌드 도구 | Vite |

## 🛠️ 설치 및 실행 (Installation & Run)

### 1. 프로젝트 클론

```bash
git clone https://github.com/username/react-cocktailLab-project.git
cd react-cocktailLab-project
```

### 2. 의존성 패키지 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 웹 애플리케이션 접속

브라우저에서 접속:
```
http://localhost:5173
```

### 5. 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

## 📂 프로젝트 구조 (Directory Structure)

```
react-cocktailLab-project/
├── public/                    # 정적 파일
│   └── vite.svg
├── src/
│   ├── components/            # 재사용 가능한 컴포넌트
│   │   ├── Header.jsx        # 헤더 컴포넌트
│   │   ├── LabForm.jsx       # 칵테일 제작 폼 컴포넌트
│   │   ├── LoginModal.jsx    # 로그인 모달 컴포넌트
│   │   ├── Layout.jsx        # 레이아웃 컴포넌트
│   │   └── *.styled.js       # Styled Components 파일
│   ├── pages/                # 페이지 컴포넌트
│   │   ├── Home.jsx          # 메인 페이지 (인기 칵테일 추천)
│   │   ├── Recipes.jsx       # 레시피 목록 페이지
│   │   ├── Lab.jsx           # 나만의 칵테일 랩 페이지
│   │   ├── LabBoard.jsx      # 칵테일 랩 게시판 페이지
│   │   ├── Login.jsx         # 로그인 페이지
│   │   ├── Signup.jsx        # 회원가입 페이지
│   │   ├── NotFound.jsx      # 404 에러 페이지
│   │   └── *.styled.js       # 페이지별 스타일 파일
│   ├── routes/               # 라우팅 설정
│   │   ├── AppRoutes.jsx     # 라우트 컴포넌트
│   │   └── routes.js         # 라우트 상수 정의
│   ├── stores/               # Zustand 상태 관리
│   │   ├── authStore.js      # 인증 상태 관리 (로그인/회원가입)
│   │   └── cocktailStore.js  # 칵테일 상태 관리 (CRUD, 좋아요)
│   ├── resources/            # 리소스 파일
│   │   ├── cocktailImages/   # 칵테일 이미지
│   │   ├── icons/            # 아이콘 이미지
│   │   └── images/           # 기타 이미지 (404 등)
│   ├── App.jsx               # 메인 App 컴포넌트
│   ├── main.jsx              # 진입점
│   └── index.css             # 전역 스타일
├── index.html                # HTML 템플릿
├── package.json              # 프로젝트 설정 및 의존성
├── vite.config.js            # Vite 설정
└── README.md                 # 프로젝트 문서
```

## 🌟 주요 기능 (Key Features)

### 🔐 인증 시스템
- ✅ 회원가입 (아이디, 비밀번호, 닉네임, 이메일)
- ✅ 로그인/로그아웃
- ✅ 아이디 중복 체크
- ✅ 로컬스토리지 기반 세션 유지 (Zustand persist)

### 🍹 칵테일 관리
- ✅ 커스텀 칵테일 제작 (이름, 설명, 재료, 용량, 유리잔, 제조법, 이미지)
- ✅ 나만의 칵테일 랩에서 제작한 칵테일 관리 (조회, 삭제)
- ✅ 칵테일 랩 게시판에서 모든 사용자의 칵테일 조회

### ❤️ 좋아요 시스템
- ✅ 칵테일 좋아요/좋아요 취소
- ✅ 좋아요 수 실시간 표시
- ✅ 사용자별 좋아요 상태 관리

### 📊 인기 칵테일 추천(홈페이지)
- ✅ 전체 인기 칵테일 (Total Popular) - 좋아요 수 기준 상위 3개
- ✅ 주간 인기 칵테일 (Weekly Popular) - 최근 7일 내 좋아요 기준
- ✅ 일일 인기 칵테일 (Daily Popular) - 오늘 받은 좋아요 기준

### 🎨 UI/UX
- ✅ Styled Components를 활용한 컴포넌트 기반 스타일링
- ✅ 반응형 디자인으로 다양한 화면 크기 지원
- ✅ 칵테일 제작 시 애니메이션 효과
- ✅ 404 에러 페이지

### 🔧 기술적 특징
- ✅ Zustand를 통한 전역 상태 관리 (persist middleware로 로컬스토리지 연동)
- ✅ React Router를 통한 SPA 라우팅 구현
- ✅ 컴포넌트 기반 개발로 재사용성과 유지보수성 향상

## 📸 화면 미리보기 (Preview)

| 기능 | 미리보기 |
|------|-----------|
| 메인 화면 (홈페이지) | ![Home Page](./src/resources/images/HomePage.png) |
| 레시피 목록 | ![Recipes Page](./src/resources/images/Recipe.png) |
| 칵테일 랩 (나만의 칵테일) | ![Lab Page](./src/resources/images/Lab.png) |
| 칵테일 제작 폼 | ![Lab Form](./src/resources/images/labForm.png) |
| 칵테일 랩 게시판 | ![Lab Board](./src/resources/images/LabBoard.png) |
| 로그인 | ![Login](./src/resources/images/login.png) |
| 회원가입 | ![Signup](./src/resources/images/Auth.png) |
| 쉐이커 애니메이션 | ![Shaker Animation](./src/resources/images/shakerAnimation.png) |
| 404 에러 페이지 | ![404 Page](./src/resources/images/404Image.png) |

## 💡 학습 포인트 (Learning Points)

### React 기초
- React Hooks (useState, useEffect, useMemo, useRef)를 활용한 컴포넌트 상태 관리
- 컴포넌트 기반 개발로 재사용성과 유지보수성 향상
- 조건부 렌더링 및 리스트 렌더링

### 상태 관리
- Zustand를 통한 전역 상태 관리 패턴 학습
- Zustand persist middleware를 활용한 로컬스토리지 연동
- 상태 관리 최적화 (불변성 유지, 타입 안전성)

### 스타일링
- Styled Components를 이용한 CSS-in-JS 스타일링 방법
- 동적 스타일링 및 테마 관리
- 반응형 디자인 구현

### 라우팅
- React Router DOM v7을 활용한 SPA 라우팅 구현
- 중첩 라우팅 및 404 에러 처리

### 개발 도구
- Vite를 통한 빠른 개발 환경 및 빌드 최적화
- ESLint를 통한 코드 품질 관리

### 데이터 관리
- 로컬스토리지 기반 데이터 영속성
- 복잡한 데이터 구조 관리 (객체, 배열, 중첩 구조)
- 타임스탬프 기반 데이터 필터링 및 정렬

### 📝 향후 계획
- 커스텀 레시피 제작 시, 이미 있는 일반 레시피나 커스텀 칵테일 레시피와 동일하다면 동일한 제조법이 있다고 알림 후 해당 칵테일의 페이지로 이동되도록 하는 기능을 추가
- 재료의 다양성 추가와 체리, 올리브 같은 고체형 재료나 얼음 종류, 추천하는 마시는 방법(샷, 온더락 등), 훈연 향 추가 등 다양한 선택지를 줘서 다양하고 많은 커스텀이 가능하도록 개선하고, 재료도 필터를 통해 위스키/리큐르/쥬스 등으로 세분화하여 찾을 수 있고 키보드 입력을 통한 검색으로 편의성을 더하는 기능 추가
- 글래스 이미지를 추가하여 선택한 글래스에 맞게 완성된 칵테일의 모습이 나오도록 만드는 기능을 만들어 완성의 만족감을 추가하고, 더욱 발전이 된다면 ChatGPT 등 이미지 제네레이션같은 이미지 생성 AI와 연동하여 직접 만들어서 사진을 찍지 않아도 예측되는 모습을 생성하여 보여주는 방식으로 하면 사용자의 재미 요소 증가
