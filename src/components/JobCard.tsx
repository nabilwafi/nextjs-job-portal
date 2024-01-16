import { Job } from "@prisma/client";
import Image from "next/image";
import React from "react";
import ImagePlaceHolder from "@/assets/company-logo-placeholder.png";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatMoney, relativeDate } from "@/lib/utils";
import { Badge } from "./Badge";

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const {
    companyLogoUrl,
    companyName,
    title,
    type,
    location,
    locationType,
    salary,
    createdAt,
  } = job;

  return (
    <article className="flex gap-3 rounded-lg border p-5">
      <Image
        src={companyLogoUrl || ImagePlaceHolder}
        width={100}
        height={100}
        alt={companyName}
        className="self-center rounded-lg"
      />

      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>

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

          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock size={16} className="shrink-0" />
            {String(createdAt)}
          </p>
        </div>
      </div>

      <div className="hidden flex-col items-end justify-between sm:flex">
        <Badge component={type} />

        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={16} />
          {relativeDate(createdAt)}
        </span>
      </div>
    </article>
  );
};

export default JobCard;
