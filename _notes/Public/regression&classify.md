---
title: 머신러닝 - 회귀와 분류
feed: show
mathjax: true
---

머신러닝 기법을 통해 해결하는 두 가지 문제는 회귀(_Regression_)와 분류(_Classification_)이다. 전통적인 머신러닝 모델들인 선형회귀(_Linear Regression_), 서포트벡터머신(_SVM: Support Vector Machine_), 로지스틱 회귀(_Logistic Regression_), 의사결정트리(_Decision Tree_)를 통해 회귀와 분류 모델을 만드는 법에 대해 알아보자.  


{:#선형회귀}
## 선형회귀
선형회귀는 회귀방정식을 직선의 방정식으로 가지는 회귀분석이다. 선형회귀의 최적화 방식으로는 최소제곱법과 경사하강법이 있다. 

가령 다음과 같은 데이터가 있다고 하자.
| $x$ | $y$ | 
|-:|-:|
|1 | 3 |
|1.3 | 3.1 |
|1.7 | 3.4 |
|2.0 | 4.5 |
|2.25 | 4.0 |
|2.4 | 4.1 |
|2.5 | 3.85 |
|2.7 | 5.5 |
|3.0 | 6.25 |
|3.1 | 7.05 |
|3.5 | 7.0 |

이를 다음과 같이 산포도로 시각화할 수 있다.
![](/assets/img/regression&classify_md_1.png "산포도")

이 데이터를 경사하강법을 이용한 선형회귀로 분석해보자.
``` Python
data_lt = [
    (1, 3),
    (1.3, 3.1),
    (1.7, 3.4),
    (2.0, 4.5),
    (2.25, 4.0),
    (2.4, 4.1),
    (2.5, 3.85),
    (2.7, 5.5),
    (3.0, 6.25),
    (3.1, 7.05),
    (3.5, 7.0),
    ]

delta_x = 0.0001
step_size = 0.001
init_coefficient = 3
init_constance = 1
repeat = 10000

def diff_cal(func, val):
    return (func(val + delta_x) - func(val)) / delta_x

def del_op(func, val_x, val_y):
    return (diff_cal(lambda x: func(x, val_y), val_x),
        diff_cal(lambda y: func(val_x, y), val_y)
    )

def error_func(coefficient, constance):
    error = 0
    for x, y in data_lt:
        error += (y - (coefficient * x + constance)) ** 2

    return error

coefficient = init_coefficient
constance = init_constance
for _ in range(repeat):
    (delta_coefficient, delta_constance) = del_op(error_func, coefficient, constance)
    delta_coefficient *= -step_size
    delta_constance *= -step_size

    coefficient += delta_coefficient
    constance += delta_constance
```
 
그 결과를 시각화 하면 다음과 같다. 최적화 전 초기의 방정식은 파란색 실선이고, 최적화 후의 방정식은 빨간색 실선이다.

![](/assets/img/regression&classify_md_2.png "선형회귀 결과")

## 서포트벡터머신

> Note: 해당 코드는 AWS 클라우드 머신러닝(아비섹 미쉬라, 박정현 옮김), 에이콘, 2021에서 제공하는 코드를 필요에 따라 수정한 것임. 소스코드에 대한 모든 권리는 표준 저작권법을 따름.


## 로지스틱 회귀


## 의사결정트리




> 출처: AWS 클라우드 머신러닝(아비섹 미쉬라, 박정현 옮김), 에이콘, 2021