from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Boolean, text, Date 
from sqlalchemy.orm import relationship, sessionmaker, declarative_base
import pandas as pd

username = ""
senha = ""
host = "localhost"
nome_banco = "carga_horaria_escola"

string_conecta = f"postgresql://{username}:{senha}@{host}/{nome_banco}"

engine = create_engine(string_conecta)
Base = declarative_base()

# Criando Tabelas e Relacionamentos

class Endereco(Base):
    __tablename__ = 'enderecos'
    id = Column(Integer, primary_key=True)
    mun = Column(String(255))
    distr = Column(String(255))
    bairro = Column(String(255))
    cidade = Column(String(255))
    sigla_end_uf = Column(String(2))
    end_zona = Column(String(50))
    escolas = relationship('Escola', back_populates='endereco')  

class Cargo(Base):
    __tablename__ = 'cargos'
    cargo_c = Column(Integer, primary_key=True)
    nm_cargoc = Column(String(255))
    carga_horarias = relationship('CargaHoraria', back_populates='cargo')  

class Disciplina(Base):
    __tablename__ = 'disciplinas'
    codmae = Column(Integer, primary_key=True)
    den_codmae = Column(String(255))
    materia = Column(Integer)
    den_materia = Column(String(255))
    carga_horarias = relationship('CargaHoraria', back_populates='disciplina')  

class UnidadeAdministrativa(Base):
    __tablename__ = 'unidade_administrativa'
    ua = Column(Integer, primary_key=True)
    nomede = Column(String(255))
    escolas = relationship('Escola', back_populates='unidade_administrativa')  

class CargaHoraria(Base):
    __tablename__ = 'carga_horaria'
    id = Column(Integer, primary_key=True)
    ciclo = Column(String(10))
    modal = Column(String(100))
    di = Column(Integer)
    jornada = Column(Integer)
    codesc = Column(Integer, ForeignKey('escolas.codesc'))
    cargo_c = Column(Integer, ForeignKey('cargos.cargo_c'))
    codmae = Column(Integer, ForeignKey('disciplinas.codmae'))
    cargo = relationship('cargo', back_populates='carga_horarias')  

class DetalheCargaHoraria(Base):
    __tablename__ = 'detalhe_carga_horaria'
    id = Column(Integer, primary_key=True)
    tot_aula_livre = Column(Integer)
    tot_aula_subst = Column(Integer)
    tot_geral_aula = Column(Integer)
    tot_aula_livre_noturno = Column(Integer)
    tot_aula_subst_noturno = Column(Integer)
    tot_aulas_noturno = Column(Integer)
    carga_horaria_id = Column(Integer, ForeignKey('carga_horaria.id'))
    carga_horaria = relationship('CargaHoraria', back_populates='detalhe_carga_horaria') 

class Escola(Base):
    __tablename__ = 'escola'
    codesc = Column(Integer, primary_key=True)  
    cd_inep = Column(Integer)  
    nomeesc = Column(String(255))  
    catesc = Column(Integer)  
    tpesc = Column(String(100))  
    regiao = Column(String(100))  
    ua = Column(Integer, ForeignKey('unidade_administrativa.ua')) 
    endereco_id = Column(Integer, ForeignKey('enderecos.id'))  

    unidade_administrativa = relationship('UnidadeAdministrativa', back_populates='escolas')  
    endereco = relationship('Endereco', back_populates='escolas')  

class MatriculaResultado(Base):
    __tablename__ = 'matricula_resultado'
    id = Column(Integer, primary_key=True) 
    pronatec = Column(Boolean)  
    rendimento = Column(String(100))  

class MatriculaTurma(Base):
    __tablename__ = 'matricula_turma'
    id = Column(Integer, primary_key=True)  
    ds_turma = Column(String(255))  
    tipoclasse = Column(String(100))  
    grau = Column(String(50))  
    serie = Column(String(50))  
    turno = Column(String(50))  
    durclasse = Column(String(50))  
    matricula_id = Column(Integer, ForeignKey('matricula_resultado.id'))  
    matricula = relationship('MatriculaResultado', back_populates='turmas')  

class Matricula(Base):
    __tablename__ = 'matricula'
    id = Column(Integer, primary_key=True)  
    cd_aluno_anonimizado = Column(String(50), ForeignKey('aluno.cd_aluno_anonimizado')) 
    cd_escola = Column(Integer, ForeignKey('escola.codesc'))  
    cd_turma = Column(String(50))  
    dt_matric = Column(Date)  
    dtini_matric = Column(Date)  
    dtfim_matric = Column(Date)  
    flag_sit_aluno = Column(String(100))  
    aluno = relationship('Aluno', back_populates='matriculas') 
    escola = relationship('Escola', back_populates='matriculas') 

class MatriculaInclusaoSocial(Base):
    __tablename__ = 'matricula_inclusao_social'
    id = Column(Integer, primary_key=True)  
    flag_bolsa_fam = Column(Boolean)  
    flag_quilombo = Column(Boolean)  
    matricula_id = Column(Integer, ForeignKey('matricula.id')) 
    matricula = relationship('Matricula', back_populates='inclusao_social')  

