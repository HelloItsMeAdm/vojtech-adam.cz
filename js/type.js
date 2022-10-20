async function type(sentence) {
    const letters = sentence.split("");
    for (let i = 0; i < letters.length; i++) {
        await sleep(50);
        if (letters[i] === "<") {
            let tag = "";
            while (letters[i] !== ">") {
                tag += letters[i];
                i++;
            }
            tag += ">";
            tag = tag.substring(1, tag.length - 1);
            document.getElementById("feature-text").appendChild(document.createElement(tag));
        } else {
            document.getElementById("feature-text").append(letters[i]);
        }
    }
    document.getElementsByClassName("input-cursor")[0].remove();
    return;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}