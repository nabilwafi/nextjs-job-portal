import { formatMoney } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Markdown from "./Markdown";

interface JobPageProps {
  job: Job;
}

const JobPage = ({ job }: JobPageProps) => {
  const {
    title,
    description,
    companyLogoUrl,
    applicationUrl,
    companyName,
    salary,
    location,
    locationType,
    type,
  } = job;

  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        {companyLogoUrl && (
          <Image
            src={companyLogoUrl}
            width={100}
            height={100}
            alt="company logo"
          />
        )}

        <div>
          <div>
            <h1 className="text-lg font-bold">{companyName}</h1>
            <p>
              {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  className="text-green-500 hover:underline"
                >
                  {applicationUrl}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>

          <div className="flex-grow space-y-3">
            <div className="text-muted-foreground">
              <p className="flex items-center gap-1.5 sm:hidden">
                <Briefcase size={16} className="shrink-0" />
                {type}
              </p>

              <p className="flex items-center gap-1.5">
                <MapPin size={16} className="shrink-0" />
                {locationType}
              </p>

              <p className="flex items-center gap-1.5">
                <Globe2 size={16} className="shrink-0" />
                {location || "worldwide"}
              </p>

              <p className="flex items-center gap-1.5">
                <Banknote size={16} className="shrink-0" />
                {formatMoney(salary)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>{description && <Markdown>{description}</Markdown>}</div>
    </section>
  );
};

export default JobPage;
