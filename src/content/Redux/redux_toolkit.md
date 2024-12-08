---
layout: ../../layouts/PostLayout.astro
title: 리덕스 툴킷 사용법 요약
tags: []
category: Redux
pubDate: 2024-06-11
---

## 🔵 리덕스 툴킷 폴더 구조

```jsx
- 📂store
	- 📂context
		- 📂Provider
		- 📄LanguageContext.ts
		- 📄ThemeContext.ts
		// ...

	- 📂reducers
		- 📄cardReducer.ts
		- 📄columnReducer.ts
		// ...

	📄store.ts
```

프로젝트에서 사용하기 위한 리덕스 폴더 구조는 위와 같이 작성하였습니다. 간단하게 각 폴더와 파일들의 목적과 용도를 설명해보겠습니다.

### 📂reducers

리듀서들을 모아놓는 곳입니다. 앞으로 정의할 리듀서들을 모을 폴더입니다.

### cardReducer.ts

```tsx
/* eslint-disable no-param-reassign */
import { getColumnList } from "@/service/columns";
import { ColumnList } from "@/types/dashboard";
import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  columnList: ColumnList;
  columnListStatus: string;
}

const initialState: initialStateType = {
  columnList: {
    result: "",
    data: [],
  },
  columnListStatus: "",
};

const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    addColumnItem: (state, action) => {
      state.columnList.data = state.columnList.data.map((column) =>
        column.id === action.payload.newColumnName.columnId
          ? { ...column, title: action.payload.newColumnName.title }
          : column,
      );
    },
    deleteColumnItem: (state, action) => {
      state.columnList.data = state.columnList.data.filter(
        (prevColumn) => prevColumn.id !== action.payload.columnId,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getColumnList.pending, (state) => {
        state.columnListStatus = "pending";
      })
      .addCase(getColumnList.fulfilled, (state, action) => {
        state.columnListStatus = "fulfilled";
        state.columnList = action.payload;
      })
      .addCase(getColumnList.rejected, (state) => {
        state.columnListStatus = "rejected";
      });
  },
});

export const { addColumnItem, deleteColumnItem } = columnSlice.actions;

export default columnSlice.reducer;
```

위 예제 코드에서는 `createSlice` 라는 리덕스 툴킷에 내장된 함수로 리듀서를 정의하고 있습니다. 리듀서에는 크게 3가지가 정의됩니다.

### 1️⃣ name

리듀서를 스토어에서 관리할때 쓰는 이름입니다.

### 2️⃣ initialState

리덕스에서 관리할 데이터의 초기값이라 생각하시면 됩니다. 위의 예제에선 `result` 와 `data` 가 들어있는 `columnList` 객체와 api요청이 `pending` 인지 `fulfilled` 인지 등의 상태에 따른 문자열을 보관할 `columnStatus` 를 정의하였습니다.

> 참고로 리덕스에서 관리하는 state는 리액트의 useState와 동일하게 동작합니다. 예를들어 `useSelector`로 `Card` 컴포넌트에서 `cardId` 라는 값을 꺼내쓰고 있는 상황에서, `Header` 라는 컴포넌트에서 `cardId` 라는 값을 바꾸는 코드가 실행됬다면, `Card` 컴포넌트는 리렌더링이 됩니다. 프롭스와 같은 매개체로 두 컴포넌트가 연결 되어 있지 않아도 리덕스에서 관리중인 state가 바뀌면 그 값을 꺼내 쓰는 컴포넌트는 전부 리렌더링이 됩니다. 리덕스 자체적으로 최적화가 되어 있어 리렌더링 자체에 크게 신경쓸 필요는 없지만 불필요한 반복 리퀘스트가 생기지 않게 주의해 줍시다.

### 3️⃣ reducers

메서드의 일종이라고 생각하시면 됩니다. 여기서 각 리듀서의 파라미터로 `state`와 `action`을 받는데 state는 바로 위에서 정의한 state들의 상태가 들어있습니다. `action` 에는 해당 메서드를 호출할때 파라미터로 넣어준 데이터가 들어가 있습니다. 만약,

```tsx
dispatch(addColumnItem({ columnId, newColumnName })
```

위와 같은 식으로 리듀서를 호출했다면 파라미터로 넣어준 `columnId` 와 `newColumnName` 객체는 `action.payload.columnId` 와 같은 식으로 `action.payload` 라는 곳에 들어가게 됩니다.

```tsx
    //                      여기   에 .payload 밑으로 들어가 있습니다.
    addColumnItem: (state, action) => {
      state.columnList.data = state.columnList.data.map((column) =>
        column.id === action.payload.newColumnName.columnId
          ? { ...column, title: action.payload.newColumnName.title }
          : column,
      )
    },
```

그 뒤 리듀서에 정의해놓은 대로 데이터를 처리하고 리덕스에 관리중인 state에 넣어주면 됩니다.

<aside>
👉 단, 리덕스에서 데이터를 넣을땐 불변성을 유지해야 하기에 반드시 할당 연산자로 넣어줘야 합니다.

</aside>

