
import { Request, Response, Router } from "express";
import AlunoController from "./controller/AlunoController";
import EmprestimoController from "./controller/EmprestimoController";
import LivroController from "./controller/LivroController";

// Cria um roteador
const router = Router();

// Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá, mundo!" });
});

/* 
* ROTAS PARA CARROS
*/ 
// Rota para listar os carros
router.get("/lista/alunos", AlunoController.todos);
router.post("/novo/aluno", AlunoController.novo);

/* 
* ROTAS PARA CLIENTES
*/ 
// Rota para listar os clientes
router.get("/lista/emprestimos", EmprestimoController.todos);
router.post("/novo/emprestimo", EmprestimoController.novo);

/* 
* ROTAS PARA PEDIDOS
*/ 
// Rota para listar os pedidos
router.get("/lista/livros", LivroController.todos);
router.post("/novo/livro", LivroController.novo);

// exportando as rotas
export { router };