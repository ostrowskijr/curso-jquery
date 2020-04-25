/* Variaveis de escopo global do Código */
var campo = $(".campo-digitacao");
var frase = $(".frase").text();
var tempoInicial = $("#tempo-digitacao").text();
var botaoReiniciar = $("#reiniciar-jogo");
var botaoRemover = $(".botao-remover");
/*
  Função abaixo executa logo após todo o Html da página ter sido carregado pelo navegador.
  $(document).ready(function(){}); pode ser substituido pela atalho $(function(){}); do jQuery
*/
$(function(){
  console.log("Página carregada.");
  atualizaTamanhoFrase();
  inicializaContadores();
  inicializaCronometro();
  inicialzaMarcadores();
  atualizaPlacar();
  $("#botao-placar").click(mostrarPlacar);
  botaoRemover.click(removerOcorrencia);
  botaoReiniciar.click(reiniciarJogo);
  // Ativar o plugin selectize no componente cujo o ID = usuarios.
  $("#usuarios").selectize({
    create: true,
    sortField: 'text'
  });
  // Ativar o plugin tooltipster nos componentes que possuam a classe = tooltip.
  $(".tooltip").tooltipster({
    // Para avaliar demais parâmetros do pligin visitar a DOC.
    trigger : "custom"
  });
});
/*
  Para recuperar o texto de uma tag exemplo <p> <span> <h1> utilizamos a function text() do jQuery

  Obs: Para selecionar uma class utilizamos o seletor . para selecionar um Id utilizamos #
*/
function atualizaTamanhoFrase(){
  var frase = $(".frase").text();
  var numeroPalavras = frase.split(" ").length;
  var tamanhoFrase   = $("#tamanho-frase");
  tamanhoFrase.text(numeroPalavras);
};
/*

*/
function atualizaTempoInicial(tempo) {
  tempoInicial = tempo;
  $("#tempo-digitacao").text(tempo);
}
/*
  Abaixo segue function para realizar a contagem de caracteres e palavras na digitação do campo.

  Aqui começa o trabalho com eventos. Para recupar o valor de um <input> <textarea> utilizamos a function val() que representa value do jQuery
  Evento click: executa a cada click no input selecionado. Evento input: executa a cada caracter inserido no input.
*/
function inicializaContadores(){
  campo.on("input", function(){
    var conteudo = campo.val();
    var qtde_palavras = conteudo.split(/\S+/).length -1;
    $("#contador-palavras").text(qtde_palavras);
    //
    var conteudo_sem_espaco = conteudo.replace(/\s+/g,'');
    var qtde_caracteres = conteudo_sem_espaco.length;
    $("#contador-caracteres").text(qtde_caracteres);
  });
};
/*
  A function abaixo ativa o contador assim que é realizado o foco no campo textarea, para que não ocorra de cada vez que o usuário entrar
  e sair do campo seja criado um novo interval, substituimos a function on pela one do jQuery. A function one executa uma unica vez enquanto a
  on esta sempre escutando eventos.

  Aqui trabalhamos com o evento focus, e as funções de tempo do javascript.
  Essa ação de adicionar e remover classes se tornou uma tarefa tão comum, que o jQuery criou uma função específica para isso, a toggleClass().
  Ela funciona da seguinte maneira: se no momento que a função for chamada, o elemento possuir a classe, ela será removida. Mas se o elemento não possuir
  a classe, ela será adicionada.
*/
function inicializaCronometro(){
  botaoReiniciar.attr("disabled", true);
  campo.removeClass("campo-desativado")
  campo.one("focus", function(){
    var tempoRestante = $("#tempo-digitacao").text();
    // setInterval função nativa do javascript para criar um timer e executar de tempo em tempo definido.
    var Idinterval = setInterval(function(){
      tempoRestante--;
      //
      $("#tempo-digitacao").text(tempoRestante);
      if (tempoRestante === 0) {
          // clearInterval finaliza o processamento do timer, o mesmo recebe o Id do interval.
          clearInterval(Idinterval);
          // A função .attr("disabled", false); pode ser substituida por .removeAttr("disabled");
          botaoReiniciar.attr("disabled", false);
          // Podemos alterar css via jQuery com o comando abaixo.
          //campo.css("background-color", "lightgray");
          // O comando abaixo insere uma nova classe ao input em questão, ficando assim a estilização separada do javascript.
          finalizaJogo();
      }
    }, 1000)
  });
};
/*

*/
function inicialzaMarcadores() {
  campo.on("input", function() {
    var frase = $(".frase").text();
    var digitado = campo.val();
    var comparavel = frase.substr(0, digitado.length);
    // frase.startsWith(digitado); Retorna true ou false para a comparação das strings.
    if (digitado == comparavel){
      console.log("Certo");
      campo.addClass("borda-verde");
      campo.removeClass("borda-vermelha");
    } else {
      console.log("Errado");
      campo.addClass("borda-vermelha");
      campo.removeClass("borda-verde");
    }
  });
};
/*
  Função para reiniciar o jogo.
*/
function reiniciarJogo() {
  console.log("Botão reiniciar jogo");
  campo.removeAttr("disabled");
  campo.val("");
  $("#contador-caracteres").text("0");
  $("#contador-palavras").text("0");
  $("#tempo-digitacao").text(tempoInicial);
  campo.removeClass("borda-verde");
  campo.removeClass("borda-vermelha");
  /**/
  inicializaCronometro();
};
/*

*/
function finalizaJogo() {
  campo.attr("disabled", true);
  campo.addClass("campo-desativado");
  inserirPlacar();
}
