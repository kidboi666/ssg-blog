---
layout: ../../layouts/PostLayout.astro
title: 참조 타입
category: Java
tags: [Java, Object]
pubDate: 2024-12-05
---

# 데이터 타입 분류

자바의 데이터 타입은 크게 기본 타입과 참조 타입으로 분류됩니다. 참조 타입이란 객체의 번지를 참조하는 타입으로 배열, 열거, 클래스, 인터페이스 타입이 있습니다.

## 객체란 ?

객체는 데이터와 메소드로 구성된 덩어리라고 생각하면 됩니다.

> 객체 = 데이터(필드) + 메소드

기본 타입으로 선언된 변수와 참조 타입으로 선언된 변수의 차이점은 저장되는 값입니다. 기본 타입으로 선언된 변수는 값 자체를 저장하고 있지만, 참조 타입으로 선언된 변수는 객체가 생성된 메모리 번지를 저장합니다.

변수들은 또한 모두 스택이라는 메모리 영역에 생성됩니다. 기본 타입 변수인 age와 price는 직접 값을 저장하고 있지만, 참조 타입 변수인 name과 hobby는 힙 메모리 영역의 String 객체 번지를 저장하고 이 번지를 통해 String 객체를 참조합니다.

## 메소드 영역

메소드 영역은 바이트코드 파일을 읽은 내용이 저장되는 영역으로 클래스별로 상수, 정적 필드, 메소드 코드, 생성자 코드 등이 저장됩니다.

## 힙 영역

힙 영역은 객체가 생성되는 영역입니다. 객체의 번지는 메소드 영역과 스택 영역의 상수와 변수에서 참조할 수 있다.

## 스택 영역

스택 영역은 메소드를 호출할 때마다 생성되는 프레임이 저장되는 영역입니다. 메소드 호출이 끝나면 프레임은 자동 제거 됩니다. 프레임 내부에는 로컬 변수 스택이 있습니다. 여기에서 기본 타입 변수와 참조 타입 변수가 생성되고 제거됩니다.

# 참조 타입 변수의 `==`, `!=` 연산

`==`, `!=` 연산자는 변수의 값이 같은지 아닌지를 조사합니다. 참조 타입 변수의 값은 객체의 번지이므로 참조 타입 변수의 `==`, `!=` 연산자는 번지를 비교하는 것이 됩니다. 번지가 같다면 동일한 객체를 참조하는 것이고, 다르다면 다른 객체를 참조하는 것입니다.

`==`,`!=` 연산자로 객체를 비교하는 코드는 if 문에서 많이 사용합니다.

```java
// ReferenceVariableCompareExample.java

public class ReferenceVariableCompareExample {
  public static void main(String[] args) {
    int[] arr1;
    int[] arr2;
    int[] arr3;

    arr1 = new int[] { 1, 2, 3 }; // 배열 { 1, 2, 3 } 을 생성하고 arr1 변수에 대입
    arr2 = new int[] { 1, 2, 3 }; // 배열 { 1, 2, 3 } 을 생성하고 arr2 변수에 대입
    arr3 = arr2; // 배열 변수 arr2의 값을 배열 변수 arr3에 대입

    System.out.println(arr1 == arr2); // arr1과 arr2 변수가 같은 배열을 참조하는지 검사
    System.out.println(arr2 == arr3); // arr2와 arr3 변수가 같은 배열을 참조하는지 검사
  }
}
```

**실행 결과**

```zsh showLineNumbers=false

false
true
```

9라인에서 생성한 배열과 10라인에서 생성한 배열은 저장 항목은 같지만 서로 다른 배열 객체로 생성되므로 `arr1`과 `arr2` 변수에 대입되는 번지는 다릅니다. 따라서 13라인의 결과는 false, 14라인의 결과는 true가 출력된다. `arr3`은 11라인에서 `arr2`변수의 번지가 대입되었기 때문에 두 변수는 동일한 번지를 가지며 같은 배열을 참조합니다.

# `null`과 `NullPointerException`

