---
layout: ../../layouts/PostLayout.astro
title: fetch()
category: JavaScript
tags: [JavaScript, Async, fetch]
pubDate: 2024-12-06
---

# 네트워크

브라우저는 웹 페이지를 불러올 때마다 HTTP나 HTTPS 프로토콜을 사용해 네트워크 요청을 보내 HTML 파일과 필요한 리소스를 가져옵니다. 웹 브라우저는 사용자 요청에 응답하여 네트워크 요청을 보내기도 하지만 네트워크에 사용할 수 있는 다양한 자바스크립트 API를 제공하기도 합니다.

- `fetch()` 메서드.

  `fetch()` API는 프라미스 기반 API를 사용해 HTTP와 HTTPS 요청을 보내며, GET 요청을 단순하면서 포괄적인 기능으로 바꾸는 동시에 HTTP로 할 수 있는 거의 모든 것을 지원합니다.

- 서버 전송 이벤트 API.

  클라이언트가 원할 때마다 데이터를 전송할 수 있도록 웹 서버가 네트워크 연결을 열어 두는 HTTP '롱 폴링' 기법의 이벤트 기반 인터페이스 입니다.

- 웹소켓.

  HTTP는 아니지만 HTTP와 함께 사용하도록 만들어진 네트워크 프로토콜 입니다. 웹소켓은 클라이언트와 서버가 TCP 네트워크 소켓과 비슷한 방법으로 메시지를 주고받을 수 있는 비동기 메시지 전송 API입니다.

## fetch()

기본적인 HTTP 요청에서 fetch()는 3단계로 동작합니다.

1. 콘텐츠를 가져올 URL을 전달하면서 `fetch()`를 호출합니다.
2. HTTP 응답이 도착하기 시작하면 1단계에서 비동기적으로 반환한 응답 객체를 가져오고 이 응답 객체의 메서드를 호출해 응답 바디를 가져옵니다.
3. 2단계에서 비동기적으로 반환한 바디 객체를 사용해 필요한 일을 합니다.

`fetch()` API는 완전히 프라미스 기반이고 비동기 단계가 두 단계 있으므로 `fetch()`를 사용할 때는 일반적으로 `then()`을 두 번 호출하거나 await 표현식을 두 번 씁니다. 서버가 JSON 형식으로 응답한다고 가정할 때, `fetch()` 요청과 `then()`은 다음과 같은 형태입니다.

```javascript
fetch("/api/users/current") // HTTP(HTTPS) GET 요청
  .then((response) => response.json()) // 바디를 JSON 객체로 파싱
  .then((currentUser) => {
    displayUserInfo(currentUser); // 파싱된 객체를 사용
  });
```

서버에서 JSON 객체가 아니라 평범한 문자열을 반환한다고 가정하면, async, await 키워드를 다음과 같은 형태로 사용합니다.

```javascript
async function isServiceReady() {
  let response = await fetch("/api/service/status");
  let body = await response.text();

  return body === "ready";
}
```

## HTTP 상태 코드, 응답 헤더, 네트워크 에러

위에서 다룬 예시에는 에러 처리 코드가 모두 빠져 있었습니다. 더 현실적인 예제를 봅시다.

```javascript
fetch("/api/users/current") // GET 요청
  .then((response) => {
    if (
      response.ok && // 응답이 성공했고
      response.headers.get("Content-Type") === "application/json" // 예상한 타입이면
    ) {
      return response.json(); // 프라미스 반환
    } else {
      throw new Error( // 아니면 에러를 일으킴
        `Unexpected response status ${response.status} or content type`,
      );
    }
  })
  .then((currentUser) => {
    // response.json() 프라미스가 해석되면
    displayUserInfo(currentUser); // 파싱된 바디 사용
  })
  .catch((error) => {
    // 문제가 있을시 에러 로그를 남김
    // 사용자의 브라우저가 오프라인이라면 fetch() 자체가 거부됨.
    // 서버에서 잘못된 응답을 반환했다면 위에서 이미 에러를 일으켰음.
    console.log("Error while fetching current user:", error);
  });
```

`fetch()`는 서버의 응답이 도착하기 시작할 때, 즉 HTTP 상태와 응답 헤더를 받는 즉시 프라미스를 해석(resolve) 합니다. 일반적으로 이 시점은 응답 바디 전체가 도착하기 전입니다. 두 번째 단계에서 바디가 도착하기 전이라도 헤더는 확인할 수 있습니다. 응답 객체의 headers 프로퍼티는 Headers 객체 입니다. `has()` 메서드를 써서 헤더가 존재하는지 확인하거나 `get()` 메서드를 서서 헤더의 값을 읽을 수 있습니다. HTTP 헤더 이름은 대소문자를 섞어 써도 됩니다. Headers 객체는 이터러블이므로 필요하다면 다음과 같이 헤더를 읽을 수도 있습니다.

