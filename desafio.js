class Usuario {
  constructor(nombre, apellido, libros, mascotas) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    console.log(`${this.nombre} ${this.apellido}`);
  }
  addMascota(newMascota) {
    this.mascotas.push(newMascota);
    console.log(this.mascotas);
  }
  getMacotas() {
    console.log(this.mascotas.length);
  }
  addBook(newBook) {
    this.libros.push(newBook);
  }
  getBooks() {
    // this.libros.forEach((libro) => {
    //   console.log(libro.nombre);
    // });
    this.libros.map((libro) => {
      console.log(libro.nombre);
    });
  }
}

let usuario1 = new Usuario(
  'Giovanni',
  'Zulberti',
  [
    {
      nombre: 'Los Juegos del Hambre',
      autor: 'Suzanne Collins',
    },
  ],
  ['perro', 'gato']
);

usuario1.getFullName();
usuario1.addMascota('loro');
usuario1.addBook({
  nombre: 'El señor de los anillos',
  autor: 'J.R.R Tolkien',
});
usuario1.getMacotas();
usuario1.getBooks();
