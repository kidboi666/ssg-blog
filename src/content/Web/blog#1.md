---
layout: ../../layouts/PostLayout.astro
title: 블로그 작업기 #1
tags: []
category: Web
pubDate: 2024-08-27
---

코드잇 스프린트 5기 과정 이후 붕 뜨는 마음과 시간을 잡기 위해 블로그를 직접 만들기로 결심했다. 결심은 좋았다. 하지만 생각보다 헤쳐나가야 할 과정이 많았다.

---

## 1. 기술 선택 : 뭘로 만들지?..

일단 그 첫번째 과정으로 기술 선택이다. 코드잇 과정에서 팀 프로젝트를 할땐 최근에 수업에서 배운 기술을 사용하는 편이였는데 막상 대가리가 크고 (?) 각 툴들의 장단점들이 파악이 되니 뭐든 이유 없이 쓰긴 싫다는 마음이 들었다.

그 와중에도 프레임워크는 next를 선택해야 했는데 대안이 별달리 없기도 하거니와 (remix도 선택사항에 있었으나 학습 목적을 제외하곤 아직 써야할 이유를 느끼질 못했다.) 무엇보다 기존에 학습만 하고 실제 프로젝트에선 써보지 못한 앱라우터 적용을 원했던게 컸다.

그 외에는 아직 학습이 부족하다고 생각되는 리액트, 빠른 스타일 작업을 위한 테일윈드, 지속적인 학습을 위한 타입스크립트 (이젠 타입에러가 없으면 허전하다), 체계적인 데이터 관리를 위한 리액트 쿼리, 부족한 상태 관리를 위한 주스탕 등.. 선택에는 거침이 없었다.

---

## 2. 폴더 구조 : 앱 라우터 ? 페이지 라우터 ?

폴더 구조 이야기 이전에 프레임워크의 라우팅 방식에 대해 이야기 하자면, 일단 나는 앱 라우터를 선택하려 했다. 학습하면서 느낀 여러 장점들도 있었고 불필요한 리렌더링을 방지해주는 layout과 page 파일, template 파일 등 각자의 역할을 지닌 독특한 파일 컨벤션도 매력적이였다.

하지만 앱 라우터로 작업을 시작한지 얼마 못가 다시 페이지 라우터 방식으로 돌아와 버렸다. 이유는 학습과 작업을 병행하니 작업 속도가 너무 더뎠고 뭔가 이해할 수 없는 동작들이 드문 드문 보였다. 취업을 위한 포폴 작업 이기에 성의도 보여야 했지만 속도도 중요했다.

이전보다 더 재활용성 높은 컴포넌트를 구축하길 원했기에 좀더 명확한 이유가 있는 컨벤션이 필요했다.

components 는 대략적으로 4가지의 뎁스를 갖고 있다. `feature` 는 특정 도메인에 종속적인 컴포넌트들 (auth나 post, todo 같은 것들) 이 들어갔고, `icon` 은 보다 액티비티함을 위해 컴포넌트화한 svg 컴포넌트들. 그리고 `shared` 는 모두가 아는 공용 요소들 (button, input등..) 이 차지했고 `layout` 은 화면에 영역을 뜻하는 컴포넌트나 공통적으로 사용하는 wrapper 요소들이 해당되었다.

이후 작업을 진행할 수록 `layout` 폴더의 용도가 점점 비대해짐을 느꼇고 뭔가 잘못됬다는 생각이 깊게 박혀버렸다. 특히 컴포넌트를 감싸는 최상위 div 요소를 재사용하기 위해 만든 `Container` 컴포넌트는 이럴거면 뭐하러 컴포넌트로 분리했지 싶을 정도로 비대해져 추후 리팩토링때 제일 먼저 거세당할 위기에 놓이게 됬다.

차라리 관심사별로 나누고 보다 공통적으로 사용하는 놈들을 더욱 재사용성이 강하게 만들어 common같은 폴더에 넣어두는게 더 나은 선택이였지 않을까 싶다.

