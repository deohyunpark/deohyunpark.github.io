---
title: "Calculate 구현하기"
categories:
  - Java
  - TDD
tags:
  - Interface
  - refactoring
  - TDD
toc: true
toc_sticky: true
toc_label: ""
toc_icon: ""
---

 `패스트 캠퍼스 강의를 듣고 공부 겸 기억하려고 작성하는 글 입니다.`<br>
 - 10개 프로젝트로 완성하는 백엔드 웹개발(Java/Spring) 초격차 패키지 Online. 
 <br>Part 1. 나만의 MVC 프레임워크 만들기  / `홍종완` 강사님<br>

<Hr>

취업을 했어도 역시 공부를 꾸준히 해야되는것같아요.<br>
특히나 백엔드 초격차 강의들은 꿀같은 강의가 너무많아서 듣고 따라하기만 해도 코드의 질이 많이 올라가는것 같습니다. 😍
<Hr>
<Hr>

### Test 코드 먼저 작성하기
저는 이 전에 팀 프로젝트, 토이프로젝트를 쫌쫌따리 해봤었지만 테스트 주도 개발을 해본적이없었습니다.<br>
TDD 라는 개념도 몰랐었고, 알게 되었다고 해도 이미 저는 냅다 코드를 작성하는 버릇이 생겼었기 때문에 테스트 코드를 먼저 작성하고 테스트하는게 여간 힘든게 아니였습니다.<br>
결론적으로 든 생각은 아주 쉬운것부터 학습하고 따라하다보면 그렇게 어려운게 아니라는 생각이 들었습니다. <br>
물론 서비스, 컨트롤러 층의 테스트 코드 작성하는건 아직도 어렵긴합니다. (특히 시큐리티..) <br>
그런데 이번 강의는 저같이 TEST 코드를 작성하는게 어려운 분들에게 조금이나마<br> 쉽고
까다롭지 않은 방법을 알려주셔서 도움이 많이 되었습니다! <br>각설하고 시작하겠습니다. 


```java

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.DisplayName;

public class CalculateTest {

    @DisplayName("사칙 연산을 수행한다")
    @Test
    void calculateTest() {
        
        int calculateResult = Calculator.calculate(2, "+", 1);

        assertThat(calculateResult).isEqualTo(3);
    }
}
```
@DisplayName 은 말그대로 어떤것을 테스트 할 지 이름을 적을 수 있는 어노테이션 입니다.<br>
테스트 코드는 일단 내가 뭘 구현할지 껍데기부터 작성해주고 차차 만들어나가면 됩니다.<br>
저는 연산할 숫자와 연산자를 넣었을 때 해당 연산자에 따라 사칙연산을 수행해주는 메서드를 만들고 싶습니다.<br>
그 메서드가 있다고 가정했을때, **assertThat** 을 통해 해당 메서드의 결과와 내가 예측한 결과가 같은지 검증하는게 calculateTest 입니다.

어느정도 틀이 생성되었다면 현재의 테스트 코드도 조금 수정 해주겠습니다.
``` java
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.DisplayName;

public class CalculateTest {

    @DisplayName("사칙 연산을 수행한다")
    @Test
    void calculateTest(int operand1, String operator, int operand2) {
        
        int calculateResult = Calculator.calculate(operand1, operator, operand2);

        assertThat(calculateResult).isEqualTo(result);
    }
}
```
어떤 기능을 구현할지, 변수가 이러이러한게 들어가겠다 정립이 되었습니다.<br> 
calculateTest 는 operand1, operand2 (숫자) 와 operator(연산자, Ex : +,-,/,*) 그리고 result 를 변수를 갖고있는 메서드입니다.<br>
Test를 돌려보면, 지금은 Calculator Class도 없고 caculate 메서드도 없으니 당연히 테스트 결과는 Fail 입니다.

해당 클래스부터 생성하겠습니다.

### Calculator Class 생성

```java

public class Calculator {

    public static int calculate(int operand1, String operator, int operand2) {
        if (operator.equals("+")) {
            return operand1 + operand2;
        } else if (operator.equals("-")) {
            return operand1 - operand2;
        } else if (operator.equals("*")) {
            return operand1 * operand2;
        } else if (operator.equals("/")) {
            return operand1 / operand2;
        }

        return 0;
    }
}
```

