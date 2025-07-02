**Nomes**:
   
    Gabriel Jeronimo da Silva | RA: 247112 
    George de Lima Sá | RA: 231529 
    Matheus Rufino da Silva | RA: 221756

### Justificativa Projeto 2
Para o cenário B, decidimos utilizar o MongoDB, que é um banco de dados orientado documentos, armazenando dados semiestruturados com esquemas dinâmicos, alta concorrência de leitura/gravação e escalabilidade horizontal

## 📋 Forma de Armazenamento de Arquivos
No MongoDB, utiliza-se documentos BSON(Binary Json), que através do armazenamento de coleções, permite a inserção de novos campos sem alterações no esquema. Além disso, os dados semi-estruturados que estão no nosso modelo físico terá grande flexibilidade no seu armazenamento dentro no MongoDB.

## 📝 Linguagem e Processamento de Consulta
O MongoDB tem linguagem baseada em JSON que permite manipulações eficientes das entidades. A MQL, com sua sintaxe semelhante ao JSON, aliada ao Aggregation Framework — que permite montar pipelines declarativos desde filtros ($match) até junções ($lookup) e agregações ou projeções ($group, $project). Para as consultas, elas devem ser feitas sobre os documentos sempre mantendo, assim, a sua eficiência. Com ele, conseguimos combinar dados de várias coleções (alunos, matrículas e carga horária) em uma única operação, diminuindo drasticamente o número de chamadas ao servidor, reduzindo a latência e simplificando bastante o código.

## 🚀 Processamento e Controle de Transações
Esse tipo de banco de dados foi projetado para uma alta escalabilidade horizontal. Através do sharding, o MongoDB permite dividir os dados em outros servidores para garantir, dessa forma, um enorme volume de dados. Além disso, o MongoBG também consegue distribuir as operações de leitura e escrita nos seus servidores com o intuito de reduzir a sua latência. Por fim, esse banco também é projetado para as operações CRUD, garantindo uma baixa latência.

## 🔐 Mecanismos de Recuperação e Segurança
Possui mecanismos de backups e recuperação via point-in-time. Ademais, o controle de acesso é baseado em funções. Em caso de queda abrupta, é usado para refazer ou reverter operações pendentes, assegurando integridade. Adicionalmente, o uso de replica sets — que mantêm um oplog de todas as operações — garante failover automático: se o nó primário cair, um secundário assume sem perdas perceptíveis de serviço. Para backups, podemos empregar tanto ferramentas nativas como quanto soluções de snapshot e backup incremental. Em relação a segurança, o MongoDB protege seus dados em várias camadas: cada usuário precisa fazer login antes de acessar qualquer coisa; depois, você pode dar a cada pessoa apenas as permissões que ela realmente precisa. Toda comunicação com o banco é criptografada para que ninguém “espione” os dados enquanto eles viajam pela rede, e os arquivos guardados também podem ficar criptografados no servidor. Para completar, o Mongo registra quem fez o quê, criando um histórico de acessos e mudanças para garantir que tudo seja rastreável

## 🤝 Sobre o Projeto
Estamos desenvolvendo um sistema de gestão escolar que armazena dados semi-estruturados (alunos, matrículas, carga horária, disciplinas, turmas e suporte educacional) num banco de documentos flexível. Em vez de tabelas rígidas, usamos coleções JSON no MongoDB, o que nos permite adicionar novos campos ou atributos sem necessidade de migrações.

## Consultas Não Triviais (Mesmas do Projeto 1)
1. Média de Aulas Atribuídas por Aluno em cada Escola
2. Aulas Noturnas por Aluno no Turno Noturno
3. Distribuição de Aulas por disciplinas
4. Escolas com Maior Número de Matrículas de Alunos com Mobilidade Reduzida
5. Top 10 Disciplinas com Maior Número de Aulas Atribuídas

### ⚠️ Principais Falhas e Problemas
Nossa maior dificuldade decorreu da própria qualidade e dimensão da fonte de dados. A base é volumosa demais para consultas sem pré-filtragem, o que faz cada pipeline vasculhar milhões de documentos antes de produzir um resultado mínimo. Além disso, o esquema está longe de ser uniforme: campos numéricos às vezes vêm como strings vazias ou nulas, alguns documentos trazem atributos extras que nem sempre existem nos demais, e o relacionamento entre coleções nem sempre segue o mesmo padrão de chave (há variações em CD_ESCOLA, CODESC, CD_ESCOLA_ANONIMIZADO). Essa heterogeneidade obriga cada estágio de agregação a lidar com conversões e filtros adicionais, impactando severamente a performance e, em casos extremos, provocando timeouts ou uso excessivo de memória no Compass. Somam-se ainda inconsistências pontuais, como escolas duplicadas e turmas referenciadas de forma ambígua, que poluem o resultado final e geram duplicatas ou lacunas nas análises.

### 🔍 Como prosseguir?
Para entender e mitigar essas falhas, é útil adotar uma abordagem iterativa: comece testando pequenos subconjuntos dos dados, avalie rapidamente formatos e tipos de campo, e verifique padrões de inconsistência. Use ferramentas integradas de inspeção de esquema para identificar quais atributos aparecem de forma irregular. Em seguida, empregue filtros iniciais ou amostragens para reduzir o volume, observe como isso afeta o desempenho e vá ajustando seu pipeline de agregação. Paralelamente, garanta que existam índices adequados nos campos mais críticos e ative opções de uso de disco e tempo de execução no seu ambiente de consulta. Dessa forma, você consegue isolar as causas dos gargalos antes de aplicar suas rotinas a toda a base.

Com isso, geramos um modelo base para testar as consultas não-triviais

![Modelo Base](Projeto-2-VF/justificativa.md)