# Student App

This project is used as a project that allows you to CRUD operations with either the server or local storage

# How to start

npm install, npm start. Open browser url http://localhost:4200

# Student-Client-Generations.txt

To generate a swagger service, you need to write the data Student-Client-Generations.txt in the terminal.

# How to configure Student-Client-Generations.txt

After -i path to swagger.json. after -o path to generate swagger services. after -t path to swagger templates

# Localization

ngx-translate was used for localization

# Local storage

To implement work with local storage, ngx-webstorage-service was used. work with local storage is implemented in src/app/core/services/users-local.service.ts

# Interceptor JWT token

to implement the jwt token, the basic interceptors that are in angular (HttpInterceptor) were used

# Working with the server

To work with the server, it was through restapi using auto-generated services through swagger code generetion

# Architecture:

Interceptors are contained in src/app/core/services/interceptors. Auto-generated swagger services are located in src/app/core/services/swagger-gen (right here swagger-templates). Services for working with storage and server are stored in src/app/core/services. The main components are in src/app/components

# Page styling and layout

Angular material, bootstrap5

# Work example

![example](https://user-images.githubusercontent.com/65355616/187091592-079b0d6b-f7c2-4076-997b-f0acabd8183d.gif)
