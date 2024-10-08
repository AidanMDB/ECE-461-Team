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
exports.busFactor = void 0;
var axios_1 = require("axios");
var busFactor = /** @class */ (function () {
    function busFactor(repoOwner, repoName) {
        this.repoOwner = repoOwner;
        this.repoName = repoName;
    }
    busFactor.prototype.calculateBusFactor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var twoYearsAgo, url, response, contributors_1, numberOfContributors, score, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        twoYearsAgo = new Date();
                        twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
                        url = "https://api.github.com/repos/".concat(this.repoOwner, "/").concat(this.repoName, "/commits?since=").concat(twoYearsAgo.toISOString());
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
                        contributors_1 = new Set();
                        // Extract the author name from each commit
                        response.data.forEach(function (commit) {
                            contributors_1.add(commit.commit.author.name);
                        });
                        numberOfContributors = contributors_1.size;
                        score = this.calculateBusFactorScore(numberOfContributors);
                        return [2 /*return*/, parseFloat(score.toFixed(3))];
                    case 3:
                        error_1 = _a.sent();
                        console.error('BusFactor -> Error fetching commits:', error_1.message);
                        process.exit(1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    busFactor.prototype.calculateBusFactorScore = function (contributors) {
        // Calculate the bus factor score based on the number of contributors
        var score = 0;
        if (contributors >= 10) {
            score = 1;
        }
        else if (contributors >= 5) {
            score = 0.500;
        }
        else if (contributors >= 2) {
            score = 0.300;
        }
        else if (contributors >= 1) {
            score = 0.100;
        }
        else {
            score = 0.000;
        }
        return parseFloat(score.toFixed(3));
    };
    return busFactor;
}());
exports.busFactor = busFactor;