```plain
📦src
 ┣ 📂assets
 ┣ 📂components
 ┃ ┣ 📂feature
 ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┣ 📜AddSubCategory.tsx
 ┃ ┃ ┃ ┣ 📜DeleteBlogPost.tsx
 ┃ ┃ ┣ 📂...
 ┃ ┣ 📂icon
 ┃ ┃ ┣ 📜ArrowHeadIcon.tsx
 ┃ ┃ ┣ 📜GithubIcon.tsx
 ┃ ┃ ┣ 📜...
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📂AppLayout
 ┃ ┃ ┃ ┣ 📜AppLayout.tsx
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂...
 ┃ ┗ 📂shared
 ┃ ┃ ┣ 📂Back
 ┃ ┃ ┃ ┣ 📜Back.tsx
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂...
 ┣ 📂constants
 ┣ 📂hooks
 ┣ 📂lib
 ┣ 📂models
 ┣ 📂pages
 ┃ ┣ 📂admin
 ┃ ┣ 📂api
 ┃ ┣ 📂...
 ┣ 📂services
 ┃ ┣ 📂mutate
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📜useSignIn.ts
 ┃ ┃ ┃ ┣ 📜useSignInOAuth.ts
 ┃ ┃ ┃ ┣ 📜...
 ┃ ┃ ┣ 📂...
 ┃ ┗ 📂queries
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┗ 📜meQuery.ts
 ┃ ┃ ┣ 📂...
 ┣ 📂store
 ┣ 📂styles
 ┣ 📂utils
 ┃ ┣ 📜delay.ts
 ┃ ┣ 📜formatDate.ts
 ┃ ┣ 📜...
 ┗ 📜middleware.ts
```

서드파티의 초기 설정 파일들과 현재 프로젝트에서만 사용하는 공용 함수등이 포함된 `lib` ,

타입스크립트의 타입파일들을 모아놓은 `models` ,

데이터 페칭 코드를 모아놓은 `services` ,

다른 프로젝트에서도 사용가능한 공용 함수들을 모아놓은 `utils` ,

이외에 이름만 봐도 용도를 알 수 있는 폴더 등으로 간단하게 구조를 잡았다.

---

## 3. 시작은 컴포넌트부터..

일단 공통적으로 사용할 컴포넌트부터 시작했다.

```jsx
interface Props extends ComponentProps<"button"> {
  as?: ElementType
  variant?: "primary" | "secondary" | "teritory" | "icon" | "warn"
  isLoading?: boolean
  isSubmit?: boolean
}

const buttonVariants = cva(
  "group relative flex items-center justify-center gap-2 rounded-lg px-6 py-2 text-sm font-semibold text-white transition dark:text-slate-400",
  {
    variants: {
      active: {
        primary:
          "bg-blue-400 hover:bg-blue-500 active:bg-blue-600 dark:bg-blue-800 dark:text-slate-200 dark:hover:bg-blue-700 dark:active:bg-blue-600",
        secondary:
          "text-slate-500 ring-1 ring-slate-300 hover:bg-slate-300 hover:text-white active:bg-slate-400 dark:text-slate-200 dark:ring-slate-500 dark:hover:bg-slate-700",
        teritory: "p-0 text-slate-500 hover:text-slate-600 hover:underline active:text-slate-400",
        icon: "p-4 text-slate-500 hover:bg-slate-300 hover:text-white active:bg-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-400 dark:active:bg-slate-600",
        warn: "bg-red-500 text-white hover:bg-red-600",
      },
      disabled: {
        primary: "border-slate-300 bg-slate-300 dark:bg-slate-600",
        secondary: "",
        teritory: "text-slate-200",
        icon: "",
        warn: "",
      },
    },
  },
)

export const Button = forwardRef<HTMLButtonElement, PropsWithRef<Props>>(
  (
    { children, onClick, variant = "primary", className, disabled, isLoading, isSubmit, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={isSubmit ? "submit" : "button"}
        disabled={disabled || isLoading}
        onClick={onClick}
        className={cn(
          buttonVariants(isLoading || disabled ? { disabled: variant } : { active: variant }),
          className,
        )}
        {...props}
      >
        {children}
        {isLoading && <Spinner size={Size.s} />}
      </button>
    )
  },
)
```

