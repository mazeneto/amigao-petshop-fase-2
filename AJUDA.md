# Ajuda - Amigão Pet Shop (Fase 2)

Este arquivo descreve as funcionalidades disponíveis no site do Amigão
Pet Shop nesta segunda fase do projeto.

## Páginas do site

- **index.html (Início):** Apresentação do petshop, com uma saudação que
  muda automaticamente conforme o horário do dia, um carrossel destacando
  produtos/serviços/tele-busca, e atalhos para as demais páginas.

- **produtos.html (Produtos):** Produtos organizados em três categorias -
  acessórios, rações não perecíveis e produtos de higiene e limpeza - cada
  um em um cartão com imagem, categoria, descrição e valor.

- **servicos.html (Serviços):** Os dois serviços do petshop (banho e tosa),
  nas versões com e sem tele-busca, com descrição e valor.

- **cadastro.html (Cadastro e Agendamento):** Formulário completo para:
  - cadastrar os dados do cliente (nome, CPF, telefone, e-mail, endereço,
    sexo);
  - cadastrar os dados do pet (nome, espécie, raça, idade, porte, se é
    castrado);
  - escolher o(s) serviço(s) desejado(s) (banho e/ou tosa);
  - escolher a forma de agendamento: **tele-busca** (o petshop busca e
    entrega o pet - exibe um campo extra de endereço) ou **entrega no
    local** (o tutor leva o pet até a loja);
  - marcar a data (calendário) e o horário do agendamento;
  - deixar observações e aceitar os termos de agendamento.

  Ao enviar, o formulário valida os campos obrigatórios e mostra uma
  mensagem de confirmação na tela. **Não há envio para um servidor** nesta
  fase - é uma simulação em JavaScript, para fins de demonstração.

- **contato.html (Contato):** Informações de contato e atalho para o
  cadastro/agendamento.

## Funcionalidades dinâmicas (JavaScript)

- **Status "aberto/fechado":** faixa no topo de todas as páginas mostra se
  o petshop está atendendo no momento (segunda a sábado, 9h às 18h),
  calculado a partir da hora atual do dispositivo e atualizado sozinho a
  cada 30 segundos.
- **Saudação dinâmica:** na página inicial, o texto muda entre "Bom dia",
  "Boa tarde" e "Boa noite" conforme o horário.
- **Ano automático:** o ano exibido no rodapé é atualizado sozinho.
- **Menu ativo:** o item do menu da página em que você está fica destacado
  automaticamente.
- **Botão "voltar ao topo":** aparece ao rolar a página e leva de volta ao
  início com um clique.
- **Formulário inteligente:** o campo de endereço de tele-busca só aparece
  quando essa opção é escolhida; a data mínima do agendamento é sempre o
  dia de hoje; e há um contador de caracteres no campo de observações.

## Navegação

Todas as páginas possuem um cabeçalho (`header`) com o nome do petshop e um
menu de navegação (`nav`) para as cinco páginas do site: Início, Produtos,
Serviços, Cadastro e Agendamento, e Contato. O mesmo menu é repetido no
rodapé (`footer`), junto com informações de autoria e contato.

## Acessibilidade

O site inclui recursos pensados para pessoas com deficiência visual e para
quem navega por teclado, entre eles:

- Texto alternativo (`alt`) em todas as imagens, descrevendo o conteúdo
  visual.
- Link "Pular para o conteúdo principal", visível ao pressionar Tab.
- Rótulos associados a todos os campos do formulário, com indicação de
  campos obrigatórios e textos de ajuda.
- Agrupamento de campos relacionados (ex.: sexo, porte do pet) com
  `fieldset`/`legend`.
- Foco visível ao navegar por teclado.
- Avisos dinâmicos (status de funcionamento, confirmação do formulário)
  anunciados automaticamente por leitores de tela.

## Limitações desta fase

- O formulário de cadastro **não envia dados a um servidor real** - é uma
  simulação em JavaScript (não há banco de dados nem back-end neste
  projeto).
- As imagens dos produtos, do carrossel e das seções institucionais são
  fotos/artes reais, hospedadas localmente em `assets/img/`. Para
  atualizar qualquer uma no futuro, basta trocar o arquivo correspondente
  mantendo o mesmo nome.
- O calendário de agendamento não verifica conflitos de horário com outros
  agendamentos (não há um sistema de armazenamento de dados nesta fase).
