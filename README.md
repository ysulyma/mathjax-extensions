This is a collection of MathJax extensions.

## Installation

Usage with a CDN:

```html
<script>
MathJax = {
  loader: {
    load: ["[custom]/annotations.js", "[custom]/brutalnewcommand.js", "[custom]/load-head.js"]
    paths: {
      custom: "https://cdn.jsdelivr.net/gh/ysulyma/mathjax-extensions/"
    }
  },
  tex: {
    packages: {"[+]": ["annotations", "brutalnewcommand", "load-head"]}
  }
};
</script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
```

## annotations

An extension to add annotation support to MathJax. It is your job to decide how to render the annotations.

### Usage
The following code:
````TeX
\newcommand{\R}{\mathbb R}
\Annotate[text]{\R}{the real numbers}
\Annotate[defn]{\R}{http://your-site.org/lesson1/the-real-number-line}

\newcommand{\space}[1]{#1}
\Annotate[text]{\space}{\(#1\) is a topological space}
\Annotate[pict]{\space}{http://your-site.org/img/space-example.jpg}
```

```HTML
<!-- \Annotate -->
The real numbers are denoted by \(\R\).

<!-- \Annotate with parameter -->
Let \(\space{X}\) be a topological space.

<!-- \annotate -->
\( \annotate[text,url]{O(n)}{orthogonal group}{https://en.wikipedia.org/wiki/Orthogonal_group} \)

<!-- \data -->
\( \data{"firstProp":"hello","secondProp":"world"}{\exp} \)
````
will produce output like the following after MathJax has typeset:
```HTML
<span class="semantics" id="MathJax-Span-7" data-annotation_text="the real numbers" data-annotation_defn="http://your-site.org/lesson1/the-real-number-line"><span class="texatom" id="MathJax-Span-8"><span class="mrow" id="MathJax-Span-9"><span class="mi" id="MathJax-Span-10" style="font-family: MathJax_AMS;">R</span></span></span></span>

<span class="semantics" id="MathJax-Span-13" data-annotation_text="\(X\) is a topological space" data-annotation_pict="http://your-site.org/img/space-example.jpg"><span class="mi" id="MathJax-Span-14" style="font-family: MathJax_Math; font-style: italic;">X<span style="display: inline-block; overflow: hidden; height: 1px; width: 0.024em;"></span></span></span>

<span class="semantics" id="MathJax-Span-17" data-annotation_text="orthogonal group" data-annotation_url="https://en.wikipedia.org/wiki/Orthogonal_group"><span class="mrow" id="MathJax-Span-18"><span class="mi" id="MathJax-Span-19" style="font-family: MathJax_Math; font-style: italic;">O</span><span class="mo" id="MathJax-Span-20" style="font-family: MathJax_Main;">(</span><span class="mi" id="MathJax-Span-21" style="font-family: MathJax_Math; font-style: italic;">n</span><span class="mo" id="MathJax-Span-22" style="font-family: MathJax_Main;">)</span></span></span>

<span class="dataset" id="MathJax-Span-25" data-first-prop="hello" data-second-prop="world"><span class="mi" id="MathJax-Span-26" style="font-family: MathJax_Main;">exp</span></span>
```

## load-head
This is a MathJax extension which helps with loading large numbers of macros.

If you have macros in `./macros.tex`, simply place `<script src="./macros.tex" type="math/tex"></script>` in `<head>`.
