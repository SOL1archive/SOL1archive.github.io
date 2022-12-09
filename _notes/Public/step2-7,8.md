---
title: 머신러닝 노트(2-7,8)
feed: show
mathjax: true
---

* TOC
{:toc}

{:#소프트맥스 회귀 (_Softmax Regression_)}
## 소프트맥스 회귀 (_Softmax Regression_)
지금까지 다루었던 분류 문제는 모두 이진 분류였다. 하지만 3개 이상의 선택지중 하나를 고르는 분류문제도 존재한다. 이때는 로지스틱 회귀를 일반화시킨 소프트맥스 회귀(_Softmax Regression_)을 사용한다. 우선 $C$ 를 분류 선택지의 개수라고 하자.

고양이를 1, 강아지를 2, 병아리를 3이라 하고 이 셋 모두 아닌 것을 0이라고 하자. 이를 분류하는 모델에 대해서 $C = 4$ 이다. 그리고 일반적으로 출력층의 유닛 개수인 $n^{[L]} = 4 = C$ 이 될 것이다. 우리가 원하는 것은 각 선택지에 대한 확률이 어떻게 되냐는 것이다. 그러므로 각 출력층 유닛의 출력값은 다음과 같이 각 선택지의 확률을 의미할 것이다.

$$
\begin{aligned}
a^{[L]}_0 &= P(y\in others\ |X)\\
a^{[L]}_1 &= P(y = 1\ |\ X)\\
a^{[L]}_2 &= P(y = 2\ |\ X)\\
a^{[L]}_3 &= P(y = 3\ |\ X)\\
\end{aligned}
$$

그러므로 예측값이 $\hat y$ 는 다음과 같을 것이다. 

$$
\hat y = a^{[L]}\ :\ 4 \times 1
$$

그리고 우리가 원하는 것은 확률이므로 다음과 같이 $\hat y$ 의 값의 합은 1이 되어야 한다.

$$
\sum_{i=0}^3 a^{[L]}_i = 1
$$

이러한 결과를 얻기 위해 소프트맥스 층을 사용한다. 소프트맥스 함수는 활성화 함수의 한 종류로 출력층의 $z^{[L]} = W^{[L]} a^{[L - 1]} + b^{[L]}$ 에 대해 다음과 같이 표현된다.


$$
\begin{aligned}
t &= e^{z^{[L]}}\\
a^{[L]} &= \frac{t}{\ \ \ \ \sum\limits_{j=1}^4 t_j\ \ \ } : 4 \times 1
\end{aligned}
$$

그러므로 출력값의 각 원소는 다음과 같다.

$$
a^{[L]}_i = \frac{t_i}{\ \ \ \ \sum\limits_{j=1}^4 t_j\ \ \ }
$$

이 활성화 함수가 이전에 다루었던 시그모이드, ReLU와 다른 점은 정의역과 치역이 벡터라는 것이다. 시그모이드, ReLU는 실수를 정의역으로 받아 치역 또한 실수 집합이다. 반면 소프트맥스는 벡터가 정의역이 되고, 벡터의 원소를 모두 더해 벡터를 치역으로 한다.

이렇게 소프트맥스를 사용하면 반환된 벡터의 원소의 합이 1이 되므로, 우리가 앞서 원했던 모든 조건을 만족한다. 

{:#소프트맥스 분류기 훈련시키기}
## 소프트맥스 분류기 훈련시키기
이제 소프트맥스 함수를 이용해 훈련시키는 방법에 대해 다루어보자. 우리가 배워야 할 것은 다른 활성화함수와 달리 벡터를 입력으로 받아 벡터를 반환하는 함수에 대한 학습법이다. 일단 소프트맥스와 대비되는 하드맥스(_Hardmax_)를 살펴보자. 하드맥스는 입력 벡터중 가장 값이 큰 원소의 자리에는 1, 다른 원소에는 0을 대입해 벡터로 반환하는 함수이다. 소프트맥스는 하드맥스에 비해 _부드러운(Smooth)_ 함수임을 확인할 수 있다.

그리고 확인해야 할 것은 소프트맥스는 로지스틱 회귀의 일반화된 형태라는 것이다. 그래서 $C = 2$ 인 소프트맥스는 로지스틱 회귀와 같아야한다. 이는 다음과 같이 증명될 수 있다.

$$
\begin{aligned}
Let\ C = 2,&\\
f_{softmax}\ &:\ {\mathbb{R}}^2 \rightarrow {\mathbb{R}}^2\\
             &:\ \begin{bmatrix}x_1\\x_2\end{bmatrix} \mapsto \begin{bmatrix}y_1\\y_2\end{bmatrix}\\
\end{aligned}
$$

소프트맥스의 정의에 의해 $y_1 + y_2 = 1$ 이다. 따라서 $y_1, y_2$ 를 모두 계산할 필요 없이 둘 중하나만 계산하면 다른 하나도 구할 수 있다. 여기서는 $y_1$ 을 구하겠다. 그러면 식을 다음과 같이 전개할 수 있다.

$$
\begin{aligned}
g &:= y_1\\
&\ = \frac{e^{x_1}}{e^{x_1} + e^{x_2}}
\ \left(
\because\ 
f_{softmax} = 
\begin{bmatrix}
\frac{e^{x_1}}{e^{x_1} + e^{x_2}}\\
\frac{e^{x_2}}{e^{x_1} + e^{x_2}}\\
\end{bmatrix} \right)\\
&\ = \frac{1}{1 + e^{x_2 - x_1}}\\
x &:= x_2 - x_1,\\
\therefore g &\ = \frac{1}{1 + e^{x}} = \sigma(x)
\end{aligned}
$$

이제 본격적으로 소프트맥스 함수를 훈련하는 방법에 대해 알아보자. 훈련을 위해서는 비용함수를 먼저 정의해야 한다. 실제 정답 (_Ground Truth_) $y$ 과 예측값 $\hat y$ 는 다음과 같을 것이다.

$$
y = 
\begin{bmatrix}
0\\1\\0\\0\\
\end{bmatrix},\ \ 
\hat y = a^{[L]} = 
\begin{bmatrix}
0.3\\0.2\\0.1\\0.4\\
\end{bmatrix}
$$

이에 대해 오차함수는 다음과 같이 정의할 수 있을 것이다. 

$$
\mathcal{L} (\hat y,\ y) = - \sum_{j = 1}^C y_j\ log\ \hat {y_j}\ \ \left(C = 4 \right)
$$

여기서 주의해야 할 것은 Ground Truth인 $y$ 는 단 하나의 원소만 1, 나머지는 모두 0이라는 것이다. 주어진 경우 $y_1 = y_3 = y_4 = 0$ 이다. 주어진 오차함수에서 $y_j = 0$ 인 경우는 고려하지 않아도 되므로, 다음과 같이 식을 정리할 수 있다.

$$
\mathcal{L} (\hat y,\ y) = - log\ \hat {y_2}
$$

학습 알고리즘은 모든 데이터에 대해 오차함수의 합(=비용함수)이 최소가 되도록 갱신해줄 것이다. 최소로 만드는 방법은 $- log\ \hat {y_2}$ 을 최소로 하는 것 이므로, 결과적으로는 $y_2$ 를 최대로 해야 할 것이다. 비용함수 $J$ 는 다음과 같다.

$$
J(w^{[L]}, b^{[L]}, \cdots) = \frac{1}{m} \sum_{i = 1}^m \mathcal{L} ({\hat y}^{(i)}, y^{(i)})
$$

이 때 데이터셋의 Ground Truth 들은 모두 $4 \times 1$ 열벡터이므로 전체 데이터셋의 Ground Truth와 $\hat y$ 은 다음과 같다.

$$
\begin{aligned}
Y &= 
\begin{bmatrix}
y^{(1)}\ |\ y^{(2)}\ |\ \cdots\ |\ y^{(m)}
\end{bmatrix}\\
&=
\begin{bmatrix}
0&0&\cdots&1\\
1&0&\cdots&0\\
0&0&\cdots&0\\
0&1&\cdots&0\\
\end{bmatrix} : 4 \times m\\
\ \\
\hat Y &= 
\begin{bmatrix}
{\hat y}^{(1)}\ |\ {\hat y}^{(2)}\ |\ \cdots\ |\ {\hat y}^{(m)}
\end{bmatrix}\\
&=
\begin{bmatrix}
0.3&0.1&\cdots&0.4\\
0.2&0.1&\cdots&0.2\\
0.1&0.3&\cdots&0.1\\
0.4&0.5&\cdots&0.3\\
\end{bmatrix} : 4 \times m
\end{aligned}
$$

이제 소프트맥스를 적용한 층의 비용함수를 바탕으로 역전파를 구현해보자.

$$
\begin{aligned}
Backprop.:&\\
\frac{\partial J}{\partial z^{[L]}} &= dz^{[L]} = \hat y - y : 4 \times 1
\end{aligned}
$$

이는 이전에 정의했던 $dz^{[L]}$ 와 크기가 같은 열벡터이므로 역전파를 잘 정의할 수 있다.

{:#지역 최적값(_Local Optima_) 문제}
## 지역 최적값(_Local Optima_) 문제
딥러닝의 초기 시기에는 지역 최적값에 갇히는 품질 낮은 최적화 알고리즘을 많이 사용했다. 하지만 딥러닝 기술이 발전함에 따라서 지역 최적값에 대한 인식이 바뀌었다. 초기에 낮은 차원에서 보았을 때는 많은 지역 최적값이 보이는 것처럼 보였다. 하지만 실제로 $\nabla J = \mathbb{0}$ 인 지점은 대부분이 지역 최적값(_Local Minimum_)이 아니라 _Saddle Point_ 이다. 일반적으로 비용함수는 각각의 차원에 대해 오목(_Concave Upward_)이거나 볼록(_Concave Downward_)이다. 머신러닝의 비용함수와 같이 정의역의 차원이 충분히 큰 경우 오목과 볼록이 여러 차원 방향으로 중첩되어 $\nabla J = \mathbb{0}$ 인 지점은 보통 Saddle Point가 될 가능성이 높다. 만약 지역해가 존재하기 위해서는 모든 차원에 대해 Concave Upward이어야 하는데, 20,000개 이상의 차원을 가지기도 하는 딥러닝 모델의 비용함수가 모든 차원에 대해 Concave Upward일 가능성은 매우 낮기 때문이다. 여기서 배울 수 있는 또 다른 점은 우리가 시각화할 수 있는 2,3차원상에서의 직관이 높은 차원에서는 제대로 적용되지 않을 수 있다는 것이다. 

오히려 더 큰 문제는 안정지대 문제(_Problem of Plateaus_)이다. 안정지대는 기울기가 0에 가까운 영역으로 학습을 아주 지연시킬 수 있다. 경사가 0에 가깝게 되면 경사하강법은 비용함수의 값을 한동안 거의 낮출 수 없게 된다. 따라서 일반 경사하강법이 아닌 모멘텀, RMSProp, Adam 등 다른 최적화 알고리즘을 이용해 해결해야 할 수 있다. 특히 Adam은 안정지대 내에서 학습 속도를 늘릴 수 있다. 

{:#Tensorflow}
## Tensorflow
`Tensorflow`는 `PyTorch`와 함께 대표적인 머신러닝 프레임워크이다. `Tensorflow`의 장점을 확인하기 위해 비용함수 $J = w^2 - 10w + 25$ 를 해결해야 한다고 하자. `Tensorflow`가 이 문제를 어떻게 해결하는지 확인해보자.

> Note. 다음 코드의 버전은 Lazy Evaluation이 기본으로 적용된 오래된 `1.x` 버전이고, Eager Execution이 적용된 최신 `2.x` 버전에서는 작동하지 않는다. 따라서 본 코드를 실행하고 싶다면 `tensorflow` 버전을 `1.x`로 바꾸거나, 다음 방법을 따르면 좋다.
> 
> 본 코드의 
> ```python
> import tensorflow as tf
> ```
> 부분을 
> ```python
> import tensorflow.compat.v1 as tf
> tf.disable_v2_behavior()
> ```
> 로 바꾸기.

```python
import numpy as np
import tensorflow as tf

w = tf.Variable(0, dtype=tf.float32)
cost = w**2 - 10. * w + 25 
train = tf.train.GradientDescentOptimizer(0.01).minimize(cost)

init = tf.global_variables_initializer()
session = tf.Session()
session.run(init)

for _ in range(1000):
    session.run(train)
print(session.run(w))
```

이 코드 중 4번 줄 `cost = w**2 - 10. * w + 25`에서의 **, *, +, - 산술연산은 파이썬 기본 연산이 아닌 tensorflow 상에서 오버로드된 연산이다. 따라서 다음 연산과 같다고 보아야한다.

```python
cost = tf.add(
    tf.add(
        w ** 2, 
        tf.multiply(-10., w)
        ), 
    25
    )
```

여기서 각 변수의 계수인 1, -10, 25도 다음과 같이 열벡터 데이터로 바꿀 수 있다.

```python
w = tf.Variable(0, dtype=tf.float32)
x = tf.placeholder(tf.float32, [3, 1])
cost = x[0][0] * w**2 + x[1][0] * w + x[2][0]
```

이와 같은 표현은 텐서플로우에게 x의 값을 나중에 줄 것이라고 말해주는 것이다. `x`에 대한 대입은 다음과 같이 `numpy` 배열로 수행할 수 있다.

```python
import numpy as np
import tensorflow as tf

coef = np.array([
    [1.],
    [-10.],
    [25.]
])

w = tf.Variable(0, dtype=tf.float32)
x = tf.placeholder(tf.float32, [3, 1])
cost = x[0][0] * w**2 + x[1][0] * w + x[2][0]
train = tf.train.GradientDescentOptimizer(0.01).minimize(cost)

init = tf.global_variables_initializer()
session = tf.Session()
session.run(init)

for _ in range(1000):
    session.run(train, feed_dict={x: coef})
print(session.run(w))
```

이처럼 `tf.placeholder`를 이용하면 학습데이터를 불러올 때 사용할 수 있다. 

이와 같이 텐서플로우를 이용해 식을 정의하면 자동적으로 계산 그래프를 생성하고 역전파 함수를 스스로 구현한다. 따라서 명시적으로 역전파를 구현할 필요가 없다.

> 본 노트는 Andrew Ng의 머신러닝 수업을 정리한 것임. 
> Andrew Ng, Machine learning lecture, [Youtube Link](https://www.youtube.com/playlist?list=PLkRLdi-c79HKEWoi4oryj-Cx-e47y_NcM)
