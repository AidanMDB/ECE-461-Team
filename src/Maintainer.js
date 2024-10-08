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
exports.maintainer = void 0;
var axios_1 = require("axios");
var dotenv = require("dotenv");
dotenv.config();
var GITHUB_API = 'https://api.github.com';
var maintainer = /** @class */ (function () {
    /**
     * constructs a metrics manager for a GitHub repository
     *
     * @param owner the owner of the repository
     * @param repoName the name of the repository
     */
    function maintainer(owner, repoName) {
        this.owner = owner;
        this.repoName = repoName;
    }
    /**
     * Calculates the maintainer score of the repository
     *
     * @returns the maintainer score
     */
    maintainer.prototype.getMaintainerScore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lastCommitDateStr, lastCommitDate, todayDate, dateDiff, daysDiff, openIssueRatio, score;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getLastCommit()];
                    case 1:
                        lastCommitDateStr = _a.sent();
                        lastCommitDate = new Date(lastCommitDateStr);
                        todayDate = new Date();
                        dateDiff = Math.abs(todayDate.getTime() - lastCommitDate.getTime());
                        daysDiff = Math.ceil(dateDiff / (1000 * 3600 * 24));
                        return [4 /*yield*/, this.getOpenIssueRatioCount()];
                    case 2:
                        openIssueRatio = _a.sent();
                        score = 0;
                        if (daysDiff < 73 && openIssueRatio < 0.02) {
                            score = 1.000;
                        }
                        else if (daysDiff < 146 && openIssueRatio < 0.04) {
                            score = 0.800;
                        }
                        else if (daysDiff < 219 && openIssueRatio < 0.06) {
                            score = 0.600;
                        }
                        else if (daysDiff < 292 && openIssueRatio < 0.08) {
                            score = 0.400;
                        }
                        else if (daysDiff < 365 && openIssueRatio < 0.1) {
                            score = 0.200;
                        }
                        else {
                            score = 0.000;
                        }
                        return [2 /*return*/, parseFloat(score.toFixed(3))];
                }
            });
        });
    };
    /**
     * Fetches the open issue count of the repository
     *
     * @returns the open issue count
     */
    maintainer.prototype.getOpenIssueRatioCount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, closedUrl, response, openIssues, closedResponse, closedIssues, ratio, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(GITHUB_API, "/repos/").concat(this.owner, "/").concat(this.repoName);
                        closedUrl = "".concat(GITHUB_API, "/repos/").concat(this.owner, "/").concat(this.repoName, "/issues");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, axios_1.default.get(url, {
                                headers: {
                                    Authorization: "token ".concat(process.env.GITHUB_TOKEN)
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        openIssues = response.data.open_issues_count;
                        return [4 /*yield*/, axios_1.default.get(closedUrl, {
                                headers: {
                                    Authorization: "token ".concat(process.env.GITHUB_TOKEN)
                                }
                            })];
                    case 3:
                        closedResponse = _a.sent();
                        closedIssues = 0;
                        if (closedResponse.data[0] != undefined) {
                            closedIssues = closedResponse.data[0].number; // this number also includes pull requests
                            //console.log('Closed Issue Count: ', closedIssues);
                        }
                        // console.log('Open Issue Count: ', openIssues);
                        // console.log('Closed Issue Count: ', closedIssues);
                        if (closedIssues + openIssues === 0) {
                            return [2 /*return*/, 0];
                        }
                        else if (closedIssues === undefined) {
                            return [2 /*return*/, openIssues];
                        }
                        ratio = openIssues / (openIssues + closedIssues);
                        return [2 /*return*/, ratio];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Error when fetching open issue ratio count: ', error_1.message);
                        throw new Error('Error when fetching open issue ratio count');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches the last commit date of the repository
     *
     * @returns the date of the last commit
     */
    maintainer.prototype.getLastCommit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, response, lastCommit, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "".concat(GITHUB_API, "/repos/").concat(this.owner, "/").concat(this.repoName, "/commits");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(url, {
                                headers: {
                                    Authorization: "token ".concat(process.env.GITHUB_TOKEN)
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        lastCommit = response.data[0];
                        // console.log('Last Commit Data: ', lastCommit.commit.author.date);
                        return [2 /*return*/, lastCommit.commit.author.date];
                    case 3:
                        error_2 = _a.sent();
                        console.error('Error when fetching last commit data: ', error_2.message);
                        throw new Error('Error when fetching last commit data');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    maintainer.prototype.correctnessChecker = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        console.log('Correctness Checker:');
                        _b = (_a = console).log;
                        _c = ['Maintainer Score: '];
                        return [4 /*yield*/, this.getMaintainerScore()];
                    case 1:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    return maintainer;
}());
exports.maintainer = maintainer;
// Testing
// test repo 1 (N/A)
// const maintainerChecker = new maintainer('hasansultan92', 'watch.js'); // score is 0.4 (0 open issues)
// test repo 2 (should have high score)
// const maintainerChecker = new maintainer('mrdoob', 'three.js'); //score is 1 (ratio is 0.0175)
// test repo 3 (should have medium score)
// const maintainerChecker = new maintainer('socketio', 'socket.io'); // score is 0.8 (ratio is 0.0333)
// test repo 4 (N/A)
// const maintainerChecker = new maintainer('prathameshnetake', 'libvlc'); // score is 0 (0 open issues)
// test repo 5 (should have high score)
// const maintainerChecker = new maintainer('facebook', 'react'); // score is 0.8 (ratio is 0.0255)
// test repo 6 (N/A)
// const maintainerChecker = new maintainer('ryanve', 'unlicensed'); // score is 0 (0 open issues)
// uncomment this to run test
// maintainerChecker.correctnessChecker();
