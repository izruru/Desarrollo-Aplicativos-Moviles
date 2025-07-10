// Empieza lo bueno 
import * as fs from 'fs';

// Interfz de usuario
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: "admin" | "manager" | "employee" | "guest";
}

// Leer el archivo JSON y parsearlo
const datos = fs.readFileSync('./users.json', 'utf-8');
const { usuarios }: { usuarios: Usuario[] } = JSON.parse(datos);

// Verificar si el día de acceso es válido
function verificarDiaDeAcceso(): boolean {
  const diasBloqueados = [2, 4, 6]; // Martes, Jueves y Sábado
  const hoy = new Date().getDay();  

  if (diasBloqueados.includes(hoy)) {
    const nombresDias = ["domingos", "lunes", "martes", "miércoles", "jueves", "viernes", "sábados"];
    const diaNombre = nombresDias[hoy];

    console.log(`El Imaginary Tree está sellado los ${diaNombre} por ordenes de Otto Apocalypse. No se permite el ingreso al sistema.`);
    return false;
  }

  return true;
}

// Funcion para validar el mail
function validarEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Funcion para buscar usuario 
function buscarUsuario(email: string): Usuario | null {
  return usuarios.find(u => u.email === email) || null;
}

// Funcion para validar contraseña
function verificarPassword(usuario: Usuario, password: string): boolean {
  return usuario.password === password;
}

// Mensaje de bienvenida por rol
function mensajePorRol(usuario: Usuario): string {
  const nombre = usuario.nombre;
  switch (usuario.rol.toLowerCase()) {
    case "admin":
      return `¡Bienvenido ${nombre}! Como Admin, tenes total acceso al Imaginary Tree y control total sobre Schicksal.`;
    case "manager":
      return `¡Bienvenida ${nombre}! Como Manager, supervisás las operaciones del Hyperion y controlás los equipos de batalla.`;
    case "employee":
      return `¡Bienvenida ${nombre}! Como Employee, tenes que cumplir tus misiones asignadas para proteger el mundo del Honkai y evitar el Tercer Impacto.`;
    case "guest":
      return `¡Bienvenida ${nombre}! Como Guest, tenes acceso a los registros del Hyperion pero sin intervenir directamente en el combate.`;
    default:
      return `¡Bienvenido ${nombre}! Tu rol no fue reconocido, pero igual sos parte del escuadrón.`;
  }
}

// Funcion principal de login
function login(email: string, password: string): void {
  if (!email || !validarEmail(email)) {
    console.log("ERROR DE VALIDACIÓN");
    console.log("El formato del email es inválido.");
    return;
  }

  if (!password) {
    console.log("ERROR DE VALIDACIÓN");
    console.log("La contraseña no puede estar vacía.");
    return;
  }

  const usuario = buscarUsuario(email);

  if (!usuario) {
    console.log("ERROR DE LOGIN");
    console.log("El email ingresado no está registrado en el sistema.");
    return;
  }

  if (!verificarPassword(usuario, password)) {
    console.log("ERROR DE LOGIN");
    console.log("La contraseña ingresada es incorrecta.");
    return;
  }

  console.log("¡LOGIN EXITOSO!");
  console.log(mensajePorRol(usuario));
}

// Verificar si el día de acceso es válido antes de continuar
if (!verificarDiaDeAcceso()) {
  process.exit(0); 
}

// Ejemplo de uso
const emailInput = "employee@honkai.com";
const passwordInput = "herrschofvoid";

login(emailInput, passwordInput);

