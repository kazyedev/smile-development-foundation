import DataListPage from "@/components/cms/data-list-page";

export default function ActivitiesPage() {
  return (
    <DataListPage
      title="Activities"
      description="Manage foundation activities, events, and initiatives"
      onAdd={() => console.log("Add activity")}
      onRefresh={() => console.log("Refresh activities")}
      onSort={() => console.log("Sort activities")}
      addLabel="Add Activity"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
