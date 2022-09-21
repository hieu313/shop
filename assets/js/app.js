import {$, $$} from './constants.js'

// ! Delete Error A Tags
const aTagFakesHTMLcolections = $$("a");
const aTagFakesArray = Array.prototype.slice.call( aTagFakesHTMLcolections )
function deleteAtagFake(aTagFakes) {
    aTagFakes.map(aTagFake => {
        if (aTagFake.outerHTML === "<a>\n                                </a>") {
            aTagFake.remove();
        }
    })
}

const app = {

    start() {
        deleteAtagFake(aTagFakesArray)
    }
}

app.start();

