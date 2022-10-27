import { test, expect } from 'vitest'
import { tokenizer, TokenTypes } from './tokenizer'


test('left paren', () => {
    const code = `(`
    const tokens = [
        { type: TokenTypes.Paren, value: '(' },
    ]
    expect(tokenizer(code)).toEqual(tokens)
})
test('right paren', () => {
    const code = `)`
    const tokens = [
        { type: TokenTypes.Paren, value: ')' },
    ]
    expect(tokenizer(code)).toEqual(tokens)
})
test('add', () => {
    const code = `add`
    const tokens = [{ type: TokenTypes.Name, value: 'add' }]
    expect(tokenizer(code)).toEqual(tokens)
})

test('number', () => {
    const code = `22`
    const tokens = [{ type: TokenTypes.Number, value: '22' }]
    expect(tokenizer(code)).toEqual(tokens)
})

test('(add 1 2)', () => {
    const code = `(add 1 2)`
    const tokens = [
        { type: 'paren', value: '(' },
        { type: 'name', value: 'add' },
        { type: 'number', value: '1' },
        { type: 'number', value: '2' },
        { type: 'paren', value: ')' },
    ]
    expect(tokenizer(code)).toEqual(tokens)
})