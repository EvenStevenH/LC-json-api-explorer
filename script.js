// cache
const fetchButton = document.getElementById("fetchButton");
const postList = document.getElementById("postList");
const errorDiv = document.getElementById("error");
const form = document.getElementById("postForm");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");

// fetch and display posts
function fetchPosts() {
	errorDiv.textContent = "Loading..."; // show loading state

	fetch("https://jsonplaceholder.typicode.com/posts")
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP Error: ${response.status}`);
			}
			return response.json();
		})
		.then((posts) => {
			postList.innerHTML = "";
			if (!posts || posts.length === 0) {
				return (postList.innerHTML = "<p>No posts available.</p>");
			}

			posts.forEach((post) => {
				const postElement = document.createElement("div");
				postElement.className = "post";
				postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                `;
				postList.appendChild(postElement);
			});

			errorDiv.textContent = ""; // hide loading state
		})
		.catch((error) => {
			console.error("Error fetching posts:", error);
			errorDiv.textContent = "Failed to fetch posts. Please try again!";
		});
}

// handle form submission / create new post
function handleSubmit(event) {
	event.preventDefault(); // stop from reloading

	const title = document.getElementById("titleInput");
	const body = document.getElementById("bodyInput");

	formError.textContent = "";
	formSuccess.textContent = "Submitting...";

	fetch("https://jsonplaceholder.typicode.com/posts", {
		method: "POST",
		body: JSON.stringify({ title, body }),
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP Error: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			formSuccess.textContent = `Post created successfully! ID: ${data.id}`;
			form.reset();
			fetchPosts();
		})
		.catch((error) => {
			console.error("Error fetching posts:", error);
			formError.textContent = "Failed to create post. Please try again!";
		});
}

// add event listeners to buttons
form.addEventListener("submit", handleSubmit);
fetchButton.addEventListener("click", fetchPosts);
