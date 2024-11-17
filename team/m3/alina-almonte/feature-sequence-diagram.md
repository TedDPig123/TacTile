sequenceDiagram
    Main->>UI Menu: select 'Menu'
    UI Menu-->>Main: Menu appears
    UI Menu-->>Main: 'Grid' Button
    UI Menu-->>Main: 'Token' Button
    UI Menu-->>Main: 'Terrain' Button
    UI Menu-->>Main: 'Draw' Button
    UI Menu-->>Main: 'Dice' Button
    Main-)UI Menu: close 'Menu'
