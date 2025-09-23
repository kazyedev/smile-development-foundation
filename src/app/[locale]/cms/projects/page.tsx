import DataListPage from "@/components/cms/data-list-page";

export default function ProjectsPage() {
  return (
    <DataListPage
      title="Projects"
      description="Manage foundation projects and their details"
      onAdd={() => console.log("Add project")}
      onRefresh={() => console.log("Refresh projects")}
      onSort={() => console.log("Sort projects")}
      addLabel="Add Project"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
