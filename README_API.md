# 칵테일 랩 REST API 서버

## 프로젝트 개요

React 기반 칵테일 랩 프로젝트의 백엔드 REST API 서버입니다. 
회원가입/로그인 기능과 커스텀 칵테일 게시판의 CRUD 기능을 제공합니다.

**주요 기능:**
- 회원 관리 (회원가입, 로그인, 아이디 중복 체크)
- 칵테일 게시판 (생성, 조회, 수정, 삭제)
- 좋아요 기능

---

## 사용 기술 스택

- **Java**: 17 이상
- **Spring Boot**: 3.x
- **Spring Data JPA**: 데이터베이스 연동
- **H2 Database**: 개발용 인메모리 데이터베이스
- **Lombok**: 보일러플레이트 코드 감소
- **Spring Boot Validation**: 요청 데이터 검증

---

## 주요 도메인 설명

### 1. Member (회원)
- `memberNo`: 회원 고유 번호 (Long, PK)
- `memberId`: 로그인 아이디 (String, unique)
- `userPwd`: 비밀번호 (String)
- `nickname`: 닉네임 (String)
- `email`: 이메일 (String)
- `createdAt`: 생성일시 (LocalDateTime)
- `updatedAt`: 수정일시 (LocalDateTime)

### 2. Cocktail (칵테일)
- `cocktailNo`: 칵테일 고유 번호 (Long, PK)
- `cocktailName`: 칵테일 이름 (String)
- `description`: 설명 (String, TEXT)
- `ingredients`: 재료 목록 (List<String>)
- `instructions`: 제조법 (String, TEXT)
- `cocktailImagePath`: 이미지 경로 (String, TEXT)
- `memberNo`: 작성자 번호 (Long, FK)
- `createdAt`: 생성일시 (LocalDateTime)
- `updatedAt`: 수정일시 (LocalDateTime)

### 3. Like (좋아요)
- `likeNo`: 좋아요 고유 번호 (Long, PK)
- `cocktailNo`: 칵테일 번호 (Long, FK)
- `memberNo`: 회원 번호 (Long, FK)
- `createdAt`: 생성일시 (LocalDateTime)
- `updatedAt`: 수정일시 (LocalDateTime)

---

## API 명세

### 기본 정보
- **Base URL**: `http://localhost:8080/api`
- **Content-Type**: `application/json`
- **인증 방식**: `X-Member-No` 헤더에 회원 번호 전달 (개발용)

---

### 1. 회원 관리 API

#### 1.1 회원가입
- **Method**: `POST`
- **URL**: `/api/members`
- **Request Body**:
```json
{
  "memberId": "user123",
  "userPwd": "password123",
  "nickname": "칵테일러버",
  "email": "user@example.com"
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "회원가입이 완료되었습니다.",
  "data": {
    "memberNo": 1,
    "memberId": "user123",
    "nickname": "칵테일러버",
    "email": "user@example.com",
    "createdAt": "2024-01-01T12:00:00",
    "updatedAt": "2024-01-01T12:00:00"
  }
}
```
- **Response (400 Bad Request)** - 유효성 검증 실패:
```json
{
  "success": false,
  "message": "유효성 검증 실패"
}
```
- **Response (409 Conflict)** - 아이디/이메일 중복:
```json
{
  "success": false,
  "message": "이미 사용 중인 아이디입니다."
}
```

#### 1.2 로그인
- **Method**: `POST`
- **URL**: `/api/members/login`
- **Request Body**:
```json
{
  "memberId": "user123",
  "userPwd": "password123"
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "로그인 성공",
  "data": {
    "memberNo": 1,
    "memberId": "user123",
    "nickname": "칵테일러버"
  }
}
```
- **Response (400 Bad Request)**:
```json
{
  "success": false,
  "message": "아이디 또는 비밀번호가 올바르지 않습니다."
}
```

