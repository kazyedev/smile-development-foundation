export default function NewsDetailPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <div>
      <h1>News: {slug}</h1>
      <p>News detail page content</p>
    </div>
  );
}