---
title: 머신러닝의 수학적 구현(_Mathematical Implementation of Machine Learning_)
feed: show
mathjax: true

---

# 머신러닝의 수학적 구현
## 뉴런의 모델링
머신러닝은 기본적으로 신경망의 작동구조를 모방한다. 따라서 머신러닝을 컴퓨터로 구현하기 위해서는 신경망의 작동원리를 수학적으로 모델링하는 것이 필수적이다. 신경망의 기본단위는 뉴런이므로, 신경망을 모델링하기 위해선 우선 뉴런을 모델링해야 한다. 뉴런은 다음과 같이 모델링할 수 있다. $w_i$를 가중치(_weight_), $b$를 편향(_bias_)라고 한다.
$$
y = f_{activ}(w_1x_1 + w_2x_2 + w_3x_3 + \cdots + w_nx_n + b) \\
= f_{activ}(\sum_{k=1}^nw_k x_k + b)
$$
이렇게 모델링된 뉴런을 퍼셉트론이라고 부른다. 활성화 함수인 $f_{activ}$는 일반적으로 두 식 중 하나를 사용한다. 첫째 식은 단위계단함수로, 실제 뉴런의 활성화와 유사하지만, $x=0$ 에서 미분 불가하다는 특징을 가지고 있다. 둘째 식은 시그모이드함수로, 정의역 $\mathbb R$에 대해 미분이 가능하다.
$$
f_{activ}(x) = 
\begin{cases}
1,\; x > 0 \\
0,\; x < 0
\end{cases} \\
f_{activ}(x) = 
\frac{1}{1 + e^{-x}}
$$
딥러닝은 이와 같이 모델링된 뉴런들을 다중 레이어에 배치하여 구현한다.

### 벡터(_Vector_)
뉴런의 수학적 모델링은 이와 같이 표현가능하지만, 더 간편한 표현을 위해 벡터와 행렬을 사용한다. 벡터는 기저의 실수배의 합을 통해 정의된다. 기저는 벡터공간을 선형생성하는, 선형독립인 단위벡터로 정의한다. 쉽게 표현하면, 임의의 $N$차원 공간의 $x$축, $y$축과 같은 축의 양의 방향을 가지는, 크기가 1인 벡터이다. 기저는 $\overrightarrow{e_1},\;\overrightarrow{e_2},\;\cdots,\;\overrightarrow{e_n}$과 같이 표현한다. 벡터는 기저들의 실수배의 합으로 정의된다. 가령 벡터$\overrightarrow{v}$의 시점이 $(0, 0)$이고, 종점이 $(3, 2)$일 때, 벡터 $\overrightarrow{v}$는 다음과 같이 표현가능하다.
$$
\overrightarrow{v} = 3\overrightarrow{e_1} + 2\overrightarrow{e_2}=\;(3, 2)
$$

벡터의 연산 중에는 스칼라곱(_dot product_)과 벡터곱(_cross product_)가 있다. 그 중 스칼라곱은 다음과 같이 정의할 수 있다.
$$
\overrightarrow{a} := (a_1,\;a_2,\;\cdots,\;a_n),\;\overrightarrow{b} := (b_1,\;b_2\;\cdots,\;b_n) \\
\overrightarrow{a} \cdot \overrightarrow{b} = a_1b_1 + a_2b_2 + \cdots + a_nb_n
= \sum_{k=1}^na_kb_k
$$
스칼라곱을 이용하면 뉴런의 모델링을 다음과 같이 더 간략하게 표현할 수 있다.
$$
\overrightarrow{w} := (w_1, w_2, \cdots, w_n),\;\overrightarrow{x} := (x_1, x_2, \cdots, x_n) \\
y = f_{activ}(\overrightarrow{w} \cdot \overrightarrow{x} + b)
$$
실제로 뉴런들을 묶어 신경망을 구성하여 연산할 때는, 벡터들을 다시 행렬로 정의하여 행렬곱을 사용하여 신경망을 더 간략하게 기술한다.

## 회귀분석(_Regression_)
회귀분석은 특정 변수들(_feature_)과 다른 한 변수(_target_)의 관계를 분석하는 통계적 기법이다. 회귀분석은 머신러닝에서 광범위하게 쓰이지만, 그 중 선형회귀는 신경망 학습에 쓰이기도 한다. 선형회귀는 직선의 방정식을 회귀방정식으로 사용하는 회귀분석이다. 가령 다음과 같은 데이터가 있다고 해보자.
|Index|$x$|$y$|
|-|-|-|
|1|$x_1$|$y_1$|
|2|$x_2$|$y_2$|
|$\vdots$|$\vdots$|$\vdots$|
|n|$x_n$|$y_n$|

