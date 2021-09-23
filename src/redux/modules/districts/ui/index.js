import uiReducer from "@redux/ui";

const slice = uiReducer("districts");

export const { actions, types } = slice;
export default slice.reducer;