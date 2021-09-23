import {
  EMaterialType,
  EMaterialStatus,
  EMaterialPriority,
  EMaterialViewMode
} from "@redux/enums"
import { formatDateTime } from "@utils/formats";

export const initialValue = () => {
  return {
    type: EMaterialType[0],
    title: "",
    slug: "",
    locale: "",
    intro: "",
    content: "",
    extraHtml: "",
    permalink: "",
    status: EMaterialStatus[0],
    priority: EMaterialPriority[1],
    author: "",
    authorCustom: "",
    // mainMediaObject: "",
    mainMediaObjectText: "",
    // ogMediaObject: "",
    tildaSubstitute: false,
    tildaPageId: "",
    tildaChecksum: "",
    viewMode: EMaterialViewMode[0],
    isOnHomepage: false,
    isPromoted: false,
    isExported: false,
    isCommentable: false,
    isAdvertising: false,
    inlineAdsEnabled: false,
    publishedAt: formatDateTime(new Date),
    sections: [],
    tags: [],
    mediaObjects: [],
    eventSchedules: [],
    books: [],
    celebrities: [],
    movies: [],
    performances: [],
    places: []
  };
}