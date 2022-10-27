# tiny-complier










实现超级 mini 的编译器 | codegen&amp;compiler 生成代码 | 只需要 200 行代码 | 前端学习编译原理的最佳案例

https://github.com/jamiebuilds/the-super-tiny-compiler


# 词法分析 tokenizer


```ts
test('tokenizer', () => {
    const code = `(add 2 (subtract 4 2))`
    const tokens = [
        { type: TokenTypes.Paren, value: '(' },
        { type: TokenTypes.Name, value: 'add' },
        { type: TokenTypes.Number, value: '2' },
        { type: TokenTypes.Paren, value: '(' },
        { type: TokenTypes.Name, value: 'subtract' },
        { type: TokenTypes.Number, value: '4' },
        { type: TokenTypes.Number, value: '2' },
        { type: TokenTypes.Paren, value: ')' },
        { type: TokenTypes.Paren, value: ')' },
    ]
    expect(tokenizer(code)).toEqual(tokens)
})
```

# 语法分析 parser

```ts
 it("parser tokens to ast", () => {
    const tokens = [
      { type: TokenTypes.Paren, value: "(" },
      { type: TokenTypes.Name, value: "add" },
      { type: TokenTypes.Number, value: "2" },
      { type: TokenTypes.Paren, value: "(" },
      { type: TokenTypes.Name, value: "subtract" },
      { type: TokenTypes.Number, value: "4" },
      { type: TokenTypes.Number, value: "2" },
      { type: TokenTypes.Paren, value: ")" },
      { type: TokenTypes.Paren, value: ")" },
    ];
    const ast = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.CallExpression,
          name: "add",
          params: [
            {
              type: NodeTypes.NumberLiteral,
              value: "2",
            },
            {
              type: NodeTypes.CallExpression,
              name: "subtract",
              params: [
                {
                  type: NodeTypes.NumberLiteral,
                  value: "4",
                },
                {
                  type: NodeTypes.NumberLiteral,
                  value: "2",
                },
              ],
            },
          ],
        },
      ],
    };
    expect(parser(tokens)).toEqual(ast);
  });
```


# traverser 遍历 AST

![](./tree.png)
# transform 转换 AST 

https://astexplorer.net/

![image-20221027151215974](./ast.png)


父级不是表达式就会加一个`ExpressionStatement`
# codegen&compiler 生成代码

![](./map.png)



## 前端为什么要了解编译原理

当你做到高级前端的时候是经常需要和插件打交道的
而很多插件的实现原理都用到了 AST
比如 eslint、webpack、rollup 等等

拿一个大家熟悉的例子来讲  就是 vue 的template 
template 是如何编译成 render 函数的
这其中就需要用到编译原理的知识

当然 对于前端来讲也不需要用到多深层次的编译原理知识
通过这个库来了解一下是非常好的选择 让你对编译原理有一个认知

很多科班出身的同学可能在学校的时候也没有好好的学习编译原理
为什么 因为老师照本宣科 只给你讲理论的东西
而理论最前期个人认为是非常无聊的 都没有自己实现过 怎么能知道有什么样子的问题呢

所以一个最好的学习方式就是先实现一个非常简单的 然后从简入深
看得见摸得到的 demo 才能激发出兴趣来


# 其他

点阵转换：http://www.tianchawang.com/dzz/