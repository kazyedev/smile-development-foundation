import DataListPage from "@/components/cms/data-list-page";

export default function SuccessStoriesPage() {
  return (
    <DataListPage
      title="Success Stories"
      description="Manage success stories, testimonials, and case studies"
      onAdd={() => console.log("Add success story")}
      onRefresh={() => console.log("Refresh success stories")}
      onSort={() => console.log("Sort success stories")}
      addLabel="Add Story"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
