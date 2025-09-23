import DataListPage from "@/components/cms/data-list-page";

export default function MediaCategoriesPage() {
  return (
    <DataListPage
      title="Media Categories"
      description="Manage media categories and content classifications"
      onAdd={() => console.log("Add media category")}
      onRefresh={() => console.log("Refresh media categories")}
      onSort={() => console.log("Sort media categories")}
      addLabel="Add Category"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
