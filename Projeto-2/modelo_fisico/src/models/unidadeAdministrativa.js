const mongoose = require('mongoose');

const unidadeAdministrativaSchema = new mongoose.Schema({
    UA: {
        type: Number,
        required: true,
        unique: true
    },
    NOMEDE: {
        type: String,
        required: true
    }
});

const UnidadeAdministrativa = mongoose.model('UnidadeAdministrativa', unidadeAdministrativaSchema);

module.exports = UnidadeAdministrativa;