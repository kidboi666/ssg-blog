---
layout: ../../layouts/PostLayout.astro
title: 애너테이션
category: Spring
tags: [Java, Spring, Test]
pubDate: 2024-11-26
---

# 애너테이션이란

스프링에서 애너테이션(Annotation)은 클래스, 메서드, 필드, 매개변수 등에 메타데이터를 제공하는 역할을 합니다. 스프링은 이러한 애너테이션을 사용하여 개발자가 작성한 코드의 의도를 프레임워크에 전달하고, 코드의 실행 방식을 제어합니다.

# 주요 애너테이션 종류, 설명, 예제, 사용처

스프링에서 애너테이션은 크게 다음과 같은 범주로 나뉩니다.

- **구성(Configuration)** 관련 애너테이션
- **의존성 주입(Dependency Injection)** 관련 애너테이션
- **AOP(Aspect-Oriented Programming)** 관련 애너테이션
- **웹(Web)** 관련 애너테이션
- **데이터 접근(Data Access)** 관련 애너테이션

## 1. 구성 관련 애너테이션

- @Configuration

  해당 클래스가 스프링의 설정 클래스임을 나타냅니다. 내부에 정의된 메서드들이 빈(bean)을 생성하는 역할을 합니다.

  ```java

  @Configuartion
  public class AppConfig {

    @Bean
    public MyService myService() {
      return new MyServiceImpl();
    }
  }
  ```

- @Bean

  메서드 수준에서 사용되며, 해당 메서드가 생성하는 객체를 스프링 컨테이너에 빈으로 등록합니다.

  ```java

  @Bean
  public MyService myService() {
    return new MyServiceImpl();
  }
  ```

## 2. 의존성 주입 관련 애너테이션

- @Autowired

  스프링이 자동으로 해당 필드, 생성자, 메서드에 의존성을 주입하도록 합니다.

  ```java

  @Service
  public class MyService {

    @Autowired
    private MyRepository myRepository;
  }

  ```

- @Qualifier

  동일한 타입의 빈이 여러 개일 경우, 특정 빈을 선택할 때 사용합니다.

  ```java

  @Service
  public class MyService {

    @Autowired
    @Qualifier("specificBeanName")
    private MyRepository myRepositroy;
  }

  ```

- @Value

  외부 설정 파일(application.properties 또는 application.yml)에서 값을 읽어와 필드에 주입합니다.

  ```java

  @Component
  public class AppConfig {

    @Value("@{app.name}")
    private String appName;
  }

  ```

## 3. AOP 관련 애너테이션

- @Aspect

  해당 클래스가 AOP 관점(Aspect) 역할을 수행한다는 것을 나타냅니다.

  ```java

  @Aspect
  @Component
  public class LoggingAspect {

    @Before("execution(* com.example.service.*.*(..))")
    public void logBefore(JoinPoint joinPoint) {
      System.out.println("Method called: " + joinPoint.getSignature());
    }
  }

  ```

- @Before / @After / @Around

  특정 메서드 실행 전후 또는 실행 중간에 실행될 로직을 정의합니다.

  ```java

  @Before("execution(* com.example.service.*.*(..))")
  public void logBefore(JoinPoint joinPoint) {
    System.out.println("Before method: " + joinPoint.getSignature());
  }
  ```

  ## 4. 웹 관련 애너테이션

- @Controller

  해당 클래스가 웹 요청을 처리하는 컨트롤러 역할을 수행하도록 지정합니다.

  ```java
  @Controller
  public class MyController {
    @GetMapping("/hello")
    public String sayHello() {
        return "hello";
    }
  }
  ```

- @RestController

  `@Controller`와 `@ResponseBody`를 합친 애너테이션으로, JSON 데이터를 반환하는 REST API 컨트롤러를 정의합니다.

  ```java
  @RestController
  public class MyRestController {
    @GetMapping("/api/data")
    public List<String> getData() {
        return List.of("item1", "item2");
    }
  }
  ```

- @RequestMapping / @GetMapping / @PostMapping

  HTTP 요청 URL 과 매핑되는 메서드를 지정합니다.

  ```java

  @GetMapping("/hello")
  public String sayHello() {
    return "hello";
  }
  ```

## 5. 데이터 접근 관련 애너테이션

- @Repository

  데이터 접근 계층(DAO)을 나타내며, 데이터베이스와의 상호작용을 처리합니다.

  ```java

  @Repository
  public class MyRepository {
    // 데이터베이스 작업
  }

  ```

- @Transactional

  트랜잭션 범위를 지정하며, 데이터베이스 작업 중 오류 발생 시 롤백을 처리합니다.

  ```java

  @Transactional
  public void performTransaction() {
    // 데이터 작업
  }
  ```
