import uiReducer from "@redux/ui";

const slice = uiReducer("performances");

export const { actions, types } = slice;
export default slice.reducer;
