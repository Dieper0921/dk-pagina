# 🛍️ Nexus Imports — Tienda de Productos Importados

Plataforma moderna de comercio electrónico diseñada para venta de productos importados exclusivos, con checkout directo hacia WhatsApp, confirmación automática de pedidos, reseñas de compradores y un panel de administración con autenticación segura.

---

## 🚀 Características Principales

- **Publicación Central (Productos TOP):** Hero interactivo con carrusel para destacar artículos exclusivos de importación, país de procedencia, especificaciones y precios de oferta.
- **Catálogo Completo y Filtros Dinámicos:** Búsqueda en tiempo real, filtros por categoría (Tecnología, Wearables, Perfumería, Moda, etc.) y ordenamiento por precios o valoración.
- **Carrito de Compras Desplegable:**
  - Control de cantidad (+ / -) y eliminación de productos.
  - Medidor de progreso para envío gratis.
  - Formulario de datos de despacho del cliente (Nombre, Teléfono, Ciudad, Dirección, Método de pago).
- **Checkout Inteligente por WhatsApp:**
  - Redirección con mensaje formateado que incluye número de orden (`#IMP-XXXXX`), resumen de productos, totales y datos de envío.
  - **Confirmación Automática en Pantalla:** Genera un recibo digital inmediato con código de seguimiento y estado del pedido.
- **Reseñas de Clientes:**
  - Sistema de calificación con estrellas y sello de compra verificada.
  - Formulario para que nuevos visitantes dejen sus testimonios.
- **Panel de Administración Protegido:**
  - Autenticación con **Nombre de Usuario** y **Contraseña** (con protección ante intentos fallidos).
  - Configuración de tienda: cambia el **número telefónico de WhatsApp**, nombre, logo y moneda.
  - Gestión de Productos (CRUD): crear, editar fotos, precios, stock y alternar qué productos aparecen en la sección TOP.
  - Pestaña de seguridad para actualizar credenciales de acceso.
  - Persistencia total de datos mediante `localStorage`.

---

## 🔑 Credenciales Iniciales de Administrador

- **Usuario:** `admin`
- **Contraseña:** `admin123`

*(Puedes modificarlas en cualquier momento dentro de la pestaña "Seguridad" del panel de administración).*

---

## 🛠️ Tecnologías Utilizadas

- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide Icons**
- **Vite**

---

## 💻 Instalación y Ejecución Local

1. Clona el repositorio:
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd <CARPETA_DEL_PROYECTO>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Compila para producción:
   ```bash
   npm run build
   ```

---

## 🌐 Despliegue en 1 Clic (Gratuito)

Puedes subir este proyecto a:
- **Vercel:** Importa tu repositorio de GitHub y selecciona el framework preset `Vite`.
- **Netlify:** Conecta tu repositorio de GitHub y usa el comando de build `npm run build` con la carpeta de publicación `dist`.
- **Cloudflare Pages:** Conecta tu repo y despliega al instante.
