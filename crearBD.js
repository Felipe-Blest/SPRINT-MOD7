import pkg from 'pg'
const { Client } = pkg

//cambie las variables según corresponda
const crearBD = async () => {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        password: 'gameover',
        port: 5432,
        database: 'postgres'
    })

    try {
        await client.connect()
        await client.query('CREATE DATABASE SPRINT7_GRUPO1')
        await client.end()

        const BDsprint = new Client({
            user: 'postgres',
            host: 'localhost',
            password: 'gameover',
            port: 5432,
            database: 'sprint7_grupo1'
        })
        try {
            await BDsprint.connect()
            const tablaUsuario = `CREATE TABLE usuarios (id SERIAL PRIMARY KEY, nombre VARCHAR(50),
            balance FLOAT CHECK (balance >= 0));`

            await BDsprint.query(tablaUsuario)

            const tablaTransferencia = `CREATE TABLE transferencias(id SERIAL PRIMARY KEY, emisor INT, receptor
                INT, monto FLOAT, fecha TIMESTAMP, FOREIGN KEY (emisor) REFERENCES
                usuarios(id), FOREIGN KEY (receptor) REFERENCES usuarios(id));`

            await BDsprint.query(tablaTransferencia)
        } catch (error) {
            console.log(`Error al conectar y definición de tablas por ${error}`)
        }
    } catch (error) {
        throw error
    }
    finally {
        client.end()
    }
}

crearBD()