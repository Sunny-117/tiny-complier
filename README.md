# tiny-complier

实现超级 mini 的编译器 | codegen&amp;compiler 生成代码 | 只需要 200 行代码 | 前端学习编译原理的最佳案例

https://github.com/jamiebuilds/the-super-tiny-compiler

https://github.com/cuixiaorui/the-tutorial-super-tiny-compiler


# 词法分析 tokenizer
```ts
export enum TokenTypes {
    Paren,
    Name,
    Number
}
interface Token {
    type: TokenTypes;
    value: string;

}
export function tokenizer(code: string) {
    const tokens: Token[] = []
    let current = 0;
    while (current < code.length) {
        let char = code[current];
        const WHITESPACE = /\s/
        if (WHITESPACE.test(char)) {
            current++
            continue
        }
        if (char === '(') {
            tokens.push({
                type: TokenTypes.Paren,
                value: char
            })
            current++
            continue
        }
        if (char === ')') {
            tokens.push({
                type: TokenTypes.Paren,
                value: char
            })
            current++
            continue
        }
        const LETTERS = /[a-z]/i
        if (LETTERS.test(char)) {
            let value = ''
            while (LETTERS.test(char) && current < code.length) {
                value += char
                char = code[++current];
            }
            tokens.push({
                type: TokenTypes.Name,
                value
            })
        }
        const NUMBERS = /[0-9]/
        if (NUMBERS.test(char)) {
            let value = ''
            while (NUMBERS.test(char) && current < code.length) {
                value += char
                char = code[++current];
            }
            tokens.push({
                type: TokenTypes.Number,
                value
            })
        }
    }
    return tokens
}   
```


# 语法分析 parser


# codegen&compiler 生成代码

# transform 转换 AST 

# traverser 遍历 AST