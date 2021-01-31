import React from 'react';

import { merge, Button, Icon } from '@fantaptik/react-material';

import conf from '../../conf/conf';

import { TourContext } from '../Tour/common';

const Buttons = ( { children, ...props } ) => {
    children = React.Children.map( children, child => {
        return React.cloneElement( child, { ...props, ...child.props } );
    } );
    return <>{children}</>;
}

/**
 * `make` makes a button component.
 * 
 * @param {object} properties
 * @returns {Component}
 */
const make = ( { icon, confIcon, label } ) => {
    return ( { icon : iconProp, label : labelProp, ...props } ) => (
        <Button {...props}>
            {iconProp !== null && <Icon>{iconProp || icon || conf.icons[confIcon]}</Icon>}
            {labelProp !== undefined || label}
        </Button>
    );
}

/**
 * `tourAware` is a high-order-component that is tour-aware; it is a Tour.Context.Consumer and
 * interacts with the closest Tour.Context.Provider.
 * 
 * @param {object} properties
 * @param {string} properties.contextHandlerKey The name of the handler to invoke in the tour context.
 * @param {Component} SourceComponent
 * @returns {Component}
 */
const tourAware = ( { contextHandlerKey }, SourceComponent ) => ( { className, onClick, disabled : disabledOrig, ...props } ) => (
    <TourContext.Consumer>
        {( { __tour, index, isFinalStep, isRequired, isRun, [contextHandlerKey] : contextHandler, ...context } ) => {
            let disabled = disabledOrig;
            let skipRender = false;
            switch( contextHandlerKey ) {
                case "close":
                    className = merge`${className} close`;
                    disabled = disabled || (__tour !== null && ! isRun);
                    skipRender = __tour !== null && isRequired;
                    break;
                case "finish":
                    className = merge`${className} finish`;
                    disabled = disabled;
                    skipRender = __tour !== null && ! isFinalStep;
                    break;
                case "back":
                    className = merge`${className} back`;
                    disabled = disabled || (__tour !== null && index <= 0);
                    break;
                case "next":
                    className = merge`${className} next`;
                    disabled = disabled;
                    skipRender = __tour !== null && isFinalStep;
                    break;
                case "start":
                    className = merge`${className} start`;
                    disabled = disabled || (__tour !== null && isRun);
                    break;
            }
            return ! skipRender ? (
                <SourceComponent {...props}
                    className={className}
                    disabled={disabled}
                    onClick={() => {
                        contextHandler && contextHandler();
                        onClick && onClick();
                    }}
                    />
            ) : null;
        }}
    </TourContext.Consumer>
);

const ButtonFactory = config => tourAware( config, make( config ) );

Buttons.Back = ButtonFactory( { contextHandlerKey : "back", confIcon : "back", label : "Back" } );
Buttons.Next = ButtonFactory( { contextHandlerKey : "next", confIcon : "next", label : "Next" } );
Buttons.Close = ButtonFactory( { contextHandlerKey : "close", confIcon : "close", label : "Close" } );
Buttons.Finish = ButtonFactory( { contextHandlerKey : "finish", confIcon : "finish", label : "Finish" } );

Buttons.Stop = ButtonFactory( { contextHandlerKey : "close", confIcon : "stop", label : "Stop" } );
Buttons.Start = ButtonFactory( { contextHandlerKey : "start", confIcon : "start", label : "Start" } );

export default Buttons;