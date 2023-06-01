import express from 'express';
import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm';

const ssm_client = new SSMClient();

const PORT = 80;

const app = express();

app.use( express.static('public') );

app.get( '/hello', ( _, res ) => res.send('Hello World!') );

app.get( '/ssm', async( _, res ) => {
  const command = new GetParametersCommand({
    Names: [ 'test' ],
    WithDecryption: true || false
  });

  const response = await ssm_client.send( command );

  res.send( response );
});

app.listen( PORT, () => console.log( `listening at http://localhost:${ PORT }` ) );
