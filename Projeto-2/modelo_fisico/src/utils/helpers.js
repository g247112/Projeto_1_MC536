const mongoose = require('mongoose');

const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toISOString().split('T')[0];
};

const calculateAge = (birthDate) => {
    if (!birthDate) return null;
    const ageDiff = Date.now() - new Date(birthDate).getTime();
    return Math.floor(ageDiff / (1000 * 3600 * 24 * 365.25));
};

module.exports = {
    isValidObjectId,
    formatDate,
    calculateAge,
};