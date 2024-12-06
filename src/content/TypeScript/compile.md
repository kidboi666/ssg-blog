---
layout: ../../layouts/PostLayout.astro
title: 컴파일
category: TypeScript
tags: [TypeScript]
pubDate: 2024-12-06
---

# 컴파일

결국 타입스크립트는 자바스크립트로 컴파일 된다. 코드의 최종 실행은 결국 자바스크립트가 실행된다고 생각하자. 아래 예시를 보자

```typescript del={5,6,7,12,20}
// basics.ts

let movieTitle: string = "Amadeus";
movieTitle = "Arriaval";
movieTitle = 9; // 'number' 형식은 'string' 형식에 할당할 수 없습니다.ts(2322)
movieTitle.upper(); // 'string' 형식에 'upper' 속성이 없습니다.ts(2339)
movieTitle.toUperCase(); //'toUperCase' 속성이 'string' 형식에 없습니다. 'toUpperCase'을(를) 사용하시겠습니까?ts(2551)
movieTitlee.toUpperCase();

let numCatLives: number = 9;
numCatLives += 1;
numCatLives = "zero"; // 'string' 형식은 'number' 형식에 할당할 수 없습니다.ts(2322)

let numGameLives: number = 2.5;
numGameLives = 2;
numGameLives = 3.5;

let gameOver: boolean = false;
gameOver = true;
gameOver = "false"; // 'string' 형식은 'boolean' 형식에 할당할 수 없습니다.ts(2322)
```

위 코드를 `tsc basics.ts` 명령어를 통해 컴파일 해보자

```zsh
basics.ts:3:1 - error TS2322: Type 'number' is not assignable to type 'string'.

3 movieTitle = 9; //
  ~~~~~~~~~~

basics.ts:4:12 - error TS2339: Property 'upper' does not exist on type 'string'.

4 movieTitle.upper();
             ~~~~~

basics.ts:6:12 - error TS2551: Property 'toUpperCas' does not exist on type 'string'. Did you mean 'toUpperCase'?

6 movieTitle.toUpperCas();
             ~~~~~~~~~~

  ../../../../../usr/local/lib/node_modules/typescript/lib/lib.es5.d.ts:508:5
    508     toUpperCase(): string;
            ~~~~~~~~~~~~~~~~~~~~~~
    'toUpperCase' is declared here.

basics.ts:10:1 - error TS2322: Type 'string' is not assignable to type 'number'.

10 numCatLives = "zero";
   ~~~~~~~~~~~

basics.ts:18:1 - error TS2322: Type 'string' is not assignable to type 'boolean'.

18 gameOver = "false";
   ~~~~~~~~


Found 5 errors in the same file, starting at: basics.ts:3
```

그럼 위와 같은 에러가 뜰 것이다. 하지만 문제 없이 자바스크립트 파일은 컴파일 되었다. 해당 파일을 보자.

```javascript
var movieTitle = "Amadeus";
movieTitle = "Arriaval";
movieTitle = 9;
movieTitle.upper();
movieTitle.toUpperCase();
movieTitle.toUpperCas();
var numCatLives = 9;
numCatLives += 1;
numCatLives = "zero";
var numGameLives = 2.5;
numGameLives = 2;
numGameLives = 3.5;
var gameOver = false;
gameOver = true;
gameOver = "false";
```

일단 모든 타입 애너테이션이 사라졌고 `let`이 `var`로 바뀌어져 있다. 이로 인해 알 수 있는건 첫 째, 타입스크립트는 결국 자바스크립트 코드로 컴파일 되고, 둘 째로 설정에 따라 컴파일에 사용될 자바스크립트 버전을 선택할 수 있다는 것이다.
