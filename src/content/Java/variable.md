---
layout: ../../layouts/PostLayout.astro
title: 변수
tags: [Java, Variable]
category: Java
pubDate: 2024-11-29
---

# 개요

컴퓨터 메모리 (RAM) 은 수많은 번지들로 구성된 데이터 저장 공간입니다. 프로그램은 데이터를 메모리에 저장하고 읽는 작업을 빈번히 수행합니다. 이 때 데이터를 어디에, 어떤 방식으로 저장할지 정해져 있지 않다면 메모리 관리가 무척 어려워집니다. 프로그래밍 언어는 이 문제를 해결키 위해 변수를 사용합니다.

변수는 하나의 값을 저장할 수 있는 메모리 번지에 붙여진 이름입니다. 변수를 통해 프로그램은 메모리 번지에 값을 저장하고 있을 수 있습니다.

> 변수 = 하나의 값을 저장할 수 있는 메모리 번지에 붙여진 이름

자바의 변수는 다양한 타입의 값을 저장할 수 없습니다. 즉, 정수형 변수에는 정수값만 저장할 수 있고, 실수형 변수에는 실수값만 저장할 수 있습니다.

# 선언 방식

```java
int age;		// 정수(int) 값을 저장할 수 있는 age 변수 선언
double value;	// 실수(double) 값을 저장할 수 있는 value 변수 선언
```

변수 선언은 저장되는 값의 타입과 이름만 결정했을뿐 아직 메모리에 할당된 것은 아닙니다. 변수가 초기화 되었을때 메모리에 할당되며 선언과 동시에 초기화를 할 수도 있습니다.

초기화 되지 않은 변수는 아직 메모리에 할당되지 않았기 때문에 변수를 통해 메모리 값을 읽을 수 없습니다. 따라서 다음은 잘못된 코딩입니다.

```java
int value;
int result = value + 10;
```

변수 `value`가 선언되었지만 초기화되지 않았기 때문에 `value + 10`에서 `value` 변수값은 읽어 올 수 없습니다.

변수는 또 다른 변수에 대입되어 메모리 간에 값을 복사할 수 있습니다. 다음 코드는 변수 `x`값을 변수 `y`값으로 복사합니다.

```java
int x = 10;
int y = x;
```

## 정수 타입

변수는 선언될 때의 타입에 따라 저장할 수 있는 값의 종류와 허용 범위가 달라집니다. 자바는 정수, 실수, 논리값을 저장할 수 있는 기본 타입 8개를 다음과 같이 제공합니다.

| 값의 분류         | 기본 타입                   |
| ----------------- | --------------------------- |
| 정수              | bye, char, short, int, long |
| 실수              | float, double               |
| 논리 (true/false) | boolean                     |

정수 타입은 총 5개로, 다음과 같이 메모리 할당 크기와 저장되는 값의 범위를 가지고 있다.
|타입|메모리 크기|저장되는 값의 허용 범위|
|---|---|---|
|byte|1byte / 8bit|-128 ~ 127|
|short|2byte / 16bit|-32,768 ~ 32,767|
|char|2byte / 16bit|0 ~ 65535 (유니코드)|
|int|4byte / 32bit|-2,147,483,648 ~ 2,147,483,647|
|long|8byte / 64bit|-9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807|

각 타입에 저장되는 값의 허용 범위를 모두 외울 필요는 없지만, 메모리의 할당 크기는 알고 있는 것이 좋다. 정수 타입을 메모리 사용 크기순으로 나열하면 다음과 같다.

| 종류                        | byte | short | int | long |
| --------------------------- | ---- | ----- | --- | ---- |
| 메모리 사용 크기 (단위 bit) | 8    | 16    | 32  | 64   |

## 문자 타입

**하나의 문자를 작은 따옴표로 감싼 것을 문자 리터럴 이라고 합니다.** 문자 리터럴은 유니코드로 변환되어 저장되는데 유니코드는 세계 각국의 문자를 0 ~ 65535 숫자로 매핑한 국제 표쥰 규약입니다. 자바는 이러한 유니코드를 저장할 수 있도록 char 타입을 제공합니다.

