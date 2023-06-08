// Виносимо try...catch окремо задля запобіганню повторюванню у кожній функції з controllers/contacts.js

const ctrlWrapper = (ctrl) => {
	const func = async (req, res, next) => {
		try {
			await ctrl(req, res, next);
		} catch (error) {
			next(error);
		}
	};
	return func;
};

module.exports = ctrlWrapper;
