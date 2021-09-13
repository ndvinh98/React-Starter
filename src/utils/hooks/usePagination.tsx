import {useState} from 'react';
import {debounce} from 'lodash';

export const usePagination = (init?: {
  page?: number;
  limit?: number;
  textSearch?: string;
  filter?: any;
}) => {
  const [page, setPage] = useState<number>(init?.page || 1);
  const [limit, setLimit] = useState<number>(init?.limit || 10);
  const [textSearch, _setTextSearch] = useState<string>(
    init?.textSearch || undefined,
  );
  const [filter, setFilter] = useState<any>(init?.filter || undefined);

  const refresh = () => {
    setPage(1);
    setLimit(10);
    setFilter(undefined);
    setTextSearch(undefined);
  };
  const setTextSearch = debounce((text: string) => _setTextSearch(text), 500);

  return {
    page,
    limit,
    setPage,
    setLimit,
    refresh,
    textSearch,
    setTextSearch,
    filter,
    setFilter,
  };
};
