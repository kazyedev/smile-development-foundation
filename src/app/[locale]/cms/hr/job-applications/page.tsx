import DataListPage from "@/components/cms/data-list-page";

export default function JobApplicationsPage() {
  return (
    <DataListPage
      title="Job Applications"
      description="Manage job applications, candidate profiles, and hiring process"
      onAdd={() => console.log("Add job application")}
      onRefresh={() => console.log("Refresh job applications")}
      onSort={() => console.log("Sort job applications")}
      addLabel="Add Application"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
