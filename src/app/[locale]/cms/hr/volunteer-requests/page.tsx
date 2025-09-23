import DataListPage from "@/components/cms/data-list-page";

export default function VolunteerRequestsPage() {
  return (
    <DataListPage
      title="Volunteer Requests"
      description="Manage volunteer applications, opportunities, and assignments"
      onAdd={() => console.log("Add volunteer request")}
      onRefresh={() => console.log("Refresh volunteer requests")}
      onSort={() => console.log("Sort volunteer requests")}
      addLabel="Add Request"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
