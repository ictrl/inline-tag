let tags = [];
let tag = "";
let tagStartPosition = 0;
let tagIndex = 0;
let inputLength = 0;

function myFunction(arg) {
  inputLength = arg.value.length;
}

const updateOutput = (text) => {

 setTimeout(() => {
   input = document.getElementById("input").value;

   let output = input.split("");
   let sortedTags =  [... tags]
    sortedTags = sortedTags.sort((a, b) => a.offset - b.offset);

   for (let idx = 0; idx < sortedTags.length; idx++) {
     const { length, offset } = sortedTags[idx];

     let colorStart = '<span style="color:red;">';
     let colorEnd = "</span>";
     // let colorStart = ">>>>>>";
     // let colorEnd = "<<<<<<<<<<<<";

     output.splice(offset + idx * 2, 0, colorStart);
     output.splice(length + offset + idx * 2 + 1, 0, colorEnd);
     // console.log("@@ ~ output", output)
     document.getElementById("output").innerHTML = output.join("");
   }
 }, 500);
};

document.getElementById("input").addEventListener("keydown", async ({ key: userInput, target }) => {
  try {
    let ignoreKeys = ["Meta", "Alt", "Backspace", "Shift", "Enter", "ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Escape", "CapsLock", "Tab"];

    if (ignoreKeys.includes(userInput)) return;
    // console.log(" ");
    let cursorPosition = target.selectionStart;

    //start tag
    if (userInput === "@") {
      tag = userInput;
      tagStartPosition = cursorPosition;
    } else if (tag.length && userInput === " ") {
      // reset values
      tag = "";
      tagStartPosition = 0;
      tagIndex++; //udpate for next 'tag'
    } else if (tag.length) {
      tag = tag + userInput;
      //push it to 'tags' array;
      tags[tagIndex] = { tag, length: tag.length, offset: tagStartPosition };
    }

    //identify middle insertion
    if (cursorPosition < inputLength) {
      for (let index = 0; index < tags.length; index++) {
        const { offset, tag } = tags[index];

        if (offset > cursorPosition) {
          // console.log("@@ ~ tag", tag);
          //affected tag, need to increase the offset
          tags[index].offset = offset + 1;
        }
      }
    }
    // updateOutput();
  } catch (error) {
    console.error(error);
  }
});

const log = (params) => {
  // reset values
  tag = "";
  tagStartPosition = 0;
  tagIndex++; //udpate for next 'tag'
  for (let index = 0; index < tags.length; index++) {
    const tag = tags[index];
    console.log(tag);
  }
  updateOutput();
};
