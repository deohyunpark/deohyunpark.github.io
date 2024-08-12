---
title: Spring Batch 기초 지식 및 아키텍쳐
categories:
  - Spring Framework
  - Batch
tags:
  - Spring Batch
  - 대용량 데이터 처리 
toc: true
toc_sticky: true
toc_label: ""
toc_icon: ""
comments: true
---
Spring Batch
---
스프링 배치를 담당해서 업무를 한적은 없고, 기본적인 배치에 대한 지식도 없기 때문에 기초를 다질려고 작성하는 글 입니다. 😃<br>
퇴사하기 전에 멀티 데이터 베이스를 연결하고 Mybatis JPA로 마이그레이션을 했는데 배치로도 마이그레이션이 가능하다니.. <br>
배치로 마이그레이션을 했다면 더 재밌고 뿌듯했을것같아 조금 아쉬운 밤이네요. 코드로 이관하기보단 Glue나 다른 프레임 워크들을 사용해서 이관해보고 싶었는데 말입니다. 👍🏻

---

### 스프링 배치란?

- 대량의 데이터를 효율적으로 처리하기 위한 프레임 워크입니다.
- 스케쥴러와는 다릅니다.
    - Batch는 일괄 처리를 위한 프로그램이고 사용자의 명령이 있을 때 실행됩니다.
    - 스케쥴러는 정해진 시간에 자동으로 실행되는 프로그램 입니다. 즉, 주기적으로 실행되는 작업을 설정 가능합니다.
- 일반적으로 DB, 파일, 메시징 시스템 등에서 대량의 데이터를 읽어와 가공하고 다시 일괄처리 하는 작업을 수행합니다.
- Batch의 핵심 패턴은 DB의 ETL 개념과 비슷합니다.
    - Read : 데이터베이스, 파일, 큐에서 다양한 데이터를 조회한다.
    - Process : 특정 방법으로 데이터를 가공한다
    - Write : 데이터를 수정된 양식으로 다시 저장한다.

### 배치 애플리케이션의 조건

- 대용량 데이터: 대량의 데이터를 가져오거나, 전달하거나, 계산하는 등의 처리를 할 수 있어야 한다.
- 자동화: 심각한 에러를 제외하고는 사용자 개입 없이 실행되어야 한다.
- 신뢰성: 로깅, 알림으로 무엇이 잘못되었는지를 추적 할 수 있어야 한다.
- 성능: 지정한 시간 안에 처리가 가능해야 하고 동시에 실행되는 다른 애플리케이션을 방해하지 안도록 수행되어야 한다.

### 스프링 배치가 어떤 경우에 사용되는지?

1. 매월 말일 회계 데이터를 이전 시스템에서 새로운 시스템으로 마이그레이션하는 경우
2. 매일 밤 고객의 구매 내역을 분석하여 추천 상품을 생성하는 경우
3. 매일 업로드되는 CSV 파일을 처리하여 데이터베이스에 적재하는 경우
4. 매월 말일 원간 매출 보고서 등 비즈니스 보고서 생성하는 경우
5. 데이터 백업 및 아카이빙

## Spring Batch 아키텍쳐

