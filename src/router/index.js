import Pages from "@/router/Pages";
import Profile from "../views/profile/Profile";
import Menu from "../views/menu/Menu";

export default [
    {
        ...Pages.profile,
        component: Profile,
        meta: {
            title: "Profile",
        },
    }, {
        ...Pages.menu,
        component: Menu,
        meta: {
            title: "Menu",
        },
    },
];
