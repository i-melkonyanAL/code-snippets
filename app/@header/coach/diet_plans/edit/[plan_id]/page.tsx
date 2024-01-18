import { getDietPlanById } from "@/api/diet_plans";
import { GET_DIET_PLAN_BY_ID } from "@/api/query_keys";
import useHydrate from "@/api/use_hydrate";
import IconUpload from "@/assets/icons/upload.svg";
import Button from "@/components/reusable/button";
import EditableText from "@/components/reusable/editable-text";
import Header from "@/layouts/auth_layout/header";
import Settings from "./settings";

interface IProps {
  params: {
    plan_id: string;
  };
}

async function NewHeaderDietPlan({ params }: IProps) {
  // const queryClient = getQueryClient();
  const { data, HydrateProvider } = await useHydrate({
    queryOptions: {
      queryKey: GET_DIET_PLAN_BY_ID(params.plan_id),
      queryFn: () => getDietPlanById(params.plan_id),
    },
  });

  return (
    <Header
      title={<EditableText title="Nutrition plan title" />}
      backLink="/coach/diet_plans"
      withRouterBack
    >
      <HydrateProvider>
        <Button type="button" className="flex gap-2 font-medium">
          <IconUpload />
          <span>Upload doc</span>
        </Button>
        <Settings />
      </HydrateProvider>
    </Header>
  );
}
export default NewHeaderDietPlan;
