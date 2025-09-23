import DataListPage from "@/components/cms/data-list-page";

export default function TeamPage() {
  return (
    <DataListPage
      title="Team"
      description="Manage team members, staff profiles, and organizational structure"
      onAdd={() => console.log("Add team member")}
      onRefresh={() => console.log("Refresh team")}
      onSort={() => console.log("Sort team")}
      addLabel="Add Member"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
