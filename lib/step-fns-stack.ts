import * as cdk from '@aws-cdk/core'
import * as sfn from '@aws-cdk/aws-stepfunctions'
import * as tasks from '@aws-cdk/aws-stepfunctions-tasks'
import { lambdaFn } from './helpers'

export class StepFnsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // state to handle addition
    let add = new tasks.LambdaInvoke(this, 'add 2 numbers', {
      lambdaFunction: lambdaFn(this, 'add'),
      payloadResponseOnly: true,
    })

    let double = new tasks.LambdaInvoke(this, 'double the number', {
      lambdaFunction: lambdaFn(this, 'double'),
      payloadResponseOnly: true,
    })
    double.addRetry({ maxAttempts: 0, errors: ['NumberIsTooBig'] })

    let doubleBigNumber = new tasks.LambdaInvoke(
      this,
      'double the bigger number',
      {
        lambdaFunction: lambdaFn(this, 'doubleBigNumber'),
        payloadResponseOnly: true,
      }
    )

    double.addCatch(doubleBigNumber, { errors: ['NumberIsTooBig'] })

    let isBigNumber = new sfn.Choice(this, 'isBigNumber')
    isBigNumber
      .when(sfn.Condition.numberGreaterThan('$', 50), doubleBigNumber)
      .otherwise(double)

    let definition = add.next(isBigNumber)

    new sfn.StateMachine(this, 'chaining', {
      definition,
      timeout: cdk.Duration.minutes(2),
    })
  }
}
