import { ChildNode, NodeTypes, RootNode, CallExpressionNode } from "./ast";

type ParentNode = RootNode | CallExpressionNode | undefined;
type MethodFn = (node: RootNode | ChildNode, parent: ParentNode) => void;
interface VisitorOption {
  enter: MethodFn;
  exit?: MethodFn;
}
export interface Visitor {
  Program?: VisitorOption;
  NumberLiteral?: VisitorOption;
  CallExpression?: VisitorOption;
  StringLiteral?: VisitorOption;
}

export function traverser(rootNode: RootNode, visitor: Visitor) {
  // 遍历树 深度优先搜索
  function traverArray(array: ChildNode[], parent: ParentNode) {
    array.forEach((node) => {
      traverNode(node, parent);
    });
  }

  function traverNode(node: RootNode | ChildNode, parent?: ParentNode) {
    // enter
    const methods = visitor[node.type];
    if (methods) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case NodeTypes.Program:// 根结点
        traverArray(node.body, node);
        break;
      case NodeTypes.CallExpression://表达式
        traverArray(node.params, node);
        break;
      case NodeTypes.NumberLiteral:// 叶子结点
        break;
      default:
        break;
    }

    // exit
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }
  traverNode(rootNode);
}
