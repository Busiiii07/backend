const User = require('./src/models/User');

function provar(titol, dades) {
  const err = new User(dades).validateSync();
  console.log(`\n${titol}`);
  if (!err) {
    console.log('  ✔ Vàlid (cap error)');
  } else {
    Object.entries(err.errors).forEach(([camp, e]) =>
      console.log(`  ✘ ${camp}: ${e.message}`)
    );
  }
}

provar('1. Usuari correcte', {
  nom: 'Marc',
  cognom: 'Busquets',
  email: 'marc@test.com',
  password: 'Password1',
});

provar('2. Sense camps obligatoris', {});

provar('3. Nom massa curt', {
  nom: 'A', cognom: 'Busquets', email: 'marc@test.com', password: 'Password1',
});

provar('4. Email no vàlid', {
  nom: 'Marc', cognom: 'Busquets', email: 'no-es-email', password: 'Password1',
});

provar('5. Password curta', {
  nom: 'Marc', cognom: 'Busquets', email: 'marc@test.com', password: '123',
});

provar('6. Rol no vàlid', {
  nom: 'Marc', cognom: 'Busquets', email: 'marc@test.com',
  password: 'Password1', rol: 'superadmin',
});