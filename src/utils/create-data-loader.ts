import DataLoader from 'dataloader';

type FindByIds<Returned> = (ids: number[]) => Promise<Record<number | string, Returned>>;

const dataLoaderMap = new Map();

export function createDataLoader<Returned>(key: string, findByIds: FindByIds<Returned>, defaultValue: Returned) {
  let dataLoader = dataLoaderMap.get(key);
  if (dataLoader == null) {
    dataLoader = new DataLoader<number, Returned>(async (ids) => {
      const data = await findByIds(ids as number[]);
      return ids.map(id => data[id] || defaultValue);
    }, { cache: false });
    dataLoaderMap.set(key, dataLoader);
  }
  return dataLoader as DataLoader<number, Returned>;
}
