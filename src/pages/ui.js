// Replace these values with your Cloudinary credentials
const cloudinaryConfig = {
    cloudName: 'your_cloud_name',
    apiKey: 'your_api_key',
    apiSecret: 'your_api_secret'
};

let currentImageId; // To store the ID of the currently displayed image

// Function to upload image to Cloudinary using Axios
async function uploadImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'your_upload_preset');

        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data = response.data;
            console.log('Upload successful:', data);

            // You can update the UI to display the uploaded image
            const imageList = document.getElementById('imageList');
            const imageUrl = data.secure_url;
            const imageElement = `<img src="${imageUrl}" alt="Uploaded Image" style="max-width: 300px;">`;

            // Store the Cloudinary image ID for future updates
            currentImageId = data.public_id;

            imageList.innerHTML += imageElement;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }
}

// Function to update an existing image on Cloudinary using Axios
async function updateImage() {
    if (!currentImageId) {
        console.error('No image selected for update');
        return;
    }

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'your_upload_preset');

        try {
            await axios.put(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload/${currentImageId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Update successful');

            // You can update the UI or perform other actions after updating
        } catch (error) {
            console.error('Error updating image:', error);
        }
    }
}
