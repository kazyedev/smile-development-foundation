export default function NewsCategoryDetailPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <div>
      <h1>News Category: {slug}</h1>
      <p>News category detail page content</p>
    </div>
  );
}