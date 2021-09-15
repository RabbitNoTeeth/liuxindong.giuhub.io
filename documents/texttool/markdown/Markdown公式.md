# 如何插入公式

$LATEX$ 的数学公式有两种：行中公式和独立公式（行间公式）。行中公式放在文中与其它文字混编，独立公式单独成行。

行中公式可以用如下方法表示：

```
$ 数学公式 $
```

独立公式可以用如下方法表示：

```
$$ 数学公式 $$
```



# 函数、符号及特殊字符

## 声调 / 变音符号

```
\dot{a}, \ddot{a}, \acute{a}, \grave{a}
```

$\dot{a}, \ddot{a}, \acute{a}, \grave{a}$



```
\check{a}, \breve{a}, \tilde{a}, \bar{a}
```

$\check{a}, \breve{a}, \tilde{a}, \bar{a}$



```
\hat{a}, \widehat{a}, \vec{a}
```

$\hat{a}, \widehat{a}, \vec{a}$



## 标准函数

### 指数

```
\exp_a b = a^b, \exp b = e^b, 10^m
```

$\exp_a b = a^b, \exp b = e^b, 10^m$



### 对数

```
\ln c, \lg d = \log e, \log_{10} f
```

$\ln c, \lg d = \log e, \log_{10} f$



### 三角函数

```
\sin a, \cos b, \tan c, \cot d, \sec e, \csc f
```

$\sin a, \cos b, \tan c, \cot d, \sec e, \csc f$



```
\arcsin a, \arccos b, \arctan c
```

$\arcsin a, \arccos b, \arctan c$



```
\arccot d, \arcsec e, \arccsc f
```

$\arccot d, \arcsec e, \arccsc f$



```
\sinh a, \cosh b, \tanh c, \coth d
```

$\sinh a, \cosh b, \tanh c, \coth d$​



```
\operatorname{sh}k, \operatorname{ch}l, \operatorname{th}m, \operatorname{coth}n
```

$\operatorname{sh}k, \operatorname{ch}l, \operatorname{th}m, \operatorname{coth}n$



```
\operatorname{argsh}o, \operatorname{argch}p, \operatorname{argth}q
```

$\operatorname{argsh}o, \operatorname{argch}p, \operatorname{argth}q$



### 符号函数，绝对值

```
\sgn r, \left\vert s \right\vert
```

$sgn\ r, \left\vert s \right\vert$​​​​​



### 最大值，最小值

```
\min(x,y), \max(x,y)
```

$\min(x,y), \max(x,y)$



## 界限，极限

```
\min x, \max y, \inf s, \sup t
```

$\min x, \max y, \inf s, \sup t$



```
\lim u, \liminf v, \limsup w
```

$\lim u, \liminf v, \limsup w$



```
\lim_{x \to \infty} \frac{1}{n(n+1)}
```

$\lim_{x \to \infty} \frac{1}{n(n+1)}$



```
\dim p, \deg q, \det m, \ker\phi
```

$\dim p, \deg q, \det m, \ker\phi$



## 投射

```
\Pr j, \hom l, \lVert z \rVert, \arg z
```

{\displaystyle \Pr j,\hom l,\lVert z\rVert ,\arg z}Prj,homl,∥z∥,argz



## 微分及导数

```
dt, \mathrm{d}t, \partial t, \nabla\psi
```

$dt, \mathrm{d}t, \partial t, \nabla\psi$



```
dy/dx, \mathrm{d}y/\mathrm{d}x, \frac{dy}{dx}, \frac{\mathrm{d}y}{\mathrm{d}x}, \frac{\partial^2}{\partial x_1\partial x_2}y
```

$dy/dx, \mathrm{d}y/\mathrm{d}x, \frac{dy}{dx}, \frac{\mathrm{d}y}{\mathrm{d}x}, \frac{\partial^2}{\partial x_1\partial x_2}y$



```
\prime, \backprime, f^\prime, f', f'', f^{(3)}, \dot y, \ddot y
```

$\prime, \backprime, f^\prime, f', f'', f^{(3)}, \dot y, \ddot y$



## 类字母符号及常数

```
\infty, \aleph, \complement, \backepsilon, \eth, \Finv, \hbar
```

$\infty, \aleph, \complement, \backepsilon, \eth, \Finv, \hbar$



```
\Im, \imath, \jmath, \Bbbk, \ell, \mho, \wp, \Re, \circledS
```

$\Im, \imath, \jmath, \Bbbk, \ell, \mho, \wp, \Re, \circledS$



## 模运算

```
s_k \equiv 0 \pmod{m}
```

$s_k \equiv 0 \pmod{m}$



```
a \bmod b
```

$a \bmod b$



```
\gcd(m, n), \operatorname{lcm}(m, n)
```

$\gcd(m, n), \operatorname{lcm}(m, n)$



```
\mid, \nmid, \shortmid, \nshortmid
```

$\mid, \nmid, \shortmid, \nshortmid$



## 根号

```
\surd, \sqrt{2}, \sqrt[n]{}, \sqrt[3]{\frac{x^3+y^3}{2}}
```

$\surd, \sqrt{2}, \sqrt[n]{}, \sqrt[3]{\frac{x^3+y^3}{2}}$



## 运算符

```
+, -, \pm, \mp, \dotplus
```

$+, -, \pm, \mp, \dotplus$



```
\times, \div, \divideontimes, /, \backslash
```

$\times, \div, \divideontimes, /, \backslash$



```
\cdot, * \ast, \star, \circ, \bullet
```

$\cdot, * \ast, \star, \circ, \bullet$



```
\boxplus, \boxminus, \boxtimes, \boxdot
```

$\boxplus, \boxminus, \boxtimes, \boxdot$



```
\oplus, \ominus, \otimes, \oslash, \odot
```

$\oplus, \ominus, \otimes, \oslash, \odot$



```
\circleddash, \circledcirc, \circledast
```

$\circleddash, \circledcirc, \circledast$



```
\bigoplus, \bigotimes, \bigodot
```

$\bigoplus, \bigotimes, \bigodot$



## 集合

```
\{ \}, \O \empty \emptyset, \varnothing
```

$\{ \}, \O \empty \emptyset, \varnothing$



```
\in, \notin \not\in, \ni, \not\ni
```

$\in, \notin \not\in, \ni, \not\ni$



```
\cap, \Cap, \sqcap, \bigcap
```

$\cap, \Cap, \sqcap, \bigcap$



```
\cup, \Cup, \sqcup, \bigcup, \bigsqcup, \uplus, \biguplus
```

$\cup, \Cup, \sqcup, \bigcup, \bigsqcup, \uplus, \biguplus$



```
\setminus, \smallsetminus, \times
```

$\setminus, \smallsetminus, \times$



```
\subset, \Subset, \sqsubset
```

$\subset, \Subset, \sqsubset$



```
\supset, \Supset, \sqsupset
```

$\supset, \Supset, \sqsupset$



```
\subseteq, \nsubseteq, \subsetneq, \varsubsetneq, \sqsubseteq
```

$\subseteq, \nsubseteq, \subsetneq, \varsubsetneq, \sqsubseteq$



```
\supseteq, \nsupseteq, \supsetneq, \varsupsetneq, \sqsupseteq
```

$\supseteq, \nsupseteq, \supsetneq, \varsupsetneq, \sqsupseteq$



```
\subseteqq, \nsubseteqq, \subsetneqq, \varsubsetneqq
```

$\subseteqq, \nsubseteqq, \subsetneqq, \varsubsetneqq$



```
\supseteqq, \nsupseteqq, \supsetneqq, \varsupsetneqq
```

$\supseteqq, \nsupseteqq, \supsetneqq, \varsupsetneqq$



## 关系符号

```
=, \ne, \neq, \equiv, \not\equiv
```

$=, \ne, \neq, \equiv, \not\equiv$



```
\doteq, \doteqdot,` `\overset{\underset{\mathrm{def}}{}}{=},` `:=
```

$\doteq, \doteqdot,` `\overset{\underset{\mathrm{def}}{}}{=},` `:=$



```
\sim, \nsim, \backsim, \thicksim, \simeq, \backsimeq, \eqsim, \cong, \ncong
```

$\sim, \nsim, \backsim, \thicksim, \simeq, \backsimeq, \eqsim, \cong, \ncong$



```
\approx, \thickapprox, \approxeq, \asymp, \propto, \varpropto
```

$\approx, \thickapprox, \approxeq, \asymp, \propto, \varpropto$



```
<, \nless, \ll, \not\ll, \lll, \not\lll, \lessdot
```

$<, \nless, \ll, \not\ll, \lll, \not\lll, \lessdot$



```
>, \ngtr, \gg, \not\gg, \ggg, \not\ggg, \gtrdot
```

$>, \ngtr, \gg, \not\gg, \ggg, \not\ggg, \gtrdot$



```
\le, \leq, \lneq, \leqq, \nleq, \nleqq, \lneqq, \lvertneqq
```

$\le, \leq, \lneq, \leqq, \nleq, \nleqq, \lneqq, \lvertneqq$



```
\ge, \geq, \gneq, \geqq, \ngeq, \ngeqq, \gneqq, \gvertneqq
```

$\ge, \geq, \gneq, \geqq, \ngeq, \ngeqq, \gneqq, \gvertneqq$



