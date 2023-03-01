---
title: 자연어처리 노트(1)
feed: show
date: 03-02-2023
mathjax: true
toc: true
---

{:#RNN(_Recurent Neural Network_)}
## RNN(_Recurent Neural Network_)

RNN의 기본적인 정의는 다음과 같다.

$$
\begin{gathered}
h_t = f_W\left(h_{t - 1},\ x_t \right)\\
\downarrow\\
\begin{aligned}
h_t &= tanh\left(W_{hh} h_{t - 1} + W_{xy} x_t \right)\\
y_t &= W_{hy} h_t
\end{aligned}
\end{gathered}
$$

이 때 $h_t$ 는 hidden vector라고 하고 time step $t$ 시기의 내부 상태를 의미한다. $x_t$ 는 입력 벡터, $y_t$ 는 출력 벡터를 의미한다.

데이터셋이 주어지면 $x_t,\ y_t$ 의 크기는 결정된다.  $h_t$ 의 크기는 하이퍼파라미터로, 적절하게 조정되어야 한다. 기본적인 RNN의 경우 활성화 함수(_Activation Function_)는 $tanh$ 으로 설정한다. $W_{hh},\ W_{xy}$ 는 각 연산이 성립하도록 크기를 설정한다.

{:#Types of RNN}
## Types of RNN
다음은 RNN이 적용되는 종류로, RNN으로 해결하려는 문제의 종류에 따라 적절히 선택한다. 가령 One-to-Many는 이미지 캡셔닝(_Image Captioning_), Many-to-Many는 기계 번역(_Machine Translation_)에 주로 적용된다.

- One-to-One \
    입력과 출력의 time step $t$ 가 1인 방식이다.

- One-to-Many \
    입력이 하나의 time step, 출력이 여러 time step인 방식이다. 처음 time step에서 한번만 입력을 받고 더 이상 입력을 받지 않는다. 그 후 몇차례 time step을 거치면서 데이터를 출력한다. 즉 두번째 time step부터는 이전 time step의 hidden vector만으로 결과를 반복적으로 반환한다.

- Many-to-One \
    다수의 time step에서 입력을 받고 마지막 time step에서만 출력을 하는 방식이다. 다수의 time step 동안 입력 시퀀스를 입력받고 마지막 결과를 마지막 time step에서 반환한다.

- Many-to-Many \
    다수의 입력 시퀀스를 매 time step 동안 입력 받고 다수의 출력을 여러 time step동안 반환하는 방식이다. 두가지 종류로 나눌 수 있다. 하나는 처음 일정 time step동안 입력만 받고 출력을 반환하지 않는 방식이고, 다른 하나는 처음 time step부터 출력을 반환하는 방식이다.

{:#Character-Level Language Model}
## Character-Level Language Model
가장 간단한 형태의 언어모델로 문자 하나하나 단위의 언어모델을 의미한다. `'hello'`라는 단어에서 문자 단위 사전은 `['h', 'e', 'l', 'o']`로 구성된다. 이렇게 구성된 사전의 시퀀스가 각 time step의 입력으로 주어지면 언어모델은 다음 시퀀스(Character-Level에서는 문자)를 예측한다. 다음 글자로 가장 적합한 글자를 반환한다고 볼 수 있다. 이와 같은 특성으로 인해 Many-to-Many 방식을 사용한다.

실제 모델을 구현할 때는 output vector를 Softmax 함수에 대입하여 확률을 구한다. 그리고 데이터의 원핫 벡터를 ground truth로 설정해 cost function(일반적으로 Cross Entropy를 사용)을 구하여 학습한다.