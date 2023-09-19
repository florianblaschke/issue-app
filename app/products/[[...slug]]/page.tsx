interface Props {
  params: { slug: string[] };
  searchParams: { sortOrder: string };
}

export default function ProductPage({
  params: { slug },
  searchParams: { sortOrder },
}: Props) {
  return (
    <>
      <h1>Product Page</h1>
      <h2>{slug}</h2>
      <h2>{sortOrder}</h2>
    </>
  );
}
