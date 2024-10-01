let parse = require('./parse');
let evaluate = require('./evaluate');
let sourceCode = '1+-2+-3';//6 2
let ast = parse(sourceCode);
console.log(JSON.stringify(ast,null,2));
let result = evaluate(ast);
console.log(result);//14

//同时解决结合性和左递归的问题需要新的方法?
