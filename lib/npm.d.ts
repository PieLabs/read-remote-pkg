import { KeyValue, Viewer } from './index';
export declare class Npm implements Viewer {
    match(pattern: KeyValue): boolean;
    view(pattern: KeyValue): Promise<any | undefined>;
}
declare var _default: Npm;
export default _default;
