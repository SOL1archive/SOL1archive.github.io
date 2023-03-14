---
title: 자연어처리 노트(2)
feed: show
date: 04-03-2023
mathjax: true
toc: true
---

* TOC
{:toc}

{:#Long-Term Dependency}
## Long-Term Dependency
기존의 RNN 모델은 어텐션 메커니즘으로 보완하긴 했지만 태생적으로 다음 시퀀스에 전달할 수 있는 정보의 양에 한계가 있는 탓에 긴 시퀀스에서는 초기 정보가 사라지는 문제가 있었다. 왜냐하면 어텐션 메커니즘으로 특정 시퀀스의 Hidden State Vector를 가져온다고 해도 긴 시퀀스 상에서는 각 Hidden State Vector의 반영 비율이 낮아질 수 밖에 없기 때문이다. 가령 인코더 Hidden State Vector들로 Context Vector를 생성할 때 하나의 벡터의 Attention Score가 3이고, 다른 벡터들이 1이라고 할 때, 10개의 입력 시퀀스가 있을 때는 Attention Score가 3인 벡터가 Context Vector를 구성할 때 반영되는 비율이 약 66.7% (=exp(3) / (exp(3) + 10)) 이다. 반면 시퀀스가 100개가 되면 반영되는 비율이 약 16.8% (=exp(3) / (exp(3) + 99))이다. 동일한 Attention Score를 갖더라도 시퀀스의 크기가 늘어나면 Attention 메커니즘도 제대로 동작하지 않을 수 있다.

이에 대한 해결책으로는 대표적으로 두가지가 있다. 하나는 Bi-directional RNN이고, 다른 하나는 트랜스포머 모델이다. Bi-directional RNN은 이름에서 알 수 있듯이 일정 시퀀스 대로 입력을 받고, 또 반대 방향으로도 입력을 받는다. Bi-directional RNN은 순방향으로 시퀀스를 입력 받는 RNN 모델과 시퀀스의 역방향으로 시퀀스를 입력받는 RNN 모델로 구성된다. 가령 "I go home." 이라는 문장에서 순방향 RNN은 I, go, home 순서로 입력을 받고, 역방향 RNN은 home, go, I 순서로 입력을 받는다. 그리고 특정 시퀀스(가령 이전 예시에서 go 토큰과 같은)에서 생성된 Hidden State Vector를 concat하여 하나의 벡터로 구성한다. 그리고 이는 go에 해당하는 인코딩 벡터가 된다.

{:#Transformers}
## Transformers

트랜스포머 모델은 _Attention is all you need_ 라는 논문에서 처음 제안되었다. 제목에서 알 수 있듯이 트랜스포머 모델은 어텐션 메커니즘 만을 이용한 모델이다. 기존의 어텐션 메커니즘은 다른 딥러닝 모델의 애드온 매커니즘이었지만, 트랜스포머 모델이 제안되어 널리 사용됨에 따라 단독적으로 사용되기 시작했다.

트랜스포머 모델의 핵심은 Attention, 그 중에서도 Multi-Head Attention에 있다. 먼저 Attention 메커니즘을 다시 살펴보자. Attention 메커니즘을 요약하면 어떤 벡터(이를 앞으로 _Query Vector_ 라 하겠다)와 다른 벡터들(_Key Vector_) 사이의 Attention Score를 구하고 각 Attention score와 value vector를 가중합하여 context vector를 구한다. 이것이 Attention의 핵심이다. 

Seq2Seq 모델에서 query vector는 디코더의 hidden state vector였고, key, value vector는 인코더의 hidden state vector 였다. 트랜스포머 모델에서는 query vector와 key vector를 모두 입력에 대한 가중치를 곱하여 구한다. 가령 $X_1: 1 \times k$ 이 입력으로 주어졌을 때, query vector $q$ , key vector $k$ , value vector $v$ 는 다음과 같이 파라미터로 구한다.

$$
\begin{aligned}
q &= X_1 W_q\\
k &= X_1 W_k\\
v &= X_1 W_v
\end{aligned}
$$

이는 입력 벡터에 대한 선형변환으로, 입력벡터를 query vector의 공간 상에 있는 query vector와 key vector의 공간 상에 있는 key vector, value vector 공간 상에 있는 value vector로 각각 매핑시키는 것으로 이해할 수 있다. 그리고 이를 이용해 Attention Scoring Method에 따라서 각각에 대한 Attention Score를 구한다. 마지막으로 각각의 Attention score와 value vector에 대한 가중합을 통해 Context Vector를 구한다.

또, 트랜스포머 모델은 입력벡터 $X_1, X_2, \cdots , X_n: 1 \times k$ 가 있을 때, 이를 모두 axis 1 방향(이 경우 세로방향)으로 쌓아서 $X: n \times k$ 행렬을 입력으로 받는다. 하지만 이는 연산 성능 향상을 위한 벡터화일 뿐, 행렬곱의 정의와 특징 상 결과적으로 연산은 앞서 언급한 것과 동일하다.

트랜스포머 모델은 RNN 계열 기반 모델에서 사용한 여러 벡터들을 선형변환을 통해 구한다. 이 단순한 차이는 큰 변화를 가져왔는데, 트랜스포머 모델은 RNN 계열이 순차적으로 입력받던 입력 시퀀스를 모두 한번에 받아서 연산하기 때문에, RNN 계열 모델이 태생적으로 가지고 있었던 단점인 Long term depandancy를 가지지 않는다.

{:#Scaled Dot-Product Attention}
## Scaled Dot-Product Attention

이제 Attention Score를 구하는 방법 중 대표적인 방법인 Scaled Dot-Product Attention을 구하는 방법을 알아보자. 이름에서 알 수 있듯, 이 Attention 메커니즘은 점곱(Dot Product)를 통해 Attention Score를 구한다. Scale Dot-Product Attention은 다음과 같이 정의된다.

$$
A(q, K, V) = \sum_i \frac{exp(q \cdot k_i)}{\sum\limits_j exp(q \cdot k_j)}v_i
$$

이 때 value vector들에 대한 행렬인 $V$ 에 대해, value vector들의 크기, 즉 $V$ 의 열의 크기를 꼭 다른 벡터들과 맞출 필요는 없다. 입력 시퀀스가 동일하므로, 각각의 query vector에 대한 Attention score의 수는 동일하고, value vector의 행의 크기는 입력 시퀀스의 길이와 동일하기 때문에 value vector들의 차원은 독립적인 것이다. 가령 입력 시퀀스의 길이를 $n$ , 이를 쌓은 행렬을 $X$ 라고 하자. $X$ 의 행의 길이는 $n$ 이 되고, 앞서 이전 챕터에서 주어진 식에 의해 query, key, value vector들에 대한 행렬의 행의 길이도 모두 $n$ 이 될 것이다. 그리고 Dot-Product Attention에서는 query vector와 key vector의 점곱에 대한 Softmax 값을 Attention Score로 사용하므로, 각 query vector에 대한 attention score도 $n$ 이 된다. 그리고 이 Attention Score는 value vector들에 대한 선형결합에서의 계수가 된다. 결과적으로 value vector들에 대한 열의 길이, 차원은 연산에서 독립적임을 확인할 수 있다.

앞서 Seq2Seq 모델, 그리고 Attention 모델을 설명할 때는 하나의 query vector만을 가정했다. 하지만 다시 살펴보면 다수의 query vector에 대해서도 Attention이 잘 정의됨을 확인할 수 있다. 한번 자세히 살펴보자. query vector들을 쌓은 행렬인 $Q$ 에 대해서 Attention vector(Cotext vector)는 다음과 같이 정의된다.

$$
A(Q, K, V) = \text{softmax}(QK^T)V
$$

이와 같이 식이 정의되면, 각각의 query vector와 모든 key vector의 내적이 수행된다. 그리고 softmax에 대입하는데 이 때 Softmax는 Row-wise softmax로, 각각의 행벡터에 대한 Softmax를 의미한다. 현재 query, key 모두 행벡터로 표현되었고, $Q$ 가 전항에 있으므로 하나의 query vector에 대한 key vector와의 내적값들은 모두 원래 query vector가 있는 행에 위치한다. 따라서 각각의 행에 대한 Softmax 연산을 Row-wise softmax로 수행하면 다수의 query vector에 대한 attention score 연산을 벡터화할 수 있다. 그리고 이렇게 얻은 Attention 행렬을 Value 행렬과 곱하면 각 query vector에 대한 context vector들의 행렬을 구할 수 있다. **Scaled** Dot-Product Attention에서는 Dot-Product Attention에서 다음과 같이 식이 바뀐다.

$$
A(Q, K, V) = \text{softmax}(\frac{QK^T}{\sqrt{d_k}})V
$$

말그대로 $\sqrt{d_k}$ ( $d_k$ 는 key vector의 크기 )로 Scaled되어서 Scaled Dot-Product Attention인 것이다. 이는 $Q, K, V$ 행렬들로 Context matrix를 구할 때 분산이 증가하는 것을 상쇄시키기 위해 적용하는 것이다. $d_k$ 크기의 두 벡터에 대한 내적의 분산은 $d_k$ 가 되므로, $\sqrt{d_k}$ 로 나누어 확률분포의 분산을 원래대로 되돌린다. 또, $\sqrt{d_k}$ 로 나누면 내적에 의해 증가하는 분산을 원래대로 돌리면 지수함수가 사용되는 Softmax에서도 값이 과도하게 한쪽으로 몰리지 않기 때문에, Softmax의 결과가 왜곡되지 않는 결과도 만든다.

> [이전 포스트](./nlp2) | 
