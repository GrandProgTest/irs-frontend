# Plataforma de Gestión de Proveedores

Este proyecto es una plataforma de gestión de proveedores que permite a los usuarios ver, agregar, editar y eliminar proveedores. También incluye funcionalidades para exportar datos a Excel y realizar búsquedas avanzadas.

## Tecnologías Utilizadas

- **Lenguajes**: TypeScript, JavaScript
- **Frameworks**: Angular
- **Gestor de Paquetes**: npm
- **Bibliotecas de UI**: Angular Material
- **Otras Dependencias**: `xlsx` para exportar datos a Excel

## Proceso de Inicialización

- Instalar Dependencias:  <pre>npm install </pre>
- Configurar el Proyecto:  
- Asegúrate de que los archivos de configuración como angular.json y tsconfig.json estén correctamente configurados según tus necesidades.
- Ejecutar la Aplicación en Modo Desarrollo:  <pre>ng serve </pre>
- Abre tu navegador y navega a http://localhost:4200/.
- Construir la Aplicación para Producción:  <pre>ng build --prod </pre>

## Mejoras al proyecto
- Implementar mayor opciones al momento de hacer screening y no unicamente se considera al nombre de la firma
- Implementar una mejor interfaaz visual
- Mejorar la conexión con el REST API en el ambiente de producción con el que se hace el screening
