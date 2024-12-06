---
layout: ../../layouts/PostLayout.astro
title: 스토리지
category: JavaScript
tags: [JavaScript, Storage]
pubDate: 2024-12-06
---

# 개요

웹 애플리케이션은 브라우저 API를 이용해 사용자의 컴퓨터에 데이터를 저장할 수 있습니다. 클라이언트 사이드 스토리지는 웹 브라우저의 메모리처럼 사용됩니다. 웹 애플리케이션은 사용자 설정을 저장하거나, 심지어 자신의 상태 전체를 저장해서 사용자가 마지막으로 방문했을 때를 정확히 재현할 수도 있습니다. 클라이언트 사이드 스토리지는 출처에 따라 구분되므로 다른 사이트의 페이지에서 저장한 데이터는 읽을 수 없습니다. 반면, 같은 사이트 내 다른 페이지는 스토리지를 읽을 수 있고 이를 페이지 사이의 통신 메커니즘으로 사용할 수도 있습니다.

웹 애플리케이션은 저장한 데이터의 수명을 지정할 수 있습니다. 창을 닫거나 브라우저를 빠져나가기 전까지만 임시로 유지할 수도 있고, 몇 달이나 몇 년 뒤에도 사용할 수 있도록 사용자의 컴퓨터에 영구히 저장할 수도 있습니다. 이러한 클라이언트 사이드 스토리지에는 다양한 형태가 있습니다.

- 웹 스토리지

  웹 스토리지 API는 localStorage와 sessionStorage 객체로 구성됩니다. 기본적으로 문자열 키와 문자열 값을 연결한 지속성 있는 객체입니다. 용량에 한계가 있어 방대한 데이터를 저장할 순 없습니다.

- 쿠키

  쿠키는 원래 서버 사이드 스크립트에서 사용하도록 설계된 놈입니다. 클라이언트 사이드에서 쿠키를 다루지 못하는건 아니지만 쉽진 않으며, 텍스트 데이터를 소량 저장하는 정도로만 쓸 수 있습니다. 또한 쿠키에 저장된 데이터는 서버에서 쓸모가 없더라도 HTTP 요청이 있을 때마다 항상 서버로 전송됩니다.

- IndexedDB

  IndexedDB는 인덱스를 지원하는 객체 데이터베이스의 비동기 API 입니다.

<aside class='warning'>
스토리지, 보안, 개인 정보

웹 브라우저는 사용자의 편의를 위해 웹 비밀번호를 안전하게 암호화한 형태로 장치에 저장합니다. 하지만 여기서 설명하는 클라이언트 사이드 데이터 스토리지 중 어떤 것도 암호화를 지원하지 않습니다. 웹 애플리케이션에서 사용자의 장치에 저장하는 데이터는 모두 암호화되지 않는다고 생각해야 합니다. 따라서 클라이언트 사이드 스토리지를 비밀번호, 계좌 번호, 기타 민감한 정보에 사용해서는 절대 안됩니다.

</aside>

# 로컬 스토리지와 세션 스토리지

Window 객체의 localStorage, sessionStorage 프로퍼티는 스토리지 객체를 참조합니다. 스토리지 객체는 일반적인 자바스크립트 객체와 거의 비슷하지만 다음과 같은 차이가 있습니다.

- 스토리지 객체의 프로퍼티 값에는 문자열만 쓸 수 있습니다.
- 스토리지 객체에 저장된 프로퍼티에는 지속성이 있습니다. 로컬 스토리지 객체의 프로퍼티 값을 변경한 후 사용자가 페이지를 새로고침 하면 마지막으로 저장한 값을 그대로 사용할 수 있습니다.

로컬 스토리지 객체는 다음과 같이 사용합니다.

```javascript
let name = localStorage.username;
if (!name) {
  name = prompt("What is your name?");
  localStorage.username = name;
}
```

