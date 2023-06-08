const { HttpError } = require("../helpers");

const validateBody = (schema) => {
	const func = (req, res, next) => {
		const { error } = schema.validate(req.body);

		// Якщо сталася помилка, передаємо її у next, який перериває виконання:
		if (error) {
			next(HttpError(400, error.message));
		}

		// Якщо помилки нема - йдемо далі:
		next();
	};
	return func;
};

module.exports = validateBody;
