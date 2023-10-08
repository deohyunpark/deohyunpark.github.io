---
title: "MapStruct"
categories:
  - Java, TDD, 객체지향
tags:
  - Interface, refactoring, TDD
toc: true
toc_sticky: true
toc_label: ""
toc_icon: ""
---

 패스트 캠퍼스 강의를 듣고 공부 겸 기억하려고 작성하는 글 입니다.<br>
취업을 했어도 역시 공부를 꾸준히 해야되는것같아요.<br>
특히나 백엔드 초격차 강의들은 꿀같은 강의가 너무많아서 듣고 따라하기만 해도 코드의 질이 많이 올라가는것 같습니다. 😍
<Hr>
### Test 코드 먼저 작성하기
저는 이 전에 팀 프로젝트, 토이프로젝트를 쫌쫌따리 해봤었지만 테스트 주도 개발을 해본적이없었습니다.<br>
TDD 라는 개념도 몰랐었고, 알게 되었다고 해도 이미 저는 냅다 코드를 작성하는 버릇이 생겼었기 때문에 테스트 코드를 먼저 작성하고 테스트하는게 여간 힘든게 아니였습니다.<br>
결론적으로 든 생각은 아주 쉬운것부터 학습하고 따라하다보면 그렇게 어려운게 아니라는 생각이 들었습니다. <br>
물론 서비스, 컨트롤러 층의 테스트 코드 작성하는건 아직도 어렵긴합니다. (특히 시큐리티..) <br>
그런데 이번 강의는 저같이 TEST 코드를 작성하는게 어려운 분들에게 조금이나마 쉽고 까다롭지 않은 방법을 알려주셔서 도움이 많이 되었습니다! <br>각설하고 시작하겠습니다. 


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
@DisplayName 은 말그대로 어떤것을 테스트 할 지 이름을 적을 수 있는 어노테이션 입니다. 메서드 이름 자체를 **void 사칙_연산_테스트()** 이런식으로 하시는 분들도 계시더군요.
그저 void Test() 만 아니면 될것같습니다.(베스트 케이스는 메서드 이름도 코드컨벤션에 맞게 적고 @DisplayName도 적어주는것 입니다.) Test() <- 이렇게 적으시면 안됩니다! 어떤 기능을 테스트할지 메서드에 적어주거나 영문으로 짜기가 어렵다면 해당 어노테이션으로 추가적으로 작성해야만 합니다. 혼자 공부할때나 귀찮아서 명칭을 제대로 작성하지 않으시는 분들이있다면, 안돼요!! 고쳐야합니다. 😂 <br>
물론 저같은 분이 있으실까 하지만.. 저는 참고로 취준당시 과제전형에서 테스트 코드를 전부는 아니여도 일부 작성해서 제출했었는데 그때 @DisplayName만 달고 테스트 메서드 이름을 제대로 작성안했었는데 감점요소였습니다..이제와 생각해보면 정말 바보같았지만 혹시나 저같은 분이 없으시길 바라며..<br>
<br>

테스트 코드는 일단 내가 뭘 구현할지 껍데기부터 작성해주고 차차 만들어나가면 됩니다.
저는 연산할 숫자와 연산자를 넣었을 때 해당 연산자에 따라 사칙연산을 수행해주는 메서드를 만들고 싶습니다.
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
calculateTest 는 operand1, operand2 (숫자) 와 operator(연산자, Ex : +,-,/,*) 그리고 result 를 변수를 갖고있는 메서드입니다.
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

