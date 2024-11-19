---
layout: ../../layouts/PostLayout.astro
title: "리액트 요약"
category: "React"
pubDate: 2024-11-17
tags: ["React"]
---

# ✅ JSX 문법

JSX는 리액트의 확장 문법입니다. 리액트를 작성할때 해당 문법을 이용하면 HTML 코드를 보다 편안하게 작성할 수 있습니다.

```jsx
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <h1>나만의 리액트</h1>
  </>,
);
```

JSX 문법은 자바스크립트로 HTML과 같은 문법을 사용할 수 있도록 만들어주는 편리한 문법이지만, 그만큼 꼭 지켜야할 몇가지 규칙들이 있습니다.

## ❗ HTML과 다른 속성명

### 1️⃣ 속성명은 카멜케이스로 작성하기

HTML에서 여러단어를 조합해서 사용하는 속성명들은 카멜케이스로 작성해줘야 합니다.

`onclick` → `onClick`,

`onblur` → `onBlur`,

`onfocus` → `onFocus` …

```jsx
root.render(<button onClick={() => someFunction()}>클릭!</button>);
```

예외적으로 비표준 속성을 다룰 때 활용하는`data-*` 속성은 카멜 케이스가 아니라 기존의 HTML 문법 그대로 작성해야 합니다.

```jsx
root.render(
  <div>
    상태 변경:
    <button className="btn" data-status="대기중">
      대기중
    </button>
    <button className="btn" data-status="진행중">
      진행중
    </button>
    <button className="btn" data-status="완료">
      완료
    </button>
  </div>,
);
```

### 2️⃣ 자바스크립트 예약어와 같은 속성명은 사용할 수 없다.

자바스크립트의 `for` 와 `class`는 html에서 다른 뜻으로 쓰이는 문법 입니다. 그렇기에 html용도로써의 `for`는 리액트에서 `htmlFor` 로, `class`는 `className` 으로 작성해줘야 합니다.

```jsx
root.render(
  <form>
    <label htmlFor="name">이름</label>
    <input id="name" className="name-input" type="text" />
  </form>,
);
```

## ❗ 반드시 하나의 요소로 감싸기 - Fragment

JSX 문법에서 `render` 메소드는 반드시 하나의 요소로 감싸줘야 합니다. 하지만 그로 인해 불필요한 부모 태그를 만들게 되겠죠? 그럴땐 `Fragment`를 이용해 감싸주면 됩니다. 빈태그로 감싸주는 단축 문법도 있습니다.

```jsx
root.render(
  <Fragment>
    <p>안녕</p>
    <p>리액트!</p>
  </Fragment>,
);
```

## ❗ 자바스크립트 표현식 넣기

JSX 문법에서 중괄호`{}`를 활용하면 자바스크립트 표현식을 넣을 수 있습니다.

```jsx
const product = "MacBook";
const model = "Air";
const imageUrl = "https:// ... 이미지주소";

function handleClick(event) {
  alert("곧 도착합니다!");
}

ReactDOM.render(
  <>
    <h1>{product + " " + model} 주문하기</h1>
    <img src={imageUrl} alt="제품 사진" />
    <button onClick={handleClick}>확인</button>
  </>,
);
```

### ⚠️ JSX 문법에서 중괄호는 자바스크립트 표현식만 사용 가능합니다. for나 if문 같은 문장은 다룰 수 없습니다.

---

# ✅ 컴포넌트

리액트 컴포넌트는 리액트 엘리먼트를 조금 더 자유롭게 다루기 위한 하나의 문법입니다. 컴포넌트를 만드는 가장 간단한 방법은 함수를 이용하는 겁니다. 요소를 컴포넌트로 작성하게 되면 다양한 장점들이 있습니다.

```jsx
function Hello() {
  return <h1>안녕 리액트</h1>;
}

const element = (
  <>
    <Hello />
    <Hello />
    <Hello />
  </>
);

root.render(element);
```

위 예시처럼 컴포넌트를 작성하면 JSX 문법에서 마치 하나의 태그처럼 사용할 수 있습니다.

이러한 특성을 모듈 문법을 활용하면 보다 더 독립적으로 컴포넌트 특성에 집중해 코드를 작성할 수 있습니다.

