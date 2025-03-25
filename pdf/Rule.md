# 1. 프로젝트 구조


# 2. 에셋 명명법


# 3. 프로그래밍 명명법

## 네임 스페이스

1. 네임 스페이스 이름은 **파스칼 케이스(PascalCase)**를 따르며, 가능한 **복수형을 사용**한다.

- 틀린 예: ‘namespace character’
- 바른 예: ‘namespace **C**haracter**s**’
</br>

2. 프로젝트 **루트 네임 스페이스는 ‘CMB’**로 한다.

- 예시: ‘**CMB**.Characters’
</br>

3. 하위 네임 스페이스는 **기능별**로 묶으며, 가능한 **4회 이상 중첩하지 않는다.**

- 틀린 예: ‘CMB.Characters/Movement/Physics…’
- 바른 예: ‘CMB.Characters’
</br>

## 클래스

- 클래스 이름은 파스칼 케이스(PascalCase)를 따른다.
    - 예시: PlayerController
</br>

- 클래스 이름은 일부 특수 예를 제외하면 **명사형**으로 짓는다.
    - 틀린 예: GameControl
    - 바른 예: GameController
</br>

- 클래스 이름은 단수형으로 짓는다. 복수형의 의미를 담고 싶으면 List, Array, Container 등 적절한 이름을 고려한다.
    - 틀린 예: Items
    - 바른 예: ItemList
</br>

- 클래스 이름은 길더라도 직관적이며 명확한 이름을 지향한다.

[ 기능별 명명법 ]

<details>
<summary>UI 관련</summary>
MVP 패턴 중 Viewer 역할의 클래스는 접미사로 Viewer를 사용한다.
</br>
MVP 패턴 중 Presenter 역할의 클래스는 접미사로 Presenter를 사용한다.
</details>
<details>
<summary>네트워크 관련</summary>
NetworkBehaviour를 상속하는 모든 클래스는 아래 규칙에 따른 접두사를 붙인다.
  - 스크립트가 서버/호스트에서만 동작하면 Server- 접두사를 사용한다.
  - 스크립트가 Owner에서만 동작하면 Client- 접두사를 사용한다.
  - 스크립트가 모든 클라이언트에서 동작하면 Network- 접두사를 사용한다.
</details>

## 변수

**변수명의 제 1 법칙은 절대 대충 짓지 않는 것이다.**  
**한국어를 직역한 듯 어색한 이름을 쓰는 것이 약어와 임시명칭을 남발하는 것보다 수백배 더 낫다.**  
**설령 혼자 보는 코드라 하더라도 반드시 의미가 분명하게 작성한다.**  
</br>
  
- 변수명 명명 양식은 아래를 따른다.

|대상|규칙|
|---|---|
|프로퍼티|파스칼 케이스(PascalCase)|
|Private/Protected 변수|멤버 접두어(m_MemberPrefix)|
|static Private/Protected 변수|정적 멤버 접두어(s_StaticPrefix)|
|로컬 변수</br>매개 변수|카멜 케이스(camelCase)|
  
> [!NOTE]
> public 변수는 카멜 케이스(camelCase)를 따른다.  
> 하지만 본 프로젝트에서 public 변수는 가능한 지양한다.  
> 외부로 노출되야 하는 변수에 대해서는 반드시 프로퍼티를 사용하도록 한다.
  

<details>
<summary>네트워크 관련</summary>
NetworkVariable의 쓰기 권한에 따라 변수 앞에 Servers- 또는 Owners- 접두사를 사용한다.
</details>

  
## 함수

- 함수명은 파스칼 케이스(PascalCase)를 사용한다.
</br>

- 함수명은 일부 예외를 제외하고 동사형으로 짓는다.
    - 틀린 예: Running
    - 바른 예: Run
</br>
  
- 함수는 함수가 수행하는 역할을 분명히 드러낼 수 있는 적절한 이름을 짓는다.</br>
하지만 클래스 명에서 이를 유추할 수 있다면, 생략 가능하다.
    - 틀린 예: Play()
    - 바른 예: PlaySound()
    - 예외: SoundPlayer.Play()
</br>

<details>
<summary>비동기 프로그래밍</summary>
- async 함수는 접미사로 -Async를 사용한다.</br>
- 예: PlayActionAsync()</br>
</br>
- 코루틴 함수는 접미사로 -Coroutine을 사용한다.</br>
- 예: PlayActionCoroutine()</br>
</details>
<details>
<summary>네트워크</summary>
- Rpc 함수는 접미사로 -Rpc를 사용한다.</br>
- Server Rpc 함수는 접미사로 -ServerRpc를 사용한다.</br>
- Client Rpc 함수는 접미사로 -Client Rpc를 사용한다.</br>
    
> 위 규칙은 Netcode for GameObject 프레임워크에서 요구하는 규칙으로, 지키지 않으면 오류가 발생한다.
</details>
