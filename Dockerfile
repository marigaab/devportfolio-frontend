# Etapa 1: Build da aplicação Angular (usando Node 22)
FROM node:22-alpine AS build
WORKDIR /app

# Copia os arquivos de dependência
COPY portfolio-ui/package*.json ./
RUN npm install

# Copia o código-fonte e gera o build
COPY portfolio-ui/ .
RUN npm run build

# Etapa 2: Servidor Web Nginx
FROM nginx:alpine

# Copia o resultado do build do Angular para o Nginx
COPY --from=build /app/dist/portfolio-ui/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
