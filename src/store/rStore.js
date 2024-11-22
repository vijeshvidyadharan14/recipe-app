import { configureStore } from '@reduxjs/toolkit'
import recipeSlice from './slice/recipeSlicie'

const rStore = configureStore({
    reducer: {
      recipeReducer : recipeSlice
    }
  })

export default rStore