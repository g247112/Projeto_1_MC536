const mongoose = require('mongoose');
const Aluno = require('../src/models/aluno');
const Escola = require('../src/models/escola');
const CargaHoraria = require('../src/models/cargaHoraria');
const Disciplina = require('../src/models/disciplina');
const Matricula = require('../src/models/matricula');


// 1. Média de Aulas Atribuídas por Aluno em Cada Escola
const getMediaAulasPorAlunoPorEscola = async () => {
    try {
        const result = await Escola.aggregate([
            {
                $lookup: {
                    from: 'matriculas', 
                    localField: 'CODESC',
                    foreignField: 'CD_ESCOLA',
                    as: 'matriculasDaEscola'
                }
            },
            {
                $lookup: {
                    from: 'cargahorarias', 
                    localField: 'CODESC',
                    foreignField: 'CODESC',
                    as: 'cargasHorariasDaEscola'
                }
            },
            {
                $project: {
                    _id: 0,
                    NOMEESC: '$NOMEESC',
                    CODESC: '$CODESC',
                   
                    totalAlunos: { $size: '$matriculasDaEscola' },
                  
                    total_aulas_atribuidas: {
                        $sum: {
                            $map: { 
                                input: '$cargasHorariasDaEscola',
                                as: 'carga',
                                in: { $toInt: '$$carga.TOT_GERAL_AULA' }
                            }
                        }
                    }
                }
            },
            {
            
                $match: {
                    totalAlunos: { $gt: 0 }
                }
            },
            {
                $project: {
                    "Nome da escola": "$NOMEESC",
                    "total alunos": "$totalAlunos",
                    "total_aulas_atribuidas": "$total_aulas_atribuidas",
                    "media_aulas_por_alunos": {
                        $round: [
                            { $divide: ["$total_aulas_atribuidas", "$totalAlunos"] },
                            2
                        ]
                    }
                }
            },
            {
                $sort: { "media_aulas_por_alunos": -1 }
            }
   
        ]);
        return result;
    } catch (error) {
        console.error("Erro ao calcular a média de aulas por aluno por escola:", error);
        throw error;
    }
};

// 2. Aulas Noturnas por Aluno no Turno Noturno
const getAulasNoturnasPorAluno = async () => {
    try {
        const result = await Escola.aggregate([
            {
                $lookup: {
                    from: 'matriculas',
                    localField: 'CODESC',
                    foreignField: 'CD_ESCOLA',
                    as: 'matriculasDaEscola'
                }
            },
            {
                $lookup: {
                    from: 'cargahorarias',
                    localField: 'CODESC',
                    foreignField: 'CODESC',
                    as: 'cargasHorariasDaEscola'
                }
            },
            {
                $project: {
                    _id: 0,
                    NOMEESC: '$NOMEESC',
                    
                    alunosNoturno: {
                        $size: {
                            $filter: {
                                input: '$matriculasDaEscola',
                                as: 'mat',             
                                cond: { $ne: ["", null] } 
                            }
                        }
                    },

                    aulasAtribuidasNoturno: {
                        $sum: {
                            $map: {
                                input: {
                                    $filter: { 
                                        input: '$cargasHorariasDaEscola',
                                        as: 'carga',
                                        cond: { $gt: [{ $toInt: '$$carga.TOT_AULAS_NOTURNO' }, 0] }
                                    }
                                },
                                as: 'cargaNoturna',
                                in: { $toInt: '$$cargaNoturna.TOT_AULAS_NOTURNO' }
                            }
                        }
                    }
                }
            },
            {
               
                $match: {
                    alunosNoturno: { $gt: 0 },
                    aulasAtribuidasNoturno: { $gt: 0 }
                }
            },
            {
                $project: {
                    "nome da escola": "$NOMEESC",
                    "alunos noturno": "$alunosNoturno",
                    "aulas atribuidas noturno": "$aulasAtribuidasNoturno",
                    "aulas por auluno noturno": {
                        $round: [
                            { $divide: ["$aulasAtribuidasNoturno", "$alunosNoturno"] },
                            2
                        ]
                    }
                }
            },
            {
                $sort: { "aulas por auluno noturno": -1 }
            }
            
        ]);
        return result;
    } catch (error) {
        console.error("Erro ao calcular aulas noturnas por aluno:", error);
        throw error;
    }
};


