require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('./src/config/database');

// Importe todos os modelos
const UnidadeAdministrativa = require('./src/models/unidadeAdministrativa');
const Endereco = require('./src/models/endereco');
const Escola = require('./src/models/escola');
const Cargo = require('./src/models/cargo');
const Disciplina = require('./src/models/disciplina');
const CargaHoraria = require('./src/models/cargaHoraria');
const Aluno = require('./src/models/aluno');
const Matricula = require('./src/models/matricula');

// Função para verificar e criar coleções
const initializeDatabase = async () => {
    try {
        await connectDB();
        
        console.log('Verificando coleções existentes...');
        
        // Lista todas as coleções que devem existir no banco de dados
        const requiredCollections = [
            'unidadeadministrativas',
            'enderecos',
            'escolas',
            'cargos',
            'disciplinas',
            'cargahorarias',
            'alunos',
            'matriculas'
        ];
        
        // Verifica quais coleções já existem
        const collections = await mongoose.connection.db.listCollections().toArray();
        const existingCollections = collections.map(c => c.name);
        
        console.log('Coleções existentes:', existingCollections);
        
        // Identifica quais coleções precisam ser criadas
        const collectionsToCreate = requiredCollections.filter(c => !existingCollections.includes(c));
        
        if (collectionsToCreate.length === 0) {
            console.log('Todas as coleções já existem. Banco de dados pronto para uso.');
        } else {
            console.log('Criando as seguintes coleções:', collectionsToCreate);
            
            // Cria as coleções faltantes inserindo um documento temporário que será removido
            for (const collection of collectionsToCreate) {
                await mongoose.connection.db.createCollection(collection);
                console.log(`Coleção ${collection} criada com sucesso.`);
            }
            
            console.log('Inicialização do banco de dados concluída com sucesso.');
        }
        
    } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
    } finally {
        // Não feche a conexão aqui se quiser manter o servidor rodando
        // await mongoose.connection.close();
    }
};

// Execute a função de inicialização
initializeDatabase();