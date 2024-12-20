// SDK利用準備
import type { MicroCMSQueries, MicroCMSListContent } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

const client1 = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});//client1に含まれる情報：activities,awards,history

const client2 = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN2,
  apiKey: import.meta.env.MICROCMS_API_KEY2,
});//client1に含まれる情報：invitation

// Awards型定義
export type Awards = {
    id: string;
    date: string;
    title: string;
    
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
    return await client1.get<AwardsResponse>({ endpoint: "awards", queries });
  };
  export const getAwardsDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
  ) => {
    return await client1.getListDetail<Awards>({
      endpoint: "awards",
      contentId,
      queries,
    });
  };


  // Activities型定義
export type Activities= {
  id: string;
  date: string;
  title: string;
  desicription:string;
  og_Image?: {
    url: string;
  };
};
export type ActivitiesResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Activities[];
};

//APIの呼び出し
export const getActivities = async (queries?: MicroCMSQueries) => {
  return await client1.get<ActivitiesResponse>({ endpoint: "activities", queries });
};
export const getActivitiesDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client1.getListDetail<Activities>({
    endpoint: "activities",
    contentId,
    queries,
  });
};


 // Invitation型定義
 export type Invitation= {
  id: string;
  date: string;
  title: string;
  description:string;
};
export type InvitationResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Invitation[];
};

//APIの呼び出し
export const getInvitation = async (queries?: MicroCMSQueries) => {
  return await client2.get<InvitationResponse>({ endpoint: "invitation", queries });
};
export const getInvitationDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client2.getListDetail<Invitation>({
    endpoint: "invitation",
    contentId,
    queries,
  });
};


