"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rampUp = void 0;
var axios_1 = require("axios");
var rampUp = /** @class */ (function () {
    //private static readonly MAX_STARGAZERS_COUNT = 10000;
    //private static readonly MAX_FORKS_COUNT = 10000;
    function rampUp(repoOwner, repoName) {
        this.repoOwner = repoOwner;
        this.repoName = repoName;
    }
    rampUp.prototype.getRampUpScore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, size, stargazers_count, forks_count, fileCount, dependenciesCount, score, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, axios_1.default.get("https://api.github.com/repos/".concat(this.repoOwner, "/").concat(this.repoName), {
                                headers: {
                                    Authorization: "token ".concat(process.env.GITHUB_TOKEN)
                                }
                            })];
                    case 1:
                        response = _b.sent();
                        _a = response.data, size = _a.size, stargazers_count = _a.stargazers_count, forks_count = _a.forks_count;
                        return [4 /*yield*/, this.getFileCount()];
                    case 2:
                        fileCount = _b.sent();
                        return [4 /*yield*/, this.getDependenciesCount()];
                    case 3:
                        dependenciesCount = _b.sent();
                        score = this.calculateScore({
                            fileCount: fileCount,
                            //lineCount,
                            dependenciesCount: dependenciesCount,
                            size: size
                            //stargazers_count,
                            //forks_count
                        });
                        return [2 /*return*/, parseFloat(score.toFixed(3))];
                    case 4:
                        error_1 = _b.sent();
                        console.error('RAMPUP -> Error fetching repository stats:', error_1);
                        return [2 /*return*/, 0]; // Return 0 in case of an error
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    rampUp.prototype.getFileCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("https://api.github.com/repos/".concat(this.repoOwner, "/").concat(this.repoName, "/contents"), {
                            headers: {
                                Authorization: "token ".concat(process.env.GITHUB_TOKEN)
                            }
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data.length];
                }
            });
        });
    };
    /*
        private async getLineCount(): Promise<number> { // SCRAPED
            // Implement logic to count lines of code in the repository
            const response = await axios.get(`https://api.github.com/repos/${this.repoOwner}/${this.repoName}/git/trees/master?recursive=1`, {
                headers: {
                    Authorization: `token ${process.env.GITHUB_TOKEN}`
                }
            });
            const tree = response.data.tree;
            let lineCount = 0;
    
            for (const file of tree) {
                if (file.type === 'blob') {
                const fileResponse = await axios.get(file.url, {
                    headers: {
                        Authorization: `token ${process.env.GITHUB_TOKEN}`
                    }
                });
                lineCount += fileResponse.data.content.split('\n').length;
                }
            }
    
            return lineCount;
        }
    */
    rampUp.prototype.getDependenciesCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, packageJson, dependencies, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("https://api.github.com/repos/".concat(this.repoOwner, "/").concat(this.repoName, "/contents/package.json"), {
                                headers: {
                                    Authorization: "token ".concat(process.env.GITHUB_TOKEN)
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        packageJson = JSON.parse(Buffer.from(response.data.content, 'base64').toString());
                        dependencies = packageJson.dependencies || {};
                        return [2 /*return*/, Object.keys(dependencies).length];
                    case 2:
                        error_2 = _a.sent();
                        console.error('getDependenciesCount -> Error fetching dependencies count:', error_2);
                        return [2 /*return*/, 0]; // Return undefined in case of an error
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    rampUp.prototype.calculateScore = function (stats) {
        var fileCount = stats.fileCount, 
        //lineCount,
        dependenciesCount = stats.dependenciesCount, size = stats.size
        //stargazers_count,
        //forks_count
        ;
        var fileCountScore = 1 - Math.min(fileCount / rampUp.MAX_FILE_COUNT, 1);
        //const lineCountScore = 1 - Math.min(lineCount / rampUp.MAX_LINE_COUNT, 1);
        //const dependenciesCountScore = dependenciesCount !== undefined ? 1 - Math.min(dependenciesCount / rampUp.MAX_DEPENDENCIES_COUNT, 1) : 0;
        var dependenciesCountScore = 1 - Math.min(dependenciesCount / rampUp.MAX_DEPENDENCIES_COUNT, 1);
        var sizeScore = 1 - Math.min(size / rampUp.MAX_SIZE, 1);
        //const stargazersCountScore = Math.min(stargazers_count / rampUp.MAX_STARGAZERS_COUNT, 1);
        //const forksCountScore = Math.min(forks_count / rampUp.MAX_FORKS_COUNT, 1);
        //const totalScore = (fileCountScore + lineCountScore + dependenciesCountScore + sizeScore + stargazersCountScore + forksCountScore) / 6;
        //const totalScore = (fileCountScore + lineCountScore + dependenciesCountScore + sizeScore) / 4;
        var totalScore = (fileCountScore + dependenciesCountScore + sizeScore) / 3;
        return totalScore;
    };
    rampUp.MAX_FILE_COUNT = 1000;
    //private static readonly MAX_LINE_COUNT = 100000;
    rampUp.MAX_DEPENDENCIES_COUNT = 100;
    rampUp.MAX_SIZE = 10000000; // in KB
    return rampUp;
}());
exports.rampUp = rampUp;
