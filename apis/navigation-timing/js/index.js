//NAVIGATION TIMING API
//tempo de carregamento da página
var horaAtual = new Date().getTime();
var tempoDeCarregamento = horaAtual - performance.timing.navigationStart;

var tempoDeConexao = performance.timing.responseEnd - performance.timing.requestStart;

console.log("Tempo de carregamento da página: " + tempoDeCarregamento + "ms");
console.log("Tempo de conexão: " + tempoDeConexao + "ms");
