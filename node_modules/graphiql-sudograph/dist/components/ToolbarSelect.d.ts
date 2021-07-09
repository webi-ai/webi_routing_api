import React, { MouseEventHandler } from 'react';
declare type ToolbarSelectProps = {
    title?: string;
    label?: string;
    onSelect?: (selection: string) => void;
};
declare type ToolbarSelectState = {
    visible: boolean;
};
export declare class ToolbarSelect extends React.Component<ToolbarSelectProps, ToolbarSelectState> {
    private _node;
    private _listener;
    constructor(props: ToolbarSelectProps);
    componentWillUnmount(): void;
    render(): JSX.Element;
    _subscribe(): void;
    _release(): void;
    handleClick(e: MouseEvent): void;
    handleOpen: (e: React.MouseEvent) => void;
}
declare type ToolbarSelectOptionProps = {
    onSelect: MouseEventHandler<HTMLLIElement>;
    label: string;
    selected: boolean;
    value?: any;
};
export declare function ToolbarSelectOption({ onSelect, label, selected, }: ToolbarSelectOptionProps): JSX.Element;
export {};
//# sourceMappingURL=ToolbarSelect.d.ts.map