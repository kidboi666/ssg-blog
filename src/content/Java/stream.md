---
layout: ../../layouts/PostLayout.astro
title: Stream 메서드
category: Java
tags: ["Java", "Stream"]
pubDate: 2024-11-25
---

# Stream이란 ?

`stream()` 메서드는 Java의 **Stream API** 에서 제공하는 기능으로, **Java 8** 에서 도입되었습니다.

- Stream은 데이터의 연속적인 흐름을 의미하며, 데이터를 필터링, 변환, 집계 등의 작업을 수행하기 위한 도구 입니다.
- 주로 **컬렉션(List, Set 등)** 이나 배열과 함께 사용됩니다.
- Stream은 원본 데이터를 변경하지 않으며, **함수형 프로그래밍 스타일**로 데이터를 처리합니다.
- 병렬 처리를 쉽게 구현할 수 있습니다.

# `stream()` 메서드

컬렉션 객체나 배열에서 Stream 객체를 생성할 때 사용하는 메서드 입니다. `Collection` 인터페이스의 기본 메서드로 정의되어 있습니다.

```java
default Stream<E> stream()
```

## 1. 리스트 데이터 처리하기

```java

import java.util.*;
import java.util.stream.Collectors;

public class Main {
	public static void main(String[] args) {
		List<String> names =
      Arrays.asList("John", "Jane", "Jack", "Doe");

		List<String> filteredNames =
      names.stream()
        .filter(name -> name.startsWith("J"))
        .collect(Collectors.toList());

    System.out.println(filteredNames);
	}
}
```

## 2. 배열 데이터를 처리하기

```java

import java.util.Arrays;

public class Main {
	public static void main(String[] args) {
		int[] numbers = {1, 2, 3, 4, 5};

		// 짝수만 출력
		Arrays
      .stream(numbers)
        .filter(num -> num % 2 == 0)
        .forEach(System.out::println); // 2, 4
	}
}
```

# Stream 주요 메서드

## 1. `filter(Predicate)`

조건에 맞는 데이터만 필터링.

```java

List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
nums.stream()
  .filter(n -> n % 2 === 0) // 짝수만 필터링
  .forEach(System.out::println); // 2, 4
```

## 2. `map(Function)`

각 요소를 특정 값으로 변환.

```java

List<String> names = Arrays.asList("John", "Jane");
names.stream()
  .map(name -> name.toUpperCase()) // 대문자로 변환
  .forEach(System.out::println); // JOHN, JANE

```

## 3. `sorted()`

요소를 정렬.

```java

List<Integer> nums = Arrays.asList(3, 1, 4, 2);
nums.stream()
  .sorted() // 오름차순 정렬
  .forEach(System.out::println); // 1, 2, 3, 4
```

## 4. `distinct()`

중복 제거.

```java

List<Integer> nums = Arrays.asList(1, 2, 2, 3, 3);
nums.stream()
  .distinct() // 중복 제거
  .forEach(System.out::println); // 1, 2, 3
```

## 5. `collect()`

Stream 데이터를 컬렉션으로 변환.

```java

List<String> names = Arrays.asList("John", "Jane", "Jack");
List<String> uppercaseNames = names.stream()
  .map(String::toUpperCase)
  .collect(Collectors.toList());
System.out.println(uppercaseNames); // [JOHN, JANE, JACK]
```

## 6. `reduce()`

모든 요소를 하나의 값으로 집계.

```java

List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
int sum = nums.stream()
  .reduce(0, Integer::sum); // 요소의 합
System.out.println(sum); // 15
```
