var store = [{
        "title": "Calculate 구현하기",
        "excerpt":"패스트 캠퍼스 강의를 듣고 공부 겸 기억하려고 작성하는 글 입니다. 10개 프로젝트로 완성하는 백엔드 웹개발(Java/Spring) 초격차 패키지 Online. Part 1. 나만의 MVC 프레임워크 만들기 / 홍종완 강사님 취업을 했어도 역시 공부를 꾸준히 해야되는것같아요. 특히나 백엔드 초격차 강의들은 꿀같은 강의가 너무많아서 듣고 따라하기만 해도 코드의 질이 많이 올라가는것 같습니다. 😍 Test...","categories": ["Java","TDD"],
        "tags": ["Interface","refactoring","TDD"],
        "url": "http://localhost:4001/java/tdd/Calculate-%EA%B5%AC%ED%98%84-%EB%B0%8F-%EB%A6%AC%ED%8C%A9%ED%86%A0%EB%A7%81/",
        "teaser": null
      },{
        "title": "MapStruct",
        "excerpt":"MapStruct → Java bean 유형 간의 매핑 구현을 단순화하는 코드 생성기. 사용 이유 Multi-layered applications often require to map between different object models (e.g. entities and DTOs). Writing such mapping code is a tedious and error-prone task. MapStruct aims at simplifying this work by automating it as much as possible....","categories": ["Java"],
        "tags": ["MapStruct"],
        "url": "http://localhost:4001/java/MapStruct/",
        "teaser": null
      },{
        "title": "SQL explain",
        "excerpt":"정말 오랫만에 올리는 포스팅 입사 4개월차인데 아직까지도 JPA DB는 매우매우 어렵습니다. 그러나 이대로 공부 안하면 정말 도태개발자가 될것같아서 끄적끄적 기록해봅니다. SQL 실행계획을 보면서 인덱스를 짜야하는데 explain이 뭔지 아에 모르는 상태에서 기록하는 글 이기때문에 부족할수도있습니다. SQL explain 간단히 말해서 어떤 쿼리를 실행 할 것인지 실행계획을 알고 싶을때의 명령어이다. DDL 문 앞에...","categories": ["SQL"],
        "tags": ["explain","DataBase"],
        "url": "http://localhost:4001/sql/SQL-explain/",
        "teaser": null
      },{
        "title": "Index",
        "excerpt":"인덱스를 부랴부랴 공부하기 위해서 쓰는 글 My SQL 08강 인덱스를 정리 해 보았습니다. # 랜덤 I/O와 순차 I/O 랜덤 I/O : 하드 디스크 드라이버의 플래터(원판)을 돌려서 읽어야 할 데이터가 저장된 위치로 디스크 헤더를 이동시킨다음 데이터를 읽는 것을 의미 순차 I/O 또한 작업과정은 같다. 순차 I/O는 3개의 페이지를 디스크에 기록하기 위해...","categories": ["SQL"],
        "tags": ["index","DataBase"],
        "url": "http://localhost:4001/sql/Index/",
        "teaser": null
      },{
        "title": "이펙티브 자바 2장 - 객체 생성과 파괴",
        "excerpt":"이펙티브 자바를 보고 정리한 글 입니다. 생성자 대신 정적 팩토리 메서드를 고려하라 정적 팩토리 메서드 : 클래스의 인스턴스를 반환하는 단순한 정적 메서드 장점 이름을 가질 수 있다. 호출 될 때마다 인스턴스를 새로 생성하지 않아도 된다. 반환 타입의 하위 타입의 객체를 반환할 수 있는 능력이 있다. 입력 매개변수에 따라 매번 다른...","categories": ["Java"],
        "tags": ["effective java"],
        "url": "http://localhost:4001/java/%EC%9D%B4%ED%8E%99%ED%8B%B0%EB%B8%8C%EC%9E%90%EB%B0%94-2%EC%9E%A5-%EA%B0%9D%EC%B2%B4-%EC%83%9D%EC%84%B1%EA%B3%BC-%ED%8C%8C%EA%B4%B4/",
        "teaser": null
      },{
        "title": "이펙티브 자바 3장 - 모든 객체의 공통 메서드",
        "excerpt":"이펙티브 자바를 보고 정리한 글 입니다. # equals는 일반 규약을 지켜 재정의하라 equals 메서드는 재정의하기 쉬워보이지만 자칫하면 끔찍한 결과를 초래한다. 아래에 열거한 상황 중 하나에 해당한다면 재정의 하지 않는것이 최선이다. 각 인스턴스가 본질적으로 고유하다. 인스턴스의 ‘논리적 동치성’을 검사할 일이 없다. 동치관계란 ? 집합을 서로 같은 원소들로 이루어진 부분집합으로 나누는 연산...","categories": ["Java"],
        "tags": ["effective java"],
        "url": "http://localhost:4001/java/%EC%9D%B4%ED%8E%99%ED%8B%B0%EB%B8%8C%EC%9E%90%EB%B0%94-3%EC%9E%A5-%EB%AA%A8%EB%93%A0-%EA%B0%9D%EC%B2%B4%EC%9D%98-%EA%B3%B5%ED%86%B5-%EB%A9%94%EC%84%9C%EB%93%9C/",
        "teaser": null
      },{
        "title": "이펙티브 자바 4장 - 클래스와 인터페이스",
        "excerpt":"이펙티브 자바를 보고 정리한 글 입니다. 클래스와 멤버의 접근 권한을 최소화 하라 어설프게 설계된 컴포넌트와 아닌 컴포넌트의 차이는 클래스 내부 데이터/ 구현정보를 외부 컴포넌트로 부터 얼마나 잘 숨겼느냐다. 정보은닉, 즉 캡슐화 라는 이 개념은 소프트웨어의 근간이 되는 정보다. 정보은닉의 장점 시스템 개발 속도를 높인다. 여러 컴포넌트를 병렬로 개발할 수 있기...","categories": ["Java"],
        "tags": ["effective java"],
        "url": "http://localhost:4001/java/%EC%9D%B4%ED%8E%99%ED%8B%B0%EB%B8%8C%EC%9E%90%EB%B0%94-4%EC%9E%A5-%ED%81%B4%EB%9E%98%EC%8A%A4%EC%99%80-%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4/",
        "teaser": null
      },{
        "title": "이펙티브자바 5장 - 제네릭",
        "excerpt":"이펙티브 자바를 보고 정리한 글 입니다. 로 타입은 사용하지 말라 클래스와 인터페이스 선언에 타입 매개변수가 쓰이면 이를 제네릭클래스, 제네릭 인터페이스라고 한다. 제네릭클래스 제네릭 인터페이스를 통틀어 제네릭 타입이라고 한다. 제네릭 타입을 하나 정의하면 그에 딸린 로 타입(raw type)도 함께 정의된다. 로 타입이란 제네릭 타입에서 타입 매개변수를 전혀 사용하지 않을 때를 말한다....","categories": ["Java"],
        "tags": ["effective java"],
        "url": "http://localhost:4001/java/%EC%9D%B4%ED%8E%99%ED%8B%B0%EB%B8%8C%EC%9E%90%EB%B0%94-5%EC%9E%A5-%EC%A0%9C%EB%84%A4%EB%A6%AD/",
        "teaser": null
      },{
        "title": "이펙티브자바 6장  - 열거 타입과 애너테이션",
        "excerpt":"이펙티브 자바를 보고 정리한 글 입니다. 이전에 패스트 캠퍼스를 보고 배웠던 Enum에 abstract 메서드를 사용하는 부분이 나와서 반가웠습니다 ^^. int 상수 대신 열거타입을 사용하라 열거 타입은 일정 개수의 상수값을 정의한 다음, 그 외의 값은 허용하지 않는 타입이다. 사계절, 태양계의 행성, 카드게임의 카드 종류 등이 좋은 예시다. 열거 타입 자체는 클래...","categories": ["Java"],
        "tags": ["effective java"],
        "url": "http://localhost:4001/java/%EC%9D%B4%ED%8E%99%ED%8B%B0%EB%B8%8C%EC%9E%90%EB%B0%94-6%EC%9E%A5-%EC%97%B4%EA%B1%B0-%ED%83%80%EC%9E%85%EA%B3%BC-%EC%95%A0%EB%84%88%ED%85%8C%EC%9D%B4%EC%85%98/",
        "teaser": null
      },{
        "title": "이펙티브자바 7장  - 람다와 스트림",
        "excerpt":"이펙티브 자바를 보고 정리한 글 입니다. 람다와 스트림 익명 클래스보다는 람다를 사용하라 익명 클래스의 인스턴스를 함수 객체로 사용 - 낡은 기법 Collections.sort(words, new Comparator&lt;String&gt;() { public int compare(String s1, String s2) { return Integer.compare(s1. length(), s2. length ()); } }) ; 람다식을 함수 객체로 사용 - 익명 클래스 대체 Collections.sort...","categories": ["Java"],
        "tags": ["effective java"],
        "url": "http://localhost:4001/java/%EC%9D%B4%ED%8E%99%ED%8B%B0%EB%B8%8C%EC%9E%90%EB%B0%94-7%EC%9E%A5-%EB%9E%8C%EB%8B%A4%EC%99%80-%EC%8A%A4%ED%8A%B8%EB%A6%BC/",
        "teaser": null
      },{
        "title": "이펙티브자바 8장  - 메서드",
        "excerpt":"이펙티브 자바를 보고 정리한 글 입니다. 메서드와 생성자 대부분은 입력 매개변수의 값이 특정 조건을 만족하기를 바란다. 예컨데 인덱스 값은 음수이면 안되며, 객체 참조는 null이 아니어야 하는 식이다. 이런 제약은 반드시 문서화해야 하며 메서드 몸체가 시작되기 전에는 검사 해야한다. 이는 “오류는 가능한 한 빨리 (발생한 곳에서) 잡아야 한다”는 일반 원칙의 한...","categories": ["Java"],
        "tags": ["effective java"],
        "url": "http://localhost:4001/java/%EC%9D%B4%ED%8E%99%ED%8B%B0%EB%B8%8C%EC%9E%90%EB%B0%94-8%EC%9E%A5-%EB%A9%94%EC%84%9C%EB%93%9C/",
        "teaser": null
      },{
        "title": "테코톡 정리 - 01",
        "excerpt":"어쩌다보니 6개월차가 되었습니다. 싱숭생숭합니다. 꾸준히 공부해야합니다 ㅜㅜ! 테코톡 정리 쿠키 vs 세션 vs 토큰 vs 캐시 쿠키 : 사용자에 의해 조작되어도 크게 문제되지 않을 정보를 브라우저에 저장 세션 : 인증에 대한 정보를 서버가 저장 토큰 : 인증에 대한 정보를 사용자가 저장 캐시 : 한번 전송받은 데이터를 저장해 놨다가 필요할때 꺼내쓰기...","categories": ["테코톡"],
        "tags": ["테코톡","CI/CD","쿠키","세션","토큰","캐시"],
        "url": "http://localhost:4001/%ED%85%8C%EC%BD%94%ED%86%A1/%ED%85%8C%EC%BD%94%ED%86%A1-%EC%A0%95%EB%A6%AC-01/",
        "teaser": null
      },{
        "title": "테코톡 정리 - 02",
        "excerpt":"어렵지만 뿌듯합니다. 테코톡 정리 Nginx 누군가가 Nginx(엔진엑스)가 무엇이냐고 물어본다면? 엔진엑스는 웹서버, 리버스 프록시, 로드밸런서 그리고 http 캐시로도 쓰일 수 있는 소프트웨어이고, 요청에 응답하기 위해 이벤트 기반 구조를 채택했고 덕분에 현재 웹서버 분야에서 1등을 하고 있다고 답할 수 있다. 그렇다면 이벤트 기반 구조의 어떤 점이 좋아서 엔진엑스를 선택했는지, 그리고 웹서버에서 제일...","categories": ["테코톡"],
        "tags": ["테코톡","Nginx"],
        "url": "http://localhost:4001/%ED%85%8C%EC%BD%94%ED%86%A1/%ED%85%8C%EC%BD%94%ED%86%A1-%EC%A0%95%EB%A6%AC-02/",
        "teaser": null
      },{
        "title": "인프라 정리 - 01",
        "excerpt":"갈길이 너무 멀다!!! ✅ 톰캣은 동기식이다? “톰캣은 동기식이다”라는 말은 톰캣(Tomcat) 웹 서버가 동기식(synchronous)으로 요청을 처리한다는 것을 의미합니다. 동기식 처리는 요청이 도착하면 해당 요청을 즉시 처리하고, 그 결과를 반환하기 전까지는 다른 요청을 처리하지 않는 방식을 말합니다. 톰캣은 주로 단일 스레드 모델(single-threaded model)을 사용하여 요청을 처리합니다. 이는 각 요청이 순차적으로 처리되며, 한 번에...","categories": ["인프라"],
        "tags": ["인프라","WAS","웹 서버","로드밸런서"],
        "url": "http://localhost:4001/%EC%9D%B8%ED%94%84%EB%9D%BC/%EC%9D%B8%ED%94%84%EB%9D%BC-%EC%A0%95%EB%A6%AC/",
        "teaser": null
      },{
        "title": "컴포지션(Composition)",
        "excerpt":"abstract 관련 공부를 하다 상속이 캡슐화를 깬다는 문장을 보고 검색하다가 컴포지션이 뭐지? 하고 생각하다가 작성하게 되었습니다. (의식의흐름) (참고로 상속이 캡슐화를 꺤다는 것은 는 이미 구현된 class의 상속을 지양하라는 의미라고 합니다. 구현이 되어있는 class를 상속하여 재정의할 경우 캡슐화가 깨져버리니까요.) # 컴포지션(Composition)이란? 컴포지션은 객체 지향 프로그래밍에서 클래스들을 설계할 때 사용하는 기법 중...","categories": ["Java"],
        "tags": ["Composition"],
        "url": "http://localhost:4001/java/%EC%BB%B4%ED%8F%AC%EC%A7%80%EC%85%98(Composition)/",
        "teaser": null
      },{
        "title": "다양한 자연어 처리 기술",
        "excerpt":"짧다면 짧고 길다면 긴 1년이 지났습니다. 여러 신기술을 보던 중 관심이 생긴 AI에 대해서 찍먹 해보려고 적어보는 포스팅입니다. 🥹 한글부터도 너무나 어려운데 언어는 얼마나 어려울지.. 다양한 자연어 처리 기술 자연어 생성 모델: 자연어 생성 모델은 입력 데이터를 바탕으로 인간이 이해할 수 있는 자연어 텍스트를 생성하는 모델 GPT와 같은 Transformer 기반...","categories": ["AI","Transfomer","자연어"],
        "tags": ["GPT"],
        "url": "http://localhost:4001/ai/transfomer/%EC%9E%90%EC%97%B0%EC%96%B4/%EB%8B%A4%EC%96%91%ED%95%9C-%EC%9E%90%EC%97%B0%EC%96%B4-%EC%B2%98%EB%A6%AC-%EA%B8%B0%EC%88%A0/",
        "teaser": null
      },{
        "title": "Spring Batch 기초 지식 및 아키텍쳐",
        "excerpt":"Spring Batch 스프링 배치를 담당해서 업무를 한적은 없고, 기본적인 배치에 대한 지식도 없기 때문에 기초를 다질려고 작성하는 글 입니다. 😃 퇴사하기 전에 멀티 데이터 베이스를 연결하고 Mybatis JPA로 마이그레이션을 했는데 배치로도 마이그레이션이 가능하다니.. 배치로 마이그레이션을 했다면 더 재밌고 뿌듯했을것같아 조금 아쉬운 밤이네요. 코드로 이관하기보단 Glue나 다른 프레임 워크들을 사용해서 이관해보고...","categories": ["Spring Framework","Batch"],
        "tags": ["Spring Batch","대용량 데이터 처리"],
        "url": "http://localhost:4001/spring%20framework/batch/Spring-Batch/",
        "teaser": null
      },{
        "title": "MSA",
        "excerpt":"소프트웨어 아키텍처에 속하는 서비스 지향 아키텍쳐인 MSA에 대해 작성하였습니다. MSA란? MSA는 Microservices Architecture(마이크로서비스 아키텍처)의 약어이다. 마이크로서비스 아키텍처는 단일한 큰 애플리케이션을 여러 개의 작은 서비스로 분리하는 소프트웨어 설계 패턴, 이 각각의 작은 서비스들은 독립적으로 배포, 확장, 관리 가능하다. MSA의 특징 서비스 독립성: 각 서비스는 독립적으로 개발, 배포, 확장 가능하다. 기술 다양성:...","categories": ["소프트웨어 아키텍처","서비스 지향 아키텍처"],
        "tags": ["MSA"],
        "url": "http://localhost:4001/%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98/%EC%84%9C%EB%B9%84%EC%8A%A4%20%EC%A7%80%ED%96%A5%20%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98/MSA/",
        "teaser": null
      },{
        "title": "JenKins, Docker 그리고 Kubernetes",
        "excerpt":"JenKins, Docker 그리고 Kubernetes 이 전 프로젝트 할 당시엔 CI/CD 파이프라인 구축과 무중단 배포를 Github Actions과 Nginx만으로 구성했었기 때문에 젠킨스, 도커, 쿠버네티스에 대해서 정확히 어떠한 역할을 하는 도구인지 알지 못하여서 각각의 개념을 정리하기 보다는 개인적인 궁금증, 세개의 도구들의 흐름 및 새로 추가된 개념을 기존 지식이랑 정리 겸 작성하는 글 이고,...","categories": ["Jenkins","Docker","Kubernetes","DevOps","CI/CD","컨테이너"],
        "tags": ["MSA"],
        "url": "http://localhost:4001/jenkins/docker/kubernetes/devops/ci/cd/%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88/Jenkins,-Docker-%EA%B7%B8%EB%A6%AC%EA%B3%A0-Kubernetes/",
        "teaser": null
      },{
        "title": "Git 로컬 삭제, 깃 커밋 안하고 저장, 깃 저장 안함, 깃 로컬 복구, Git 로컬 삭제 파일 복구, 깃 로컬 파일 복구",
        "excerpt":"일단 이 방법은 아래 조건에 해당하시는 분만 복구 가능합니다.🥹👍🏻 commit 을 안하고 pull 이나 rebase 등 파일이 지워진 경우 인텔리제이 사용하시는 분 그냥 뻘짓하다가 로컬 파일 삭제한 경우 집중해서 일하다가 커밋을 까먹었거나 혹은 깃이 익숙치 않아서 삽질하다가 파일이 다 날라가버렸다던가 뭐 버전관리 하다가 명령어 잘못 쳤다던가.. 저도 깃을 다루는데에 왕고수는...","categories": ["Git"],
        "tags": ["Git 로컬 삭제","깃 커밋 안하고 저장","깃 저장 안함","깃 로컬 복구","Git 로컬 삭제 파일 복구","깃 로컬 파일 복구","깃 파일 되돌리기"],
        "url": "http://localhost:4001/git/Git-%EB%A1%9C%EC%BB%AC-%EC%82%AD%EC%A0%9C,-%EA%B9%83-%EC%BB%A4%EB%B0%8B-%EC%95%88%ED%95%98%EA%B3%A0-%EC%A0%80%EC%9E%A5,-%EA%B9%83-%EC%A0%80%EC%9E%A5-%EC%95%88%ED%95%A8,-%EA%B9%83-%EB%B3%B5%EA%B5%AC,-Git-%EC%82%AD%EC%A0%9C-%ED%8C%8C%EC%9D%BC-%EB%B3%B5%EA%B5%AC-01/",
        "teaser": null
      }]
