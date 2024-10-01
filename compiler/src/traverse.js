const {parser} = require('./parser');
const nodeTypes = require('./nodeTypes');
function replace(parent,oldNode,newNode){
  if(parent){
    for(const key in parent){
        if(parent.hasOwnProperty(key)){
            if(parent[key] === oldNode){
                parent[key]=newNode;
            }
        }
    }
  }
}
function traverse(ast,visitor){
    function traverseArray(array,parent){
        array.forEach(child=>traverseNode(child,parent));
    }
    //使用遍历 转换 都是使用 babel的方式
    function traverseNode(node,parent){
        //bind把一个老函数进行绑定得到新函数,绑定1this指针 第2个参数是第一个参数 第3个参数是方法执行的第二2个参数
        let replaceWith = replace.bind(null,parent,node);
        let method = visitor[node.type];
          //当开始准备遍历子节点的时候执行进入方法
        if(method){
            if(typeof method === 'function')
              method({node,replaceWith},parent);
            else
              if(typeof  method.enter === 'function')
                method.enter({node,replaceWith},parent);   
        }
        switch(node.type){
            case nodeTypes.Program:
                traverseArray(node.body,node);
                break;
            case nodeTypes.ExpressionStatement:
                traverseNode(node.expression,node); 
                break;   
            case nodeTypes.JSXElement:
                traverseNode(node.openingElement,node);
                traverseArray(node.children,node);
                traverseNode(node.closingElement,node); 
                break;   
            case nodeTypes.openingElement:
                traverseNode(node.name,node);
                traverseArray(node.attributes,node);
                break;
            case nodeTypes.JSXAttribute:
                traverseNode(node.name,node);
                traverseNode(node.value,node);
                break;  
            case nodeTypes.closingElement:
                traverseNode(node.name,node);
                break;  
            case nodeTypes.JSXIdentifier:
            case nodeTypes.JSXText:
            case nodeTypes.Literal:
               break;  
            default:
                break;      
        }
        //当遍历完子节点离开此节点的时候要执行离开方法
        if(method && method.exit){
            method.exit({node,replaceWith},parent);
        }
    }
    traverseNode(ast,null);
}

module.exports = {traverse}
/* 
let sourceCode = '<h1 id="title"><span>hello</span>world</h1>';
let ast = parser(sourceCode);
traverse(ast,{
    JSXOpeningElement:{
        enter:(nodePath,parent)=>{
            console.log(`进入开始元素`,nodePath.node);
        },
        exit:(nodePath,parent)=>{
            console.log(`离开开始元素`,nodePath.node);
        }
    },
    JSXClosingElement(nodePath,parent){
        console.log(`进入结束元素`,nodePath.node);
    }
}); */