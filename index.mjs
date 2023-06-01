import express from 'express';
import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm';

const ssm_client = new SSMClient({ region: process.env.AWS_REGION });

const PORT = 80;

const app = express();

app.use( express.static('public') );

app.get( '/hello', ( _, res ) => res.send('hello!') );

app.get( '/ssm', async( _, res ) => {
  const command = new GetParametersCommand({
    Names: [ 'test' ],
    WithDecryption: true
  });

  const response = await ssm_client.send( command );

  res.send( response );
});

app.listen( PORT, () => console.log( `listening at http://localhost:${ PORT }` ) );
