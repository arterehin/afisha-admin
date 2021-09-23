import uiReducer from "@redux/ui";

const slice = uiReducer("editPlaceAttributes");

export const { actions, types } = slice;
export default slice.reducer;