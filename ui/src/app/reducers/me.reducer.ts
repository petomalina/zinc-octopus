import { ConfirmLoginAction, ConfirmLogoutAction, EndAction, InitializeAction, MeActions } from '../misc/actions';
import { AppStateModel } from '../models/app-state.model';
import { MeModel, MeStatus } from '../models/me.model';

const INITIAL_STATE: MeModel = {
  status: MeStatus.LoggedOut,
  id: null
};

export function meReducer(state: MeModel = INITIAL_STATE, action: MeActions): MeModel {
  switch (action.type) {
    case ConfirmLoginAction.type:
      return {
        ...state,
        status: MeStatus.LoggedIn
      };

    case ConfirmLogoutAction.type:
      return INITIAL_STATE;

    case InitializeAction.type:
      return {
        ...state,
        status: MeStatus.Playing,
        id: (action as InitializeAction).payload.id
      };

    case EndAction.type:
      return {
        ...state,
        status: (action as EndAction).payload.winner === state.id ?
          MeStatus.Winner :
          MeStatus.Loser
      };

    default:
      return state;
  }
}

export const $meId = ({me}: AppStateModel) => me.id;
export const $meStatus = ({me}: AppStateModel) => me.status;
