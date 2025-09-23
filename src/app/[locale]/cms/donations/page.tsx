import DataListPage from "@/components/cms/data-list-page";

export default function DonationsPage() {
  return (
    <DataListPage
      title="Donations"
      description="Manage donations, donors, and fundraising campaigns"
      onAdd={() => console.log("Add donation")}
      onRefresh={() => console.log("Refresh donations")}
      onSort={() => console.log("Sort donations")}
      addLabel="Add Donation"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
