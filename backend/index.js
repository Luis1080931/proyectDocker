import express from 'express';
import bodyParser from 'body-parser';
import { pool } from './conexio.js'; // Asegúrate de que 'pool' se exporte correctamente desde 'conexio.js'
import cors from 'cors';

const servidor = express();

servidor.use(cors());

servidor.use(express.json());
servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: false }));

servidor.post('/user', async (req, res) => {
  const { nombre } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO user (nombre) VALUES (?)', [nombre]);
    if (result.affectedRows > 0) {
      res.status(200).json({
        message: 'Registro exitoso'
      });
    } else {
      res.status(403).json({
        message: 'Error de registro'
      });
    }
  } catch (error) {
    console.error('Error al insertar en la base de datos:', error);
    res.status(500).json({
      message: 'Error interno del servidor'
    });
  }
});

servidor.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
