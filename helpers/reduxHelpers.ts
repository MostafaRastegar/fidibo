import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import {
  ActionObjectType,
  AnyObjectI,
  InitialTemplateI,
} from 'store/interfaces';

export const actionMaker =
  (type: string) =>
  (payload = {}) => ({
    type,
    payload,
  });

export const makeActionsObject = (actionName: string): ActionObjectType => ({
  request: `${actionName}_REQUEST`,
  success: `${actionName}_SUCCESS`,
  failure: `${actionName}_FAILURE`,
});

export const errObject = (response: AnyObjectI) => ({
  status: response.status,
  problem: response.problem,
  data: response,
});

export const mergeStates = <T>(state: AnyObjectI, payload: T) => {
  return {
    request: {
      ...state,
      ...{ loading: true, data: null, error: false },
    },
    success: {
      ...state,
      ...{ loading: false, data: payload, error: false },
    },
    failure: {
      ...state,
      ...{ loading: false, data: null, error: true },
    },
  };
};

export const mergeNestedStates = <U, T>(
  state: U,
  payload: T,
  nestedName: string,
) => {
  console.log('state', state);

  return {
    request: {
      ...state,
      ...{ [nestedName]: { loading: true, data: payload, error: false } },
    },
    success: {
      ...state,
      ...{ [nestedName]: { loading: false, data: payload, error: false } },
    },
    failure: {
      ...state,
      ...{ [nestedName]: { loading: false, data: payload, error: true } },
    },
  };
};

export const splitStatus = (type: string): string[] => type.split('_');
export const getLastStatus = (type: string): string => splitStatus(type).pop();

export const handleStatus = (
  state: any,
  action: AnyAction,
  typeName: string,
) => {
  const { request, success, failure } = mergeNestedStates(
    state,
    action.payload,
    typeName,
  );

  const statusObj: any = {
    REQUEST: request,
    SUCCESS: success,
    FAILURE: failure,
  };
  return statusObj[getLastStatus(action.type)] || state;
};

//---------
export interface InitialGeneralEffectsI<T, U> {
  service: Function;
  actions: ActionObjectType;
  body?: T;
  params?: U;
}

export const generalEffects =
  <T, U, Z>({ service, actions, body, params }: InitialGeneralEffectsI<T, U>) =>
  async (dispatch: Dispatch<AnyAction>) => {
    const serviceInput: { body?: T; params?: U }[] = [];

    if (body) {
      serviceInput.push(body);
    }
    if (params) {
      serviceInput.push(params);
    }

    dispatch({ type: actions.request });

    const response: {
      data: Z;
    } = await service(...serviceInput);
    const { data } = response;

    if (data) {
      dispatch({ type: actions.success, payload: data });
      return data;
    }

    dispatch({ type: actions.failure, payload: errObject(response) });
    return false;
  };

//---------

export const initialStoreMaker = (): InitialTemplateI<any> => ({
  loading: false,
  data: null,
  error: false,
});

