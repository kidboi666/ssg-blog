---
layout: ../../layouts/PostLayout.astro
title: async/await
tags: [JavaScript, Async]
category: JavaScript
pubDate: 2024-12-06
---

# async와 await

ES2017은 새 키워드 async와 await을 도입했습니다. 이 키워드는 비동기 자바스크립트 프로그래밍의 패러다임 전환이라 할 만합니다. async와 await은 프라미스 사용을 극적으로 단순화하여 프라미스 기반의 비동기 코드를 동기적 코드처럼 작성할 수 있게 합니다. 프라미스를 이해하는 것은 여전히 중요하지만 async와 await을 사용하면 프라미스의 복잡함을 상당 부분 잊을 수 있습니다.

비동기 코드는 일반적인 동기적 코드와 같은 방법으로 값을 반환하거나 예외를 일으킬 수 없습니다. 프라미스를 설계한 이유는 그런 차이 때문입니다. 이행된 프라미스의 값은 동기적 함수의 반환 값과 같습니다. 거부된 프라미스의 값은 동기적 함수에서 일으킨 에러와 같습니다. 후자는 `.catch()` 메서드의 이름에서도 그 유사성이 잘 드러납니다. async와 await는 효율적인 프라미스 기반 코드에서 프라미스를 숨겨 읽기 쉽고 이해하기 쉬운 동기적 코드와 비슷하게 만듭니다.

## await 표현식

await 키워드는 프라미스를 받아 반환 값이나 예외로 바꿉니다. 프라미스 객체 p가 있을 때 표현식 await p는 p가 완료될 때까지 대기합니다. p가 이행되면 await p의 값은 p가 이행된 값입니다. p가 거부되면 await p 표현식은 p와 같은 값을 예외로 일으킵니다. await는 보통 프라미스를 할당한 변수와 함께 사용하기 보다는 다음과 같이 프라미스를 반환하는 함수와 함께 사용합니다.

```javascript
let response = await fetch("/api/user/profile");
let profile = await response.json();
```

await 키워드는 프로그램 흐름을 차단하지 않으며 지정된 프라미스가 완료되기 전에는 말 그대로 '아무 일도 하지 않는다'는 점을 이해하는 것이 중요합니다. 코드는 여전히 비동기적입니다. await는 그 사실이 드러나지 않게 할 뿐입니다. 따라서 await를 사용하는 코드는 항상 비동기적입니다.

## async 함수

await를 사용하는 코드는 항상 비동기적이므로 중요한 규칙이 있습니다. await 키워드는 async 키워드로 선언된 함수 안에서만 사용할 수 있습니다. 다음은 앞에서 만들었던 `getHighScore()` 함수를 async와 await로 고쳐 쓴 버전입니다.

```javascript
async function getHighScore() {
  let response = await fetch("/api/user/profile");
  let profile = await response.json();
  return profile.highScore;
}
```

함수를 async로 선언하면 설령 함수 바디에 프라미스 관련 코드가 전혀 없더라도 반환 값은 프라미스 입니다. async 함수가 정상적으로 완료되면 함수의 실제 반환 값인 프라미스 객체는 함수 바디가 반환하는 (것처럼 보이는) 값으로 해석됩니다. async가 예외를 일으키면 반환된 프라미스 객체 역시 그 예외와 함께 거부 됩니다.

`getHighScore()` 함수는 async로 선언됐으므로 프라미스를 반환합니다. 프라미스를 반환하는 함수이므로 그 안에 await 키워드를 사용할 수 있습니다.

```javascript
displayHighScore(await getHighScore());
```

다시 말하지만 이 코드는 다른 async 함수 안에서만 동작합니다. async 함수 안에서 await 표현식을 필요한 만큼 중첩할 수 있습니다. 하지만 함수의 최상위 레벨에 있거나 async가 아닌 함수 안에 있다면 await는 사용할 수 없고 반환된 프라미스를 일반적인 방법으로 처리해야 합니다.

```javascript
getHighScore().then(displayHighScore).catch(console.error);
```

async 키워드는 어떤 함수에든 쓸 수 있습니다. function 키워드를 문으로 썼든 표현식으로 썼든 상관없습니다. 화살표 함수, 클래스와 객체 리터럴의 단축 메서드에서도 동작합니다.

## 여러 개의 프라미스 대기

`getJSON()` 함수를 async로 고쳐 썼다고 합시다.

```javascript
async function getJSON(url) {
  let response = await fetch(url);
  let body = await response.json();

  return body;
}
```

그리고 이 함수로 JSON 값 두 개를 가져오고 싶습니다.

```javascript
let value1 = await getJSON(url1);
let value2 = await getJSON(url2);
```

이 코드의 문제는 불필요하게 연속적이라는 겁니다. 두 번째 URL을 가져오는 작업은 첫 번째 URL을 가져오는 작업이 완료되기 전에는 시작할 수 없습니다. 두 번째 URL을 가져오는 작업은 첫 번째 URL을 가져오는 작업이 완료되기 전에는 시작할 수 없습니다. 두 번째 URL이 첫 번째 URL의 값과 관계가 없다면 두 값을 동시에 가져올 수 있어야 합니다. async 함수는 프라미스에 기반하므로 어려운 일은 아닙니다. 프라미스를 직접 사용할 때와 마찬가지로 `Promise.all()`을 사용하면 됩니다.

```javascript
let [value1, value2] = await Promise.all([getJSON(url1), getJSON(url2)]);
```

## 세부 사항

마지막으로, 내부에서 일어나는 일을 이해하면 async 함수가 어떻게 동작하는지 이해하는 데 도움이 될 것입니다. 다음과 같은 async 함수가 있다고 합시다.

```javascript
async function f(x) {
  // 바디
}
```

이 함수를 원래 함수를 감싸는, 프라미스를 반환하는 함수라고 생각해 보십시오.

```javascript
function f(x) {
  return new Promise(function (resolve, reject) {
    try {
      resolve(function (x) {
        // 바디
      });
    } catch (e) {
      reject(e);
    }
  });
}
```

사실 이런 식으로 문법을 변형해 보는 것만으로는 await 키워드를 설명하기 쉽지 않습니다. 하지만 await키워드를 함수 바디를 동기적 덩어리로 구분하는 일종의 표식이라고 생각해 보십시오. ES2017 인터프리터는 함수 바디를 일련의 하위 함수 여러 개로 분해할 수 있으며 각 하위 함수는 자신의 앞에 있는, await로 표시된 프라미스의 `then()` 메서드에 전달됩니다.

### 참조

- the Definitive Guide (서적)
