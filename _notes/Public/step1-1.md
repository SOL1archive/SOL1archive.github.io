---
title: 머신러닝 노트(1-1)
feed: show
date: 01-10-2022
mathjax: true
toc: true
---

* TOC
{:toc}

{:#머신러닝 개요}
## 머신러닝 개요

> 본 노트는 Andrew Ng의 머신러닝 수업을 정리한 것임. 
> Andrew Ng, Machine learning lecture, [Youtube Link](https://www.youtube.com/playlist?list=PLkRLdi-c79HKEWoi4oryj-Cx-e47y_NcM)

- AI는 전기가 세상을 바꾼 것처럼 세상을 바꿀 수 있을 것
- 다양한 분야에 활용됨
{:##계획}
### 계획
1. 신경망과 딥러닝 기초
2. 딥러닝 하이퍼파라미터 최적화, 정규화 방법
3. 머신러닝 프로젝트를 구성하는 법
4. 합성곱 신경망(CNN)
5. 자연어 처리(NLP): 시퀀스 모델 구성법
{:#신경망}
## 신경망
- 기본적인 데이터는 회귀분석으로 분석/예측될 수 있지만 신경망을 이용해 정교한 분석과 예측이 가능하다.
- 신경망은 다수의 뉴런으로 구성된다. 뉴런은 입력을 받고 그에 따라 특정한 값을 반환한다.
- 뉴런의 활성화함수는 다양하지만 ReLu(_Rectify Linear Unit_) 함수를 예로 들 수 있다. ReLU함수는 다음과 같이 정의할 수 있다.

$$
f_{ReLU} = \begin{cases}x\ (x \leq 0) \\
 0\ (x < 0)\end{cases}
$$

- 각각의 뉴런은 그에 해당하는 피처를 입력받고 그에 따라 타겟을 예측할 수 있다.
    - 예를 들어, 다음과 같은 주택 가격 예측 모델을 구성할 수 있다.

<div class="mermaid"> 
graph LR
S([Size]) --> NF[Family Size]
B(# Bedrooms) --> NF
Z([Zip Code]) --> NW[Walkability]
Z([Zip Code]) --> NS[School Quality]
W([Wealth]) --> NS
NF --> NT[Price]
NW --> NT
NS --> NT
NT --> Y((Y: Target))
</div>

{:#지도학습}
## 지도학습
- 지도학습은 머신러닝의 한 종류로 광고 추천, 컴퓨터 비전 등 다양한 분야에 적용될 수 있다.
- 지도학습은 학습 과정에서 피처(X)와 그에 해당하는 타겟(Y) 값이 모두 주어진 상태로 학습을 한다.

다음은 신경망이 사용되는 분야와 사용되는 뉴런의 종류이다.

|Input(X)|Output(Y)|Application|Neuron Type|
|-|-|-|-|
|Hone features|Price|Real Estate|Standard NN|
|Ad, user info|Click on ad? (0/1)|Online AD|Standard NN|
|Image|Object|Photo Tagging|CNN|
|Audio|Text Transcript|Speech Recognition|RNN|
|English|Chinese|Machine Translation|RNN/LSTM|
|Image, Radar info|Position of other cars|Automonous Driving|Custom Hybrid|

구조적 데이터와 비구조적 데이터의 차이는 다음과 같다.

|구조적 데이터|비구조적 데이터|
|-|-|
|- 데이터베이스로 표현 가능 $\rightarrow$ 각각의 필드에 특정 값이 저장됨|- 음성, 이미지, 텍스트 데이터 등 비정형적인 데이터|

- 전통적으로 컴퓨터는 비구조적 데이터가 구조적 데이터보다 분석이 어렵다.
- 인간은 비구조적 데이터를 잘 이해한다.
- 머신러닝의 도움으로 컴퓨터는 비구조적 데이터를 더 잘 이해할 수 있게 되었다.
{:#딥러닝의 부상 이유}
## 딥러닝의 부상 이유
- 전통적인 모델(SVM, 로지스틱 회귀 등)과 달리, 딥러닝을 이용하면 데이터의 크기에 증가함에 따라 성능 또한 그에 비례해 중가한다.
- 딥러닝의 모델 규모가 증가하면 성능또한 증가한다.
- 따라서 모델의 성능을 높이기 위해선 신경망의 규모와 데이터의 규모 모두 충분히 커야 한다.
- 딥러닝이 최근에 부상한 이유는 이러한 규모가 오늘날에 크게 증가했기 때문이다.
- 데이터의 규모가 적은 경우에는 SVM과 같은 전통적인 머신러닝 모델의 성능이 더 좋을 수 있다.
- 딥러닝이 발전할 수 있었던 계기에는 시그모이드 함수가 ReLU 등 다른 활성화 함수로 대체된 것도 있다. 시그모이드 함수는 다음과 같이 정의된다.

$$
\sigma (x) = \frac{1}{1 + e^{-x}}
$$

- 시그모이드 함수의 문제점은 Gradient가 소실된다는 것이다. $x$가 0에서 충분히 멀어지면, 시그모이드 함수의 미분계수는 0에 가까워진다. 학습에 Gradient를 사용하는 머신러닝의 특성상, 각 미분계수가 0에 가까워진다는 것은 학습의 정도가 작아진다는 것을 의미한다.

> 본 노트는 Andrew Ng의 머신러닝 수업을 정리한 것임. 
> Andrew Ng, Machine learning lecture, [Youtube Link](https://www.youtube.com/playlist?list=PLkRLdi-c79HKEWoi4oryj-Cx-e47y_NcM)

> [다음 포스트](https://sol1archive.github.io/note/step1-2) | 
