// Importamos 'fs' para guardar la factura como archivo
import * as fs from 'fs';

// Definimos la estructura de un producto
interface Producto {
  nombre: string;
  precio: number;
  cantidad: number;
  descuento?: number; // opcional
  iva?: number;        // opcional
}

// Información del cliente
interface Cliente {
  nombre: string;
  email: string;
  telefono: string;
}

// Estructura general de una factura
interface Factura {
  cliente: Cliente;
  productos: Producto[];
  fecha: Date;
  numero: string;
}

// Función para calcular el total de la factura
function facturarProductos(productos: Producto[]): number {
  let total: number = 0;

  for (const producto of productos) {
    let precioUnitario = producto.precio;

    // Aplicar descuento si corresponde
    if (producto.descuento) {
      precioUnitario *= (1 - producto.descuento / 100);
    }

    // Aplicar IVA si corresponde
    if (producto.iva) {
      precioUnitario *= (1 + producto.iva / 100);
    }

    total += precioUnitario * producto.cantidad;
  }

  return total;
}

// Función para mostrar factura por consola
function imprimirFactura(factura: Factura): string {
  const { cliente, productos, fecha, numero } = factura;
  let salida: string[] = [];

  salida.push("=".repeat(50));
  salida.push(`FACTURA Nº: ${numero}`);
  salida.push(`Cliente: ${cliente.nombre} | Email: ${cliente.email}`);
  salida.push(`Tel: ${cliente.telefono}`);
  salida.push(`Fecha: ${fecha.toLocaleDateString()}`);
  salida.push("=".repeat(50));
  salida.push("\nDetalle de productos:");
  salida.push("-".repeat(50));

  productos.forEach((producto, index) => {
    const precioBase = producto.precio;
    const precioDescuento = producto.descuento
      ? precioBase * (1 - producto.descuento / 100)
      : precioBase;
    const precioConIVA = producto.iva
      ? precioDescuento * (1 + producto.iva / 100)
      : precioDescuento;
    const subtotal = precioConIVA * producto.cantidad;

    salida.push(`${index + 1}. ${producto.nombre}`);
    salida.push(` Precio unitario: $${precioBase.toFixed(2)}`);

    if (producto.descuento) {
      salida.push(` Descuento: ${producto.descuento}%`);
      salida.push(` Precio con descuento: $${precioDescuento.toFixed(2)}`);
    }

    if (producto.iva) {
      salida.push(` IVA: ${producto.iva}%`);
      salida.push(` Precio con IVA: $${precioConIVA.toFixed(2)}`);
    }

    salida.push(` Cantidad: ${producto.cantidad}`);
    salida.push(` Subtotal: $${subtotal.toFixed(2)}\n`);
  });

  const totalFactura = facturarProductos(productos);

  salida.push("-".repeat(50));
  salida.push(`TOTAL A PAGAR: $${totalFactura.toFixed(2)}`);
  salida.push("=".repeat(50));

  const facturaCompleta = salida.join("\n");
  console.log(facturaCompleta);
  return facturaCompleta;
}

// Función para guardar la factura como archivo .txt
function guardarFactura(contenido: string, numeroFactura: string): void {
  fs.writeFileSync(`factura_${numeroFactura}.txt`, contenido);
  console.log(`Factura guardada como: factura_${numeroFactura}.txt`);
}

// Datos simulados
const productosAFacturar: Producto[] = [
  { nombre: "Laptop Gaming", precio: 1200, cantidad: 1, descuento: 10 },
  { nombre: "Mouse Inalámbrico", precio: 25, cantidad: 2 },
  { nombre: "Monitor 24\"", precio: 300, cantidad: 1, descuento: 5 },
  { nombre: "Teclado Mecánico", precio: 80, cantidad: 1, descuento: 15, iva: 21 }
];

const clienteEjemplo: Cliente = {
  nombre: "Juan Pérez",
  email: "juan.perez@email.com",
  telefono: "341-1234567"
};

const factura: Factura = {
  cliente: clienteEjemplo,
  productos: productosAFacturar,
  fecha: new Date(),
  numero: "0001-00000001"
};

// Imprimo y guardo la factura
const contenidoFactura = imprimirFactura(factura);
guardarFactura(contenidoFactura, factura.numero.replace("-", ""));
