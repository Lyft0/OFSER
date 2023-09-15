document.querySelectorAll('.ticket-bubble').forEach(element => {
  element.addEventListener('click', (event) => {
    const modal = document.querySelector(".modal-" + event.currentTarget.dataset.ticket)
    modal.style.display = "block";

    const span = document.querySelector(".close-" + event.currentTarget.dataset.ticket);
    span.onclick = function () {
      modal.style.display = "none";
    }
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  })
})


document.querySelectorAll('.btn-cancel').forEach(element => {
  element.addEventListener('click', (event) => {
    const id_ticket = event.currentTarget.dataset.ticket
    const endpoint = `/delete-ticket/${id_user}/${id_ticket}`
    fetch(endpoint, {
      method: 'DELETE'
    })
    .then((response) => response.json())
    .then((data) => window.location.href = data.redirect)
    .catch((err) => console.log(err))
  })
})

var coll = document.getElementsByClassName("req-detail-button");
var i;
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {

      content.style.maxHeight = null;
      content.style.padding = "0"
    } else {
      content.style.padding = "15px"
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}



