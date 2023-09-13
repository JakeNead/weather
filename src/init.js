export default function initPage() {
  const body = document.querySelector("body");

  body.innerHTML = `<header>
    <form action="">
        <label for="search"></label>
        <input type="text" name="search" id="search" />
        <button type="submit">Search</button>
    </form>
</header>
<main>
    <article>
        <h2 id="location"></h2>
        <div id="forecastContainer">
        <p id="condition"></p>
        <p id="temp"></p>
        <p id="wind"></p>
        </div>
    </article>
</main>`;
}
