/*
  Var Global
*/
  var URL_frase = "http://localhost:3000/frases";
  var spinner = $("#spinner");
  var erro = $("#erro");
//
$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);
/*
  Função $.get do jQuery para requisição get via Ajax, esta função retonar as functions .fail em caso de falha e .always sempre na finalização do request.
*/
function fraseAleatoria() {
  // Mostra animação spinner da execução da requisição com servidor.
  spinner.toggle();
  // Requisação ao servidor via Ajax através do método get do JQuery
  $.get(URL_frase, trocaFraseAleatoria)
    .fail(function () {
      erro.toggle();
      setTimeout(function () {
        erro.toggle();
      }, 2000);
    }
  )
  .always(function() {
    spinner.toggle();
  });
}
/*
*/
function trocaFraseAleatoria(dados) {
  var frase = $(".frase");
  var numeroAleatorio = Math.floor(Math.random() * dados.length);
  //
  frase.text(dados[numeroAleatorio].texto)
  atualizaTamanhoFrase();
  atualizaTempoInicial(dados[numeroAleatorio].tempo);
}
/*
  Realiza uma requisição Ajax do tipo Get passando um Id para o servidor para retornar a frase correspondente aquele Id;
*/
function buscaFrase() {
  var fraseId = $("#frase-id").val();
  var params = {id: fraseId};
  spinner.toggle();
  //
  $.get(URL_frase, params, trocaFrase)
  .fail(function() {
    erro.toggle();
    setTimeout(function () {
      erro.toggle();
    }, 2000);
  })
  .always(function() {
    spinner.toggle();
  });
};
/*

*/
function trocaFrase(dados) {
  var frase = $("#frase");
  frase.text(dados.texto);
  atualizaTamanhoFrase();
  atualizaTempoInicial(dados.tempo);
}
