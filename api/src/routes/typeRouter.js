const express = require('express');
const axios = require('axios');
const { Type } = require('../db');

const router = express.Router()


router.get('/', async (req, res) => {
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
    const types = typesApi.data.results.map(element => element.name);
  
    for (const typeName of types) {
      await Type.findOrCreate({
        where: { name: typeName }
      });
    }
  
    const allTypes = await Type.findAll();
    res.send(allTypes);
  });
  
  module.exports = router;
  
  
  
  
  