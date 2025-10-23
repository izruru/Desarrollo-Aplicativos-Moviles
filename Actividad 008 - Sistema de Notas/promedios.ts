interface Estudiante {
  nombre: string;
  notas: number[];
  promedio?: number;
  estado?: string;
}

const estudiantes: Estudiante[] = [
  { nombre: "Ana", notas: [8, 7, 9] },
  { nombre: "Lucas", notas: [4, 5, 6] },
  { nombre: "Martina", notas: [2, 3, 3] },
  { nombre: "Julián", notas: [10, 9, 10] }
];

function calcularPromedio(notas: number[]): number {
  let suma = 0;
  for (let i = 0; i < notas.length; i++) {
    suma += notas[i];
  }
  return parseFloat((suma / notas.length).toFixed(2));
}

function obtenerEstado(promedio: number): string {
  if (promedio >= 7) return "Promocionado";
  else if (promedio >= 4) return "Aprobado";
  else return "Desaprobado";
}

function generarReporte(estudiantes: Estudiante[]): void {
  console.log("=== REPORTE DE NOTAS ===");
  for (let est of estudiantes) {
    est.promedio = calcularPromedio(est.notas);
    est.estado = obtenerEstado(est.promedio);
    console.log(
      `${est.nombre} - Promedio: ${est.promedio} - Estado: ${est.estado}`
    );
  }

  const total = estudiantes.reduce((acc, est) => acc + (est.promedio || 0), 0);
  const promedioClase = total / estudiantes.length;
  console.log("\nPromedio general de la clase:", promedioClase.toFixed(2));
}

generarReporte(estudiantes);
