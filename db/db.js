import pkg from 'pg'
const { Pool } = pkg

const BD = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'gameover',
  port: 5432,
  database: 'sprint7_grupo1'
});



export const postUsuario = async (usuario) => {
  try {
    const { nombre, balance } = usuario;
    const query = 'INSERT INTO usuarios (nombre, balance) VALUES ($1, $2)';
    const values = [nombre, balance];
    await BD.query(query, values);
  } catch (error) {
    console.error('Error al insertar el usuario en la base de datos:', error);
    throw error;
  }
};
export const getUsuarios = async () => {
  try {
    const result = await BD.query('SELECT * FROM usuarios')
    return result.rows
  } catch (error) {
    throw error
  }
}

export const deleteUsuario = async (id) => {
  try {
    const result = await BD.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};




export const putUsuario = async (usuario) => {
  const { nombre, balance, id } = usuario;
  try {
    const query = await BD.query('UPDATE usuarios SET nombre = $1, balance = $2 WHERE id = $3 RETURNING *', [nombre, balance, id]);
    return query.rows;
  } catch (error) {
    throw error;
  }
};


// Cambia esta línea para asegurarte de que el resultado sea un arreglo
export const getTransferencias = async () => {
  try {
    const result = await BD.query('SELECT * FROM transferencias');
    return result.rows;
  } catch (error) {
    throw error;
  }
};




export const postTransferencias = async (transferencia) => {
  const { emisor, receptor, monto } = transferencia;
  try {
    await BD.query('BEGIN');

    const descontar = `UPDATE usuarios SET balance = balance - ${monto} WHERE nombre = '${emisor}'`;
    await BD.query(descontar);

    const transaccion = `UPDATE usuarios SET balance = balance + ${monto} WHERE nombre = '${receptor}'`;
    await BD.query(transaccion);

    await BD.query('COMMIT;');
    const insertarData = `INSERT INTO (transferencias, emisor, receptor, monto, fecha)`
  } catch (error) {
    await BD.query('ROLLBACK');
    throw error;
  }
};