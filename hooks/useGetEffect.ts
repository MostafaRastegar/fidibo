import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ActionObjectType } from 'store/interfaces';
import { request } from 'store/request';
import useSWR from 'swr';

const useGetEffect = ({
  endpoint,
  actions,
  params,
}: {
  endpoint: string;
  actions: ActionObjectType;
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: actions.request });
  }, [actions.request, dispatch]);

  const { data, error } = useSWR([endpoint, params], request.get, {
    revalidateOnFocus: false,
    onSuccess: (data): AnyAction => {
      console.log('data', data);
      if (data.ok) {
        return dispatch({ type: actions.success, payload: data?.data });
      }
      return dispatch({ type: actions.failure, payload: error });
    },
  });

  if (data?.data) {
    return {
      data: data?.data,
      isLoading: !error && !data,
      isError: error,
    };
  }

  return error;
};

export default useGetEffect;

