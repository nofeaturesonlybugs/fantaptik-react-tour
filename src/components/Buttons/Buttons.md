`Buttons` is a namespace for `Tour`-aware buttons.  All properties on `Buttons` are passed to each child Component.

```jsx
<Buttons round>
    <Buttons.Back />
    <Buttons.Next />
    <Buttons.Close round={false} />
</Buttons>
```

A list of individual buttons.
```jsx
<div>
    <Buttons.Back /> Buttons.Back
</div>
<div>
    <Buttons.Next /> Buttons.Next
</div>
<div>
    <Buttons.Close /> Buttons.Close
</div>
<div>
    <Buttons.Finish /> Buttons.Finish
</div>

<div>
    <Buttons.Stop /> Buttons.Stop
</div>
<div>
    <Buttons.Start /> Buttons.Start
</div>
```

Square buttons without labels.
```jsx
<Buttons label="">
    <Buttons.Start />
    <Buttons.Stop />

    <Buttons.Back />
    <Buttons.Next />
    <Buttons.Finish />
    <Buttons.Close />
</Buttons>
```