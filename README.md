# frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
---

# Login
Campos para email e senha. Botão de login terá texto "Entrar" e ao clicado vai chamar o endpoint de login com os campos email e senha. A senha deve possuir pelo menos 4 caracteres. Erros de validação serão exibidos em vermelho entre os campos e o botão. Em caso de sucesso, salva um cookie com o token de autenticação para ser reenviado nas requisições posteriores.

Link com texto "Criar conta" direciona para a página de cadastro de usuário.

Link com texto "Esqueci minha senha" direciona para a página de relembrar senha.

# Cadastro de usuário
Campos para nome, email, senha e avatar. O avatar deverá ser uma imagem jpg de até 100kb. Uma vez escolhida, será exibida uma pre-visualização de tamanho fixo 100x100. Se nenhum avatar for selecionado, o [avatar padrão](https://github.com/projeto-integrador-feevale-201802/backend/blob/master/avatar.jpg) será usado.

Botão "Concluir" vai enviar os dados ao endpoint de usuários e, caso algum erro seja retornado, deve exibir a mensagem abaixo dos campos. Se o cadastro for bem sucedido, exibe uma mensagem informativa dizendo que um e-mail foi enviado e que é necessário concluir seu cadastro por lá.

# Confirmação de e-mail
Uma tela simples com uma mensagem fixa "Seu e-mail foi confirmado com sucesso" e um link "Ir para login" que redireciona à página de login.

# Relembrar senha
Campo email e um botão "Enviar e-mail" que envia um email para o endereço informado caso este seja um endereço cadastrado no sistema. O email terá um link para a página de redefinir senha. O link deve ter um UUID que identifica qual o endereço de email para a nova senha. Este UUID fica salvo temporariamente na tabela de usuários para marcar aquele usuário como disponível para redefinir senha.

# Modificar senha
Caso o link possua um UUID válido, exibe os campos "senha" e "confirmar senha" e um botão "Redefinir". Se o UUID não for válido, redireciona para a página de login.

# Home
Um menu de navegação na lateral superior esquerda com os itens:
* Home
* Ranking
* Apostar
* Ver apostas
* Minha conta

Uma barra superior com o nome do site no lado esquerdo (que direciona pra Home quando clicado) e um botão "Sair" do lado direito (que remove o cookie do token de autenticação e direciona pra página de login).

No miolo da página é exibida a tabela do brasileirão (a ser carregada de uma tabela do banco, atualizada diariamente junto com o ranking). Colunas:
* Posição
* Clube
* Pontos
* Jogos
* Vitórias
* Empates
* Derrotas
* Gols pró
* Gols contra
* Saldo de gols
* Aproveitamento (%)

# Ver apostas
Menu e barra superior igual ao da Home. O miolo da página exibe:
* Uma combobox para selecionar a rodada (só exibir rodadas que já acabaram)
* Uma combobox para selecionar o usuário
* Uma listagem com as apostas daquele usuário naquela rodada. Cada linha daquela listagem será `Mandante X1 (X2) x Y1 (Y2) Visitante`, onde X1 é a quantidade de gols feito pelo mandante e Y1 a quantidade feita pelo visitante, e X2 e Y2 são as quantidades apostadas pelo usuário.

# Apostar
Menu e barra superior igual ao da Home. O miolo da página exibe:
* Uma combobox para selecionar a rodada (só exibir rodadas que ainda não começaram)
* Uma listagem em que cada linha será `Mandante [ ] x [ ] Visitante`, onde o usuário preencherá as caixas de texto com o placar de cada jogo.
* Um botão "Gravar" para gravar as apostas no banco. Erros de validação devem ser exibidos em vermelho acima da listagem de apostas.
