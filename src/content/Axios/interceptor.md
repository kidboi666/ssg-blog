---
layout: ../../layouts/PostLayout.astro
title: "인터셉터 활용법"
pubDate: 2024-05-18
category: "Axios"
tags: []
---

# 🔴 반복된 코드가 존재한다.

```jsx
// api.ts

export const userInfoAccess = createAsyncThunk<any, string | null>("user/userInfo", async (token) => {
    const { data } = await axios({
      method: "get",
      url: `https://example.com/api/users`,
      headers: { **Authorization: `Bearer ${token}`** },
    });

    return camelcaseKeys(data.data, { deep: true });
  },
);
```

위 코드는 제 프로젝트에 작성했던 저의 리퀘스트 코드입니다. 리덕스로 외부 api와의 데이터 요청 상태를 관리중이었기에 리덕스 관련 코드가 몇개 끼어 있지만 맥락만 보면 헤더에 토큰을 집어넣고 유저의 정보를 보내달란 요청이란걸 알 수 있습니다.

문제는 해당 방식으로 요청을 보내면 결국 요청 함수를 디스패치 하는 과정에서 토큰을 매번 끄집어와서 넣어야 하는 반복 행동이 필연적으로 발생합니다.

```jsx
// Header.tsx

useEffect(() => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    dispatch(userInfoAccess(localToken));
  }
}, []);
```

# 😇 편안함을 추구하려면

중복되는 동일한 작업은 가능하면 자동화가 필요합니다. 위 예시 또한 자동화를 생각해볼 수 있는 문제입니다. 하지만 자동화를 위한 코드 구조가 선뜻 떠오르지 않습니다. 어떤 자동화 코드를 작성하더라도 결국 어느 부분이든 반복적으로 토큰을 꺼내서 넣어주는 코드가 필요하단건 변함이 없을것 같네요. (물론 토큰을 제외한, 서버에서 필요로 하는 특정 id값과 같은 건 어쩔 수 없이 그때 그때 넣어주는게 맞는 방법이라 생각합니다.)

이때 **인터셉터**라는 개념을 가져와보면 문제 해결에 다가갈 수 있을 것 같습니다.

# 🔵 인터셉터

axios의 공식 홈페이지에선 `then` 또는 `catch` 로 처리되기 전에 요청과 응답을 가로챌수 있다고 나와있습니다.

공식 홈페이지에 나와있는 예제 코드는 이 개념을 보다 추상적으로 표현하고 있는데요.

```jsx
// 요청 인터셉터 추가하기
axios.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);

