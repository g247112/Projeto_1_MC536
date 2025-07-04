# **MC536: Projeto 1 - Educação: garantir uma educação de qualidade, inclusiva e equitativa, promovendo oportunidades de aprendizagem para todos**


## **Overview do Projeto**

**Grupo**: 16

**Nomes**:
   
    Gabriel Jeronimo da Silva | RA: 247112 
    George de Lima Sá | RA: 231529 
    Matheus Rufino da Silva | RA: 221756

**Objetivo de Desenvolvimento Sustentável**: O projeto busca analisar a relação entre a carga horária dos professores e a qualidade da educação, considerando matrículas e distribuição docente. Garantir uma educação de qualidade, inclusiva e equitativa, promovendo oportunidades de aprendizagem para todos, conforme o ODS 4 da ONU.

## **Datasets**

1. Microdados de Matrícula - SP (https://dados.educacao.sp.gov.br/dataset/microdados-de-matr%C3%ADcula-sp)
2. Carga Horária por Docente - SP (https://dados.educacao.sp.gov.br/dataset/carga-hor%C3%A1ria-por-docente)
   
Nos respectivos sites, vocês encontraram vários exemplos de datasets de diferentes datas.

Nos arquivos filtragem_datasets e unindo_data sets fazemos o ajuste e junção dos arquivos CSVs para manipulação e consultas. 
No link do drive a seguir, temos o link para uma pasta contendo os datasets já filtrados. Não subimos no git por conta do limite de memória. 

Link Drive: https://drive.google.com/drive/folders/1i8tXeV83DUn-YHogrlxk9sByqUVlE-o0?usp=sharing


**OBS**: Por conta do tamanho dos Datasets (alguns passando de 10GB de memória), o grupo optou por pegar um em específico, diminuir o número de linhas para ficar com um tamanho compatível e adaptá-lo. 


## **Modelo Conceitual**
Na imagem a seguir, é possível olhar o modelo conceitual adotado.

![Modelo Conceitual](modelo-conceitual/modelo_conceitual.drawio.png)

## **Modelo Relacional**
Na imagem a seguir, é possível olhar o modelo relacional adotado.

![Modelo Relacional](modelo-relacional/Modelo_Relacional_imagem.png)

## **Modelo Físico**
Se encontra na pasta Modelo Físico.

## **Consultas Não Triviais**
As 5 consultas não triviais realizadas foram:
1. Média de Aulas Atribuídas por Aluno em cada Escola:

```sql
SELECT 
    e.NOMEESC,
    COUNT(m.CD_ALUNO_ANONIMIZADO) AS total_alunos,
    SUM(ch.TOT_GERAL_AULA) AS total_aulas_atribuidas,
    ROUND(SUM(ch.TOT_GERAL_AULA) * 1.0 / COUNT(m.CD_ALUNO_ANONIMIZADO), 2) AS media_aulas_por_aluno
FROM CargaHoraria ch
JOIN Escola e ON ch.CODESC = e.CODESC
JOIN Matricula m ON m.CD_ESCOLA = e.CODESC
GROUP BY e.NOMEESC
HAVING COUNT(m.CD_ALUNO_ANONIMIZADO) > 50
ORDER BY media_aulas_por_aluno DESC
LIMIT 10;
```
![image](https://github.com/user-attachments/assets/e6adbff9-aff5-4c3f-a34c-a248e198538a)


2. Aulas Noturnas por Aluno no Turno Noturno:

```sql
SELECT 
    e.NOMEESC,
    COUNT(*) FILTER (WHERE m.TURNO = '5') AS alunos_noturno,
    SUM(ch.TOT_AULAS_NOTURNO) AS aulas_atribuidas_noturno,
    ROUND(SUM(ch.TOT_AULAS_NOTURNO) * 1.0 / NULLIF(COUNT(*) FILTER (WHERE m.TURNO = '5'), 0), 2) AS aulas_por_aluno_noturno
FROM Matricula m
JOIN Escola e ON m.CD_ESCOLA = e.CODESC
JOIN CargaHoraria ch ON ch.CODESC = e.CODESC
GROUP BY e.NOMEESC
HAVING COUNT(*) FILTER (WHERE m.TURNO = '5') > 10
ORDER BY aulas_por_aluno_noturno DESC
LIMIT 10;
```
![image](https://github.com/user-attachments/assets/e51ffd9c-b07e-4121-9023-6e175eb4c74c)


3. Distribuição de Aulas por disciplinas:

```sql
SELECT 
    d.DEN_CODMAE AS disciplina,
    d.DEN_MATERIA AS materia,
    COUNT(ch.ID) AS total_atribuicoes
FROM 
    Disciplina d
    LEFT JOIN CargaHoraria ch ON ch.CODMAE = d.CODMAE
GROUP BY 
    d.DEN_CODMAE, d.DEN_MATERIA
ORDER BY 
    total_atribuicoes DESC;
```


4. Escolas com Maior Número de Matrículas de Alunos com Mobilidade Reduzida:

```sql
SELECT 
    e.NOMEESC,   
    COUNT(*) AS total_mobilidade_reduzida
FROM Matricula m
JOIN Escola e ON m.CD_ESCOLA = e.CODESC
JOIN MatriculaSuporteEducacional mse ON mse.ID = m.ID
WHERE mse.FLAG_MORIL_REDUZ = TRUE
GROUP BY e.NOMEESC
ORDER BY total_mobilidade_reduzida DESC
LIMIT 10;
```
![image](https://github.com/user-attachments/assets/018a1197-65b7-44ec-839e-1253e96b4cbf)

5. Top 10 Disciplinas com Maior Número de Aulas Atribuídas:

```sql
SELECT 
    d.DEN_MATERIA,
    SUM(ch.TOT_GERAL_AULA) AS total_aulas
FROM CargaHoraria ch
JOIN Disciplina d ON ch.CODMAE = d.CODMAE
GROUP BY d.DEN_MATERIA
ORDER BY total_aulas DESC
LIMIT 10;
```

![image](https://github.com/user-attachments/assets/36dae9fc-8fd9-4d65-98b0-97c3df86a8aa)


Elas se encontram nos códigos nas pastas Modelo Físico e Implementação Python.

## **Implementação em Python**
Se encontra na pasta Implementação Python.

Este script foi elaborado para demonstrar o uso do SQLAlchemy como ORM: ele define as tabelas e relacionamentos do banco (como Escola, Aluno, CargaHoraria etc.), cria o esquema com Base.metadata.create_all(), importa dados de um arquivo CSV via pandas e popula cada modelo, e por fim executa consultas SQL (média de aulas por aluno, aulas noturnas, totais por modalidade, entre outras). É um exercício de estudo, sujeito a simplificações e que pode precisar de ajustes para uso em cenários reais.
