'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Redis
const redis = require('redis');
const client = redis.createClient({
    //host: process.env.REDIS_HOST,
    host: 'redis',
    port: 6379,
    //password: process.env.REDIS_PASSWORD,
});

client.on('error', err => {
  console.log('Error ' + err);
});

// App
const app = express();
app.use(express.json());

// GET
app.get('/:key', (req, res) => {

  client.get(req.params.key, (err, reply) => {
    if (err) throw err;
      console.log(reply);

      return res.send(reply)
      .status(200);
  });
});

// POST
app.post('/', (req, res) => {

  client.set(req.body.key, req.body.value, (err, reply) => {
    if (err) throw err;
    console.log(reply);
    
    res.send(req.body)
    return res.status(200);
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
