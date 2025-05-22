import { useDispatch, useSelector, shallowEqual } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export function useAppSelector<TSelected>(
  selector: (state: RootState) => TSelected
): TSelected {
  return useSelector(selector, shallowEqual);
}
