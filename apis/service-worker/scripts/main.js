if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('worker.js')
		.then(reg => {
			console.log('Service worker registrado com sucesso');
		}).catch(err => {
			console.log('Ocorreu um erro ao registrar service worker: ', err);
		});
}
