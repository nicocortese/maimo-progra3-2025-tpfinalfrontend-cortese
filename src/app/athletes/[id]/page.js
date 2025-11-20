import AthleteDetail from "@/components/AthleteDetail";

const page =  async ({ params }) => {
  const { id } =  await params; 
  return <AthleteDetail id={id} />; 
};

export default page;
