import uiReducer from "@redux/ui";

const slice = uiReducer("placeTypes");

export const { actions, types } = slice;
export default slice.reducer;