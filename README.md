
# Implementación del reto SWAPI - INDRA

En este apartado resolvemos el reto propuesto
NOTA: Por cuestiones tiempo y que me encuentro ocupado solo se implementó una API para modelo Planets

### STACK

NodeJS + DynamoDB + Serverless Framework + AWS:


### Prerrequisitos

Para desplegar el proyecto es necesario que esté instalado lo siguiente:
```
$  aws --version  (awscli)
>= aws-cli/2.13.15

$ Git --version
>= v2.32.1

$ Docker --version
>= v20.10.25

$ Docker Compose --version
>= v1.29.2

$ node --version
>= v18.16.1

$ NPM --version
>= v9.5.1

```

### Deployment
1.- Ejecutamos los siguientes comandos

```
$ git clone https://github.com/CristianHR/reto-indra 
$ cd reto-indra 
$ npm install 
```
2.- Configuramos las credenciales de AWS para poder desplegar y crear la base de datos dynamodb de AWS:

```
$  npx serverless config credentials --provider aws --key <YOUR_USER_KEY> --secret <YOUR_USER_SECRET_KEY> --profile cristianhr --overwrite

```

3.- Desplegamos a AWS, en esta etapa se creará el lambda y la base de datos dynamodb en AWS
```
$ serverless deploy --aws-profile cristianhr

```

4.- En el archivo serverless.yml descomentamos las lineas del 14 al 19 y modicamos la linea 19 por el "arn" creado en nuestra base de datos dynamodb de aws, accedemos a la consola y aws->dinamodb y obtenmos dicho "arn", guardamos los cambios y desplegamos(se otorgará los permisos sobre la tabla PlanetsTable).

```
$ serverless deploy --aws-profile cristianhr

```

5- Iniciamos el proyecto el local
```
$ npm run local

```

6.- La API se desplegará en el siguiente ruta(local) 

http://localhost:3006/dev/api/planets

![Alt text](./img/api-planets.png?raw=true "API-PLANETS")



