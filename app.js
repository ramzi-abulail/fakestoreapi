// class Products {
//     constructor(Title, Price, Description, Image) {
//         this.t = Title;
//         this.p = Price;
//         this.d = Description;
//         this.i = Image;
//     }
// }

fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(products => {
        const productList = document.getElementById('product-list');
        console.log(products)
        console.log(productList);

        products.map(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add("cont-div");

            productDiv.innerHTML = `
              <img src=${product.image}>
              <h3>${product.title}</h3>
              <p>${product.description}</p>
              <p>Price: $${product.price}</p>
              
            `;
            productList.appendChild(productDiv);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });




// Section 2:
function postForm() {
    var valueoftitle = document.getElementById("title").value;
    var valueofcontent = document.getElementById("content").value;

    const postData = {
        title: valueoftitle,
        content: valueofcontent,
    };


    // POST
    fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(newPost => {
            console.log("New post created:", newPost);

            // Display the new post on the HTML page
            displayPost(newPost);
        })
        .catch(error => console.error("Error creating post:", error));
}

function displayPost(post) {
    const postList = document.getElementById('postList');
    const postDiv = document.createElement('div');
    postDiv.classList.add("post-div");
    postDiv.id = `post_${post.id}`;

    postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        <button type="button" class="btn btn-outline-success" onclick="editPost(${post.id})">Edit</button>
        <button type="button" class="btn btn-outline-danger" onclick="deletePost(${post.id})">Delete</button>
    `;

    postList.appendChild(postDiv);
}

// UPDATE
function editPost(postId) {

    const updatedContent2 = prompt('Enter the Title:', '');
    const updatedContent = prompt('Enter the updated content:', '');

    if (updatedContent !== null) {
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title:updatedContent2,
                content: updatedContent }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(updatedPost => {
                console.log("Post updated:", updatedPost);

                const postElement = document.getElementById(`post_${postId}`);
                if (postElement) {
                    const contentElement = postElement.querySelector('p');
                    if (contentElement) {
                        contentElement.textContent = updatedPost.content;
                    }
                }
            })
            .catch(error => console.error("Error updating post:", error));
    }
}


// DELETE
function deletePost(postId) {
    fetch(`http://localhost:3000/posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(deletedPost => {
            console.log("Post deleted:", deletedPost);
            const postElement = document.getElementById(`post_${postId}`);
            if (postElement) {
                postElement.remove();
            }
        })
        .catch(error => console.error("Error deleting post:", error));
}

//GET
fetch('http://localhost:3000/posts')
    .then(response => response.json())
    .then(posts => {
        const postList = document.getElementById('postList');
        posts.forEach(post => {
            displayPost(post);
            
        });
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    });


 