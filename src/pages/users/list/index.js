import React, {
  useState,
  useEffect,
  useMemo
} from "react";
import {
  useDispatch,
  useSelector
} from "react-redux";
import { useTranslation } from "react-i18next";
import useToast from "@hooks/useToast";

import { getUsers } from "@redux/modules/users/actions";
import columns from "./columns";

import Loader from "@components/Loader";
import Pagination from "@components/Pagination";
import Search from "./components/Search";
import BootstrapTable from "react-bootstrap-table-next";
import Delete from "./components/Delete";

const List = ({ enableTab }) => {
  const { t, i18n } = useTranslation("users");
  const dispatch = useDispatch();
  const data = useSelector(state => state.users.data);
  const loading = useSelector(state => state.users.ui.get.loading);
  const [modalState, setModalState] = useState({
    isOpen: false,
    user: {}
  });

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, i18n.language]);

  useToast(
    () => { },
    state => state.users.ui.get.error,
    "users"
  );

  useToast(
    state => state.users.ui.delete.success,
    state => state.users.ui.delete.error,
    "users"
  );

  const handleEditClick = (e, user) => {
    enableTab("edit", user);
  }

  const handleDeleteClick = (e, user) => {
    setModalState({
      isOpen: true,
      user
    });
  }

  const handleModalClose = () => {
    setModalState({
      isOpen: false
    });
  }

  const users = useMemo(() => {
    return data.map((row, index) => ({
      ...row,
      index
    }));
  }, [data]);

  return (
    <>
      <Search />
      <Loader className="py-5" loading={loading}>
        <Pagination options={{
          sizePerPage: 20,
          hidePageListOnlyOnePage: true
        }}>
          <BootstrapTable
            bootstrap4
            bordered={false}
            keyField="@id"
            data={users}
            columns={columns({
              onDeleteClick: handleDeleteClick,
              onEditClick: handleEditClick
            }, t)}
          />
        </Pagination>
      </Loader>
      <Delete {...modalState} onClose={handleModalClose} />
    </>
  );
};

export default List;