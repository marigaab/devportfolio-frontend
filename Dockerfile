# Etapa 1: Build (Compilação do Angular com Node 24)
FROM node:24-alpine AS build
WORKDIR /app
COPY portfolio-ui/package*.json ./
RUN npm install
COPY portfolio-ui/ .
RUN npm run build -- --configuration production

# Etapa 2: Servidor Web Nginx
FROM nginx:alpine
COPY --from=build /app/dist/portfolio-ui/browser /usr/share/nginx/html/ || COPY --from=build /app/dist/portfolio-ui /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]