`delete` 연산자를 써서 localStoarge, sessionStorage의 프로퍼티를 제거할 수 있고, `Object.keys()`나 `for/in` 루프를 써서 스토리지 객체의 프로퍼티를 열거할 수 있습니다. 스토리지 객체의 프로퍼티를 모두 제거할 때는 `clear()` 메서드를 호출하면 됩니다.

스토리지 객체에는 `getItem()`, `setItem()`, `deleteItem()` 메서드도 있습니다. 프로퍼티에 직접 접근하거나 delete 연산자를 쓰는 대신 이들 메서드를 사용해도 됩니다. 스토리지 객체의 프로퍼티에는 문자열만 저장할 수 있습니다. 문자열이 아닌 데이터를 저장할 때는 직접 인코드/디코드 해야 합니다.

```javascript
// 숫자를 저장하면 자동으로 문자열로 변환됨.
// 스토리지에서 값을 가져올 때 파싱 필수
localStorage.x = 10;
let x = parseInt(localStorage.x);

// 날짜를 저장할 때는 문자열로 변환하고 가져올 때는 파싱합니다.
localStorage.lastRead = new Date().toUTCString();
let lastRead = new Date(Date.parse(localStorage.lastRead));

// JSON을 이용하면 편리합니다.
localStorage.data = JSON.stringify(data); // 인코드 후 저장
let data = JSON.parse(localStorage.data); // 가져와서 디코드
```

## 스토리지 수명과 스코프

localStorage와 sessionStorage는 수명과 스토리지 범위에 차이가 있습니다. localStorage에 저장된 데이터는 만료되지 않으며 웹 애플리케이션에서 삭제하거나 사용자가 브라우저 UI를 통해 삭제하지 않는 한 사용자의 장치에 계속 남습니다. localStorage는 문서 출처에 종속됩니다. 문서의 출처는 **프로토콜(HTTP, HTTPS), 호스트 이름(도메인), 포트** 로 정의됩니다. 같은 출처에서 불러온 문서는 localStorage에 실제로 접근하는 스크립트의 출처에 관계없이 같은 localStorage 데이터를 공유합니다. _출처가 다른 문서는 절대 서로의 데이터를 읽거나 수정할 수 없습니다._

**localStorage는 브라우저에도 종속됩니다.** 파이어폭스로 방문했을때 저장된 데이터를 크롬으로 방문할때 사용할 수 없습니다.

**sessionStorage에 저장된 데이터는 최상위 창이나 브라우저 탭이 닫힐 때 사라집니다.** 하지만 최신 브라우저에는 최근에 닫은 탭을 다시 열고 마지막 세션을 복원하는 기능이 있으므로 이런 탭에 저장된 데이터는 더 오래 지속될 수 있습니다.

localStorage와 마찬가지로 sessionStorage 역시 문서 출처에 종속되므로 **출처가 다른 문서는 절대 sessionStorage를 공유할 수 없습니다.** 또한 **sessionStorage는 창(탭)에도 종속됩니다.** _사용자가 같은 출처의 문서를 브라우저 탭 두 개에 각각 열였다면 두 탭의 sessionStorage 데이터는 서로 구분됩니다._ 탭 1에서 실행 중인 스크립트는 탭 2의 스크립트에서 저장한 데이터를 읽거나 수정할 수 없습니다. 설령 두 탭이 똑같은 페이지를 열었다고 해도 마찬가지 입니다.

## 스토리지 이벤트

localStorage에 저장된 데이터가 변경될 때마다 _그 데이터를 볼 수 있는 모든 Window 객체에서 스토리지 이벤트가 일어납니다._ 데이터를 변경한 창(탭)에서는 이벤트가 일어나지 않습니다. 브라우저에 출처가 같은 문서를 연 탭이 두 개 있고 그 중 하나가 LocalStorage에 값을 저장하면 다른 탭은 스토리지 이벤트를 수신합니다.

`window.onstorage`에 핸들러를 할당하거나 `window.addEventListener()`를 호출해 스토리지 이벤트에 핸들러를 등록할 수 있습니다. 스토리지 이벤트 관련 이벤트 객체에는 몇 가지 중요한 프로퍼티가 있습니다.

