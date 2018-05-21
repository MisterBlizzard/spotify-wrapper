var expect = require('chai').expect

describe('Class Main', function() {
    let arr

    // roda todas as vezes, antes de cada bloco
    beforeEach(function() {
        arr = [1, 2, 3]
    })

    it('should be an array', function() {
        expect(arr).to.be.an('array')
    })
    
    it('should have a size of 4 when push another value to the array', function() {
        arr.push(4)
        expect(arr).to.have.lengthOf(4)
    })

    it('should have a size of 2 when pop a value from the array', function() {        
        arr.pop(4)
        console.log(arr.length)
    })

    it('should remove the last value of the array (3 in this case)', function() {        
        arr.pop()
        expect(arr).to.not.include(3)
    })    

    it('should have a size of 2 when pop a value of the array', function() {          
        arr.pop()
        expect(arr).to.have.lengthOf(2)
    })
})

// O bloco acima irá ser executado na sequência:

// before
// beforeEach
// teste 1
// afterEach
// beforeEach
// teste 2
// afterEach
// after