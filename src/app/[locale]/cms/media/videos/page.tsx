import DataListPage from "@/components/cms/data-list-page";

export default function VideosPage() {
  return (
    <DataListPage
      title="Videos"
      description="Manage video content and multimedia resources"
      onAdd={() => console.log("Add video")}
      onRefresh={() => console.log("Refresh videos")}
      onSort={() => console.log("Sort videos")}
      addLabel="Add Video"
      refreshLabel="Refresh"
      sortLabel="Sort"
    />
  );
}
