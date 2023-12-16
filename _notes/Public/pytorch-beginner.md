---
title: PyTorch를 처음 여행하는 히치하이커를 위한 안내서
feed: show
date: 12-03-2023
mathjax: true
toc: true
---

* TOC
{:toc}

> Don't Panic

`PyTorch`는  최신 딥러닝 연구에서 가장 많이 사용되는 프레임워크다. 동적 계산 그래프를 사용하기 때문에 사용하기도 쉽고 성능도 우수하다. 
하지만 무엇보다 파이토치의 큰 장점 중 하나는 PyTorch와 쉽게 연동되는 여러 라이브러리가 존재한다는 것이다. 이 중 PyTorch의 생산성을 높게 끌어올려줄 몇가지 라이브러리들이 있다.

## HuggingFace `transformers` 시리즈
[HuggingFace transformers](https://huggingface.co/docs/transformers/index)는 파이토치의 사용성을 더 높이 끌어올려줄 대표적인 프레임워크이다. 
사전 학습된(_Pre-trained_) 모델들을 쉽게 불러와 Fine-Tuning하거나 그대로 프로젝트에 사용할 수 있고, 모델들도 다양하다.

다른 장점은 HuggingFace에 올라와 있는 수많은 모델들을 쉽게 불러와 사용하거나 Fine-Tuning할 수 있다는 것이다.
가령 BERT의 한국어 fine-tuning 모델인 SKT의 KoBERT는 아래 코드만으로 가능하다.

```python
from transformers import BertTokenizer, BertModel
tokenizer = BerTokenizer.from_pretrained('skt/kobert-base-v1')
model = BertModel.from_pretrained('skt/kobert-base-v1')
```

뿐만 아니라 GPT-2, Stable Diffusion, Whisper과 같은 다양한 모델도 이처럼 매우 간단하게 불러와 사용이 가능하다.

## Lightning AI `PyTorch Lightning`
파이토치는 모델의 학습, 테스트 코드를 쉽고 간결하게 짤 수 있다는 장점이 있지만 학습, 검증, 테스트 과정을 직접 손으로 작성해야 하고, Callback을 구현하기 불편하다는 단점이 있다. 
그리고 모델의 학습 코드는 바로 작성하기 때문에 코드를 수정하거나 모델의 학습과정이 복잡해질 때 코드가 스파게티화 될 수 있다는 단점이 있다. 

이를 해결하기 위해 모델 학습, 검증, 테스트 과정을 객체지향으로 작성할 필요가 있다. 이를 가능하게 하는 것이 바로 `PyTorch Lightning`이다. 

먼저 PyTorch Lightning의 개발자들은 다음과 같이 프레임워크를 불러올 것을 권장한다.

```
import lightning as L
```

PyTorch Lightning의 구성은 Train, Validation, Test 데이터셋을 구성하는 `LightningDataModule`과 모델 순방향, 역방향 전파, 모델의 검증, 테스트 과정을 구현하는 `LightningModule`으로 구성된다.

먼저 `LightningDataModule`은 다음과 같이 구현한다.

```python
class LightningDataset(L.LightningDataModule):
  def __init__(self):
    super().__init__()
  
  def prepare_data(self):
    pass
  
  def setup(self,stage=None):
    pass
  
  def train_dataloader(self):
    pass
  
  def val_dataloader(self):
    pass
  
  def test_dataloader(self):
    pass
```

`prepare_data` 함수는 하나의 전체 프로세스에서 공통적인 데이터를 준비 작업을 할 때, `setup` 함수는 각 학습, 테스트, 예측 단계에서 데이터를 준비할 때 사용한다.
그리고 나머지 `train_dataloader`, `val_dataloader`, `test_dataloader` 는 각각 학습, 검증, 테스트 단계에서 PyTorch `DataLoader`를 반환하는 함수이다.
이렇게 하나의 클래스를 통해 모든 데이터 준비과정과 `DataLoader` 생성까지 할 수 있기 때문에 코드의 재사용성이 매우 높아지고 유지 보수성도 얻을 수 있다.

그 후 다음과 같이 `LightningModule`을 정의한다.

```python
class LightningModel(L.LightningModule):
  def __init__(self):
    super().__init__()
    
  def forward(self,x):
    pass
  
  def configure_optimizers(self):
    pass
  
  def loss_fn(self,output,target):
    pass 
  
  def training_step(self):
    pass
  
  def validation_step(self):
    pass
```

`forward`는 모델의 순방향 전파를 구현하는 함수로, PyTorch `nn.Module`과 동일하게 작성하면 된다.
`configure_optimizers`는 최적화 알고리즘과 학습률 스케줄러를 반환하는 함수이다.
`loss_fn`는 모델의 출력과 Ground Truth를 입력받아 오차함수를 계산하는 함수이다.
`traing_step`, `validation_step`은 모델의 학습, 검증을 구현하는 함수이다.

이처럼 PyTorch Lightning은 기존 PyTorch를 객체지향으로 재구성하는 것을 도와주는 라이브러리기 때문에 순수한 PyTorch 코드에서 변경하는 것도 용이하고, 코드의 유지보수성, 개선성도 좋아진다는 큰 장점을 가지고 있다.

추가로 PyTorch Lightning을 통해 Autoencoder, GAN(_Generative Adversarial Networks_)등의 생성 모델을 구현하는 예제는 아래 링크에서 확인할 수 있다.
> [Generative Models](https://github.com/SOL1archive/Generative-Models/tree/main)

링크에서 확인할 수 있다시피, 모델의 구현과 학습을 깔끔하고 체계적으로 구현할 수 있다.

## Lightning AI `Lightning Flash`
`Lightning Flash`는 PyTorch Lightning에서 파생된 라이브러리로, 매우 간단하게 모델을 Fine-Tuning하거나 사용할 수 있다. 
비록 현재는 지원이 종료되었지만 여전히 유용하게 사용할 수 있다. Speech Recognition Task와 같이 학습시키기 까다로운 Task에서 편리하게 사용할 수 있다. Speech Recognition Task에서의 예시코드는 다음과 같다.

우선 다음과 같이 라이브러리들을 불러온다.

```python
import os
import sys
import pathlib

import torch
import flash
from flash import Trainer
from flash.audio import SpeechRecognition, SpeechRecognitionData
```

`datamodule` 을 다음과 같이 불러온다.

```python
datamodule = SpeechRecognitionData.from_csv(
    'speech_files',
    'targets',
    train_file='train_wel.csv',
    test_file='test_wel.csv',
    batch_size=2
)
```

`model` 과 `trainer`를 다음과 같이 선언한다.

```
model = SpeechRecognition('kresnik/wav2vec2-large-xlsr-korean')
trainer = Trainer(max_epochs=4, gpus=1)
trainer.finetune(model, datamodule=datamodule, strategy='no_freeze')
```

이제 모든 준비가 끝났다. 학습은 아래의 세 줄의 코드로 실행된다.

```
datamodule = SpeechRecognitionData.from_files(predict_files=["example.wav"], batch_size=2)
predictions = trainer.predict(model, datamodule=datamodule)
print(predictions)
```

모델을 저장하는 것도 매우 간단하다.

```
trainer.save_checkpoint("speech_recognition_model.pt")
```

Lightning Flash가 Speech Recognition Task에서 지원하는 모델 아키텍처는 다음과 같다. (Whisper는 지원하지 않음)

> `Data2VecAudio`, `HuBERT`, `MCTCT`, `SEW`, `SEWD`, `UniSpeech`, `UniSpeechSat`, `Wav2Vec2`, `Wav2Vec2Conformer`, `WavLM`

## Reference
- [Beginner Guide to PyTorch Lightning](https://www.kaggle.com/code/shivanandmn/beginners-guide-to-pytorch-lightning/notebook)
- 쿠날 사와르카르, 시밤 R 솔란키 & 아밋 조글카르. 2023. 파이토치 라이트닝으로 시작하는 딥러닝. 에이콘 