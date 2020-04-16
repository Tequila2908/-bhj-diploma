/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	let request = new XMLHttpRequest,
		url = options.url,
		method = options.method,
		data = options.data,
		test = options.callback,
		formData;
	request.withCredentials = true;
	request.responseType = options.responseType;
	if (method == 'GET') {
		let getMethodUrl = url + '?';
		for (let key in data) {
			getMethodUrl += (key + '=' + data[key] + '&');
		}
		getMethodUrl = getMethodUrl.slice(0, -1);
		request.open(method, getMethodUrl);
		request.addEventListener('readystatechange', func);
		request.send();
		
	} else {
		formData = new FormData;
		for (key in data) {
			formData.append(key, data[key]);
		}
		
		console.log(data);
		request.open(method, url);
		request.addEventListener('readystatechange', func);
		request.send(formData);

	}

	function func(e) {
		if (e.target.readyState === e.target.DONE){
			test(null, e.target.response);
			return e.target.response;
		}
	}




};
