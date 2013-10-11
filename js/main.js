/*
Elijah Moran
MIU 1310

*/
// Wait until DOM is ready //
window.addEventListener("DOMContentLoaded", function() {
    // getElementById function //

    function $(x) {
        var elementID = document.getElementById(x);
        return elementID;
    };
    // Create Select Element with Options//

    function makeMovieStyle() {
        var formTag = document.getElementsByTagName('form'),
            selectList = $('select'),
            makeSelect = document.createElement('select');
        makeSelect.setAttribute("id", "styles");
        for (var i = 0, j = movieTypes.length; i < j; i++) {
            var makeOption = document.createElement('option');
            var optTxt = movieTypes[i];
            makeOption.setAttribute("value", optTxt);
            makeOption.innerHTML = optTxt;
            makeSelect.appendChild(makeOption);
        }
        selectList.appendChild(makeSelect);
    };
    //Check if movie is a favorite //

    function getCheckboxValue() {
        if ($('favorite').checked) {
            favoriteValue = "Yes";
        } else {
            favoriteValue = "No";
        }
    };
    // Find Value of selected radio button //

    function getSelectedRadio() {
        var radios = document.forms[0].quality;
        for (var i = 0, j = radios.length; i < j; i++) {
            if (radios[i].checked) {
                qualityValue = radios[i].value;
            }
        }
    };
    // Turn on and off form by use of case during getData() //

    function toggle(x) {
        switch (x) {
        case "on":
            $('movieForm').style.display = "none";
            $('showData').style.display = "none";
            $('clearData').style.display = "inline";
            $('startNew').style.display = "inline";
            $('saveData').style.display = "none";
            break;
        case "off":
            $('movieForm').style.display = "block";
            $('showData').style.display = "inline";
            $('clearData').style.display = "inline";
            $('startNew').style.display = "none";
            $('saveData').style.display = "inline";
            $('items').style.display = "none";
            break;
        default:
            return false;
        }
    };
    // Gather Form Data & Place it in an Object & Object is an Array for Form Label and Value //

    function saveData(key) {
        // Set Random Key for Stored Data //
        if (!key) {
            var id = Math.floor(Math.random() * 10001);
        } else {
            id = key;
        }
        // Call Functions //
        getCheckboxValue();
        getSelectedRadio();
        var item = {};
        item.entermovie = ["Movie Style: ", $('styles').value];
        item.mname = ["Movie Name: ", $('mname').value];
        item.mgenre = ["Movie Genre:", $('mgenre').value];
        item.myear = ["Year movie made: ", $('myear').value];
        item.mage = ["Suitable viewing age:", $('mage').value];
        item.favorite = ["Favorite: ", favoriteValue];
        item.movierating = ["This movie is rated as a: ", $('movierating').value];
        item.quality = ["The movie quality is : ", qualityValue];
        item.comments = ["This is what I think about this movie: ", $('comments').value];
        // Save Data into Local Storage with JSON.stringify //
        localStorage.setItem(id, JSON.stringify(item));
        alert("Movie Saved!");
    };
    // Write Data from Local Storage to Browser //

    function getData() {
        // Call Function //
        toggle("on");
        if (localStorage.length === 0) {
            alert("There is no data in Local Storage so \n default data was added.");
            autoFillData();
        }
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv, $('foot'));
        // Set 'items' display //
        $('items').style.display = "block";
        for (var i = 0, j = localStorage.length; i < j; i++) {
            var makeLi = document.createElement('li');
            makeLi.style.fontsize = "25 px";
            var buttonsLi = document.createElement('li');
            makeList.appendChild(makeLi);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            // Convert string from local storage into value by JSON.parse //
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            makeLi.appendChild(makeSubList);
            getImage(obj.entermovie[1], makeSubList);
            for (var x in obj) {
                var makeSubLi = document.createElement('li');
                makeSubList.appendChild(makeSubLi);
                var optSubTxt = obj[x][0] + " " + obj[x][1];
                makeSubLi.innerHTML = optSubTxt;
                makeSubList.appendChild(buttonsLi);
            }
            makeButtonsLi(localStorage.key(i), buttonsLi);
        }
    };
    // Get an image for the right category //

    function getImage(imgName, makeSubList) {
        var imageLi = document.createElement('li');
        makeSubList.appendChild(imageLi);
        var newImage = document.createElement('img');
        var setSrc = newImage.setAttribute("src", "images/" + imgName + ".png");
        newImage.style.paddingTop = "10px";
        imageLi.appendChild(newImage);
    };
    // Auto Fill Local Storage from JSON.js loaded from HTML page

    function autoFillData() {
        for (var n in json) {
            var id = Math.floor(Math.random() * 100000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
    };
    // Make Buttons //
    // Create edit and delete buttons for each stored item when displayed //

    function makeButtonsLi(key, buttonsLi) {
        // Add edit single item button //
        var editButton = document.createElement('a');
        editButton.setAttribute("id", "editButton");
        editButton.href = "#";
        editButton.key = key;
        var editTxt = "Edit Movie";
        editButton.addEventListener("click", editItem);
        editButton.innerHTML = editTxt;
        buttonsLi.appendChild(editButton);
        // Add line break //

	var breakTag = document.createElement('br');
		buttonsLi.appendChild(breakTag);

        // Add single delete item button //
        var deleteButton = document.createElement('a');
        deleteButton.setAttribute("id", "deleteButton");
        deleteButton.href = "#";
        deleteButton.key = key;
        var deleteTxt = "Delete Movie";
        deleteButton.addEventListener("click", deleteItem);
        deleteButton.innerHTML = deleteTxt;
        buttonsLi.appendChild(deleteButton);
    };

    function editItem(key) {
        // Grab data from local storage for item edit //
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        // Turn form back on //
        toggle("off");
        // Populate form fields //
        $('styles').value = item.entermovie[1];
        $('mname').value = item.mname[1];
        $('mgenre').value = item.mgenre[1];
        $('myear').value = item.myear[1];
        $('mage').value = item.mage[1];
        if (item.favorite[1] == "Yes") {
            $('favorite').setAttribute("checked", "checked");
        }
        $('quality').value = item.quality[1];
        var radios = document.forms[0].quality;
        for (var i = 0, j = radios.length; i < j; i++) {
            if (radios[i].value == "Excellent" && item.quality[1] == "Excellent") {
                radios[i].setAttribute("checked", "checked");
            } else if (radios[i].value == "Good" && item.quality[1] == "Good") {
                radios[i].setAttribute("checked", "checked");
            } else if (radios[i].value == "Damaged" && item.quality[1] == "Damaged") {
                radios[i].setAttribute("checked", "checked");
            }
        }
        $('comments').value = item.comments[1];
        // Remove event listener for 'save' button //
        submitData.removeEventListener("click", saveData);
        // Change submit button value from Save Workout to Save Changes //
        $('saveData').value = "Save Changes";
        var editSubmit = $('saveData');
        // Save to original key value established for particular values //
        editSubmit.addEventListener("click", validate);
        editSubmit.key = key;
    };
    // Delete individual key storage from localStorage //

    function deleteItem() {
        var ask = confirm("Delete this movie?");
        // Confirm with the user to delete individual item //
        if (ask) {
            localStorage.removeItem(this.key);
            window.location.reload();
            alert("The movie has been deleted.");
            return false;
            // If declined, do not delete and alert the user //
        } else {
            alert("The movie was not deleted.");
        }
    };

    function clearData() {
        if (localStorage.length === 0) {
            alert("There is nothing to delete.");
        } else {
            var clear = confirm("Are you sure you want to delete your movies?");
            if (clear) {
                localStorage.clear();
                alert("All movies have been deleted.");
                window.location.reload();
                return false;
            } else {
                alert("Your movies have not been deleted.");
            }
        }
    };

    function validate(e) {
        // Define elements we want to check //
        var getStyle = $('styles');
        var getMname = $('mname');
        var getMgenre = $('mgenre');
        var getMyear = $('myear');
        var getMage = $('mage');
        var getComments = $('comments');
        // Reset error messages //
        errMsg.innerHTML = "";
        getStyle.style.border = "1px solid black";
        getMname.style.border = "1px solid black";
        getMgenre.style.border = "1px solid black";
        getMyear.style.border = "1px solid black";
        getMage.style.border = "1px solid black";
        getComments.style.border = "1px solid black";
        // Get error messages //
        var messageAry = [];
        // Style validation //
        if (getStyle.value === "*Choose A Style*") {
            var styleError = "Please choose a style.";
            getStyle.style.border = "1px solid red";
            messageAry.push(styleError);
        }
        // Movie name validation //
        if (getMname.value === "") {
            var mNameError = "Please enter a movie name.";
            getMname.style.border = "1px solid red";
            messageAry.push(mNameError);
        }
        // Movie genre validation //
        if (getMgenre.value === "") {
            var mGenreError = "Please enter a movie genre.";
            getMgenre.style.border = "1px solid red";
            messageAry.push(mGenreError);
        }
        // Year movie made validation //
        if (getMyear.value === "") {
            var mYearError = "Please enter date movie was made.";
            getMyear.style.border = "1px solid red";
            messageAry.push(mYearError);
        }
        // Suitable viewing age validation //
        if (getMage.value === "") {
            var mAgeError = "Please enter a suitable viewing age.";
            getMage.style.border = "1px solid red";
            messageAry.push(mAgeError);
        }
        //Comments validation //
        if (getComments.value === "") {
            var commentsError = "Tell me about the movie.";
            getComments.style.border = "1px solid red";
            messageAry.push(commentsError);
        }
        // Display error messages //
        if (messageAry.length >= 1) {
            for (var i = 0, j = messageAry.length; i < j; i++) {
                var txt = document.createElement('li');
                txt.innerHTML = messageAry[i];
                errMsg.appendChild(txt);
            }
            // If errors found, stop the form from submitting and alert the user //
            alert("There are required fields left empty.");
            e.preventDefault();
            return false;
        } else {
            // If there are no errors, save the data //
            saveData(this.key);
        }
    };
    function getSearch(e) {
        toggleControls("search");
        var category = main("groups").value;
        var term = main("search").value;
        if (category != "--Choose One--" && term === "") {
            for (i = 0, j = localStorage.length; i < j; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var obj = JSON.parse(value);
                if (category === obj.group[1]) {
                    for (n in obj) {
                        console.log(obj [n][1]);
                    }
                }
            }
        }
        if (term != "" & category === "--Choose One--") {
            for (i = 0, j = localStorage.length; i < j; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var obj = JSON.parse(value);
                for (n in obj) {
                    if (term === obj [n][1]) {
                        for(q in obj) {
                            console.log(obj[q][1]);
                        }
                    }
                }
            }
        }
        if (term === obj[n][1] && category === obj.group[1]) {
            for (i = 0, j = localStorage.length; i < j; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var obj = JSON.parse(value);
                if (category === obj.group[1]) {
                    for (g in obj) {
                        console.log(obj[g][1]);
                    }
                }
            }
        }
    };

    // Variable defaults //
    var movieTypes = ["*Choose A Style*", "DVD", "VHS", "Blu-ray"],
        favoriteValue = "No",
        qualityValue, confirmClear, errMsg = $('errors');

    // Call Functions //
    makeMovieStyle();
        
    // Set Link & Submit Click Events //
    var displayLink = $('showData');
    displayLink.addEventListener("click", getData);
    var clearButton = $('clearData');
    clearButton.addEventListener("click", clearData);
    var submitData = $('saveData');
    submitData.addEventListener("click", validate);
    
});