```jsx
import diceBlue01 from "./assets/dice-blue-1.svg";
function Dice() {
  return <img src={diceBlue01} alt="주사위" />;
}
export default Dice;
```

```jsx
import Dice from "./Dice";
function App() {
  return (
    <div>
      <Dice />
    </div>
  );
}
export default App;
```

## ⚠️ 리액트 컴포넌트의 이름은 반드시 첫글자를 대문자로 작성해야 합니다.

컴포넌트의 첫글자가 소문자이면 오류가 발생하니깐 주의해주세요!

---

# ✅ Props

JSX 문법에서 컴포넌트 작성시 해당 컴포넌트에도 속성을 지정할 수 있습니다. 해당 속성은 Props라는 이름을 가지게 되는데요.

Props는 Properties의 약자입니다. 컴포넌트에 속성을 지정해주면 각 속성이 하나의 객체로 모여서 컴포넌트를 정의한 함수의 첫번째 파라미터로 객체가 되어 날아갑니다.

## ⚠️ props값은 하나의 객체로 모여서 갑니다!

# ✅ Children

JSX 문법으로 컴포넌트를 작성할 때 컴포넌트를 단일 태그가 아니라 여는 태그와 닫는 태그의 형태로 작성하면, 그 안에 작성된 코드가 바로 이 Children 값에 담기게 됩니다.

```jsx
function Button({ children }) {
  return <button>{children}</button>;
}
export default Button;
```

```jsx
import Button from "./Button";
import Dice from "./Dice";

function App() {
  return (
    <div>
      <div>
        <Button>던지기</Button>
        <Button>처음부터</Button>
      </div>
      <Dice color="red" num={2} />
    </div>
  );
}
export default App;
```

JSX 문법으로 컴포넌트를 작성할 때 어떤 정보를 전달할 땐 props 의 속성값을 주로 활용하고, 화면에 보여질 모습을 조금 더 직관적인 코드로 작성하고자 할 때 children 값을 활용할 수 있습니다.

children을 활용하면 단순히 텍스트만 작성하는걸 넘어서 컴포넌트 안에 컴포넌트를 작성할 수도 있습니다. 활용방법은 다양하니 다양하게 생각해보는 것도 좋습니다.

---

# ✅ State

state는 리액트에서 일종의 상태를 뜻합니다. useState 라는 내장 함수를 이용해 사용하는데요. 리액트에서 이 state가 변동이 있음을 인식할때마다 화면을 그려주는 렌더링이 실행됩니다. 참고로 이 상태가 변동됬다고 인식하는 기준은 참조값의 주소가 바뀌는 것입니다.

```jsx
import { useState } from "react";
// ...
const [num, setNum] = useState(1); // useState 함수의 아규먼트는 초기값 입니다.
// ...
```

1️⃣ useState 함수는 초기값을 아규먼트로 받습니다.

2️⃣ useState 함수는 실행결과로 2개의 요소를 가진 배열을 반환합니다.

3️⃣ 보통은 Destructuring 문법으로 useState을 작성합니다.

4️⃣ 반환된 배열의 첫번째 요소는 state 입니다

5️⃣ 반환된 배열의 두번째 요소는 state를 바꾸는 setter함수 입니다.

6️⃣ setter함수는 보통 state앞에 set을 붙인 카멜케이스로 작성합니다.

# ✅ 참조형 state

리액트에서 참조형 값(배열 or 객체 …)의 state는 가리키는 주소값이 바뀌어야 state가 그 변화를 인지합니다. push와 같은 메소드를 이용해 참조값의 데이터만 추가하는 식의 동작으론 state가 변화를 인지하지 못해 렌더링을 실행하지 않습니다.

```jsx
const [gameHistory, setGameHistory] = useState([]);

const handleRollClick = () => {
  const nextNum = random(6);
  gameHistory.push(nextNum);
  setGameHistory(gameHistory); // state가 제대로 인식되지 않는다.
};
```

그래서 참조형 state를 활용할 때는 반드시 참조값이 가리키는 주소값이 변하는 동작을 통해야 합니다.

대표적인게 spread 구문을 이용하는 방식인데요.