class Aluno(Base):
    __tablename__ = 'aluno'
    cd_aluno_anonimizado = Column(String(50), primary_key=True)  
    idade = Column(Integer)  
    sexo = Column(String(1))  
    corraca = Column(String(50))  
    nacional = Column(String(100))  
    municipio_nascimento = Column(String(255))  
    uf_mun_nasc = Column(String(2))  
    matriculas = relationship('Matricula', back_populates='aluno') 

class MatriculaSuporteEducacional(Base):
    __tablename__ = 'matricula_suporte_educacional'
    id = Column(Integer, primary_key=True)  
    flag_moril_reduz = Column(Boolean)  
    tipo_mobil_reduz = Column(String(100))  
    flag_cuidador = Column(Boolean)  
    tipo_cuidador = Column(String(100))  
    flag_prof_saude = Column(Boolean)  
    tipo_prof_saude = Column(String(100))  
    id_aux_lei = Column(Boolean) 
    id_fonte = Column(Boolean)  
    id_aux_trans = Column(Boolean)  
    id_guia_interpr = Column(Boolean)  
    id_comp_leitor_tela = Column(Boolean)  
    id_interpr_libras = Column(Boolean)  
    id_lei_lab = Column(Boolean)  
    id_prova_ampl = Column(Boolean)  
    id_prova_braile = Column(Boolean)  
    id_sem_neces_rec = Column(Boolean)  
    id_vence = Column(Boolean)  
    matricula_id = Column(Integer, ForeignKey('matricula.id'))  
    matricula = relationship('Matricula', back_populates='suporte_educacional')  


# Populando o banco de dados 

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

# Ler dados do CSV do dataset final após a filtragem
df = pd.read_csv('dataset_final.csv')

# Populando cada linha a partir de cada variável

for index, row in df.iterrows():
    endereco = Endereco(
        mun=row['mun'],
        distr=row['distr'],
        bairro=row['bairro'],
        cidade=row['cidade'],
        sigla_end_uf=row['sigla_end_uf'],
        end_zona=row['end_zona']
    )
    session.add(endereco)

    cargo = Cargo(
        cargo_c=row['cargo_c'],
        nm_cargoc=row['nm_cargoc']
    )
    session.add(cargo)

    disciplina = Disciplina(
        codmae=row['codmae'],
        den_codmae=row['den_codmae'],
        materia=row['materia'],
        den_materia=row['den_materia']
    )
    session.add(disciplina)

    unidade_administrativa = UnidadeAdministrativa(
        ua=row['ua'],
        nomede=row['nomede']
    )
    session.add(unidade_administrativa)

    carga_horaria = CargaHoraria(
        ciclo=row['ciclo'],
        modal=row['modal'],
        di=row['di'],
        jornada=row['jornada'],
        codesc=row['codesc'],
        cargo_c=row['cargo_c'],
        codmae=row['codmae']
    )
    session.add(carga_horaria)

    detalhe_carga_horaria = DetalheCargaHoraria(
        tot_aula_livre=row['tot_aula_livre'],
        tot_aula_subst=row['tot_aula_subst'],
        tot_geral_aula=row['tot_geral_aula'],
        tot_aula_livre_noturno=row['tot_aula_livre_noturno'],
        tot_aula_subst_noturno=row['tot_aula_subst_noturno'],
        tot_aulas_noturno=row['tot_aulas_noturno'],
        carga_horaria_id=row['carga_horaria_id']
    )
    session.add(detalhe_carga_horaria)

    escola = Escola(
        codesc=row['codesc'],
        cd_inep=row['cd_inep'],
        nomeesc=row['nomeesc'],
        catesc=row['catesc'],
        tpesc=row['tpesc'],
        regiao=row['regiao'],
        ua=row['ua'],
        endereco_id=row['endereco_id']
    )
    session.add(escola)

    matricula_resultado = MatriculaResultado(
        id=row['matricula_resultado_id'],
        pronatec=row['pronatec'],
        rendimento=row['rendimento']
    )
    session.add(matricula_resultado)

    matricula_turma = MatriculaTurma(
        id=row['matricula_turma_id'],
        ds_turma=row['ds_turma'],
        tipoclasse=row['tipoclasse'],
        grau=row['grau'],
        serie=row['serie'],
        turno=row['turno'],
        durclasse=row['durclasse'],
        matricula_id=row['matricula_id']
    )
    session.add(matricula_turma)

    matricula = Matricula(
        id=row['matricula_id'],
        cd_aluno_anonimizado=row['cd_aluno_anonimizado'],
        cd_escola=row['cd_escola'],
        cd_turma=row['cd_turma'],
        dt_matric=row['dt_matric'],
        dtini_matric=row['dtini_matric'],
        dtfim_matric=row['dtfim_matric'],
        flag_sit_aluno=row['flag_sit_aluno']
    )
    session.add(matricula)

    matricula_inclusao_social = MatriculaInclusaoSocial(
        id=row['matricula_inclusao_social_id'],
        flag_bolsa_fam=row['flag_bolsa_fam'],
        flag_quilombo=row['flag_quilombo'],
        def1=row['def1'],
        def2=row['def2'],
        def3=row['def3'],
        def4=row['def4'],
        def5=row['def5'],
        def6=row['def6'],
        def7=row['def7'],
        def8=row['def8'],
        def9=row['def9'],
        def10=row['def10'],
        matricula_id=row['matricula_id']
    )
    session.add(matricula_inclusao_social)

    aluno = Aluno(
        cd_aluno_anonimizado=row['cd_aluno_anonimizado'],
        idade=row['idade'],
        sexo=row['sexo'],
        corraca=row['corraca'],
        nacional=row['nacional'],
        municipio_nascimento=row['municipio_nascimento'],
        uf_mun_nasc=row['uf_mun_nasc']
    )
    session.add(aluno)

    matricula_suporte_educacional = MatriculaSuporteEducacional(
        id=row['matricula_suporte_educacional_id'],
        flag_moril_reduz=row['flag_moril_reduz'],
        tipo_mobil_reduz=row['tipo_mobil_reduz'],
        flag_cuidador=row['flag_cuidador'],
        tipo_cuidador=row['tipo_cuidador'],
        flag_prof_saude=row['flag_prof_saude'],
        tipo_prof_saude=row['tipo_prof_saude'],
        id_aux_lei=row['id_aux_lei'],
        id_fonte=row['id_fonte'],
        id_aux_trans=row['id_aux_trans'],
        id_guia_interpr=row['id_guia_interpr'],
        id_comp_leitor_tela=row['id_comp_leitor_tela'],
        id_interpr_libras=row['id_interpr_libras'],
        id_lei_lab=row['id_lei_lab'],
        id_prova_ampl=row['id_prova_ampl'],
        id_prova_braile=row['id_prova_braile'],
        id_sem_neces_rec=row['id_sem_neces_rec'],
        id_vence=row['id_vence'],
        matricula_id=row['matricula_id']
    )
    session.add(matricula_suporte_educacional)

