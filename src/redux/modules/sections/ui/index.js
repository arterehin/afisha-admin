import uiReducer from "@redux/ui";

const slice = uiReducer("sections");

export const { actions, types } = slice;
export default slice.reducer;
