import pandas as pd

# Carregando os dois datasets
dataset1 = pd.read_csv('carga_horaria_filtrado.csv', sep=';')
dataset2 = pd.read_csv('matricula_sp_filtrado.csv', sep=';', encoding='latin1', on_bad_lines='skip')

# Realizando a junção dos datasets com base nas colunas CD_INEP e CODESCMEC
dataset_final = pd.merge(dataset1, dataset2, left_on='CD_INEP', right_on='CODESCMEC', how='inner')


dataset_final.to_csv('dataset_final.csv', index=False)

print("Datasets unidos!!")