# Avatarize!

Project aiming at providing a ready to use avatar API for any project.

Based on content and ideas from Rishabh Mishra, https://codepen.io/RishabhMishra on the "Avatar Maker" project.
https://codepen.io/RishabhMishra/pen/LvoQwP

## Changes

- editable SVG hiearchy
    - just set the *class* attribute on the root group in your SVG editor
    - when done, regenerate the files to be used in project
- more assets
- API integration
- supports multiple instances (more than one avatar on a page)
- dropped JQuery dependency

## Test it

Look at the original: https://codepen.io/pnmo/pen/mdyZXxE

<a href="https://fdev31.github.io/avatarize/site/">Or the demo site</a>

# Usage

Copy the files in `site/avatar*` to your project and start using the API !


## Reuse

Check the demo code <a href="./site/">on the demo page</a>

## Customize

- Edit or add svgs in the source folder
- run "build" from its own folder
- Enjoy the updates files in the site folder !

# API

`asObject()`
    return an object describing the current avatar

`asArray()`
    return an array showing each INDEX value

`asString()`
    return a string listing each value

`fromName(name)`
    generates an avatar from a string

`debug()`
    dump all values in the console

`random()`
    randomize all values and update the avatar

`update()`
    update the avatar display

`asCode()`
    get a code identifying this avatar setup

`fromCode(code)`
    set the avatar according to some previously fetched avatar setup from `asCode()`
    
    
