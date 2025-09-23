import DataListPage from "@/components/cms/data-list-page";

export default function PublicationsPage() {
  return (
    <DataListPage
      title="Publications"
      description="Manage publications, documents, and research materials"
      onAdd={() => console.log("Add publication")}
      onRefresh={() => console.log("Refresh publications")}
      onSort={() => console.log("Sort publications")}
      addLabel="Add Publication"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
