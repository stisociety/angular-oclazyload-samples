#Sample02: Exemplo rotas em arquivos JS

Este exemplo utiliza o plugin [oclazyload](https://oclazyload.readme.io/) para fazer a carga de arquivos para uma aplicação angular.
Segue a mesma idéia do [Sample01](https://github.com/stisociety/angular-oclazyload-samples/tree/master/src/oclazyload_sample_01), porém neste exemplo carrega as rotas via um arquivo js que permite o uso de resolve na rota.

##Prova de conceito 01: Carregar um 'pacote' -> module, controller, routes and services

As rotas são configuradas atraves de um arquivo js, por exemplo a [rota do package1](https://github.com/stisociety/angular-oclazyload-samples/blob/master/src/oclazyload_sample_02/wwwroot/app/package1/package1.routes.js). Este arquivo deve ser carregado junto com o pacote e seus devidos controllers e módulo.

##Problema

