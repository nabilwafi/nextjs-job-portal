import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResult from "@/components/JobResult";
import { setTitleWithParams } from "@/lib/utils";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
}

export const generateMetadata = ({
  searchParams: { q, type, location, remote, page },
}: PageProps): Metadata => {
  const filteredValue: JobFilterValues = {
    q,
    type,
    location,
    remote: Boolean(remote),
  };

  return {
    title: `${setTitleWithParams(filteredValue)}`,
    description: "connect your dream with job",
  };
};

export default async function Home({
  searchParams: { q, type, location, remote, page },
}: PageProps) {
  const filteredValues: JobFilterValues = {
    q,
    type,
    location,
    remote: Boolean(remote),
  };

  return (
    <main className="m-auto my-10 max-w-screen-xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1 className="text-2xl font-bold">
          {setTitleWithParams(filteredValues)}
        </h1>
        <p className="text-muted-foreground">Find your dream job</p>
      </div>
      <section className="flex flex-col gap-4 md:flex-row">
        <JobFilterSidebar defaultValues={filteredValues} />
        <JobResult
          filteredResult={filteredValues}
          pages={page ? parseInt(page) : undefined}
        />
      </section>
    </main>
  );
}
