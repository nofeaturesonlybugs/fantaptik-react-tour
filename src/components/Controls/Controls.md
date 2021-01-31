`Controls` is a default control board for a `Tour`.
```jsx
<Controls>
    <p>
        Controls merely renders its children in a dialog that can control a tour.
    </p>
    <p>
        When used with a tour the content of each tour step will be rendered here.
    </p>
</Controls>
```

```jsx
<>
    <div className="controls-target light-blue" style={ { float : "right", width : "200px", height : "200px" } } />
    <Controls placement="left-end" target=".controls-target">
        <p>
            Controls can attach to a target to highlight a specific element on the page.
        </p>
        <p>
            If a tour step has a target property it is passed to the controls.
        </p>
    </Controls>
</>
```

```jsx
<>
    <div className="title-target light-blue" style={ { float : "left", width : "200px", height : "200px" } } />
    <Controls placement="right" target=".title-target" title="Controls Can Have A Title">
        <p>
            If a tour step has a title property it is passed to the controls.
        </p>
    </Controls>
</>
```

```jsx
<>
    <div className="small-target light-blue" style={ { float : "right", width : "200px", height : "200px" } } />
    <Controls placement="left" target=".small-target" title="Controls Can Be Small" small>
        <p>
            Setting the small property makes controls smaller.
        </p>
    </Controls>
</>
```

```jsx
const props = {
    textOnly : Controls.ButtonsTextOnly,
    iconsOnly : Controls.ButtonsIconsOnly,
    both : Controls.ButtonsIconsPlusText,
};
const [selected, setSelected] = React.useState( "both" );
<>
    <Select className="left" value={selected} onChange={selected => setSelected( selected )}>
        <Select.Option value="both" label="Icons + Labels" />
        <Select.Option value="iconsOnly" label="Icons Only" />
        <Select.Option value="textOnly" label="Text Only" />
    </Select>
    <div className="button-props-target light-blue" style={ { float : "right", width : "200px", height : "200px" } } />
    <Controls placement="left" buttonProps={props[selected]}
        target=".button-props-target" title="Altering the Buttons">
        <p>
            Button props can be passed to all buttons to alter them all at once.
        </p>
    </Controls>
</>
```

`Controls` buttons can be disabled.
```jsx
const [close, setClose] = React.useState( false );
const [back, setBack] = React.useState( false );
const [next, setNext] = React.useState( false );
const [finish, setFinish] = React.useState( false );
<>
    <Grid>
        <Grid.Item size={[4]}>
            <Checkbox label="Disable Close" checked={close} onClick={() => setClose( ! close )} />
            <br />
            <Checkbox label="Disable Back" checked={back} onClick={() => setBack( ! back )} />
            <br />
            <Checkbox label="Disable Next" checked={next} onClick={() => setNext( ! next )} />
            <br />
            <Checkbox label="Disable Finish" checked={finish} onClick={() => setFinish( ! finish )} />
        </Grid.Item>
        <Grid.Item size={[8]}>
            <Controls disableClose={close} disableBack={back} disableNext={next} disableFinish={finish}>
                <p>
                    Check the appropriate box to disable the button.
                </p>
            </Controls>
        </Grid.Item>
    </Grid>
</>
```
