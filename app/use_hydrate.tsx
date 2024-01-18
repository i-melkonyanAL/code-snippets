import {
  dehydrate,
  FetchQueryOptions,
  HydrationBoundary,
} from "@tanstack/react-query";
import getQueryClient from "./get_query_client";
import { IChildren } from "@/types";

interface IProps<DataType> {
  queryOptions: FetchQueryOptions<DataType>;
}

async function useHydrate<DataType>({ queryOptions }: IProps<DataType>) {
  const queryClient = getQueryClient();

  const data = await queryClient.fetchQuery<DataType>(queryOptions);
  const returnData = {
    HydrateProvider: ({ children }: IChildren) => (
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    ),
    data,
  };

  return returnData;
}

export default useHydrate;

