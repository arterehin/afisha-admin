import React, { useMemo } from "react";
import useLanguage from "@hooks/useLanguage";
import { 
    Card, 
    CardBody 
} from "reactstrap";
import Tabs from "@components/Tabs";

const LanguageTabs = ({ component: Component, render, ...props }) => {
    const { locales, languages } = useLanguage();

    const config = useMemo(() => {
        return locales.map((locale) => ({
            id: `lang-${locale}`,
            icon: (
                <span className="nav-flag px-0">
                    <img
                        src={languages[locale].flag}
                        alt={languages[locale].label}
                    />
                </span>
            ),
            locale,
            visible: true
        }));
    }, [languages, locales]);

    return (
        <Card className="card-gray">
            <CardBody className="p-3">
                <Tabs
                    className="tab-vertical"
                    config={config}
                    render={render ? render : (tabsProps) => (
                        <Component
                            {...props}
                            {...tabsProps}
                        />
                    )}
                />
            </CardBody>
        </Card>
    );
}

export default LanguageTabs;