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
| 상태 관리 | Zustand |
| 라우팅 | React Router DOM |

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
│   │   ├── Home.jsx          # 메인 페이지
│   │   ├── Recipes.jsx       # 레시피 목록 페이지
│   │   ├── Lab.jsx           # 나만의 칵테일 랩 페이지
│   │   ├── LabBoard.jsx      # 칵테일 랩 게시판 페이지
│   │   └── *.styled.js       # 페이지별 스타일 파일
│   ├── routes/               # 라우팅 설정
│   │   ├── AppRoutes.jsx     # 라우트 컴포넌트
│   │   └── routes.js         # 라우트 설정
│   ├── stores/               # Zustand 상태 관리
│   │   ├── authStore.js      # 인증 상태 관리
│   │   └── cocktailStore.js  # 칵테일 상태 관리
│   ├── resources/            # 리소스 파일
│   │   ├── cocktailImages/   # 칵테일 이미지
│   │   └── icons/            # 아이콘 이미지
│   ├── App.jsx               # 메인 App 컴포넌트
│   ├── main.jsx              # 진입점
│   └── index.css             # 전역 스타일
├── index.html                # HTML 템플릿
├── package.json              # 프로젝트 설정 및 의존성
├── vite.config.js            # Vite 설정
└── README.md                 # 프로젝트 문서
```

## 🌟 주요 기능 (Key Features)

✅ 칵테일 레시피 조회 및 상세 정보 확인  
✅ 커스텀 칵테일 제작 (이름, 설명, 재료, 이미지 등록)  
✅ 나만의 칵테일 랩에서 제작한 칵테일 관리 (조회, 삭제)  
✅ Zustand를 통한 전역 상태 관리 (칵테일 데이터, 좋아요 기능)  
✅ Styled Components를 활용한 컴포넌트 기반 스타일링  
✅ React Router를 통한 SPA 라우팅 구현  
✅ 반응형 디자인으로 다양한 화면 크기 지원

## 📸 화면 미리보기 (Preview)

| 기능 | 미리보기 |
|------|-----------|
| 메인 화면 | ![Home Page](./assets/home.png) |
| 레시피 목록 | ![Recipes Page](./assets/recipes.png) |
| 칵테일 랩 | ![Lab Page](./assets/lab.png) |
| 칵테일 제작 폼 | ![Lab Form](./assets/lab-form.png) |

## 💡 학습 포인트 (Learning Points)

- React Hooks (useState, useEffect)를 활용한 컴포넌트 상태 관리
- Zustand를 통한 전역 상태 관리 패턴 학습
- Styled Components를 이용한 CSS-in-JS 스타일링 방법
- React Router를 활용한 SPA 라우팅 구현
- 컴포넌트 기반 개발로 재사용성과 유지보수성 향상
- Vite를 통한 빠른 개발 환경 및 빌드 최적화