```java
char var1 = 'A';
char var3 = '가';
```

유니코드가 정수이므로 char 타입도 정수 타입에 속합니다. 그렇기 때문에 char 변수에 작은 따옴표로 감싼 문자가 아니라 유니코드 숫자를 직접 대입할 수도 있습니다.

```java
// CharExample.java

public class CharExample {
	public static void main(String[] args) {
		char c1 = 'A'; // 문자 저장
		char c2 = 65; // 유니코드 직접 저장
		char c3 = '가'; // 문자 저장
		char c4 = 44032; // 유니코드 직접 저장

		System.out.println(c1);
		System.out.println(c2);
		System.out.println(c3);
		System.out.println(c4);
	}
}
```

```zsh
A
A
가
가
```

char 타입의 변수에 어떤 문자도 대입하지 않고 단순히 초기화를 할 목적으로 다음과 같이 작은 따옴표 두개를 연달아 붙인 빈 문자를 대입하면 컴파일 에러가 발생합니다. 이땐 공백(유니코드: 32) 하나를 포함해서 초기화 해야 합니다.

```java
char c = ''; // 컴파일 에러
char c = ' '; // 유니코드: 32인 공백 하나를 넣어서 초기화
```

## 실수 타입

실수 타입에는 `float`과 `double`이 있으며, 다음과 같이 메모리 할당 크기와 저장되는 값의 범위를 가지고 있습니다.

| 타입   | 메모리 크기   | 저장되는 값의 허용 범위(양수 기준) | 유효 소수 이하 자리 |
| ------ | ------------- | ---------------------------------- | ------------------- |
| float  | 4byte / 32bit | 1.4 _ 10⁻⁴⁵ ~ 3.4 _ 10³⁸           | 7자리               |
| double | 8byte / 64bit | 4.9 _ 10⁻³²⁴ ~ 1.8 _ 10³⁰⁸         | 15자리              |

double 타입이 float 타입보다 큰 실수를 저장할 수 있고 정밀도 또한 높은걸 볼 수 있습니다.

## 논리 타입

참과 거짓을 의미하는 논리 리터럴은 `true`와 `false`입니다.

```java
boolean stop = true;
boolean stop = false;
```

boolean 타입 변수는 두 가지 상태값을 저장할 필요가 있을 경우에 사용되며, 상태값에 따라 조건문과 제어문의 실행 흐름을 변경하는 데 사용됩니다. 연산식 중에서 비교 및 논리 연산의 산출값은 `true` 또는 `false` 이므로 boolean 타입 변수에 다음과 같이 대입할 수 있습니다.

```java
int x = 10;
boolean result = x == 20;
boolean result = x != 20;
boolean result = x > 20;
boolean result = 0 < x && x < 20;
boolean result = x < 0 || x > 200;
```

## 문자열 타입

큰따옴표로 감싼 문자들을 문자열이라고 부르는데, 문자열을 변수에 저장하고 싶다면 다음과 같이 String 타입을 사용해야 합니다.

```java
String var1 = "A";
String var2 = "홍길동";
```

문자열 내부에 역슬래쉬가 붙은 문자를 사용할 수가 있는데, 이것을 이스케이프 문자라고 합니다. 이스케이프 문자를 사용하면 특정 문자를 포함할 수 있고, 출력에 영향을 미치기도 합니다.
|이스케이프 문자||
|---|---|
|\”|”문자 포함|
|\’|’문자 포함|
|\\|\문자 포함|
|\u16진수|16진수 유니코드에 해당하는 문자 포함|
|\t|출력 시 탭만큼 띄움|
|\n|출력 시 줄바꿈(라인피드)|
|\r|출력 시 캐리지 리턴|
Java 13 부터는 다음과 같은 텍스트 블록 문법을 제공합니다.

