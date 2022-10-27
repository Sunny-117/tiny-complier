export enum TokenTypes {
    Paren,
    Name
}
interface Token {
    type: TokenTypes;
    value: string;

}
export function tokenizer(code: string) {
    const tokens: Token[] = []
    let current = 0;
    let char = code[current];
    if (char === '(') {
        tokens.push({
            type: TokenTypes.Paren,
            value: char
        })
    }
    const LETTERS = /[a-z]/i
    return tokens
}   