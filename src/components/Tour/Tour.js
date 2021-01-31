import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { merge, Show } from '@fantaptik/react-material';

import { initContext, contextShape, TourContext } from './common';

import Buttons from '../Buttons/Buttons';
import Controls from '../Controls/Controls';

import '../../css/styles.css';

const TourContent = ( { children, className, overlay, isRun } ) => {
    className = merge`${className} primary-content`;
    if( overlay ) {
        className = merge`${className} with-overlay`;
    }
    //
    return isRun && children !== undefined ? (
        <div className={className}>
            {children}
            {overlay && <div className="tour-spotlight" />}
        </div>
    ) : null;
}

class Tour extends Component {
    static Shapes = {
        Context : {
            Exact : PropTypes.exact( contextShape ),
            Fuzzy : PropTypes.shape( contextShape ),
        },
    };
    static Context = TourContext;

    constructor( props ) {
        super( props );
        let { required : isRequired = false, steps = [] } = props;
        this.state = {
            ...initContext,
            __tour : (new Date()).toString(),
            steps : Array.isArray( steps ) ? steps : [],
            stepControlsProps : {},
            isRequired,

            close : this.close,
            finish : this.finish,
            back : this.back,
            next : this.next,
            start : this.start,

            setStepControlsProps : this.setStepControlsProps,
        };
    }

    componentDidMount() {
        if( this.props.auto === true ) {
            this.start();
        }
    }

    componentDidUpdate( prevProps ) {
        if( prevProps.steps !== this.props.steps ) {
            this.setState( { steps : this.props.steps } );
        }
        if( prevProps.required !== this.props.required ) {
            this.setState( { isRequired : this.props.required === true } );
        }
        if( prevProps.auto !== this.props.auto && this.props.auto === true ) {
            this.start();
        }
    }

    close = () => {
        let { onClose } = this.props;
        let { isRequired, isRun } = this.state;
        if( isRun && ! isRequired ) {
            const { index, step, stepControlsProps, isFinalStep } = initContext;
            isRun = false;
            this.setState( { isRun, isFinalStep, index, step, stepControlsProps }, () => {
                onClose && onClose();
            } );
        }
    }

    finish = () => {
        let { onFinish } = this.props;
        let { isFinalStep, isRun } = this.state;
        if( isRun && isFinalStep ) {
            [isFinalStep, isRun] = [false, false];
            const { index, step, stepControlsProps } = initContext;
            this.setState( { isRun, isFinalStep, index, step, stepControlsProps }, () => {
                onFinish && onFinish();
            } );
        }
    }

    start = () => {
        let { onStart } = this.props;
        let { isRun, index, step, steps } = this.state;
        if( ! isRun && steps.length > 0 ) {
            isRun = ! isRun;
            index = 0;
            step = steps[ index ];
            const { controlsProps : stepControlsProps = {} } = step;
            this.setState( { index, step, stepControlsProps, isRun, isFinalStep : index === steps.length -1 }, () => {
                onStart && onStart();
            } );
        }
    }

    back = () => {
        let { index, step, steps } = this.state;
        if( index > 0 ) {
            index--;
            step = steps[ index ];
            const { controlsProps : stepControlsProps = {} } = step;
            this.setState( { index, step, stepControlsProps, isFinalStep : index === steps.length -1 } );
        }
    }

    next = () => {
        let { index, step, steps } = this.state;
        if( index < steps.length - 1 ) {
            index++;
            step = steps[ index ];
            const { controlsProps : stepControlsProps = {} } = step;
            this.setState( { index, step, stepControlsProps, isFinalStep : index === steps.length -1 } );
        }
    }

    setStepControlsProps = ( stepControlsProps ) => {
        this.setState( { stepControlsProps } );
    }

    render() {
        let { buttonProps = {}, children, className, controlsProps = {}, disabled, overlay, title } = this.props;
        let { isRun, step = {}, stepControlsProps = {} } = this.state;
        step = step || {}; // Avoid referencing properties on null.
        //
        className = merge`${className} tour`;
        if( isRun ) {
            className = merge`${className} running`;
        }
        //
        return (
            <TourContext.Provider value={this.state}>
                <div className={className}>
                    <Buttons.Start {...buttonProps} disabled={disabled} />
                    {title}
                    {overlay && isRun && ReactDOM.createPortal( <div className="tour-overlay" />, document.querySelector( "body" ) )}
                    <TourContent isRun={isRun} overlay={overlay}>
                        {children}
                    </TourContent>
                    <Show when={isRun && step}>
                        <Controls title={step.title} target={step.target} placement={step.placement} {...controlsProps} {...stepControlsProps}>
                            {step.content}
                        </Controls>
                    </Show>
                </div>
            </TourContext.Provider>
        );
    }
}

Tour.propTypes = {
    /** If `true` the tour is started when mounted. */
    auto : PropTypes.bool,

    /** 
     * If present this object is spread onto the tour's start button; it is separate from
     * and not passed to the Controls component.  Use `controlsProps` for that.
     */
    buttonProps : PropTypes.object,

    /** If present this object is spread onto the Controls component as properties. */
    controlsProps : PropTypes.object,

    /** If `true` then the buttons to start and stop this tour are disabled. */
    disabled : PropTypes.bool,

    /** An `onClose` handler invoked when the tour's close button is clicked. */
    onClose : PropTypes.func,

    /** An `onFinish` handler invoked when the tour's finish button is clicked. */
    onFinish : PropTypes.func,

    /** An `onStart` handler invoked when the tour is started. */
    onStart : PropTypes.func,

    /** If `true` an overlay is shown on screen. */
    overlay : PropTypes.bool,

    /** If `true` the tour is required and the user must complete all steps and click the finish button. */
    required : PropTypes.bool, 

    /** The steps in the tour. */
    steps : PropTypes.array, // TODO DOCUMENT SHAPE

    /** The tour `title` if it has one. */
    title : PropTypes.string,
}

export default Tour;