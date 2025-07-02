import csv, json

with open('csv_to_json_29jun/Turma.csv', encoding='cp1252') as f_csv:
    leitor = csv.DictReader(f_csv)
    dados = list(leitor)

with open('Turma.json', 'w', encoding='utf-8') as f_json:
    json.dump(dados, f_json, ensure_ascii=False, indent=2)
