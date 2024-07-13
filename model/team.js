const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

const Team = mongoose.model('Team', TeamSchema);
module.exports = Team;
