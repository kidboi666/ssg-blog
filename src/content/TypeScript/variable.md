---
layout: ../../layouts/PostLayout.astro
title: 타입 애너테이션
category: TypeScript
tags: [TypeScript]
pubDate: 2024-12-06
---

# Variable Types

타입 애너테이션으로 타입핑을 하는 방법은 타입핑을 하는 가장 쉬운 방법중 하나 이다. 변수 이름 뒤에 콜론을 적고 타입을 적어주면 된다.

```typescript
// 일반적인 자바스크립트 변수
const myAwesomeVariable = "so fucking awesome!";

// 타입스크립트 변수
const myAwesomeVariable: string = "so funcking awesome!";
```

타입은 숫자(number), 문자열(string), 불리언(boolean) 등이 있다.

## String

타입핑 된 변수에는 다른 타입의 데이터가 올 경우 타입스크립트가 알려준다.

```typescript
let movieTitle: string = "Amadeus";
movieTitle = "Arriaval";
movieTitle = 9; // 'number' 형식은 'string' 형식에 할당할 수 없습니다.ts(2322)
```

또한, 문자열에선 쓸 수 없는 메서드도 사용하려고 하면 타입스크립트가 알려준다. 그 외 오타의 경우도 친절히 알려준다.

```typescript
movieTitle.upper(); // 'string' 형식에 'upper' 속성이 없습니다.ts(2339)
movieTitle.toUperCase(); //'toUperCase' 속성이 'string' 형식에 없습니다. 'toUpperCase'을(를) 사용하시겠습니까?ts(2551)
movieTitlee.toUpperCase(); // 에러 없이 정상 작동
```

## Number

타입스크립트는 소수나 정수를 구분하지 않고 `number` 형으로 통일하여 사용된다.

```typescript
let numCatLives: number = 9;
numCatLives += 1;
numCatLives = "zero"; // 'string' 형식은 'number' 형식에 할당할 수 없습니다.ts(2322)

let numGameLives: number = 2.5;
numGameLives = 2;
numGameLives = 3.5; // 소수든 정수든 아무 문제없이 값이 할당된다.
```

## Boolean

타입스크립트는 불리언 타입을 `boolean`으로 사용한다.

```typescript
let gameOver: boolean = false;
gameOver = true;
gameOver = "false"; // 'string' 형식은 'boolean' 형식에 할당할 수 없습니다.ts(2322)
```

그 외 잘 사용하지 않지만 `bigint` 와 `symbol` 타입도 존재한다.
