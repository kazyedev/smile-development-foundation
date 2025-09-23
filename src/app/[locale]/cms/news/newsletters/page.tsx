import DataListPage from "@/components/cms/data-list-page";

export default function NewslettersPage() {
  return (
    <DataListPage
      title="Newsletters"
      description="Manage newsletters, email campaigns, and communications"
      onAdd={() => console.log("Add newsletter")}
      onRefresh={() => console.log("Refresh newsletters")}
      onSort={() => console.log("Sort newsletters")}
      addLabel="Add Newsletter"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
