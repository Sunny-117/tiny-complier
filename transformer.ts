import { NodeTypes, RootNode } from "./ast";
import { traverser } from "./traverser";
export function transformer(ast: RootNode) {
  const newAst = {
    type: NodeTypes.Program,
    body: [],
  };

  ast.context = newAst.body;// 新的字段，不要修改原来的结构

  traverser(ast, {
    CallExpression: {
      enter(node, parent) {
        if (node.type === NodeTypes.CallExpression) {
          let expression: any = {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: node.name,
            },
            arguments: [],
          };

          node.context = expression.arguments;

          /**
           * 如果parent不是表达式，就加一个ExpressionStatement
           */
          if (parent?.type !== NodeTypes.CallExpression) {
            expression = {
              type: "ExpressionStatement",
              expression,
            };
          }

          parent?.context?.push(expression);
        }
      },
    },

    NumberLiteral: {
      enter(node, parent) {
        if (node.type === NodeTypes.NumberLiteral) {
          const numberNode: any = {
            type: "NumberLiteral",
            value: node.value,
          };

          parent?.context?.push(numberNode);
        }
      },
    },
  });

  return newAst;
}