#### 1.3 아이디 중복 체크
- **Method**: `GET`
- **URL**: `/api/members/check-memberId?memberId={memberId}`
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "사용 가능한 아이디입니다.",
  "data": {
    "available": true
  }
}
```
또는
```json
{
  "success": true,
  "message": "이미 사용 중인 아이디입니다.",
  "data": {
    "available": false
  }
}
```

---

### 2. 칵테일 게시판 API

#### 2.1 칵테일 생성
- **Method**: `POST`
- **URL**: `/api/cocktails`
- **Headers**: `X-Member-No: {memberNo}` (필수)
- **Request Body**:
```json
{
  "cocktailName": "모히토",
  "description": "상큼한 민트 칵테일",
  "ingredients": ["화이트 럼 2oz", "라임 주스 1oz", "민트", "소다수"],
  "instructions": "1. 글래스에 민트를 넣고 으깹니다. 2. 럼과 라임 주스를 넣습니다. 3. 소다수를 채웁니다.",
  "cocktailImagePath": "data:image/jpeg;base64,..."
}
```
- **Response (201 Created)**:
```json
{
  "success": true,
  "message": "칵테일이 생성되었습니다.",
  "data": {
    "cocktailNo": 1,
    "cocktailName": "모히토",
    "description": "상큼한 민트 칵테일",
    "ingredients": ["화이트 럼 2oz", "라임 주스 1oz", "민트", "소다수"],
    "instructions": "1. 글래스에 민트를 넣고 으깹니다.",
    "cocktailImagePath": "data:image/jpeg;base64,...",
    "memberNo": 1,
    "memberId": "user123",
    "nickname": "칵테일러버",
    "likeCount": 0,
    "isLiked": false,
    "createdAt": "2024-01-01T12:00:00",
    "updatedAt": "2024-01-01T12:00:00"
  }
}
```
- **Response (401 Unauthorized)**:
```json
{
  "success": false,
  "message": "로그인이 필요합니다."
}
```

#### 2.2 칵테일 전체 조회
- **Method**: `GET`
- **URL**: `/api/cocktails`
- **Headers**: `X-Member-No: {memberNo}` (선택, 좋아요 상태 확인용)
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "cocktailNo": 1,
      "cocktailName": "모히토",
      "description": "상큼한 민트 칵테일",
      "ingredients": ["화이트 럼 2oz", "라임 주스 1oz", "민트", "소다수"],
      "instructions": "1. 글래스에 민트를 넣고 으깹니다.",
      "cocktailImagePath": "data:image/jpeg;base64,...",
      "memberNo": 1,
      "memberId": "user123",
      "nickname": "칵테일러버",
      "likeCount": 5,
      "isLiked": true,
      "createdAt": "2024-01-01T12:00:00",
      "updatedAt": "2024-01-01T12:00:00"
    }
  ]
}
```

#### 2.3 칵테일 상세 조회
- **Method**: `GET`
- **URL**: `/api/cocktails/{cocktailNo}`
- **Headers**: `X-Member-No: {memberNo}` (선택, 좋아요 상태 확인용)
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "cocktailNo": 1,
    "cocktailName": "모히토",
    "description": "상큼한 민트 칵테일",
    "ingredients": ["화이트 럼 2oz", "라임 주스 1oz", "민트", "소다수"],
    "instructions": "1. 글래스에 민트를 넣고 으깹니다.",
    "cocktailImagePath": "data:image/jpeg;base64,...",
    "memberNo": 1,
    "memberId": "user123",
    "nickname": "칵테일러버",
    "likeCount": 5,
    "isLiked": true,
    "createdAt": "2024-01-01T12:00:00",
    "updatedAt": "2024-01-01T12:00:00"
  }
}
```
- **Response (404 Not Found)**:
```json
{
  "success": false,
  "message": "칵테일을 찾을 수 없습니다."
}
```

#### 2.4 회원별 칵테일 조회
- **Method**: `GET`
- **URL**: `/api/cocktails/members/{memberNo}`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "cocktailNo": 1,
      "cocktailName": "모히토",
      "description": "상큼한 민트 칵테일",
      "ingredients": ["화이트 럼 2oz", "라임 주스 1oz", "민트", "소다수"],
      "instructions": "1. 글래스에 민트를 넣고 으깹니다.",
      "cocktailImagePath": "data:image/jpeg;base64,...",
      "memberNo": 1,
      "memberId": "user123",
      "nickname": "칵테일러버",
      "likeCount": 5,
      "createdAt": "2024-01-01T12:00:00",
      "updatedAt": "2024-01-01T12:00:00"
    }
  ]
}
```

