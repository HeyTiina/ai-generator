function displayText(response) {
  new Typewriter("#text", {
    strings: response.data.answer,
    autoStart: true,
    delay: 2,
    cursor: "",
  });
}

async function generateText(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");
  let apiKey = "2a830c1f5845c71a9b8c68a49820t94o";
  let context = `
    You are an expert and love to help people with their questions. Generate a text about the topic of the instructions of the user. 
    The text has to be not more than 5 lines and concrete.
    Sign the text with 'Tina AI' inside a <strong> element at the end of the text and NOT at the beginning.
  `;
  let prompt = `User instructions: Generate a text about ${instructionsInput.value}`;
  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  let TextElement = document.querySelector("#text");
  TextElement.classList.remove("hidden");
  TextElement.innerHTML = `<div class="generating">⏳ Generating text about ${instructionsInput.value}</div>`;

  try {
    let response = await axios.get(apiURL);
    displayText(response);
  } catch (error) {
    TextElement.innerHTML = `<div class="error">❌ Error generating. Please try again later.</div>`;
    console.error("Error generating:", error);
  }
}

let TextFormElement = document.querySelector("#text-generator-form");
TextFormElement.addEventListener("submit", generateText);
