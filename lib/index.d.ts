export interface Viewer {
    view(pattern: KeyValue): Promise<any | undefined>;
    match(pattern: KeyValue): boolean;
}
export declare type KeyValue = {
    key: string;
    value: string;
};
export default function (key: string, value: string, dir: string): Promise<{}>;
