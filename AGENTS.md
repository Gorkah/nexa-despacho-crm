# Nexa Despacho · frontend de demostración

- Sitio estático sin dependencias ni compilación. Previsualizar con `python3 -m http.server 5178`.
- Repositorio distinto de la landing `nexa-asesores-fiscales`; no modificar la landing para publicar el CRM.
- Mantener las pantallas PAN-01 a PAN-13 del PRD/SPEC de origen. README contiene las rutas y la cobertura.
- Prioridad del usuario: diseño completo y convincente; no se requiere backend ni servicios reales.
- Tema claro y cian/azul, tipografías Inter/Sora/JetBrains Mono; usar SVG para iconos y gráficos.
- Toda la información mostrada es ficticia. No conectar servicios, pedir secretos ni usar datos reales de clientes en la demo pública.
- Los archivos `data/`, las credenciales y los PDFs privados no se publican.
- Mantener recursos relativos y rutas `#/...` para GitHub Pages en un subdirectorio.
- Verificar cambios visuales en navegador, escritorio y móvil; revisar errores de consola y desbordamientos. Comprobar sintaxis con `node --check app.js` y `node --check demo.js`.