Calculator 클래스를 생성해주고 사칙연산을 해주는 calculate 메서드를 생성했습니다.<br>
해당 메서드는 처음 테스트 코드를 생성했을때 생각했던 그대로 연산할 숫자(operand)들과 연산자(operator)을 변수로 받고, 연산자들이 어떤 연산자인지 equals 로 비교해 일치하는 연산을 수행하는 메서드입니다.
다시한번 테스트를 돌려본다면 결과는 PASS 입니다.<br>
**더하기 연산에 대해서만요!**<br>
작성한 테스트 코드는 더하기 연산만 검증을 하는 테스트코드입니다. 이또한 개선 여지가 있겠지요?
``` java
import com.example.calculate.refactor.first.Calculator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.params.provider.Arguments.arguments;

public class CalculateTest {

    @DisplayName("사칙 연산을 수행한다")
    **@ParameterizedTest**
    **@MethodSource("formulaAndResult")**
    void calculateTest(int operand1, String operator, int operand2, int result) {
        
        int calculateResult = Calculator.calculate(operand1, operator, operand2);

        assertThat(calculateResult).isEqualTo(result);
    }

    private static Stream<Arguments> formulaAndResult() {
        return Stream.of(
                arguments(1, "+", 2, 3),
                arguments(5, "-", 3, 2),
                arguments(4, "*", 2, 8),
                arguments(4, "/", 2, 2)
        );
    }
}

```
차이점이 보이시나요? 기존의 @Test 어노테이션을 빼고 **@ParameterizedTest**
**@MethodSource()** 을 적용했습니다.<br> @ParameterizedTest 은 뜻 그대로 파라미터를 받아 테스트를 도와주는 어노테이션이고<br> @MethodSource는 주입받을 파라미터를 메서드로 받아 테스트를 도와주는 메서드입니다.<br>
저는 Stream으로 각 Arguments들을 리턴해주는 formulaAndResult()를 생성 후, 해당 메서드를 테스트 파라미터로 넣었습니다.<br>
수정 후 다시 테스트를 돌려봐도 성공입니다! 인자를 메서드로 주입받으니 든든합니다.<br>
지금부터는 사칙연산 메서드를 리팩토링을 했을때 테스트코드의 성공 실패만 따지면 됩니다.<br>
계속 성공하면 리팩토링한게 문제가 없다는거고, 실패를 한다면.. 리팩토링이 제대로 되지 않았다는 의미입니다.<br>

다시 Calculator Class 로 돌아가서,
```java

public class Calculator {

    public static int calculate(int operand1, String operator, int operand2) {
        if (operator.equals("+")) {
            return operand1 + operand2;
        } else if (operator.equals("-")) {
            return operand1 - operand2;
        } else if (operator.equals("*")) {
            return operand1 * operand2;
        } else if (operator.equals("/")) {
            return operand1 / operand2;
        }

        return 0;
    }
}
```


지금의 calculate 메서드도 기능은 제대로 돌아가지만 개선 요소가 많습니다.<br> 하드코딩에 예외처리가 제대로 되어있지 않습니다...<br>
해당 메서드는 연산자를 변수로 받고 `해당 연산자가 사칙연산자 중 어떤 연산자와 일치하는지에 따라` 로직이 달라지는 메서드입니다.<br>
흠.. 이거 뭔가 enum으로 해도 괜찮을것같습니다!
### 첫번째 리팩토링 
```java
public enum ArithmeticOperator {
    
        ADDITION("+"), SUBTRACTION("-"), MULTIPLICATION("*"), DIVISION("/");

        ArithmeticOperator(String operator) {
            this.operator = operator;
        }
    
        public final String operator;

}

```
ArithmeticOperator 이라는 Enum 을 생성했습니다. 뭔가 느낌이 오시나요? <br>ArithmeticOperator.operator 에 따라 사칙연산을 수행해줄수있도록 하면 될것같습니다.

해당 Enum에 추상 메서드를 추가해보겠습니다.



