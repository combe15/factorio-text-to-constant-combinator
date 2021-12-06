

const blueprintTemplate = {"blueprint":{"icons":[{"signal":{"type":"item","name":"constant-combinator"},"index":1}],"entities":[],"item":"blueprint","version":281479274823680}}
const entityTemplate = {"entity_number":1,"name":"constant-combinator","position":{"x":0.5,"y":0.5},"control_behavior":{"filters":[{"signal":{"type":"virtual","name":"signal-A"},"count":1,"index":1}]}}
const conversionTable = {'A':"signal-A",'B':"signal-B",'C':"signal-C",'D':"signal-D",'E':"signal-E",'F':"signal-F",'G':"signal-G",'H':"signal-H",'I':"signal-I",'J':"signal-J",'K':"signal-K",'L':"signal-L",'M':"signal-M",'N':"signal-N",'O':"signal-O",'P':"signal-P",'Q':"signal-Q",'R':"signal-R",'S':"signal-S",'T':"signal-T",'U':"signal-U",'V':"signal-V",'W':"signal-W",'X':"signal-X",'Y':"signal-Y",'Z':"signal-Z",'0':"signal-0",'1':"signal-1",'2':"signal-2",'3':"signal-3",'4':"signal-4",'5':"signal-5",'6':"signal-6",'7':"signal-7",'8':"signal-8",'9':"signal-9",'.':"signal-dot",'?':"signal-dot",'!':"signal-dot"};

function convertText() {
    let blueprintJSON = JSON.parse(JSON.stringify(blueprintTemplate))
    var text = document.getElementById("inputText").value;
    console.log(text);
    for (let i = 0; i < text.length; i++) {
        currentEntity = JSON.parse(JSON.stringify(entityTemplate))
        currentEntity.entity_number = i+1
        currentEntity.position.x = i+0.5
        if (text[i].toUpperCase() in conversionTable) {
            currentEntity.control_behavior.filters[0].signal.name = conversionTable[text[i].toUpperCase()]
        }
        else if (text[i] === ' ') {
            continue;
        }
        else {
            delete currentEntity.control_behavior
        }
        blueprintJSON.blueprint["entities"].push(currentEntity)
    }
    compressJSON(blueprintJSON)
}

function copyBlueprint() {
    /* Get the text field */
    var copyText = document.getElementById("blueprintOutput");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
}

function compressJSON (blueprintJSON) {
    var json = JSON.stringify(blueprintJSON);
    console.log("json", json)

    var enc = new TextEncoder("utf-8").encode(json);
    console.log("enc", enc);

    var data = pako.deflate(enc, {level: 9});
    console.log("zip", data);

    var encoded = toBase64(data);
    console.log(encoded)

    document.getElementById("blueprintOutput").value = "0" + encoded;
}

function toBase64(buf) {
    var binaryString = Array.prototype.map.call(buf, function (ch) {
        return String.fromCharCode(ch);
    }).join('');
    return btoa(binaryString);
}