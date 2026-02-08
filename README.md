# LockerSync Frontend

## Descripción
Esta es una aplicación de gestión de archivos construida con Next.js, diseñada para proporcionar funciones completas de gestión de archivos, incluyendo la visualización, búsqueda y adición de archivos. También incluye autenticación de usuarios y un panel de control para usuarios autenticados, así como una sección de administración para gestionar usuarios y pedidos.

## Tecnologías

*   **Framework:** Next.js (v14)
*   **Autenticación:** NextAuth.js (v5 beta)
*   **Base de Datos/ORM:** Mongoose (Nota: Mongoose es típicamente un ORM de backend; su mención aquí implica interacción con un backend que lo utiliza.)
*   **Gestión de Estado:** Zustand
*   **Manejo de Formularios:** React Hook Form y Zod
*   **Cliente HTTP:** Axios
*   **UI:** Tailwind CSS, @shadcn/ui, lucide-react

## Funcionalidad

*   Autenticación de usuarios con un proveedor de credenciales.
*   Funciones de gestión de archivos, incluyendo lista de archivos, búsqueda y adición de archivos.
*   Un panel de control para usuarios autenticados.
*   Sección de administración para gestionar usuarios y pedidos.

## Primeros Pasos

Sigue estas instrucciones para configurar el proyecto localmente.

### Prerrequisitos

*   Node.js (versión LTS recomendada)
*   npm o Yarn

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone <repository_url>
    cd locker-sync-front
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    # o si prefieres Yarn
    # yarn install
    ```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:

```env
URL_BACKEND=<Tu_URL_API_Backend>
NEXT_PUBLIC_URL_BACKEND=<Tu_URL_API_Backend_Publica>
# Ejemplo: URL_BACKEND=http://localhost:4000/api
# Ejemplo: NEXT_PUBLIC_URL_BACKEND=http://localhost:4000/api
```

Asegúrate de reemplazar `<Tu_URL_API_Backend>` y `<Tu_URL_API_Backend_Publica>` con las URLs reales de tu API de backend. `URL_BACKEND` es utilizada por el lado del servidor de Next.js, mientras que `NEXT_PUBLIC_URL_BACKEND` es accesible en el código del lado del cliente.

### Ejecutar el Servidor de Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# o yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

### Construir para Producción

Para crear una compilación lista para producción:

```bash
npm run build
# o yarn build
```

Esto compilará la aplicación para su despliegue.

### Ejecutar el Servidor de Producción

Para iniciar la aplicación en modo de producción (después de la compilación):

```bash
npm run start
# o yarn start
```

## Estructura del Proyecto

Aquí tienes una visión general de alto nivel de la estructura de directorios del proyecto:

```
.
├── src/
│   ├── actions/          # Acciones del servidor para llamadas a la API
│   ├── app/              # Páginas y layouts del Next.js App Router
│   ├── components/       # Componentes de UI reutilizables
│   ├── config/           # Archivos de configuración
│   ├── contexts/         # Proveedores de React Context
│   ├── hooks/            # Hooks de React personalizados
│   ├── interfaces/       # Interfaces de TypeScript para estructuras de datos
│   ├── lib/              # Funciones de utilidad y librerías (ej. utils.ts)
│   ├── models/           # Modelos de Mongoose (si se usan en el frontend para validación/tipos)
│   ├── store/            # Stores de Zustand para la gestión del estado
│   └── utils/            # Funciones de utilidad generales
├── public/               # Activos estáticos (imágenes, fuentes, etc.)
├── .env                  # Variables de entorno
├── next.config.js        # Configuración de Next.js
├── package.json          # Dependencias y scripts del proyecto
└── tailwind.config.ts    # Configuración de Tailwind CSS
```

## Contribución

¡Agradecemos las contribuciones! Por favor, sigue estos pasos:

1.  Haz un fork del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/tu-nueva-funcionalidad`).
3.  Realiza tus cambios.
4.  Confirma tus cambios (`git commit -m 'feat: Añadir nueva funcionalidad'`).
5.  Envía los cambios a la rama (`git push origin feature/tu-nueva-funcionalidad`).
6.  Abre un Pull Request.

Por favor, asegúrate de que tu código cumpla con el estilo de codificación del proyecto y pase todas las comprobaciones del linter.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo LICENSE.md para más detalles. (Nota: Se debe crear o especificar un archivo `LICENSE.md` si es diferente).
