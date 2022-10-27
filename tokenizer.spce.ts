import { test, expect } from 'vitest'
test('tokenizer', () => {
    const code = `(add 2 (subtract 4 2))`
    const tokens = [
        { type: 'paren', value: '(' },
        { type: 'name', value: 'add' },
        { type: 'number', value: '2' },
        { type: 'paren', value: '(' },
        { type: 'name', value: 'subtract' },
        { type: 'number', value: '4' },
        { type: 'number', value: '2' },
        { type: 'paren', value: ')' },
        { type: 'paren', value: ')' },
    ]
    expect(tokenizer(code)).toEqual(tokens)
})