import { Request, Response } from "express";
import { Aluno } from "../model/Aluno";

interface AlunoDTO {
    nome: string,
    sobrenome: string,
    dataNascimento: Date,
    endereco: string,
    email: string,
    celular: string,
}

/**
 * Classe Controller para gerenciar as requisições relacionadas ao objeto Carro.
 * Esta classe herda da classe Carro e contém métodos responsáveis por lidar
 * com requisições HTTP.
 */
class AlunoController extends Aluno {

    /**
     * Método estático responsável por listar todos os carros.
     * Este método faz uma chamada assíncrona ao método `listarCarro` da classe Carro,
     * retornando uma lista de carros no formato JSON.
     *
     * @param {Request} req - O objeto da requisição HTTP.
     * @param {Response} res - O objeto da resposta HTTP.
     * 
     * @returns {Promise<void>} Retorna uma promessa que envia a lista de carros
     * ao cliente em caso de sucesso, ou uma mensagem de erro em caso de falha.
     */
    static async todos(req: Request, res: Response): Promise<any> {
        try {
            // Chama o método herdado de listar todos os carros
            const listaDeAlunos = await Aluno.listarAlunos();
            // Responde com o status 200 e a lista de alunos em formato JSON
            res.status(200).json(listaDeAlunos)
        } catch (error) {
            console.log(`Erro ao acessar método herdado ${error}`);
            // Exibe erro no console e responde com status 400 e uma mensagem de erro
            res.status(400).json("Erro ao recuperaras informações de alunos");
        }
    }

    /**
    * Método controller para cadastrar um novo aluno.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um carro no corpo da requisição
    * e tenta cadastrar este carro no banco de dados utilizando a função `cadastroCarro`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do carro no formato `CarroDTO`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
    */
    static async novo(req: Request, res: Response): Promise<Response> {
        try {
            // recuperando informações do corpo da requisição e colocando em um objeto da interface CarroDTO
            const alunoRecebido: AlunoDTO = req.body;

            // instanciando um objeto do tipo carro com as informações recebidas
            const novoAluno = new Aluno(alunoRecebido.nome,
                alunoRecebido.sobrenome,
                alunoRecebido.dataNascimento,
                alunoRecebido.endereco,
                alunoRecebido.email,
                alunoRecebido.celular);

            // Chama a função de cadastro passando o objeto como parâmetro
            const repostaClasse = await Aluno.cadastroAluno(novoAluno);

            // verifica a resposta da função
            if (repostaClasse) {
                // retornar uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Aluno cadastrado com sucesso!" });
            } else {
                // retorno uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastra o aluno. Entre em contato com o administrador do sistema." })
            }

        } catch (error) {
            // lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um aluno. ${error}`);

            // retorna uma mensagem de erro há quem chamou a mensagem
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o aluno. Entre em contato com o administrador do sistema." });
        }
    }

    static async remover(req: Request, res: Response): Promise<Response> {
        try {
            const idAluno = parseInt(req.params.idAluno as string);
            const respostaModelo = await Aluno.removerAluno(idAluno);

            if (respostaModelo) {
                return res.status(200).json({ mensagem: "O aluno foi removido com sucesso!" });


            } else {
                return res.status(400).json({ mensagem: "Erro ao remover o aluno. Entre em contato com o administrador do sistema" });
            }


        } catch (error) {
            console.log(`Erro ao remover um aluno. ${error}`);
            return res.status(400).json({ mensagem: "Não foi possivel remover o aluno. Entre em contato com o administrador do sistema." });
        }
    }



    static async atualizar(req: Request, res: Response): Promise<Response> {
        try {
            const alunoRecebido: AlunoDTO = req.body;
            const idAlunoRecebido = parseInt(req.params.idAluno as string);
            const alunoAtualizado = new Aluno(
                alunoRecebido.nome,
                alunoRecebido.sobrenome,
                alunoRecebido.dataNascimento,
                alunoRecebido.endereco,
                alunoRecebido.email,
                alunoRecebido.celular


            );

            alunoAtualizado.setIdAluno(idAlunoRecebido);

            const respostaModelo = await Aluno.atualizarAluno(alunoAtualizado);

            if (respostaModelo) {
                return res.status(200).json({ mensagem: "Aluno atualizado com sucesso!" });

            } else {
                return res.status(400).json({ mensagem: "Não foi possivel atualizar o aluno. Entre em contato com o administrador do sistema." });
            }

        } catch (error) {
            console.log(`Erro ao atualizar um aluno. ${error}`);

            return res.status(400).json({ mensagem: "Não foi possivel atualizar o  aluno. Entre em contato com o administrador do sistema" });
        }
    }














}

export default AlunoController;