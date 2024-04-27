import{_ as s,c as n,o as a,a5 as p}from"./chunks/framework.BQQWXjGs.js";const u=JSON.parse('{"title":"Node生成模板","description":"","frontmatter":{},"headers":[],"relativePath":"workspace/Frame/taro/template.md","filePath":"workspace/Frame/taro/template.md","lastUpdated":1713942612000}'),l={name:"workspace/Frame/taro/template.md"},e=p(`<h1 id="node生成模板" tabindex="-1">Node生成模板 <a class="header-anchor" href="#node生成模板" aria-label="Permalink to &quot;Node生成模板&quot;">​</a></h1><p><strong>基于nodejs编写自动生成路由需要的文件</strong></p><div class="language-javascript line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki one-dark-pro vp-code"><code><span class="line"><span style="color:#7F848E;font-style:italic;">/**</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"> * pages模版快速生成脚本,执行命令 npm run tep \`文件名\`</span></span>
<span class="line"><span style="color:#7F848E;font-style:italic;"> */</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#E5C07B;"> fs</span><span style="color:#56B6C2;"> =</span><span style="color:#61AFEF;"> require</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;fs&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#E5C07B;"> dirName</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> process</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">argv</span><span style="color:#ABB2BF;">[</span><span style="color:#D19A66;">2</span><span style="color:#ABB2BF;">];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">if</span><span style="color:#ABB2BF;"> (</span><span style="color:#56B6C2;">!</span><span style="color:#E06C75;">dirName</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#E5C07B;">    console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;文件夹名称不能为空！&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#E5C07B;">    console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;示例：yarn template goodMenu/test&#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#E5C07B;">    process</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">exit</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">function</span><span style="color:#61AFEF;"> titleCase</span><span style="color:#ABB2BF;">(</span><span style="color:#E06C75;font-style:italic;">str</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#C678DD;">    const</span><span style="color:#E5C07B;"> array</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> str</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">toLowerCase</span><span style="color:#ABB2BF;">().</span><span style="color:#61AFEF;">split</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39; &#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#C678DD;">    for</span><span style="color:#ABB2BF;"> (</span><span style="color:#C678DD;">let</span><span style="color:#E06C75;"> i</span><span style="color:#56B6C2;"> =</span><span style="color:#D19A66;"> 0</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">i</span><span style="color:#56B6C2;"> &lt;</span><span style="color:#E5C07B;"> array</span><span style="color:#ABB2BF;">.</span><span style="color:#E06C75;">length</span><span style="color:#ABB2BF;">; </span><span style="color:#E06C75;">i</span><span style="color:#56B6C2;">++</span><span style="color:#ABB2BF;">) {</span></span>
<span class="line"><span style="color:#E06C75;">        array</span><span style="color:#ABB2BF;">[</span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;">] </span><span style="color:#56B6C2;">=</span><span style="color:#E06C75;"> array</span><span style="color:#ABB2BF;">[</span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;">][</span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">].</span><span style="color:#61AFEF;">toUpperCase</span><span style="color:#ABB2BF;">() </span><span style="color:#56B6C2;">+</span><span style="color:#E06C75;"> array</span><span style="color:#ABB2BF;">[</span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;">].</span><span style="color:#61AFEF;">substring</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">1</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">array</span><span style="color:#ABB2BF;">[</span><span style="color:#E06C75;">i</span><span style="color:#ABB2BF;">].</span><span style="color:#E06C75;">length</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#ABB2BF;">    }</span></span>
<span class="line"><span style="color:#C678DD;">    const</span><span style="color:#E5C07B;"> string</span><span style="color:#56B6C2;"> =</span><span style="color:#E5C07B;"> array</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">join</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39; &#39;</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#C678DD;">    return</span><span style="color:#E06C75;"> string</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"><span style="color:#ABB2BF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// 页面模版</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#E5C07B;"> indexTep</span><span style="color:#56B6C2;"> =</span><span style="color:#98C379;"> \`</span></span>
<span class="line"><span style="color:#98C379;">import React, {Component, Fragment} from &#39;react&#39;;</span></span>
<span class="line"><span style="color:#98C379;">import {connect} from &#39;react-redux&#39;</span></span>
<span class="line"><span style="color:#98C379;">import PropTypes from &quot;prop-types&quot;</span></span>
<span class="line"><span style="color:#98C379;">import {Form, Input, Button, DatePicker, Checkbox, InputNumber, Upload, Icon, Modal, Radio, Drawer, Card} from &#39;antd&#39;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">import &quot;./index.less&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">class Index extends Component {</span></span>
<span class="line"><span style="color:#98C379;">    constructor(props) {</span></span>
<span class="line"><span style="color:#98C379;">        super(props);</span></span>
<span class="line"><span style="color:#98C379;">        this.state = {}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">    }</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">    componentDidMount() {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">    render() {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">        return (</span></span>
<span class="line"><span style="color:#98C379;">            &lt;div&gt;</span></span>
<span class="line"><span style="color:#98C379;">                111</span></span>
<span class="line"><span style="color:#98C379;">            &lt;/div&gt;</span></span>
<span class="line"><span style="color:#98C379;">        )</span></span>
<span class="line"><span style="color:#98C379;">    }</span></span>
<span class="line"><span style="color:#98C379;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">export default Index;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">Index.defaultProps = {</span></span>
<span class="line"><span style="color:#98C379;">    data:[]</span></span>
<span class="line"><span style="color:#98C379;">};</span></span>
<span class="line"><span style="color:#98C379;">Index.propTypes = {</span></span>
<span class="line"><span style="color:#98C379;">    data: PropTypes.array.isRequired//必须有</span></span>
<span class="line"><span style="color:#98C379;">};</span></span>
<span class="line"><span style="color:#98C379;">\`</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// less文件模版</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#E5C07B;"> lessTep</span><span style="color:#56B6C2;"> =</span><span style="color:#98C379;"> \`\`</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// model文件模版</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#E5C07B;"> modelTep</span><span style="color:#56B6C2;"> =</span><span style="color:#98C379;"> \`</span></span>
<span class="line"><span style="color:#98C379;">import {queryShopList} from &#39;./service&#39;;</span></span>
<span class="line"><span style="color:#98C379;">import {scenicid, shopid} from &#39;@/utils/scenicid&#39;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">export default {</span></span>
<span class="line"><span style="color:#98C379;">    namespace: &#39;groupBuy&#39;,</span></span>
<span class="line"><span style="color:#98C379;">    state: {</span></span>
<span class="line"><span style="color:#98C379;">        data: [],</span></span>
<span class="line"><span style="color:#98C379;">    },</span></span>
<span class="line"><span style="color:#98C379;">    effects: {</span></span>
<span class="line"><span style="color:#98C379;">        * fetch(action, {call, put}) {</span></span>
<span class="line"><span style="color:#98C379;">            // const { banner } = yield select(state =&gt; state.home);</span></span>
<span class="line"><span style="color:#98C379;">            const {data} = yield call(queryShopList, scenicid()[&#39;id&#39;]);</span></span>
<span class="line"><span style="color:#98C379;">            yield put({</span></span>
<span class="line"><span style="color:#98C379;">                type: &#39;save&#39;,</span></span>
<span class="line"><span style="color:#98C379;">                payload: {</span></span>
<span class="line"><span style="color:#98C379;">                    data: data,</span></span>
<span class="line"><span style="color:#98C379;">                },</span></span>
<span class="line"><span style="color:#98C379;">            });</span></span>
<span class="line"><span style="color:#98C379;">        },</span></span>
<span class="line"><span style="color:#98C379;">    },</span></span>
<span class="line"><span style="color:#98C379;">    reducers: {</span></span>
<span class="line"><span style="color:#98C379;">        save(state, {payload}) {</span></span>
<span class="line"><span style="color:#98C379;">            return {...state, ...payload};</span></span>
<span class="line"><span style="color:#98C379;">        },</span></span>
<span class="line"><span style="color:#98C379;">    },</span></span>
<span class="line"><span style="color:#98C379;">};</span></span>
<span class="line"><span style="color:#98C379;">\`</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#7F848E;font-style:italic;">// service页面模版</span></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#E5C07B;"> serviceTep</span><span style="color:#56B6C2;"> =</span><span style="color:#98C379;"> \`</span></span>
<span class="line"><span style="color:#98C379;">import axios from &#39;@/api/axios&#39;;</span></span>
<span class="line"><span style="color:#98C379;">import {url} from &#39;@/api/config&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">import {getCookie} from &quot;@/utils/cookie&quot;;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#98C379;">export const queryShopList = (id) =&gt; {</span></span>
<span class="line"><span style="color:#98C379;">    const baseUrl = &#39;&#39;;</span></span>
<span class="line"><span style="color:#98C379;">    return axios.get(baseUrl);</span></span>
<span class="line"><span style="color:#98C379;">};</span></span>
<span class="line"><span style="color:#98C379;">\`</span><span style="color:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="color:#E5C07B;">fs</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">mkdirSync</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">\`./src/pages/</span><span style="color:#C678DD;">\${</span><span style="color:#E06C75;">dirName</span><span style="color:#C678DD;">}</span><span style="color:#98C379;">\`</span><span style="color:#ABB2BF;">); </span><span style="color:#7F848E;font-style:italic;">// mkdir $1</span></span>
<span class="line"><span style="color:#E5C07B;">process</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">chdir</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">\`./src/pages/</span><span style="color:#C678DD;">\${</span><span style="color:#E06C75;">dirName</span><span style="color:#C678DD;">}</span><span style="color:#98C379;">\`</span><span style="color:#ABB2BF;">); </span><span style="color:#7F848E;font-style:italic;">// cd $1</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E5C07B;">fs</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">writeFileSync</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;index.js&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">indexTep</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#E5C07B;">fs</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">writeFileSync</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;index.less&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">lessTep</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#E5C07B;">fs</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">writeFileSync</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;model.js&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">modelTep</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"><span style="color:#E5C07B;">fs</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">writeFileSync</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">&#39;service.js&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#E06C75;">serviceTep</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E5C07B;">console</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">log</span><span style="color:#ABB2BF;">(</span><span style="color:#98C379;">\`模版</span><span style="color:#C678DD;">\${</span><span style="color:#E06C75;">dirName</span><span style="color:#C678DD;">}</span><span style="color:#98C379;">已创建,请手动增加models\`</span><span style="color:#ABB2BF;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E5C07B;">process</span><span style="color:#ABB2BF;">.</span><span style="color:#61AFEF;">exit</span><span style="color:#ABB2BF;">(</span><span style="color:#D19A66;">0</span><span style="color:#ABB2BF;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br></div></div>`,3),o=[e];function r(c,t,i,y,B,b){return a(),n("div",null,o)}const C=s(l,[["render",r]]);export{u as __pageData,C as default};
