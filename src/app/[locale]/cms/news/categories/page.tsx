import DataListPage from "@/components/cms/data-list-page";

export default function NewsCategoriesPage() {
  return (
    <DataListPage
      title="News Categories"
      description="Manage news categories and topic classifications"
      onAdd={() => console.log("Add news category")}
      onRefresh={() => console.log("Refresh news categories")}
      onSort={() => console.log("Sort news categories")}
      addLabel="Add Category"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
