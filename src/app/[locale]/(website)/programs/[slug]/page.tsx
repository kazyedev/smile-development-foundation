export default function ProgramDetailPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Program: {slug}</h1>
      <p>Program detail page content</p>
    </div>
  );
}