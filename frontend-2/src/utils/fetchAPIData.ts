export const fetchData = async (serviceCall: () => Promise<any>) => {
  const response = await serviceCall();
  return response.data.data;
};
