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
    const { nombre, balance } = usuario
    console.log(nombre, balance)
    try {
        const result = await BD.query('INSERT INTO usuarios (nombre, balance) VALUES ($1, $2)', [nombre, balance]);
        return result.rows
    } catch (error) {
        throw error
    }
}

export const getUsuarios = async () => {
    try {
        const result = await BD.query(`SELECT * FROM usuarios`)
        return result.rows
    } catch (error) {
        throw error
    }
}

export const deleteUsuario = async (usuario) => {
    const { id } = usuario
    try {
        const result = await BD.query(`DELETE FROM usuarios WHERE id = ${id} RETURNING *`)
        return result.rows
    } catch (error) {
        throw error
    }
}

export const putUsuario = async (usuario) => {
    const { nombre, balance, id } = usuario
    try {
        const result = BD.query(`UPDATE usuarios SET nombre = ${nombre}, balance = ${balance} WHERE id = ${id} RETURNING *`)
        return result.rows
    } catch (error) {
        throw error
    }
}


export const getTransferencias = async () => {
    try {
        const result = BD.query(`SELECT * FROM transferencias`)
        return result.rows
    } catch (error) {
        throw error
    }
}


export const postTransferencias = async (transferencia) => {
    const { emisor, receptor, monto } = transferencia
    try {
        await BD.query('BEGIN')
        const descontar = `UPDATE usuarios SET balance = balance - ${monto} WHERE nombre = ${emisor}`
        await BD.query(descontar)

        const transaccion = `UPDATE usuarios SET balance = balance + ${monto} WHERE nombre = ${receptor}`
        await BD.query(transaccion)
        await BD.query('COMMIT;')
    } catch (error) {
        await BD.query('ROLLBACK')
        throw error
    }
}