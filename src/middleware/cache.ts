import NodeCache from 'node-cache';

const cache = new NodeCache();

export const getDataFromCacheOrDatabase = async (key: string, fetchDataFromDatabase: () => Promise<any>): Promise<any> => {
  const cachedData = cache.get(key);
  
  if (cachedData !== undefined) {
    return cachedData;
  } else {
    const dataFromDatabase = await fetchDataFromDatabase();
    cache.set(key, dataFromDatabase);
    return dataFromDatabase;
  }
};

export const clearCacheForKey = (key: string): void => {
  cache.del(key);
};
