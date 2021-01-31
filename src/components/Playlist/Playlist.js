import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon, Grid, Switch } from '@fantaptik/react-material';

import Tour from '../Tour/Tour';

const initState = {
    count : 0,
    completed : [],
    index : 0,
    run : false,
}

const reducer = ( state, action ) => {
    switch( action.type ) {
        case "START": {
            return { ...state, run : true, index : 0, completed : [], };
        }

        case "STOP": {
            return { ...state, run : false };
        }

        case "NEXT": {
            // console.log("Playlist.reducer",state);//TODO RM 
            let { count, index, completed,run  } = state;
            completed[ index ] = true;
            index++;
            if( index > count - 1 ) {
                index = 0;
                run = false;
            }
            // console.log("Playlist.reducer",index,run);//TODO RM
            return { ...state, index, run };
        }

        default: {
            return state;
        }
    }
}

const Playlist = ( { auto, children, disabled, display = "", onStart, onFinish, required, title, tourProps = {}, ...props } ) => {
    children = React.Children.toArray( children ).filter( child => child.type === Tour );
    //
    const [state, dispatch] = React.useReducer( reducer, { ...initState, count : children.length } );
    //
    const clonedChildren = [];
    children.map( ( child, k ) => {
        const running = state.run === true && state.index === k 
        //
        let icon = "";
        if( running ) {
            icon = "panorama_fish_eye";
        } else if( state.run ) {
            icon = state.completed[k] ? "done" : "lens";
        }
        icon = icon !== "" ? <Icon small>{icon}</Icon> : " ";
        const cloned = React.cloneElement( child, { 
            ...child.props, 
            ...tourProps, 
            disabled : true, 
            required, 
            onStart : () => {
                if( k === 0 ) {
                    onStart && onStart();
                }
                child.props.onStart && child.props.onStart();
                tourProps.onStart && tourProps.onStart();
            },
            onFinish : () => {
                child.props.onFinish && child.props.onFinish();
                tourProps.onFinish && tourProps.onFinish();
                dispatch( { type : "NEXT" } );
                if( k === children.length - 1 ) {
                    onFinish && onFinish();
                }
            },
            auto : state.run === true && state.index === k,
            display : display === "list" ? "bar" : "",
            key : k,
        } );
        clonedChildren.push( (
            <Grid.Item size={[1]} key={"spacer-"+k} className="right-align">
                {icon}
            </Grid.Item> 
        ) );
        clonedChildren.push( (
            <Grid.Item size={[11]} key={"tour-"+k}>
                {cloned}
            </Grid.Item>
        ) );
    } );
    React.useEffect( () => {
        if( auto === true ) {
            dispatch( { type : "START" } );
        }
    
    } );
    const handlers = {
        start : () => {
            dispatch( { type : "START" } );
        },
        stop : () => {
            dispatch( { type : "STOP" } );
        },
    };
    return (
        <>
            <Switch value={display}>
                <Switch.Case value="list">
                    <Grid>
                        <Grid.Item size={[1]}>
                            <Button show={state.run} disabled={disabled} round small onClick={handlers.stop}>
                                <Icon>stop</Icon>
                            </Button>
                            <Button show={! state.run} disabled={disabled}  round small onClick={handlers.start}>
                                <Icon>play_circle</Icon>
                            </Button>
                        </Grid.Item>
                        <Grid.Item size={[11]}>
                            {title}
                        </Grid.Item>
                    </Grid>
                </Switch.Case>

                <Switch.Case value="trigger">
                    <Button show={state.run} disabled={disabled}  round onClick={handlers.stop}>
                        <Icon>stop</Icon>
                    </Button>
                    <Button show={! state.run} disabled={disabled}  round onClick={handlers.start}>
                        <Icon>play_circle</Icon>
                    </Button>
                </Switch.Case>
            </Switch>
            <Grid>
                {clonedChildren}
            </Grid>
        </>
    );
}

Playlist.propTypes = {
    /** If `true` the playlist starts automatically. */
    auto : PropTypes.bool,

    /** If `true` then buttons to start/stop the playlist are disabled. */
    disabled : PropTypes.bool,

    /** Display controls how the playlist component is rendered in the UI. */
    display : PropTypes.oneOf( [
        "list", "trigger",
    ] ),

    /** An event handler for when the playlist is started. */
    onStart : PropTypes.func,

    /** An event handler for when the playlist is finished. */
    onFinish : PropTypes.func,

    /** 
     * If `true` then the playlist must be finished; if `true` then each child `Tour` is also
     * `required` regardless of `tourProps`.
     */
    required : PropTypes.bool,

    /** A playlist title. */
    title : PropTypes.string,

    /** 
     * An object of tourProps that will be spread to each Tour child.  Note that children are automatically
     * `disabled` and a `required` Playlist sets all children to `required`.
     */
    tourProps : PropTypes.object,
}

export default Playlist;