#### 2.5 칵테일 수정
- **Method**: `PUT`
- **URL**: `/api/cocktails/{cocktailNo}`
- **Headers**: `X-Member-No: {memberNo}` (필수)
- **Request Body**:
```json
{
  "cocktailName": "수정된 모히토",
  "description": "수정된 설명",
  "ingredients": ["화이트 럼 3oz", "라임 주스 1.5oz", "민트", "소다수"],
  "instructions": "수정된 제조법",
  "cocktailImagePath": "data:image/jpeg;base64,..."
}
```
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "칵테일이 수정되었습니다.",
  "data": {
    "cocktailNo": 1,
    "cocktailName": "수정된 모히토",
    "description": "수정된 설명",
    "ingredients": ["화이트 럼 3oz", "라임 주스 1.5oz", "민트", "소다수"],
    "instructions": "수정된 제조법",
    "cocktailImagePath": "data:image/jpeg;base64,...",
    "memberNo": 1,
    "memberId": "user123",
    "nickname": "칵테일러버",
    "likeCount": 5,
    "createdAt": "2024-01-01T12:00:00",
    "updatedAt": "2024-01-01T13:00:00"
  }
}
```
- **Response (403 Forbidden)** - 작성자 불일치:
```json
{
  "success": false,
  "message": "본인이 작성한 칵테일만 수정할 수 있습니다."
}
```

#### 2.6 칵테일 삭제
- **Method**: `DELETE`
- **URL**: `/api/cocktails/{cocktailNo}`
- **Headers**: `X-Member-No: {memberNo}` (필수)
- **Response (200 OK)**:
```json
{
  "success": true,
  "message": "칵테일이 삭제되었습니다.",
  "data": null
}
```
- **Response (403 Forbidden)** - 작성자 불일치:
```json
{
  "success": false,
  "message": "본인이 작성한 칵테일만 삭제할 수 있습니다."
}
```

---

### 3. 좋아요 API

#### 3.1 좋아요 토글
- **Method**: `POST`
- **URL**: `/api/cocktails/{cocktailNo}/likes`
- **Headers**: `X-Member-No: {memberNo}` (필수)
- **Response (200 OK)** - 좋아요 추가:
```json
{
  "success": true,
  "data": {
    "message": "좋아요가 추가되었습니다.",
    "likeCount": 1,
    "isLiked": true
  }
}
```
- **Response (200 OK)** - 좋아요 취소:
```json
{
  "success": true,
  "data": {
    "message": "좋아요가 취소되었습니다.",
    "likeCount": 0,
    "isLiked": false
  }
}
```
- **Response (404 Not Found)**:
```json
{
  "success": false,
  "message": "칵테일을 찾을 수 없습니다."
}
```

#### 3.2 좋아요 개수 조회
- **Method**: `GET`
- **URL**: `/api/cocktails/{cocktailNo}/likes`
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "likeCount": 5
  }
}
```

#### 3.3 좋아요 여부 확인
- **Method**: `GET`
- **URL**: `/api/cocktails/{cocktailNo}/likes/check`
- **Headers**: `X-Member-No: {memberNo}` (선택)
- **Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "isLiked": true
  }
}
```

---

## 실행 방법

### 1. 프로젝트 설정
```bash
# 프로젝트 디렉토리로 이동
cd cocktail-lab-backend

# Gradle 프로젝트인 경우
./gradlew build

# Maven 프로젝트인 경우
mvn clean install
```

### 2. application.properties 설정
`src/main/resources/application.properties`:
```properties
# 서버 포트
server.port=8080

# H2 Database 설정 (개발용)
spring.datasource.url=jdbc:h2:mem:cocktaillab
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA 설정
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# H2 Console (개발용)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
```

### 3. 애플리케이션 실행
```bash
# IDE에서 실행
# 또는
./gradlew bootRun
# 또는
mvn spring-boot:run
```

### 4. 확인
- 서버 시작: `http://localhost:8080`
- H2 Console: `http://localhost:8080/h2-console`

---

## React 연동 설정

### 1. Vite Proxy 설정
React 프로젝트의 `vite.config.js`에 다음을 추가:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
})
```

### 2. API 호출 예시
```javascript
// ✅ 이렇게 하세요 (상대 경로)
fetch("/api/members")

// ❌ 이렇게 하지 마세요
// fetch("http://localhost:8080/api/members")
```

---

## 주의사항

1. **인증**: 현재는 `X-Member-No` 헤더로 회원 번호를 전달합니다. 실제 프로덕션 환경에서는 JWT 토큰 등을 사용해야 합니다.

2. **비밀번호**: 현재는 평문으로 저장됩니다. 실제로는 BCrypt 등으로 해시화해야 합니다.

3. **CORS**: 개발 환경에서는 Vite proxy를 사용하고, Spring Boot의 CORS 설정도 함께 사용합니다.

4. **데이터베이스**: 현재는 H2 인메모리 데이터베이스를 사용합니다. 실제 배포 시에는 MySQL 또는 PostgreSQL로 변경해야 합니다.

