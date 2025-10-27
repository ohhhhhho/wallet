# 블록체인 지갑만들기
Ethers.js를 사용해 이더리움 기반 지갑 생성

## 기술 스택
React, TypeScript, Ethers.js, Crypto-js, UUID

## 주요 기능
- 지갑 생성 : 사용자 비밀번호로 니모닉 생성
- 지갑 복구 : localStorage에 저장된 정보가 없을때 니모닉 시드단어를 통한 복구 
- 보안 : Crypto-js를 이용한 암호화된 정보 localStorage에 저장
- 라우팅 : 인증된 사용자만 지갑 정보 접근 가능

## 프로젝트 구조
1. 메인 화면 - Home.tsx
2. 지갑 생성 - SignUp.tsx  
 2.1. 지갑 생성 완료 - Wallet.tsx  
 2.2. 지갑 정보 - About.tsx  
 2.3. 니모닉 정보 - Recovery.tsx
3. 기존 사용자 로그인 - Login.tsx
4. 지갑 복구 - Import.tsx

## 실행 방법
npm install  
npm start
