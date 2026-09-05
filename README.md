# Áurea Mobile

> Una experiencia bancaria móvil de portafolio construida con React Native, Expo y TypeScript.

[![Quality](https://github.com/Franco97sassi/AppMobileBanca/actions/workflows/quality.yml/badge.svg)](https://github.com/Franco97sassi/AppMobileBanca/actions/workflows/quality.yml)
![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

Áurea presenta un flujo financiero completo, cuidado y accesible para entrevistas y demostraciones. **No es una entidad financiera, no se conecta a cuentas reales y no procesa dinero.**

## Funcionalidades

- Acceso demo, contraseña ocultable y feedback de carga.
- Dashboard con patrimonio, cuentas, saldo ocultable y fecha dinámica.
- Historial con búsqueda por comercio/categoría, filtros y totales calculados.
- Transferencias con validación de formato, destinatario y saldo, además de comprobante.
- Tarjeta interactiva con congelación, compras online y uso internacional.
- Perfil, indicador de 2FA, auditoría visual y cierre de sesión.
- Etiquetas de accesibilidad, estados vacíos y teclado adaptado a iOS/Android.

## Inicio rápido

**Requisitos:** Node.js 20+, npm y Expo Go o un simulador.

```bash
git clone https://github.com/Franco97sassi/AppMobileBanca.git
cd AppMobileBanca
npm ci
npm start
```

Pulsa `a` para Android, `i` para iOS o escanea el QR con Expo Go. Las credenciales de demostración aparecen precargadas.

## Calidad

```bash
npm run typecheck      # tipos estrictos
npm run lint           # reglas Expo/React Native
npm test               # pruebas del dominio
npm run test:coverage  # cobertura
```

GitHub Actions ejecuta esas comprobaciones en cada `push` y pull request.

## Arquitectura

```text
App.tsx                 # composición principal
src/
├── components/         # navegación y elementos reutilizables
├── data/               # fixtures de la demostración
├── domain/             # reglas puras y pruebas unitarias
├── hooks/              # sesión, navegación y estado demo
├── screens/            # casos de uso
├── theme.ts            # tokens visuales
└── types.ts            # contratos del dominio
```

Consulta el [diagrama y las decisiones de arquitectura](docs/architecture.md).

## Alcance y seguridad

Los datos viven exclusivamente en memoria. Los mensajes de la interfaz distinguen la simulación de las protecciones que corresponderían a producción. Un producto real necesitaría un backend autoritativo para saldos, límites, fraude y ledger; tokens en Keychain/Keystore; biometría; telemetría sin PII y claves de idempotencia generadas por operación.

## Roadmap

- [ ] React Navigation y deep links.
- [ ] Cliente HTTP tipado y TanStack Query.
- [ ] Pruebas de componentes y E2E en dispositivos.
- [ ] Modo oscuro y localización.
- [ ] Build público con EAS Update.

## Conversación para entrevistas

Las decisiones y limitaciones son deliberadamente visibles: estado local para una demo reproducible, reglas separadas para probarlas sin UI y una frontera clara para reemplazar fixtures por infraestructura. Esto permite discutir seguridad móvil, consistencia financiera, idempotencia, manejo de errores y evolución del producto sin fingir que la demo es un banco real.

## Licencia

Distribuido bajo la [licencia MIT](LICENSE).
