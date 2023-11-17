const { Schema, model } = require('mongoose');

const schema = new Schema({
	task: {
		type: Schema.Types.ObjectId,
		ref: 'Task',
		required: true,
	},
	description: {
		type: String,
	},
	start: {
		type: Date,
		default: new Date(),
	},
	end: {
		type: Date,
	},
	isPause: {
		type: Boolean,
		default: false,
	},
	pause: [
		{
			date_start: {
				type: Date,
				default: new Date(),
			},
			date_end: {
				type: Date,
			},
			time: {
				type: Number,
				default: 0,
			},
		},
	],
	spent_time: {
		type: Number,
	},
});

// Добавляем хук "pre" к схеме, который будет вызываться перед сохранением документа
schema.pre('save', function (next) {
	// Рассчитываем разницу между start и end, учитывая паузы
	const totalDuration = this.end - this.start - this.calculatePauseDuration();

	// Присваиваем результат в spent_time
	this.spent_time = totalDuration / 3600000;

	// Продолжаем выполнение операции сохранения
	next();
});

// Добавляем метод к схеме для вычисления общей длительности пауз
schema.methods.calculatePauseDuration = function () {
	if (this.pause.length > 0 && this.pause.at(-1).date_end) {
		return this.pause.reduce((total, pause) => total + pause.time, 0);
	} else {
		return 0;
	}
};

module.exports = model('WorkTask', schema);
