
import { CountriesAPIResponse } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


  interface countriesState {
    countries: CountriesAPIResponse  | null;
    isCountriesLoading: boolean;
    isCountriesError: string | null;
  }

const initialState: countriesState = {
  countries: null,
  isCountriesLoading: false,
  isCountriesError: null,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    countriesStart(state) {
      state.isCountriesLoading = true;
      state.isCountriesError = null;
    },
    countriesSuccess(state, action: PayloadAction<CountriesAPIResponse>) {
      state.countries = action.payload;
      state.isCountriesLoading= false;
      state.isCountriesError = null;

    },
    countriesFailure(state, action: PayloadAction<string>) {
      state.isCountriesLoading= false;
      state.isCountriesError = action.payload;
    }
  },
});

export const { countriesStart, countriesSuccess, countriesFailure} = countriesSlice.actions;
export default countriesSlice.reducer;