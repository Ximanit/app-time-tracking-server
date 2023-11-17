const { Task } = require('../models');

module.exports = {
	async getAll(_, res) {
		try {
			const tasks = await Task.find();
			res.status(200).send(tasks);
		} catch (err) {
			res.status(400).json({
				message: err.message,
			});
		}
	},

	async get(req, res) {
		const id = req.params.id;
		try {
			const task = await Task.findById(id);
			res.status(200).send(task);
		} catch (err) {
			res.status(400).json({
				message: err.message,
			});
		}
	},

	async create(req, res) {
		try {
			const item = new Task(req.body);
			const newItem = await item.save();
			return res.status(200).send(newItem);
		} catch (err) {
			res.status(400).json({
				message: err.message,
			});
		}
	},

	async update(req, res) {
		const id = req.params.id;
		const newTask = req.body;

		try {
			const item = await Task.findByIdAndUpdate(id, newTask);
			return res.status(200).send(item);
		} catch (err) {
			res.status(400).json({
				message: err.message,
			});
		}
	},
};
