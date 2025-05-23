import pandas as pd

# Carregando os dois datasets
dataset1 = pd.read_csv('Carga_Horaria.csv', sep=';')
dataset2 = pd.read_csv('Matricula.csv', sep=';', encoding='latin1', on_bad_lines='skip', low_memory=False)

# Realizando a junção dos datasets com base nas colunas CD_INEP e CODESCMEC
dataset_final = pd.merge(dataset1, dataset2, left_on='CD_INEP', right_on='CODESCMEC', how='inner')


dataset_final.to_csv('dataset_final.csv', index=False)

print("Datasets unidos!!")