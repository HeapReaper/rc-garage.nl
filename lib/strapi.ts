export async function getStrapiData(request: string, populateAll: boolean = false): Promise<string> {
  const url: string | undefined = process.env.STRAPI_API_URL;

  if (!url) {
    throw new Error('No url provided in "/src/lib/api.ts"!');
  }

  const res: Response = await fetch(`${url}/api/${request}`, {
    next: {
      revalidate: 60
    }
  });

  console.log('Returning data');
  return await res.json();
}