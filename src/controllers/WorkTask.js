const { WorkTask } = require('../models');
const { Task } = require('../models');

module.exports = {
	async getAll(_, res) {
		try {
			const workTask = await WorkTask.find();
			res.status(200).send(workTask);
		} catch (err) {
			res.status(400).json({
				message: err.message,
			});
		}
	},

	async get(req, res) {
		const id = req.params.id;
		try {
			const workTask = await WorkTask.findById(id);
			///////////////////////////////////ДЛЯ ОТЛАДКИ///////////////////////////////////////////////
			await workTask.save();
			/////////////////////////////////////////////////////////////////////////////////
			res.status(200).send(workTask);
		} catch (err) {
			res.status(400).json({
				message: err.message,
			});
		}
	},

	async create(req, res) {
		const taskId = req.body.task;
		try {
			const item = new WorkTask(req.body);
			const workTask = await item.save();
			const existingTask = await Task.findById(taskId);
			existingTask.complited = true;
			await existingTask.save();
			return res.status(200).send(workTask);
		} catch (err) {
			res.status(400).json({
				message: err.message,
			});
		}
	},

	async update(req, res) {
		const id = req.params.id;
		const newWorkTask = req.body;

		try {
			const item = await WorkTask.findByIdAndUpdate(id, newWorkTask);
			await item.save();
			return res.status(200).send(item);
		} catch (err) {
			res.status(400).json({
				message: err.message,
			});
		}
	},

	async onPause(req, res) {
		const id = req.params.id;
		try {
			const workTask = await WorkTask.findById(id);
			if (!workTask.isPause) {
				workTask.pause.push({
					date_start: new Date(),
				});
				workTask.isPause = true;
				await WorkTask.findByIdAndUpdate(workTask.id, workTask);
				const item = await WorkTask.findById(workTask.id);
				return res.status(200).send(item);
			}

			return res.status(400).send('Задача уже стоит на паузе!');
		} catch (err) {
			res.status(400).json({
				message: err.message,
			});
		}
	},

	async offPause(req, res) {
		const id = req.params.id;
		try {
			const workTask = await WorkTask.findById(id);
			if (workTask.isPause) {
				workTask.pause.at(-1).date_end = new Date();
				workTask.pause.at(-1).time =
					workTask.pause.at(-1).date_end - workTask.pause.at(-1).date_start;
				workTask.isPause = false;
				await WorkTask.findByIdAndUpdate(workTask.id, workTask);
				const item = await WorkTask.findById(workTask.id);
				return res.status(200).send(item);
			}

			return res.status(400).send('Задача не стоит на паузе!');
		} catch (err) {
			res.status(400).json({
				message: err.message,
			});
		}
	},
};
