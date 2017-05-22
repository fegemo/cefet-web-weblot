//NAVIGATION TIMING API
//tempo de carregamento da página
let horaAtual = new Date().getTime();
let tempoDeCarregamento = horaAtual - performance.timing.navigationStart;

let tempoDeConexao = performance.timing.responseEnd - performance.timing.requestStart;

console.log("Tempo de carregamento da página: " + tempoDeCarregamento + "ms");
console.log("Tempo de conexão: " + tempoDeConexao + "ms");
