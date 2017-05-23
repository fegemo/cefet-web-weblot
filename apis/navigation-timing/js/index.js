//NAVIGATION TIMING API

let tempoconectar = document.getElementById('tempoconectar');
let tempocarregar = document.getElementById('tempocarregar');
//tempo de carregamento da página
let horaAtual = new Date().getTime();
let tempoDeCarregamento = horaAtual - performance.timing.navigationStart;

let tempoDeConexao = performance.timing.responseEnd - performance.timing.requestStart;

//console.log("Tempo de carregamento da página: " + tempoDeCarregamento + "ms");
//console.log("Tempo de conexão: " + tempoDeConexao + "ms");

let textoTempoConexao = "Tempo de Conexão com a Terra: " + tempoDeConexao + " ms";
let textoTempoCarregamento = "Tempo de Carregamento da conexão: " + tempoDeCarregamento + " ms";

tempoconectar.textContent = textoTempoConexao;
tempocarregar.textContent = textoTempoCarregamento;