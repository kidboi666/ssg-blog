---
layout: ../../layouts/PostLayout.astro
title: 타입스크립트 요약
tags: []
category: TypeScript
pubDate: 2024-04-29
---

# 기본형

| 종류      | 타입      |
| --------- | --------- |
| 문자열    | string    |
| 숫자형    | number    |
| 불린형    | boolean   |
| undefined | undefined |
| null      | null      |

# 배열과 튜플

배열 타입을 만들려면 타입을 적고 `[]` 를 붙입니다. 만약에 배열의 배열을 만들고 싶다면 배열 타입 뒤에 `[]` 를 붙이면 됩니다. 튜플은 개수랑 순서가 정해져 있는 배열입니다. `[]` 안에 순서대로 타입을 쉼표로 구분해서 씁니다.

```tsx
// 배열
const cart: string[] = [];
cart.push("c001");
cart.push("c002");

// 배열의 배열
const carts: string[][] = [["c001", "c002"], ["c003"]];

// 튜플
let mySize: [number, number, string] = [175, 30, "L"];
```

# 객체 타입

`{}` 안에다가 프로퍼티 이름을 쓰고 콜론 다음에 타입을 씁니다. 각 프로퍼티는 세미콜론으로 구분합니다. 필수가 아닌 프로퍼티는 프로퍼티 이름 뒤에 물음표를 붙입니다.

```tsx
let product: {
  id: string;
  name: string;
  price: number;
  membersOnly?: boolean; // 필수가 아닌 프로퍼티
  sizes: string[];
} = {
  id: "c001",
  name: "코드잇 블랙 후디",
  price: 129000,
  sizes: ["M", "L", "XL"],
};

if (product.membersOnly) {
  console.log("회원 전용 상품");
} else {
  console.log("일반 상품");
}
```

프로퍼티의 개수를 정하지 않고, 프로퍼티 값의 타입을 정하고 싶다면 아래와 같은 문법을 활용해 보세요.

```tsx
let stock: { [id: string]: number } = {
  c001: 3,
  c002: 0,
  c003: 2,
};
```

# `any` 타입

자바스크립트를 사용할 때와 마찬가지로 자유롭게 쓸 수 있는 타입입니다. 되도록이면 `any` 타입으로 지정하지 않는 것을 권장합니다. 어쩔 수 없이 `any` 타입을 사용하는 경우 `as` 키워드를 써서 타입을 지정하거나, 콜론으로 타입을 지정할 수 있습니다.

```tsx
const parsedProduct = JSON.parse(
  '{ "name": "코드잇 토트백", "price": 12000 }',
) as { name: string; price: number };
```

```tsx
const parsedProduct: { name: string; price: number } = JSON.parse(
  '{ "name": "코드잇 토트백", "price": 12000 }',
);
```

# 함수 타입

리턴 타입을 지정하는 경우에는 다음 코드처럼 작성하면 됩니다.

```tsx
function addToCart(id: string, quantity: number): boolean {
  if (condition) {
    return false;
  }
  return true;
}
```

리턴 타입을 미리 주지 않고 리턴 값으로부터 추론하게 할 수 도 있습니다.

함수를 값으로 사용하는 경우 화살표 함수처럼 작성합니다.

```tsx
(id: string, quantity: number) => boolean;
```

Rest 파라미터는 배열타입으로 씁니다. 값을 리턴하지 않는 경우 리턴 타입을 `void` 로 할 수 있습니다.

```tsx
(...ids: string[]) => void;
```

# `Enum` 문법 정리

중괄호 안에서 각 항목을 쉼표로 구분해서 적어주면 됩니다. 이때 기본값은 0부터 시작하는 정수라는 점에 주의 하세요. 숫자 0은 실수하기 쉽기 때문에 Enum을 사용할 땐 되도록이면 값을 정해놓고 쓰는 게 좋습니다. 이퀄이랑 쉼표를 쓰면 값을 정할 수 있습니다.

```tsx
enum Size {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
}
```

# `Interface` 문법 정리

interface를 사용하는 방법은 `interface` 를 쓴 다음, 객체 타입처럼 만들면 됩니다.

```tsx
enum Size {
  S = "S",
  M = "M",
  L = "L",
  XL = "XL",
}

interface Product {
  id: string;
  name: string;
  price: number;
  membersOnly?: boolean;
}
```

