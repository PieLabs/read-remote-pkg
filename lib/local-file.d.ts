import { KeyValue, Viewer } from './index';
export default class LocalFile implements Viewer {
    private cwd;
    constructor(cwd: string);
    match(pattern: KeyValue): boolean;
    view(pattern: KeyValue): Promise<any | undefined>;
}
