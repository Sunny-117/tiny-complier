interface Token {
    type: string;
    value: string;

}


export function tokenizer(code: string) {
    const tokens: Token[] = []
    let current = 0;
    let char = code[current];
    if (char === '(') {
        tokens.push({
            type: 'paren',
            value: char
        })
    }
    return tokens
}   