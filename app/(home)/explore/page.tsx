export default function ExplorePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <h1>Explore: {searchParams["search"]}</h1>
    </div>
  );
}
