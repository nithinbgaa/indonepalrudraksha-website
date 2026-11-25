import { VisitPage, visitMetadata } from "@/components/visit/visit-page";

export const metadata = visitMetadata("kakinada");

export default function Kakinada() {
  return <VisitPage slug="kakinada" />;
}
