import DataListPage from "@/components/cms/data-list-page";

export default function NewsPage() {
  return (
    <DataListPage
      title="News"
      description="Manage news articles, updates, and announcements"
      onAdd={() => console.log("Add news")}
      onRefresh={() => console.log("Refresh news")}
      onSort={() => console.log("Sort news")}
      addLabel="Add News"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
