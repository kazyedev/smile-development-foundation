import DataListPage from "@/components/cms/data-list-page";

export default function ProgramsPage() {
  return (
    <DataListPage
      title="Programs"
      description="Manage foundation programs and initiatives"
      onAdd={() => console.log("Add program")}
      onRefresh={() => console.log("Refresh programs")}
      onSort={() => console.log("Sort programs")}
      addLabel="Add Program"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
