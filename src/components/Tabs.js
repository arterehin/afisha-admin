import React, {
  isValidElement,
  useState,
  useCallback,
  useEffect
} from "react";
import classnames from "classnames";

import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";

const Tabs = ({
  config = [],
  className = "",
  active = "",
  render
}) => {
  const defaultTab = config[0] && config[0].id;
  const [activeTab, setActiveTab] = useState(active || defaultTab);
  const [data, setData] = useState({});
  const [state, setState] = useState(config);

  useEffect(() => {
    setState((state) => state.map((item, index) => ({
      ...item,
      title: config[index].title
    })));
  }, [config]);

  const toggleState = useCallback((id, visible) => {
    const tab = state.find((item) => item.id === id);

    if (tab) {
      setState(state.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            visible
          };
        }
        return item;
      }));
    }
  }, [state]);

  const enableTab = useCallback((id, tabData) => {
    toggleState(id, true);
    setActiveTab(id);

    if(tabData) {
      setData((data) => ({
        ...data,
        [id]: tabData
      }))
    }
  }, [toggleState])

  const disableTab = useCallback((id, tabData) => {
    toggleState(id, false);
    setActiveTab(defaultTab);

    if(tabData) {
      setData((data) => ({
        ...data,
        [id]: tabData
      }))
    }
  }, [toggleState, defaultTab]);

  const selectTab = useCallback((id) => {
    if (activeTab !== id) {
      setActiveTab(id);
    }
  }, [activeTab]);

  const renderTab = (props) => {
    const newProps = {
      ...props,
      activeTab,
      enableTab,
      disableTab,
      selectTab
    };

    return render ?
      render(newProps) :
      (<props.component {...newProps} />);
  }

  return (
    <div className={"tab mb-0 " + className}>
      <Nav tabs>
        {state.map(({ visible, ...tab }) => visible && (
          <NavItem key={tab.id}>
            <NavLink
              className={classnames({ active: activeTab === tab.id })}
              onClick={() => selectTab(tab.id)}
            >
              {isValidElement(tab.icon) ? tab.icon : <tab.icon className="mr-1" />}
              {tab.title}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {state.map(({ visible, ...tab }) => visible && (
          <TabPane key={tab.id} tabId={tab.id}>
            {renderTab({
              ...tab,
              data,
              visible
            })}
          </TabPane>
        ))}
      </TabContent>
    </div>
  );
};

export default Tabs;