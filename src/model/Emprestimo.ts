import { DatabaseModel } from "./DatebaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um empréstimo
 */

export class Emprestimo {

    /* Atributos */
    /* Id do emprestimo */
    private idEmprestimo: number = 0;
    /* Id do aluno */
    private idAluno: number = 0;
    /* Id do livro */
    private idLivro: number = 0;
    /* Data de emprestimo do livro */
    private dataEmprestimo: Date;
    /* Data de devolução do livro */
    private dataDevolucao: Date;
    /* Status do empréstimo do livro */
    private statusEmprestimo: Date;

    /**
     * Construtor da classe emprestimo
     * 
     * @param idAluno Id do aluno
     * @param idLivro Id do livro
     * @param dataEmprestimo Data do emprestimo
     * @param dataDevolucao Data de devolução do emprestimo
     * @param statusEmprestimo Status do emprestimo  
     */

    constructor(
        idAluno: number,
        idLivro: number,
        dataEmprestimo: Date,
        dataDevolucao: Date,
        statusEmprestimo: Date
    ){
        this.idAluno = idAluno;
        this.idLivro = idLivro;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.statusEmprestimo = statusEmprestimo;
    }

    /* Método get e set */
    /**
     * Recupera o id do emprestimo
     * @returns o id do emprestimo
     */
    public getIdEmprestimo():number{
        return this.idEmprestimo;
    }

    /**
     * Atribui um valor ao id do emprestimo
     * @param idEmprestimo novo emprestimo a ser identificado
     */
    public setIdEmprestimo (idEmprestimo: number): void{
        this.idEmprestimo;
    }

    /**
     * Retorna o id do Aluno
     * @returns {number} O id do Aluno 
     */
    public getIdAluno(): number{
        return this.idAluno;
    }

    /** 
     * Define o id do Aluno 
     * @param idAluno O id do Aluno a ser definido
     */
    public setIdAluno (idAluno:number): void{
        this.idAluno = idAluno;
    }

    /**
     * Retorna o id do Livro 
     * @returns {number} O id do Livro 
     */
    public getIdLivro():number{
        return this.idLivro;
    }

    /**
     * Define o id do Livro 
     * @param idLivro O id do Livro a ser definido
     */
    public setIdLivro(idLivro:number): void{
        this.idLivro = idLivro;
    }

    /**
     * Retorna a data do emprestimo
     * @returns {Date} A data do emprestimo
     */
    public getDataEmprestimo(): Date{
        return this.dataEmprestimo;
    }

    /**
     * Define a data do emprestimo
     * @param dataEmprestimo A data do emprestimo a ser definido
     */
    public setDataEmprestimo(dataEmprestimo:Date): void{
        this.dataEmprestimo = dataEmprestimo;
    }

    /**
     * Retorna a data de devolucao do emprestimo
     * @returns {Date} A data de devolucao do emprestimo
     */
    public getDataDevolucao(): Date{
        return this.dataDevolucao;
    }

    /**
     * Define a data de devolucao do emprestimo
     * @param dataDevolucao A data de devolucao do emprestimo a ser definida
     */
    public setDataDevolucao(dataDevolucao: Date): void{
        this.dataDevolucao = dataDevolucao;
    }

    /**
     * Retorna a status do emprestimo
     * @returns {Date} A status do emprestimo
     */
    public getStatusEmprestimo(): Date{
        return this.statusEmprestimo;
    }

    /**
     * Define a status do emprestimo
     * @param statusEmprestimo A status do emprestimo a ser definido
     */
    public setStatusEmprestimo(statusEmprestimo:Date): void{
        this.statusEmprestimo = statusEmprestimo;
    }

*/*
    * @returns {Promise<Array<Aluno> | null>} Retorna uma lista de objetos `emprestimo` 
    * em caso de sucesso, ou `null` em caso de erro.
    */
    static async listarEmprestimo(): Promise<Array<Emprestimo> | null> {
        //criando lista vazia para armazenar os alunos
        let listaDeEmprestimo: Array<Emprestimo> = [];

        try {
            //QUERY PARA CONSULTA NO BANCO DE DADOS
            const querySelectEmprestimo = `SELECT * FROM Emprestimo;`;

            //EXECUTA A QUERY NO BANCO DE DADOS
            const respostaBD = await database.query(querySelectEmprestimo);

            //PERCORRE CADA RESULTADO RETORNADO PELO BANCO DE DADOS
            //CARRO É O APELIDO QUE DEMOS PARA CADA LINHA RETPRNADO DO BANCO DE DADOS

            //CRIANDO OBJETO ALUNO
            respostaBD.rows.forEach((emprestimo) => {
                let novaEmprestimo = new emprestimo(
                    emprestimo.idAluno,
                    emprestimo.idLivro,
                    emprestimo.dataEmprestimo,
                    emprestimo.dataDevolucao,
                    emprestimo.statusEmprestimo,
    
                );
                // adicionando o ID ao objeto
                novaEmprestimo.setIdAluno(emprestimo.id_aluno);

                //adicionando o aluno na lista
                listaDeEmprestimo.push(novaEmprestimo);
            });

            return listaDeEmprestimo;

        } catch (error) {
            console.log(`Erro ao acessar o idLivro : ${error}`);
            return null;
        }
    }

     /**
     
     * 
     * @param {Emprestimo} emprestimo .
     * @returns {Promise<boolean>} 
     * @throws {Error} - Se ocorrer algum erro durante a execução do cadastro, uma mensagem de erro é exibida
     *                   no console junto com os detalhes do erro.
     */
     static async cadastroEmprestimo(emprestimo: Emprestimo): Promise<boolean> {
        try {
            // query para fazer insert de um carro no banco de dados
            const queryInsertEmprestimo = `INSERT INTO emprestimo (idAluno, idLivro, dataEmprestimo,dataDevolucao, statusEmprestimo)
                                        VALUES
                                        ('${emprestimo.getIdAluno()}', 
                                        '${emprestimo.getIdLivro()}', 
                                        ${emprestimo.getDataEmprestimo()}, 
                                        '${emprestimo.getDataDevolucao()}')
                                        RETURNING id_aluno;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertEmprestimo);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Emprestimo cadastrado com sucesso! ID do Aluno: ${respostaBD.rows[0].id_aluno}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o emprestimo. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }
}