// 응답 인터셉터 추가하기
axios.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);
```

예제 코드를 보고 알 수 있는 사실은, 리퀘스트와 리스폰스 각각의 경우 모두에 특정 동작을 끼워넣을 수 있으며 이를 보다 실용적으로 생각하면 현재 작업중인 프로젝트의 유저 관련 정보 요청에 꽤 유용하게 사용할 수 있다는 결론이 나옵니다.

해당 개념을 저의 프로젝트에 끼워 맞추기 위해선 axios의 인스턴스를 따로 만들고 해당 인스턴스에 `config`을 활용해야 합니다.

```jsx
// axiosInstance.ts

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https:///example.com/api/",
});
```

일단 axios의 내장 메소드인 `create()` 를 가져와 `baseURL` 을 설정합니다. 이제 해당 구문을 익스포트하면 `axiosInstance` 라는 구문만으로 해당 url을 기반으로 요청을 보낼 수 있게 됩니다. 이제 본격적으로 인터셉터를 끼얹어 봅시다.

```jsx
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
```

해당 코드는 `interceptors.request.use()` 를 통해 앞에 있는 `axiosInstance` 를 이용한 모든 리퀘스트를 서버에 보내기 직전에 가져올 수 있게 됩니다. `config` 이라는 인자를 가진 함수를 통해 동작을 명시하고 해당 인자를 반환하면 되는 것이죠. (곧바로 이어지는 에러 처리 또한 상황에 맞게 작성합니다.) 그러면 해당 동작이 axios의 리퀘스트 안에 포함되어 서버까지 이어지게 됩니다.

인터셉터를 이용하면 AccessToken이 만료시 RefreshToken을 이용해 새로운 AccessToken을 발급하는 동작도 아주 쉽게 구현할 수 있습니다.

```jsx
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const res = await axiosInstance.post(`refresh-token`, {
      refresh_token: refreshToken,
    });
    const { data } = res.data;
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
```

먼저 새 토큰을 발급받는 동작을 따로 빼내어 독립된 함수로 구현합니다. (예제 코드는 로컬 스토리지에 RefreshToken이 존재하고 있다는 가정하에 작성한 코드입니다.) 새 토큰을 발급받는 요청을 통해 새 토큰을 로컬 스토리지에 담아둡니다.

```jsx
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { accessToken } = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
```

그리고 토큰이 만료된 사실을 어떤 요청을 통해 알게될지 모르기에 리스폰스 번호가 401(인증 관련 에러) 일 경우를 공통적인 케이스로 묶은 뒤 조건을 통과했을 시 실행할 `try/catch` 문을 작성합니다.

예제 코드는 `interceptors.response.use()` 를 통해 위 동작을 구현했습니다. 코드의 동작을 순서대로 살펴보면,

1️⃣ `interceptors.response.use()` 를 통해 리스폰스를 쌔벼(인터셉터) 옵니다.

2️⃣ 정상적인 리스폰스라면 그대로 스쳐지나 가게끔 합니다. 위 코드에선 2째 줄 `(res) => res,` 에 해당합니다.

3️⃣ 리스폰스가 비정상(`rejected`)인 경우 `Error` 객체 안에 `config` 프로퍼티를 (문맥상으론 이전 리퀘스트가 하려던 동작을 뜻합니다.) 변수에 따로 담아둡니다. 새 토큰을 받고 나서 바로 다시 리퀘스트를 보내기 위함이죠.

4️⃣ `if` 조건문을 통해 명시적으로 상태 번호가 401(인증 관련 에러로서 요청에 자격이 없다는걸 뜻합니다) 일 경우로 한정합니다. 또 `&&` 를 통해 앞서 `originalRequest`라는 변수에 담아둔 `error.config`에 `_retry`의 불값 여부가 `false`인지도 판단합니다. 여기서 `_retry`라는 건 `error.config`에 존재하지 않는 프로퍼티입니다. 그렇기에 당연히 false가 되겠죠. 이러한 코드가 존재하는 이유는 다음 줄에서 밝혀집니다.

5️⃣ 4번에 해당하는 조건이 통과됬다면 본격적으로 `originalRequest`에 `_retry`라는 프로퍼티를 추가하고 `true`값을 넣어줍니다. 이로써 현재 작성된 코드가 2회 이상 반복 실행 되는, 무한 루프에 빠지게 되는 일을 방지합니다. 두번째 실행땐 4번에 해당하는 `if` 조건문에(`_retry`는 `false`가 아니기에) 걸리게 되어 아래 단락은 실행되지 않게 되겠죠.

6️⃣ 그 다음부턴 단순합니다. 미리 만들어둔 토큰 재발급 함수를 불러와서 `originalRequest`를 가져와 리퀘스트를 다시 보냅니다. 그 뒤 `catch` 문을 재량껏 구현하고 다시 보낸 리퀘스트가 잘 왔다면 그대로 반환하고 아니라면 `rejected`상태와 함께 에러를 내보내면 됩니다.

7️⃣ 잊지말자 익스포트 임포트

```jsx
export default axiosInstance; // 잊지말자 익스포트 임포트
```

---

```jsx
useEffect(() => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    dispatch(userInfoAccess(localToken));
  }
}, []);
```

```jsx
useEffect(() => {
  dispatch(userInfoAccess());
}, []);
```

# 👉 결론

사실 코드의 심미적 변화땜에 필요한 기술은 아니라고 생각합니다. 전처리와 후처리를 한곳에서 처리할 수 있는 편리함이 상당한 강점으로 보이구요. 요청과 응답의 흐름을 의도대로 관리하기 쉬워지기에 학습 효과는 굉장할 거라 감히 예상합니다.
