import * as fs from 'fs';
// Interfaces piolas
interface Libro {
  titulo: string;
  autor: string;
  isbn: string;
  fechaPrestamo: string; // formato YYYY-MM-DD
  fechaDevolucionPrevista: string;
  tipoUsuario: 'estudiante' | 'profesor' | 'general';
}
interface ReporteMulta {
  titulo: string;
  autor: string;
  diasRetraso: number;
  multa: number;
  tipoUsuario: string;
}
// Calculo los dias de retraso 
function calcularDiasRetraso(fechaDevolucionPrevista: string, fechaActual: string): number {
  const devolucion = new Date(fechaDevolucionPrevista);
  const actual = new Date(fechaActual);
  const diferencia = actual.getTime() - devolucion.getTime();
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  return dias > 0 ? dias : 0;
}
// Calculo las multas segun el usuario
function calcularMulta(diasRetraso: number, tipoUsuario: string): number {
  if (diasRetraso === 0) return 0;

  switch (tipoUsuario) {
    case 'estudiante': return diasRetraso * 50;
    case 'profesor': return diasRetraso * 30;
    case 'general': return diasRetraso * 100;
    default: return 0;
  }
}
// Proceso todos los libros y armo el reporte
function generarReporte(libros: Libro[], fechaActual: string): ReporteMulta[] {
  const reporte: ReporteMulta[] = [];

  for (const libro of libros) {
    const diasRetraso = calcularDiasRetraso(libro.fechaDevolucionPrevista, fechaActual);
    const multa = calcularMulta(diasRetraso, libro.tipoUsuario);

    reporte.push({
      titulo: libro.titulo,
      autor: libro.autor,
      diasRetraso,
      multa,
      tipoUsuario: libro.tipoUsuario
    });
  }

  return reporte;
}
// Imprimo el re porte en la consola
function imprimirReporte(reporte: ReporteMulta[], totalLibros: number): string {
  let salida: string[] = [];

  salida.push("=".repeat(40));
  salida.push("REPORTE DE BIBLIOTECA");
  salida.push("=".repeat(40));

  let totalMultas = 0;
  let librosConRetraso = 0;

  for (const item of reporte) {
    salida.push(`Libro: ${item.titulo}`);
    salida.push(`Autor: ${item.autor}`);
    salida.push(`Usuario: ${item.tipoUsuario.charAt(0).toUpperCase() + item.tipoUsuario.slice(1)}`);

    if (item.diasRetraso > 0) {
      salida.push(`Días de retraso: ${item.diasRetraso}`);
      salida.push(`Multa: $${item.multa}`);
      librosConRetraso++;
    } else {
      salida.push(`Estado: Sin retraso`);
      salida.push(`Multa: $0`);
    }

    totalMultas += item.multa;
    salida.push("-".repeat(40));
  }

  salida.push(`TOTAL DE MULTAS: $${totalMultas}`);
  salida.push(`LIBROS CON RETRASO: ${librosConRetraso} de ${totalLibros}`);
  salida.push("=".repeat(40));

  const reporteFinal = salida.join('\n');
  console.log(reporteFinal);
  return reporteFinal;
}
// Guardo el reporte en un .txt
function guardarReporte(contenido: string, nombreArchivo: string): void {
  try {
    fs.writeFileSync(nombreArchivo, contenido);
    console.log(` Reporte guardado como: ${nombreArchivo}`);
  } catch (error) {
    console.error(" Error al guardar el archivo:", error);
  }
}
const libros: Libro[] = [
  {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    isbn: "978-84-376-0494-7",
    fechaPrestamo: "2024-06-01",
    fechaDevolucionPrevista: "2024-06-20",
    tipoUsuario: "estudiante"
  },
  {
    titulo: "El Aleph",
    autor: "Jorge Luis Borges",
    isbn: "978-950-06-2291-7",
    fechaPrestamo: "2024-05-15",
    fechaDevolucionPrevista: "2024-06-01",
    tipoUsuario: "estudiante"
  },
  {
    titulo: "Rayuela",
    autor: "Julio Cortázar",
    isbn: "978-987-1138-88-4",
    fechaPrestamo: "2024-05-20",
    fechaDevolucionPrevista: "2024-06-10",
    tipoUsuario: "profesor"
  },
  {
    titulo: "Martín Fierro",
    autor: "José Hernández",
    isbn: "978-987-1138-77-8",
    fechaPrestamo: "2024-05-25",
    fechaDevolucionPrevista: "2024-06-05",
    tipoUsuario: "general"
  }
];

const fechaHoy = "2024-06-15";

const reporte = generarReporte(libros, fechaHoy);
const contenidoReporte = imprimirReporte(reporte, libros.length);
guardarReporte(contenidoReporte, 'reporte_biblioteca.txt');
