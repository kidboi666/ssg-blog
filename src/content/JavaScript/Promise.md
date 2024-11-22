---
layout: "../../layouts/PostLayout.astro"
title: Promise
tags: ["JavaScript", "Promise", "Async"]
pubDate: 2024-03-07
category: JavaScript
---

# ✅ Promise 객체란 ?

`fetch` 함수는 `Promise` 객체를 리턴합니다. 이러한 `Promise` 객체는 어떤 작업에 관한 “상태 정보”를 갖고 있는 객체입니다.

`Promise` 는 작업의 상태에 따라서 그에 맞는 상태를 가집니다.

🟡 만약 아직 작업이 진행 중이라면 pending 상태를 갖고,

🟢 작업이 완료되었다면 fulfilled 상태를 가지고 작업 성공 결과를,

🔴 작업이 실패했다면 rejected 상태를 가지고 작업 실패 정보를 추가적으로 갖게 됩니다.

이후 `then` 메소드를 통해서 실행할 콜백을 등록하게 됩니다. 여기서 `then`은 `Promise` 객체의 메소드로, `Promise` 객체의 상태가 fulfilled 상태가 되면 then 메소드로 등록해 둔 콜백이 실행되는 겁니다. 또한 `then` 은 각각 별개의 `Promise` 객체를 리턴합니다.

```jsx
fetch('https://jsonplaceholder.typicode.com/users')
	.then((response) => response.text())
	.then((result) => {
		const users = JSON.parse(result);
		return users[0];
	})
	.then((user) => {
		console.log(user);
		const { address } = user;
	...
```

<aside>
👉 response.text() 메소드는 프로미스 객체를 리턴하는 메소드 입니다.

</aside>

여기서 `then`이 리턴하는 `Promise` 객체는 콜백함수가 어떤 값을 리턴하냐에 따라 2가지로 나뉘는데요.

## 1️⃣ 콜백 함수가 `Promise` 객체를 리턴할때

`Promise` 객체의 메소드인 `then`이 리턴한 `Promise` 는 콜백 함수가 리턴한 `Promise`의 상태와 결과를 그대로 따라서 갖게 됩니다.

## 2️⃣ 콜백 함수가 그 외 다른 값을 리턴할때

이 경우 해당 `Promise` 객체의 상태는 fulfilled 상태가 되고 콜백의 리턴값을 작업 성공 결과로 갖게 됩니다.

`Promise` 객체는 마치 '약속' 같아요. 우리가 할 일이 있을 때, 그 일이 아직 진행 중인지(pending), 성공적으로 끝났는지(fulfilled), 아니면 실패했는지(rejected)를 알려주는 역할을 해요. 이런 약속의 상태에 따라서 우리는 다음에 무엇을 해야 할지 결정할 수 있답니다.

예를 들어, 엄마가 "집에 돌아오면 과자를 줄게"라는 약속을 했다고 생각해봐요. 이런 약속을 `Promise` 객체라고 생각하면, "집에 돌아오는 일"이 아직 진행 중인 상태(pending), 집에 돌아와서 과자를 받는 상태(fulfilled), 아니면 뭔가 일이 생겨서 집에 돌아오지 못한 상태(rejected)로 나눠 볼 수 있겠죠?

그리고 `then`이라는 메소드는 "집에 돌아오면" 이라는 조건이 성공적으로 이루어졌을 때 다음에 어떤 일을 할지 알려주는 역할을 해요. 즉, "집에 돌아오면 과자를 먹는다"는 약속을 프로그래밍 언어로 표현한다면 `then` 메소드를 사용해 "과자를 먹는다"는 동작을 등록하게 되는 것이죠!

# ✅ Promisify

직접 `Promise` 객체를 만드는 겁니다. 그럼 언제 만들까요? 바로 **전통적인 형식의 비동기 실행 함수를 사용하는 코드를, `Promise` 기반의 코드로 변환하기 위해** `Promise` 객체를 직접 만드는 경우가 많습니다.

```jsx
function wait(text, milliseconds) {
  setTimeout(() => text, milliseconds);
}

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.text())
  .then((result) => wait(`${result} by Codeit`, 2000)) // 2초 후에 리스폰스의 내용 뒤에 'by Codeit' 추가하고 리턴
  .then((result) => {
    console.log(result);
  });
```

위와 같은 코드가 있다고 가정할 시 출력해보면 2초 뒤에 ‘by Codeit’이 뒤에 붙은 결과가 출력되지 않고 `undefined`만 출력됩니다. 왜냐하면 세번째 `then`의 콜백 함수가 전달받은 값은 `undefined`이기 때문입니다.

```jsx
...
	.then((result) => { return wait(`${result} by Codeit`, 2000); })
...
```

위 코드에서 `then` 의 콜백 함수는 결과적으로 `wait`함수를 실행하기만 할 뿐 아무런 값도 반환하지 않습니다. `setTimeout` 함수 안의 콜백이 2초 뒤에 실행하는 `text`는 `wait` 함수의 리턴값이 아닙니다.

`setTimeout` 같은 비동기 실행 함수는 Promise Chaining 안에서 이렇게 비동기 실행되는 함수를 바로 사용하면, 나중에 실행되는 부분의 리턴값을 Promise Chaining 에서 사용할 수 없게 됩니다.

