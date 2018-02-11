import React  from 'react';
import ReactModal from "react-modal";
import TimePickerControl from './TimePickerControl';
import moment from 'moment';
import assign from 'object-assign';

const TYPES = React.PropTypes;
const TimePicker = React.createClass({
	propTypes: {
		onFocus: TYPES.func,
		onBlur: TYPES.func,
		onChange: TYPES.func,
		locale: TYPES.string,
		utc: TYPES.bool,
		input: TYPES.bool,
		inputProps: TYPES.object,
		timeConstraints: TYPES.object,
		viewMode: TYPES.oneOf(['years', 'months', 'days', 'time']),
		isValidDate: TYPES.func,
		open: TYPES.bool,
		strictParsing: TYPES.bool,
		closeOnSelect: TYPES.bool,
		closeOnTab: TYPES.bool,
		dateFormat: TYPES.bool,
		className: TYPES.string,
		id: TYPES.string,
		value: TYPES.object
	},

	mixins: [
		require('./onClickOutside')
	],
	
	getDefaultProps: function() {
		const nof = function(){};
		return {
			id: '',
			className: '',
			defaultValue: '',
			inputProps: {},
			input: true,
			onFocus: nof,
			onBlur: nof,
			onChange: nof,
			timeFormat: true,
			timeConstraints: {},
			dateFormat: true,
			strictParsing: true,
			closeOnSelect: false,
			closeOnTab: true,
			utc: false,
		};
	},

	getInitialState: function() {
		const state = this.getStateFromProps( this.props );

		if ( state.open === undefined )
			state.open = !this.props.input;

		state.currentView = this.props.dateFormat ? (this.props.viewMode || state.updateOn || 'days') : 'time';

		return state;
	},

	getUpdateOn: function(formats){
		if ( formats.date.match(/[lLD]/) ){
			return 'days';
		}
		else if ( formats.date.indexOf('M') !== -1 ){
			return 'months';
		}
		else if ( formats.date.indexOf('Y') !== -1 ){
			return 'years';
		}

		return 'days';
	},

	getFormats: function( props ){
		const formats = {
				date: props.dateFormat || '',
				time: props.timeFormat || ''};
				
		const locale = this.localMoment( props.date ).localeData();

		if ( formats.date === true ){
			formats.date = locale.longDateFormat('L');
		}
		else if ( this.getUpdateOn(formats) !== 'days' ){
			formats.time = '';
		}

		if ( formats.time === true ){
			formats.time = locale.longDateFormat('LT');
		}

		formats.TimePicker = formats.date && formats.time ?
			formats.date + ' ' + formats.time :
			formats.date || formats.time
		;

		return formats;
	},

	componentWillReceiveProps: function(nextProps) {
		let formats = this.getFormats( nextProps );
		let update = {};

		if ( nextProps.value !== this.props.value ||
            formats.TimePicker !== this.getFormats( this.props ).TimePicker ) {
            update = this.getStateFromProps( nextProps );
		}

		if ( update.open === undefined ) {
			if ( this.props.closeOnSelect && this.state.currentView !== 'time' ) {
				update.open = false;
			}
			else {
				update.open = this.state.open;
			}
		}
        
		if ( nextProps.viewMode !== this.props.viewMode ) {
			update.currentView = nextProps.viewMode;
		}

		this.setState( update );
	},

	getStateFromProps: function( props ){
		const formats = this.getFormats( props );
		const date = props.value || props.defaultValue;
		let selectedDate;
		let viewDate = {};
		let updateOn = {};
		let inputValue = {};

		if ( date && typeof date === 'string' )
			selectedDate = this.localMoment( date, formats.TimePicker );
		else if ( date )
			selectedDate = this.localMoment( date );

		if ( selectedDate && !selectedDate.isValid() )
			selectedDate = null;

		viewDate = selectedDate ?
			selectedDate.clone().startOf('month') :
			this.localMoment().startOf('month')
		;

		updateOn = this.getUpdateOn(formats);

		if ( selectedDate )
			inputValue = selectedDate.format(formats.TimePicker);
		else if ( date.isValid && !date.isValid() )
			inputValue = '';
		else
			inputValue = date || '';

		return {
			updateOn: updateOn,
			inputFormat: formats.TimePicker,
			viewDate: viewDate,
			selectedDate: selectedDate,
			inputValue: inputValue,
			open: props.open
		};
	},

	onInputChange: function( e ) {
		const value = e.target === null ? e : e.target.value,
			localMoment = this.localMoment( value, this.state.inputFormat ),
			update = { inputValue: value }
		;

		if ( localMoment.isValid() && !this.props.value ) {
			update.selectedDate = localMoment;
			update.viewDate = localMoment.clone().startOf('month');
		}
		else {
			update.selectedDate = null;
		}

		return this.setState( update, function() {
			return this.props.onChange( localMoment.isValid() ? localMoment : this.state.inputValue );
		});
	},

	onInputKey: function( e ){
		if ( e.which === 9 && this.props.closeOnTab ){
			this.closeCalendar();
		}
	},

	showView: function( view ){
		const me = this;
		return function(){
			me.setState({ currentView: view });
		};
	},

	setDate: function( type ){
		const me = this,
			nextViews = {
				month: 'days',
				year: 'months'
			}
		;
		return function( e ){
			me.setState({
				viewDate: me.state.viewDate.clone()[ type ]( parseInt(e.target.getAttribute('data-value'), 10) ).startOf( type ),
				currentView: nextViews[ type ]
			});
		};
	},

	addTime: function( amount, type, toSelected ){
		return this.upTimePicker( 'add', amount, type, toSelected );
	},

	subtractTime: function( amount, type, toSelected ){
		return this.upTimePicker( 'subtract', amount, type, toSelected );
	},

	upTimePicker: function( op, amount, type, toSelected ){
		const me = this;

		return function(){
			const update = {},
				date = toSelected ? 'selectedDate' : 'viewDate'
			;

			update[ date ] = me.state[ date ].clone()[ op ]( amount, type );

			me.setState( update );
		};
	},

	allowedSetTime: ['hours', 'minutes', 'seconds', 'milliseconds'],
	setTime: function( type, value ){
		let index = this.allowedSetTime.indexOf( type ) + 1;
		let date = (this.state.selectedDate || this.state.viewDate).clone();
		let nextType = {};

		// It is needed to set all the time properties
		// to not to reset the time
		date[ type ]( value );
		for (; index < this.allowedSetTime.length; index++) {
			nextType = this.allowedSetTime[index];
			date[ nextType ]( date[nextType]() );
		}

		if ( !this.props.value ){
			this.setState({
				selectedDate: date,
				inputValue: date.format( this.state.inputFormat )
			});
		}
		this.props.onChange( date );
	},

	updateSelectedDate: function( e, close ) {
		const target = e.target;
		let modifier = 0;
		let viewDate = this.state.viewDate;
		let currentDate = this.state.selectedDate || viewDate;
		let date = {};

		if (target.className.indexOf('rdtDay') !== -1){
			if (target.className.indexOf('rdtNew') !== -1)
				modifier = 1;
			else if (target.className.indexOf('rdtOld') !== -1)
				modifier = -1;

			date = viewDate.clone()
				.month( viewDate.month() + modifier )
				.date( parseInt( target.getAttribute('data-value'), 10 ) );
		} else if (target.className.indexOf('rdtMonth') !== -1){
			date = viewDate.clone()
				.month( parseInt( target.getAttribute('data-value'), 10 ) )
				.date( currentDate.date() );
		} else if (target.className.indexOf('rdtYear') !== -1){
			date = viewDate.clone()
				.month( currentDate.month() )
				.date( currentDate.date() )
				.year( parseInt( target.getAttribute('data-value'), 10 ) );
		}

		date.hours( currentDate.hours() )
			.minutes( currentDate.minutes() )
			.seconds( currentDate.seconds() )
			.milliseconds( currentDate.milliseconds() );

		if ( !this.props.value ){
			this.setState({
				selectedDate: date,
				viewDate: date.clone().startOf('month'),
				inputValue: date.format( this.state.inputFormat ),
				open: !(this.props.closeOnSelect && close )
			});
		} else {
			if (this.props.closeOnSelect && close) {
				this.closeCalendar();
			}
		}

		this.props.onChange( date );
	},

	openCalendar: function() {
		if (!this.state.open) {
			this.setState({ open: true }, function() {
				this.props.onFocus();
			});
		}
	},

	closeCalendar: function() {
		this.setState({ open: false }, function () {
			this.props.onBlur( this.state.selectedDate || this.state.inputValue );
		});
	},

	handleClickOutside: function(){
		if ( this.props.input && this.state.open && !this.props.open ){
			this.setState({ open: false }, function() {
				this.props.onBlur( this.state.selectedDate || this.state.inputValue );
			});
		}
	},

	localMoment: function( date, format ){
		const momentFn = this.props.utc ? moment.utc : moment;
		const m = momentFn( date, format, this.props.strictParsing );
		if ( this.props.locale )
			m.locale( this.props.locale );
		return m;
	},

	componentProps: {
		fromProps: ['value', 'isValidDate', 'renderDay', 'renderMonth', 'renderYear', 'timeConstraints'],
		fromState: ['viewDate', 'selectedDate', 'updateOn'],
		fromThis: ['setDate', 'setTime', 'showView', 'addTime', 'subtractTime', 'updateSelectedDate', 'localMoment']
	},

	getComponentProps: function(){
		const me = this,
			formats = this.getFormats( this.props ),
			props = {dateFormat: formats.date, timeFormat: formats.time}
		;

		this.componentProps.fromProps.forEach( function( name ){
			props[ name ] = me.props[ name ];
		});
		this.componentProps.fromState.forEach( function( name ){
			props[ name ] = me.state[ name ];
		});
		this.componentProps.fromThis.forEach( function( name ){
			props[ name ] = me[ name ];
		});

		return props;
	},

	render: function() {
		const DOM = React.DOM;
		let className = 'rdt' + (this.props.className ?
                  ( Array.isArray( this.props.className ) ?
                  ' ' + this.props.className.join( ' ' ) : ' ' + this.props.className) : '');
		let children = [];

		if ( this.props.input ){
			children = [ DOM.input( assign({
				id: this.props.id,
				key: 'i',
				type:'text',
				className: 'form-control',
				onFocus: this.openCalendar,
				onChange: this.onInputChange,
				onKeyDown: this.onInputKey,
				value: this.state.inputValue
			}, this.props.inputProps ))];
		} else {
			className += ' rdtStatic';
		}

		if ( this.state.open )
			className += ' rdtOpen';

		return DOM.div({className: className}, children.concat(
			DOM.div(
				{ key: 'dt', className: 'rdtPicker' },
				React.createElement( TimePickerControl, this.getComponentProps())
			)
		));
	}
});

// Make moment accessible through the TimePicker class
TimePicker.moment = moment;

module.exports = TimePicker;
