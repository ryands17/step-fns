// import { StepFun } from "aws-lambda";

class NumberIsTooBig extends Error {
  constructor(n: number) {
    super(`${n} is too big`)
    this.name = 'NumberIsTooBig'
    Error.captureStackTrace(this, NumberIsTooBig)
  }
}

export const handler = async (input: any) => {
  if (input.sum > 50) throw new NumberIsTooBig(input.sum)
  return input.sum * 2
}
