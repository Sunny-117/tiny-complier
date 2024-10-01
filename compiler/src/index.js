
const {parser} = require('./parser');
const {transformer} = require('./transformer');
const {codeGenerator} = require('./codeGenerator');
let code = '<h1 id="title"><span>hello</span>world</h1>';
let ast = parser(code);//把源代码转成语法树
transformer(ast);//把语法树转成新的语法树
let result = codeGenerator(ast);
console.log(result);