```java
public enum ArithmeticOperator {
    ADDITION("+") {
        @Override
        public int arithmeticCalculate(int operand1, int operand2) {
            return operand1 + operand2;
        }
    }, SUBTRACTION("-"){
        @Override
        public int arithmeticCalculate(int operand1, int operand2) {
            return operand1 - operand2;
        }
    }, MULTIPLICATION("*") {
        @Override
        public int arithmeticCalculate(int operand1, int operand2) {
            return operand1 * operand2;
        }
    }, DIVISION("/") {
        @Override
        public int arithmeticCalculate(int operand1, int operand2) {
            return operand1 / operand2;
        }
    };

    ArithmeticOperator(String operator) {
        this.operator = operator;
    }

    public final String operator;

    public abstract int arithmeticCalculate(final int operand1, final int operand2);

    public static int calculate(int operand1, String operator, int operand2) {
        ArithmeticOperator arithmeticOperator = Arrays.stream(values())
                .filter(v -> v.operator.equals(operator))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("올바른 사칙 연산이 아닙니다."));

        return arithmeticOperator.arithmeticCalculate(operand1, operand2);
    }
}

```
final int operand 들을 인자로 받는 추상메서드 arithmeticCalculate 를 생성했습니다.<br>
각각 사칙연산자들은 int를 변수로 받는건 동일하지만 내부적인 동작들은 다르기때문에 추상메서드를 생성해 이를 상속받아 구현할 수 있도록 하였습니다.<br>
강의를 보고 감동받고 머리를 얻어맞은기분이였어요.<br> java를 공부하면서 또 면접준비를 하면서 그~렇게나 많이 봤던 개념들인데 너무너무 새롭고 저는 아직 멀었다는 생각을 했답니다.
Enum 에 추상메서드를 생성하고 enum 마다 상속받아 구현한다라?.. <br>해당 강사님의 강의를 끝까지 봐야겠다는 생각이 엄청나게 들었습니다.<br>

그리고 calculate 메서드를 보면, 스트림을 통해 변수로 들어온 연산자를 ArithmeticOperator 에 해당되는 연산자인지  <br>equals로 비교 후해당되는게 없으면 exception을 반환하고, 
올바른 연산자일 경우에만 각각의 연산자마다 구현한 arithmeticCalculate 메서드를 실행하여 결과를 return 하는 메서드입니다.<br>
stream을 사용하니 가독성도 좋고 깔끔합니다! <br>

다시 또 기존의 Calculator Class를 수정해주겠습니다.

```java


public class Calculator {

    public static int calculate(int operand1, String operator, int operand2) {
        ArithmeticOperator.calculate(operand1, operator, operand2);
    }
}

```
첫번째 리팩토링 후 다시 테스트코드를 돌린 결과는 성공입니다!<br>
리팩토링이 잘된거겠죠?
기존의 예외처리가 안되었던 부분이나 하드코딩으로 기능을 구현했던 부분이 개선이되었습니다! <br>짱짱!

하지만 좀 더 객체지향적으로 리팩토링이 가능합니다!
**바로 클래스 분리!**

### 두번째 리팩토링
더하기, 빼기, 곱하기, 나누기 연산을 할때 공통적인 부분을 뽑자면, 먼저 변수로 들어온 연산자가 어떤 연산자와 일치하는지 부터 검증을 해야겠죠? <br>
또한 해당 검증 후 일치하는 연산자를 통해 인자끼리 연산하는 로직이 필요합니다. <br>
이러한 부분이 네가지 연산들의 공통점이라면, 이또한 `인터페이스` 로 뺄 수 있을 것 같습니다.

NewArithmeticOperator 라는 interface 를 생성 해 주겠습니다. 
```java

public interface NewArithmeticOperator {

    boolean support(String operator);

    int calculate(int operand1, int operand2);
}

```

