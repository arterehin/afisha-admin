import uiReducer from "@redux/ui";

const slice = uiReducer("materials");

export const { actions, types } = slice;
export default slice.reducer;