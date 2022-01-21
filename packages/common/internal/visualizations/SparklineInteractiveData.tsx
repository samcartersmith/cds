import { ChartDataPoint } from '../../types/Chart';
import assetJSON from '../data/asset';

type DataType = {
  price: string;
  timestamp: string | null;
};

const transformAndFilterPrices = (data?: DataType[]): ChartDataPoint[] => {
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

  const points = (data ?? [])
    .flatMap<DataType>(filterNullTimestamps)
    .map((point: DataType) => ({
      value: parseFloat(point.price),
      date: new Date(point.timestamp as string),
    }))
    .sort(
      (a: { date: Date }, b: { date: Date }) => a.date.getTime() - b.date.getTime(),
    ) as ChartDataPoint[];

  return points;
};

export const sparklineInteractiveData = (() => {
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
