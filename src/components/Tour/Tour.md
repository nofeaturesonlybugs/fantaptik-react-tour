This `Tour` doesn't have any children of its own; it is displayed inline with each step displaying its content as you move through the `Tour`.  

Step `content` can be JSX or JavaScript strings; steps can have a `title`.
```jsx
const steps = [
    {
        title : "Introduction",
        content : (
            <>
                <p>Hello!</p>
                <p>Two lines...</p>
            </>
        ),
    },
    { content : "A middle step without title.", },
    {
        title : "The Final Step",
        content : "Bye!",
    },
];
const [overlay, setOverlay] = React.useState( false );
<>
    <Checkbox label="With Overlay" checked={overlay} onClick={() => setOverlay( ! overlay )} />
    <Tour title="An Inline Tour" steps={steps} overlay={overlay} />
</>
```

Set `buttonProps` to spread properties onto the start button.  

Set `controlsProps` to spread properties onto the `Controls` component.
```jsx
const steps = [
    {
        title : "Icon-Only Buttons",
        content : "This tour has icon-only buttons.",
    },
    { content : "A middle step without title.", },
    { content : "Bye!", },
];
const buttonProps = Controls.ButtonsIconsOnly;
const controlsProps = { buttonProps : Controls.ButtonsIconsOnly };
<>
    <Tour title="An Inline Tour" steps={steps} controlsProps={controlsProps} buttonProps={buttonProps} />
</>
```

If a `Tour` has any children they are mounted when the `Tour` begins; each step can `target` elements of the content that was mounted.  

If the `overlay` property is true the screen is covered with an overlay and the `Tour` children are highlighted.
```jsx
const steps = [
    {
        target : ".yellow.t-children",
        content : (
            <>
                <p>Hello!</p>
                <p>This is a yellow square.</p>
            </>
        ),
    },
    {
        target : ".red.t-children",
        content : (
            <p>Red is nice too!</p>
        ),
    },
    {
        target : ".blue.t-children",
        content : (
            <p>Blue says, "Bye!"</p>
        ),
    },
];
const styles = {
    display : "inline-block",
    width : "200px",
    height : "200px",
};
const [overlay, setOverlay] = React.useState( false );
<>
    <Checkbox label="With Overlay" checked={overlay} onClick={() => setOverlay( ! overlay )} />
    <Tour title="A Tour With Children" steps={steps} overlay={overlay}>
        <div style={ { display : "inline-block" } }>
            <div className="yellow t-children" style={styles} />
            <div className="red t-children" style={styles} />
            <div className="blue t-children" style={styles} />
        </div>
    </Tour>
</>
```

`Tour`s have lifecycle event handlers.
```jsx
const [started, setStarted] = React.useState( false );
const [finished, setFinished] = React.useState( false );
const [closed, setClosed] = React.useState( false );
const steps = [
    { content : "Step 1", },
    { content : "Step 2", },
    { content : "Step 3", },
];
<Grid>
    <Grid.Item size={[4]}>
        <pre>started     = {started ? "yes" : "no"}</pre>
        <pre>finished    = {finished ? "yes" : "no"}</pre>
        <pre>closed      = {closed ? "yes" : "no"}</pre>
    </Grid.Item>
    <Grid.Item size={[8]}>
        <Tour title="A Lifecycle Tour" steps={steps}
                onStart={() => {
                    setStarted( true );
                    setFinished( false );
                    setClosed( false );
                }}
                onFinish={() => {
                    setFinished( true );
                }}
                onClose={() => {
                    setClosed( true );
                }}
                />
    </Grid.Item>
</Grid>
```

If a `Tour` is required then it must be finished.
```jsx
const [started, setStarted] = React.useState( false );
const [finished, setFinished] = React.useState( false );
const [closed, setClosed] = React.useState( false );
const steps = [
    { content : "Step 1", },
    { content : "Step 2", },
    { content : "Step 3", },
];
<Grid>
    <Grid.Item size={[4]}>
        <pre>started     = {started ? "yes" : "no"}</pre>
        <pre>finished    = {finished ? "yes" : "no"}</pre>
        <pre>closed      = {closed ? "yes" : "no"}</pre>
    </Grid.Item>
    <Grid.Item size={[8]}>
        <Tour title="A Required Tour" steps={steps} required
                onStart={() => {
                    setStarted( true );
                    setFinished( false );
                    setClosed( false );
                }}
                onFinish={() => {
                    setFinished( true );
                }}
                onClose={() => {
                    setClosed( true );
                }}
                />
    </Grid.Item>
</Grid>
```

This `Tour` moves its child content outside the normal document flow.
```jsx
const steps = [
    {
        target : ".yellow.t-position",
        content : "Yellow...",
    },
    {
        target : ".red.t-position",
        content : "Red...",
    },
    {
        target : ".purple.t-position",
        content : "Purple...",
    },
    {
        target : ".blue.t-position",
        content : "Blue ends the tour.",
    },
];const styles = {
    display : "inline-block",
    width : "100px",
    height : "100px",
};
<Tour title="A Sample Tour" steps={steps} overlay>
    <div className="t2-target z-depth-3" style={ { position : "fixed", left : "50%", right : "50%", top : "50px", minWidth : "260px", zIndex : "10006", } }>
        This tour mounts under this element:
    </div>
    <Position target=".t2-target" put="top" at="bottom">
        <div style={ { width : "200px", height : "200px", } }>
            <div className="yellow t-position" style={styles} />
            <div className="red t-position" style={styles} />
            <div className="purple t-position" style={styles} />
            <div className="blue t-position" style={styles} />
        </div>
    </Position>
</Tour>
```

`Tour` steps can use `controlsProps` to pass `props` along to the `Controls` component.
```jsx
const steps = [
    { 
        content : "Step 1",
    },
    { 
        title : "You're STUCK!!!",
        content : (
            <>
                <p>This tour has three steps...</p>
                <p>You can't click next -- you'll have to close the tour instead.</p>
            </>
        ),
        controlsProps : {
            disableNext : true,
        },
    },
    { 
        content : "Step 3",
    },
];
<Tour title="A Bad Tour" steps={steps} />
```

`Tour` steps can use `Tour.Context.Consumer` to interact with the tour.  

This `Tour` disables the next button until an action is performed.
```jsx
const steps = [
    { 
        content : "Step 1",
    },
    { 
        title : "You're STUCK!!!",
        content : (
            <>
                <Tour.Context.Consumer>
                    {( { setStepControlsProps : set, stepControlsProps : props } ) => {
                        const handler = () => {
                            const { disableNext, ...rest } = props;
                            set( { 
                                ...rest, 
                                disableNext : ! disableNext,
                                title : ! disableNext ? "Stuck again..." : "Not anymore!",
                            } );
                        };
                        return (
                            <>
                                <pre>{JSON.stringify( props )}</pre>
                                <p>Change the Controls props by clicking the checkbox.</p>
                                <Checkbox 
                                    label="Stuck" checked={props.disableNext}
                                    onClick={handler}
                                    />
                            </>
                        );
                    }}
                </Tour.Context.Consumer>
            </>
        ),
        controlsProps : {
            disableNext : true,
        },
    },
    { 
        content : "Step 3",
    },
];
<Tour title="An Bad Tour" steps={steps} />
```
