const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
