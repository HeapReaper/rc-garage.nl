async function getData(){
  const res = await fetch("https://strapi.rc-garage.nl/api/global", {
    next: {revalidate: 60}
  });

  const data = await res.json();

  return data.data;
}

export default async function Footer() {
  const data = await getData();

  return (
    <footer className="text-center py-10 text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} {data.siteName}
    </footer>
  );
}