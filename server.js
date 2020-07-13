const express = require( 'express' );
const knex = require( 'knex' );
const bodyParser = require( 'body-parser' );
const jsonParser = bodyParser.json();
const app = express();

const database = knex({
    client : 'pg',
    connection : 'postgresql://alfredosalazar@localhost/the_real_sport_db'
});

app.post( '/api/sport/create', jsonParser, ( req, res, next ) => {
    
    let newSport = {
        id : req.body.id,
        name : req.body.name,
        num_players : req.body.num_players
    };

    database
        .insert( newSport )
        .into( 'sport' )
        .returning( '*' )
        .then( rows => {
            return res.status(201).json(rows);
        });


});

app.get( '/api/sport/all', ( req, res, next ) => {
    database
        .select( '*' )
        .from( 'sport' )
        .then( rows => {
            return res.status( 200 ).json( rows );
        });
});


app.listen( 8080, () => {
    console.log( 'App running in port 8080.' );
});