```java
String str = """
{
	"id": "winter",
	"name": "눈송이"
}
"""
```

```console
{
	"id": "winter",
	"name": "눈송이"
}
```

# 자동 타입 변환

자동 타입 변환 (promotion)은 말 그대로 자동으로 타입 변환이 일어나는 것을 말합니다. 자동 타입 변환은 값의 허용 범위가 작은 타입이 허용 범위가 큰 타입으로 대입될 때 발생합니다.

기본 타입을 허용 범위 순으로 나열하면 다음과 같습니다.

> byte < short, char < int < long < float < double

int 타입이 byte 타입보다 허용 범위가 더 크기 때문에 다음 코드는 자동 타입 변환이 됩니다.

```java
byte byteValue = 10;
int intValue = byteValue; // 자동 타입 변환됨
```

정수 타입이 실수 타입으로 대입될 경우에는 무조건 자동 타입 변환이 됩니다. 실수 타입은 정수 타입보다 허용 범위가 더 크기 때문입니다.

```java
long longValue = 5000000000L;
float floatValue = longValue; // 5.0E9f로 저장됨
double doubleValue = longValue; // 5.0E9로 저장됨
```

char 타입의 경우 Int 타입으로 자동 변환되면 유니코드 값이 int 타입에 대입됩니다.

```java
char charValue = 'A';
int intValue = charValue // 65가 저장됨
```

자동 타입 변환에서 예외가 있습니다. **char 타입보다 허용 범위가 작은 byte 타입은 char 타입으로 자동 변환 될 수 없습니다**. 왜냐하면 char 타입의 허용 범위는 음수를 포함하지 않는데, byte 타입은 음수를 포함하기 때문입니다.

```java
byte byteValue = 65;
char charValue = byteValue; // 컴파일 에러
```

# 강제 타입 변환

**큰 허용 범위 타입은 작은 허용 범위 타입으로 자동 타입 변환 될 수 없습니다.** 마치 큰 그릇을 작은 그릇 안에 넣을 수 없는 것과 동일한 이치 입니다. 하지만 큰 그릇을 작은 그릇 단위로 쪼개어서 한 조각만 작은 그릇에 넣는 것은 가능합니다.
큰 허용 범위 타입을 작은 허용 범위 타입으로 쪼개어서 저장하는 것을 강제 타입 변환(casting) 이라고 합니다. 강제 타입 변환은 캐스팅 연산자로 괄호를 사용하는데, 괄호 안에 들어가는 타입은 쪼개는 단위 입니다.

## int -> byte

int 타입은 byte 타입보다 더 큰 허용 범위를 가집니다. 따라서 int 타입은 byte 타입으로 자동 변환 되지 않고 (byte) 캐스팅을 해서 byte 타입으로 강제 변환 시켜야 합니다.

```java
int intValue = 10;
byte byteValue = (byte) intValue; // 강제 타입 변환
```

강제 타입의 목적은 원래 값이 유지되면서 타입만 바꾸는 것입니다. 그렇기 때문에 작은 허용 범위 타입에 저장될 수 있는 값을 가지고 강제 타입 변환을 해야 합니다. byte 타입으로 변환한다면 -128 ~ 127인 int값만 원래 값을 보존할 수 있습니다.

## long -> int

long 타입은 int 타입보다 큰 허용 범위를 가집니다. 따라서 long 타입은 int 타입으로 자동 변환되지 않고 (int) 캐스팅을 해서 강제 변환 시켜야 합니다. 예를 들어 300을 갖는 long 타입 변수는 8byte 중에 끝 4byte로 300을 표현할 수 있습니다. int 타입으로 강제 변환하면 앞 4byte는 버려지고 끝 4byte만 int 타입 변수에 저장되므로 300이 그대로 유지됩니다.

```java
long longValue = 300;
int intValue = (int) longValue; // 강제 타입 변환 후에 300이 그대로 유지
```

## int -> char

