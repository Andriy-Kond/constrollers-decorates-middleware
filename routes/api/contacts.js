const express = require("express");
const router = express.Router();
// const contacts = require("../../models/contacts");
// const HttpError = require("../../helpers");

// const Joi = require("joi");
// const addSchema = Joi.object({
// 	name: Joi.string().required(),
// 	email: Joi.string().required(),
// 	phone: Joi.string().required(),
// });

// Функції обробки запитів називаються контролери і їх треба виносити в окремі файли.
// Тобто всі ці асинхронні функції треба називати нормальними іменами і звертатись до них.
// Для цього переносимо їх у controllers/contacts.js
// імпортуємо об'єкт з функціями з controllers/contacts.js
const ctrl = require("../../controllers/contacts");

const { validateBody } = require("../../middlwares");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.listContacts);
// Таким чином тут лишаються лише маршрути і виклики функцій, а самі функції - в окремому файлі

router.get("/:contactId", ctrl.getContactById);
router.post("/", validateBody(schemas.addSchema), ctrl.addContact);
router.put("/:contactId", validateBody(schemas.addSchema), ctrl.changeContact);
router.delete("/:contactId", ctrl.removeContact);

module.exports = router;