이 문제를 해결하기 위해선 직접 `Promise` 객체를 생성하면 됩니다.

```jsx
function wait(text, milliseconds) {
  const p = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(text);
    }, milliseconds);
  });
  return p;
}

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.text())
  .then((result) => wait(`${result} by Codeit`, 2000)) // 2초 후에 리스폰스의 내용 뒤에 'by Codeit' 추가하고 리턴
  .then((result) => {
    console.log(result);
  });
```

그러면 2초뒤에 by Codeit이라는 문구가 잘 붙은 결과값이 출력되는 것을 알 수 있습니다.

# ✅ Promisify를 하면 안되는 함수도 있습니다.

만약 콜백을 여러번 실행하는 함수들 (`setInterval`, `addEventListener` 등)인 경우에는 Promisify하면 안 됩니다. 왜냐하면 `Promise` 객체는 한번 pending 상태에서 fulfilled 또는 rejected 상태가 되고나면 그 뒤로는 그 상태와 결과가 바뀌지 않기 때문입니다.

콜백이 여러번 실행되어야 하는 비동기 실행 함수인 경우에는 Promisify를 하면 안됩니다. Promisify를 하고 싶은 경우라도 콜백이 딱 한번 실행되는 함수인 경우에만 해야한다는 사실, 잘 기억하세요!

# ✅ 이미 상태가 결정된 Promise 객체

## 1️⃣ fulfilled 상태의 `Promise` 객체 만드는 법

```jsx
const p = Promise.resolve("success");
```

## 2️⃣ rejected 상태의 `Promise` 객체 만드는 법

```jsx
const p = Promise.reject(new Error("fail"));
```

## 3️⃣ new 생성자와 `executor` 함수로 `Promise` 객체 만드는 법

```jsx
const p = new Promise((resolve, reject) => {});
```

어떤 비동기 작업을 처리할 필요가 있다면, new 생성자와 `executor` 함수를 사용해서 `Promise` 객체를 만들어야 하지만, 상태가 이미 결정된 `Promise` 객체를 만들고 싶을 때는 이 `resolve` 또는 `reject` 메소드를 사용합니다.

```jsx
function doSomething(a, b) {
  // ~~
  if (problem) {
    return Promise.reject(new Error("Failed due to.."));
  } else {
    return fetch("https://~");
  }
}
```

해당 코드처럼 작성하면 에러가 났을 때도 바로 `throw new Error`로 에러를 출력하는게 아니라 해당 에러를 작업 결과로 가지고 rejected 상태를 가진 `Promise` 객체를 리턴함으로써 일관된 동작을 할 수 있습니다.

# ✅ 작업 결과를 가진 `Promise` 객체는 언제든 `then`으로 불러올 수 있습니다.

```jsx
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 2000); // 2초 후에 fulfilled 상태가 됨
});

p.then((result) => {
  console.log(result);
}); // Promise 객체가 pending 상태일 때 콜백 등록
setTimeout(() => {
  p.then((result) => {
    console.log(result);
  });
}, 5000); // Promise 객체가 fulfilled 상태가 되고 나서 콜백 등록
```

위와 같이 코드 문맥 상 떨어져 있는 곳에서도 해당 `Promise` 객체가 작업 결과를 가지고 있는 상태라면 언제든 `then` 메소드를 붙여 콜백을 실행할 수 있습니다.

<aside>
👉 `Promise` 객체는 항상 결과를 줄 수 있는 공급자(Provider) 이고 그것의 then 메소드는 그 결과를 소비하는 콜백인 소비자(Consumer)를 설정하는 메소드라는 사실을 잘 기억합시다. 시점과는 전혀 연관이 없으니 오해 금물!

</aside>

---

# ✅ 여러 Promise 객체를 다루는 메소드

## 1️⃣ all 메소드

여러 Promise 객체의 작업 성공 결과를 기다렸다가 모두 한번에 취합하여 각 작업 성공 결과로 이루어진 배열을 그 작업 성공 결과로 갖게 됩니다.

하지만, 한개만 rejected 가 나와도 모두 실패한걸로 간주합니다.

## 2️⃣ race 메소드

race 메소드는 여러 Promise 객체들을 레이스 시켜서 가장 빨리 상태가 결정된 Promise 객체를 선택하는 메소드입니다.

## 3️⃣ allSettled 메소드

여러 Promise 객체의 작업 성공 결과를 기다렸다가 모두 한번에 취합하여 각 작업 결과로 이루어진 배열을 그 작업 결과로 갖게 됩니다.

이 배열엔 아규먼트로 받았던 배열 내의 각 Promise 객체의

1. 최종 상태 → status 프로퍼티
2. 작업 성공 결과 → value 프로퍼티
3. 작업 실패 정보 → reason 프로퍼티

에 담은 객체들이 요소로 존재합니다.

## 4️⃣ any 메소드

가장 먼저 fulfilled 상태가 된 Promise 객체의 상태와 결과를 갖게 됩니다. 모두 rejected 라면 AggregateError라고 하는 에러를 작업 실패 정보로 갖고 rejected 상태가 됩니다.

단 하나라도 fulfilled 상태가 되면 되는 겁니다.
