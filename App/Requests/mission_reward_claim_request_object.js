import BaseRequestObject from "./base_request_object";

class MissionRewardClaimRequestObject extends BaseRequestObject{

    constructor(){
        super();
    }

   getUrlString() {
       return `members/${this.url_id}/claim_mission_reward`
   }
}
export default MissionRewardClaimRequestObject
