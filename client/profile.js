const form = document.getElementById("reg__form");
const usernameInputDOM = document.getElementById("username");
const passwordInputDOM = document.getElementById("password");
const view__profile__btn = document.querySelector(".btn");
const profile__container = document.querySelector(".user__container");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const hobby = usernameInputDOM.value;
  const club = passwordInputDOM.value;

  const token = localStorage.getItem("token");
  try {
    const response = await fetch("/api/user-specific-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, data: { hobby, club } }),
    });
    const result = await response.json();
    console.log(result);
    if (!result.error) {
      //show_result();
      alert("Success user-profile added");
    } else {
      alert(result.error);
    }
  } catch (error) {
    console.log(error);
  }
});
view__profile__btn.addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`/api/get-user-profile/${token}`);

  const result = await response.json();
  console.log(result);

  const usersProfile = result
    .map((profile) => {
      const { hobby, club, _id: userID } = profile;
      return `<tr>
      <td>${hobby}</td>
      <td>${club}</td>
      
       </tr> 
        `;
    })
    .join("");

  profile__container.innerHTML = `<table>
  <tr>
     <th>hobby</th>
     <th>club</th>
  </tr>
 ${usersProfile}
    </table>`;
});
