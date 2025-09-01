export async function getContestWinners() {
  const res = await fetch(`${process.env.STRAPI_API_URL}/foto-winnaars`)
  const data = await res.json();

  return { props: { winners: data } };
}