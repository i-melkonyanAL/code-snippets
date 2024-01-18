import { getDietPlanById } from "@/api/diet_plans";
import getQueryClient from "@/api/get_query_client";
import {
  GET_DIET_ACTIVE_DAY,
  GET_DIET_PLAN_BY_ID,
  GET_DIET_PLAN_TYPE,
  IS_MICRO_VISIBLE,
} from "@/api/query_keys";
import useHydrate from "@/api/use_hydrate";
import FullMeal from "./full_meal";
import MacroPlanDay from "./macro_plan_day";
import MacroPlanMeal from "./macro_plan_meal";
import EditPage from "./edit_page";

interface IProps {
  params: {
    plan_id: string;
  };
}

const COMPONENTS = {
  "1": FullMeal,
  "2": MacroPlanMeal,
  "3": () => <span>File</span>,
  "4": MacroPlanDay,
};

async function EditDietPlan({ params: { plan_id } }: IProps) {
  const queryClient = getQueryClient();

  const { data, HydrateProvider } = await useHydrate({
    queryOptions: {
      queryKey: GET_DIET_PLAN_BY_ID(plan_id),
      queryFn: () => getDietPlanById(plan_id),
    },
  });

  queryClient.setQueryData([GET_DIET_ACTIVE_DAY], () => {
    return data.data[0].id;
  });

  queryClient.setQueryData([IS_MICRO_VISIBLE], () => {
    return true;
  });

  const { type } = data.data[0];
  queryClient.setQueryData([GET_DIET_PLAN_TYPE], () => {
    return type;
  });

  if (!type) {
    return null;
  }

  const MainComponent = COMPONENTS[type];

  return (
    <HydrateProvider>
      <div className="pt-4">{data.data.length ? <MainComponent /> : null}</div>
    </HydrateProvider>
  );
}

export default EditDietPlan;