이 데이터에 타겟을 $y$, 피처를 $x$ 로하는 선형회귀를 한다는 것은, 직선의 방정식 $y = px + q$를 이용해 두 데이터 간의 관계를 표현하는 것이다. 이 때 각 데이터와 실제의 오차 $e_k$는 $e_k = y_k - (px_k + q)$과 같을 것이다. 그런데 이 오차의 부호는 양수, 음수 모두 될 수 있으므로, 다루기에는 적합하지 않다. 따라서 오차를 다룰 때에는 오차값에 제곱을 하여 ${e_k}^2$으로 다룬다. 회귀 분석의 에러함수는 다움과 같이 나타낼 수 있다.
$$
C_T = \sum_{k=1}^n{e_k}^2 = \sum_{k=1}^n(y_k - (px_k + q))^2
$$
에러함수의 정의역이 ${\mathbb R}^N$이고, 정의역 전체 원소에 대해 미분가능하다고 하자. 그렇다면 페르마의 정리를 $N$차원으로 확장하여(최솟값의 필요조건), 에러함수가 최솟값을 가지는 지점은 다음 식을 만족시킬 것이라 추론할 수 있다.
$$
\dfrac{\partial\;C_T}{\partial p} = 0\;\land\;\dfrac{\partial\;C_T}{\partial q} = 0
$$

### 경사하강법(_Gradient Descend_)

최솟값의 필요조건은 최솟값의 조건에 대해서만 말해줄 뿐, 구체적으로 어떤 값인지, 어떻게 찾을 수 있는지를 알려주지는 않는다. 이를 위해서는 수치해석에 기반한 수학적 최적화 방법인 경사하강법(_Gradient Descend_)를 이용하기도 한다. 경사하강법을 이해하기 위해선 우선 다변수함수의 근사에 대해서 이해해야 한다.

#### 다변수함수의 근사
먼저 미분의 정의에 근사를 적용하면 다음과 같다.
$$
\dfrac{df}{dx} \approx \frac{f(x + \Delta x) - f(x)}{\Delta x} \\
\Leftrightarrow f(x + \Delta x) - f(x) \approx \dfrac{df}{dx}\Delta x 
$$
이를 이변수함수로 확장해보자.
$$
\Delta z = f(x + \Delta x, y + \Delta y) - f(x, y) \approx \dfrac{\partial f(x, y)}{\partial x}\Delta x + \dfrac{\partial f(x, y)}{\partial y}\Delta y
$$
이와 같은 식은 다음과 같이 $n$개의 정의역 변수를 가지는 다변수 함수에 대한 식으로도 확장하기 좋다.
$$
\Delta z = f(x_1 + \Delta x_1, x_2 + \Delta x_2, \cdots, x_n + \Delta x_n) - f(x_1, x_2, \cdots, x_n) \\
= \dfrac{\partial f}{\partial x_1} \Delta x_1 + \dfrac{\partial f}{\partial x_2} \Delta x_2 + \cdots + \dfrac{\partial f}{\partial x_n} \Delta x_n \\
=\sum_{k=1}^n \dfrac{\partial f}{\partial x_k}\Delta x_k
$$
이 식을 유심히 살펴보면 벡터의 내적과 형태가 유사함을 알 수 있다. 따라서 다음과 같이 식을 표현할 수 있을 것이다.
$$
\nabla f = (\dfrac{\partial f}{\partial x_1},\dfrac{\partial f}{\partial x_2}, \cdots, \dfrac{\partial f}{\partial x_n}),\;\Delta x := (\Delta x_1, \Delta x_2, \cdots, \Delta x_n) \\
\Delta z = \nabla f \cdot \Delta x
$$
$\nabla f = (\dfrac{\partial f}{\partial x_1},\dfrac{\partial f}{\partial x_2}, \cdots, \dfrac{\partial f}{\partial x_n})$ 의 형태로 다변수함수$f$를 각 정의역 변수들에 대한 편미분들을 벡터로 표현한 연산을 델 연산자(_Del operator_)라고 한다.

#### 경사하강법
경사하강법을 기하학적인 의미로 보면, 함수의 그래프 상 임의의 위치에서 가장 경사가 급한 방향으로 매 단계 재귀적으로 이동하면서 극솟값 지점을 찾는 방법이라고 할 수 있을 것이다. 그렇다면 한 지점에서 경사가 가장 급한 방향을 어떻게 찾을 수 있을까? 답은 델 연산자($\nabla$)에 있다. 한 지점에서 특정 정의역 변수값에 대해 편미분 값이 양수라는 뜻은, 정의역 변수의 값이 증가하면 함숫값도 증가함을 의미한다. 같은 원리로 편미분 값이 음수이면, 정의역 변수가 증가함에 따라 함숫값이 감소한다는 것이다. 따라서 한 지점에서 함숫값이 **최대로 감소하도록** 하는 각 변수의 변화량을 구하려면, 함수의 델 연산 값에 충분히 작은 음수를 곱하고, 그 만큼을 변수값에서 변화시키면 된다. 이를 식으로 표현하면 다음과 같다.
$$
\Delta x = - \eta\;\nabla f
$$
이를 재귀적으로 반복하면 극솟점에 도달할 수 있다. 하지만 이 방법에는 문제가 있다. 얻은 결과가 지역 최적해일 수 있다는 것이다. 경사하강법을 통해 얻은 결과는 전역적인 최솟값임이 보장되지 않는다.

> 출처: 처음 배우는 딥러닝 수학(와쿠이 요시유키, 와쿠이 사다미 저, 박광수 옮김), 한빛미디어, 2018