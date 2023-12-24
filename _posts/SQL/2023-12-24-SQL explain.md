---
title: "SQL explian"
categories:

- SQL
  tags:
- explain
- DataBase
  toc: true
  toc_sticky: true
  toc_label: ""
  toc_icon: ""

---

#    

---

정말 오랫만에 올리는 포스팅

입사 4개월차인데 아직까지도 JPA DB는 매우매우 어렵습니다.

그러나 이대로 공부 안하면 정말 도태개발자가 될것같아서 끄적끄적 기록해봅니다.

SQL 실행계획을 보면서 인덱스를 짜야하는데 explain이 뭔지 아에 모르는 상태에서 기록하는 글 이기때문에 부족할수도있습니다.

---

- SQL explain
    - 간단히 말해서 어떤 쿼리를 실행 할 것인지 실행계획을 알고 싶을때의 명령어이다.
    - DDL 문 앞에 explain을 입력하면

  | id | select_type | table | partitions | type | possible_keys |
        | --- | --- | --- | --- | --- | --- |
  | key | key_len | ref | rows | filtered | Extra |

  이런식의 실행계획이 나온다.

여기서 저는 key, rows, extra 를 중요시 봅니다.

- key는 쿼리문을 실행시킨 key를 보여줍니다. 이걸 통해 어떤키가 사용됐는지 알 수 있습니다.
- rows는 반환된 행의 예상 수를 나타냅니다. 예상된 행 수는 옵티마이저가 사용되는 통계와 인덱스 정보를 기반으로 계산됩니다. 값이 적을수록 쿼리가 빨리 수행될 가능성이 높고 많게 나올수록 full scan이
  됐다는 의미라고 생각합니다.(아닐수도있음)
- extra 는 명령의 결과에서 각 실행 계획 단계에 대한 추가 정보를 제공하는 부분입니다. extra 에 표시되는 값들은 해당 실행 계획 단계에 대한 특수한 정보를 나타내며, 다양한 데이터베이스 시스템에서는
  다양한 값들이 포함될 수 있습니다.

  이 부분은 피터님의 글을 보고 도움이 많이 됐습니다.<br>

---
[[SQL튜닝] MySQL 쿼리 튜닝, 쿼리 실행계획, Explain](https://peterica.tistory.com/417)
<br>
---
저는 쿼리를 실행하면서 using temporary를 본적이 몇번 있었는데 대부분이 서브쿼리, distinct, groupby를 사용하면 using temporary가 extra에 뜨더군요. 이를 보고
어떤부분에서 쿼리를 튜닝해야 되는지 알 수 있습니다.

아직 explain을 보고 쿼리를 개선한 경험이 적지만 그래도 튜닝을 하면서 결과를 확인하게되니 눈에 결과가 확확 보여서 튜닝이 잘 되고있는지 확인이 되어서 좋은 것 같습니다.

짧은 글 이지만 다들 이브 잘 보내시고, 쉬엄쉬엄 공부하시길 바랍니다 ^^
