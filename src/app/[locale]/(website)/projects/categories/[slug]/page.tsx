export default function ProjectCategoryDetailPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Project Category: {slug}</h1>
      <p>Project category detail page content</p>
    </div>
  );
}