Calculator 클래스를 생성해주고 사칙연산을 해주는 calculate 메서드를 생성했습니다.
해당 메서드는 처음 테스트 코드를 생성했을때 생각했던 그대로 연산할 숫자(operand)들과 연산자(operator)을 변수로 받고, 연산자들이 어떤 연산자인지 equals 로 비교해 일치하는 연산을 수행하는 메서드입니다.
다시한번 테스트를 돌려본다면 결과는 SUCCESS 입니다.
**더하기 연산에 대해서만요!**
제가 작성한 테스트 코드는 더하기 연산만 검증을 하는 테스트코드입니다. 이또한 개선 여지가 있겠지요?
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
    void calculateTest(PositiveNumber operand1, String operator, PositiveNumber operand2, int result) {
        
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
**@MethodSource()** 을 적용했습니다. @ParameterizedTest 은 뜻 그대로 파라미터를 받아 테스트를 도와주는 어노테이션이고 @MethodSource는 주입받을 파라미터를 메서드로 받아 테스트를 도와주는 메서드입니다.
저는 Stream으로 각 Arguments들을 리턴해주는 formulaAndResult()를 생성 후, 해당 메서드를 테스트 파라미터로 넣었습니다.
수정 후 다시 테스트를 돌려봐도 성공입니다! 인자를 메서드로 주입받으니 든든합니다.
지금부터는 사칙연산 메서드를 리팩토링을 했을때 테스트코드의 성공 실패만 따지면 됩니다.
계속 성공하면 리팩토링한게 문제가 없다는거고, 실패를 한다면.. 리팩토링이 제대로 되지 않았다는 의미입니다.

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


지금의 calculate 메서드도 기능은 제대로 돌아가지만 개선 요소가 많습니다. 하드코딩에 예외처리가 제대로 되어있지 않습니다...
해당 메서드는 연산자를 변수로 받고 해당 연산자가 사칙연산자 중 어떤 연산자와 일치하는지에 따라 로직이 달라지는 메서드입니다.
흠.. 이거 뭔가 enum으로 해도 괜찮을것같습니다!
```java
public enum ArithmeticOperator {
    
        ADDITION("+"), SUBTRACTION("-"), MULTIPLICATION("*"), DIVISION("/");

        ArithmeticOperator(String operator) {
            this.operator = operator;
        }
    
        public final String operator;

}

```
ArithmeticOperator 이라는 Enum 을 생성했습니다. 뭔가 느낌이 오시나요? ArithmeticOperator.operator 에 따라 사칙연산을 수행해줄수있도록 하면 될것같습니다.

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
final int operand 들을 인자로 받는 추상메서드 arithmeticCalculate 를 생성했습니다.
각각 사칙연산자들은 int를 변수로 받는건 동일하지만 내부적인 동작들은 다르기때문에 추상메서드를 생성해 이를 상속받아 구현할 수 있도록 하였습니다.
강의를 보고 감동받고 머리를 얻어맞은기분이였어요. java를 공부하면서 또 면접준비를 하면서 그~렇게나 많이 봤던 개념들인데 너무너무 새롭고 저는 아직 멀었다는 생각을 했답니다.
Enum 에 추상메서드를 생성하고 enum 마다 상속받아 구현한다라?.. 해당 강사님의 강의를 끝까지 봐야겠다는 생각이 엄청나게 들었습니다.

그리고 calculate 메서드를 보면, 스트림을 통해 변수로 들어온 연산자를 ArithmeticOperator 에 해당되는 연산자인지 equals로 비교 후 해당되는게 없으면 exception을 반환하고, <br>
올바른 연산자일 경우에만 각각의 연산자마다 구현한 arithmeticCalculate 메서드를 실행하여 결과를 return 하는 메서드입니다.
stream을 사용하니 가독성도 좋고 깔끔합니다! 

다시 또 기존의 Calculator Class를 수정해주겠습니다.

```java


public class Calculator {

    public static int calculate(int operand1, String operator, int operand2) {
        ArithmeticOperator.calculate(operand1, operator, operand2);
    }
}

```
첫번째 리팩토링 후 다시 테스트코드를 돌린 결과는 성공입니다!
리팩토링이 잘된거겠죠?
기존의 예외처리가 안되었던 부분이나 하드코딩으로 기능을 구현했던 부분이 개선이되었습니다! 짱짱!

하지만 좀 더 객체지향적으로 리팩토링이 가능합니다!
**바로 클래스 분리!**

