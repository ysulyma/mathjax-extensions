/* https://github.com/mathjax/MathJax/issues/2210 */
(() => {
  const {Configuration} = MathJax._.input.tex.Configuration;
  const {CommandMap} = MathJax._.input.tex.SymbolMap;
  const TEXCLASS = MathJax._.core.MmlTree.MmlNode.TEXCLASS;

  new CommandMap("input", {input: "Input"}, {
    Input(parser, token) {
      const size = parser.GetBrackets(token);
      const cls = parser.GetBrackets(token);
      const value = parser.GetBrackets(token);
      const name = parser.GetArgument(token);

      const xml = parser.create("node", "XML");
      xml.setXML(MathJax.startup.adaptor.node("input", {
        class: cls,
        id: name,
        name,
        size,
        value,
        xmlns: "http://www.w3.org/1999/xhtml"
      }), MathJax.startup.adaptor);
      xml.getSerializedXML = function () {
        return this.adaptor.outerHTML(this.xml) + "</input>";
      };

      parser.Push(
        parser.create("node", "TeXAtom", [
          parser.create("node", "semantics", [
            parser.create("node", "annotation-xml", [
              xml
            ], {encoding: "application/xhtml+xml"})
          ])
        ], {texClass: TEXCLASS.ORD})
      );
    }
  });

  Configuration.create("input", {handler: {macro: ["input"]}});
})();
