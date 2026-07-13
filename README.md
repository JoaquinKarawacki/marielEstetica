# Mariel Martínez — Estética Femenina

Demo de sitio web + sistema de reservas para **Mariel Martínez, Estética Femenina**
(@marielestetica52, Parque Batlle, Montevideo). Next.js 16 + TypeScript + Tailwind CSS v4 +
Framer Motion + Prisma (SQLite).

## Cómo levantarla

```bash
npm install
npx prisma db seed   # carga servicios + ~11 reservas de ejemplo (solo hace falta una vez)
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

> El proyecto ya incluye una base SQLite (`prisma/dev.db`) con datos de ejemplo. Si querés
> reiniciar la demo a su estado inicial, volvé a correr `npx prisma db seed`.

## Clave del panel admin

Ruta: **`/admin`** · Clave: **`mariel`**

## Flujo de demo sugerido

1. **Landing (`/`)** — mostrar hero, servicios filtrables por categoría, beneficios, galería,
   promo del combo de depilación + gift cards, ubicación con mapa y testimonios.
2. **Reservar un turno (`/reservar`)** — elegir un servicio, confirmar la profesional, elegir
   fecha y horario (solo se muestran los libres), completar los datos y confirmar. Se genera un
   código de reserva único (`MM-XXXXX`) con opción de agregar el turno al calendario.
3. **Abrir el panel admin (`/admin`, clave `mariel`)** — mostrar cómo la reserva recién creada
   aparece al instante en la agenda semanal, en el listado de reservas y como notificación
   estilo WhatsApp en la pestaña "Notificaciones" (con toast en vivo — el panel hace polling
   cada 4s).
4. **Mis turnos (`/mis-turnos`)** — buscar por el teléfono o el código usado en el paso 2,
   cancelar o reagendar el turno, y volver al panel admin para mostrar que el horario se liberó
   y quedó registrada la nueva notificación de cancelación/reagendamiento.

## Notas técnicas

- **Notificaciones**: son simuladas dentro de la app (toast + tarjeta con la vista previa exacta
  del mensaje de WhatsApp que recibiría Mariel). El punto de envío real está marcado con
  `// TODO: conectar API WhatsApp/Twilio/Email` en `src/app/api/bookings/route.ts`,
  `cancel/route.ts` y `reschedule/route.ts` — conectar un proveedor ahí es lo único que falta
  para notificaciones reales.
- **Disponibilidad**: los horarios se calculan en base a la duración de cada servicio, el
  horario de atención (lunes a viernes 9–19, sábados 9–13, domingo cerrado) y las reservas ya
  tomadas, evitando dobles reservas del mismo horario.
- **Base de datos**: SQLite vía Prisma 7 (driver adapter `@prisma/adapter-libsql`), pensada para
  que la demo persista entre recargas sin depender de un servicio externo.
- El proyecto corre con `next dev --webpack` (no Turbopack) porque la carga de Google Fonts vía
  `next/font/google` bajo Turbopack presentó problemas en este entorno.
