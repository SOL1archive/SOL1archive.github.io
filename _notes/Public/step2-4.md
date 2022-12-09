---
title: 머신러닝 노트(2-4)
feed: show
mathjax: true
toc: true
---

* TOC
{:toc}

{:#미니배치(_mini-batch_) 경사하강법}
## 미니배치(_mini-batch_) 경사하강법
머신러닝에서 모델을 빠르게 훈련시키는 것은 중요하다. 또 딥러닝 모델은 빅데이터에서 잘 작동하는데, 큰 데이터셋에서 훈련하는 것은 매우 많은 시간을 필요로 한다. 따라서 좋은 최적화 알고리즘을 찾는 것은 효율을 높여준다.

기존의 벡터화 방식은 다음과 같이 전체 데이터셋을 행렬로 벡터화시켜 연산한다. 

$$
\begin{aligned}
X &= 
\begin{bmatrix}
X^{(1)}&X^{(2)}&X^{(3)}&\cdots&X^{(m)}\\
\end{bmatrix}\ : \ n_x \times m\ , \\
Y &= 
\begin{bmatrix}
y^{(1)}&y^{(2)}&y^{(3)}&\cdots&y^{(m)}\\
\end{bmatrix}\ : \ 1 \times m
\end{aligned}
$$

이 경우 $m = 5,000,000$ 인 것과 같은 거대한 데이터셋에 대해서는 매 경사하강법 단계마다 500만 개의 데이터셋을 처리해야 한다. 따라서 전체 거대 데이터셋을 모두 처리하기 전에 경사하강법을 진행할 수 있다면 더 빠른 알고리즘을 얻을 수 있다.

그래서 전체 데이터셋 묶음(_batch_)을 미니배치(_mini-batch_)로 나누고, 각각의 미니배치가 1,000개의 샘플을 갖는다고 하자.

$$
\begin{gathered}
\begin{aligned}
X &= 
\begin{bmatrix}
X^{(1)}&\cdots&X^{(1000)}&|&X^{(1001)}&\cdots&X^{(2000)}&|&\cdots&|&\cdots&X^{(m)}\\
\end{bmatrix}\\
&: \ n_x \times m\ , \\
\ \\
Y &= 
\begin{bmatrix}
y^{(1)}&\cdots&y^{(1000)}&|&y^{(1001)}&\cdots&y^{(2000)}&|&\cdots&|&\cdots&y^{(m)}\\
\end{bmatrix}\\
&: \ 1 \times m
\end{aligned}\\
\ \\
\begin{aligned}
X^{\{1\}} &= 
\begin{bmatrix}
X^{(1)}&X^{(2)}&\cdots&X^{(1000)}\\
\end{bmatrix}, \\
Y^{\{1\}} &= 
\begin{bmatrix}
y^{(1)}&y^{(2)}&\cdots&y^{(1000)}\\
\end{bmatrix}, \\
X^{\{2\}} &= 
\begin{bmatrix}
X^{(1001)}&X^{(1002)}&\cdots&X^{(2000)}\\
\end{bmatrix}, \\
Y^{\{2\}} &= 
\begin{bmatrix}
y^{(1001)}&y^{(1002)}&\cdots&y^{(2000)}\\
\end{bmatrix}, \\
&\vdots\\
X^{\{5000\}} &= 
\begin{bmatrix}
&\cdots&X^{(m)}\\
\end{bmatrix}, \\
Y^{\{5000\}} &= 
\begin{bmatrix}
&\cdots&y^{(m)}\\
\end{bmatrix}, \\
\end{aligned}
\end{gathered}
$$

이때 미니배치 $t$의 의미는 $X^{\{t\}}, Y^{\{t\}}$와 같다. 그리고 각 행렬의 크기는 다음과 같다.

$$
\begin{aligned}
X^{\{t\}}\ &:\ n_x \times 1000\\
Y^{\{t\}}\ &:\ 1 \times 1000\\
\end{aligned}
$$

미니배치를 활용한 경사하강법의 파이썬 코드는 다음과 같다.

```python
import numpy as np

'''
초기화 코드
'''

for t in range(5000):
    # Froward Prop. on X^{t} (벡터화된 구현)
    Z[0] = np.dot(W[1], X_mini[t]) + b[0]
    A[0] = g[0](Z[0])
    '''
    중간 생략
    '''
    A[l] = g[l](Z[l])

    j[t] = np.sum(cost_function(A[l], y_mini[i])) / 1000

    # Backprop. to compute grad.
    W[l] = W[l] - learning_rate * dW[l]
    b[l] = b[l] - earning_rate * db[l]
```

이 코드를 한번 수행해서 전체 데이터셋을 한번 거치는 것을 1 Epoch라고 한다. 이전의 경사하강법에서는 전체 데이터셋을 처리할 때마다 한 단계의 경사하강법을 수행했지만, 미니배치 방식을 이용하면 전체 데이터셋을 처리할 때마다 미니배치 개수 만큼의 경사하강법을 수행한다.

{:#미니 배치 경사하강법 이해하기}
## 미니 배치 경사하강법 이해하기
경사하강법을 반복할 때마다 비용함수 값이 감소하는 것을 기대할 수 있다. 미니배치를 활용한 경사하강법의 경우에도 비용함수가 전반적으로 감소하는 것을 기대할 수 있지만 각 미니배치에서는 비용이 증가할 수 있다. 이렇게 노이즈가 발생하는 이유는 어떤 미니배치는 학습하기 쉬워 비용이 감소하지만, 어떤 미니배치는 학습이 어려워(잘못 레이블된 데이터가 있다던지 등) 오히려 비용이 증가할 수 있기 때문이다. 

적절한 미니배치 크기를 결정하는 것은 중요한 문제다. 만약 하나의 미니배치 크기가 전체 데이터셋과 같다면 미니배치 경사하강법과 일반적인 경사하강법은 다르지 않다. 다른 극단적인 경우는 미니배치 크기가 1인 것이다. 이 경우 미니배치들의 개수는 데이터셋의 크기와 같고, 이것을 확률적 경사하강법(_Stochastic Gradient Descent_)이라고 부른다.

일반적인 경사하강법을 수행할 때, 매 단계마다 비용함수 값을 최대로 감소시키는 방향으로 파라미터들을 갱신한다. 반대로 확률적 경사하강법을 수행할 때는 다른 방향으로 파라미터를 갱신하지만, 평균적으로는 최솟값을 향해 값을 갱신한다. 따라서 노이즈가 있을 수는 있지만 평균적으로 최솟값으로 수렴하는 것을 기대할 수 있다. 확률적 경사하강법의 장점은 적은 시간이 소요된다는 것이다. 일반적인 경사하강법은 매 단계마다 최솟값을 향해 변화하지만 매 단계에 소요되는 시간이 길다. 반면 확률적 경사하강법은 매 단계에 최솟값을 향해 변화하는 것을 보장해주지는 못하지만 같은 데이터 처리횟수 대비 더 많은 값을 갱신하면서 빠르게 최솟값 근처에 도달하는 것을 기대할 수 있다. 또, 노이즈 자체도 적은 학습률을 통해 개선할 수 있다.

하지만 확률적 경사하강법은 한번에 한 데이터 샘플에 대해서만 연산하기 때문에 경사하강법 자체가 비효율적일 수 있다. 따라서 일반적인 경사하강법과 확률적 경사하강법 사이에 어떤 적절한 위치에서 가장 효율이 높다. 이 경우 벡터화의 이점을 활용할 수 있고, 그에 따라 샘플을 처리하는 속도가 빨라진다. 또, 확률적 경사하강법보다 더 일관된 방향으로 최솟값으로 향한다.

따라서, 작은 규모의 데이터셋의 경우 일반적인 경사하강법을 사용해도 무관하다. 더 큰 규모의 경우 일반적으로 64, 128, 256, 512 등 2의 거듭제곱수를 미니배치 크기로 적절히 선택하는 것이 좋다. 왜냐하면 컴퓨터의 메모리 지정은 이진수로 이루어지기 때문이다. 마지막으로 각 미니배치의 크기를 CPU, GPU 메모리 크기에 맞도록 하는 것이 좋다. 그렇지 않으면 효율이 급격히 낮아지기 때문이다.


{:# 지수 가중 이동 평균(_Exponential Moving Average_)}
## 지수 가중 이동 평균(_Exponential Moving Average_)
경사하강법보다 빠른 최적화 알고리즘들도 있다. 이들을 이해하기 위해서는 지수가중이동평균을 이해해야 한다. 변량 ($\theta _n\ (n \in \{1, 2, \cdots, t\})$ 가중평균은 다음과 같이 구할 수 있다. 

$$
\begin{aligned}
v_0 &= 0\\
v_1 &= \beta v_0 + (1 - \beta) \theta _1\\
v_2 &= \beta v_1 + (1 - \beta) \theta _2\\
&\vdots\\
v_t &= \beta v_{t - 1} + (1 - \beta) \theta _n\\
\end{aligned}
$$

이 경우 $v_t$ 는 다음과 같이 근사한다.

$$
v_t \approx E(\theta _i)\ (i \in [t - \frac{1}{1 - \beta}, t ] \cap \mathbb{Z})
$$

데이터에 노이즈가 있는 경우 가중 평균을 이용해 노이즈를 감쇠할 수 있다.

{:#지수 가중 이동 평균 이해하기}
## 지수 가중 이동 평균 이해하기
지수 가중 이동 평균을 이해하기 위해 다음의 예를 보자.

$$
\begin{gathered}
v_t = \beta v_{t - 1} + (1 - \beta) \theta _t\\
\ \\
\begin{aligned}
v_{100} &= 0.9v_{99} + 0.1\theta _{100}\\
v_{99} &= 0.9v_{98} + 0.1\theta _{99}\\
v_{98} &= 0.9v_{97} + 0.1\theta _{98}\\
&\vdots\\
\end{aligned}
\end{gathered}
$$

$v_{100}$ 항을 전개해보자.

$$
\begin{aligned}
v_{100} &=\  0.1 \theta _{100} \\
&\ \ + 0.9(0.1 \theta _{99} \\
&\ \ + 0.9(0.1 \theta _{98} \\
&\ \ + \cdots\\
&\ \ ))\\
&= 0.1 \theta _{100} + 0.1 \times 0.9 \theta _{99} + 0.1 \times {0.9}^2 \theta _{98} + \cdots\\
& = \sum^{100}_{i = 1} 0.1\ \cdot \ {0.9}^{100 - i} \theta _i
\end{aligned}
$$

따라서 지수가중평균을 구하는 과정은 $\theta _i$ 와 ${0.9}^i$ 의 요소별 곱으로 표현이 가능하다. 이를 파이썬 코드로 다음과 같이 구현 가능하다.

```python
v = 0
for i in range(100):
    v = beta * v + (1 - beta) * theta[i]
```

이를 통해 알 수 있다시피, 지수가중이동평균의 장점은 매우 적은 메모리를 사용한다는 것이다.

{:#Momentum 최적화 알고리즘}
## Momentum 최적화 알고리즘
Momentum 알고리즘은 경사하강법보다 거의 모든 경우에서 더 빠르게 동작한다. 미니 배치 경사하강법은 노이즈를 가지면서 최솟값으로 이동한다. 따라서 학습률이 너무 클 경우 오버슈팅하여 아예 다른 방향으로 나갈 수 있다. 그러므로 학습률이 너무 크지 말아야한다. Momentum 알고리즘은 미니배치 경사하강법과 같이 $dW, db$ 를 미니배치에 대해 구한다. Momentum 알고리즘은 다음과 같이 구현할 수 있다. 

우선 가중 이동 평균 $V_{dW}, V_{db}$ 를 다음과 같이 구한다.

$$
\begin{aligned}
V_{dW} &:= \beta V_{dW} + (1 - \beta) dW\\
V_{db} &:= \beta V_{db} + (1 - \beta) db\\
\end{aligned}
$$

그 후 파라미터를 다음과 같이 갱신한다.

$$
\begin{aligned}
W &:= W - \alpha V_{dW}\\
b &:= b - \alpha V_{db}\\
\end{aligned}
$$

이렇게 가중이동평균을 이용하면 노이즈를 감쇠하는 효과를 얻을 수 있고, 이는 최솟값에 도달할 때 까지 이동하는 거리를 줄일 수 있다. 결과적으로 일반적인 상황에서 학습률이 일정할 때, 더 적은 반복만으로 최솟값에 도달할 수 있다. 여기에 물리적인 직관을 더한다면, $\beta$ 를 마찰계수, $V_{dW}$ 를 속도, $(1 - \beta) dW$ 를 가속도에 비유할 수 있다.

Momentum 알고리즘의 하이퍼파라미터들은 다음과 같다.

$$
\begin{array}{lll}
Hyperparameters&\alpha&:\ Learning\ Rate\\
&\beta&
\end{array}
$$

{:#RMSProp (_Root Mean Square Propagation_) 최적화 }
## RMSProp (_Root Mean Square Propagation_) 최적화 알고리즘
RMSProp 알고리즘 또한 일반적인 경사하강법보다 더 빠른 최적화를 제공한다. RMSProp 알고리즘은 미니배치 경사하강법, Momentum 알고리즘과 같이 $dW, db$ 를 미니배치에 대해 구한다. Momentum 알고리즘에서 $V_{dW}$ 를 구했듯이 RMSProp에서는 $S_{dW}$ 를 구한다.

$$
\begin{aligned}
S_{dW} &:= \beta _2\ S_{dW} + (1 - \beta _2) {(dW)}^2\\
S_{db} &:= \beta _2\ S_{db} + (1 - \beta _2) {(db)}^2
\end{aligned}
$$

이 때 ${(dW)}^2, {(db)}^2$ 는 요소별 제곱이다. 이는 도함수의 제곱에 대한 이동가중평균을 구하는 것이다. 그 후 파라미터를 다음과 같이 갱신한다.

$$
\begin{aligned}
W &:= W - \alpha \frac{dW}{\sqrt{S_{dW}}}\\
b &:= b - \alpha \frac{db}{\sqrt{S_{db}}}\\
\end{aligned}
$$



지금 우리가 원하는 것은 최솟값 방향으로는 최대한 빠르게 움직이면서 진동은 줄이는 것이다. 이와 같이 식을 정의하면 최솟값의 방향과는 수직에 가까운 방향의 축에 대한 가중평균의 크기는 증가하고, 수평인 방향, 즉 최솟값의 방향과 비슷한 축에 대한 가중평균의 크기는 작아진다. 결과적으로, 최솟값의 방향과 비슷한 축에 대한 변화량은 증가하여(가중평균의 제곱근으로 파라미터를 나누므로) 노이즈는 최소화 시키고, 최솟값 방향으로는 빠르게 이동하는 것이 가능해진다. 

$$
\begin{array}{lll}
Hyperparameters&\alpha&:\ Learning\ Rate\\
&\beta _2&
\end{array}
$$

{:#Adam (_Adaptive Moment Estimation_) 최적화 }
## Adam (_Adaptive Moment Estimation_) 최적화 알고리즘
Adam은 Momentum과 RMSProp을 조합한 알고리즘이다. 딥러닝의 연구자들은 다양한 최적화 알고리즘들을 고안해 내었지만 모든 알고리즘이 일반적인 상황에서 모두 좋은 성능을 내는 것은 아니었다. 하지만 Momentum, RMSProp과 Adam은 모두 일반적인 상황에서 잘 작동하는 알고리즘이다. Adam의 구현은 다음과 같다.

먼저 다음과 같이 가중평균들을 초기화한다.

$$
\begin{gathered}
V_{dW} = 0, S_{dW} = 0,\\
V_{db} = 0, S_{db} = 0
\end{gathered}
$$

그리고 미니배치에 대해 $dW, db$ 를 구한다. 그 후에 다음과 같이 가중평균들을 갱신한다.

$$
\begin{aligned}
V_{dW} &= \beta _1 V_{dW} + (1 - \beta _1) dW,\\
V_{db} &= \beta _1 V_{db} + (1 - \beta _1) db\\
\ \\
S_{dW} &= \beta _2 S_{dW} + (1 - \beta _2) dW,\\
S_{db} &= \beta _2 S_{db} + (1 - \beta _2) db\\
\end{aligned}
$$

처음 두 식은 Momentum 알고리즘, 나머지 두 식은 RMSProp에서 가져왔음을 알 수 있다. 이렇게 네 가중평균을 구한 후에 편향 보정을 한다.

$$
\begin{aligned}
V^{corrected}_{dW} = \frac{V_{dW}}{1 - {\beta _1}^t},\\
V^{corrected}_{db} = \frac{V_{db}}{1 - {\beta _1}^t}\\
\ \\
S^{corrected}_{dW} = \frac{S_{dW}}{1 - {\beta _2}^t},\\
S^{corrected}_{db} = \frac{S_{db}}{1 - {\beta _2}^t}\\
\end{aligned}
$$

마지막으로 다음과 같이 파라미터들을 갱신한다. 

$$
\begin{aligned}
W &:= W - \alpha \frac{V^{corrected}_{dW}}{\sqrt{S^{corrected}_{dW}} + \epsilon}\\
b &:= b - \alpha \frac{V^{corrected}_{db}}{\sqrt{S^{corrected}_{db}} + \epsilon}\\
\end{aligned}
$$

Adam 알고리즘은 많은 종류의 딥러닝 아키텍처에 대해 잘 작동한다는 것이 증명된 알고리즘이다. 

$$
\begin{array}{lll}
Hyperparameters&\alpha&:\ Learning\ Rate\ (Needs\ to\ be\ tune)\\
&\beta _1&:\ About\ Momentum\\
&\beta _2&:\ About\ RMSProp\\
&\epsilon
\end{array}
$$

일반적으로 $\beta _1 = 0.9$ 으로 설정한다. 그리고 Adam 논문의 저자는 $\beta _2 = 0.999, \epsilon = 10^{-8}$ 로 설정할 것을 추천한다. 

{:#학습률 감쇠}
## 학습률 감쇠
학습률을 천천히 줄이는 것은 학습 알고리즘의 속도를 높일 수 있다. 이를 학습률 감쇠(_Learning Rate Decay_)라고 부른다. 미니배치 학습을 할 때 최솟값 근처로 수렴한 후에는 최솟값에 더 가까워지지 않고 그 부근을 계속 돌아다닐 수 있다. 이는 학습률로 고정된 값을 사용했고 미니배치들에 노이즈가 있기 때문이다. 그래서 초기보다 후에 학습률을 줄이면 최솟값 근처의 밀집된 위치에서 돌아다닐 것이다. 그래서 초기에는 높은 학습률로 크게 위치를 갱신하다가 후에는 낮은 학습률로 돌아다니는 영역을 최솟값 근처에 밀집시키면 낮은 오차를 얻을 수 있다. 학습률 감쇠는 다음과 같이 구현된다.

$$
\alpha = \frac{1}{1 + (decay\ rate) * (epoch\ num)}\ \alpha _0
$$

이렇게 하면 초기에 비해 후기에는 학습률이 감소함을 확인할 수 있을 것이다. 

다른 방식은 지수적 감쇠가 있다. 지수적 감쇠는 다음과 같이 구현할 수 있다.

$$
\alpha = 0.95^{epoch\ num}\ \alpha _0
$$

그 외에도 다음과 같은 다양한 학습률 감쇠 방법이 있다.

$$
\begin{aligned}
\alpha &= \frac{k}{\sqrt{epoch\ num}}\ \alpha _0\\
\alpha &= \frac{k}{\sqrt{t}}\ \alpha _0\ (t: num\ of\ mini\ batch)\\
\end{aligned}
$$

- 이산적 감쇠 방법
- 수동 감쇠 방법: 1 Epoch에 걸리는 시간이 충분히 긴 경우에 주로 사용

> 본 노트는 Andrew Ng의 머신러닝 수업을 정리한 것임. 
> Andrew Ng, Machine learning lecture, [Youtube Link](https://www.youtube.com/playlist?list=PLkRLdi-c79HKEWoi4oryj-Cx-e47y_NcM)