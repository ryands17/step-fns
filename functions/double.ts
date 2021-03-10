class NumberIsTooBig extends Error {
  constructor(n: number) {
    super(`${n} is too big`)
    this.name = 'NumberIsTooBig'
    Error.captureStackTrace(this, NumberIsTooBig)
  }
}

export const handler = async (input: any) => {
  if (input > 50) throw new NumberIsTooBig(input)
  return input * 2
}