```jsx
const [gameHistory, setGameHistory] = useState([]);

const handleRollClick = () => {
  const nextNum = random(6);
  setGameHistory([...gameHistory, nextNum]); // 펼칠 참조형 값과 추가할 값을 순서대로 입력합니다.
};
```

---

# ✅ Virtual DOM

![virtual_dom.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/d14ae293-80d7-439d-893d-d6915e995674/85653cbb-146e-4233-a973-65eb1a1646b4/virtual_dom.png)

리액트에서는 state 변경같은 값의 변화가 일어나게 되면 렌더링이 일어나게 됩니다. 이때 virtual DOM 이라는 임시 DOM에 반영된 변경 사항과 변경 되기 전에 실제 DOM을 비교하는 Diffing 알고리즘을 통해 비교에서 변화된 부분을 실제 DOM에 반영합니다. 위와 같은 과정을 Reconciliation (재조정) 이라고 표현합니다.

이는 리액트에서 성능의 이점을 위해 자동적으로 렌더링 이전 거치는 작업입니다.

---

# ✅ 관련 명령어

## **프로젝트 생성하기**

```
npm init react-app .
```

터미널에서 원하는 디렉토리에 들어가서 `npm init react-app .`를 입력하면 현재 디렉토리에 리액트 프로젝트를 생성합니다.

## **개발 모드 실행하기**

```
npm start (npm run start)
```

터미널에서 `npm run start`를 입력하면 개발 모드 서버가 실행됩니다.

## **실행 중인 서버 종료하기**

```
ctrl + c
```

서버가 실행 중인 터미널에서 `ctrl + c`를 입력하면 서버가 종료됩니다.

## **개발된 프로젝트 빌드하기**

```
npm run build
```

터미널에서 `npm run build`를 입력하면 빌드를 시작합니다.

## **빌드한 것 로컬에서 실행하기**

```
npx serve build
```

터미널에서 `npx serve build`를 입력하면 serve 프로그램을 다운 받고 build 폴더에서 서버가 실행됩니다.

---

# ✅ Ref

리액트에서 Ref는 특정 DOM에 직접 접근하거나, 컴포넌트 내부에서 관리하고 있는 값 중에서 렌더링과 관련없는 값을 관리할 때 사용합니다. `createRef`나 `useRef`를 이용하여 생성하고, 생성된 ref 객체를 JSX 내부에서 원하는 곳에 설정합니다.

```jsx
import { useRef } from "react";
//...
const myRef = useRef();
//...
<div ref={myRef}>접근하고 싶은 DOM</div>;
```

## 🔵 Ref객체에서 DOM 노드 참조하기

```jsx
const node = ref.current;
if (node) {
  // node를 사용하는 코드
}
```

Ref 객체의 `current` 라는 프로퍼티를 사용하면 DOM 노드를 참조할 수 있었습니다.

`current` 값은 없을 수도 있으니까 반드시 값이 존재하는지 검사하고 사용해야 합니다.

## 🔵 예시 : 이미지 크기 구하기

다음 코드는 `img` 노드의 크기를 `ref` 를 사용해서 출력하는 예시입니다.

`img` 노드에는 너비 값인 `width` 와 높이 값인 `height` 라는 속성이 있는데요.

Ref 객체의 `current` 로 DOM 노드를 참조해서 두 속성 값을 가져왔습니다.

```jsx
function Image({ src }) {
  const imgRef = useRef();

  const handleSizeClick = () => {
    const imgNode = imgRef.current;
    if (!imgNode) return; // current 프로퍼티가 있는지 항상 확인해야 한다.

    const { width, height } = imgNode;
    console.log(`${width} x ${height}`);
  };

  return (
    <div>
      <img src={src} ref={imgRef} alt="크기를 구할 이미지" />
      <button onClick={handleSizeClick}>크기 구하기</button>
    </div>
  );
}
```

## 🔵 Ref 객체의 동작 도식화

```sql

               +---------------------------+
               |       React Component      |
               +---------------------------+
               |                           |
               |           +-------+       |
               |    +---->|  ref  |-------+
               |    |      +-------+       |
               |    |           |
               |    |      +-------+
               |    +---->|current|------------------+
               |           +-------+                  |
               |              |                       |
               |         +-------+                   v
               |         |  DOM  |     +---------------------------+
               |         +-------+     |   Real DOM Element         |
               |                        |   (실제 DOM 요소)           |
               |                        |                           |
               |                        +---------------------------+
               +---------------------------------------------------+
```

