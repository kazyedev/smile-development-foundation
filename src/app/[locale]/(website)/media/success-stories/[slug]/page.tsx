export default function MediaSuccessStoryDetailPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Success Story: {slug}</h1>
      <p>Success story detail page content</p>
    </div>
  );
}