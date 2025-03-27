const firstName_input = document.querySelector('#firstName');
const lastName_input = document.querySelector('#lastName');
const imgUrl_input = document.querySelector('#imageURL');
const email_input = document.querySelector('#email');
const contact_input = document.querySelector('#contact');
const salary_input = document.querySelector('#salary');
const address_input = document.querySelector('#address');
const dob_input = document.querySelector('#dob');
const formBtn_input = document.querySelector('#form-btn');

const emp_img = document.querySelector('#emp-img');
const emp_name = document.querySelector('#emp-name');
const emp_location = document.querySelector('#emp-location');
const emp_gmail = document.querySelector('#emp-gmail');
const emp_dob = document.querySelector('#emp-dob');

document.addEventListener("DOMContentLoaded", function () {
    fetchData();
    const listContainer = document.querySelector("#list");

    formBtn_input.addEventListener("click", function (event) {
        event.preventDefault();

      
        const firstName = firstName_input.value.trim();
        const lastName = lastName_input.value.trim();
        const imgUrl = imgUrl_input.value.trim() || "https://cdn-icons-png.flaticon.com/512/0/93.png"; 
        const email = email_input.value.trim();
        const contact = contact_input.value.trim();
        const salary = salary_input.value.trim();
        const address = address_input.value.trim();
        const dob = dob_input.value.trim();

        if (firstName === "" || lastName === "") {
            alert("Please enter both first and last names.");
            return;
        }

      
        let empDiv = document.createElement("div");
        empDiv.classList.add("employee-box");

        let nameSpan = document.createElement("span");
        nameSpan.textContent = `${firstName} ${lastName}`;

        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-xmark", "delete-btn");

        deleteIcon.addEventListener("click", function () {
            empDiv.remove();
        });

       
        empDiv.appendChild(nameSpan);
        empDiv.appendChild(deleteIcon);
        listContainer.appendChild(empDiv);

        
        empDiv.addEventListener("click", function () {
            emp_name.innerHTML = `${firstName} ${lastName}`;
            emp_location.innerHTML = address;
            emp_gmail.innerHTML = email;
            emp_dob.innerHTML = dob;
            emp_img.src = imgUrl; 
        });

       
        firstName_input.value = "";
        lastName_input.value = "";
        imgUrl_input.value = "";
        email_input.value = "";
        contact_input.value = "";
        salary_input.value = "";
        address_input.value = "";
        dob_input.value = "";

        document.getElementById("modal").classList.remove("show");
    });
});

async function fetchData() {
    const listContainer = document.querySelector("#list");

    try {
        let response = await fetch("data.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        listContainer.innerHTML = "";

        data.forEach(employee => {
            let empDiv = document.createElement("div");
            empDiv.classList.add("employee-box");

            let nameSpan = document.createElement("span");
            nameSpan.textContent = `${employee.firstName} ${employee.lastName}`;

            let deleteIcon = document.createElement("i");
            deleteIcon.classList.add("fa-solid", "fa-xmark", "delete-btn");

            deleteIcon.addEventListener("click", function () {
                empDiv.remove();
            });

            empDiv.appendChild(nameSpan);
            empDiv.appendChild(deleteIcon);
            listContainer.appendChild(empDiv);

            
            empDiv.addEventListener("click", function () {
                emp_name.innerHTML = `${employee.firstName} ${employee.lastName}`;
                emp_location.innerHTML = employee.address;
                emp_gmail.innerHTML = employee.email;
                emp_dob.innerHTML = employee.dob;
                emp_img.src = employee.imgUrl && employee.imgUrl.trim() !== "" 
                    ? employee.imgUrl 
                    : "https://cdn-icons-png.flaticon.com/512/0/93.png"; 
            });

        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const addEmployeeBtn = document.getElementById("header-btn");
    const closeModalBtn = document.getElementById("closeModal");

    addEmployeeBtn.addEventListener("click", function () {
        modal.classList.add("show");
    });

    closeModalBtn.addEventListener("click", function () {
        modal.classList.remove("show");
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});
