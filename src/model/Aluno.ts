import { DatabaseModel } from "./DatebaseModel";

const database =  new DatabaseModel().pool;

/**
 * Classe que representa um carro.
 */
export class Aluno {

    /* Atributos */
    /* Id do aluno */
    private idAluno: number = 0;
    /* ra do aluno*/
    private ra: string ="";
    /* nome do aluno*/
    private nome: string;
    /* Sobrenome do aluno*/
    private sobrenome: string;
    /* Data de nascimento do aluno*/
    private dataNascimento: Date;
    /* Endereco do aluno*/
    private endereco: string;
    /*Email do aluno */
    private email: string;
    /*Celular do aluno*/
    private celular: string;

    /**
     * Construtor da classe Aluno
     * 
     * @param nome Nome do aluno
     * @param sobrenome Sobrenome do aluno
     * @param dataNascimento Data de nascimento do aluno
     * @param endereco Endereco do Aluno
     *  @param email Email do aluno
     *  @param celular Celular do aluno
     */
    constructor(
        nome: string,
        sobrenome: string,
        dataNascimento: Date,
        endereco: string,
        email:string,
        celular: string,
    ) {
        this.nome = nome;
        this.sobrenome= sobrenome;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.email = email;
        this.celular = celular;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do aluno
     * @returns o identificador do aluno
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Atribui um valor ao identificador do aluno
     * @param idAluno novo identificado do aluno
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno= idAluno;
    }

    /**
     * Retorna o nome do aluno.
     *
     * @returns {string} O nome do aluno.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do aluno
     * 
     * @param nome - O nome do aluno a ser definido.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o sobrenome do aluno.
     *
     * @returns {string} O sobrenome do aluno.
     */
    public getSobrenome(): string {
        return this.sobrenome;
    }

    /**
     * Define o sobrenome do aluno.
     *
     * @param sobrenome - O sobrenome do aluno.
     */
    public setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    /**
     * Retorna a data de nascimento do aluno.
     *
     * @returns A data de nascimento do aluno.
     */
    public getdataNascimento(): Date {
        return this.dataNascimento;
    }

    /**
     * Define a data de nascimento do aluno.
     * 
     * @param dataNascimento- A data a ser definida para o aluno.
     */
    public setdataNascimento(dataNascimento: Date): void {
        this.dataNascimento= dataNascimento;
    }

    /**
     * Retorna o endereco do aluno.
     *
     * @returns {string} O endereco do aluno.
     */
    public getEndereco(): string {
        return this.endereco;
    }

    /**
     * Define o endereco do aluno.
     * 
     * @param endereco- O endereco do aluno.
     */
    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

     /**
     * Retorna o email do aluno.
     *
     * @returns {string} O email do aluno.
     */
     public getEmail(): string {
        return this.email;
     }

    /**
    * Define o email do aluno.
    * 
    * @param email- O email do aluno.
    */
    public setEmail(email: string): void {
    this.email = email;
     }

     
     /**
     * Retorna o celular do aluno.
     *
     * @returns {string} O celular do aluno.
     */
    public getCelular(): string {
        return this.celular;
    }

    /**
     * Define o celular do aluno.
     * 
     * @param  celular- O celular do aluno.
     */
    public setCelular(celular: string): void {
        this.celular = celular;
    }








    //METODO PARA ACESSAR O BANCO DE DADOS
    //CRUD CREAT - READ - UPDATE - DELETE
    
