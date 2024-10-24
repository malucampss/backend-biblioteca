CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno SERIAL PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();


-- CREATE LIVRO
CREATE TABLE Livro (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);

-- CREATE EMPRESTIMO
CREATE TABLE Emprestimo (
    id_emprestimo SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);

-- ALUNO
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');

-- ALUNO -- INSIRA 10 ALUNOS 
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Lucas', 'Silva', '2002-11-12', 'Rua do Sol, 1', 'lucas.silva@email.com', '16991234567'),
('Fernanda', 'Pereira', '2003-05-20', 'Avenida das Flores, 45', 'fernanda.pereira@email.com', '16992345678'),
('Gabriel', 'Souza', '2001-08-15', 'Rua da Liberdade, 78', 'gabriel.souza@email.com', '16993456789'),
('Mariana', 'Oliveira', '2000-12-30', 'Rua dos Ventos, 89', 'mariana.oliveira@email.com', '16994567890'),
('Felipe', 'Melo', '2004-03-10', 'Rua das Árvores, 12', 'felipe.melo@email.com', '16995678901'),
('Jéssica', 'Alves', '2005-01-25', 'Rua das Estrelas, 34', 'jessica.alves@email.com', '16996789012'),
('Bruno', 'Martins', '2003-09-14', 'Rua da Paz, 56', 'bruno.martins@email.com', '16997890123'),
('Tatiane', 'Costa', '2006-07-19', 'Avenida das Acácias, 23', 'tatiane.costa@email.com', '16998901234'),
('Ricardo', 'Lima', '2001-04-07', 'Rua dos Lírios, 90', 'ricardo.lima@email.com', '16999012345'),
('Aline', 'Freitas', '2002-10-11', 'Rua da Amizade, 67', 'aline.freitas@email.com', '16990123456');

-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');



-- LIVRO -- INSIRA 10 LIVROS -- DADOS REAIS 
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('A Insustentável Leveza do Ser', 'Milan Kundera', 'Editora Objetiva', '1984', '978-8535917609', 7, 7, 90.00, 'Disponível'),
('O Nome da Rosa', 'Umberto Eco', 'Companhia das Letras', '1980', '978-8535921005', 5, 5, 100.00, 'Disponível'),
('As Aventuras de Tom Sawyer', 'Mark Twain', 'Editora Martins Fontes', '1876', '978-8579160475', 8, 8, 55.00, 'Disponível'),
('O Guia do Mochileiro das Galáxias', 'Douglas Adams', 'Editora Arqueiro', '1979', '978-8595081545', 10, 10, 45.00, 'Disponível'),
('Os Miseráveis', 'Victor Hugo', 'Companhia das Letras', '1862', '978-8535920558', 4, 4, 120.00, 'Disponível'),
('A Sombra do Vento', 'Carlos Ruiz Zafón', 'Editora Suma de Letras', '2001', '978-8581050374', 6, 6, 75.00, 'Disponível'),
('O Silmarillion', 'J.R.R. Tolkien', 'HarperCollins', '1977', '978-0007525547', 5, 5, 110.00, 'Disponível'),
('Coração das Trevas', 'Joseph Conrad', 'Companhia das Letras', '1899', '978-8535931723', 8, 8, 50.00, 'Disponível'),
('A Casa dos Espíritos', 'Isabel Allende', 'Editora Globo', '1982', '978-8525040770', 7, 7, 85.00, 'Disponível'),
('O Retrato de Dorian Gray', 'Oscar Wilde', 'Companhia das Letras', '1890', '978-8535921340', 9, 9, 65.00, 'Disponível');


-- Inserindo Emprestimos
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');

-- Inserindo Emprestimos -- 10 EMPRESTIMOS, não repetir em
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(3, 9, '2024-09-12', '2024-09-26', 'Em andamento'),
(5, 1, '2024-09-13', '2024-09-27', 'Em andamento'),
(7, 2, '2024-09-14', '2024-09-28', 'Em andamento'),
(8, 3, '2024-09-15', '2024-09-29', 'Em andamento'),
(9, 4, '2024-09-16', '2024-09-30', 'Em andamento'),
(10, 5, '2024-09-17', '2024-10-01', 'Em andamento'),
(1, 6, '2024-09-18', '2024-10-02', 'Em andamento'),
(2, 7, '2024-09-19', '2024-10-03', 'Em andamento'),
(4, 8, '2024-09-20', '2024-10-04', 'Em andamento'),
(6, 9, '2024-09-21', '2024-10-05', 'Em andamento');

