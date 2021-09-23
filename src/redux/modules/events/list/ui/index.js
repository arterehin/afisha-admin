import uiReducer from "@redux/ui";

const slice = uiReducer("events");

export const { actions, types } = slice;
export default slice.reducer;
