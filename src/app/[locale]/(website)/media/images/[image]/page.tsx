export default function MediaImageDetailPage({ params: { image } }: { params: { image: string } }) {
  return (
    <div>
      <h1>Image: {image}</h1>
      <p>Image detail page content</p>
    </div>
  );
}