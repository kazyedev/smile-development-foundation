import { redirect } from "next/navigation";

export default function CmsIndexPage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/cms/dashboard`);
}


