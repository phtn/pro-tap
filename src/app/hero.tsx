import { Loader } from "@/components/experimental/loader";
import { PathTracer } from "@/components/experimental/path-trace";
import ConjurSight from "@/components/orb/conjurer";

export const Hero = () => {
  return (
    <div className="relative flex mx-auto lg:items-start items-center justify-center lg:p-4 ">
      <div className="size-96 flex items-center justify-center">
        <ConjurSight />
      </div>
    </div>
  );
};
