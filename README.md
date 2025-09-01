# 🛍️ Chat de la tienda - Frontend

Este es el **frontend** de un chat de asistencia para tienda online,
construido con **Next.js + TypeScript**.\
Se conecta a un backend en `http://localhost:4000` para procesar las
preguntas y respuestas de los usuarios.

------------------------------------------------------------------------

## 🚀 Tecnologías usadas

-   [Next.js 14](https://nextjs.org/) (con App Router)
-   [React 18](https://react.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [CSS
    Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules)
-   Yarn como gestor de dependencias

------------------------------------------------------------------------

## 📂 Estructura del proyecto

    riwi-frontend/
    ├── app/
    │   ├── chat/                # Página principal del chat
    │   │   └── page.tsx
    │   ├── layout.tsx           # Layout global
    │   └── globals.css          # Estilos globales
    │
    ├── components/
    │   └── Chat.tsx             # Componente principal del chat
    │
    ├── styles/
    │   └── Chat.module.css      # Estilos locales del chat
    │
    ├── lib/                     # (espacio reservado para helpers/utils)
    ├── public/                  # Recursos estáticos
    ├── package.json
    ├── tsconfig.json
    └── yarn.lock

------------------------------------------------------------------------

## ⚙️ Configuración y ejecución

1.  **Clonar repositorio**

    ``` bash
    git clone https://github.com/tu-org/riwi-frontend.git
    cd riwi-frontend
    ```

2.  **Instalar dependencias**

    ``` bash
    yarn install
    ```

3.  **Levantar el proyecto en desarrollo**

    ``` bash
    yarn dev
    ```

    Por defecto estará disponible en:

        http://localhost:3000

4.  **Backend** El frontend espera que el backend esté corriendo en:

        http://localhost:4000

    > ⚠️ Ajusta la URL en el código si el backend corre en otro puerto o
    > dominio.

------------------------------------------------------------------------

## 🖥️ Uso

-   Abre el navegador en `http://localhost:3000/chat`
-   Ingresa un **CustomerId** (opcional).
-   Escribe tu pregunta en el input de texto y presiona **Enter** o el
    botón **Enviar**.
-   El chat mostrará la conversación con el asistente de la tienda.

------------------------------------------------------------------------

## 📌 Variables de entorno

Puedes configurar el endpoint del backend en un archivo `.env.local`:

``` env
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

Dentro de `Chat.tsx` puedes consumirlo con:

``` ts
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
```

------------------------------------------------------------------------

## 🛠️ Scripts disponibles

-   `yarn dev` → Inicia en modo desarrollo
-   `yarn build` → Genera build de producción
-   `yarn start` → Corre la aplicación en modo producción
-   `yarn lint` → Ejecuta linter

------------------------------------------------------------------------

## 📖 Notas

-   El chat maneja tanto respuestas de texto como objetos JSON (se
    formatean con `<pre>`).
-   Los mensajes de error se renderizan dentro del componente con un
    estilo propio.

------------------------------------------------------------------------

👨‍💻 **Autor**: Equipo de desarrollo Riwi\
📅 **Versión**: 1.0.0
