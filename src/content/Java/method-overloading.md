---
layout: ../../layouts/PostLayout.astro
title: 메서드 오버로딩
category: Java
tags: [Java, Overloading]
pubDate: 2024-11-28
---

# 메서드 오버로딩

다음과 같은 메서드를 만들고 싶습니다.

- 두 수를 더하는 메서드
- 세 수를 더하는 메서드

이 경우 둘다 더하는 메서드 이기에 가급적 같은 이름인 `add` 를 사용하고 싶습니다.
자바는 메서드의 이름 뿐만 아니라 매개변수 정보를 함께 사용해서 메서드를 구분합니다. 따라서 다음과 같이 이름이 같고, 매개변수가 다른 메서드를 정의할 수 있습니다.

```java

add(int a, int b)
add(int a, int b, int c)
add(double a, double b)
```

이렇게 이름이 같고 매개변수가 다른 메서드를 여러개 정의하는 것을 메서드 오버로딩(Overloading)이라 합니다. 오버로딩은 번역하면 과적인데, 과하게 물건을 담았다는 뜻입니다. 따라서 같은 이름의 메서드를 여러개 정의했다고 이해해 봅시다.

# 규칙

메서드의 이름이 같아도 매개변수의 타입 및 순서가 다르면 오버로딩을 할 수 있습니다. 참고로 반환 타입은 인정하지 않습니다. 다음 케이스는 메서드 이름과 매개변수의 타입이 같으므로 컴파일 오류가 발생합니다.

```java

int add(int a, int b)
double add(int a, int b)
```

# 메서드 시그니처 (method signature)

메서드 시그니처는 자바에서 메서드를 구분할 수 있는 고유한 식별자나 서명을 뜻합니다. 메서드 시그니처는 메서드의 이름과 매개변수 타입(순서 포함)으로 구성되어 있습니다. 쉽게 이야기해서 메서드를 구분할 수 있는 기준입니다. 자바 입장에서는 각각의 메서드를 고유하게 구분할 수 있어야 합니다. 그래야 어떤 메서드를 호출 할 지 결정할 수 있습니다.

따라서 메서드 오버로딩에서 설명한 것 처럼 메서드 이름이 같아도 메서드 시그니처가 다르면 다른 메서드로 간주합니다. 반환 타입은 시그니처에 포함되지 않습니다. 방금 오버로딩이 실패한 두 메서드를 봅시다. 두 메서드는 `add(int a, int b)` 로 메서드 시그니처가 같습니다. 따라서 메서드의 구분이 불가능 하므로 컴파일 오류가 발생합니다.

다양한 예제를 통해서 메서드 오버로딩을 알아봅시다.

먼저 매개변수의 갯수가 다른 오버로딩 예제를 봅시다.

```java

package overloading;

public class Overloading1 {

	public static void main(String[] args) {
		System.out.println("1: " + add(1, 2));
		System.out.println("2: " + add(1, 2, 3));
	}

	// 첫 번째 add 메서드: 두 정수를 받아서 합을 반환한다.
	public static int add(int a, int b) {
		System.out.println("1번 호출");
		return a + b;
	}

	// 두 번째 add 메서드: 세 정수를 받아서 합을 반환한다.
	// 첫 번째 메서드와 이름은 같지만, 매개변수 목록이 다르다.
	public static int add(int a, int b, int c) {
		System.out.println("2번 호출");
		return a + b + c;
	}
}
```

```zsh

1번 호출
1: 3
2번 호출
2: 6
```

이번에는 매개변수의 타입이 다른 오버로딩 예제를 봅시다.

```java

package overloading;

public class Overloading2 {

	public static void main(String[] args) {
		myMethod(1, 1.2);
		myMothod(1.2, 2);
	}

	public static void myMethod(int a, double b) {
		System.out.println("int a, double b");
	}

	public static void myMethod(double a, int b) {
		System.out.println("double a, int b");
	}
}
```

```console

int a, double b
double a, int b
```

마지막으로 매개변수의 타입이 다른 경우를 추가로 확인해봅시다.

```java

package overloading;

public class Overloading3 {

	public static void main(String[] args) {
		System.out.println("1: " + add(1, 2));
		System.out.println("2: " + add(1.2, 1.5));
	}

	// 첫 번째 add 메서드: 두 정수를 받아서 합을 반환한다.
	public static int add(int a, int b) {
		System.out.println("1번 호출");
		return a + b;
	}

	// 두 번째 add 메서드: 두 실수를 받아서 합을 반환한다.	// 첫 번째 메서드와 이름은 같지만, 매개변수의 유형이 다르다.
	public static double add(double a, double b) {
		System.out.println("2번 호출");
		return a + b;
	}
}
```

```console

1번 호출
1: 3
2번 호출
2: 2.7
```

여기서 만약 다음 첫 번째 메서드를 삭제하면 어떤 일이 생길까요?

```java

public static int add(int a, int b) {
	System.out.println("1번 호출");
	return a + b;
}
```

1. 정수 1, 정수 2를 호출했고 자동 형변환이 발생해서 `add(double a, double b)` 가 호출됩니다.
2. 실수 1.2, 실수 1.5를 호출했고 `add(double a, double b)` 가 호출됩니다.

```console

2번 호출
1: 3.0
2번 호출
2: 2.7
```

정리하면 먼저 본인의 타입에 최대한 맞는 메서드를 찾아서 실행하고, 그래도 없으면 형 변환 가능한 타입의 메서드를 찾아서 실행합니다.
