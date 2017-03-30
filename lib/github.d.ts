import { KeyValue, Viewer } from './index';
export declare class Github implements Viewer {
    match(pattern: KeyValue): boolean;
    view(pattern: KeyValue): Promise<any | undefined>;
}
declare var _default: Github;
export default _default;
