const mongoose = require('mongoose');

const matriculaSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true,
        unique: true
    },
    CD_ALUNO_ANONIMIZADO: {
        type: String,
        required: true,
        ref: 'Aluno'
    },
    CD_ESCOLA: {
        type: Number,
        required: true,
        ref: 'Escola'
    },
    CD_TURMA: {
        type: String,
        required: true
    },
    DT_MATRIC: {
        type: Date,
        required: true
    },
    DTINI_MATRIC: {
        type: Date,
        required: true
    },
    DTFIM_MATRIC: {
        type: Date
    },
    FLAG_SIT_ALUNO: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Matricula', matriculaSchema);