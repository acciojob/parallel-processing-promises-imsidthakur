
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

const button = document.getElementById("download-images-button");
const output = document.getElementById("output");

button.addEventListener("click", async () => {
  output.innerHTML = "";

const loadImage = (image) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = image.url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
  });
};


  const imagePromises = images.map((url) => loadImage(url));

  try {
    const images = await Promise.allSettled(imagePromises); 
    images.forEach((result) => {
      if (result.status === "fulfilled") {
        console.log({result})
        output.appendChild(result.value);
      } else {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = result.reason.message;
        errorMessage.style.color = "red";
        output.appendChild(errorMessage);
      }
    });
  } catch (error) {
    console.error("Error while loading images:", error);
  }
});
