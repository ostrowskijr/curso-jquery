var placar = $(".placar");
var URL_placar = "http://localhost:3000/placar";
//
$("#botao-sync").click(sincronizaPLacar);
/*
  A função append insere a linha como último registro da table, para iserir como primeiro registro se deve utilizar a função prepend.
  A função find busco elemeto filho do elemento em questão.
*/
function inserirPlacar() {
  console.log("Inserir placar.");
  var table = $(".placar").find("tbody");
  var usuario = $("#usuarios").val();
  var nrPalavras = $("#contador-palavras").text();
  /* Abaixo código para inserir elemento na table, porem como precisamos inserir evento para remover a linha precisamos criar um objeto.
  var botaoRemover = "<a href='#' class='botao-remover'><i class='small material-icons'>delete</i></a>"
  var linha = "<tr>" +
                "<td>" + usuario + "</td>" +
                "<td>" + nrPalavras + "</td>" +
                "<td>" + botaoRemover + "</td>" +
              "</tr>";
  */
  var linha = novaOcorrencia(usuario, nrPalavras);
  linha.find(".botao-remover").click(removerOcorrencia);
  table.append(linha);
  // Apresentar placar.
  placar.slideDown(600);
  scrollPlacar();
};
/*
  Assim como existem o slideUp, slideDown e slideToggle, existem funções semelhantes que executam o fade, o fadeIn, fadeOut e fadeToggle, respectivamente.
  Aqui this representa a ocorrencia da table.
*/
function removerOcorrencia(event) {
  event.preventDefault();
  console.log("Remover ocorrencia");
  var ocorrencia = $(this).parent().parent();
  /* Código abaixo pode ser subtitui por
      ocorrencia.fadeOut(function(){
        ocorrencia.remove();
      },600);
  */
  ocorrencia.fadeOut(600);
  setTimeout(function () {
    ocorrencia.remove();
  }, 600);
};
/*

*/
function novaOcorrencia(usuario, palavras) {
  var linha = $("<tr>");
  var colunaUsuario = $("<td>").text(usuario);
  var colunaPalavras = $("<td>").text(palavras);
  var colunaRemover = $("<td>");
  //
  var link = $("<a>").attr("href","#").addClass("botao-remover");
  var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");
  link.append(icone);
  colunaRemover.append(link);
  linha.append(colunaUsuario);
  linha.append(colunaPalavras);
  linha.append(colunaRemover);
  console.log("linha: " + linha);
  return linha;
};
/*
Como exibir um elemento com a função show e ocultá-lo com a função hide.
Como alternar entre as funções show e hide com a função toggle.
Como exibir e ocultar um elemento de uma maneira mais suave, com as funções slideDown e slideUp, respectivamente.
Como alternar entre as funções slideDown e slideUp com a função slideToggle.

A função stop, para controlar melhor as nossas animações. A função stop evita que caso o usuário realizar varios click em um determinado botão
o jquery tenha que executar a animação para todos os click, com stop o jquery para a animação corrente e executa a do último click.
*/
function mostrarPlacar() {
  placar.stop().slideToggle(600);
}
/*
  Para recuperar a posição de um elemento html da página utilizamos a função offSet() que retorna o top() e left();
  Para realizar uma animação com jQuery utilizamos a função animate, que recebe 2 parametros, as propriedades css que desejamos animar e o tempo da
  animação.
*/
function scrollPlacar() {
  // Função offset retorna a posição do elemento em questão do topo e esquerda da página, valor em pixels.
  var posicaoPlacar = placar.offset().top;
  $("html, body").animate(
    {
      scrollTop: posicaoPlacar + "px"
    }, 1000);
}
/*
  Function para realizar o sincronismo do placar com o servidor node.js via requisição Post.
*/
function sincronizaPLacar() {
  //
  var placar = [];
  var linhas = $("tbody>tr");
  var tooltip = $(".tooltip");
  linhas.each(function() {
    var usuario   = $(this).find("td:nth-child(1)").text();
    var palavras  = $(this).find("td:nth-child(2)").text();
    // Montar array para envio ao servidor.
    var score = {
      usuario: usuario,
      pontos: palavras 
    };
    // Inserir a variavel score no meu array através da funtion push
    placar.push(score);
  });

  var dados = {
    placar : placar
  };
  //
  $.post(URL_placar, dados, function() {
    console.log("Placar salvo no servidor");
    tooltip.tooltipster("open").tooltipster("content", "Sincronizado com sucesso!");
  }).fail(function(){
    tooltip.tooltipster("open").tooltipster("content", "Falha ao realizar sincronismo!");
  }).always(function(){
    setTimeout(function(){
      tooltip.tooltipster("close");
    }, 1200);
  });
}
/*
  Function para recuperar o placar registrado no servidor e montar na página.
*/
function atualizaPlacar() {
  $.get(URL_placar, function(data){
      $(data).each(function(){
        var linha = novaOcorrencia(this.usuario, this.pontos);
        //
        linha.find(".botao-remover").click(removerOcorrencia);
        $("tbody").append(linha);
      });
  });
}