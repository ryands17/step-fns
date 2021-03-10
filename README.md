# Exploring Step functions

This is an exploration of Step Functions using the CDK based on the [following](https://theburningmonk.thinkific.com/courses/complete-guide-to-aws-step-functions) tutorial by [Yan Cui](https://twitter.com/theburningmonk).

## Prerequisites

- Create a `cdk.context.json` file and add the region that you want to deploy to as follows (default is `us-east-2`):

```json
{
  "region": "us-east-2"
}
```

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `yarn build` compile typescript to js
- `yarn watch` watch for changes and compile
- `yarn test` perform the jest unit tests
- `yarn cdk deploy` deploy this stack to your default AWS account/region
- `yarn cdk diff` compare deployed stack with current state
- `yarn cdk synth` emits the synthesized CloudFormation template
