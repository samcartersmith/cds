import { ChartDataPoint } from '@cbhq/cds-common/types/Chart';
import React, { useCallback, useMemo } from 'react';
import assetJSON from './Asset';
import { PriceChart } from './PriceChart';

const transformAndFilterGraphqlPrices = (
  data?: readonly {
    price: string;
    timestamp: string | null;
  }[],
): ChartDataPoint[] => {
  // Filters out null timestamps and corrects the type
  const filterNullTimestamps = (value: { price: string; timestamp: string | null }) => {
    if (!value.timestamp) {
      return [];
    }
    return [
      {
        price: value.price,
        timestamp: value.timestamp,
      },
    ];
  };

  return (data ?? [])
    .flatMap(filterNullTimestamps)
    .map((point) => ({
      value: parseFloat(point.price),
      date: new Date(point.timestamp),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const AssetPriceChart = () => {
  const { asset } = assetJSON.data.viewer.assetByUuid;

  const data = useMemo(() => {
    return {
      hour: transformAndFilterGraphqlPrices(asset.priceDataForHour.quotes),
      day: transformAndFilterGraphqlPrices(asset.priceDataForDay.quotes),
      week: transformAndFilterGraphqlPrices(asset.priceDataForWeek.quotes),
      month: transformAndFilterGraphqlPrices(asset.priceDataForMonth.quotes),
      year: transformAndFilterGraphqlPrices(asset.priceDataForYear.quotes),
      all: transformAndFilterGraphqlPrices(asset.priceDataForAll.quotes),
    };
  }, [asset]);

  const formatAmount = useCallback((amount: number | string) => {
    return `$${parseInt(amount as string, 10).toLocaleString()}`;
  }, []);

  return (
    <PriceChart
      data={data}
      strokeColor={asset.color}
      // onScrub={handleOnScrub} TODO add chart header example that uses this
      formatAmount={formatAmount}
    />
  );
};
