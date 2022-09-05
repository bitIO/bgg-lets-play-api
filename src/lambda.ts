import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create(AppModule);
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();

  return serverlessExpress({
    app: expressApp,
    log: {
      debug(message, additional) {
        console.debug('[SLS-EXPRESS][DEBUG]', message, additional);
      },
      error(message, additional) {
        console.error('[SLS-EXPRESS][ERROR]', message, additional);
      },
      info(message, additional) {
        console.info('[SLS-EXPRESS][INFO ]', message, additional);
      },
    },
    respondWithErrors: true,
  });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  console.log('[SLS-EXPRESS] [EVENT]', event, null, 2);
  server = server ?? (await bootstrap());

  return server(event, context, callback);
};
