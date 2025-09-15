import {
  variableExamples,
  functionExamples,
  arrayMethods,
  objectMethods,
  asyncExamples,
  es6Examples,
  errorHandling,
  closureExamples,
  prototypeExamples,
  regexExamples,
  allJavaScriptExamples
} from '@/utils/javascript-examples'

describe('JavaScript Examples', () => {
  describe('variableExamples', () => {
    it('contains expected examples', () => {
      expect(variableExamples).toHaveProperty('stringExample')
      expect(variableExamples).toHaveProperty('numberExample')
      expect(variableExamples).toHaveProperty('booleanExample')
      expect(variableExamples).toHaveProperty('varExample')
      expect(variableExamples).toHaveProperty('letExample')
      expect(variableExamples).toHaveProperty('constExample')
    })

    it('has correct data types', () => {
      expect(typeof variableExamples.stringExample).toBe('string')
      expect(typeof variableExamples.numberExample).toBe('number')
      expect(typeof variableExamples.booleanExample).toBe('boolean')
      expect(typeof variableExamples.varExample).toBe('function')
      expect(typeof variableExamples.letExample).toBe('function')
      expect(typeof variableExamples.constExample).toBe('function')
    })

    it('function examples are callable', () => {
      expect(() => variableExamples.varExample()).not.toThrow()
      expect(() => variableExamples.letExample()).not.toThrow()
      expect(() => variableExamples.constExample()).not.toThrow()
    })
  })

  describe('functionExamples', () => {
    it('contains function examples', () => {
      expect(functionExamples).toHaveProperty('functionDeclaration')
      expect(functionExamples).toHaveProperty('functionExpression')
      expect(functionExamples).toHaveProperty('arrowFunction')
      expect(functionExamples).toHaveProperty('higherOrderFunction')
    })

    it('functions are callable', () => {
      expect(typeof functionExamples.functionDeclaration).toBe('function')
      expect(typeof functionExamples.functionExpression).toBe('function')
      expect(typeof functionExamples.arrowFunction).toBe('function')
      expect(typeof functionExamples.higherOrderFunction).toBe('function')
    })

    it('functions work correctly', () => {
      expect(functionExamples.functionDeclaration(2, 3)).toBe(5)
      expect(functionExamples.functionExpression(4, 5)).toBe(9)
      expect(functionExamples.arrowFunction(1, 2)).toBe(3)
      expect(typeof functionExamples.higherOrderFunction()).toBe('function')
    })
  })

  describe('arrayMethods', () => {
    it('contains array method examples', () => {
      expect(arrayMethods).toHaveProperty('mapExample')
      expect(arrayMethods).toHaveProperty('filterExample')
      expect(arrayMethods).toHaveProperty('reduceExample')
      expect(arrayMethods).toHaveProperty('sourceArray')
    })

    it('array methods work correctly', () => {
      expect(typeof arrayMethods.mapExample).toBe('function')
      expect(typeof arrayMethods.filterExample).toBe('function')
      expect(typeof arrayMethods.reduceExample).toBe('function')
      expect(Array.isArray(arrayMethods.sourceArray)).toBe(true)
    })

    it('array methods return expected results', () => {
      const mapResult = (arrayMethods.mapExample as () => number[])()
      expect(Array.isArray(mapResult)).toBe(true)
      expect(mapResult.length).toBeGreaterThan(0)

      const filterResult = (arrayMethods.filterExample as () => number[])()
      expect(Array.isArray(filterResult)).toBe(true)

      const reduceResult = (arrayMethods.reduceExample as () => number)()
      expect(typeof reduceResult).toBe('number')
    })
  })

  describe('objectMethods', () => {
    it('contains object method examples', () => {
      expect(objectMethods).toHaveProperty('getKeys')
      expect(objectMethods).toHaveProperty('getValues')
      expect(objectMethods).toHaveProperty('getEntries')
      expect(objectMethods).toHaveProperty('sampleObject')
    })

    it('object methods work correctly', () => {
      expect(typeof objectMethods.getKeys).toBe('function')
      expect(typeof objectMethods.getValues).toBe('function')
      expect(typeof objectMethods.getEntries).toBe('function')
      expect(typeof objectMethods.sampleObject).toBe('object')
    })

    it('object methods return correct types', () => {
      const keysResult = (objectMethods.getKeys as () => string[])()
      expect(Array.isArray(keysResult)).toBe(true)

      const valuesResult = (objectMethods.getValues as () => unknown[])()
      expect(Array.isArray(valuesResult)).toBe(true)

      const entriesResult = (objectMethods.getEntries as () => [string, unknown][])()
      expect(Array.isArray(entriesResult)).toBe(true)
    })
  })

  describe('asyncExamples', () => {
    it('contains async examples', () => {
      expect(asyncExamples).toHaveProperty('createPromise')
      expect(asyncExamples).toHaveProperty('asyncFunction')
      expect(asyncExamples).toHaveProperty('promiseAll')
    })

    it('async functions work correctly', () => {
      expect(typeof asyncExamples.createPromise).toBe('function')
      expect(typeof asyncExamples.asyncFunction).toBe('function')
      expect(typeof asyncExamples.promiseAll).toBe('function')
    })

    it('async functions return promises or appropriate values', async () => {
      const promiseResult = (asyncExamples.createPromise as () => Promise<string>)()
      expect(promiseResult instanceof Promise).toBe(true)

      const resolved = await promiseResult
      expect(typeof resolved).toBe('string')
    })
  })

  describe('es6Examples', () => {
    it('contains ES6 feature examples', () => {
      expect(es6Examples).toHaveProperty('objectDestructuring')
      expect(es6Examples).toHaveProperty('arrayDestructuring')
      expect(es6Examples).toHaveProperty('templateLiterals')
      expect(es6Examples).toHaveProperty('spreadArray')
    })

    it('ES6 functions work correctly', () => {
      expect(typeof es6Examples.objectDestructuring).toBe('function')
      expect(typeof es6Examples.templateLiterals).toBe('function')
      expect(typeof es6Examples.spreadArray).toBe('function')
    })

    it('ES6 features return expected results', () => {
      const destructResult = (es6Examples.objectDestructuring as () => unknown)()
      expect(destructResult).toBeDefined()

      const templateResult = (es6Examples.templateLiterals as () => string)()
      expect(typeof templateResult).toBe('string')

      const spreadResult = (es6Examples.spreadArray as () => number[])()
      expect(Array.isArray(spreadResult)).toBe(true)
    })
  })

  describe('errorHandling', () => {
    it('contains error handling examples', () => {
      expect(errorHandling).toHaveProperty('tryCatch')
      expect(errorHandling).toHaveProperty('throwError')
      expect(errorHandling).toHaveProperty('customError')
    })

    it('error handling functions work correctly', () => {
      expect(typeof errorHandling.tryCatch).toBe('function')
      expect(typeof errorHandling.throwError).toBe('function')
      expect(typeof errorHandling.customError).toBe('function')
    })

    it('error handling demonstrates proper error handling', () => {
      const tryCatchResult = (errorHandling.tryCatch as () => string)()
      expect(typeof tryCatchResult).toBe('string')

      expect(() => (errorHandling.throwError as () => void)()).toThrow()
    })
  })

  describe('prototypeExamples', () => {
    it('contains prototype examples', () => {
      expect(prototypeExamples).toHaveProperty('PersonConstructor')
      expect(prototypeExamples).toHaveProperty('PersonClass')
      expect(prototypeExamples).toHaveProperty('addMethodToPrototype')
    })

    it('prototype examples work correctly', () => {
      expect(typeof prototypeExamples.PersonConstructor).toBe('function')
      expect(typeof prototypeExamples.PersonClass).toBe('function')
      expect(typeof prototypeExamples.addMethodToPrototype).toBe('function')
    })
  })

  describe('regexExamples', () => {
    it('contains regex examples', () => {
      expect(regexExamples).toBeDefined()
      expect(typeof regexExamples).toBe('object')
    })

    it('regex examples have expected structure', () => {
      // Check that it's not null and has some properties
      expect(regexExamples).not.toBeNull()
      expect(Object.keys(regexExamples).length).toBeGreaterThan(0)
    })
  })

  describe('allJavaScriptExamples', () => {
    it('aggregates all examples', () => {
      expect(allJavaScriptExamples).toBeDefined()
      expect(typeof allJavaScriptExamples).toBe('object')
    })

    it('contains references to other example groups', () => {
      expect(allJavaScriptExamples).toHaveProperty('variables')
      expect(allJavaScriptExamples).toHaveProperty('functions')
      expect(allJavaScriptExamples).toHaveProperty('arrays')
      expect(allJavaScriptExamples).toHaveProperty('objects')
    })
  })

  describe('General Structure Tests', () => {
    it('all exported examples are defined', () => {
      expect(variableExamples).toBeDefined()
      expect(functionExamples).toBeDefined()
      expect(arrayMethods).toBeDefined()
      expect(objectMethods).toBeDefined()
      expect(asyncExamples).toBeDefined()
      expect(es6Examples).toBeDefined()
      expect(errorHandling).toBeDefined()
      expect(prototypeExamples).toBeDefined()
      expect(regexExamples).toBeDefined()
      expect(allJavaScriptExamples).toBeDefined()
    })

    it('all exported examples are objects', () => {
      expect(typeof variableExamples).toBe('object')
      expect(typeof functionExamples).toBe('object')
      expect(typeof arrayMethods).toBe('object')
      expect(typeof objectMethods).toBe('object')
      expect(typeof asyncExamples).toBe('object')
      expect(typeof es6Examples).toBe('object')
      expect(typeof errorHandling).toBe('object')
      expect(typeof prototypeExamples).toBe('object')
      expect(typeof regexExamples).toBe('object')
      expect(typeof allJavaScriptExamples).toBe('object')
    })

    it('example objects are not empty', () => {
      expect(Object.keys(variableExamples).length).toBeGreaterThan(0)
      expect(Object.keys(functionExamples).length).toBeGreaterThan(0)
      expect(Object.keys(arrayMethods).length).toBeGreaterThan(0)
      expect(Object.keys(objectMethods).length).toBeGreaterThan(0)
      expect(Object.keys(asyncExamples).length).toBeGreaterThan(0)
      expect(Object.keys(es6Examples).length).toBeGreaterThan(0)
      expect(Object.keys(errorHandling).length).toBeGreaterThan(0)
      expect(Object.keys(prototypeExamples).length).toBeGreaterThan(0)
    })
  })

  describe('Function Execution Tests', () => {
    it('callable functions do not throw errors', () => {
      // Test some key functions to make sure they execute without errors
      expect(() => (variableExamples.constExample as () => number)()).not.toThrow()
      expect(() => (es6Examples.templateLiterals as () => string)()).not.toThrow()
      expect(() => (arrayMethods.mapExample as () => number[])()).not.toThrow()
      expect(() => (objectMethods.getKeys as () => string[])()).not.toThrow()
    })

    it('functions return expected data types', () => {
      const constResult = (variableExamples.constExample as () => number)()
      expect(typeof constResult).toBe('number')

      const templateResult = (es6Examples.templateLiterals as () => string)()
      expect(typeof templateResult).toBe('string')

      const mapResult = (arrayMethods.mapExample as () => number[])()
      expect(Array.isArray(mapResult)).toBe(true)

      const keysResult = (objectMethods.getKeys as () => string[])()
      expect(Array.isArray(keysResult)).toBe(true)
    })
  })
})