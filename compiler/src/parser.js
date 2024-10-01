const {tokenizer} = require('./tokenizer');//标识符token
const tokenTypes = require('./tokenTypes');//token类型
const nodeTypes = require('./nodeTypes');//ast节点的类型
/**
<h1 id="title"><span>hello</span>world</h1>
01  2    3
jsxElement => <JSXIdentifier attribute*>child*</JSXIdentifier>
attribute => AttributeKey="AttributeStringValue"
child => jsxElement|JSXText 
*/
function parser(sourceCode){
    let tokens = tokenizer(sourceCode);//tokens数组
    let pos = 0;//当前的token的索引0
    function walk(parent){
        let token = tokens[pos];//取出当前的token peek
        let nextToken = tokens[pos+1];//取出下一个token peek下一个
        //jsxElement语法规则
        if(token.type === tokenTypes.LeftParentheses//当前是<,下一个token标识符,说是它就是一个JSX元素的开始
            &&nextToken.type === tokenTypes.JSXIdentifier){
           let node = {
               type:nodeTypes.JSXElement,
               openingElement:null,
               closingElement:null,
               children:[]
           }
           //第一步给开始元素赋值
           token = tokens[++pos];//h1
           node.openingElement={
               type:nodeTypes.JSXOpeningElement,
               name:{
                   type:nodeTypes.JSXIdentifier,
                   name:token.value //h1
               },
               attributes:[]
           }
           token = tokens[++pos];// AttributeKey=id
           //循环给属性数组赋值
           while(token.type === tokenTypes.AttributeKey){
             node.openingElement.attributes.push(walk());
             token = tokens[pos];
           }
           //pos指向谁 <h1 id="title"><span>hello</span>world</h1>
           token = tokens[++pos];//直接把>跳过去了直接取<
           nextToken = tokens[pos+1];
           //child => JSXText|jsxElement
           while(token.type != tokenTypes.LeftParentheses //对应的文本类型的子节点
            //对应的元素类型的子节点 子元素的开始位置
            ||(token.type === tokenTypes.LeftParentheses && nextToken.type !== tokenTypes.BackSlash)
            ){
                node.children.push(walk());
                token = tokens[pos];
                nextToken = tokens[pos+1];
           }
           node.closingElement = walk(node);
           return node;
           //while结束之后
        //attribute规则
        }else if(token.type === tokenTypes.AttributeKey){
            let nextToken = tokens[++pos];//value
            let node = {
                type:nodeTypes.JSXAttribute,
                name:{
                    type:nodeTypes.JSXIdentifier,
                    name:token.value //id
                },
                value:{
                    type:nodeTypes.Literal,
                    value:nextToken.value
                }
            }
            pos++;
            return node;
        }else if(token.type === tokenTypes.JSXText){//JSXText
            pos++;
            return {
                type:nodeTypes.JSXText,
                value:token.value
            }
        //处理结束标签
        }else if(parent
            && token.type === tokenTypes.LeftParentheses//<
            && nextToken.type === tokenTypes.BackSlash// /
            ){ //pos指向谁 <h1 id="title"><span>hello</span>world</h1>
                pos++;// 跳过< 
                pos++;// 跳过/
                token = tokens[pos];//span h1
                pos++;// 跳过span
                pos++;// 跳过>
                if(parent.openingElement.name.name !== token.value){
                    throw new TypeError(`开始标签[${parent.openingElement.name.name}]和结束标签[${token.value}]不匹配`);
                }
                return {
                  type:nodeTypes.JSXClosingElement,
                  name:{
                      type:nodeTypes.JSXIdentifier,
                      name:token.value
                  }
                }
        }
        throw new TypeError('不可能走到这');
    }
    let ast = {
        type:nodeTypes.Program,
        body:[
            {
                type:nodeTypes.ExpressionStatement,
                expression:walk()
            }
        ]
    }
    return ast;
}

module.exports ={
    parser
}

/* let sourceCode = '<h1 id="title" name="Sunny-117"><span>hello</span>world</h1>';
console.log(JSON.stringify(parser(sourceCode),null,2)); */
/**

[
  { type: 'LeftParentheses', value: '<' },
  { type: 'JSXIdentifier', value: 'h1' },
  { type: 'AttributeKey', value: 'id' },
  { type: 'AttributeStringValue', value: 'title' },
  { type: 'AttributeKey', value: 'name' },
  { type: 'AttributeStringValue', value: 'Sunny-117' },
  { type: 'RightParentheses', value: '>' },
  { type: 'LeftParentheses', value: '<' },
  { type: 'JSXIdentifier', value: 'span' },
  { type: 'RightParentheses', value: '>' },
  { type: 'JSXText', value: 'hello' },
  { type: 'LeftParentheses', value: '<' },
  { type: 'BackSlash', value: '/' },
  { type: 'JSXIdentifier', value: 'span' },
  { type: 'RightParentheses', value: '>' },
  { type: 'JSXText', value: 'world' },
  { type: 'LeftParentheses', value: '<' },
  { type: 'BackSlash', value: '/' },
  { type: 'JSXIdentifier', value: 'h1' },
  { type: 'RightParentheses', value: '>' }
]
 */