---
title: 수리논리학의 기초 - 논리학의 역사 (1)
feed: show
date: 27-08-2022
mathjax: true
toc: true
---

* TOC
{:toc}

라이프니츠로부터 시작된 수리논리학의 역사는 상당히 흥미롭다. 인문학과 수학, 언어학, 그 중에서 철학과 수학이 만나는 접점이기 때문이다. 초기 논리학은 수학과 다소 거리가 있었지만 [**고틀로프 프레게**](https://ko.wikipedia.org/wiki/%EA%B3%A0%ED%8B%80%EB%A1%9C%ED%94%84_%ED%94%84%EB%A0%88%EA%B2%8C)(_Gottlob Frege_)와 [**버트런드 러셀**](https://ko.wikipedia.org/wiki/%EB%B2%84%ED%8A%B8%EB%9F%B0%EB%93%9C_%EB%9F%AC%EC%85%80)(_Bertrand Russell_)이라는 두 철학자이자 수학자들의 만남으로 하나가 되었다. 수리논리학은 이후 모든 수학의 기초가 되어, 수학적 형식주의(_Mathematical Formalism_)을 기반으로 한 현대 수학의 시초가 되었으며, 컴퓨터의 탄생을 촉발시켰다.  

{:#수리논리학 이전의 논리학자: 아리스토텔레스, 라이프니츠, 베이컨}
## 수리논리학 이전의 논리학자: 아리스토텔레스, 라이프니츠, 베이컨
논리학은 아리스토텔레스의 저서 **논리학**으로부터 시작되었다. 아리스토텔레스의 논리학은 인간이 직관적으로 사용하는 연역적 추론 규칙들을 서술해 놓았고, 이는 중세까지의 철학에 큰 영향을 미친다. 아리스토텔레스의 논리학은 연역적 추론 규칙들을 비정형적인 언어인 자연어로 서술하였고, 이는 추론의 결함을 발견하기 어려운 단점이 있었다. 또, 연역법의 한계로 인해, 논리학의 추론 규칙을 이용해 도출된 명제는 결국 동어반복적 명제로, 새로운 지식이 아닌, 기존의 지식을 다른 형태로 표현한 것에 불과하다는 한계가 있었다. 이에 근대에 들어서면서 아리스토텔레스의 논리학의 영향을 벗어나려는 두가지 대표적인 시도가 있었는데, 이들은 바로 라이프니츠와 베이컨이다.   

{:##연역과 귀납}
### 연역과 귀납
라이프니츠와 베이컨의 업적을 이해하기 위해서는 먼저 연역법과 귀납법의 특징과 차이에 대해 이해해야 한다. 연역법은 보편적 지식들을 바탕으로 개별적 지식을 도출하는 방법이다. 연역법의 대표적인 예시는 삼단논법인데, 다음을 통해 살펴보자.

> 1. 모든 사람은 죽는다.
> 2. 소크라테스는 사람이다.
> 3. 소크라테스는 죽는다.

위 논증에서 1항을 대전제, 2항을 소전제, 3항이 결론이라고 한다. 1, 2항의 지식을 바탕으로 3항의 새로운 지식을 도출한 것이다. 하지만 이는 온전히 새로운 지식이라 볼 수 없다. 결론의 명제는 일반화된 지식인 대전제를 개별화한 것에 불과하다. 비록 결론은 새로운 지식으로 보여도, 실제로 결론은 대전제에 포함되는 지식인 것이다. 이와 같이 연역법을 통해서는 새로운 지식을 도출할 수 없다. 연역 논증의 결론은 기존의 전제와 정의를 다른 방식으로 표현한 것일 뿐이다.

귀납법은 연역법의 논증과는 반대로, 개별적 지식을 통해 보편적 지식을 도출하는 방법이다. 즉, **일반화**를 하는 것이다. 다음 논증을 살펴보자.
> 1. 첫째로 관찰한 까마귀는 검다.
> 2. 둘째로 관찰한 까마귀는 검다.   
> $\cdots$   
> $n$. $n$번째로 관찰한 까마귀는 검다.   
> 결론: 모든 까마귀는 검다.

이 논증에서 관찰해서 얻은 개별적 지식인 "관찰된 까마귀는 모두 검다."를 바탕으로 보편적 지식인 "모든 까마귀는 검다."를 결론으로 도출하고 있다. 개별적 지식은 보편적 지식을 함축할 수 없다. 관찰된 모든 까마귀가 검다고 하더라도, 모든 까마귀가 검다는 것이 참인 것은 아니다. 당연하게도 관찰한 까마귀가 검다고 해서, 검지 않는 까마귀가 존재할 가능성이 없는 것은 아니기 때문이다. 그러므로 결론의 보편적 지식은 전제에 내포되지 않은 새로운 지식임을 알 수 있다. 하지만 반대로, 귀납법의 한계 또한 확인할 수 있다. 연역법은 결론이 전제에 내포되기 때문에, 전제가 참이면 결론은 항상 참이다. 반면 귀납법을 통해 추론한 결론은 전제가 참이더라도 참임을 보장받을 수 없다.

오늘날 연역법과 귀납법은 추론의 두 축으로서 인간의 기초적인 사고부터 다양한 학문에 광범위하게 사용된다. 연역은 주로 수학의 도구로써 활용되고, 귀납은 과학의 도구로써 활용된다. 예리한 독자는 여기서 수학과 과학의 중요한 차이를 생각해냈을 것이다. 바로 수학은 연역을 주로 사용하기에, 전제가 참이면 결론이 참인 추상학문인데 반해, 과학(자연과학, 사회과학 모두)은 귀납에 의존하기에 결론이 참임을 보장받을 방법이 근본적으로 존재하지 않는다는 것이다. 이를 자세히 설명하는 것은 주제에서 크게 벗어나므로 생략하겠다. 일상생활에서도 연역과 귀납은 사용된다. 아마 연역과 귀납의 개념을 몰랐던 사람이더라도, 일상에서 직관적으로 연역과 귀납을 자주 활용했을 것이다. 

{:##라이프니츠와 베이컨}
### 라이프니츠와 베이컨
라이프니츠는 신성로마제국의 철학자, 수학자, 과학자인 인물로 철학, 수학, 물리학, 문헌정보학 등 다양한 분야에 업적을 남긴 합리론자였다. 라이프니츠는 아리스토텔레스의 논리학이 가진 비정형성을 해결하고자 인공어인 **보편언어**(_Characteristica Universalis_)를 고안하였다. 라이프니츠는 보편언어가 확립되면 형이상학과 도덕 등과 같은 다양한 문제를 기하학과 해석학에서 문제를 해결하는 방식으로 해결할 수 있을 것이라 기대했다. 자연어로만 서술될 수 있었던 문제인 형이상학과 도덕의 문제를 보편언어를 통해 서술함으로써, 수학 문제를 풀듯 풀 수 있을 것이라 기대한 것이다. 보편언어는 수리논리학의 기초적인 정형 추론 규칙들과 개념들을 포함하고 있었다. 하지만 아쉽게도 라이프니츠의 이러한 아이디어는 당대의 관심을 받지 못했고, 프레게에 의해 부활하기 전까지 잊혀지게 되었다.

베이컨은 영국의 철학자, 과학자이자 대법관이었다. 아리스토텔레스의 논리학이 가지는 연역적 추론의 문제를 극복하고자 노력하였고 그 결과 경험론의 창시자가 되었다. 베이컨은 앞서 설명한 연역논증의 단점을 비판했고, 그 해결책으로 귀납법을 제시했다. 베이컨은 당대까지의 과학자와 철학자들이 연역 논증에만 의존하여 새로운 지식을 도출하기 보다 과거 철학자들이 세워놓은 형이상학적 전제들을 다른 말로 표현하는데에만 집중했다고 비판했다. 이에 대해 귀납법을 바탕으로한 경험론을 주장했다. 경험을 활용한 귀납법을 활용하여 형이상학 대신 경험과학에 집중해야 한다고 본 것이다. 그는 자신의 경험론이 아리스토텔레스의 논리학(_Organum_)을 대체할 새로운 논리학이 될 것이라 보았고, 그래서 자신의 저서를 신논리학(_Novum Organum_)이라 이름 지었다.

매우 흥미로운 점은 라이프니츠와 베이컨이 아리스토텔레스의 논리학을 극복하고자 한 방향이다. 라이프니츠는 합리론자로서 추상적 토대 위에 논리체계를 새우고자 하였다. 다만 그 방식에서 아리스토텔레스의 비정형성이 아닌, 수학적 정형성을 추구한 것이었다. 반면 베이컨은 경험주의의 창시자로서 경험론 귀납법으로 아리스토텔레스의 연역적 논리학을 대체하고자 하였다. 라이프니츠와 베이컨 각자의 철학적 성향이 아리스토텔레스의 논리학을 극복하는 방향에도 영향을 미친 것이다. 

### 출처)   
- 튜링&괴델: 추상적 사유의 위대한 힘(박정일), 김영사, 2010   
- 러셀 서양철학사(버트런드 러셀, 서상복 옮김), 을유문화사, 2019