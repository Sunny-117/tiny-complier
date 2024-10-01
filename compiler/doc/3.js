let script = '2+3';
let tokens = ['2','+','3'];
function number(){
    tokens.shift();
}
/* function additive(){
    additive();
    number();
} */
// additive -> number | number+additive
function additive(){
    if(tokens.length>0){
        number();//2
        additive();
    }
}

/**
 只支持加法 
 这样会出现左递归
 additive -> additive | additive+number
*/