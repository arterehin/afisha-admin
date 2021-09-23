import uiReducer from "@redux/ui";

const slice = uiReducer("addPlaceAttributes");

export const { actions, types } = slice;
export default slice.reducer;