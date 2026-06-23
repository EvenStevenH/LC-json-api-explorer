// cache elements
const fetchButton = document.getElementById("fetchButton");
const postList = document.getElementById("postList");
const errorDiv = document.getElementById("error");
const form = document.getElementById("postForm");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");

/* -------------------------------------------------------------------------- */
// OPTION 1: .then()

// function fetchPosts() {
// 	errorDiv.textContent = "Loading..."; // show loading state

// 	fetch("https://jsonplaceholder.typicode.com/posts")
// 		.then((response) => {
// 			if (!response.ok) {
// 				throw new Error(`HTTP Error: ${response.status}`);
// 			}
// 			return response.json();
// 		})
// 		.then((posts) => {
// 			postList.innerHTML = "";
// 			if (!posts || posts.length === 0) {
// 				return (postList.innerHTML = "<p>No posts available.</p>");
// 			}

// 			posts.forEach((post) => {
// 				const postElement = document.createElement("div");
// 				postElement.className = "post";
// 				postElement.innerHTML = `
//                     <h3>${post.title}</h3>
//                     <p>${post.body}</p>
//                 `;
// 				postList.appendChild(postElement);
// 			});

// 			errorDiv.textContent = ""; // hide loading state
// 		})
// 		.catch((error) => {
// 			console.error("Error fetching posts:", error);
// 			errorDiv.textContent = "Failed to fetch posts!";
// 		});
// }

// function createPost(event) {
// 	const title = document.getElementById("titleInput");
// 	const body = document.getElementById("bodyInput");
// 	event.preventDefault(); // stops reload
// 	formError.textContent = "";
// 	formSuccess.textContent = "Submitting...";

// 	fetch("https://jsonplaceholder.typicode.com/posts", {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify({ title: title.value, body: body.value }),
// 	})
// 		.then((response) => {
// 			if (!response.ok) {
// 				throw new Error(`HTTP Error: ${response.status}`);
// 			}
// 			return response.json();
// 		})
// 		.then((data) => {
// 			formSuccess.textContent = `Post created successfully! ID: ${data.id}`;
// 			form.reset();
// 			fetchPosts(); // show new post with the rest, normally
// 		})
// 		.catch((error) => {
// 			console.error("Error fetching posts:", error);
// 			formError.textContent = "Failed to create post!";
// 		});
// }

/* -------------------------------------------------------------------------- */
// OPTION 2: async/await

async function fetchPosts() {
	errorDiv.textContent = "Loading..."; // show loading state

	try {
		const response = await fetch("https://jsonplaceholder.typicode.com/posts");
		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
		}

		const posts = await response.json();
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
	} catch (error) {
		console.error("Error fetching posts:", error);
		errorDiv.textContent = "Failed to fetch posts!";
	}
}

// handle form submission / create new post
async function createPost(event) {
	const title = document.getElementById("titleInput");
	const body = document.getElementById("bodyInput");
	event.preventDefault(); // stop from reloading
	formError.textContent = "";
	formSuccess.textContent = "Submitting...";

	try {
		const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title: title.value, body: body.value }),
		});
		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
		}

		const data = await response.json();
		formSuccess.textContent = `Post created successfully! ID: ${data.id}`;

		form.reset();
		fetchPosts(); // show new post with the rest, normally
	} catch (error) {
		console.error("Error fetching posts:", error);
		formError.textContent = "Failed to create post!";
	}
}

/* -------------------------------------------------------------------------- */
// add event listeners
form.addEventListener("submit", createPost);
fetchButton.addEventListener("click", fetchPosts);
