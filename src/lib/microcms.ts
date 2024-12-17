// SDK利用準備
import type { MicroCMSQueries, MicroCMSListContent } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// Awards型定義
export type Awards = {
    id: string;
    date: string;
    title: string;
    description: string;
    // if文でRGBAに分岐
    // medalcolor:;
    og_Image?: {
      url: string;
    };
  };
  export type AwardsResponse = {
    totalCount: number;
    offset: number;
    limit: number;
    contents: Awards[];
  };
  
  //APIの呼び出し
  export const getAwards = async (queries?: MicroCMSQueries) => {
    return await client.get<AwardsResponse>({ endpoint: "awards", queries });
  };
  export const getAwardsDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
  ) => {
    return await client.getListDetail<Awards>({
      endpoint: "awards",
      contentId,
      queries,
    });
  };