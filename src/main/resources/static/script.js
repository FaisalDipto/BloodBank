var Form1 = document.getElementById("Form1");
var Form2 = document.getElementById("Form2");
var Form3 = document.getElementById("Form3");
var Form4 = document.getElementById("Form4");
var Form5 = document.getElementById("Form5");
var Form6 = document.getElementById("Form6");
var Next1 = document.getElementById("Next1");
var Next2 = document.getElementById("Next2");
var Next3 = document.getElementById("Next3");
var Next4 = document.getElementById("Next4");
var Next5 = document.getElementById("Next5");
var Back1 = document.getElementById("Back1");
var Back2 = document.getElementById("Back2");
var Back3 = document.getElementById("Back3");
var Back4 = document.getElementById("Back4");
var Back5 = document.getElementById("Back5");
var Table = document.getElementById("bookTable");

Back1.onclick = function () {
    Form1.style.left = "40px";
    Form2.style.left = "-450px";
    Form3.style.left = "-450px";
    Form4.style.left = "-450px";
    Form5.style.left = "-450px";
    Form6.style.left = "-450px";
}

Back2.onclick = function () {
    Form1.style.left = "40px";
    Form2.style.left = "-450px";
    Form3.style.left = "-450px";
    Form4.style.left = "-450px";
    Form5.style.left = "-450px";
    Form6.style.left = "-450px";
}

Back3.onclick = function () {
    Form1.style.left = "40px";
    Form2.style.left = "-450px";
    Form3.style.left = "-450px";
    Form4.style.left = "-450px";
    Form5.style.left = "-450px";
    Form6.style.left = "-450px";
}

Back4.onclick = function () {
    Form1.style.left = "40px";
    Form2.style.left = "-450px";
    Form3.style.left = "-450px";
    Form4.style.left = "-450px";
    Form5.style.left = "-450px";
    Form6.style.left = "-450px";
}

Back5.onclick = function () {
    Form1.style.left = "40px";
    Form2.style.left = "-450px";
    Form3.style.left = "-450px";
    Form4.style.left = "-450px";
    Form5.style.left = "-450px";
    Form6.style.left = "-450px";
}

//Add Book Form
Next1.onclick = function () {
  Form1.style.left = "-450px";
  Form2.style.left = "40px";
  Form3.style.left = "-450px";
  Form4.style.left = "-450px";
  Form5.style.left = "-450px";
  Form6.style.left = "-450px";
};

//Search Book Form
Next2.onclick = function () {
  Form1.style.left = "-450px";
  Form2.style.left = "-450px";
  Form3.style.left = "40px";
  Form4.style.left = "-450px";
  Form5.style.left = "-450px";
  Form6.style.left = "-450px";
};

//All Book Form
Next3.onclick = function () {
  Form1.style.left = "-450px";
  Form2.style.left = "-450px";
  Form3.style.left = "-450px";
  Form4.style.left = "40px";
  Form5.style.left = "-450px";
  Form6.style.left = "-450px";
};

//Update Book Form
Next4.onclick = function () {
  Form1.style.left = "-450px";
  Form2.style.left = "-450px";
  Form3.style.left = "-450px";
  Form4.style.left = "-450px";
  Form5.style.left = "40px";
  Form6.style.left = "-450px";
};

//Delete Book Form
Next5.onclick = function () {
  Form1.style.left = "-450px";
  Form2.style.left = "-450px";
  Form3.style.left = "-450px";
  Form4.style.left = "-450px";
  Form5.style.left = "-450px";
  Form6.style.left = "40px";
};

