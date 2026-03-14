export function serialize(data: unknown) {
  return JSON.parse(
    JSON.stringify(
      data,
      (_, value) => (typeof value === 'bigint' ? value.toString() : value)
    )
  )
}
