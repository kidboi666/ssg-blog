---
layout: ../../layouts/PostLayout.astro
title: Map 문법
tags: ["Java", "Map"]
category: Java
pubDate: 2024-11-25
---

# Map 개요

Java에서 `Map`은 키와 값 쌍으로 데이터를 저장하는 컬렉션 인터페이스 입니다. `Map` 인터페이스를 구현하는 클래스는 여러 가지가 있으며, 그 중 가장 많이 사용되는 구현체는 `HashMap`, `TreeMap`, `LinkedHashMap` 입니다. 각 클래스는 특징이 조금씩 다릅니다.

# 기본 사용법

`Map` 인터페이스는 기본적으로 다음의 메서드들을 제공합니다.

- put(K key, V value): 주어진 키와 값을 Map에 추가하거나 기존 키가 있으면 값을 갱신합니다.
- get(Object key): 주어진 키에 대응하는 값을 반환합니다. 키가 없으면 null을 반환합니다.
- containsKey(Object key): Map에 주어진 키가 존재하는지 확인합니다.
- containsValue(Object value): Map에 주어진 값이 존재하는지 확인합니다.
- remove(Object key): 주어진 키를 삭제합니다.
- size(): Map에 들어 있는 엔트리(키-값 쌍)의 개수를 반환합니다.
- keySet(): Map에 들어 있는 모든 키를 Set 형태로 반환합니다.
- values(): Map에 들어 있는 모든 값을 Collection 형태로 반환합니다.
- entrySet(): Map에 들어 있는 모든 키-값 쌍을 Set 형태로 반환합니다.

# `HashMap`

`HashMap`은 가장 많이 사용되는 `Map` 구현체로, 키와 값의 순서를 보장하지 않습니다.

```java
// src/java/javaApp.java

import java.util.HashMap;
import java.util.Map;

public class MapExample {
  public static void main(String[] args) {
    // HashMap 생성
    Map<String, String> map = new HashMap<>();

    // 요소 추가
    map.put("A", "Apple");
    map.put("B", "Banana");
    map.put("C", "Cherry");

    // 요소 조회
    System.out.println(map.get("A")); // Apple
    System.out.println(map.get("B")); // Banana

    // 값 존재 여부 확인
    System.out.println(map.containsValue("Apple")) // true
    System.out.println(map.containsValue("Grape")) // false

    // 요소 제거
    map.remove("B");

    // 크기 확인
    System.out.println("Map size: " + map.size()); // 2

    // 모든 키 조회
    System.out.println("Keys: " + map.keySet()); // [A, C]

    // 모든 값 조회
    System.out.println("Values : " + map.values()); // [Apple, Cherry]

    // 모든 키-값 쌍 조회
    for (Map.Entry<String, String> entry : map.entrySet()) {
      System.out.println(entry.getKey() + " = " + entry.getValue());
    }
  }
}
```

# `LinkedHashMap`

`LinkedHashMap`은 `HashMap`의 기능을 제공하지만, 입력 순서를 유지합니다. 삽입 순서대로 항목을 조회할 수 있습니다.

```java
import java.util.LinkedHashMap;
import java.util.Map;

public class LinkedHashMapExample {
    public static void main(String[] args) {
        // LinkedHashMap 생성
        Map<String, String> map = new LinkedHashMap<>();

        // 요소 추가
        map.put("A", "Apple");
        map.put("B", "Banana");
        map.put("C", "Cherry");

        // 요소 조회
        System.out.println(map);  // {A=Apple, B=Banana, C=Cherry}

        // 요소 순서가 삽입된 순서대로 출력됩니다.
        map.remove("B");
        System.out.println(map);  // {A=Apple, C=Cherry}
    }
}
```

```bash
{ A=Apple, C=Cherry }
```

# `TreeMap`

`TreeMap`은 키를 자연 순서 또는 제공된 `Comparator`에 따라 정렬된 순서로 저장합니다.

```java

import java.util.Map;
import java.util.TreeMap;

public class TreeMapExample {
    public static void main(String[] args) {
        // TreeMap 생성
        Map<String, String> map = new TreeMap<>();

        // 요소 추가
        map.put("A", "Apple");
        map.put("B", "Banana");
        map.put("C", "Cherry");

        // 요소 조회 (정렬된 순서대로 출력)
        System.out.println(map);  // {A=Apple, B=Banana, C=Cherry}

    }
}
```

```zsh
{ A=Apple, B=Banana, C=Cherry }
```

`TreeMap`은 기본적으로 키를 오름차순으로 정렬합니다. 내림차순으로 정렬하고 싶다면, `Comparator`를 사용할 수 있습니다.

```java

import java.util.Map;
import java.util.TreeMap;

public class ReverTreeMapExample {
  public static void main(String[] args) {
    // 내림차순으로 정렬되는 TreeMap
    Map<String, String> map = new TreeMap<>(Comparator.reverseOrder());

            // 요소 추가
        map.put("A", "Apple");
        map.put("B", "Banana");
        map.put("C", "Cherry");

        // 요소 조회 (정렬된 순서대로 출력)
        System.out.println(map);  // {A=Apple, B=Banana, C=Cherry}
  }
}
```

```zsh
{ C=Cherry, B=Banana, A=Apple }
```

# 주의사항

- **Null 값 처리**

  대부분의 `Map` 구현체는 `null` 키와 `null` 값을 허용합니다. 그러나 `TreeMap` 은 키에 대해 `null` 을 허용하지 않으며, `HashMap` 과 `LinkedHashMap` 은 `null` 키와 값을 둘 다 허용합니다.

- **동기화**

  `HashMap` 은 쓰레드 안전하지 않지만, 동기화가 필요한 경우 `Collections.sychronizedMap()` 을 사용하여 동기화된 맵을 만들 수 있습니다.

- **성능**

  `HashMap` 은 평균적인 조회 및 삽입 성능이 뛰어나며, `TreeMap`은 키의 정렬에 추가적인 성능 비용이 발생합니다.

# 요약

- `Map`은 키-값 쌍을 저장하는 자료구조
- `HashMap`은 순서를 보장하지 않으며, 빠른 조회 성능.
- `LinkedHashMap`은 삽입 순서를 보장
