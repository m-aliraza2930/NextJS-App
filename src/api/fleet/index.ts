import axios from "axios";

const STORAGE_KEY = 'accessToken';
const accessToken = window.sessionStorage.getItem(STORAGE_KEY);
type FleetRequest = {
  name: string;
  description: string;
  //company: string;
};
class FleetAPI{
  async createFleet(request:FleetRequest){
    let resp= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/fleets`, request,{
      headers:{
        'Authorization': `Bearer ${accessToken}`
      }
    })
    return resp.data
  }

  async fleetMapView(){
    const resp=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/trackers/649cfb25-4c00-4607-8580-2d1a51daf754/map`,{
      headers:{
        'Authorization': `Bearer ${accessToken}`
      }
    })
    return resp.data
  }
}
export const fleetAPI= new FleetAPI();
