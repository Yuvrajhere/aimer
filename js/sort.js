//PAGE 1:
//this is the next button event:
const nextButton = document.querySelector("#next");
nextButton.addEventListener("click", () => {
    const numberOfGoals = document.querySelector(".number-of-goals").value;
    if(numberOfGoals >= 5 && numberOfGoals <= 18){
        InputBoxCreator(numberOfGoals);
        const inputInfoDiv = document.querySelector(".input-info");
        inputInfoDiv.innerHTML = null;
        inputInfoDiv.style.height = 0;
        inputInfoDiv.style.border = "none";
        return;
    } else {
        let note = document.querySelector(".note");
        note.style.textDecoration = "underline";
        return;
    }
});

//PAGE 2:
//arrayOfGoals will contain all the input text from <input> tags.
var arrayOfGoals =[];

//creating an array to store the preferences.
var arrayOfPref;

//this will store sorted preferance.
var arrayOfSortedPref;

//selecting the <div> to display comparision two goals.
const sortDiv = document.querySelector(".sort");

function InputBoxCreator(count){    //this a constructor called by the "click event of nextButton".
    
    const inputAreaDiv = document.querySelector(".input-area");    //this <div> is main, selected from "input.html".
    inputAreaDiv.classList.add("input-area-styles");    //the styles are added using the className.

    let inputAreaDivH1 = document.createElement("h1");    //<h1> is created.
    inputAreaDivH1.textContent = `Fill the ${count} goals in word(s) in random order in the below boxes.`;
    inputAreaDiv.appendChild(inputAreaDivH1);    //<h1> is added to the main <div>.

    const inputBoxesDiv = document.createElement("div");    //new <div> is created.
    inputBoxesDiv.classList.add("input-boxes");    //the styles are added using the className.

    for(i =0; i<count; i++){    //individual <input type="text"/> will be created.
        let inputBox = document.createElement("input");
        inputBox.setAttribute("type","text");
        inputBox.classList.add("input-box");
        inputBox.required = true;
        inputBoxesDiv.appendChild(inputBox);    //<input/> are added to the "inputBoxesDiv" <div>.
    }

    inputAreaDiv.appendChild(inputBoxesDiv);    //the whole "inputBoxesDiv" <div> is added to main <div>.


    let submitButton = document.createElement("button");
    //A <button type="submit" class="submit">Submit</button> is created.
    submitButton.setAttribute("type", "submit");
    submitButton.classList.add(".submit");
    submitButton.textContent = "Submit";

    submitButton.addEventListener("click", () => {    //"click" event added to the submitButton.
        //arrayOfGoals will contain all the input text from <input> tags.
        arrayOfGoals = Array.from(document.querySelectorAll(".input-box")).map(item => {
            return item.value;
        });
        
        //An array to store the preferences.
        arrayOfPref = arrayOfGoals.map(item => {
            return {
                goal : item,
                clicked : 0
            };
        });

        //condition to check if any <input> field is empty.
        if(arrayOfGoals.map(item => {
            if(item.length == 0)
            return false;    
            else return true;
        }).includes(false)){
            return;    //button click doesnt work, if any <input> field is empty.
        } else {
            //<div:inputAreaDiv> is cleared and prefTaker function is called.
            inputAreaDiv.innerHTML = null;
            inputAreaDiv.style.minHeight = 0;
            inputAreaDiv.style.height = 0;
            inputAreaDiv.style.border = "none";
            prefTaker();
            sortDiv.classList.add("sort-div-styles");
            return;
        };   
    });

    //the <button> is added to the main div.
    inputAreaDiv.appendChild(submitButton);
}

//PAGE 2->3:
//After Submit button Clicked.
//intial 2 goals to be compared.
var m=0;
var n=1;



//this function will decide which two goals should be compared.
function prefTaker(){
    //count is the number of goals.
    const count = arrayOfGoals.length;

    //if last goal, then produce Result <div>.
    if(m == count - 1){
        ResultDivConstructor();
        return;
    }

    //clear the previous existing sortDiv <div>.
    sortDiv.innerHTML = null;
    
    sortDivConstructor(m, n);

    //logic to select two goals to compare.
    if(n == count-1){
        m++;
    }

    if(n < count-1){
        n++;
    } else {
        n = m+1;
    }
    
};

//function to produce the content of "sortDiv" <div>.
function sortDivConstructor(i, j){

    //this is h1.
    let h1 = document.createElement("h1");
    h1.textContent = "Chose any one.";
    sortDiv.appendChild(h1);

    //this is the first goal.
    let p1 = document.createElement("p");
    p1.textContent = arrayOfGoals[i];
    p1.classList.add("p-for-sorting");
    
    //click event for first goal.
    p1.addEventListener("click", () => {
        arrayOfPref[i].clicked++;    //"clicked" is increased.
        prefTaker();    //Function is called.
    });
    sortDiv.appendChild(p1);

    //its just a <p> to display "Versus".
    let pVersus = document.createElement("p");
    pVersus.textContent = " OR ";
    pVersus.classList.add("p-or");

    sortDiv.appendChild(pVersus);

    //this is the second goal.
    let p2 = document.createElement("p");
    p2.textContent = arrayOfGoals[j];
    p2.classList.add("p-for-sorting");

    //click event for second goal.
    p2.addEventListener("click", () => {
        arrayOfPref[j].clicked++;    //"clicked" is increased.
        prefTaker();    //function is called.
    });

    sortDiv.appendChild(p2);

    //test console
    console.log(arrayOfPref);
}

const resultDiv = document.querySelector(".result-div");

function ResultDivConstructor(){

    arrayOfSortedPref = arrayOfPref.sort((a, b) => (a.clicked < b.clicked) ? 1 : -1);

    sortDiv.innerHTML = null;
    sortDiv.style.height = 0;
    sortDiv.style.padding = 0;

    resultDiv.classList.add("result-div-styles");

    const ratio = Math.round(2/3 * arrayOfGoals.length);

    const resultDivH1 = document.createElement("h1");
    resultDivH1.textContent = "Your much important goals are below."
    resultDiv.appendChild(resultDivH1);

    const resultDivBoxes = document.createElement("div");
    resultDivBoxes.classList.add("result-div-boxes");

    console.log(ratio);
    console.log(arrayOfSortedPref);


    for (i=0; i<ratio; i++) {
        let outputBox = document.createElement("p");
        outputBox.textContent = arrayOfSortedPref[i].goal;
        outputBox.classList.add("output-box");
        resultDivBoxes.appendChild(outputBox);
    }

    resultDiv.appendChild(resultDivBoxes);

    console.log(arrayOfPref);

    
}


