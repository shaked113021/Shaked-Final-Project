# יומן פרומפטים

## 2026-11-02

**12:06 · claude**

> hello world

**17:10 · claude**

> Inside a new "controllers" folder(under src ofcource), create a DisneyCharacterController. it should have two functions. getAllCharacters which returns the data in data/characters.json as CharacterListResponse and getCharacterById which have a parameter id(of type number), for now,  it should return the data inside data/mickey_mouse.json as SingleCharacterResponse. it is ok that id is not used for now. please dont guess anything. only do something if you're sure about it.

**17:53 · claude**

> Please create a component named CharacterListComponent it should retrieve list of characters from the controller and have a nested inner component(Which you should also create) that gets the list of characters as a prop. please use useEffect in the outer controller. Have a h1 header in the outer components with the text "Disney Character Encyclopedia". assume that if the controller returns null it means an error occured, show appropriate message when that happens, after the data is loaded, show a text above the list(in the outer component) that says "Please select a character"

**17:55 · claude**

> replace the index route component with the CharacterListComponent

**17:57 · claude**

> I added imageUrl myself to the model please show the images

## 2026-11-07

**16:06 · claude**

> can you move the h1 header to main.tsx. also please style the list such that each item is in a card where the name is on the left and the picture is on the right.

**16:07 · claude**

> make the list vertical

**16:07 · claude**

> cap it at 600px and centre it

**16:08 · claude**

> please add paging support
