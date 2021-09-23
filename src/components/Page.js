import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Container } from "reactstrap";
import Tabs from "@components/Tabs";
import Loader from "@components/Loader";

const Page = ({ tabs, namespace, titleContent }) => {
  const { t, ready } = useTranslation(namespace);

  const config = useMemo(() => {
    return tabs.map((item) => ({
      ...item,
      title: t(item.title)
    }));
  }, [tabs, t]);

  return (
    <Loader loading={!ready}>
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">{t("title")}{titleContent}</h1>
        <Tabs config={config} />
      </Container>
    </Loader>
  )
};

export default Page;