- `key`

  이벤트 대상인 아이템의 이름 또는 키입니다. `clear()` 메서드가 호출됐다면 프로퍼티 값은 null입니다.

- `newValue`

  아이템에 저장된 새로운 값입니다. `removeItem()`이 호출됐다면 이 프로퍼티는 존재하지 않습니다.

- `oldValue`

  수정되거나 삭제된 아이템의 이전 값입니다. 새로운 프로퍼티를 추가했다면 이 프로퍼티는 존재하지 않습니다.

- `storageArea`

  변경된 스토리지 객체입니다. 보통 localStorage 객체입니다.

- `url`

  스토리지를 변경한 문서의 URL인 문자열입니다.

localStorage와 storage 이벤트는 같은 웹사이트를 방문 중인 창 전체에 메시지를 전송하는 일종의 방송 메커니즘처럼 사용할 수 있습니다. 예를 들어, 웹 기반 이미지 편집 애플리케이션이 있고 도구 팔레트를 별도의 창으로 표시한다고 합시다. 사용자가 도구를 선택하면 애플리케이션은 현재 상태를 localStorage에 저장하고, 도구 팔레트를 표시한 창에 새로운 도구가 선택됐음을 알릴 수 있습니다.

# 쿠키

쿠키는 특정 웹 페이지 또는 웹사이트와 연관된 소량의 이름 붙은 데이터이며 웹 브라우저에 저장됩니다. 쿠키는 서버 사이드 프로그램에 사용하도록 설계됐으며, 원래는 HTTP 프로토콜을 확장할 의도로 만들어졌습니다. 쿠키 데이터는 자동으로 웹 브라우저와 웹 서버 사이에서 전송되므로 서버 사이드 스크립트에서 클라이언트에 저장된 쿠키 값을 읽고 쓸 수 있습니다. 아래부터는 클라이언트 사이드 스크립트에서 Document 객체의 cookie 프로퍼티를 통해 쿠키를 조작하는 방법을 설명합니다.

<aside class='info'>
쿠키라는 이름의 유래

'쿠키' 또는 '매직 쿠키' 라는 용어는 컴퓨팅 분야에서 오래 전부터 접근을 식별하거나 허용하는 데이터의 작은 덩어리, 특히 개인적이거나 비밀스러운 데이터를 가리키는 용도로 쓰였습니다. 자바스크립트에서 쿠키는 상태를 저장하고 웹 브라우저의 신분증 비슷한 용도로 쓰입니다. **하지만 자바스크립트의 쿠키는 어떤 종류의 암호화도 지원하지 않습니다.** https: 연결이 조금 도움되긴 하지만 절대 안전하지 않습니다.

</aside>

## 쿠키 읽기

`document.cookie` 프로퍼티는 현재 문서에 적용되는 쿠키 전체를 포함한 문자열을 반환합니다. 이 문자열은 이름-값 쌍을 세미콜론과 스페이스로 구분한 리스트입니다. 쿠키 값은 그저 값 자체이며 쿠키와 연관된 속성은 포함하지 않습니다. `document.cookie` 프로퍼티를 사용할 때는 반드시 `split()` 메서드를 써서 이름-값 쌍 배열로 분리해야 합니다. cookie 프로퍼티에서 쿠키 값을 추출한 다음에는 쿠키를 만든 사람이 사용한 인코딩 또는 형식을 기준으로 값을 해석해야 합니다.

다음 코드는 `document.cookie` 프로퍼티를 파싱해서 문서의 쿠키를 나타내는 프로퍼티로 이루어진 객체를 반환하는 `getCookie()` 함수입니다.

