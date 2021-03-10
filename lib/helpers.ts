import { join } from 'path'
import { Construct } from '@aws-cdk/core'
import * as ln from '@aws-cdk/aws-lambda-nodejs'
import { Runtime } from '@aws-cdk/aws-lambda'
import { RetentionDays } from '@aws-cdk/aws-logs'

const handlerPath = (...paths: string[]) =>
  join(__dirname, '..', 'functions', ...paths)

export const lambdaFn = (
  scope: Construct,
  id: string,
  props?: ln.NodejsFunctionProps
) => {
  return new ln.NodejsFunction(scope, id, {
    runtime: Runtime.NODEJS_14_X,
    logRetention: RetentionDays.ONE_WEEK,
    handler: 'handler',
    entry: handlerPath(`${id}.ts`),
    bundling: { sourceMap: true },
    ...props,
    environment: {
      NODE_OPTIONS: '--enable-source-maps',
      ...props?.environment,
    },
  })
}
