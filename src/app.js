const express = require('express');
const os = require('os');
const notesRouter = require('./routes/notes');

const app = express();

app.use(express.json());

// Lab 1 - Hello Cloud
app.get('/', (req, res) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://thongfank.github.io'
  );

  res.json({
    message: 'Xin chào từ đám mây!',
    host: os.hostname(),
    platform: `${os.type()} ${os.release()}`,
    cpus: os.cpus().length,
    memoryGB: Number(
      (os.totalmem() / 1024 ** 3).toFixed(1)
    ),
    uptimeSec: Math.round(os.uptime()),
    time: new Date().toISOString()
  });
});

// Lab 3 - Notes API
app.use('/notes', notesRouter);

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error(err.name || 'ServerError');

  const clientError =
    ['ValidationError', 'CastError'].includes(err.name)
    || err.code === 'LIMIT_FILE_SIZE'
    || err.type === 'entity.parse.failed';

  res.status(clientError ? 400 : 500).json({
    error: clientError
      ? err.message
      : 'Lỗi máy chủ nội bộ'
  });
});

module.exports = app;