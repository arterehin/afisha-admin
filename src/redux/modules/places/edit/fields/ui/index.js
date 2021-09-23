import uiReducer from "@redux/ui";

const slice = uiReducer("editPlaceFields");

export const { actions, types } = slice;
export default slice.reducer;