import * as api from "./api";

let TURNIceservers = null;

export const fetchTURNcredentials = async () => {
  const responseData = await api.getTURNcredentials();
  if (responseData.token?.iceServers)
    TURNIceservers = responseData.token.iceServers;
  return TURNIceservers;
};

export const getTurnIceServers = () => {
  return TURNIceservers;
};
