export const UPDATE_CURRENT_TAB: 'UPDATE_CURRENT_TAB' = 'UPDATE_CURRENT_TAB';

export interface IUpdateCurrentTab {
    readonly type: typeof UPDATE_CURRENT_TAB;
    readonly ratio: number;
    readonly id: string;
};

export type TTabActions = IUpdateCurrentTab;