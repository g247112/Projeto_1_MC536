import csv
import json
import random
import string

def gerar_id():
    """Gera um ID único com até 15 dígitos"""
    return ''.join(random.choices(string.digits, k=15))

def csv_para_json(arquivo_csv, arquivo_json):
    """
    Converte arquivo CSV para JSON adicionando campo ID
    """
    dados = []
    
    try:
        # Lê o arquivo CSV
        with open(arquivo_csv, 'r', encoding='utf-8') as file:
            csv_reader = csv.DictReader(file)
            
            for linha in csv_reader:
                # Adiciona o campo ID no início de cada registro
                registro = {'id': gerar_id()}
                
                # Adiciona os outros campos do CSV
                for campo, valor in linha.items():
                    registro[campo] = valor
                
                dados.append(registro)
        
        # Escreve o arquivo JSON
        with open(arquivo_json, 'w', encoding='utf-8') as file:
            json.dump(dados, file, indent=2, ensure_ascii=False)
        
        print(f"Conversão concluída! {len(dados)} registros convertidos.")
        print(f"Arquivo JSON criado: {arquivo_json}")
        
    except FileNotFoundError:
        print(f"Erro: Arquivo {arquivo_csv} não encontrado.")
    except Exception as e:
        print(f"Erro durante a conversão: {e}")

def main():
    # Nome dos arquivos
    arquivo_csv = 'csv_to_json_29jun/Turma.csv'
    arquivo_json = 'Turma.json'
    
    # Realiza a conversão
    csv_para_json(arquivo_csv, arquivo_json)
    
    # Mostra uma prévia do resultado
    try:
        with open(arquivo_json, 'r', encoding='utf-8') as file:
            dados = json.load(file)
            
        print("\n--- Prévia dos primeiros 3 registros ---")
        for i, registro in enumerate(dados[:3]):
            print(f"\nRegistro {i+1}:")
            for chave, valor in registro.items():
                print(f"  {chave}: {valor}")
                
    except Exception as e:
        print(f"Erro ao mostrar prévia: {e}")

if __name__ == "__main__":
    main()