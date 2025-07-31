export default function MediaReportDetailPage({ params: { slug } }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Report: {slug}</h1>
      <p>Report detail page content</p>
    </div>
  );
}