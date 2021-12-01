import { UPDATE_CURRENT_TAB } from "../actions/constructor-tab-actions";

const initialState = {
  tabs: [
    {
      id: 'bun',
      title: 'Булки',
      ratio: 0,
    },
    {
      id: 'sauce',
      title: 'Соусы',
      ratio: 0,
    },
    {
      id: 'main',
      title: 'Начинки',
      ratio: 0,
    }
  ]
}

export default function constructorTabReducer (state = initialState, action) {
  switch(action.type) {
    case UPDATE_CURRENT_TAB: {
      const tempState = {...state};
      const index = state.tabs.indexOf(state.tabs.find(el => el.id === action.id));
      tempState.tabs[index].ratio = action.ratio;
      return {
        ...tempState
      }
    }
    default:
      return state;
  }
}