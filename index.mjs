import express from 'express';
import { SSMClient, GetParametersCommand } from '@aws-sdk/client-ssm';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

const PORT = 80;

const app = express();

app.use( express.static('public') );

app.get( '/hello', ( _, res ) => res.send('hello!') );

app.get( '/ssm', async( _, res ) => {
  try {
    const ssm_client = new SSMClient({ region: process.env.AWS_REGION });

    const command = new GetParametersCommand({
      Names: [ 'test' ],
      WithDecryption: true
    });

    const response = await ssm_client.send( command );

    res.send( response );
  } catch ( ex ) {
    console.error( ex );
    res.status( 500 ).send( ex.message );
  }
});

app.get( '/secrets-manager', async( _, res ) => {
  try {
    const client = new SecretsManagerClient({ region: process.env.AWS_REGION });

    const command = new GetSecretValueCommand({ SecretId: 'test' });

    const response = await client.send( command );

    res.send( response );
  } catch ( ex ) {
    console.error( ex );
    res.status( 500 ).send( ex.message );
  }
});

app.listen( PORT, () => console.log( `listening at http://localhost:${ PORT }` ) );
