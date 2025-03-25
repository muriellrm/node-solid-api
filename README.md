# App

GymPass style app.

## RFs (Requisitos funcionais)
#### Define o que usuário pode fazer na nossa aplicação

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RN (Regras de negócio)
#### Caminhos e regras de cada requisito funcional

- [x] Não deve ser possivel cadastrar um usuário com o mesmo email.
- [x] O usuário não pode fazer dois check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in deve ser validado em até 20 minutos após ser criado;
- [ ] O check-in só pode ser validado por adms;
- [ ] A academia só pode ser cadastrada por adms;


## RNFs (Requisitos não-funcionais)
#### Escolhas tecnicas e estratégias para o desenvolvimento da aplicação.

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por pág.
- [ ] O usuário deve ser identificado por um JWT.
