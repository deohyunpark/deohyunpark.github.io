---
title: 컴포지션(Composition)
categories:
  - java
tags:
  - Composition
toc: true
toc_sticky: true
toc_label: ""
toc_icon: ""
---

abstract 관련 공부를 하다 상속이 캡슐화를 깬다는 문장을 보고 검색하다가 컴포지션이 뭐지? 하고 생각하다가 작성하게 되었습니다. (의식의흐름)
<br>
(참고로 상속이 캡슐화를 꺤다는 것은 는 이미 구현된 class의 상속을 지양하라는 의미라고 합니다. 구현이 되어있는 class를 상속하여 재정의할 경우 캡슐화가 깨져버리니까요.)


---

# 

- 컴포지션(Composition)이란?
  - 컴포지션은 객체 지향 프로그래밍에서 클래스들을 설계할 때 사용하는 기법 중 하나로, 한 클래스가 다른 클래스의 기능을 상속받는 대신, 필요한 클래스의 인스턴스를 내부에 포함시켜서 사용하는 방식을 말한다. 이를 통해 클래스 간의 느슨한 결합을 유지할 수 있으며, 유연하고 재사용 가능한 코드를 작성할 수 있다.
- 컴포지션의 정의
  - 해당 클래스를 구성하는 부분의 합으로 정의되며, 클래스의 구성요소로 쓰인다는 뜻에서 composition이라고 한다.
- 컴포지션의 장점
  - 유연성: 컴포지션을 사용하면 클래스 간의 관계를 더 유연하게 설계할 수 있다. 클래스의 기능이 필요할 때, 해당 기능을 가진 클래스의 인스턴스를 내부에 포함시켜 사용하기 때문에, 코드 수정이 쉬워진다.
  - 재사용성: 컴포지션을 통해 기능을 재사용하기 쉬워져, 코드의 중복을 줄이고, 유지보수가 용이해진다.
- 컴포지션 예시 코드

    ```java
    
    class Engine {
        public void start() {
            System.out.println("엔진이 시작됩니다.");
        }
    }
    
    class Car {
        // Car 클래스는 Engine 클래스의 기능을 상속받지 않고, Engine 인스턴스를 내부에 포함시킵니다.
        private Engine engine;
    
        public Car() {
            engine = new Engine(); // 컴포지션을 사용하여 Engine 객체를 생성합니다.
        }
    
        public void start() {
            engine.start(); // Engine 클래스의 start 메소드를 호출합니다.
            System.out.println("차가 출발합니다.");
        }
    }
    
    public class Main {
        public static void main(String[] args) {
            Car myCar = new Car();
            myCar.start(); // "엔진이 시작됩니다." 그리고 "차가 출발합니다."가 출력됩니다.
        }
    }
    
    ```

  이 예시에서 Car 클래스는 Engine 클래스의 기능을 직접 상속받지 않습니다. 대신, Car 클래스는 Engine 클래스의 인스턴스를 내부 속성으로 가지고 있으며, 이를 통해 Engine의 기능을 사용합니다. 이러한 방식으로 컴포지션을 사용하면 클래스 간의 결합도를 낮추고, 유연성과 재사용성을 높일 수 있습니다.

  컴포지션은 객체 지향 설계에서 매우 유용한 기법 중 하나입니다. 상속을 사용할 때 발생할 수 있는 여러 문제를 해결하고, 코드의 유연성과 재사용성을 높이고 싶다면 컴포지션을 활용해보세요!
