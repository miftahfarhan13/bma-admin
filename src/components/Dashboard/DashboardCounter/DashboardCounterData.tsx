import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import CounterCard from "../CounterCard";

export default function DashboardCounterData({ data }: { data: any }) {
  return (
    <>
      <CounterCard icon="bxs:car" label="Total Cars" value={data?.total_cars} />
      <CounterCard
        icon="f7:hammer-fill"
        label="Total Bid"
        value={data?.total_bids}
      />
      <CounterCard
        icon="f7:hammer-fill"
        label="Uniq Dealer Bid"
        value={data?.total_dealers_that_bid}
      />
      <CounterCard
        icon="fa6-solid:users"
        label="Login Dealer"
        value={data?.total_login_dealers}
      />
      <CounterCard
        icon="mdi:users"
        label="Live Dealer"
        value={data?.total_live_login_dealers}
      />
      <CounterCard
        icon="mdi:car-side"
        label="Bided Cars"
        value={data?.percentage_bided_cars}
      />
      <CounterCard
        icon="mdi:car-side"
        label="BO cars"
        value={data?.percentage_bided_cars_by_availability?.["Ready Stock"]}
      />
      <CounterCard
        icon="mdi:car-side"
        label="Owner Cars"
        value={data?.percentage_bided_cars_by_availability?.Customer}
      />
      <CounterCard
        icon="mdi:car-side"
        label="SA Cars"
        value={data?.percentage_bided_cars_by_availability?.["SA Cars"]}
      />
      <CounterCard
        icon="mdi:car-side"
        label="Corp Cars"
        value={data?.percentage_bided_cars_by_availability?.Corporate}
      />
    </>
  );
}
