const form = document.getElementById("reg__form");
const usernameInputDOM = document.getElementById("username");
const passwordInputDOM = document.getElementById("password");
const btn = document.getElementById("btn");
const user__container = document.querySelector(".user__container");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameInputDOM.value;
  const password = passwordInputDOM.value;
  //   try {
  //     await axios.post("/api/register", { username, password });
  //   } catch (error) {
  //     console.log("something went wrong");
  //   }

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    console.log(response.status, response.statusText, response.url);
  } catch (error) {
    console.log(error);
  }
});

btn.addEventListener("click", async () => {
  try {
    const response = await fetch("/api/users/");
    const data = await response.json();

    console.log(data);
    const allUsers = data
      .map((user) => {
        const { username, password, _id: userID } = user;
        return `<tr>
      <td>${username}</td>
      <td>  ${password}</td>
      <td><button onclick ="delete" data-id ="${userID}">delete</button></td>
       </tr> 
        `;
      })
      .join("");

    user__container.innerHTML = `<table>
  <tr>
     <th>username</th>
     <th>password</th>
  </tr>
 ${allUsers}
    </table>`;
  } catch (error) {
    console.log(error);
  }
});
