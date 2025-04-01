# Vidalink

## A vidalink é uma plataforma de doação de sangue e órgãos feita durante a matéria de P.I de DevOps

## Pré-requisitos
* Docker instalado (Se estiver no linux, o compose também)
* Java JDK 21 (Linguagem do backend)
* Maven 3.9.8 (Gerencioador de projeto)

## Instalação ⚙️
### Docker:

Caso tu esteja no windows, vai no link:

    https://www.docker.com/products/docker-desktop/

Caso tu esteja no linux, vai nesse link, escolhe tuas distros e segue os passos:

    https://docs.docker.com/desktop/setup/install/linux/

E para o docker-compose, segue esses passos aqui:

    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose

E para testar o compose, tu roda:

    docker-compose --version


Feito isso, você pode rodar o comando no terminal para testar se a instalação foi feita como sucesso:

    docker run hello-world

### Java:

Para a instalação do java no windows vai nesse site, baixa e executa o exe:

    https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html

Para usuários linux, vai no terminal e roda:

    sudo apt update && sudo apt upgrade -y
    sudo apt install openjdk-21-jdk

### Maven

Para a instalação do maven no windows, tu vai nesse link:

    https://downloads.apache.org/maven/maven-3/3.9.8/binaries/

Aí tu vai fazer o seguinte pra ficar mais fácil:

* Descompacta pra disco C
* Vai nas variaveis de ambiente
* Vai na PATH
* Adiciona o caminho do maven na tua PATH

No linux tu vai rodar os comandos:

    sudo apt-get update
    sudo apt-get -y install maven

E para testar tu roda um:

    mvn -version

## Rodando o projeto

Pra rodar o projeto, tu vai precisar buildar o projeto com o maven, para que seja gerado um arquivo .jar na pasta <b>target/ </b>e depois rodar o docker compose:

    ./mvnw clean install
    docker-compose --profile test up

### OBS: Depois de "--profile" o profile vai de acordo com tua função nesse projeto

* Backend: test, dev, prod
* Frontend: test
* QA: test