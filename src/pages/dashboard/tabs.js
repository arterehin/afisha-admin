import {
  FileText as FileTextIcon,
  Layers as LayersIcon,
  Rss as RssIcon,
} from "react-feather";
import Catalog from "@pages/dashboard/catalog";
import EventsList from "@pages/dashboard/events-list";
import MaterialsList from "@pages/dashboard/materials-list";

export default [
  {
    id: "events",
    title: "events.tab",
    icon: RssIcon,
    component: EventsList,
    visible: true,
  },
  {
    id: "materials",
    title: "materials.tab",
    icon: FileTextIcon,
    component: MaterialsList,
    visible: true,
  },
  {
    id: "catalog",
    title: "catalog.tab",
    icon: LayersIcon,
    component: Catalog,
    visible: true,
  },
];
