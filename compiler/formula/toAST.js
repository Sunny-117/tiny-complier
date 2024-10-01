
const ASTNode = require('./ASTNode');
let nodeTypes = require('./nodeTypes');
let tokenTypes = require('./tokenTypes');
function add(){
  add();
}
/**
这个是标准正常的文法法
这样表示的文法是转成的语法树是正确的
但是我们用递归下降算法实现这个文法的时候出现了左递归
additive : multiple|additive+multiple
multiple : NUMBER|multiple*NUMBER

 */
/**
为了解决左递归 的问题 把递归放在了右边,变成了右递归
2+3+4
additive -> multiple|multiple [+-] additive   包括+
multiple -> primary|primary [星/] multiple    包括星/
primary -> NUMBER | (additive) 基础规则
 */

/**
* 我用扩展的巴科范式一类表示文法
2+3+4 *正则表达式的语法表示0或多个
2+3+4+5
3*4*5

2+3+4*5*6

additive -> multiple (+ multiple)*
multiple -> number (* number)*
*/
function toAST(tokenReader){
  let rootNode = new ASTNode(nodeTypes.Program);
  //开始推导了 加法 乘法 先推导加法
  //实现的时候,每一个规则都是一个函数additive对应加法规则
  let child = additive(tokenReader);
  if(child)
    rootNode.appendChild(child);
  return rootNode;
}
//additive -> multiple (+ multiple)*
//2+3+4+5+6*7
function additive(tokenReader){
     let child1 = multiple(tokenReader);   //2
     let node = child1;//node 2
     if(child1 != null ){
       while(true){
        let token = tokenReader.peek();//看看一下符号是不是加号
        if(token!=null && (token.type === tokenTypes.PLUS||token.type === tokenTypes.MINUS)){//如果后面是加号的话
            token = tokenReader.read();//把+读出来并且消耗掉
            let child2 = multiple(tokenReader);//3
            node = new ASTNode(token.type === tokenTypes.PLUS?nodeTypes.Additive:nodeTypes.Minus);
            node.appendChild(child1);
            node.appendChild(child2);
            child1=node;
        }else{
          break;
        }
       }
     }
     return node;
}
//multiple -> NUMBER | NUMBER *  multiple
function multiple(tokenReader){
  let child1 = primary(tokenReader);   //2
  let node = child1;//node 2
  if(child1 != null ){
    while(true){
     let token = tokenReader.peek();//看看一下符号是不是加号
     if(token!=null &&(token.type === tokenTypes.MULTIPLY||token.type === tokenTypes.DIVIDE)){//如果后面是加号的话
         token = tokenReader.read();//把+读出来并且消耗掉
         let child2 = primary(tokenReader);//3
         node = new ASTNode(token.type === tokenTypes.MULTIPLY?nodeTypes.Multiplicative:nodeTypes.Divide);
         node.appendChild(child1);
         node.appendChild(child2);
         child1=node;
     }else{
       break;
     }
    }
  }
  return node;
}
//primary -> NUMBER | (additive) 基础规则
function primary(tokenReader){
  let node = number(tokenReader);
  if(!node){
    let token = tokenReader.peek();
    if(token != null && token.type === tokenTypes.LEFT_PARA){
      tokenReader.read();
      node = additive(tokenReader);
      tokenReader.read();
    }
  }
  return node;
}
function number(tokenReader){
    let node = null;
    let token = tokenReader.peek();//看看当前的这个token
    //如果能取出 token,并且token的类型是数字的话 匹配上了
    if(token != null && token.type === tokenTypes.NUMBER){
        token = tokenReader.read();//读取并消耗掉这个Token
        //创建一个新的语法树节点,类型是Numeric,值是2
        node = new ASTNode(nodeTypes.Numeric,token.value);
    }
    return node;
}

module.exports = toAST;