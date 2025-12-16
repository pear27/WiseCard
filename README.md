# 💳 WiseCard

> 본 리포지토리는 본 프로젝트의 구성 요소 중 안드로이드 모바일 앱에 해당하는 전체 소스 코드 및 실행 환경을 포함합니다.

---

## 1. 프로젝트 개요

- **프로젝트 목적**

  - LLM을 활용해 카드별 할인 및 혜택을 분석하고, 사용자 위치 기반 최적의 혜택 매장 및 사용 카드 추천 기능 제공

- **플랫폼**

  - Android

- **개발 기간**

  - 2025.08 ~ 2025.12

- **팀 구성**
  - FE: 1명 / BE: 2명

---

## 2. 기술 스택

### Mobile App

- Framework: **Expo + React Native**
- Language: **TypeScript**
- Routing: **Expo Router**
- State Management: **React Hooks (useState, useContext)**
- Navigation: **React Navigation (Bottom Tabs)**
- Authentication: **Kakao Login (OAuth 2.0 기반)**
- HTTP Client: **Axios**

### UI / UX

- UI Components: **React Native 기본 컴포넌트**
- Icon: **@expo/vector-icons**
- Bottom Sheet: **@gorhom/bottom-sheet**
- Animation: **react-native-reanimated**
- Gesture Handling: **react-native-gesture-handler**
- Safe Area Handling: **react-native-safe-area-context**

### Device / Expo APIs

- Location: **expo-location**
- Secure Storage: **expo-secure-store**
- Web Authentication: **expo-auth-session**

---

## 3. Open Source / External Service 사용 내역

| Name                         | Usage                     | License / Policy        |
| ---------------------------- | ------------------------- | ----------------------- |
| Expo                         | App runtime & native APIs | MIT                     |
| React                        | UI framework              | MIT                     |
| React Native                 | Mobile framework          | MIT                     |
| Expo Router                  | File-based routing        | MIT                     |
| React Navigation             | Navigation system         | MIT                     |
| Axios                        | HTTP communication        | MIT                     |
| @gorhom/bottom-sheet         | Bottom sheet UI           | MIT                     |
| React Native Reanimated      | Animations                | MIT                     |
| React Native Gesture Handler | Gesture handling          | MIT                     |
| Kakao Login                  | Social Login (OAuth 2.0)  | Kakao Developers Policy |

---

## 4. 실행 및 사용 방법

> 본 문서의 모든 명령어는 **Windows 환경**을 기준으로 작성되었으며, **CMD 또는 PowerShell**에서 실행하는 것을 기준으로 합니다.

### 1. Node.js 설치 확인 (2025-06-24 기준)

설치된 Node.js 버전이 v18 미만인 경우, ReadableStream을 기본적으로 제공하지 않아 프로젝트가 실행되지 않습니다. 원활한 사용을 위해 v22.16.0의 Node.js를 설치합니다.

```bash
 # CMD 관리자 모드
 nvm install 22.16.0
 nvm use 22.16.0
```

아래 명령어로 설치된 버전을 확인할 수 있습니다.

```bash
 node -v
  # v22.16.0
 npm -v
  # 10.2.4
```

### 2. Expo 설치하기

Expo는 React Native로 개발한 모바일 어플리케이션을 미리 실행하고 테스트할 수 있는 오픈 소스 플랫폼입니다.

CMD에서 아래 명령어를 입력하여 Expo를 설치합니다.

```bash
npm install --global expo-cli
     # Install the command line tools
```

아래 명령어로 설치된 버전을 확인할 수 있습니다.

```bash
 expo --version
```

테스트할 모바일 기기(Android)에 Expo(혹은 Expo Go, 스토어에서 검색)를 설치하고, 계정을 생성합니다.

### 3. 프로젝트 의존성 설치

git clone한 프로젝트 파일의 루트로 이동한 뒤, 아래 명령어를 입력하여 프로젝트 의존성을 설치합니다.

```bash
npm install
```

### 4. 환경 변수 설정

본 프로젝트는 실행을 위해 환경 변수 설정이 필요합니다.

루트 디렉토리에 제공된 `.env.example` 파일을 복사하여 `.env` 파일을 생성한 뒤, 각 항목에 본인의 환경에 맞는 값을 입력합니다.

```bash
copy .env.example .env
```

### 5. 프로젝트 실행하기

```bash
 expo login
```

Expo 모바일 어플리케이션에서 생성한 계정으로 로그인합니다.

```bash
 npx expo start
```

프로젝트를 실행합니다.

정상적으로 실행되는 경우, 로그에 출력되는 QR 코드를 모바일 기기의 Expo 어플리케이션에서 스캔하여 프로젝트를 확인할 수 있습니다.

### 🚧 Expo 앱에서 무한 로딩이 발생하는 경우 🚧

데스크탑과 모바일 기기가 서로 다른 네트워크에 있거나, 로컬 IP로 통신이 어려운 환경에서는 무한 로딩이 발생할 수 있습니다.

이 경우에는 아래 명령어를 터미널에 입력하여 Tunnel 모드로 전환하세요:

```bash
  npx expo start --tunnel
```

최초 실행 시 관련 패키지 설치가 필요할 수 있습니다.

## 5. 프로젝트 빌드하기

Expo Application Services(EAS)를 이용하면 클라우드에서 앱을 컴파일하고 생산할 수 있습니다.

최초 1회, 아래 명령어를 입력하여 eas-cli를 설치하고 EAS에 로그인합니다. (Expo 계정 필요)

```bash
 npm install -g eas-cli
  # eas-cli 설치
 eas login
  # eas 로그인
```

현재 프로젝트에 EAS config(EAS 설정)를 생성하기 위해 아래 명령어를 입력합니다. platform은 Android를 선택합니다.

```bash
 eas build:configure
```

아래 명령어를 입력하여 현재 프로젝트를 클라우드에서 컴파일하고 빌드합니다.

```bash
 eas build --platform android --profile preview
```

최초 실행 시 설치를 요구하는 파일이 있으면 설치해주고, keystore도 함께 생성합니다.

빌드가 완료되면 커맨드 라인에 설치 파일 다운로드 링크가 출력됩니다.
