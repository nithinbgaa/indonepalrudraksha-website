import { VisitPage, visitMetadata } from "@/components/visit/visit-page";

export const metadata = visitMetadata("bangalore");

export default function Bangalore() {
  return <VisitPage slug="bangalore" />;
}
