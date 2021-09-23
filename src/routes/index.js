import {
  Briefcase as BriefcaseIcon,
  Image as ImageIcon,
  Database as DatabaseIcon,
  Layers as LayersIcon,
  MessageSquare as MessageSquareIcon,
  Users as UsersIcon,
  Settings as SettingsIcon
} from "react-feather";

// Misc
import Blank from "@pages/misc/Blank";

// Cities and Districts
import Dashboard from "@pages/dashboard";
import Places from "@pages/places";
import Users from "@pages/users";
import CitiesAndDistricts from "@pages/settings/cities-and-districts";
import Materials from "@pages/materials";

// Routes
const dashboardRoutes = {
  path: "/dashboard",
  icon: BriefcaseIcon,
  component: Dashboard,
  containsHome: true
};

const materialsRoutes = {
  path: "/materials",
  name: "menu.materials",
  icon: BriefcaseIcon,
  component: Materials,
  children: null
};

const afficheRoutes = {
  path: "/affiche",
  name: "menu.affiche",
  icon: ImageIcon,
  children: [
    {
      path: "/affiche/movie-shows",
      name: "menu.movie-shows",
      component: Blank
    },
    {
      path: "/affiche/perfomances",
      name: "menu.perfomances",
      component: Blank
    }
  ]
};

const baseRoutes = {
  path: "/base",
  name: "menu.base",
  icon: DatabaseIcon,
  children: [
    {
      path: "/base/movies",
      name: "menu.movies",
      component: Blank
    },
    {
      path: "/base/perfomances",
      name: "menu.perfomances",
      component: Blank
    }
  ]
};

const placesRoutes = {
  path: "/places",
  name: "menu.places",
  icon: LayersIcon,
  component: Places,
  children: null
};

const commentsRoutes = {
  path: "/comments",
  name: "menu.comments",
  icon: MessageSquareIcon,
  children: [
    {
      path: "/comments/materials",
      name: "menu.materials",
      component: Blank
    },
    {
      path: "/comments/catalog",
      name: "menu.catalog",
      component: Blank
    },
    {
      path: "/comments/movies",
      name: "menu.movies",
      component: Blank
    },
    {
      path: "/comments/perfomances",
      name: "menu.perfomances",
      component: Blank
    }
  ]
};

const usersRoutes = {
  path: "/users",
  name: "menu.users",
  icon: UsersIcon,
  component: Users,
  children: null
};

const settingsRoutes = {
  path: "/settings",
  name: "menu.settings",
  icon: SettingsIcon,
  children: [
    {
      path: "/settings/sections",
      name: "menu.sections",
      component: Blank
    },
    {
      path: "/settings/cities-and-districts",
      name: "menu.cities-and-districts",
      component: CitiesAndDistricts
    }
  ]
};

// Dashboard specific routes
export const dashboard = [
  dashboardRoutes,
  materialsRoutes,
  afficheRoutes,
  baseRoutes,
  placesRoutes,
  commentsRoutes,
  usersRoutes,
  settingsRoutes
];

// All routes
export default [
  materialsRoutes,
  afficheRoutes,
  baseRoutes,
  placesRoutes,
  commentsRoutes,
  usersRoutes,
  settingsRoutes
];