support() 는 변수로 들어온 연산자가 일치하는지 T/F 를 반환해주고, calculate() 는 기존과 똑같이 연산 후 값을 반환하는 메서드 입니다.
<br>
이제 더하기, 빼기, 곱하기, 나누기 의 각각의 Class를 생성 후 인터페이스를 상속 받아 구현 해보겠습니다.
```java


public class AdditionOperator implements NewArithmeticOperator {
    @Override
    public boolean support(String operator) {
        return operator.equals("+");
    }

    @Override
    public int calculate(int operand1, int operand2) {
        return operand1 + operand2;
    }
}




public class SubtractionOperator implements NewArithmeticOperator {
    @Override
    public boolean support(String operator) {
        return operator.equals("-");
    }

    @Override
    public int calculate(int operand1, int operand2) {
        return operand1 - operand2;
    }
}



public class MultiplicationOperator implements NewArithmeticOperator{
    @Override
    public boolean support(String operator) {
        return operator.equals("*");
    }

    @Override
    public int calculate(int operand1, int operand2) {
        return operand1 * operand2;
    }
}



public class DivisionOperator implements NewArithmeticOperator{
    @Override
    public boolean support(String operator) {
        return operator.equals("/");
    }

    @Override
    public int calculate(int operand1, int operand2) {
        return operand1 / operand2;
    }
}

```

각각의 연산을 담당하는 Class를 생성 했습니다! 어떠신가요? 이 전에는 Enum 에 모든 기능을 넣어놨다면, <br>지금은 어떤 로직을 수행하느냐에 따라 Class로 분리 후 <br>
각각의 공통되는 기능을 뽑아 interface로 만들고 상속받아 메서드를 구현할 수 있도록 하였습니다.<br>
각각의 기능별로 클래스를 나누었고 이에 따라 변경점이 생겼으니, 기존의 Calculator Class 도 수정을 해야겠습니다.<br>

```java
import java.util.ArrayList;
import java.util.List;

public class Calculator {
    
    public static final List<NewArithmeticOperator> CALCULATOR = List.of(new AdditionOperator(), new SubtractionOperator(), new MultiplicationOperator(), new DivisionOperator());
    
    public static int calculate(int operand1, String operator, int operand2) {
        return CALCULATOR.stream()
                .filter(newArithmeticOperator -> newArithmeticOperator.support(operator))
                .map( newArithmeticOperator -> newArithmeticOperator.calculate(operand1, operand2))
                .findFirst()
                .orElseThrow( () -> new IllegalArgumentException("올바른 사칙연산이 아닙니다."));
        
    }
}

```
NewArithmeticOperator 를 상속받아 구현한 AdditionOperator, SubtractionOperator, MultiplicationOperator, DivisionOperator 객체들을 List로 받아 <br>
Stream 을 이용하여 support와 calculate 메서드를 수행 할 수 있도록 리팩토링을 하였습니다. <br>
이번에도 Test를 돌려보면 PASS가 나옵니다! 두번째 리팩토링도 문제가 없이 완료가 되었으니까요. <br>
저는 첫번째 리팩토링도 배울점이 많았는데, 두번째 리팩토링도 객체지향적으로 개선이 된 점이 눈에 띄어요!<br>
하면 할 수록 재미있는것 같습니다.
그치만, 그런 생각 들지 않으신가요?
>아..너무나도 기능위주로 구현했다..! 만약 나눗셈을 하는데 0 이 들어온다면?

맞습니다..정말 연산만 되는 계산기를 만들어 버렸어요.<br>
기능구현은 완벽하게 되었지만, 어떠한 케이스에서 연산의 결과가 내가 생각했던 결과와 다르게 나온다면<br>
이건 끝난게 아닙니다!!! <br>

저희에게 남은 과제는 각각의 연산마다 어떠한 인자를 넣어도 연산을 수행해야되고, <br>조건에 맞지않다면 예외를 던져서 이상한 값이 나오지 않도록 해야합니다.
먼저 새로운 테스트 코드를 추가로 작성 해주겠습니다.<br>
```java
    @DisplayName("인자를 0으로 나누었을때 예외 발생")
    @Test
    void calculateExceptionTest() {
        assertThatCode(() -> Calculator.calculate(new PositiveNumber(10), "/", new PositiveNumber(0)))
                .isInstanceOf(IllegalArgumentException.class);
    }
```
계산기의 경우 생각해야될 케이스는 많으니, 일단 나눗셈을 할떄 0을 나누는 경우를 개선포인트로 잡아 세번째 리팩토링을 진행해보겠습니다. <br>
### 세번째 리팩토링

