---
layout: ../../layouts/PostLayout.astro
title: Dom Selector
pubDate: 2024-02-26
tags: ["JavaScript", "DOM", "Selector"]
category: JavaScript
---

# getElementById

```jsx
document.getElementById("title");
```

document객체의 메소드로 문서안에 있는 id태그를 선택하는 메소드 입니다. 또한 존재하지 않는 태그를 선택하면 그 값은 null이 됩니다.

# getElementsByClassName

```jsx
document.getElementsByClassName("title");
```

다수의 클래스 태그를 동시에 선택할 수 있는 메소드 입니다. 만약 여러개의 `title` 이라는 태그를 선택하고 `console.log` 로 출력했다고 가정하면 HTMLCollection(선택한 태그의 개수) 라는 _유사 배열_ 형태를 출력합니다. 이는 배열의 메소드를 사용할 순 없지만 인덱스로 접근이 가능하며

`length` 프로퍼티를 활용할 수도 있고 `for of` 문을 사용 하는 것도 가능합니다. 또한 접근 순서는 태그의 깊이와 상관없이 위에서부터 차례대로 입니다.

> 클래스가 하나만 있는 태그를 선택하면 해당 태그가 들어있는 HTMLCollection이 출력됩니다.

존재하지 않는 태그를 선택하면 null을 출력한 getElementById 와는 다르게 빈 HTMLCollection이 출력됩니다.

# getElementsByTagName

```jsx
document.getElementsByTagName("태그이름");
```

다수의 태그를 선택한다는 점에서 위에 `getElementsByClassName` 과 동일합니다. HTMLCollection을 반환한다는 점도 동일하구요.

# querySelector

```jsx
document.querySelector("title");
```

# querySelectorAll

```jsx
document.querySelectorAll("title");
```

NodeList라는 유사 배열을 반환합니다.

| 메소드                                   | 의미                             | 결과                                                |
| ---------------------------------------- | -------------------------------- | --------------------------------------------------- |
| document.getElementById('id')            | HTML id속성으로 태그 선택하기    | id에 해당하는 태그 하나                             |
| document.getElementsByClassName('class') | HTML class속성으로 태그 선택하기 | class에 해당하는 태그 모음(HTMLCollection)          |
| document.getElementsByTagName('tag')     | HTML 태그 이름으로 태그 선택하기 | tag에 해당하는 태그 모음(HTMLCollection)            |
| document.querySelector('css')            | css 선택자로 태그 선택하기       | css 선택자에 해당하는 태그 중 가장 첫번째 태그 하나 |
| document.querySelectorAll('css')         | css 선택자로 태그 선택하기       | css 선택자에 해당하는 태그 모음(NodeList)           |

## _Event, Event Handling, Event Handler_

- _Event : 웹 페이지에서 발생하는 대부분의 사건들_
- _Event Handling : 자바스크립트를 통해 이벤트를 다루는 일_
- _Event Handler : 이벤트가 발생했을 때 일어나야 하는 구체적인 동작들을 표현한 코드 = Event Listener_
