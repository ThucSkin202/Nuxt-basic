export default defineEventHandler((e) => {
  const { name } = getQuery(e)

  return {
    message: `ok, ${name}`,
  }
});
