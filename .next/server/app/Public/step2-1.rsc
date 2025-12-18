3:I[9275,[],""]
5:I[1343,[],""]
6:I[3889,["231","static/chunks/231-c5de4feaddc0b512.js","185","static/chunks/app/layout-6c2c9e9b413bbfd5.js"],"default"]
7:I[1254,["231","static/chunks/231-c5de4feaddc0b512.js","185","static/chunks/app/layout-6c2c9e9b413bbfd5.js"],"default"]
4:["slug","Public/step2-1","c"]
0:["XyTXgP6qMgUjdp3ye3Nwy",[[["",{"children":[["slug","Public/step2-1","c"],{"children":["__PAGE__?{\"slug\":[\"Public\",\"step2-1\"]}",{}]}]},"$undefined","$undefined",true],["",{"children":[["slug","Public/step2-1","c"],{"children":["__PAGE__",{},[["$L1","$L2"],null],null]},["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","$4","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined","styles":null}],null]},[["$","html",null,{"lang":"en","children":["$","body",null,{"children":["$","main",null,{"className":"min-h-screen bg-background text-foreground flex flex-col","children":[["$","$L6",null,{"gaId":""}],["$","$L7",null,{}],["$","div",null,{"className":"flex-1 w-full max-w-[1200px] mx-auto p-8","children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[],"styles":null}]}]]}]}]}],null],null],[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/e7828a7281941fdd.css","precedence":"next","crossOrigin":"$undefined"}]],"$L8"]]]]
9:T24e0,<ul>
<li>TOC
{:toc}</li>
</ul>
<p>이제 딥러닝을 구현하는 방법에서 실질적인 부분으로 넘어가보자. 하이퍼파라미터 튜닝부터 최적화 알고리즘의 속도를 높여 학습 알고리즘이 적정한 시간에 학습을 할 수 있는지 확인해보자.</p>
<p>{:#Train/Dev/Test 세트}</p>
<h1 id="traindevtest-세트">Train/Dev/Test 세트</h1>
<p>훈련(<em>Train</em>), 개발(<em>Dev</em>), 테스트(<em>Test</em>) 세트를 어떻게 설정할지 결정하는 것은 좋은 성능을 내는 신경망을 얻는 데 중요하다. 은닉층의 개수, 유닛의 개수, 학습률 등 다양한 하이퍼파라미터들의 올바른 값을 신경망 개발 초기에 추측하는 것은 거의 불가능에 가깝다. 그래서 어떤 가정을 세우고 코드로 이를 검증한 다음 피드백을 통해 올바르게 조정한다.</p>
<p>오늘날 딥러닝은 자연어 처리, 컴퓨터 비전, 음성 인식, 광고, 보안, 물류 등 다양한 분야에 사용된다. 하지만 주의해야 할 점은 어떤 분야에 대한 하이퍼파라미터 선택의 직관이 다른 영역에는 거의 적용되지 않는다는 것이다. 그리고 최적의 하이퍼파라미터 선택지는 가지고 있는 데이터의 양, 컴퓨터 환경 설정 상태 등에 따라 달라지기 때문에 한 영역의 전문가라 해도 최적의 하이퍼파라미터를 첫 시도에 고르는 것은 매우 어렵다. 따라서 가정을 검증하고 반복하는 것이 중요하다.</p>
<p>훈련, 개발, 테스트 데이터를 나누는 전통적인 방법은 전체 데이터셋에서 일부는 훈련 세트, 일부는 교차 검증 세트(개발 세트), 테스트 세트로 나누는 것이다. 그래서 훈련 세트로 계속 모델을 학습시키고 적절한 때에 테스트 세트로 검증하는 것이 일반적인 작업 흐름이었다. 그래서 일반적으로 훈련, 테스트 세트를 70:30으로 나누거나, 훈련, 개발, 테스트 세트를 60:20:20으로 나누는 것이 일반적인 관행이었다.</p>
<p>하지만 오늘날의 100만 개 이상 규모의 빅데이터 샘플에서 개발 세트와 테스트 세트의 비율을 더 낮추는 것이 트렌드가 되었다. 왜냐하면 개발 세트는 서로 다른 모델을 평가할 정도면 충분하기 때문이다. 따라서 20% 만큼 큰 비율 없이 평가가 가능할 정도면 충분하기 때문에 그 비율이 낮아졌다. 같은 방식으로 테스트 세트 또한 최종 모델의 성능에 대한 신뢰할 수 있는 추정치를 얻는 것이 목표이기 때문에 그 비율이 낮아졌다.</p>
<p>그리고 오늘날의 관행 중 하나는 훈련 세트와 테스트 세트가 서로 일치하지 않는 것이다. 다른 데이터 소스를 이용해 훈련 세트와 테스트 세트를 각각 구성하는 것이다. 한가지 주의해야할 점은 훈련과 개발 세트는 동일한 데이터 소스에서, 그리고 테스트 세트는 다른 데이터 소스에서 구성하도록 해야 한다는 것이다.</p>
<p>{:#편향(<em>Bias</em>)과 분산(<em>Variance</em>)}</p>
<h1 id="편향bias과-분산variance">편향(<em>Bias</em>)과 분산(<em>Variance</em>)</h1>
<p>머신러닝 실무에서는 편향과 분산에 대한 수준 높은 이해가 필요하다. 높은 편향을 가지고 있는 경우 과소적합(<em>Underfit</em>)이 나타난다고 하고, 높은 분산(=낮은 편향)을 가지고 있는 경우 과적합이(<em>Overfit</em>) 나타난다고 한다.</p>
<p>편향과 분산을 이해하기 위해선 훈련 세트 오차와 개발 세트 오차를 살펴보면 된다. 가령 네개의 이진분류 모델의 훈련 세트 오차와 개발 세트 오차가 다음과 같다고 하자.</p>
<table>
<thead>
<tr>
<th></th>
<th align="right">Model1</th>
<th align="right">Model2</th>
<th align="right">Model3</th>
<th align="right">Model4</th>
</tr>
</thead>
<tbody>
<tr>
<td>Train Set Error</td>
<td align="right">1 %</td>
<td align="right">15 %</td>
<td align="right">15 %</td>
<td align="right">0.5 %</td>
</tr>
<tr>
<td>Dev Set Error</td>
<td align="right">11 %</td>
<td align="right">16 %</td>
<td align="right">30 %</td>
<td align="right">1 %</td>
</tr>
</tbody>
</table>
<p>Model1의 경우는 훈련 세트에 대해서는 모델이 잘 분류하지만 개발 세트에 대해서는 잘 분류하지 못하는 경우이다. 즉 훈련 세트에 과적합이 되어 개발 세트에 대해서 일반화되지 못하는 경우이다. 이를 <strong>높은 분산</strong>을 가진다고 한다. 한편 Model2의 경우는 훈련 데이터에 대해서도 잘 맞지 않는다. 이를 과소적합이라 한다. 반면 이 모델은 합리적인 수준에서 개발 세트에 대해 일반화가 되었다. 개발 세트에 대한 성능이 훈련 세트에 대한 성능보다 1 %p정도만 차이가 나기 때문이다. 이 때를 <strong>높은 편향</strong>이라 부른다. Model3는 개발 세트에 대한 성능이 훈련 세트에 대한 성능보다 더 높다. 이 때는 <strong>높은 분산</strong>, <strong>높은 편향</strong> 모두에 해당하는 경우이다. 마지막 Model4의 경우는 편향과 분산 모두 낮은 경우이다. 이 경우는 Ground Truth에 해당하는 데이터셋의 오차율이 0 %에 수렴하는 것을 가정한 경우이다.</p>
<p>이를 정리하면 다음과 같다.</p>
<table>
<thead>
<tr>
<th></th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>높은 편향(<em>high bias</em>)</td>
<td>과소적합(<em>underfitting</em>)</td>
</tr>
<tr>
<td>높은 분산(<em>high variance</em>)</td>
<td>과대적합(<em>overfitting</em>)</td>
</tr>
</tbody>
</table>
<p>{:#머신러닝을 위한 기본 레시피}</p>
<h1 id="머신러닝을-위한-기본-레시피">머신러닝을 위한 기본 레시피</h1>
<p>편향과 분산은 머신러닝 모델의 특징을 더 잘 파악할 수 있도록 도와준다. 또, 알고리즘의 성능을 더 체계적으로 개선시킬 수 있도록 도와준다. 처음 모델을 훈련시킨 후에 편향이 크다면 더 큰 규모의 신경망을 설정하여 더 많은 은닉층 혹은 은닉 유닛을 선택하는 것을 시도할 수 있다. 혹은 효과를 얻는 것이 확실하지는 않지만 문제에 더 잘맞을 것으로 기대되는 다른 형태의 신경망 아키텍처(ex. Drop-Out, CNN, etc.)를 도입할 수도 있다. 이러한 과정을 충분히 반복하면 많은 경우에 적은 편향을 갖는 모델을 얻을 수 있을 것이다.</p>
<p>편향을 적절한 수준으로 줄이고 나면 이제 분산을 해결할 차례이다. 분산과 관련한 지표를 얻기 위해서는 개발 데이터셋을 사용하면 된다. 만약 분산이 높다면 가능한 경우 더 많은 데이터를 수집하는 것을 시도할 수 있다. 그렇지 못한 경우 정규화를 시도할 수 있다. 혹은 다른 하이퍼파라미터, 신경망 아키텍처 등을 사용하여 신경망을 재설계하는 것도 방법이다.</p>
<p>이처럼 높은 편향과 분산을 해결하는 방법은 일반적으로 서로 다르다. 하지만 이러한 과정을 완전히 체계화하기는 어렵다. 이 방법들은 낮은 편향과 분산을 해결하기까지 반복적으로 사용된다. 그래서 문제가 높은 편향인지 분산인지 확인하고 그 결과 시도해 볼 수 있는 방법을 적절하게 선택한다. 예를 들어, 높은 편향 문제가 발생했을 때 더 많은 데이터를 얻는 것은 그리 효율적이지 못할 것이다. 다음은 높은 편향이나 높은 분산 문제를 해결하기 위해 일반적으로 시도할 수 있는 순서도이다.</p>
&#x3C;div class="mermaid">
%%{ init: { 'flowchart': { 'curve': 'linear' } } }%%
graph TD
    subgraph B [높은 편향]
        direction LR
        HB[높은 편향] -- Y --> HBS[- 더 큰 네트워크 &#x3C;br/>- 신경망 아키텍처 재설계]
    end
    subgraph V [높은 분산]
        direction LR
        HV[높은 분산] -- Y --> HVS[- 더 많은 데이터 획득 &#x3C;br/>- 정규화 &#x3C;br/>- 신경망 아키텍처 재설계]
    end
<p>B -- N --> V
V -- N --> END(END)</p>
&#x3C;/div>
<p>초기 머신러닝의 시대에는 편향-분산 트레이드 오프에 대해 많이 논의되었다. 그 이유는 시도할 수 있는 대다수의 방법들이 편향을 증가시키고 분산을 감소시키거나 그 반대의 결과를 가져왔기 때문이다. 하지만 오늘날 딥러닝 빅데이터 시대에 접어들면서 상황이 바뀌었다. 더 큰 네트워크를 훈련시키는 방법은 일반적으로 분산을 증가시키지 않고 편향만을 감소시킨다. 또 더 많은 데이터를 얻는 것은 많은 경우에 편향을 증가시키지 않으면서 분산을 감소시킨다. 이처럼 편향, 분산 각각에만 영향을 미치는 방법들이 고안됨에 따라서 편향-분산 트레이드 오프에 대한 논의는 줄어들었다.</p>
<blockquote>
<p>본 노트는 Andrew Ng의 머신러닝 수업을 정리한 것임.
Andrew Ng, Machine learning lecture, <a href="https://www.youtube.com/playlist?list=PLkRLdi-c79HKEWoi4oryj-Cx-e47y_NcM">Youtube Link</a></p>
</blockquote>
<blockquote>
<p><a href="https://sol1archive.github.io/note/step1-5">이전 포스트</a> | <a href="https://sol1archive.github.io/note/step2-2">다음 포스트</a></p>
</blockquote>2:["$","div",null,{"className":"page_layout__YXtDc","children":[["$","div",null,{"className":"GlassContainer_glass__BAl5w page_postContainer__8rQn1","style":"$undefined","children":["$","article",null,{"className":"$undefined","children":[["$","header",null,{"className":"page_header__LPYYk","children":[["$","h1",null,{"className":"page_title__Tljh5","children":"머신러닝 노트(2-1)"}],["$","div",null,{"className":"page_meta__FlrbA","children":[["$","time",null,{"className":"$undefined","children":"06-10-2022"}],"$undefined"]}]]}],["$","div",null,{"className":"page_content__kgYnh","dangerouslySetInnerHTML":{"__html":"$9"}}]]}]}],["$","aside",null,{"className":"page_sidebar__vVJp_","children":["$","nav",null,{"className":"TOC_toc__LZ8ns","children":[["$","h4",null,{"className":"TOC_title__k1O4v","children":"On This Page"}],["$","ul",null,{"className":"TOC_list__jQuW3","children":[["$","li","0",{"className":"TOC_item__f3x9l TOC_level-1__aveVu","children":["$","a",null,{"href":"#train-dev-test","children":"Train/Dev/Test 세트"}]}],["$","li","1",{"className":"TOC_item__f3x9l TOC_level-1__aveVu","children":["$","a",null,{"href":"#bias-variance","children":"편향(_Bias_)과 분산(_Variance_)"}]}],["$","li","2",{"className":"TOC_item__f3x9l TOC_level-1__aveVu","children":["$","a",null,{"href":"#","children":"머신러닝을 위한 기본 레시피"}]}]]}]]}]}]]}]
8:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1"}],["$","meta","1",{"charSet":"utf-8"}],["$","title","2",{"children":"SOL1 Archive"}],["$","meta","3",{"name":"description","content":"Personal Research Blog"}],["$","link","4",{"rel":"icon","href":"/favicon.ico"}]]
1:null
