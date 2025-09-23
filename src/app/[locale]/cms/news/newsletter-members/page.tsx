import DataListPage from "@/components/cms/data-list-page";

export default function NewsletterMembersPage() {
  return (
    <DataListPage
      title="Newsletter Members"
      description="Manage newsletter subscribers and mailing list"
      onAdd={() => console.log("Add newsletter member")}
      onRefresh={() => console.log("Refresh newsletter members")}
      onSort={() => console.log("Sort newsletter members")}
      addLabel="Add Member"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
