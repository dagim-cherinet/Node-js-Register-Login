const form = document.getElementById("reg__form");
const usernameInputDOM = document.getElementById("username");
const passwordInputDOM = document.getElementById("password");
const btn = document.getElementById("btn");
const user__container = document.querySelector(".user__container");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInputDOM.value;
  const password = passwordInputDOM.value;

  try {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    console.log(result);
    if (!result.error) {
      alert("login Successful, welcome!!");
      localStorage.setItem("token", result.data);
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.log(error);
  }
});
