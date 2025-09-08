import { Content } from "./content";

interface VerifyPageProps {
  params: Promise<{
    code: string;
  }>;
}

const Page = async ({ params }: VerifyPageProps) => {
  const { code } = await params;
  return <Content code={code} />;
};
export default Page;
