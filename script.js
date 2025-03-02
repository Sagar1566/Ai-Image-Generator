const generateForm = document.querySelector(".generate-form");
const generateBtn = generateForm.querySelector(".generate-btn");
const imageGallery = document.querySelector(".image-gallery");

const GEMINI_API_KEY = "AIzaSyBEYbWEDDKWHobC1scEE1SbnWqMaPrqbQg"; // Replace with your actual Gemini API key
let isImageGenerating = false;

const updateImageCard = (generatedText) => {
  const imgCard = document.createElement("div");
  imgCard.classList.add("img-card");
  imgCard.innerHTML = `
    <p>${generatedText}</p>
  `;
  imageGallery.appendChild(imgCard);
};

const generateAiText = async (userPrompt) => {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      }),
    });

    if (!response.ok) throw new Error("Failed to generate content. Check your API key.");

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    updateImageCard(generatedText);
  } catch (error) {
    alert(error.message);
  } finally {
    generateBtn.removeAttribute("disabled");
    generateBtn.innerText = "Generate";
    isImageGenerating = false;
  }
};

const handleImageGeneration = (e) => {
  e.preventDefault();
  if (isImageGenerating) return;

  const userPrompt = e.target[0].value;

  generateBtn.setAttribute("disabled", true);
  generateBtn.innerText = "Generating...";
  isImageGenerating = true;

  imageGallery.innerHTML = `<p>Generating content...</p>`;
  generateAiText(userPrompt);
};

generateForm.addEventListener("submit", handleImageGeneration);
