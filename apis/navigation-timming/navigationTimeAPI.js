window.addEventListener('load', function() {        
    let now = new Date().getTime();
    time_load_page = now - performance.timing.navigationStart
    document.getElementById('timeLoadPage').innerHTML = 'TEMPO PARA CARREGAMENTO DA PÁGINA: ' + time_load_page + ' (ms)';
    
    let output = ""

    switch(performance.navigation.type) {
        case PerformanceNavigation.TYPE_NAVIGATE:
            output += "Navigation";
            document.getElementById('welcome').innerHTML = 'SEJA BEM VINDO'
        break;
        case PerformanceNavigation.TYPE_RELOAD:
            output += "Reload";
            document.getElementById('welcome').innerHTML = 'SEJA BEM VINDO NOVAMENTE'
        break;
        case PerformanceNavigation.TYPE_BACK_FORWARD:
            output += "History";
            document.getElementById('welcome').innerHTML = 'OBRIGADO POR RETORNAR'
        break;
        default:
            output += "Unknown";
        break;
    }
    document.getElementById('navigationType').innerHTML = 'TIPO DE NAVEGAÇÃO: ' + output;

    console.log(performance.timing) // Objeto Timing
    console.log(performance.navigation) // Objeto Navigation
 });