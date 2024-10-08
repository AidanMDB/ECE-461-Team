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
exports.CLIParser = void 0;
var commander_1 = require("commander");
var url_1 = require("url");
var MetricManager_1 = require("./MetricManager");
var axios_1 = require("axios");
var dotenv = require("dotenv");
dotenv.config();
var CLIParser = /** @class */ (function () {
    function CLIParser() {
        this.program = new commander_1.Command();
        this.configureProgram();
    }
    CLIParser.prototype.configureProgram = function () {
        var _this = this;
        this.program
            .name('cli_parse')
            .description('CLI program to parse URL and output measured metrics')
            .version('0.0.1');
        this.program
            .arguments('<url>')
            .description('CLI program takes in URL of a package and outputs measured metrics')
            .action(function (urlString) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.handleAction(urlString)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    CLIParser.prototype.run = function (argv) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.program.parseAsync(argv)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CLIParser.prototype.handleAction = function (urlString) {
        return __awaiter(this, void 0, void 0, function () {
            var isTokenValid, sanitized_urlString, repoLink, parsedUrl, Metrics, metrics, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.checkGitHubToken(process.env.GITHUB_TOKEN)];
                    case 1:
                        isTokenValid = _a.sent();
                        if (!isTokenValid) {
                            console.error('Invalid GitHub token');
                            process.exit(1);
                        }
                        sanitized_urlString = this.sanitizeGitUrl(urlString);
                        return [4 /*yield*/, this.getRepoLink(sanitized_urlString)];
                    case 2:
                        repoLink = _a.sent();
                        if (!repoLink) {
                            console.error('Invalid URL:', urlString);
                            process.exit(1);
                        }
                        parsedUrl = new url_1.URL(repoLink);
                        Metrics = new MetricManager_1.MetricManager(parsedUrl.pathname);
                        return [4 /*yield*/, Metrics.getMetrics()];
                    case 3:
                        metrics = _a.sent();
                        result = {
                            URL: repoLink,
                            NetScore: metrics.netScore,
                            NetScore_Latency: metrics.netLatency,
                            RampUp: metrics.rampUpValue,
                            RampUp_Latency: metrics.rampUpLatency,
                            Correctness: metrics.correctnessValue,
                            Correctness_Latency: metrics.correctnessLatency,
                            BusFactor: metrics.busFactorValue,
                            BusFactor_Latency: metrics.busFactorLatency,
                            ResponsiveMaintainer: metrics.maintainerValue,
                            ResponsiveMaintainer_Latency: metrics.maintainerLatency,
                            License: metrics.licenseValue,
                            License_Latency: metrics.licenseLatency
                        };
                        console.log(JSON.stringify(result));
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.error('Invalid URL:', error_1.message);
                        process.exit(1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CLIParser.prototype.checkGitHubToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!token) {
                            return [2 /*return*/, false];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get('https://api.github.com/user', {
                                headers: {
                                    Authorization: "token ".concat(token)
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.status === 200];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CLIParser.prototype.sanitizeGitUrl = function (url) {
        return url.replace(/[;`<>]/g, '');
    };
    CLIParser.prototype.getRepoLink = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var npmRegex, githubRegex, match, packageName, npmApiUrl, response, repoUrl, sanitizedRepoUrl, error_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        npmRegex = /^https?:\/\/(www\.)?npmjs\.com\/package\/([^\/]+)$/;
                        githubRegex = /^https?:\/\/(www\.)?github\.com\/([^\/]+\/[^\/]+)$/;
                        if (!githubRegex.test(url)) return [3 /*break*/, 1];
                        return [2 /*return*/, url];
                    case 1:
                        if (!npmRegex.test(url)) return [3 /*break*/, 6];
                        match = url.match(npmRegex);
                        if (!match) return [3 /*break*/, 5];
                        packageName = match[2];
                        npmApiUrl = "https://registry.npmjs.org/".concat(packageName);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, axios_1.default.get(npmApiUrl, {
                                headers: {
                                    Authorization: "token ".concat(process.env.GITHUB_TOKEN)
                                }
                            })];
                    case 3:
                        response = _b.sent();
                        repoUrl = (_a = response.data.repository) === null || _a === void 0 ? void 0 : _a.url;
                        if (repoUrl) {
                            sanitizedRepoUrl = repoUrl.replace(/^git\+/, '');
                            if (sanitizedRepoUrl.endsWith('.git')) {
                                return [2 /*return*/, sanitizedRepoUrl.slice(0, -4)];
                            }
                            return [2 /*return*/, sanitizedRepoUrl];
                        }
                        else {
                            console.error('No repository found for npm package:', packageName);
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        error_3 = _b.sent();
                        console.error('Error fetching npm package information:', error_3);
                        return [3 /*break*/, 5];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        console.error('Invalid URL:', url);
                        _b.label = 7;
                    case 7: return [2 /*return*/, null];
                }
            });
        });
    };
    return CLIParser;
}());
exports.CLIParser = CLIParser;
// If this file is run directly, execute the CLI
if (require.main === module) {
    var cliParser = new CLIParser();
    cliParser.run(process.argv);
}
