const fetch = require('node-fetch');
const fs = require('fs');

exports.getFirstGenPokemon = async function () {
    var pokemones = [];
    if (fs.existsSync('pokemones.json')) {
        pokemones = JSON.parse(fs.readFileSync('pokemones.json', { encoding: 'utf-8' }))
    } else {
        try {
            for (var i = 1; i <= 151; i++) {
                var p = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)).json();
                var movimientos = [];

                for (var j = 0; j < 4; j++) {
                    if (p.moves[j]) {
                        var url = p.moves[j].move.url;
                        var response = await fetch(url);
                        var move = await response.json();
                        movimientos.push(move);
                    }
                }
                p.moves = movimientos;
                pokemones.push(p);
            }
        } catch (e) {
            console.error(e);
        }

    }
    return pokemones;
}
