const mongoose = require('mongoose');
const Aluno = require('../src/models/aluno');
const Escola = require('../src/models/escola');
const CargaHoraria = require('../src/models/cargaHoraria');
const Disciplina = require('../src/models/disciplina');
const Matricula = require('../src/models/matricula');
const MatriculaSuporteEducacional = require('../src/models/matriculaSuporteEducacional');

// 1. Média de Aulas Atribuídas por Aluno em Cada Escola
const mediaAulasPorAluno = async () => {
    return await Escola.aggregate([
        {
            $lookup: {
                from: 'matriculas',
                localField: 'CODESC',
                foreignField: 'CD_ESCOLA',
                as: 'matriculas'
            }
        },
        {
            $lookup: {
                from: 'cargahorarias',
                localField: 'CODESC',
                foreignField: 'CODESC',
                as: 'cargaHorarias'
            }
        },
        {
            $project: {
                NOMEESC: 1,
                total_alunos: { $size: '$matriculas' },
                total_aulas_atribuidas: { $sum: '$cargaHorarias.TOT_GERAL_AULA' },
                media_aulas_por_aluno: {
                    $divide: [
                        { $sum: '$cargaHorarias.TOT_GERAL_AULA' },
                        { $size: '$matriculas' }
                    ]
                }
            }
        },
        {
            $match: {
                total_alunos: { $gt: 50 }
            }
        },
        {
            $sort: { media_aulas_por_aluno: -1 }
        },
        { $limit: 10 }
    ]);
};

// 2. Aulas Noturnas por Aluno no Turno Noturno
const aulasNoturnasPorAluno = async () => {
    return await Escola.aggregate([
        {
            $lookup: {
                from: 'matriculas',
                localField: 'CODESC',
                foreignField: 'CD_ESCOLA',
                as: 'matriculas'
            }
        },
        {
            $lookup: {
                from: 'cargahorarias',
                localField: 'CODESC',
                foreignField: 'CODESC',
                as: 'cargaHorarias'
            }
        },
        {
            $project: {
                NOMEESC: 1,
                alunos_noturno: {
                    $size: {
                        $filter: {
                            input: '$matriculas',
                            as: 'matricula',
                            cond: { $eq: ['$$matricula.TURNO', '5'] }
                        }
                    }
                },
                aulas_atribuidas_noturno: {
                    $sum: {
                        $filter: {
                            input: '$cargaHorarias',
                            as: 'carga',
                            cond: { $eq: ['$$carga.TURNO', '5'] }
                        }
                    }
                },
                aulas_por_aluno_noturno: {
                    $divide: [
                        {
                            $sum: {
                                $filter: {
                                    input: '$cargaHorarias',
                                    as: 'carga',
                                    cond: { $eq: ['$$carga.TURNO', '5'] }
                                }
                            }
                        },
                        {
                            $size: {
                                $filter: {
                                    input: '$matriculas',
                                    as: 'matricula',
                                    cond: { $eq: ['$$matricula.TURNO', '5'] }
                                }
                            }
                        }
                    ]
                }
            }
        },
        {
            $match: {
                alunos_noturno: { $gt: 10 }
            }
        },
        {
            $sort: { aulas_por_aluno_noturno: -1 }
        },
        { $limit: 10 }
    ]);
};

// 3. Distribuição de Aulas por disciplinas
const distribuicaoAulasPorDisciplinas = async () => {
    return await Disciplina.aggregate([
        {
            $lookup: {
                from: 'cargahorarias',
                localField: 'CODMAE',
                foreignField: 'CODMAE',
                as: 'cargaHorarias'
            }
        },
        {
            $project: {
                disciplina: '$DEN_CODMAE',
                materia: '$DEN_MATERIA',
                total_atribuicoes: { $size: '$cargaHorarias' }
            }
        },
        { $sort: { total_atribuicoes: -1 } }
    ]);
};

// 4. Escolas com Maior Número de Matrículas de Alunos com Mobilidade Reduzida
const escolasComMobilidadeReduzida = async () => {
    return await Escola.aggregate([
        {
            $lookup: {
                from: 'matriculas',
                localField: 'CODESC',
                foreignField: 'CD_ESCOLA',
                as: 'matriculas'
            }
        },
        {
            $lookup: {
                from: 'matriculasuporteeducacionals',
                localField: 'CODESC',
                foreignField: 'ID',
                as: 'suporteEducacional'
            }
        },
        {
            $project: {
                NOMEESC: 1,
                total_mobilidade_reduzida: {
                    $size: {
                        $filter: {
                            input: '$suporteEducacional',
                            as: 'suporte',
                            cond: { $eq: ['$$suporte.FLAG_MORIL_REDUZ', true] }
                        }
                    }
                }
            }
        },
        { $sort: { total_mobilidade_reduzida: -1 } },
        { $limit: 10 }
    ]);
};

// 5. Top 10 Disciplinas com Maior Número de Aulas Atribuídas
const topDisciplinasComMaisAulas = async () => {
    return await Disciplina.aggregate([
        {
            $lookup: {
                from: 'cargahorarias',
                localField: 'CODMAE',
                foreignField: 'CODMAE',
                as: 'cargaHorarias'
            }
        },
        {
            $project: {
                materia: '$DEN_MATERIA',
                total_aulas: { $sum: '$cargaHorarias.TOT_GERAL_AULA' }
            }
        },
        { $sort: { total_aulas: -1 } },
        { $limit: 10 }
    ]);
};

module.exports = {
    mediaAulasPorAluno,
    aulasNoturnasPorAluno,
    distribuicaoAulasPorDisciplinas,
    escolasComMobilidadeReduzida,
    topDisciplinasComMaisAulas
};