const addButton = document.getElementById("addButton");
addButton.addEventListener("click", () => {
  console.log("Add Button Clicked!");
  const donorName = document.getElementById("donorName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const bloodGroup = document.getElementById("bloodGroup").value; // Get the ID input
  const address = document.getElementById("address").value;
  const lastDonationDate = document.getElementById("lastDonationDate").value;
  // Create a JSON object with the book details
  const newDonor = {
    donorName: donorName,
    phoneNumber: phoneNumber,
    bloodGroup: bloodGroup,
    address: address,
    lastDonationDate: lastDonationDate
  };

  // Send a POST request to add the book to the API
  fetch("/addDonor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDonor),
  })
    .then((response) => response.text())
    .then((data) => {
      // Handle the response, e.g., display a success message
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// Function to display the list of books in a table
function displayDonorListInTable(donors) {
  const tableBody = document.getElementById("donorTableBody");
  tableBody.innerHTML = ""; // Clear the existing table body

  donors.forEach((donor) => {
    const row = tableBody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.textContent = donor.donorName;
    cell2.textContent = donor.phoneNumber;
    cell3.textContent = donor.bloodGroup;
    cell4.textContent = donor.address;
    cell5.textContent = donor.status;
  });
}

// Event listener for the "Show donor List" button
const showButton = document.getElementById("showButton");
showButton.addEventListener("click", () => {
  console.log("Show Button Clicked!");
  // Scroll to the "donorList" section
  const donorListSection = document.getElementById("donorList");
    
  if (donorListSection) {
      // Use smooth scrolling for a smooth transition
      donorListSection.scrollIntoView({ behavior: "smooth" });
  }
  // Make a GET request to retrieve the list of donors
  fetch("/findAllDonors")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
        console.log("Net Prob");
      }
      console.log("json found");
      return response.json();
    })
    .then((data) => {
      // Handle the success response
      const donors = data;
      displayDonorListInTable(donors);

      // Display the table by setting its style to "table" (visible)
      const donorTable = document.getElementById("donorTable");
      donorTable.style.display = "table";
    })
    .catch((error) => {
      // Handle the error
      console.error("Error:", error);
    });
});

// Event listener for the "Delete" button
const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", () => {
  console.log("Delete Button Clicked!");
  const phoneNumber = prompt("Enter the Donor ID(Phone Number) to delete:");
  if (phoneNumber !== null) {
    // Send a DELETE request
    fetch(`/delete/${phoneNumber}`, { method: "DELETE" })
      .then((response) => {
        if (response.ok) {
          // Donor deleted successfully
          alert("Donor deleted successfully.");
          // Refresh the book list or update it as needed
        } else {
          // Donor not found or other error
          alert("Donor not found or an error occurred.");
        }
      })
      .catch((error) => {
        // Handle the error
        console.error("Error:", error);
      });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".Form3");
  const donorTable = document.getElementById("donorTable");
  const donorTableBody = document.getElementById("donorTableBody");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form from submitting
    const donorListSection = document.getElementById("donorList");

    if (donorListSection) {
      // Use smooth scrolling for a smooth transition
      donorListSection.scrollIntoView({ behavior: "smooth" });
    }

    // Get the input values
    const bloodGroup1 = encodeURIComponent(document.getElementById("bloodGroup1").value);
    const address1 = encodeURIComponent(document.getElementById("address1").value);
    // const selectedOption = this.options[this.selectedIndex];
    // const selectedLatitude = parseFloat(selectedOption.getAttribute("data-latitude"));
    // const selectedLongitude = parseFloat(selectedOption.getAttribute("data-longitude"));

    if (address1 === "Abdullahpur") {
      selectedLatitude = 23.874203;
      selectedLongitude = 90.403798;
    } else if (address1 === "Uttara") {
      selectedLatitude = 23.875938;
      selectedLongitude = 90.391363;
    } else if (address1 === "Mirpur") {
      selectedLatitude = 23.8223;
      selectedLongitude = 90.3654;
      // Add more conditions for other addresses as needed
    }

    if (bloodGroup1.trim() === '' && address1.trim() === '') {
      alert("Please enter at least one search criterion.");
      return; // Do not make the request if both fields are empty
    }

    // Send a GET request to the Spring Boot endpoint
    fetch(`/findDonorsByBloodGroupAndAddress?bloodGroup=${bloodGroup1}&address=${address1}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          // donorTable.style.display = "table";
          // donorTableBody.innerHTML = "<tr><td colspan='5'>No donors found matching the criteria.</td></tr>";
          // throw new Error("Donor not found");
            
            console.log("Test-1");
            // const selectedOption = this.options[this.selectedIndex];
            // const selectedAddress = selectedOption.value;
            // const selectedLatitude = parseFloat(selectedOption.getAttribute("data-latitude"));
            // const selectedLongitude = parseFloat(selectedOption.getAttribute("data-longitude"));
            // const selectedBloodGroup = "AB+"; // Replace with the actual selected blood group
            fetch("/findAllDonors")
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                  console.log("Net Prob");
                }
                console.log("json found");
                return response.json();
              })
              .then((data) => {
                // Handle the success responseAF
                const donors = data;
                // Example usage of findNearestDonors function
            const nearestDonors = findNearestDonors(
              selectedLatitude,
              selectedLongitude,
              bloodGroup1,
              donors
            );
          
            // Display the nearest donors in a new table
            displayNearestDonorsTable(nearestDonors);
          
          
          function findNearestDonors(userLatitude, userLongitude, userBloodGroup, donors) {
            const filteredDonors = donors.filter((donor) => donor.bloodGroup === userBloodGroup);
            console.log("Filtered Donors: ");
            console.log(filteredDonors);

            function calculateDistance(lat1, lon1, lat2, lon2) {
              const R = 6371; // Radius of the Earth in kilometers
              const dLat = deg2rad(lat2 - lat1);
              const dLon = deg2rad(lon2 - lon1);
            
              console.log('dLat:', dLat);
              console.log('dLon:', dLon);
            
              const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            
              console.log('a:', a);
            
              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            
              console.log('c:', c);
            
              const distance = R * c; // Distance in kilometers
            
              console.log('distance:', distance);
            
              return distance;
            }
            
            
            function deg2rad(deg) {
              return deg * (Math.PI / 180);
            }
            
          
            return filteredDonors.sort((a, b) => {
              console.log('userLatitude:', userLatitude);
              console.log('userLongitude:', userLongitude);
              console.log('a.latitude:', a.latitude);
              console.log('a.longitude:', a.longitude);
              console.log('b.latitude:', b.latitude);
              console.log('b.longitude:', b.longitude);
              const distanceA = calculateDistance(userLatitude, userLongitude, a.latitude, a.longitude);
              const distanceB = calculateDistance(userLatitude, userLongitude, b.latitude, b.longitude);
              console.log('distanceA:', distanceA);
              console.log('distanceB:', distanceB);

              console.log('distanceA - distanceB:', distanceA - distanceB);
              return distanceA - distanceB;
            });
          }
          
          function displayNearestDonorsTable(nearestDonors) {
            const nearestDonorsTable = document.getElementById("donorTable");
            const nearestDonorsTableBody = document.getElementById("donorTableBody");
          
            nearestDonorsTable.style.display = "table";
            nearestDonorsTableBody.innerHTML = "";
            console.log("CheckPoint-1");
            console.log(nearestDonors);
          
            if (nearestDonors.length > 0) {
              nearestDonors.forEach((donor) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                  <td>${donor.donorName}</td>
                  <td>${donor.phoneNumber}</td>
                  <td>${donor.bloodGroup}</td>
                  <td>${donor.address}</td>
                  <td>${donor.status}</td>
                `;
                nearestDonorsTableBody.appendChild(row);
              });
            } else {
              nearestDonorsTableBody.innerHTML = "<tr><td colspan='5'>No donors found with the same blood group.</td></tr>";
            }
          }
          
          // donorTableBody.innerHTML = "<tr><td colspan='3'>No donors found matching the criteria.</td></tr>";
          alert("No donors found matching the criteria. Do You want to Find nearest Donor of Same Blood Group?");
              })
            
        }
      })
      .then((data) => {
        // Display the table and populate the table with the received data
        donorTable.style.display = "table";
        donorTableBody.innerHTML = "";

        if (data.length > 0) {
          data.forEach((donor) => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${donor.donorName}</td>
              <td>${donor.phoneNumber}</td>
              <td>${donor.bloodGroup}</td>
              <td>${donor.address}</td>
              <td>${donor.status}</td>
            `;
            donorTableBody.appendChild(row);
          });

          // Assuming you have user's location (latitude and longitude)
          // const userLatitude = 37.7749; // Replace with actual user latitude
          // const userLongitude = -122.4194; // Replace with actual user longitude

          // Find the nearest donor
          // const nearestDonor = findNearestDonor(userLatitude, userLongitude, data);
          // console.log('Nearest Donor:', nearestDonor);
        } else {
          // If no donors found, display a message in a new row
          const noDonorRow = document.createElement("tr");
          noDonorRow.innerHTML = "<td colspan='5'>No donors found.</td>";
          donorTableBody.appendChild(noDonorRow);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error as needed, e.g., display an error message
      });
  });

  const updateDonorForm = document.getElementById("Form5");

  updateDonorForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(updateDonorForm);

    // Create a JSON object from the form data
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    fetch(`/updateDonor/${data.phoneNumber}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((message) => {
        // Show the response message in an alert dialog
        alert(message);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Show an error message in an alert dialog
        alert("An error occurred.");
      });
  });

  // Implement the findNearestDonor function
  function findNearestDonor(userLatitude, userLongitude, donors) {
    // Implement your logic to find the nearest donor
    // This can be similar to the previous example using Haversine formula
    // ...

    // Placeholder return, replace with your actual logic
    return donors[0];
  }
});
