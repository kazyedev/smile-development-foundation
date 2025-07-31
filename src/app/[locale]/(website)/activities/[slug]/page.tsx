export default function ActivityDetailPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Activity: {slug}</h1>
      <p>Activity detail page content</p>
    </div>
  );
}