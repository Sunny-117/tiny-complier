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
            current++
            continue
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
            current++
            continue
        }
    }
    return tokens
}   