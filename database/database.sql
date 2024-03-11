CREATE TABLE listou.usuario (
    id_usuario      VARCHAR(255) NOT NULL PRIMARY KEY,
    nome_usuario    VARCHAR(255) NOT NULL UNIQUE,
    email           VARCHAR(255) NOT NULL UNIQUE,
    senha           VARCHAR(255) NOT NULL
);

CREATE TABLE listou.produto (
    id_produto      VARCHAR(255)    NOT NULL PRIMARY KEY,
    nome_produto    VARCHAR(255)    NOT NULL,
    preco           NUMERIC         NOT NULL,
    quantidade      INTEGER         NOT NULL,
    data_criacao    DATE            NOT NULL
);

CREATE TABLE listou.lista (
    id_lista        VARCHAR(255)    NOT NULL PRIMARY KEY,
    data_cadastro   DATE            NOT NULL,
    id_produto      VARCHAR(255)    NOT NULL,
    id_usuario      VARCHAR(255)    NOT NULL,
    CONSTRAINT fk_produto FOREIGN KEY (id_produto) REFERENCES produto(id_produto),
    CONSTRAINT fk_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE SEQUENCE listou.seq_usuario
INCREMENT 1
START WITH 1;

CREATE SEQUENCE listou.seq_produto
INCREMENT 1
START WITH 1;

CREATE SEQUENCE listou.seq_lista
INCREMENT 1
START WITH 1;