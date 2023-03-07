---
title: 자연어처리 노트(2)
feed: show
date: 03-03-2023
mathjax: true
toc: true
---

* TOC
{:toc}

{:#Seq2Seq Model}
## Seq2Seq Model
Seq2Seq 모델은 Many-to-Many 모델의 일종이다. Seq2Seq 모델은 두가지 종류의 LSTM 혹은 GRU 모델로 구성된다. 입력 시퀀스를 받는 LSTM/GRU 부분을 인코더, 출력 시퀀스를 출력하는 LSTM/GRU 부분을 디코더라고 부른다. Seq2Seq 모델은 내부 상태 벡터(은닉 상태 벡터, 셀 상태 벡터)는 공유하지만 파라미터는 공유하지 않는다. Seq2Seq 모델에서 입력 시퀀스가 주어질 때 매 time step 마다 입력 시퀀스를 입력받는다. 

입력을 모두 받은 후, 디코더는 인코더가 마지막 시퀀스를 입력 받은 후 출력한 내부 상태 벡터들을 넘겨 받아 결과물을 출력한다. 이때 디코더가 수행되는 첫번째 time step에서 시작 토큰(ex. &lt;START&gt;, &lt;SoS&gt; (SoS: Start of Sentence))을 입력받는다. 그리고 이후의 매 time step에서는 이전 time step에서의 출력을 입력으로 받고, 이전 상태 벡터를 통해 결과를 출력한다. 그리고 전체 출력이 끝날 때 종료 토큰(ex. &lt;END&gt;, &lt;EoS&gt;)를 반환한다.

Seq2Seq 모델에서 Attention 메커니즘을 적용할 수 있다. Seq2Seq 모델은 순차적으로 시퀀스를 입력받고 내부 상태 벡터를 축적하여 출력하기 때문에 벡터에 저장할 수 있는 정보의 한계상 특정 time step에 있는 중요한 정보를 놓칠 수 있다. 병목현상이 발생하는 것이다. Attention 메커니즘은 이를 보완하는 메커니즘으로 중요한 특정 time step의 정보에 대한 _집중_ 을 구현한다.

{:#Seq2Seq & Attention}
## Seq2Seq & Attention
이제 본격적으로 Attention 메커니즘이 어떻게 구현되고 Seq2Seq에 어떻게 적용하는지 살펴보자. Attention 메커니즘 중 일반적으로 Seq2Seq에 사용되는 메커니즘은 Dot Scaled Attention이다. 이 메커니즘은 인코더가 생성한 모든 time step의 은닉 상태 벡터를 디코더로 전달하고 디코더가 각 time step마다 필요한 인코더의 은닉 상태 벡터를 이용해 데이터를 생성할 수 있도록 한다.

가령 인코더의 첫번째, 두번째, ..., n번째 은닉 상태 벡터를 $h_1^{(e)}, h_2^{(e)}, \cdots , h_n^{(e)}$ 라고 하자. $h_n^{(e)}$ 이 디코더로 보내지고 디코더에 시작 토큰이 입력되었을 때 디코더의 첫번째 은닉 상태 벡터 $h_1^{(d)}$ 가 계산된다. 이 은닉 상태 벡터는 다음 time step으로 전달되어 다음 토큰의 예측을 수행하는데 사용될 뿐만 아니라 인코더의 은닉 상태 벡터 중 어떤 벡터를 예측에 사용할지 결정하는데도 사용된다. 이는 다음과 같이 구현된다.

$$
\begin{gathered}
    \begin{aligned}
        z_1 &= h_1^{(e)} \cdot h_1^{(d)}\\
        z_2 &= h_2^{(e)} \cdot h_1^{(d)}\\
        &\vdots\\
        z_n &= h_n^{(e)} \cdot h_1^{(d)}\\
    \end{aligned}\\
    \ \\
    \begin{bmatrix}
    a_1\\
    a_2\\
    \vdots\\
    a_n
    \end{bmatrix}
    = f_{\text{softmax}} \left(
        \begin{bmatrix}
            z_1\\
            z_2\\
            \vdots\\
            z_n\\
        \end{bmatrix}
     \right)\\
    \ \\
    v_{\text{attention}}
    = \sum_{i = 1}^n a_i\ h_i^{(e)}
\end{gathered}
$$

주어진 식과 같이 디코더의 은닉 상태 벡터를 인코더의 모든 은닉 상태 벡터와 스칼라 곱을 수행한 후 그 결과를 Softmax 함수에 대입한다. Softmax 함수 값의 원소를 Attention Score라고 하고, 인코더의 각 은닉 상태 벡터에 대한 일종의 가중치로 볼 수 있다. Softmax 함수 값 원소의 합은 항상 1이므로 적절한 가중치라고 할 수 있을 것이다. 스칼라 곱의 결과는 코사인 유사도와 관련있는 지표로 볼 수 있다. 두 벡터의 코사인 유사도가 높을수록 스칼라 곱의 결과는 커진다. 따라서 일반적으로 Attention score는 디코더의 은닉 상태 벡터와 더 유사한 인코더 은닉 상태 벡터가 높은 값을 가지게 된다. 하지만 스칼라 곱의 결과는 코사인 유사도 뿐만 아니라 벡터의 노름(=길이)에도 영향을 받으므로 항상 디코더의 은닉 상태 벡터와 유사한 벡터가 높은 attention score를 갖는 것은 아니다.

Softmax로 구한 가중치를 각 인코더의 은닉 상태 벡터와 가중 합을 수행하면 Attention Output, 혹은 Context Vector을 얻을 수 있다. Softmax의 특성상, Context Vector는 Attention score가 높은 벡터와 유사한 벡터일 것이다. 의미공간의 관점에서 봤을 때 Attention output은 Attention score가 높은 벡터, 즉 집중의 정도가 높은 벡터일 수록 더 유사한 의미를 가지는 벡터라고 볼 수 있을 것이다.

Context Vector는 최종적으로 디코더의 은닉 상태 벡터와 concat이 되어서 하나의 은닉 상태 벡터로 첫번째 토큰을 예측하는 데 사용된다. 다음 time step에서도 이와 같은 방식으로 Context Vector를 얻어 다음 토큰을 예측하는데 사용된다.

역전파로 학습을 할 때는 디코더가 적절한 attention score를 얻도록 하는 디코더의 은닉 상태 벡터를 반환하도록 파라미터를 갱신한다. 그리고 학습시에는 디코더의 입력 토큰으로는 이전 time step의 출력 토큰이 아닌 데이터셋의 ground truth를 사용한다. 따라서 이전 time step에서 틀린 토큰을 예측했더라도 다음 time step의 입력 토큰으로는 올바른 ground truth의 토큰이 사용된다. 이를 Teacher Forcing이라고 한다. Teacher Forcing은 학습을 용이하게 하지만 반대로 학습 환경과 실제 환경과의 괴리를 낳기도 한다. 따라서 초기 학습 시에는 배치를 Teacher Forcing 배치로 구성하다가 이후 모델의 정확도가 어느정도 올라간 후에는 Teacher Forcing을 사용하지 않는 방식으로 모델을 학습하기도 한다.

{:#Attention Mechanisms}
## Attention Mechanisms
Attention score를 구하는 다른 방법으로 다음과 같은 식들이 있다.

$$
score(h_t, \bar h_s) = 
\begin{cases}
h_t^T \bar h_s&\text{dot}\\
h_t^T W_a \bar h_s&\text{general}\\
v_a^T tanh\left(W_a [h_t;\bar h_s] \right)&\text{concat}\\
\end{cases}
$$

첫번째, 두번째 방식은 모두 내적의 정의를 만족한다. 첫번째 방식은 유클리드 내적, 두번째 general 방식은 $W_a$ 가 곱해진, 유클리드 내적의 일반화된 형태로 볼 수 있는 유클리드 가중 내적으로 볼 수 있다. 마지막 방식은 concat 기반의 방식으로, 두 벡터 $h_t, \bar h_s$ 를 concat하여 $tanh$ 를 활성화 함수로 가지는 1개 층 짜리 FFNN에 대입하는 것으로 볼 수 있다. 뿐만 아니라 레이어를 더 쌓는 것도 가능하다. 그리고 그 결과값과 $v_a$ 와의 내적을 통해 최종적으로 스칼라 값을 구할 수 있다.

Attention은 매우 좋은 성능을 낸다. Attention의 장점은 다음과 같다.

- 기계번역의 성능을 높임.
- Seq2Seq의 병목 문제를 해결함.
- 경사 소실/폭발 문제를 해결함.
- 어느 벡터에 집중하는지를 바탕으로 모델을 해석할 수 있음. 특히 어텐션 스코어는 시각화도 용이하여 어느 시점에서 모델이 어떤 벡터에 집중하는 지를 한눈에 알아보기 쉬움.

이러한 장점으로, Attention이 적용된 Seq2Seq는 기계번역의 품질을 크게 향상 시키고 다른 분야에서도 널리 사용되었다. 더 나아가 Attention 만을 이용하여 구성한 Transformer는 ChatGPT, BERT와 같은 자연어 처리의 혁명적인 모델들을 만들어냈다.

> [이전 포스트](./nlp1) |
