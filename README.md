# Amigão Pet Shop - Fase 2

Continuação do sistema web do petshop **Amigão**, desenvolvido para a
disciplina de Fundamentos de Sistemas Web (PUCRS). Esta fase evolui a estrutura HTML
pura da Fase 1, adicionando estilo, interatividade e o formulário de
cadastro/agendamento.

## Estrutura do projeto

```
petshop-fase2/
├── index.html          -> Página inicial (hero + carrossel Bootstrap)
├── produtos.html        -> Categorias de produtos (2 itens por categoria)
├── servicos.html        -> Serviços de banho e tosa (com e sem tele-busca)
├── cadastro.html         -> Formulário: dados do cliente, do pet e agendamento
├── contato.html          -> Informações de contato
├── css/
│   └── estilo.css        -> CSS próprio do projeto (identidade visual)
├── js/
│   └── script.js         -> Funções JavaScript (comentadas por seção)
├── AJUDA.md               -> Descrição das funcionalidades do site
└── README.md              -> Este arquivo
```

Todo o código (HTML, CSS e JS) está comentado, explicando a função de cada
bloco.

## O que mudou em relação à Fase 1 (ajustes realizados)

0. **Correção do feedback recebido na Fase 1 (Critério 3 - imagens dos
   produtos):** a avaliação da Fase 1 apontou que as imagens dos produtos
   eram placeholders do serviço Placehold.co e não representavam
   visualmente os itens descritos. Em resposta a esse retorno, todas as
   imagens de produto, do carrossel e das seções institucionais foram
   substituídas por **fotos/artes reais**, cada uma representando
   fielmente o item ou a cena descrita (coleira, cama, sacos de ração,
   tapete higiênico, fralda, banners de banho/tosa/tele-busca), todas
   hospedadas localmente em `assets/img/` - sem depender de nenhum
   serviço externo de placeholder.
1. **CSS/Bootstrap:** as páginas passaram a usar o framework Bootstrap 5
   (grid, componentes de formulário, navbar responsiva) combinado com um
   arquivo `css/estilo.css` próprio, que define a identidade visual da marca:
   toda a página fica dentro de uma "moldura" verde-limão vibrante, com o
   conteúdo em um cartão creme de cantos bem arredondados por cima; título
   gigante em estilo cartaz (Baloo 2), cartões com anéis de porcentagem
   (CSS puro, via `conic-gradient`), etiquetas "sticker" giradas, botões em
   formato pílula e um rodapé verde-escuro com o nome da marca em contorno
   gigante ao fundo.
2. **Carrossel:** a página inicial ganhou um carrossel Bootstrap (`#carrossel-petshop`)
   destacando os três pilares da loja: produtos, banho e tosa, e tele-busca.
3. **JavaScript / funções temporais (`js/script.js`):**
   - Faixa no topo que mostra se o petshop está **aberto ou fechado** no
     momento, calculada a partir da data/hora atual e atualizada sozinha.
   - Saudação dinâmica ("Bom dia" / "Boa tarde" / "Boa noite") na página
     inicial, de acordo com o horário do dispositivo do usuário.
   - Ano atual do rodapé preenchido automaticamente.
   - Marcação automática do link ativo do menu.
   - Botão flutuante "voltar ao topo".
   - Lógica do formulário de agendamento (ver item 4).
4. **Formulário de cadastro do cliente e do pet (`cadastro.html`):**
   - Dados do cliente: nome, CPF, telefone, e-mail, endereço e sexo
     (radio button).
   - Dados do pet: nome, espécie (select), raça, idade (number), porte
     (radio button) e se é castrado (checkbox).
   - Serviço desejado (checkbox - banho e/ou tosa) e forma de agendamento
     (radio - tele-busca ou entrega no local).
   - Quando "Tele-busca" é selecionada, um campo de endereço extra aparece
     dinamicamente via JavaScript (fica oculto na opção "entrega no local").
   - Calendário (`<input type="date">`) para a data do agendamento, com data
     mínima definida como o dia de hoje via JavaScript, e campo de horário
     (`<input type="time">`) limitado ao período de atendimento.
   - Validação de campos obrigatórios, com mensagens de erro e foco
     automático no primeiro campo inválido; mensagem de confirmação exibida
     após o envio (não há back-end nesta fase, então o envio é simulado).
5. **Acessibilidade:** ver seção dedicada abaixo.
6. **Organização em arquivos:** CSS e JavaScript foram separados do HTML em
   arquivos próprios (`css/estilo.css` e `js/script.js`), reutilizados por
   todas as páginas, em vez de estilos/scripts embutidos.

## Requisitos de acessibilidade atendidos

- Atributo `alt` descritivo em todas as imagens (produtos e carrossel).
- Link "Pular para o conteúdo principal" (`skip-link`), visível ao navegar
  por teclado (Tab), permitindo pular o menu repetido em cada página.
- `lang="pt-BR"` no HTML de todas as páginas.
- Rótulos (`<label>`) associados a todos os campos de formulário via
  `for`/`id`, com `aria-required` nos campos obrigatórios e textos de ajuda
  (`aria-describedby`) em campos como CPF e endereço de tele-busca.
- Campos agrupados com `<fieldset>`/`<legend>` (ex.: sexo, porte do pet,
  forma de agendamento), o que ajuda leitores de tela a entender o contexto
  de grupos de opções.
- Foco visível reforçado (`:focus-visible`) em links, botões e campos, em
  vez de depender apenas do estilo padrão do navegador.
- Regiões dinâmicas (status de funcionamento e mensagem de confirmação do
  formulário) marcadas com `aria-live="polite"`, para que leitores de tela
  anunciem essas mudanças automaticamente.
- `aria-current="page"` no link do menu correspondente à página atual.
- Respeito à preferência `prefers-reduced-motion`, reduzindo animações para
  quem configurou isso no sistema operacional.

## Link para os códigos-fonte (GitHub)

> https://github.com/mazeneto/amigao-pet-shop

## Link para o sistema publicado (GitHub Pages)

> https://mazeneto.github.io/amigao-pet-shop/

## Como publicar no GitHub Pages

Este projeto continua no mesmo repositório usado na Fase 1
(`amigao-pet-shop`), apenas com os arquivos atualizados/adicionados.

1. Envie todos os arquivos desta pasta (mantendo as subpastas `css/` e
   `js/`) para o repositório já existente - pelo terminal, dentro da pasta
   local do projeto:
   ```
   git add .
   git commit -m "Fase 2 - CSS/Bootstrap, JavaScript, formulário e acessibilidade"
   git push
   ```
   ou pela interface web, em "Add file > Upload files" (arraste a pasta
   inteira, incluindo `css` e `js` - os arquivos HTML antigos da Fase 1 serão
   substituídos pelos novos, com o mesmo nome).
2. Em **Settings > Pages**, confira que a branch `main` e a pasta `/root`
   estão selecionadas (já deve estar, pois o Pages já estava ativo desde a
   Fase 1).
3. O link do GitHub Pages continua o mesmo de antes - o site é atualizado
   automaticamente em alguns instantes após o push/upload.

## Tecnologias utilizadas

- HTML5 semântico
- CSS3 (identidade visual própria) + Bootstrap 5 (grid, navbar, carrossel,
  formulários)
- JavaScript (funções temporais, manipulação do DOM, validação de
  formulário)
