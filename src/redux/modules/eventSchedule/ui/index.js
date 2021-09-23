import uiReducer from "@redux/ui";

const slice = uiReducer("event_schedule");

export const { actions, types } = slice;
export default slice.reducer;