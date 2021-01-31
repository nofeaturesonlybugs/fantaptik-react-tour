A `Playlist` plays multiple `Tour`s sequentially.
```jsx
const steps = {
    first : [
        {
            target : ".card.first",
            content : "The first card.",
            placement : "bottom",
        },
        {
            target : ".card.first .card-title",
            content : "The title.",
            placement : "bottom-start",
        },
        {
            target : ".card.first .card-content",
            content : "The content.",
            placement : "bottom-start",
        },
    ],
    second : [
        {
            target : ".card.second",
            content : "The second card.",
            placement : "top-end",
        },
        {
            target : ".card.second .card-title",
            content : "The title.",
            placement : "top-start",
        },
        {
            target : ".card.second .card-content",
            content : "The content.",
            placement : "top-end",
        },
    ],
    third : [
        {
            target : ".card.third",
            content : "The third card.",
            placement : "left",
        },
        {
            target : ".card.third .card-title",
            content : "The title.",
            placement : "left-end",
        },
        {
            target : ".card.third .card-content",
            content : "The content.",
            placement : "left-end",
        },
    ],
};
const [required, update] = React.useState( false );
const [useTourProps, setTourProps] = React.useState( false );
const tourProps = {};
if( useTourProps ) {
    tourProps.controlsProps = { 
        small : true,
        buttonProps : {
            ...Controls.ButtonsIconsOnly,
            className : "grey darken-3",
            style : { borderRadius : "6px", },
        },
    };
}
<>
    <div style={{marginBottom : "10px"}}>
        <Checkbox label="Required" checked={required} onClick={() => update( ! required ) } />
        <br />
        <Checkbox label="Set Tour Props" checked={useTourProps} onClick={() => setTourProps( ! useTourProps ) } />
    </div>
    <Playlist display="list" title="The Three Most Important Tours" required={required} tourProps={tourProps}>
        <Tour steps={steps.first} auto title="The First Tour" />
        <Tour steps={steps.second} auto title="The Second Tour" />
        <Tour steps={steps.third} auto title="The Third Tour" />
    </Playlist>
    <Grid>
        <Grid.Item size={[6]}>
            <Card className="first">
                <Card.Title>First</Card.Title>
                <p>This card is demoed first!</p>
            </Card>
        </Grid.Item>
        <Grid.Item size={[6]}>
            <Card className="third">
                <Card.Title>Third</Card.Title>
                <p>This card is demoed third!</p>
            </Card>
        </Grid.Item>
        <Grid.Item size={[12]}>
            <Card className="second">
                <Card.Title>Second</Card.Title>
                <p>This card is demoed second!</p>
            </Card>
        </Grid.Item>
    </Grid>
</>
```