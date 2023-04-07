var interupt = false;
var mSentence;
async function type(sentence) {
    let animations = getUserData("animations");
    mSentence = sentence;
    if (animations.length == 0 || animations[0].toggledOn == undefined || animations[0].toggledOn == true) {
        var letters = sentence.split("");

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

            } else {
                document.getElementById("skipTyping").style.display = "none";
                document.getElementsByClassName("input-cursor")[0].remove();
                return;
            }
        }
        document.getElementsByClassName("input-cursor")[0].remove();
        document.getElementById("skipTyping").style.display = "none";
    } else {
        document.getElementsByClassName("input-cursor")[0].remove();
        document.getElementById("skipTyping").style.display = "none";
        skipTyping();
    }
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
    await sleep(50);
    document.getElementById("feature-text").innerHTML = document.getElementById("feature-text").innerHTML.substring(0, document.getElementById("feature-text").innerHTML.length - 1);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}