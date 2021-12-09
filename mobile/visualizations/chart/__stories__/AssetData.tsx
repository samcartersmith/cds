import { ChartDataPoint } from '@cbhq/cds-common/types/Chart';
import assetJSON from './data/Asset';

const transformAndFilterPrices = (
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

export const assetData = (() => {
  const { asset } = assetJSON.data.viewer.assetByUuid;

  return {
    hour: transformAndFilterPrices(asset.priceDataForHour.quotes),
    day: transformAndFilterPrices(asset.priceDataForDay.quotes),
    week: transformAndFilterPrices(asset.priceDataForWeek.quotes),
    month: transformAndFilterPrices(asset.priceDataForMonth.quotes),
    year: transformAndFilterPrices(asset.priceDataForYear.quotes),
    all: transformAndFilterPrices(asset.priceDataForAll.quotes),
  };
})();
