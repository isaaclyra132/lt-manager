# Use uma imagem do Node.js como base
FROM node:18.17.1 AS builder

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do projeto para o contêiner
COPY . .

# Execute o build do projeto Angular
RUN npm run build

# Use a imagem oficial do Nginx como base
FROM nginx:latest

# Remove o arquivo de configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copie o arquivo de configuração personalizado para o diretório de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copie os arquivos de build do Angular da etapa anterior para o diretório de trabalho do Nginx
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Exponha a porta 80 para que o Nginx possa ser acessado externamente
EXPOSE 80

# Inicie o Nginx quando o contêiner for executado
CMD ["nginx", "-g", "daemon off;"]