```javascript
fetch(url).then((response) => {
  for (let [name, value] of response.headers) {
    console.log(`${name}: ${value}`);
  }
});
```

웹 서버가 `fetch()` 요청에 응답한다면 프라미스는 그 응답 객체로 이행(fulfill)됩니다. 설령 서버의 응답이 404또는 500이더라도 마찬가지 입니다. `fetch()`가 프라미스를 거부하는 경우는 웹 서버에 전혀 접속할 수 없을 때뿐입니다. 오프라인 상태 이거나, 서버가 다운됐거나, URL의 호스트 이름이 존재하지 않는 경우가 이에 해당합니다. 이런 일은 네트워크 요청에서 언제든 일어날 수 있는 일이므로 `fetch()`를 호출할 때는 항상 `.catch()`를 함께 사용하세요.

### 요청 매개변수 설정

요청을 보낼때 URL과 함께 매개변수를 전달해야 한다면 URL 마지막 ? 뒤에 이름-값 쌍을 추가하면 됩니다. URL 객체와 URLSearchParams 클래스를 사용하면 그러한 형태의 URL을 만들기 쉽습니다. `fetch()` 함수는 첫 번째 인자로 URL 객체도 받으므로 아래와 같은 형식으로 매개변수를 넣을 수도 있습니다.

```javascript
async function search(term) {
  let url = new URL("/api/search");
  url.searchParams.set("q", term);
  let response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  let resultsArray = await response.json();
  return resultsArray;
}
```

### 요청 헤더 설정

요청을 보내면서 헤더를 설정해야 할 때도 있습니다. 이를 테면 인증과 관련한 자격을 증명하는 동작입니다. 이 때에는 Authorization 헤더에 자격 증명을 담아 보내야 하며, `fetch()`의 두 번째 인자를 사용할 수 있습니다.

```javascript
let authHeaders = new Headers();
// HTTPS 연결이 아니라면 기본 인증을 쓰면 안 됨.

authHeaders.set("Authorization", `Basic ${btoa(`${username}:${password}`)}`);
fetch("/api/users/", { headers: authHeaders })
  .then((response) => response.json())
  .then((usersList) => displayAllUsers(usersList));
```

다음과 같이 `Request()` 생성자에 인자 두 개를 쓰고 반환된 요청 객체를 `fetch()`에 전달해도 결과는 같습니다.

```javascript

let request = new Request(url, { headers });
fetch(request).then(response => ...)
```

### 응답 바디 분석

`fetch()`의 두 번째 단계는 `json()` 이나 `text()` 메서드를 호출해 세 번째 단계에서 파싱된 결과물을 가지고 동작이 시작됩니다. 거의 대부분 이런 식으로 진행되지만, 웹 서버의 응답을 얻는 다른 방법도 있습니다. 응답 객체에는 `json()`, `text()` 외에도 다음 세 가지 메서드가 존재합니다.

- `arrayBuffer()`

  이 메서드는 ArrayBuffer로 해석되는 프라미스를 반환합니다. 이진 데이터를 포함하는 응답을 받을 때 유용합니다.

- `blob()`

  이 메서드는 Blob 객체로 해석되는 프라미스를 반환합니다. 대량의 이진 데이터를 받을 때 적합합니다.

- `formData()`

  이 메서드는 FormData 객체로 해석되는 프라미스를 반환합니다. 이 메서드는 응답 바디가 multipart/form-data 형식으로 인코드됐다고 확신할 때만 사용해야 합니다.

### 응답 바디 스트리밍

응답 바디를 비동기적으로 완료해 반환하는 다섯 가지 메서드 외에 응답 바디를 스트리밍 하는 방법도 있습니다. 이 방법은 응답 바디의 일부를 받을 때마다 처리하는 형태로 사용할 수 있으며, 다운로드 진행 상태를 알리는 인터페이스를 제공할 때도 유용합니다. _이하 생략_

### 요청 메서드와 요청 바디 지정

POST, PUT, DELETE 같은 요청 메서드를 사용하려면 `fetch()` 두 번째 인자로 설정 객체를 전달하면서 그 객체에 method 프로퍼티를 넣으면 됩니다.

```javascript
fetch(url, {
  method: "POST",
  body: "hello world",
});
```

요청 바디를 사용하면 브라우저는 자동으로 Content-Length 헤더를 요청에 추가합니다. 위 예제처럼 바디가 문자열인 경우 브라우저는 콘텐츠 타입 헤더를 `text/plain;charset=UTF-8`로 설정합니다. `text/html`이나 `application/json`과 같이 더 구체적인 타입을 지정하고자 한다면 다음과 같이 브라우저가 설정한 기본 값을 덮어 써야 합니다.

```javascript
fetch(url, {
  method: "POST",
  headers: new Headers({ "Content-Type": "application/json" }),
  body: JSON.stringify(requestBody),
});
```