![perfect_batch_architecher](https://github.com/user-attachments/assets/38661437-04ba-439c-bf5e-bfa66e92186c)

**여기서 Job, Step, Tasket 등은 배치를 특정 단계/흐름에 따라 처리하고 구성하는 도메인이고 <br>
이를 제외한 JobInstance, JobExecution, StepExecution 등은 배치 단계마다 실행 정보나 상태 등을 DB에 저장하기 위한 메타데이터 도메인이다.**

1. JobLauncher
    1. 배치 Job을 실행시키는 인터페이스
        1. **JobLauncher.run(Job, JobParamemters)**
    2. Job과 JobParameters를 인자로 받으며 요청된 배치 작업을 수행한 후 최종 Client에게 JobExcution을 반환함
2. Job
    1. 하나의 배치를 Job 이라는 단위로 만들어 놓은 객체
    2. 배치 처리 과정 전체 계층에서 최상단에 위치
    3. 최소 1개 이상의 Step을 가져야 한다. 이런 Step들이 모여 Job을 이루게 된다.
3. JobInstance
    1. 실제로 실행되는 배치 작업의 인스턴스를 나타낸다.
    2. 각 Job 실행마다 새로운 JobInstance가 생성
       예를들어, 하루에 Job을 여러번 실행 시키면 실행 할 때마다 새로운 JobInstance가 생성된다.
       ( 예시 :
        - JobInstance 1: userExportJob, { "date" : "2023-04-17" }
        - JobInstance 2: userExportJob, { "date" : "2023-04-17" }
        - JobInstance 3: userExportJob, { "date" : "2023-04-17" }

       만약 JobInstance 2의 데이터 가져오기가 실패했다면 JobInstance 2만 재실행 시키면 된다. 다른 시간대의 JobInstance에 영향을 미치지 않는다.)

    3. JobParameters로 구성되어 있고(1:1관계) Parameter은 Job을 구분하는 고유 식별자 역할을 한다.
    4. JobInstance는 배치 작업의 고유한 실행 단위를 나타내며, 동일한 Job Parameters를 가지면 같은 JobInstance로 간주된다.
    5. 논리적으로 Job을 실행한다. (예를들어 배치 작업에서 1,000건의 데이터를 처리하는것을 1개의 논리적 작업 실행 단위로 정의 가능 = 실제 데이터 처리 단위와는 별개로 정의)
    6. JobExecution들의 모음
4. JobExecution
    1. Job을 실행하는 단일시도에 대한 객체
    2. 실패한 JobInstance에 대해 새로운 실행을 하게 되면 새로운 JobExecution이 생성된다. *(**JobInstance는 동일한 JobParameter로는 오직 1번만 실행된다.** 하지만 동일한 Job이 실패 된다면 실패한 JobInstance를 재사용하여  여러번 Job 재실행이 가능하다. 이럴경우 **동일한 JobInstance에서 JobExecution만 새로 insert**된다. 1:N 관계)*
    3. JobInstance에 대한 상태, 시작/종료시간 등의 정보를 담음
5. Step
    1. Job을 구성하는 독립된 작업의 단위
    2. 순차적인 단계를 캡슐화함
       (ex step 1: 사과를 깎는다, step 1 : 사과를 먹는다, step 3 : 사과껍질을 버린다.)
    3. Tasklet, Chunk 두 가지의 기반이 존재함

       Job > Step > Tasklet or [Read, processing, Write] 이런 구조로 보면되고, 하나의 Tasklet과 Read, Processing, Write 묶음은 동일 레벨로 볼 수 있다.

       <img width="450" alt="스크린샷 2024-08-11 오후 10 31 03" src="https://github.com/user-attachments/assets/aaa6c47b-1380-4089-bbe5-97e45d98f65e">

       1️⃣ **Tasket 기반**

        <img width="680" alt="스크린샷 2024-08-11 오후 10 39 36" src="https://github.com/user-attachments/assets/a575a192-256e-4480-b26b-4e0711aad692">

        - Tasklet 기반 Step은 Step 이 중지될 때 까지 execute 메서드가 반복적으로 실행된다.

          즉, Tasklet은 수행 될 때 마다 **독립적인 트랜잭션**을 가진다.

        - 주로 데이터베이스 쿼리 실행같은 **간단한 작업**을 수행하거나, 초기화/정리 작업, 특정 조건에 따라 다음 Step 실행여부를 결정하거나 트랜잭션 관리 등에 적합하다.
        - Tasklet의 execute 메서드의 return 타입은 RepeatStatus.FINISHED(종료) / RepeatStatus.CONTINUABLE(재실행) 두 가지만 가능하다.

       2️⃣ **Chunk 기반**

       <img width="687" alt="스크린샷 2024-08-11 오후 10 39 48" src="https://github.com/user-attachments/assets/8a6eb41e-7904-4060-864c-347277531cc6">

        - ItemReader, ItemProsessor, ItemWriter은 종속적인 구조가 아니라 하나의 묶음으로 치환된다.
        - 일반적으로 Batch는 대용량 데이터를 다루는 케이스가 많기 때문에 Tasklet 보다 **상대적으로 트랜잭션의 단위를 짧게 하여 처리할 수 있는 Chunk 기반 Step을 사용** (Chunk의 경우엔 실패한 Chunk 만큼만 롤백이 되고, 이전 커밋된 트랜잭션 범위까지는 반영이 된다.)

          <img width="471" alt="스크린샷 2024-08-11 오후 11 39 06" src="https://github.com/user-attachments/assets/3a4085e9-fa94-455f-80bc-f1c180cccbcb">

6. StepExcution
    1. Step을 실행하는 단일시도에 대한 객체
    2. Step이 매번 시도 될 때마다 생성되며 Job에 구성된 Step 별로 생성된다.
    3. Job이 재실행 되더라도 이미 성공된 Step들은 재실행 되지 않고 실패한 Step들만 재실행된다.
    4. Step의 StepExecution이 모두 정상적으로 완료되어야 JobExecution도 정상적으로 안료된다.
    5. Step의 StepExecution 중 하나라도 실패 시 JobExcution은 실패한다. (1:N관계)

6. JobRepository
   1. 인터페이스로 배치 수행과 관련된 Meta Data(시작/실패/종료 시간, 상태, 읽기/쓰기 횟수 등)를 저장하며 배치 도메인 모델 및 관련 상태를 유지하기 위한 영구 저장소
   2. Job, JobInstance, JobExecution, StepExecution 등 배치 작업과 관련된 주요 엔티티들에 대한 CRUD 작업을 함

👍🏻 이해를 위한 흐름

![job_and_step](https://github.com/user-attachments/assets/91fbe6f6-8a0a-4038-9d9f-9bafb01f3009)

- 동일한 Job에 대한 여러 JobInstance들은 동일한 Step 구조를 가지지만, 각 JobInstance는 독립적으로 실행되고 관리됨
- Job 실행 → JobInstance 생성 → JobExecution 생성
  Step 실행 → StepExecution 생성
  StepExcution COMPLETED 반환 시 → JobExecution도 COMPLETED 반환 후 해당 Job을 성공적으로 완료함
  StepExcution FAIL 반환 시 → 재실행할 경우 JobExecution 생성 → 각 Step을 실행하고 StepExcution 생성, 모든 StepExcution이 COMPLETED이면 JobExecutopm도 COMPLETED가 된다.
- Job 실행 과정 :
    1. Job 실행 시 새로운 JobInstance가 생성
    2. 그리고 해당 JobInstance에 대한 새로운 JobExecution이 생성
    3. 각 Step이 실행되면 해당 Step에 대한 StepExecution이 생성
    4. 모든 StepExecution이 COMPLETED 상태가 되면 해당 JobExecution도 COMPLETED 상태가 된다.
- Step 실행 과정에서 실패가 발생하면:
    1. 실패한 JobExecution에 대해 재실행 할 수 있음
    2. 새로운 JobExecution이 생성되고, 각 Step이 다시 실행 됨
    3. 모든 StepExecution이 COMPLETED 상태가 되면 해당 JobExecution도 COMPLETED 상태가 된다.

## Spring Batch 기본 생성 메타 데이터

(H2의 경우에만 Boot가 자동으로 생성해주지만 그 외 MySQL이나 Oracle은 자동으로 생성 되지 않기 때문에 메타 테이블을 직접 생성하면 된다. 해당 테이블이 생성되지 않으면 Job도 실행이 안됨)

- 메타 데이터는 Job의 로그용 데이터라고 보면 된다.
- 기본 메타 데이터 테이블 구조

![jobRepository](https://github.com/user-attachments/assets/73ba40d8-9dd0-4341-8cb5-22c03424d49a)

- BATCH_JOB_INSTANCE
    - Job 실행의 단위인 JobInstance 정보를 저장
- BATCH_JOB_EXECUTION
    - JobInstance 실행 정보인 JobExecution 데이터를 저장
- BATCH_JOB_EXECUTION_PARAMS
    - JobExecution 실행 시 사용된 파라미터 정보를 저장
- BATCH_JOB_EXECUTION_CONTEXT
    - JobExecution 실행 시 사용된 컨텍스트 데이터를 저장
- BATCH_STEP_EXECUTION
    - Step 실행 정보인 StepExecution 데이터를 저장
- BATCH_STEP_EXECUTION_CONTEXT
    - StepExecution 실행 중 사용된 컨텍스트 데이터를 저장