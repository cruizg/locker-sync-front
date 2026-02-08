export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <iframe
      src={`/api/preview/${id}`}
      className="w-full h-screen border-0"
    />
  );
}