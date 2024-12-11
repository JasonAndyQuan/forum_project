
const getPosts = async function(){
    try {
        const response = await fetch("http://localhost:3000/posts");
        if (!response.ok) {
            throw new Error('Network response no work');
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export {getPosts}