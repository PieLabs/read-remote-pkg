"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RegClient = require("npm-registry-client");
const semver = require("semver");
const log_factory_1 = require("log-factory");
const logger = log_factory_1.buildLogger();
const client = new RegClient({});
let toRegistryPath = (pattern) => {
    return encodeURI(`${pattern.key}/${pattern.value}`);
};
class Npm {
    match(pattern) {
        let s = semver.validRange(pattern.value, true);
        let match = pattern.value === '*' || s !== null;
        logger.silly('[match] ', match, pattern, s);
        return match;
    }
    view(pattern) {
        logger.info('[view] pattern: ', pattern);
        return new Promise((resolve, reject) => {
            let path = toRegistryPath(pattern);
            client.get(`http://registry.npmjs.org/${path}`, { timeout: 1000 }, (err, data) => {
                if (err) {
                    logger.debug('[view] err: ', err);
                    resolve(undefined);
                    return;
                }
                else {
                    resolve(data);
                }
            });
        });
    }
}
exports.Npm = Npm;
exports.default = new Npm();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ucG0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBaUQ7QUFDakQsaUNBQWlDO0FBSWpDLDZDQUEwQztBQUUxQyxNQUFNLE1BQU0sR0FBRyx5QkFBVyxFQUFFLENBQUM7QUFHN0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7QUFFakMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxPQUFpQjtJQUNyQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUN0RCxDQUFDLENBQUM7QUFFRjtJQUVFLEtBQUssQ0FBQyxPQUFpQjtRQUNyQixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQztRQUNoRCxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBSSxDQUFDLE9BQWlCO1FBRXBCLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFekMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU07WUFDakMsSUFBSSxJQUFJLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUk7Z0JBQzNFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQ1IsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQ2xDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDbkIsTUFBTSxDQUFDO2dCQUNULENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTFCRCxrQkEwQkM7QUFFRCxrQkFBZSxJQUFJLEdBQUcsRUFBRSxDQUFDIiwiZmlsZSI6Im5wbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlZ0NsaWVudCBmcm9tICducG0tcmVnaXN0cnktY2xpZW50JztcbmltcG9ydCAqIGFzIHNlbXZlciBmcm9tICdzZW12ZXInO1xuXG5pbXBvcnQgeyBLZXlWYWx1ZSwgVmlld2VyIH0gZnJvbSAnLi9pbmRleCc7XG5cbmltcG9ydCB7IGJ1aWxkTG9nZ2VyIH0gZnJvbSAnbG9nLWZhY3RvcnknO1xuXG5jb25zdCBsb2dnZXIgPSBidWlsZExvZ2dlcigpO1xuXG5cbmNvbnN0IGNsaWVudCA9IG5ldyBSZWdDbGllbnQoe30pO1xuXG5sZXQgdG9SZWdpc3RyeVBhdGggPSAocGF0dGVybjogS2V5VmFsdWUpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gZW5jb2RlVVJJKGAke3BhdHRlcm4ua2V5fS8ke3BhdHRlcm4udmFsdWV9YCk7XG59O1xuXG5leHBvcnQgY2xhc3MgTnBtIGltcGxlbWVudHMgVmlld2VyIHtcblxuICBtYXRjaChwYXR0ZXJuOiBLZXlWYWx1ZSk6IGJvb2xlYW4ge1xuICAgIGxldCBzID0gc2VtdmVyLnZhbGlkUmFuZ2UocGF0dGVybi52YWx1ZSwgdHJ1ZSk7XG4gICAgbGV0IG1hdGNoID0gcGF0dGVybi52YWx1ZSA9PT0gJyonIHx8IHMgIT09IG51bGw7XG4gICAgbG9nZ2VyLnNpbGx5KCdbbWF0Y2hdICcsIG1hdGNoLCBwYXR0ZXJuLCBzKTtcbiAgICByZXR1cm4gbWF0Y2g7XG4gIH1cblxuICB2aWV3KHBhdHRlcm46IEtleVZhbHVlKTogUHJvbWlzZTxhbnkgfCB1bmRlZmluZWQ+IHtcblxuICAgIGxvZ2dlci5pbmZvKCdbdmlld10gcGF0dGVybjogJywgcGF0dGVybik7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgbGV0IHBhdGggPSB0b1JlZ2lzdHJ5UGF0aChwYXR0ZXJuKTtcbiAgICAgIGNsaWVudC5nZXQoYGh0dHA6Ly9yZWdpc3RyeS5ucG1qcy5vcmcvJHtwYXRofWAsIHsgdGltZW91dDogMTAwMCB9LCAoZXJyLCBkYXRhKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ1t2aWV3XSBlcnI6ICcsIGVycik7XG4gICAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgTnBtKCk7XG4iXX0=
