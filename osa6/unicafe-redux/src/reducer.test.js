import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('resetting turns all to zero', () => {
    const action = {
      type: 'ZERO'
    }
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })

  test('multiple operations work', () => {
    const goodAction = {
      type: 'GOOD'
    }
    const badAction = {
      type: 'BAD'
    }
    const reset = {
      type: 'ZERO'
    }
    const state = initialState
    deepFreeze(state)
    const goodState = counterReducer(state, goodAction)
    const badState = counterReducer(goodState, badAction)
    expect(badState).toEqual({
      good: 1,
      ok: 0,
      bad: 1
    })
    const resetState = counterReducer(badState, reset)
    expect(resetState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })

  })

})