참조 타입 변수는 아직 번지를 저장하고 있지 않다는 뜻으로 null 값을 가질 수 있습니다. null도 초기값으로 사용할 수 있기 때문에 null로 초기화된 참조 변수는 스택 영역에 생성됩니다.

```java

String refVar1 = '자바';
String refVar2 = null;
```

자바는 프로그램 실행 도중에 발생하는 오류를 예외 _Exception_ 라고 부릅니다. 참조 변수를 사용하면서 가장 많이 발생하는 예외 중 하나는 `NullPointerException` 입니다. 변수가 null인 상태에서 객체의 데이터나 메소드를 사용하려 할 때 이 예외가 발생합니다. 다음 코드를 봅시다.

```java

int[] intArray = null;
intArray[0] = 10; // NullPointerException
```

배열 변수 `intArray에` null을 대입한 상태에서 배열 객체의 0 인덱스 항목에 10을 대입하는 코드 `intArray[0] = 10`을 실행하면 `NullPointerException`이 발생합니다. 이유는 `intArray`가 참조하는 배열 객체가 없으므로 10을 저장할 수 없기 때문입니다. 다음 예제도 마찬가지 입니다.

```java

String str = null;
System.out.println("총 문자 수: " + str.length()); // NullPointerException
```

str 변수에 null을 대입한 상태에서 문자열의 길이를 얻기 위해 `length()` 메소드를 호출하면 `NullPointerException`이 발생합니다. 이유는 str 변수가 참조하는 String 객체가 없으므로 문자열의 길이를 구할 수 없기 때문입니다.

앞으로 NullPointerException이 발생하면 예외가 발생 된 곳에서 null인 상태의 참조 변수가 사용되고 있음을 알아야 합니다. 이것을 해결하려면 참조 변수가 객체를 정확히 참조하도록 번지를 대입해야 합니다.

경우에 따라서는 참조 타입 변수에 일부러 null을 대입하기도 합니다. 프로그램에서 객체를 사용하려면 해당 객체를 참조하는 변수를 이용해야 하는데, 변수에 null을 대입하면 번지를 잃게 되므로 더 이상 객체를 사용할 수 없게 됩니다.

```java
String hobby = '여행';
hobby = null;
```

어떤 변수에서도 객체를 참조하지 않으면 해당 객체는 프로그램에서 사용할 수 없는 객체가 됩니다. 즉 힙 메모리에는 있지만, 위치 정보를 모르기 때문에 사용할 수 없게 됩니다. 자바는 이러한 객체를 쓰레기로 취급하고, 가비지 콜렉터를 실행시켜 자동으로 제거합니다.

사실 자바는 코드를 이용해서 객체를 직접 제거하는 방법을 제공하지 않습니다. 객체를 제거하는 유일한 방법은 객체의 모든 참조를 없애는 것입니다. 다음 코드에서 _"여행"_ 에 해당하는 String 객체는 쓰레기가 되어 메모리에서 삭제됩니다. `hobby` 변수에 _"영화"_ 가 대입되면서 다른 String 객체의 번지가 대입되어 이전 번지를 잃어버리기 때문입니다.

```java
String hobby = "여행";
hobby = "영화";
```

```java
// GarbageObjectExample.java

public class GarbageObjectExample {
  public static void main(String[] args) {
    String hobby = "여행";
    hobby = null; // "여행"에 해당하는 String 객체를 쓰레기로 만듦

    String kind1 = "자동차";
    String kind2 = kind1; // kind1 변수에 저장되어 있는 번지를 kind2 변수에 대입
    kind1 = null; // "자동차"에 해당하는 String 객체는 쓰레기가 아님
    System.out.println("kind2: " + kind2);
  }
}
```

10 라인에서 `kind1` 변수에 null을 대입한다고 해서 "자동차"에 해당하는 String 객체가 쓰레기가 되지는 않습니다. 그 이유는 `kind2` 변수가 여전히 참조하고 있기 때문입니다.

### 참조

- 이것이 자바다 (서적)
