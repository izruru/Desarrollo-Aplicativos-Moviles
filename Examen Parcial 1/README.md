# Sistema de Login Básico - Parcial 1

Este sistema está hecho en TypeScript y simula un login básico para validar usuarios desde un archivo JSON.


## ¿Que hace?

- Pide email y contraseña
- Valida formato del email
- Verifica si el usuario existe
- Chequea si la contraseña coincide
- Muestra mensajes personalizados según el rol del usuario


## Datos de usuarios

Los usuarios están en `users.json`, con sus campos: `id`, `nombre`, `email`, `password`, `rol`.

Roles usados:
- admin
- manager
- employee
- guest


## Mensajes por rol

Cada rol tiene un mensaje de bienvenida diferente, estan escritos con referencias al juego *Honkai Impact 3rd* y cumple todo lo que pide el parcial.

> Ejemplo:
> `¡Bienvenido Otto Apocalypse! Como Admin, tenes total acceso al Imaginary Tree y control total sobre Schicksal.`;

Esto es solo estético, no cambia la lógica del sistema.

## Mensaje por dia de acceso

Se verifica que dia es y se notifica al usuario si dicho dia esta permitido el acceso al servidor o no, Nuevamente haciendo referencia al juego *Honkai Impact 3rd* 

> Ejemplo: 
> `El Imaginary Tree está sellado los jueves por ordenes de Otto Apocalypse. No se permite el ingreso al sistema.`

## Cómo usarlo

1. Instalar TypeScript si no lo tenés:
   ```bash
   npm install -g typescript
   npm install -g ts-node typescript
2. Ejecutar el archivo
   ```bash
   npx ts-node examen-login.ts
3. Listo pa


## Casos de Prueba

- Login exitoso con cada rol
- Dia de acceso correcto
- Email incorrecto
- Contraseña incorrecta
- Email con formato inválido
- Email vacío
- contraseña vacía

Si anda todo bien, el sistema te responde según el usuario que ingreses.
