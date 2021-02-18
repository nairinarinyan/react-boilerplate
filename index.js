#!/usr/bin/env node
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var child_process_1 = require("child_process");
var ora_1 = __importDefault(require("ora"));
var filesToReplaceIn = [
    'package.json',
    'Dockerfile',
    'src/index.html'
];
var filesToRename = [
    'conf/rename_this.conf',
];
var copySource = function (appName, appDir) { return __awaiter(void 0, void 0, void 0, function () {
    var sourceDir;
    return __generator(this, function (_a) {
        sourceDir = path_1.join(__dirname, 'source');
        return [2 /*return*/, fs_extra_1.copy(sourceDir, appDir, {
                filter: function (src, dest) {
                    return !~src.indexOf('source/node_modules');
                }
            })];
    });
}); };
var replaceNameInFiles = function (appName, appDir) { return __awaiter(void 0, void 0, void 0, function () {
    var replacePromises, renamePromises;
    return __generator(this, function (_a) {
        replacePromises = filesToReplaceIn.map(function (fileName) { return __awaiter(void 0, void 0, void 0, function () {
            var filePath, fileContent, replacedContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = path_1.join(appDir, fileName);
                        return [4 /*yield*/, fs_extra_1.readFile(filePath, 'utf-8')];
                    case 1:
                        fileContent = _a.sent();
                        replacedContent = fileContent.replace('rename_this', appName);
                        return [2 /*return*/, fs_extra_1.writeFile(filePath, replacedContent)];
                }
            });
        }); });
        renamePromises = filesToRename.map(function (fileName) {
            var filePath = path_1.join(appDir, fileName);
            var newPath = filePath.replace('rename_this', appName);
            return fs_extra_1.rename(filePath, newPath);
        });
        return [2 /*return*/, Promise.all(replacePromises.concat(renamePromises))];
    });
}); };
var installDeps = function (appDir) {
    process.chdir(appDir);
    return new Promise(function (resolve, reject) {
        child_process_1.exec('npm i', function (err, stdout, stderr) {
            if (err || /err/i.test(stderr)) {
                return reject(err);
            }
            resolve(stdout);
        });
    });
};
var run = function (appName) { return __awaiter(void 0, void 0, void 0, function () {
    var parentDir, appDir, dirSpinner, copySpinner, renameSpinner, depsSpinner, err_1, err_2, err_3, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!appName) {
                    console.error('Specify an app name plz');
                    process.exit(1);
                }
                parentDir = process.cwd();
                appDir = path_1.join(parentDir, appName);
                dirSpinner = ora_1.default('Creating the directory...');
                copySpinner = ora_1.default('Copying the source files...');
                renameSpinner = ora_1.default('Writing project name...');
                depsSpinner = ora_1.default('Installing dependencies...');
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                dirSpinner.start();
                return [4 /*yield*/, fs_extra_1.mkdir(appDir)];
            case 2:
                _a.sent();
                dirSpinner.text = 'Directory done';
                dirSpinner.succeed();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                dirSpinner.text = 'Unable to create a directory for your app';
                dirSpinner.fail();
                console.error(err_1);
                process.exit(1);
                return [3 /*break*/, 4];
            case 4:
                _a.trys.push([4, 6, , 7]);
                copySpinner.start();
                return [4 /*yield*/, copySource(appName, appDir)];
            case 5:
                _a.sent();
                copySpinner.text = 'Source files copied';
                copySpinner.succeed();
                return [3 /*break*/, 7];
            case 6:
                err_2 = _a.sent();
                copySpinner.text = 'Unable to copy source files';
                copySpinner.fail();
                console.error(err_2);
                process.exit(1);
                return [3 /*break*/, 7];
            case 7:
                _a.trys.push([7, 9, , 10]);
                renameSpinner.start();
                return [4 /*yield*/, replaceNameInFiles(appName, appDir)];
            case 8:
                _a.sent();
                renameSpinner.text = 'Project name set';
                renameSpinner.succeed();
                return [3 /*break*/, 10];
            case 9:
                err_3 = _a.sent();
                renameSpinner.text = 'Unable replace the name';
                renameSpinner.fail();
                console.error(err_3);
                process.exit(1);
                return [3 /*break*/, 10];
            case 10:
                _a.trys.push([10, 12, , 13]);
                depsSpinner.start();
                return [4 /*yield*/, installDeps(appDir)];
            case 11:
                _a.sent();
                depsSpinner.text = 'Dependencies installed';
                depsSpinner.succeed();
                return [3 /*break*/, 13];
            case 12:
                err_4 = _a.sent();
                depsSpinner.text = 'Unable to install the dependencies';
                depsSpinner.fail();
                console.error(err_4);
                process.exit(1);
                return [3 /*break*/, 13];
            case 13:
                console.log('All set!');
                return [2 /*return*/];
        }
    });
}); };
run(process.argv[2]);
