"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = void 0;
var react_1 = __importDefault(require("react"));
var Icon = function (_a) {
    var icon = _a.icon;
    return (<svg width="100%" height="100%">
        <use xlinkHref={"#" + icon}/>
    </svg>);
};
exports.Icon = Icon;
