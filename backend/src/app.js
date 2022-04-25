const fs = require('fs');
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const pokemones = require('./pokemon');
const app = express()
const port = 5000
const http = require('http');

app.use(express.json())
app.use(cors({
  origin: '*'
}));

var pokeList = [];
var loading = true;
var teams = [
  {
    pokemon: [],
    hps: [],
    enBatalla: 0,
    accion: null
  },
  {
    pokemon: [],
    hps: [],
    enBatalla: 0,
    accion: null
  }
];
let sockets = {};
let salaDeEspera = [];
loadPokemon();

app.get('/', (req, res) => {
  res.send('Pelea Pokemon!')
})

app.get('/pokemon/teams', (req, res) => {
  if (loading) {
    res.send('i\'m loading, please wait =owo=')
  } else {
    var team = req.query.equipo;
    res.json({ ...teams[team], socket: null });
  }
})

app.get('/pokemon/campo', (req, res) => {
  if (loading) {
    res.send('i\'m loading, please wait =owo=')
  } else {
    var campo = [];
    for (var i = 0; i < 2; i++) {
      campo.push(teams[i].enBatalla);
    }
    res.json(campo);
  }
})

app.post('/pokemon/estadisticas', (req, res) => {
  if (loading) {
    res.send('i\'m loading, please wait =owo=')
  } else {
    var equipo = req.body.team;
    var id = req.body.pokemon;

    res.json(teams[equipo].pokemon[id].stats);
  }
})

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const { Server } = require('socket.io');
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('se conecto un usuario');
  salaDeEspera.push(socket);
  if (salaDeEspera.length > 1) {
    salaDeEspera.forEach((s, index) => {
      s.emit('start', index);
      teams[index].socket = s;
    })
    salaDeEspera = [];
  }
  socket.on('accion', (body) => {
    if (loading) {
      res.send('i\'m loading, please wait =owo=')
    } else {
      var equipo = body.team;
      var enemigo = (equipo + 1) % 2;
      var campo = teams[equipo].enBatalla;
      var campoEnemigo = teams[enemigo].enBatalla;
      if (teams[equipo].hps[campo] > 0) {
        if (!teams[enemigo].accion) {

          teams[equipo].accion = body;

        } else {
          if (teams[equipo].pokemon[campo].stats[5].base_stat >= teams[enemigo].pokemon[campoEnemigo].stats[5].base_stat) {
            acciones(body);
            acciones(teams[enemigo].accion);
            teams[enemigo].accion = null;
          } else {
            acciones(teams[enemigo].accion);
            acciones(body);
            teams[enemigo].accion = null;
          }
          teams.forEach(t => {
            t.socket.emit('resultadoAccion', { ...t, socket: null })
          });
        }
        //res.send('acciones terminadas!');
      } else {
        acciones(body);
        teams[enemigo].accion = null;
        teams.forEach(t => t.socket.emit('resultadoAccion', { ...t, socket: null }));
        //res.send(`el pokemon ${campo} ya no puede pelear!`);
      }
    }
  })
})

async function loadPokemon() {
  pokeList = await pokemones.getFirstGenPokemon();
  cargaTeam(0);
  cargaTeam(1);
  fs.writeFileSync('pokemones.json', JSON.stringify(pokeList));
  loading = false;
}

function cargaTeam(id) {
  for (var i = 0; i < 3; i++) {
    var random = Math.floor(Math.random() * 151);
    var poke = pokeList[random];//i + 3 * (id)

    var hp = poke.stats[0].base_stat;
    teams[id].hps.push(hp);
    teams[id].pokemon.push(poke);
  }
}

function acciones(act) {
  var equipo = act.team;
  var accion = act.accion;
  var ataque = act.ataque;
  var enemigo = (equipo + 1) % 2;
  var pokeAliado = teams[equipo].enBatalla;
  var pokeEnemigo = teams[enemigo].enBatalla;

  switch (accion) {
    case "ataque":
      var atk;
      var potenciaAtk;
      var danoTotal;

      if (teams[equipo].hps[pokeAliado] > 0) {
        atk = teams[equipo].pokemon[pokeAliado].stats[1].base_stat / 100;
        potenciaAtk = teams[equipo].pokemon[pokeAliado].moves[ataque].power;
        danoTotal = atk * potenciaAtk;
        teams[enemigo].hps[pokeEnemigo] -= danoTotal;
      }
      console.log("ataque procesa3")
      break;
    case "cambio":
      cambios(act);
      break;
    case "curacion":
      if (teams[equipo].hps[pokeAliado] > 0) {
        var curado = teams[equipo].enBatalla
        teams[equipo].hps[curado] = Math.min(
          teams[equipo].hps[curado] + 15,
          teams[equipo].pokemon[curado].stats[0].base_stat
        );
      }
      break;
  }
}

function cambios(act) {
  var equipo = act.team;
  var entra = act.pokemon;
  if (entra > 0) {
    teams[equipo].enBatalla = entra;
  }
}