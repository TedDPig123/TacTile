//POST: Create a new background image
export async function createBackgroundImage(backgroundImageObject) {
    try {
        const response = await fetch('/background-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(backgroundImageObject),
        });

        if (!response.ok) {
            throw new Error('Failed to create background image');
        }

        const newBackgroundImage = await response.json();
        console.log('Background image created:', newBackgroundImage);
        return newBackgroundImage;
    } catch (error) {
        console.error("Error creating background image:", error);
        alert("Error creating background image on the server.");
    }
}

//GET: Fetch all background images
export async function getAllBackgroundImages() {
    try {
        const response = await fetch('/background-image', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch background images');
        }

        const allBackgroundImages = await response.json();
        console.log('All background images:', allBackgroundImages);
        return allBackgroundImages;
    } catch (error) {
        console.error("Error fetching background images:", error);
    }
}



//PUT: Update a background image
export async function updateBackgroundImage(imageId, updatedData) {
    try {
        const response = await fetch(`/background-image/${imageId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error("Failed to update background image");
        }

        const updatedBackgroundImage = await response.json();
        console.log(`Background image with ID ${imageId} updated:`, updatedBackgroundImage);
        return updatedBackgroundImage;
    } catch (error) {
        console.error("Error updating background image:", error);
        alert(`Error updating background image: ${error.message}`);
    }
}

//DELETE: Delete a background image
export async function deleteBackgroundImage(imageId) {
    try {
        const response = await fetch(`/background-image/${imageId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete background image with ID ${imageId}`);
        }

        const message = await response.json();
        console.log(`Background image with ID ${imageId} deleted:`, message);
        return message;
    } catch (error) {
        console.error("Error deleting background image:", error);
    }
}

