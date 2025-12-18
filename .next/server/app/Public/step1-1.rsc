3:I[9275,[],""]
5:I[1343,[],""]
6:I[3889,["231","static/chunks/231-c5de4feaddc0b512.js","185","static/chunks/app/layout-6c2c9e9b413bbfd5.js"],"default"]
7:I[1254,["231","static/chunks/231-c5de4feaddc0b512.js","185","static/chunks/app/layout-6c2c9e9b413bbfd5.js"],"default"]
4:["slug","Public/step1-1","c"]
0:["XyTXgP6qMgUjdp3ye3Nwy",[[["",{"children":[["slug","Public/step1-1","c"],{"children":["__PAGE__?{\"slug\":[\"Public\",\"step1-1\"]}",{}]}]},"$undefined","$undefined",true],["",{"children":[["slug","Public/step1-1","c"],{"children":["__PAGE__",{},[["$L1","$L2"],null],null]},["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","$4","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined","styles":null}],null]},[["$","html",null,{"lang":"en","children":["$","body",null,{"children":["$","main",null,{"className":"min-h-screen bg-background text-foreground flex flex-col","children":[["$","$L6",null,{"gaId":""}],["$","$L7",null,{}],["$","div",null,{"className":"flex-1 w-full max-w-[1200px] mx-auto p-8","children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[],"styles":null}]}]]}]}]}],null],null],[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/e7828a7281941fdd.css","precedence":"next","crossOrigin":"$undefined"}]],"$L8"]]]]
9:T2fbb,<ul>
<li>TOC
{:toc}</li>
</ul>
<p>{:#머신러닝 개요}</p>
<h2 id="머신러닝-개요">머신러닝 개요</h2>
<blockquote>
<p>본 노트는 Andrew Ng의 머신러닝 수업을 정리한 것임.
Andrew Ng, Machine learning lecture, <a href="https://www.youtube.com/playlist?list=PLkRLdi-c79HKEWoi4oryj-Cx-e47y_NcM">Youtube Link</a></p>
</blockquote>
<ul>
<li>AI는 전기가 세상을 바꾼 것처럼 세상을 바꿀 수 있을 것</li>
<li>다양한 분야에 활용됨
{:##계획}</li>
</ul>
<h3 id="계획">계획</h3>
<ol>
<li>신경망과 딥러닝 기초</li>
<li>딥러닝 하이퍼파라미터 최적화, 정규화 방법</li>
<li>머신러닝 프로젝트를 구성하는 법</li>
<li>합성곱 신경망(CNN)</li>
<li>자연어 처리(NLP): 시퀀스 모델 구성법
{:#신경망}</li>
</ol>
<h2 id="신경망">신경망</h2>
<ul>
<li>기본적인 데이터는 회귀분석으로 분석/예측될 수 있지만 신경망을 이용해 정교한 분석과 예측이 가능하다.</li>
<li>신경망은 다수의 뉴런으로 구성된다. 뉴런은 입력을 받고 그에 따라 특정한 값을 반환한다.</li>
<li>뉴런의 활성화함수는 다양하지만 ReLu(<em>Rectify Linear Unit</em>) 함수를 예로 들 수 있다. ReLU함수는 다음과 같이 정의할 수 있다.</li>
</ul>
<div class="math math-display"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msub><mi>f</mi><mrow><mi>R</mi><mi>e</mi><mi>L</mi><mi>U</mi></mrow></msub><mo>=</mo><mrow><mo fence="true">{</mo><mtable rowspacing="0.36em" columnalign="left left" columnspacing="1em"><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mrow><mi>x</mi><mtext> </mtext><mo stretchy="false">(</mo><mi>x</mi><mo>≤</mo><mn>0</mn><mo stretchy="false">)</mo></mrow></mstyle></mtd></mtr><mtr><mtd><mstyle scriptlevel="0" displaystyle="false"><mrow><mn>0</mn><mtext> </mtext><mo stretchy="false">(</mo><mi>x</mi><mo>&#x3C;</mo><mn>0</mn><mo stretchy="false">)</mo></mrow></mstyle></mtd></mtr></mtable></mrow></mrow><annotation encoding="application/x-tex">f_{ReLU} = \begin{cases}x\ (x \leq 0) \\
 0\ (x &#x3C; 0)\end{cases}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.10764em;">f</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3283em;"><span style="top:-2.55em;margin-left:-0.1076em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.00773em;">R</span><span class="mord mathnormal mtight">e</span><span class="mord mathnormal mtight" style="margin-right:0.10903em;">LU</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:3em;vertical-align:-1.25em;"></span><span class="minner"><span class="mopen delimcenter" style="top:0em;"><span class="delimsizing size4">{</span></span><span class="mord"><span class="mtable"><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.69em;"><span style="top:-3.69em;"><span class="pstrut" style="height:3.008em;"></span><span class="mord"><span class="mord mathnormal">x</span><span class="mspace"> </span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≤</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">0</span><span class="mclose">)</span></span></span><span style="top:-2.25em;"><span class="pstrut" style="height:3.008em;"></span><span class="mord"><span class="mord">0</span><span class="mspace"> </span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">&#x3C;</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mord">0</span><span class="mclose">)</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.19em;"><span></span></span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></div>
<ul>
<li>각각의 뉴런은 그에 해당하는 피처를 입력받고 그에 따라 타겟을 예측할 수 있다.
<ul>
<li>예를 들어, 다음과 같은 주택 가격 예측 모델을 구성할 수 있다.</li>
</ul>
</li>
</ul>
&#x3C;div class="mermaid"> 
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
&#x3C;/div>
<p>{:#지도학습}</p>
<h2 id="지도학습">지도학습</h2>
<ul>
<li>지도학습은 머신러닝의 한 종류로 광고 추천, 컴퓨터 비전 등 다양한 분야에 적용될 수 있다.</li>
<li>지도학습은 학습 과정에서 피처(X)와 그에 해당하는 타겟(Y) 값이 모두 주어진 상태로 학습을 한다.</li>
</ul>
<p>다음은 신경망이 사용되는 분야와 사용되는 뉴런의 종류이다.</p>
<table>
<thead>
<tr>
<th>Input(X)</th>
<th>Output(Y)</th>
<th>Application</th>
<th>Neuron Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>Hone features</td>
<td>Price</td>
<td>Real Estate</td>
<td>Standard NN</td>
</tr>
<tr>
<td>Ad, user info</td>
<td>Click on ad? (0/1)</td>
<td>Online AD</td>
<td>Standard NN</td>
</tr>
<tr>
<td>Image</td>
<td>Object</td>
<td>Photo Tagging</td>
<td>CNN</td>
</tr>
<tr>
<td>Audio</td>
<td>Text Transcript</td>
<td>Speech Recognition</td>
<td>RNN</td>
</tr>
<tr>
<td>English</td>
<td>Chinese</td>
<td>Machine Translation</td>
<td>RNN/LSTM</td>
</tr>
<tr>
<td>Image, Radar info</td>
<td>Position of other cars</td>
<td>Automonous Driving</td>
<td>Custom Hybrid</td>
</tr>
</tbody>
</table>
<p>구조적 데이터와 비구조적 데이터의 차이는 다음과 같다.</p>
<table>
<thead>
<tr>
<th>구조적 데이터</th>
<th>비구조적 데이터</th>
</tr>
</thead>
<tbody>
<tr>
<td>- 데이터베이스로 표현 가능 <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>→</mo></mrow><annotation encoding="application/x-tex">\rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.3669em;"></span><span class="mrel">→</span></span></span></span></span> 각각의 필드에 특정 값이 저장됨</td>
<td>- 음성, 이미지, 텍스트 데이터 등 비정형적인 데이터</td>
</tr>
</tbody>
</table>
<ul>
<li>전통적으로 컴퓨터는 비구조적 데이터가 구조적 데이터보다 분석이 어렵다.</li>
<li>인간은 비구조적 데이터를 잘 이해한다.</li>
<li>머신러닝의 도움으로 컴퓨터는 비구조적 데이터를 더 잘 이해할 수 있게 되었다.
{:#딥러닝의 부상 이유}</li>
</ul>
<h2 id="딥러닝의-부상-이유">딥러닝의 부상 이유</h2>
<ul>
<li>전통적인 모델(SVM, 로지스틱 회귀 등)과 달리, 딥러닝을 이용하면 데이터의 크기에 증가함에 따라 성능 또한 그에 비례해 중가한다.</li>
<li>딥러닝의 모델 규모가 증가하면 성능또한 증가한다.</li>
<li>따라서 모델의 성능을 높이기 위해선 신경망의 규모와 데이터의 규모 모두 충분히 커야 한다.</li>
<li>딥러닝이 최근에 부상한 이유는 이러한 규모가 오늘날에 크게 증가했기 때문이다.</li>
<li>데이터의 규모가 적은 경우에는 SVM과 같은 전통적인 머신러닝 모델의 성능이 더 좋을 수 있다.</li>
<li>딥러닝이 발전할 수 있었던 계기에는 시그모이드 함수가 ReLU 등 다른 활성화 함수로 대체된 것도 있다. 시그모이드 함수는 다음과 같이 정의된다.</li>
</ul>
<div class="math math-display"><span class="katex-display"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>σ</mi><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo><mo>=</mo><mfrac><mn>1</mn><mrow><mn>1</mn><mo>+</mo><msup><mi>e</mi><mrow><mo>−</mo><mi>x</mi></mrow></msup></mrow></mfrac></mrow><annotation encoding="application/x-tex">\sigma (x) = \frac{1}{1 + e^{-x}}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.03588em;">σ</span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="base"><span class="strut" style="height:2.0908em;vertical-align:-0.7693em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.3214em;"><span style="top:-2.314em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mord"><span class="mord mathnormal">e</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6973em;"><span style="top:-2.989em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">−</span><span class="mord mathnormal mtight">x</span></span></span></span></span></span></span></span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.677em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.7693em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span></span></div>
<ul>
<li>시그모이드 함수의 문제점은 Gradient가 소실된다는 것이다. <span class="math math-inline"><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>x</mi></mrow><annotation encoding="application/x-tex">x</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.4306em;"></span><span class="mord mathnormal">x</span></span></span></span></span>가 0에서 충분히 멀어지면, 시그모이드 함수의 미분계수는 0에 가까워진다. 학습에 Gradient를 사용하는 머신러닝의 특성상, 각 미분계수가 0에 가까워진다는 것은 학습의 정도가 작아진다는 것을 의미한다.</li>
</ul>
<blockquote>
<p>본 노트는 Andrew Ng의 머신러닝 수업을 정리한 것임.
Andrew Ng, Machine learning lecture, <a href="https://www.youtube.com/playlist?list=PLkRLdi-c79HKEWoi4oryj-Cx-e47y_NcM">Youtube Link</a></p>
</blockquote>
<blockquote>
<p><a href="https://sol1archive.github.io/note/step1-2">다음 포스트</a> |</p>
</blockquote>2:["$","div",null,{"className":"page_layout__YXtDc","children":[["$","div",null,{"className":"GlassContainer_glass__BAl5w page_postContainer__8rQn1","style":"$undefined","children":["$","article",null,{"className":"$undefined","children":[["$","header",null,{"className":"page_header__LPYYk","children":[["$","h1",null,{"className":"page_title__Tljh5","children":"머신러닝 노트(1-1)"}],["$","div",null,{"className":"page_meta__FlrbA","children":[["$","time",null,{"className":"$undefined","children":"01-10-2022"}],"$undefined"]}]]}],["$","div",null,{"className":"page_content__kgYnh","dangerouslySetInnerHTML":{"__html":"$9"}}]]}]}],["$","aside",null,{"className":"page_sidebar__vVJp_","children":["$","nav",null,{"className":"TOC_toc__LZ8ns","children":[["$","h4",null,{"className":"TOC_title__k1O4v","children":"On This Page"}],["$","ul",null,{"className":"TOC_list__jQuW3","children":[["$","li","0",{"className":"TOC_item__f3x9l TOC_level-2__lCxnK","children":["$","a",null,{"href":"#","children":"머신러닝 개요"}]}],["$","li","1",{"className":"TOC_item__f3x9l TOC_level-3__2AEJ4","children":["$","a",null,{"href":"#","children":"계획"}]}],["$","li","2",{"className":"TOC_item__f3x9l TOC_level-2__lCxnK","children":["$","a",null,{"href":"#","children":"신경망"}]}],["$","li","3",{"className":"TOC_item__f3x9l TOC_level-2__lCxnK","children":["$","a",null,{"href":"#","children":"지도학습"}]}],["$","li","4",{"className":"TOC_item__f3x9l TOC_level-2__lCxnK","children":["$","a",null,{"href":"#","children":"딥러닝의 부상 이유"}]}]]}]]}]}]]}]
8:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"SOL1 Archive"}],["$","meta","3",{"name":"description","content":"Personal Research Blog"}],["$","link","4",{"rel":"icon","href":"/favicon.ico"}]]
1:null
