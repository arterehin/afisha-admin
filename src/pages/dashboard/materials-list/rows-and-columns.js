import React from "react";
import { Badge } from "reactstrap";
import {
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
} from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAndroid as faAndroidIcon,
  faApple as faAppleIcon,
  faChrome as faChromeIcon,
  faFacebook as faFacebookIcon,
  faTelegram as faTelegramIcon,
} from "@fortawesome/free-brands-svg-icons";

export const columns = (actions, t, sections) => {
  const sectionNames = {};
  sections.forEach((section) => {
    sectionNames[section["@id"]] = section.name;
  });

  return [
    {
      dataField: "priority",
      text: t("list.table.column.priority"),
      formatter: (cell, row) => {
        switch (row.priority) {
          case "LOW":
            return <ChevronDownIcon size={28} className="text-primary" />;

          case "HIGH":
            return <ChevronUpIcon size={28} className="text-danger" />;

          case "MEDIUM":
          default:
            return "";
        }
      },
      align: "center",
      headerStyle: () => {
        return {
          width: "5%",
          textAlign: "center",
        };
      },
      sort: true,
    },
    {
      dataField: "type",
      text: t("list.table.column.type"),
      formatter: (cell, row) => {
        if (!row.type) {
          return "";
        }

        const typeLetter = t("entity.material.type." + row.type.toLowerCase())
          .substr(0, 1)
          .toUpperCase();

        switch (row.type) {
          case "ARTICLE":
            return <Badge color="primary">{typeLetter}</Badge>;

          case "NEWS":
            return <Badge color="success">{typeLetter}</Badge>;

          case "REVIEW":
            return <Badge color="secondary">{typeLetter}</Badge>;

          default:
            return "";
        }
      },
      align: "center",
      headerStyle: () => {
        return {
          width: "5%",
          textAlign: "center",
        };
      },
      sort: true,
    },
    {
      dataField: "title",
      text: t("list.table.column.title"),
      formatter: (cell, row) => (
        <>
          <div>
            {row.isAdvertising && (
              <Badge color="warning" className="mr-1">
                PR
              </Badge>
            )}
            {row.title}
          </div>
          {row.sections.map((section, idx) => (
            <span
              key={`${row["@id"]}-section-${idx}`}
              className="mr-1 my-1 text-muted"
            >
              {sectionNames[section]}
            </span>
          ))}
        </>
      ),
      headerStyle: () => {
        return {
          width: "30%",
        };
      },
      sort: true,
    },
    {
      dataField: "pushNotifications",
      text: t("list.table.column.pushNotifications"),
      formatter: (cell, row) => {
        if (row.status !== "PUBLISHED") {
          return "";
        }

        const classNames = {
          ANDROID: "",
          IOS: "",
          WEBPUSH: "",
        };

        row.pushNotifications.forEach((pushNotification) => {
          const { status, target } = pushNotification;
          switch (status) {
            case "FAILURE":
              classNames[target] = "text-danger";
              break;

            case "PROCESSED":
              classNames[target] = "text-warning";
              break;

            case "QUEUED":
              classNames[target] = "text-primary";
              break;

            case "SENT":
              classNames[target] = "text-success";
              break;

            default:
              classNames[target] = "";
              break;
          }
        });

        return (
          <>
            <FontAwesomeIcon
              icon={faAppleIcon}
              size="lg"
              fixedWidth
              className={classNames.IOS}
            />
            <FontAwesomeIcon
              icon={faAndroidIcon}
              size="lg"
              fixedWidth
              className={classNames.ANDROID}
            />
            <FontAwesomeIcon
              icon={faChromeIcon}
              size="lg"
              fixedWidth
              className={classNames.WEBPUSH}
            />
          </>
        );
      },
      headerStyle: () => {
        return {
          width: "10%",
        };
      },
      sort: false,
    },
    {
      dataField: "socialAnnouncements",
      text: t("list.table.column.socialAnnouncements"),
      formatter: (cell, row) => {
        if (row.status !== "PUBLISHED") {
          return "";
        }

        const classNames = {
          FACEBOOK: "",
          TELEGRAM: "",
        };

        row.socialAnnouncements.forEach((socialAnnouncement) => {
          classNames[socialAnnouncement.target] = "text-success";
        });

        return (
          <>
            <FontAwesomeIcon
              icon={faFacebookIcon}
              size="lg"
              fixedWidth
              className={classNames.FACEBOOK}
            />
            <FontAwesomeIcon
              icon={faTelegramIcon}
              size="lg"
              fixedWidth
              className={classNames.TELEGRAM}
            />
          </>
        );
      },
      headerStyle: () => {
        return {
          width: "10%",
        };
      },
      sort: false,
    },
    {
      dataField: "viewsCount",
      text: t("list.table.column.viewsCount"),
      sort: true,
    },
    {
      dataField: "commentsCount",
      text: t("list.table.column.commentsCount"),
      formatter: (cell, row) => {
        return (
          <>
            {row.publishedCommentsCount} / {row.pendingCommentsCount}
          </>
        );
      },
      sort: false,
    },
    {
      dataField: "published",
      text: t("list.table.column.published"),
      formatter: (cell, row) => {
        if (row.status !== "PUBLISHED") {
          return row.createdBy.fullName;
        }

        const publishedAtDate = new Date(row.publishedAt);
        const publishedAtFormatted =
          (publishedAtDate.getDate() < 10
            ? `0${publishedAtDate.getDate()}`
            : publishedAtDate.getDate()) +
          "/" +
          (publishedAtDate.getMonth() < 9
            ? `0${publishedAtDate.getMonth() + 1}`
            : publishedAtDate.getMonth() + 1) +
          "/" +
          publishedAtDate.getFullYear() +
          " " +
          (publishedAtDate.getHours() < 10
            ? `0${publishedAtDate.getHours()}`
            : publishedAtDate.getHours()) +
          ":" +
          (publishedAtDate.getMinutes() < 10
            ? `0${publishedAtDate.getMinutes()}`
            : publishedAtDate.getMinutes());

        return (
          <>
            {publishedAtFormatted}
            <br />
            {row.createdBy.fullName}
          </>
        );
      },
      sort: true,
    },
  ];
};

export const rowClasses = (row, rowIndex) => {
  return row.status === "PUBLISHED" ? "" : "bg-light";
};
