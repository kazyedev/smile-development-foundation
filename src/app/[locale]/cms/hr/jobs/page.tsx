import DataListPage from "@/components/cms/data-list-page";

export default function JobsPage() {
  return (
    <DataListPage
      title="Jobs"
      description="Manage job postings, career opportunities, and positions"
      onAdd={() => console.log("Add job")}
      onRefresh={() => console.log("Refresh jobs")}
      onSort={() => console.log("Sort jobs")}
      addLabel="Add Job"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
