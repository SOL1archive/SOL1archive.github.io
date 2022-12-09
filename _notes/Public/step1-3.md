---
title: 머신러닝 노트(1-3)
feed: show
mathjax: true
toc: true
---

* TOC
{:toc}

벡터화는 코드에서 **명시적인** 반복문을 없애주는 역할을 한다. 벡터화는 큰 데이터 셋을 학습시킬 때 빛을 발하는 경우가 많다. 코드에서 반복문을 없애 학습 속도를 늘릴 수 있기 때문이다. 

{:#벡터화(_Vectorization_)}
## 벡터화(_Vectorization_)
로지스틱 회귀에서는 $\hat y = w^T X + b$ 를 계산해야 했다. 여기서 $w$, $x$ 는 모두 $w, x \in \mathbb{R}^{n_x}$ 인 벡터이다. 이를 벡터화하지 않고 구현하려면 다음과 같이 구현해야 한다.

```python
z = 0
for i in range(n_x):
    z += w[i] * x[i]
z += b
```

이렇게 `python` 반복문을 사용해 구현하면 속도가 느려지게 된다. 반대로 벡터화를 사용한 구현은 다음과 같다.

```python
import numpy as np
z = np.dot(w, x) + b
```

이러한 방식으로 `numpy` 라이브러리를 사용하면 `numpy`에 내장된 C 코드로 연산을 수행하기 때문에 연산 속도가 빨라진다. 참고로 이러한 방식은 수치해석에서 광범위하게 사용되는 이유고, `numpy`가 대중적이게 된 이유 중 하나이다.

GPU, CPU는 모두 `SIMD` 명령을 지원한다. `SIMD` 명령은 Single Instruction Multiple Data의 약자로, 동일한 명령을 다른 데이터로 동시에 수행하는 것을 의미한다. GPU는 `SIMD` 명령에 특화되어 있어 머신러닝에 주로 사용되지만 상대적으로 가벼운 머신러닝은 CPU에서도 충분히 가능하다. `numpy`는 `SIMD` 연산을 자체적으로 구현하기 때문에 `python` 반복문은 `numpy`가 사용할 수 없는 상황이 아니면 사용하지 않는 것이 좋다. 

{:#로지스틱 회귀의 벡터화}
## 로지스틱 회귀의 벡터화
자 이제 이전 포스트에 올렸던 로지스틱 회귀의 경사하강법 구현 코드를 보자. 

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
db /mat= m
```

이와 같이 `for`문으로 작성되면 학습 성능이 떨어진다. `numpy`를 사용한 코드로 바꾸기 위해 차례차례 순서를 밟아보자.

먼저 데이터 셋은 다음과 같이 표현 가능하다.
$$
X = \begin{bmatrix}
|&|&\cdots&|\\
|&|&\cdots&|\\
X_1&X_2&\cdots&X_m\\
|&|&\cdots&|\\
|&|&\cdots&|\\\end{bmatrix}
$$

이에 대하여 전방향 전파는 다음과 같이 표현 가능할 것이다.

$$
z^{(1)} = w^T X_1 + b \\
a^{(1)} = \sigma(z^{(1)}) \\
\ \\
z^{(2)} = w^T X_2 + b \\
a^{(2)} = \sigma(z^{(2)}) \\
\ \\
z^{(3)} = w^T X_3 + b \\
a^{(3)} = \sigma(z^{(3)}) \\
\cdots
$$

그러면 우리는 주어진 연산을 벡터화시키는 문제로 바꿀 수 있다.
먼저 다음과 같이 벡터 표현을 할 수 있을 것이다.

$$
Z =
\begin{bmatrix}
z^{(1)}\\
z^{(2)}\\
\vdots\\
z^{(m)}\\
\end{bmatrix} = 
w^T X + 
\begin{bmatrix}
b\\
b\\
\vdots\\
b\\
\end{bmatrix} =
\begin{bmatrix}
w^T X_1 + b\\
w^T X_2 + b\\
\vdots\\
w^T X_m + b\\
\end{bmatrix}
$$

이를 `python` 코드로 표현하면 다음과 같다.

```python
Z = np.dot(w.T, X) + b
```

여기서 주의해야할 점은 `python` 코드에서의 `b` 는 실수라는 것이다. 우리는 처음 수식에서 편향(_bias_)를 열벡터 형태로 표현했지만, `numpy`에서는 (벡터 or 행렬) + (실수) 꼴로 연산을 할 때 자동적으로 실수를 적절한 벡터 혹은 행렬로 변환한다. 이를 **브로드캐스팅**이라 한다.
> 브로드캐스팅에 대해 이해하고 싶다면 [이 링크](https://sacko.tistory.com/16) 를 참고하면 좋다.

다시 이를 활성화 함수(시그모이드 함수)에 대입하면 활성값 $a^{(i)}$ 의 벡터화 결과를 다음과 같이 얻을 수 있다.

$$
A = 
\begin{bmatrix}
a^{(1)}\\
a^{(2)}\\
\vdots\\
a^{(m)}\\
\end{bmatrix}
= \sigma(Z)
$$

{:#로지스틱 회귀의 경사하강법 벡터화}
## 로지스틱 회귀의 경사하강법 벡터화
이제 역전파를 벡터화시켜보자. $dz^{(i)}$ 는 다음과 같이 벡터화가 가능하다.

$$
dz^{(1)} = a^{(1)} - y^{(1)} \\
dz^{(2)} = a^{(2)} - y^{(2)} \\ \ \\
\vdots \\ \ \\
dz^{(m)} = a^{(m)} - y^{(m)}
$$

이를 벡터화 시키면 다음과 같다.

$$
dZ = 
\begin{bmatrix}
dz^{(1)}\\
dz^{(2)}\\
\vdots\\
dz^{(m)}\\
\end{bmatrix}
$$

그러면 $dz$ 는 다음과 같이 표현이 가능하다.

$$
A = 
\begin{bmatrix}
a^{(1)}\\
a^{(2)}\\
\vdots\\
a^{(m)}\\
\end{bmatrix}, \ 
Y = 
\begin{bmatrix}
y^{(1)}\\
y^{(2)}\\
\vdots\\
y^{(m)}\\
\end{bmatrix}
$$

에 대하여,

$$
dZ = A - Y = 
\begin{bmatrix}
a^{(1)} - y^{(1)}\\
a^{(2)} - y^{(2)}\\
\vdots\\
a^{(m)} - y^{(m)}\\
\end{bmatrix}
$$

이다.

다시 가중치를 벡터화하면,

$$
db = \frac{1}{m} \sum_{i=1}^m dz^{(i)} \\
dw = \frac{1}{m} X \cdot dZ^T
$$

이다. 이를 `python` 코드로 표현하면 다음과 같다.
```python
db = np.sum(dZ) / m
dw = np.sum(
    np.dot(X, dZ.T)
)
```

이제 최종적으로 처음의 경사하강법 코드를 `numpy`를 사용한 효율적인 코드로 바꾸어보자.

```python
import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

Z = np.dot(w.T, X) + b
A = sigmoid(Z)
dZ = A - Y
dw = np.dot(X, dZ.T) / m
db = np.sum(dZ) / m

# n은 학습률
w = w - n * dw
b = b - n * db
```

하지만 여전히 경사하강법은 반복적으로 연산되는 최적화 방법이기 때문에 이를 여러번 반복해야 한다.

> `numpy`의 구체적인 사용법은 본 포스팅의 주제에서 벗어나므로, 책 파이썬과 수치해석 2/e(로버트 요한슨)을 참고하면 좋다.

{:#로지스틱 회귀의 비용함수}
## 로지스틱 회귀의 비용함수
로지스틱 회귀에서 $y$ 의 예측값 $\hat y$ 는 다음과 같다.

$$
\hat y = \sigma(w^T x + b) = P(y = 1|x)
$$

이는 $\hat y$ 이 $y = 1$ 일 확률과 같다는 것이다.
이말은 다음과 같이 풀어서 표현할 수 있다.

$$
If\ \ y = 1 :\ P(y|x) = \hat y \\
If\ \ y = 0 :\ P(y|x) = 1 - \hat y \\
y \in \{0, 1\}
$$

위 식은 다시 다음과 같이 표현할 수 있을 것이다.

$$
P(y|x) = {\hat y}^y (1 - \hat y)^{(1 - y)}
$$

이는 $P(y \lvert x)$ 의 정확한 정의이다.

그리고 로그함수는 강한 단조 증가함수이기 때문에, $log\ P(y \lvert x)$ 를 최대화 하는 것은 $P(y \lvert x)$ 를 최대화 하는 것과 같다. 그리고 $log\ P(y \lvert x)$ 는 로그함수의 성질에 따라 다음과 같이 표현할 수 있다.

$$
log\ P(y \lvert x) = y\ log \ \hat y + (1 - y)\ log(1 - \hat y) \\
= - L(\hat y,\ y)
$$

이는 전에 정의한 손실함수의 음수가 됨을 확인할 수 있다. 음수가 되는 이유는, 확률의 관점에서 보았을 땐 값을 최대화하고자 하지만 손실함수의 관점에서는 최소화 되는 것이 좋기 때문이다.

이제 이렇게 구한 손실함수를 바탕으로 전체 훈련 데이터셋에 대한 비용함수를 구해보자. 먼저 훈련 데이터셋이 독립동일분포라고 가정해보자. 전체 데이터셋 $X, y$ 에 대해, 훈련 셋의 모든 레이블에 대한 확률 $P(y \lvert X)$ 는 다음과 같다.

$$
P(y \lvert X) = \prod_{i = 1}^m P(y_i \lvert X_i)
$$

최대우도측정을 위해, 비용함수에도 로그를 취하면 다음과 같다.

$$
log\ P(y \lvert X) = log\ \prod_{i = 1}^m P(y_i \lvert X_i) = - \sum_{i = 1}^m L({\hat y}_i,\ y_i )
$$

결과적으로 비용함수는 다음과 같이 표현된다.

$$
J(w, b) = \frac{1}{m} \sum_{i = 1}^m L({\hat y}_i,\ y_i)
$$

> 본 노트는 Andrew Ng의 머신러닝 수업을 정리한 것임. 
> Andrew Ng, Machine learning lecture, [Youtube Link](https://www.youtube.com/playlist?list=PLkRLdi-c79HKEWoi4oryj-Cx-e47y_NcM)

> [이전 포스트](https://sol1archive.github.io/note/step1-2) | [다음 포스트](https://sol1archive.github.io/note/step1-3)
