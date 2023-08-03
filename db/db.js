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

export const getTransferencias = async () => {
  try {
    const result = await BD.query('SELECT u1.nombre AS emisor, u2.nombre AS receptor, t.monto,t.fecha FROM transferencias t JOIN usuarios u1 ON t.emisor = u1.id JOIN usuarios u2 ON t.receptor = u2.id;');
    return result.rows.map((row) => ({
      emisor: row.emisor,
      receptor: row.receptor,
      monto: row.monto,
      fecha: row.fecha
    }));
  } catch (error) {
    throw error;
  }
};

export const postTransferencias = async (transferencia) => {
  const { emisor, receptor, monto, fecha } = transferencia;
  try {
    await BD.query('BEGIN');
    const descontar = `UPDATE usuarios SET balance = balance - ${monto} WHERE id = '${emisor}'`;
    await BD.query(descontar);
    const transaccion = `UPDATE usuarios SET balance = balance + ${monto} WHERE id = '${receptor}'`;
    await BD.query(transaccion);
    await BD.query('COMMIT;');
  } catch (error) {
    await BD.query('ROLLBACK');
    throw error;
  } finally {
    const query = `INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES ($1, $2, $3,$4)`
    const values = [emisor, receptor, monto, fecha]
    await BD.query(query, values)
  }
};