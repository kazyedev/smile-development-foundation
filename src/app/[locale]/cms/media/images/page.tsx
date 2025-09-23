import DataListPage from "@/components/cms/data-list-page";

export default function ImagesPage() {
  return (
    <DataListPage
      title="Images"
      description="Manage image gallery and photo archives"
      onAdd={() => console.log("Add image")}
      onRefresh={() => console.log("Refresh images")}
      onSort={() => console.log("Sort images")}
      addLabel="Add Image"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