```javascript
// getCookies.ts

// 문서 쿠키를 Map 객체로 반환합니다.
// 쿠키 값은 encodeURIComponent()로 인코드됐다고 가정합니다.
function getCookies() {
  let cookies = new Map(); // 반환할 객체 초기화
  let all = document.cookie; // 모든 쿠키 문자열로 가져옴
  let list = all.split("; "); // 이름-값 쌍으로 분리

  for (let cookie of list) {
    // 리스트의 쿠키 순회
    if (!cookie.includes("=")) continue; // =기호가 없으면 넘어감
    let p = cookie.indexOf("="); // 첫 번째 = 기호를 찾기
    let name = cookie.substring(0, p); // 쿠키 이름
    let value = cookie.substring(p + 1); // 쿠키 값
    value = decodeURIComponent(value); // 디코드
    cookies.set(name, value); // 쿠키 이름과 값을 cookies객체에 넣음
  }
  return cookies;
}
```

## 쿠키 속성: 수명과 범위

쿠키에는 수명과 범위를 결정하는 속성도 있습니다. 쿠키는 기본적으로 일시적입니다. 쿠키에 저장되는 값은 웹 브라우저 세션의 지속 시간 동안만 유지되며 사용자가 브라우저를 종료하면 사라집니다. 세션이 사라져도 쿠키가 남아 있길 원한다면 반드시 `max-age` 속성에 쿠키의 유지 시간을 초 단위로 지정해야 합니다. 수명을 지정하면 브라우저는 쿠키를 파일에 저장하며, 지정된 기간이 만료됐을 때만 삭제합니다.

localStorage, sessionStorage와 마찬가지로 **쿠키의 범위는 문서 출처에 의해 결정되지만, 문서 경로의 영향도 받습니다.** 범위는 쿠키 속성 path, domain을 통해 변경 가능합니다. 기본적으로 쿠키는 자신을 생성한 웹 페이지와 같은 디렉터리, 또는 그 서브디렉터리에 포함된 웹 페이지에서 볼 수 있고 접근할 수 있습니다. 예를 들어 웹 페이지 `example.com/catalog/index.html` 에서 쿠키를 생성했다면, 그 쿠키는 `example.com/catalog/order.html`, `example.com/catalog/widgets/index.html` 에서는 볼 수 있지만 `example.com/about.html` 에서는 볼 수 없습니다.

대게는 이런 기본 동작이 우리가 원하는 동작과 일치합니다. 하지만 가끔은 어떤 페이지에서 쿠키를 생성했든 관계없이 웹사이트 전체에서 그 쿠키 값을 사용해야 할 때도 있습니다. 에를 들어 사용자가 어떤 페이지의 폼에 입력한 메일 주소를 저장해서 사용자가 다음에 방문할 때 기본 값으로 쓰고, 또 다른 페이지의 완전히 무관한 폼에서 청구 주소를 요청할 때도 기본 값으로 쓰고 싶을 수 있습니다. 이럴 때 쿠키의 path 속성을 지정하면 같은 웹 서버 내 웹 페이지 중 URL이 지정된 경로로 시작하는 페이지는 모두 그 쿠키를 공유할 수 있습니다. 예를 들어 `example.com/catalog/widgets/index.html` 에서 설정한 쿠키의 경로를 `/catalog` 로 설정한다면 그 쿠키는 `example.com/catalog/order.html` 에서도 볼 수 있습니다. 또는 경로를 `/`로 설정하면 `example.com` 도메인의 모든 페이지에서 쿠키를 볼 수 있습니다.

기본적으로 쿠키의 범위는 문서 출처로 제한됩니다. 대형 웹사이트에서는 서브도메인에서도 쿠키를 공유해야 할 수도 있습니다. 예를 들어 `catalog/example.com`에서 설정한 쿠키 값을 `order.example.com`에서 읽어야 할 일도 있습니다. 이럴 때 domain 속성을 사용합니다. `catalog.example.com`의 페이지에서 쿠키를 생성하고 path 속성을 `/`로, domain 속성을 `.example.com`으로 설정하면 이 쿠키는 `catalog.example.com`, `orders.example.com`, 기타 `example.com` 도메인에 속하는 모든 서버의 웹 페이지에서 사용할 수 있습니다.

