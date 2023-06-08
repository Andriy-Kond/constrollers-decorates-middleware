const express = require("express");
const logger = require("morgan"); // виводить у консоль інфу про запит (потрібно щоб дебажити код)
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts"); // роутер для contacts

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter); // всі запити, що починаються з /api/books тре шукати тут - contactsRouter

app.use((req, res) => {
	res.status(404).json({ message: "Not found" });
});

// app.use((err, req, res, next) => {
// 	res.status(500).json({ message: err.message });
// });

// Для використання з різними помилками даємо значення за замовчуванням:
app.use((err, req, res, next) => {
	const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
});

module.exports = app;
