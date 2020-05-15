import common from './common'
import notificationSystem from './notification_system';
import login from './login';
import listMenu from './list_menu';
import information from "./information";
import event from "./event";
import activity from "./activity";
import facility from './facility';
import floorGuide from './floor_guide';
import shopManagement from './shop_management';
import appMenuManagement from './app_menu_management';
import facilityAdminManagement from './facility_admin_management';
import catalogManagement from './catalog_management';
import page from './page';
import coupon from './coupon';
import customArea from './custom_area';
import customAreaItem from './custom_area_item';
import policy from './policy'
import pushNotification from './push_notification';
import introImg from "./intro_imge";
import createOrUpdateShop from './create_or_update_shop';
import mallInformation from './mall_information';
import facilityInformation from './facility_information';
import webMenu from './web_menu';
import shopImg from './shop_image';
import rulesManagement from './rules_management';
import facilityEmployeeManagement from "./facility_employee_management";
import facilityDayOff from "./facility_day_off";
import mailTemplate from "./mail_template";
import facilityEmployee from "./facility_employee";
import bookingConfig from "./booking_config";
import booking from './booking';
import mailTag from './mailTag';
import bookingManagement from "./booking_management"

const jpMessage = {
    ...common,
    ...notificationSystem,
    ...login,
    ...information,
    ...event,
    ...activity,
    ...listMenu,
    ...floorGuide,
    ...facility,
    ...shopManagement,
    ...catalogManagement,
    ...appMenuManagement,
    ...facilityAdminManagement,
    ...page,
    ...coupon,
    ...customArea,
    ...customAreaItem,
    ...policy,
    ...pushNotification,
    ...createOrUpdateShop,
    ...introImg,
    ...mallInformation,
    ...facilityInformation,
    ...webMenu,
    ...shopImg,
    ...rulesManagement,
    ...facilityEmployeeManagement,
    ...facilityDayOff,
    ...mailTemplate,
    ...facilityEmployee,
    ...bookingConfig,
    ...booking,
    ...bookingManagement,
    ...mailTag
}

export default jpMessage;
