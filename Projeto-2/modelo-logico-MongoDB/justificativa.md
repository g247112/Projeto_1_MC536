Para o cenário B, decidimos utilizar o MongoDB, que é um banco de dados orientado documentos.

### Forma de Armazenamento de Arquivos
No MongoDB, utiliza-se documentos BSON(Binary Json), que através do armazenamento de coleções, permite a inserção de novos campos sem alterações no esquema. Além disso, os dados semi-estruturados que estão no nosso modelo físico terá grande flexibilidade no seu armazenamento dentro no MongoDB.

### Linguagem e Processamento de Consulta
O MongoDB tem linguagem baseada em JSON que permite manipulações eficientes das entidades. Já para as consultas, elas devem ser feitas sobre os documentos sempre mantendo, assim, a sua eficiência.

### Processamento
Esse tipo de banco de dados foi projetado para uma alta escalabilidade horizontal. Através do sharding, o MongoDB permite dividir os dados em outros servidores para garantir, dessa forma, um enorme volume de dados. Além disso, o MongoBG também consegue distribuir as operações de leitura e escrita nos seus servidores com o intuito de reduzir a sua latência. Por fim, esse banco também é projetado para as operações CRUD, garantindo uma baixa latência.