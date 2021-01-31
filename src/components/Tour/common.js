import React from 'react';
import PropTypes from 'prop-types';

export const initContext = {
    // This is a hidden context member so that buttons or other elements can detect they are in a <Tour />
    __tour : null,

    // `isRun` indicates the tour is running.
    isRun : false,
    // `isFinalStep` indicates the current step is the final step.
    isFinalStep : false,
    // `isRequired` is true if the tour must be completed in its entirety.
    isRequired : false,

    // The tour steps.
    steps : [],
    // The current step index.
    index : -1,
    // The current step.
    step : null,
    // If `setStepControlsProps` was called or the step initially had `controlsProps` set then this
    // object will be populated; allows tour steps to interact with the `Controls` component.
    stepControlsProps : {},

    // `close` invokes the close handler and ends the tour.
    close : () => null,
    // `finish` invokes the finish handler and ends the tour.
    finish : () => null,
    // `back` invokes the back handler and sets the tour back a step.
    back : () => null,
    // `next` invokes the next handler and sets the tour forward a step.
    next : () => null,
    // `start` invokes the start handler and sets the tour to playing.
    start : () => null,

    // `setStepControlsProps` sets props to pass to the `Controls` component for this step.
    setStepControlsProps : ( props ) => null,
}

export const contextShape = {
    // `isRun` indicates the tour is running.
    isRun : PropTypes.bool.isRequired,
    // `isFinalStep` indicates the current step is the final step.
    isFinalStep : PropTypes.bool.isRequired,
    // `isRequired` is true if the tour must be completed in its entirety.
    isRequired : PropTypes.bool.isRequired,
    
    // The tour steps.
    steps : PropTypes.array.isRequired,
    // The current step index.
    index : PropTypes.number.isRequired,
    // The current step.
    step : PropTypes.object.isRequired,
    // If `setStepControlsProps` was called or the step initially had `controlsProps` set then this
    // object will be populated; allows tour steps to interact with the `Controls` component.
    stepControlsProps : PropTypes.object.isRequired,

    // `close` invokes the close handler and ends the tour.
    close : PropTypes.func.isRequired,
    // `finish` invokes the finish handler and ends the tour.
    finish : PropTypes.func.isRequired,
    // `back` invokes the back handler and sets the tour back a step.
    back : PropTypes.func.isRequired,
    // `next` invokes the next handler and sets the tour forward a step.
    next : PropTypes.func.isRequired,
    // `start` invokes the start handler and sets the tour to playing.
    start : PropTypes.func.isRequired,

    // `setStepControlsProps` sets props to pass to the `Controls` component for this step.
    setStepControlsProps : PropTypes.func.isRequired,
}

export const TourContext = React.createContext( { ...initContext } );
