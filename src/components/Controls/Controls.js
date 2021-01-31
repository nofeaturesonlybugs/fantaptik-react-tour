import React from 'react';
import PropTypes from 'prop-types';

import { usePopper } from 'react-popper';

import { merge } from '@fantaptik/react-material';

import Buttons from '../Buttons/Buttons';

import '../../css/styles.css';

const Controls = ( { buttonProps = {}, children, className, disableClose, disableBack, disableNext, disableFinish, placement, small, target, title, ...props } ) => {
    const [container, setContainer] = React.useState( null );
    const [arrow, setArrow] = React.useState( null );
    const [targetNode, setTargetNode] = React.useState( null );
    //
    React.useEffect( () => {
        let mounted = true;
        let checkCount = 0;
        let timeout = 200;
        setTargetNode( null );
        //
        if( target ) {
            const check = () => {
                const node = document.querySelector( target );
                checkCount++;
                if( node ) {
                    setTargetNode( node );
                } else if( mounted ) {
                    if( checkCount > 30 ) {
                        timeout = 2000;
                    } else if( checkCount > 20 ) {
                        timeout = 1000;
                    } else if( checkCount > 10 ) {
                        timeout = 500;
                    }
                    if( checkCount > 20 ) {
                        console.warn( "Controls is checking for `target` an excessive number of times." );
                    }
                    setTimeout( check, timeout );
                }
            };
            setTimeout( check, timeout );
            return () => {
               mounted = false;
           }
        }
    }, [target] )
    let { styles, attributes } = usePopper( targetNode, container, {
        placement : placement || "bottom",
        modifiers: [ 
            { name : "hide" },
            { name : "offset", options : { offset : [ 18, 18 ], } },
            { name : "arrow", options : { padding : 12, element : arrow } },
            { name : "flip" },
        ],
    } );
    if( ! targetNode ) {
        styles = { popper : {}, arrow : {} };
        attributes = { popper : {} };
    }
    //
    className = merge`${className} tour-controls`;
    if( small === true ) {
        className = merge`${className} small`;
    }
    //
    return target === undefined || targetNode !== null ? (
            <div ref={setContainer} className={className} style={styles.popper} {...attributes.popper}>
                {targetNode && <div ref={setArrow} className="arrow" style={styles.arrow} data-popper-arrow />}
                <div className="header">
                    { title && <h5 className="left">{title}</h5>}
                    <div className="buttons right">
                        <Buttons small={small} {...buttonProps}>
                            <Buttons.Close disabled={disableClose} />
                        </Buttons>
                    </div>
                </div>
                <div className="step-content clear">
                    {children}
                </div>
                <div className="footer">
                    <div className="buttons right">
                        <Buttons small={small} {...buttonProps}>
                            <Buttons.Back disabled={disableBack} />
                            <Buttons.Next disabled={disableNext} />
                            <Buttons.Finish disabled={disableFinish} />
                        </Buttons>
                    </div>
                    <div className="clear" />
                </div>
            </div>
    ) : null;
}

Controls.ButtonsIconsPlusText = {};
Controls.ButtonsIconsOnly = { label : "" };
Controls.ButtonsTextOnly = { icon : null };

Controls.propTypes = {
    /** If present this object is spread onto each button as properties. */
    buttonProps : PropTypes.object,
    
    disableClose : PropTypes.bool,
    disableBack : PropTypes.bool,
    disableNext : PropTypes.bool,
    disableFinish : PropTypes.bool,

    /** A placement string. */
    placement : PropTypes.oneOf( [
        "top", "top-start", "top-start", 
        "bottom", "bottom-start", "bottom-end", 
        "left", "left-start", "left-end", 
        "right", "right-start", "right-end", 
    ] ),

    /** 
     * If `true` then the controls container receives a "small" CSS class and a `small` property
     * is passed to all buttons.
     */
    small : PropTypes.bool,

    /** A target DOM node to attach to. */
    target : PropTypes.string, 

    /** The step title, if any. */
    title : PropTypes.string,
}

export default Controls;