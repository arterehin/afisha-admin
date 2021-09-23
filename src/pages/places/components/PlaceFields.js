import React from "react";
import { useSelector } from "react-redux";

import ConfigurableField from "@components/ConfigurableField";
import Loader from "@components/Loader";

const Fields = ({
  formId,
  ...props
}) => {
  const { form } = props;
  const fields = useSelector(state => state.places[formId].fields.data);
  const fieldsLoading = useSelector(state => state.places[formId].fields.ui.get.loading);
  const attributesLoading = useSelector((state) => state.places[formId].attributes.ui.get.loading);

  return (
    <>
      {form.values.type && (
        <Loader loading={fieldsLoading || attributesLoading} className="py-5">
          {fields.map((field) => (
            <ConfigurableField
              {...props}
              key={field["@id"]}
              field={field}
            />
          ))}
        </Loader>
      )}
    </>
  );
}

export default Fields;
