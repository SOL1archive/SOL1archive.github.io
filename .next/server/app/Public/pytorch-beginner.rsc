3:I[9275,[],""]
5:I[1343,[],""]
6:I[3889,["231","static/chunks/231-c5de4feaddc0b512.js","185","static/chunks/app/layout-6c2c9e9b413bbfd5.js"],"default"]
7:I[1254,["231","static/chunks/231-c5de4feaddc0b512.js","185","static/chunks/app/layout-6c2c9e9b413bbfd5.js"],"default"]
4:["slug","Public/pytorch-beginner","c"]
0:["XyTXgP6qMgUjdp3ye3Nwy",[[["",{"children":[["slug","Public/pytorch-beginner","c"],{"children":["__PAGE__?{\"slug\":[\"Public\",\"pytorch-beginner\"]}",{}]}]},"$undefined","$undefined",true],["",{"children":[["slug","Public/pytorch-beginner","c"],{"children":["__PAGE__",{},[["$L1","$L2"],null],null]},["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","$4","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined","styles":null}],null]},[["$","html",null,{"lang":"en","children":["$","body",null,{"children":["$","main",null,{"className":"min-h-screen bg-background text-foreground flex flex-col","children":[["$","$L6",null,{"gaId":""}],["$","$L7",null,{}],["$","div",null,{"className":"flex-1 w-full max-w-[1200px] mx-auto p-8","children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[],"styles":null}]}]]}]}]}],null],null],[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/e7828a7281941fdd.css","precedence":"next","crossOrigin":"$undefined"}]],"$L8"]]]]
9:T2961,<ul>
<li>TOC
{:toc}</li>
</ul>
<blockquote>
<p>Don't Panic</p>
</blockquote>
<p><code>PyTorch</code>는  최신 딥러닝 연구에서 가장 많이 사용되는 프레임워크다. 동적 계산 그래프를 사용하기 때문에 사용하기도 쉽고 성능도 우수하다.
하지만 무엇보다 파이토치의 큰 장점 중 하나는 PyTorch와 쉽게 연동되는 여러 라이브러리가 존재한다는 것이다. 이 중 PyTorch의 생산성을 높게 끌어올려줄 몇가지 라이브러리들이 있다.</p>
<h2 id="huggingface-transformers-시리즈">HuggingFace <code>transformers</code> 시리즈</h2>
<p><a href="https://huggingface.co/docs/transformers/index">HuggingFace transformers</a>는 파이토치의 사용성을 더 높이 끌어올려줄 대표적인 프레임워크이다.
사전 학습된(<em>Pre-trained</em>) 모델들을 쉽게 불러와 Fine-Tuning하거나 그대로 프로젝트에 사용할 수 있고, 모델들도 다양하다.</p>
<p>다른 장점은 HuggingFace에 올라와 있는 수많은 모델들을 쉽게 불러와 사용하거나 Fine-Tuning할 수 있다는 것이다.
가령 BERT의 한국어 fine-tuning 모델인 SKT의 KoBERT는 아래 코드만으로 가능하다.</p>
<pre><code class="hljs language-python"><span class="hljs-keyword">from</span> transformers <span class="hljs-keyword">import</span> BertTokenizer, BertModel
tokenizer = BerTokenizer.from_pretrained(<span class="hljs-string">'skt/kobert-base-v1'</span>)
model = BertModel.from_pretrained(<span class="hljs-string">'skt/kobert-base-v1'</span>)
</code></pre>
<p>뿐만 아니라 GPT-2, Stable Diffusion, Whisper과 같은 다양한 모델도 이처럼 매우 간단하게 불러와 사용이 가능하다.</p>
<h2 id="lightning-ai-pytorch-lightning">Lightning AI <code>PyTorch Lightning</code></h2>
<p>파이토치는 모델의 학습, 테스트 코드를 쉽고 간결하게 짤 수 있다는 장점이 있지만 학습, 검증, 테스트 과정을 직접 손으로 작성해야 하고, Callback을 구현하기 불편하다는 단점이 있다.
그리고 모델의 학습 코드는 바로 작성하기 때문에 코드를 수정하거나 모델의 학습과정이 복잡해질 때 코드가 스파게티화 될 수 있다는 단점이 있다.</p>
<p>이를 해결하기 위해 모델 학습, 검증, 테스트 과정을 객체지향으로 작성할 필요가 있다. 이를 가능하게 하는 것이 바로 <code>PyTorch Lightning</code>이다.</p>
<p>먼저 PyTorch Lightning의 개발자들은 다음과 같이 프레임워크를 불러올 것을 권장한다.</p>
<pre><code>import lightning as L
</code></pre>
<p>PyTorch Lightning의 구성은 Train, Validation, Test 데이터셋을 구성하는 <code>LightningDataModule</code>과 모델 순방향, 역방향 전파, 모델의 검증, 테스트 과정을 구현하는 <code>LightningModule</code>으로 구성된다.</p>
<p>먼저 <code>LightningDataModule</code>은 다음과 같이 구현한다.</p>
<pre><code class="hljs language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">LightningDataset</span>(L.LightningDataModule):
  <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
    <span class="hljs-built_in">super</span>().__init__()
  
  <span class="hljs-keyword">def</span> <span class="hljs-title function_">prepare_data</span>(<span class="hljs-params">self</span>):
    <span class="hljs-keyword">pass</span>
  
  <span class="hljs-keyword">def</span> <span class="hljs-title function_">setup</span>(<span class="hljs-params">self,stage=<span class="hljs-literal">None</span></span>):
    <span class="hljs-keyword">pass</span>
  
  <span class="hljs-keyword">def</span> <span class="hljs-title function_">train_dataloader</span>(<span class="hljs-params">self</span>):
    <span class="hljs-keyword">pass</span>
  
  <span class="hljs-keyword">def</span> <span class="hljs-title function_">val_dataloader</span>(<span class="hljs-params">self</span>):
    <span class="hljs-keyword">pass</span>
  
  <span class="hljs-keyword">def</span> <span class="hljs-title function_">test_dataloader</span>(<span class="hljs-params">self</span>):
    <span class="hljs-keyword">pass</span>
</code></pre>
<p><code>prepare_data</code> 함수는 하나의 전체 프로세스에서 공통적인 데이터를 준비 작업을 할 때, <code>setup</code> 함수는 각 학습, 테스트, 예측 단계에서 데이터를 준비할 때 사용한다.
그리고 나머지 <code>train_dataloader</code>, <code>val_dataloader</code>, <code>test_dataloader</code> 는 각각 학습, 검증, 테스트 단계에서 PyTorch <code>DataLoader</code>를 반환하는 함수이다.
이렇게 하나의 클래스를 통해 모든 데이터 준비과정과 <code>DataLoader</code> 생성까지 할 수 있기 때문에 코드의 재사용성이 매우 높아지고 유지 보수성도 얻을 수 있다.</p>
<p>그 후 다음과 같이 <code>LightningModule</code>을 정의한다.</p>
<pre><code class="hljs language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">LightningModel</span>(L.LightningModule):
  <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
    <span class="hljs-built_in">super</span>().__init__()
    
  <span class="hljs-keyword">def</span> <span class="hljs-title function_">forward</span>(<span class="hljs-params">self,x</span>):
    <span class="hljs-keyword">pass</span>
  
  <span class="hljs-keyword">def</span> <span class="hljs-title function_">configure_optimizers</span>(<span class="hljs-params">self</span>):
    <span class="hljs-keyword">pass</span>
  
  <span class="hljs-keyword">def</span> <span class="hljs-title function_">loss_fn</span>(<span class="hljs-params">self,output,target</span>):
    <span class="hljs-keyword">pass</span> 
  
  <span class="hljs-keyword">def</span> <span class="hljs-title function_">training_step</span>(<span class="hljs-params">self</span>):
    <span class="hljs-keyword">pass</span>
  
  <span class="hljs-keyword">def</span> <span class="hljs-title function_">validation_step</span>(<span class="hljs-params">self</span>):
    <span class="hljs-keyword">pass</span>
</code></pre>
<p><code>forward</code>는 모델의 순방향 전파를 구현하는 함수로, PyTorch <code>nn.Module</code>과 동일하게 작성하면 된다.
<code>configure_optimizers</code>는 최적화 알고리즘과 학습률 스케줄러를 반환하는 함수이다.
<code>loss_fn</code>는 모델의 출력과 Ground Truth를 입력받아 오차함수를 계산하는 함수이다.
<code>traing_step</code>, <code>validation_step</code>은 모델의 학습, 검증을 구현하는 함수이다.</p>
<p>이처럼 PyTorch Lightning은 기존 PyTorch를 객체지향으로 재구성하는 것을 도와주는 라이브러리기 때문에 순수한 PyTorch 코드에서 변경하는 것도 용이하고, 코드의 유지보수성, 개선성도 좋아진다는 큰 장점을 가지고 있다.</p>
<p>추가로 PyTorch Lightning을 통해 Autoencoder, GAN(<em>Generative Adversarial Networks</em>)등의 생성 모델을 구현하는 예제는 아래 링크에서 확인할 수 있다.</p>
<blockquote>
<p><a href="https://github.com/SOL1archive/Generative-Models/tree/main">Generative Models</a></p>
</blockquote>
<p>링크에서 확인할 수 있다시피, 모델의 구현과 학습을 깔끔하고 체계적으로 구현할 수 있다.</p>
<h2 id="lightning-ai-lightning-flash">Lightning AI <code>Lightning Flash</code></h2>
<p><code>Lightning Flash</code>는 PyTorch Lightning에서 파생된 라이브러리로, 매우 간단하게 모델을 Fine-Tuning하거나 사용할 수 있다.
비록 현재는 지원이 종료되었지만 여전히 유용하게 사용할 수 있다. Speech Recognition Task와 같이 학습시키기 까다로운 Task에서 편리하게 사용할 수 있다. Speech Recognition Task에서의 예시코드는 다음과 같다.</p>
<p>우선 다음과 같이 라이브러리들을 불러온다.</p>
<pre><code class="hljs language-python"><span class="hljs-keyword">import</span> os
<span class="hljs-keyword">import</span> sys
<span class="hljs-keyword">import</span> pathlib

<span class="hljs-keyword">import</span> torch
<span class="hljs-keyword">import</span> flash
<span class="hljs-keyword">from</span> flash <span class="hljs-keyword">import</span> Trainer
<span class="hljs-keyword">from</span> flash.audio <span class="hljs-keyword">import</span> SpeechRecognition, SpeechRecognitionData
</code></pre>
<p><code>datamodule</code> 을 다음과 같이 불러온다.</p>
<pre><code class="hljs language-python">datamodule = SpeechRecognitionData.from_csv(
    <span class="hljs-string">'speech_files'</span>,
    <span class="hljs-string">'targets'</span>,
    train_file=<span class="hljs-string">'train_wel.csv'</span>,
    test_file=<span class="hljs-string">'test_wel.csv'</span>,
    batch_size=<span class="hljs-number">2</span>
)
</code></pre>
<p><code>model</code> 과 <code>trainer</code>를 다음과 같이 선언한다.</p>
<pre><code>model = SpeechRecognition('kresnik/wav2vec2-large-xlsr-korean')
trainer = Trainer(max_epochs=4, gpus=1)
trainer.finetune(model, datamodule=datamodule, strategy='no_freeze')
</code></pre>
<p>이제 모든 준비가 끝났다. 학습은 아래의 세 줄의 코드로 실행된다.</p>
<pre><code>datamodule = SpeechRecognitionData.from_files(predict_files=["example.wav"], batch_size=2)
predictions = trainer.predict(model, datamodule=datamodule)
print(predictions)
</code></pre>
<p>모델을 저장하는 것도 매우 간단하다.</p>
<pre><code>trainer.save_checkpoint("speech_recognition_model.pt")
</code></pre>
<p>Lightning Flash가 Speech Recognition Task에서 지원하는 모델 아키텍처는 다음과 같다. (Whisper는 지원하지 않음)</p>
<blockquote>
<p><code>Data2VecAudio</code>, <code>HuBERT</code>, <code>MCTCT</code>, <code>SEW</code>, <code>SEWD</code>, <code>UniSpeech</code>, <code>UniSpeechSat</code>, <code>Wav2Vec2</code>, <code>Wav2Vec2Conformer</code>, <code>WavLM</code></p>
</blockquote>
<h2 id="reference">Reference</h2>
<ul>
<li><a href="https://www.kaggle.com/code/shivanandmn/beginners-guide-to-pytorch-lightning/notebook">Beginner Guide to PyTorch Lightning</a></li>
<li>쿠날 사와르카르, 시밤 R 솔란키 &#x26; 아밋 조글카르. 2023. 파이토치 라이트닝으로 시작하는 딥러닝. 에이콘</li>
</ul>2:["$","div",null,{"className":"page_layout__YXtDc","children":[["$","div",null,{"className":"GlassContainer_glass__BAl5w page_postContainer__8rQn1","style":"$undefined","children":["$","article",null,{"className":"$undefined","children":[["$","header",null,{"className":"page_header__LPYYk","children":[["$","h1",null,{"className":"page_title__Tljh5","children":"PyTorch를 처음 여행하는 히치하이커를 위한 안내서"}],["$","div",null,{"className":"page_meta__FlrbA","children":[["$","time",null,{"className":"$undefined","children":"12-03-2023"}],"$undefined"]}]]}],["$","div",null,{"className":"page_content__kgYnh","dangerouslySetInnerHTML":{"__html":"$9"}}]]}]}],["$","aside",null,{"className":"page_sidebar__vVJp_","children":["$","nav",null,{"className":"TOC_toc__LZ8ns","children":[["$","h4",null,{"className":"TOC_title__k1O4v","children":"On This Page"}],["$","ul",null,{"className":"TOC_list__jQuW3","children":[["$","li","0",{"className":"TOC_item__f3x9l TOC_level-2__lCxnK","children":["$","a",null,{"href":"#huggingface-transformers","children":"HuggingFace `transformers` 시리즈"}]}],["$","li","1",{"className":"TOC_item__f3x9l TOC_level-2__lCxnK","children":["$","a",null,{"href":"#lightning-ai-pytorch-lightning","children":"Lightning AI `PyTorch Lightning`"}]}],["$","li","2",{"className":"TOC_item__f3x9l TOC_level-2__lCxnK","children":["$","a",null,{"href":"#lightning-ai-lightning-flash","children":"Lightning AI `Lightning Flash`"}]}],["$","li","3",{"className":"TOC_item__f3x9l TOC_level-2__lCxnK","children":["$","a",null,{"href":"#reference","children":"Reference"}]}]]}]]}]}]]}]
8:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"SOL1 Archive"}],["$","meta","3",{"name":"description","content":"Personal Research Blog"}],["$","link","4",{"rel":"icon","href":"/favicon.ico"}]]
1:null
