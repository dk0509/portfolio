import { PortfolioExperience } from "@/components/PortfolioExperience";

export default function Home() {
  return (
    <>
      <h1 className="sr-only">
        Devansh Agrawal — Building backend systems that scale. Enterprise systems, multi-tenant
        architecture, AI infrastructure, and production engineering.
      </h1>
      <PortfolioExperience />
    </>
  );
}
