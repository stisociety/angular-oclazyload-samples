#Exemplo utilizando rotas 100% via Json

Este exemplo utiliza o plugin [oclazyload](https://oclazyload.readme.io/) para fazer a carga de arquivos para uma aplicação angular.

##Prova de conceito 01: Carregar módulos angular após o app inicial carregado

Criado dois módulos que não são referenciados no arquivo index, portanto não são carregados quando a aplicação angular é carregada.
- [funcionalidade1](https://github.com/stisociety/angular-oclazyload-samples/blob/master/src/oclazyload_sample_01/wwwroot/app/funcionalidade1/funcionalidade1.module.js)
- [funcionalidade2](https://github.com/stisociety/angular-oclazyload-samples/blob/master/src/oclazyload_sample_01/wwwroot/app/funcionalidade2/funcionalidade2.module.js)

Cada módulo possui seu controller e serviços que são carregados juntos.

A configuração de quais arquivos são necessários para a carga de um módulo é feita no arquivo [modulos.json](https://github.com/stisociety/angular-oclazyload-samples/blob/master/src/oclazyload_sample_01/wwwroot/app/dados/modulos.json), que nada mais que um arquivo json com os módulos, arquivos e rotas necessárias.

Toda lógica para a carga destes módulos esta no arquivo [core.config](https://github.com/stisociety/angular-oclazyload-samples/blob/master/src/oclazyload_sample_01/wwwroot/app/core/core.config.js), que é executado no momento que a aplicação principal é carregada. Assim todos os arquivos especificados são carregados na carga da aplicação sem a necessidade de referenciar estes arquivos no [index.html](https://github.com/stisociety/angular-oclazyload-samples/blob/master/src/oclazyload_sample_01/wwwroot/Index.html).


