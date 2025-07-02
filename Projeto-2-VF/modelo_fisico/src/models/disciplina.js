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
        type: Number,
        required: false
    },
    DEN_MATERIA: {
        type: String,
        required: false
    }
});

const Disciplina = mongoose.model('Disciplina', disciplinaSchema);

module.exports = Disciplina;