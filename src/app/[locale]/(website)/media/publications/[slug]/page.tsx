export default function MediaPublicationDetailPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Publication: {slug}</h1>
      <p>Publication detail page content</p>
    </div>
  );
}