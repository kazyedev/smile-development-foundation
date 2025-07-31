export default function WorkWithUsDetailPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Job: {slug}</h1>
      <p>Job detail page content</p>
    </div>
  );
}