리덕스에서 관리중인 데이터의 상태 변화를 크롬 확장 도구인 Redux Devtools에서 제대로 확인하려면 반드시 참조 관계를 유지해야 합니다.

### 4️⃣ ExtraReducers

3️⃣번에서 설명한 reducers가 동기 작업을 처리해준다면 이 녀석은 비동기 작업을 처리해줍니다.

리덕스 툴킷의 장점은 초기 셋팅이 생략되어 있다는 점 뿐 아니라 리덕스 썽크와 같은 비동기 처리 같은 유틸리티도 내장되어 있다는 겁니다.

개념 설명은 잘 모르기도 하거니와 일단은, 링크로 생략합니다.

[Redux Toolkit - extraReducers 활용하기 (with. createAsyncThunk)](https://velog.io/@jojeon4515/Redux-Toolkit-extraReducers-활용하기with.-createAsyncThunk)

extraReducers를 정의하기 이전에 먼저 `createAsyncThunk` 를 통해 api 요청을 보내는 코드를 작성해줍니다. 저희 프로젝트의 `service` 폴더에서 작성해 줬습니다.

```tsx
export const getCardList = createAsyncThunk<
  any,
  { cursorId: number; columnId: number }
>("card/getCardList", async ({ cursorId, columnId }) => {
  const cursorIdParam = cursorId ? `$cursorId=${cursorId}` : "";
  const response = await axios.get(
    `/cards?size=6&columnId=${columnId}${cursorIdParam}`,
  );
  return response.data;
});
```

그리고 다시 extraReducers 로 돌아와서 방금 작성한 `getCardList`의 `pending` ,`fulfilled`, `rejected` 에 따른 로직을 리덕스에서 권유하는 빌더 콜백 방식으로 작성해줍니다.

```tsx
extraReducers: (builder) => {
    builder
      .addCase(getColumnList.pending, (state) => {
        state.columnListStatus = 'pending'
      })
      .addCase(getColumnList.fulfilled, (state, action) => {
        state.columnListStatus = 'fulfilled'
        state.columnList = action.payload
      })
      .addCase(getColumnList.rejected, (state) => {
        state.columnListStatus = 'rejected'
      })
  },
```

주의할점은 체이닝 메서드 방식으로 적절하게 작성해줘야 합니다. fetch의 `then`문법과 유사하다고 생각됩니다.

데이터 처리 로직 작성이 끝났다면 적절하게 익스포트 해줍시다.

```tsx
export const { addColumnItem, deleteColumnItem } = columnSlice.actions;

export default columnSlice.reducer;
```

이제 `store.ts`에서 모조리 합쳐주면 됩니다.

### 📄store.ts

```tsx
import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./reducers/toastReducer";
import modalReducer from "./reducers/modalReducer";
import myToastReducer from "./reducers/myToastReducer";
import columnReducer from "./reducers/columnReducer";
import cardReducer from "./reducers/cardReducer";

const store = configureStore({
  reducer: {
    toast: toastReducer,
    modal: modalReducer,
    myToast: myToastReducer,
    column: columnReducer,
    card: cardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
```

리덕스의 모든 리듀서들을 한곳으로 모아놓는 곳입니다. 작성한 리듀서들은 이곳을 거쳐야 다른 곳에서 호출이 가능해집니다. 예제처럼 `configureStore` 라는 함수에 `reducer` 가 담긴 객체를 넣어주면 됩니다. 그리고 요걸 또 export 한뒤 최상위 컴포넌트 에서 `<Provider store={store}> ...` 처럼 감싸주면 초기 셋팅 끝.

이제 사용법을 알아봅시다!

## ⚠️ 그전에, 타입스크립트라면..

원래라면 코드를 불러올때 `useSelector`와 `useDispatch`를 사용하면 됩니다. 하지만 타입스크립트에선 불러오는 state에 RootState와 같은 타입핑을 일일이 해줘야 합니다. 이러한 수고를 덜기 위해 커스텀 훅을 사용해 봅시다.

```tsx
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

공식문서에서 그대로 카피한겁니다. 요걸 불러와서 리덕스를 쓰면 타입핑에서 해방 될것 같습니다.

## 사용 예제

```tsx
const dispatch = useAppDispatch()
const cursorId = useAppSelector((state) => state.card.cursorId[columnId])

// ...

await dispatch(getCardList({ cursorId: Number(cursorId), columnId })
```

잘 꺼내 쓰시면 됩니다.

# 요약

1️⃣ 리덕스에서 관리하는 state가 바뀌면 해당 state를 꺼내 쓰는 컴포넌트는 리렌더링 됩니다.

2️⃣ `reducers`는 동기 로직, `extraReducers`는 비동기 로직을 처리 해주는 리듀서입니다. (`extraReducers` 를 사용할땐 `createAsyncThunk` 를 이용해 api요청 구문을 작성해줍시다. 그래야 `pending`, `fulfilled`, `rejected`에 따른 처리가 가능해집니다.)

3️⃣ 타입스크립트에선 커스텀 훅을 통해 타입핑을 생략합시다.

4️⃣ `dispatch`로 호출한 리듀서에 넣어준 인자는 `action.payload` 밑에 들어갑니다.
