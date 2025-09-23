import DataListPage from "@/components/cms/data-list-page";

export default function HomeSlidesPage() {
  return (
    <DataListPage
      title="Home Page Slides"
      description="Manage homepage carousel slides and hero content"
      onAdd={() => console.log("Add home slide")}
      onRefresh={() => console.log("Refresh home slides")}
      onSort={() => console.log("Sort home slides")}
      addLabel="Add Slide"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
