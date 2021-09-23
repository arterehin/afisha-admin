import uiReducer from "@redux/ui";

const slice = uiReducer("addPlaceFields");

export const { actions, types } = slice;
export default slice.reducer;