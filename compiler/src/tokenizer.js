const LETTERS = /[a-z0-9]/;
const tokenTypes = require('./tokenTypes');
let currentToken = {type:'',value:''};
let tokens = [];
function emit(token){//一旦发射了一个token之后,就可以清空currentToken,然后放入数组
    currentToken = {type:'',value:''};
    tokens.push(token);
}
function start(char){
    if(char === '<'){
        emit({type:tokenTypes.LeftParentheses,value:'<'});
        return foundLeftParentheses;//找到了<
    }
    throw new Error('第一个字符必须是<');
}
/* function eof(){
    if(currentToken.value.length>0)
        emit(currentToken);
} */
function foundLeftParentheses(char){//char=h1
    if(LETTERS.test(char)){//如果char是一个小写字母的话
        currentToken.type = tokenTypes.JSXIdentifier;
        currentToken.value += char;//h
        return jsxIdentifier;//继续收集标识符
    }else if(char === '/'){
        emit({type:tokenTypes.BackSlash,value:'/'});
        return foundLeftParentheses;
    }
    throw new Error('第一个字符必须是<');
}
function jsxIdentifier(char){
    if(LETTERS.test(char)){//如果是小写字母或者是数字的话
        currentToken.value+=char;
        return jsxIdentifier;
    }else if(char === ' '){//如果收集标识符的过程中遇到了空格了,说明标识符结束 
        emit(currentToken);
        return attribute;
    }else if(char == '>'){//说明此标签没有属性,直接结束了
        emit(currentToken);
        emit({type:tokenTypes.RightParentheses,value:'>'});
        return foundRightParentheses;
    }   
    throw new Error('第一个字符必须是<');
}
function attribute(char){//char=i
    if(LETTERS.test(char)){
        currentToken.type = tokenTypes.AttributeKey;//属性的key
        currentToken.value += char;//属性key的名字
        return attributeKey;
    }
    throw new TypeError('Error');
}
function attributeKey(char){
    if(LETTERS.test(char)){//d
        currentToken.value += char;
        return attributeKey;
    }else if(char === '='){//说明属性的key的名字已经结束了
        emit(currentToken);// { type: 'JSXIdentifier', value: 'h1' },
        return attributeValue;
    }
    throw new TypeError('Error');
}
function attributeValue(char){//char="
    if(char === '"'){
        currentToken.type = tokenTypes.AttributeStringValue;
        currentToken.value = '';
        return attributeStringValue;//开始读字符串属性值
    }
    throw new TypeError('Error');
}

function attributeStringValue(char){//title
    if(LETTERS.test(char)){
        currentToken.value+=char;
        return attributeStringValue;
    }else if(char === '"'){//说明字符串的值结束了
        emit(currentToken);//{ type: 'AttributeStringValue', value: '"title"' },
        return tryLeaveAttribute;
    }
    throw new TypeError('Error');
}
//因为后面可以是一个新属性,也可以是开始标签的结束
function tryLeaveAttribute(char){
    if(char === ' '){
        return attribute;//如果后面是空格的话,说明后面是一个新的属性
    }else if(char === '>'){//说明开始标签结束了
        emit({type:tokenTypes.RightParentheses,value:'>'});
        return foundRightParentheses;
    }
    throw new TypeError('Error');
}
function foundRightParentheses(char){
    if(char === '<'){
        emit({type:tokenTypes.LeftParentheses,value:'<'});
        return foundLeftParentheses;//找到了<
    }else{
        currentToken.type = tokenTypes.JSXText;
        currentToken.value += char;
        return jsxText;
    }
}
function jsxText(char){
  if(char === '<'){
    emit(currentToken);//{ type: 'JSXText', value: 'hello' },
    emit({type:tokenTypes.LeftParentheses,value:'<'});
    return foundLeftParentheses;
  }else{
    currentToken.value += char;
    return jsxText;
  }
}
function tokenizer(input){
    let state = start;//刚开始处于开始状态
    for(let char of input){//遍历或者说循环所有的字符
        if(state) state = state(char);
    }
    return tokens;
}

/* let sourceCode = '<h1 id="title"><span>hello</span>world</h1>';
console.log(tokenizer(sourceCode));
 */
module.exports = {
    tokenizer
}
/**
[    <h1 id="title"><span>hello</span>world</h1>
    { type: 'LeftParentheses', value: '<' },
    { type: 'JSXIdentifier', value: 'h1' },
    { type: 'AttributeKey', value: 'id' },
    { type: 'AttributeStringValue', value: '"title"' },
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