React 컴포넌트에서 Ref 객체의 current를 통해 실제 DOM 요소에 접근하는 과정을 도식화한 그림입니다.

---

# ✅ URL.createObjectURL

`URL.createObjectURL` 메소드는 입력된 Blob 객체를 URL로 표현합니다. 이 URL은 브라우저에서 메모리에 저장되며, 파일을 다운로드하거나 미디어 요소에서 사용할 수 있습니다.

```jsx
const objectURL = URL.createObjectURL(blob);
```

이렇게 생성된 URL은 `URL.revokeObjectURL` 메소드를 사용하여 해제할 수 있습니다. 이 메소드를 호출하면 해당 URL은 더이상 Blob 객체를 표현하지 않습니다.

```jsx
URL.revokeObjectURL(objectURL);
```

# ✅ 사이드 이펙트

사이드 이펙트(side effect)는 함수가 외부의 상태를 변경하거나, 외부 함수를 호출하는 것 등과 같이 함수의 순수성(purity)를 해치는 연산을 말합니다. 리액트에서는 이러한 사이드 이펙트를 처리하기 위해 `useEffect`라는 Hook을 제공합니다. 이를 이용하여 컴포넌트가 렌더링될 때, 업데이트될 때, 사라질 때를 대상으로 원하는 작업을 수행할 수 있습니다. 이러한 사이드 이펙트의 예로는 데이터의 동기화, 이벤트 리스너 등록, 타이머 설정 등이 있습니다.

# ✅ useEffect

`useEffect`는 리액트 컴포넌트에서 side effect를 수행할 수 있게 해주는 Hook입니다.

이 Hook은 두 가지 주요 목적을 가지고 있습니다.

1️⃣ 컴포넌트가 렌더링된 후에 어떤 일을 수행해야 하는지 지정합니다.

2️⃣ 어떤 값이 변경될 때마다 side effect를 수행해야 하는지 지정합니다.

기본적으로 `useEffect`에 전달된 함수는 매 렌더링 후에 수행됩니다. 하지만 두 번째 인자로 배열을 전달하여 그 배열 안에 있는 값들이 변화할 때만 side effect를 실행하도록 할 수도 있습니다.

다음은 `useEffect`의 기본 사용 예시입니다:

```jsx
useEffect(() => {
  // 렌더링이 완료된 후에 실행됩니다.
  console.log("Component has been rendered");
});
```

다음은 `useEffect`를 사용하여 특정 값이 변경될 때만 side effect를 수행하는 예시입니다:

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  // count 값이 변화할 때만 이 side effect가 수행됩니다.
  document.title = `You clicked ${count} times`;
}, [count]); // count가 변화할 때만 side effect를 수행합니다.
```

`useEffect` 내부에서 반환하는 함수는

새로운 콜백 함수가 호출되기 전에 실행되거나 (앞에서 실행한 콜백의 사이드 이펙트를 정리)

컴포넌트가 화면에서 사라지기 전에 실행됩니다 (맨 마지막으로 실행한 콜백의 사이드 이펙트를 정리).

이를 cleanup 함수라고 부릅니다. 이 함수는 side effect를 통해 설정된 것들을 정리하는데 사용됩니다.

```jsx
useEffect(() => {
  const intervalId = setInterval(() => {
    // 매 초마다 count 값을 증가시킵니다.
    setCount((count) => count + 1);
  }, 1000);

  // cleanup 함수입니다.
  return () => {
    // 컴포넌트가 unmount되거나 count 값이 변경될 때 이 setInterval을 정리합니다.
    clearInterval(intervalId);
  };
}, []); // 빈 배열을 전달하면 컴포넌트가 mount될 때만 side effect가 수행되고, unmount될 때 cleanup 함수가 실행됩니다.
```

<aside>
👉 `useEffect` 는 리액트 안과 밖의 데이터를 일치시키는 동기화 작업에 활용하면 좋습니다.

</aside>
