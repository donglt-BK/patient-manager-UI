import Pages from "@/router/Pages";
import Profile from "../views/profile/Profile";
export default [
    {
        ...Pages.profile,
        component: Profile,
        meta: {
            title: "Profile",
        },
    },
];
