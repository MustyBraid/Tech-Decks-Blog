const nameEl = $("#profile-name"); //document.getElementById("profile-name");
const emailEl = $("#profile-email");
const buttonEl = $("#profile-buttons");
const editIcon = $("#edit-profile");
const uploadBtns = $("#upload-btns");
const createEl = $("#create-post");

let name, email;

const enableEdit = () => {
  $(".profile-input").each(function (i) {
    const input = $(this);
    input.prop("disabled", false);
    input.toggleClass("form-control-plaintext");
    input.toggleClass("form-control");
  });
  buttonEl.prop("hidden", false);
  editIcon.prop("hidden", true);
};

const disableEdit = () => {
  $(".profile-input").each(function (i) {
    const input = $(this);
    input.prop("disabled", true);
    input.toggleClass("form-control-plaintext");
    input.toggleClass("form-control");
  });
  buttonEl.prop("hidden", true);
  editIcon.prop("hidden", false);
};

const profileEditHandler = async (event) => {
  event.preventDefault();
  name = nameEl.val().trim();
  email = emailEl.val().trim();
  const id = window.location.pathname.split("/")[2];
  const response = await fetch(`/api/users/${id}`, {
    method: "PUT",
    body: JSON.stringify({ name, email }),
    headers: { "Content-Type": "application/json" },
  });

  disableEdit();
};

const enableEditHandler = async (event) => {
  event.preventDefault();
  name = nameEl.val().trim();
  email = emailEl.val().trim();
  enableEdit();
};

const cancelEditHandler = async (event) => {
  event.preventDefault();
  nameEl.val(name);
  emailEl.val(email);
  disableEdit();
};

const hoverIn = (event) => {
  const target = $(event.target);
  const profileId = Number(window.location.pathname.split("/")[2]);
  const userId = Number(target.data("loggedIn"));
  if (profileId === userId) {
    imageEl.addClass("prof-hover");
  }
};

const hoverOut = (event) => {
  imageEl.removeClass("prof-hover");
};

const createPostHandler = async (event) => {};

$("#profile-form").on("submit", profileEditHandler);
editIcon.on("click", enableEditHandler);
$("#cancel-profile").on("click", cancelEditHandler);
$("#create-post").on("click", createPostHandler);

imageEl.hover(hoverIn, hoverOut);