interface를 상속하고 싶으면 Interface 이름 뒤에 `extends` 를 적은 다음 부모 Interface 이름을 적어주면 됩니다.

```tsx
interface ClothingProduct extends Product {
  sizes: Size[];
}

const product1: ClothingProduct = {
  id: "c001",
  name: "코드잇 블랙 후드 집업",
  price: 129000,
  membersOnly: true,
  sizes: [Size.M, Size.L],
};

const product2: Product = {
  id: "d001",
  name: "코드잇 텀블러",
  price: 25000,
};
```

# 제네릭

## querySelector() 함수

기본적으로 어떤 DOM 노드가 리턴될지 모르기 때문에 `HTMLElement` 라는 일반적인 타입으로 정의됩니다. 하지만 타입을 확신할 수 있는 경우에는 아래 코드처럼 직접 제네릭 타입을 정의해 주면 됩니다.

```tsx
const elem = document.querySelector<HTMLInputElement>("input.username");
```

## Map

키와 밸류를 갖는 자료구조입니다. 타입 파라미터로 키와 밸류의 타입을 정의하고 사용할 수 있습니다.

```tsx
const productMap = new Map<string, Product>();
productMap.set(product1.id, product1);
productMap.set(product2.id, product2);
```

## Set

배열과 비슷하지만 중복된 요소를 추가할 수 없는, 수학에서 집합에 해당하는 자료구조입니다. 타입 파라미터로 요소의 타입을 정의하고 사용할 수 있습니다.

```tsx
const productSet = new Set<Product>();
productSet.add(product1);
productSet.add(product2);
```

---

## 키와 밸류 정하기: `Record`

객체에 키와 밸류 타입을 정해놓고 싶을 때 사용합니다. `Map` 과 비슷하지만 차이점은 순수한 객체에 타입만 추구한다는 점입니다.

```tsx
const productMap: Record<string, Product> = {};
productMap["c001"] = product1;
productMap["c002"] = product2;
```

## 객체 프로퍼티 고르기: `Pick`

```tsx
interface Product {
  id: string;
  name: string;
  price: number;
  membersOnly?: boolean;
}

type ProductInfo = Pick<Product, "name" | "price">;
```

`Pick` 으로 만든 타입은 아래와 같습니다. `name` 프로퍼티와 `price` 프로퍼티만 골라서 타입을 만들었습니다.

```tsx
type ProductInfo = {
  name: string;
  price: number;
};
```

## 객체의 프로퍼티 생략하기: `Omit`

```tsx
interface Product {
  id: string;
  name: string;
  price: number;
  membersOnly?: boolean;
}

type ProductInfo = Omit<Product, "id" | "membersOnly">;
```

`Omit` 으로 만든 타입은 아래와 같습니다. `id` 와 `membersOnly` 를 제외하고 타입을 만들었습니다.

## Union 제거하기: `Exclude`

Union을 사용해서 `PromotionCoupon` 또는 `EmployeeCoupon` 또는 `WelcomCoupon` 또는 `RewardCoupon`인 타입을 `Coupon`이라고 했습니다. 여기서 `EmployCoupon`에 해당하는 것만 제거를 하고 싶을 때 `Exclude`를 사용할 수 있습니다.

```tsx
type Coupon = PromotionCoupon | EmployeeCoupon | WelcomCoupon | RewardCoupon;

type InternalCoupon = EmployeeCoupon;
type PublicCoupon = Exclude<Coupon, InternalCoupon>;
// type PublicCoupon = PromotionCoupon | WelcomCoupon | RewardCoupon
```

## 함수 파라미터 타입 가져오기: `Parameters`

함수 파라미터들의 타입을 함수의 타입을 통해 정의할 수 있습니다. 만약 함수의 타입이 아니라, 선언된 함수라면 `typeof` 연산자로 함수의 타입으로 만들어서 사용하면 됩니다.

```tsx
function addToCart(id: string, quantity: number = 1): boolean {
  // ...
  return true;
}

type AddToCartParameters = Parameters<typeof addToCart>;
// type AddToCartParameters = [id: string, quanity: number | undefined]
```

## 함수 리턴 타입 가져오기: `ReturnType`

`Parameters` 와 마찬가지로 함수의 리턴 타입을 가져옵니다.

```tsx
function addTocart(id: string, quantity: number = 1): boolean {
  // ...
  return true;
}

type AddToCartResult = ReturnType<typeof addToCart>;
// type AddToCartResult = boolean
```
