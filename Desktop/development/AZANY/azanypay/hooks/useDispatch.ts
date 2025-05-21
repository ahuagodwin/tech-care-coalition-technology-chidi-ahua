import { AppDispatch, RootState } from '@/store';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;