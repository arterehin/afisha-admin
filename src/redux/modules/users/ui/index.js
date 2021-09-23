import uiReducer from "@redux/ui";

const slice = uiReducer("users");

export const { actions, types } = slice;
export default slice.reducer;