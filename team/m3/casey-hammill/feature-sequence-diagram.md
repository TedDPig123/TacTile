The drawing tool allows users to draw freely over the battle grid for quick notations and marking. When you enable drawing mode by entering the menu, the drawing layer becomes active and you have a variety of input options to represent different tools, colors, and size. Then, you can just draw with your mouse. And when you leave the menu, you can go back to using the grid as normal.
```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant PaintJS

    User->>Browser: Toggles drawing mode with checkbox
    Browser->>PaintJS: Acitvates toggleDrawing() function
    PaintJS->>Browser: Makes canvas layer interactable
    User->>Browser: Selects tool with radial selectors
    Browser->>PaintJS: Indicates which tool was selected
    PaintJS->>Browser: Changes effect of inputs on canvas to match that tool
    User->>Browser: Selects width and color with number input/color picker respectively
    Browser->>PaintJS: Updates those values for use in the drawing function

    loop Drawing
        
        User->>Browser: Draws with mouse
        Browser->>PaintJS: Passes mouse coordinates
        PaintJS->>Browser: Draws with their chosen options
        Browser->>User: Displays drawing on canvas
  
    end
```
