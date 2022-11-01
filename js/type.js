var interupt = false;
var mSentence;
async function type(sentence) {
    mSentence = sentence;
    var letters = sentence.split("");

    /*var finalHeight;
    var lines = (sentence.match(/<br>/g) || []).length + 1;
    var deviceWidth = window.innerWidth;
    if (deviceWidth < 768) {
        finalHeight = lines * 50;
    } else if (deviceWidth < 992) {
        finalHeight = lines * 40;
    } else if (deviceWidth < 1200) {
        finalHeight = lines * 30;
    } else {
        finalHeight = lines * 20;
    }

    document.getElementById("move-screen").style.height = finalHeight + "px";*/

    for (let i = 0; i < letters.length; i++) {
        if (!interupt) {
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
            } else if (letters[i] === "&") {
                let tag = "";
                while (letters[i] !== ";") {
                    tag += letters[i];
                    i++;
                }
                tag = tag.substring(1, tag.length);
                tag = "&" + tag.replace(/,/g, "");
                document.getElementById("feature-text").innerHTML += tag;
            } else {
                document.getElementById("feature-text").append(letters[i]);
            }

            //TODO: If spacer is on top of text, set height back to auto
        } else {
            document.getElementById("skipTyping").style.display = "none";
            document.getElementsByClassName("input-cursor")[0].remove();
            return;
        }
    }
    document.getElementsByClassName("input-cursor")[0].remove();
    //document.getElementById("move-screen").style.height = "auto";
    return;
}

async function skipTyping() {
    interupt = true;
    document.getElementById("feature-text").innerHTML = "";
    document.getElementById("skipTyping").style.display = "none";
    var letters = mSentence.split("");

    for (let i = 0; i < letters.length; i++) {
        if (letters[i] === "<") {
            let tag = "";
            while (letters[i] !== ">") {
                tag += letters[i];
                i++;
            }
            tag += ">";
            tag = tag.substring(1, tag.length - 1);
            document.getElementById("feature-text").appendChild(document.createElement(tag));
        } else if (letters[i] === "&") {
            let tag = "";
            while (letters[i] !== ";") {
                tag += letters[i];
                i++;
            }
            tag = tag.substring(1, tag.length);
            tag = "&" + tag.replace(/,/g, "");
            document.getElementById("feature-text").innerHTML += tag;
        } else {
            document.getElementById("feature-text").append(letters[i]);
        }
    }
    //remove last letter from innerHTML
    await sleep(50);
    document.getElementById("feature-text").innerHTML = document.getElementById("feature-text").innerHTML.substring(0, document.getElementById("feature-text").innerHTML.length - 1);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}