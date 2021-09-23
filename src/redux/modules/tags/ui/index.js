import uiReducer from "@redux/ui";

const slice = uiReducer("tags");

export const { actions, types } = slice;
export default slice.reducer;