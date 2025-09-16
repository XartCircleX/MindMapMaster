# MindMapMaster

Una aplicación moderna de mapas mentales construida con React, Tailwind CSS y Node.js.

## 🚀 Características

- **Interfaz intuitiva**: Diseño limpio y moderno con Tailwind CSS
- **Canvas interactivo**: Crea y edita mapas mentales con herramientas fáciles de usar
- **Templates**: Plantillas predefinidas para diferentes propósitos
- **Colaboración**: Herramientas para trabajar en equipo
- **Responsive**: Funciona perfectamente en desktop y móvil
- **Backend robusto**: API REST con Node.js y MongoDB

## 🛠️ Tecnologías

### Frontend
- React 18
- Tailwind CSS
- Framer Motion (animaciones)
- React Router DOM
- Lucide React (iconos)
- Axios (HTTP client)

### Backend
- Node.js
- Express.js
- MongoDB con Mongoose
- JWT para autenticación
- Bcrypt para hash de contraseñas

## 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone <repository-url>
   cd mindmap-master
   ```

2. **Instala las dependencias**
   ```bash
   npm run install-all
   ```

3. **Configura las variables de entorno**
   ```bash
   # En la carpeta server, crea un archivo .env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mindmapmaster
   JWT_SECRET=tu_jwt_secret_aqui
   NODE_ENV=development
   ```

4. **Inicia MongoDB**
   ```bash
   # Asegúrate de que MongoDB esté ejecutándose en tu sistema
   mongod
   ```

5. **Ejecuta la aplicación**
   ```bash
   npm run dev
   ```

   Esto iniciará tanto el servidor backend (puerto 5000) como el frontend (puerto 3000).

## 🎯 Uso

1. **Página de inicio**: Explora las características y navega por la aplicación
2. **Crear mapa mental**: Haz clic en "Create Mind Map" para acceder al canvas
3. **Herramientas disponibles**:
   - **Add Node**: Agregar nuevos nodos al mapa
   - **Connect Branch**: Conectar nodos entre sí
   - **Customize Colors**: Personalizar colores
   - **Customize Fonts**: Cambiar fuentes
4. **Guardar y exportar**: Guarda tu trabajo y exporta en diferentes formatos

## 📁 Estructura del Proyecto

```
mindmap-master/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/         # Páginas de la aplicación
│   │   ├── App.jsx        # Componente principal
│   │   └── main.jsx       # Punto de entrada
│   ├── public/            # Archivos estáticos
│   └── package.json
├── server/                # Backend Node.js
│   ├── models/           # Modelos de MongoDB
│   ├── routes/           # Rutas de la API
│   ├── middleware/       # Middleware personalizado
│   ├── config/           # Configuración
│   └── server.js         # Servidor principal
└── package.json          # Configuración del proyecto
```

## 🔧 Scripts Disponibles

- `npm run dev`: Ejecuta tanto frontend como backend en modo desarrollo
- `npm run client`: Ejecuta solo el frontend
- `npm run server`: Ejecuta solo el backend
- `npm run build`: Construye el frontend para producción
- `npm run install-all`: Instala todas las dependencias

## 🌟 Características Principales

### Canvas de Mapas Mentales
- Interfaz drag-and-drop
- Nodos personalizables con colores y texto
- Conexiones entre nodos
- Herramientas de edición en tiempo real

### Sistema de Usuarios
- Registro y login
- Perfiles de usuario
- Mapas mentales privados y públicos

### Templates
- Plantillas predefinidas para diferentes casos de uso
- Categorías: Negocios, Educación, Creativo, Personal
- Sistema de calificaciones y descargas

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

- Email: info@mindmapmaster.com
- Website: [MindMapMaster](https://mindmapmaster.com)

---

¡Disfruta creando mapas mentales increíbles! 🧠✨