calculate() 의 변수로   `String` 과 `int` 가 들어오는데 연산할 때 필요한 숫자들을 `int` 가 아닌, <br> 객체를 선언하는 순간부터 Valid 체크를 하는 객체를 넣는다면? 
그렇다면 파라미터로 들어오는 객체가 생성되는 시점에 Validate가 체크되기 때문에 연산을 하는 calculate 에서 파라미터의 정합성을 체크하지 않아도 되겠죠!
<br>

그래서 새로운 객체 `PositiveNumber`을 생성해서 calculate() 의 변수에 int 대신 사용하겠습니다!

```java
public class PositiveNumber {

    private final int value;

    public PositiveNumber(int value) {
        validation(value);
        this.value = value;
    }

    private void validation(int value) {
        if (isNegativeNumber(value)) {
            throw new IllegalArgumentException("0 또는 음수 전달할 수 없습니다.");
        }
    }

    private boolean isNegativeNumber(int value) {
        return value <= 0;
    }

    public int toInt(){
        return value;
    }
}
```
PositiveNumber 는 객체를 생성함과 동시에 0보다 같거나 작으면 <br>IllegalArgumentException 을 반환하는 validation 메서드를 거치게 되어있습니다.
validation()에서 0이나 음수가 아닌 경우에만 객체를 생성 할 수 있습니다.<br>
추가로 PositiveNumber 객체 자체는 연산이 불가능 하기 떄문에, toInt()라는 메서드를 추가로 생성하여, <br>
연산이 가능 할 수 있도록 하였습니다.<br>
그럼 이제 이 PositiveNumber 를  calculate()에 적용 해 보겠습니다. <br>

```java
public interface NewArithmeticOperator {

    boolean support(String operator);

    int calculate(PositiveNumber operand1, PositiveNumber operand2);
}


public class AdditionOperator implements NewArithmeticOperator {
    @Override
    public boolean support(String operator) {
        return operator.equals("+");
    }

    @Override
    public int calculate(PositiveNumber operand1, PositiveNumber operand2) {
        return operand1.toInt() + operand2.toInt();
    }
}


public class SubtractionOperator implements NewArithmeticOperator {
    @Override
    public boolean support(String operator) {
        return operator.equals("-");
    }

    @Override
    public int calculate(PositiveNumber operand1, PositiveNumber operand2) {
        return operand1.toInt() - operand2.toInt();
    }
}


public class MultiplicationOperator implements NewArithmeticOperator{
    @Override
    public boolean support(String operator) {
        return operator.equals("*");
    }

    @Override
    public int calculate(PositiveNumber operand1, PositiveNumber operand2) {
        return operand1.toInt() * operand2.toInt();
    }
}

public class DivisionOperator implements NewArithmeticOperator{
    @Override
    public boolean support(String operator) {
        return operator.equals("/");
    }

    @Override
    public int calculate(PositiveNumber operand1, PositiveNumber operand2) {
        return operand1.toInt() / operand2.toInt();
    }
}

```

그리고 다시 테스트 코드를 돌려보면, 테스트 결과는 예상대로 무난하게 PASS 가 나옵니다.<br>
<hr>

이번 강의를 통해 껍데기의 TEST코드를 작성해서 틀을 먼저 잡아놓고, 순차적으로 기능을 구현 한 뒤 리팩토링을 거치는 방법을 학습했습니다.<br>
메서드를 통해 테스트 파라미터를 받아 테스트 코드를 작성해 놓고, 이 테스트 결과만 확인하며 리팩토링을 하는 연습을 해보니 <br>
생각보다 TDD가 어려운게 아니였다는 생각이 들었고 또한 어떤식으로 개선점을 잡아 리팩토링을 진행하면 좋을지도 느꼈습니다! 🥹<br>

제가 학습한 강의는 백엔드 초격차 강의 제일 첫번째 챕터입니다! <br>
이외에도 강사님께서 객체지향적으로 코드를 설계하고 구현하는 방법을 
자세하게 알려주시니 객체지향, TDD 에 관심이 있으신 분들에게 강추드리는 강의 입니다!<br>
강의시간도 부담스럽지 않아서 정말정말 추천드려요!! <br>