공용 컴포넌트의 대표격인 Button 컴포넌트를 코드 레벨로 들여다보자. 일단 `ComponentProps` 내장 타입을 이용해 불필요한 기본 타입핑들을 생략하였고 버튼에 들어갈 텍스트는 `children`을 이용하기에 `children`이 포함된 `PropsWithRef` 타입을 사용하였다. (`ref` 적용을 위해 `forwardRef`로 감싸주었다.)

테일윈드를 사용하였기에 재실행을 방지하고자 컴포넌트 외부에서 스타일 관련한 객체를 만들었고 보다 쉬운 코드 작성을 위해 cva라는 라이브러리를 사용했다. cva는 첫번째 인자로 기본 적용될 스타일을 문자열로 받고 두번째 인자로 객체를 받으며 해당 객체에 variants 프로퍼티 안에 필요한 바리에이션을 작성하면 된다. 이후 사용은 cva 객체를 할당한 변수를 함수 호출 방식으로 스타일을 적용할 요소의 className에 넣으면 되는데 이때 프롭스로 받아올 variant를 인자로 넣어주면 끝이다.

위에 작성한 예시엔 cn이라는 함수가 이를 감싸고 있는데 이는 테일윈드 내장 클래스 와의 충돌을 방지하고자 사용한 tailwind-merge와 className 속성 안에서 보다 편한 분기 처리를 위한 clsx 라이브러리를 합친 유틸 함수이다. 보통 테일윈드로 프로젝트를 진행하면 tailwind-merge,cva,clsx 이 3가지 라이브러릴 함께 사용해 테일윈드의 유틸성을 극대화 시키는 편이다.

```jsx
import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export default cn
```

---

## 4. 이런것도 컴포넌트로 ?

테일윈드에 막 입문했을 때, 다른 사람들은 어떻게 사용했나 깃허브를 돌아다니다 테일윈드 공식문서 오픈 소스를 유심히 보게 된 적이 있는데 해당 리포에선 Text나 Title같은 컴포넌트가 정의되어 있었다. 워낙 글씨들이 많은 사이트다 보니 텍스트들도 하나의 컴포넌트로 빼서 관리하나 싶었다. 허나 자세히 보니 놀라운점은 따로 있었다. html 태그 자체를 프롭스로 받는 구조였다. 하나의 Text 컴포넌트지만 사용하는 곳에 따라 p태그를 쓸 수도 span 태그를 쓸 수도 있는 것이다.

```jsx
interface Props {
  as?: ElementType
  variant?: "body" | "description" | "caption" | "error"
  className?: string
  dataStatus?: string
}

const textVariants = cva("text-slate-600 transition dark:text-slate-400", {
  variants: {
    variant: {
      body: "text-sm",
      description: "text-xs text-slate-500",
      caption: "text-xs text-slate-400 dark:text-slate-500",
      error: "mt-2 block text-xs text-red-600 dark:text-red-600",
    },
  },
})

export const Text = forwardRef<HTMLElement, PropsWithChildren<Props>>(
  ({ as: Component = "p", variant = "body", children, className, dataStatus, ...props }, ref) => {
    return (
      <Component // as 프롭스가 없다면 p를 기본으로 받으나 언제든 바꿀 수 있다.
        ref={ref}
        data-status={dataStatus}
        className={cn(textVariants({ variant }), className)}
        {...props}
      >
        {children}
      </Component>
    )
  },
)
```

알고보니 꽤나 많은 곳에서 위와 같은 방식으로 유동성 있게 태그를 바꿔 사용하는 구조는 널리 쓰이고 있었다. 단지 나만 몰랐을 뿐, 사실 화면에 보이는 부분에선 변화를 주지 않기에 크게 의미가 있나 싶지만 보다 의미론적인 코드 작성과 접근성 등을 위한다면 상당히 유용한 방식이라고 생각된다. 한가지 아쉬운건 div로 쓰이는 컴포넌트를 대뜸 span으로 바꿔 쓰는 등의 기행을 막을 방법을 타입핑 단계에서 방지할 방법은 아직 찾질 못했다.

현재는 ElementType으로 정의해두고 있으나 지정한 태그만 받을 수 있는 방법이 있는지 찾는 중이다..

2부에서 계속...