```
\lessgtr, \lesseqgtr, \lesseqqgtr, \gtrless, \gtreqless, \gtreqqless
```

$\lessgtr, \lesseqgtr, \lesseqqgtr, \gtrless, \gtreqless, \gtreqqless$



```
\leqslant, \nleqslant, \eqslantless
```

$\leqslant, \nleqslant, \eqslantless$



```
\geqslant, \ngeqslant, \eqslantgtr
```

$\geqslant, \ngeqslant, \eqslantgtr$



```
\lesssim, \lnsim, \lessapprox, \lnapprox
```

$\lesssim, \lnsim, \lessapprox, \lnapprox$



```
\gtrsim, \gnsim, \gtrapprox, \gnapprox
```

$\gtrsim, \gnsim, \gtrapprox, \gnapprox$



```
\prec, \nprec, \preceq, \npreceq, \precneqq
```

$\prec, \nprec, \preceq, \npreceq, \precneqq$



```
\succ, \nsucc, \succeq, \nsucceq, \succneqq
```

$\succ, \nsucc, \succeq, \nsucceq, \succneqq$



```
\preccurlyeq, \curlyeqprec
```

$\preccurlyeq, \curlyeqprec$



```
\succcurlyeq, \curlyeqsucc
```

$\succcurlyeq, \curlyeqsucc$



```
\precsim, \precnsim, \precapprox, \precnapprox
```

$\precsim, \precnsim, \precapprox, \precnapprox$



```
\succsim, \succnsim, \succapprox, \succnapprox
```

$\succsim, \succnsim, \succapprox, \succnapprox$



## 几何符号

```
\parallel, \nparallel, \shortparallel, \nshortparallel
```

$\parallel, \nparallel, \shortparallel, \nshortparallel$



```
\perp, \angle, \sphericalangle, \measuredangle, 45^\circ
```

$\perp, \angle, \sphericalangle, \measuredangle, 45^\circ$



```
\Box, \blacksquare, \diamond, \Diamond \lozenge, \blacklozenge, \bigstar
```

$\Box, \blacksquare, \diamond, \Diamond \lozenge, \blacklozenge, \bigstar$



```
\bigcirc, \triangle, \bigtriangleup, \bigtriangledown
```

$\bigcirc, \triangle, \bigtriangleup, \bigtriangledown$



```
\vartriangle, \triangledown
```

$\vartriangle, \triangledown$



```
\blacktriangle, \blacktriangledown, \blacktriangleleft, \blacktriangleright
```

$\blacktriangle, \blacktriangledown, \blacktriangleleft, \blacktriangleright$



## 逻辑符号

```
\forall, \exists, \nexists
```

$\forall, \exists, \nexists$



```
\therefore, \because, \And
```

$\therefore, \because, \And$



```
\or \lor \vee, \curlyvee, \bigvee
```

$\or \lor \vee, \curlyvee, \bigvee$



```
\and \land \wedge, \curlywedge, \bigwedge
```

$\and \land \wedge, \curlywedge, \bigwedge$



```
\bar{q}, \bar{abc}, \overline{q}, \overline{abc},
\lnot \neg, \not\operatorname{R}, \bot, \top
```

$\bar{q}, \bar{abc}, \overline{q}, \overline{abc}$,
$\lnot \neg, \not\operatorname{R}, \bot, \top$



```
\vdash, \dashv, \vDash, \Vdash, \models
```

$\vdash, \dashv, \vDash, \Vdash, \models$​



```
\Vvdash, \nvdash, \nVdash, \nvDash, \nVDash
```

$\Vvdash, \nvdash, \nVdash, \nvDash, \nVDash$​



```
\ulcorner, \urcorner, \llcorner, \lrcorner
```

$\ulcorner, \urcorner, \llcorner, \lrcorner$​



## 箭头

```
\Rrightarrow, \Lleftarrow
```

$\Rrightarrow, \Lleftarrow$



```
\Rightarrow, \nRightarrow, \Longrightarrow \implies
```

$\Rightarrow, \nRightarrow, \Longrightarrow \implies$



```
\Leftarrow, \nLeftarrow, \Longleftarrow
```

$\Leftarrow, \nLeftarrow, \Longleftarrow$



```
\Leftrightarrow, \nLeftrightarrow, \Longleftrightarrow \iff
```

$\Leftrightarrow, \nLeftrightarrow, \Longleftrightarrow \iff$



```
\Uparrow, \Downarrow, \Updownarrow
```

$\Uparrow, \Downarrow, \Updownarrow$



```
\rightarrow, \to, \nrightarrow, \longrightarrow
```

$\rightarrow, \to, \nrightarrow, \longrightarrow$​



```
\leftarrow, \gets, \nleftarrow, \longleftarrow
```

$\leftarrow, \gets, \nleftarrow, \longleftarrow$



```
\leftrightarrow, \nleftrightarrow, \longleftrightarrow
```

$\leftrightarrow, \nleftrightarrow, \longleftrightarrow$



```
\uparrow, \downarrow, \updownarrow
```

$\uparrow, \downarrow, \updownarrow$



```
\nearrow, \swarrow, \nwarrow, \searrow
```

$\nearrow, \swarrow, \nwarrow, \searrow$



```
\mapsto, \longmapsto
```

$\mapsto, \longmapsto$



```
\rightharpoonup, \rightharpoondown, \leftharpoonup, \leftharpoondown, \upharpoonleft, \upharpoonright, \downharpoonleft, \downharpoonright, \rightleftharpoons, \leftrightharpoons
```

$\rightharpoonup, \rightharpoondown, \leftharpoonup, \leftharpoondown, \upharpoonleft, \upharpoonright, \downharpoonleft, \downharpoonright, \rightleftharpoons, \leftrightharpoons$



```
\curvearrowleft, \circlearrowleft, \Lsh, \upuparrows, \rightrightarrows, \rightleftarrows, \rightarrowtail, \looparrowright
```

$\curvearrowleft, \circlearrowleft, \Lsh, \upuparrows, \rightrightarrows, \rightleftarrows, \rightarrowtail, \looparrowright$



```
\curvearrowright, \circlearrowright, \Rsh, \downdownarrows, \leftleftarrows, \leftrightarrows, \leftarrowtail, \looparrowleft
```

$\curvearrowright, \circlearrowright, \Rsh, \downdownarrows, \leftleftarrows, \leftrightarrows, \leftarrowtail, \looparrowleft$



```
\hookrightarrow, \hookleftarrow, \multimap, \leftrightsquigarrow, \rightsquigarrow, \twoheadrightarrow, \twoheadleftarrow
```

$\hookrightarrow, \hookleftarrow, \multimap, \leftrightsquigarrow, \rightsquigarrow, \twoheadrightarrow, \twoheadleftarrow$



## 特殊符号

省略号：数学公式中常见的省略号有两种，`\ldots` 表示与文本底线对齐的省略号，`\cdots` 表示与文本中线对齐的省略号。

```
\amalg, \%, \dagger, \ddagger, \ldots, \cdots
```

$\amalg, \%, \dagger, \ddagger, \ldots, \cdots$



```
\smile, \frown, \wr, \triangleleft, \triangleright
```

$\smile, \frown, \wr, \triangleleft, \triangleright$



```
\diamondsuit, \heartsuit, \clubsuit, \spadesuit, \Game, \flat, \natural, \sharp
```

$\diamondsuit, \heartsuit, \clubsuit, \spadesuit, \Game, \flat, \natural, \sharp$



## 未分类

```
\diagup, \diagdown, \centerdot, \ltimes, \rtimes, \leftthreetimes, \rightthreetimes
```

$\diagup, \diagdown, \centerdot, \ltimes, \rtimes, \leftthreetimes, \rightthreetimes$



```
\eqcirc, \circeq, \triangleq, \bumpeq, \Bumpeq, \doteqdot, \risingdotseq, \fallingdotseq
```

$\eqcirc, \circeq, \triangleq, \bumpeq, \Bumpeq, \doteqdot, \risingdotseq, \fallingdotseq$



```
\intercal, \barwedge, \veebar, \doublebarwedge, \between, \pitchfork
```

$\intercal, \barwedge, \veebar, \doublebarwedge, \between, \pitchfork$



```
\vartriangleleft, \ntriangleleft, \vartriangleright, \ntriangleright
```

$\vartriangleleft, \ntriangleleft, \vartriangleright, \ntriangleright$



```
\trianglelefteq, \ntrianglelefteq, \trianglerighteq, \ntrianglerighteq
```

$\trianglelefteq, \ntrianglelefteq, \trianglerighteq, \ntrianglerighteq$



