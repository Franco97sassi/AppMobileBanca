# Áurea Mobile

[![Quality](https://github.com/Franco97sassi/AppMobileBanca/actions/workflows/quality.yml/badge.svg)](https://github.com/Franco97sassi/AppMobileBanca/actions/workflows/quality.yml)

Aplicación bancaria móvil construida con **React Native, Expo y TypeScript** para demostrar en entrevistas un producto cuidado y un flujo financiero completo. Áurea es un proyecto de portafolio: no es una entidad financiera ni procesa dinero real.

## Demo funcional

- Acceso con credenciales de demostración y ocultación de contraseña.
- Dashboard con patrimonio, cuentas, saldo ocultable, atajos y resumen inteligente.
- Historial de movimientos con búsqueda y filtros de ingresos/gastos.
- Transferencias con selección de destinatario, validación de saldo, concepto y comprobante.
- Tarjeta interactiva: congelación, compras online y uso internacional.
- Perfil, indicadores de 2FA, último acceso auditado y cierre de sesión.
- Navegación móvil accesible, estados vacíos, feedback y teclado adaptado a iOS/Android.

Los datos viven en memoria para que la demo sea instantánea y se restablecen al reiniciar la aplicación. No se envían datos ni dinero real. El estado del dominio se gestiona mediante Context y un reducer independiente, preparado para sustituir los fixtures por un repositorio persistente o un cliente HTTP.

## Inicio rápido

Requisitos: Node.js 20+, npm y Expo Go o un simulador.

```bash
npm install
npm start
```

Después pulse `a` (Android), `i` (iOS) o escanee el QR con Expo Go. Las credenciales ya aparecen precargadas.

## Scripts

```bash
npm run typecheck  # tipos estrictos
npm run lint       # reglas de Expo/React Native
npm test           # pruebas unitarias del dominio
npm run test:ci    # pruebas con cobertura y umbrales de calidad
npm run android    # abre Android
npm run ios        # abre iOS
```

## Arquitectura

```text
App.tsx                 # sesión, navegación y estado de la demo
src/
├── components/         # navegación y componentes reutilizables
├── data/               # fixtures y formato monetario
├── screens/            # casos de uso por pantalla
├── state/              # contexto, reducer y selectores del dominio
├── theme.ts            # sistema visual
└── types.ts            # contrato del dominio
```

## Evolución a producción

Las transferencias de la demo únicamente actualizan el saldo y el historial locales; no implementan cifrado de extremo a extremo, autenticación bancaria ni idempotencia de red. Para conectarla a un backend bancario real se recomienda añadir TanStack Query, almacenamiento del access token en memoria, refresh token en cookie segura (web) o Keychain/Keystore (nativo), biometría con `expo-local-authentication`, certificate pinning, telemetría sin PII y un `Idempotency-Key` único en cada transferencia. El backend debe mantener la autoridad sobre saldos, límites, fraude y el ledger de doble entrada.

## Calidad y CI

Cada `push` a `main` y cada pull request ejecuta en GitHub Actions la comprobación de tipos, ESLint y las pruebas con cobertura. El lockfile permite que CI y las instalaciones locales utilicen exactamente el mismo árbol de dependencias.

## Licencia

MIT.