    /**
    * Método estático responsável por listar todos os carros do banco de dados.
    * Este método faz uma consulta no banco de dados, cria objetos `Carro` para cada 
    * linha retornada e os adiciona a uma lista, que é retornada ao final.
    * 
    * @returns {Promise<Array<Aluno> | null>} Retorna uma lista de objetos `Carro` 
    * em caso de sucesso, ou `null` em caso de erro.
    */
    static async listarAlunos(): Promise<Array<Aluno> | null> {
        //criando lista vazia para armazenar os alunos
        let listaDeAlunos: Array<Aluno> = [];

        try {
            //QUERY PARA CONSULTA NO BANCO DE DADOS
            const querySelectAluno = `SELECT * FROM aluno;`;

            //EXECUTA A QUERY NO BANCO DE DADOS
            const respostaBD = await database.query(querySelectAluno);

            //PERCORRE CADA RESULTADO RETORNADO PELO BANCO DE DADOS
            //CARRO É O APELIDO QUE DEMOS PARA CADA LINHA RETPRNADO DO BANCO DE DADOS

            //CRIANDO OBJETO ALUNO
            respostaBD.rows.forEach((linha: { nome: string; sobrenome: string; dataNascimento: Date; endereco: string; email: string; celular: string; id_aluno: number; }) => {
                let novaAluno = new Aluno(
                    linha.nome,
                    linha.sobrenome,
                    linha.dataNascimento,
                    linha.endereco,
                    linha.email,
                    linha.celular
                );
                // adicionando o ID ao objeto
                novaAluno.setIdAluno(linha.id_aluno);

                //adicionando o aluno na lista
                listaDeAlunos.push(novaAluno);
            });

            return listaDeAlunos;

        } catch (error) {
            console.log(`Erro ao acessar o sobrenome : ${error}`);
            return null;
        }
    }

     /**
     
     * 
     * @param {Aluno} aluno 
     * @returns {Promise<boolean>}
     * 
     * @throws {Error} 
     */
     static async cadastroAluno(aluno: Aluno): Promise<boolean> {
        try {
            // query para fazer insert de um carro no banco de dados
            const queryInsertAluno = `INSERT INTO aluno (idAluno, nome, sobrenome,dataNascimento, endereco, email,celular)
                                        VALUES
                                        ('${aluno.getNome()}', 
                                        '${aluno.getSobrenome()}', 
                                        ${aluno.getdataNascimento()}, 
                                        '${aluno.getEndereco()}')
                                        '${aluno.getEmail()}')
                                        '${aluno.getCelular()}')
                                        RETURNING id_aluno;`;

            // executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertAluno);

            // verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Aluno cadastrado com sucesso! ID do carro: ${respostaBD.rows[0].id_aluno}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

            // tratando o erro
        } catch (error) {
            // imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o aluno. Verifique os logs para mais detalhes.');
            // imprime o erro no console
            console.log(error);
            // retorno um valor falso
            return false;
        }
    }


    static async removerAluno(idAluno: number): Promise<boolean> {
        try{
            const queryDeleteAluno = `DELETE FROM aluno WHERE id_aluno = ${idAluno}`;
            const respostaDB = await database.query(queryDeleteAluno);

            if(respostaDB.rowCount != 0){
                console.log(`Aluno removido com sucesso. ID removido: ${idAluno}`);
                return true;
            }
            return false;

        } catch (error) {
            console.log(`Erro ao remover aluno. Verifique os logs para mais detalhes.`);
            console.log(error);
            return false;
        }
    }

    static async atualizarAluno(aluno:Aluno): Promise<boolean> {
        try{
            const queryUpdateAluno = `UPDATE Aluno SET
                                      nome  = '${aluno.getNome()}',
                                      sobrenome = '${aluno.getSobrenome()}',
                                      dataNascimento = ${aluno.getdataNascimento()},
                                      endereco ='${aluno.getEndereco()}',
                                      email = '${aluno.getEmail}',
                                      celular = '${aluno.getCelular}'
                                      WHERE id_aluno = ${aluno.getIdAluno()};`;

            console.log(queryUpdateAluno);

          const respostaBD = await database.query(queryUpdateAluno);
          if(respostaBD.rowCount != 0){
            console.log(`Aluno atualizado com sucesso! ID:${aluno.getIdAluno()}`);
            return true;
          }             
          
          return false;
        } catch (error) {
            console.log(`Erro ao atualizar o aluno. Verifique os logs para mais detalhes.`);
            console.log(error);
            return false;
        }
    }



}