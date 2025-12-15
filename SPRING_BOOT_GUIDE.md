# Spring Boot REST API 서버 구축 가이드

## 📋 목차
1. [프로젝트 개요](#프로젝트-개요)
2. [사용 기술 스택](#사용-기술-스택)
3. [주요 도메인 설명](#주요-도메인-설명)
4. [API 명세](#api-명세)
5. [구현 순서](#구현-순서)
6. [실행 방법](#실행-방법)
7. [React 연동 설정](#react-연동-설정)

---

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
- **H2 Database**: 개발용 인메모리 데이터베이스 (또는 MySQL/PostgreSQL)
- **Lombok**: 보일러플레이트 코드 감소
- **Spring Boot Validation**: 요청 데이터 검증

---

## 주요 도메인 설명

### 1. Member (회원)
- `id`: 회원 고유 ID (Long)
- `username`: 아이디 (String, 중복 불가)
- `password`: 비밀번호 (String)
- `nickname`: 닉네임 (String)
- `email`: 이메일 (String)
- `createdAt`: 생성일시 (LocalDateTime)

### 2. Cocktail (칵테일)
- `id`: 칵테일 고유 ID (Long)
- `name`: 칵테일 이름 (String)
- `description`: 설명 (String)
- `ingredients`: 재료 목록 (List<String>)
- `instructions`: 제조법 (String, 선택사항)
- `image`: 이미지 (String, Base64 또는 URL)
- `userId`: 작성자 ID (Long, Member와 연관)
- `createdAt`: 생성일시 (LocalDateTime)
- `updatedAt`: 수정일시 (LocalDateTime)

### 3. Like (좋아요)
- `id`: 좋아요 고유 ID (Long)
- `cocktailId`: 칵테일 ID (Long)
- `userId`: 사용자 ID (Long)
- `createdAt`: 생성일시 (LocalDateTime)

---

## API 명세

### 기본 정보
- **Base URL**: `http://localhost:8080/api`
- **Content-Type**: `application/json`

---

### 1. 회원 관리 API

#### 1.1 회원가입
- **Method**: `POST`
- **URL**: `/api/members`
- **Request Body**:
```json
{
  "username": "user123",
  "password": "password123",
  "nickname": "칵테일러버",
  "email": "user@example.com"
}
```
- **Response (201 Created)**:
```json
{
  "id": 1,
  "username": "user123",
  "nickname": "칵테일러버",
  "email": "user@example.com",
  "createdAt": "2024-01-01T12:00:00"
}
```
- **Response (400 Bad Request)** - 유효성 검증 실패:
```json
{
  "message": "유효성 검증 실패",
  "errors": {
    "username": "아이디는 3자 이상이어야 합니다.",
    "password": "비밀번호는 4자 이상이어야 합니다."
  }
}
```
- **Response (409 Conflict)** - 아이디 중복:
```json
{
  "message": "이미 사용 중인 아이디입니다."
}
```

#### 1.2 로그인
- **Method**: `POST`
- **URL**: `/api/members/login`
- **Request Body**:
```json
{
  "username": "user123",
  "password": "password123"
}
```
- **Response (200 OK)**:
```json
{
  "id": 1,
  "username": "user123",
  "nickname": "칵테일러버"
}
```
- **Response (400 Bad Request)** - 잘못된 요청:
```json
{
  "message": "아이디 또는 비밀번호가 올바르지 않습니다."
}
```

#### 1.3 아이디 중복 체크
- **Method**: `GET`
- **URL**: `/api/members/check-username?username={username}`
- **Response (200 OK)**:
```json
{
  "available": true
}
```
또는
```json
{
  "available": false,
  "message": "이미 사용 중인 아이디입니다."
}
```

---

### 2. 칵테일 게시판 API

#### 2.1 칵테일 생성
- **Method**: `POST`
- **URL**: `/api/cocktails`
- **Request Body**:
```json
{
  "name": "모히토",
  "description": "상큼한 민트 칵테일",
  "ingredients": ["화이트 럼 2oz", "라임 주스 1oz", "민트", "소다수"],
  "instructions": "1. 글래스에 민트를 넣고 으깹니다. 2. 럼과 라임 주스를 넣습니다. 3. 소다수를 채웁니다.",
  "image": "data:image/jpeg;base64,...",
  "userId": 1
}
```
- **Response (201 Created)**:
```json
{
  "id": 1,
  "name": "모히토",
  "description": "상큼한 민트 칵테일",
  "ingredients": ["화이트 럼 2oz", "라임 주스 1oz", "민트", "소다수"],
  "instructions": "1. 글래스에 민트를 넣고 으깹니다. 2. 럼과 라임 주스를 넣습니다. 3. 소다수를 채웁니다.",
  "image": "data:image/jpeg;base64,...",
  "userId": 1,
  "createdAt": "2024-01-01T12:00:00",
  "updatedAt": "2024-01-01T12:00:00"
}
```
- **Response (400 Bad Request)**:
```json
{
  "message": "칵테일 이름과 재료는 필수입니다."
}
```

#### 2.2 칵테일 전체 조회
- **Method**: `GET`
- **URL**: `/api/cocktails`
- **Response (200 OK)**:
```json
[
  {
    "id": 1,
    "name": "모히토",
    "description": "상큼한 민트 칵테일",
    "ingredients": ["화이트 럼 2oz", "라임 주스 1oz", "민트", "소다수"],
    "instructions": "1. 글래스에 민트를 넣고 으깹니다.",
    "image": "data:image/jpeg;base64,...",
    "userId": 1,
    "likeCount": 5,
    "createdAt": "2024-01-01T12:00:00",
    "updatedAt": "2024-01-01T12:00:00"
  }
]
```

#### 2.3 칵테일 상세 조회
- **Method**: `GET`
- **URL**: `/api/cocktails/{id}`
- **Response (200 OK)**:
```json
{
  "id": 1,
  "name": "모히토",
  "description": "상큼한 민트 칵테일",
  "ingredients": ["화이트 럼 2oz", "라임 주스 1oz", "민트", "소다수"],
  "instructions": "1. 글래스에 민트를 넣고 으깹니다.",
  "image": "data:image/jpeg;base64,...",
  "userId": 1,
  "likeCount": 5,
  "isLiked": false,
  "createdAt": "2024-01-01T12:00:00",
  "updatedAt": "2024-01-01T12:00:00"
}
```
- **Response (404 Not Found)**:
```json
{
  "message": "칵테일을 찾을 수 없습니다."
}
```

#### 2.4 사용자별 칵테일 조회
- **Method**: `GET`
- **URL**: `/api/members/{userId}/cocktails`
- **Response (200 OK)**:
```json
[
  {
    "id": 1,
    "name": "모히토",
    "description": "상큼한 민트 칵테일",
    "ingredients": ["화이트 럼 2oz", "라임 주스 1oz", "민트", "소다수"],
    "instructions": "1. 글래스에 민트를 넣고 으깹니다.",
    "image": "data:image/jpeg;base64,...",
    "userId": 1,
    "createdAt": "2024-01-01T12:00:00",
    "updatedAt": "2024-01-01T12:00:00"
  }
]
```

#### 2.5 칵테일 수정
- **Method**: `PUT`
- **URL**: `/api/cocktails/{id}`
- **Request Body**:
```json
{
  "name": "수정된 모히토",
  "description": "수정된 설명",
  "ingredients": ["화이트 럼 3oz", "라임 주스 1.5oz", "민트", "소다수"],
  "instructions": "수정된 제조법",
  "image": "data:image/jpeg;base64,..."
}
```
- **Response (200 OK)**:
```json
{
  "id": 1,
  "name": "수정된 모히토",
  "description": "수정된 설명",
  "ingredients": ["화이트 럼 3oz", "라임 주스 1.5oz", "민트", "소다수"],
  "instructions": "수정된 제조법",
  "image": "data:image/jpeg;base64,...",
  "userId": 1,
  "createdAt": "2024-01-01T12:00:00",
  "updatedAt": "2024-01-01T13:00:00"
}
```
- **Response (404 Not Found)**:
```json
{
  "message": "칵테일을 찾을 수 없습니다."
}
```

#### 2.6 칵테일 삭제
- **Method**: `DELETE`
- **URL**: `/api/cocktails/{id}`
- **Response (200 OK)**:
```json
{
  "message": "칵테일이 삭제되었습니다."
}
```
- **Response (404 Not Found)**:
```json
{
  "message": "칵테일을 찾을 수 없습니다."
}
```

---

### 3. 좋아요 API

#### 3.1 좋아요 토글
- **Method**: `POST`
- **URL**: `/api/cocktails/{id}/likes`
- **Request Body**:
```json
{
  "userId": 1
}
```
- **Response (200 OK)** - 좋아요 추가:
```json
{
  "message": "좋아요가 추가되었습니다.",
  "likeCount": 1
}
```
- **Response (200 OK)** - 좋아요 취소:
```json
{
  "message": "좋아요가 취소되었습니다.",
  "likeCount": 0
}
```
- **Response (404 Not Found)**:
```json
{
  "message": "칵테일을 찾을 수 없습니다."
}
```

#### 3.2 좋아요 개수 조회
- **Method**: `GET`
- **URL**: `/api/cocktails/{id}/likes`
- **Response (200 OK)**:
```json
{
  "likeCount": 5
}
```
- **Response (404 Not Found)**:
```json
{
  "message": "칵테일을 찾을 수 없습니다."
}
```

---

## 구현 순서

### 1단계: Spring Boot 프로젝트 생성
1. [Spring Initializr](https://start.spring.io/) 접속
2. 다음 설정 선택:
   - **Project**: Gradle 또는 Maven
   - **Language**: Java
   - **Spring Boot**: 3.2.x
   - **Packaging**: Jar
   - **Java**: 17 이상
3. **Dependencies 추가**:
   - Spring Web
   - Spring Data JPA
   - H2 Database (또는 MySQL Driver, PostgreSQL Driver)
   - Lombok
   - Validation
4. 프로젝트 다운로드 및 압축 해제

### 2단계: 프로젝트 구조 설정
```
src/main/java/com/cocktaillab/
├── CocktailLabApplication.java
├── controller/
│   ├── MemberController.java
│   ├── CocktailController.java
│   └── LikeController.java
├── service/
│   ├── MemberService.java
│   ├── CocktailService.java
│   └── LikeService.java
├── repository/
│   ├── MemberRepository.java
│   ├── CocktailRepository.java
│   └── LikeRepository.java
├── entity/
│   ├── Member.java
│   ├── Cocktail.java
│   └── Like.java
├── dto/
│   ├── request/
│   │   ├── SignupRequest.java
│   │   ├── LoginRequest.java
│   │   └── CocktailRequest.java
│   └── response/
│       ├── MemberResponse.java
│       ├── CocktailResponse.java
│       └── ApiResponse.java
└── exception/
    ├── GlobalExceptionHandler.java
    └── ResourceNotFoundException.java
```

### 3단계: Entity 클래스 작성
- `Member.java`: 회원 엔티티
- `Cocktail.java`: 칵테일 엔티티
- `Like.java`: 좋아요 엔티티

### 4단계: Repository 인터페이스 작성
- `MemberRepository.java`
- `CocktailRepository.java`
- `LikeRepository.java`

### 5단계: DTO 클래스 작성
- Request DTO: `SignupRequest`, `LoginRequest`, `CocktailRequest`
- Response DTO: `MemberResponse`, `CocktailResponse`, `ApiResponse`

### 6단계: Service 클래스 작성
- `MemberService.java`: 회원 관련 비즈니스 로직
- `CocktailService.java`: 칵테일 관련 비즈니스 로직
- `LikeService.java`: 좋아요 관련 비즈니스 로직

### 7단계: Controller 클래스 작성
- `MemberController.java`: 회원 API 엔드포인트
- `CocktailController.java`: 칵테일 API 엔드포인트
- `LikeController.java`: 좋아요 API 엔드포인트

### 8단계: 예외 처리
- `GlobalExceptionHandler.java`: 전역 예외 처리
- `ResourceNotFoundException.java`: 커스텀 예외

### 9단계: CORS 설정
- `CorsConfig.java`: CORS 설정 클래스

### 10단계: 테스트 및 검증
- Postman 또는 curl로 API 테스트
- React와 연동 테스트

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

### 1. package.json에 proxy 추가
React 프로젝트의 `package.json`에 다음을 추가:
```json
{
  "name": "react-cocktaillab-project",
  "version": "0.0.0",
  "proxy": "http://localhost:8080",
  ...
}
```

### 2. API 호출 예시
```javascript
// ❌ 이렇게 하지 마세요
fetch("http://localhost:8080/api/members")

// ✅ 이렇게 하세요
fetch("/api/members")
```

### 3. CORS 설정 (Spring Boot)
`CorsConfig.java` 생성:
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

---

## 다음 단계

1. ✅ Spring Boot 프로젝트 생성
2. ✅ Entity, Repository, Service, Controller 구현
3. ✅ API 테스트
4. ✅ React와 연동
5. ✅ 에러 처리 및 검증 강화
6. ✅ README.md 작성 (API 명세 포함)

---

## 참고사항

- 이 가이드는 **개발 환경**을 기준으로 작성되었습니다.
- 실제 배포 환경에서는 데이터베이스를 MySQL 또는 PostgreSQL로 변경해야 합니다.
- 비밀번호는 실제로는 해시화하여 저장해야 합니다 (BCrypt 등).
- 로그인 상태 유지(세션, JWT 토큰)는 이번 과제 범위에 포함되지 않습니다.

