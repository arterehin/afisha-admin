import React, { cloneElement } from "react";

import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone
} from 'react-bootstrap-table2-paginator';

const Pagination = ({ 
  children, 
  options, 
  topPager = true,
  bottomPager = true 
}) => {
  const { data = [] } = children.props

  return (
    <PaginationProvider
      pagination={paginationFactory({
        ...options,
        custom: true,
        totalSize: data.length
      })}
    >
      {
        ({
          paginationProps,
          paginationTableProps
        }) => (
          <>
            {topPager && <PaginationListStandalone {...paginationProps} />}
            {cloneElement(children, paginationTableProps)}
            {bottomPager && <PaginationListStandalone {...paginationProps} />}
          </>
        )
      }
    </PaginationProvider>
  )
};

export default Pagination;