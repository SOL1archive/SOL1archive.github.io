---
title: Autoencoder와 공간주파수
feed: show
date: 04-04-2023
mathjax: true
---

AutoEncoder는 신경망 시퀀스 중앙에 Bottle Neck이 존재하고, Bottle Neck을 중심으로 대칭적인 구조를 가진 딥러닝 모델을 가리킨다. FFNN뿐만 아니라 LSTM과 같은 RNN Family, CNN, Transformer 등 다양한 신경망 기본 아키텍처로 AutoEncoder를 구현할 수 있다. AutoEncoder는 Anomaly Detection과 Noise Reduction에서 뛰어난 성능을 발휘한다. AutoEncoder의 학습은 Bottle Neck을 기준으로 입력 방향의 Encoder 부분과 출력 방향의 Decoder 부분이 같이 이루어진다. Encoder와 Decoder는 입력 데이터를 최대한 동일하게 출력하도록 학습된다. 일반적인 형태의 신경망에서는 이것이 어렵지 않다. 하지만 AutoEncoder의 Encoder와 Decoder 사이에 위치한 Bottle Neck으로 인해 Encoder에서 Decoder로 전달할 수 있는 정보의 양은 한계가 있다. 때문에 일반적으로 Encoder가 입력 데이터의 정보를 온전하게 Decoder로 전달하기는 매우 어렵다. 그렇기 때문에 학습과정에서 Encoder는 의미있는 정보만을 최대한 압축해서 Bottle Neck을 통해 Decoder로 보낸다. 이때 정보는 일반적으로 벡터로 표현되거나 벡터와 동형(_isomorphic_)인 대상이기 때문에 압축된 정보의 벡터공간을 내부공간(_Latent Space_)이라 한다. 입력 데이터가 Latent Space로 사상(_map_)하는 것이다. Decoder는 이렇게 건내받은 정보를 최대한 입력 데이터와 같도록 학습된다. 

AutoEncoder는 압축 기술 뿐만 아니라 Anomaly Detection과 Noise Reduction에서 뛰어난 성능을 가진다. Anomaly Detection은 비정상 신호를 감지하는 분야를 말한다. Noise Reduction은 입력 데이터에서 잡음만을 최대한 제거하고 신호만을 얻도록 하는 분야이다. AutoEncoder는 단순히 내부 공간에 데이터를 표현했을 뿐인데 어떻게 이것이 가능할까? 이는 신경과학적인 관점에서 이해될 수 있다.

신경과학에서는 공간주파수(_Spatial Frequency_)라는 개념이 있다. 공간주파수란 신호를 어떤 주파수로 표현하는지에 대한 개념이다. 낮은 공간주파수로 신호가 표현되면 적은 신호만을 표현할 수 있다. 반면에 높은 공간주파수로 신호가 표현되면 많은 정보를 표현할 수 있다. 4G 통신에 사용되는 전파의 주파수가 5G 통신에 사용되는 주파수보다 더 낮아 한번에 더 적은 정보만을 전달할 수 있는 것, 사용되는 주파수가 더 높은 FM라디오의 음질이 주파수가 낮은 AM라디오의 음질보다 더 좋은 것을 생각하면 쉽게 이해할 수 있다. 생물체의 신경망은 낮은 공간주파수와 높은 공간 주파수를 동시에 사용하여 정보를 표현하고 처리한다. 낮은 공간주파수에선 적은 정보만 표현이 가능하므로 대략적이고 포괄적인 정보만을 표현한다. 반면, 높은 공간주파수에서는 더 많은 정보를 표현할 수 있으므로 정보를 세밀하게 표현한다. 대략적인 정보만을 표현하는 것보다 세밀한 정보까지 같이 표현하는 것이 언제나 더 좋아보임에도 이를 사용하는 이유는 다음 그림으로 이해할 수 있다.

![](https://www.researchgate.net/profile/H-Scholte/publication/258350831/figure/fig3/AS:340788283232259@1458261666232/Example-of-a-face-with-all-spatial-frequency-information-allSF-only-low-spatial.png)

[Fig 1. Spatial Frequency. Image from [Jahfari S et al, 2013](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0076467)]



allSF는 모든 영역에서의 Spatial Frequency, 즉 공간주파수를 표현한 것이고 LSF는 Low Spatial Frequency, HSF는 High Spatial Frequency를 나타낸 것이다. 앞서 설명했다시피 LSF에서는 대략적인 정보만을, HSF에서는 세부적인 정보까지 표현하고 있음을 알 수 있다. 그렇기 때문에 낮은 공간주파수에서 높은 공간 주파수에서보다 **웃는다**는 특징이 더 잘 나타난다. 여기서 낮은 공간주파수의 장점이 나타난다. 대략적인 정보만을 표현하기 때문에 정보에서 전반적인 특징이 더 두드러지게 나타나는 것이다. 

전반적인 특징이 강조되고 세부적인 특징은 무시됨으로써 정보 처리의 효율성을 높일 수 있다. 필요없는 세부정보와 여러 오차로 인해 발생한 잘못된 정보(잡음)이 무시되어 정보의 중요한 특징이 강조되어 나타난다. 이렇게 표현된 정보의 양은 상대적으로 적기 때문에 정보 처리 비용도 더욱 줄어든다. 그리고 정보의 전체적인 특징을 더 잘 드러내기 때문에 정보의 파악에도 유리하다. 가령 Fig 1에서 웃는 표정이 슬픈 표정으로 바뀌었을 때 낮은 공간주파수(LSF) 표현에서 높은 공간주파수(HSF)에서보다 더 쉽게 변화를 파악할 수 있을 것이다. 또한 실제 세계에서의 여러 요인으로 인해 신호에 잡음이 발생하여 corruption되었을 때, 높은 공간주파수에서는 이에 대한 영향을 크게 받겠지만 낮은 공간주파수로 표현된 정보는 이에 대한 영향을 적게 받을 것이다. 정보 처리의 안정성이 높아지는 것이다.

이러한 이유로 인해 인간의 시각 중 주변시에 대해서는 신경수렴이 발생하여 낮은 공간주파수로 신호가 표현되고 중앙시는 높은 공간주파수로 신호가 표현된다. 인간은 주변시에 적은 신경처리자원을, 중앙시에 많은 신경처리자원을 배분하여 주변시는 적은 신경처리자원으로 최대한 효율적인 정보처리를하고 시선의 중심에 위치한 중앙시에 대해서는 세밀한 정보처리를 수행한다. 또 주의(_Attention_)을 이용해 주의의 대상은 높은 공간주파수로, 이외의 대상은 낮은 공간주파수로 표현한다.

AutoEncoder는 이러한 신경과학적 특징을 활용했다고 볼 수 있다. AutoEncoder의 Encoder는 입력 정보를 적은 정보량으로 표현하기 때문에(낮은 공간주파수에 표현하기 때문에) 불필요하거나 잡음으로 인해 훼손된 세부적인 정보를 무시하고 전체적인 특징만을 쉽게 파악할 수 있도록 한다. 이것이 AutoEncoder가 Anomaly Detection과 Noise Reduction에서 좋은 성능을 보이는 이유일 것이다.



#### Reference
[Jahfari S, Ridderinkhof KR, Scholte HS (2013) Spatial Frequency Information Modulates Response Inhibition and Decision-Making Processes. PLoS ONE 8(10): e76467.](https://doi.org/10.1371/journal.pone.0076467)
