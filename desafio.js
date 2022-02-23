/*class Usuario {
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
*/
function User(nombre, apellido, libros, mascotas) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.libros = libros;
  this.mascotas = mascotas;
}

User.prototype.fullName = function () {
  console.log(`${this.nombre} ${this.apellido}`);
};

User.prototype.addPet = function (newPet) {
  this.mascotas.push(newPet);
  console.log(this.mascotas);
};
User.prototype.pets = function () {
  console.log(this.mascotas.length);
};
User.prototype.addBook = function (newBook) {
  this.libros.push(newBook);
};
User.prototype.getBooks = function () {
  this.libros.map((libro) => {
    console.log(libro.nombre);
  });
};

let user1 = new User(
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
