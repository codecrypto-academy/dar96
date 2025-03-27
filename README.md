### Mysql
lanzamos el contenedor con la imagen mysql:
docker run --name curso-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:8.0.28
cargamos la base de datos nortwind usando el dbeaver para configurar la conexion y visualizar la base de datos:
https://www.aspsnippets.com/Handlers/DownloadFile.ashx?File=9cb579c6-86db-4596-84c3-d549428fdcf5.zip
Creamos el archivo bdmysql.js para acceder desde este a la bd

### PG
lanzamos el contenedor con la imagen pg:
docker run --name curso-pg -d -p 5432:5432 -e POSTGRES_PASSWORD=my-secret-pw postgres:13
cargamos la base de datos nortwind usando el dbeaver para configurar la conexion y visualizar la base de datos:
https://raw.githubusercontent.com/pthom/northwind_psql/master/northwind.sql
Creamos el archivo bdpg.js para acceder desde este a la bd

### SQLSERVER
lanzamos el contenedor con la imagen sqlserver:
docker run --name sqlserver -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=my-secret-pw" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-CU15-ubuntu-20.04

"ACCEPT_EULA=Y" es para que aceptemos que es un producto con licencia

 cargamos la base de datos nortwind usando el dbeaver para configurar la conexion y visualizar la base de datos:
 El usuario es 'sa'
 https://raw.githubusercontent.com/microsoft/sql-server-samples/master/samples/databases/northwind-pubs/instnwnd.sql
Creamos el archivo bdsqlserver.js para acceder desde este a la bd

### Oracle
lanzamos el contenedor con la imagen oracle:
docker run -d --name orcl1 -e ORACLE_PWD=changeme123 -p 1521:1521 container-registry.oracle.com/database/express:21.3.0-xe

USUARIO:SYS AS SYSDBA password:changeme123

Creamos un usuario, en el dbeaver abrimos un script sql y ejecutamos lo siguiente:
 CREATE USER c##datos IDENTIFIED BY datos

 Le damos permisos con:
 GRANT dba TO c##datos

Nos conectamos con el usuario c##datos
Vamos a la configuracion de la conexion en el dbeaver y lo cambiamos

cargamos la base de datos nortwind:
https://gist.githubusercontent.com/Jviejo/4f59dfe1d31d55c633b6c4a441bfb806/raw/800005c1ea4264f4e16b2a13cca

instalamos el driver de Oracle
https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html

Creamos el archivo bdoracle.js para acceder desde este a la bd
