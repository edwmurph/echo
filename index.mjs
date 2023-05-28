import express from 'express';

const PORT = 8080;

const app = express();

app.use( express.static('public') );

app.get( '/', ( _, res ) => res.send('Hello World!') );

app.listen( PORT, () => console.log( `listening at http://localhost:${ PORT }` ) );
