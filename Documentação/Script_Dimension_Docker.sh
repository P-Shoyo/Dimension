#  Instalação do Docker
echo \"Conferindo a versão do Docker\"
docker -v
if [ $? -eq 0 ]
then
echo \"Docker já instalado.\"
else
echo \"Docker não instalado\"
echo \"Gostaria de instalar o Docker? S/n \"
read inst
if [ \"$inst\" == \"s\" ]
then
echo \"Iniciando a instalação do Docker...\"
sleep 2
sudo apt update && sudo apt install docker.io -y

echo \"Instalação completa do Docker\"
sleep 2
else echo \"Você escolheu não instalar\"
fi
fi

echo \"Inicializando o Docker\"
sleep 2
sudo systemctl start docker
sudo systemctl enable docker
echo \"Docker foi inicializado\"
sleep 2 


echo \"Instalação da imagem MySQL\"
echo \"Verificação se existe a Imagem MySQL\"

if [[ ! "$(sudo docker image inspect mysql:5.7)" ]]
then
echo \"Imagem MySQL não instalado\"

echo \"Gostaria de fazer a instalação S/n \"
read inst
if [ \"$inst\" == \"s\" ]
then
echo \"Iniciando a instalação do MySQL...\"
sleep 2
sudo docker pull mysql:5.7

echo \"Instalação completa do MySQL\"
sleep 2
else
echo \"Imagem MySQL já instalado.\"
fi
fi



echo \"Configurando o ambiente/Container para o MySQL\"

if [[ ! "$(sudo docker ps -aqf "name=ContainerDimensionBD")" ]]
    then
        echo \"Container inexistente\"
        echo \"Gostaria de criar o Container?  S/n \"
        read inst
        if [ \"$inst\" == \"s\" ]
            then
            echo \"Iniciando a criação do ContainerDimensionBD...\"
            sleep 2
            sudo docker run -d -p 3306:3306 --name ContainerDimensionBD -e "MYSQL_DATABASE=dimensionBD" -e "MYSQL_ROOT_PASSWORD=" mysql:5.7
            
            echo \"Instalação completa do MySQL\"
            sleep 2
    else
        echo \"Container MySQL já existe.\"
    fi
fi

# Startando o Container
#echo \"Inicializando o Container MySQL\"
# Pegando o ID do container
#CONTID=$(sudo docker ps -aqf "name=ContainerDimensionBD")
#sudo docker start CONTID
#sudo docker exec -it  ${CONTID} bash

echo \"Instalação de Java\"
sleep 5

echo \"Conferindo a versão do Java\"
# javac -version
# checar se tem instalado a img
if [[ ! "$(sudo docker image inspect openjdk:11)" ]]
    then
    echo \"Instalação da imagem do Java será iniciado\"
    sudo docker pull openjdk:11

    else
        echo \"Imagem Java já foi instalada\"
    fi
    
    echo \"Verificação se Container Java existe\"
    if [[ ! "$(sudo docker ps -aqf "name=ContainerDimensionJDK")" ]]
        then
            sudo docker run -t -d --name ContainerDimensionJDK openjdk:11
            sudo docker exec -it ContainerDimensionJDK bash
        else
            echo \"Container já existe, iniciando o Container...\"
            sudo docker exec -it ContainerDimensionJDK bash
            #echo \"Container foi iniciado!\"
        fi    
    
# FINALIZAÇÃO DO SCRIPT

# INICIALIZAÇÃO PARA BAIXAR O REPOSITÓRIO E INICIAR O JAR
echo \"Finalização da instalação do Java e o Docker\"
sleep 2

echo \"Abrindo a Aplicação Dimension\"
echo \"Baixando arquivos\"
git clone https://github.com/pedro-duo/DimensionJar.git
cd DimensionJar
cd Api\ Conexão/
cd target
echo \"Executando Aplicação Dimension...\"
java -jar DimensionJar.jar

sleep 5
java -jar DimensionJar.jar stop

echo \"Obrigado por utilizar DimensionScript!<3\"