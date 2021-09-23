import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Container } from "reactstrap";
import TabHeader from "@components/TabHeader";
import FormFooter from "@components/FormFooter";
import Loader from "@components/Loader";
import { mapErrorsToFields } from "@utils/forms/common/mapErrorsToFields";
import Fields from "./Fields";

const Form = ({
  onSubmit,
  onDiscard,
  loading,
  ...props
}) => {
  const { form } = props;
  const { setErrors } = form;
  const { t } = useTranslation("materials");
  const tagsLoading = useSelector(state => state.tags.ui.get.loading);
  const sectionsLoading = useSelector(state => state.sections.ui.get.loading);
  const booksLoading = useSelector(state => state.books.ui.get.loading);
  const moviesLoading = useSelector(state => state.movies.ui.get.loading);
  const celebritiesLoading = useSelector(state => state.celebrities.ui.get.loading);
  const placesLoading = useSelector(state => state.places.list.ui.get.loading);
  const usersLoading = useSelector(state => state.users.ui.get.loading);
  const performancesLoading = useSelector(state => state.performances.ui.get.loading);

  const POSTProcessing = useSelector(state => state.materials.list.ui.post.loading);
  const PUTProcessing = useSelector(state => state.materials.list.ui.put.loading);

  const POSTErrors = useSelector(state => state.materials.list.ui.post.error);
  const PUTErrors = useSelector(state => state.materials.list.ui.put.error);

  // useEffect(() => {
  //   console.log('errors', {
  //     ...mapErrorsToFields(POSTErrors),
  //     ...mapErrorsToFields(PUTErrors),
  //   });
  //   setErrors({
  //     ...mapErrorsToFields(POSTErrors),
  //     ...mapErrorsToFields(PUTErrors),
  //   })
  // }, [POSTErrors, PUTErrors]);

  const isLoading = () => {
    return loading
      || POSTProcessing
      || PUTProcessing
      || tagsLoading
      || sectionsLoading
      || booksLoading
      || moviesLoading
      || celebritiesLoading
      || placesLoading
      || usersLoading
      || performancesLoading;
  };

  return (
    <Container fluid className="p-0">
      <div className="d-flex flex-column h-100">
        <TabHeader
          title={t(`${props.formId}.title`)}
        />
        <Loader className="flex-grow-1" loading={isLoading()}>
          <form onSubmit={onSubmit}>
            <Fields {...props}/>
            <FormFooter onDiscard={onDiscard}/>
          </form>
        </Loader>
      </div>
    </Container>
  );
};

export default Form;