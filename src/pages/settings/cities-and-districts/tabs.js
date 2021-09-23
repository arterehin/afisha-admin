import { List, Plus, Edit } from "react-feather";
import Cities from "@pages/settings/cities-and-districts/cities";
import AddCity from "@pages/settings/cities-and-districts/cities/components/Add";
import EditCity from "@pages/settings/cities-and-districts/cities/components/Edit";
import AddDistrict from "@pages/settings/cities-and-districts/districts/components/Add";
import EditDistrict from "@pages/settings/cities-and-districts/districts/components/Edit";

export default [{
  id: "list",
  title: "list.tab",
  icon: List,
  component: Cities,
  visible: true
}, {
  id: "add-city",
  title: "add-city",
  icon: Plus,
  component: AddCity,
  visible: true
}, {
  id: "edit-city",
  title: "edit-city",
  icon: Edit,
  component: EditCity
}, {
  id: "add-district",
  title: "add-district",
  icon: Plus,
  component: AddDistrict
}, {
  id: "edit-district",
  title: "edit-district",
  icon: Edit,
  component: EditDistrict
}];