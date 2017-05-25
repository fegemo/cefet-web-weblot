if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js').then(function(registration) {
		console.log('O ServiceWorker foi registrado com sucesso.');
	}).catch(function(err) {
		console.log('O registro do ServiceWorker falhou com o erro: ', err);
	});
}


$('img').on('click', function() {
	var url = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';

	$.ajax({
		method: 'GET',
		url: url,
		success: function(response) {
			$('h1').html(response.message);
		}
	})
})