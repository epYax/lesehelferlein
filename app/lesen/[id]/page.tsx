import { getStory, stories } from "@/lib/stories";
import { notFound } from "next/navigation";
import { Reader } from "@/components/reader";
export function generateStaticParams() {
  return stories.map(({ id }) => ({ id }));
}
export default async function Read({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = getStory(id);
  if (!story) notFound();
  return <Reader story={story} />;
}
