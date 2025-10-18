const User = require('./userModel');

async function test() {
  // Creamos un usuario de prueba
  const userData = {
    password: '123456',
    username: 'Camil',
    role: 1,
    correo: 'camil@example.com',
    rut: '12345678-9',
    region: 'Región Metropolitana',
    district: 'Santiago',
    isMember: true,
    profilePicture: null
  };

  try {
    const newUser = await User.create(userData);
    console.log('Usuario creado:', newUser);

    const users = await User.getAll();
    console.log('Usuarios en DB:', users);

    const user = await User.findByEmail('camil@example.com');
    console.log('Usuario encontrado:', user);
  } catch (err) {
    console.error(err);
  }
}

test();