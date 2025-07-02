const mongoose = require('mongoose');

const unidadeAdministrativaSchema = new mongoose.Schema({
    UA: {
        type: Number,
        required: true,
        unique: true
    },
    NOMEDE: {
        type: String,
        required: true,
        maxlength: 255
    }
});

module.exports = mongoose.model('UnidadeAdministrativa', unidadeAdministrativaSchema);