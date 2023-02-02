---
title: 머신러닝 노트(1-2)
feed: show
date: 02-10-2022
mathjax: true
toc: true
---

* TOC
{:toc}

{:#이진분류(_Binary Classification_)}
## 이진분류(_Binary Classification_)
- 이진분류는 입력을 두 범주 중 하나로 분류하는 것을 의미한다.
- 이진분류의 데이터셋은 다음과 같이 수학적으로 표기될 수 있다.

> $(x, y)$에 대해, $X \in \mathbb{R}^{n_x}, y \in \{0, 1\}$ 일때, 데이터셋은 $\{ (X_1, y_1), (X_2, y_2), \cdots, (X_m, y_m) \}$ 과 같다.

이를 행렬로 표현하면 다음과 같다.

$$
X = \begin{bmatrix}
|&|&\cdots&|\\
|&|&\cdots&|\\
X_1&X_2&\cdots&X_m\\
|&|&\cdots&|\\
|&|&\cdots&|\\\end{bmatrix}\\
,\\
Y= [y_1,\ y_2,\ \cdots,\ y_m], (Y \in \mathbb{R}^{1 \times m})
$$

{:#로지스틱 회귀(_Logistic Regression_)}
## 로지스틱 회귀(_Logistic Regression_)
로지스틱 회귀는 이진분류 모델 중 하나이다.

주어진 피처 $X$ 에 대해 $\hat y$ 가 의미하는 바는 $y$ 가 1일 확률인 $\hat y = P(y = 1|X), (X\ \in \mathbb{R}^{n_x})$ 이다.
파라미터 $w$, $b$는 $w \in \mathbb{R}^{n_x}, b \in \mathbb{R}$ 이다. 

이를 이용해 $\hat y$ 을 표현하기 위해 가장 먼저 시도해 볼 수 있는 것은, 선형방정식의 형태로 다음과 같이 표현하는 것이다.

$$
\hat y = w^T X + b
$$

하지만  '회귀'가 아닌 '분류', 그 중에서도 이진분류를 수행하기 위해 다음과 같이 표현하는 것은 그리 적절하지 못하다. 왜냐하면 $y$는 항상 $y \in \{0, 1\}$ 이어야 하는데, 회귀식으로 이런 결과가 나오도록 하기는 매우 어렵기 때문이다. 

그래서 먼저 시그모이드 함수를 이용해 다음과 같이 표현을 시도해볼 수 있다.

$$
\hat y = \sigma (w^T X + b)
$$

혹은 파라미터인 가중치 $w$ 와 편향 $b$ 를 $\Theta$ 로 일반화하여 다음과 같이 표현할 수 있다.

$$
x_0 = 1,\\
\Theta = \begin{bmatrix}
\theta_0\\
\theta_1\\
\vdots\\
\theta_{n_x}
\end{bmatrix}, \\
\hat y = \sigma (\Theta^T X)
$$

이때 $\Theta_0 = b$ 이고, $\Theta$ 의 다른 원소들은 가중치 $w$ 이다.

시그모이드 함수의 식은 다음과 같다.

$$
\sigma (z) = \frac{1}{1 + e^{-z}}
$$

이와 같이 표현하면 $z$ 가 충분히 클때, $\sigma (z)$ 의 값은 1로 수렴하고, $z$ 가 충분히 작으면 $\sigma (z)$ 의 값은 0으로 수렴한다. 따라서 다음과 같다.

$$
z\ is\ large \rightarrow \sigma (z) \approx \frac {1}{1 + 0} = 1 \\
z\ is\ large\ neg. \rightarrow \sigma (z) \approx \frac {1}{1 + (Big\ Num)} \approx 0
$$

{:#비용함수(_Cost Function_)}
## 비용함수 (_Cost Function_)
로지스틱 회귀를 학습시키기 위해선 먼저 비용함수를 정의해야 한다. 비용함수는 훈련 데이터셋에 대해 예측이 얼마나 잘 되었는지 측정해주는 함수이다.

$$
\hat y = \sigma (w^T X + b),\ where\ \sigma(z) = \frac{1}{1 + e^{-z}}
$$

다음과 같은 로지스틱 회귀의 식에 대해 데이터셋을 대입하면 다음과 같을 것이다.

임의의 $i$ 번째 데이터 $(X_i, y_i)$ 에 대해,

$$
\hat y_i = \sigma (w^T X_i + b),\ where\ \sigma(z) = \frac{1}{1 + e^{-z}}, \\
z_i = w^T X_i + b
$$

이에 대해 예측 데이터와 실제 데이터의 차이를 표현한 손실함수는 다음과 같이 정의할 수 있다.

$$
L(\hat y,\ y) = \frac {1}{2} (\hat y - y)^2
$$

하지만 로지스틱 회귀에서는 사용하지 않는데, 다수의 지역해를 가지게 되어 경사하강법이 전역적 해를 찾지 못할 수 있기 때문이다. 그래서 로지스틱 회귀에선 다음과 같은 손실함수를 사용한다.

$$
L(\hat y,\ y) = - (y\ log\ \hat y + (1 - y)\ log(1 - \hat y))
$$

이와 같이 정의하면 비용함수는 전역적으로 아래로 볼록한 형태가 된다.

이때, 만약 $y = 1$이라면, $L(\hat y, y) = - log \ \hat y$ 이다. 우리는 손실함수의 값이 최소인 것을 원한다. 손실함수값이 최소이려면, $log\ \hat y$가 최대이어야 하고, 그러려면 다시 $\hat y$ 의 값이 최대이어야 할 것이다. $\hat y$ 은 시그모이드 함수의 치역이므로 1보다 클 수 없다. 따라서 손실함수의 값이 최소이려면 $\hat y$ 은 1에 수렴해야 한다.

반대로 $y = 0$이라면, $L(\hat y, y) = - log(1 - \hat y)$ 이고, 그에 따라 $\hat y$ 은 최대한 작아야 한다. 다시말해 $\hat y$ 은 0에 수렴해야 한다.

이 손실함수들을 바탕으로 비용함수를 다음과 같이 정의할 수 있다.

$$
J(w,\ b) = \frac {1}{m} \sum_{i = 1}^m L(\hat {y_i}, y_i) \\
= -\frac {1}{m} \sum_{i = 1}^m (y\ log\ \hat y + (1 - y)\ log(1 - \hat y))
$$

{:#경사하강법(_Gradient Descent_)}
## 경사하강법(_Gradient Descent_)
좋은 모델을 얻기 위해선 $J(w,\ b)$ 을 가장 작게 만드는 $w, b$ 를 찾는 게 중요할 것이다. 우리는 비용함수를 전역적으로 아래로 볼록하게 정의했다. 따라서 어느 한 지점에서 시작했을 때, 반복적으로 경사를 따라 하강하면 비용함수를 가장 작게 하는 지점에 도달할 수 있을 것이다.

{:#계산 그래프(_Computational Graph_)}
## 계산 그래프(_Computational Graph_)
신경망에는 전방향 전파와 역전파가 있다. 전방향 전파는 신경망의 출력값을 계산하고, 역방향 전파는 신경망의 경사와 도함수를 계산한다.

이를 설명하기 위해 먼저 다음과 같은 비용함수를 정의해보자.

$$
J(a,\ b,\ c) = 3(a + bc) \\
u = bc \\
v = a + u \\
J = 3v
$$

이는 다음과 같은 계산 그래프로 표현이 가능하다.

<div class="mermaid"> 
graph LR
A([a]) --> V[V = a + u]
B([b]) --> U[u = bc]
C([c]) --> U
U --> V
V --> J[J = 3v]
</div>

$(a, b, c) = (5, 3, 2)$ 라면,

<div class="mermaid"> 
graph LR
A([a = 3]) --> V[V = a + u = 11]
B([b = 3]) --> U[u = bc = 6]
C([c = 2]) --> U
U --> V
V --> J[J = 3v = 33]
</div>

이와 같은 계산 그래프 표현은 비용함수 $J$ 와 같이 특정 출력값 변수를 최적화하는 데에 유용하게 사용할 수 있다.

{:#계산 그래프를 이용한 미분}
## 계산 그래프를 이용한 미분

<div class="mermaid"> 
graph LR
A([a = 3]) --> V[V = a + u = 11]
B([b = 3]) --> U[u = bc = 6]
C([c = 2]) --> U
U --> V
V --> J[J = 3v = 33]
</div>

다음과 같은 계산 그래프가 있을 때, $\frac {dJ}{dv}$ 는 3임을 쉽게 확인할 수 있다. 이는 $J$ 에서 $v$ 로 역전파한 것이라고 볼 수 있을 것이다. 또, $\frac {dJ}{da} = 3$ 인 것도 쉽게 확일 할 수 있을 것이다. 이는 연쇄법칙으로 다음과 같이 표현 가능하다.

$$
\frac {dJ}{da} = 3 = \frac {dJ}{dv} \frac{dv}{da}
$$

이는 $J \rightarrow v$ 의 역전파가 $a$ 에 대한 역전파(미분계수 구하기)에 도움을 준다는 것이다. 

실제 코드로 이를 표현할 때 매번 $\frac {dJ}{da}$ 으로 이름을 붙이는 것은 복잡해지므로, 이를 간략하게 $da$ 라고 표현하기도 한다.

$b, c$ 에 대해서도 연쇄법칙으로 역전파를 통해 미분계수를 구할 수 있다.

$$
\frac {dJ}{db} = \frac {dJ}{du} \frac{du}{db} = 3c = 6
$$

이와 같이 도함수를 구할 땐 전방향 전파와 반대방향으로 역전파하여 도함수를 구한다.

{:#로지스틱 회귀의 경사하강법}
## 로지스틱 회귀의 경사하강법
로지스틱 회귀는 다음 계산 그래프로 표현 가능하다.

<div class="mermaid"> 
%%{ init: { 'flowchart': { 'curve': 'linear' } } }%%
flowchart LR
X1([X1]) --> Z[w_1x_1 + w_2x_2 + b]
W1([w1]) --> Z
X2([X2]) --> Z
W2([w2]) --> Z
B([b]) --> Z
Z --> Y[y = a = 6]
Y --> L[L]
</div>

역전파를 통해 $dw_1$ , $dw_2$ 를 구할 수 있다.

$$
dw_1 = \frac {\partial L}{\partial w_1} = \frac {\partial L}{\partial z} \frac {\partial z}{\partial w_1} = x_1
$$

$$
dw_2 = \frac {\partial L}{\partial w_2} = \frac {\partial L}{\partial z} \frac {\partial z}{\partial w_2} = x_2
$$
{:#m개 샘플에 대한 경사하강법}
## m개 샘플에 대한 경사하강법
오차함수는 다음과 같이 정의된다.

$$
J(w,\ b) = \frac {1}{m} \sum_{i = 1}^m L(\hat {y_i}, y_i)
$$

따라서 $\frac {\partial}{\partial w_1} J(w,\ b)$ 는 다음과 같이 표현 가능하다.

$$
\frac {\partial}{\partial w_1} J(w,\ b) = \frac {1}{m} \sum_{i = 1}^m \frac {\partial}{\partial w_1} L(a_i, y_i)
$$

이는 다음과 같은 파이썬 코드로 표현 가능하다.

```python
import numpy as np

def sigmoid(x):
    return 1 / (np.exp(-x) + 1)

J = 0, dw_1 = 0, dw_2 = 0, db = 0

for i in range(m):
    z = np.dot(w.T, x[i]) + b
    a = sigmoid(z)
    J += -(y[i] * np.log(a) + (1 - y[i]) * np.log(1 - a))
    dz = a - y[i]
    dw_1 += x[i][0] * dz
    dw_2 += x[i][1] * dz
    db += dz

J /= m
dw_1 /= m
dw_2 /= m
db /= m
```

이 코드는 경사하강법의 한 단계를 수행한 것으로, 경사하강법을 수행할 때는 이를 반복한다.
이런 명시적인 `for`문은 다소 비효율적이므로 벡터화라는 방식을 이용해 벡터화를 통해 명시적인 `for`문 없이 학습을 구현한다.


> 본 노트는 Andrew Ng의 머신러닝 수업을 정리한 것임. 
> Andrew Ng, Machine learning lecture, [Youtube Link](https://www.youtube.com/playlist?list=PLkRLdi-c79HKEWoi4oryj-Cx-e47y_NcM)

> [이전 포스트](https://sol1archive.github.io/note/step1-1) | [다음 포스트](https://sol1archive.github.io/note/step1-3)
