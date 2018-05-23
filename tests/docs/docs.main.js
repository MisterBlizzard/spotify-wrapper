// describe cria um bloco onde serão testados métodos de uma classe/função
// primeiro parâmetro é o nome da classe a ser testada, pois fica mais fácil de saber o que 
// está sendo testado
describe('Class Main', function() {
    describe('Method A', function() {
        context('Case 1', function() {
            // it() é para executar algo que a gente espera
            it('should happen something', function() {
                // se entrar um método soma(2, 2)
                // espera retornar um (4)
            });
        })
;
        // context.only('Case 2', function() { ////// método only serve para executar apenas um contexto
        context.only('Case 2', function() {
            //it.skip('should happen something', function() { ////// skip salta um teste
            it('should happen something', function() {
            });

            it('should happen otherthing', function() {
                throw new Error('any error');
            });

            it('should happen blabla', function() {
                throw new Error('any error');
            });
    
            it('should happen ...', function() {
            });
        });
    });

    let arr;
    
    // roda uma vez, antes do bloco
    before(function() {
        // nesse bloco daria para criar uma conexão ao banco de dados
        // pois ele executa antes de todo o bloco e apenas uma vez
    });

    // roda uma vez, depois do bloco
    after(function() {
        // aqui poderia encerrar a conexão ao banco, pois ele é executado 
        // apenas uma vez e depois de todo o código
    });

    // roda todas as vezes, antes de cada bloco
    beforeEach(function() {
        arr = [1, 2, 3];
    });

    // roda todas as vezes, depois de cada bloco
    afterEach(function() {
    });
    
    it('should have a size of 4 when push another value to the array', function() {
        arr.push(4);
        console.log(arr.length);
    });

    it('should have a size of 2 when pop a value from the array', function() {        
        arr.pop(4);
        console.log(arr.length);
    });

    it('should remove the value 3 when use pop in the array', function() {        
        console.log(arr.pop() === 3);
    });
});

// O bloco acima irá executar os HOOKS na sequência:

// before
// beforeEach
// teste 1
// afterEach
// beforeEach
// teste 2
// afterEach
// after