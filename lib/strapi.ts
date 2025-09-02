export async function getStrapiData(request: string, populateAll: boolean = false): Promise<string> {
  const url: string | undefined = process.env.STRAPI_API_URL;

  if (!url) {
    throw new Error('No url provided in "/src/lib/api.ts"!');
  }

  const res: Response = await fetch(`${url}/api/${request}${populateAll ? '?populate=*' : ''}`, {
    next: {
      revalidate: 60
    }
  });

  return await res.json();
}