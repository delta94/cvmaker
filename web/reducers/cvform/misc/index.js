import clone from 'clone';
import initialState from './initial-state';

const others = (state = initialState, action) => {

  const payload = action.payload;
  
  switch (action.type) {

  case 'ADD_MISC_GROUP': {
    const list = [...state.list];
    list.push(clone(initialState.list[0]));
    return { ...state, list};
  }

  case 'DELETE_MISC_GROUP': {
    const list = [...state.list];
    list.splice(payload.idx, 1);
    return { ...state, list};
  }

  case 'MOVE_MISC_GROUP': {
    const list = [...state.list];
    const item = list.splice(payload.idx, 1);
    list.splice(payload.dir === 'up' ? payload.idx - 1: payload.idx + 1, 0, item[0]);
    return { ...state, list};
  }

  case 'TOGGLE_MISC_GROUP': {
    return { ...state, expanded: payload.idx === state.expanded ? -1 : payload.idx};
  }
    
  case 'HANDLE_MISC_CHANGE': {
    const list = clone(state.list);
    const { idx, type, val } = {...payload};
    list[idx][type].value = val;
    list[idx][type].error = (!val && 'This field is required') || '';
    return { ...state, list};
  }

  default:
    return { ...state };
  }
};

export default others;
