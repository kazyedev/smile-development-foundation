export default function ProjectDetailPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Project: {slug}</h1>
      <p>Project detail page content</p>
    </div>
  );
}