# tiny-complier

实现超级 mini 的编译器 | codegen&amp;compiler 生成代码 | 只需要 200 行代码 | 前端学习编译原理的最佳案例

https://github.com/jamiebuilds/the-super-tiny-compiler

https://github.com/cuixiaorui/the-tutorial-super-tiny-compiler


# 词法分析 tokenizer

tokens

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



# codegen&compiler 生成代码

# transform 转换 AST 

# traverser 遍历 AST