关于这些符号的更多语义，参阅 [TeX Cookbook](https://web.archive.org/web/20160305074303/https://www.math.upenn.edu/tex-stuff/cookbook.pdf) 的简述。



# 上标、下标及积分等

**功能|语法|效果**

`^` 表示上标, `_` 表示下标。如果上下标的内容多于一个字符，需要用 `{}` 将这些内容括成一个整体。上下标可以嵌套，也可以同时使用。



## 上标

```
a^2,a^{2+2}
```

$a^2,a^{2+2}$



## 下标

```
a_2,a_{i,j}
```

$a_2,a_{i,j}$



## 结合上下标

```
x_2^3
```

$x_2^3$



## 前置上下标

```
{}_1^2\!X_3^4
```

${}_1^2\!X_3^4$



## 导数

**导数（HTML）**

```
x'
```

$x'$



**导数（PNG）**

```
x^\prime
```

$x^\prime$



**导数（错误）**

```
x\prime
```

$x\prime$



**导数点**

```
\dot{x}
```

$\dot{x}$



```
\ddot{y}
```

$\ddot{y}$



## 向量

```
\vec{c}
```

$\vec{c}$



```
\overleftarrow{a b}
```

$\overleftarrow{a b}$



```
\overrightarrow{c d}
```

$\overrightarrow{c d}$



```
\overleftrightarrow{a b}
```

$\overleftrightarrow{a b}$



```
\widehat{e f g}
```

$\widehat{e f g}$



## 上弧

```
\overset{\frown} {AB}
```

$\overset{\frown} {AB}$



## 上划线

```
\overline{h i j}
```

$\overline{h i j}$



## 下划线

```
\underline{k l m}
```

$\underline{k l m}$



## 上括号

```
\overbrace{1+2+\cdots+100}
```

$\overbrace{1+2+\cdots+100}$



```
\begin{matrix} 5050 \\ \overbrace{ 1+2+\cdots+100 } \end{matrix}
```

$\begin{matrix} 5050 \\ \overbrace{ 1+2+\cdots+100 } \end{matrix}$



## 下括号

```
\underbrace{a+b+\cdots+z}
```

$\underbrace{a+b+\cdots+z}$



```
\begin{matrix} \underbrace{ a+b+\cdots+z } \\ 26 \end{matrix}
```

${\displaystyle {\begin{matrix}\underbrace {a+b+\cdots +z} \\26\end{matrix}}}a+b+⋯+z26$



## 求和（累加）

```
\sum_{k=1}^N k^2
```

$\sum_{k=1}^N k^2$



```
\begin{matrix} \sum_{k=1}^N k^2 \end{matrix}
```

$\begin{matrix} \sum_{k=1}^N k^2 \end{matrix}$



## 求积（累乘）

```
\prod_{i=1}^N x_i
```

$\prod_{i=1}^N x_i$



```
\begin{matrix} \prod_{i=1}^N x_i \end{matrix}
```

$\begin{matrix} \prod_{i=1}^N x_i \end{matrix}$



## 上积

```
\coprod_{i=1}^N x_i
```

$\coprod_{i=1}^N x_i$



```
\begin{matrix} \coprod_{i=1}^N x_i \end{matrix}
```

$\begin{matrix} \coprod_{i=1}^N x_i \end{matrix}$



## 极限

```
\lim_{n \to \infty}x_n
```

$\lim_{n \to \infty}x_n$



```
\begin{matrix} \lim_{n \to \infty}x_n \end{matrix}
```

$\begin{matrix} \lim_{n \to \infty}x_n \end{matrix}$



## 积分

```
\int_{-N}^{N} e^x\, {\rm d}x
```

$\int_{-N}^{N} e^x\, {\rm d}x$

本例中 `\,` 和 `{\rm d}` 部分可省略，但建议加入，能使式子更美观。`{\rm d}`可以用`\mathrm{d}`等价替换。



矩阵中积分符号变小

```
\begin{matrix} \int_{-N}^{N} e^x\, \mathrm{d}x \end{matrix}
```

$\begin{matrix} \int_{-N}^{N} e^x\, \mathrm{d}x \end{matrix}$



## 双重积分

```
\iint_{D}^{W} \, \mathrm{d}x\,\mathrm{d}y
```

$\iint_{D}^{W} \, \mathrm{d}x\,\mathrm{d}y$



## 三重积分

```
\iiint_{E}^{V} \, \mathrm{d}x\,\mathrm{d}y\,\mathrm{d}z
```

$\iiint_{E}^{V} \, \mathrm{d}x\,\mathrm{d}y\,\mathrm{d}z$



## 闭合的曲线、曲面积分

```
\oint_{C} x^3\, \mathrm{d}x + 4y^2\, \mathrm{d}y
```

$\oint_{C} x^3\, \mathrm{d}x + 4y^2\, \mathrm{d}y$



## 交集

```
\bigcap_1^{n} p
```

$\bigcap_1^{n} p$



## 并集

```
\bigcup_1^{k} p
```

$\bigcup_1^{k} p$



# 分数

通常使用 `\frac {分子} {分母}` 命令产生一个分数，分数可嵌套。 便捷情况可直接输入 `\frac ab` 来快速生成一个 \frac abba 。 如果分式很复杂，亦可使用 `分子 \over 分母` 命令，此时分数仅有一层。

功能|语法|效果

分数

```
\frac{2}{4}=0.5
```

{\displaystyle {\frac {2}{4}}=0.5}42=0.5

小型分数

```
\tfrac{2}{4} = 0.5
```

{\displaystyle {\tfrac {2}{4}}=0.5}42=0.5

连分式（大型嵌套分式）

```
\cfrac{2}{c + \cfrac{2}{d + \cfrac{2}{4}}} = a
```

{\displaystyle {\cfrac {2}{c+{\cfrac {2}{d+{\cfrac {2}{4}}}}}}=a}c+d+4222=a

大型不嵌套分式

```
\dfrac{2}{4} = 0.5 \qquad \dfrac{2}{c + \dfrac{2}{d + \dfrac{2}{4}}} = a
```

{\displaystyle {\dfrac {2}{4}}=0.5\qquad {\dfrac {2}{c+{\dfrac {2}{d+{\dfrac {2}{4}}}}}}=a}42=0.5c+d+4222=a

二项式系数

```
\dbinom{n}{r}=\binom{n}{n-r}=\mathrm{C}_n^r=\mathrm{C}_n^{n-r}
```

{\displaystyle {\dbinom {n}{r}}={\binom {n}{n-r}}=\mathrm {C} _{n}^{r}=\mathrm {C} _{n}^{n-r}}(rn)=(n−rn)=Cnr=Cnn−r

小型二项式系数

```
\tbinom{n}{r}=\tbinom{n}{n-r}=\mathrm{C}_n^r=\mathrm{C}_n^{n-r}
```

{\displaystyle {\tbinom {n}{r}}={\tbinom {n}{n-r}}=\mathrm {C} _{n}^{r}=\mathrm {C} _{n}^{n-r}}(rn)=(n−rn)=Cnr=Cnn−r

大型二项式系数

```
\binom{n}{r}=\dbinom{n}{n-r}=\mathrm{C}_n^r=\mathrm{C}_n^{n-r}
```

{\displaystyle {\binom {n}{r}}={\dbinom {n}{n-r}}=\mathrm {C} _{n}^{r}=\mathrm {C} _{n}^{n-r}}(rn)=(n−rn)=Cnr=Cnn−r

在以e为底的指数函数、极限和积分中尽量不要使用 `\frac` 符号：它会使整段函数看起来很怪，而且可能产生歧义。也正是因此它在专业数学排版中几乎从不出现。 横着写这些分式，中间使用斜线间隔 `/` （用斜线代替分数线）。

- 例子：

  ```
  \begin{array}{cc}
  \mathrm{Bad} & \mathrm{Better} \\
  \hline \\
  e^{i\frac{\pi}2} \quad e^{\frac{i\pi}2}& e^{i\pi/2} \\
  \int_{-\frac\pi2}^\frac\pi2 \sin x\,dx & \int_{-\pi/2}^{\pi/2}\sin x\,dx \\
  \end{array}Copy to clipboardErrorCopied
  ```

- 显示：

  \begin{array}{cc} \mathrm{Bad} & \mathrm{Better} \\ \hline \\ e^{i\frac{\pi}2} \quad e^{\frac{i\pi}2}& e^{i\pi/2} \\ \int_{-\frac\pi2}^\frac\pi2 \sin x\,dx & \int_{-\pi/2}^{\pi/2}\sin x\,dx \\ \end{array}Badei2πe2iπ∫−2π2πsinxdxBettereiπ/2∫−π/2π/2sinxdx

## [矩阵、条件表达式、方程组](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=矩阵、条件表达式、方程组)

语法：

```
\begin{类型}
公式内容
\end{类型}Copy to clipboardErrorCopied
```

类型可以是：矩阵 `matrix` `pmatrix` `bmatrix` `Bmatrix` `vmatrix` `Vmatrix`、条件表达式 `cases`、多行对齐方程式 `aligned`、数组 `array`。

在公式内容中：在每一行中插入 `&` 来指定需要**对齐**的内容，在每行结尾处使用 `\\` **换行**。

### [无框矩阵](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=无框矩阵)

在开头使用 `begin{matrix}`，在结尾使用 `end{matrix}`，在中间插入矩阵元素，每个元素之间插入 `&` ，并在每行结尾处使用 `\\` 。

```
\begin{matrix}
x & y \\
z & v
\end{matrix}Copy to clipboardErrorCopied
```

{\displaystyle {\begin{matrix}x&y\\z&v\end{matrix}}}xzyv

### [有框矩阵](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=有框矩阵)

在开头将 `matrix` 替换为 `pmatrix` `bmatrix` `Bmatrix` `vmatrix` `Vmatrix` 。

```
\begin{vmatrix}
x & y \\
z & v
\end{vmatrix}Copy to clipboardErrorCopied
```

{\displaystyle {\begin{vmatrix}x&y\\z&v\end{vmatrix}}}∣∣∣∣∣xzyv∣∣∣∣∣

```
\begin{Vmatrix}
x & y \\
z & v
\end{Vmatrix}Copy to clipboardErrorCopied
```

{\displaystyle {\begin{Vmatrix}x&y\\z&v\end{Vmatrix}}}∥∥∥∥∥xzyv∥∥∥∥∥

使用 `\cdots` \cdots⋯ , `\ddots` \ddots⋱ , `\vdots` \vdots⋮ 来输入**省略符号**。

```
\begin{bmatrix}
0      & \cdots & 0      \\
\vdots & \ddots & \vdots \\
0      & \cdots & 0
\end{bmatrix}Copy to clipboardErrorCopied
```

{\displaystyle {\begin{bmatrix}0&\cdots &0\\\vdots &\ddots &\vdots \\0&\cdots &0\end{bmatrix}}}⎣⎢⎢⎡0⋮0⋯⋱⋯0⋮0⎦⎥⎥⎤

```
\begin{Bmatrix}
x & y \\
z & v
\end{Bmatrix}Copy to clipboardErrorCopied
```

{\displaystyle {\begin{Bmatrix}x&y\\z&v\end{Bmatrix}}}{xzyv}

```
\begin{pmatrix}
x & y \\
z & v
\end{pmatrix}Copy to clipboardErrorCopied
```

{\displaystyle {\begin{pmatrix}x&y\\z&v\end{pmatrix}}}(xzyv)

### [条件表达式](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=条件表达式)

```
f(n) =
\begin{cases} 
n/2,  & \text{if }n\text{ is even} \\
3n+1, & \text{if }n\text{ is odd}
\end{cases}Copy to clipboardErrorCopied
```

{\displaystyle f(n)={\begin{cases}n/2,&{\text{if }}n{\text{ is even}}\\3n+1,&{\text{if }}n{\text{ is odd}}\end{cases}}}f(n)={n/2,3n+1,if n is evenif n is odd

### [多行等式、同余式](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=多行等式、同余式)

人们经常想要一列整齐且居中的方程式序列。使用 `\begin{aligned}…\end{aligned}`。

```
\begin{aligned}
f(x) & = (m+n)^2 \\
     & = m^2+2mn+n^2 \\
\end{aligned}
Copy to clipboardErrorCopied
```

{\displaystyle {\begin{aligned}f(x)&=(m+n)^{2}\\&=m^{2}+2mn+n^{2}\\\end{aligned}}}f(x)=(m+n)2=m2+2mn+n2

```
begin{aligned}
3^{6n+3}+4^{6n+3} 
& \equiv (3^3)^{2n+1}+(4^3)^{2n+1}\\  
& \equiv 27^{2n+1}+64^{2n+1}\\  
& \equiv 27^{2n+1}+(-27)^{2n+1}\\ 
& \equiv 27^{2n+1}-27^{2n+1}\\
& \equiv 0 \pmod{91}\\
\end{aligned}Copy to clipboardErrorCopied
```

{\displaystyle {\begin{aligned}3^{6n+3}+4^{6n+3}&\equiv (3^{3})^{2n+1}+(4^{3})^{2n+1}\\&\equiv 27^{2n+1}+64^{2n+1}\\&\equiv 27^{2n+1}+(-27)^{2n+1}\\&\equiv 27^{2n+1}-27^{2n+1}\\&\equiv 0{\pmod {91}}\\\end{aligned}}}36n+3+46n+3≡(33)2n+1+(43)2n+1≡272n+1+642n+1≡272n+1+(−27)2n+1≡272n+1−272n+1≡0(mod91)

```
\begin{alignedat}{3}
f(x) & = (m-n)^2 \\
f(x) & = (-m+n)^2 \\
     & = m^2-2mn+n^2 \\
\end{alignedat}Copy to clipboardErrorCopied
```

{\displaystyle {\begin{alignedat}{3}f(x)&=(m-n)^{2}\\f(x)&=(-m+n)^{2}\\&=m^{2}-2mn+n^{2}\\\end{alignedat}}}f(x)f(x)=(m−n)2=(−m+n)2=m2−2mn+n2

### [方程组](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=方程组)

```
\begin{cases}
3x + 5y +  z \\
7x - 2y + 4z \\
-6x + 3y + 2z
\end{cases}Copy to clipboardErrorCopied
```

{\displaystyle {\begin{cases}3x+5y+z\\7x-2y+4z\\-6x+3y+2z\end{cases}}}⎩⎪⎪⎨⎪⎪⎧3x+5y+z7x−2y+4z−6x+3y+2z

或

```
\left\{\begin{aligned}
3x + 5y +  z \\
7x - 2y + 4z \\
-6x + 3y + 2z
\end{aligned}\right.Copy to clipboardErrorCopied
```

\left\{\begin{aligned} 3x + 5y + z \\ 7x - 2y + 4z \\ -6x + 3y + 2z \end{aligned}\right.⎩⎪⎪⎨⎪⎪⎧3x+5y+z7x−2y+4z−6x+3y+2z

## [数组与表格](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=数组与表格)

通常，一个格式化后的表格比单纯的文字或排版后的文字更具有可读性。数组和表格均以 `\begin{array}` 开头，并在其后定义列数及每一列的文本对齐属性，`c` `l` `r` 分别代表居中、左对齐及右对齐。若需要插入垂直分割线，在定义式中插入 `|` ，若要插入水平分割线，在下一行输入前插入 `\hline` 。与矩阵相似，每行元素间均须要插入 `&` ，每行元素以 `\\` 结尾，最后以 `\end{array}` 结束数组。

- 例子：

  ```
  \begin{array}{c|lcr}
  n & \text{左对齐} & \text{居中对齐} & \text{右对齐} \\
  \hline
  1 & 0.24 & 1 & 125 \\
  2 & -1 & 189 & -8 \\
  3 & -20 & 2000 & 1+10i
  \end{array}Copy to clipboardErrorCopied
  ```

- 显示：

  \begin{array}{c|lcr} n & \text{左对齐} & \text{居中对齐} & \text{右对齐} \\ \hline 1 & 0.24 & 1 & 125 \\ 2 & -1 & 189 & -8 \\ 3 & -20 & 2000 & 1+10i \end{array}n123左对齐0.24−1−20居中对齐11892000右对齐125−81+10i

- 例子:

```
\begin{array}{lcl}
z        & = & a \\
f(x,y,z) & = & x + y + z 
\end{array}Copy to clipboardErrorCopied
```

- 显示：

{\displaystyle {\begin{array}{lcl}z&=&a\\f(x,y,z)&=&x+y+z\end{array}}}zf(x,y,z)==ax+y+z

- 例子:

```
\begin{array}{lcr}
z        & = & a \\
f(x,y,z) & = & x + y + z    
\end{array}Copy to clipboardErrorCopied
```

- 显示:

{\displaystyle {\begin{array}{lcr}z&=&a\\f(x,y,z)&=&x+y+z\end{array}}}zf(x,y,z)==ax+y+z

- 例子:

```
\begin{array}{ccc}
a & b & S \\
\hline
0&0&1\\
0&1&1\\
1&0&1\\
1&1&0\\
\end{array}Copy to clipboardErrorCopied
```

- 显示:

{\displaystyle {\begin{array}{ccc}a&b&S\\\hline 0&0&1\\0&1&1\\1&0&1\\1&1&0\\\end{array}}}a0011b0101S1110

### [嵌套数组或表格](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=嵌套数组或表格)

多个数组/表格可 **互相嵌套** 并组成一组数组/一组表格。 使用嵌套前必须声明 `$$` 符号。

- 例子：

  ```
  % outer vertical array of arrays 外层垂直表格
  \begin{array}{c}
    % inner horizontal array of arrays 内层水平表格
    \begin{array}{cc}
        % inner array of minimum values 内层"最小值"数组
        \begin{array}{c|cccc}
        \text{min} & 0 & 1 & 2 & 3\\
        \hline
        0 & 0 & 0 & 0 & 0\\
        1 & 0 & 1 & 1 & 1\\
        2 & 0 & 1 & 2 & 2\\
        3 & 0 & 1 & 2 & 3
        \end{array}
    &
        % inner array of maximum values 内层"最大值"数组
        \begin{array}{c|cccc}
        \text{max}&0&1&2&3\\
        \hline
        0 & 0 & 1 & 2 & 3\\
        1 & 1 & 1 & 2 & 3\\
        2 & 2 & 2 & 2 & 3\\
        3 & 3 & 3 & 3 & 3
        \end{array}
    \end{array}
    % 内层第一行表格组结束
    \\
    % inner array of delta values 内层第二行Delta值数组
        \begin{array}{c|cccc}
        \Delta&0&1&2&3\\
        \hline
        0 & 0 & 1 & 2 & 3\\
        1 & 1 & 0 & 1 & 2\\
        2 & 2 & 1 & 0 & 1\\
        3 & 3 & 2 & 1 & 0
        \end{array}
        % 内层第二行表格组结束
  \end{array}Copy to clipboardErrorCopied
  ```

- 显示：

  % outer vertical array of arrays 外层垂直表格 \begin{array}{c} % inner horizontal array of arrays 内层水平表格 \begin{array}{cc} % inner array of minimum values 内层"最小值"数组 \begin{array}{c|cccc} \text{min} & 0 & 1 & 2 & 3\\ \hline 0 & 0 & 0 & 0 & 0\\ 1 & 0 & 1 & 1 & 1\\ 2 & 0 & 1 & 2 & 2\\ 3 & 0 & 1 & 2 & 3 \end{array} & % inner array of maximum values 内层"最大值"数组 \begin{array}{c|cccc} \text{max}&0&1&2&3\\ \hline 0 & 0 & 1 & 2 & 3\\ 1 & 1 & 1 & 2 & 3\\ 2 & 2 & 2 & 2 & 3\\ 3 & 3 & 3 & 3 & 3 \end{array} \end{array} % 内层第一行表格组结束 \\ % inner array of delta values 内层第二行Delta值数组 \begin{array}{c|cccc} \Delta&0&1&2&3\\ \hline 0 & 0 & 1 & 2 & 3\\ 1 & 1 & 0 & 1 & 2\\ 2 & 2 & 1 & 0 & 1\\ 3 & 3 & 2 & 1 & 0 \end{array} % 内层第二行表格组结束 \end{array}min012300000101112012230123max012300123111232222333333Δ012300123110122210133210

### [用数组实现带分割符号的矩阵](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=用数组实现带分割符号的矩阵)

- 例子：

  ```
  $$
  \left[
    \begin{array}{cc|c}
      1&2&3\\
      4&5&6
    \end{array}
  \right]
  $$Copy to clipboardErrorCopied
  ```

- 显示：

  \left[ \begin{array}{cc|c} 1&2&3\\ 4&5&6 \end{array} \right][142536]

其中 `cc|c` 代表在一个三列矩阵中的第二和第三列之间插入分割线。

## [字体](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=字体)

### [希腊字母](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=希腊字母)

输入 `\小写希腊字母英文全称` 和 `\首字母大写希腊字母英文全称` 来分别输入小写和大写希腊字母。

```
\Alpha \Beta \Gamma \Delta \Epsilon \Zeta \Eta \Theta
```

{\displaystyle \mathrm {A} \mathrm {B} \Gamma \Delta \mathrm {E} \mathrm {Z} \mathrm {H} \Theta }ABΓΔEZHΘ

```
\Iota \Kappa \Lambda \Mu \Nu \Xi \Omicron \Pi
```

{\displaystyle \mathrm {I} \mathrm {K} \Lambda \mathrm {M} \mathrm {N} \mathrm {O} \Xi \Pi }IKΛMNOΞΠ

```
\Rho \Sigma \Tau \Upsilon \Phi \Chi \Psi \Omega
```

{\displaystyle \mathrm {P} \Sigma \mathrm {T} \Upsilon \Phi \mathrm {X} \Psi \Omega }PΣTΥΦXΨΩ

```
\alpha \beta \gamma \delta \epsilon \zeta \eta \theta
```

{\displaystyle \alpha \beta \gamma \delta \epsilon \zeta \eta \theta}αβγδϵζηθ

```
\iota \kappa \lambda \mu \nu \omicron \xi \pi
```

{\displaystyle \iota \kappa \lambda \mu \nu \mathrm {o} \xi \pi }ικλμνoξπ

```
\rho \sigma \tau \upsilon \phi \chi \psi \omega
```

{\displaystyle \rho \sigma \tau \upsilon \phi \chi \psi \omega}ρστυϕχψω

**部分字母有变量专用形式，以 `\var-` 开头。**

```
\varepsilon \digamma \varkappa \varpi
```

{\displaystyle \varepsilon \digamma \varkappa \varpi}εϝϰϖ

```
\varrho \varsigma \vartheta \varphi
```

{\displaystyle \varrho \varsigma \vartheta \varphi}ϱςϑφ

### [希伯来符号](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=希伯来符号)

```
\aleph \beth \gimel \daleth
```

{\displaystyle \aleph \beth \gimel \daleth}ℵℶℷℸ

### [部分字体的简称](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=部分字体的简称)

若要对公式的某一部分字符进行字体转换，可以用 `{\字体 {需转换的部分字符}}` 命令，其中 `\字体` 部分可以参照下表选择合适的字体。一般情况下，公式默认为意大利体 italicitalic 。

|输入|说明|显示|输入|说明|显示| |:--:|:--:|:--:|:--:|:--:|:--:|:--:| |\rm|罗马体|\rm{Sample}Sample|\cal|花体|\cal{SAMPLE}\calSAMPLE| |\it|意大利体|\it{Sample}*S**a**m**p**l**e*|\Bbb|黑板粗体|\Bbb{SAMPLE}SAMPLE| |\bf|粗体|\bf{Sample}**S****a****m****p****l****e**|\mit|数学斜体|\mit{SAMPLE}\mitSAMPLE| |\sf|等线体|\sf{Sample}Sample|\scr|手写体|\scr{SAMPLE}\scrSAMPLE| |\tt|打字机体|\tt{Sample}Sample|\frak|旧德式字体|\frak{Sample}Sample|

### [所有字体](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=所有字体)

#### [黑板报粗体](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=黑板报粗体)

```
\mathbb{ABCDEFGHI}
```

{\displaystyle \mathbb {ABCDEFGHI} }ABCDEFGHI

```
\mathbb{JKLMNOPQR}
```

{\displaystyle \mathbb {JKLMNOPQR} }JKLMNOPQR

```
\mathbb{STUVWXYZ}
```

{\displaystyle \mathbb {STUVWXYZ} }STUVWXYZ

#### [粗体](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=粗体)

```
\mathbf{ABCDEFGHI}
```

{\displaystyle \mathbf {ABCDEFGHI} }**A****B****C****D****E****F****G****H****I**

```
\mathbf{JKLMNOPQR}
```

{\displaystyle \mathbf {JKLMNOPQR} }**J****K****L****M****N****O****P****Q****R**

```
\mathbf{STUVWXYZ}
```

{\displaystyle \mathbf {STUVWXYZ} }**S****T****U****V****W****X****Y****Z**

```
\mathbf{abcdefghijklm}
```

{\displaystyle \mathbf {abcdefghijklm} }**a****b****c****d****e****f****g****h****i****j****k****l****m**

```
\mathbf{nopqrstuvwxyz}
```

{\displaystyle \mathbf {nopqrstuvwxyz} }**n****o****p****q****r****s****t****u****v****w****x****y****z**

```
\mathbf{0123456789}
```

{\displaystyle \mathbf {0123456789} }**0****1****2****3****4****5****6****7****8****9**

#### [粗体希腊字母](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=粗体希腊字母)

```
\boldsymbol{\Alpha\Beta\Gamma\Delta\Epsilon\Zeta\Eta\Theta}
```

{\displaystyle {\boldsymbol {\mathrm {A} \mathrm {B} \Gamma \Delta \mathrm {E} \mathrm {Z} \mathrm {H} \Theta }}}AB**Γ****Δ**EZH**Θ**

```
\boldsymbol{\Iota\Kappa\Lambda\Mu\Nu\Xi\Pi\Rho}
```

{\displaystyle {\boldsymbol {\mathrm {I} \mathrm {K} \Lambda \mathrm {M} \mathrm {N} \Xi \Pi \mathrm {P} }}}IK**Λ**MN**Ξ****Π**P

```
\boldsymbol{\Sigma\Tau\Upsilon\Phi\Chi\Psi\Omega}
```

{\displaystyle {\boldsymbol {\Sigma \mathrm {T} \Upsilon \Phi \mathrm {X} \Psi \Omega }}}**Σ**T**Υ****Φ**X**Ψ****Ω**

```
\boldsymbol{\alpha\beta\gamma\delta\epsilon\zeta\eta\theta}
```

{\displaystyle {\boldsymbol {\alpha \beta \gamma \delta \epsilon \zeta \eta \theta}}}**α****β****γ****δ****ϵ****ζ****η****θ**

```
\boldsymbol{\iota\kappa\lambda\mu\nu\xi\pi\rho}
```

{\displaystyle {\boldsymbol {\iota \kappa \lambda \mu \nu \xi \pi \rho}}}**ι****κ****λ****μ****ν****ξ****π****ρ**

```
\boldsymbol{\sigma\tau\upsilon\phi\chi\psi\omega}
```

{\displaystyle {\boldsymbol {\sigma \tau \upsilon \phi \chi \psi \omega}}}**σ****τ****υ****ϕ****χ****ψ****ω**

```
\boldsymbol{\varepsilon\digamma\varkappa\varpi}
```

{\displaystyle {\boldsymbol {\varepsilon \digamma \varkappa \varpi}}}**ε**ϝϰ**ϖ**

```
\boldsymbol{\varrho\varsigma\vartheta\varphi}
```

{\displaystyle {\boldsymbol {\varrho \varsigma \vartheta \varphi}}}**ϱ****ς****ϑ****φ**

#### [斜体（拉丁字母默认）](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=斜体（拉丁字母默认）)

```
\mathit{0123456789}
```

{\displaystyle {\mathit {0123456789}}}*0**1**2**3**4**5**6**7**8**9*

#### [斜体希腊字母（小写字母默认）](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=斜体希腊字母（小写字母默认）)

```
\mathit{\Alpha\Beta\Gamma\Delta\Epsilon\Zeta\Eta\Theta}
```

{\displaystyle {\mathit {\mathrm {A} \mathrm {B} \Gamma \Delta \mathrm {E} \mathrm {Z} \mathrm {H} \Theta }}}AB*Γ**Δ*EZH*Θ*

```
\mathit{\Iota\Kappa\Lambda\Mu\Nu\Xi\Pi\Rho}
```

{\displaystyle {\mathit {\mathrm {I} \mathrm {K} \Lambda \mathrm {M} \mathrm {N} \Xi \Pi \mathrm {P} }}}IK*Λ*MN*Ξ**Π*P

```
\mathit{\Sigma\Tau\Upsilon\Phi\Chi\Psi\Omega}
```

{\displaystyle {\mathit {\Sigma \mathrm {T} \Upsilon \Phi \mathrm {X} \Psi \Omega }}}*Σ*T*Υ**Φ*X*Ψ**Ω*

#### [罗马体](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=罗马体)

```
\mathrm{ABCDEFGHI}
```

{\displaystyle \mathrm {ABCDEFGHI} }ABCDEFGHI

```
\mathrm{JKLMNOPQR}
```

{\displaystyle \mathrm {JKLMNOPQR} }JKLMNOPQR

```
\mathrm{STUVWXYZ}
```

{\displaystyle \mathrm {STUVWXYZ} }STUVWXYZ

```
\mathrm{abcdefghijklm}
```

{\displaystyle \mathrm {abcdefghijklm} }abcdefghijklm

```
\mathrm{nopqrstuvwxyz}
```

{\displaystyle \mathrm {nopqrstuvwxyz} }nopqrstuvwxyz

```
\mathrm{0123456789}
```

{\displaystyle \mathrm {0123456789} }0123456789

#### [无衬线体](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=无衬线体)

```
\mathsf{ABCDEFGHI}
```

{\displaystyle {\mathsf {ABCDEFGHI}}}ABCDEFGHI

```
\mathsf{JKLMNOPQR}
```

{\displaystyle {\mathsf {JKLMNOPQR}}}JKLMNOPQR

```
\mathsf{STUVWXYZ}
```

{\displaystyle {\mathsf {STUVWXYZ}}}STUVWXYZ

```
\mathsf{abcdefghijklm}
```

{\displaystyle {\mathsf {abcdefghijklm}}}abcdefghijklm

```
\mathsf{nopqrstuvwxyz}
```

{\displaystyle {\mathsf {nopqrstuvwxyz}}}nopqrstuvwxyz

```
\mathsf{0123456789}
```

{\displaystyle {\mathsf {0123456789}}}0123456789

#### [无衬线体希腊字母（仅大写）](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=无衬线体希腊字母（仅大写）)

```
\mathsf{\Alpha \Beta \Gamma \Delta \Epsilon \Zeta \Eta \Theta}
```

{\displaystyle {\mathsf {\mathrm {A} \mathrm {B} \Gamma \Delta \mathrm {E} \mathrm {Z} \mathrm {H} \Theta }}}ABΓΔEZHΘ

```
\mathsf{\Iota \Kappa \Lambda \Mu \Nu \Xi \Pi \Rho}
```

{\displaystyle {\mathsf {\mathrm {I} \mathrm {K} \Lambda \mathrm {M} \mathrm {N} \Xi \Pi \mathrm {P} }}}IKΛMNΞΠP

```
\mathsf{\Sigma \Tau \Upsilon \Phi \Chi \Psi \Omega}
```

{\displaystyle {\mathsf {\Sigma \mathrm {T} \Upsilon \Phi \mathrm {X} \Psi \Omega }}}ΣTΥΦXΨΩ

#### [手写体 / 花体](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=手写体-花体)

```
\mathcal{ABCDEFGHI}
```

{\displaystyle {\mathcal {ABCDEFGHI}}}ABCDEFGHI

```
\mathcal{JKLMNOPQR}
```

{\displaystyle {\mathcal {JKLMNOPQR}}}JKLMNOPQR

```
\mathcal{STUVWXYZ}
```

{\displaystyle {\mathcal {STUVWXYZ}}}STUVWXYZ

#### [Fraktur 体](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=fraktur-体)

```
\mathfrak{ABCDEFGHI}
```

{\displaystyle {\mathfrak {ABCDEFGHI}}}ABCDEFGHI

```
\mathfrak{JKLMNOPQR}
```

{\displaystyle {\mathfrak {JKLMNOPQR}}}JKLMNOPQR

```
\mathfrak{STUVWXYZ}
```

{\displaystyle {\mathfrak {STUVWXYZ}}}STUVWXYZ

```
\mathfrak{abcdefghijklm}
```

{\displaystyle {\mathfrak {abcdefghijklm}}}abcdefghijklm

```
\mathfrak{nopqrstuvwxyz}
```

{\displaystyle {\mathfrak {nopqrstuvwxyz}}}nopqrstuvwxyz

```
\mathfrak{0123456789}
```

{\displaystyle {\mathfrak {0123456789}}}0123456789

#### [小型手写体](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=小型手写体)

```
{\scriptstyle\text{abcdefghijklm}}
```

{\displaystyle {\scriptstyle {\text{abcdefghijklm}}}}abcdefghijklm

### [混合字体](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=混合字体)

特征|语法|渲染效果

斜体字符（忽略空格）

```
x y z
```

{\displaystyle xyz}xyz

非斜体字符

```
\text{x y z}
```

{\displaystyle {\text{x y z}}}x y z

混合斜体（差）

```
\text{if} n \text{is even}
```

{\displaystyle {\text{if}}n{\text{is even}}}ifnis even

混合斜体（好）

```
\text{if }n\text{ is even}
```

{\displaystyle {\text{if }}n{\text{ is even}}}if n is even

混合斜体（替代品：`~` 或者 `\ ` 强制空格）

```
\text{if}~n\ \text{is even}
```

{\displaystyle {\text{if}}~n\ {\text{is even}}}if n is even

### [注释文本](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=注释文本)

使用 `\text {文字}` 来添加注释文本（注释文本不会被识别为公式，不用斜体显示）。`\text {文字}`中仍可以使用 `$公式$` 插入其它公式。

- 例子：

  ```
  f(n)= \begin{cases}
  n/2, & \text {if $n$ is even} \\
  3n+1, &\text{if $n$ is odd}
  \end{cases} Copy to clipboardErrorCopied
  ```

- 显示：

f(n)= \begin{cases} n/2, & \text {if}\ n\ \text{is even} \\ 3n+1, & \text {if}\ n\ \text{is odd} \end{cases}f(n)={n/2,3n+1,if n is evenif n is odd

## [括号](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=括号)

`()`、`[]` 和 `|` 表示符号本身，使用 `\{\}` 来表示 `{}` 。

功能|语法|显示

短括号

```
\frac{1}{2}
```

{\displaystyle ({\frac {1}{2}})}(21)

长括号

```
\left(\frac{1}{2} \right
```

{\displaystyle \left({\frac {1}{2}}\right)}(21)

使用 `\left` 和 `\right` 来创建自动匹配高度的 (圆括号)，[方括号] 和 {花括号} 。

功能|语法|显示

圆括号，小括号

```
\left( \frac{a}{b} \right)
```

{\displaystyle \left({\frac {a}{b}}\right)}(ba)

方括号，中括号

```
\left[ \frac{a}{b} \right]
```

{\displaystyle \left[{\frac {a}{b}}\right]}[ba]

花括号，大括号

```
\left{ \frac{a}{b} \right}
```

{\displaystyle \left\{{\frac {a}{b}}\right\}}{ba}

角括号

```
\left \langle \frac{a}{b} \right \rangle
```

{\displaystyle \left\langle {\frac {a}{b}}\right\rangle }⟨ba⟩

单竖线，绝对值

```
\left| \frac{a}{b} \right|
```

{\displaystyle \left| \frac{a}{b} \right|}∣∣∣∣ba∣∣∣∣

双竖线，范

```
\left \| \frac{a}{b} \right \|
```

{\displaystyle \left\|{\frac {a}{b}}\right\|}∥∥∥∥ba∥∥∥∥

取整函数

```
\left \lfloor \frac{a}{b} \right \rfloor
```

{\displaystyle \left\lfloor {\frac {a}{b}}\right\rfloor }⌊ba⌋

取顶函数

```
\left \lceil \frac{c}{d} \right \rceil
```

{\displaystyle \left\lceil {\frac {c}{d}}\right\rceil }⌈dc⌉

斜线与反斜线

```
\left / \frac{a}{b} \right \backslash
```

{\displaystyle \left/{\frac {a}{b}}\right\backslash }/ba\

上下箭头

```
\left \uparrow \frac{a}{b} \right \downarrow
```

{\displaystyle \left\uparrow {\frac {a}{b}}\right\downarrow }⏐⏐⏐↑ba↓⏐⏐⏐

```
\left \Uparrow \frac{a}{b} \right \Downarrow
```

{\displaystyle \left\Uparrow {\frac {a}{b}}\right\Downarrow }‖‖‖⇑ba⇓‖‖‖

```
\left \updownarrow \frac{a}{b} \right \Updownarrow
```

{\displaystyle \left\updownarrow {\frac {a}{b}}\right\Updownarrow }↓⏐⏐↑ba⇓‖‖⇑

混合括号

```
\left[ 0,1 \right)
```

{\displaystyle \left[0,1\right)}[0,1)

```
\left \langle \psi \right |
```

\left \langle \psi \right |⟨ψ∣

如果括号只有一边，要用 `\left.` 或 `\right.` 匹配另一边。

单左括号

```
\left \{\frac{a}{b} \right.
```

{\displaystyle \left\{{\frac {a}{b}}\right.}{ba

单右括号

```
\left. \frac{a}{b} \right \}
```

{\displaystyle \left.{\frac {a}{b}}\right\}}ba}

备注：

- 可以使用 `\big, \Big, \bigg, \Bigg` 控制括号的大小，比如代码

  `\Bigg ( \bigg [ \Big \{ \big \langle \left | \| \frac{a}{b} \| \right | \big \rangle \Big \} \bigg ] \Bigg )`

  显示︰

  \Bigg ( \bigg [ \Big \{ \big \langle \left | \| \frac{a}{b} \| \right | \big \rangle \Big \} \bigg ] \Bigg )([{⟨∣∣∣∣∥ba∥∣∣∣∣⟩}])

## [空格](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=空格)

注意 TeX 能够自动处理大多数的空格，但是您有时候需要自己来控制。

功能|语法|显示|宽度

### [2 个 quad 空格](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=_2-个-quad-空格)

```
\alpha\qquad\beta
```

{\displaystyle \alpha \qquad \beta}αβ

{\displaystyle mm}mm

### [quad 空格](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=quad-空格)

```
\alpha\quad\beta
```

{\displaystyle \alpha \quad \beta}αβ

{\displaystyle m}m

### [大空格](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=大空格)

```
\alpha\ \beta
```

{\displaystyle \alpha \ \beta}α β

{\displaystyle {\frac{m}{3}}}3m

### [中等空格](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=中等空格)

```
\alpha\;\beta
```

{\displaystyle \alpha \;\beta}αβ

{\displaystyle {\frac {2m}{7}}}72m

### [小空格](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=小空格)

```
\alpha\,\beta
```

{\displaystyle \alpha \,\beta}αβ

{\displaystyle {\frac {m}{6}}}6m

### [没有空格](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=没有空格)

```
\alpha\beta
```

{\displaystyle \alpha \beta }αβ

{\displaystyle 0}0

### [紧贴](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=紧贴)

```
\alpha\!\beta
```

{\displaystyle \alpha \!\beta}αβ

{\displaystyle -{\frac {m}{6}}}−6m

## [颜色](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=颜色)

### [Cmd Markdown 公式指导手册](https://www.zybuluo.com/codeep/note/163962#七交换图表使用参考)里是这样写的：

使用 `\color{颜色}{文字}` 来更改特定的文字颜色。 更改文字颜色 **需要浏览器支持** ，如果浏览器不知道你所需的颜色，那么文字将被渲染为黑色。

对于较旧的浏览器（HTML4与CSS2），以下颜色是被支持的：

| 输入   | 显示                     | 输入    | 显示                      |
| ------ | ------------------------ | ------- | ------------------------- |
| black  | \color{black}{text}text  | grey    | \color{grey}{text}text    |
| silver | \color{silver}{text}text | white   | \color{white}{text}text   |
| maroon | \color{maroon}{text}text | red     | \color{red}{text}text     |
| yellow | \color{yellow}{text}text | lime    | \color{lime}{text}text    |
| olive  | \color{olive}{text}text  | green   | \color{green}{text}text   |
| teal   | \color{teal}{text}text   | auqa    | \color{auqa}{text}text    |
| blue   | \color{blue}{text}text   | navy    | \color{navy}{text}text    |
| purple | \color{purple}{text}text | fuchsia | \color{fuchsia}{text}text |

对于较新的浏览器（HTML5与CSS3），额外的124种颜色将被支持：

输入 `\color {#rgb} {text}` 来自定义更多的颜色，其中 `#rgb` 的 `r` `g` `b` 可输入 `0-9` 和 `a-f` 来表示红色、绿色和蓝色的纯度（饱和度）。

- 例子：

  ```
  \begin{array}{|rrrrrrrr|}\hline
  \verb+#000+ & \color{#000}{text} & & &
  \verb+#00F+ & \color{#00F}{text} & & \\
  & & \verb+#0F0+ & \color{#0F0}{text} &
  & & \verb+#0FF+ & \color{#0FF}{text}\\
  \verb+#F00+ & \color{#F00}{text} & & &
  \verb+#F0F+ & \color{#F0F}{text} & & \\
  & & \verb+#FF0+ & \color{#FF0}{text} &
  & & \verb+#FFF+ & \color{#FFF}{text}\\
  \hline
  \end{array}Copy to clipboardErrorCopied
  ```

- 显示：

  \begin{array}{|rrrrrrrr|}\hline \verb+#000+ & \color{#000}{text} & & & \verb+#00F+ & \color{#00F}{text} & & \\ & & \verb+#0F0+ & \color{#0F0}{text} & & & \verb+#0FF+ & \color{#0FF}{text}\\ \verb+#F00+ & \color{#F00}{text} & & & \verb+#F0F+ & \color{#F0F}{text} & & \\ & & \verb+#FF0+ & \color{#FF0}{text} & & & \verb+#FFF+ & \color{#FFF}{text}\\ \hline \end{array}#000#F00texttext#0F0#FF0texttext#00F#F0Ftexttext#0FF#FFFtexttext

- 例子：

  ```
  \begin{array}{|rrrrrrrr|}
  \hline
  \verb+#000+ & \color{#000}{text} & \verb+#005+ & \color{#005}{text} & \verb+#00A+ & \color{#00A}{text} & \verb+#00F+ & \color{#00F}{text}  \\
  \verb+#500+ & \color{#500}{text} & \verb+#505+ & \color{#505}{text} & \verb+#50A+ & \color{#50A}{text} & \verb+#50F+ & \color{#50F}{text}  \\
  \verb+#A00+ & \color{#A00}{text} & \verb+#A05+ & \color{#A05}{text} & \verb+#A0A+ & \color{#A0A}{text} & \verb+#A0F+ & \color{#A0F}{text}  \\
  \verb+#F00+ & \color{#F00}{text} & \verb+#F05+ & \color{#F05}{text} & \verb+#F0A+ & \color{#F0A}{text} & \verb+#F0F+ & \color{#F0F}{text}  \\
  \hline
  \verb+#080+ & \color{#080}{text} & \verb+#085+ & \color{#085}{text} & \verb+#08A+ & \color{#08A}{text} & \verb+#08F+ & \color{#08F}{text}  \\
  \verb+#580+ & \color{#580}{text} & \verb+#585+ & \color{#585}{text} & \verb+#58A+ & \color{#58A}{text} & \verb+#58F+ & \color{#58F}{text}  \\
  \verb+#A80+ & \color{#A80}{text} & \verb+#A85+ & \color{#A85}{text} & \verb+#A8A+ & \color{#A8A}{text} & \verb+#A8F+ & \color{#A8F}{text}  \\
  \verb+#F80+ & \color{#F80}{text} & \verb+#F85+ & \color{#F85}{text} & \verb+#F8A+ & \color{#F8A}{text} & \verb+#F8F+ & \color{#F8F}{text}  \\
  \hline
  \verb+#0F0+ & \color{#0F0}{text} & \verb+#0F5+ & \color{#0F5}{text} & \verb+#0FA+ & \color{#0FA}{text} & \verb+#0FF+ & \color{#0FF}{text}  \\
  \verb+#5F0+ & \color{#5F0}{text} & \verb+#5F5+ & \color{#5F5}{text} & \verb+#5FA+ & \color{#5FA}{text} & \verb+#5FF+ & \color{#5FF}{text}  \\
  \verb+#AF0+ & \color{#AF0}{text} & \verb+#AF5+ & \color{#AF5}{text} & \verb+#AFA+ & \color{#AFA}{text} & \verb+#AFF+ & \color{#AFF}{text}  \\
  \verb+#FF0+ & \color{#FF0}{text} & \verb+#FF5+ & \color{#FF5}{text} & \verb+#FFA+ & \color{#FFA}{text} & \verb+#FFF+ & \color{#FFF}{text}  \\
  \hline
  \end{array}Copy to clipboardErrorCopied
  ```

- 显示：

  \begin{array}{|rrrrrrrr|} \hline \verb+#000+ & \color{#000}{text} & \verb+#005+ & \color{#005}{text} & \verb+#00A+ & \color{#00A}{text} & \verb+#00F+ & \color{#00F}{text} \\ \verb+#500+ & \color{#500}{text} & \verb+#505+ & \color{#505}{text} & \verb+#50A+ & \color{#50A}{text} & \verb+#50F+ & \color{#50F}{text} \\ \verb+#A00+ & \color{#A00}{text} & \verb+#A05+ & \color{#A05}{text} & \verb+#A0A+ & \color{#A0A}{text} & \verb+#A0F+ & \color{#A0F}{text} \\ \verb+#F00+ & \color{#F00}{text} & \verb+#F05+ & \color{#F05}{text} & \verb+#F0A+ & \color{#F0A}{text} & \verb+#F0F+ & \color{#F0F}{text} \\ \hline \verb+#080+ & \color{#080}{text} & \verb+#085+ & \color{#085}{text} & \verb+#08A+ & \color{#08A}{text} & \verb+#08F+ & \color{#08F}{text} \\ \verb+#580+ & \color{#580}{text} & \verb+#585+ & \color{#585}{text} & \verb+#58A+ & \color{#58A}{text} & \verb+#58F+ & \color{#58F}{text} \\ \verb+#A80+ & \color{#A80}{text} & \verb+#A85+ & \color{#A85}{text} & \verb+#A8A+ & \color{#A8A}{text} & \verb+#A8F+ & \color{#A8F}{text} \\ \verb+#F80+ & \color{#F80}{text} & \verb+#F85+ & \color{#F85}{text} & \verb+#F8A+ & \color{#F8A}{text} & \verb+#F8F+ & \color{#F8F}{text} \\ \hline \verb+#0F0+ & \color{#0F0}{text} & \verb+#0F5+ & \color{#0F5}{text} & \verb+#0FA+ & \color{#0FA}{text} & \verb+#0FF+ & \color{#0FF}{text} \\ \verb+#5F0+ & \color{#5F0}{text} & \verb+#5F5+ & \color{#5F5}{text} & \verb+#5FA+ & \color{#5FA}{text} & \verb+#5FF+ & \color{#5FF}{text} \\ \verb+#AF0+ & \color{#AF0}{text} & \verb+#AF5+ & \color{#AF5}{text} & \verb+#AFA+ & \color{#AFA}{text} & \verb+#AFF+ & \color{#AFF}{text} \\ \verb+#FF0+ & \color{#FF0}{text} & \verb+#FF5+ & \color{#FF5}{text} & \verb+#FFA+ & \color{#FFA}{text} & \verb+#FFF+ & \color{#FFF}{text} \\ \hline \end{array}#000#500#A00#F00#080#580#A80#F80#0F0#5F0#AF0#FF0texttexttexttexttexttexttexttexttexttexttexttext#005#505#A05#F05#085#585#A85#F85#0F5#5F5#AF5#FF5texttexttexttexttexttexttexttexttexttexttexttext#00A#50A#A0A#F0A#08A#58A#A8A#F8A#0FA#5FA#AFA#FFAtexttexttexttexttexttexttexttexttexttexttexttext#00F#50F#A0F#F0F#08F#58F#A8F#F8F#0FF#5FF#AFF#FFFtexttexttexttexttexttexttexttexttexttexttexttext

### [维基百科的](https://1024th.github.io/MathJax_Tutorial_CN/#/document?id=维基百科的数学公式教程里是这样写的：)[数学公式教程](https://zh.wikipedia.org/wiki/Help:数学公式)里是这样写的：

语法：`{\color{颜色}表达式}`

**作者实测：在部分浏览器中，上面的语法可能是错误的**（只将表达式的第一个字符着色），`\color{颜色}{文字}`的语法才是正确的。例如：

`{\color{Red}abc}`显示{\color{Red}abc}abc
`\color{Red}{abc}`显示\color{Red}{abc}abc

**支持色调表：**

{\displaystyle \color {Apricot}{\text{Apricot}}}Apricot

{\displaystyle \color {Aquamarine}{\text{Aquamarine}}}Aquamarine

{\displaystyle \color {Bittersweet}{\text{Bittersweet}}}Bittersweet

{\displaystyle \color {Black}{\text{Black}}}Black

{\displaystyle \color {Blue}{\text{Blue}}}Blue

{\displaystyle \color {BlueGreen}{\text{BlueGreen}}}BlueGreen

{\displaystyle \color {BlueViolet}{\text{BlueViolet}}}BlueViolet

{\displaystyle \color {BrickRed}{\text{BrickRed}}}BrickRed

{\displaystyle \color {Brown}{\text{Brown}}}Brown

{\displaystyle \color {BurntOrange}{\text{BurntOrange}}}BurntOrange

{\displaystyle \color {CadetBlue}{\text{CadetBlue}}}CadetBlue

{\displaystyle \color {CarnationPink}{\text{CarnationPink}}}CarnationPink

{\displaystyle \color {Cerulean}{\text{Cerulean}}}Cerulean

{\displaystyle \color {CornflowerBlue}{\text{CornflowerBlue}}}CornflowerBlue

{\displaystyle \color {Cyan}{\text{Cyan}}}Cyan

{\displaystyle \color {Dandelion}{\text{Dandelion}}}Dandelion

{\displaystyle \color {DarkOrchid}{\text{DarkOrchid}}}DarkOrchid

{\displaystyle \color {Emerald}{\text{Emerald}}}Emerald

{\displaystyle \color {ForestGreen}{\text{ForestGreen}}}ForestGreen

{\displaystyle \color {Fuchsia}{\text{Fuchsia}}}Fuchsia

{\displaystyle \color {Goldenrod}{\text{Goldenrod}}}Goldenrod

{\displaystyle \color {Gray}{\text{Gray}}}Gray

{\displaystyle \color {Green}{\text{Green}}}Green

{\displaystyle \color {GreenYellow}{\text{GreenYellow}}}GreenYellow

{\displaystyle \color {JungleGreen}{\text{JungleGreen}}}JungleGreen

{\displaystyle \color {Lavender}{\text{Lavender}}}Lavender

{\displaystyle \color {LimeGreen}{\text{LimeGreen}}}LimeGreen

{\displaystyle \color {Magenta}{\text{Magenta}}}Magenta

{\displaystyle \color {Mahogany}{\text{Mahogany}}}Mahogany

{\displaystyle \color {Maroon}{\text{Maroon}}}Maroon

{\displaystyle \color {Melon}{\text{Melon}}}Melon

{\displaystyle \color {MidnightBlue}{\text{MidnightBlue}}}MidnightBlue

{\displaystyle \color {Mulberry}{\text{Mulberry}}}Mulberry

{\displaystyle \color {NavyBlue}{\text{NavyBlue}}}NavyBlue

{\displaystyle \color {OliveGreen}{\text{OliveGreen}}}OliveGreen

{\displaystyle \color {Orange}{\text{Orange}}}Orange

{\displaystyle \color {OrangeRed}{\text{OrangeRed}}}OrangeRed

{\displaystyle \color {Orchid}{\text{Orchid}}}Orchid

{\displaystyle \color {Peach}{\text{Peach}}}Peach

{\displaystyle \color {Periwinkle}{\text{Periwinkle}}}Periwinkle

{\displaystyle \color {PineGreen}{\text{PineGreen}}}PineGreen

{\displaystyle \color {Plum}{\text{Plum}}}Plum

{\displaystyle \color {ProcessBlue}{\text{ProcessBlue}}}ProcessBlue

{\displaystyle \color {Purple}{\text{Purple}}}Purple

{\displaystyle \color {RawSienna}{\text{RawSienna}}}RawSienna

{\displaystyle \color {Red}{\text{Red}}}Red

{\displaystyle \color {RedOrange}{\text{RedOrange}}}RedOrange

{\displaystyle \color {RedViolet}{\text{RedViolet}}}RedViolet

{\displaystyle \color {Rhodamine}{\text{Rhodamine}}}Rhodamine

{\displaystyle \color {RoyalBlue}{\text{RoyalBlue}}}RoyalBlue

{\displaystyle \color {RoyalPurple}{\text{RoyalPurple}}}RoyalPurple

{\displaystyle \color {RubineRed}{\text{RubineRed}}}RubineRed

{\displaystyle \color {Salmon}{\text{Salmon}}}Salmon

{\displaystyle \color {SeaGreen}{\text{SeaGreen}}}SeaGreen

{\displaystyle \color {Sepia}{\text{Sepia}}}Sepia

{\displaystyle \color {SkyBlue}{\text{SkyBlue}}}SkyBlue

{\displaystyle \color {SpringGreen}{\text{SpringGreen}}}SpringGreen

{\displaystyle \color {Tan}{\text{Tan}}}Tan

{\displaystyle \color {TealBlue}{\text{TealBlue}}}TealBlue

{\displaystyle \color {Thistle}{\text{Thistle}}}Thistle

{\displaystyle \color {Turquoise}{\text{Turquoise}}}Turquoise

{\displaystyle \color {Violet}{\text{Violet}}}Violet

{\displaystyle \color {VioletRed}{\text{VioletRed}}}VioletRed

{\displaystyle \color {White}{\text{White}}}White

{\displaystyle \color {WildStrawberry}{\text{WildStrawberry}}}WildStrawberry

{\displaystyle \color {Yellow}{\text{Yellow}}}Yellow

{\displaystyle \color {YellowGreen}{\text{YellowGreen}}}YellowGreen

{\displaystyle \color {YellowOrange}{\text{YellowOrange}}}YellowOrange

＊注︰输入时第一个字母必需以大写输入，如`\color{OliveGreen}`。

例子

- `{\color{Blue}x^2}+{\color{Brown}2x} - {\color{OliveGreen}1}`

  {\displaystyle {\color {Blue}x^{2}}+{\color {Brown}2x}-{\color {OliveGreen}1}}x2+2x−1

- `x_{\color{Maroon}1,2}=\frac{-b\pm\sqrt{{\color{Maroon}b^2-4ac}}}{2a}`

  {\displaystyle x_{\color {Maroon}1,2}={\frac {-b\pm {\sqrt {\color {Maroon}b^{2}-4ac}}}{2a}}}x1,2=2a−b±b2−4ac
