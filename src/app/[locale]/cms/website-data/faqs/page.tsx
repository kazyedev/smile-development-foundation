import DataListPage from "@/components/cms/data-list-page";

export default function FAQsPage() {
  return (
    <DataListPage
      title="FAQs"
      description="Manage frequently asked questions and their answers"
      onAdd={() => console.log("Add FAQ")}
      onRefresh={() => console.log("Refresh FAQs")}
      onSort={() => console.log("Sort FAQs")}
      addLabel="Add FAQ"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
