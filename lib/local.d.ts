import { KeyValue, Viewer } from './index';
export default class Local implements Viewer {
    private cwd;
    constructor(cwd: string);
    private pkgPath(pattern);
    match(pattern: KeyValue): boolean;
    view(pattern: KeyValue): Promise<any | undefined>;
}
