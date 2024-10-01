/**
 * 分词
 * 状态机
 */
let NUMBERS= /[0-9]/;
const Numeric = 'Numeric';
const Punctuator = 'Punctuator';
let tokens = [];
/**
 * start表示开始状态函数
 * 它是一函数,接收一个字符,返回下一个状态函数
 */
let currentToken;
//确定一个新的token.
function emit(token){
    currentToken={type:'',value:''};
    tokens.push(token);
}
function start(char){//char=1
    if(NUMBERS.test(char)){//如果这个char是一个数字的话
        currentToken={type:Numeric,value:''};
         //进入新的状态了,什么状态?就是收集或者是捕获number数字的状态
        return number(char);
    }
    throw new TypeError('首字符必须是数字');
}
function number(char){
    if(NUMBERS.test(char)){//如果这个char是一个数字的话
        currentToken.value+=char;
        return number;
    }else if(char === '+'||char === '-'){
        emit(currentToken);
        emit({type:Punctuator,value:char});
        currentToken={type:Numeric,value:''};
        return number;
    }
}
function tokenizer(input){
    //刚开始的时候是start的状态
    let state = start;
    for(let char of input){
        state = state(char);
    }
    if(currentToken.value.length>0)
        emit(currentToken);
}
tokenizer("10+20+30-40");
// 10 + 20 + 30 - 10
console.log(tokens);

/**
[
    { type: 'Numeric', value: '10' },
    { type: 'Punctuator', value: '+' },
    { type: 'Numeric', value: '20' }
  ]
 */