# Commit 
try:
    session.commit()
except Exception as e:
    session.rollback()
    print(f"Erro ao inserir dados: {e}")
finally:
    session.close()

# Fazendo as consultas

# 1. Média de Aulas Atribuídas por Aluno em Cada Escola
with engine.connect() as conn:
    resultado = conn.execute(text('''
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
    '''))
    for linha in resultado:
        print(linha)

# 2. Aulas Noturnas por Aluno no Turno Noturno
with engine.connect() as conn:
    resultado = conn.execute(text('''
        SELECT 
            e.NOMEESC,
            COUNT(*) FILTER (WHERE m.TURNO = 'Noturno') AS alunos_noturno,
            SUM(ch.TOT_AULAS_NOTURNO) AS aulas_atribuidas_noturno,
            ROUND(SUM(ch.TOT_AULAS_NOTURNO) * 1.0 / NULLIF(COUNT(*) FILTER (WHERE m.TURNO = 'Noturno'), 0), 2) AS aulas_por_aluno_noturno
        FROM Matricula m
        JOIN Escola e ON m.CD_ESCOLA = e.CODESC
        JOIN CargaHoraria ch ON ch.CODESC = e.CODESC
        GROUP BY e.NOMEESC
        HAVING COUNT(*) FILTER (WHERE m.TURNO = 'Noturno') > 10
        ORDER BY aulas_por_aluno_noturno DESC
        LIMIT 10;
    '''))
    for linha in resultado:
        print(linha)

# 3. Total de Aulas Atribuídas por Modalidade de Ensino e Ciclo
with engine.connect() as conn:
    resultado = conn.execute(text('''
        SELECT 
            ch.MODAL,
            ch.CICLO,
            SUM(ch.TOT_GERAL_AULA) AS total_aulas
        FROM CargaHoraria ch
        GROUP BY ch.MODAL, ch.CICLO
        ORDER BY total_aulas DESC;
    '''))
    for linha in resultado:
        print(linha)

# 4. Escolas com Maior Número de Matrículas de Alunos com Mobilidade Reduzida
with engine.connect() as conn:
    resultado = conn.execute(text('''
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
    '''))
    for linha in resultado:
        print(linha)

# 5. Top 10 Disciplinas com Maior Número de Aulas Atribuídas
with engine.connect() as conn:
    resultado = conn.execute(text('''
        SELECT 
            d.DEN_MATERIA,
            SUM(ch.TOT_GERAL_AULA) AS total_aulas
        FROM CargaHoraria ch
        JOIN Disciplina d ON ch.CODMAE = d.CODMAE
        GROUP BY d.DEN_MATERIA
        ORDER BY total_aulas DESC
        LIMIT 10;
    '''))
    for linha in resultado:
        print(linha)