"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TieredMenu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _TieredMenuSub = require("./TieredMenuSub");

var _reactTransitionGroup = require("react-transition-group");

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _ConnectedOverlayScrollHandler = _interopRequireDefault(require("../utils/ConnectedOverlayScrollHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TieredMenu = /*#__PURE__*/function (_Component) {
  _inherits(TieredMenu, _Component);

  var _super = _createSuper(TieredMenu);

  function TieredMenu(props) {
    var _this;

    _classCallCheck(this, TieredMenu);

    _this = _super.call(this, props);
    _this.state = {
      visible: !props.popup
    };
    _this.onEnter = _this.onEnter.bind(_assertThisInitialized(_this));
    _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
    _this.onExit = _this.onExit.bind(_assertThisInitialized(_this));
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    return _this;
  }

  _createClass(TieredMenu, [{
    key: "toggle",
    value: function toggle(event) {
      if (this.props.popup) {
        if (this.state.visible) this.hide(event);else this.show(event);
      }
    }
  }, {
    key: "show",
    value: function show(event) {
      var _this2 = this;

      this.target = event.currentTarget;
      var currentEvent = event;
      this.setState({
        visible: true
      }, function () {
        if (_this2.props.onShow) {
          _this2.props.onShow(currentEvent);
        }
      });
    }
  }, {
    key: "hide",
    value: function hide(event) {
      var _this3 = this;

      var currentEvent = event;
      this.setState({
        visible: false
      }, function () {
        if (_this3.props.onHide) {
          _this3.props.onHide(currentEvent);
        }
      });
    }
  }, {
    key: "onEnter",
    value: function onEnter() {
      if (this.props.autoZIndex) {
        this.container.style.zIndex = String(this.props.baseZIndex + _DomHandler.default.generateZIndex());
      }

      _DomHandler.default.absolutePosition(this.container, this.target);
    }
  }, {
    key: "onEntered",
    value: function onEntered() {
      this.bindDocumentListeners();
      this.bindScrollListener();
    }
  }, {
    key: "onExit",
    value: function onExit() {
      this.target = null;
      this.unbindDocumentListeners();
      this.unbindScrollListener();
    }
  }, {
    key: "bindDocumentListeners",
    value: function bindDocumentListeners() {
      this.bindDocumentClickListener();
      this.bindDocumentResizeListener();
    }
  }, {
    key: "unbindDocumentListeners",
    value: function unbindDocumentListeners() {
      this.unbindDocumentClickListener();
      this.unbindDocumentResizeListener();
    }
  }, {
    key: "bindDocumentClickListener",
    value: function bindDocumentClickListener() {
      var _this4 = this;

      if (!this.documentClickListener) {
        this.documentClickListener = function (event) {
          if (_this4.props.popup && _this4.state.visible && !_this4.container.contains(event.target)) {
            _this4.hide(event);
          }
        };

        document.addEventListener('click', this.documentClickListener);
      }
    }
  }, {
    key: "unbindDocumentClickListener",
    value: function unbindDocumentClickListener() {
      if (this.documentClickListener) {
        document.removeEventListener('click', this.documentClickListener);
        this.documentClickListener = null;
      }
    }
  }, {
    key: "bindDocumentResizeListener",
    value: function bindDocumentResizeListener() {
      var _this5 = this;

      if (!this.documentResizeListener) {
        this.documentResizeListener = function (event) {
          if (_this5.state.visible) {
            _this5.hide(event);
          }
        };

        window.addEventListener('resize', this.documentResizeListener);
      }
    }
  }, {
    key: "unbindDocumentResizeListener",
    value: function unbindDocumentResizeListener() {
      if (this.documentResizeListener) {
        window.removeEventListener('resize', this.documentResizeListener);
        this.documentResizeListener = null;
      }
    }
  }, {
    key: "bindScrollListener",
    value: function bindScrollListener() {
      var _this6 = this;

      if (!this.scrollHandler) {
        this.scrollHandler = new _ConnectedOverlayScrollHandler.default(this.target, function (event) {
          if (_this6.state.visible) {
            _this6.hide(event);
          }
        });
      }

      this.scrollHandler.bindScrollListener();
    }
  }, {
    key: "unbindScrollListener",
    value: function unbindScrollListener() {
      if (this.scrollHandler) {
        this.scrollHandler.unbindScrollListener();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindDocumentListeners();

      if (this.scrollHandler) {
        this.scrollHandler.destroy();
        this.scrollHandler = null;
      }
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var _this7 = this;

      var className = (0, _classnames.default)('p-tieredmenu p-component', {
        'p-tieredmenu-overlay': this.props.popup
      }, this.props.className);
      return /*#__PURE__*/_react.default.createElement(_reactTransitionGroup.CSSTransition, {
        classNames: "p-connected-overlay",
        in: this.state.visible,
        timeout: {
          enter: 120,
          exit: 100
        },
        unmountOnExit: true,
        onEnter: this.onEnter,
        onEntered: this.onEntered,
        onExit: this.onExit
      }, /*#__PURE__*/_react.default.createElement("div", {
        ref: function ref(el) {
          return _this7.container = el;
        },
        id: this.id,
        className: className,
        style: this.props.style
      }, /*#__PURE__*/_react.default.createElement(_TieredMenuSub.TieredMenuSub, {
        model: this.props.model,
        root: true,
        popup: this.props.popup
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var element = this.renderElement();
      if (this.props.appendTo) return /*#__PURE__*/_reactDom.default.createPortal(element, this.props.appendTo);else return element;
    }
  }]);

  return TieredMenu;
}(_react.Component);

exports.TieredMenu = TieredMenu;

_defineProperty(TieredMenu, "defaultProps", {
  id: null,
  model: null,
  popup: false,
  style: null,
  className: null,
  autoZIndex: true,
  baseZIndex: 0,
  appendTo: null,
  onShow: null,
  onHide: null
});

_defineProperty(TieredMenu, "propTypes", {
  id: _propTypes.default.string,
  model: _propTypes.default.array,
  popup: _propTypes.default.bool,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  autoZIndex: _propTypes.default.bool,
  baseZIndex: _propTypes.default.number,
  appendTo: _propTypes.default.any,
  onShow: _propTypes.default.func,
  onHide: _propTypes.default.func
});