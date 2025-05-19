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

# Salvando os novos datasets
dataset_carga.to_csv('carga_horaria_filtrado.csv', index=False, sep=';', encoding='latin1')
dataset_matricula.to_csv('matricula_sp_filtrado.csv', index=False, sep=';', encoding='latin1')

print("Datasets filtrados!!")