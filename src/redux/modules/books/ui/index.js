import uiReducer from "@redux/ui";

const slice = uiReducer("books");

export const { actions, types } = slice;
export default slice.reducer;