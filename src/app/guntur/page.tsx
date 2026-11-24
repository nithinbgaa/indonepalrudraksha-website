import { VisitPage, visitMetadata } from "@/components/visit/visit-page";

export const metadata = visitMetadata("guntur");

export default function Guntur() {
  return <VisitPage slug="guntur" />;
}
