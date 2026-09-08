/* =========================================================================
   AMIGÃO PET SHOP - script.js
   Fase 2 - funções JavaScript para tornar o site dinâmico:
     1. Marca o link ativo do menu (acessível via aria-current)
     2. Relógio / status "aberto agora" (função temporal, atualiza sozinha)
     3. Saudação dinâmica conforme o horário do dia
     4. Ano atual automático no rodapé
     5. Botão "voltar ao topo"
     6. Formulário de cadastro: mostrar/ocultar endereço de tele-busca,
        data mínima do agendamento = hoje, contador de caracteres,
        validação e mensagem de confirmação (sem envio a servidor)
   Todas as funções só executam se os elementos existirem na página atual,
   então este único arquivo pode ser incluído em todas as páginas do site.
   ========================================================================= */

document.addEventListener('DOMContentLoaded', function () {

    /* ---------------------------------------------------------------------
       1. Marcar o link do menu correspondente à página atual
       --------------------------------------------------------------------- */
    function marcarLinkAtivo() {
        var paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
        var links = document.querySelectorAll('.navbar-petshop .nav-link');

        links.forEach(function (link) {
            var href = link.getAttribute('href');
            if (href === paginaAtual) {
                link.classList.add('active');
                // aria-current avisa leitores de tela qual é a página atual
                link.setAttribute('aria-current', 'page');
            }
        });
    }
    marcarLinkAtivo();

    /* ---------------------------------------------------------------------
       2. Relógio e status "aberto agora" (função temporal)
          Horário de atendimento: segunda a sábado, das 9h às 18h.
       --------------------------------------------------------------------- */
    function atualizarStatusFuncionamento() {
        var faixa = document.getElementById('faixa-status');
        if (!faixa) return;

        var agora = new Date();
        var diaSemana = agora.getDay();   // 0 = domingo ... 6 = sábado
        var hora = agora.getHours();

        var estaAberto = diaSemana !== 0 && hora >= 9 && hora < 18;

        var horaFormatada = agora.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        if (estaAberto) {
            faixa.textContent = 'Estamos abertos agora - horário local: ' + horaFormatada + ' (atendimento até às 18h)';
            faixa.classList.remove('fechado');
        } else {
            faixa.textContent = 'No momento estamos fechados - horário local: ' + horaFormatada + ' (atendimento: seg. a sáb., 9h às 18h)';
            faixa.classList.add('fechado');
        }
    }
    atualizarStatusFuncionamento();
    // Atualiza a cada 30 segundos, para o horário mostrado não ficar parado
    setInterval(atualizarStatusFuncionamento, 30000);

    /* ---------------------------------------------------------------------
       3. Saudação dinâmica no topo da página inicial
       --------------------------------------------------------------------- */
    function exibirSaudacao() {
        var elementoSaudacao = document.getElementById('saudacao-dinamica');
        if (!elementoSaudacao) return;

        var horaAtual = new Date().getHours();
        var saudacao;

        if (horaAtual < 12) {
            saudacao = 'Bom dia';
        } else if (horaAtual < 18) {
            saudacao = 'Boa tarde';
        } else {
            saudacao = 'Boa noite';
        }

        elementoSaudacao.textContent = saudacao + ', seja bem-vindo(a) ao Amigão!';
    }
    exibirSaudacao();

    /* ---------------------------------------------------------------------
       4. Ano atual automático no rodapé
       --------------------------------------------------------------------- */
    var spanAno = document.getElementById('ano-atual');
    if (spanAno) {
        spanAno.textContent = new Date().getFullYear();
    }

    /* ---------------------------------------------------------------------
       5. Botão "voltar ao topo"
       --------------------------------------------------------------------- */
    var botaoTopo = document.getElementById('botao-topo');
    if (botaoTopo) {
        window.addEventListener('scroll', function () {
            botaoTopo.style.display = window.scrollY > 400 ? 'block' : 'none';
        });

        botaoTopo.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------------------------------------------------------------------
       6. Formulário de cadastro (cliente + pet + agendamento)
       --------------------------------------------------------------------- */
    var formCadastro = document.getElementById('form-cadastro');
    if (formCadastro) {

        /* 6.1 Mostrar o campo de endereço apenas quando "Tele-busca" for
               selecionada como forma de agendamento */
        var radiosAgendamento = document.querySelectorAll('input[name="metodoAgendamento"]');
        var painelEndereco = document.getElementById('painel-endereco-busca');
        var campoEnderecoBusca = document.getElementById('enderecoBusca');

        function alternarPainelEndereco() {
            var teleBuscaSelecionada = document.getElementById('metodoTeleBusca').checked;
            if (teleBuscaSelecionada) {
                painelEndereco.classList.remove('d-none');
                campoEnderecoBusca.setAttribute('required', 'required');
            } else {
                painelEndereco.classList.add('d-none');
                campoEnderecoBusca.removeAttribute('required');
            }
        }

        radiosAgendamento.forEach(function (radio) {
            radio.addEventListener('change', alternarPainelEndereco);
        });
        alternarPainelEndereco(); // define o estado inicial ao carregar a página

        /* 6.2 Data mínima de agendamento = hoje (não deixa marcar no passado) */
        var campoData = document.getElementById('dataAgendamento');
        if (campoData) {
            var hoje = new Date();
            var hojeFormatado = hoje.toISOString().split('T')[0];
            campoData.setAttribute('min', hojeFormatado);
        }

        /* 6.3 Contador de caracteres do campo de observações */
        var campoObservacoes = document.getElementById('observacoes');
        var contadorObservacoes = document.getElementById('contador-observacoes');
        var LIMITE_OBSERVACOES = 200;

        if (campoObservacoes && contadorObservacoes) {
            campoObservacoes.setAttribute('maxlength', LIMITE_OBSERVACOES);
            contadorObservacoes.textContent = LIMITE_OBSERVACOES + ' caracteres restantes';

            campoObservacoes.addEventListener('input', function () {
                var restantes = LIMITE_OBSERVACOES - campoObservacoes.value.length;
                contadorObservacoes.textContent = restantes + ' caracteres restantes';
            });
        }

        /* 6.4 Exigir ao menos um serviço marcado (Banho e/ou Tosa) */
        function algumServicoMarcado() {
            var servicos = document.querySelectorAll('input[name="servicos"]:checked');
            return servicos.length > 0;
        }

        /* 6.5 Validação e mensagem de confirmação (não há servidor nesta
               fase, então o formulário apenas valida e exibe uma mensagem) */
        var mensagemEnvio = document.getElementById('mensagem-envio');
        var avisoServico = document.getElementById('aviso-servico');

        formCadastro.addEventListener('submit', function (evento) {
            evento.preventDefault();

            var servicoOk = algumServicoMarcado();
            avisoServico.classList.toggle('d-none', servicoOk);

            if (!formCadastro.checkValidity() || !servicoOk) {
                formCadastro.classList.add('was-validated');
                mensagemEnvio.classList.add('d-none');

                // leva o foco para o primeiro campo inválido, ajuda quem usa teclado/leitor de tela
                var primeiroInvalido = formCadastro.querySelector(':invalid');
                if (primeiroInvalido) {
                    primeiroInvalido.focus();
                }
                return;
            }

            var nomeCliente = document.getElementById('nomeCliente').value;
            var nomePet = document.getElementById('nomePet').value;

            mensagemEnvio.textContent = 'Cadastro recebido com sucesso, ' + nomeCliente +
                '! O agendamento para ' + nomePet + ' foi registrado. ' +
                '(Simulação: nesta fase do projeto não há envio para um servidor real.)';
            mensagemEnvio.classList.remove('d-none', 'alert-danger');
            mensagemEnvio.classList.add('alert-success');

            formCadastro.reset();
            formCadastro.classList.remove('was-validated');
            alternarPainelEndereco();
            if (contadorObservacoes) {
                contadorObservacoes.textContent = LIMITE_OBSERVACOES + ' caracteres restantes';
            }
            mensagemEnvio.focus();
        });
    }

});
