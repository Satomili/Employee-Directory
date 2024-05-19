import { employees } from "/js/employees.js"

const mainContainer = document.getElementById("main-container")
const selectEl = document.querySelector(".header--search-select")
const inputEl = document.querySelector(".header--search-input")

selectEl.addEventListener("change", applyFilters)
inputEl.addEventListener("input", applyFilters)

function applyFilters() {
    const selectedTeam = selectEl.value.toLowerCase()
    const searchName = inputEl.value.toLowerCase()

    let filteredEmployees = employees
    
    if(selectedTeam !== "everyone") {
        filteredEmployees = filterByTeam(filteredEmployees, selectedTeam)
    }
    
    if(searchName) {
        filteredEmployees = filterByName(filteredEmployees, searchName)
    }
    
    renderEmployees(filteredEmployees);
}

function filterByTeam(employees, team) {
    return employees.filter(employee => employee.team === team)
}

function filterByName(employees, name) {
    return employees.map(employee => ({
        ...employee,
        members: employee.members.filter(member => member.name.toLowerCase().includes(name))
    }))
}

function renderEmployees(filteredEmployees) {
    mainContainer.innerHTML = filteredEmployees.map(team => {
        return team.members.map(member => {
    
            const sns = member.social.twitter ? 
                `<a href=${member.social.twitter}><i class="fab fa-twitter card--twitter-icon"></i></a>
                <a href=${member.social.linkedin}><i class="fab fa-linkedin card--linkedin-icon"></i></a> `
                : 
                `<a href=${member.social.linkedin}><i class="fab fa-linkedin card--linkedin-icon"></i></a>`
    
            return `
                <div class="card">
                    <img class="card--image" src="images/photos/${member.image}">
                    <h2 class="card--name">${member.name}</h2>
                    <h3 class="card--title">${member.title}</h3>
                    <div class="card--bio">${member.bio}</div>
                    <div class="card--sns">
                        ${sns}
                    </div>
                </div>
            `
        }).join("")
    }).join("")
}

renderEmployees(employees)