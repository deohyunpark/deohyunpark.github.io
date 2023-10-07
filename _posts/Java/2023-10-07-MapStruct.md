---
title: "MapStruct"
categories:
  - Java
tags:
  - MapStruct
toc: true
toc_sticky: true
toc_label: ""
toc_icon: ""
---


- MapStruct → Java bean 유형 간의 매핑 구현을 단순화하는 코드 생성기.<br> 
   - 사용 이유

    >   Multi-layered applications often require to map between different object models (e.g. entities and DTOs). Writing such mapping code is a tedious and error-prone task. MapStruct aims at simplifying this work by automating it as much as possible.
    >
    >
    >   In contrast to other mapping frameworks MapStruct generates bean mappings at compile-time which ensures a high performance, allows for fast developer feedback and thorough error checking.
    >

      → **객체들에 대한 mapping을 일일이 작성하는 것은 오류가 발생하기 쉬우므로, 컴파일 타임에 체크하여 에러를 줄이고 이를 최대한 자동화하여 단순화하는것을 목표로 한다.**

      : Builder , Setter 을 사용해도 큰 문제는 없지만, 필드가 늘어남에 있어서 수정 해야 될 부분이 늘어나는것은 어쩔수없는 부분인데 MapStruct를 사용하면 이런 문제를 해결 할 수 있다고 합니다.

      MapStruct는 리플렉션을 사용하지 않고 컴파일 시점에 코드를 생성하여 매핑을 수행하기 때문에, 런타임 성능이 향상되고 타입 안전성이 보장. MapStruct는 객체 간의 매핑을 간단하게 정의하고 안전하게 수행할 수 있는 강력한 라이브러리 입니다.

    - 장점
      - Annotation Processor을 사용해서 `컴파일 시 매핑코드`를 생성 → 컴파일 시점에서 어노테이션을 읽어 구현체를 만들어내기 때문에 리플렉션이 일어나지않아 매핑 속도가 빨라집니다.
        - *리플렉션(reflection)*
          프로그램이 자신의 구조(클래스, 필드, 메서드 등)를 분석하거나 수정하는 런타임 동작(runtime behavior)을 의미. Java의 **`java.lang.reflect`** 패키지는 리플렉션을 지원하며, 클래스를 동적으로 로드하고, 클래스의 구조를 분석하며, 객체의 필드나 메서드에 접근할 수 있도록 함.
        - Map Struct는 reflection을 사용하지 않음
      - 컴파일 시 오류를 확인 할 수 있음
      - 디버깅이 용이
      - 생성된 매핑 코드를 직접 확인 할 수 있음

    - 사용 방법
      - 의존성 추가

          ```java
          dependencies {
        
              implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
              implementation 'org.springframework.boot:spring-boot-starter-web'
              testImplementation 'org.springframework.boot:spring-boot-starter-test'
              implementation 'org.springframework.boot:spring-boot-starter'
        
              runtimeOnly 'com.h2database:h2'
              compileOnly 'org.projectlombok:lombok'
              annotationProcessor 'org.projectlombok:lombok'
              testImplementation 'org.springframework.boot:spring-boot-starter-test'
        
              **implementation 'org.mapstruct:mapstruct:1.5.3.Final'
              annotationProcessor 'org.mapstruct:mapstruct-processor:1.5.3.Final'**
        
          }
          }
          // 다만, Lombok 라이브러리에 먼저 dependency (의존성) 추가가 되어있어야 함. 
          // **MapStruct는 Lombok의 getter, setter, builder를 이용하여 생성**되므로 
          // Lombok 보다 먼저 의존성이 선언된 경우 실행할 수 없습니다.
          ```

      - Entity, DTO 생성
        - 변환 될 클래스는 @Setter 가 필요하고, 변환대상 클래스는 @Getter 가 필요. 변환 될 클래스에 @Builder 가 붙어있다면 @Setter 대신 @Builder가 우선적으로 사용됩니다.

          ```java
          @Entity
          @Table(name = "team")
          @NoArgsConstructor
          @Builder
          @AllArgsConstructor
          @Getter
          public class Team {
        
              @Id
              @GeneratedValue(strategy = GenerationType.IDENTITY)
              private Long id;
        
              private String type;
        
              @OneToMany(mappedBy = "team", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
              private List<Member> memberList;
          }
        
          @Getter
          @Setter
          public class TeamDto {
        
              private String type;
        
              private List<MemberDto> memberDtoList;
          }
          ```

          ```java
          @Entity
          @Table(name = "member")
          @NoArgsConstructor
          @Getter
          @Builder
          @AllArgsConstructor
          public class Member {
        
              @Id
              @GeneratedValue(strategy = GenerationType.IDENTITY)
              private Long id;
        
              private String name;
        
              @ManyToOne(fetch = FetchType.LAZY)
              @JoinColumn(name = "team_id")
              private Team team;
          }
        
          @Getter
          @Setter
          public class MemberDto {
        
            
              private String name;
        
          }
          ```

      - Mapper `Interface`생성

        *@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)*

      >   **unmmappedTargetPolicy**
      >
      >
      >   해당 정책은 타겟이 되는 필드에 대한 정책입니다. Target 필드는 존재하는데 source의 필드가 없는 경우에 대한 정책입니다.
      >
      >   - 옵션
        >       - `ERROR` : 매핑 대상이 없는 경우, 매핑 코드 생성 시 error 가 발생합니다.
      >       - `WARN` : 매핑 대상이 없는 경우, 빌드 시 warn 이 발생합니다.
      >       - `IGNORE` : *매핑 대상이 없는 경우 무시하고 매핑됩니다.*
      >

        - TeamMapper 와 MemberMapper

          ```java
          @Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
          public interface MemberMapper {
        
              MemberMapper Instance = Mappers.getMapper(MemberMapper.class);
        
              @Mapping(source = "name", target = "name")
              Member toEntity(MemberDto memberDto);
        
              List<Member> toEntity(List<MemberDto> memberDtoList);
        
              MemberDto toDto(Member member);
        
          }
        
          @Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
          public interface TeamMapper {
        
              TeamMapper Instance = Mappers.getMapper(TeamMapper.class);
        
            
              @Mapping(source = "type", target = "type")
              @Mapping(source = "memberDtoList", target = "memberList")
              Team toEntity(TeamDto teamDto);
        
              @Mapping(source = "memberList", target = "memberDtoList")
              TeamDto toDto(Team team);
          }
          ```

        - Mapper Interface 를 생성하고 프로젝트를 build 후에는 해당 Mapper를 컴파일시 자동으로 Implement 한 Impl 클래스를 생성해줍니다.

        - Mapper Interface를 생성 후, Mapper을 적용했을때 변환 작업이 제대로 되어있지 않다면 해당 Impl Class 로 들어가 코드를 확인해보면 됩니다. MapStruct는 @Builder, @Getter, @Setter 변환 작업을 하기에 해당 어노테이션을 생략 하거나, 혹은 필드 이름이 일치하지 않은 상태에서 빌드 시 (필드이름이 다를시 @Mapping 어노테이션으로 타겟 지정 가능) Mapper 인터페이스가 제대로 된 변환작업을 하지 못 할수도 있습니다.

      - Service 와 Controller에 적용

        ```java
        @Service
        @RequiredArgsConstructor
        public class MapperService {
      
            private final TeamRepository teamRepository;
      
         @Transactional
            public TeamDto save(TeamDto teamDto) {
                Team team = TeamMapper.Instance.toEntity(teamDto);
                List<Member> memberList = team.getMemberList();
                for (Member member : memberList) {
                    member.setTeam(team);
                }
                Team savedTeam = teamRepository.save(team);
                return TeamMapper.Instance.toDto(savedTeam);
            }
        }
      
        @RestController
        @RequestMapping("/v1")
        @RequiredArgsConstructor
        public class TestController {
      
            private final MapperService mapperService;
      
            @PostMapping("/test")
            public TeamDto save(@RequestBody TeamDto teamDto) {
      
                return mapperService.save(teamDto);
            }
        }
        ```

      - Mapper 인터페이스로 인해 TeamDto → Team 으로 변환 시, TeamDto 안의 List<MemberDto> 또한 List<Member> 으로 변환이 됩니다.
        해당 변환 작업은 MemberMapper을 생성해주면 Mapper 가 알아서 MemberDto도 Member 엔티티로 변환 시켜 줍니다. 이때 주의 해야 될점은 필수 어노테이션을 생략하거나, 필드 이름이 다른데 타켓 설정을 하지 않았거나, List 를 List 로 매핑해주는 메서드(ex: MemberMapper의 toEntities())를 생성해주지 않았다면 매핑 작업이 정상적으로 작동하지 않을수도 있습니다.
      - Team 엔티티를 보면 Cascade로 부모객체(Team)를 저장 시 자식객체(Member)도 저장할수있도록 cascade를 설정을 해줬는데, Mapper로 변환작업을 할 경우 따로 객체로 변환 후 List에 add()를 해서 영속성 컨텍스트에 자식 객체를 올려주지 않아도 이미 TeamDto 에서 Team 엔티티로 변환 작업 시 List<MemberDto>또한 Team 엔티티의 List<Member>로 매핑이 되었기 때문에 코드의 길이도 줄어듭니다.
        - memberDto  @이건상

            ```java
            {
                    "type" : "A",
                    "memberDtoList" : [{
                        "name" : "카란"
                    }, {
                        "name" : "억울"
                    }]
            }
            ```

        - 변환 전 코드

            ```java
            public TeamDto save(TeamDto teamDto) {
                    Team team = TeamMapper.Instance.toEntity(teamDto);
                  
                    **team.getMemberList().add(MemberMapper.Instance.toEntity(new MemberDto()));**
                  
                    return TeamMapper.Instance.toDto(teamRepository.save(team));
                }
            ```

        - 변환 후 코드

            ```java
            public TeamDto save(TeamDto teamDto) {
          
                    Team team = TeamMapper.Instance.toEntity(teamDto);
                    ****
                    return TeamMapper.Instance.toDto(teamRepository.save(team));
                }
            ```

        - 디버깅 (TeamDto → Team 변환 시 List도 동시에 매핑)



        - 개인적인 견해
            - 팩토리 Of 메서드에 익숙해있다면, mapper 인터페이스를 생성하고, @Mapping으로 이름이 다른 필드들을 타겟해주는게 귀찮을수도있을것같다.
            - @Build, @Setter @Getter 을 사용해 변환작업이 이루어지니 해당 어노테이션이 필수적으로사용해야된다는점이 보완해야될 점이지 않나 싶다. 특히 @Setter
            - 엔티티의 시스템 컬럼인 CreatedAt 이나 ModifiedAt같은 컬럼을 초기화하는 메서드를 엔티티 클래스 내부에 생성하고 서비스단 에서 호출을 한다면, Mapper 인터페이스 사용 시 변환작업을 함과 동시에 생성일, 수정일을 설정해주는것도 하나의 장점 일 것 같다.