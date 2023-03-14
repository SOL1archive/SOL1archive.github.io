---
title: 자연어처리 노트(3)
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

{:#Multi-Head Attention}
## Multi-Head Attention
이제 Transformer의 가장 핵심이 되는 Multi-Head Attention을 살펴볼 차례다. 우선 Multi-Head Attention의 정의는 다음과 같다.

$$
\begin{gathered}
\text{MultiHead} (Q, K, V) = \text{Concat}(\text{head} _1, \text{head} _2, \cdots, \text{head} _h) W^O\\
\text{where head}_i = \text{Attention} (Q W_i^Q, KW_i^K, VW_i^V)
\end{gathered}
$$

이 식에서 보면 알 수 있다시피, $Q, K, V$ 에 대한 행렬 세트가 여러개가 있고 이에 대해 각각 Attention을 수행함을 확인할 수 있다. 이는 모델이 서로 다른 정보를 추출하여 상호 보완적으로 다양한 측면에서 정보를 분석하게 하는 역할을 한다.

각각의 Attention Head에서 얻은 결과 행렬은 모두 concat되어 $W^O$ 행렬과 곱해진다. 이는 매우 큰 형태의 행렬을 작은 행렬로 줄여주는 역할을 한다.

이제 트랜스포머 모델과 RNN, CNN의 계산/공간 복잡도를 살펴보자.

|variable|description|
|-|-|
| n | the sequence length |
| d | the representation dimension |
| k | the kernel size of convolutions |
| r | the size of the neighborhood in restricted self-attention |

|Layer Type|Complexity per Layer|Sequential Operations|Maximum Path Lenght|
|-|:-:|:-:|:-:|
|Self-Attention| $O(n^2 \cdot d)$ | $O(1)$ | $O(1)$ |
|RNN Family| $O(n \cdot d^2)$ | $O(n)$ | $O(n)$ |
|CNN | $O(k \cdot n \cdot d^2)$ | $O(1)$ | $O(log_k (n))$ |
|Self-Attention (restricted) | $O(r \cdot n \cdot d)$ | $O(1)$ | $O(n/r)$ |

출처: Vaswani, Ashish, et al., [_Attention is all you need_](https://arxiv.org/abs/1706.03762) (2017)

Self attention(Transformer)에서 계산복잡도는 시퀀스의 길이에서 큰 영향을 받는 것을 확인할 수 있다. 반면 RNN 계열서는 벡터의 차원이 계산 복잡도에 큰 영향을 준다는 것을 확인할 수 있다. 학습시 메모리에서는 역전파에 필요한 정보들을 저장하고 있어야 하기 때문에 공간복잡도는 계산복잡도와 비례한다. 또 Transformer와 CNN은 한번에 모든 시퀀스를 처리하지만 Sequential operation이 $O(1)$ 이지만, RNN의 경우는 시퀀스의 각 time step마다 한번씩 수행해야 하기 때문에 연산 시간이 오래걸리고, 특정 time step의 결과를 얻기 위해서는 해당 time step 이전의 모든 time step을 거쳐야 한다. 마지막으로 Maximum path lenght는 얼마나 긴 시퀀스에서 Long-term depandency가 나타나느냐를 의미한다. Transformer에서는 시퀀스가 얼마나 긴지에 관계없이 모든 시퀀스에서 Long-term depandancy가 나타나지 않는 반면, RNN 계열에서는 짧은 시퀀스에 대해서도 long-term depandancy가 나타날 수 있음을 확인할 수 있다.

{:#Block-Based Model}
## Block-Based Model
Transformer의 핵심은 Multi-head attention이지만 그것만이 전부는 아니다. 이제 attention 모델의 다른 부분들을 살펴보자. 다음은 트랜스포머 모델의 아키텍처이다.

![](https://i.namu.wiki/i/SB-xOtNizmb5WbX8kvtyRLnkBjkiJobn9Y9JPxGSxWr49bGvpGcSeGxUhbJWXI1BAMO_5N2mNx7VrQ_CWf3s349G9-ma9R4ZdEPbNr6-cTXV83cGP9EhmyEGMmAMUZONMGpn0Nv9t78kPhfarW2d7g.webp)

출처: Vaswani, Ashish, et al., [_Attention is all you need_](https://arxiv.org/abs/1706.03762) (2017)

왼쪽 인코더 부분을 보면 입력이 세가지로 나누어져 Query, key, value로 변환됨을 확인할 수 있다. 그리고 그 다음을 Add & Norm과 Feed Forward가 있음을 확인할 수 있다. 이를 살펴보자. Add & Norm에서 Add는 Residual Connection, Norm은 batch normalization, group normalization 등과 같은 normalization 기법 중 하나인 Layer Normalization을 의미한다. 다른 형태의 normalization 기법인 Batch Normalization에 대한 설명은 [이 링크](./step2-6) 에서 확인할 수 있다. Norm의 공통적인 특징은 결과 데이터를 항상 일정한 평균과 분산을 가지는 확률분포로 변환해주는 것이다. Layer norm은 batch norm과 달리 하나의 출력에 대해서만 normalization을 수행한다. 각 열마다 별도의 파라미터로 선형변환을 해준다.

Residual Connection, 혹은 잔차연결은 ResNet에서 고안된 기법으로, 딥러닝 모델의 층이 깊어질 때 발생하는 Gradient Vanishing/Exploding 문제를 해결하기 위해 고안되었다. 층이 깊어질 때는 Gradient Vanishing/Exploding이 발생하여 학습이 어려워지고 모델의 성능이 역으로 떨어지는 문제가 발생했다. ResNet은 이런 깊은 형태의 데이터 흐름에서 발생하는 문제를 데이터 흐름의 우회를 적용하여 해결했다. 이것이 바로 Residual Connection이다. 그림에서 볼 수 있다시피, 모델의 한 층을 통과한 후의 데이터는 통과하기 이전의 데이터와 더해진다. 이는 파라미터의 도함수 상에서 우회를 제공해주어 Gradient Vanishing/Exploding이 발생하지 않고 깊은 층도 잘 학습이 되게 한다. 이러한 특성으로 인해 Residual Connection은 깊은 신경망에서 자주 사용된다.

Feed Forward는 전형적인 완전연결 계층이다. 이는 가장 기본적인 형태의 신경망으로 [이 링크](./step1-4)에서 자세히 살펴볼 수 있다.

이는 트랜스포머 모델의 하나의 Attention Block으로, 트랜스포머 모델들은 Attention Block을 더 쌓아서 구축한다.

{:#Positional Encoding}
## Positional Encoding
Positional Encoding은 시퀀스의 순서 정보를 확인할 수 없는 transformer 모델에게 순서 정보를 전달해주는 역할을 한다. 앞서 설명한 트랜스포머 모델에서 시퀀스 정보가 역전된다고 해도 모델은 이를 확인할 수 없다. 시퀀스 순서 정보가 인코딩되어 있지 않기 때문이다. RNN 계열에서는 각 time step마다 시퀀스를 입력 받기 때문에 그 자체가 시퀀스의 순서 인코딩이 되지만 트랜스포머에서는 그렇지 않다. 따라서 트랜스포머 모델에서는 입력이 모델에게 전달되기 전에 positional encoding을 거침으로써 모델이 시퀀스 정보를 입력받을 수 있다. positional encoding의 방법은 다양하지만 일반적으로는 _Attention is all you need_ 에서 제시된 다음의 방법을 따른다.

$$
\begin{aligned}
\text{PE}(pos, 2i) &= \text{sin}\left(\frac{pos}{10000^{\frac{2i}{d_{model}}}} \right)\\
\text{PE}(pos, 2i + 1) &= \text{cos}\left(\frac{pos}{10000^{\frac{2i}{d_{model}}}} \right)
\end{aligned}
$$

이 식을 입력 행렬과 크기가 같은 행렬의 각 원소에 대입한다. 그리고 그렇게 생성된 행렬을 입력 행렬에 더한다. 이것이 positional encoding의 대표적인 방법이다.

또 트랜스포머의 경우 일반적으로 가장 좋은 성능을 보이는 learning rate scheduling이 존재한다. 먼저 learning rate scheduling에 대한 설명은 [이 링크](./step2-4#학습률-감쇠) 에 설명되어 있다. 트랜스포머의 경우 일반적으로 learning rate scheduling은 다음과 같이 정의된다.

$$
\text{learning rate} = d_{model}^{-0.5} \cdot \text{min}(\text{#step}^{-0.5}, \text{#step} \cdot \text{(warmup steps)}^{-1.5})
$$

이는 모델의 파라미터가 local optima에 갖히지 않게 도와주고 파라미터가 diverge하지 않게 도와준다. 식을 살펴보면 전반적으로 매 epoch step을 지날때마다 learning rate가 감소할 것임을 확인할 수 있다. 이는 모델이 더 최적화되어 성능을 높여준다.

> [이전 포스트](./nlp2) | 
