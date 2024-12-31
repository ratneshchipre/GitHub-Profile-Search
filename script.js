const searchInput = document.querySelector('.search-input input');
const userFullName = document.querySelector('.user-fullname');
const userName = document.querySelector('.user-name');
const userBio = document.querySelector('.user-bio');
const userFollower = document.querySelector('.user-follower');
const userFollowing = document.querySelector('.user-following');
const userPublicRepos = document.querySelector('.user-public-repos');
const userLocation = document.querySelector('.user-location');
const userProfilePic = document.querySelector('.user-profile-pic');
const userRepo = document.querySelector('.repo');

const APIURL = "https://api.github.com/users/";

searchInput.addEventListener('keydown', (event) => {
    if(event.key === "Enter") {
        if(!searchInput.value.trim()) {
            alert("Please enter a valid username.");
            return;
        }
        getUserDetails(searchInput);
        userRepo.innerHTML = "";
    }     
});

async function getUserDetails(searchInput) {
    try {
        const response = await fetch(APIURL + searchInput.value.trim());
        const data = await response.json();
        console.log(data);

        userFullName.innerText = data.name || "Name unavailable";
        userName.innerText = data.login || "Unavailable";
        userBio.innerText = data.bio || "Bio unavailable";
        userFollower.innerText = data.followers || 0;
        userFollowing.innerText = data.following || 0;
        userPublicRepos.innerText = data.public_repos || 0;
        userLocation.innerText = data.location || "Location unavailable";
        userProfilePic.src = data.avatar_url;

        await getRepos(searchInput);
    } catch (error) {
        console.error("Error fetching username:", error)
    }
}

async function getRepos(searchInput) {
    try {
        const response = await fetch(APIURL + searchInput.value + "/repos");
        const data = await response.json();

        console.log(data);
        data.slice(0, 4).forEach((item) => {
            const repoDiv = document.createElement('div');
            const element = document.createElement('a');
            
            repoDiv.classList.add("repo-div");
            
            element.classList.add("js-repo");
            element.innerText = item.name;
            element.href = item.html_url;
            element.target = '_blank';

            repoDiv.appendChild(element);
            userRepo.appendChild(repoDiv);
        });

    } catch (error) {
        console.error("Error Fetching Repositories:", error);
    }
}