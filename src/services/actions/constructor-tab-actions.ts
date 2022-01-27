export const UPDATE_CURRENT_TAB: 'UPDATE_CURRENT_TAB' = 'UPDATE_CURRENT_TAB';

export interface IUpdateCurrentTab {
    readonly type: typeof UPDATE_CURRENT_TAB;
}

export type TTabActions = IUpdateCurrentTab;