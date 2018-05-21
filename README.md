# anki-persistence
Persist data between both sides of an anki flashcard.

## Example: Random number

This example shows how anki-persistence can be used to display the same random number on both sides of an Anki flash card. **All of these images depict the same note!** You can try it out yourself with [this exported Anki deck](examples/random-number/anki-persistence.apkg).

### Result
| Client                 | Front | Back |
| ----------------------:|:-----:|:----:|
|                    Web | ![Random number example on the web client - Front](examples/random-number/Web-Front.jpg) | ![Random number example on the web client - Back](examples/random-number/Web-Back.jpg) |
|                Windows | ![Random number example on the Windows client - Front](examples/random-number/Windows-Front.jpg) | ![Random number example on the Windows client - Back](examples/random-number/Windows-Back.jpg) |
| Windows (card preview) | ![Random number example on the Windows client (card preview) - Front](examples/random-number/Windows_Preview-Front.jpg) | ![Random number example on the Windows client (card preview) - Back](examples/random-number/Windows_Preview-Back.jpg) |
|                Android | ![Random number example on the Android client - Front](examples/random-number/AnkiDroid-Front.jpg) | ![Random number example on the Android client - Back](examples/random-number/AnkiDroid-Back.jpg) |
| Android (card preview) | ![Random number example on the Android client (card preview) - Front](examples/random-number/AnkiDroid_Preview-Front.jpg) | ![Random number example on the Android client (card preview) - Back](examples/random-number/AnkiDroid_Preview-Back.jpg) |

TODO: Test Mac, Linux and iOS

**Note that Persistence is not available for Windows card preview (```Persistence.isAvailable()``` returns ```false```), thus a default (0.4) is chosen.**

### Setup
#### Front side
~~~html
<script>
// v0.1.0-b47 - https://github.com/SimonLammer/anki-persistence/blob/899fb859cbd7e84b8cf20e107d0d7f5f215d1fca/script.js
window.Persistence=new function(){var b=!1;try{"object"===typeof window.sessionStorage&&(b=!0,this.store=function(a){sessionStorage.setItem("github.com/SimonLammer/anki-persistence",JSON.stringify(a))},this.load=function(){return JSON.parse(sessionStorage.getItem("github.com/SimonLammer/anki-persistence"))})}catch(a){}if(!b)try{"object"===typeof window.py&&(b=!0,this.store=function(a){py["github.com/SimonLammer/anki-persistence"]=a},this.load=function(){return py["github.com/SimonLammer/anki-persistence"]||
null})}catch(a){}this.isAvailable=function(){return b}};
</script>

{{Front}}

<div id="front"></div>

<script>
var number = 0.4;
if (Persistence.isAvailable()) {
  number = Persistence.load();
  if (number == null) {
    number = Math.random();
    Persistence.store(number);
  }
}
window.front.appendChild(document.createTextNode(number));
</script>
~~~

#### Back side

~~~html
<script>
// v0.1.0-b47 - https://github.com/SimonLammer/anki-persistence/blob/899fb859cbd7e84b8cf20e107d0d7f5f215d1fca/script.js
window.Persistence=new function(){var b=!1;try{"object"===typeof window.sessionStorage&&(b=!0,this.store=function(a){sessionStorage.setItem("github.com/SimonLammer/anki-persistence",JSON.stringify(a))},this.load=function(){return JSON.parse(sessionStorage.getItem("github.com/SimonLammer/anki-persistence"))})}catch(a){}if(!b)try{"object"===typeof window.py&&(b=!0,this.store=function(a){py["github.com/SimonLammer/anki-persistence"]=a},this.load=function(){return py["github.com/SimonLammer/anki-persistence"]||
null})}catch(a){}this.isAvailable=function(){return b}};
</script>

{{Back}}

<div id="back"></dv>

<script>
var number = 0.4;
if (Persistence.isAvailable()) {
  number = Persistence.load();
  Persistence.store(null);
}
window.back.appendChild(document.createTextNode(number));
</script>
~~~

#### Note

The note has two fields: ```Front``` and ```Back```.
These are set to ```front``` and ```back``` respectively.

## Preparation

TODO: Add screenshots

To use anki-persistense, follow these steps:
1. Download the script from [the latest release](releases/latest). We recommend using the minified version (```minified.js```) to save space in the anki card type.
1. Copy and paste the file contents between to the beginning of front and back side of the card type.
1. Ensure that both script blocks are enclosed in ```<script>``` and ```</script>```.

## Usage

Anki clients vary in their implementation and JavaScript can behave differently in each one. Therefore the before using other methods, check for availability:
~~~
if (Persistence.isAvailable()) {
	// do stuff
}
~~~

Other methods:

|                       Name    | Description |
| -----------------------------:|:----------- |
| ```Persistence.store(data)``` | Persists the data, so it can be retrieved later. |
|      ```Persistence.load()``` | Retrieves previously stored data. If no data has been stored yet, null is returned. |

*Some implementations of Persistence may use JSON.stringify and JSON.parse in the process of persisting and retrieving data.*

# Acknowledgements

Huge thanks to [RunasSudo, whose code kick-started this project](https://yingtongli.me/blog/2015/03/15/random-question-generator-on-anki-using.html)

## Other references

* [r/Anki - Passings state between Fields](https://www.reddit.com/r/Anki/comments/4mhfmm/passing_state_between_fields/)
* [r/Anki - Pass data between both sides of an Anki flashcard](https://www.reddit.com/r/Anki/comments/8ksjqb/pass_data_between_both_sides_of_an_anki_flashcard/)