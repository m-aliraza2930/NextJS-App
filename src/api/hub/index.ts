import axios from "axios";

const STORAGE_KEY = 'accessToken';
const accessToken = window.sessionStorage.getItem(STORAGE_KEY);
type HubRequest = {
  imei: string;
  version: string;
  fleetId: string;
  //company: string;
};
class HubAPI{
  async createHub(request:HubRequest){
    let resp= await axios.post(`${process.env.NEXT_PUBLIC_API_URL }/trackers/hubs`, request,{
      headers:{
        'Authorization': `Bearer ${accessToken}`
      }
    })
    return resp.data
  }
}
export const hubAPI= new HubAPI();
