/*************************************************************
 *
 *  MathJax/extensions/TeX/brutalnewcommand.js
 *
 *  \brutalnewcommand force-expands macros at the preprocessing stage for better compatibility with XyJax.
 *  
 *  ---------------------------------------------------------------------
 *  
 *  Copyright (c) 2020 Yuri Sulyma <yuri@epiplexis.xyz>.
 * 
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

 (() => {
  const {Configuration} = MathJax._.input.tex.Configuration;
  const {CommandMap} = MathJax._.input.tex.SymbolMap;
  const NewcommandUtil = MathJax._.input.tex.newcommand.NewcommandUtil.default;
  const NewcommandMethods = MathJax._.input.tex.newcommand.NewcommandMethods.default;

  /** "Brutal" macros */
  const brutalMap = {};

  const BrutalMethods = {
    brutalnewcommand(parser, name) {
      try {
        const cs = NewcommandUtil.GetCsNameArgument(parser, name);
        // const n = NewcommandUtil.GetArgCount(parser, name);
        // const opt = parser.GetBrackets(name);
        const def = parser.GetArgument(name);
        brutalMap[cs] = def;
      } catch (e) {
        // console.error(e);
      }
    }
  };

  /** Manually replace our macro in the string */
  function insertMacros(arg) {
    for (const cmd in brutalMap) {
      arg.math.math = arg.math.math.replace(new RegExp(`\\\\${cmd}`, "g"), brutalMap[cmd]);
    }
  }

  /**
 *  The mapping of control sequence to function calls
 */
  new CommandMap("brutalMap", {
  brutalnewcommand: ["brutalnewcommand"],
}, BrutalMethods);

/**
 * The configuration used to enable the MathML macros
 */
Configuration.create("brutalnewcommand", {
  handler: {macro: ["brutalMap"]},
  preprocessors: [
    [insertMacros, 1]
  ]
});

}) ();
