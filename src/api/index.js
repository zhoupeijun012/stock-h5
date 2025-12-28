import httpRequest from '@/utils/http';

export const userLogin = (params) => {
  return httpRequest.post('/user/login', params);
};

export const userRegister = (params) => {
  return httpRequest.post('/user/register', params);
};

export const userList = (params) => {
  return httpRequest.post('/user/list', params);
};

export const userApprove = (params) => {
  return httpRequest.post('/user/approve', params);
};

export const userLoginRecords = (params) => {
  return httpRequest.post('/login-record/list', params);
};

export const getStockList = (params) => {
  return httpRequest.post('/stock/list', params);
};

export const getEtfList = (params) => {
  return httpRequest.post('/etf/list', params);
};

export const getConceptList = (params) => {
  return httpRequest.post('/concept/list', params);
};

export const getIndustryList = (params) => {
  return httpRequest.post('/industry/list', params);
};

export const getRegionList = (params) => {
  return httpRequest.post('/region/list', params);
};

export const getLofList = (params) => {
  return httpRequest.post('/lof/list', params);
};

export const getLimitList = (params) => {
  return httpRequest.post('/limit/list', params);
};

export const getQueueList = (params) => {
  return httpRequest.post('/task/list', params);
};

export const getNpList = (params) => {
  return httpRequest.post('/np/list', params);
};

export const getKLineList = (params) => {
  return httpRequest.post('/kline/list', params);
};

export const getKLineOne = (params) => {
  return httpRequest.post('/kline/one', params);
};

export const getFundList = (params) => {
  return httpRequest.post('/fund/list', params);
};

export const getFundOne = (params) => {
  return httpRequest.post('/fund/one', params);
};

export const getRegionOne = (params) => {
  return httpRequest.post('/region/one', params);
};

export const getIndustryOne = (params) => {
  return httpRequest.post('/industry/one', params);
};

export const getStockOne = (params) => {
  return httpRequest.post('/stock/one', params);
};

export const getConceptOne = (params) => {
  return httpRequest.post('/concept/one', params);
};

export const getAi = (params) => {
  return httpRequest.post('/getAi', params);
};

export const getFocusList = (params) => {
  return httpRequest.post('/focus/list', params);
};

export const focusAdd = (params) => {
  return httpRequest.post('/focus/add', params);
};

export const focusDelete = (params) => {
  return httpRequest.post('/focus/delete', params);
};

export const taskInitPage = (params) => {
  return httpRequest.post('/task/init-page', params);
};

export const taskUpdatePage = (params) => {
  return httpRequest.post('/task/update-page', params);
};

export const taskInitK = (params) => {
  return httpRequest.post('/task/init-k', params);
};


export const taskInitHolding = () => {
  return httpRequest.post('/task/init-holding');
};


export const taskClear = ()=>{
  return httpRequest.post('/task/clear');
}

export const taskRetry = (params)=>{
  return httpRequest.post('/task/taskRetry',params);
}

export const taskList = ()=>{
  return httpRequest.post('/task/list');
}
export const getFocusListDetail = (params) => {
  return httpRequest.post('/focus/list-detail', params);
};

export const getEftOne = (params) => {
  return httpRequest.post('/etf/one', params);
};

export const getLofOne = (params) => {
  return httpRequest.post('/lof/one', params);
};


export const getHomeInfo = (params) => {
  return httpRequest.post('/summary/homeInfo', params);
};
