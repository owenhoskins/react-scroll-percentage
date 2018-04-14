'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactIntersectionObserver = require('react-intersection-observer');

var _reactIntersectionObserver2 = _interopRequireDefault(_reactIntersectionObserver);

var _scroll = require('./scroll');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // eslint-disable-line no-unused-vars


/**
 * Monitors scroll, and triggers the children function with updated props
 *
 <ScrollPercentage>
 {({inView, percentage}) => (
   <h1>{`${inView} {percentage}`}</h1>
 )}
 </ScrollPercentage>
 */
var ScrollPercentage = function (_React$PureComponent) {
  _inherits(ScrollPercentage, _React$PureComponent);

  function ScrollPercentage() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ScrollPercentage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ScrollPercentage.__proto__ || Object.getPrototypeOf(ScrollPercentage)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      percentage: 0,
      inView: false
    }, _this.node = null, _this.handleInView = function (inView) {
      _this.setState({ inView: inView });
    }, _this.handleNode = function (observer) {
      return _this.node = observer && observer.node;
    }, _this.handleScroll = function () {
      if (!_this.node) return;
      var threshold = _this.props.threshold;

      var bounds = _this.node.getBoundingClientRect();

      var percentage = void 0;
      if (_this.props.horizontal) {
        percentage = ScrollPercentage.calculatePercentageOfWidth(bounds, threshold);
      } else {
        percentage = ScrollPercentage.calculatePercentage(bounds, threshold);
      }

      if (percentage !== _this.state.percentage) {
        _this.setState({
          percentage: percentage
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ScrollPercentage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Start by updating the scroll position, so it correctly reflects the elements start position
      this.handleScroll();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      if (!nextProps.onChange) return;
      if (nextState.percentage !== this.state.percentage || nextState.inView !== this.state.inView) {
        nextProps.onChange(nextState.percentage, nextState.inView);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.inView !== this.state.inView) {
        this.monitorScroll(this.state.inView);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.monitorScroll(false);
    }
  }, {
    key: 'monitorScroll',
    value: function monitorScroll(enable) {
      if (enable) {
        (0, _scroll.watch)(this.handleScroll);
      } else {
        (0, _scroll.unwatch)(this.handleScroll);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          threshold = _props.threshold,
          onChange = _props.onChange,
          props = _objectWithoutProperties(_props, ['children', 'threshold', 'onChange']);

      return React.createElement(
        _reactIntersectionObserver2.default,
        _extends({ ref: this.handleNode }, props, { onChange: this.handleInView }),
        children && typeof children === 'function' ? children(this.state.percentage, this.state.inView) : children
      );
    }
  }], [{
    key: 'viewportHeight',


    /**
     * Get the correct viewport height. If rendered inside an iframe, grab it from the parent
     */
    value: function viewportHeight() {
      return global.parent ? global.parent.innerHeight : global.innerHeight || 0;
    }
  }, {
    key: 'viewportWidth',
    value: function viewportWidth() {
      return global.parent ? global.parent.innerWidth : global.innerWidth || 0;
    }
  }, {
    key: 'calculatePercentage',
    value: function calculatePercentage(bounds) {
      var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var vh = ScrollPercentage.viewportHeight();
      var offsetTop = threshold * vh * 0.25;
      var offsetBottom = threshold * vh * 0.25;

      return 1 - Math.max(0, Math.min(1, (bounds.bottom - offsetTop) / (vh + bounds.height - offsetBottom - offsetTop)));
    }
  }, {
    key: 'calculatePercentageOfWidth',
    value: function calculatePercentageOfWidth(bounds) {
      var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var vw = ScrollPercentage.viewportWidth();
      var offsetLeft = threshold * vw * 0.25;
      var offsetRight = threshold * vw * 0.25;

      return 1 - Math.max(0, Math.min(1, (bounds.right - offsetLeft) / (vw + bounds.width - offsetRight - offsetLeft)));
    }
  }]);

  return ScrollPercentage;
}(React.PureComponent);

ScrollPercentage.defaultProps = {
  tag: 'div',
  threshold: 0 };
exports.default = ScrollPercentage;