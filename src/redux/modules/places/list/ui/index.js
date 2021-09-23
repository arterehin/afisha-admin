import uiReducer from "@redux/ui";

const slice = uiReducer("places");

export const { actions, types } = slice;
export default slice.reducer;