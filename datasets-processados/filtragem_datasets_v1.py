import pandas as pd

# Carregando os datasets originais
dataset_carga = pd.read_csv('[BASE_CARGA_HOR_SALA_AULA_1124].csv', sep=';', encoding='latin1', on_bad_lines='skip', dtype=str)
dataset_matricula = pd.read_csv('matricula_sp.csv', sep=';', encoding='latin1', on_bad_lines='skip', dtype=str)

# Renomeando coluna Regiao do dataset_carga
dataset_carga.rename(columns={
    'ï»¿REGIAO': 'REGIAO'
}, inplace=True)

# Removendo espaços extras dos valores da coluna NM_MUNICIPIO
if 'NM_MUNICIPIO' in dataset_carga.columns:
    dataset_carga['NM_MUNICIPIO'] = dataset_carga['NM_MUNICIPIO'].str.strip()

# Selecionando apenas as colunas desejadas dos dois datasets
colunas_desejadas_carga = [
    'REGIAO', 'NOMEDE', 'CD_INEP', 'CODESC', 'CATESC', 'TPESC', 'UA', 'NOMEESC',
    'NM_MUNICIPIO', 'MODAL', 'id_interno', 'CARGO_C', 'NM_CARGOC', 'CODMAE', 'DEN_CODMAE',
    'DEN_CICLO', 'MATERIA', 'DEN_MATERIA', 'TOT_AULA_LIVRE', 'TOT_AULA_SUBST',
    'TOT_GERAL_AULA', 'TOT_AULA_LIVRE_NOTURNO', 'TOT_AULA_SUBST_NOTURNO',
    'TOT_AULAS_NOTURNO', 'JORNADA'
]
colunas_desejadas_matricula = [
    'IDADE', 'SEXO', 'CORRACA', 'NACIONALIDADE', 'MUNICIPIO_NASCIMENTO', 'UF_MUN_NASC',
    'CODESCMEC', 'NOMESC', 'TIPOESC', 'NOMEDEP', 'DE', 'MUN', 'DISTR', 'BAIRRO',
    'CIDADE', 'SIGLA_END_UF', 'END_ZONA'
]

# Datasets apos a filtragem das colunas desejadas
dataset_carga = dataset_carga[colunas_desejadas_carga]
dataset_matricula = dataset_matricula[colunas_desejadas_matricula]

# Salvando os novos datasets
dataset_carga.to_csv('carga_horaria_filtrado.csv', index=False, sep=';', encoding='latin1')
dataset_matricula.to_csv('matricula_sp_filtrado.csv', index=False, sep=';', encoding='latin1')

print("Datasets filtrados!!")