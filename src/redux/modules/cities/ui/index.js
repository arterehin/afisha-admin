import uiReducer from "@redux/ui";

const slice = uiReducer("cities");

export const { actions, types } = slice;
export default slice.reducer;