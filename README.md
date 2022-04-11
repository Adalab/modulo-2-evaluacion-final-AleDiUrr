# Ejercicio

Este ejercicio consta de 4 partes y 2 bonus. El resultado es una aplicación web con un listado de bebidas y cócteles que nos permite marcar y desmarcar las bebidas favoritas y además dichas se guardan en el navegador.

1era parte Estructura básica: (Etiquetado en HTML)

*Analizar la esctructura básica del HTML y con una correcta semantica dar etiquetas a la esctructura. 
*Los elementos principales:
Un input de tipo texto
Un botón para buscar el nombre del cóctel
Dos listas, una de resultados y otra de favoritos en donde se verán la imagén y nombre de los cócteles.

2da parte Búsqueda: (Peticiones y renderización)

*Al hacer click en el botón de buscar la aplicación se conectará a la APITheCocktailDB para hacer la petición de los datos. (Escuchar evento y hacer un fetch)
*Se deben pintar las tarjetas con el nombre y la imagen de los resultados de la búsqueda, para aquellos que no tienen imagen se debe crear una imagen de relleno 

3era parte (Favoritos)

*Al hacer click se intercambian el color de fuente y fondo para mostrar como favorito o no.
*El listado de favoritos se pintará en la parte izquierda.
*Los cćoteles marcados como favoritos seguirán apareciendo aun si se realiza otra búsqueda.

4ta parte (Almacenamiento local)

Almacenar en el LocalStorage el listado de favoritos.

(..) PARA ARRANCAR ESTE PROYECTO NECESITAS: 

+Tener instalado Node JS

+Crea tu propio repositorio.

+Abre una terminal en la carpeta raíz de tu repositorio.

+Instala las dependencias locales ejecutando en la terminal el comando: npm install

Una vez hemos instalado todo necesitar arrancar el proyecto cada vez que quieras programar, para ello ejecuta el comando: npm start

Con este comando: 
Se abrirá una ventana de Chrome y se mostrará tu página web, al igual que hace el plugin de VS Code Live Server (Go live).
También observa todos los ficheros que hay dentro de la carpeta src/, para que cada vez que modifiques un fichero refresca tu página en Chrome.
También procesa los ficheros HTML, SASS / CSS y JS y los genera y guarda en la carpeta public/. Por ejemplo:
Convierte los ficheros SASS en CSS.
Combina los diferentes ficheros de HTML y los agrupa en uno o varios ficheros HTML.
Después de ejecutar npm start ya puedes empezar a editar todos los ficheros que están dentro de la carpeta src/ y programar cómodamente.

Pasos para publicar el proyecto en GitHub Pages:
Para generar tu página para producción ejecuta el comando:

npm run docs
Y a continuación:

Sube a tu repo la carpeta docs/ que se te acaba de generar.
Entra en la pestaña settings de tu repo.
Y en el apartado de GitHub Pages activa la opción master branch /docs folder.
Y ya estaría!!!
Además, los comandos:

npm run push-docs
o

npm run deploy
son un atajo que nos genera la versión de producción y hace push de la carpeta docs/ del tirón. Te recomendamos ver el fichero package.json para aprender cómo funciona. (...)
