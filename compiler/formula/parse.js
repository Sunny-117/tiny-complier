let tokenize = require('./tokenize');
let toAST = require('./toAST');
/**
 * 可以把一段代码转成一个抽象语法树
 */
function parse(script){
    //把代码进行分词处理
    let tokenReader = tokenize(script);
    console.log(tokenReader);
    let ast = toAST(tokenReader);
    return ast;
}

module.exports = parse;
