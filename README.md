# Presentado por:
- Camilo Mondaca
- Vicente Parada
- Raúl Rozas

# Red social para la clasificación de profesores (ProfeRanking)

##  Índice
1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Requerimientos](#requerimientos)
3. [Arquitectura de la Información](#arquitectura-de-la-información)
3. [Diseño de prototipos](#prototipo-de-diseño)
4. [Librerías en Angular](#liberías-usadas-con-angular)

## Resumen del Proyecto
Este proyecto tiene el fin de crear una red social que permita a sus usuarios buscar, calificar y revisar las calificaciones de sus profesores, al estilo de Rate My Teacher. El proyecto tiene como objetivo entregar información acerca de la enseñanza y dificultad del profesor al usuario, con el fin de conocer de antemano el estilo de aprendizaje y otras cualidades del dicho profesor, antes de tomar un ramo, ayudando a decidir de manera informada

El proyecto tiene un enfoque dirigido principalmente a estudiantes de enseñanza superior, entregando una plataforma donde se puede compartir sus experiencias universitarias en el ámbito de la enseñanza recibida, como también informarse acerca de sus docentes.

---
## Requerimientos

## Roles del Sistema
- **Administrador**: Control total sobre el sistema.
- **Usuario**: Puede crear y eliminar publicaciones, además de crear comentarios.
- **Visualizador**: Solo puede ver información de profesores.

## Requerimientos Funcionales por Rol

### Rol-Administrador

- **RF-ADM-01**: El administrador puede registrar nuevas páginas de profesores.
- **RF-ADM-02**: El administrador puede editar cualquier perfil de profesor existente.
- **RF-ADM-03**: El administrador puede eliminar cualquier página de profesor existente.
- **RF-ADM-04**: El administrador puede gestionar los usuarios registrados.
- **RF-ADM-05**: El administrador puede eliminar publicaciones creadas por los usuarios.
- **RF-ADM-06**: El administrador puede eliminar comentarios creados por los usuarios.

### Rol-Usuario

- **RF-USER-01**: El usuario puede crear nuevas publicaciones en su muro que contengan lo siguiente:
  - Nombre de usuario
  - Titulo
  - Cuerpo
  - Etiquetas
- **RF-USER-02**: El usuario puede modificar sus publicaciones.
- **RF-USER-03**: El usuario puede eliminar sus publicaciones.
- **RF-USER-04**: El usuario puede comentar publicaciones.
- **RF-USER-05**: El usuario puede calificar un perfil de profesor.
- **RF-USER-06**: El usuario puede calificar una publicación.
- **RF-USER-07**: El usuario puede visualizar el perfil de otro usuario.
- **RF-USER-08**: El usuario puede utilizar la función de búsqueda.
- **RF-USER-09**: El usuario puede visualizar una publicación hecha por un usuario.
- **RF-USER-10**: El usuario puede visualizar un perfil de profesor.
- **RF-USER-11**: El usuario puede visualizar las calificaciones y comentarios de los usuarios dentro del perfil de un profesor.

### Rol-Visualizador

- **RF-VIS-01**: El visualizador puede utilizar la función de búsqueda.
- **RF-VIS-02**: El visualizador puede visualizar un perfil de profesor.
- **RF-VIS-03**: El visualizador puede visualizar las calificaciones y comentarios de los usuarios dentro del perfil de un profesor.

## Requerimientos Funcionales por Elementos Funcionales de la página

### Publicaciones
- **RF-PUB-01**: La publicación debe tener una sección de comentarios.
- **RF-PUB-02**: La publicación debe contener información respecto a los siguientes atributos:
  - ID de publicación
  - Nombre del usuario dueño de la publicación
  - Título
  - Cuerpo
  - Etiquetas
  - Fecha de Publicación
  - Valoración de la publicación
- **RF-PUB-03**: La publicación tendrá botones de like y dislike
- **RF-PUB-04**: La publicación debe tener una sección de comentarios.

### Página de profesor
- **RF-PROF-01**: La página debe tener una sección de evaluaciones.
- **RF-PROF-02**: La página debe tener una clasificación promedio basada en los siguientes atributos:
  - Calidad de enseñanza
  - Trato con el estudiante
  - Dificultad
- **RF-PROF-03**: La página debe contener información respecto a los siguientes atributos:
  - ID Profesor
  - Nombre del profesor
  - Descripción del profesor
  - Clasificación promedio del profesor
  - Sección de comentarios del profesor
  - IDs de instituciones educacionales donde participa

### Perfil de Usuario
- **RF-PUSR-01**: El perfil debe tener un historial de publicaciones
- **RF-PUSR-02**: El perfil debe tener un historial de opiniones en páginas de profesores.
- **RF-PUSR-03**: El perfil debe tener visible los siguientes atributos:
 - Nombre de usuario
 - Foto de perfil

### Comentarios de publicación
- **RF-COM-01**: El comentario debe contener los siguientes atributos:
  - ID Comentario
  - Nombre del usuario dueño del comentario
  - Contenido
  - Fecha comentario
  - Cantidad de likes y dislikes
- **RF-COM-02**: El comentario se debe poder realizar dentro de la publicación de un usuario.

---

## Requerimientos No Funcionales

- **RNF-01: Tiempo de respuesta**
  - El sistema debe responder a solicitudes de búsqueda en menos de **5 segundos** en el 95% de los casos.

- **RNF-02: Seguridad**
  - El sistema deberá mantener una identificación de usuario para cada persona que utilice el sistema.
  - Los roles deben restringir el acceso a funciones según permisos (Administrador, Usuario)
  - El sistema deberá permitir roles de administrador del sistema.
  - Acceso protegido por HTTPS y almacenamiento seguro de contraseñas.
  - Cuando el usuario haya fallado en ingresar correctamente su identificación de usuario y contraseña, el sistema deberá permitir al usuario tres intentos para iniciar sesión después de una hora.

- **RNF-03: Usabilidad**
  - El sistema debe permitir acceder al perfil de un profesor en menos de 4 clicks.
  - El sistema debe contar con Compatible con pantallas móviles y escritorio (responsive design).

- **RNF-04: Integridad de los datos**
  - El sistema mantendrá la integridad de los datos mediante copias de seguridad de todas las actualizaciones a la base de datos cada 2 semanas.

- **RNF-05: Almacenamiento**
  - La unidad de almacenamiento destinada a la administración de registros del sistema debe tener una capacidad de 50 gigabytes de datos.

- **RNF-06: Compatibilidad**
  - Compatible con los navegadores:
  - Navegadores basados en Chromium
  - Mozilla Firefox
    
- **RNF-07: Escalabilidad**
  - El sistema debe ser capaz de agregar al menos **1000** perfiles de profesores con información al mes sin pérdida de rendimiento.

---
## Arquitectura de la Información 
[Diagrama](https://github.com/Nataruk/Proyecto-Ingenier-a-Web-y-Movil/blob/main/otros/Diagramas/Diagrama%20de%20Flujo%20-%20ProfeRanking.png)

## Patrones UX

- Barra superior de navegación: se cuenta con una barra superior que permite navegar fácilmente por el sitio, esta puede ser utilizada tanto por usuarios como visualizadores.

- Barra de búsqueda: el inicio del sitio cuenta con una barra que permite buscar profesor, esta puede ser utilizada tanto por usuarios como visualizadores.

- Publicaciones con comentarios: se pueden realizar comentarios dentro de las publicaciones, permitiendo las relaciones e interacción entre usuarios. Esta no puede ser utilizada por visualizadores.

- Likes y dislikes en publicaciones: se permite calificar con Like o Dislike una publicación realizada por un usuario, permitiendo las relaciones e interacción entre usuarios. Esta no puede ser utilizada por visualizadores.

- Calificar profesores: se permite buscar profesores y clasificarlos en base a determinadas características, permitiendo las relaciones e interacción entre usuarios. Esta no puede ser utilizada por visualizadores.

## Patrones de Diseño UX

- Patrón de lectura F: La existencia de la barra superior y que la barra de búsqueda se posicione en la mitad superior del inicio evidencian la consideración de este patrón para la creación de pantallas.

- Tab Bar / Bottom Navigation: si bien no se utiliza ninguno de estos patrones de diseño, existe una relación directa con estos, ya que la intención de la barra superior es que el usuario pueda acceder a contenidos claves del sitio.

## Accesibilidad
Se consideraron algunas medidas de accesibilidad, sin embargo, se contempla la implementación de nuevas medidas a futuro con el objetivo de que cualquier persona, independiente de si presenta algún tipo de discapacidad física, cognitiva o sensorial, pueda navegar a través del sitio sin problemas. 

- Contraste de colores: los textos presentan un color que contrasta con el fondo, con el objetivo de que los usuarios puedan leer fácilmente.

- Encabezados organizados: se utiliza una jerarquía para títulos y subtítulos en página, con el objetivo de organizar de mejor manera la información para los usuarios.

- Botones grandes y separados: se utilizan botones que son fáciles de identificar para el usuario, con un color en específico.

- Lenguaje claro y simple: se utiliza un lenguaje fácil de entender para ayudar a las personas con dificultades cognitivas.

- Texto alternativo en imágenes: las imágenes presentarán descripciones en texto para que el lector de pantalla pueda reconocerlas.

- Diseño responsivo: el sitio se adaptará a distintos tamaños de pantalla, como celulares, computadores o tablets.

- Indicadores visuales: el sitio presentará mensajes de error con íconos y textos para que puedan ser reconocidos por el lector de pantalla.

- Modo oscuro: los usuarios podrán elegir entre un modo oscuro y claro.

---

## Prototipo de diseño 
[Diseño de Mockups](https://github.com/Nataruk/Proyecto-Ingenier-a-Web-y-Movil/tree/main/otros/mockups)

---
## Liberías usadas con Angular
- Bootstrap

## Tecnologías
- **Ionic Framework** (v7+)
- **Angular** (v15+)
- **TypeScript**
- **Capacitor** (para plugins nativos, si aplica)
- **SASS** (para estilos)
- **RxJS** (para manejo reactivo)
- **Angular Router** (para navegación entre vistas)

