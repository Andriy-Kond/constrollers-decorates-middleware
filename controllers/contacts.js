const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

// Схеми валідації теж виносимо в окремий файл, в якому під кожен об'єкт створюємо свої схеми (schemas/contacts.js)
// const Joi = require("joi");
// const addSchema = Joi.object({
// 	name: Joi.string().required(),
// 	email: Joi.string().required(),
// 	phone: Joi.string().required(),
// });

const listContacts = async (req, res) => {
	const result = await contacts.listContacts();
	res.json(result);
};

const getContactById = async (req, res) => {
	const { contactId } = req.params;
	const result = await contacts.getContactById(contactId);

	// Опрацювання помилки з окремою helper-функцією:
	if (!result) {
		throw HttpError(404, "Not Found");
	}

	res.json(result);
};

// * Виносимо повторювану перевірку валідації у функціях addContact та changeContact у middleware
const addContact = async (req, res) => {
	// // Валідація на відповідність схемі
	// const { error } = addSchema.validate(req.body);
	// if (error) {
	// 	throw HttpError(400, error.message);
	// }

	const result = await contacts.addContact(req.body);
	res.status(201).json(result);
};

const changeContact = async (req, res) => {
	// // Валідація на відповідність схемі
	// const { error } = addSchema.validate(req.body);
	// if (error) {
	// 	throw HttpError(400, error.message);
	// }

	const { contactId } = req.params;
	const result = await contacts.changeContact(contactId, req.body);
	// Якщо результат null (від функції changeContact()), то повертаємо помилку:
	if (!result) {
		throw HttpError(404, "Not Found");
	}
	res.json(result);
};

const removeContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await contacts.removeContact(contactId);
	if (!result) {
		throw HttpError(404, "Not Found");
	}

	// Якщо операцію успішна, то можна повернути об'єкт:
	res.json(result);

	// або повідомлення:
	// res.json({ message: "Delete success" });

	// Іноді під час видалення треба відправити 204-й статус:
	// res.status(204).json(result);
	// З ним є нюанс: статус приходить як 204й, а тіло відповіді - не приходить зовсім. Бо 204й статус означає "no content". Тому тіло відповіді немає сенсу писати, його все одно не відправлять.
	// Коли статус не 204, то треба передати і статус і тіло.
};

module.exports = {
	listContacts: ctrlWrapper(listContacts),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	changeContact: ctrlWrapper(changeContact),
	removeContact: ctrlWrapper(removeContact),
};
