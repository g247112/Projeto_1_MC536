const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema({
    CODMAE: {
        type: Number,
        required: true,
        unique: true
    },
    DEN_CODMAE: {
        type: String,
        required: true
    },
    MATERIA: {
        type: Number
    },
    DEN_MATERIA: {
        type: String
    }
});

module.exports = mongoose.model('Disciplina', disciplinaSchema);