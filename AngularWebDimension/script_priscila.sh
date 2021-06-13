#!/bin/bash
clear

BLUE="\e[34m"
BLUENUM="34"
BLUEBOLD="\e[1;${BLUENUM}m"
#BOLD p/DIMENSION
YELLOW="\e[33m"
#YELLOW p/ BOT ASSISTENTE
RED="\e[31m"
#RED = Docker, Java, IMG , Container installed
ENDC="\e[0m"

echo -e "${BLUE}'########::'####:'##::::'##:'########:'##::: ##::'######::'####::'#######::'##::: ##:${ENDC}"
echo -e "${BLUE} ##.... ##:. ##:: ###::'###: ##.....:: ###:: ##:'##... ##:. ##::'##.... ##: ###:: ##:${ENDC}"
echo -e "${BLUE} ##:::: ##:: ##:: ####'####: ##::::::: ####: ##: ##:::..::: ##:: ##:::: ##: ####: ##:${ENDC}"
echo -e "${BLUE} ##:::: ##:: ##:: ## ### ##: ######::: ## ## ##:. ######::: ##:: ##:::: ##: ## ## ##:${ENDC}"
echo -e "${BLUE} ##:::: ##:: ##:: ##. #: ##: ##...:::: ##. ####::..... ##:: ##:: ##:::: ##: ##. ####:${ENDC}"
echo -e "${BLUE} ##:::: ##:: ##:: ##:.:: ##: ##::::::: ##:. ###:'##::: ##:: ##:: ##:::: ##: ##:. ###:${ENDC}"
echo -e "${BLUE} ########::'####: ##:::: ##: ########: ##::. ##:. ######::'####:. #######:: ##::. ##:${ENDC}"
echo -e "${BLUE}........:::....::..:::::..::........::..::::..:::......:::....:::.......:::..::::..::${ENDC}"

echo -e "${YELLOW}[Dimension Bot]:${ENDC} Seja bem vindo à aplicação ${BLUEBOLD}Dimension${ENDC} ʕ•́ᴥ•̀ʔ"
echo -e "${YELLOW}[Dimension Bot]:${ENDC} Vamos inicializar a nossa configuração de ambiente..."

