// Функція, що створює і повертає об'єкт починаються з великої літери...
const HttpError = (status, message) => {
	const error = new Error(message);
	error.status = status;
	return error;
};

module.exports = HttpError;
