//import XXHash from 'xxhashjs';
//import  from "moment-timezone";
import {
  v4 as uuidv4
} from "uuid";

class SystemUtils {

  static getUUIDv4() {

    return uuidv4();

  }

}

export default SystemUtils;
