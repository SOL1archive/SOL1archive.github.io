---
title: 머신러닝 노트(2-3)
feed: show
mathjax: true
toc: true
---

* TOC
{:toc}

{:#입력값의 정규화(_Normalize_)}
## 입력값의 정규화(_Normalize_)
신경망의 훈련을 빠르게 하고 성능을 높이는 기법 중 하나는 입력을 정규화하는 것이다. 정규화는 다음 두 단계로 진행된다.

> Note. 이전 포스트들에서 다루었던 Regularization과 본 포스트에서 다루는 Normalization은 모두 **정규화**라고 번역되지만 이 둘은 명백히 다른 개념이므로 주의하기. 본 포스트의 정규화는 Normalization을 의미함.

1. 평균을 0으로 하기 \
    평균을 0으로 한다는 것은 특정 피처 데이터의 값(변량)을 피처 데이터의 평균으로 빼서 데이터의 평균을 0으로 만드는 것이다. 식은 다음과 같이 표현할 수 있다.

    $$
    \begin{aligned}
    \mu &= \frac{1}{m} \sum_{i=1}^m x^{(i)}\\
    x^{(i)} &:= x^{(i)} - \mu\ (i = 1,2, \cdots, m)
    \end{aligned}
    $$

2. 분산을 정규화하기 \
    다음과 같이 먼저 분산을 구한 후 분산으로 각 데이터를 분산으로 나누는 것이다.

    $$
    \begin{aligned}
    \sigma ^2 &= \frac{1}{m} \sum_{i = 1}^m {\left( x^{(i)} \right)}^2\\
    x^{(i)} &:= \frac{x^{(i)}}{\sigma ^2}\ (i = 1,2, \cdots, m)
    \end{aligned}
    $$

주의할 점은 테스트 데이터셋에 대해서도 같은 평균과 분산을 사용해서 정규화를 해야한다는 것이다. 

정규화를 수행하는 이유는 입력 피처 값의 범위가 서로 크게 차이날 수 있기 때문이다. 입력 피처 $x_1, x_2$ 의 범위이 다음과 같다고 하자.

$$
\begin{aligned}
x_1 &\in [1, 1000]\\
x_2 &\in [0,1]
\end{aligned}
$$

한 피처의 값은 매우 크고 다른 피처의 값이 매우 작은 경우 $x_1$ 방향의 경사는 매우 큰 반면 $x_2$ 방향의 경사는 매우 작을 수 밖에 없다. 이렇게 되면 $x_1$ 의 가중치는 최적화가 거의 다 된 상황에서 $x_2$ 의 가중치는 학습이 제대로 되지 않을 수 있고, 둘 다 학습이 된 상황에서도 모델의 성능이 좋지 못할 수 있다. 그래서 정규화를 통해 두 피처의 값의 범위를 비슷하게 조정하는 것이다. 


* TOC
{:toc}

{:#경사소실(_Vanishing Gradients_) / 경사폭발(_Exploding Gradients_)}
## 경사소실(_Vanishing Gradients_) / 경사폭발(_Exploding Gradients_)
깊은 신경망을 훈련시킬 때 경사의 소실과 폭발 문제가 발생한다. 매우 깊은 신경망을 훈련시킬 때 미분값이 매우 작아지는 현상을 경사소실, 미분값이 매우 커지는 현상을 경사폭발이라고 한다. 이는 훈련을 어렵게 한다.

매우 깊은 신경망을 훈련시킨다고 해보자. 편의를 위해 활성화함수 $g(z) = z, b^{[i]} = 0\ (i = 1,2,\cdots,L)$ 이라고 해보자. 그러면 에측값 $\hat y$ 은 다음과 같다.

$$
\begin{gathered}
\begin{aligned}
z^{[1]} &= w^{[1]}x\\
a^{[1]} &= g(z^{[1]}) = z^{[1]}\\
z^{[2]} &= w^{[2]}x\\
a^{[2]} &= g(z^{[2]}) = w^{[2]}a^{[1]}\\
\vdots\\
\end{aligned}\\
\ \\
\therefore \ \hat y = w^{[L]}w^{[L - 1]}\cdots w^{[2]}w^{[1]}x
\end{gathered}
$$

그리고 임의의 $i = 1,2,\cdots,L - 1$ 에 대해 가중치 행렬이 다음과 같다고 하자.

$$
w^{[i]} = 
\begin{bmatrix}
1.5&0\\
0&1.5\\
\end{bmatrix}\ 
(i = 1,2,\cdots,L - 1)
$$

그렇다면 $\hat y$ 를 다시 다음과 같이 쓸 수 있다.

$$
\begin{aligned}
\hat y &= w^{[L]}
{\begin{bmatrix}
1.5&0\\
0&1.5\\
\end{bmatrix}}^{L - 1}
x\\
\ \\
&= w^{[L]} {1.5}^{L - 1}\ x
\end{aligned}
$$

이를 통해 알 수 있는 것은 층의 깊이가 깊어질수록 $\hat y$ 의 값은 기하적으로 증가한다는 것이다. 이를 경사폭발(_Exploding Gradients_)이라 한다. 만약 가중치 행렬의 0이 아닌 원소를 0.5와 같이 1보다 작은 수로 바꾼다면 $\hat y$ 의 값은 기하적으로 감소한다. 이를 경사소실(_Vanishing Gradients_)이라 한다. 매우 깊은 네트워크에서는 가중치 행렬의 원소가 1보다 크다면 경사폭발이, 원소가 1보다 작다면 경사소실이 발생한다는 문제가 있다. 따라서 가중치 초기값을 신중하게 설정해야한다.


* TOC
{:toc}

{:#심층 신경망의 가중치 초기화}
## 심층 신경망의 가중치 초기화
경사소실, 폭발 문제로 인해 가중치 초기값은 신중하게 설정되어야 한다. 이에 대한 부분적인 해결책은 신경망의 파라미터에 대한 무작위 초기화를 더 신중하게 하는 것이다.

먼저 단일 뉴런의 가중치를 초기화하는 방법을 살펴보자. $b = 0$ 인 하나의 뉴런에 입력피처가 4개 있다고 하자. 입력피처 $X$ 에 대해 단일 뉴런의 연산은 다음과 같다.

$$
\begin{gathered}
X = 
\begin{bmatrix}
x_1\\
x_2\\
x_3\\
\vdots\\
x_n\\
\end{bmatrix},\\
z = w_1x_1 + w_1x_1 + w_2x_2 + \cdots + w_nx_n\\
\end{gathered}
$$

$z$ 가 너무 크지 않으려면 $n$ 이 증가함에 따라 $w_i$ 는 감소해야 한다. 왜냐하면 $z = \sum\limits_{i = 1}^n w_ix_i$ 이기 때문에 $n$ 이 증가할 때 $w_i$ 가 감소해야 $z$ 가 너무 크지 않기 때문이다. 따라서 다음과 같이 분산을 설정하면 합리적일 것이다.

$$
V(w_i) = \frac{1}{n}
$$

이를 만족하기 위해서는 가중치 벡터를 다음과 같이 정의하면 된다.

```python
w[l] = np.random.randn(shape=(1, n)) * np.sqrt(2 / n[l - 1])
```

`np.sqrt(2 / n[l - 1])` 에서 분자를 2로 설정하는 이유는 ReLU에서 더 잘 작동하기 때문이다. 반면 tanh를 활성화함수로 사용하는 경우 분자에 1을 사용하는 것이 더 효율적이라는 연구결과가 있다. 분자에 1을 사용하는 것을 세이비어 초기화(_Xavier Initialization_) 반면 다음과 같은 식을 곱하는 방법도 있다.

$$
\sqrt{\frac{2}{n^{[l - 1]} + n^{[l]}}}
$$

물론 다음과 같이 파이썬 코드로 표현할 수도 있다.

```python
np.sqrt(2 / (n[l - 1] + n[l]))
```


* TOC
{:toc}

{:#기울기의 수치근사}
## 기울기의 수치근사
역전파를 구현할 때 경계검사라는 것이 있다. 이는 역전파를 맞게 구현했는지 확인할 때 사용한다. 경계 검사를 구현하기 위해 먼저 경사의 계산을 수치적으로 근사하는 방법에 대해 알아보자. 먼저 미분 가능한 함수 $f$ 의 도함수 $f \prime$ 의 식은 다음과 같이 정의된다.

$$
f \prime (\theta) = \lim_{\epsilon \rightarrow 0} \frac{f(\theta + \epsilon) - f(\theta)}{\epsilon}
$$

이 처럼 도함수는 극한에 대한 정의에 기반한다. 하지만 컴퓨터로 극한에 대한 연산을 하는 것은 매우 어려우므로 수치적 근사를 한다. $\epsilon$ 을 매우 작은 수 가령 0.001 과 같은 수로 대치하는 것이다. 하지만 그렇게 대치하더라도 오차가 생길 수 있기 때문에, 식을 다음과 같이 변형한다.

$$
f \prime (\theta) = \lim_{\epsilon \rightarrow 0} \frac{f(\theta + \epsilon) - f(\theta - \epsilon)}{2\epsilon}
$$

$f$ 가 미분가능이므로 미적분을 공부한 독자라면 위 두 식이 동일한 식임을 알 것이다. 하지만 수치적 근사에 경우 일반적으로 두번 째 식이 더 나은 결과를 가져온다. 따라서 수치적으로는 다음과 같이 표현한다.

$$
\begin{aligned}
when\ \epsilon\ &is\ near\ 0,\\
\ \\
f \prime &\approx \frac{f(\theta + \epsilon) - f(\theta - \epsilon)}{2 \epsilon}
\end{aligned}
$$

이 때 오차는 $O(\epsilon ^2)$ 이다. 반면 가장 처음의 식을 사용할 때의 오차는 $O(\epsilon)$ 이다. $\epsilon$ 은 매우 작은 수이므로, $\epsilon < 1$ 이고 그에 따라서 $O(\epsilon ^2)$ 의 오차가 더 작다.


* TOC
{:toc}

{:#경사 검사(_Gradient Checking_)}
## 경사 검사(_Gradient Checking_)
역전파를 구현할 때 버그를 만들기 쉽다. 그래서 경사 검사로 역전파에 버그가 있는지 확인한다. 

경사하강법에서 가장 먼저 하는 일은 파라미터 $W^{[1]}, b^{[1]}, \cdots, W^{[L]}, b^{[L]}$ 을 하나의 거대한 벡터 $\theta$ 로 설정하는 것이다.따라서 가중치 행렬 $W^{[i]}$ 를 벡터로 바꾸고(reshape) 모든 파라미터들을 연결시켜 거대한 벡터 $\theta$ 를 만든다. 그러면 다음과 같이 비용함수를 표현할 수 있다.

$$
J \left(W^{[1]}, b^{[1]}, \cdots, W^{[L]}, b^{[L]} \right) = J(\theta)
$$

그리고 $dW^{[1]}, db^{[1]}, \cdots, dW^{[L]}, db^{[L]}$ 또한 $d \theta$ 로 바꾸어 표현한다. 

여기서 질문은 $d \theta$ 가 비용함수 $J$ 의 미분계수이냐 일 것이다. 여기에서 경사 검사가 적용된다. 벡터 $\theta = (\theta _1, \theta _2, \cdots, \theta _{n})$ 으로 표현하자. 임의의 $i (i = 1, 2, \cdots, n)$ 에 대해 

$$
d {\theta _i} _{,approx} := \frac{J (\theta _1, \theta _2, \cdots, \theta _i + \epsilon, \cdots, \theta _n) - J (\theta _1, \theta _2, \cdots, \theta _i - \epsilon, \cdots, \theta _n)}{2\epsilon} \approx \frac{\partial J}{\partial \theta _i}
$$

로 근사를 통해 계산할 수 있다. 이렇게 $\theta$ 의 각 원소에 대해 근사하여 미분한 벡터를 $d \theta _{approx}$ 라고 하자. 이제 우리가 확인해야 할 것은 $d \theta _{approx} \approx d \theta$ 인지 어떻게 확인하냐는 것이다. 이는 유클리드 거리를 통해 구할 수 있다. 다음과 같이 유클리드 노름을 구하고 정규화해보자.

$$
\frac{{\lVert d \theta _{approx} - d \theta \rVert}}{{\lVert d \theta {approx} \rVert} + {\lVert d \theta \rVert}}
$$

만약 $\epsilon = 10^{-7}$ 로 설정했을 때 역전파를 올바르게 구현하면 위 식의 값은 일반적으로 $10^{-7}$ 정도 선에서 나타난다. 만약 식의 값이 $10^{-3}$ 으로 나타났다면 역전파에 버그가 있는 것이다. 


* TOC
{:toc}

{:#경사 검사 시 주의점}
## 경사 검사 시 주의점
- 경사 검사는 디버그에만 사용하기
    경사 검사는 역전파를 올바르게 구현했는지에 대한 디버깅 과정에서 사용하는 것이지 학습에 사용하는 것이 아니다. 만약 경사검사는 매우 연산량이 많기 때문에 훈련에 경사검사를 사용하면 학습 속도가 매우 느려진다.

- 알고리즘이 경사 검사에서 문제가 생기면 $\theta$ 의 개별 성분을 확인하여 어떤 성분이 큰 차이를 만드는 지 확인하기
    알고리즘이 경사 검사에서 통과하지 못하면 분명 $\theta _{approx}$ 와 $\theta$ 가 서로 큰 차이를 가지고 있는 성분을 가지고 있다는 것이다. 따라서 개별 성분을 확인하면서 어떤 성분이 서로 큰 차이가 있는지 확인해야 한다. 이는 어디서 버그를 발생시켰는지에 대한 단서를 제공한다.

- 정규화 확인
    정규화 식이 적용되었는지 확인해야 한다. 다음은 $L_2$ 정규화 식이다.
    
    $$
    {\lVert w^{[l]} \rVert}^2_F = \sum_{i=1}^{n^{[l-1]}} \sum_{j=1}^{n^{[l]}} {\left( W_{ij}^{[l]} \right)}^2
    \ \ \left(\because\ w: n^{[l-1]} \times n^{[l]} \right)
    $$

- 드롭아웃과 함께 사용하지 않기
    경사 검사는 드롭아웃에서는 작동하지 않으므로 경사 검사를 사용할 때는 드롭아웃을 사용하지 말아야 한다.

- 무작위 파라미터 초기화 재실행
    거의 일어나지 않기는 하지만 경사 검사에 실패했을 때 파라미터 초기화를 재실행하는 것도 방법이 될 수 있다. 처음 무작위로 파라미터가 초기화될 때 대부분의 파라미터가 0에 가깝게 초기화되면 경사 검사에 실패할 수 있다. 따라서 파라미터 초기화를 재실행하고 다시 학습을 진행해본 후에 문제가 있는지 다시 확인하는 것도 좋은 방법이다.


> 본 노트는 Andrew Ng의 머신러닝 수업을 정리한 것임. 
> Andrew Ng, Machine learning lecture, [Youtube Link](https://www.youtube.com/playlist?list=PLkRLdi-c79HKEWoi4oryj-Cx-e47y_NcM)

> [이전 포스트](https://sol1archive.github.io/note/step2-1) |  [다음 포스트](https://sol1archive.github.io/note/step2-4)
