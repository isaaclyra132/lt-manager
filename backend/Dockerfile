# Use uma imagem base com o JDK 17 e Maven pré-instalados
FROM maven:3.8.5-openjdk-17-slim AS builder

# Diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo pom.xml para baixar as dependências antes de copiar o código-fonte
COPY pom.xml .

# Baixe as dependências do Maven
RUN mvn dependency:go-offline

# Copie todo o código-fonte para o contêiner
COPY src ./src

# Compile o aplicativo
RUN mvn package -DskipTests

# Use a imagem oficial do OpenJDK 17 como imagem base para a execução do aplicativo
FROM openjdk:17-alpine

# Diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo JAR compilado do estágio de compilação para o estágio de execução
COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar ./backend-0.0.1-SNAPSHOT.jar

# Exponha a porta 8071 para o mundo exterior
EXPOSE 8071

# Comando para iniciar o aplicativo quando o contêiner for executado
CMD ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]