int 타입은 char 타입보다 큰 허용 범위를 가집니다. 따라서 int 타입은 char 타입으로 자동 변환 되지 않고,(char) 캐스팅을 해서 강제 변환시켜야 합니다. 주의할 점은 char 타입의 허용 범위인 0 ~ 65535 사이의 값만 원래 값을 유지합니다.

```java
int intValue = 65;
char charValue = (char) intValue;
System.out.println(charValue); // 'A'가 출력
```

## 실수 -> 정수

실수 타입은 정수 타입보다 항상 큰 허용 범위를 가집니다. 따라서 대상 정수 타입으로 강제 변환 시켜야 합니다. 이 경우 소수점 이하 부분은 버려지고 정수 부분만 저장됩니다.

```java
double doubleValue = 3.14;
int intValue = (int) doubleValue; // intValue는 정수 부분인 3만 저장
```

# 변수 사용 범위

`main()` 메소드 블록에는 다른 중괄호 `{}` 블록들이 작성 될 수 있습니다. 조건문에 해당하는 if, 반복문에 해당하는 for, while 등이 중괄호 블록을 가질 수 있는데, 이러한 중괄호 블록 내에서 선언된 변수는 해당 중괄호 블록 내에서만 사용 가능하고 밖에서는 사용할 수 없습니다.

# 콘솔로 변수값 출력

우리는 지금까지 표준 출력 장치인 모니터(명령 프롬프트, 터미널, 콘솔)에 값을 출력하기 위해 `System.out.println()`을 이용했습니다. 괄호 안에 리터럴을 넣으면 리터럴이 그대로 출력되고, 변수를 넣으면 변수에 저장된 값이 출력됬습니다.

출력 방법에 따라 `println()` 이외에도 다음과 같이 `print()`,`printf()`를 사용할 수 있습니다.
| 메소드 | 의미 |
|------------------------------|----------------------------|
| `println(내용)` | 괄호 안의 내용을 출력하고 행을 바꿔라. |
| `print(내용)` | 괄호 안의 내용을 출력하고 행은 바꾸지 말아라. |
| `printf(“형식문자열”, 값1, 값2, …)` | 형식 문자열에 맞추어 뒤의 값을 출력해라. |

# 키보드 입력 데이터를 변수에 저장

키보드로부터 입력된 데이터를 읽고 변수에 저장하는 가장 쉬운 방법은 Scanner를 사용하는 것입니다. 다음과 같이 Scanner 타입 변수를 선언하고, 대입 연산자 `=`를 사용해서 new 연산자로 생성한 Scanner 객체를 변수에 대입합니다.

```java
Scanner scanner = new Scanner(System.in);
```

다음으로 `scanner.nextLine()`을 실행하면 키보드로 입력된 내용을 문자열로 읽고 좌측 `String` 변수에 저장할 수 있습니다.

```java
String inputData = scanner.nextLine();
```

`scanner.nextLine()`은 Enter키가 입력 되기 전까지 대기 상태가 되며, Enter키가 입력되면 지금까지 입력된 모든 내용을 문자열로 읽습니다.

```java
package ch01;

import java.util.Scanner;

public class ScannerExample {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("x 값 입력: ");
        String strX = sc.nextLine();
        int x = Integer.parseInt(strX);

        System.out.print("y 값 입력: ");
        String strY = sc.nextLine();
        int y = Integer.parseInt(strY);

        int result = x + y;
        System.out.println("x + y: " + result);
        System.out.println();

        while(true) {
            System.out.print("입력 문자열: ");
            String data = sc.nextLine();
            if (data.equals("q")) {
                break; // 입력된 문자열이 q라면 반복을 중지
            }
            System.out.println("출력 문자열: " + data);
            System.out.println();
        }
    }
}
```

```zsh
x 값 입력: 3
y 값 입력: 5
x + y: 8

입력 문자열: 안녕하세요
출력 문자열: 안녕하세요

입력 문자열: q
종료
```
