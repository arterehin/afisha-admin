import uiReducer from "@redux/ui";

const slice = uiReducer("celebrities");

export const { actions, types } = slice;
export default slice.reducer;