//3. Distribuição de Aulas por Disciplinas
const getDistribuicaoAulasPorDisciplinas = async () => {
    try {
        const result = await CargaHoraria.aggregate([ 
            {
                $group: {
                    _id: '$MATERIA',
                    totalAulasAtribuidas: {
                        $sum: { $toInt: '$TOT_GERAL_AULA' }
                    }
                }
            },
            {
                $lookup: {
                    from: 'Disciplina', 
                    localField: '_id',
                    foreignField: 'MATERIA',
                    as: 'detalhesDisciplina'
                }
            },
            {
                $unwind: '$detalhesDisciplina' 
            },
            {
                $project: {
                    _id: 0,
                    "Disciplinas": '$detalhesDisciplina.DEN_MATERIA',
                    "Aulas": '$totalAulasAtribuidas'
                }
            },
            {
                $sort: { "Aulas": -1 }
            }
        ]);
        return result;
    } catch (error) {
        console.error("Erro ao obter distribuição de aulas por disciplinas:", error);
        throw error;
    }
};

// 4. Escolas com Maior Número de Matrículas de Alunos com Mobilidade Reduzida
const getEscolasComMobilidadeReduzida = async () => {
    try {
        const result = await Escola.aggregate([
            {
                $lookup: {
                    from: 'matriculas', 
                    localField: 'CODESC',
                    foreignField: 'CD_ESCOLA',
                    as: 'matriculasDaEscola'
                }
            },
            {
                $unwind: '$matriculasDaEscola' 
            },
            {
                $lookup: {
                    from: 'Aluno_mobilidade', 
                    localField: 'matriculasDaEscola.CD_ALUNO_ANONIMIZADO',
                    foreignField: 'CD_ALUNO_ANONIMIZADO',
                    as: 'detalhesMobilidade'
                }
            },
            {
                $unwind: '$detalhesMobilidade' 
            },
            {
                
                $match: {
                    'detalhesMobilidade.FLAG_MOBIL_REDUZ': "1"
                }
            },
            {
                $group: {
                    _id: '$CODESC',
                    NOMEESC: { $first: '$NOMEESC' }, 
           
                    totalMobilidadeReduzida: { $addToSet: '$matriculasDaEscola.CD_ALUNO_ANONIMIZADO' }
                }
            },
            {
                $project: {
                    _id: 0,
                    "Nome da escola": "$NOMEESC",
                    "total mobilidade reduzida": { $size: "$totalMobilidadeReduzida" }
                }
            },
            {
                $sort: { "total mobilidade reduzida": -1 }
            }
           
        ]);
        return result;
    } catch (error) {
        console.error("Erro ao obter escolas com mobilidade reduzida:", error);
        throw error;
    }
};

// 5. Top 1 Disciplina com Maior Número de Aulas Atribuídas
const getTopDisciplinaComMaisAulas = async () => {
    try {
        const result = await CargaHoraria.aggregate([ 
            {
                $group: {
                    _id: '$MATERIA',
                    totalAulas: {
                        $sum: { $toInt: '$TOT_GERAL_AULA' }
                    }
                }
            },
            {
                $lookup: {
                    from: 'Disciplina', 
                    localField: '_id',
                    foreignField: 'MATERIA',
                    as: 'detalhesDisciplina'
                }
            },
            {
                $unwind: '$detalhesDisciplina'
            },
            {
                $project: {
                    _id: 0,
                    "Disciplina": '$detalhesDisciplina.DEN_MATERIA',
                    "Total Aulas Atribuídas": '$totalAulas'
                }
            },
            {
                $sort: { "Total Aulas Atribuídas": -1 }
            },
            {
                $limit: 1 
            }
        ]);

        return result[0] || null;
    } catch (error) {
        console.error("Erro ao obter a top disciplina com mais aulas:", error);
        throw error;
    }
};

module.exports = {
    getMediaAulasPorAlunoPorEscola,
    getAulasNoturnasPorAluno,
    getDistribuicaoAulasPorDisciplinas,
    getEscolasComMobilidadeReduzida,
    getTopDisciplinaComMaisAulas
};