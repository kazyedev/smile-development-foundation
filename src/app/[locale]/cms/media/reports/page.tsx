import DataListPage from "@/components/cms/data-list-page";

export default function ReportsPage() {
  return (
    <DataListPage
      title="Reports"
      description="Manage annual reports, impact reports, and documentation"
      onAdd={() => console.log("Add report")}
      onRefresh={() => console.log("Refresh reports")}
      onSort={() => console.log("Sort reports")}
      addLabel="Add Report"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
