"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = require("react-dom");
var react_router_dom_1 = require("react-router-dom");
var history_1 = require("shared/history");
var icon_definitions_svg_1 = __importDefault(require("!!raw-loader!./shared/components/icons/icon-definitions.svg"));
var root_1 = require("./root/root");
require("./styles/styles.styl");
var App = function () {
    return (<>
            <span style={{ display: 'block', height: 0 }} dangerouslySetInnerHTML={{ __html: icon_definitions_svg_1.default }}/>
            <react_router_dom_1.Router history={history_1.history}>
                <root_1.Root />
            </react_router_dom_1.Router>
        </>);
};
react_dom_1.render(<App />, document.getElementById('root'));