echo -e "${YELLOW}[Dimension Bot]:${ENDC} Verificando se o ${RED}Docker${ENDC} está instalado..."
docker -v
if [ $? -eq 0 ]
    then
        echo -e "${YELLOW}[Dimension Bot]:${ENDC} O ${RED}Docker${ENDC} já foi instalado. "
    else
        echo -e "${YELLOW}[Dimension Bot]:${ENDC} Não conseguimos encontrar o ${RED}Docker${ENDC} T.T "
        echo -e "${YELLOW}[Dimension Bot]:${ENDC} Gostaria de iniciar a instalação? :3 S/n "
        read inst
        if [ \"$inst\" == \"s\" ]
            then
                echo -e "${YELLOW}[Dimension Bot]:${ENDC} Iniciando a instalação do ${RED}Docker${ENDC}..."
                sleep 2
                sudo apt update && sudo apt install docker.io -y
                clear
                echo -e "${YELLOW}[Dimension Bot]:${ENDC} Instalação completa do ${RED}Docker${ENDC}! ${RED}♥${ENDC}"
                sleep 2
            else 
                echo -e "${YELLOW}[Dimension Bot]:${ENDC} Você escolheu não instalar... ó_ò"
                exit
        fi
fi   

echo -e "${YELLOW}[Dimension Bot]:${ENDC} Inicalizando o ${RED}Docker${ENDC}..."
sleep 2
sudo systemctl start docker
sudo systemctl enable docker

echo -e "${YELLOW}[Dimension Bot]:${ENDC} ${RED}Docker${ENDC} Iniciado!"

#clear

#Instalação da img MySQL
echo -e "${YELLOW}[Dimension Bot]:${ENDC} Instalação da imagem ${RED}MySQL${ENDC}"
echo -e "${YELLOW}[Dimension Bot]:${ENDC} Verificando se existe a imagem ${RED}MySQL${ENDC} instalado... \(^o^)/"
sleep 1

if [[ ! "$(sudo docker image inspect mysql:5.7)" ]]
    then
        echo -e "${YELLOW}[Dimension Bot]:${ENDC} Imagem do MySQL não foi instalado (>_<)"
        echo -e "${YELLOW}[Dimension Bot]:${ENDC} Gostaria de fazer a instalação ${RED}S/n${ENDC}"
        read inst
        if [ \"$inst\" == \"s\" ]
            then
            echo -e "${YELLOW}[Dimension Bot]:${ENDC}Iniciando a instalação do MySQL..."
            sleep 2
            sudo docker pull mysql:5.7

            echo -e "${YELLOW}[Dimension Bot]:${ENDC}Instalação completa do MySQL"
            sleep 2
        fi
    else
        echo -e "Imagem MySQL já instalado."
fi

#sleep2
#clear

#Configurando o Container MySQL
echo -e "${YELLOW}[Dimension Bot]:${ENDC} Configurando o container MySQL"
echo -e "${YELLOW}[Dimension Bot]:${ENDC} Conferindo se existe o container para MySQL"

if [[ ! "$(sudo docker ps -aqf "name=ContainerDimensionBD")" ]]
    then
        echo -e "${YELLOW}[Dimension Bot]:${ENDC} Não existe nenhum container... T-T"
        echo -e "${YELLOW}[Dimension Bot]:${ENDC} Gostaria de criar o Container? *3*??  ${RED}S/n${ENDC}"
        read inst
        if [ \"$inst\" == \"s\" ]
            then
            echo -e "${YELLOW}[Dimension Bot]:${ENDC} Iniciando a criação do ContainerDimensionBD..."
            sleep 2
            git clone https://github.com/P-Shoyo/Dimension.git
            cd Dimension
            cd mysql
            sudo docker build -t mysql . 
            cd ..
            cd ..            
            #permissão para que funcione o docker.sock - senão nega e da erro
            sudo chmod 666 /var/run/docker.sock
            docker run -d -p 3306:3306 --name ContainerDimensionBD -e "MYSQL_DATABASE=dimensionBD" -e "MYSQL_ROOT_PASSWORD=urubu100" mysql
            #sudo docker run -d -p 3306:3306 --name ContainerDimensionBD -e "MYSQL_DATABASE=dimensionBD" -e "MYSQL_ROOT_PASSWORD=urubu100" mysql:5.7
            
            echo -e "${YELLOW}[Dimension Bot]:${ENDC} Configuração completa do MySQL \o/ "
            sleep 2
        fi
    else
        echo -e "${YELLOW}[Dimension Bot]:${ENDC} Container MySQL já existe!"
        CONTID=$(sudo docker ps -aqf "name=ContainerDimensionBD")
        #sudo docker stop ${CONTID}
        sudo docker start ${CONTID}        
fi

sleep 2
#clear

#Instalação JAVA IMG -VERSION 11
echo -e "${YELLOW}[Dimension Bot]:${ENDC} Instalação da imagem ${RED}Java${ENDC}"
echo -e "${YELLOW}[Dimension Bot]:${ENDC} Verificando se existe a imagem ${RED}Java 11${ENDC} instalado..."
sleep 1

if [[ ! "$(sudo docker image inspect openjdk:11)" ]]
    then
        echo -e "${YELLOW}[Dimension Bot]:${ENDC} Não existe nenhuma imagem do Java 11..."
        echo -e "${YELLOW}[Dimension Bot]:${ENDC} Gostaria de instalar agora? S/n"
        read inst

        if [ \"$inst\" == \"s\" ]
            then
                echo -e "${YELLOW}[Dimension Bot]:${ENDC} Instalação da imagem do ${RED}Java 11${ENDC} será iniciado"
                sudo docker pull openjdk:11
                echo -e "${YELLOW}[Dimension Bot]:${ENDC} Imagem ${RED}Java 11${ENDC} instalado!"
            else
                echo -e "${YELLOW}[Dimension Bot]:${ENDC} Okay... Vamos parar a instalação T-T "
                exit
        fi
    else
        echo -e \"Imagem Java já foi instalada\"
fi

    
echo -e "${YELLOW}[Dimension Bot]:${ENDC} Verificando se Container ${RED}Java${ENDC} existe"
if [[ ! "$(sudo docker ps -aqf "name=java-jar")" ]]
    then
        echo -e "${YELLOW}[Dimension Bot]:${ENDC} O dimensionjava não existe"
        echo -e "${YELLOW}[Dimension Bot]:${ENDC} Inicializando a criação..."
        sleep 1
        cd Dimension/ApiMysql/target
        chmod 777 DimensionJar.jar
        sudo docker build -t dimensionjava .
        sudo docker run -d --name='java-jar' -t dimensionjava
        sudo docker cp DimensionJar.jar java-jar:/
        sudo docker exec -it java-jar java -jar DimensionJar.jar
        
    else
        CONTID=$(sudo docker ps -aqf "name=java-jar")
        sudo docker stop ${CONTID}
        sudo docker start ${CONTID}
        echo -e "${YELLOW}[Dimension Bot]:${ENDC} Container já existe, iniciando o Container..."
        cd Dimension/ApiMysql/target
        chmod 777 DimensionJar.jar
        sudo docker build -t dimensionjava .
        sudo docker cp DimensionJar.jar java-jar:/
        sudo docker exec -it java-jar java -jar DimensionJar.jar
fi

echo -e "${YELLOW}[Dimension Bot]:${ENDC} Obrigada por escolher a aplicação ${BLUEBOLD}Dimension${ENDC} ${RED}♥${ENDC}"

# this version made by: Priscila Choi
#        ...                                     .    
#     xH88"`~ .x8X      .uef^"                  @88>  
#   :8888   .f"8888Hf :d88E              u.     %8P   
#  :8888>  X8L  ^""`  `888E        ...ue888b     .    
#  X8888  X888h        888E .z8k   888R Y888r  .@88u  
#  88888  !88888.      888E~?888L  888R I888> ''888E` 
#  88888   %88888      888E  888E  888R I888>   888E  
#  88888 '> `8888>     888E  888E  888R I888>   888E  
#  `8888L %  ?888   !  888E  888E u8888cJ888    888E  
#   `8888  `-*""   /   888E  888E  "*888*P"     888&  
#     "888.      :"   m888N= 888>    'Y"        R888" 
#       `""***~"`      `Y"   888                 ""   
#                           J88"                      
#                           @%                        
#                         :"                          


#===================================================================
# Todos os direitos reservados para os autores: Grupo 10 - Dimension
# Sob licença Creative Commons @2021
# Poderá modificar e reproduzir para uso pessoal
# Proibida a comercialização e a exclusão da autoria
# Agradecimentos aos professores Dra. Profa. Marise Miranda e
# Prof. Márcio Santana
#===================================================================

#Extra commands:
# stop docker = sudo docker stop contianerID
# delete docker = sudo docker container rm containerID (container must be stopped first)
# remove all stopped containers = sudo docker container rm $(docker container ls -aq)
# Remove ALL dockers containers(clean container) = sudo docker container stop $(docker container ls -aq) && sudo docker system prune -af --volumes
# delete directory with file = rm -r nameDir (y y)
# delete file = rm filename
#comando de execução no bash do container = sudo docker exec -it  ${CONTID} bash