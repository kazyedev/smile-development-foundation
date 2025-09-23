import DataListPage from "@/components/cms/data-list-page";

export default function ProjectCategoriesPage() {
  return (
    <DataListPage
      title="Project Categories"
      description="Manage project categories and classifications"
      onAdd={() => console.log("Add project category")}
      onRefresh={() => console.log("Refresh project categories")}
      onSort={() => console.log("Sort project categories")}
      addLabel="Add Category"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
