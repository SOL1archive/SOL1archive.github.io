---
title: 자연어처리 노트(1)
feed: show
date: 03-02-2023
mathjax: true
toc: true
---

* TOC
{:toc}

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

{:#Backpropagtion through time and Long-Term-Dependency}
## Backpropagtion through time and Long-Term-Dependency
RNN의 학습은 Backpropagtion through time and Long-Term-Dependency을 통해 그라디언트를 구하여 이루어진다. RNN의 모델의 순방향 전파를 통해 얻은 예측값과 Ground Truth 데이터를 이용해 비용 함수를 정의할 수 있다. 

기본 RNN의 문제는 여기서 발생한다. 학습 계산 그래프 상에서 더 이전 time step으로 갈수록 파라미터가 [감소(_Gradient Vanishing_)하거나 증가(_Gradient Explosion_)](step2-3.md)한다.

{:#LSTM(_Long Short-Term Memory), GRU(_Gated Recurrent Unit_)}
## LSTM(_Long Short-Term Memory), GRU(_Gated Recurrent Unit_)
LSTM, GRU는 바닐라 RNN의 문제를 개선했다. LSTM의 구현은 다음과 같다.

$$
\{c_t, h_t\} = \text{LSTM}\left(x_t, c_{t - 1}, h_{t - 1} \right)
$$

이 때 $c_{t - 1}$ 은 셀 상태 벡터(_Cell State Vector_), $h_{t - 1}$ 은 은닉 상태 벡터(_Hidden State Vector_)라고 한다. 이처럼 기본 RNN에서 하나였던 이전 상태 벡터가 LSTM에서는 두가지로 나뉜다. 일반적으로 셀 상태 벡터는 온전한 데이터라고 볼 수 있고, 은닉 상태 벡터는 해당 time step에서 필요한, 가공된 데이터라고 볼 수 있다.

이제 LSTM의 구체적인 구현을 살펴보자. LSTM의 구체적인 구현은 'Gate'라고 불리는 다음의 네가지 벡터로 이루어진다.

- $i$ : Input Gate, 셀 상태 벡터에 데이터를 저장할지 결정하는 게이트
- $f$ : Forgot Gate, 셀 상태 벡터에 데이터를 삭제할지 결정하는 게이트
- $o$ : Output Gate, 얼마나 셀
- $g$ : Gate

$$
\begin{gathered}
\begin{bmatrix}
i\\
f\\
o\\
g\\
\end{bmatrix} = 
\begin{bmatrix}
\sigma\\
\sigma\\
\sigma\\
tanh\\
\end{bmatrix}
\left(
W
\begin{bmatrix}
h_{t - 1}\\
x_t
\end{bmatrix}
+ \bold{b}
\right)
\\
\begin{aligned}
c_t &= f \cdot c_{t - 1} + i \cdot g\\
h_t &= o \cdot tanh(c_t)
\end{aligned}
\end{gathered}
$$

벡터 $
\begin{bmatrix}
h_{t - 1}\\
x_t\end{bmatrix}
$ 는 벡터 $h_{t - 1}, x_t$ 를 concat한 벡터이다. 따라서 벡터의 크기는 두 벡터의 크기를 합한 값과 같다. 가령 두 벡터의 크기가 모두 $d$ 일 때 가중치 행렬 $W$ 와 편향 벡터 $\bold{b}$ 의 크기와 연산 과정은 다음과 같다.

$$
\begin{aligned}
W &: 4d \times 2d\\
\bold{b} &: 4d \times 1
\end{aligned}
$$

$W: 4d \times 2d$ 이고 $
\begin{bmatrix}
h_{t - 1}\\
x_t\end{bmatrix} : 2d \times 1
$ 이므로 $
W \begin{bmatrix}
h_{t - 1}\\
x_t\end{bmatrix} : 4d \times 1
$ 이 된다. 이 벡터를 $d$ 단위로 쪼개서 $\begin{bmatrix}
\sigma\\
\sigma\\
\sigma\\
tanh\\
\end{bmatrix}$ 에 각각 대입한다. 이때 $\sigma$ 는 시그모이드(_Sigmoid_) 함수이다. 그러면 네가지 게이트 벡터를 얻을 수 있다. 

각각의 게이트를 구하는 연산은 다음과 같이 다르게 표현할 수도 있다.

$$
\begin{aligned}
i_t &= \sigma \left(W_i \cdot \begin{bmatrix} h_{t - 1}\\ x_t \end{bmatrix} + \bold{b} _i \right)\\
f_t &= \sigma \left(W_f \cdot \begin{bmatrix} h_{t - 1}\\ x_t \end{bmatrix} + \bold{b} _f \right)\\
o_t &= \sigma \left(W_o \cdot \begin{bmatrix} h_{t - 1}\\ x_t \end{bmatrix} + \bold{b} _o \right)\\
g_t &= tanh \left(W_g \cdot \begin{bmatrix} h_{t - 1}\\ x_t \end{bmatrix} + \bold{b} _g \right)\\
\end{aligned}
$$

마지막으로 네가지 벡터를 이용해 다음의 연산을 수행하면 time step $t$ 에 대한 셀 상태 벡터( $c_t$ )와 은닉 상태 벡터( $h_t$ )를 모두 구할 수 있다.

$$
\begin{aligned}
c_t &= f \cdot c_{t - 1} + i \cdot g\\
h_t &= o \cdot tanh(c_t)
\end{aligned}
$$

이전 time step의 셀 상태 벡터에 Forgot gate를 곱하는 것은 기존의 셀 상태 벡터에서 얼마나 잊을 것인지를 결정하는 것이라고 볼 수 있고, $i \cdot g$ 를 곱하는 것은 새로운 데이터를 셀 상태 벡터에 더할 것인지를 결정하는 것이라고 볼 수 있다. 이 중 Gate Gate는 현재 time step의 입력에 대한 데이터로, $\widetilde C_t$ 라고도 표현한다. 그리고 Input Gate는 생성된 Gate Gate의 정보를 얼마만큼 더할 것인지를 산출한다.

은닉 상태 벡터 $h_t$ 는 현재 time step의 셀 상태 벡터와 Output Gate와의 곱으로 구해 출력값으로 사용하는 동시에 다음 time step에 전달한다.

{:#GRU(_Gated Recurrent Unit_)}
## GRU(_Gated Recurrent Unit_)

$$
\begin{aligned}
z_t &= \sigma \left(W_z \cdot \begin{bmatrix} h_{t - 1}\\ x_t \end{bmatrix} \right)\\
r_t &= \sigma \left(W_r \cdot \begin{bmatrix} h_{t - 1}\\ x_t \end{bmatrix} \right)\\
\widetilde h_t &= tanh \left(W \cdot \begin{bmatrix} r_t \cdot h_{t - 1}\\ x_t \end{bmatrix} \right)\\
h_t &= (1 - z_t) \cdot h_{t - 1} + z_t \cdot \widetilde h_t
\end{aligned}
$$

GRU의 구조는 LSTM과 유사하지만 LSTM보다 파라미터 수가 더 적어 가볍고 학습이 빠르다. GRU는 LSTM과 달리 이전 상태 벡터로 은닉 상태 벡터(_Hidden State Vector_)만을 갖는다. GRU의 은닉 상태 벡터는 LSTM의 셀 상태 벡터와 유사한 역할을 한다. 은닉 상태 벡터 $h_t$ 를 구할 때 $(1 - z_t)$ 는 여사건의 확률이라고 볼 수 있을 것이다. 별도의 Forgot Gate 대신 $(1 - z_t)$ 를 사용하고, Input Gate의 역할로 $z_t$ 를 사용하여 파라미터의 수와 학습 및 추론 과정에서의 연산량을 줄였다.

GRU는 경량화된 모델임에도 LSTM과 비슷한 성능을 보여준다. 또 LSTM과 GRU는 추론과정에서 새로운 정보를 이전 상태 벡터에 곱하지 않고 더하기 때문에 Back Prop.에서 Gradient Vanishing/Explosion이 일어나지 않는다.
