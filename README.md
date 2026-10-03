# Nexa Despacho

Demo visual de un CRM para asesorías contables y fiscales, diseñada por NexaVision AI. Proyecto independiente de la landing `nexa-asesores-fiscales`.

Tema claro, cian y azul de marca, tarjetas de indicadores, tablas de cartera, visor documental, conversación con el cliente y gráficos de ahorro. Diseño prioritario para escritorio, con adaptación para tablet y móvil.

## Abrir la demo

Web publicada: **https://gorkah.github.io/nexa-despacho-crm/**

Para verla en local, ejecuta `python3 -m http.server 5178` en esta carpeta y abre http://localhost:5178. No requiere instalación ni compilación. Las rutas utilizan hashes y todos los recursos del proyecto usan rutas relativas, compatibles con GitHub Pages.

## Pantallas

| SPEC | Ruta | Diseño |
| --- | --- | --- |
| PAN-01 | `#/login` | Acceso, doble factor y recuperación |
| PAN-02 | `#/panel` | Pendientes, indicadores y avance por técnico |
| PAN-03 | `#/cliente/1` | Checklist, documentos, mensajes, reglas, pre-cierre y datos |
| PAN-04 | `#/bandeja` | Confianza alta, revisión y selección en lote |
| PAN-05 | `#/validar/1042` | Factura, fuentes resaltadas, extracción y asiento |
| PAN-06 | `#/sin-asignar` | Documentos sin cliente y sugerencias de asignación |
| PAN-07 | `#/exportaciones` | Lotes contables y confirmación de importación |
| PAN-08 | `#/avisos` | Aprobación de mensajes, calendario e historial |
| PAN-09 | `#/conversaciones` | WhatsApp simulado, escalados y resumen contextual |
| PAN-10 | `#/conciliacion` | Movimientos N43 y propuestas de casación |
| PAN-11 | `#/config` | Equipo, mensajes, checklists, calendario, IA e integraciones |
| PAN-12 | `#/metricas` | Evolución, ahorro estimado y línea base |
| PAN-13 | `#/importar` | Previsualización CSV, mapeo y corrección de errores |
| Adicional | `#/clientes` | Cartera, responsables y estado de adaptación SIF |
| Adicional | `#/tareas` | Trabajo del equipo en columnas |

El botón **Demo interactiva** de la barra lateral abre un mapa de pantallas y un catálogo de estados: vacío, carga, error y sin permisos.

## Interacciones de presentación

- Navegación entre pantallas y pestañas; búsqueda global con `Cmd/Ctrl + K`.
- Búsqueda local en tablas; selección visual en lote en la bandeja.
- Factura con fuentes resaltadas al enfocar un campo; zoom y navegación con flechas; `V` valida y `R` muestra rechazo.
- Formularios visuales para alta de cliente, invitación, tarea, documentos, N43, asignación, mensajes y edición de asiento.
- Conversación de ejemplo: escribir añade una burbuja local. Nunca envía mensajes reales.
- Diálogos nativos con control de foco y cierre mediante Escape; navegación de filas por teclado.

## Alcance

Todos los nombres, identificadores, documentos, conexiones, estados de IA, métricas y eventos son ficticios. El escenario fijo representa el 16 de octubre de 2026: el contador del trimestre forma parte de esa escena, no de un calendario en tiempo real.

Este repositorio contiene solo la presentación. No implementa login real, backend, permisos, lectura de documentos, exportación contable ni conexión a WhatsApp, A3, Holded o n8n. Los cambios son temporales. Seleccionar un archivo en un diálogo no lo sube a ningún servidor. No introducir información real de clientes.

El calendario fiscal muestra ejemplos del diseño. Las fechas de adaptación SIF (enero/julio de 2027) se han contrastado con la [nota informativa de la AEAT](https://sede.agenciatributaria.gob.es/Sede/iva/sistemas-informaticos-facturacion-verifactu/nota-informativa-ampliacion-plazo-adaptacion-facturacion.html); la adaptación al reglamento SIF no obliga a elegir la modalidad VERI*FACTU. Una implementación real debe mantener el calendario y los supuestos de cada cliente actualizados.

Los PDFs privados de investigación y formación permanecen fuera de este repositorio. El diseño deriva del PRD y SPEC del proyecto de la landing; la cobertura visual se documenta en la tabla anterior.

## Archivos

- `index.html`: estructura de la aplicación.
- `app.css`: sistema visual y adaptación a dispositivos.
- `app.js`: datos ficticios, pantallas y navegación.
- `demo.js`: formularios, estados y pequeños comportamientos de presentación.
- `assets/logo-nexavision.jpg`: marca.
- `.nojekyll`: publicación estática en Pages.

## Publicación

GitHub Pages: rama `main`, carpeta `/ (root)`. No hay proceso de build personalizado ni dependencias. Las tipografías usan Google Fonts con alternativas locales.