마지막 쿠키 속성은 secure 라는 불 속성이며 쿠키 값을 네트워크로 전송하는 방법을 지정합니다. 기본적으로 쿠키는 보안이 되지 않으며 HTTP 연결을 통해 전송 됩니다. 하지만 쿠키를 보안으로 지정하면 브라우저와 서버가 HTTPS 또는 보안 프로토콜로 연결됐을 때만 전송됩니다.

<aside class='info'>
쿠키 제한

쿠키는 서버 사이드 스크립트에서 사용할 작은 데이터를 저장할 의도로 만들어졌으며, 이 데이터는 관련된 URL을 요청할 때마다 서버에 전송됩니다. 쿠키 표준에서는 브라우저 제조사에서 쿠키의 개수나 크기를 제한하지 않기를 권하지만, 브라우저가 쿠키를 최소 300개는 유지해야 한다든지, 웹 서버 하나당 20개 이상의 쿠키를 허용해야 한다든지, 쿠키 하나당 이름과 값을 합쳐서 4KB 이상을 유지해야 한다는 규정도 없습니다. 현실적으로 브라우저는 300개가 훨씬 넘는 쿠키를 허용하지만, 일부 브라우저는 아직 4KB 제한을 적용하고 있습니다.

</aside>

## 쿠키 저장

쿠키 값을 현재 문서에 연결할 때는 cookie 프로퍼티에 `name=value` 문자열을 할당하기만 하면 됩니다. 예를 들어 다음을 보십시오.

```javascript showLineNumbers=false
document.cookie = `version=${encodeURIComponent(document.lastModified)}`;
```

다음에 cookie 프로퍼티를 읽으면 저장했던 이름-값 쌍이 문서의 쿠키 리스트에 포함되어 있을 것입니다. 쿠키 값에는 세미콜론, 콤마, 공백을 쓸 수 없습니다. 따라서 쿠키에 값을 저장하기 전에 전역 함수 `encodeURIComponent()`로 인코드하는 편이 좋습니다. 쿠키 값을 읽을 때는 이에 대응하는 `decodeURIComponent()` 함수를 쓰면 됩니다.

단순히 이름-값 쌍만 사용해 작성한 쿠키는 현재 세션에 유지는 되지만 사용자가 브라우저를 닫으면 사라집니다. 세션이 끝나도 쿠키가 유지되게 하려면 `max-age` 속성으로 원하는 수명을 초 단위로 지정합니다. 속성을 설정할 때는 cookie 프로퍼티에 `name=value; max-age=seconds` 형태의 문자열을 할당합니다. 다음 함수는 선택 사항으로 max-age 속성을 받아 쿠키를 설정합니다.

```javascript
// 이름-값 쌍을 쿠키로 저장하고 값을 encodeURIComponent()로 인코드해서 세미콜론, 콤마, 스페이스를 이스케이프 합니다.
// daysToLive가 숫자이면 max-age 속성을 통해 쿠키를 그 날짜만큼 유지합니다. daysToLive가 0이면 쿠키를 삭제합니다.
function setCookie(name, value, daysToLive = null) {
  let cookie = `${name}=${encodeURIComponent(value)}`;

  if (daysToLive !== null) {
    cookie += `; max-age=${daysToLive * 60 * 60 * 24}`;
  }
  document.cookie = cookie;
}
```

마찬가지로 `;path=value`나 `;domain=value` 형태의 문자열을 이어붙여 쿠키의 `path`, `domain` 속성도 설정할 수 있습니다. secure 프로퍼티를 설정할 때는 `;secure`만 붙이면 됩니다.

쿠키의 값을 변경할 때는 같은 이름, 경로, 도메인으로 새로운 값을 설정하면 됩니다. 쿠키 값을 바꿀 때 `max-age` 속성 값도 바꿔서 수명을 갱신할 수 있습니다.

쿠키를 삭제할 때는 같은 이름, 경로, 도메인을 사용하면서 `max-age` 속성을 0으로 지정합니다. 값은 아무렇게나 써도 되고 비워도 됩니다.

# 참조

- the Definitive Guide (서적)