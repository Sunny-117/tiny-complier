
class ASTNode{
    constructor(type,value){
        this.type = type;//节点类型
        if(value) this.value = value;//节点的值
    }
    appendChild(childNode){
        if(!this.children)
            this.children=[];
        this.children.push(childNode);
    }
}
module.exports = ASTNode;