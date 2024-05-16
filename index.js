const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

const uri = "mongodb+srv://darftsoftware:11101110@cluster0.8en20si.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MongoDB', err);
    process.exit(1);
  }

  const collection = client.db("Guia-Canino").collection("dogs");

  app.get('/dogs', async (req, res) => {
    try {
      const dogs = await collection.find({}).toArray();
      res.json(dogs);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get('/dogs/:nome', async (req, res) => {
    const nome = req.params.nome;
    try {
      const dog = await collection.findOne({ nome: nome });
      if (dog) {
        res.json(dog);
      } else {
        res.status(404).send('Dog not found');
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
});
