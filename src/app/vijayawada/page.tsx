import { VisitPage, visitMetadata } from "@/components/visit/visit-page";

export const metadata = visitMetadata("vijayawada");

export default function Vijayawada() {
  return <VisitPage slug="vijayawada" />;
}
