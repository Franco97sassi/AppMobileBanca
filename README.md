# Áurea Mobile

> Una experiencia bancaria móvil de portafolio construida con React Native, Expo y TypeScript.

[![Quality](https://github.com/Franco97sassi/AppMobileBanca/actions/workflows/quality.yml/badge.svg)](https://github.com/Franco97sassi/AppMobileBanca/actions/workflows/quality.yml)
![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

Áurea presenta un flujo financiero completo, cuidado y accesible para entrevistas y demostraciones. **No es una entidad financiera, no se conecta a cuentas reales y no procesa dinero.**

## Funcionalidades

- Acceso demo, contraseña ocultable y estados explícitos de carga, error y reintento.
- Dashboard con patrimonio, cuentas, saldo ocultable y fecha dinámica.
- Historial con búsqueda por comercio/categoría, filtros y totales calculados.
- Transferencias cancelables con validación, clave idempotente, prevención de doble envío y comprobante.
- Deep links (`aurea://transfer`, `aurea://activity`) para abrir directamente cada sección.
- Adaptadores local y HTTP tipado bajo el mismo contrato, con timeout y mapeo consistente de errores.
- Tarjeta interactiva con congelación, compras online y uso internacional.
- Perfil, indicador de 2FA, auditoría visual y cierre de sesión.
- Etiquetas de accesibilidad, estados vacíos y teclado adaptado a iOS/Android.

## Capturas de pantalla

Las capturas siguen el recorrido principal de la aplicación: acceso, consulta de saldos y movimientos, transferencia, gestión de tarjetas y perfil.

| Acceso | Inicio |
|:---:|:---:|
| <img src="docs/images/login-aurea.jpg" alt="Pantalla de acceso a Áurea" width="320" /> | <img src="docs/images/dashboard-aurea.jpg" alt="Dashboard principal con patrimonio, cuentas y últimos movimientos" width="320" /> |
| **Privacidad de saldos** | **Actividad** |
| <img src="docs/images/saldos-ocultos.jpg" alt="Dashboard con los saldos ocultos" width="320" /> | <img src="docs/images/historial.jpg" alt="Historial de movimientos con búsqueda y filtros" width="320" /> |
| **Comprobante de transferencia** | **Gestión de tarjetas** |
| <img src="docs/images/comprobante.jpg" alt="Confirmación y comprobante de una transferencia enviada" width="320" /> | <img src="docs/images/congelada.jpg" alt="Gestión de una tarjeta congelada y sus permisos" width="320" /> |
| **Perfil y seguridad** | |
| <img src="docs/images/perfil.jpg" alt="Perfil de usuario con opciones de cuenta y seguridad" width="320" /> | |

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

GitHub Actions ejecuta esas comprobaciones en cada `push` y pull request. El flujo crítico de transferencia también está descrito como prueba de dispositivo en `e2e/transfer.yaml` (Maestro).
La cobertura incluye dominio, navegación e infraestructura y aplica un umbral global mínimo de 90% en líneas, funciones y sentencias, y 85% en ramas.

## Arquitectura

```text
App.tsx                 # composición principal
src/
├── components/         # navegación y elementos reutilizables
├── data/               # fixtures de la demostración
├── domain/             # reglas puras y pruebas unitarias
├── hooks/              # sesión, navegación y estado demo
├── infrastructure/     # adaptadores local y HTTP intercambiables
├── screens/            # casos de uso
├── theme.ts            # tokens visuales
└── types.ts            # contratos del dominio
```

Consulta el [diagrama y las decisiones de arquitectura](docs/architecture.md).

## Alcance y seguridad

Los datos viven exclusivamente en memoria. Los mensajes de la interfaz distinguen la simulación de las protecciones que corresponderían a producción. Un producto real necesitaría un backend autoritativo para saldos, límites, fraude y ledger; tokens en Keychain/Keystore; biometría; telemetría sin PII y claves de idempotencia generadas por operación.

## Evolución pendiente

- [ ] React Navigation para stacks, transiciones nativas y restauración de estado.
- [ ] Conectar el adaptador HTTP a un backend desplegado y añadir cache de servidor.
- [ ] Ejecutar el flujo Maestro en una granja de dispositivos desde CI.
- [ ] Modo oscuro y localización.
- [ ] Build público con EAS Update.

## Conversación para entrevistas

Las decisiones y limitaciones son deliberadamente visibles: estado local para una demo reproducible, reglas separadas para probarlas sin UI y una frontera clara para reemplazar fixtures por infraestructura. Esto permite discutir seguridad móvil, consistencia financiera, idempotencia, manejo de errores y evolución del producto sin fingir que la demo es un banco real.

## Licencia

Distribuido bajo la [licencia MIT](LICENSE).
