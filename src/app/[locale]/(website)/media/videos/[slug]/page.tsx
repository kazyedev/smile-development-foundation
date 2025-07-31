export default function MediaVideoDetailPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Video: {slug}</h1>
      <p>Video detail page content</p>
    </div>
  );
}