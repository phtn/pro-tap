import { InfoCard } from "@/components/card";

export const Header = () => {
  return (
    <div className="h-40 hidden lg:grid grid-cols-5 font-space gap-8">
      <InfoCard
        doc="document"
        title="project proposal"
        status="in-progress"
        value={50}
      />
      <InfoCard doc="client" title="Protap" status="approved" value={100} />
      <InfoCard
        doc="application"
        title="web app"
        status="started"
        value={100}
      />
      <InfoCard doc="tech" title="6 features" status="itemized" value={100} />
      <InfoCard
        doc="delivery"
        title="Completion"
        status="started"
        value={20}
        extra={"2mos"}
      />
    </div>
  );
};
