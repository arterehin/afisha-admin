import {
  List as ListIcon,
  Plus as PlusIcon,
  Edit as EditIcon
} from "react-feather";
import List from "./list";
import Add from "./components/Add";
import Edit from "./components/Edit";

export default [{
  id: "list",
  title: "list.title",
  icon: ListIcon,
  component: List,
  visible: true
}, {
  id: "add",
  title: "add.title",
  icon: PlusIcon,
  component: Add,
  visible: true
}, {
  id: "edit",
  title: "edit.title",
  icon: EditIcon,
  component: Edit
}];