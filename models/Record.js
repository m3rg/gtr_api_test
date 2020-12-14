const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  key: String,
  value: String,
  counts: [{type: Number}]
}, {timestamps: true});

// Requires population of author
RecordSchema.methods.toJSON = function(user){
  return {
    key: this.key,
    createdAt: this.createdAt,
    totalCount: this.counts.reduce((a, b) => a + b, 0)
  };
};

mongoose.model('Record', RecordSchema);
