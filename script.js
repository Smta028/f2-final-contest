let form = document.getElementById("form");
let inputName = document.getElementById("inputname");
let inputEmail = document.getElementById("inputemail");
let inputGpa = document.getElementById("inputgpa");
let inputAge = document.getElementById("inputage");
let inputDegree = document.getElementById("inputdegree");
let errMssg = document.querySelectorAll(".errMssg");
let taskContainer = document.getElementById("tablebody");
var tr = document.getElementsByTagName("tr");
var inputSearch =document.getElementById("inputsearch");

let tasks = [];
var selectedTask = null;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (formValidation()) {
        if (selectedTask === null) {
            // saving data in array
            saveData();
        } else {
            updateTask();
        }
        resetForm();
    }

})


let formValidation = () => {
    isValid = true;

    //    Name Validation
    console.log(errMssg)
    if (inputName.value === "") {
        errMssg[0].innerHTML = "Please write valid fields";
        isValid = false;
    } else {
        errMssg[0].innerHTML = "";
        isValid = true;
    }
    // email validation
    if (inputEmail.value === "") {
        errMssg[1].innerHTML = "Please write valid fields";
        isValid = false;
    } else {
        errMssg[1].innerHTML = "";
        isValid = true;
    }
    // gpa validation
    if (inputGpa.value === "") {
        errMssg[2].innerHTML = "Please write valid fields";
        isValid = false;
    } else {
        errMssg[2].innerHTML = "";
        isValid = true;
    }
    // age validation
    if (inputAge.value === "") {
        errMssg[3].innerHTML = "Please write valid fields";
        isValid = false;
    } else {
        errMssg[3].innerHTML = "";
        isValid = true;
    }

    // degree validation
    if (inputDegree.value === "") {
        errMssg[4].innerHTML = "Please write valid fields";
        isValid = false;
    } else {
        errMssg[4].innerHTML = "";
        isValid = true;
    }

    return isValid;

}


    let saveData = () => {
        let task = {
            id: "",
            name: inputName.value,
            email: inputEmail.value,
            gpa: inputGpa.value,
            age: inputAge.value,
            degree: inputDegree.value
        };

        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        showTasks()

        console.log(tasks);
    }



    let showTasks = () => {
        console.log(taskContainer);
        taskContainer.innerHTML = "";
        tasks.forEach((element, idx) => {
            console.log(element);
            return taskContainer.innerHTML += `  <tr id="${idx}">
                    <td>${idx+1}</td>
                    <td>${element.name}</td>
                    <td>${element.email}</td>
                    <td>${element.age}</td>
                    <td>${element.gpa}</td>
                    <td>
                        <div class="Materials">
                            <span>${element.degree}</span>
                            <span  class="icons">
                                <span onclick = "editTask(this)" class="material-symbols-outlined">
                                    edit_document
                                </span>
                                <span onclick = "deleteTask(this)" class="material-symbols-outlined">
                                    delete
                                </span>
                            </span>
                        </div>
                    </td>
                </tr>
                `
        })
    }

    let resetForm = () => {
        inputName.value = "";
        inputEmail.value = "";
        inputGpa.value = "";
        inputAge.value = "";
        inputDegree.value = "";
    }

    let editTask = (e) => {
        console.log(e.parentNode.parentNode.parentNode.parentNode);
        selectedTask = e.parentNode.parentNode.parentNode.parentNode;
        console.log(selectedTask.children);

        inputName.value = selectedTask.children[1].innerHTML;
        inputEmail.value = selectedTask.children[2].innerHTML;
        inputGpa.value = selectedTask.children[3].innerHTML;
        inputAge.value = selectedTask.children[4].innerHTML;
        inputDegree.value = selectedTask.children[5].children[0].children[0].innerHTML;
        // console.log(selectedTask.children[5].children[0].children[0])

    }


    let updateTask = ()=>{
        selectedTask.children[1].innerHTML = inputName.value;
        selectedTask.children[2].innerHTML = inputEmail.value;
        selectedTask.children[3].innerHTML = inputGpa.value;
        selectedTask.children[4].innerHTML = inputAge.value;
        selectedTask.children[5].children[0].children[0].innerHTML = inputDegree.value;

        selectedTask = null;
    }


    let deleteTask = (e) => {
        // console.log(e.parentNode.parentNode.parentNode.parentNode);
        // removes the element from the UI
        e.parentNode.parentNode.parentNode.parentNode.remove()
        // remove it from the tasks array
        tasks.splice(e.parentNode.parentNode.parentNode.parentNode, 1)
        // update localstorage
        localStorage.setItem("tasks", JSON.stringify(tasks))

        // console.log(tasks);

    }
    function search() {
        var  filter, td, i, txtValue, txtValue1, txtValue2;
    
        //inputSearch , dataContainer , tr
        filter = inputSearch.value.toUpperCase();
    
        // Loop through all table rows, and hide those who don't match the search query
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            td1 = tr[i].getElementsByTagName("td")[2];
            td2 = tr[i].getElementsByTagName("td")[5];
    
            if (td || td1 || td2) {
                txtValue = td.textContent || td.innerText;
                txtValue1 = td1.textContent || td1.innerText;
                txtValue2 = td2.textContent || td2.innerText;
    
                if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                }
    
                else {
                    tr[i].style.display = "none";
                }
    
            }
        }
    }

    (() => {
        // whenever page loads this function is called
        // fetching the data from localstorage
        tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        // console.log(tasks);

        // show the tasks
        showTasks()
    })();
